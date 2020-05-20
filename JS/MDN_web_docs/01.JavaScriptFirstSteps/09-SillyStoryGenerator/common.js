'use script';

// Получаем ссылку на поле ввода с идентификатором id="customname"
let customName = document.querySelector('#customname');

/*
  Получаем ссылку на параграф с классом class="story"
  ...создаем переменную содержащую историю
*/
let story = document.querySelector('.story');
let textStory = '';

const arrName = [
  'Дед Мороз',
  'Гоблин Вилли',
  'Вежливый Призрак',
  'Серый Волк',
  'Гадкий Я',
  'Васёк'
];
const arrPlace = [
  'Моста',
  'Холма',
  'Школы',
  'Обрыва',
  'Реки',
  'Василькового поля'
];
const arrEvent = [
  ' спонтанно воспламенился ',
  ' превратился в слизняка и уполз ',
  ' растаял в луже на тротуаре '
];

const objUnit = {'temperature': '94', 'weight': '300'};
let temp = Number(objUnit.temperature);
let weight = Number(objUnit.weight);

//
function randomizer(arrayName) {
  let valueName = arrayName[Math.floor(Math.random() * (arrayName.length-1)) + 1];

  return valueName;
};

//
function conversionUnit() {
  let activeRadio = document.querySelector('input[name="ukus"]:checked').value;
  if (activeRadio !== 'us') {
    temp = Math.round((temp - 32) / 1.8) + ' градуса по Цельсию';
    weight = Math.round(weight * 0.45359237) + ' килограмм';
  } else {
    temp += ' градуса по Фаренгейту';
    weight += ' фунтов';
  }
}
// conversionUnit();


// Создаем функцию создания истории
function generationStory() {
  // Создаем переменную name и присваиваем ей значение по умолчанию
  let name = 'Мурзик';

  if (customName.value !== '') {
    /*
     Проверяем значение поля ввода на наличие данных и если поле не пустое,
     изменяем значение переменной name на значение в поле
     */
    name = customName.value;
  }
  conversionUnit();

  let nameHero = randomizer(arrName);
  let nameEvent = randomizer(arrEvent);
  let namePlace = randomizer(arrPlace);

  textStory = 'На улице было ' + temp + ', так что ' + nameHero + ' пошел прогуляться. Когда он добрался до ' + namePlace + ', он несколько мгновений смотрели в ужасе, а затем ' + nameEvent + '. '+ name + ' все это видел, но не удивился — ' + nameHero + ' весил ' + weight + ', а день был жаркий.';

  /*
    Выводим сгенерированную историю в параграф с классом class="story"
    ...делаем параграф видимым, устанавливая css-свойство visibility = 'visible'
  */
  story.textContent = textStory;
  story.style.visibility = 'visible';
}

/*
  Получаем ссылку на кнопку с классом class="randomize"
  ...добавляем событие кнопке
*/
let btnGenerationStory = document.querySelector('.randomize');
    btnGenerationStory.addEventListener('click', generationStory);

