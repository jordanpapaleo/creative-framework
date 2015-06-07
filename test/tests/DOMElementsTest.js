const DOMElement = FamousPlatform.domRenderables.DOMElement;
const Node = FamousPlatform.core.Node;
const size = 50;

export class DOMElementsTest {
  constructor(node) {
    let columns = Math.floor(window.innerWidth / size);
    let rows = Math.floor(window.innerHeight / size);
    let total = 0;
    rows = 50;
    this.rootNode = node.addChild();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        // EXAMPLE START
        // Works when you pass in this.rootNode.addChild()
        // let box = new Box(this.rootNode.addChild(), `${row}, ${column}`);

        // Breaks when you only pass this.rootNode
        let box = new Box(this.rootNode, `${row} : ${column}`);
        // EXAMPLE END
        box.node.setPosition(column * size, row * size, 0);
        total++;
      }
    }
    console.log('total', total);
  }
}

class Box {
  constructor(node) {
    this.node = node.addChild();
    this.node.setSizeMode(Node.ABSOLUTE_SIZE, Node.ABSOLUTE_SIZE, Node.ABSOLUTE_SIZE);
    this.node.setAbsoluteSize(50, 50, 0);
    this.el = new DOMElement(this.node, {
      properties: {
        background: '#ff0000',
        border: '5px solid black',
        boxSizing: 'border-box'
      }
    });
  }
}
