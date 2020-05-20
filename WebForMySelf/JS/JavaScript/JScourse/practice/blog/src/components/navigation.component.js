import { Component } from '../core/component';

export class NavigationComponent extends Component{
  constructor(id) {
    super(id);

    this.tabs = [];
  }

  init() {
    // console.log(this.$el);
    this.$el.addEventListener('click', tabClickHandler.bind(this));
  }

  registerTabs(tabs) {
    this.tabs = tabs;
  }
}

function tabClickHandler(event) {
  /*
    Отменить действие по умолчанию. 
    В данном случае отменяет переход по ссылке href="#"
  */ 
  event.preventDefault();

  if (event.target.classList.contains('tab')) {
    // console.log(event.target);
    Array.from(this.$el.querySelectorAll('.tab')).forEach( tab => {
      tab.classList.remove('active');
    });

    event.target.classList.add('active');

    const activeTab = this.tabs.find(tab => tab.name === event.target.dataset.name);
    // console.log(activeTab);

    this.tabs.forEach(tab => tab.component.hide());
    activeTab.component.show();
  }
}