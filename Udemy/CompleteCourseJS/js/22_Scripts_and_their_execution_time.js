'use strict';

// let timerId = setTimeout(sayHello, 3000);
// clearTimeout(timerId);

// let timerId = setInterval(sayHello, 3000);
// clearTimeout(timerId);

// function sayHello() {
//   console.log('Hello world');
// }

// Рекурисивный вызов
// let timerId = setTimeout(function log() {
//   console.log('Hello');
//   setTimeout(log, 2000);
// });

let btnAnimate = document.querySelector('.btnAnimate');
let boxColor = document.querySelector('.boxColor');
// console.log(btnAnimate);
// console.log(boxColor);

function myAnimation() {
  let pos = 0;

  let id = setInterval(frame, 10);

  function frame() {
    if (pos == 300) {
      clearInterval(id);
    } else {
      pos++;
      boxColor.style.top = `${pos}px`;
      boxColor.style.left = `${pos}px`;
    }
  }
}

btnAnimate.addEventListener('click', myAnimation);

/* Делегирование */
let boxBtn = document.querySelector('.boxBtn');
let btns = document.getElementsByTagName('button');

boxBtn.addEventListener('click', function(e) {
  // if(e.target && e.target.tagName == 'BUTTON') {
  // if (e.target && e.target.classList.contains('first')) {
  if (e.target && e.target.matches('button.first')) {
    console.log('Hello');
  }
});