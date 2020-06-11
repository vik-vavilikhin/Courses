// ====== Burger ===========================
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