import famousLogoCoords from '../fixtures/famousLogoCoords';
import Wheel from '../../components/rotation/Wheel';

const Camera = FamousPlatform.components.Camera;
const Circle = FamousPlatform.webglGeometries.Circle;
const Color = FamousPlatform.utilities.Color;
const GeodesicSphere = FamousPlatform.webglGeometries.GeodesicSphere;
const Mesh = FamousPlatform.webglRenderables.Mesh;
const Plane = FamousPlatform.webglGeometries.Plane;
const PointLight = FamousPlatform.webglRenderables.PointLight;
const Triangle = FamousPlatform.webglGeometries.Triangle;
const Vec3 = FamousPlatform.math.Vec3;

const geometries = [
  new Circle(),
  new Plane(),
  new Triangle()
];

function center(node) {
  node.setAlign(0.5, 0.5, 0.5).setMountPoint(0.5, 0.5, 0.5).setOrigin(0.5, 0.5, 0.5);
}

export class IllustratorExportTest {
  constructor(node) {
    this.cameraNode = node.addChild();
    this.camera = new Camera(this.cameraNode.addChild());
    this.node = this.cameraNode.addChild();
    center(this.node);
    this.camera.setDepth(2000);

    this.items = [];
    this.light = new LightNode(this.node.addChild());

    this.logo = this.node.addChild();
    this.logo.setScale(0.5, 0.5, 0.5);
    this.logo.setPosition(0, 0, -100);
    center(this.logo);

    this.wheel = new Wheel(this.node);
    famousLogoCoords.forEach((val, i) => {
      this.items.push(new GeometryNode(this.logo.addChild(), [val.x, val.y, i]));
    });
  }
}

class GeometryNode {
  constructor(node, position) {
    let size = Math.round((Math.random() * 50) + 98);
    let index = Math.round(Math.random() * 2);
    this.node = node;
    this.geometry = geometries[index];
    this.baseColor = new Color('#31FFFF');
    this.mesh = new Mesh(this.node);
    this.mesh.setGeometry(this.geometry);
    this.mesh.setBaseColor(this.baseColor);
    this.mesh.setGlossiness(this.baseColor, 40);
    this.node.setSizeMode('absolute', 'absolute', 'absolute');
    this.node.setAbsoluteSize(size, size, size);
    this.node.setPosition(...position);
  }
}

class LightNode {
  constructor(node) {
    this.node = node;
    this.id = this.node.addComponent(this);
    this.color = new Color(Random.color());

    center(this.node);
    this.node.setSizeMode('absolute', 'absolute', 'absolute').setAbsoluteSize(40, 40, 40);
    this.node.setPosition(-200, -200, 200);

    this.geometry = new GeodesicSphere();
    this.mesh = new Mesh(this.node);
    this.mesh.setGeometry(this.geometry);
    this.mesh.setBaseColor('#ffffff');

    this.pointLight = new PointLight(this.node);
    this.pointLight.setColor(this.color);
    this.initMovement();
    this.node.requestUpdate(this.id);
    setInterval(() => this.randomizeColor(), 3000);
  }
  randomizeColor() {
    this.color.set(Random.color(), { duration: 2000 });
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
    this.node.setRotation(Date.now() * 0.001);
    this.node.setPosition(newPosition.x, newPosition.y, newPosition.z);
    this.node.requestUpdateOnNextTick(this.id);
  }
}

class Random {
  static setDistribution(fn) {
    Random.distribution = fn;
  }
  static random() {
    if (!Random.distribution) Random.distribution = function () { return 1; };

    var key = Math.random();
    var value = Math.random();
    var limit = Random.distribution(key);
    if (value < limit) return key;
    else return this.random();
  }
  static range(min, max) {
    return Math.random() * (max - min) + min;
  }
  static color() {
    return [Random.random() * 255, Random.random() * 255, Random.random() * 255];
  }
}
