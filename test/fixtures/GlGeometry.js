import View from '../../display/View';

export default class GlGeometry {
  constructor(node, options) {
    this.gl = new View(node);
    this.gl
      .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
      .setAbsoluteSize(50, 50, 50)
      .setGeometry(options.geometry)
      .setBaseColor(options.color);
    return this.gl;
  }
}
