// ====== dynamicAdapt =====================
const elemMove = () => {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить все элементы с атрибутом 'data-move'
  const elemArr = document.querySelectorAll(`[data-move]`);
  // Массив значений
  const listItems = [];

  // Обработка полученных элементов
  elemArr.forEach(item => {
    // Получить значение атрибута 'data-move' текущего элемента
    const stringOfAttribute = item.getAttribute('data-move');
    // Полученную строку преобразовать в массив
    const arrayFromString = stringOfAttribute.split(', ');
    // Определить первоначальный родительский элемент 
    // ОТКУДА будет перенос
    const oldParent = item.parentElement;
    // Получить новый родительский элемент
    // КУДА будет пернос
    const newParent = document.querySelector(`.${arrayFromString[0]}`);

    // Заполнить массив
    listItems.push({
      breakPoint: arrayFromString[2],
      elemSelector: item,
      newParent,
      newPosition: arrayFromString[1],
      oldParent,
    });
  });
  // console.log(listItems);

  // Обработать элементы массива значений
  listItems.forEach(item => {
    // Определить позицию вставки на новом месте
    let newPosition =
      item.newPosition == 1 ? 'beforebegin' :
      item.newPosition == 2 ? 'beforeend' :
      item.newPosition == 3 ? 'beforeend' :
      'afterend';

    // В зависимости от размера документа переносить элемент
    window.addEventListener('resize', () => {
      // Динамическое определение ширины документа
      clientWidth = document.documentElement.clientWidth;
      // Взять текущий элемент массива
      const selectorForMove = item.elemSelector;
      // Если ширина меньше breakPoint
      if (clientWidth <= item.breakPoint) {

        if (selectorForMove.parentNode) {
          // Удалить элемент из старой позиции
          selectorForMove.parentNode.removeChild(selectorForMove);
          // Вставить на новую позицию
          item.newParent.insertAdjacentElement(newPosition, selectorForMove);
        }
      } else {
        item.oldParent.insertAdjacentElement('afterbegin', selectorForMove);
      }
    });
  });
};