'use script';
// /* ===================================== */
// const root = document.querySelector('.root');
//       root.innerHTML = '';
// const paraDate = document.createElement('p');
//       paraDate.className = 'paraDate';
// const dataDate = new Date(),
//       nowYear = dataDate.getFullYear();

// const cars = [
//   {name: 'Ford', year: 2009, color: ''},
//   {name: 'Audi', year: 2012, color: 'green'},
//   {name: 'Mazda', year: 2015, color: 'red'},
// ]
// console.log(cars);

// cars.push({name: 'Kia', year: 2008, color: 'yellow'});
// console.log(cars);

// paraDate.innerHTML = 'Сейчас ' + nowYear + ' год';
// root.appendChild(paraDate);

// cars.forEach(car => {
//   const paraCar = document.createElement('p');
//         paraCar.className = 'paraCar';
//   const spanСhar = document.createElement('span');
//         spanСhar.className = 'spanСhar';
//   const carAge = nowYear - car.year;

//   let wrapperName = (carName) => {
//     return '<span>' + carName + '</span>';
//   }

//   // if (carAge < 5) {
//   //   paraCar.innerHTML = car.name + ' младше 5 лет';
//   // } else if (carAge >= 5 && carAge <= 10){
//   //   paraCar.innerHTML = car.name + ' старше 5 лет, но не младше 10 лет';
//   // } else {
//   //   paraCar.innerHTML = car.name + ' старше 10 лет';
//   // }

//   paraCar.innerHTML = (carAge < 5)
//     ? wrapperName(car.name) + ' младше 5 лет'
//     : (carAge >= 5 && carAge <= 10) 
//     ? wrapperName(car.name) + ' старше 5 лет, но не младше 10 лет'
//     : wrapperName(car.name) + ' старше 10 лет';

//   switch (car.color.trim()) {
//     case 'green': colorTrans = 'зеленый';
//     break;
//     case 'yellow': colorTrans = 'желтый';
//     break;
//     case 'red': colorTrans = 'красный';
//     break;
//     default: colorTrans = 'не указан';
//   }

//   spanСhar.innerHTML = ' (возраст: ' + carAge + ' цвет: ' + colorTrans + ' )';

//   root.appendChild(paraCar);
//   paraCar.appendChild(spanСhar);
// });

// /* ===================================== */
// // var div = document.getElementById('playground');
// // var p = document.getElementsByClassName('text');
// // var h1 = document.getElementsByTagName('h1')


// // var div = document.querySelector('#playground');
// // var p = document.querySelectorAll('.text');
// // var h1 = document.querySelector('h1');

// // var ul = document.querySelector('#playground ul');
// // var ul_2 = document.querySelector('#playground div ul');

// // var input = document.querySelector('input');

// // div.innerHTML = '<h2 style="color: red;">From JavaScript</h2>';
// // h1.textContent = 'Chenged from JS';

// // console.log(input.value);
// // console.log(div.innerHTML);
// // console.log(p);
// // console.log(h1.textContent);

// var a = document.querySelector('a');
// var oldHref = a.getAttribute('href');
// var box1 = document.querySelector('#box1');
// var box2 = document.querySelector('#box2');

// a.setAttribute('href', 'https://ya.ru');
// a.setAttribute('title', 'Go to Yandex');
// a.textContent = 'Yandex';

// // console.log(a.attributes);

// box1.classList.add('red');
// var hasClass = box2.classList.contains('blue');

// console.log(hasClass);

// if (hasClass) {
//   box2.classList.remove('blue');
// } else {
//   box2.classList.add('blue');
// }

// var btn = document.querySelector('button');
// var h1 = document.querySelector('h1');
// var input = document.querySelector('input');

// btn.addEventListener('click', () => {
//   console.log('clicked!');
//   h1.textContent = input.value;
// });

// h1.addEventListener('mouseenter', function() {
//   // console.log(this);
//   this.style.color = 'red';
//   this.style.backgroundColor = 'green';
  
// });

// h1.addEventListener('mouseleave', function() {
//   // console.log(this);
//   this.style.color = 'black';
//   this.style.backgroundColor = 'transparent';
// });

/* =========================================== */
// var divs = document.querySelectorAll('div');
// var link = document.querySelector('a');

// link.addEventListener('click', function(event) {
//   event.preventDefault();
//   var div = divs[0];

//   div.style.display = (div.style.display === 'none') ? 'flex' : 'none';

//   console.log(div.style.display);
// })

// divs.forEach(div => {
//   div.addEventListener('click', function(event) {
//     event.stopPropagation();
//     console.log(this.getAttribute('id'));
//   });
// });

/* ================================== */
// var para = document.querySelectorAll('p');

// para.forEach(p => {
//   p.addEventListener('click', function(event) {
//     event.target.style.color = 'blue';
//   });
// });

// document.querySelector('#wrapper').addEventListener('click', event => {
//   console.log(event);
//   var tagName = event.target.tagName.toLowerCase();
//   if (tagName === 'p') {
//     event.target.style.color = 'blue';
//   }
//   if (event.target.classList.contains('color')) {
//     event.target.style.color = 'red';
//   }
// });

// document.querySelector('#alert').addEventListener('click', event => {
//   // console.log('click');
//   alert('Вы успешно кликнули по кнопке');
// })

// document.querySelector('#prompt').addEventListener('click', event => {
//   // console.log('click');
//   var age = prompt('Введите свой возраст: ', 18);
//   if (age < 30) {
//     alert('Ваш возраст меньше 30 лет');
//   }
// })

// document.querySelector('#confirm').addEventListener('click', event => {
//   var decision = confirm('Вы уверены в том, что хоитете нажать кнопку');

//   if (decision) {
//     alert('Вы успешно кликнули по кнопке "Ok"');
//   };
// })

/* ========================================== */
// var str = '1,2,3,4,5,6,7,8,9';

// var arr = str.split(',');
// // console.log(arr.join(';'));
// // console.log(arr.reverse());
// arr.splice(1, 0, '1.1');

// var newArr = arr.concat();

// // console.log(arr);
// // console.log(newArr);

// var objArr = [
//   {name: 'Max', age: 27},
//   {name: 'Elena', age: 18},
//   {name: 'Viktor', age: 20}
// ];

// // console.log(objArr);

// var foundPerson = objArr.find(function(person) {
//   // console.log(person);
//   return person.age === 20;
// })

// // console.log(foundPerson);

// var oddArr = [1,2,3,4,5,6,7,8,9].filter(function(i) {
//   return i % 2 !== 0;
// })
// // console.log(oddArr);

// var numArr = arr.map(function(i) {
//   return parseInt(i) * 2;
// })
// console.log(numArr);

/* ========================================== */
// console.log(Math.floor(Math.random() * 100));


/* ========================================== */
// var person = {
//   name: 'Max', 
//   age: 26,
//   car: {model: 'Ford'},
//   job: 'Frontend',
//   friends: ['Elena', 'Igor']
// };

// var str = JSON.stringify(person)

// console.log(str);
// console.log(JSON.parse(str));

/* ============================================= */
// var date = new Date();

/* ============================================= */
document.querySelector('button').addEventListener('click', event => {
  var value = document.querySelector('input').value;
  var obj = {
    text: value
  }

  // localStorage.setItem('headerText', value);
  localStorage.setItem('headerText', JSON.stringify(obj));
})

document.addEventListener('DOMContentLoaded', () => {
  // var text = localStorage.getItem('headerText');
  var obj;
  try {
    obj = JSON.parse(localStorage.getItem('headerText'));
  } catch (error) {
    obj = {}
  }

  if (obj && obj.text && obj.text.trim()) {
    document.querySelector('h1').textContent = obj.text;
  }
})