'use strict';

function form() {
  // ============== FORM ==============
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  let forms = document.querySelectorAll('form');
  let statMess = document.createElement('div');
  statMess.classList.add('status');

  forms.forEach(form => {
    let inputs = form.getElementsByTagName('input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.appendChild(statMess);

      // Получаем все данные из формы и записываем их в переменную formData
      // с помощью встроенного класса `new FormData(form)`
      let formData = new FormData(form);

      let req = new XMLHttpRequest();
      req.open('POST', 'server.php');

      // Данные получены в формате .json
      req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      let obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });

      let json = JSON.stringify(obj);

      req.send(json);

      req.addEventListener('readystatechange', () => {
        (req.readyState < 4) ? statMess.innerHTML = message.loading
          : (req.readyState == 4 && req.status == 200) ?
            statMess.innerHTML = message.success
            : statMess.innerHTML = message.failure;
      });

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    });
  });
}

module.exports = form;