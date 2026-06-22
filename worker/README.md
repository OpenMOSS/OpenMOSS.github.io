# Blog view counter — Cloudflare Worker

A tiny Worker + KV namespace that stores one read count per blog post, so the
static GitHub Pages site can show "👁 N reads" on posts and listing cards.

```
worker/
  views-worker.js   the Worker (KV-backed counter, CORS-guarded)
  wrangler.toml     deploy config (fill in your KV namespace id)
  test.mjs          unit tests (node worker/test.mjs) — no account needed
  dev-server.mjs    local server with in-memory KV (node worker/dev-server.mjs)
```

The client side lives in `../assets/js/views.js`. **Until you set the Worker URL
there, the whole feature is a no-op** and the live site is unchanged.

## API

| Method & path | Purpose |
| --- | --- |
| `POST /hit` body `{"path":"/blog/en/<slug>/"}` | increment, returns `{path,count}` |
| `GET /count?path=/blog/en/<slug>/` | read one (no increment) |
| `GET /counts?paths=/blog/en/a/,/blog/cn/b/` | batch read (no increment) |

Only `/blog/{en,cn}/<slug>/` paths are accepted; bots/link-preview fetchers are
not counted; CORS is locked to `openmoss.ai` (+ `localhost:8000` for dev).

## Local testing (no Cloudflare account)

```bash
node worker/test.mjs                 # unit tests
node worker/dev-server.mjs           # serves the counter on :8787 (in-memory KV)
python -m http.server 8000           # serve the site, in another terminal
```

`assets/js/views.js` auto-targets `http://localhost:8787` when the site is opened
from `localhost`, so the counter works locally with no edits. Open
`http://localhost:8000/blog/en/scientific-taste/` and `http://localhost:8000/#blog`.

## Deploy

Requires a free Cloudflare account. From this `worker/` folder:

```bash
npx wrangler login                       # one-time auth
npx wrangler kv namespace create VIEWS   # prints an id...
#   -> paste that id into wrangler.toml ([[kv_namespaces]] id = "...")
npx wrangler deploy                      # prints https://openmoss-views.<you>.workers.dev
```

(Optional) put it on a custom route like `https://api.openmoss.ai/...` from the
Cloudflare dashboard if `openmoss.ai` is on Cloudflare DNS.

## Go live on the site

1. Edit `assets/js/views.js` → set `OM_VIEWS_API` to your deployed Worker URL
   (no trailing slash).
2. Bust caches so visitors fetch the new files. Pass the **same** version to both
   scripts — `views.js` is referenced from the homepage *and* the blog pages, so a
   shared `?v=` keeps it a single cache entry:
   ```bash
   V=$(date -u +%Y%m%d%H%M%S)
   python scripts/bump-blog-assets.py "$V"   # posts + CN listing + blog-chrome.js
   python scripts/bump_version.py "$V"       # homepage (index.html)
   ```
3. Commit & push `assets/js/views.js`, `blog/blog-chrome.js`, `index.html`, and
   the stamped blog pages. GitHub Pages auto-deploys to openmoss.ai.

## Notes

- KV is eventually consistent and `/hit` is read-modify-write, so a few hits can
  be lost under heavy concurrent load — fine for a blog. For exact counts, move
  `/hit` to a Durable Object.
- The client records at most one hit per post per browser session
  (`sessionStorage`), so reloads don't inflate the count.
- Free tier is ample: KV allows 100k reads/day and 1k writes/day.
