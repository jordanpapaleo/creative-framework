import addWheelListener from '../../events/addWheelListener';

const defaultIncrement = Math.PI / 500;
const defaultRevolution = Math.PI * 2;
const degreesMultiplier = 180 / Math.PI;

class RotationEvent {
  /**
   * Return a new function closure that reports back the current rotation value.
   * @method  constructor
   * @constructor
   * @param   {String}     delta       Tells the Function closure to report back the deltaX or the deltaY.
   * @param   {Boolean}    useDegrees  If true use degrees instead of radians.
   * @return  {Function}   Function closure that is used to report back the current rotation value.
   */
  constructor(delta, useDegrees) {
    let dir = 'deltaX';
    if (delta === 'y') dir = 'deltaY';

    /**
     * Attaches a `wheel` event to `window`
     * @method  rotation
     * @param   {Object}    [options]            Optional options object.
     * @param   {Eleemnt}   options.eventTarget  The event target. Defaults to `window`.
     * @param   {Number}    options.friction     Set the friction of the rotation. Defaults to `4`.
     * @param   {Number}    options.increment    Set the amount to increment the rotation. Defaults to `Math.PI / 500`.
     * @param   {Number}    options.revolution   Set the value for 1 revolution. Defaults to `Math.PI * 2`.
     * @param   {Boolean}   options.natural      Set if the scrolling should be natural. Defaults to false.
     * @param   {Function}  callback             Function to call on mouse event.
     */
    return function rotation(options, callback) {
      if (typeof options === 'function' && !callback) {
        callback = options;
        options = {};
      }
      let eventTarget = options.eventTarget || window;
      let increment = options.increment || defaultIncrement;
      let revolution = options.revolution || defaultRevolution;
      let friction = options.friction || 4;
      let direction = (delta === 'y') ? 1 : -1;
      if (options.natural) direction *= -1;

      let angle = options.angle || 0;

      addWheelListener(eventTarget, (ev) => {
        ev.preventDefault();
        angle += (increment * ev[dir] / friction) * direction;
        if (angle >= revolution || angle <= -revolution) angle = 0;
        if (useDegrees) angle = angle * degreesMultiplier;
        callback(angle, dir);
      });
    };
  }
}

export default class Wheel {

  /**
   * Creates a new RotationEvent and returns a function that accepts an options argument and a callback.
   *
   * @example
   *
   *     // Set the Y rotation of a View
   *     let wheelX = Wheel.rotateX();
   *     wheelX((val) => {
   *       view.setRotationY(val);
   *     });
   *
   *     // Set the Y rotation of a View and optionally set a few properties
   *     let wheelX = Wheel.rotateX();
   *     wheelX({
   *       speed: 30,
   *       revolution: Math.PI * 4
   *     }, (val) => {
   *       this.setRotationY(val);
   *     });
   *
   * @method  rotateX
   * @param   {Boolean}   useDegrees  If true use degrees instead of radians.
   * @return  {Function}
   */
  static rotateX(useDegrees) {
    return new RotationEvent('x', useDegrees);
  }

  /**
   * Creates a new RotationEvent and returns a function that accepts an options argument and a callback.
   *
   * @example
   *
   *     // Set the X rotation of a View
   *     let wheelY = Wheel.rotateY();
   *     wheelX((val) => {
   *       view.setRotationY(val);
   *     });
   *
   *     // Set the X rotation of a View and optionally set a few properties
   *     let wheelY = Wheel.rotateY();
   *     wheelY({
   *       speed: 30,
   *       revolution: Math.PI * 4
   *     }, (val) => {
   *       this.setRotationX(val);
   *     });
   *
   * @method  rotateY
   * @param   {Boolean}   useDegrees  If true use degrees instead of radians.
   * @return  {Function}
   */
  static rotateY(useDegrees) {
    return new RotationEvent('y', useDegrees);
  }
}
