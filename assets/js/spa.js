(function () {
  const routes = {
    home: renderHome,
    blog: renderBlog,
    people: renderPeople,
    alumni: renderAlumni,
    resources: renderResources,
    positions: renderPositions,
    webmaster: renderWebmaster
  };

  let currentLang = 'zh';

  // 研究方向支柱（首页与研究页共用）
  const PILLARS = [
    { key: 'reasoning', titleKey: 'pillar.reasoning.title', descKey: 'pillar.reasoning.desc' },
    { key: 'multimodal', titleKey: 'pillar.multimodal.title', descKey: 'pillar.multimodal.desc' },
    { key: 'embodied', titleKey: 'pillar.embodied.title', descKey: 'pillar.embodied.desc' },
    { key: 'infra', titleKey: 'pillar.infra.title', descKey: 'pillar.infra.desc' },
    { key: 'arch', titleKey: 'pillar.arch.title', descKey: 'pillar.arch.desc' },
    { key: 'safety', titleKey: 'pillar.safety.title', descKey: 'pillar.safety.desc' }
  ];

  // 翻译辅助函数
  function t(key) {
    return window.t ? window.t(key, currentLang) : key;
  }

  function setLanguage(lang, persist) {
    currentLang = lang === 'zh' ? 'zh' : 'en';
    window.currentLang = currentLang;
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    if (persist) localStorage.setItem('language', currentLang);
  }

  function pick(value, fallback) {
    if (value == null) return fallback || '';
    if (typeof value !== 'object') return value;
    return value[currentLang] || value.zh || value.en || fallback || '';
  }

  function init() {
    // 处理真实路径 /en/* 和 /cn/* 的重定向
    const pathname = window.location.pathname;
    if (pathname.startsWith('/en') || pathname.startsWith('/cn')) {
      window.location.href = 'https://openmoss.ai' + pathname + window.location.search + window.location.hash;
      return;
    }

    if (!window.SPA_DATA) {
      console.error('SPA_DATA 未加载');
      return;
    }
    // 从 localStorage 读取语言设置，或检测浏览器语言
    let savedLang = localStorage.getItem('language');
    if (!savedLang) {
      // 检测浏览器语言
      const browserLang = navigator.language || navigator.userLanguage;
      // 如果浏览器语言是中文（zh, zh-CN, zh-TW 等），使用中文，否则使用英文
      savedLang = browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }
    setLanguage(savedLang);
    renderShell();
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // 最新亮点：优先读取可编辑的 assets/highlights.md；失败则用内置数据
    fetch('assets/highlights.md?_=' + Date.now())
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (txt) {
        var parsed = parseHighlights(txt);
        if (parsed.length) {
          SPA_DATA.highlights = parsed;
          if ((parseHash().route || 'home') === 'blog') handleRoute();
        }
      })
      .catch(function () {});
  }

  // 解析 highlights.md：用 "---" 分隔各条，每行 "键: 值"（中英文键均可）
  function parseHighlights(text) {
    if (!text) return [];
    text = text.replace(/<!--[\s\S]*?-->/g, '');
    function splitTags(s) {
      return (s || '').split(/[,，、]/).map(function (x) { return x.trim(); }).filter(Boolean);
    }
    return text.split(/\n\s*-{3,}\s*\n/).map(function (block) {
      var h = { title: {}, desc: {}, tags: {} };
      block.split('\n').forEach(function (line) {
        var i = line.search(/[:：]/);
        if (i < 0) return;
        var k = line.slice(0, i).trim();
        var v = line.slice(i + 1).trim();
        if (!v) return;
        if (k === 'date' || k === '日期') h.date = v;
        else if (k === '标题' || k === 'title-zh') h.title.zh = v;
        else if (k === 'title' || k === 'title-en') h.title.en = v;
        else if (k === '描述' || k === 'desc-zh') h.desc.zh = v;
        else if (k === 'desc' || k === 'desc-en') h.desc.en = v;
        else if (k === '标签' || k === 'tags-zh') h.tags.zh = v;
        else if (k === 'tags' || k === 'tags-en') h.tags.en = v;
        else if (k === '图' || k === '图片' || k === 'image') h.image = v;
        else if (k === '链接' || k === 'url') h.url = v;
      });
      if (h.title.zh && !h.title.en) h.title.en = h.title.zh;
      if (h.title.en && !h.title.zh) h.title.zh = h.title.en;
      if (h.desc.zh && !h.desc.en) h.desc.en = h.desc.zh;
      if (h.desc.en && !h.desc.zh) h.desc.zh = h.desc.en;
      var tz = splitTags(h.tags.zh), te = splitTags(h.tags.en);
      h.tags = { zh: tz.length ? tz : te, en: te.length ? te : tz };
      return h;
    }).filter(function (h) { return h.date || h.title.zh || h.title.en; });
  }

  function renderShell() {
    const root = document.getElementById('app');

    const navItems = [
      { id: 'home', key: 'nav.home' },
      { id: 'people', key: 'nav.people' },
      { id: 'alumni', key: 'nav.alumni' },
      { id: 'resources', key: 'nav.resources' },
      { id: 'positions', key: 'nav.positions' },
      { id: 'blog', key: 'nav.blog' }
    ];

    root.innerHTML = `
      <nav class="navbar">
        <div class="container nav-container">
          <a class="brand" href="#home">
            <img class="brand-logo" src="assets/img/openmoss-logo.svg" alt="${SPA_DATA.brand.name}">
          </a>
          <button class="nav-toggle" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <ul class="nav-links" id="primary-navigation">
            ${navItems.map(item => `<li><a href="#${item.id}" data-route="${item.id}">${t(item.key)}</a></li>`).join('')}
            <li>
              <button class="lang-btn" id="lang-toggle" aria-label="切换语言">
                <span class="lang-text ${currentLang === 'zh' ? 'active' : ''}">中</span>
                <span class="lang-separator">|</span>
                <span class="lang-text ${currentLang === 'en' ? 'active' : ''}">EN</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <main id="spa-view"></main>
      ${renderFooter()}
    `;

    const toggle = root.querySelector('.nav-toggle');
    const nav = root.querySelector('#primary-navigation');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    const langBtn = root.querySelector('#lang-toggle');
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'zh' ? 'en' : 'zh', true);
      renderShell();
      handleRoute();
    });
  }

  function renderFooter() {
    const year = new Date().getFullYear();

    // 地址列表，支持内嵌链接
    const addresses = currentLang === 'zh' ? [
      '徐汇区华发路699弄3号 <a href="https://www.sii.edu.cn/" target="_blank" class="footer-inline-link">上海创智学院</a>',
      '杨浦区淞沪路2005号 <a href="https://www.fudan.edu.cn/" target="_blank" class="footer-inline-link">复旦大学</a> 二号交叉学科楼',
      '中国 上海'
    ] : [
      '<a href="https://www.sii.edu.cn/" target="_blank" class="footer-inline-link">Shanghai Innovation Institute</a>, 3 Lane 699, Huafa Road, Xuhui District',
      'Building X2, <a href="https://www.fudan.edu.cn/" target="_blank" class="footer-inline-link">Fudan University</a>, No. 2005 Songhu Road, Yangpu District',
      'Shanghai, China'
    ];

    const partners = [
      { label: t('footer.fudan'), url: 'https://ai.fudan.edu.cn/' },
      { label: t('footer.teai'), url: 'https://teai.fudan.edu.cn/' },
      { label: t('footer.nlp'), url: 'https://nlp.fudan.edu.cn/main.htm' }
    ];

    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <h4>${t('footer.contact')}</h4>
              <ul>
                ${SPA_DATA.footer.contactLinks.map(link => `
                  <li><a href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank"' : ''}><i class="${link.icon}"></i> ${link.label}</a></li>
                `).join('')}
              </ul>
            </div>
            <div>
              <h4>${t('footer.address')}</h4>
              <ul>
                ${addresses.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h4>${t('footer.partners')}</h4>
              <ul>
                ${partners.map(item => `<li><a href="${item.url}" target="_blank">${item.label}</a></li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="footer-note">
            <p><a href="#webmaster" style="color: rgba(255, 255, 255, 0.75); text-decoration: none;">${currentLang === 'zh' ? '开发团队' : 'Developers'}</a> | &copy; ${year} OpenMOSS Team</p>
          </div>
        </div>
      </footer>
    `;
  }

  function handleRoute() {
    const { route, params } = parseHash();
    const view = document.getElementById('spa-view');
    const renderFn = routes[route] || routes.home;
    view.innerHTML = renderFn(params);
    // 资源页渲染后填充 GitHub star（系列卡子仓库 + 总数）
    if (route === 'resources') hydrateProjectStars();
    if (route === 'home') initHomeReveal();
    updateNav(route);

    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 处理特定页面的锚点跳转
    if (route === 'positions' && params.section) {
      setTimeout(() => scrollToId(params.section, 120), 50);
    }
  }

  // 平滑滚动到指定元素（统一处理导航栏偏移，默认 100）
  function scrollToId(id, offset = 100) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // 先切换路由，再滚动到目标元素（用于跨页跳转）
  function navigateAndScroll(route, id, offset = 100, delay = 100) {
    window.location.hash = route;
    setTimeout(() => scrollToId(id, offset), delay);
  }

  // 兼容按钮点击的滚动（导航栏偏移 120）
  function scrollToSection(id) {
    scrollToId(id, 120);
  }

  // 将滚动函数暴露到全局作用域（供内联 onclick 调用）
  window.scrollToId = scrollToId;
  window.navigateAndScroll = navigateAndScroll;
  window.scrollToSection = scrollToSection;

  function parseHash() {
    const raw = window.location.hash.replace('#', '');
    if (!raw) return { route: 'home', params: {} };
    const [route, query] = raw.split('?');
    const params = new URLSearchParams(query || '');
    const paramObj = {};
    params.forEach((value, key) => { paramObj[key] = value; });
    return { route: route || 'home', params: paramObj };
  }

  function updateNav(active) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const isActive = link.dataset.route === active || (!active && link.dataset.route === 'home');
      link.classList.toggle('active', isActive);
    });
  }

  function initHomeReveal() {
    const intro = document.querySelector('.home-intro-reveal');
    if (!intro) return;
    if (!('IntersectionObserver' in window)) {
      intro.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          intro.classList.add('is-visible');
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(intro);
  }

  function renderHome() {
    return `
      <section class="home-hero">
        <div class="home-hero-motion" aria-hidden="true">
          <span class="home-hero-mist home-hero-mist-a"></span>
          <span class="home-hero-mist home-hero-mist-b"></span>
          <span class="home-hero-mist home-hero-mist-c"></span>
          <svg class="home-hero-cosmos" viewBox="0 0 1200 700" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-cosmos-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="rgba(14,65,156,0)" />
                <stop offset="0.5" stop-color="rgba(14,65,156,0.42)" />
                <stop offset="1" stop-color="rgba(86,228,254,0)" />
              </linearGradient>
            </defs>
            <path class="cosmos-orbit cosmos-orbit-a" d="M96 218 C300 72 900 72 1104 218" />
            <path class="cosmos-orbit cosmos-orbit-b" d="M176 512 C388 666 812 666 1024 512" />
            <path class="cosmos-line cosmos-line-a" d="M104 430 C252 318 380 298 510 352 S768 506 1092 342" />
            <path class="cosmos-line cosmos-line-b" d="M184 258 C376 394 522 174 700 276 S920 424 1052 228" />
            <path class="cosmos-line cosmos-line-c" d="M226 548 C404 426 500 462 632 380 S858 236 1044 292" />
            <path class="cosmos-signal cosmos-signal-a" d="M110 430 C258 318 380 298 510 352 S768 506 1092 342" />
            <path class="cosmos-signal cosmos-signal-b" d="M184 258 C376 394 522 174 700 276 S920 424 1052 228" />
            <circle class="cosmos-node node-a" cx="184" cy="258" r="3.5" />
            <circle class="cosmos-node node-b" cx="372" cy="314" r="2.5" />
            <circle class="cosmos-node node-c" cx="510" cy="352" r="4" />
            <circle class="cosmos-node node-d" cx="632" cy="380" r="3" />
            <circle class="cosmos-node node-e" cx="700" cy="276" r="3.5" />
            <circle class="cosmos-node node-f" cx="858" cy="236" r="2.5" />
            <circle class="cosmos-node node-g" cx="1016" cy="320" r="3.5" />
          </svg>
          <span class="home-hero-line home-hero-line-a"></span>
          <span class="home-hero-line home-hero-line-b"></span>
          <span class="home-hero-line home-hero-line-c"></span>
        </div>
        <div class="container home-hero-inner">
          <h1 class="home-hero-title">${t('hero.headline')}</h1>
          <p class="home-hero-subtitle">${t('hero.subtitle')}</p>
        </div>
      </section>
      <section class="home-intro-reveal">
        <div class="container home-intro-reveal-inner">
          <p>${t('hero.p1')}</p>
        </div>
      </section>
      <section class="container home-section">
        <div class="home-section-head">
          <h2 class="section-title">${t('research.title')}</h2>
          <p class="intro">${t('research.intro')}</p>
        </div>
        <div class="home-tiles">
          ${PILLARS.map(function (p) {
            return `
            <article class="home-tile">
              <h3>${t(p.titleKey)}</h3>
              <p>${t(p.descKey)}</p>
            </article>`;
          }).join('')}
        </div>
      </section>
    `;
  }

  function dateKey(d) {
    var p = String(d || '').split('.');
    return (parseInt(p[0], 10) || 0) * 100 + (parseInt(p[1], 10) || 0);
  }

  function renderResearchRow(item) {
    var ext = item.external ? ' target="_blank" rel="noopener"' : '';
    var tags = (item.tags || []).map(function (tg) {
      return `<span class="blog-tag">${tg}</span>`;
    }).join('');
    return `
      <a class="blog-row" href="${item.url}"${ext}>
        <div class="blog-row-main">
          ${tags ? `<div class="blog-tags">${tags}</div>` : ''}
          <h3 class="blog-row-title">${item.title}</h3>
          <p class="blog-row-desc">${item.desc}</p>
        </div>
        ${item.image ? `<img class="blog-row-thumb" src="${item.image}" alt="" loading="lazy">` : ''}
        <span class="blog-row-date">${item.date}</span>
      </a>`;
  }

  function renderBlog() {
    var items = [];
    (SPA_DATA.highlights || []).forEach(function (h) {
      var htags = (h.tags && (h.tags[currentLang] || h.tags.zh)) || [];
      var url = h.url || 'javascript:void(0)';
      var isBlogUrl = /^\/?blog\//.test(url);
      if (isBlogUrl) {
        url = currentLang === 'en'
          ? url.replace(/^\/?blog\/cn\//, '/blog/en/')
          : url.replace(/^\/?blog\/en\//, '/blog/cn/');
      }
      items.push({
        tags: htags.concat([t(isBlogUrl ? 'blog.tag.blog' : 'blog.tag.external')]),
        title: pick(h.title),
        desc: pick(h.desc),
        date: h.date, sort: dateKey(h.date), image: h.image,
        url: url, external: !!h.url && !isBlogUrl
      });
    });
    (SPA_DATA.blogPosts || []).forEach(function (p) {
      var lang = (currentLang === 'zh' && p.cn) ? 'cn' : 'en';
      var topics = (p.topicKeys || (p.topicKey ? [p.topicKey] : [])).map(t);
      items.push({
        tags: topics.concat([t('blog.tag.blog')]),
        title: p.title[currentLang] || p.title.en,
        desc: p.desc[currentLang] || p.desc.en,
        date: p.date, sort: dateKey(p.date), image: p.image,
        url: '/blog/' + lang + '/' + p.slug + '/', external: false
      });
    });
    items.sort(function (a, b) { return b.sort - a.sort; });
    return `
      <section class="container sec" id="blog-main">
        <div class="page-hero-copy" style="margin-bottom: 36px;">
          <h1 class="section-title">${t('blog.title')}</h1>
          <p class="intro">${t('blog.intro')}</p>
        </div>
        <div class="blog-list">
          ${items.map(renderResearchRow).join('')}
        </div>
      </section>
    `;
  }

  function renderPeople() {
    const sections = [
      { id: 'faculty', titleKey: 'people.subtitle.faculty', key: 'coreMembers' },
      { id: 'postdocs', titleKey: 'people.subtitle.postdocs', key: 'postdocs' },
      { id: 'phd', titleKey: 'people.subtitle.phd', key: 'phdStudents' },
      { id: 'master', titleKey: 'people.subtitle.master', key: 'masterStudents' },
      { id: 'undergrad', titleKey: 'people.subtitle.undergrad', key: 'undergraduates' },
      { id: 'visiting', titleKey: 'people.subtitle.visiting', key: 'visitingStudents' }
    ];

    const tocLinks = sections.map(sec =>
      `<a href="javascript:void(0)" onclick="scrollToId('${sec.id}'); return false;">${t(sec.titleKey)}</a>`
    ).join('');

    return `
      <section class="container sec" id="people-main">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1 class="section-title">${t('people.title')}</h1>
          <p class="intro">${t('people.desc')}</p>
        </div>

        <aside class="toc-sidebar">
            <button class="back-to-top" onclick="window.location.hash='alumni'" style="margin-bottom: 16px;">${t('people.viewAlumni')}</button>
            <h3>${t('people.toc')}</h3>
            <div class="toc-links">
                ${tocLinks}
            </div>
            <button class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="margin-top: 16px;">${t('people.backToTop')}</button>
        </aside>

        <div class="people-content">
            ${sections.map(section => `
              <div id="${section.id}" class="people-dir">
                  <h2 class="section-subtitle">${t(section.titleKey)}</h2>
                  <div class="team-members">
                    ${renderTeamGrid(teamData[section.key] || [], section.id !== 'postdocs')}
                  </div>
              </div>
            `).join('')}
            <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
              <button class="btn btn-primary" onclick="window.location.hash='alumni'">${t('people.viewAlumni')}</button>
            </div>
        </div>
      </section>
    `;
  }

  function renderTeamGrid(list, showTitle = true) {
    if (!list.length) return `<p>${t('people.updating')}</p>`;
    return list.map(member => {
      const name = pick(member.name);
      const title = pick(member.title);
      const year = member.year
        ? `<p class="member-title member-year">${currentLang === 'en' ? 'Class of ' + member.year : member.year + '级'}</p>`
        : '';
      const photo = member.photo ? `<img src="${member.photo}" alt="${name}" class="member-photo">` : '';
      const meta = showTitle && title ? `<p class="member-title">${title}</p>` : '';
      const content = `
          ${photo}
          <h4 class="member-name">${name}</h4>
          ${meta}
          ${year}`;

      return member.homepage
        ? `<a href="${member.homepage}" target="_blank" class="member-card member-card-link">${content}</a>`
        : `<div class="member-card">${content}</div>`;
    }).join('');
  }

  function renderAlumni() {
    const categories = [
      { id: 'postdocs', titleKey: 'people.subtitle.postdocs' },
      { id: 'phd', titleKey: 'people.subtitle.phd' },
      { id: 'masters', titleKey: 'people.subtitle.master' },
      { id: 'undergrad', titleKey: 'people.subtitle.undergrad' },
      { id: 'visiting', titleKey: 'people.subtitle.visiting' }
    ];

    const tocLinks = categories.map(cat =>
      `<a href="javascript:void(0)" onclick="scrollToId('${cat.id}'); return false;">${t(cat.titleKey)}</a>`
    ).join('');

    return `
      <section class="container sec" id="alumni-main">
        <div class="page-hero-copy" style="min-height: auto; margin-bottom: 24px;">
          <h1 class="section-title">${t('alumni.title')}</h1>
        </div>

        <aside class="toc-sidebar">
            <button class="back-to-top" onclick="window.location.hash='people'" style="margin-bottom: 16px;">${t('alumni.viewPeople')}</button>
            <h3>${t('alumni.toc')}</h3>
            <div class="toc-links">
                ${tocLinks}
            </div>
            <button class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="margin-top: 16px;">${t('alumni.backToTop')}</button>
        </aside>

        <div class="alumni-content">
            <p class="intro">${t('alumni.intro')}</p>
            ${categories.map(cat => `
              <div id="${cat.id}" class="alumni-dir">
                  <h2 class="section-subtitle">${t(cat.titleKey)}</h2>
                  <div class="alumni-list">
                    ${renderAlumniList(alumniData[cat.id] || [])}
                  </div>
              </div>
            `).join('')}
            <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
              <button class="btn btn-primary" onclick="window.location.hash='people'">${t('alumni.viewPeople')}</button>
            </div>
        </div>
      </section>
    `;
  }

  function renderAlumniList(list) {
    if (!list.length) return `<p>${t('alumni.updating')}</p>`;
    return list.map(item => `
      <div class="alumni-row">
        <span class="name">
          ${item.homepage ? `<a class="alumni-name-link" href="${item.homepage}" target="_blank">${pick(item.name)}</a>` : pick(item.name)}
        </span>
        <span class="year">${item.year ? (currentLang === 'en' ? item.year : item.year + '级') : ''}</span>
        <span class="destination">${pick(item.destination)}</span>
      </div>
    `).join('');
  }

  // ===== GitHub star 工具（移植自个人主页 star-counter.js）=====
  // 数据优先级：baked window.__GH_STARS__（CI 每日刷新）→ localStorage 缓存（1h）→ 实时 API
  const STAR_PATH = 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.72 4.192a.75.75 0 0 1-1.088.791L8 12.347 4.232 14.327a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z';
  const STAR_SVG_SM = `<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="${STAR_PATH}"/></svg>`;
  const STAR_SVG_XS = `<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="${STAR_PATH}"/></svg>`;

  // 紧凑显示：12k / 1.3k / 532（用于单仓库 star）
  function formatStars(n) {
    if (n == null) return '—';
    if (n >= 10000) return Math.round(n / 1000) + 'k';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }
  // 完整数字带千分位（用于系列总 star）
  function groupThousands(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // 从 baked 数据按系列组织求总 star（首屏即用，无需等待 hydrate）
  function computeTotalStars() {
    const baked = window.__GH_STARS__;
    if (!baked) return 0;
    const series = SPA_DATA.projectSeries || [];
    let total = 0;
    series.forEach(p => {
      if (p.org && baked.orgs && baked.orgs[p.org]) {
        baked.orgs[p.org].forEach(r => { total += r.stars || 0; });
      }
      if (p.repo && baked.repos && baked.repos[p.repo] != null) {
        total += baked.repos[p.repo];
      }
    });
    return total;
  }

  // 在「开放资源」页渲染后调用：填充各系列卡的精选子仓库与系列总 star。
  function hydrateProjectStars() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;
    const baked = window.__GH_STARS__ || null;
    const TTL = 60 * 60 * 1000;
    const series = SPA_DATA.projectSeries || [];

    // 总数基线：先用 baked 填好每个组织，hydrate 时逐个刷新并收敛
    const orgTotals = {};
    series.forEach(p => {
      if (p.org && baked && baked.orgs && baked.orgs[p.org]) {
        orgTotals[p.org] = baked.orgs[p.org].reduce((s, r) => s + (r.stars || 0), 0);
      }
    });

    function readCache(key) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const v = JSON.parse(raw);
        if (Date.now() - v.t > TTL) return null;
        return v.s;
      } catch (e) { return null; }
    }
    function writeCache(key, value) {
      try { localStorage.setItem(key, JSON.stringify({ s: value, t: Date.now() })); }
      catch (e) { /* 配额 / 隐私模式 — 忽略 */ }
    }
    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function updateTotal() {
      const el = document.getElementById('projects-total-num');
      if (!el) return;
      const total = Object.keys(orgTotals).reduce((s, o) => s + orgTotals[o], 0);
      if (total > 0) el.textContent = groupThousands(total);
    }
    function renderRepos(el, repos) {
      const limit = parseInt(el.getAttribute('data-limit'), 10) || 4;
      const featuredAttr = el.getAttribute('data-featured');
      const featured = featuredAttr
        ? featuredAttr.split(',').map(s => s.trim()).filter(Boolean)
        : null;
      let items;
      if (!featured) {
        items = repos.slice(0, limit); // 无白名单：取 star 最高的前 N 个
      } else {
        const byName = {};
        repos.forEach(r => { byName[r.name.toLowerCase()] = r; });
        items = []; // 白名单：保留配置顺序，找不到的静默跳过
        featured.forEach(name => {
          const hit = byName[name.toLowerCase()];
          if (hit) items.push(hit);
        });
      }
      if (!items.length) { el.innerHTML = ''; return; }
      el.innerHTML = items.map(r => (
        '<li class="repo-item" title="' + escapeHtml(r.desc || r.name) + '">' +
          '<span class="repo-name">' + escapeHtml(r.name) + '</span>' +
          '<span class="repo-stars">' + STAR_SVG_XS + '<span>' + formatStars(r.stars) + '</span></span>' +
        '</li>'
      )).join('');
    }

    grid.querySelectorAll('.project-card__repos[data-org]').forEach(el => {
      const org = el.getAttribute('data-org');
      if (!org) { el.innerHTML = ''; return; }
      function apply(repos) {
        orgTotals[org] = repos.reduce((s, r) => s + (r.stars || 0), 0);
        renderRepos(el, repos);
        updateTotal();
      }
      if (baked && baked.orgs && baked.orgs[org]) { apply(baked.orgs[org]); return; }
      const cached = readCache('gh-org:' + org);
      if (cached) { apply(cached); return; }
      fetch('https://api.github.com/orgs/' + org + '/repos?per_page=100&type=public&sort=updated', {
        headers: { 'Accept': 'application/vnd.github+json' }
      })
        .then(r => { if (!r.ok) throw 0; return r.json(); })
        .then(list => {
          const slim = list
            .filter(r => !r.fork && !r.archived && !r.private)
            .map(r => ({ name: r.name, stars: r.stargazers_count || 0, url: r.html_url, desc: r.description || '' }))
            .sort((a, b) => b.stars - a.stars);
          writeCache('gh-org:' + org, slim);
          apply(slim);
        })
        .catch(() => { el.innerHTML = ''; });
    });

    updateTotal();
  }

  function renderResources() {
    // 课程数据
    const courses = (SPA_DATA.courses || []).map(c => ({
      title: t(c.titleKey),
      desc: t(c.descKey),
      url: c.url,
      label: t(c.labelKey)
    }));

    // 开源项目系列（按 GitHub 组织分组）
    const series = (SPA_DATA.projectSeries || []).map(p => ({
      name: p.name,
      url: p.url,
      org: p.org,
      feature: !!p.feature,
      featured: p.featured || null,
      badge: p.badgeKey ? t(p.badgeKey) : '',
      desc: t(p.descKey)
    }));

    // baked star 总数：首屏即显示正确数字，hydrate 后随实时数据收敛
    const totalStars = computeTotalStars();

    return `
      <section class="container sec">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1 class="section-title">${t('resources.title')}</h1>
          <p class="intro">${t('resources.desc')}</p>
        </div>

        <h2 id="courses" class="section-subtitle" style="scroll-margin-top: 100px;">${t('resources.courses.title')}</h2>
        <p class="intro">${t('resources.courses.intro')}</p>
        <div class="highlight-grid highlight-grid-3">
          ${courses.map(card => `
            <article class="highlight-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <a href="${card.url}" target="_blank">${card.label}</a>
            </article>
          `).join('')}
        </div>

        <h2 id="projects" class="section-subtitle h2-with-total" style="margin-top: 48px; scroll-margin-top: 100px;">
          <span>${t('resources.projects.title')}</span>
          <span class="h2-total" title="${t('resources.projects.total')}">
            ${STAR_SVG_SM}
            <span class="h2-total__num" id="projects-total-num">${totalStars ? groupThousands(totalStars) : '—'}</span>
          </span>
        </h2>
        <div class="project-grid">
          ${series.map(p => `
            <a class="project-card${p.org ? ' project-card--series' : ''}${p.feature ? ' project-card--feature' : ''}" href="${p.url}" target="_blank" rel="noopener">
              <div class="project-card__head">
                <span class="project-card__name">${p.name}</span>
                ${p.badge ? `<span class="project-card__badge">${p.badge}</span>` : ''}
                <span class="project-card__link">${p.org ? t('resources.projects.orglink') : t('resources.projects.repolink')}</span>
              </div>
              <p class="project-card__desc">${p.desc}</p>
              ${p.org ? `
              <ul class="project-card__repos" data-org="${p.org}" data-limit="${(p.featured && p.featured.length) || 4}"${p.featured ? ` data-featured="${p.featured.join(',')}"` : ''}>
                <li class="repos-loading">${t('resources.projects.loading')}</li>
              </ul>` : ''}
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderPositions() {
    // 从 SPA_DATA 获取职位卡片和为什么选择我们的数据
    const cards = (SPA_DATA.positionCards || []).map(c => ({
      id: c.id,
      title: t(c.titleKey),
      desc: t(c.descKey)
    }));

    const whyUs = (SPA_DATA.whyUs || []).map(item => ({
      icon: item.icon,
      title: t(item.titleKey),
      desc: t(item.descKey)
    }));

    return `
      <section class="container sec">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1 class="section-title">${t('positions.title')}</h1>
          <p class="intro">${t('positions.intro')}</p>
        </div>
        <div class="resource-grid">
          ${cards.map(card => `
            <article class="resource-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <a class="btn btn-inline" href="javascript:void(0)" onclick="scrollToSection('${card.id}')">${t('positions.detail.link')}</a>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="container sec">
        <h2>${t('positions.why.title')}</h2>
        <div class="why-join-grid">
          ${whyUs.map(item => `
            <div class="why-join-card">
              <div class="why-join-icon">${item.icon}</div>
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>
      <section class="container sec" id="positions-detail">
        <h2>${t('positions.detail.title')}</h2>
        ${SPA_DATA.positions.details.map(detail => `
          <article class="detail-section" id="${detail.id}">
            <h3>${pick(detail.title)}</h3>
            <div class="detail-content">
              ${detail.blocks.map(block => `
                <h3>${pick(block.subtitle)}</h3>
                ${(block.paragraphs[currentLang] || block.paragraphs.zh).map(p => `<p>${p}</p>`).join('')}
              `).join('')}
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderWebmaster() {
    const repoUrl = 'https://github.com/OpenMOSS/openmoss.github.io';
    return `
      <section class="container sec">
        <div class="page-hero-copy">
          <h1 class="section-title">${t('webmaster.title')}</h1>
          <p class="intro">${t('webmaster.intro')}</p>
        </div>
        <div class="alumni-list">
          ${SPA_DATA.webmaster.members.map(member => `
            <div class="alumni-row">
              <span class="name"><a href="${member.github}" target="_blank" class="webmaster-link">${pick(member.name)}</a></span>
              <span class="destination">${pick(member.role)}</span>
            </div>
          `).join('')}
        </div>
      </section>
      <section class="container sec" style="margin-top: 48px;">
        <h2>${t('webmaster.contribute.title')}</h2>
        <p>${t('webmaster.contribute.text')}<a href="${repoUrl}" target="_blank" style="color: var(--fudan-blue); font-weight: 500;">${repoUrl}</a></p>
      </section>
    `;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
