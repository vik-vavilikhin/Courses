'use script';

// setTimeout(function() {
//   for (var i = 0; i < 5; i++) {
//     console.log(i)
//   }
// }, 2000)

// for (let i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i)
//   }, 2000)
// }

/* ================================== */
// var HEX = '#ffaabb'

// document.querySelector('h1').style.color = HEX

// HEX = 'random'

// console.log(HEX)

/* ================================ */
// function getAge(year) {
//   const current = new Date().getFullYear()
//   return current - year
// }
// console.log(getAge(1976))

// const calculateAge = year => {
//   const current = new Date().getFullYear()
//   return current - year
// }
// console.log(calculateAge(1976))

// const person = {
//   age: 25,
//   firstName: 'Maxim',
//   logNameWithTimeout() {
//     setTimeout(() => {
//       console.log(this.firstName)
//     }, 1000)
//   }
// }

/* ================================== */
// const createPost = (title, text, date = new Date().toLocaleDateString()) => {
//   // date = date || new Date().toLocaleDateString() // Старый синтаксис
//   return {
//     title,
//     text,
//     date
//   }
// }
// const post = createPost('Скоро Новый год', 'Скоро будет 2020 год')
// console.log(post)

/* ================================== */
// const createCar = (name, model) => ({name, model})

// const ford = createCar('Ford', 'Focus')
// console.log(ford)

// const yearFild = 'year'

// const bmw =  {
//   name: 'BMW',
//   ['model']: 'X6 Sport',
//   [yearFild]: 2018,

//   logFilds() {
//     const {name, year, model} = this
//     console.log(name, model, year)
//   }
// }
// console.log(bmw)
// bmw.logFilds()

// // const yaer = bmw.year
// const {year} = bmw
// console.log(year)

/* ================================== */
/* const form = document.querySelector('form')

form.addEventListener('submit', event => {
  event.preventDefault()

  const title = form.title.value
  const text = form.text.value
  const description = form.description.value
  
  saveForm(title, text, description)
  // console.log(title, text)
})
 */
// Spred
/* function saveForm(data) {
  const formData = {
    date: new Date().toLocaleDateString(),
    ...data
  }
  console.log('Form data:', formData)
} */

// Rest
/* function saveForm(...args) {
  // console.log(args)
  const [title, text, description] = args
  const formData = {
    date: new Date().toLocaleDateString(),
    // ...args
    title, text, description
  }
  console.log('Form data:', formData)
} */

/* ================================== */
/* const creatLink = ({path, name}) => `<a href="${path}" target="_blank">${name}</a>`

const ul = document.querySelector('ul')
const google = `<li>${creatLink({path:'https://google.com', name: 'Google'})}</li>`
const yandex = `<li>${creatLink({path:'https://ya.ru', name: 'Yandex'})}</li>`

ul.insertAdjacentHTML('afterbegin', google)
ul.insertAdjacentHTML('afterbegin', yandex)

const strToLog = `
  Hello
  World
    I am
      New Tab
`
console.log(strToLog) */

/* ================================== */
// RootElement <= Box ,+ instances

/* class RootElement {
  constructor(tagName = 'div') {
    this.$el = document.createElement(tagName)
    this.$el.style.marginBottom = '20px'
  }
  hide() {
    this.$el.style.opacity = '0'
  }
  
  show() {
    this.$el.style.opacity = '1'
  }

  append() {
    document.querySelector('.wrapper').insertAdjacentElement('beforeend', this.$el)
  }
}

class Box extends RootElement {
  constructor (color, size = 150, tagName) {
    super(tagName)
    this.color = color,
    this.size = size
  }
  create() {
    console.log(this.$el)
    this.$el.style.background = this.color
    this.$el.style.width = this.$el.style.height = `${this.size}px`

    this.append()
    
    return this
  }
}

class Circle extends RootElement {
  constructor(color) {
    super()

    this.color = color
  }
  create() {
    this.$el.style.borderRadius = '50%'
    this.$el.style.width = this.$el.style.height = `120px`
    this.$el.style.background = this.color

    this.append()

    return this
  }
}

const redBox = new Box('red', 100, 'div').create()
const blueBox = new Box('blue').create()
const circle = new Circle('green').create()

circle.$el.addEventListener('mouseenter', () => {
  circle.hide()
})

circle.$el.addEventListener('mouseleave', () => {
  circle.show()
}) */

/* ================================== */
/* 
  Реализуйте класс Dropdown, который будет инициализировать компонент выбора элементов
  по функционалу похожий на обычный HTML элемент select, но полсностью реализованный
  вашим кодом без select тега.

  Пример использования:
  const dropdown = new Dropdown('dropdown', {
    items: [
      {label: 'Москва', id:'msk'},
      {label: 'Санкт-Петербург', id:'spb'},
      {label: 'Новосибирск', id:'nsk'},
      {label: 'Краснодар', id:'krd'},
    ]
  })
*/
class Dropdown {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.items = options.items
    this.$el.querySelector('.dropdown__label').textContent = 'Select'

    this.$el.addEventListener('click', event => {
      if (event.target.classList.contains('dropdown__label')) {
        if (this.$el.querySelector('.dropdown__menu').classList.contains('open')) {
         this.close() 
        } else {
         this.open()
        }
      } else if (event.target.classList.contains('dropdown__item')) {
        this.select(event.target.dataset.id)
      }
    })

    const itemsHTML = this.items.map(i => {
      return `<li class="dropdown__item" data-id="${i.id}">${i.label}</li>`
    }).join(' ')
    this.$el.querySelector('.dropdown__menu').insertAdjacentHTML('afterbegin', itemsHTML)
  }
  open() {
    this.$el.querySelector('.dropdown__menu').classList.add('open')
  }
  close() {
    this.$el.querySelector('.dropdown__menu').classList.remove('open')
  }
  select(id) {
    const item = this.items.find(i => i.id === id)
    this.$el.querySelector('.dropdown__label').textContent = item.label
    this.close()
  }
}

const dropdown = new Dropdown('#dropdown', {
  items: [
    { label: 'Москва', id: 'msk' },
    { label: 'Санкт-Петербург', id: 'spb' },
    { label: 'Новосибирск', id: 'nsk' },
    { label: 'Краснодар', id: 'krd' },
  ]
})