// ====== SLIDER SETTINGS ==================
/*

*/
const sliderBuildCallback = () => {};

const sliderSettings = () => {
  const sliders = document.querySelectorAll('._swiper');
  if (sliders) {
    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];
      if (!slider.classList.contains('swiper-bild')) {
        const sliderItems = slider.children;
        if (sliderItems) {
          for (let i = 0; i < sliderItems.length; i++) {
            const el = sliderItems[i];
            el.classList.add('swiper-slide');
          }
        }
        const sliderContent = slider.innerHTML;
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('swiper-wrapper');
        sliderWrapper.innerHTML = sliderContent;
        slider.innerHTML = '';
        slider.appendChild(sliderWrapper);
        slider.classList.add('swiper-bild');
      }
    }
    sliderBuildCallback();
  }

  const mainSlider = new Swiper('.main-slider__body', {
    /*
      effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    */
    observer: true,
    observerParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
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
    navigation: {
      nextEl: '.control-main-slider__arrow_next',
      prevEl: '.control-main-slider__arrow_prev',
    },

    // Responsive breakpoints
    breakpoints: {
      320: {
        autoHeight: true,
      },
      768: {
        autoHeight: true,
      },
    }
  });
};
sliderSettings();