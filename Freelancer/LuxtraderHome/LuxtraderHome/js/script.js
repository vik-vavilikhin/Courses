document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');

  const testWebP = (callback) => {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });

  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });

});