export default class Random {

  /**
   * Sets the distribution function used for random.
   * @method  setDistribution
   * @param   {Function}       fn  The function used to calculate the distribution.
   */
  static setDistribution(fn) {
    Random.distribution = fn;
  }

  /**
   * Returns a non-uniformly distributed random number.
   * @method  random
   * @return  {Number}
   */
  static random() {
    if (!Random.distribution) Random.distribution = function () { return 1; };

    var key = Math.random();
    var value = Math.random();
    var limit = Random.distribution(key);
    if (value < limit) return key;
    else return this.random();
  }

  /**
   * Return a random number between min and max.
   * @method  range
   * @param   {Number}  min  The lower bounds of the random seed.
   * @param   {Number}  max  The upper bounds of the random seed.
   * @return  {Number}  A random number between min and max.
   */
  static range(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   */
  /**
   * Return a random RGB color.
   * @method  color
   * @return  {Array}  An array that contains RGB values.
   */
  static color() {
    return [Random.random() * 255, Random.random() * 255, Random.random() * 255];
  }
}
