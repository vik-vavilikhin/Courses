// ====== elemReplace =====================
/*
  Параметры устанавливаемые HTML-верстке для селекторов:
  'data-move'  - dataAttribute
  'newPlase'   - куда переместить
  'idTo'       - индекс назначения в новом месте 
  'breakPoint' - на котором происходит перемещение
  
  НАПРИМЕР: <a data-move="menu__body, 1, 767" 
                href="#" class="actions-header__region">
              <span>Выбор региона</span>
            </a>
*/
const elemReplace = () => {
  const dataAttribute = 'data-move';
  // Определить текущую ширину открытого документа
  let clientWidth = document.documentElement.clientWidth;
  // Получить массив из всех элементов с атрибутом 'dataAttribute'
  const elemArr = Array.from(document.querySelectorAll(`[${dataAttribute}]`));

  // -----------------------------------------------
  elemArr.forEach(item => {
    // Получить значение атрибута 'dataAttribute' текущего элемента
    const stringOfAttribute = item.getAttribute(`${dataAttribute}`);
    // Полученную строку преобразовать в массив
    // если в строке есть пробелы, удалить через рег.выражение
    const arrayFromString = stringOfAttribute.replace(/\s+/g, '').split(',');
    // -----------------------------------------------
    // "точка перелома" из 'dataAttribute'
    const breakPoint = parseInt(arrayFromString[2]);
    // ОТКУДА будет перенос
    const from = item.parentNode;
    // Индекс текущей позиции
    const idFrom = Array.from(item.parentNode.children).indexOf(item);
    // КУДА будет пернос из 'dataAttribute'
    const to = document.querySelector(`.${arrayFromString[0]}`);
    // Индекс новой позиции из 'dataAttribute' 
    const idTo = parseInt(arrayFromString[1]);
    // -----------------------------------------------
    // Объект данных
    const data = {
      breakPoint,
      from,
      idFrom,
      to,
      idTo,
    };
    // -----------------------------------------------
    // Защита от "дурака"
    // Если новый индекс в 'data-move' указан 
    // больше чем размер массива нового места 
    // назначения, то установить равным размеру
    // этого массива, что приведет к размещению
    // элемента в конец списка
    const lengthTo = Array.from(data.to.children).length;
    if (data.idTo > lengthTo) {
      data.idTo = lengthTo;
    }
    // console.log(data);
    // -----------------------------------------------
    // Отрисовка элемента с новыми данными
    const replace = ({
      from,
      idFrom,
      to,
      idTo,
    }, reverse = false) => {
      // -----------------------------------------------
      // ОТКУДА перемещаем
      let arrFrom = Array.from(from.children); // массив
      // КУДА перемещаем
      let arrTo = Array.from(to.children); // массив
      // -----------------------------------------------
      const change = (from, idFrom, to, idTo) => {
        // Получить элемент, через удаление
        // из из массива ОТКУДА
        const elemForMove = from.splice(idFrom, 1)[0];
        // Добавить элемент в массив КУДА
        // по индексу idTo
        to.splice(idTo, 0, elemForMove);
        // -----------------------------------------------
        // Если полученный элемент совпадает с 
        // изначально заданным к пемещению
        if (elemForMove === item) {
          // ...переписать DOM-узел новыми данными
          if (!reverse) {
            data.to.append(...to);
          } else {
            data.from.append(...to);
          }
        }
      };
      // -----------------------------------------------
      // Проверить был перенос или нет.
      // 'reverse' по умолчанию - false
      if (!reverse) {
        // Прямой перенос
        change(arrFrom, idFrom, arrTo, idTo);
        reverse = true;
      } else {
        // Обратный пенренос
        change(arrTo, idTo, arrFrom, idFrom);
        reverse = false;
      }
    };
    // -----------------------------------------------
    // Динамическое определение ширины документа
    const screenSize = () => {
      clientWidth = document.documentElement.clientWidth;
      // Если ширина меньше breakPoint
      if (clientWidth <= data.breakPoint) {
        replace(data);
      } else {
        replace(data, true);
      }
    };
    // При загрузке проверить необходимость переноса
    screenSize();

    // -----------------------------------------------
    // При изменении размера документа переносить элемент
    window.addEventListener('resize', () => {
      screenSize();
    });
  });
};