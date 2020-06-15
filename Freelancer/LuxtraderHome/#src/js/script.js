document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // ---------------------------------------------
  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');
  // ---------------------------------------------
  // @@include('../libs/swiper/js/swiper.js')
  // @@include('./modules/inspectUserAgent.js')
  // @@include('./modules/testWebP.js')
  // @@include('./modules/backgroundImage.js')
  // @@include('./modules/burgerActive.js')
  // @@include('./modules/elemReplace.js')
  // @@include('./modules/slider.js')
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
  inspectUserAgent();
  testWebP();
  backgroundImage();
  burgerActive();
  elemReplace();
});