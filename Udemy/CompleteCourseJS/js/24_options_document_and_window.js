'use strict';

let box = document.querySelector('.box'),
    btn = document.querySelector('button');

let width = box.clientWidth,
    height = box.clientHeight;
    
console.log(`width ${width}, height ${height}`);
console.log(box.getBoundingClientRect().left);

console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight);
console.log(document.documentElement.scrollTop);

btn.addEventListener('click', () => {
  // box.style.height = box.scrollHeight + 'px';
  box.scrollTop = 0;
});

scrollBy(0, 200);
scrollTo(0, 200);