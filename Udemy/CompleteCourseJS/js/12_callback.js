'use strict';

// ============ CallBack ============
function first() {
  setTimeout(function() {
    console.log(1);
  }, 500);
}

function second() {
  console.log(2);
}

first();
second();

function learnJS(lang, callBack) {
  console.log('Я учу ' + lang);
  callBack();
}

function done() {
  console.log('Я прошел 3-й урок');
}

learnJS('JS', done);