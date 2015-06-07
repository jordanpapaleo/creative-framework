import Camera from '../../display/Camera';
import LightModifier from '../../display/LightModifier';
import Random from '../../util/Random';
import View from '../../display/View';
import Wheel from '../../events/Wheel';

const Color = FamousPlatform.utilities.Color;
const Geometry = FamousPlatform.webglGeometries.Geometry;
const OBJLoader = FamousPlatform.webglGeometries.OBJLoader;
const Vec3 = FamousPlatform.math.Vec3;

const speed = Math.PI / 500;
const revolution = Math.PI * 2;

export class VWTest extends View {
  constructor(node, options) {
    super(node, options);

    window.test = this;

    let camera = new Camera(node, { depth: 5000 });

    this.angleX = 0;
    this.angleY = 0;

    this.setOrigin(0.5, 0.5, 0.5);
    this.setAlign(0.5, 0.5, 0.5);
    this.setMountPoint(0.5, 0.5, 0.5);

    this.container = new View(this.addChild());
    this.container
      .setOrigin(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setAlign(0.5, 0.5, 0.5);

    this.wheelX = Wheel.rotateX();
    this.wheelY = Wheel.rotateY();
    this.wheelX((val) => {
      this.container.setRotationY(val);
    });
    this.wheelY((val) => {
      this.container.setRotationX(val);
    });

    this.createOBJ();
    this.createLight();
  }

  createOBJ() {
    var obj = new View(this.container.addChild());
    var geo;

    OBJLoader.load('./assets/body.obj', function (buffers) {
      geo = new Geometry({
        buffers: [
          { name: 'a_pos', data: buffers.vertices, size: 3 },
          { name: 'a_normals', data: buffers.normals, size: 3 },
          { name: 'a_texCoord', data: buffers.textureCoords, size: 2 },
          { name: 'indices', data: buffers.indices, size: 1 }
        ]
      });
      obj.setGeometry(geo);
      obj.setColor({
        color: '#ffffff',
        specular: '#cccccc',
        strength: 30
      });
    });

    obj.setSizeModeAbsolute();
    obj.setAbsoluteSize(500, 500, 500);

    obj.setOrigin(0.5, 0.5, 0.5);
    obj.setAlign(0.5, 0.5, 0.5);
    obj.setMountPoint(0.5, 0.5, 0.5);

  }

  createLight() {
    this.light = new SceneLight(this.container.addChild());
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
