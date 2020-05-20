[К списку заданий](https://github.com/vik-vavilikhin/Udemy/tree/master/CompleteCourseJS)

---
### **Задание 7: Практика. Пишем приложение. Часть 4**

1. Скачать [архив](https://github.com/vik-vavilikhin/Udemy/raw/master/CompleteCourseJS/budget-app/budget-app.zip), прикрепленный к уроку

2. Задание по проекту
    - Получить кнопку "Начать расчет" через id
    - Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с `<div class="budget-value"></div>` и заканчивая `<div class="yearsavings-value"></div>`)
    - Получить поля `input` c обязательными расходами через класс. (`class="expenses-item"`)
    - Получить кнопки "Утвердить" и "Рассчитать" через `Tag`, каждую в своей переменной. 
    - Получить поля для ввода необязательных расходов (`optionalexpenses-item`) при помощи `.querySelectorAll()`
    - Получить оставшиеся поля через `.querySelector()` 
      - статьи возможного дохода,
      - чекбокс,
      - сумма,
      - процент,
      - год,
      - месяц,
      - день

3. Проверить, чтобы все работало и не было ошибок в консоли

4. Добавить папку с уроком на свой GitHub

**Вопросы к этому заданию**
1. Как можно изменить размер шрифта элемента при помощи JS?
    - С помощью `element.style.fontSize = 'размер px, em, rem, %';`