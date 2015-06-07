import Camera from '../../display/Camera';
import View from '../../display/View';
import Wheel from '../../events/Wheel';

const Color = FamousPlatform.utilities.Color;
const DynamicGeometry = FamousPlatform.webglGeometries.DynamicGeometry;
const Famous = FamousPlatform.core.Famous;
const OBJLoader = FamousPlatform.webglGeometries.OBJLoader;
const PointLight = FamousPlatform.webglRenderables.PointLight;

const speed = Math.PI / 500;
const revolution = Math.PI * 2;

export class WatchAd extends View {
  constructor(node, options) {
    super(node, options);

    this.setOrigin(0.5, 0.5, 0.5);
    this.setAlign(0.5, 0.5, 0.5);
    this.setMountPoint(0.5, 0.5, 0.5);

    this.watch = new View(this.addChild());
    this.watch
      .setOrigin(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setAlign(0.5, 0.5, 0.5)

    this._createOBJ();
    this._createFace();
  }

  _createOBJ() {
    var SPORT = [
      { name: 'beltBot', url: './assets/watch-sport/beltBot.obj', color: '#6FC5FC' },
      { name: 'beltTop', url: './assets/watch-sport/beltTop.obj', color: '#444444' },
      { name: 'body', url: './assets/watch-sport/body.obj', color: '#999999' },
      { name: 'button', url: './assets/watch-sport/button.obj', color: '#444444' },
      { name: 'glass', url: './assets/watch-sport/glass.obj', color: '#F2F2F2' },
      { name: 'glassSensor', url: './assets/watch-sport/glassSensor.obj', color: '#6FC5FC' },
      { name: 'lock', url: './assets/watch-sport/lock.obj', color: '#111111' },
      { name: 'sensor', url: './assets/watch-sport/sensor.obj', color: '#444444' },
      { name: 'wheel', url: './assets/watch-sport/wheel.obj', color: '#444444' }
    ]

    for(var i=0; i<SPORT.length; i++) {
      let data = SPORT[i];



      let obj = new View(this.watch.addChild());  
      let geo = new DynamicGeometry();

      this.watch[data.name] = obj;

      OBJLoader.load(data.url, function (buffers) {
        geo.setVertexPositions(buffers.vertices);
        geo.setNormals(buffers.normals);
        geo.setTextureCoords(buffers.textureCoords);
        geo.setIndices(buffers.indices);
        obj.setGeometry(geo);
        
        obj.setSizeModeAbsolute();
        obj.setAbsoluteSize(400, 400, 400);
        obj.setOrigin(0.5, 0.5, 0.5);
        obj.setAlign(0.5, 0.5, 0.5);
        obj.setMountPoint(0.5, 0.5, 0.5);

        obj.setBaseColor(new Color(data.color));
      });
    }
  }

  _createFace() {
    var test = new EclipseFace(this.watch.addChild());
    this.watch.face = test;
    
    test
      .setSizeModeAbsolute()
      .setAbsoluteSize(319/2.1, 390/2.1)
      .setAlign(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setOrigin(0.5, 0.5, 0.5)
      .setPosition(0, 0, 200);
    // var div = new View(this.watch.addChild());
    // div.createDOMElement({
    //   properties: {
    //     backgroundColor: '#33CCFF'
    //   },
    //   content: 'fancy watch face lalalal'
    // });
    // div.setSizeModeAbsolute();
    // div.setAbsoluteSize(200, 200);
    // div.setPosition(0, 0, 220);

    // div.setOrigin(0.5, 0.5, 0.5);
    // div.setAlign(0.5, 0.5, 0.5);
    // div.setMountPoint(0.5, 0.5, 0.5);
  }

  _createLight() {
    var lightContainer = new View(this.addChild());
    lightContainer.angle = 0;
    lightContainer
      .setSizeModeAbsolute()
      .setAlign(0.5, 0.5, 0.5)
      .setOrigin(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setAbsoluteSize(500, 500, 500)
      .setPosition(0, 0, 0);
    lightContainer.onUpdate = () => {
      lightContainer.angle += speed * 3;
      if (lightContainer.angle >= revolution || lightContainer.angle <= -revolution) lightContainer.angle = 0;
      lightContainer.setRotationY(lightContainer.angle);
      Famous.requestUpdateOnNextTick(lightContainer);
    };

    var lightNode = new View(lightContainer.addChild());
    lightNode.light = new PointLight(this.addChild());
    lightNode
      .setSizeModeAbsolute()
      .setAlign(0.5, 0.5, 0.5)
      .setOrigin(0, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setAbsoluteSize(80, 80, 80)
      .setPosition(500, 0, 0);
    lightNode.light.setColor(new Color('#66EEFF'));
    lightNode.setGeometry(new FamousPlatform.webglGeometries.GeodesicSphere());
    lightNode.setBaseColor(new Color('#ffffff'));
    Famous.requestUpdateOnNextTick(lightContainer);
  }
}


import Timeline from '../../animation/Timeline';

const Curves = FamousPlatform.transitions.Curves;

const TREE = {
  'sun' : { 
    properties : { backgroundColor : 'white', boxShadow : '0px 0px 5px 1px white', borderRadius : '50%' },
    size : [70, 70], mountPoint : [0.5, 0.5], origin : [0.5, 0.5], align : [0.5, 0.5], opacity : 0.8,
    children : {
      'moon' : {
        tagName : 'img', attributes : { src : './faces/eclipse/moon.png' },
        size : [70, 70], mountPoint : [0.5, 0.5], origin : [0.5, 0.5], align : [0.5, 0.5], opacity : 0.3
      }
    }
  },
  'cover' : { 
    properties : { backgroundColor : 'black', boxShadow : '0px 0px 5px 1px rgba(0, 0, 0, 0.9)', borderRadius : '70%' },
    size : [68, 68], mountPoint : [0.5, 0.5], origin : [0.5, 0.5], align : [0.5, 0.5]
  },
  'hour' : {
    classes : ['solar-time'], content : '1:',
    size : [30, 30], scale : [1, 1], mountPoint : [1, 0], origin : [0.5, 0.5], align : [1, 0],
    position : [-50, 10]
  },
  'minutes' : {
    classes : ['solar-time'], content : '11',
    size : [30, 30], scale : [1, 1], mountPoint : [1, 0], origin : [0.5, 0.5], align : [1, 0],
    position : [-20, 10]
  }
}

class EclipseFace extends View {
  constructor(node, options) {
    super(node, options);

    generate(this, TREE);
    this._createBackground();
    this._createTimeline();

    this.timeline.set(20000, { duration : 20000 });
  }

  _createTimeline() {
    this.timeline = new Timeline();
    this.timeline.registerPath({
      handler : function(pos) {
        this.cover.setPosition(...pos);
      }.bind(this),
      path : [
        [0, [-90, -30, 0]],
        [20000, [90, 30, 0]]
      ]
    })
  }

  _createBackground() {
    this.createDOMElement({
      properties : {
        overflow : 'hidden',
        backgroundColor : 'black',
        borderRadius : '30px'
      }
    });
  }
}


function generate (rootView, tree) {
  if(!rootView || !tree) return;

  var viewData;
  for(var key in tree) {
    viewData = tree[key];
    rootView[key] = new View(rootView.addChild());
    
    rootView[key].createDOMElement({
      content : viewData.content,
      tagName : viewData.tagName,
      properties : viewData.properties,
      attributes : viewData.attributes,
      classes : viewData.classes
    });

    rootView[key]
      .setSizeModeAbsolute()
      .setAbsoluteSize(...viewData.size || [])
      .setAlign(...viewData.align || [])
      .setMountPoint(...viewData.mountPoint || [])
      .setOrigin(...viewData.origin || [])
      .setScale(...viewData.scale || [])
      .setPosition(...viewData.position || [])
      .setRotation(...viewData.rotation || [])
      .setOpacity(viewData.opacity || 1)

    generate(rootView[key], viewData.children);
  }
}