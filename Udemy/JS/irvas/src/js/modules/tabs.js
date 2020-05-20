const tabs = (
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = 'block'
) => {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });
    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    content[i].style.display = display;
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  // Навешиваем обработчик на общую область, где будет произведен КЛИК
  // т.е. на шапку ТАБОВ
  header.addEventListener('click', (e) => {
    const target = e.target;

    // Определяем куда именно был произведен КЛИК. Делегирование событий.
    if (target &&
      (target.classList.contains(tabSelector.replace(/\./, '')) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
      // Если КЛИК был произведен по одному из ТАБОВ,
      // начинаем их пребирать
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

export default tabs;