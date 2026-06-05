#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Subset & self-host the OpenMOSS web fonts (Roboto + 思源黑体 / Noto Sans SC).

The site is bilingual: Latin text uses Roboto (the site's original Latin face);
Chinese text uses Noto Sans SC (思源黑体). The full Chinese font is ~17 MB, so we
ship a SUBSET containing only the CJK characters that actually appear in the
site's own text sources — typically a few hundred KB. Each output is a single
VARIABLE woff2 spanning weights 300–700 (the weight axis is preserved; Roboto's
width axis is pinned to 100).

Outputs (committed to the repo, served by GitHub Pages):
    assets/fonts/roboto-subset.woff2          (Latin, weight 300..700)
    assets/fonts/noto-sans-sc-subset.woff2    (Chinese, weight 300..700)

Re-run this after adding new Chinese text (new team members, blog cards, etc.):
    python scripts/build-fonts.py
Any CJK char missing from the subset still renders via the system fallback
(PingFang SC / Microsoft YaHei) declared in style.css, so the site never breaks —
re-running just folds the new glyphs into the self-hosted file.

Requires:  pip install fonttools brotli
"""
import re, sys, subprocess, pathlib, urllib.request

ROOT  = pathlib.Path(__file__).resolve().parents[1]          # OpenMOSS.github.io/
FONTS = ROOT / "assets" / "fonts"
CACHE = pathlib.Path(__file__).resolve().parent / ".fontcache"

SOURCES = {
    "noto":   ("https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf",
               CACHE / "NotoSansSC.ttf"),
    "roboto": ("https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/Roboto%5Bwdth,wght%5D.ttf",
               CACHE / "Roboto.ttf"),
}

# Only scan the SPA's own text (not blog articles, which have their own fonts).
SCAN = [
    ROOT / "index.html",
    ROOT / "404.html",
    ROOT / "assets" / "highlights.md",
] + sorted((ROOT / "assets" / "js").glob("*.js"))

# CJK ideograph blocks we treat as "Chinese characters" to collect from the text.
CJK_RE = re.compile(r"[㐀-䶿一-鿿豈-﫿]")          # ext-A, main, compat
# Punctuation / symbols the Chinese font should own (added unconditionally).
CJK_PUNCT = (
    "　、。〃々〆〈〉《》「」『』【】〔〕〖〗〜·…—‘’“”"
    "！？｡。＂＃＄％＆＇（）＊＋，－．／：；＜＝＞＠［＼］＾＿｀｛｜｝～￥"
    "0123456789"
)

# Latin coverage for Roboto — by range, so author names with accents,
# punctuation, arrows, currency, etc. always render even if not seen yet.
LATIN_UNICODES = (
    "U+0020-007E,"      # Basic Latin
    "U+00A0-00FF,"      # Latin-1 Supplement (accents)
    "U+0100-017F,"      # Latin Extended-A
    "U+2000-206F,"      # General Punctuation (– — ‘ ’ “ ” … • ′ ″)
    "U+20A0-20BF,"      # Currency (€ ₩ …)
    "U+2190-2199,"      # Arrows (→ used in the UI)
    "U+2122,U+00D7,U+00B7,U+2212"  # ™ × · −
)

SUBSET_COMMON = ["--flavor=woff2", "--layout-features=*", "--no-hinting",
                 "--desubroutinize", "--name-IDs=*"]


def fetch(url, dst):
    if dst.exists() and dst.stat().st_size > 1000:
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    print(f"  downloading {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dst, "wb") as f:
        f.write(r.read())
    print(f"  -> {dst.name}  {dst.stat().st_size/1e6:.2f} MB")


def pin_axis(src, dst, axes):
    """Pin variable-font axes (e.g. width=100), keeping the rest."""
    cmd = [sys.executable, "-m", "fontTools.varLib.instancer", str(src),
           "-o", str(dst)] + [f"{k}={v}" for k, v in axes.items()]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)


def collect_cjk():
    chars = set()
    for p in SCAN:
        if p.exists():
            chars.update(CJK_RE.findall(p.read_text(encoding="utf-8", errors="ignore")))
    chars.update(CJK_PUNCT)
    return chars


def run_subset(src, out, *, text=None, unicodes=None):
    cmd = [sys.executable, "-m", "fontTools.subset", str(src),
           f"--output-file={out}"] + SUBSET_COMMON
    if unicodes:
        cmd.append(f"--unicodes={unicodes}")
    if text is not None:
        txt = CACHE / "tmp_chars.txt"
        txt.write_text("".join(sorted(text)), encoding="utf-8")
        cmd.append(f"--text-file={txt}")
    subprocess.run(cmd, check=True)
    print(f"  -> {out.name}  {out.stat().st_size/1024:.0f} KB")


def main():
    FONTS.mkdir(parents=True, exist_ok=True)
    print("1) fetch source variable fonts")
    for url, dst in SOURCES.values():
        fetch(url, dst)

    print("2) collect Chinese characters from site text")
    cjk = collect_cjk()
    print(f"   {len(cjk)} unique glyphs from {sum(p.exists() for p in SCAN)} files")

    print("3) subset Roboto (Latin) — pin width=100, keep weight axis")
    roboto_wght = CACHE / "Roboto-wght.ttf"
    pin_axis(SOURCES["roboto"][1], roboto_wght, {"wdth": 100})
    run_subset(roboto_wght, FONTS / "roboto-subset.woff2", unicodes=LATIN_UNICODES)

    print("4) subset Noto Sans SC (Chinese, variable)")
    run_subset(SOURCES["noto"][1], FONTS / "noto-sans-sc-subset.woff2",
               text=cjk, unicodes="U+0020-007E,U+00B7,U+2014,U+2018-201D,U+2026,U+2192")

    print("done.")


if __name__ == "__main__":
    main()
