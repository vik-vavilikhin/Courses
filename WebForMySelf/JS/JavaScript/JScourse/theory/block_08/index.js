'use strict';

/* ==================================== */
// setTimeout(function() {
//   alert('Hello')
// }, 2000)

// let counter = 0
// let interval = setInterval(function() {
//   console.log(++counter)
// }, 2000)

// setTimeout(function() {
//   clearInterval(interval)
// }, 5000)

/* ==================================== */
/* 
  Client -> Server -> DataBase -> Srver -> Client 
*/
/* console.log('Client: хочу получить список пользователей')
console.log('...')*/

/*setTimeout(function() {
  console.log('Server: запрашиваю список пользователей БД')
  console.log('...')

  setTimeout(function() {
    console.log('DataBase: формирую список пользователей')
    console.log('...')

    setTimeout(function() {
      console.log('Server: трансформирую данные для Клиента')
      console.log('...')

      setTimeout(function() {
        console.log('Client: получил данные и отображаю их')
      }, 1000)
    }, 500)
  }, 500)
}, 1000) */

/* var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    console.log('Server: запрашиваю список пользователей БД')
    console.log('...')
    resolve()
  }, 1000)
})

promise.then(function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let users = [
        {uid: 'id1', name: 'Maxim'},
        {uid: 'id2', name: 'Elena'},
      ]
      // reject('DataBase не смогла получит список пользователей')
      console.log('DataBase: формирую список пользователей', users)
      console.log('...')
      resolve(users)
    }, 500)
  })
})

.then(function(dbUsers) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('Server: трансформирую данные для Клиента')
      console.log('...')
      let users = dbUsers.map(function(user) {
        return {
          id: user.uid,
          firstName: user.name,
          timestamp: Date.now()
        }
      })
      resolve(users)
    }, 500)
  })
})

.then(function(users) {
  setTimeout(function () {
    console.log('Client: получил данные и отображаю их', users)
  }, 1000)
})

.catch(function(error) {
  console.error(error)
})
// .finally(function() {
//   console.log('Finally')
// }) */

/* ==================================== */
/* document.querySelector('#load').addEventListener('click', () => {
  let url = 'https://jsonplaceholder.typicode.com/users'
  console.log('Loading started')
  
  fetch(url)
  .then((response) => {
    console.log('Response', response)
    return response.json()
  })
  .then((data) => {
    // console.log('Data', data)
    let ul = document.querySelector('#list')
    let html = data.map((item) => {
      return `<li>${item.id}. ${item.name} (${item.email})</li>`
    })
    // console.log('HTML', html.join( ))
    ul.insertAdjacentHTML('afterbegin', html.join(' '))
  })
}) */

/* ==================================== */
/* document.querySelector('#load').addEventListener('click', load)

async function load() {
  let url = 'https://jsonplaceholder.typicode.com/users'
  console.log('Loading started')

  let response = await fetch(url)
  let data = await response.json()
  
  let html = data.map((item) => {
    return `<li>${item.id}. ${item.name} (${item.email})</li>`
  }).join(' ')

  document.querySelector('#list').insertAdjacentHTML('afterbegin', html)
} */

/* ==================================== */
/* function slip(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

let p1 = slip(1500).then(() => {
  // console.log('1500')
  return {
    name: 'Promise 1500'
  }
})

let p2 = slip(3000).then(() => {
  // console.log('3000')
  return {
    name: 'Promise 3000'
  }
})

let p3 = slip(4000).then(() => {
  // console.log('4000')
  return {
    name: 'Promise 4000'
  }
})


async function start() {
  let dataAll = await Promise.all([p1, p2, p3])
  
  let dataRace = await Promise.race([p1, p2, p3])

  console.log('dataAll', dataAll)
  console.log('dataRace', dataRace)
}

start() */

/* ==================================== */
/*
  1. Реализуйте класс MyPromise, который будет работать точно так же, как и Peomise
  2. Достаточо реализовать методы: then, catch, finally
  3. Методы all, race делать не нужно
*/

// let promise = new Promise((resolve, reject) => {
//    setTimeout(() => {
//      resolve(2)
//    }, 2000)
// })

// promise
//  .then(num => num *= 2)
//  .catch(err => console.log(err))
//  .then(num => num *= 3)
//  .finally(() => console.log('Finally'))

class MyPromise {
  constructor(callback) {
    this.onCatch = null
    this.onFinally = null
    this.othenCbs = []
    this.isRejected = false

    function resolver(data) {
      if (this.isRejected) {
        return
      }

      this.othenCbs.forEach(cb => {
        data = cb(data)
      });

      if (this.onFinally) {
        this.onFinally()
      }
    }

    function rejector(error) {
      this.isRejected = true
      if (this.onCatch) {
        this.onCatch(error)
      }
      if (this.onFinally) {
        this.onFinally()
      }
    }

    callback(resolver.bind(this), rejector.bind(this))
  }
  then(cb) {
    this.othenCbs.push(cb)
    return this
  }
  catch(cb) {
    this.onCatch = cb
    return this
  }
  finally(cb) {
    this.onFinally = cb
    return this
  }
}

const promise = new MyPromise((resolve, reject) => {
   setTimeout(() => {
     reject('Some error')
     resolve(10)
   }, 2000)


})

promise
  .then(num => num *= 2)
  .catch(err => console.error(err))
  .then(num => num *= 3)
  .finally(() => console.log('Finally'))
  .then(num => console.log('Done!', num))
