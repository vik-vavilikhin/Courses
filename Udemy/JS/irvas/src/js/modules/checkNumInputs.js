const checkNumInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector);

  // Простая валидация ИНПУТОВ.
  // Проверяется ввод данных,
  // Если в поле номера телефона вводятся НЕ цифры, то данные не вводятся
  numInputs.forEach(item => {
    item.addEventListener('input', () => {
      // Обрезаем все символы, которые НЕ-ЦИФРЫ
      item.value = item.value.replace(/\D/, '');
    });
  });
};

export default checkNumInputs;