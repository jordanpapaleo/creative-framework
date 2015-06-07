const DOMElement = FamousPlatform.domRenderables.DOMElement;

export class BackgroundColorTest {
  constructor(node) {
    let labels = [];
    let boxes = [];
    let els = [];
    for (let i = 0; i < 4; i++) {
      let yPosition = (i * 150) + 20;
      let labelNode = node.addChild();
      let labelDom = new DOMElement(labelNode, {
        tagName: 'div',
        properties: {
          boxSizing: 'border-box',
          color: '#343434',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          fontWeight: '900',
          textAlign: 'left'
        },
        content: 'mouse ' + i
      });
      labelNode.setSizeMode(1, 1, 1).setAbsoluteSize(400, 20, 0).setPosition(140, yPosition, 0);

      let boxNode = node.addChild();
      let boxDom = new DOMElement(boxNode, {
        properties: {
          background: '#ff0099',
          boxSizing: 'border-box',
          color: '#343434',
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          fontWeight: '900',
          lineHeight: '100px',
          textAlign: 'center'
        },
        content: 'hello'
      });
      boxNode.setSizeMode(1, 1, 1).setAbsoluteSize(100, 100, 0).setPosition(20, yPosition, 0);
    }
  }
}
