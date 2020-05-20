'use strict';

window.addEventListener('DOMContentLoaded', () => {
  let box = document.querySelector('.touch-box');
  
  /* box.addEventListener('touchstart', (e) => {
    e.preventDefault();
    console.log('Red box: touchstart');
    console.log(e.target);
    console.log(e.touches[0].target);
    console.log(e.changedTouches);
    console.log(e.targetTouches);
  }); */

  /* box.addEventListener('touchmove', (e) => {
    e.preventDefault();
    console.log('Red box: ' + e.touches[0].pageX);
  }); */

  /* box.addEventListener('touchend', (e) => {
    e.preventDefault();
    console.log('Red box: touchend');
  }); */

  // new RegExp('pattern', 'flags');
  // /pattern/flags

  /* let ans = prompt('Введите имя');

  let reg = /n/gi;
  // console.log(ans.search(reg));
  // console.log(ans.match(reg));
  console.log(reg.test(ans)); */

  // i - флаг регистра. Позволяет искать вне зависмости от регистра
  // g - флаг глобальности. Поиск ВСЕХ вхождений
  // m - флаг многосторочности.

  // \d - искать цыфры
  // \w - искать буквы
  // \s - искать пробелы

  /* let pass = prompt('Введите пароль');

  console.log(pass.replace(/./g, '*'));
  alert('12-34-56'.replace(/-/g, ':')); */

 /*  let ans = prompt('Введите число');

  let reg = /\d/g;

  console.log(ans.match(reg)); */

  let str = 'My name is/ R2D2';

  console.log(str.match(/ /i));
});