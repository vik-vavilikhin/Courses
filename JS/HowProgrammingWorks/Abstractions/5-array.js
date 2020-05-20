'use strict';

const welcome = person => {
  console.log(`Ave, ${person.name}!`);
};

const persons = [
  {name: 'Marcus Aurelius'},
  {name: 'Mao Zedon'},
  {name: 'Rene Descobartes'},
];

for (const person of persons) {
  welcome(person);
}
