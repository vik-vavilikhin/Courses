document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const userHeaderIcon = document.querySelector('.user-header__icon');
  const userHeaderMenu = document.querySelector('.user-header__menu');
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  // @@include('./modules/inspectUserAgent.js')
  // // ====== testWebP =========================
const testWebP = () => {
  const webP = new Image();
  const cb = (support) => {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    }
    //  else {
    //   document.querySelector('body').classList.add('no-webp');
    // }
  };

  webP.onload = webP.onerror = () => {
    cb(webP.height == 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};
// =========================================
  // // ====== Burger ===========================
const burgerAction = function (iconMenuElem, menuBodyElem) {
  if (iconMenuElem != null) {
    const body = document.querySelector('body');

    let delay = 500;
    iconMenuElem.addEventListener('click', (e) => {
      if (!body.classList.contains('_wait')) {
        // bodyLock(delay);
        iconMenuElem.classList.toggle('_active');
        menuBodyElem.classList.toggle('_active');
      }
    });
  }
};
// =========================================
const menuClose = (iconMenuElem, menuBodyElem) => {
  iconMenuElem.classList.remove('_active');
  menuBodyElem.classList.remove('_active');
};
// =========================================
  // @@include('./modules/elemMove.js')
  // // ====== dynamicAdapt =====================
const elemMove = (dataAttribute) => {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить все элементы с атрибутом 'dataAttribute'
  const elemArr = document.querySelectorAll(`[${dataAttribute}]`);
  // Массив значений
  const listItems = [];

  // Обработка полученных элементов
  elemArr.forEach(item => {
    // Получить значение атрибута 'dataAttribute' текущего элемента
    const stringOfAttribute = item.getAttribute(`${dataAttribute}`);
    // Определить ОТКУДА будет перенос
    const oldParent = item.parentElement;
    // Полученную строку преобразовать в массив
    const arrayFromString = stringOfAttribute.split(', ');
    // Определить КУДА будет пернос из 'dataAttribute'
    const newParent = document.querySelector(`.${arrayFromString[0]}`);
    // Определить индекс новой позиции из 'dataAttribute' 
    const newPosition = parseInt(arrayFromString[1]);
    // Определить "точку перелома" из 'dataAttribute'
    const breakPoint = parseInt(arrayFromString[2]);
    // ========================
    let oldPosition; // Пустая переменная. Определяется в oldData()
    const oldCollection = []; // Старая коллекция элементов ОТКУДА
    const newCollection = []; // Новая коллекция элементов КУДА

    // ========================
    // Данные о старом месте расположении:
    // - родитель
    // - старая колекция элементов
    const oldData = (parent) => {
      // Дочерние элементы
      const elemInParent = parent.children;
      for (let i = 0; i < elemInParent.length; i++) {
        // Проверка дочених элементов
        // Если проверяемый элемент из коллекции
        // с 'dataAttribute'
        if (item == elemInParent[i]) {
          // ...запомнить текущий индекс в коллекции
          oldPosition = i;
        }
        // ...записать дочерний элемент в массив
        // для дальнейшей обработки
        oldCollection.push(elemInParent[i]);
      }
    };
    oldData(oldParent);

    // ========================
    // Коллекция нового места назначения
    const newData = (parent) => {
      // Дочерние элементы
      const elemInParent = parent.children;
      // Выборка дочерних элементов
      for (let i = 0; i < elemInParent.length; i++) {
        // ...записать дочерний элемент в массив
        // для дальнейшей обработки
        newCollection.push(elemInParent[i]);
      }
    };
    newData(newParent);

    // ========================
    // Заполнить массив значений
    listItems.push({
      breakPoint,
      elemSelector: item,
      newData: {
        newParent,
        newPosition,
        newCollection,
      },
      oldData: {
        oldParent,
        oldPosition,
        oldCollection,
      },
    });
  });
  console.log(listItems);

  // Обработать элементы массива значений
  listItems.forEach(({
    breakPoint,
    elemSelector,
    newData: {
      newParent,
      newPosition,
    },
    oldData: {
      oldParent,
      oldPosition,
    }
  }) => {
    // Определить позицию вставки на новом месте
    const position =
      newPosition == 1 ? 'beforebegin' :
      newPosition == 2 ? 'afterbegin' :
      newPosition == 3 ? 'beforeend' :
      'afterend';

    // В зависимости от размера документа переносить элемент
    window.addEventListener('resize', () => {
      // Динамическое определение ширины документа
      clientWidth = document.documentElement.clientWidth;
      // Взять текущий элемент массива
      const selectorForMove = elemSelector;
      // Если ширина меньше breakPoint
      if (clientWidth <= breakPoint) {

        if (selectorForMove.parentNode) {
          // Удалить элемент из старой позиции
          selectorForMove.parentNode.removeChild(selectorForMove);
          // Вставить на новую позицию
          newParent.insertAdjacentElement(position, selectorForMove);
        }
      } else {
        oldParent.insertAdjacentElement('afterbegin', selectorForMove);
      }
    });
  });
};

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.user-header__icon')) {
      userHeaderMenu.classList.remove('_active');
    }
  });

  userHeaderIcon.addEventListener('click', () => {
    userHeaderMenu.classList.toggle('_active');
  });

  testWebP();
  burgerAction(iconMenu, menuBody);
  elemMove('data-move');
});