// ====== burgerActive =====================
/*
  - iconMenuElem - меню-бургер '.icon-menu'
  - menuBodyElem - основное меню навигации '.menu__body'
*/
const burgerActive = function () {
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  if (iconMenu != null) {
    const body = document.querySelector('body');

    let delay = 500;
    iconMenu.addEventListener('click', (e) => {
      if (!body.classList.contains('_wait')) {
        // bodyLock(delay);
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
      }
    });
  }
};
// -----------------------------------------------

function menuClose() {
  var iconMenu = document.querySelector(".icon-menu");
  var menuBody = document.querySelector(".menu__body");
  iconMenu.classList.remove("_active");
  menuBody.classList.remove("_active");
} //=================