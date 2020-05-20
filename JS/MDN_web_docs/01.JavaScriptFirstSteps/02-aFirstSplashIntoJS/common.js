/* ============================================
  Генерируем случайное целое число от 1 до 100
============================================ */
let randomNumber = Math.floor(Math.random() * 100) + 1;


/* ============================================
  Переменные для хранения ссылок на абзацы результатов
  и использования для вставки значений в абзацы
============================================ */
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');


/* ============================================
  Переменные для хранения ссылок на форму ввода
  текста и кнопку отправки
============================================ */
let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');


/* ============================================
  Переменные для хранения количества попыток и
  ссылка на кнопку сброса и устанавливаем
  фокус на поле ввода
============================================ */
let guessCount = 1;
let resetButton;
guessField.focus();
/* ============================================
  Основная функция
============================================ */
function checkGuess() {
  // alert('I am a placeholder');
  // Преобразуем введенное значение к числу
  let userGuess = Number(guessField.value);

  // Проверяем является ли попытка первой
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }

  // Выводим введенные ранее значения в параграф
  // с классом '.guesses' через пробел
  guesses.textContent += userGuess + ' ';

  // Если введенное значение строго равно случайному числу
  if (userGuess === randomNumber) {
    // Выводим поздравление
    // ...окрашиваем в зеленый
    // ...очищаем надпись в параграфе '.lowOrHi'
    // ...завершаем игру через вызов функции setGameOver()
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();

  // Если введенное значение НЕ равно случайному числу
  // Проверяем количество использованных попыток
  // если количество использованний 10
  } else if (guessCount === 10) {
    // выводим ссобщение об окончании игры
    // ...завершаем игру через вызов функции setGameOver()
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();

  // Если введенное значение НЕ равно случайному числу
  // и количество попыток еще не равно 10
  } else {
    // ...сообщаем об ошибке выбора
    // ...окрашиваем параграф '.lastResult' в красный цвет
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';

    // Дополнительно проверяем введенное число
    // ...если меньше загаданного
    if (userGuess < randomNumber) {
      // ...выводим соответствующее сообщение
      lowOrHi.textContent = 'Last guess was too low!';

    // ...если больше загаданного
    } else if (userGuess > randomNumber) {
      // ...выводим соответствующее сообщение
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  // Увеличиваем счетчик попыток на 1
  // очищаем поле ввода формы
  // устанавливаем фокус на поле ввода формы
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

/* ============================================
  Функция завершения игры
============================================ */
function setGameOver() {
  // Отключаем ввод поля формы и кнопки
  guessField.disabled = true;
  guessSubmit.disabled = true;

  // Генерируем новый элемент в документе <button>
  // ...добавляем надпись на кнопку
  // ...размещаем <button> внизу документа HTML
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);

  // Прослушиваем событие 'click' для нового элемента <button>
  // ...и при наступлении события запускаем функцмю resetGame()
  resetButton.addEventListener('click', resetGame);
}

/* ============================================
  Функция сброса игры
============================================ */
function resetGame() {
  // Устанавливаем счетчик попыток на 1
  guessCount = 1;

  // Отбираем все элементы 'p' в блоке '.resultParas'
  let resetParas = document.querySelectorAll('.resultParas p');

  // Проходим по всем элементам 'p' и
  // ...удаляем надписи
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }

  // Удаляем кнопку из документа
  resetButton.parentNode.removeChild(resetButton);

  // Включаем доступ к полю ввода и кнопке
  guessField.disabled = false;
  guessSubmit.disabled = false;

  // Удаляем запись в поле ввода и
  // устанавливаем фокус
  guessField.value = '';
  guessField.focus();

  // Заливаем фон белым цветом
  lastResult.style.backgroundColor = 'white';

  // Генерируем новое число для отгадывания
  randomNumber = Math.floor(Math.random() * 100) + 1;
}