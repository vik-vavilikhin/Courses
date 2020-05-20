'use strict';

let myModule = require('./script');

let newModule = new myModule();

console.log(newModule.hello());
console.log(newModule.goodbey());