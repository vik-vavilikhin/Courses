// ====== dynamicAdapt =====================
const elemMove = (dataAttribute) => {
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить массив из всех элементов с атрибутом 'dataAttribute'
  const elemArr = Array.from(document.querySelectorAll(`[${dataAttribute}]`));

  elemArr.forEach(item => {
    // Получить значение атрибута 'dataAttribute' текущего элемента
    const stringOfAttribute = item.getAttribute(`${dataAttribute}`);
    // Полученную строку преобразовать в массив
    // если в строке есть пробелы, удалить через рег.выражение
    const arrayFromString = stringOfAttribute.replace(/\s+/g, '').split(',');
    // -----------------------------
    // ОТКУДА будет перенос
    const from = item.parentNode;
    // Массив дочерних элементов
    const elemsInFrom = Array.from(from.children);
    // Индекс старой позиции
    const oldIndex = elemsInFrom.indexOf(item);
    // -----------------------------
    // КУДА будет пернос из 'dataAttribute'
    const to = document.querySelector(`.${arrayFromString[0]}`);
    // Массив дочерних элементов
    const elemsInTo = Array.from(to.children);
    // Индекс новой позиции из 'dataAttribute' 
    const newIndex = parseInt(arrayFromString[1]);
    // -----------------------------
    // "точка перелома" из 'dataAttribute'
    const breakPoint = parseInt(arrayFromString[2]);
    // -----------------------------
    // Индикатор перемещения
    let wasReplace = false;
    // В зависимости от размера документа переносить элемент
    window.addEventListener('resize', () => {
      // Динамическое определение ширины документа
      clientWidth = document.documentElement.clientWidth;
      // Перебрать элементы массива элементов

      // Если ширина меньше breakPoint
      if (clientWidth <= breakPoint) {
        // Если первоначальные позиции для элементов
        if (!wasReplace) {
          // переместить item как дочерний в to 
          // на позицию newIndex
          to.insertBefore(item, elemsInTo[newIndex]);
          console.log('to: ', to);
          wasReplace = true;
        }
      } else {
        if (wasReplace) {
          wasReplace = false;
          // from.insertBefore(item, elemsInFrom[oldIndex]);
          console.log('ind: ', oldIndex);
          console.log('elem: ', elemsInFrom[oldIndex]);
          console.log('from: ', from);
        }

      }
    });
  });
};