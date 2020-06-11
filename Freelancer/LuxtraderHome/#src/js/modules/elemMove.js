// ====== dynamicAdapt =====================
const elemMove = (dataAttribute) => {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить все элементы с атрибутом 'dataAttribute'
  const elemArr = document.querySelectorAll(`[${dataAttribute}]`);
  // Массив значений
  const listItems = [];

  // Обработка полученных элементов
  elemArr.forEach(item => {
    // Получить значение атрибута 'dataAttribute' текущего элемента
    const stringOfAttribute = item.getAttribute(`${dataAttribute}`);
    // Полученную строку преобразовать в массив
    // если в строке есть пробелы, удалить через рег.выражение
    const arrayFromString = stringOfAttribute.replace(/\s+/g, '').split(',');
    // Определить индекс новой позиции
    const newPosition = parseInt(arrayFromString[1]);
    // Определить "точку перелома"
    const breakPoint = parseInt(arrayFromString[2]);
    // Определить первоначальный родительский элемент 
    // ОТКУДА будет перенос
    const oldParent = item.parentElement;
    // Получить новый родительский элемент
    // КУДА будет пернос
    const newParent = document.querySelector(`.${arrayFromString[0]}`);
    let oldPosition;
    const oldCollection = [];
    const newCollection = [];

    // ========================
    // Найти индекс расположения элемента в старой коллекции
    // const oldPosition = (parent) => {
    //   const elemInParent = parent.children;

    //   for (let i = 0; i < elemInParent.length; i++) {
    //     if (item == elemInParent[i]) oldPosition = i;
    //   }
    // };
    // ========================
    // const oldCollection = (parent) => {
    //   const elemInParent = parent.children;

    //   for (let i = 0; i < elemInParent.length; i++) {
    //     oldCollection.push(elemInParent[i]);
    //   }
    //   return oldCollection;
    // };
    // ========================
    // 
    const oldData = (parent) => {
      const elemInParent = parent.children;
      for (let i = 0; i < elemInParent.length; i++) {

        if (item == elemInParent[i]) {
          oldPosition = i;
        }
        oldCollection.push(elemInParent[i]);
      }
    };
    oldData(oldParent);

    // ========================
    // Коллекция нового места назначения
    const newData = (parent, newIndex) => {
      const elemInParent = parent.children;

      for (let i = 0; i < elemInParent.length; i++) {
        // if (newIndex == i) {
        newCollection.push([newIndex] = elemInParent);
      }
    };

    // ========================
    // Заполнить массив значений
    listItems.push({
      breakPoint,
      elemSelector: item,
      newParent,
      newPosition,
      newCollection,
      oldParent,
      oldPosition,
      oldCollection,
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