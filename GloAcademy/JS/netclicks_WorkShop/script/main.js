document.addEventListener('DOMContentLoaded', () => {
  'use script';

  /*===========================================
                   Элементы DOM
  ===========================================*/
  const leftMenu = document.querySelector('.left-menu');
  const hamburger = document.querySelector('.hamburger');
  const tvCard = document.querySelectorAll('.tv-card');

  // Открыть-закрыть MENU по кнопке
  hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
  });

  // Закрыть меню. Используется метод .closest()
  // отслеживается 'click' по всему Document
  // и "всплываем" до элемента с className = 'left-menu'
  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('.left-menu')) {
      leftMenu.classList.remove('openMenu');
      hamburger.classList.remove('open');
    }
  });

  // Делегирование события 'click' дочернему элементу
  leftMenu.addEventListener('click', (event) => {
    const target = event.target;
    const dropDown = target.closest('.dropdown');

    if (dropDown) {
      dropDown.classList.toggle('active');
      leftMenu.classList.add('openMenu');
      hamburger.classList.add('open');
    }
  });

  // Смена картинки при наведении на карточке
  // через "навешивание" слушателя на каждый элемент
  // с className = '.tv-card'
  tvCard.forEach((item) => {
    let oldSrc;

    item.addEventListener('mouseover', (event) => {
      const target = event.target;
      const image = target.closest('.tv-card__img');

      if (image) {
        // Получить значение текущей картинки
        // и запомнить в переменной
        oldSrc = image.src;
        // Поменять картинку на значение атрибута
        image.src = image.getAttribute('data-backdrop');
      }

    });

    item.addEventListener('mouseout', (event) => {
      const target = event.target;
      const image = target.closest('.tv-card__img');

      if (image) {
        // вернуть старое значение из переменной
        image.src = oldSrc;
      }
    });
  });
});