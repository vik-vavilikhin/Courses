import * as menu from './../b-menu/menu';

const selectorIconMenu = '.icon-menu';
const selectorBodyMenu = '.menu__body';

menu.burgerActive(selectorIconMenu, selectorBodyMenu);

document.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.closest(selectorIconMenu) &&
    !target.closest(selectorBodyMenu)) {
    menu.menuClose(selectorIconMenu, selectorBodyMenu);
  }
});