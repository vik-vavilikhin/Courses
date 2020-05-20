'use strict';

// require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {
  let tabs   = require('./parts/tabs');
  let timer  = require('./parts/timer');
  let modal  = require('./parts/modal');
  let form   = require('./parts/form');
  let slider = require('./parts/slider');
  let calc   = require('./parts/calculator');

  tabs();
  timer();
  modal();
  form();
  slider();
  calc();
});

/* 
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
 */