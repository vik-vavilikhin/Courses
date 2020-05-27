document.addEventListener('DOMContentLoaded', () => {
  'use script';

  const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
  const API_KEY = '3c0c35a5baa5178f9566bfcb61de01a4';

  /*===========================================
                 Элементы DOM
  ===========================================*/
  const leftMenu = document.querySelector('.left-menu');
  const hamburger = document.querySelector('.hamburger');
  const tvShowsList = document.querySelector('.tv-shows__list');
  const modal = document.querySelector('.modal');

  /*===========================================
                Работа с данными
  ===========================================*/
  const DBService = class {
    getData = async (url) => {
      const res = await fetch(url);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`
        не удалось получить данные по адресу:
        ${url}
        `)
      }
    }
    getTestData = () => {
      return this.getData('test.json');
    }
  }

  const renderCard = response => {
    tvShowsList.textContent = '';

    response.results.forEach(item => {
      const {
        "backdrop_path": backdrop,
        "name": title,
        "poster_path": poster,
        "vote_average": vote
      } = item;

      const posterIMG = poster ?
        (IMG_URL + poster) :
        'img/no-poster.jpg';

      const backdropIMG = backdrop ?
        (IMG_URL + backdrop) :
        posterIMG;

      const voteElem = (vote != 0) ?
        `<span class="tv-card__vote">${vote}</span>` :
        '';

      const card = document.createElement('li');
      card.className = 'tv-shows__item';
      card.innerHTML = `
        <a href="#" class="tv-card">
          ${voteElem}
          <img class="tv-card__img"
            src="${posterIMG}"
            data-backdrop="${backdropIMG}"
            alt="${title}">
          <h4 class="tv-card__head">${title}</h4>
        </a>
      `;

      tvShowsList.append(card);

    });

  };

  new DBService().getTestData().then(renderCard);

  /*===========================================
                  Обработчики
  ===========================================*/
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

  // Смена картинки при наведении на карточку
  const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if (card) {
      const img = card.querySelector('.tv-card__img');

      if (img.dataset.backdrop) {
        [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
      }
    }
  };

  tvShowsList.addEventListener('mouseover', changeImage);
  tvShowsList.addEventListener('mouseout', changeImage);

  /*====================================
               Модальное окно
  ====================================*/
  // Открытие
  tvShowsList.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target;
    const tvCard = target.closest('.tv-card');

    if (tvCard) {
      document.body.style.overflow = 'hidden';
      modal.classList.remove('hide');
    }
  });
  // Закрытие
  modal.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('modal') ||
      target.closest('.cross')) {
      modal.classList.add('hide');
    }
  });
});