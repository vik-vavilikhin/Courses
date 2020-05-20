'use strict';
window.addEventListener('DOMContentLoaded', () => {
  // ============== TABS ==============
  // Блок-обертка для закладок
  let parentTabs = document.querySelector('.info-header');
  // Массив закладок
  let tabs = document.querySelectorAll('.info-header-tab');
  // Содержание (контент) закладок
  let tabContent = document.querySelectorAll('.info-tabcontent');

  function tabTarget(parentTabs, tabs, tabContent) {

    function hideTabContent(a) {
      for( let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    } hideTabContent(1);
    
    function showTabContent(b) {
      if(tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.add('show');
        tabContent[b].classList.remove('hide');
      }
    }
  
    parentTabs.addEventListener('click' , (e) => {
      let target = e.target;
  
      if (target && target.classList.contains('info-header-tab')) {
        for(let i = 0; i < tabs.length; i++) {
          if(target == tabs[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  } tabTarget(parentTabs, tabs, tabContent);

  // ============== TIMER =============
  let deadLine = '2019-05-09';
  
  function getTimeRemaining(endTime) {
    let t       = Date.parse(endTime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours   = Math.floor((t / (1000 * 60 * 60)));
    /* let hours = Math.floor((t / 1000 / 60 / 60) % 24);
    let days = Math.floor((t / 1000 / 60 / 60 / 24)); */

    if (hours < 10) {hours = `0${hours}`;}
    if (minutes < 10) {minutes = `0${minutes}`;}
    if (seconds < 10) {seconds = `0${seconds}`;}

    if (t < 0) {seconds = minutes = hours = '00'; }

    return {
      'total': t,
      hours,
      minutes,
      seconds
    };
  }

  function setClock(id, endTime) {
    let timer   = document.getElementById(id);
    let hours   = timer.querySelector('.hours');
    let minutes = timer.querySelector('.minutes');
    let seconds = timer.querySelector('.seconds');
    
    function updateClock() {
      let t                   = getTimeRemaining(endTime);
          hours.textContent   = t.hours;
          minutes.textContent = t.minutes;
          seconds.textContent = t.seconds;

      if (t.total < 0) {
        clearInterval(timeInterval);
      }
    }
    
    let timeInterval = setInterval(updateClock, 1000);

  } setClock('timer', deadLine);

  // ============== MODAL =============
  let btnMore        = document.querySelector('.more');
  let btnDescription = document.querySelectorAll('.description-btn');
  let overlay        = document.querySelector('.overlay');
  let btnPopupClose  = document.querySelector('.popup-close');

  function openModal() {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.style.display = 'none';
    btnMore.classList.remove('more-splash');
    document.body.style.overflow = '';
  }

  btnMore.addEventListener('click', openModal);
  btnDescription.forEach(function(item) {
    item.addEventListener('click', openModal);
  });
  btnPopupClose.addEventListener('click', closeModal);

  // ============== FORM ==============
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  
  let forms    = document.querySelectorAll('form');
  let statMess = document.createElement('div');
  statMess.classList.add('status');
  
  forms.forEach(form => {
    let inputs = form.getElementsByTagName('input');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.appendChild(statMess);
      
      // Получаем все данные из формы и записываем их в переменную formData
      // с помощью встроенного класса `new FormData(form)`
      let formData = new FormData(form);
      
      let req = new XMLHttpRequest();
      req.open('POST', 'server.php');
      
      // Данные получены в формате .json
      req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      
      let obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      
      let json = JSON.stringify(obj);
      
      req.send(json);
      
      req.addEventListener('readystatechange', () => {
        (req.readyState < 4) ? statMess.innerHTML = message.loading
        :  (req.readyState == 4 && req.status == 200) ?
        statMess.innerHTML = message.success
        : statMess.innerHTML = message.failure;
      });
      
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    });
  });
  
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

  dotsWrap.addEventListener('click', function(e) {
    for( let i = 0; i < dots.length + 1; i++) {
      if(e.target.classList.contains('dot') && e.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });
  
  // ============== CALCULATOR ========
  let persons    = document.querySelectorAll('.counter-block-input')[0];
  let restDay    = document.querySelectorAll('.counter-block-input')[1];
  let place      = document.getElementById('select');
  let totalValue = document.getElementById('total');
  let personsSum = 0;
  let daysSum    = 0;
  let total      = 0;

  totalValue.textContent = total;

  persons.addEventListener('change', function() {
    personsSum = this.value;

    condition();
  });
  
  restDay.addEventListener('change', function() {
    daysSum = this.value;

    condition();
  });

  function condition() {
    total = (daysSum + personsSum) * 4000;

    if (restDay.value == '' || restDay.value == 0 ||
        persons.value == '' || persons.value == 0) {
      totalValue.textContent = 0;
    } else {
      totalValue.textContent = total;
    }
  }

  place.addEventListener('change', function() {
    if (restDay.value == '' || restDay.value == 0 ||
        persons.value == '' || persons.value == 0 ) {
      totalValue.textContent = 0;
    } else {
      let a = total;
      totalValue.textContent = a * this.options[this.selectedIndex].value;
    }
  });
});