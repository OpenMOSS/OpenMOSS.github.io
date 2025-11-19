// 动态加载header和footer组件
(function() {
  'use strict';

  // 加载组件
  async function loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;
      }
    } catch (error) {
      console.error(`加载组件失败 (${componentPath}):`, error);
    }
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }

  async function initComponents() {
    // 加载header和footer
    await Promise.all([
      loadComponent('header-placeholder', 'components/header.html'),
      loadComponent('footer-placeholder', 'components/footer.html')
    ]);

    // 组件加载完成后，触发自定义事件，通知main.js可以初始化了
    window.dispatchEvent(new Event('componentsLoaded'));
  }
})();

