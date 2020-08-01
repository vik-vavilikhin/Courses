import Swiper from '../../vendor/swiper/js/swiper';


// ====== SLIDER SETTINGS ==================
/*
 * Подготовка к применению слайдера Swiper.
 * Настройка добавляет необходимые классы.
 * После установки класса '._swiper' для блока
 * обертки, скрипт готовит вложения для сладера.
 */
const sliderBuildCallback = () => {};

const sliderInit = () => {
  // Получить все элементы обертки с классом '._swiper'
  // ...если на странице несколько сладеров
  const sliders = document.querySelectorAll('._swiper');
  // Если есть 
  if (sliders) {
    // для каждоой обертки
    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];
      // ...проверить наличие класса 'swiper-bild'
      // ...если такого нет
      if (!slider.classList.contains('swiper-bild')) {
        // ...получить прямых потомков обертки
        const sliderItems = slider.children;
        // ...если потомки есть
        if (sliderItems) {
          // ...каждому элементу
          for (let i = 0; i < sliderItems.length; i++) {
            const el = sliderItems[i];
            // ...добавить класс 'swiper-slide'
            el.classList.add('swiper-slide');
          }
        }
        /*
          Блок ниже переписывает верстку из обертки во
          вновь созданный 'swiper-wrapper', а затем этот
          'swiper-wrapper' переносит в начальную обертку
        */
        // получить внутреннее содержимое обертки
        const sliderContent = slider.innerHTML;
        // создать блок с классом 'swiper-wrapper',
        // является необходимым для слайдера Swiper
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('swiper-wrapper');
        // записать в 'swiper-wrapper' полученное содержимое
        sliderWrapper.innerHTML = sliderContent;
        // удалить тело обертки
        slider.innerHTML = '';
        // записать 'swiper-wrapper' в качестве
        // нового тела для обертки
        slider.appendChild(sliderWrapper);
        // добавить класс 'swiper-bild' для обертки 
        slider.classList.add('swiper-bild');
      }
    }
    sliderBuildCallback();
  }

  /*
    Параметры для слайдера: https://swiperjs.com/
  */
  const mainSlider = new Swiper('.team-slider', {

    // effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    observer: true,
    observerParents: true,
    slidesPerView: 'auto',
    loopedSlides: 2,
    spaceBetween: 20,
    // autoHeight: true,
    speed: 800,

    // touchRatio: 0,
    // simulateTouch: false,
    loop: true,
    // preloadImages: false,
    // lazy: true,
    // Dotts
    pagination: {
      el: '',
      clickable: true,
    },
    // Arrows
    // navigation: {
    //   nextEl: '.control-main-slider__arrow_next',
    //   prevEl: '.control-main-slider__arrow_prev',
    // },

    // Responsive breakpoints
    // breakpoints: {
    //   320: {
    //     autoHeight: true,
    //   },
    //   768: {
    //     autoHeight: true,
    //   },
    // }
  });
};
export {
  sliderInit
};