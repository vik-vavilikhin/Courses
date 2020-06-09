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
    // Определить ОТКУДА будет перенос
    const oldParent = item.parentElement;
    // Полученную строку преобразовать в массив
    const arrayFromString = stringOfAttribute.split(', ');
    // Определить КУДА будет пернос из 'dataAttribute'
    const newParent = document.querySelector(`.${arrayFromString[0]}`);
    // Определить индекс новой позиции из 'dataAttribute' 
    const newPosition = parseInt(arrayFromString[1]);
    // Определить "точку перелома" из 'dataAttribute'
    const breakPoint = parseInt(arrayFromString[2]);
    // ========================
    let oldPosition; // Пустая переменная. Определяется в oldData()
    const oldCollection = []; // Старая коллекция элементов ОТКУДА
    const newCollection = []; // Новая коллекция элементов КУДА

    // ========================
    // Данные о старом месте расположении:
    // - родитель
    // - старая колекция элементов
    const oldData = (parent) => {
      // Дочерние элементы
      const elemsInParent = parent.children;
      for (let i = 0; i < elemsInParent.length; i++) {
        // Проверка дочених элементов
        // Если проверяемый элемент из коллекции
        // с 'dataAttribute'
        if (item == elemsInParent[i]) {
          // ...запомнить текущий индекс в коллекции
          oldPosition = i;
          // console.log('oldPosition: ', oldPosition);
        }
        // ...записать дочерний элемент в массив
        // для дальнейшей обработки
        oldCollection.push(elemsInParent[i]);
      }
    };
    oldData(oldParent);

    // ========================
    // Коллекция нового места назначения
    const newData = (parent) => {
      // Дочерние элементы
      const elemsInParent = parent.children;
      // Выборка дочерних элементов
      for (let i = 0; i < elemsInParent.length; i++) {
        // ...записать дочерний элемент в массив
        // для дальнейшей обработки
        newCollection.push(elemsInParent[i]);
      }
    };
    newData(newParent);

    // ========================
    // Заполнить массив значений
    listItems.push({
      elemSelector: item,
      breakPoint,
      oldData: {
        oldParent,
        oldPosition,
        oldCollection,
      },
      newData: {
        newParent,
        newPosition,
        newCollection,
      },
    });
  });
  console.log(listItems);
  // ========================
  // 
  const repaceElem = () => {
    listItems.forEach(item => {

      let i;
      let oldPosition = item.oldData.oldPosition;
      const oldCollection = item.oldData.oldCollection;

      let newPosition = item.newData.newPosition;
      const newCollection = item.newData.newCollection;

      let elem = oldCollection.splice(oldPosition, 1);
      newCollection.splice(newPosition, 0, elem[0]);
    });
  };
  repaceElem();
  // ========================

  // Обработать элементы массива значений
  listItems.forEach(({
    breakPoint,
    elemSelector,
    newData: {
      newParent,
      newPosition,
    },
    oldData: {
      oldParent,
      oldPosition,
    }
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