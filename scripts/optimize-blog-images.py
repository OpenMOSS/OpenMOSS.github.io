# -*- coding: utf-8 -*-
"""Safe, in-place optimization of blog-post figure images.

Strategy (no filename/extension changes => zero risk of broken <img> refs):
  - only touch raster images >= MIN_BYTES
  - downscale so the longest side <= MAX_DIM (figures display <=~1100px in
    Distill; 1600 keeps retina headroom)
  - re-encode JPEG q85 progressive; PNG optimized (alpha preserved). PNGs that
    are really photos stay PNG to avoid a ref change — their win is the resize.
  - only write if the result is meaningfully smaller (<= KEEP_RATIO of original)

Run `python scripts/optimize-blog-images.py`        -> dry run (report only)
Run `python scripts/optimize-blog-images.py --apply` -> overwrite in place
"""
import os, glob, io, sys
from PIL import Image
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

MIN_BYTES = 100 * 1024
MAX_DIM = 1600
KEEP_RATIO = 0.90
APPLY = '--apply' in sys.argv

imgs = []
for ext in ('png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'):
    imgs += glob.glob('blog/**/*.' + ext, recursive=True)
imgs = sorted(set(p.replace('\\', '/') for p in imgs))

total_old = total_new = 0
changed = 0
rows = []
for p in imgs:
    osz = os.path.getsize(p)
    if osz < MIN_BYTES:
        continue
    try:
        im = Image.open(p)
        fmt = im.format
        w, h = im.size
    except Exception as e:
        rows.append((osz, osz, p, 'OPEN-FAIL %s' % e)); continue
    im2 = im
    note = ''
    longest = max(w, h)
    if longest > MAX_DIM:
        scale = MAX_DIM / longest
        im2 = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        note = '%dx%d->%dx%d' % (w, h, im2.size[0], im2.size[1])
    else:
        note = '%dx%d (no resize)' % (w, h)
    buf = io.BytesIO()
    save_kw = {}
    if fmt == 'JPEG':
        rgb = im2.convert('RGB')
        rgb.save(buf, 'JPEG', quality=88, optimize=True, progressive=True)
    elif fmt == 'PNG':
        # preserve mode (alpha/palette); just optimize (+ any resize already applied)
        im2.save(buf, 'PNG', optimize=True)
    else:
        rows.append((osz, osz, p, 'skip fmt=%s' % fmt)); continue
    nsz = buf.tell()
    total_old += osz
    if nsz <= osz * KEEP_RATIO:
        total_new += nsz
        changed += 1
        rows.append((osz, nsz, p, note + ' [WRITE]'))
        if APPLY:
            with open(p, 'wb') as f:
                f.write(buf.getvalue())
    else:
        total_new += osz
        rows.append((osz, nsz, p, note + ' [keep orig]'))

rows.sort(reverse=True)
for osz, nsz, p, note in rows:
    print('%5dK -> %5dK  %-58s %s' % (osz // 1024, nsz // 1024, p, note))
print('-' * 100)
print('%s: %d/%d images would shrink | %.2f MB -> %.2f MB  (save %.2f MB, %.0f%%)' % (
    'APPLIED' if APPLY else 'DRY-RUN', changed, len([r for r in rows]),
    total_old / 1048576, total_new / 1048576,
    (total_old - total_new) / 1048576,
    100 * (total_old - total_new) / total_old if total_old else 0))
