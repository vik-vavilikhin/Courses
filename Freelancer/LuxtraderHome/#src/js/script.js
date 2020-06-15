document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // ---------------------------------------------
  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  // ---------------------------------------------
  // @@include('./modules/inspectUserAgent.js')
  // @@include('./modules/ibg.js')
  // @@include('./modules/testWebP.js')
  // @@include('./modules/menu.js')
  // @@include('./modules/elemReplace.js')
  // ---------------------------------------------
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.user-header__icon')) {
      userHeaderMenu.classList.remove('_active');
    }
  });
  // ---------------------------------------------
  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });
  // ---------------------------------------------
  testWebP();
  burgerAction(iconMenu, menuBody);
  elemReplace();
});

// 1:22