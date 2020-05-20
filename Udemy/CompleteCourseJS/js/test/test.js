function sayName(name) {
  let mess = 'My name is Vik';
  return mess;
}

let arr = [5,-3,6,-5,0,-7,8,10];
let res = arr.reduce(function (sum, elem) {
  return sum + elem;
})

let assert = require('chai').assert;

describe('sayName', function() {
  it('Получаем фразу с новым именем', function() {
    assert.typeOf(sayName('Al'), 'string');
  });
});

describe('arr', function() {
  it('Получаем сумму чисел массива', function() {
    assert.equal(res, 13);
  });
});