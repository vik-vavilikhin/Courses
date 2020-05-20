'use strict';

/* 
// Установить значение ключа
localStorage.setItem('number', 1);
// Получить значение ключа
console.log(localStorage.getItem('number'));

// Удалить значение ключа
localStorage.removeItem('number');
// Очистить хранилище localStorage
localStorage.clear();
*/
window.addEventListener('DOMContentLoaded', function() {
  let checkBox = document.getElementById('disabledFieldsetCheck');
  let change = document.getElementById('change');
  let fieldset = document.getElementsByTagName('fieldset')[0];

  if (localStorage.getItem('isChecked') === 'true') {
    checkBox.checked = true;
  }
  
  if (localStorage.getItem('bg') === 'changed') {
    fieldset.style.backgroundColor = '#FF4766';
  }

  checkBox.addEventListener('click', function() {
    localStorage.setItem('isChecked', true);
  });

  change.addEventListener('click', function() {
    localStorage.setItem('bg', 'changed');
    fieldset.style.backgroundColor = '#FF4766';
  });


  let persone = {
    name: 'Alex', 
    age: 15,
    tech: ['mobile', 'notebook']
  };
  let serializedPerson = JSON.stringify(persone);
  localStorage.setItem('Alex', serializedPerson);

  console.log(JSON.parse(localStorage.getItem('Alex')));
  
});