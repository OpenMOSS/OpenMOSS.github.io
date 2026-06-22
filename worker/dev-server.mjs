/**
 * Local dev server for the view counter — run with:  node worker/dev-server.mjs
 *
 * Wraps the real Worker (views-worker.js) with an in-memory KV so you can test
 * the blog against it without a Cloudflare account. Listens on :8787, which is
 * the URL that assets/js/views.js auto-targets when the site is served from
 * localhost. State is NOT persisted (resets when the process restarts).
 */
import http from "node:http";
import worker from "./views-worker.js";

const store = new Map();
const env = {
  VIEWS: {
    get: async (k) => (store.has(k) ? store.get(k) : null),
    put: async (k, v) => void store.set(k, String(v)),
  },
};

const PORT = Number(process.env.PORT) || 8787;

http
  .createServer(async (nodeReq, nodeRes) => {
    try {
      const url = "http://" + (nodeReq.headers.host || "localhost:" + PORT) + nodeReq.url;
      let body;
      if (["POST", "PUT", "PATCH"].includes(nodeReq.method)) {
        body = await new Promise((resolve) => {
          let d = "";
          nodeReq.on("data", (c) => (d += c));
          nodeReq.on("end", () => resolve(d));
        });
      }
      const request = new Request(url, { method: nodeReq.method, headers: nodeReq.headers, body });
      const resp = await worker.fetch(request, env);
      const headers = {};
      resp.headers.forEach((v, k) => (headers[k] = v));
      nodeRes.writeHead(resp.status, headers);
      nodeRes.end(await resp.text());
    } catch (e) {
      nodeRes.writeHead(500, { "Content-Type": "application/json" });
      nodeRes.end(JSON.stringify({ error: String(e) }));
    }
  })
  .listen(PORT, () => {
    console.log("views dev server (in-memory KV) on http://localhost:" + PORT);
  });
