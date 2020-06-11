// ====== dynamicAdapt =====================
const elemReplace = () => {
  const dataAttribute = 'data-move';
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
    // Объект данных
    const data = {
      // "точка перелома" из 'dataAttribute'
      breakPoint: parseInt(arrayFromString[2]),
      // ОТКУДА будет перенос
      from: item.parentNode,
      // Индекс текущей позиции
      idFrom: Array.from(item.parentNode.children).indexOf(item),
      // КУДА будет пернос из 'dataAttribute'
      to: document.querySelector(`.${arrayFromString[0]}`),
      // Индекс новой позиции из 'dataAttribute' 
      idTo: parseInt(arrayFromString[1]),
      // Индикатор перемещения
      wasMove: false
    };
    // console.log(data);

    // -----------------------------

    // Отрисовка элемента с новыми данными
    const replace = ({
      from,
      idFrom,
      to,
      idTo,
      wasMove
    }) => {
      // -----------------------------------
      // ОТКУДА перемещаем
      let arrFrom = Array.from(from.children); // массив
      // КУДА перемещаем
      let arrTo = Array.from(to.children); // массив
      // -----------------------------------
      // Получить элемент, через удаление
      // из из массива ОТКУДА
      const elemForMove = arrFrom.splice(idFrom, 1)[0];
      // console.log('elemForMove: ', elemForMove);
      // Добавить элемент в массив КУДА
      // по индексу idTo
      arrTo.splice(idTo, 0, elemForMove);
      // -----------------------------------
      // Если полученный элемент совпадает с 
      // изначально заданным к пемещению
      if (elemForMove === item) {
        // ...переписать DOM-узел новыми данными
        data.to.append(...arrTo);
        data.wasMove = true;
      }
      console.log(data);
    };
    // -----------------------------------

    // В зависимости от размера документа переносить элемент
    window.addEventListener('resize', () => {
      // Динамическое определение ширины документа
      clientWidth = document.documentElement.clientWidth;
      // Перебрать элементы массива элементов

      // Если ширина меньше breakPoint
      if (clientWidth <= data.breakPoint) {
        // Если первоначальные позиции для элементов
        // if (!wasReplace) {
        replace(data);
        //   // переместить item как дочерний в to 
        //   // на позицию newIndex
        //   to.insertBefore(item, elemsInTo[newIndex]);
        //   console.log('to: ', to);
        // wasReplace = true;
        // }
      } else {
        // if (wasReplace) {
        // wasReplace = false;
        //   // from.insertBefore(item, elemsInFrom[oldIndex]);
        //   console.log('ind: ', oldIndex);
        //   console.log('elem: ', elemsInFrom[oldIndex]);
        //   console.log('from: ', from);
        // }
      }
    });
  });
};