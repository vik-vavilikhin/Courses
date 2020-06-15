// ====== backgroundImage ==================
/*
  Функция для обработки фоновых изображений
  Картинка берется из верски и подставляется в
  качестве свойства 'backgroundImage' родительского
  элемента.

  ИСТОЧНИК: https://www.youtube.com/watch?v=nTtuiBXKp88&list
  ИСХОДНИК: http://fls.guru/ibg.html
*/
const backgroundImage = () => {
  // '._ibg' - родительский элемент
  // Получить все родительские элементы в массив
  const ibg = document.querySelectorAll('._ibg');
  // ...перебрать все элементы массива
  ibg.forEach(item => {
    // ...найти в каждом элементе вложенный тег 'img'
    const image = item.querySelector('img');
    // ...если таковой найден
    if (image) {
      // ...получить значение атрибута 'src=""'
      const src = image.getAttribute('src');
      // ...добавить родительскому элементу фон - 'backgroundImage'
      // сответствующий вложенной картинке
      item.style.backgroundImage = `url(${src})`;
    }
  });
};
// ---------------------------------------------