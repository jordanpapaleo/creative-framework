import Camera from '../../display/Camera';
import LightModifier from '../../display/LightModifier';
import Random from '../../util/Random';
import View from '../../display/View';
import Wheel from '../../events/Wheel';

const Color = FamousPlatform.utilities.Color;
const Vec3 = FamousPlatform.math.Vec3;
const Plane = FamousPlatform.webglGeometries.Plane;
const Geometry = FamousPlatform.webglGeometries.GeodesicSphere;
// const Geometry = FamousPlatform.webglGeometries.Sphere;
// const Geometry = FamousPlatform.webglGeometries.Torus;

const detail = 3; // GeodesicSphere
// const detail = 60; // Sphere & Torus

export class LightTest {
  constructor(node) {
    let camera = new Camera(node.addChild());
    this.root = new View(camera.addChild(), {useDegrees: false});
    this.root.moveCenter();
    // this.root.setScale(0.2, 0.2, 0.2);
    this.shapeMatte = new MatteShape(this.root.addChild());
    this.shapeSpecular = new SpecularShape(this.root.addChild());
    this.light = new SceneLight(this.root.addChild());
    this.background = new BackgroundFaces(this.root.addChild());
    setInterval(() => this.randomizeColor(), 3000);
    this.wheelX = Wheel.rotateX();
    this.wheelY = Wheel.rotateY();
    this.wheelX((val) => {
      this.root.setRotationY(val);
    });
    this.wheelY((val) => {
      this.root.setRotationX(val);
    });
  }
  randomizeColor() {
    let newColor = Random.color();
    let duration = { duration: 2000 };
    this.shapeMatte.setBaseColor(newColor, duration);
    this.shapeSpecular.setSpecularColor(newColor, 30, duration);
  }
}

class Shape extends View {
  constructor(node) {
    super(node, { useDegrees: true });
    this.degrees = 0;
    this
      .moveCenter()
      .setSizeModeAbsolute()
      .setAbsoluteSize(300, 300, 300);
    this.createView();
    this.modify();
    this.requestUpdate();
  }
  createView() {
    this.setGeometry(new Geometry({detail: detail}));
  }
  onUpdate() {
    this.degrees++;
    if (this.degrees >= 360) this.degrees = 0;
    this.setRotationX(this.degrees);
    this.setRotationY(this.degrees);
    this.requestUpdateOnNextTick();
  }
}
class MatteShape extends Shape {
  modify() {
    this
      .setPositionX(-180)
      .setBaseColor('#ffffff');
  }
}
class SpecularShape extends Shape {
  modify() {
    this
      .setPositionX(180)
      .setBaseColor('#ffffff')
      .setSpecularColor('#cccccc', 30);
  }
}

class SceneLight extends LightModifier {
  constructor(node) {
    super(node, {color: new Color(Random.color()), visible: true});
    this.moveCenter();
    this.initMovement();
    this.requestUpdate();
    setInterval(() => this.randomizeColor(), 3000);
  }
  randomizeColor() {
    this.updateLightColor(Random.color(), { duration: 2000 });
  }
  initMovement() {
    this.movement = {
      tempo: (Random.random() * 5) + 10,
      radius: 500,
      initialRadiansVec3: new Vec3(Random.random() - 0.5, Random.random() - 0.5, Random.random() - 0.5),
      initialPositionVec3: new Vec3(Random.random() - 0.5, Random.random() - 0.5, Random.random() - 0.5)
    };
    this.movement.initialPositionVec3.scale(this.movement.radius);
  }
  onUpdate() {
    let newPosition = this.movement.initialPositionVec3;
    let dir = Vec3.cross(newPosition, this.movement.initialRadiansVec3, new Vec3());
    dir.normalize().scale(this.movement.tempo);
    newPosition.add(dir).normalize().scale(this.movement.radius);
    this.setRotation(Date.now() * 0.001);
    this.setPosition(newPosition.x, newPosition.y, newPosition.z);
    this.requestUpdateOnNextTick();
  }
}

class BackgroundFaces {
  constructor(node) {
    let dimensions = 8000;
    let faceSize = 4000;
    let color = Random.color();
    this.container = new View(node.addChild());
    this.container.moveCenter().setSizeModeAbsolute().setAbsoluteSize(dimensions, dimensions, dimensions);
    this.back = new Face(this.container.addChild(), color);
    this.left = new Face(this.container.addChild(), color);
    this.front = new Face(this.container.addChild(), color);
    this.right = new Face(this.container.addChild(), color);
    this.up = new Face(this.container.addChild(), color);
    this.down = new Face(this.container.addChild(), color);

    this.back.setRotation(0, 0, 0).setPosition(0, 0, -faceSize);
    this.left.setRotation(0, 90, 0).setPosition(-faceSize, 0, 0);
    this.front.setRotation(0, 180, 0).setPosition(0, 0, faceSize);
    this.right.setRotation(0, 270, 0).setPosition(faceSize, 0, 0);
    this.up.setRotation(90, 0, 0).setPosition(0, -faceSize, 0);
    this.down.setRotation(270, 0, 0).setPosition(0, faceSize, 0);
    setInterval(() => this.randomizeColor(), 3000);
  }
  randomizeColor() {
    let color = Random.color();
    this.back.setSpecularColor(color, 30, { duration: 2000 });
    this.left.setSpecularColor(color, 30, { duration: 2000 });
    this.front.setSpecularColor(color, 30, { duration: 2000 });
    this.right.setSpecularColor(color, 30, { duration: 2000 });
    this.up.setSpecularColor(color, 30, { duration: 2000 });
    this.down.setSpecularColor(color, 30, { duration: 2000 });
  }
}

class Face {
  constructor(node, color) {
    this.face = new View(node, {useDegrees: true});
    this.face
      .moveCenter()
      .setGeometry(new Plane())
      .setBaseColor('#999')
      .setSpecularColor(color);
    return this.face;
  }
}
