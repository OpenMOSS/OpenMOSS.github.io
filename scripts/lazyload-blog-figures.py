# -*- coding: utf-8 -*-
"""Add loading="lazy" decoding="async" to blog-post article figures.

Skips the FIRST <img> in each post (kept eager so the above-the-fold hero is
not deferred) and any <img> that already declares loading=. Pure attribute
insertion — no ref/extension changes.

  python scripts/lazyload-blog-figures.py          -> dry run
  python scripts/lazyload-blog-figures.py --apply   -> apply
"""
import re, glob, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
APPLY = '--apply' in sys.argv

total = 0
rows = []
for f in glob.glob('blog/**/*.html', recursive=True):
    html = io.open(f, encoding='utf-8').read()
    imgs = list(re.finditer(r'<img\b[^>]*>', html))
    if len(imgs) <= 1:
        continue
    added = 0
    # iterate from last to first so earlier match offsets stay valid; skip imgs[0]
    for m in reversed(imgs[1:]):
        tag = m.group(0)
        if 'loading=' in tag:
            continue
        newtag = '<img loading="lazy" decoding="async"' + tag[4:]
        html = html[:m.start()] + newtag + html[m.end():]
        added += 1
    if added:
        rows.append((f, added, len(imgs)))
        total += added
        if APPLY:
            io.open(f, 'w', encoding='utf-8').write(html)

for f, added, n in sorted(rows):
    print('%-50s +%2d lazy (of %d imgs)' % (f, added, n))
print('-' * 70)
print('%s: added loading="lazy" to %d figures across %d files' % (
    'APPLIED' if APPLY else 'DRY-RUN', total, len(rows)))
