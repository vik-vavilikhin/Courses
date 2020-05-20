'use strict';

function modal() {
  // ============== MODAL =============
  let btnMore = document.querySelector('.more');
  let btnDescription = document.querySelectorAll('.description-btn');
  let overlay = document.querySelector('.overlay');
  let btnPopupClose = document.querySelector('.popup-close');

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
  btnDescription.forEach(function (item) {
    item.addEventListener('click', openModal);
  });
  btnPopupClose.addEventListener('click', closeModal);
}

module.exports = modal;