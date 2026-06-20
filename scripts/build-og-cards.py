# -*- coding: utf-8 -*-
"""Generate 1200x630 social-share cards for each blog post -> assets/img/og/<slug>.jpg

Each card = the post's representative figure, contain-fit on a branded sand
background, with the OpenMOSS wordmark and a blue accent bar. One card per slug
(language-neutral); the localized title/description come from the og:title /
og:description meta tags. Posts with no raster figure get a logo-only card.

  python scripts/build-og-cards.py
"""
import os, glob, io, sys
from PIL import Image
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUGS = ['anygpt', 'data-mixing-laws', 'DictCircuits_Othello', 'evolutionary-agent',
         'knowledge-boundary', 'language-model-SAEs', 'moss-tts', 'moss-ttsd', 'mova',
         'organizational-intelligence', 'scientific-taste', 'speechgpt2-preview', 'thinking-with-video']

SAND = (247, 249, 252)
BLUE = (14, 65, 156)
W, H = 1200, 630
OUT = 'assets/img/og'
os.makedirs(OUT, exist_ok=True)

logo = Image.open('assets/img/openmoss-logo.png').convert('RGBA')

def find_source(slug):
    for c in ['assets/img/highlights/%s.png' % slug, 'assets/img/highlights/%s.jpg' % slug,
              'assets/img/highlights/%s.webp' % slug, 'assets/img/blog-thumbs/%s.jpg' % slug]:
        if os.path.isfile(c):
            return c
    return None

def paste_logo(card, x, y, h):
    lw, lh = logo.size
    lg = logo.resize((round(lw * h / lh), h), Image.LANCZOS)
    card.paste(lg, (x, y), lg)
    return lg.size

for slug in SLUGS:
    card = Image.new('RGB', (W, H), SAND)
    src = find_source(slug)
    if src:
        # brand header: logo top-left
        paste_logo(card, 60, 48, 46)
        # figure contain-fit into region below the logo
        rx, ry, rw, rh = 60, 130, W - 120, 420
        im = Image.open(src).convert('RGB')
        iw, ih = im.size
        scale = min(rw / iw, rh / ih)
        nw, nh = max(1, round(iw * scale)), max(1, round(ih * scale))
        im = im.resize((nw, nh), Image.LANCZOS)
        card.paste(im, (rx + (rw - nw) // 2, ry + (rh - nh) // 2))
    else:
        # no figure (e.g. SVG-only post): centered logo card
        lw, lh = logo.size
        h = 150
        lg = logo.resize((round(lw * h / lh), h), Image.LANCZOS)
        card.paste(lg, ((W - lg.size[0]) // 2, (H - lg.size[1]) // 2 - 10), lg)
    # blue accent bar
    card.paste(Image.new('RGB', (W, 12), BLUE), (0, H - 12))
    out = '%s/%s.jpg' % (OUT, slug)
    card.save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    print('%-28s <- %-46s %dK' % (out, src or '(logo card)', os.path.getsize(out) // 1024))
