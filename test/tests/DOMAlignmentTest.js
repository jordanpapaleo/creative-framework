import View from '../../display/View';

export class DOMAlignmentTest {
  constructor(node) {
    let boxes = {};
    [
      'Top Left',
      'Top Center',
      'Top Right',
      'Center Left',
      'Center',
      'Center Right',
      'Bottom Left',
      'Bottom Center',
      'Bottom Right'
    ].forEach((label) => {
      boxes[label] = new DomBox(node, label);
    });
  }
}

class DomBox {
  constructor(node, label) {
    let view = new View(node.addChild());
    view.setSizeModeAbsolute();
    view.setAbsoluteSize(200, 200);
    view['move' + label.replace(' ', '')]();
    view.createDOMElement({
      properties: {
        background: '#333333',
        border: '5px dotted #ff0099',
        color: '#eeeeee',
        fontFamily: 'Arial',
        fontSize: '24px',
        lineHeight: '200px',
        textAlign: 'center'
      },
      content: label
    });
    return view;
  }
}
