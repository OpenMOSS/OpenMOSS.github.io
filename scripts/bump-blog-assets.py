#!/usr/bin/env python3
"""Stamp ONE cache-busting ``?v=`` version onto the shared blog assets.

Counterpart to ``bump_version.py`` (which stamps ``index.html``). This stamps
every ``?v=`` token across the blog's standalone pages and the chrome script:

    blog/**/*.html        (every post + the CN listing)
    blog/blog-chrome.js   (so the inline ``views.js?v=`` reference busts too)

Usage:
    python scripts/bump-blog-assets.py [VERSION]

If VERSION is omitted, the current UTC timestamp (YYYYMMDDHHMMSS) is used.
Run this after editing any shared blog asset — e.g. after setting the Worker
URL in ``assets/js/views.js`` — so returning visitors fetch the new files.
"""
import datetime
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BLOG = ROOT / "blog"


def main() -> int:
    if len(sys.argv) > 1:
        version = sys.argv[1]
    else:
        version = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S")
    version = re.sub(r"[^A-Za-z0-9._-]", "", version)[:40] or "0"

    targets = list(BLOG.rglob("*.html"))
    targets.append(BLOG / "blog-chrome.js")

    total_files = 0
    total_tokens = 0
    for path in targets:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        new_text, n = re.subn(r"(\?v=)[^\"'&]+", r"\g<1>" + version, text)
        if n:
            path.write_text(new_text, encoding="utf-8")
            total_files += 1
            total_tokens += n

    print(f"stamped {total_tokens} token(s) across {total_files} file(s) with ?v={version}")
    return 0 if total_tokens else 1


if __name__ == "__main__":
    raise SystemExit(main())
