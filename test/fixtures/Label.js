import View from '../../display/View';

export default class Label {
  constructor(node, options = {}) {
    this.label = new View(node);
    this.label
      .createDOMElement({
        tagName: 'div',
        properties: {
          boxSizing: 'border-box',
          color: options.color || '#343434',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          fontWeight: '900',
          textAlign: 'left'
        },
        content: options.content
      });
    return this.label;
  }
}
