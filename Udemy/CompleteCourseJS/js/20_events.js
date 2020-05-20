'use strict';

let btn = document.querySelectorAll('button');
let wrap = document. querySelector('.wrapper');
let link = document.querySelector('a');


// btn[0].onclick = function() {
//   alert('Нажата первая кнопка');
// };
// btn[0].onclick = function() {
//   alert('ОПЯТЬ Нажата первая кнопка');
// };

// btn[0].addEventListener('click', function(e) {
//   // console.log(e);
//   console.log(`Произошло событие: ${e.type} на элементе ${e.target}`);
//   // alert('Нажата первая кнопка');
// });

// wrap.addEventListener('click', function(e) {
//   // console.log(e);
//   console.log(`Произошло событие: ${e.type} на элементе ${e.target}`);
// });

// btn[0].addEventListener('click', function () {
//   alert('ОПЯТЬ Нажата первая кнопка');
// });

// btn[0].addEventListener('mouseenter', function() {
//   alert('Вы навели на первую кнопку');
// });

link.addEventListener('click', function(e) {
  e.preventDefault();
  console.log(`Произошло событие: ${e.type} на элементе ${e.target}`);
});

btn.forEach(function(item) {
  item.addEventListener('mouseleave', function() {
    console.log('Вышли из области кнопки');
  });
});