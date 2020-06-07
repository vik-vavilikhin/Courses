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
    // ========================
    // Найти индекс расположения элемента в старой коллекции
    const oldPosition = (parent) => {
      const elemInParent = parent.children;
      let oldPosition;

      for (let i = 0; i < elemInParent.length; i++) {
        if (item == elemInParent[i]) oldPosition = i;
      }
      return oldPosition;
    };
    // ========================
    // Коллекция нового места назначения
    const newPlace = (parent) => {
      const elemInParent = parent.children;
      return elemInParent;
    };
    // console.log(newPlace(newParent));

    // ========================

    // Заполнить массив значений
    listItems.push({
      breakPoint: arrayFromString[2],
      elemSelector: item,
      newParent,
      newPosition: arrayFromString[1],
      oldParent,
      oldPosition: oldPosition(oldParent)
    });
  });
  console.log(listItems);

  // Обработать элементы массива значений
  listItems.forEach(({
    breakPoint,
    elemSelector,
    newParent,
    newPosition,
    oldParent,
    oldPosition,
  }) => {
    // Определить позицию вставки на новом месте
    const position =
      newPosition == 1 ? 'beforebegin' :
      newPosition == 2 ? 'afterbegin' :
      newPosition == 3 ? 'beforeend' :
      'afterend';

    // В зависимости от размера документа переносить элемент
    window.addEventListener('resize', () => {
      // Динамическое определение ширины документа
      clientWidth = document.documentElement.clientWidth;
      // Взять текущий элемент массива
      const selectorForMove = elemSelector;
      // Если ширина меньше breakPoint
      if (clientWidth <= breakPoint) {

        if (selectorForMove.parentNode) {
          // Удалить элемент из старой позиции
          selectorForMove.parentNode.removeChild(selectorForMove);
          // Вставить на новую позицию
          newParent.insertAdjacentElement(position, selectorForMove);
        }
      } else {
        oldParent.insertAdjacentElement('afterbegin', selectorForMove);
      }
    });
  });
};