function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}

var link = document.querySelectorAll('._goto-block');

if (link) {
  var blocks = [];

  var _loop7 = function _loop7(_index28) {
    var el = link[_index28];
    var block_name = el.getAttribute('href').replace('#', '');

    if (block_name != '' && !~blocks.indexOf(block_name)) {
      blocks.push(block_name);
    }

    el.addEventListener('click', function (e) {
      if (document.querySelector('.menu__body._active')) {
        menuClose();
        body_lock_remove(500);
      }

      var target_block_class = el.getAttribute('href').replace('#', '');
      var target_block = document.querySelector('.' + target_block_class);

      _goto(target_block, 300);

      e.preventDefault();
    });
  };

  for (var _index28 = 0; _index28 < link.length; _index28++) {
    _loop7(_index28);
  }

  window.addEventListener('scroll', function (el) {
    var old_current_link = document.querySelectorAll('._goto-block._active');

    if (old_current_link) {
      for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
        var _el13 = old_current_link[_index29];

        _el13.classList.remove('_active');
      }
    }

    for (var _index30 = 0; _index30 < blocks.length; _index30++) {
      var block = blocks[_index30];
      var block_item = document.querySelector('.' + block);

      if (block_item) {
        var block_offset = offset(block_item).top;
        var block_height = block_item.offsetHeight;

        if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
          var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

          for (var _index31 = 0; _index31 < current_links.length; _index31++) {
            var current_link = current_links[_index31];
            current_link.classList.add('_active');
          }
        }
      }
    }
  });
} //ScrollOnClick (Simple)

function _goto(target_block, speed) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var header = ''; //OffsetHeader

  header = 'header';
  var options = {
    speedAsDuration: true,
    speed: speed,
    header: header,
    offset: offset
  };
  var scr = new SmoothScroll();
  scr.animateScroll(target_block, '', options);
} //SameFunctions