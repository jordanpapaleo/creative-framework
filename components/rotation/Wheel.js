import addWheelListener from '../../events/addWheelListener';

const INCREMENT = Math.PI / 500;
const REVOLUTION = Math.PI;

export default class Wheel {
  constructor(node, options = {}) {
    this.node = node;
    this.eventTarget = options.eventTarget || window;
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.setConstrainX(options.constrainX);
    this.setConstrainY(options.constrainY);
    this.setConstrainZ(options.constrainZ);
    this.setDirection(options.direction);
    this.setFriction(options.friction);
    this.setIncrement(options.increment);
    this.setPreventWrap(options.preventWrap);
    this.setRevolution(options.revolution);

    this.initEvents();
  }

  initEvents() {
    addWheelListener(this.eventTarget, (event) => {
      event.preventDefault();
      this.setRotation(event.deltaY, event.deltaX);
    });
  }

  // Getters
  getConstrainX() {
    return this.constrainX;
  }
  getConstrainY() {
    return this.constrainY;
  }
  getConstrainZ() {
    return this.constrainZ;
  }
  getFriction() {
    return this.friction;
  }
  getIncrement() {
    return this.increment;
  }
  getDirection() {
    return this.direction;
  }
  getPreventWrap() {
    return this.preventWrap;
  }
  getRevolution() {
    return this.revolution;
  }
  getRotation() {
    return [this.x, this.y, this.z];
  }

  // Setters
  setConstrainX(val = [REVOLUTION, -REVOLUTION]) {
    this.constrainX = val;
    return this;
  }
  setConstrainY(val = [REVOLUTION, -REVOLUTION]) {
    this.constrainY = val;
    return this;
  }
  setConstrainZ(val = [REVOLUTION, -REVOLUTION]) {
    this.constrainZ = val;
    return this;
  }
  setFriction(val = 4) {
    this.friction = val;
    return this;
  }
  setIncrement(val = INCREMENT) {
    this.increment = val;
    return this;
  }
  setDirection(val = false) {
    this.direction = val ? [-1, 1, -1] : [1, -1, 1];
    return this;
  }
  setPreventWrap(val = [false, false, false]) {
    if (!Array.isArray(val)) this.preventWrap = [val, val, val];
    else this.preventWrap = val;
    return this;
  }
  setRevolution(val = REVOLUTION) {
    this.revolution = val;
    return this;
  }
  setRotation(x = 0, y = 0, z = 0) {
    let angleX = this.x;
    let angleY = this.y;
    let angleZ = this.z;

    if (x !== 0) angleX += (this.increment * x * this.direction[0] / this.friction);
    if (y !== 0) angleY += (this.increment * y * this.direction[1] / this.friction);
    if (z !== 0) angleZ += (this.increment * z * this.direction[2] / this.friction);

    if (angleX <= this.constrainX[0] || angleX >= this.constrainX[1]) this.x = angleX;
    if (angleY <= this.constrainY[0] || angleY >= this.constrainY[1]) this.y = angleY;
    if (angleZ <= this.constrainZ[0] || angleZ >= this.constrainZ[1]) this.z = angleZ;

    if (angleX >= this.constrainX[0]) this.x = this.constrainX[this.preventWrap[0] ? 0 : 1];
    else if (angleX <= this.constrainX[1]) this.x = this.constrainX[this.preventWrap[0] ? 1 : 0];

    if (angleY >= this.constrainY[0]) this.y = this.constrainY[this.preventWrap[1] ? 0 : 1];
    else if (angleY <= this.constrainY[1]) this.y = this.constrainY[this.preventWrap[1] ? 1 : 0];

    if (angleZ >= this.constrainZ[0]) this.z = this.constrainZ[this.preventWrap[2] ? 0 : 1];
    else if (angleZ <= this.constrainZ[1]) this.z = this.constrainZ[this.preventWrap[2] ? 1 : 0];

    this.node.setRotation(this.x, this.y, this.z);
    return this;
  }
}
