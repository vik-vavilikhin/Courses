'use strict';

const productsContainer = document.querySelector('#productsContainer');
const cartItemsHolder = document.querySelector('#cartItemsHolder');
const cartEmpty = document.querySelector('#cartEmpty');
const cartTotal = document.querySelector('#cartTotal');
      cartTotal.style.display = 'none'

const items = [
  {
    id: 1,
    title: 'Калифорния хит',
    price: 300,
    weight: 180,
    itemsInBox: 6,
    img: 'california-hit.jpg',
    counter: 1
  },
  {
    id: 2,
    title: 'Калифорния темпура',
    price: 250,
    weight: 205,
    itemsInBox: 6,
    img: 'california-tempura.jpg',
    counter: 1
  },
  {
    id: 3,
    title: 'Запеченый ролл «Калифорния»',
    price: 230,
    weight: 182,
    itemsInBox: 6,
    img: 'philadelphia.jpg',
    counter: 1
  },
  {
    id: 4,
    title: 'Филадельфия',
    price: 320,
    weight: 230,
    itemsInBox: 6,
    img: 'zapech-california.jpg',
    counter: 1
  }
]

const state = {
  items,
  cart: []
}

const renderItems = (item) => {
  const murkup = `
    <div class="col-md-6">
      <div class="card mb-4" data-productid="${item.id}">
        <img class="product-img" src="img/roll/${item.img}" alt="${item.title}">
        <div class="card-body text-center">
          <h4 class="item-title">${item.title}</h5>
          <p><small class="text-muted">${item.itemsInBox} шт.</small></p>

          <div class="details-wrapper">
            <div class="items">
              <div class="items__control" data-click="minus">-</div>
              <div class="items__current" data-count>${item.counter}</div>
              <div class="items__control" data-click="plus">+</div>
            </div>

            <div class="price">
              <div class="price__weight">${item.weight} г.</div>
              <div class="price__currency">${item.price} ₽</div>
            </div>
          </div>

          <button type="button" class="btn btn-block btn-outline-warning" data-click="addToCard">+ в корзину</button>
          
        </div>
      </div>
    </div>
  `;

  productsContainer.insertAdjacentHTML('afterbegin', murkup);
}

const renderItemInCart = (item) => {
  const murkup = `
    <div class="cart-item">
      <div class="cart-item__top">
        <div class="cart-item__img">
          <img src="img/roll/${item.img}" alt="">
        </div>
        <div class="cart-item__desc">
          <div class="cart-item__title">${item.title}</div>
          <div class="cart-item__weight">${item.itemsInBox} шт. / ${item.weight}г.</div>

          <!-- cart-item__details -->
          <div class="cart-item__details">

            <div class="items items--small">
              <div class="items__control">-</div>
              <div class="items__current">${item.items}</div>
              <div class="items__control">+</div>
            </div>

            <div class="price">
              <div class="price__currency">${item.price} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  cartItemsHolder.insertAdjacentHTML('afterbegin', murkup);
}

const itemUpdateCounter = (id, type) => {
  const itemIndex = state.items.findIndex((element) => {
    if (element.id == id) { return true; }
  })

  let count = state.items[itemIndex].counter;

  if (type == 'minus') {
    if (count - 1 > 0) {
      count--;
      state.items[itemIndex].counter = count;
    }
  }
  if (type == 'plus') {
    count++;
    state.items[itemIndex].counter = count;
  }
}

const itemUpdateViewCounter = (id) => {
  const itemIndex = state.items.findIndex((element) => {
    if (element.id == id) { return true; }
  })

  const countToShow = state.items[itemIndex].counter;

  const currentProduct = productsContainer.querySelector(`[data-productid="${id}"]`);
  const counter = currentProduct.querySelector('[data-count]');
  counter.innerText = countToShow;
}

const checkCart = () => {
  if (state.cart.length > 0) {
    cartEmpty.style.display = 'none';
    cartTotal.style.display = 'block';
  }
}

const addToCart = (id) => {
  const itemIndex = state.items.findIndex((element) => {
    if (element.id == id) { return true; }
  })

  const newItem = {
    id: state.items[itemIndex].id,
    title: state.items[itemIndex].title,
    price: state.items[itemIndex].price,
    weight: state.items[itemIndex].weight,
    itemsInBox: state.items[itemIndex].itemsInBox,
    img: state.items[itemIndex].img,
    items: state.items[itemIndex].counter
  }

  state.cart.push(newItem);

  state.items[itemIndex].counter = 1;
  itemUpdateViewCounter(id);

  cartItemsHolder.innerHTML = '';

  state.cart.forEach(renderItemInCart)

  checkCart();
  
  // console.log(state.cart);
}

state.items.forEach(renderItems);

productsContainer.addEventListener('click', (e) => {
  const id = e.target.closest('[data-productid]').dataset.productid;

  if (e.target.matches('[data-click="minus"]')) {
    itemUpdateCounter(id, 'minus');
    itemUpdateViewCounter(id);

  } else if (e.target.matches('[data-click="plus"]')) {
    itemUpdateCounter(id, 'plus');
    itemUpdateViewCounter(id);

  } else if (e.target.matches('[data-click="addToCard"]')) {
    addToCart(id);
    // console.log('!!!')
  }
});