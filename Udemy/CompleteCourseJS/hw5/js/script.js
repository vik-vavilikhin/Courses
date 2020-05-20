'use strict';

// - Добавить пятый пункт
let menuItemsFive = document.createElement('li');
    menuItemsFive.classList.add('menu-item');
    menuItemsFive.textContent = 'Пятый пункт';

let menu = document.querySelector('.menu');
    menu.appendChild(menuItemsFive);

let menuItems = document.querySelectorAll('.menu .menu-item');

// - Изменить порядок следования пунктов меню
menuItems[2].after(menuItems[1]);

// - Заменить картинку заднего фона на другую из папки img
document.body.style.background = 'url(../img/apple_true.jpg) center no-repeat';

// - Поменять заголовок, добавить слово "подлинную"
let title = document.querySelector('#title');
    title.textContent = 'Мы продаем только подлинную технику Apple';

// - Удалить рекламу со страницы
let adv = document.querySelector('.adv');
let columns = document.querySelectorAll('.column');
    columns[1].removeChild(adv);

// - Спросить у пользователя отношение к технике apple
//   и записать ответ в блок на странице с id "prompt"
let question = prompt('Как Вы относитесь к продукции Apple?', '');
let answer = document.querySelector('#prompt');
    answer.textContent = question;

console.log(menuItems);
