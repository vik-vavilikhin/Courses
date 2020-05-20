'use strict';

let json = '{"id": 2}';

try {
/* 
  console.log('Начинаем работу');
  console.log(val);
  console.log('Результат');
   */
  let user = JSON.parse(json);
  console.log(user);

  if (!user.name) {
    throw new Error('В этих данных нет имени');
  }
  
} catch(error) {
/* 
  console.log(error.name);
  console.log(error.message);
  console.log(error.stack);
 */
  console.log(`Мы получили ошибку: ${error.name}`);
  
} finally {
  console.log('А эта часть кода выполнится всегда');
  
}

console.log('Это продолжение кода, которое будет работать дальше');
