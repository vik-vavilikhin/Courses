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
  // // ====== dynamicAdapt =====================
const elemMove = () => {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить все элементы с атрибутом 'data-move'
  const elemArr = document.querySelectorAll(`[data-move]`);
  // Массив значений
  const listItems = [];

  // Обработка полученных элементов
  elemArr.forEach(item => {
    // Получить значение атрибута 'data-move' текущего элемента
    const stringOfAttribute = item.getAttribute('data-move');
    // Полученную строку преобразовать в массив
    const arrayFromString = stringOfAttribute.split(', ');
    // Определить первоначальный родительский элемент 
    // ОТКУДА будет перенос
    const oldParent = item.parentElement;
    // Получить новый родительский элемент
    // КУДА будет пернос
    const newParent = document.querySelector(`.${arrayFromString[0]}`);
    // ========================
    // Найти индекс расположения элемента в старой коллекции
    const oldPosition = (parent) => {
      const elemInParent = parent.children;
      let oldPosition;

      for (let i = 0; i < elemInParent.length; i++) {
        if (item == elemInParent[i]) oldPosition = i;
      }
      return oldPosition;
    };
    // ========================
    // Коллекция нового места назначения
    const newPlace = (parent) => {
      const elemInParent = parent.children;
      return elemInParent;
    };
    // console.log(newPlace(newParent));

    // ========================

    // Заполнить массив значений
    listItems.push({
      breakPoint: arrayFromString[2],
      elemSelector: item,
      newParent,
      newPosition: arrayFromString[1],
      oldParent,
      oldPosition: oldPosition(oldParent)
    });
  });
  console.log(listItems);

  // Обработать элементы массива значений
  listItems.forEach(({
    breakPoint,
    elemSelector,
    newParent,
    newPosition,
    oldParent,
    oldPosition,
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
  elemMove();
});