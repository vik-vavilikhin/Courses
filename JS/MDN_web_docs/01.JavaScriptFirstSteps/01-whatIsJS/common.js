/* ===============================
  Изменение надписи в элементе
=============================== */
let para = document.querySelector('p');

para.addEventListener('click', updateName);

function updateName() {
  let name = prompt('Enter a new name');
  para.textContent = 'Player 1: ' + name;
}


/* ===============================
  Добавление элементов в документ
=============================== */
// Функция: создает новый параграф и добавляет его вниз тела HTML.
function createParagraph() {
  let para = document.createElement('p');
  para.textContent = 'You clicked the button';
  document.body.appendChild(para);
}

/*
  1. Подучаем ссылки на все кнопки на странице и отсортировывает их в массиве.
  2. Перебираем все кнопки и добавляем к ним отслеживатель событийя нажатия.

  При нажатии любой кнопки, будет выполняться функция createParagraph().
*/
let buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', createParagraph);
}