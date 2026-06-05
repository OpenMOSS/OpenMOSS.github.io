#!/usr/bin/env python3
"""Stamp ONE cache-busting version onto every ``?v=`` asset query in index.html.

Usage:
    python scripts/bump_version.py [VERSION]

If VERSION is omitted, the current UTC timestamp (YYYYMMDDHHMMSS) is used.

Run this in CI right before the Pages upload (e.g.
``python scripts/bump_version.py "${GITHUB_SHA::12}"``) so that every deploy
stamps *all* assets with one fresh, identical version. This removes the need to
hand-edit ``?v=`` on each asset and prevents the versions from drifting apart
(e.g. CSS on one value, JS on another), which silently serves stale files.
"""
import datetime
import pathlib
import re
import sys

INDEX = pathlib.Path(__file__).resolve().parent.parent / "index.html"


def main() -> int:
    if len(sys.argv) > 1:
        version = sys.argv[1]
    else:
        version = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S")

    # keep it short and URL-safe
    version = re.sub(r"[^A-Za-z0-9._-]", "", version)[:40] or "0"

    html = INDEX.read_text(encoding="utf-8")
    new_html, n = re.subn(r"(\?v=)[^\"'&]+", r"\g<1>" + version, html)
    if n == 0:
        print("error: no ?v= asset tokens found in index.html", file=sys.stderr)
        return 1
    INDEX.write_text(new_html, encoding="utf-8")
    print(f"stamped {n} asset(s) with ?v={version}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
