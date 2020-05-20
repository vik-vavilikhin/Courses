'use strict';

let list = document.querySelector('.output');
list.innerHTML = '';

const objects = [
  {
    'name': 'greetings',
    'value': [
      'Happy Birthday!',
      'Merry Christmas my love',
      'A happy Christmas to all the family',
      'You\'re all I want for Christmas',
      'Get well soon'
    ]
  },

  {
    'name': 'cities',
    'value': [
      'lonDon',
      'ManCHESTer',
      'BiRmiNGHAM',
      'liVERpoOL'
    ]
  },

  {
    'name': 'stations',
    'value': [
      'MAN675847583748sjt567654;Manchester Piccadilly',
      'GNF576746573fhdg4737dh4;Greenfield',
      'LIV5hg65hd737456236dch46dg4;Liverpool Lime Street',
      'SYB4f65hf75f736463;Stalybridge',
      'HUD5767ghtyfyr4536dh45dg45dg3;Huddersfield'
    ]
  }
];

function addLi(input, ul) {
  let result = input;
  let listItem = document.createElement('li');
  listItem.textContent = result;

  ul.appendChild(listItem);
}

for (let i = 0; i < objects.length; i++) {
  let ul = document.createElement('ul');
  list.appendChild(ul);

  let hr = document.createElement('hr');
  list.appendChild(hr);

  //============================================
  if (objects[i].name === 'greetings') {
    for (let j = 0; j < objects[i].value.length; j++) {
      let input = objects[i].value[j];

      if (input.indexOf('erry') !== -1 || input.indexOf('appy') !== -1) {
        addLi(input, ul);
      }
    }
  }

  // ============================================
  if (objects[i].name === 'cities') {
    for (let j = 0; j < objects[i].value.length; j++) {
      let input = objects[i].value[j];

      let inputToLowerCase = input.toLowerCase();
      let firstLetter = inputToLowerCase[0].toUpperCase();
      input = firstLetter + inputToLowerCase.slice(1);
      addLi(input, ul);
    }
  }

  // ============================================
  if (objects[i].name === 'stations') {
    for (let j = 0; j < objects[i].value.length; j++) {
      let input = objects[i].value[j];

      let stationCode = input.slice(0, 3);
      let positionSemicolon = input.indexOf(';');
      let stationName = input.slice(positionSemicolon + 1);

      input = stationCode + ': ' + stationName;
      addLi(input, ul);
    }
  }
}
// console.log(stationName);
