import LightModifier from '../../display/LightModifier';
import View from '../../display/View';

const Color = FamousPlatform.utilities.Color;
const Famous = FamousPlatform.core.Famous;
const Geometry = FamousPlatform.webglGeometries.GeodesicSphere;

const speedInRadians = Math.PI / 100;
const revolutionInRadians = Math.PI * 2;
const speedInDegrees = 1.8;
const revolutionInDegrees = 360;


export class RotationTest {
  constructor(node) {
    this.angleInDegrees = 0;
    this.parent = new View(node.addChild());
    this.parent.moveCenter();
    this.createRadiansTest(this.parent.addChild());
    this.createDegreesTest(this.parent.addChild());
    this.createLight(node.addChild());
    this.startAnimation();
  }

  createRadiansTest(node) {
    this.radianTestLabel = new View(node.addChild());
    this.radianTestLabel
      .setSizeModeAbsolute()
      .setAbsoluteSize(300, 50, 0)
      .setPosition(5, 5, 0)
      .createDOMElement({
        properties: {
          fontFamily: 'Arial',
          fontSize: '24px'
        },
        content: 'Testing Radians'
      });
    this.radianTest = new Sphere(node);
    this.radianTestV = new Sphere(node);
    this.radianTestX = new Sphere(node);
    this.radianTestY = new Sphere(node);
    this.radianTestZ = new Sphere(node);
    this.radianTest.setPosition(50, 50, 0);
    this.radianTestV.setPosition(250, 50, 0);
    this.radianTestX.setPosition(450, 50, 0);
    this.radianTestY.setPosition(650, 50, 0);
    this.radianTestZ.setPosition(850, 50, 0);
    this.radianTest.onUpdate = () => {
      this.radianTest.angle = this.calculateRadians(this.radianTest.angle);
      this.radianTest.setRotation(this.radianTest.angle, this.radianTest.angle, this.radianTest.angle);
      this.radianTest.requestUpdateOnNextTick();
    };
    this.radianTestV.onUpdate = () => {
      this.radianTestV.angle = this.calculateRadians(this.radianTestV.angle);
      this.radianTestV.setRotationValue({
        component: 'Rotation',
        x: this.radianTestV.angle,
        y: this.radianTestV.angle,
        z: this.radianTestV.angle
      });
      this.radianTestV.requestUpdateOnNextTick();
    };
    this.radianTestX.onUpdate = () => {
      this.radianTestX.angle = this.calculateRadians(this.radianTestX.angle);
      this.radianTestX.setRotationX(this.radianTestX.angle);
      this.radianTestX.requestUpdateOnNextTick();
    };
    this.radianTestY.onUpdate = () => {
      this.radianTestY.angle = this.calculateRadians(this.radianTestY.angle);
      this.radianTestY.setRotationY(this.radianTestY.angle);
      this.radianTestY.requestUpdateOnNextTick();
    };
    this.radianTestZ.onUpdate = () => {
      this.radianTestZ.angle = this.calculateRadians(this.radianTestZ.angle);
      this.radianTestZ.setRotationZ(this.radianTestZ.angle);
      this.radianTestZ.requestUpdateOnNextTick();
    };
  }

  createDegreesTest(node) {
    this.degreesTestLabel = new View(node.addChild());
    this.degreesTestLabel
      .setSizeModeAbsolute()
      .setAbsoluteSize(300, 50, 0)
      .setPosition(5, 255, 0)
      .createDOMElement({
        properties: {
          fontFamily: 'Arial',
          fontSize: '24px'
        },
        content: 'Testing Degrees'
      });
    this.degreesTest = new Sphere(node, {useDegrees: true});
    this.degreesTestV = new Sphere(node, {useDegrees: true});
    this.degreesTestX = new Sphere(node, {useDegrees: true});
    this.degreesTestY = new Sphere(node, {useDegrees: true});
    this.degreesTestZ = new Sphere(node, {useDegrees: true});
    this.degreesTest.setPosition(50, 300, 0);
    this.degreesTestV.setPosition(250, 300, 0);
    this.degreesTestX.setPosition(450, 300, 0);
    this.degreesTestY.setPosition(650, 300, 0);
    this.degreesTestZ.setPosition(850, 300, 0);
    this.degreesTest.onUpdate = () => {
      this.degreesTest.angle = this.calculateDegrees(this.degreesTest.angle);
      this.degreesTest.setRotation(this.degreesTest.angle, this.degreesTest.angle, this.degreesTest.angle);
      this.degreesTest.requestUpdateOnNextTick();
    };
    this.degreesTestV.onUpdate = () => {
      this.degreesTestV.angle = this.calculateDegrees(this.degreesTestV.angle);
      this.degreesTestV.setRotationValue({
        component: 'Rotation',
        x: this.degreesTestV.angle,
        y: this.degreesTestV.angle,
        z: this.degreesTestV.angle
      });
      this.degreesTestV.requestUpdateOnNextTick();
    };
    this.degreesTestX.onUpdate = () => {
      this.degreesTestX.angle = this.calculateDegrees(this.degreesTestX.angle);
      this.degreesTestX.setRotationX(this.degreesTestX.angle);
      this.degreesTestX.requestUpdateOnNextTick();
    };
    this.degreesTestY.onUpdate = () => {
      this.degreesTestY.angle = this.calculateDegrees(this.degreesTestY.angle);
      this.degreesTestY.setRotationY(this.degreesTestY.angle);
      this.degreesTestY.requestUpdateOnNextTick();
    };
    this.degreesTestZ.onUpdate = () => {
      this.degreesTestZ.angle = this.calculateDegrees(this.degreesTestZ.angle);
      this.degreesTestZ.setRotationZ(this.degreesTestZ.angle);
      this.degreesTestZ.requestUpdateOnNextTick();
    };
  }

  createLight(node) {
    this.pointLight = new LightModifier(node, {
      type: 'point',
      color: new Color('#fff'),
      position: [500, -500, 5000]
    });
  }

  startAnimation() {
    this.radianTest.requestUpdateOnNextTick();
    this.radianTestV.requestUpdateOnNextTick();
    this.radianTestX.requestUpdateOnNextTick();
    this.radianTestY.requestUpdateOnNextTick();
    this.radianTestZ.requestUpdateOnNextTick();
    this.degreesTest.requestUpdateOnNextTick();
    this.degreesTestV.requestUpdateOnNextTick();
    this.degreesTestX.requestUpdateOnNextTick();
    this.degreesTestY.requestUpdateOnNextTick();
    this.degreesTestZ.requestUpdateOnNextTick();
  }

  calculateRadians(angle) {
    angle += speedInRadians;
    if (angle >= revolutionInRadians || angle <= -revolutionInRadians) angle = 0;
    return angle;
  }

  calculateDegrees(angle) {
    angle += speedInDegrees;
    if (angle >= revolutionInDegrees || angle <= 0) angle = 0;
    return angle;
  }
}

class Sphere {
  constructor(node, options) {
    let parent = new View(node.addChild(), options);
    let dom = new View(parent.addChild());
    let gl = new View(parent.addChild());
    parent.angle = 0;
    parent
      .setSizeModeAbsolute()
      .setAbsoluteSize(150, 150, 150)
      .setOrigin(0.5, 0.5, 0.5);
    dom
      .setSizeModeAbsolute()
      .moveCenter()
      .setAbsoluteSize(150, 150, 150)
      .createDOMElement({
        properties: {
          background: '#333333',
          color: '#eeeeee'
        },
        content: 'I am DOM and GL'
      });
    gl
      .setSizeModeAbsolute()
      .moveCenter()
      .setAbsoluteSize(100, 100, 100)
      .setGeometry(new Geometry())
      .setBaseColor(new Color('#ff0099'));
    return parent;
  }
}
