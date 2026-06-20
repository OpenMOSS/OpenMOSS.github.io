# -*- coding: utf-8 -*-
"""Inject Open Graph / Twitter card + canonical (+ <title>/<meta description>
for older posts that lack them) into each blog post's <head>, derived from the
post's own <d-front-matter>. Idempotent (skips posts that already have og:image).

  python scripts/inject-og-meta.py          -> dry run (prints what it extracted)
  python scripts/inject-og-meta.py --apply   -> write changes
"""
import os, re, json, glob, io, sys
from datetime import datetime
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

APPLY = '--apply' in sys.argv
SITE = 'https://openmoss.ai'

def esc(s):
    return (s or '').replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;')

def frontmatter(html):
    m = re.search(r'<d-front-matter>(.*?)</d-front-matter>', html, re.S | re.I)
    block = m.group(1) if m else html
    sm = re.search(r'<script[^>]*type=["\']text/json["\'][^>]*>(.*?)</script>', block, re.S | re.I)
    raw = sm.group(1).strip() if sm else block
    title = desc = date = None
    try:
        d = json.loads(raw)
        title, desc, date = d.get('title'), d.get('description'), d.get('publishedDate')
    except Exception:
        def grab(k):
            mm = re.search(r'"%s"\s*:\s*"((?:[^"\\]|\\.)*)"' % k, block)
            return json.loads('"' + mm.group(1) + '"') if mm else None
        title, desc, date = grab('title'), grab('description'), grab('publishedDate')
    return title, desc, date

def to_iso(d):
    if not d:
        return None
    for fmt in ('%Y-%m-%d', '%b %d, %Y', '%B %d, %Y', '%Y-%m', '%Y', '%b %Y', '%B %Y'):
        try:
            return datetime.strptime(d.strip(), fmt).strftime('%Y-%m-%d')
        except Exception:
            pass
    return None

posts = sorted(glob.glob('blog/en/*/index.html') + glob.glob('blog/cn/*/index.html'))
done = skipped = 0
for f in posts:
    parts = f.replace('\\', '/').split('/')
    lang, slug = parts[1], parts[2]
    html = io.open(f, encoding='utf-8').read()
    if 'property="og:image"' in html:
        skipped += 1; continue
    title, desc, date = frontmatter(html)
    if not title:
        print('!! NO TITLE  %s' % f); continue
    ogimg = '%s/assets/img/og/%s.jpg' % (SITE, slug)
    if not os.path.isfile('assets/img/og/%s.jpg' % slug):
        print('!! NO CARD   %s (slug=%s)' % (f, slug)); continue
    url = '%s/blog/%s/%s/' % (SITE, lang, slug)
    locale = 'zh_CN' if lang == 'cn' else 'en_US'
    iso = to_iso(date)
    lines = []
    if '<title>' not in html:
        lines.append('  <title>%s</title>' % esc(title))
    if 'name="description"' not in html and desc:
        lines.append('  <meta name="description" content="%s">' % esc(desc))
    lines += [
        '  <link rel="canonical" href="%s">' % url,
        '  <meta property="og:type" content="article">',
        '  <meta property="og:site_name" content="OpenMOSS">',
        '  <meta property="og:url" content="%s">' % url,
        '  <meta property="og:title" content="%s">' % esc(title),
    ]
    if desc:
        lines.append('  <meta property="og:description" content="%s">' % esc(desc))
    lines += [
        '  <meta property="og:image" content="%s">' % ogimg,
        '  <meta property="og:image:width" content="1200">',
        '  <meta property="og:image:height" content="630">',
        '  <meta property="og:locale" content="%s">' % locale,
    ]
    if iso:
        lines.append('  <meta property="article:published_time" content="%s">' % iso)
    lines += [
        '  <meta name="twitter:card" content="summary_large_image">',
        '  <meta name="twitter:site" content="@Open_MOSS">',
        '  <meta name="twitter:title" content="%s">' % esc(title),
    ]
    if desc:
        lines.append('  <meta name="twitter:description" content="%s">' % esc(desc))
    lines.append('  <meta name="twitter:image" content="%s">' % ogimg)
    block = '\n' + '\n'.join(lines) + '\n'

    # insert after the viewport meta (present in every post)
    vm = re.search(r'<meta\s+name="viewport"[^>]*>', html)
    if not vm:
        print('!! NO VIEWPORT %s' % f); continue
    new_html = html[:vm.end()] + block + html[vm.end():]

    print('%-40s title="%s%s" date=%s%s' % (
        lang + '/' + slug, (title[:42]), ('...' if len(title) > 42 else ''), iso,
        '' if ('<title>' not in html) else '  [had title]'))
    if APPLY:
        io.open(f, 'w', encoding='utf-8').write(new_html)
        done += 1

print('-' * 70)
print('%s: %d injected, %d skipped (already had og)' % ('APPLIED' if APPLY else 'DRY-RUN', done if APPLY else len([p for p in posts]) - skipped, skipped))
