'use strict';

function tabs() {
  // ============== TABS ==============
  // Блок-обертка для закладок
  let parentTabs = document.querySelector('.info-header');
  // Массив закладок
  let tabs = document.querySelectorAll('.info-header-tab');
  // Содержание (контент) закладок
  let tabContent = document.querySelectorAll('.info-tabcontent');

  function tabTarget(parentTabs, tabs, tabContent) {

    function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    } hideTabContent(1);

    function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.add('show');
        tabContent[b].classList.remove('hide');
      }
    }

    parentTabs.addEventListener('click', (e) => {
      let target = e.target;

      if (target && target.classList.contains('info-header-tab')) {
        for (let i = 0; i < tabs.length; i++) {
          if (target == tabs[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  } tabTarget(parentTabs, tabs, tabContent);
}

module.exports = tabs;