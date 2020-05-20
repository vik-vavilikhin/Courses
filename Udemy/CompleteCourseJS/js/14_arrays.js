'use strict';

let arr = [1, 2, 3, 4, 5];
console.log(arr);

// Удалить элемент в конце
arr.pop();
console.log(arr);

// Добавить элемент в конец массива
arr.push('6');
console.log(arr);

// Добавить элемент в начало массива
arr.shift();
console.log(arr);

// Удалить элемент в нечале массива
arr.unshift('one');
console.log(arr);

// Перебор элементов массива
let i;
for(i in arr) {
  console.log(arr[i]);
}

for (i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

i = 0;
do {
  console.log(arr[i]);
  i++;
} while (i < arr.length);

arr.forEach((item) => {
  console.log(item);
});

for(let i of arr) {
  console.log(i);
}

// let ans = prompt('', '');
// let ansArr = [];

// ansArr = ans.split(',');
// console.log(ansArr);

// let myArr = ['qwerty', 'aaaa', 'eee', 'afsafd'];
// let iArr = myArr.join('; ');

let myArr = [1, 15, 4, 17];
let iArr = myArr.sort(compareNum);
console.log(iArr);

function compareNum(a, b) {
  return a-b;
}
