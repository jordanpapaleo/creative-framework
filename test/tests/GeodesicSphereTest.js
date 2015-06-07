import View from '../../display/View';
import Modifier from '../../display/Modifier';
import LightModifier from '../../display/LightModifier';

const Color = FamousPlatform.utilities.Color;
const Geometry = FamousPlatform.webglGeometries.GeodesicSphere;
// const Geometry = FamousPlatform.webglGeometries.Torus;
// const Geometry = FamousPlatform.webglGeometries.Sphere;

const speed = Math.PI / 100;
const revolution = Math.PI * 2;

export class GeodesicSphereTest {
  constructor(node) {
    this.rootNode = new Modifier(node.addChild());
    this.rootNode.setPosition(200, 200);
    this.rootNode.setAlign(0.5, 0.5, 0.5);
    this.rootNode.setOrigin(0.5, 0.5, 0.5);
    this.rootNode.setMountPoint(0.5, 0.5, 0.5);
    this.testGLView(this.rootNode);
    this.testLightModifier(this.rootNode);
  }

  testGLView(node) {
    this.angle = 0;
    this.gl = new View(node.addChild());
    this.gl
      .setSizeModeAbsolute()
      .setGeometry(new Geometry())
      .setBaseColor(new Color('#00ff99'))
      .setAbsoluteSize(200, 200, 200)
      .setPosition(100, 100, 0)
      .setOrigin(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .onUpdate = () => {
        this.angle += speed;
        if (this.angle >= revolution || this.angle <= -revolution) this.angle = 0;
        this.gl.setRotationY(this.angle);
        this.gl.requestUpdateOnNextTick();
      };
    this.crossHairs(node);

    // add cutout tester
    this.orbitalDiv = new View(this.gl.addChild());
    this.orbitalDiv.createDOMElement({
      properties: {
        backgroundColor: 'red'
      }
    });
    this.orbitalDiv
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100, 100)
      .setMountPoint(0.5, 0.5, 0.5)
      .setOrigin(0.5, 0.5, 0.5)
      .setPosition(0, 0, 300);

    this.gl.requestUpdateOnNextTick();
  }

  testLightModifier(node) {
    this.pointLight = new LightModifier(node.addChild(), {
      type: 'point',
      color: new Color('#fff'),
      position: [500, -500, 5000]
    });
  }

  crossHairs(node) {
    let props = {
      properties: {
        background: '#0000ff'
      }
    };
    let thickness = 2;
    new View(node.addChild()).setSizeModeAbsolute().createDOMElement(props).setAbsoluteSize(200, thickness).setPosition(0, 100, 0);
    new View(node.addChild()).setSizeModeAbsolute().createDOMElement(props).setAbsoluteSize(thickness, 200).setPosition(100, 0, 0);
    new View(node.addChild()).setSizeModeAbsolute().createDOMElement(props).setAbsoluteSize(200, thickness).setPosition(0, 0, 0);
    new View(node.addChild()).setSizeModeAbsolute().createDOMElement(props).setAbsoluteSize(thickness, 200).setPosition(0, 0, 0);
    new View(node.addChild()).setSizeModeAbsolute().createDOMElement(props).setAbsoluteSize(200, thickness).setPosition(0, 200, 0);
    new View(node.addChild()).setSizeModeAbsolute().createDOMElement(props).setAbsoluteSize(thickness, 200).setPosition(200, 0, 0);
  }
}
