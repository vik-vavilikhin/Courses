document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  // @@include('./modules/inspectUserAgent.js')
  // @ @include('./modules/testWebP.js')
  // @ @include('./modules/menu.mjs')
  // @@include('./modules/elemMove.js')
  // @ @include('./modules/1.js')

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.user-header__icon')) {
      userHeaderMenu.classList.remove('_active');
    }
  });

  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });

  testWebP();
  burgerAction(iconMenu, menuBody);
  elemMove('data-move');
});