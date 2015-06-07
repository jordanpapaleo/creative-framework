import Random from '../../util/Random';
import View from '../../display/View';
import Label from '../fixtures/Label';

const props = {
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
};

const EMIT_EVENT = 'custom emit event';
const EMIT_SIBLING_EVENT = 'custom sibling emit event';

export class MouseEventTest {
  constructor(node) {
    this.mouseLabel = new Label(node.addChild(), {content: 'mouse'});
    this.mouseLabel.setPosition(120, 20, 0).setSizeModeAbsolute().setAbsoluteSize(400, 20, 0);
    this.mouseNode = new View(node.addChild());
    this.mouseNode
      .createDOMElement(props)
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100)
      .setPosition(0, 20, 0)
      .on('mouseenter', () => this.mouseLabel.setDOMContent('mouseenter'))
      .on('mouseleave', () => this.mouseLabel.setDOMContent('mouseleave'))
      .on('mousedown', () => this.mouseLabel.setDOMContent('mousedown'))
      .on('mouseup', () => this.mouseLabel.setDOMContent('mouseup'));

    this.clickCounter = 0;
    this.clickLabel = new Label(node.addChild(), {content: 'click: ' + this.clickCounter++});
    this.clickLabel.setPosition(120, 170, 0).setSizeModeAbsolute().setAbsoluteSize(400, 20, 0);
    this.clickNode = new View(node.addChild());
    this.clickNode
      .createDOMElement(props)
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100)
      .setPosition(0, 170, 0)
      .on('click', () => this.clickLabel.setDOMContent('click: ' + this.clickCounter++));

    this.moveLabel = new Label(node.addChild(), {content: 'move'});
    this.moveLabel.setPosition(120, 320, 0).setSizeModeAbsolute().setAbsoluteSize(400, 20, 0);
    this.moveNode = new View(node.addChild());
    this.moveNode
      .createDOMElement(props)
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100)
      .setPosition(0, 320, 0)
      .on('mousemove', (ev) => {
        this.moveLabel.setDOMContent(`x: ${ev.clientX} | y: ${ev.clientY}`);
      });

    this.moveLabel2 = new Label(node.addChild(), {content: 'move 2'});
    this.moveLabel2.setPosition(120, 470, 0).setSizeModeAbsolute().setAbsoluteSize(400, 20, 0);
    this.moveNode2 = new View(node.addChild());
    this.moveNode2
      .createDOMElement(props)
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100)
      .setPosition(0, 470, 0)
      .on('mousemove', (ev) => {
        this.moveLabel2.setDOMContent(`x: ${ev.clientX} | y: ${ev.clientY}`);
      });

    const startPosition = 620;
    const labelHeight = 20;
    const labelGutter = 4;

    this.siblingNode1 = new View(node.addChild());
    this.siblingNode1Child = new View(this.siblingNode1.addChild());
    this.emitNode = new View(this.siblingNode1Child.addChild());
    this.emitNode
      .createDOMElement(props)
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100)
      .setPosition(0, startPosition, 0)
      .on('click', () => {
        this.emitNode.trigger(EMIT_EVENT, `custom payload from emitNode click ${Random.random()}`);
      })
      .on('mouseover', () => {
        this.emitNode.trigger(EMIT_EVENT, `custom payload from emitNode mouseover ${Random.random()}`);
      })
      .on('mousemove', (ev) => {
        this.emitNode.trigger(EMIT_EVENT, `custom payload from emitNode mousemove ${ev.clientX} | ${ev.clientY}`);
      })
      .on('mouseout', () => {
        this.emitNode.trigger(EMIT_EVENT, `custom payload from emitNode mouseout ${Random.random()}`);
      });


    this.siblingNode2 = new View(node.addChild());
    this.siblingNode2Child = new View(this.siblingNode2.addChild());

    for (let i = 0; i < 10; i++) {
      let label = new Label(this.siblingNode2Child.addChild(), {content: `${i + 1}: nothing to say here`});
      let id = `id${i + 1}`;
      label
        .setSizeModeAbsolute()
        .setAbsoluteSize(600, labelHeight, 0)
        .setPosition(120, ((labelHeight + labelGutter) * i) + startPosition)
        .on(EMIT_EVENT, (payload) => {
          label.setDOMContent(`${id}: ${payload}`);
        })
        .on(EMIT_SIBLING_EVENT, (payload) => {
          label.setDOMContent(`${id}: ${payload}`);
        })
        .on('click', () => {
          label.trigger(EMIT_SIBLING_EVENT, 'clicked sibling label ' + label.getId());
        })
        .on('mouseover', () => {
          label.trigger(EMIT_SIBLING_EVENT, 'mouseover ' + label.getId());
        });
    }
  }
}
