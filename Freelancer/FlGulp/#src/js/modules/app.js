// ====== inspectUserAgent =================
/*
 *  Определение браузера пользователя и ОС
 */
function inspectUserAgent() {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf('MSIE ');
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        this.Android() ||
        this.BlackBerry() ||
        this.iOS() ||
        this.Opera() ||
        this.Windows());
    }
  };

  const isIE = () => {
    ua = navigator.userAgent;
    let isie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isie;
  };

  if (isIE()) {
    document.querySelector('body').classList.add('ie');
  }
  if (isMobile.any()) {
    document.querySelector('body').classList.add('touch');
  }
}

// ====== testWebP =========================
/*
 * Функция определяет поддкржку браузером WebP
 */
function testWebP() {
  const webP = new Image();
  const cb = (support) => {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  };

  webP.onload = webP.onerror = () => {
    cb(webP.height == 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// ===== bodyLock ==========================
function bodyLock(delay) {
  document.querySelector('body')
    .classList.contains('_lock') ?
    bodyLockRemove(delay) :
    bodyLockAdd(delay);
}

// ===== bodyLockRemove ====================
function bodyLockRemove(delay) {
  let body = document.querySelector('body');

  if (!body.classList.contains('_wait')) {
    let lockPadding = document.querySelectorAll('._lp');

    setTimeout(() => {
      for (let index = 0; index < lockPadding.length; index++) {
        let el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
    }, delay);

    body.classList.add('_wait');
    setTimeout(function () {
      body.classList.remove('_wait');
    }, delay);
  }
}

// ===== bodyLockAdd =======================
function bodyLockAdd(delay) {
  let body = document.querySelector('body');

  if (!body.classList.contains('_wait')) {
    let lockPadding = document.querySelectorAll('._lp');
    let width = window.innerWidth;
    let wrapperOffset = document.querySelector('.wrapper').offsetWidth;

    for (let index = 0; index < lockPadding.length; index++) {
      let el = lockPadding[index];
      el.style.paddingRight = `${width} - ${wrapperOffset}px`;
    }

    body.style.paddingRight = `${width} - ${wrapperOffset}px`;
    body.classList.add('_lock');
    body.classList.add('_wait');

    setTimeout(() => {
      body.classList.remove('_wait');
    }, delay);
  }
}

// ====== backgroundImage ==================
/*
* Функция для обработки фоновых изображений
* Картинка берется из верски и подставляется в
* качестве свойства 'backgroundImage' родительского
* элемента.

* ИСТОЧНИК: https://www.youtube.com/watch?v=nTtuiBXKp88&list
* ИСХОДНИК: http://fls.guru/ibg.html
*/
function backgroundImage() {
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
}

// ====== burgerActive =====================
/*
 * - iconMenuElem - меню-бургер '.icon-menu'
 * - menuBodyElem - основное меню навигации '.menu__body'
 */
function burgerActive() {
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  if (iconMenu != null) {
    const body = document.querySelector('body');

    let delay = 500;
    iconMenu.addEventListener('click', (e) => {
      if (!body.classList.contains('_wait')) {
        bodyLock(delay);
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
      }
    });
  }
}

// ===== menuClose =========================
/*
 * - iconMenuElem - меню-бургер '.icon-menu'
 * - menuBodyElem - основное меню навигации '.menu__body'
 */
function menuClose() {
  let iconMenu = document.querySelector('.icon-menu');
  let menuBody = document.querySelector('.menu__body');
  iconMenu.classList.remove('_active');
  menuBody.classList.remove('_active');
}

// ====== elemReplace =====================
/*
* Параметры устанавливаемые HTML-верстке для селекторов:
* 'data-move'  - dataAttribute
* 'newPlase'   - куда переместить
* 'idTo'       - индекс назначения в новом месте 
* 'breakPoint' - на котором происходит перемещение
  
! НАПРИМЕР: <a data-move="menu__body, 1, 767" 
!               href="#" class="actions-header__region">
!             <span>Выбор региона</span>
!           </a>
*/
function elemReplace() {
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
}