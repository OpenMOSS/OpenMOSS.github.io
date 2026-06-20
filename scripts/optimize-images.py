# -*- coding: utf-8 -*-
"""One-off site image optimization:
  1. Generate a 1200x630 social-share card (assets/img/og-image.png) from the logo.
  2. Re-encode the homepage blog-listing thumbnails to WebP (max width 1000, q86).
Run from repo root: python scripts/optimize-images.py
"""
import os
from PIL import Image

HL = 'assets/img/highlights/'

# ---- 1. Social share card (Open Graph / Twitter) ----
SAND = (247, 249, 252)        # --sand-light
BLUE = (14, 65, 156)          # --fudan-blue
card = Image.new('RGB', (1200, 630), SAND)
logo = Image.open('assets/img/openmoss-logo.png').convert('RGBA')
target_w = 720
lw, lh = logo.size
logo = logo.resize((target_w, round(lh * target_w / lw)), Image.LANCZOS)
lx = (1200 - logo.size[0]) // 2
ly = (630 - logo.size[1]) // 2 - 10
card.paste(logo, (lx, ly), logo)
# thin brand accent bar along the bottom
bar = Image.new('RGB', (1200, 10), BLUE)
card.paste(bar, (0, 620))
card.save('assets/img/og-image.png', 'PNG', optimize=True)
print('og-image.png %dx%d  %dK' % (card.size[0], card.size[1], os.path.getsize('assets/img/og-image.png')//1024))

# ---- 2. Highlight images -> WebP ----
# SPA-listing-only thumbnails: 1000px is ample (shown <=1140px feature / ~360px grid).
THUMBS_1000 = ['xy-tokenizer.png', 'moss-speech.png', 'organizational-intelligence.png']
# Also used full-size as the in-post <figure class="article-hero"> on a blog post,
# so keep native resolution (capped at 1600px) for a crisp hero.
HEROES_NATIVE = ['thinking-with-video.png', 'mova.jpg', 'moss-tts.png', 'scientific-taste.png']

def to_webp(f, max_w, quality):
    src = HL + f
    if not os.path.isfile(src):
        print('skip (missing):', f); return
    im = Image.open(src).convert('RGB')
    w, h = im.size
    if w > max_w:
        im = im.resize((max_w, round(h * max_w / w)), Image.LANCZOS)
    out = HL + os.path.splitext(f)[0] + '.webp'
    im.save(out, 'WEBP', quality=quality, method=6)
    print('%-34s %4dK -> %-30s %4dK  (%dx%d)' % (f, os.path.getsize(src)//1024,
          os.path.basename(out), os.path.getsize(out)//1024, im.size[0], im.size[1]))

for f in THUMBS_1000:
    to_webp(f, 1000, 86)
for f in HEROES_NATIVE:
    to_webp(f, 1600, 88)
