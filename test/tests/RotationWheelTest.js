import Camera from '../../display/Camera';
import LightModifier from '../../display/LightModifier';
import View from '../../display/View';
import Wheel from '../../components/rotation/Wheel';

const Geometry = FamousPlatform.webglGeometries.Box;

export class RotationWheelTest {
  constructor(node) {
    let camera = new Camera(node.addChild());
    this.root = camera.addChild();
    this.container = new View(this.root.addChild(), {useDegrees: false});
    this.container.moveCenter();

    this.light = new LightModifier(this.container.addChild(), { color: '#00ff00', visible: true });
    this.light.moveCenter().setPosition(-200, -200, 300);
    this.background = new Background(this.container.addChild());

    this.dom = new DOM(this.container.addChild());

    this.wheel = new Wheel(this.container.node, {
      preventWrap: [true, false],
      constrainX: [0, -Math.PI / 6]
    });
  }
}

class DOM extends View {
  constructor(node) {
    super(node, { useDegrees: true });
    this
      .moveCenter()
      .setSizeModeAbsolute()
      .setAbsoluteSize(240, 60, 0)
      .setPositionZ(-4)
      .createDOMElement({
        properties: {
          background: '#ff0099',
          color: '#fff',
          fontFamily: 'Arial',
          fontSize: '20px',
          lineHeight: '60px',
          textAlign: 'center'
        },
        content: 'I am DOM hear me roar!'
      });
    this.degrees = 0;
    this.requestUpdate();
  }
  onUpdate() {
    this.degrees++;
    if (this.degress >= 360) this.degrees = 0;
    this.setRotationY(this.degrees);
    this.requestUpdateOnNextTick();
  }
}

class Background {
  constructor(node) {
    this.bg = new View(node);
    this.bg
      .moveCenter()
      .setSizeModeAbsolute()
      .setAbsoluteSize(500, 500, 10)
      .setPositionZ(-200)
      .setGeometry(new Geometry())
      .setBaseColor([11, 207, 180]);
  }
}
