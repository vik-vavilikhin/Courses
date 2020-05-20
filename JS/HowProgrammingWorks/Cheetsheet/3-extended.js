'use strict';

const Point = class {
  constructor(x, y) {
    this.x = x;
    this.y =y;
  }
};

const serializable = Category => class extends Category {
  toString() {
    return `[${this.x}, ${this.y}]`;
  }
};

const movable = Category => class extends Category {
  move(x, y) {
    this.x += x;
    this.y += y;
  }
};

// Usage

const PointEx = serializable(movable(Point));
const pointl = new PointEx(10, 20);
pointl.move(5, -2);
console.log(pointl.toString());
const {x, y} = pointl;
console.log(x, y);