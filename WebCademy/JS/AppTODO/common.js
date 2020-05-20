'use strict';

const inputElement = document.getElementById('input');
const ulElement = document.getElementById('list');

const actionPanel1 = document.getElementById('actionPanel1');
const actionPanel2 = document.getElementById('actionPanel2');

let todoList = [];
actionPanel2.style.display = 'none';

inputElement.addEventListener('keydown', event => {
  if ( event.keyCode === 13 || event.key === 'Enter') {
    const blankElement = inputElement.value.trim();
    if (blankElement !== '') {
      todoList.unshift({
        content: blankElement,
        done: false,
        selected: false,
      });
    } else {
      console.log('Пустая строка! Введите какое-нибудь значение...');
    }
    inputElement.value = '';
    upgradeView();
  }
})

function upgradeView() {
  ulElement.innerHTML = '';

  for (let index = 0; index < todoList.length; index++) {
    const todoItem = todoList[index];
    const idInput = 'todoItem' + index;

    const liElement = document.createElement('li');
    liElement.className = 'list-group-item';
    ulElement.append(liElement);
    
    const divElement = document.createElement('div');
    divElement.className = 'form-group form-check';
    liElement.append(divElement);
    
    const checkboxElement = document.createElement('input');
    divElement.append(checkboxElement);
    checkboxElement.className = 'form-check-input';
    checkboxElement.type = 'checkbox';
    checkboxElement.id = idInput;
    checkboxElement.checked = todoItem.selected;
    
    checkboxElement.addEventListener('change', () => {
      todoItem.selected = checkboxElement.checked;
      upgradeView();
    })
    
    const labelElement = document.createElement('label');
    divElement.append(labelElement);
    labelElement.className = 'form-check-label';
    if (todoItem.done) {
      labelElement.className += ' todoDone';
    }
    labelElement.setAttribute('for', idInput);
    labelElement.innerText = todoItem.content;
    
    if (!todoItem.done) {
      const buttonDoneElement = document.createElement('button');
      divElement.append(buttonDoneElement);
      buttonDoneElement.type = 'button';
      buttonDoneElement.className = 'btn btn-primary';
      buttonDoneElement.innerText = 'Done';
      buttonDoneElement.style = 'float: right;'
      
      buttonDoneElement.addEventListener('click', () => {
        todoItem.done = !todoItem.done;
        upgradeView();
      })
    } else {
      const buttonRemoveElement = document.createElement('button');
      divElement.append(buttonRemoveElement);
      buttonRemoveElement.type = 'button';
      buttonRemoveElement.className = 'btn btn-danger';
      buttonRemoveElement.innerText = 'Remove';
      buttonRemoveElement.style = 'float: right;'
      
      buttonRemoveElement.addEventListener('click', () => {
        todoList = todoList.filter(currentToDoItem => currentToDoItem !== todoItem);
        upgradeView();
      })
    }
  }
  const someSelected = todoList.some(todoItem => todoItem.selected);
  if (someSelected) {
    actionPanel1.style.display = 'none';
    actionPanel2.style.display = 'block';
  } else {
    actionPanel1.style.display = 'flex';
    actionPanel2.style.display = 'none';
  }
}

document.getElementById('selectAllButton').addEventListener('click', () => {
  for (const todoItem of todoList) {
    todoItem.selected = true;
  }
  upgradeView();
})

document.getElementById('doneAction').addEventListener('click', () => {
  for (const todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = true;
      todoItem.selected = false;
    }
  }
  upgradeView();
});

document.getElementById('restoreAction').addEventListener('click', () => {
  for (const todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = false;
      todoItem.selected = false;
    }
  }
  upgradeView();
});

document.getElementById('removeAction').addEventListener('click', () => {
  todoList = todoList.filter(todoItem => !todoItem.selected);
  upgradeView();
});
