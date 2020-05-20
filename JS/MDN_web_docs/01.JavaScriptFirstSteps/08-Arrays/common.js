'use strict';
// Запорашиваем селектор .main в DOM-дереве
let main = document.querySelector('.main');

// Создаем заголовок h2
// ...добавляем надпись заголовку
// ...помещаем заголовок в div.main и присваиваем класс - header
let header = document.createElement('h2');
    header.textContent = 'Live output';
    main.appendChild(header).className = 'header';

// Создаем список ul
// ...помещаем список в div.main и присваиваем класс - list
let list = document.createElement('ul');
    main.appendChild(list).className = 'list';

// Создаем параграф p
// ...помещаем параграф в div.main и присваиваем класс - totalBox
let totalBox = document.createElement('p');
    main.appendChild(totalBox).className = 'totalBox';

// Создаем поле ввада input
// ...добавляем полю ввода атрибут type='text'
// ...помещаем поле ввада в div.main и присваиваем класс - inputSearch
// let inputSearch = document.createElement('input');
//     inputSearch.setAttribute('type', 'text');
//     main.appendChild(inputSearch).className = 'inputSearch';

// Создаем кнопку button
// ...добавляем кнопке надпись
// ...помещаем кнопку в div.main и присваиваем класс - btnSearch
// let btnSearch = document.createElement('button');
//     btnSearch.textContent = 'Search';
//     main.appendChild(btnSearch).className = 'btnSearch';

// Создаем переменную и присваиваем значение 0
let total = 0;

// Очищаем созданый список от всех данных
// ...удаляем все надписи из параграфа
list.innerHTML = '';
totalBox.textContent = '';

// Создаем массив данных.
// ...массив содержит Наименование продукта и цену,
// ...записанные через двоеточие
const products = [
      'Underpants:6.99',
      'Socks:5.99',
      'T-shirt:14.99',
      'Trousers:31.99',
      'Shoes:23.99'
    ];

// Создаем пустой массив для
// ...хранения результатов поисковых запросов
let myHistory = [];

// Создаем массив для обработки всех записей массива
// ...начало работы с элемента с индексом 0
// ...конец обработки на элементе с индексом
// ...меньшим чем длина массива
for (let i = 0; i < products.length; i++) {
  let count = i + 1; //

  // Обрабатываем каждый элемент массива и создаем из
  // каждого элемента подмассив.
  // Данные в подмасив заносятся по разделителю - двоеточие
  // ...первый элемент подмассива заносится в переменную nameProduct
  // ...второй элемент подмассива заносится в переменную priceProduct
  let subArray = products[i].split(':');
  let nameProduct = subArray[0];
  let priceProduct = Number(subArray[1]);

  // Мое решение с использованием методов строк
  // let singPosition = products[i].indexOf(':');
  // let nameProduct = products[i].slice(0, singPosition);
  // let priceProduct = Number(products[i].slice(singPosition + 1));

  // Формируем переменную, в которую заносим полученные данные
  // ...например: 1. Название продукта - $цена
  let itemText = count +'. ' + nameProduct + ' - $' + priceProduct;

  // Создаем элемент списка li
  // ...добавляем элементу списка текст из пременной itemText
  // ... присваиваем элементу списка класс - list__item
  let listItem = document.createElement('li');
      // listItem.className = 'list__item';
      listItem.textContent = itemText;
      list.appendChild(listItem).className = 'list__item';

    // Формируем сумму всех продуктов в списке
    total += priceProduct;
}

// Добавляем текст в параграф со полной стоимостью по списку
totalBox.textContent = 'Total: $' + total.toFixed(2);
//
// btnSearch.onclick = function () {
//   if (inputSearch.value !== '') {
//   //  number 1
//
//   }
// }