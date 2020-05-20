'use strict';

class Options {
  constructor(height, width, bg, fontSize, textAlign, color) {
    this.height    = height;
    this.width     = width;
    this.bg        = bg;
    this.fontSize  = fontSize;
    this.textAlign = textAlign;
    this.color     = color;
  }
  makeDiv(parent, text) {
    let childDiv             = document.createElement('div');
        childDiv.textContent = text;
        
    let parentDiv = document.querySelector(parent);
        parentDiv.appendChild(childDiv);

    let styles = `
      height          : ${this.height};
      width           : ${this.width};
      background-color: ${this.bg};
      font-size       : ${this.fontSize};
      text-align      : ${this.textAlign};
      color           : ${this.color};
    `;
    childDiv.style.cssText = styles;
  }
}

let item = new Options('50px', '100%', 'blue', '25px', 'center', '#fff');
    item.makeDiv('body', 'Какой-то текст');