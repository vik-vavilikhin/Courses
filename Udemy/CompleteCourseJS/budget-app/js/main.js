'use strict';

// - Получить кнопку "Начать расчет" через id
let startBtn = document.getElementById('start');
// - Получить все блоки в правой части программы через классы, 
//   которые имеют класс название-value
let budgetValue = document.getElementsByClassName('budget-value')[0];
let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
let yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

// - Получить поля(input) c обязательными расходами через класс. 
//   (`class=”expenses-item”`)
let expensesItems = document.getElementsByClassName('expenses-item');

// - Получить кнопки “Утвердить” и “Рассчитать” через Tag, 
//   каждую в своей переменной.
let expensesItemBtn = document.getElementsByTagName('button')[0];
let optionalExpensesBtn = document.getElementsByTagName('button')[1];
let countBudgetBtn = document.getElementsByTagName('button')[2];

// - Получить поля для ввода необязательных расходов (optionalexpenses-item)
//   при помощи querySelectorAll
let optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item');

// - Получить оставшиеся поля через querySelector 
// статьи возможного дохода
let inCome = document.querySelector('.choose-income');
// чекбокс
let checkSavings = document.querySelector('#savings');
// сумма
let sumValue = document.querySelector('.choose-sum');
// процент
let percentValue = document.querySelector('.choose-percent');

// год
let yearValue = document.querySelector('.year-value');
// месяц
let monthValue = document.querySelector('.month-value');
// день
let dayValue = document.querySelector('.day-value');

let money, time;

// console.log(dayValue);

startBtn.addEventListener('click', () => {
  time = prompt('Введите дату в формате YYYY-MM-DD', '');
  money = +prompt('Ваш бюджет на месяц?', '');

  while (isNaN(money) || money == '' || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }

  appData.budget = money;
  appData.timeData = time;

  budgetValue.textContent = money.toFixed();

  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', () => {
  let sum = 0;
  for (let i = 0; i < expensesItems.length; i++) {
    let a = expensesItems[i].value,
        b = expensesItems[++i].value;

    if ((typeof (a) === 'string') &&
      (typeof (a) != null) &&
      (typeof (b) != null) &&
      a != '' &&
      b != '' &&
      a.length < 50) {
      console.log('done');
      appData.expenses[a] = b;
      sum += +b;
    } else {
      i--;
      alert('Не корректные данные. Попробуйте еще раз');
    }
  }
  expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', () => {
  for (let i = 0; i < optionalExpensesItems.length; i++) {
    let opt = optionalExpensesItems[i].value;
 
     if ((typeof (opt) === 'string') &&
       (typeof (opt) != null) &&
       opt != '' &&
       opt.length < 50) {
       console.log('Optional Expenses done');
       appData.optionalExpenses[i] = opt;
     } else {
       i--;
       // alert('Не корректные данные. Попробуйте еще раз');
     }
     optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
});

countBudgetBtn.addEventListener('click', () => {
  if(appData.budget != undefined) {
    appData.moneyPerDay = +(appData.budget / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;
  
    if (appData.moneyPerDay <= 100) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
      levelValue.textContent = 'Произошла ошибка ввода данных';
    }
  } else {
    dayBudgetValue.textContent = 'Отсутствуют данные для расчета';
    dayBudgetValue.style.color = 'red';

  }

});

inCome.addEventListener('input', () => {
  let items = inCome.value;
  appData.income = items.split(', ');
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', () => {
  (appData.savings == true) ? appData.savings = false : appData.savings = true
});

sumValue.addEventListener('input', () => {
  if(appData.savings == true) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthInCome = sum / 100 / 12 * percent;
    appData.yearInCome = sum / 100 * percent;

    monthSavingsValue.textContent = appData.monthInCome.toFixed(2);
    yearSavingsValue.textContent = appData.yearInCome.toFixed(2);
  }
});

percentValue.addEventListener('input', () => {
  if(appData.savings == true) {
    if (appData.savings == true) {
      let sum = +sumValue.value;
      let percent = +percentValue.value;

      appData.monthInCome = sum / 100 / 12 * percent;
      appData.yearInCome = sum / 100 * percent;

      monthSavingsValue.textContent = appData.monthInCome.toFixed(2);
      yearSavingsValue.textContent = appData.yearInCome.toFixed(2);
    }
  }
});

const appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};