'use strict';
// Запорашиваем селектор .main в DOM-дереве
let main = document.querySelector('.main');

// Создаем заголовок h2
// ...добавляем надпись заголовку
// ...помещаем заголовок в div.main и присваиваем класс - header
let header = document.createElement('h2');
    header.textContent = 'Live output';
    main.appendChild(header).className = 'header';

// Создаем поле ввада input
// ...добавляем полю ввода атрибут type='text'
// ...помещаем поле ввада в div.main и присваиваем класс - inputSearch
let inputSearch = document.createElement('input');
    inputSearch.setAttribute('type', 'text');
    main.appendChild(inputSearch).className = 'inputSearch';

// Создаем кнопку button
// ...добавляем кнопке надпись
// ...помещаем кнопку в div.main и присваиваем класс - btnSearch
let btnSearch = document.createElement('button');
    btnSearch.textContent = 'Search';
    main.appendChild(btnSearch).className = 'btnSearch';

// Создаем список ul
// ...помещаем список в div.main и присваиваем класс - list
let list = document.createElement('ul');
    main.appendChild(list).className = 'list';

list.innerHTML = '';

let myHistory = [];

btnSearch.onclick = function() {
  // we will only allow a term to be entered if the search input isn't empty
  if (inputSearch.value !== '') {
    // number 1
    myHistory.unshift(inputSearch.value);
    // empty the list so that we don't display duplicate entries
    // the display is regenerated every time a search term is entered.
    list.innerHTML = '';

    // loop through the array, and display all the search terms in the list
    for (let i = 0; i < myHistory.length; i++) {
      let itemText = myHistory[i];
      let listItem = document.createElement('li');
      listItem.textContent = itemText;
      list.appendChild(listItem);
    }

    // If the array length is 5 or more, remove the oldest search term
    if (myHistory.length >= 5) {
      // number 2
      myHistory.pop();
    }

    // empty the search input and focus it, ready for the next term to be entered
    inputSearch.value = '';
    inputSearch.focus();
  }
}
