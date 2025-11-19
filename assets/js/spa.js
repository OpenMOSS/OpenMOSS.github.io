(function () {
  const routes = {
    home: renderHome,
    people: renderPeople,
    alumni: renderAlumni,
    resources: renderResources,
    projects: renderProjects,
    positions: renderPositions,
    webmaster: renderWebmaster
  };

  function init() {
    if (!window.SPA_DATA) {
      console.error('SPA_DATA 未加载');
      return;
    }
    renderShell();
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function renderShell() {
    const root = document.getElementById('app');
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
            ${SPA_DATA.nav.map(item => `<li><a href="#${item.id}" data-route="${item.id}">${item.label}</a></li>`).join('')}
          </ul>
        </div>
      </nav>
      <main id="spa-view" class="sechighlight"></main>
      ${renderFooter()}
    `;

    const toggle = root.querySelector('.nav-toggle');
    const nav = root.querySelector('#primary-navigation');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <h4>联系方式</h4>
              <ul>
                ${SPA_DATA.footer.contactLinks.map(link => `
                  <li><a href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank"' : ''}><i class="${link.icon}"></i> ${link.label}</a></li>
                `).join('')}
              </ul>
            </div>
            <div>
              <h4>通信地址</h4>
              <ul>
                ${SPA_DATA.footer.addresses.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h4>合作单位</h4>
              <ul>
                ${SPA_DATA.footer.partners.map(item => `<li><a href="${item.url}" target="_blank">${item.label}</a></li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="footer-note">
            <p>&copy; ${year} OpenMOSS Team</p>
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
    if (route === 'positions' && params.section) {
      setTimeout(() => {
        const target = document.getElementById(params.section);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

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
    return `
      <section class="page-hero">
        <div class="container">
          <div class="page-hero-content">
            <div class="page-hero-copy">
              <h1>${SPA_DATA.hero.title}</h1>
              ${SPA_DATA.hero.paragraphs.map(p => `<p class="lead">${p}</p>`).join('')}
            </div>
            <div class="page-hero-actions">
              ${SPA_DATA.hero.actions.map(action => {
                const attrs = action.external ? 'target="_blank" rel="noopener"' : '';
                return `<a class="btn btn-${action.variant}" href="${action.url}" ${attrs}>${action.label}</a>`;
              }).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderHome() {
    return `
      ${renderHero()}
      <section class="container sec">
        <h2>研究方向</h2>
        <div class="pillars-grid">
          ${SPA_DATA.pillars.map(p => `
            <article class="pillar-card">
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="container sec">
        <h2>团队与网络</h2>
        <div class="people-sections">
          ${SPA_DATA.homePeopleCards.map(card => `
            <article class="people-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <a class="btn btn-inline" href="#${card.link.route}">${card.link.label}</a>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="container sec">
        <h2>开放资源</h2>
        <div class="people-sections">
          ${SPA_DATA.resourceHighlights.map(card => `
            <article class="people-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <div class="hero-actions">
                ${card.links.map(link => {
                  if (link.route) return `<a class="btn btn-inline" href="#${link.route}">${link.label}</a>`;
                  return `<a class="btn btn-inline" href="${link.url}" target="_blank">${link.label}</a>`;
                }).join('')}
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderPeople() {
    const sections = [
      { title: '导师团队', key: 'coreMembers' },
      { title: '博士后', key: 'postdocs' },
      { title: '博士研究生', key: 'phdStudents' },
      { title: '硕士研究生', key: 'masterStudents' },
      { title: '本科生', key: 'undergraduates' },
      { title: '访问学生', key: 'visitingStudents' }
    ];
    return `
      <section class="container sec">
        <div class="page-hero-copy" style="margin-bottom:40px;">
          <h1>团队成员</h1>
          <p>研究生、访问学者和行业研究员共同推动大规模 AI 系统和社会应用的边界。</p>
        </div>
        ${sections.map(section => `
          <h2 class="section-subtitle">${section.title}</h2>
          <div class="team-members">
            ${renderTeamGrid(teamData[section.key] || [])}
          </div>
        `).join('')}
      </section>
    `;
  }

  function renderTeamGrid(list) {
    if (!list.length) return '<p>内容正在更新。</p>';
    return list.map(member => `
      <div class="member-card">
        ${member.photo ? `<img src="${member.photo}" alt="${member.name.zh || member.name}" class="member-photo">` : ''}
        <h4 class="member-name">${member.name?.zh || member.name}</h4>
        ${member.title ? `<p class="member-title">${member.title.zh || member.title}</p>` : ''}
      </div>
    `).join('');
  }

  function renderAlumni() {
    const categories = [
      { id: 'postdocs', title: '博士后' },
      { id: 'phd', title: '博士生' },
      { id: 'masters', title: '硕士生' },
      { id: 'undergrad', title: '本科生' },
      { id: 'visiting', title: '访问学生' }
    ];
    return `
      <section class="container sec">
        <div class="page-hero-copy" style="margin-bottom:40px;">
          <h1>校友网络</h1>
          <p>我们的校友遍布学术界和工业界，在世界各地的顶尖机构和公司中发挥着重要作用。</p>
        </div>
        ${categories.map(cat => `
          <h2 class="section-subtitle">${cat.title}</h2>
          <div class="alumni-list">
            ${renderAlumniList(alumniData[cat.id] || [])}
          </div>
        `).join('')}
      </section>
    `;
  }

  function renderAlumniList(list) {
    if (!list.length) return '<p>内容正在更新。</p>';
    return list.map(item => `
      <div class="alumni-row">
        <span class="name">
          ${item.homepage ? `<a class="alumni-name-link" href="${item.homepage}" target="_blank">${item.name.zh || item.name}</a>` : (item.name.zh || item.name)}
        </span>
        <span class="destination">${item.destination?.zh || item.destination || ''}</span>
      </div>
    `).join('');
  }

  function renderResources() {
    return `
      <section class="container sec">
        <div class="page-hero-copy">
          <h1>开放课程</h1>
          <p class="lead">${SPA_DATA.resources.intro}</p>
        </div>
        <div class="highlight-grid highlight-grid-3">
          ${SPA_DATA.resources.cards.map(card => `
            <article class="highlight-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <a href="${card.url}" target="_blank">${card.label}</a>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderProjects() {
    return `
      <section class="container sec">
        <div class="page-hero-copy">
          <h1>开源项目</h1>
          <p>了解我们持续维护的开源项目及其研究定位。</p>
        </div>
        <div class="resource-grid">
          ${SPA_DATA.projects.map(project => `
            <article class="resource-card">
              <h3>${project.name}</h3>
              <p>${project.desc}</p>
              <div>
                <span style="display:inline-block;padding:4px 8px;background-color:var(--mist);border-radius:4px;font-size:12px;margin-right:8px;">${project.stars}</span>
                <span style="display:inline-block;padding:4px 8px;background-color:var(--mist);border-radius:4px;font-size:12px;">${project.stack}</span>
              </div>
              <a class="btn btn-inline" href="${project.url}" target="_blank">访问项目</a>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderPositions() {
    return `
      <section class="container sec">
        <div class="page-hero-copy">
          <h1>加入 OpenMOSS Team</h1>
          <p class="lead">${SPA_DATA.positions.intro}</p>
        </div>
        <div class="resource-grid" style="margin-top:30px;">
          ${SPA_DATA.positions.cards.map(card => `
            <article class="resource-card">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <a class="btn btn-inline" href="#positions?section=${card.id}">查看详情</a>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="container sec">
        <h2>${SPA_DATA.positions.whyUsTitle || '为什么选择我们'}</h2>
        <div class="why-join-grid">
          ${SPA_DATA.positions.whyUs.map(item => `
            <div class="why-join-card">
              <div class="why-join-icon">${item.icon}</div>
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>
      <section class="container sec">
        <h2>${SPA_DATA.positions.applyTitle || '如何申请'}</h2>
        <div style="background-color:var(--white);padding:32px;border-radius:12px;border:1px solid var(--border);">
          <p style="margin:0;font-weight:600;color:var(--text);">${SPA_DATA.positions.apply}
            <a href="${SPA_DATA.positions.applyUrl}" target="_blank" style="color:var(--fudan-blue);text-decoration:underline;">报名问卷</a>
          </p>
        </div>
      </section>
      <section class="container sec" id="positions-detail">
        <h2>开放机会详情</h2>
        ${SPA_DATA.positions.details.map(detail => `
          <article class="detail-section" id="${detail.id}">
            <h3>${detail.title}</h3>
            <div class="detail-content">
              ${detail.blocks.map(block => `
                <h3>${block.subtitle}</h3>
                ${block.paragraphs.map(p => `<p>${p}</p>`).join('')}
              `).join('')}
            </div>
          </article>
        `).join('')}
        <div style="margin-top:40px;text-align:center;">
          <a class="btn btn-primary" href="${SPA_DATA.positions.applyUrl}" target="_blank">填写申请问卷</a>
        </div>
      </section>
    `;
  }

  function renderWebmaster() {
    return `
      <section class="container sec">
        <div class="page-hero-copy">
          <h1>网页设计</h1>
          <p>${SPA_DATA.webmaster.intro}</p>
        </div>
        <div class="alumni-list">
          ${SPA_DATA.webmaster.members.map(member => `
            <div class="alumni-row">
              <span class="name">${member.name}</span>
              <span class="destination">${member.role}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
