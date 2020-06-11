document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // ---------------------------------------
  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  const actionsHeader = document.querySelector('.actions-header');
  const actionsHeaderRegion = document.querySelector('.actions-header__region');

  // ---------------------------------------
  // @ @include('./modules/inspectUserAgent.js')
  // @@include('./modules/testWebP.js')
  // @@include('./modules/menu.js')
  // @@include('./modules/1.js')
  // ---------------------------------------
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.user-header__icon')) {
      userHeaderMenu.classList.remove('_active');
    }
  });
  // ---------------------------------------
  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });
  // =======================================
  testWebP();
  burgerAction(iconMenu, menuBody);
  elemReplace('data-move');
});