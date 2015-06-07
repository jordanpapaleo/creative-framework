import View from '../../display/View';

export default class Box {
  constructor(node) {
    this.box = new View(node);
    this.box
      .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
      .setAbsoluteSize(50, 50)
      .createDOMElement({
        tagName: 'div',
        properties: {
          background: '#ff0099',
          border: '5px solid black',
          boxSizing: 'border-box'
        }
      });
    return this.box;
  }
}
