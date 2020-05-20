/* ======================================= */
// const car = {
//   name: 'Ford',
//   year: 2015
// }

// console.log(car)


/* ======================================= */
// function Car(name, year) {
//   this.name = name
//   this.year = year
// }

// Car.prototype.getAge = function () {
//   return new Date().getFullYear() - this.year
// }

// Car.prototype.color = 'black'

// const ford = new Car('Ford', 2015)
// const bmw = new Car('bmw', 2017)

// ford.color = 'red'

// console.log(ford)
// console.log(bmw)

/* ======================================= */
// const ford = Object.create({
//   calculateDistancePerYear: function() {
//   //  this.distancePerYear = 33
//     Object.defineProperty(this, 'distancePerYear', {
//       value: Math.ceil(this.distance / this.age),
//       enumerable: false,
//       writable: false,
//       configurable: false
//     })
//   }
// }, {
//   name: {
//     value: 'Ford', 
//     enumerable: true,
//     writable: false,
//     configurable: false
//   },
//   model: {
//     value: 'Focus',
//     enumerable: true,
//     writable: false,
//     configurable: false
//   },
//   year: {
//     value: 2015,
//     enumerable: true,
//     writable: false,
//     configurable: false
//   },
//   distance: {
//     value: 120500,
//     enumerable: true,
//     writable: true,
//     configurable: false
//   },
//   age: {
//     enumerable: true,
//     get: function() {
//       console.log('Получаем возраст')
//       return new Date().getFullYear() - this.year
//     },
//     set: function() {
//       console.log('Устанавливаем значение')
//     }
//   }
// })

// console.log(ford)

// ford.calculateDistancePerYear()
// for (let key in ford) {
//   if (ford.hasOwnProperty(key)) {
//     console.log(key, ford[key])
//   }
// }

/* ======================================= */
// const person = {
//   name: 'Max',
//   age: 28,
//   job: 'Frontend'
// }

// for (let key in person) {
//   if (person.hasOwnProperty(key)) {
//     console.log(person[key])

//   }
// }

// let keys = Object.keys(person)
// console.log(keys)
// Object.keys(person).forEach(key => {
//   console.log(person[key])
// })

/* ======================================= */
// function printObject(objName) {
//   console.log('Printing oject: ', objName)
//   for (let key in this) {
//     if (this.hasOwnProperty(key)) {
//       console.log(`[${key}]`, this[key])
//     }
//   }
// }



// const person = {
//   firstName: 'Max',
//   job: 'Backend',
//   age: 29,
//   friends: [
//     'Elena',
//     'Igor'
//   ]
// }

// const car = {
//   name: 'Ford',
//   model: 'Focus',
//   year: 2017
// }

// const printPerson = printObject.bind(person)
// printPerson('Person')

// printObject.call(car, 'Car')

// printObject.apply(person, ['Person'])

/* ======================================= */
/* 
  ЗАДАНИЕ.
  Реализовать возможность использования прототипа, чтобы у каждого массива был новый
  метод, позволяющий удваивать значение каждого элемента с учетом тапа данных таким
  образом, чтобы:
  1. Для чисел это возведение в квадрат
  2. Для сторок это удваивание строки
  3. Метод не изменял существующий массив и возвращал новый

  Пример:
  [1, 2, 3,] => [1, 4, 9]
  [5, 'Hello', 6] => [25, 'HelloHello', 36]
*/
const a = [1, 2, 3,]
const b = [5, 'Hello', 6]

Array.prototype.double = function() {
  // console.log(this)
  let newArray = this.map(function(item) {
    if (typeof item === 'number') {
      return Math.pow(item, 2)
    } else if (typeof item === 'string') {
      return item += item
    } else {
      console.log('Несоответствие данных')
    }
    // return item
  })

  return newArray
}

let newA = a.double()
let newB = b.double()

console.log('A', newA.double())
console.log('B', newB)