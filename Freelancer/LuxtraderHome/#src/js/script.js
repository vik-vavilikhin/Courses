document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');

  @ @include('./testWebp.js')

  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });

});