import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  // Получаем элементы, которые понадобятся
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');
  //phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  checkNumInputs('input[name="user_phone"]');
  /*
    // Простая валидация ИНПУТОВ.
    // Проверяется ввод данных,
    // Если в поле номера телефона вводятся НЕ цифры, то данные не вводятся
    phoneInputs.forEach(item => {
      item.addEventListener('input', () => {
        // Обрезаем все символы, которые НЕ-ЦИФРЫ
        item.value = item.value.replace(/\D/, '');
      });
    });
  */

  // Создаем объект с сообщениями, которые будут появляться
  // при выполнении отправки данных
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся.',
    failure: 'Что-то пошло не так...'
  };

  // Функция отвечающая за отправку запроса
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    return await res.text();
  };

  // Очистка всех ИНПУТОВ
  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  // Получаем все формы на странице
  form.forEach(item => {
    // Навешиваем обработчик событий на формы
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      // Создаем БЛОК, в котором будем показывать процесс отправки
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      // Собираем все введенные данные из формы
      const formData = new FormData(item);

      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }


      // Отправляем запрос на сервер
      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;