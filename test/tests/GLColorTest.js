import AssetManager from '../../util/AssetManager';
import Camera from '../../display/Camera';
import View from '../../display/View';
import Wheel from '../../events/Wheel';

const Color = FamousPlatform.utilities.Color;
const DynamicGeometry = FamousPlatform.webglGeometries.DynamicGeometry;
const Geometry = FamousPlatform.webglGeometries.Geometry;
const OBJLoader = FamousPlatform.webglGeometries.OBJLoader;
const PointLight = FamousPlatform.webglRenderables.PointLight;

const speed = Math.PI / 500;
const revolution = Math.PI * 2;

const objs = ['./assets/body.obj'];

export class GLColorTest extends View {
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

    AssetManager.registerDataAssets('obj', objs);
    this.assetManager = AssetManager.get('obj');
    this.assetManager.onload = () => {
      this.createOBJ();
      this.createLight();
      this.createFace();
    };
    this.assetManager.load();
  }

  createOBJ() {
    let cache = AssetManager.get('obj').cache;
    let model = new View(this.container.addChild());
    model
      .moveCenter()
      .setSizeModeAbsolute()
      .setAbsoluteSize(500, 500, 500)
      .addObj('body', cache[objs[0]])
      .setBaseColor('#ffffff')
      .setSpecularColor('#cccccc', 30);
  }

  createFace() {
    let div = new View(this.container.addChild());
    div.createDOMElement({
      properties: {
        backgroundColor: '#33CCFF'
      },
      content: 'fancy watch face lalalal'
    });
    div.setSizeModeAbsolute();
    div.setAbsoluteSize(200, 200);
    div.setPosition(0, 0, 220);

    div.setOrigin(0.5, 0.5, 0.5);
    div.setAlign(0.5, 0.5, 0.5);
    div.setMountPoint(0.5, 0.5, 0.5);
  }

  createLight() {
    let lightContainer = new View(this.addChild());
    lightContainer.angle = 0;
    lightContainer
      .setSizeModeAbsolute()
      .setAlign(0.5, 0.5, 0.5)
      .setOrigin(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setAbsoluteSize(500, 500, 500)
      .setPosition(0, 0, 0);
    let id = lightContainer.node.addComponent({
      onUpdate: () => {
        lightContainer.angle += speed * 3;
        if (lightContainer.angle >= revolution || lightContainer.angle <= -revolution) lightContainer.angle = 0;
        lightContainer.setRotationY(lightContainer.angle);
        lightContainer.node.requestUpdateOnNextTick(id);
      }
    });
    lightContainer.node.requestUpdate(id);

    let lightNode = new View(lightContainer.addChild());
    let light = new PointLight(this.addChild());
    lightNode
      .setSizeModeAbsolute()
      .setAlign(0.5, 0.5, 0.5)
      .setOrigin(0, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setAbsoluteSize(80, 80, 80)
      .setPosition(500, 0, 0);
    light.setColor(new Color('#66EEFF'));
    lightNode.setGeometry(new FamousPlatform.webglGeometries.GeodesicSphere());
    lightNode.setBaseColor(new Color('#ffffff'));
  }
}
