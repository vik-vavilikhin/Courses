'use strict';

function slider() {
  // ============== SLIDER ============
  let slideIndex = 1;
  // Контент каждого слайда
  let slides = document.querySelectorAll('.slider-item');
  // Панели навигации
  let prev = document.querySelector('.prev');
  let next = document.querySelector('.next');
  // Точки навигации
  let dotsWrap = document.querySelector('.slider-dots');
  let dots = document.querySelectorAll('.dot');

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((sliderItem) => sliderItem.style.display = 'none');
    dots.forEach((dot) => dot.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', () => plusSlides(-1));
  next.addEventListener('click', () => plusSlides(1));

  dotsWrap.addEventListener('click', function (e) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });
}

module.exports = slider;