document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  @ @include('./functions.js')

  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');

  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });
});