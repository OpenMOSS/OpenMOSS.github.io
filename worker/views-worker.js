/**
 * OpenMOSS blog — view-counter Worker (Cloudflare Workers + KV).
 *
 * Stores one integer per blog post under KV key `v:<slug>`. The language segment
 * is intentionally dropped so the EN and CN versions of a post share one merged
 * count, e.g. both /blog/en/scientific-taste/ and /blog/cn/scientific-taste/
 * read and write `v:scientific-taste`.
 *
 * Routes (all JSON, CORS-guarded):
 *   POST /hit     body {"path":"/blog/en/<slug>/"}        -> increment, returns {path,count}
 *   GET  /count?path=/blog/en/<slug>/                      -> read one,  returns {path,count}
 *   GET  /counts?paths=/blog/en/a/,/blog/cn/b/             -> read many, returns {counts:{...}}
 *
 * Binding: KV namespace `VIEWS` (see wrangler.toml).
 *
 * Accuracy note: KV is eventually consistent and `/hit` is a read-modify-write,
 * so under heavy concurrent traffic a few hits may be lost. That is acceptable
 * for a blog view counter. For exact counts, move `/hit` to a Durable Object.
 */

const ALLOWED_ORIGINS = [
  "https://openmoss.ai",
  "https://www.openmoss.ai",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
];

// Only count real post paths: /blog/{en,cn}/<slug>/ . Slugs are [A-Za-z0-9._-].
// The length cap keeps "v:" + path under Cloudflare KV's 512-byte key limit.
const PATH_RE = /^\/blog\/(en|cn)\/[A-Za-z0-9._-]{1,200}\/$/;
const MAX_BATCH = 100;
const BOT_RE = /bot|crawl|spider|slurp|bing|baidu|yandex|sogou|duckduck|facebookexternalhit|embedly|quora|pinterest|slackbot|telegrambot|whatsapp|preview|monitor|headless|lighthouse|gtmetrix|pingdom|uptime|curl|wget|python-requests|axios|node-fetch/i;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, origin, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(origin),
    },
  });
}

// Canonicalize a candidate path; return null if it is not a valid post path.
function normalize(p) {
  if (typeof p !== "string") return null;
  try {
    p = decodeURIComponent(p);
  } catch (e) {
    return null;
  }
  p = p.split("#")[0].split("?")[0].trim();
  if (p.endsWith("index.html")) p = p.slice(0, -"index.html".length);
  if (!p.startsWith("/")) p = "/" + p;
  if (!p.endsWith("/")) p += "/";
  return PATH_RE.test(p) ? p : null;
}

// Lang-merged count key: EN and CN versions of a post share one counter, keyed
// by slug. e.g. /blog/en/scientific-taste/ and /blog/cn/scientific-taste/ both
// map to "v:scientific-taste".
function countKey(path) {
  const m = path.match(/^\/blog\/(?:en|cn)\/([A-Za-z0-9._-]+)\/$/);
  return "v:" + (m ? m[1] : path);
}

async function readCount(env, path) {
  const v = await env.VIEWS.get(countKey(path));
  const n = parseInt(v || "0", 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    try {
      return await handle(request, env, origin);
    } catch (e) {
      // Any unexpected/transient KV error still returns a CORS-headed JSON error
      // (an unhandled throw would yield a bare 500 with no CORS, masking the cause).
      return json({ error: "server error" }, origin, 502);
    }
  },
};

async function handle(request, env, origin) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  // POST /hit -> increment and return the new count
  if (request.method === "POST" && url.pathname === "/hit") {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "bad json" }, origin, 400);
    }
    const path = normalize(body && body.path);
    if (!path) return json({ error: "bad path" }, origin, 400);

    const ua = request.headers.get("User-Agent") || "";
    if (BOT_RE.test(ua)) {
      // Don't inflate counts with bots / link-preview fetchers.
      return json({ path, count: await readCount(env, path), bot: true }, origin);
    }
    const count = (await readCount(env, path)) + 1;
    await env.VIEWS.put(countKey(path), String(count));
    return json({ path, count }, origin);
  }

  // GET /count?path=... -> single read (never increments)
  if (request.method === "GET" && url.pathname === "/count") {
    const path = normalize(url.searchParams.get("path"));
    if (!path) return json({ error: "bad path" }, origin, 400);
    return json({ path, count: await readCount(env, path) }, origin);
  }

  // GET /counts?paths=a,b,c -> batch read (never increments)
  if (request.method === "GET" && url.pathname === "/counts") {
    const raw = url.searchParams.get("paths") || "";
    const seen = new Set();
    const paths = [];
    for (const part of raw.split(",")) {
      const path = normalize(part);
      if (path && !seen.has(path)) {
        seen.add(path);
        paths.push(path);
      }
      if (paths.length >= MAX_BATCH) break;
    }
    const counts = {};
    await Promise.all(
      paths.map(async (p) => {
        counts[p] = await readCount(env, p);
      })
    );
    return json({ counts }, origin);
  }

  return json({ error: "not found" }, origin, 404);
}
