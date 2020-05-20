'use strict';

const welcome = person => {
  console.log(`Ave, ${person.name}!`);
};

const marcus = {name: 'Marcus Aurelius'};
const mao = {name: 'Mao Zedon'};
const cartesius = {name: 'Rene Descobartes'};

welcome(marcus);
welcome(mao);
welcome(cartesius);