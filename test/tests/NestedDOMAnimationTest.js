import Camera from '../../display/Camera';
import View from '../../display/View';

const inOutExpo = FamousPlatform.transitions.Curves.inOutExpo;
const towards = 2000;
const away = -5000;

/**
 * Each Box contains a child nested underneath them. While animating, all Boxes
 * should be in lock step with one another. This is to test against a bug where a
 * childs position is behind it's parent during animation, which results in a
 * accordian effect.
 */

export class NestedDOMAnimationTest {
  constructor(node) {
    this.camera = new Camera(node, {depth: 5000});
    this.parentNode = new Box(node.addChild(), { width: 400, height: 200, color: '#222222', content: 'I am parent' });
    this.childNode1 = new Box(this.parentNode.addChild(), { width: 300, height: 150, color: '#444444', content: 'I am child 1' });
    this.childNode2 = new Box(this.childNode1.addChild(), { width: 200, height: 100, color: '#666666', content: 'I am child 2' });
    this.childNode3 = new Box(this.childNode2.addChild(), { width: 100, height: 50, color: '#999999', content: 'I am child 3' });
    this.parentNode.moveCenter().setPositionZ(towards);
    this.direction = away;
    this.startAnimation();
  }

  startAnimation() {
    setTimeout(() => this.animate(), 1000);
  }

  animate() {
    this.parentNode.setPositionZ(this.direction, {duration: 800, curve: inOutExpo}, () => this.animationComplete());
  }

  animationComplete() {
    this.direction = (this.direction === away) ? towards : away;
    setTimeout(() => this.animate(), 600);
  }
}

class Box {
  constructor(parent, options) {
    let node = new View(parent);
    node
      .setSizeModeAbsolute()
      .moveBottomCenter()
      .setAbsoluteSize(options.width, options.height, 0)
      .createDOMElement({
        properties: {
          background: options.color,
          color: '#eeeeee',
          fontFamily: 'Arial',
          fontSize: '16px',
          lineHeight: '30px',
          textAlign: 'center'
        },
        content: options.content
      });
    return node;
  }
}
