'use strict';

function calculator() {
  // ============== CALCULATOR ========
  let persons = document.querySelectorAll('.counter-block-input')[0];
  let restDay = document.querySelectorAll('.counter-block-input')[1];
  let place = document.getElementById('select');
  let totalValue = document.getElementById('total');
  let personsSum = 0;
  let daysSum = 0;
  let total = 0;

  totalValue.textContent = total;

  persons.addEventListener('change', function () {
    personsSum = this.value;

    condition();
  });

  restDay.addEventListener('change', function () {
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

  place.addEventListener('change', function () {
    if (restDay.value == '' || restDay.value == 0 ||
      persons.value == '' || persons.value == 0) {
      totalValue.textContent = 0;
    } else {
      let a = total;
      totalValue.textContent = a * this.options[this.selectedIndex].value;
    }
  });
}

module.exports = calculator;