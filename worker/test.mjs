/**
 * Unit tests for views-worker.js — run with:  node worker/test.mjs
 * Uses an in-memory KV mock; no Cloudflare account or network needed.
 */
import worker from "./views-worker.js";

function mockEnv() {
  const m = new Map();
  return {
    VIEWS: {
      get: async (k) => (m.has(k) ? m.get(k) : null),
      put: async (k, v) => void m.set(k, String(v)),
    },
    _store: m,
  };
}

function req(method, path, { body, origin, ua } = {}) {
  const headers = {};
  if (origin) headers.Origin = origin;
  headers["User-Agent"] = ua || "Mozilla/5.0 (Test Browser)";
  const init = { method, headers };
  if (body !== undefined) {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  return new Request("https://views.example.workers.dev" + path, init);
}

let pass = 0;
let fail = 0;
function ok(name, cond) {
  if (cond) {
    pass++;
  } else {
    fail++;
    console.error("  ✗ FAIL:", name);
  }
}
async function jbody(resp) {
  return JSON.parse(await resp.text());
}

const ORIGIN = "https://openmoss.ai";
const P = "/blog/en/scientific-taste/";

async function main() {
  // OPTIONS preflight
  {
    const env = mockEnv();
    const r = await worker.fetch(req("OPTIONS", "/hit", { origin: ORIGIN }), env);
    ok("OPTIONS -> 204", r.status === 204);
    ok("OPTIONS echoes allowed origin", r.headers.get("Access-Control-Allow-Origin") === ORIGIN);
  }

  // hit increments 0 -> 1 -> 2
  {
    const env = mockEnv();
    let r = await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: ORIGIN }), env);
    let b = await jbody(r);
    ok("first hit count = 1", b.count === 1);
    ok("hit echoes normalized path", b.path === P);
    ok("hit sets CORS", r.headers.get("Access-Control-Allow-Origin") === ORIGIN);
    r = await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: ORIGIN }), env);
    b = await jbody(r);
    ok("second hit count = 2", b.count === 2);
  }

  // bot UA does not increment
  {
    const env = mockEnv();
    await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: ORIGIN }), env); // -> 1
    const r = await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: ORIGIN, ua: "Googlebot/2.1" }), env);
    const b = await jbody(r);
    ok("bot hit does not increment (stays 1)", b.count === 1 && b.bot === true);
  }

  // path normalization: index.html stripped, trailing slash added
  {
    const env = mockEnv();
    await worker.fetch(req("POST", "/hit", { body: { path: "/blog/en/scientific-taste/index.html" }, origin: ORIGIN }), env);
    const r = await worker.fetch(req("GET", "/count?path=" + encodeURIComponent(P), { origin: ORIGIN }), env);
    const b = await jbody(r);
    ok("index.html normalizes to slug/", b.count === 1);
  }

  // bad / non-blog paths rejected
  {
    const env = mockEnv();
    let r = await worker.fetch(req("POST", "/hit", { body: { path: "/etc/passwd" }, origin: ORIGIN }), env);
    ok("non-blog path -> 400", r.status === 400);
    r = await worker.fetch(req("POST", "/hit", { body: { path: "/blog/en/" }, origin: ORIGIN }), env); // no slug
    ok("listing path (no slug) -> 400", r.status === 400);
    r = await worker.fetch(req("POST", "/hit", { body: "{not json", origin: ORIGIN }), env);
    ok("malformed json -> 400", r.status === 400);
  }

  // GET /count does not increment
  {
    const env = mockEnv();
    await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: ORIGIN }), env); // -> 1
    let r = await worker.fetch(req("GET", "/count?path=" + encodeURIComponent(P), { origin: ORIGIN }), env);
    let b = await jbody(r);
    ok("count read = 1", b.count === 1);
    r = await worker.fetch(req("GET", "/count?path=" + encodeURIComponent(P), { origin: ORIGIN }), env);
    b = await jbody(r);
    ok("count read does not increment (still 1)", b.count === 1);
    r = await worker.fetch(req("GET", "/count?path=" + encodeURIComponent("/blog/en/never-viewed/"), { origin: ORIGIN }), env);
    b = await jbody(r);
    ok("unknown post count = 0", b.count === 0);
  }

  // batch /counts: dedupes, returns a map, skips junk
  {
    const env = mockEnv();
    const A = "/blog/en/a/";
    const B = "/blog/cn/b/";
    await worker.fetch(req("POST", "/hit", { body: { path: A }, origin: ORIGIN }), env);
    await worker.fetch(req("POST", "/hit", { body: { path: A }, origin: ORIGIN }), env); // A=2
    await worker.fetch(req("POST", "/hit", { body: { path: B }, origin: ORIGIN }), env); // B=1
    const paths = [A, A, B, "/etc/passwd"].join(",");
    const r = await worker.fetch(req("GET", "/counts?paths=" + encodeURIComponent(paths), { origin: ORIGIN }), env);
    const b = await jbody(r);
    ok("batch A=2", b.counts[A] === 2);
    ok("batch B=1", b.counts[B] === 1);
    ok("batch drops junk path", !("/etc/passwd" in b.counts) && Object.keys(b.counts).length === 2);
  }

  // disallowed origin falls back to canonical
  {
    const env = mockEnv();
    const r = await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: "https://evil.example.com" }), env);
    ok("disallowed origin -> canonical CORS", r.headers.get("Access-Control-Allow-Origin") === "https://openmoss.ai");
  }

  // unknown route -> 404
  {
    const env = mockEnv();
    const r = await worker.fetch(req("GET", "/nope", { origin: ORIGIN }), env);
    ok("unknown route -> 404", r.status === 404);
  }

  // oversized slug rejected before it can build an over-512-byte KV key
  {
    const env = mockEnv();
    const big = "/blog/en/" + "a".repeat(201) + "/";
    const r = await worker.fetch(req("POST", "/hit", { body: { path: big }, origin: ORIGIN }), env);
    ok("oversized slug -> 400", r.status === 400);
  }

  // a KV exception returns a CORS-headed 502, not a bare uncaught 500
  {
    const throwingEnv = {
      VIEWS: {
        get: async () => {
          throw new Error("kv down");
        },
        put: async () => {
          throw new Error("kv down");
        },
      },
    };
    const r = await worker.fetch(req("POST", "/hit", { body: { path: P }, origin: ORIGIN }), throwingEnv);
    ok("KV throw -> 502", r.status === 502);
    ok("KV throw keeps CORS header", r.headers.get("Access-Control-Allow-Origin") === ORIGIN);
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail > 0) process.exit(1);
}

main();
