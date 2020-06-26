// ===== offset ============================
function offset(el) {
  /*
   * https://developer.mozilla.org/ru/docs/Web/API/Element/getBoundingClientRect 
   */
  let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

// ===== _goto =============================
function _goto(targetBlock, speed) {
  let offset = arguments.length > 2 && arguments[2] !== undefined ?
    arguments[2] : 0;
  let header = ''; //OffsetHeader

  header = 'header';
  let options = {
    speedAsDuration: true,
    speed: speed,
    header,
    offset
  };
  let scr = new SmoothScroll();
  scr.animateScroll(targetBlock, '', options);
}

// -----------------------------------------
/*
! pageYOffset - из файла ./../vendor/smothScroll/smothScroll.js
! menuClose() - из файла app.js
! bodyLockRemove() - из файла app.js
*/
let link = document.querySelectorAll('._goto-block');

if (link) {
  let blocks = [];

  let _loop7 = function _loop7(_index28) {
    let el = link[_index28];
    let blockName = el.getAttribute('href').replace('#', '');

    if (blockName != '' && !~blocks.indexOf(blockName)) {
      blocks.push(blockName);
    }

    el.addEventListener('click', (e) => {
      if (document.querySelector('.menu__body._active')) {
        menuClose();
        bodyLockRemove(500);
      }

      let targetBlockClass = el.getAttribute('href').replace('#', '');
      let targetBlock = document.querySelector(`.${targetBlockClass}`);

      _goto(targetBlock, 300);

      e.preventDefault();
    });
  };

  for (let _index28 = 0; _index28 < link.length; _index28++) {
    _loop7(_index28);
  }

  window.addEventListener('scroll', () => {
    let oldCurrentLink = document.querySelectorAll('._goto-block._active');

    if (oldCurrentLink) {
      for (let _index29 = 0; _index29 < oldCurrentLink.length; _index29++) {
        let _el13 = oldCurrentLink[_index29];

        _el13.classList.remove('_active');
      }
    }

    for (let _index30 = 0; _index30 < blocks.length; _index30++) {
      let block = blocks[_index30];
      let blockItem = document.querySelector('.' + block);

      if (blockItem) {
        let blockOffset = offset(blockItem).top;
        let blockHeight = blockItem.offsetHeight;

        if (pageYOffset > blockOffset - window.innerHeight / 3 &&
          pageYOffset < blockOffset + blockHeight - window.innerHeight / 3) {
          let currentLinks = document
            .querySelectorAll(`._goto-block[href="#${block}"]`);

          for (let _index31 = 0; _index31 < currentLinks.length; _index31++) {
            let currentLink = currentLinks[_index31];
            currentLink.classList.add('_active');
          }
        }
      }
    }
  });
} //ScrollOnClick (Simple)