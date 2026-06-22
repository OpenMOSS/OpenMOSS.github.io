/* OpenMOSS blog — view counter (client side).
 *
 * Talks to the Cloudflare Worker (see /worker) to:
 *   - record one "read" per post page (once per browser session), and
 *   - show read counts on the blog listings.
 *
 * Loaded in three contexts:
 *   - every Distill post + the CN listing  -> via /blog/blog-chrome.js
 *   - the homepage /#blog listing           -> via index.html
 *
 * Until OM_VIEWS_API points at your deployed Worker, this script is a no-op
 * (the site renders exactly as before). To go live, see /worker/README.md:
 *   1. deploy the Worker, then set OM_VIEWS_API below to its URL, and
 *   2. bump the asset versions (scripts/bump-blog-assets.py + bump_version.py).
 */
(function () {
  "use strict";

  // ⬇⬇⬇  Set to your deployed Worker URL (no trailing slash). Empty = disabled.
  var OM_VIEWS_API = "https://openmoss-views.xipengqiu.workers.dev";

  // Local dev convenience: when serving the site at localhost:8000 alongside
  // `node worker/dev-server.mjs`, target that dev server automatically.
  if (!OM_VIEWS_API && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    OM_VIEWS_API = "http://localhost:8787";
  }
  if (!OM_VIEWS_API) return; // disabled until configured
  if (window.__omViews) return; // idempotent across both load paths
  window.__omViews = true;

  // Bounded slug length keeps "v:" + path under Cloudflare KV's 512-byte key cap
  // and matches the Worker's regex.
  var PATH_RE = /^\/blog\/(en|cn)\/[A-Za-z0-9._-]{1,200}\/$/;

  // Canonicalize a path the same way the Worker does; null if not a post path.
  function norm(p) {
    if (!p) return null;
    p = p.split("#")[0].split("?")[0];
    if (p.slice(-10) === "index.html") p = p.slice(0, -10);
    if (p.charAt(0) !== "/") p = "/" + p;
    if (p.charAt(p.length - 1) !== "/") p += "/";
    return PATH_RE.test(p) ? p : null;
  }

  function fmt(n) {
    try {
      return (n || 0).toLocaleString("en-US");
    } catch (e) {
      return String(n || 0);
    }
  }

  function api(pathAndQuery, postBody) {
    var opts = { cache: "no-store" };
    if (postBody) {
      opts.method = "POST";
      opts.headers = { "Content-Type": "application/json" };
      opts.body = JSON.stringify(postBody);
    }
    return fetch(OM_VIEWS_API + pathAndQuery, opts)
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .catch(function () {
        return null;
      });
  }

  var EYE =
    '<svg class="om-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';

  function injectStyle() {
    if (document.getElementById("om-views-style")) return;
    var css =
      ".om-views{display:inline-flex;align-items:center;gap:5px;color:#51607a;" +
      'font-size:.92rem;line-height:1.4;font-family:"Roboto","Noto Sans SC",system-ui,sans-serif;}' +
      ".om-views .om-eye{width:1.05em;height:1.05em;flex:0 0 auto;opacity:.72;}" +
      ".om-views-num{font-variant-numeric:tabular-nums;}" +
      ".om-views-label{opacity:.85;}" +
      "d-title .om-views{grid-column:text;margin-top:1.15rem;}" +
      ".om-views-row{font-size:.8rem;margin-top:8px;}" +
      ".om-views--pending{display:none !important;}";
    var s = document.createElement("style");
    s.id = "om-views-style";
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  // ---------- post page: record a hit, show the counter ----------
  function initPost() {
    var path = norm(location.pathname);
    if (!path || !document.querySelector("d-article")) return; // not a post page
    var zh = location.pathname.indexOf("/blog/en/") === -1;

    function show(n) {
      if (typeof n !== "number") return;
      var title = document.querySelector("d-title");
      if (!title || title.querySelector(".om-views")) return;
      var el = document.createElement("div");
      el.className = "om-views";
      el.setAttribute("role", "img");
      el.setAttribute("aria-label", fmt(n) + (zh ? " 次阅读" : " reads"));
      el.innerHTML =
        EYE +
        '<span class="om-views-num">' + fmt(n) + "</span>" +
        '<span class="om-views-label">' + (zh ? "次阅读" : "reads") + "</span>";
      title.appendChild(el);
    }

    var key = "om_v_" + path;
    var seen = false;
    try {
      seen = sessionStorage.getItem(key) === "1";
    } catch (e) {}

    if (seen) {
      api("/count?path=" + encodeURIComponent(path)).then(function (r) {
        if (r) show(r.count);
      });
    } else {
      api("/hit", { path: path }).then(function (r) {
        if (r && typeof r.count === "number") {
          try {
            sessionStorage.setItem(key, "1");
          } catch (e) {}
          show(r.count);
        }
      });
    }
  }

  // ---------- listings: batch-read counts onto cards (read-only) ----------
  function badgeEl() {
    var b = document.createElement("span");
    b.className = "om-views om-views-row om-views--pending";
    b.setAttribute("role", "img"); // aria-label is set once the count arrives
    b.innerHTML = EYE + '<span class="om-views-num"></span>';
    return b;
  }

  function enhanceListings() {
    var jobs = [];

    // Homepage /#blog rows: <a class="blog-row" href="/blog/<lang>/<slug>/">
    document.querySelectorAll("a.blog-row").forEach(function (a) {
      if (a.__omv) return;
      var p = norm(a.getAttribute("href") || "");
      if (!p) return;
      a.__omv = true;
      var slot = a.querySelector(".blog-row-main") || a;
      var badge = badgeEl();
      slot.appendChild(badge);
      jobs.push({ badge: badge, path: p });
    });

    // CN standalone listing: .post-preview > a[href="<slug>/"]
    document.querySelectorAll(".post-preview").forEach(function (card) {
      if (card.__omv) return;
      var a = card.querySelector("a[href]");
      if (!a) return;
      var p;
      try {
        p = norm(new URL(a.getAttribute("href"), location.href).pathname);
      } catch (e) {
        p = null;
      }
      if (!p) return;
      card.__omv = true;
      var slot = card.querySelector(".metadata") || card;
      var badge = badgeEl();
      slot.appendChild(badge);
      jobs.push({ badge: badge, path: p });
    });

    if (!jobs.length) return;

    var seen = {};
    var paths = [];
    jobs.forEach(function (j) {
      if (!seen[j.path]) {
        seen[j.path] = 1;
        paths.push(j.path);
      }
    });

    // Chunk to match the Worker's MAX_BATCH (100) so no card is silently dropped
    // once the archive grows past 100 posts on one page.
    var CHUNK = 100;
    var batches = [];
    for (var i = 0; i < paths.length; i += CHUNK) batches.push(paths.slice(i, i + CHUNK));

    Promise.all(
      batches.map(function (b) {
        return api("/counts?paths=" + encodeURIComponent(b.join(","))).then(function (r) {
          return (r && r.counts) || {};
        });
      })
    ).then(function (parts) {
      var counts = {};
      parts.forEach(function (p) {
        for (var k in p) counts[k] = p[k];
      });
      jobs.forEach(function (j) {
        var n = counts[j.path];
        if (typeof n === "number") {
          var zh = j.path.indexOf("/blog/en/") === -1;
          j.badge.querySelector(".om-views-num").textContent = fmt(n);
          j.badge.setAttribute("aria-label", fmt(n) + (zh ? " 次阅读" : " reads"));
          j.badge.classList.remove("om-views--pending");
        } else {
          j.badge.remove(); // unknown -> show nothing rather than an empty badge
        }
      });
    });
  }

  function start() {
    injectStyle();
    initPost();
    enhanceListings();

    // Only the homepage is a SPA. spa.js replaces #spa-view's innerHTML wholesale
    // on each route change, so a childList observer on that element catches
    // re-renders without firing on our own (deeper) badge writes. Static pages
    // (posts, CN listing) have no #app and need no observer — the initial
    // enhanceListings() above already covers them.
    if (!document.getElementById("app")) return;
    var pending = false;
    var mo = new MutationObserver(function () {
      if (pending) return;
      pending = true;
      setTimeout(function () {
        pending = false;
        enhanceListings();
      }, 120);
    });
    var tries = 0;
    (function attach() {
      var sv = document.getElementById("spa-view");
      if (sv) mo.observe(sv, { childList: true });
      else if (++tries < 60) setTimeout(attach, 50);
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
