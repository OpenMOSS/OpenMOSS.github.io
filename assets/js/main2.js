// OpenMOSS Team 校友页面主要逻辑
// 负责渲染校友数据和处理交互

(function () {
  'use strict';

  // 获取当前语言
  function getCurrentLang() {
    return localStorage.getItem('lang') || 'zh-CN';
  }

  // 创建校友行HTML
  function createAlumniRow(alumni, lang) {
    const langKey = lang === 'zh-CN' ? 'zh' : 'en';
    const name = alumni.name[langKey] || alumni.name.zh;
    const destination = alumni.destination ? (alumni.destination[langKey] || alumni.destination.zh || '') : '';
    const homepage = alumni.homepage;

    // 如果有个人主页，名字变为可点击链接
    let nameHtml = '';
    if (homepage) {
      nameHtml = `<a href="${homepage}" target="_blank" rel="noopener noreferrer" class="alumni-name-link">${name}</a>`;
    } else {
      nameHtml = `<span>${name}</span>`;
    }

    return `
      <div class="alumni-row">
        <span class="name">${nameHtml}</span>
        <span class="destination">${destination}</span>
      </div>
    `;
  }

  // 渲染校友列表
  function renderAlumniList(category, containerSelector, lang) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // 检查数据是否存在
    if (typeof alumniData === 'undefined') {
      console.warn('Alumni data not loaded. Make sure data2.js is included before main2.js');
      return;
    }

    const alumniList = alumniData[category];
    if (!alumniList || alumniList.length === 0) {
      container.innerHTML = '';
      return;
    }

    // 生成HTML
    let html = '';
    alumniList.forEach(alumni => {
      html += createAlumniRow(alumni, lang);
    });

    container.innerHTML = html;
  }

  // 渲染所有校友列表
  function renderAllAlumniLists() {
    const currentLang = getCurrentLang();

    // 渲染各个类别的校友
    renderAlumniList('postdocs', '#postdocs + .alumni-list', currentLang);
    renderAlumniList('phd', '#phd + .alumni-list', currentLang);
    renderAlumniList('masters', '#masters + .alumni-list', currentLang);
    renderAlumniList('undergrad', '#undergrad + .alumni-list', currentLang);
    renderAlumniList('visiting', '#visiting + .alumni-list', currentLang);
  }

  // 初始化校友列表
  function initAlumniPage() {
    // 检查是否在校友页面
    const alumniPage = document.querySelector('#alumni-main');
    if (!alumniPage) return;

    // 渲染校友列表
    renderAllAlumniLists();
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlumniPage);
  } else {
    initAlumniPage();
  }

  // 监听语言切换（通过轮询检测）
  let lastLang = getCurrentLang();
  setInterval(function () {
    const currentLang = getCurrentLang();
    if (currentLang !== lastLang) {
      lastLang = currentLang;
      renderAllAlumniLists();
    }
  }, 500);

})();
