(function () {
  const routes = {
    home: renderHome,
    research: renderResearch,
    people: renderPeople,
    alumni: renderAlumni,
    resources: renderResources,
    positions: renderPositions,
    webmaster: renderWebmaster
  };

  let currentLang = 'zh';

  // 翻译辅助函数
  function t(key) {
    return window.t ? window.t(key, currentLang) : key;
  }

  function init() {
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
    currentLang = savedLang;
    window.currentLang = currentLang;
    // 设置 html lang 属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    renderShell();
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function renderShell() {
    const root = document.getElementById('app');

    const navItems = [
      { id: 'home', key: 'nav.home' },
      { id: 'research', key: 'nav.research' },
      { id: 'people', key: 'nav.people' },
      { id: 'resources', key: 'nav.resources' },
      { id: 'positions', key: 'nav.positions' }
    ];

    root.innerHTML = `
      <nav class="navbar">
        <div class="container nav-container">
          <a class="brand" href="#home">
            <img class="brand-logo" src="assets/img/openmoss-logo.png" alt="OpenMOSS Team logo">
            <span class="brand-name">${SPA_DATA.brand.name}</span>
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

    // 语言切换功能
    const langBtn = root.querySelector('#lang-toggle');
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('language', currentLang);
      window.currentLang = currentLang;
      // 更新 html lang 属性
      document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
      // 重新渲染整个应用
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
    updateNav(route);

    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 处理特定页面的锚点跳转
    if (route === 'positions' && params.section) {
      setTimeout(() => {
        const target = document.getElementById(params.section);
        if (target) {
          const offset = 120; // 导航栏高度 + 额外间距
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50);
    }
  }

  // 滚动到指定区域的函数（用于按钮点击）
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      const offset = 120; // 导航栏高度 + 额外间距
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  // 将滚动函数暴露到全局作用域
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

  function renderHero() {
    const paragraphs = [
      t('hero.p1'),
      t('hero.p2')
    ];

    return `
      <section class="page-hero">
        <div class="container">
          <div class="page-hero-content">
            <div class="page-hero-copy">
              <h1>${t('hero.title')}</h1>
              ${paragraphs.map(p => `<p class="lead">${p}</p>`).join('')}
              <div class="page-hero-actions">
                <a class="btn btn-primary" href="https://openmoss.sii.edu.cn/en/" target="_blank" rel="noopener">${t('hero.btn.highlights')}</a>
                <a class="btn btn-outline" href="#positions">${t('hero.btn.join')}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderHome() {
    const pillars = [
      { key: 'infra', titleKey: 'pillar.infra.title', descKey: 'pillar.infra.desc' },
      { key: 'multimodal', titleKey: 'pillar.multimodal.title', descKey: 'pillar.multimodal.desc' },
      { key: 'reasoning', titleKey: 'pillar.reasoning.title', descKey: 'pillar.reasoning.desc' },
      { key: 'embodied', titleKey: 'pillar.embodied.title', descKey: 'pillar.embodied.desc' },
      { key: 'safety', titleKey: 'pillar.safety.title', descKey: 'pillar.safety.desc' },
      { key: 'arch', titleKey: 'pillar.arch.title', descKey: 'pillar.arch.desc' }
    ];

    return `
      ${renderHero()}
      <section class="container sec">
        <h2>${t('research.title')}</h2>
        <div class="pillars-grid">
          ${pillars.map(p => `
            <article class="pillar-card pillar-card-clickable" onclick="window.location.hash = 'research'; setTimeout(() => { const el = document.getElementById('pub-${p.key}'); if(el) { const offset = 100; const bodyRect = document.body.getBoundingClientRect().top; const elementRect = el.getBoundingClientRect().top; const elementPosition = elementRect - bodyRect; const offsetPosition = elementPosition - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }, 100);">
              <h3>${t(p.titleKey)}</h3>
              <p>${t(p.descKey)}</p>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="container sec">
        <h2>${t('people.title')}</h2>
        
        <h3 class="section-subtitle" style="margin-top: 0;">${t('people.subtitle.faculty')}</h3>
        <div class="team-members">
          ${renderTeamGrid(teamData.coreMembers || [])}
        </div>

        <div class="people-sections">
          <article class="people-card">
            <h3>${t('people.card.students.title')}</h3>
            <p>${t('people.card.students.desc')}</p>
            <a class="btn btn-outline" href="#people">${t('people.card.students.link')}</a>
          </article>
          <article class="people-card">
            <h3>${t('people.card.alumni.title')}</h3>
            <p>${t('people.card.alumni.desc')}</p>
            <a class="btn btn-outline" href="#alumni">${t('people.card.alumni.link')}</a>
          </article>
        </div>
      </section>
      <section class="container sec">
        <h2>${t('resources.title')}</h2>
        <div class="people-sections">
          <article class="people-card">
            <h3>${t('resources.highlight.tools.title')}</h3>
            <p>${t('resources.highlight.tools.desc')}</p>
            <div class="hero-actions" style="margin-top: auto; width: 100%;">
              <a class="btn btn-outline" href="https://github.com/OpenMOSS" target="_blank">${t('resources.highlight.tools.btn1')}</a>
              <a class="btn btn-outline" href="javascript:void(0)" onclick="window.location.hash='resources'; setTimeout(() => { const el = document.getElementById('projects'); if(el) { const offset = 100; const bodyRect = document.body.getBoundingClientRect().top; const elementRect = el.getBoundingClientRect().top; const elementPosition = elementRect - bodyRect; const offsetPosition = elementPosition - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }, 200);">${t('resources.highlight.tools.btn2')}</a>
            </div>
          </article>
          <article class="people-card">
            <h3>${t('resources.highlight.courses.title')}</h3>
            <p>${t('resources.highlight.courses.desc')}</p>
            <div class="hero-actions" style="margin-top: auto; width: 100%;">
              <a class="btn btn-outline" href="javascript:void(0)" onclick="window.location.hash='resources'; setTimeout(() => { const el = document.getElementById('courses'); if(el) { const offset = 100; const bodyRect = document.body.getBoundingClientRect().top; const elementRect = el.getBoundingClientRect().top; const elementPosition = elementRect - bodyRect; const offsetPosition = elementPosition - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }, 200);">${t('resources.highlight.courses.btn')}</a>
            </div>
          </article>
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
      `<a href="javascript:void(0)" onclick="const el = document.getElementById('${sec.id}'); if(el) { const offset = 100; const bodyRect = document.body.getBoundingClientRect().top; const elementRect = el.getBoundingClientRect().top; const elementPosition = elementRect - bodyRect; const offsetPosition = elementPosition - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } return false;">${t(sec.titleKey)}</a>`
    ).join('');

    return `
      <section class="container sec" id="people-main">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1>${t('people.title')}</h1>
          <p>${t('people.desc')}</p>
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
      const name = member.name?.[currentLang] || member.name?.zh || member.name;

      // 如果有主页链接，整个卡片都可点击
      if (member.homepage) {
        return `
          <a href="${member.homepage}" target="_blank" class="member-card member-card-link">
            ${member.photo ? `<img src="${member.photo}" alt="${name}" class="member-photo">` : ''}
            <h4 class="member-name">${name}</h4>
            ${showTitle && member.title ? `<p class="member-title">${member.title[currentLang] || member.title.zh || member.title}</p>` : ''}
          </a>
        `;
      } else {
        return `
          <div class="member-card">
            ${member.photo ? `<img src="${member.photo}" alt="${name}" class="member-photo">` : ''}
            <h4 class="member-name">${name}</h4>
            ${showTitle && member.title ? `<p class="member-title">${member.title[currentLang] || member.title.zh || member.title}</p>` : ''}
          </div>
        `;
      }
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
      `<a href="javascript:void(0)" onclick="const el = document.getElementById('${cat.id}'); if(el) { const offset = 100; const bodyRect = document.body.getBoundingClientRect().top; const elementRect = el.getBoundingClientRect().top; const elementPosition = elementRect - bodyRect; const offsetPosition = elementPosition - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } return false;">${t(cat.titleKey)}</a>`
    ).join('');

    return `
      <section class="container sec" id="alumni-main">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1>${t('alumni.title')}</h1>
          <p>${t('alumni.desc')}</p>
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
          ${item.homepage ? `<a class="alumni-name-link" href="${item.homepage}" target="_blank">${item.name[currentLang] || item.name.zh || item.name}</a>` : (item.name[currentLang] || item.name.zh || item.name)}
        </span>
        <span class="destination">${item.destination?.[currentLang] || item.destination?.zh || item.destination || ''}</span>
      </div>
    `).join('');
  }

  function renderResearch() {
    const pillars = [
      { key: 'infra', titleKey: 'pillar.infra.title', descKey: 'pillar.infra.desc' },
      { key: 'multimodal', titleKey: 'pillar.multimodal.title', descKey: 'pillar.multimodal.desc' },
      { key: 'reasoning', titleKey: 'pillar.reasoning.title', descKey: 'pillar.reasoning.desc' },
      { key: 'embodied', titleKey: 'pillar.embodied.title', descKey: 'pillar.embodied.desc' },
      { key: 'safety', titleKey: 'pillar.safety.title', descKey: 'pillar.safety.desc' },
      { key: 'arch', titleKey: 'pillar.arch.title', descKey: 'pillar.arch.desc' }
    ];

    // 从 SPA_DATA 获取最新亮点内容，并处理多语言
    const highlights = (SPA_DATA.highlights || []).map(h => ({
      title: typeof h.title === 'object' ? (h.title[currentLang] || h.title.zh) : h.title,
      desc: typeof h.desc === 'object' ? (h.desc[currentLang] || h.desc.zh) : h.desc,
      date: h.date,
      url: h.url
    }));

    return `
      <section class="container sec" id="research-main">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1>${t('research.title')}</h1>
          <p>${t('research.intro')}</p>
        </div>
        <div class="pillars-grid">
          ${pillars.map(p => `
            <article class="pillar-card pillar-card-clickable" onclick="const el = document.getElementById('pub-${p.key}'); if(el) { const offset = 100; const bodyRect = document.body.getBoundingClientRect().top; const elementRect = el.getBoundingClientRect().top; const elementPosition = elementRect - bodyRect; const offsetPosition = elementPosition - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); }">
              <h3>${t(p.titleKey)}</h3>
              <p>${t(p.descKey)}</p>
            </article>
          `).join('')}
        </div>
      </section>
      
      <section class="container sec">
        <h2>${t('research.highlights.title')}</h2>
        <div class="highlights-list">
          ${highlights.map(h => `
            <article class="highlight-item" ${h.url ? `onclick="window.open('${h.url}', '_blank')" style="cursor: pointer;"` : ''}>
              <div class="highlight-date">${h.date}</div>
              <div class="highlight-content">
                <h3>${h.title}</h3>
                <p>${h.desc}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
      
      <section class="container sec">
        <h2>${t('research.publications.title')}</h2>
        ${pillars.map(p => {
      const pubs = SPA_DATA.publications[p.key] || [];
      return `
          <div id="pub-${p.key}" class="publication-section">
            <h3 class="publication-category">${t(p.titleKey)}</h3>
            <ul class="publication-list">
              ${pubs.length > 0 ? pubs.map(pub => {
        // 处理链接显示
        const processedLinks = pub.links.map(link => {
          if (link.type === 'ArXiv') {
            const pdfUrl = link.url.replace('/abs/', '/pdf/');
            return `<a href="${link.url}" target="_blank" class="pub-link">[Abstract]</a> <a href="${pdfUrl}" target="_blank" class="pub-link">[PDF]</a>`;
          } else if (link.type === 'GitHub') {
            return `<a href="${link.url}" target="_blank" class="pub-link">[Resource]</a>`;
          } else {
            return `<a href="${link.url}" target="_blank" class="pub-link">[${link.type}]</a>`;
          }
        }).join(' ');

        return `
                <li class="publication-item">
                  <div class="pub-main-line">
                    ${pub.support ? '<span class="pub-support">[SUPPORT]</span> ' : ''}<span class="pub-title">${pub.title}</span>${pub.venue ? `, <em>${pub.venue}</em>` : ''}, ${pub.year}.
                    ${processedLinks}
                  </div>
                  <div class="pub-authors">${pub.alphabetical ? '<span class="pub-alphabetical">*</span> ' : ''}${pub.authors}</div>
                </li>
              `;
      }).join('') : '<p style="color: var(--text-light); font-style: italic;">代表工作持续更新中...</p>'}
            </ul>
          </div>
        `;
    }).join('')}
        <p class="pub-note">* Authors of projects are listed in alphabetical order.</p>
      </section>
    `;
  }

  function renderResources() {
    // 从 SPA_DATA 获取课程和项目数据
    const courses = (SPA_DATA.courses || []).map(c => ({
      title: t(c.titleKey),
      desc: t(c.descKey),
      url: c.url,
      label: t(c.labelKey)
    }));

    const projects = (SPA_DATA.projects || []).map(p => ({
      name: p.name,
      desc: t(p.descKey),
      stars: p.stars,
      stack: p.stack,
      url: p.url
    }));

    return `
      <section class="container sec">
        <div class="page-hero-copy" style="margin-bottom: 40px;">
          <h1>${t('resources.title')}</h1>
          <p>${t('resources.desc')}</p>
        </div>

        <h2 id="courses" class="section-subtitle" style="scroll-margin-top: 100px;">${t('resources.courses.title')}</h2>
        <p class="lead" style="margin-bottom: 24px;">${t('resources.courses.intro')}</p>
        <div class="highlight-grid highlight-grid-3">
          ${courses.map(card => `
            <article class="highlight-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <a href="${card.url}" target="_blank">${card.label}</a>
            </article>
          `).join('')}
        </div>

        <h2 id="projects" class="section-subtitle" style="margin-top: 48px; scroll-margin-top: 100px;">${t('resources.projects.title')}</h2>
        <div class="resource-grid">
          ${projects.map(project => `
            <article class="resource-card">
              <h3>${project.name}</h3>
              <p>${project.desc}</p>
              <div>
                <span style="display:inline-block;padding:4px 8px;background-color:var(--mist);border-radius:4px;font-size:12px;margin-right:8px;">${project.stars}</span>
                <span style="display:inline-block;padding:4px 8px;background-color:var(--mist);border-radius:4px;font-size:12px;">${project.stack}</span>
              </div>
              <a class="btn btn-inline" href="${project.url}" target="_blank">${t('resources.btn.visit')}</a>
            </article>
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
          <h1>${t('positions.title')}</h1>
          <p>${t('positions.intro')}</p>
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
      <section class="container sec">
        <h2>${t('positions.apply.title')}</h2>
        <div style="background-color:var(--white);padding:32px;border-radius:12px;border:1px solid var(--border);">
          <p style="margin:0;font-weight:600;color:var(--text);">${t('positions.apply.desc')}
            <a href="${SPA_DATA.positions.applyUrl}" target="_blank" style="color:var(--fudan-blue);text-decoration:underline;">${t('positions.apply.link')}</a>
          </p>
        </div>
      </section>
      <section class="container sec" id="positions-detail">
        <h2>${t('positions.detail.title')}</h2>
        ${SPA_DATA.positions.details.map(detail => `
          <article class="detail-section" id="${detail.id}">
            <h3>${detail.title[currentLang] || detail.title.zh}</h3>
            <div class="detail-content">
              ${detail.blocks.map(block => `
                <h3>${block.subtitle[currentLang] || block.subtitle.zh}</h3>
                ${(block.paragraphs[currentLang] || block.paragraphs.zh).map(p => `<p>${p}</p>`).join('')}
              `).join('')}
            </div>
          </article>
        `).join('')}
        <div style="margin-top:40px;text-align:center;">
          <a class="btn btn-primary" href="${SPA_DATA.positions.applyUrl}" target="_blank">${t('positions.apply.btn')}</a>
        </div>
      </section>
    `;
  }

  function renderWebmaster() {
    const repoUrl = 'https://github.com/OpenMOSS/openmoss.github.io';
    return `
      <section class="container sec">
        <div class="page-hero-copy">
          <h1>${t('webmaster.title')}</h1>
          <p>${t('webmaster.intro')}</p>
        </div>
        <div class="alumni-list">
          ${SPA_DATA.webmaster.members.map(member => `
            <div class="alumni-row">
              <span class="name"><a href="${member.github}" target="_blank" class="webmaster-link">${member.name[currentLang] || member.name.zh}</a></span>
              <span class="destination">${member.role[currentLang] || member.role.zh}</span>
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
