document.addEventListener('DOMContentLoaded', () => {
  'use script';

  /*===========================================
                    Константы
  ===========================================*/
  const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

  /*===========================================
                  Элементы DOM
  ===========================================*/
  const leftMenu = document.querySelector('.left-menu');
  const hamburger = document.querySelector('.hamburger');
  const tvShowsList = document.querySelector('.tv-shows__list');
  const modal = document.querySelector('.modal');
  const tvShows = document.querySelector('.tv-shows');
  const tvCardImg = document.querySelector('.tv-card__img');
  const modalTitle = document.querySelector('.modal__title');
  const genresList = document.querySelector('.genres-list');
  const rating = document.querySelector('.rating');
  const description = document.querySelector('.description');
  const modalLink = document.querySelector('.modal__link');
  const searchForm = document.querySelector('.search__form');
  const searchFormInput = document.querySelector('.search__form-input');
  const preloader = document.querySelector('.preloader');
  const dropdown = document.querySelectorAll('.dropdown');
  const tvShowsHead = document.querySelector('.tv-shows__head');
  const posterWrapper = document.querySelector('.poster__wrapper');
  const modalContent = document.querySelector('.modal__content');
  const pagination = document.querySelector('.pagination');

  /*===========================================
                Работа с данными
  ===========================================*/
  const DBService = class {
    // Содается класс для работы с данными

    constructor() {
      this.SERVER = 'https://api.themoviedb.org/3';
      this.API_KEY = '3c0c35a5baa5178f9566bfcb61de01a4';
    }

    getData = async (url) => {
      // Получить данные по заданному адресу URL
      // метод получения асинхронный, поэтому пока 
      // данные не пришли, работа дальнейшего кода 
      // "висит"

      const res = await fetch(url);
      // Записать полученный результат в переменную
      if (res.ok) {
        // Проверить статусы, если запрос обработан и 
        // данные поучены (ok, status:200)
        return res.json();
        // Вернуть результат загрузки в виде объекта JSON
      } else {
        // В случае ошибки написать в консоль сообщение
        throw new Error(`
        не удалось получить данные по адресу:
        ${url}
        `)
      }
    }

    // Метод запускает получение данных 
    // из тестового файла
    getTestData = () => {
      return this.getData('test.json');
    }

    getTestCard = () => {
      return this.getData('card.json');
    }

    getSearchResult = query => {
      this.temp = `${this.SERVER}/search/tv?` +
        `api_key=${this.API_KEY}` +
        `&query=${query}` +
        `&language=ru-RU`;

      return this.getData(this.temp);
    }

    getTvShow = id => {
      return this.getData(
        `${this.SERVER}/tv/` +
        `${id}?` +
        `api_key=${this.API_KEY}` +
        `&language=ru-RU`
      );
    }

    getTopRated = () => {
      return this.getData(
        `${this.SERVER}/tv/top_rated?` +
        `api_key=${this.API_KEY}` +
        `&language=ru-RU`
      );
    }

    getPopular = () => {
      return this.getData(
        `${this.SERVER}/tv/popular?` +
        `api_key=${this.API_KEY}` +
        `&language=ru-RU`
      );
    }

    getToday = () => {
      return this.getData(
        `${this.SERVER}/tv/airing_today?` +
        `api_key=${this.API_KEY}` +
        `&language=ru-RU`
      );
    }

    getWeek = () => {
      return this.getData(
        `${this.SERVER}/tv/on_the_air?` +
        `api_key=${this.API_KEY}` +
        `&language=ru-RU`
      );
    }

    getNextPage = page => {
      return this.getData(this.temp + '&page=' + page);
    }
  };

  const dbService = new DBService();

  /*===========================================
                Функции общего значения
  ===========================================*/
  const changeImage = event => {
    // Смена картинки при наведении на карточку
    const card = event.target.closest('.tv-shows__item');

    if (card) {
      const img = card.querySelector('.tv-card__img');

      if (img.dataset.backdrop) {
        [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
      }
    }
  };

  const closeDropdown = () => {
    // Закрытие акардеона подменю при сворачивании
    // бокового меню
    dropdown.forEach(item => {
      item.classList.remove('active');
    });
  };

  /*===========================================
                Новые элементы
  ===========================================*/
  /* -----------------
    Карточки фильмов
  ------------------*/
  const renderCard = (response, target) => {
    // очищаем все карточки из предыдущих запросов
    tvShowsList.textContent = '';



    if (!response.total_results) {
      // Удалить прелоадер
      loading.remove();
      tvShowsHead.textContent = 'По Вашему запросу ничего не найдено...';
      tvShowsHead.style.cssText = `
        color: red; 
        text-align: center; 
        text-transform: uppercase;
      `;
      return;
    }

    tvShowsHead.textContent = target ? target.textContent : 'Результат поиска';
    tvShowsHead.style.cssText = '';

    // перебираем полученный объект
    response.results.forEach(item => {
      // деструктурируем полученные данные 
      // для каждой карточки
      const {
        'backdrop_path': backdrop,
        'name': title,
        'poster_path': poster,
        'vote_average': vote,
        id
      } = item;

      // ...в случае отсутствия постера 
      // ставится заглушка
      const posterIMG = poster ?
        (IMG_URL + poster) :
        'img/no-poster.jpg';

      // ...в случае отсутствия data-backdrop 
      // оставить начальный постер
      const backdropIMG = backdrop ?
        (IMG_URL + backdrop) :
        posterIMG;

      // ...в случае отсутствия рейтинга(равен 0 ), 
      // не выводить стикер с рейтингом
      const voteElem = (vote) ?
        `<span class="tv-card__vote">${vote}</span>` :
        '';

      // создать элемент списка
      // и задать класс новому элементу
      const card = document.createElement('li');
      card.className = 'tv-shows__item';
      // в созданный элемент вставить верстку с
      // данными из деструктуризации
      card.innerHTML = `
        <a href="#" id="${id}" class="tv-card">
          ${voteElem}
          <img class="tv-card__img"
            src="${posterIMG}"
            data-backdrop="${backdropIMG}"
            alt="${title}">
          <h4 class="tv-card__head">${title}</h4>
        </a>
      `;

      // Удалить прелоадер
      loading.remove();
      // вставить полученный элемент на страницу 
      // в блок списка карточек
      tvShowsList.append(card);
    });

    pagination.textContent = '';
    // if (!target && response.total_pages > 1) {
    if (response.total_pages > 1) {
      for (let i = 1; i <= response.total_pages; i++) {
        pagination.innerHTML += `
          <li>
            <a href="#" class="pages">${i}</a>
          </li>
        `;
      }
    }
  };

  /*-------------
      Прелоадер
  -------------*/
  const loading = document.createElement('div');
  loading.className = 'loading';


  /*===========================================
                  Обработчики
  ===========================================*/
  /*-------------
      Поиск
  -------------*/
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = searchFormInput.value.trim();

    if (value) {
      // tvShows.append(loading);
      // Вставить прелоадер
      dbService.getSearchResult(value)
        .then(renderCard);
      // Создать элемен класса для работы с данными
      // ...запустить метод класса для получения данных
      // ...который запускает метод обработки полученных данных
      // ...в случае корректной отработки запустить функцию
      //    отрисовки карточек
    }
    searchFormInput.value = '';
  });

  /*---------------------
      Кнопка "Гамбургер"
  ---------------------*/
  hamburger.addEventListener('click', () => {
    // Открыть-закрыть боковое меню по клику на
    // кнопке className="hamburger"
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropdown();
  });

  /*---------------
      Закрытие 
      бокового меню
      по клику вне
      меню
  ---------------*/
  document.addEventListener('click', (event) => {
    // Закрыть боковое меню. Используется метод .closest()
    // отслеживается 'click' по всему Document
    // и "всплываем" до элемента с className = 'left-menu'
    const target = event.target;

    if (!target.closest('.left-menu')) {
      leftMenu.classList.remove('openMenu');
      hamburger.classList.remove('open');
      closeDropdown();
    }
  });

  /*----------------------
      Боковое меню
      Аккордеон подменю
      окрытие/закрытие
  ----------------------*/
  leftMenu.addEventListener('click', (event) => {
    event.preventDefault();

    // Делегирование события 'click' дочернему элементу
    const target = event.target;
    const dropDown = target.closest('.dropdown');

    if (dropDown) {
      dropDown.classList.toggle('active');
      leftMenu.classList.add('openMenu');
      hamburger.classList.add('open');
    }

    // Работа с боковым меню.
    // обработка кликов по подменю
    if (target.closest('#top-rated')) {
      // Вставить прелоадер
      tvShows.append(loading);
      dbService.getTopRated()
        .then((response) => renderCard(response, target));
    }
    if (target.closest('#popular')) {
      // Вставить прелоадер
      tvShows.append(loading);
      dbService.getPopular()
        .then((response) => renderCard(response, target));
    }
    if (target.closest('#today')) {
      // Вставить прелоадер
      tvShows.append(loading);
      dbService.getToday()
        .then((response) => renderCard(response, target));
    }
    if (target.closest('#week')) {
      // Вставить прелоадер
      tvShows.append(loading);
      dbService.getWeek()
        .then((response) => renderCard(response, target));
    }
    if (target.closest('#search')) {
      tvShowsList.textContent = '';
      tvShowsHead.textContent = '';
    }
  });


  /*-------------------
      Семена картинки
      при наведении на
      карточки
  -------------------*/
  tvShowsList.addEventListener('mouseover', changeImage);
  tvShowsList.addEventListener('mouseout', changeImage);

  /*--------------------
      Модальное окно
      отобразить при
      клике на карточке
  --------------------*/
  tvShowsList.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
      // До запроса на сервер отобразить прелоадер
      preloader.style.display = 'block';
      // Получить данные с сервера по ID
      // и отобразить в модальном окне
      dbService.getTvShow(card.id)
        .then(({
          'poster_path': poster,
          'vote_average': vote,
          'name': title,
          genres,
          overview,
          homepage,
        }) => {
          if (poster) {
            tvCardImg.src = IMG_URL + poster;
            tvCardImg.alt = title;
            posterWrapper.style.display = '';
            modalContent.style.paddingLeft = '';
          } else {
            posterWrapper.style.display = 'none';
            modalContent.style.paddingLeft = '25px';
          }

          modalTitle.textContent = title;
          genresList.textContent = '';
          genres.forEach(item => {
            genresList.innerHTML += `<li>${item.name}</li>`;
          });
          rating.textContent = vote;
          description.textContent = overview;
          modalLink.href = homepage;
        })
        .then(() => {
          // Убрать у BODY полосы прокрутки
          document.body.style.overflow = 'hidden';
          // Удалить у модального окна className = 'hide'
          // ...что приведет к отображению модального окна
          modal.classList.remove('hide');
        })
        .finally(() => {
          // После получения и обработки данных с  
          // сервера и отображения модального окна
          // убрать прелоадер с экрана
          preloader.style.display = '';
        });
    }
  });

  /*--------------------
      Модальное окно
      закрыть 
  --------------------*/
  modal.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('modal') ||
      target.closest('.cross')) {
      document.body.style.overflow = 'auto';
      modal.classList.add('hide');
    }
  });

  pagination.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('pages')) {
      tvShows.append(loading);

      dbService.getNextPage(target.textContent)
        .then(renderCard);
    }
  });
});