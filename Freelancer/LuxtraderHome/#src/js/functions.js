// ====== testWebP =========================
const testWebP = (callback) => {
  const webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  }
  //  else {
  //   document.querySelector('body').classList.add('no-webp');
  // }
});
// ====== Burger ===========================
const iconMenu = document.querySelector('.icon-menu');
if (iconMenu != null) {
  const body = document.querySelector('body');
  const menuBody = document.querySelector('.menu__body');
  let delay = 500;
  iconMenu.addEventListener('click', (e) => {
    if (!body.classList.contains('_wait')) {
      // bodyLock(delay);
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    }
  });
}

function menuClose() {
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  iconMenu.classList.remove('_active');
  menuBody.classList.remove('_active');
}