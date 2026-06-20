# -*- coding: utf-8 -*-
"""Generate sitemap.xml from the real (crawlable) pages.
The homepage is a hash-router SPA, so only the root URL + the self-contained
blog post pages are real URLs. Redirect stubs (blog/index.html,
blog/en/index.html) are skipped. Run from repo root."""
import os, glob, datetime

BASE = 'https://openmoss.ai'
urls = []

def add(path, priority, lastmod=None):
    urls.append((path, priority, lastmod))

def mtime(p):
    return datetime.date.fromtimestamp(os.path.getmtime(p)).isoformat()

add('/', '1.0')
# standalone listings / pages that are real content (not redirects)
for p in ['blog/cn/index.html', 'blog/about/index.html']:
    if os.path.isfile(p):
        add('/' + os.path.dirname(p) + '/', '0.7', mtime(p))

# self-contained posts: blog/en/<slug>/ and blog/cn/<slug>/
for lang in ('en', 'cn'):
    for idx in sorted(glob.glob('blog/%s/*/index.html' % lang)):
        slug = os.path.basename(os.path.dirname(idx))
        add('/blog/%s/%s/' % (lang, slug), '0.6', mtime(idx))

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path, prio, lm in urls:
    lines.append('  <url>')
    lines.append('    <loc>%s%s</loc>' % (BASE, path))
    if lm:
        lines.append('    <lastmod>%s</lastmod>' % lm)
    lines.append('    <priority>%s</priority>' % prio)
    lines.append('  </url>')
lines.append('</urlset>')
open('sitemap.xml', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('sitemap.xml: %d URLs' % len(urls))
for path, prio, lm in urls:
    print('  %s%s' % (BASE, path))
