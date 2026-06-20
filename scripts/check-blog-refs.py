# -*- coding: utf-8 -*-
import re, os, glob, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
broken = []; checked = 0
for f in glob.glob('blog/**/*.html', recursive=True):
    base = os.path.dirname(f)
    html = io.open(f, encoding='utf-8').read()
    for m in re.findall(r'(?:src|href)="([^"]+\.(?:png|jpe?g|gif|webp|svg|JPE?G|PNG))"', html):
        if m.startswith(('http', '//', 'data:')):
            continue
        checked += 1
        if m.startswith('/'):
            path = m.lstrip('/')
        else:
            path = os.path.normpath(os.path.join(base, m)).replace('\\', '/')
        if not os.path.isfile(path):
            broken.append((f, m, path))
print('checked %d local blog image refs' % checked)
if broken:
    print('!!! %d BROKEN refs:' % len(broken))
    for f, m, p in broken:
        print('  %s -> %s' % (f, m))
else:
    print('OK - every local blog image ref resolves')
