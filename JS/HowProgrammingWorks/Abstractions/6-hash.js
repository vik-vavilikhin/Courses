'use strict';

const welcome = person => {
  console.log(`Ave, ${person.name}!`);
};

const persons = {
  marcus: {name: 'Marcus Aurelius'},
  mao: {name: 'Mao Zedon'},
  rene: {name: 'Rene Descobartes'},
};

for (const name in persons) {
  const person = persons[name];
  welcome(person);
}
