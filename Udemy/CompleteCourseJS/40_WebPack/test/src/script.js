'use strict';

function myModule() {
  this.hello = function() {
    return 'Hello!';
  };

  this.goodbey = function() {
    return 'Goodbey!';
  };
}

myModule.exports = myModule;