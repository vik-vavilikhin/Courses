'use strict';

let weather = document.querySelector('#weather');
let para = document.querySelector('p');

weather.addEventListener('change', setWeather);

function setWeather() {
  let choice = weather.value;
  // const forecasts = [
  //   {'weather': 'sunny', 'text': 'Сегодня хорошо и солнечно. Носите шорты! Идите на пляж, или в парк, и купите мороженое.'},
  //   {'weather': 'rainy', 'text': 'Дождь падает за окном; возьмите плащ и зонт, и не находитесь слишком долго на улице.'},
  //   {'weather': 'snowing', 'text': 'Снег падает - морозно! Лучше всего посидеть с чашкой горячего шоколада или слепить снеговика.'},
  //   {'weather': 'overcast', 'text': 'Дождя нет, но небо серое и мрачное; он все может измениться в любую минуту, поэтому на всякий случай возьмите дождевик.'}
  // ];

  // Цикл for...of
  // for (let itemForecast of forecasts) {
  //   if (choice === itemForecast.weather) {
  //     para.textContent = itemForecast.text;
  //   }
  // }

  // Цикл forEach...
  // forecasts.forEach(function(itemForecast) {
  //   if (choice === itemForecast.weather) {
  //     para.textContent = itemForecast.text;
  //   }
  // });

  // Классический цикл for...
  // for (let i = 0; i < forecasts.length; i++) {
  //   if (choice === forecasts[i].weather) {
  //     para.textContent = forecasts[i].text;
  //   }
  // };
// ================= Условие if...else
//   if (choice === 'sunny') {
//     para.textContent = 'Сегодня хорошо и солнечно. Носите шорты! Идите на пляж, или в парк, и купите мороженое.';
//   } else if (choice === 'rainy') {
//     para.textContent = 'Дождь падает за окном; возьмите плащ и зонт, и не находитесь слишком долго на улице.';
//   } else if (choice === 'snowing') {
//     para.textContent = 'Снег падает - морозно! Лучше всего посидеть с чашкой горячего шоколада или слепить снеговика.';
//   } else if (choice === 'overcast') {
//     para.textContent = 'Дождя нет, но небо серое и мрачное; он все может измениться в любую минуту, поэтому на всякий случай возьмите дождевик.';
//   } else {
//     para.textContent = '';
//   }

// ================= Условие switch...
  switch (choice) {
    case 'sunny':
      para.textContent = 'Сегодня хорошо и солнечно. Носите шорты! Идите на пляж, или в парк, и купите мороженое.';
      break;
    case 'rainy':
      para.textContent = 'На улице дождь. Возьмите плащ и зонт, и не гуляйте слишком долго';
      break;
    case 'snowing':
      para.textContent = 'Идет снег - морозно! Лучше всего посидеть с чашкой горячего шоколада или слепить снеговика.';
      break;
    case 'overcast':
      para.textContent = 'Дождя нет, но небо серое и мрачное; он все может измениться в любую минуту, поэтому на всякий случай возьмите дождевик.';
      break;
    default:
      para.textContent = '';
  }
}

// // ===========================================
let theme = document.querySelector('#theme');
let html = document.querySelector('html');
// document.body.style.padding = '10px';

function update(bgColor, textColor) {
  html.style.backgroundColor = bgColor;
  html.style.color = textColor;
}

theme.onchange = function() {
  ( theme.value === 'black' ) ?
    update('black','white') :
    update('lime','purple');

  switch (theme.value) {
    case 'purple' :
      update('purple','white');
      break;
    case 'yellow':
      update('yellow','darkgray');
      break;
    case 'lime':
      update('lime','purple');
      break;
    case 'psychedelic':
      update('lime','purple');
      break;
  }
};

// =========================
let monthList = document.querySelector('.monthList');
let monthNow = document.querySelector('.monthNow');
let days = document.querySelector('.days');

const months = [
  {'name': 'January', 'trans': 'Январь'},
  {'name': 'February', 'trans': 'Февраль'},
  {'name': 'March', 'trans': 'Март'},
  {'name': 'April', 'trans': 'Апрель'},
  {'name': 'May', 'trans': 'Май'},
  {'name': 'June', 'trans': 'Июнь'},
  {'name': 'July', 'trans': 'Июль'},
  {'name': 'August', 'trans': 'Август'},
  {'name': 'September', 'trans': 'Сентябрь'},
  {'name': 'October', 'trans': 'Октябрь'},
  {'name': 'November', 'trans': 'Ноябрь'},
  {'name': 'December', 'trans': 'Декабрь'}
];

for (let month of months) {
  let optionTag = document.createElement('option');
  optionTag.setAttribute('value', month.name);
  optionTag.textContent = month.trans;

  monthList.appendChild(optionTag);
}

monthList.onchange = function() {
  let choiceMonth = monthList.value;
  let numberOfDays = 31;

  // Условие с тернарным оператором
  // (choiceMonth === 'April' || choiceMonth === 'June' || choiceMonth === 'September' || choiceMonth === 'November') ?
  //   numberOfDays = 30 :
  // (choiceMonth === 'February') ?
  //   numberOfDays = 28 :
  //   numberOfDays = 31;

  // Классическое условие
  if (
    choiceMonth === 'April' ||
    choiceMonth === 'June' ||
    choiceMonth === 'September' ||
    choiceMonth === 'November') {
    numberOfDays = 30;
  } else if (choiceMonth === 'February') {
    numberOfDays = 28;
  }

  createCalendar(numberOfDays, choiceMonth);
};

function createCalendar (numberOfDays, choiceMonth) {
  days.innerHTML = '';
  monthNow.textContent = choiceMonth;

  for (let i = 1; i <= numberOfDays; i++) {
    let listItem = document.createElement('li');
        listItem.className = 'numberDay';
        listItem.textContent =i;
        days.appendChild(listItem);
  }
}

createCalendar(31, 'January');
