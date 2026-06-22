/* OpenMOSS blog — inject the main-site header (nav) + footer onto Distill
 * articles so they share the homepage's chrome. Language is detected from the
 * URL (/blog/cn/ vs /blog/en/); nav links point back to the main site. */
(function () {
  function init() {
    if (document.querySelector("nav.om-navbar")) return; // idempotent

    var path = location.pathname;
    var lang = path.indexOf("/blog/en/") !== -1 ? "en" : "zh";
    var other = lang === "zh"
      ? path.replace("/blog/cn/", "/blog/en/")
      : path.replace("/blog/en/", "/blog/cn/");

    var T = {
      zh: {
        home: "首页", people: "团队成员", alumni: "校友网络", resources: "开放资源",
        positions: "加入我们", blog: "研究博客",
        contact: "联系方式", address: "通信地址",
        a1pre: "徐汇区华发路699弄3号 ", a1link: "上海创智学院",
        a2pre: "杨浦区淞沪路2005号 ", a2link: "复旦大学", a2post: " 二号交叉学科楼",
        a3: "中国 上海", partners: "合作单位",
        fudan: "复旦大学计算与智能创新学院", teai: "复旦大学可信具身智能研究院",
        nlp: "复旦大学自然语言处理实验室", dev: "开发团队"
      },
      en: {
        home: "Home", people: "People", alumni: "Alumni", resources: "Resources",
        positions: "Join Us", blog: "Blog",
        contact: "Contact", address: "Address",
        a1pre: "Shanghai Innovation Institute, 3 Lane 699, Huafa Road, Xuhui District", a1link: "",
        a2pre: "Building X2, Fudan University, No. 2005 Songhu Road, Yangpu District", a2link: "", a2post: "",
        a3: "Shanghai, China", partners: "Affiliations",
        fudan: "School of Computer Science and Innovation, Fudan University",
        teai: "Institute of Trustworthy Embodied Intelligence, Fudan University",
        nlp: "The Fudan University Natural Language Processing Group", dev: "Developers"
      }
    }[lang];

    var S = "/"; // main site root

    // ---------- header ----------
    var nav = document.createElement("nav");
    nav.className = "om-navbar";
    nav.innerHTML =
      '<div class="om-container nav-container">' +
        '<a class="brand" href="' + S + '"><img class="brand-logo" src="/assets/img/openmoss-logo.svg" alt="OpenMOSS"></a>' +
        '<button class="nav-toggle" type="button" aria-label="menu"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>' +
        '<ul class="nav-links">' +
          '<li><a href="' + S + '#home">' + T.home + "</a></li>" +
          '<li><a href="' + S + '#people">' + T.people + "</a></li>" +
          '<li><a href="' + S + '#alumni">' + T.alumni + "</a></li>" +
          '<li><a href="' + S + '#resources">' + T.resources + "</a></li>" +
          '<li><a href="' + S + '#joinus">' + T.positions + "</a></li>" +
          '<li><a class="active" href="' + S + '#blog">' + T.blog + "</a></li>" +
          '<li><button class="lang-btn" type="button"><span class="lang-text' + (lang === "zh" ? " active" : "") + '">中</span><span class="lang-separator">|</span><span class="lang-text' + (lang === "en" ? " active" : "") + '">EN</span></button></li>' +
        "</ul>" +
      "</div>";
    document.body.insertBefore(nav, document.body.firstChild);
    nav.querySelector(".nav-toggle").addEventListener("click", function () {
      nav.querySelector(".nav-links").classList.toggle("open");
    });
    nav.querySelector(".lang-btn").addEventListener("click", function () {
      if (other && other !== path) location.href = other;
    });

    // ---------- footer ----------
    var a1 = T.a1link
      ? T.a1pre + '<a href="https://www.sii.edu.cn/" target="_blank" class="footer-inline-link">' + T.a1link + "</a>"
      : T.a1pre;
    var a2 = T.a2link
      ? T.a2pre + '<a href="https://www.fudan.edu.cn/" target="_blank" class="footer-inline-link">' + T.a2link + "</a>" + T.a2post
      : T.a2pre;

    // Inline SVG icons (replaces the Font Awesome CDN — one fewer blocking request)
    var IC = {
      github: '<span class="om-footer-icon"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg></span>',
      x: '<span class="om-footer-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg></span>',
      mail: '<span class="om-footer-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg></span>'
    };

    var foot = document.createElement("footer");
    foot.className = "om-footer";
    foot.innerHTML =
      '<div class="om-container"><div class="footer-grid">' +
        "<div><h4>" + T.contact + "</h4><ul>" +
          '<li><a class="om-contact-link" href="https://github.com/OpenMOSS" target="_blank" rel="noopener">' + IC.github + " GitHub</a></li>" +
          '<li><a class="om-contact-link" href="https://x.com/Open_MOSS" target="_blank" rel="noopener">' + IC.x + " Twitter</a></li>" +
          '<li><a class="om-contact-link" href="mailto:llm@fudan.edu.cn">' + IC.mail + " Email</a></li>" +
        "</ul></div>" +
        "<div><h4>" + T.address + "</h4><ul><li>" + a1 + "</li><li>" + a2 + "</li><li>" + T.a3 + "</li></ul></div>" +
        "<div><h4>" + T.partners + "</h4><ul>" +
          '<li><a href="https://ai.fudan.edu.cn/" target="_blank">' + T.fudan + "</a></li>" +
          '<li><a href="https://teai.fudan.edu.cn/" target="_blank">' + T.teai + "</a></li>" +
          '<li><a href="https://nlp.fudan.edu.cn/main.htm" target="_blank">' + T.nlp + "</a></li>" +
        "</ul></div>" +
      "</div></div>" +
      '<div class="om-container"><div class="footer-note"><p><a href="' + S + '#webmaster">' + T.dev + "</a> | © 2026 OpenMOSS Team</p></div></div>";
    document.body.appendChild(foot);

    // Bundle-rendered articles (e.g. data-mixing-laws) inject their content into
    // <body> asynchronously, which can land after our footer. Keep the nav first
    // and the footer last whenever the body's children change.
    function reorder() {
      if (document.body.firstElementChild !== nav) document.body.insertBefore(nav, document.body.firstChild);
      if (document.body.lastElementChild !== foot) document.body.appendChild(foot);
    }
    var mo = new MutationObserver(reorder);
    mo.observe(document.body, { childList: true });
    function settle() { reorder(); setTimeout(function () { reorder(); mo.disconnect(); }, 3000); }
    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle);
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);

  // Load the shared view-counter module (covers every post + the CN listing).
  // It is a no-op until its Worker URL is configured — see /worker/README.md.
  if (!document.querySelector("script[data-om-views]")) {
    var vs = document.createElement("script");
    vs.src = "/assets/js/views.js?v=4";
    vs.defer = true;
    vs.setAttribute("data-om-views", "");
    (document.head || document.documentElement).appendChild(vs);
  }
})();
