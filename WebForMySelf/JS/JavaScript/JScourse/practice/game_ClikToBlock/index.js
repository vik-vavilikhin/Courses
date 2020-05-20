'use strict';

const $btnStart = document.querySelector('#start');
const $divGame = document.querySelector('#game');
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

const colors = ['black', 'red', 'blue', 'yellow', 'green', 'pink'];

$btnStart.addEventListener('click', startGame);
$divGame.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame() {
  // console.log('Start');
  score = 0;

  setGameTime();
  $gameTime.setAttribute('disabled', 'true');

  isGameStarted = true;
  show($btnStart);
  $divGame.style.backgroundColor = '#fff';

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent);
    
    if (time <= 0) {
      // end game
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset) {
    score++;
    renderBox();
  };
};

function renderBox() {
  $divGame.innerHTML = '';
  
  let boxSize = getRandom(30, 70);
  let randomColorIndex = getRandom(0, colors.length);
  
  let gameSize = $divGame.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  // console.log(gameSize);

  let box = document.createElement('div');
      box.style.height = box.style.width = `${boxSize}px`;
      box.style.position = 'absolute';
      box.style.backgroundColor = colors[randomColorIndex];
      box.style.top = `${getRandom(0, maxTop)}px`;
      box.style.left = `${getRandom(0, maxLeft)}px`;
      box.style.cursor = 'pointer';
      box.setAttribute('data-box', 'true');
  
  $divGame.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');

  $divGame.innerHTML = '';
  $divGame.style.backgroundColor = '#ccc';
  hide($btnStart);
  show($timeHeader);
  hide($resultHeader);
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  hide($timeHeader);
  show($resultHeader);
}

function show($el) {
  $el.classList.add('hide');
}

function hide($el) {
  $el.classList.remove('hide');
}