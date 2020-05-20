'use strict';

// =====================================
const btnCanvas = document.querySelector('.updateCanvas');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let WIDTH = document.documentElement.clientWidth;
let HEIGHT = document.documentElement.clientHeight;

// canvas.width = WIDTH;
// canvas.height = HEIGHT;

function random(number) {
  return Math.floor(Math.random()*number);
}

function draw() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
    ctx.fill();
  }
}

btnCanvas.addEventListener('click', draw);

// =====================================
// let petsName = document.querySelector('.petsName');
const cats = [
  'Bill',
  'Jeff',
  'Pete',
  'Biggles',
  'Jasmin'
];
let info = 'My cats are called ';
const para = document.querySelector('.paraPetsName');

for (let i = 0; i < cats.length; i++) {
  if (i === cats.length - 1) {
    info += ' and ' + cats[i] + '.';
  } else if (i === cats.length - 2){
    info += cats[i];
  } else {
    info += cats[i] + ', ';
  }
}

para.textContent = info;

// =====================================
const contacts = [
  'Chris:2232322',
  'Sarah:3453456',
  'Bill:7654322',
  'Mary:9998769',
  'Dianne:9384975'
];
const paraSearchResult = document.querySelector('.paraSearchResult');
const inputSearch = document.querySelector('.inputSearch');
const btnSearch = document.querySelector('.btnSearch');

btnSearch.addEventListener('click', function () {
  let searchName = inputSearch.value;
  inputSearch.value = '';
  inputSearch.focus();
  for (let i = 0; i < contacts.length; i++) {
    let splitContact = contacts[i].split(':');
    if (splitContact[0] === searchName) {
      paraSearchResult.textContent = splitContact[0] + '\'s number is ' + splitContact[1] + '.';
      break;
    } else {
      paraSearchResult.textContent = 'Contact not found.';
    }
  }
});

// =====================================
const inputNumber = document.querySelector('.inputNumber');
const btnNumber = document.querySelector('.btnNumber');
const paraNumberResult = document.querySelector('.paraNumberResult');


btnNumber.addEventListener('click', function () {
  let num = inputNumber.value;
  inputNumber.value = '';
  inputNumber.focus();
  paraNumberResult.textContent = 'Output: ';

  for (let i = 1; i <= num; i++) {
    let sqRoot = Math.sqrt(i);
    if (Math.floor(sqRoot) !== sqRoot) {
      continue;
    }

    paraNumberResult.textContent += i + ' ';
  }
});

// =====================================
const countDown = document.querySelector('.countDown');
      countDown.innerHTML = '';

let j = 10;
while (j >= 0) {
  const paraCountDown = document.createElement('p');
  paraCountDown.className = '.paraCountDown';

  if (j === 10) {
    paraCountDown.textContent = 'Countdown  ' + j;
  } else if (j === 0) {
    paraCountDown.textContent = 'Blast off!';
  } else {
    paraCountDown.textContent = j;
  }

  countDown.appendChild(paraCountDown);

  j--;
}

