#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Normalize member photos to the convention used by the existing site.

Current member assets are square 400x400 progressive JPEGs and are generally
kept below 25,000 bytes. This script finds files by member name, applies EXIF
orientation, crops them to a square with a slight top bias, and chooses the
highest JPEG quality that stays within the byte budget.

Example:
    python scripts/optimize-member-photos.py \
      --input-dir "/path/to/attachments" \
      --output-dir assets/img \
      汪燠欣 吕凯
"""

from __future__ import annotations

import argparse
import io
from pathlib import Path

from PIL import Image, ImageOps


TARGET_SIZE = (400, 400)
MAX_BYTES = 25_000
MIN_QUALITY = 35
MAX_QUALITY = 95
SUPPORTED_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--max-bytes", type=int, default=MAX_BYTES)
    parser.add_argument(
        "--centering-y",
        type=float,
        default=0.4,
        help="Vertical crop center from 0 (top) to 1 (bottom).",
    )
    parser.add_argument("names", nargs="+")
    return parser.parse_args()


def find_source(input_dir: Path, name: str) -> Path:
    matches = [
        path
        for path in input_dir.iterdir()
        if path.is_file()
        and path.suffix.lower() in SUPPORTED_SUFFIXES
        and path.stem.split("(")[0].strip() == name
    ]
    if not matches:
        raise FileNotFoundError(f"No attachment found for {name}")
    if len(matches) > 1:
        raise RuntimeError(
            f"Multiple attachments found for {name}: "
            + ", ".join(path.name for path in matches)
        )
    return matches[0]


def flatten_to_rgb(image: Image.Image) -> Image.Image:
    if image.mode in {"RGBA", "LA"} or (
        image.mode == "P" and "transparency" in image.info
    ):
        rgba = image.convert("RGBA")
        background = Image.new("RGBA", rgba.size, "white")
        background.alpha_composite(rgba)
        return background.convert("RGB")
    return image.convert("RGB")


def encode_jpeg(image: Image.Image, quality: int) -> bytes:
    buffer = io.BytesIO()
    image.save(
        buffer,
        "JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
        subsampling="4:2:0",
    )
    return buffer.getvalue()


def best_jpeg_under_limit(image: Image.Image, max_bytes: int) -> tuple[bytes, int]:
    best: tuple[bytes, int] | None = None
    low, high = MIN_QUALITY, MAX_QUALITY
    while low <= high:
        quality = (low + high) // 2
        encoded = encode_jpeg(image, quality)
        if len(encoded) <= max_bytes:
            best = (encoded, quality)
            low = quality + 1
        else:
            high = quality - 1
    if best is None:
        encoded = encode_jpeg(image, MIN_QUALITY)
        raise RuntimeError(
            f"Cannot meet {max_bytes} byte limit at quality {MIN_QUALITY}; "
            f"encoded size is {len(encoded)} bytes"
        )
    return best


def main() -> None:
    args = parse_args()
    if not 0 <= args.centering_y <= 1:
        raise ValueError("--centering-y must be between 0 and 1")
    args.output_dir.mkdir(parents=True, exist_ok=True)

    for name in args.names:
        source = find_source(args.input_dir, name)
        with Image.open(source) as opened:
            original_size = opened.size
            image = flatten_to_rgb(ImageOps.exif_transpose(opened))
        image = ImageOps.fit(
            image,
            TARGET_SIZE,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, args.centering_y),
        )
        encoded, quality = best_jpeg_under_limit(image, args.max_bytes)
        output = args.output_dir / f"{name}.jpg"
        output.write_bytes(encoded)
        print(
            f"{name}: {source.name} {original_size[0]}x{original_size[1]} "
            f"-> {output.name} 400x400 {len(encoded)} bytes q{quality}"
        )


if __name__ == "__main__":
    main()
