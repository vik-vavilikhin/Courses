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
  // @@include('./modules/1.js')
  // // ====== dynamicAdapt =====================
const elemMove = (dataAttribute) => {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить массив из всех элементов с атрибутом 'dataAttribute'
  const elemArr = Array.from(document.querySelectorAll(`[${dataAttribute}]`));

  elemArr.forEach(item => {
    // Получить значение атрибута 'dataAttribute' текущего элемента
    const stringOfAttribute = item.getAttribute(`${dataAttribute}`);
    // Полученную строку преобразовать в массив
    // если в строке есть пробелы, удалить через рег.выражение
    const arrayFromString = stringOfAttribute.replace(/\s+/g, '').split(',');
    // -----------------------------
    // ОТКУДА будет перенос
    const from = item.parentNode;
    // Массив дочерних элементов
    const elemsInFrom = Array.from(from.children);
    // Индекс старой позиции
    const oldIndex = elemsInFrom.indexOf(item);
    // -----------------------------
    // КУДА будет пернос из 'dataAttribute'
    const to = document.querySelector(`.${arrayFromString[0]}`);
    // Массив дочерних элементов
    const elemsInTo = Array.from(to.children);
    // Индекс новой позиции из 'dataAttribute' 
    const newIndex = parseInt(arrayFromString[1]);
    // -----------------------------
    // "точка перелома" из 'dataAttribute'
    const breakPoint = parseInt(arrayFromString[2]);
    // -----------------------------
    // Индикатор перемещения
    let wasReplace = false;
    // В зависимости от размера документа переносить элемент
    window.addEventListener('resize', () => {
      // Динамическое определение ширины документа
      clientWidth = document.documentElement.clientWidth;
      // Перебрать элементы массива элементов

      // Если ширина меньше breakPoint
      if (clientWidth <= breakPoint) {
        // Если первоначальные позиции для элементов
        if (!wasReplace) {
          // переместить item как дочерний в to 
          // на позицию newIndex
          to.insertBefore(item, elemsInTo[newIndex]);
          console.log('to: ', to);
          wasReplace = true;
        }
      } else {
        if (wasReplace) {
          wasReplace = false;
          // from.insertBefore(item, elemsInFrom[oldIndex]);
          console.log('ind: ', oldIndex);
          console.log('elem: ', elemsInFrom[oldIndex]);
          console.log('from: ', from);
        }

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