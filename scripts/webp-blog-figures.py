# -*- coding: utf-8 -*-
"""Convert heavy blog figures to WebP and repoint their <img> refs.

SAFE-ONLY: a figure is converted only if every reference to it lives in an
editable .html file (never in a JS bundle or CSS). Bundle-rendered posts are
skipped automatically so no ref can break.

Transactional order: (1) write every .webp, (2) repoint every HTML ref,
(3) delete originals LAST. If a delete fails the HTML already points at an
existing .webp, so the page never breaks — the original is just left as a
harmless orphan and reported.

  python scripts/webp-blog-figures.py          -> dry run
  python scripts/webp-blog-figures.py --apply   -> convert + repoint + delete
"""
import os, re, glob, io, sys, stat
from PIL import Image
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

MIN_BYTES = 150 * 1024
MAX_DIM = 1600
APPLY = '--apply' in sys.argv

html_files = glob.glob('blog/**/*.html', recursive=True)
js_css = glob.glob('blog/**/*.js', recursive=True) + glob.glob('blog/**/*.css', recursive=True)
html_blob = {f: io.open(f, encoding='utf-8', errors='ignore').read() for f in html_files}
js_css_blob = ''.join(io.open(f, encoding='utf-8', errors='ignore').read() for f in js_css)

cands = []
for ext in ('png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'):
    cands += glob.glob('blog/**/*.' + ext, recursive=True)
cands = sorted(set(p.replace('\\', '/') for p in cands if os.path.getsize(p) >= MIN_BYTES))

plan, skipped = [], []
for p in cands:
    base = os.path.basename(p)
    if base in js_css_blob:
        skipped.append((p, 'referenced in JS/CSS (bundle)')); continue
    postdir = '/'.join(p.split('/')[:3])
    refs = []
    for f, html in html_blob.items():
        if not f.replace('\\', '/').startswith(postdir):
            continue
        for m in re.finditer(r'(?:src|href)="([^"]*' + re.escape(base) + r')"', html):
            refs.append((f, m.group(1)))
    if not refs:
        skipped.append((p, 'no HTML ref (bundle/dynamic)')); continue
    plan.append((p, os.path.splitext(p)[0] + '.webp', os.path.getsize(p), refs))

# ---- encode all webp first (handles closed via `with`) ----
encoded = []  # (orig, webp, osz, nsz, refs)
for p, webp, osz, refs in plan:
    with Image.open(p) as im0:
        im0.load()
        w, h = im0.size
        im = im0.resize((round(w * MAX_DIM / max(w, h)), round(h * MAX_DIM / max(w, h))), Image.LANCZOS) if max(w, h) > MAX_DIM else im0.copy()
        has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        im = im.convert('RGBA' if has_alpha else 'RGB')
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=88, method=6)
    encoded.append((p, webp, osz, buf.tell(), refs, buf.getvalue()))

encoded.sort(key=lambda x: -x[2])
old = new = 0
for p, webp, osz, nsz, refs, data in encoded:
    old += osz; new += nsz
    print('%5dK -> %4dK  %-56s  (%d ref)' % (osz // 1024, nsz // 1024, p, len(refs)))

if APPLY:
    # (1) write webp
    for p, webp, osz, nsz, refs, data in encoded:
        with open(webp, 'wb') as fh:
            fh.write(data)
    # (2) repoint HTML refs
    for p, webp, osz, nsz, refs, data in encoded:
        nb = os.path.basename(webp)
        for f, refstr in refs:
            newref = (refstr[:refstr.rfind('/') + 1] + nb) if '/' in refstr else nb
            html_blob[f] = html_blob[f].replace('"' + refstr + '"', '"' + newref + '"')
    for f, html in html_blob.items():
        io.open(f, 'w', encoding='utf-8').write(html)
    # (3) delete originals last (handle read-only + locks gracefully)
    failed = []
    for p, webp, osz, nsz, refs, data in encoded:
        try:
            os.chmod(p, stat.S_IWRITE)
            os.remove(p)
        except Exception as e:
            failed.append((p, str(e)))
    if failed:
        print('\nWARN: %d originals could not be deleted (HTML already points at .webp; orphan only):' % len(failed))
        for p, e in failed:
            print('   %s  (%s)' % (p, e))

print('-' * 90)
print('%s: %d figures | %.2f MB -> %.2f MB (save %.2f MB)' % (
    'APPLIED' if APPLY else 'DRY-RUN', len(encoded), old / 1048576, new / 1048576, (old - new) / 1048576))
print('skipped %d (bundle/dynamic — kept safe)' % len(skipped))
