'use strict';

/*============================================*/
const btnAuth = document.querySelector('.button-auth'),
  modal = document.querySelector('.modal'),
  close = document.querySelector('.close'),
  cartButton = document.querySelector('#cart-button'),
  btnAuthClose = document.querySelector('.close-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  btnOut = document.querySelector('.button-out'),
  cardsRestaurants = document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector('.container-promo'),
  restaurants = document.querySelector('.restaurants'),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu'),
  restaurantTitle = document.querySelector('.restaurant-title'),
  rating = document.querySelector('.rating'),
  minPrice = document.querySelector('.section-heading .price'),
  category = document.querySelector('.category'),
  inputSearch = document.querySelector('.input-search'),
  modalBody = document.querySelector('.modal-body'),
  modalPricetag = document.querySelector('.modal-pricetag'),
  clearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('gloDelivery');

const cart = [];

/*============================================*/
const loadCart = function () {
  if (localStorage.getItem(login)) {
    JSON.parse(localStorage.getItem(login)).forEach(function (item) {
      cart.push(item);
    });
  }
};

/*============================================*/
const saveCart = function () {
  localStorage.setItem(login, JSON.stringify(cart));
};

/*============================================*/
const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`
    Ошибка по адресу ${url}, стутс ошибки ${response.status}!
    `);
  }
  return await response.json();
};

/*============================================*/
const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
};

/*============================================*/
const toggleModal = function () {
  modal.classList.toggle('is-open');
};

/*============================================*/
const toggleModalAuth = function () {
  loginInput.style.borderColor = '';
  modalAuth.classList.toggle('is-open');
};

/*============================================*/
const authorized = function () {
  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    cart.length = '';

    btnAuth.style.display = '';
    userName.style.display = '';
    btnOut.style.display = '';
    cartButton.style.display = '';

    btnOut.removeEventListener('click', logOut);

    checkAuth();
    returnMain();
  }

  // console.log('Авторизован');
  btnAuth.style.display = 'none';

  userName.textContent = login;
  userName.style.display = 'inline';
  btnOut.style.display = 'flex';
  cartButton.style.display = 'flex';

  btnOut.addEventListener('click', logOut);
  loadCart();
};

/*============================================*/
const notAuthorized = function () {
  // console.log('Не авторизован');
  function logIn(event) {
    event.preventDefault();

    if (valid(loginInput.value.trim())) {
      // loginInput.style.borderColor = 'red';
      login = loginInput.value;

      localStorage.setItem('gloDelivery', login);

      toggleModalAuth();

      btnAuth.removeEventListener('click', toggleModalAuth);
      btnAuthClose.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);

      logInForm.reset();
      checkAuth();

    } else {
      loginInput.style.borderColor = 'red';
      loginInput.value = '';
    }
  }

  btnAuth.addEventListener('click', toggleModalAuth);
  btnAuthClose.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

/*============================================*/
const checkAuth = function () {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};

/*============================================*/
const createCardsRestaurants = function ({
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery: timeOfDelivery,
}) {
  const card = document.createElement('a');
  card.className = 'card card-restaurant';
  card.products = products;
  card.info = [name, price, stars, kitchen];

  card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">${stars}</div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  `);

  cardsRestaurants.insertAdjacentElement('beforeend', card);

};

/*============================================*/
const createCardGood = function ({
  id,
  name,
  description,
  price,
  image,
}) {
  const card = document.createElement('div');

  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="${name}" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart" id="${id}">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
};

/*============================================*/
const returnMain = function () {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
};

/*============================================*/
const openGoods = function (event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if (restaurant) {
    if (login) {
      const [name, price, stars, kitchen] = restaurant.info;

      cardsMenu.textContent = '';

      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} ₽`;
      category.textContent = kitchen;

      getData(`./db/${restaurant.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    } else {
      toggleModalAuth();
    }
  }
};

/*============================================*/
const addToCart = function (event) {
  const target = event.target;
  const btnAddToCart = target.closest('.button-add-cart');

  if (btnAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = btnAddToCart.id;

    const food = cart.find(function (item) {
      return item.id === id;
    });

    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1
      });
    }
  }
  saveCart();
};

/*============================================*/
const renderCart = function () {
  modalBody.textContent = '';
  cart.forEach(function ({
    id,
    title,
    cost,
    count
  }) {
    const itemCart = `
    <div class="food-row">
      <span class="food-name">${title}</span>
      <strong class="food-price">${cost}</strong>
      <div class="food-counter">
        <button class="counter-button counter-minus" data-id=${id}>-</button>
        <span class="counter">${count}</span>
        <button class="counter-button counter-plus" data-id=${id}>+</button>
      </div>
    </div>
    `;

    modalBody.insertAdjacentHTML('afterbegin', itemCart);
  });
  const totalPrice = cart.reduce(function (result, item) {
    return result + (parseFloat(item.cost) * item.count);
  }, 0);

  modalPricetag.textContent = totalPrice + ' ₽';
};

/*============================================*/
const changeCount = function (event) {
  const target = event.target;
  if (target.classList.contains('counter-button')) {
    const food = cart.find(function (item) {
      return item.id == target.dataset.id;
    });

    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    }
    if (target.classList.contains('counter-plus')) food.count++;

    renderCart();
  }
  saveCart();
};

/*============================================*/
const findGood = function (event) {
  if (event.keyCode === 13) {
    const target = event.target;
    const value = target.value.toLowerCase().trim();

    target.value = '';

    if (!value || value.length < 3) {
      target.style.backgroundColor = 'tomato';
      setTimeout(function () {
        target.style.backgroundColor = '';
      }, 2000);
      return;
    }

    const goods = [];

    getData('./db/partners.json')
      .then(function (data) {
        const products = data.map(function (item) {
          return item.products;
        });
        products.forEach(function (product) {
          getData(`./db/${product}`)
            .then(function (data) {
              goods.push(...data);

              const searchGoods = goods.filter(function (item) {
                return item.name.toLowerCase().includes(value);
              });

              console.log(searchGoods);

              cardsMenu.textContent = '';

              containerPromo.classList.add('hide');
              restaurants.classList.add('hide');
              menu.classList.remove('hide');

              restaurantTitle.textContent = 'Результат поиска:';
              rating.textContent = '';
              minPrice.textContent = ``;
              category.textContent = '';

              return searchGoods;

            })
            .then(function (data) {
              if (!data.length) {
                restaurantTitle.textContent = 'По запросу ничего не найдено!';
                return;
              }
              data.forEach(createCardGood);
            });
        });
      });
  }
};

/*============================================*/
const init = function () {
  getData('./db/partners.json')
    .then(function (data) {
      data.forEach(createCardsRestaurants);
    });

  /*============================================*/
  cartButton.addEventListener('click', function () {
    renderCart();
    toggleModal();
  });

  clearCart.addEventListener('click', function () {
    cart.length = 0;
    renderCart();
  });

  modalBody.addEventListener('click', changeCount);

  close.addEventListener('click', toggleModal);

  cardsRestaurants.addEventListener('click', openGoods);

  logo.addEventListener('click', returnMain);

  cardsMenu.addEventListener('click', addToCart);

  inputSearch.addEventListener('keydown', findGood);

  /*============================================*/
  checkAuth();

  new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
    slidesPerView: 1
  });
};

/*============================================*/
init();