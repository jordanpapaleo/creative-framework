import Camera from '../../display/Camera';
import LightModifier from '../../display/LightModifier';
import View from '../../display/View';

import Box from '../fixtures/Box';
import GlGeometry from '../fixtures/GlGeometry';
import Label from '../fixtures/Label';

const Color = FamousPlatform.utilities.Color;
const webglGeometries = FamousPlatform.webglGeometries;

const offset = 100;
const primitives = [
  'Box',
  'Sphere',
  'Circle',
  'Cylinder',
  'GeodesicSphere',
  'Icosahedron',
  'ParametricCone',
  'Plane',
  'Tetrahedron',
  'Torus',
  'Triangle'
];
const modifiers = [
  ['opacity', ['get'], 'setOpacity', 1, 0],
  ['rotation', ['getX'], 'setRotationX', 0, Math.PI / 2, [0.5, 0.5, 0.5]],
  ['rotation', ['getY'], 'setRotationY', 0, Math.PI / 2, [0.5, 0.5, 0.5]],
  ['rotation', ['getZ'], 'setRotationZ', 0, Math.PI / 2, [0.5, 0.5, 0.5]],
  ['position', ['getX'], 'setPositionX', 0, 100],
  ['position', ['getY'], 'setPositionY', 0, 50],
  ['position', ['getZ'], 'setPositionZ', 0, 100],
  ['size', ['getValue', 'absolute', 'x'], 'setAbsoluteSize', [50, 50, 50], [15, 50, 50], {sizeMode: [View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE]}],
  ['size', ['getValue', 'absolute', 'y'], 'setAbsoluteSize', [50, 50, 50], [50, 15, 50], {sizeMode: [View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE]}],
  ['size', ['getValue', 'absolute', 'z'], 'setAbsoluteSize', [50, 50, 50], [50, 50, 15], {sizeMode: [View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE]}],
  ['size', ['getValue', 'differential', 'x'], 'setDifferentialSize', [0, -35, 0], [-35, 0, 0], {sizeMode: [View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE]}],
  ['size', ['getValue', 'differential', 'y'], 'setDifferentialSize', [0, 0, 0], [0, -35, 0], {sizeMode: [View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE]}],
  ['size', ['getValue', 'differential', 'z'], 'setDifferentialSize', [0, 0, 0], [0, 0, -35], {sizeMode: [View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE]}],
  ['size', ['getValue', 'proportional', 'x'], 'setProportionalSize', [0.7, 0.7, 0.7], [0.2, 0.7, 0.7], {sizeMode: [View.RELATIVE_SIZE, View.RELATIVE_SIZE, View.RELATIVE_SIZE]}],
  ['size', ['getValue', 'proportional', 'y'], 'setProportionalSize', [0.7, 0.7, 0.7], [0.7, 0.2, 0.7], {sizeMode: [View.RELATIVE_SIZE, View.RELATIVE_SIZE, View.RELATIVE_SIZE]}],
  ['size', ['getValue', 'proportional', 'z'], 'setProportionalSize', [0.7, 0.7, 0.7], [0.7, 0.7, 0.2], {sizeMode: [View.RELATIVE_SIZE, View.RELATIVE_SIZE, View.RELATIVE_SIZE]}],
  ['scale', ['getX'], 'setScaleX', 0.1, 1],
  ['scale', ['getY'], 'setScaleY', 0.1, 1],
  ['scale', ['getZ'], 'setScaleZ', 0.1, 1]
];


export class ModifierTest {
  constructor(node) {

    // Add a camera to get some perspective
    this.camera = new Camera(node);

    let scale = 0.5;
    this.rootNode = this.camera.addChild();
    this.rootNode.setOrigin(0, 0, 0);
    this.rootNode.setScale(scale, scale, scale);
    this.rootNode.setPosition(50, 0, 0);

    // Add a light to give some dimension to geometries
    this.light = new LightModifier(node, { type: 'point', color: new Color('#aaaaaa') });
    this.light.setPosition(500, -500, 5000);

    this.createDomSubjects(this.rootNode);

    primitives.forEach((primitive, i) => {
      let offsetX = (i + 1) * 250;
      this.createGlSubjects(this.rootNode, primitive, offsetX);
    });
  }

  createDomSubjects(node) {
    this.domSubjectsNode = new View(node.addChild());
    this.domSubjectsNode.setPosition(0, 20, 0);
    this.domSubjectsNodeLabel = new Label(this.domSubjectsNode.addChild(), {content: '<h1>DOM</h1>'});
    this.domSubjects = [];
    modifiers.forEach((val, i) => {
      this.domSubjects.push(new TestDomSubject(this.domSubjectsNode, {
        position: [0, (offset * i) + 50, 0],
        modifier: val[0],
        getFn: val[1],
        setFn: val[2],
        valueIn: val[3],
        valueOut: val[4],
        origin: val[5] && val[5].origin,
        sizeMode: val[5] && val[5].sizeMode
      }));
    });
  }

  createGlSubjects(node, type, offsetX) {
    this[`glSubjects${type}Node`] = node.addChild();
    this[`glSubjects${type}Node`].setPosition(offsetX, 20, 0);
    this[`glSubjects${type}Label`] = new Label(this[`glSubjects${type}Node`].addChild(), {content: `<h1>GL ${type}</h1>`});
    this[`glSubjects${type}`] = [];
    let geometry = new webglGeometries[type]();
    let color = new Color('#ff0099');
    modifiers.forEach((val, i) => {
      this[`glSubjects${type}`].push(new TestGlSubject(this[`glSubjects${type}Node`], {
        position: [0, (offset * i) + 50, 0],
        modifier: val[0],
        getFn: val[1],
        setFn: val[2],
        valueIn: val[3],
        valueOut: val[4],
        origin: val[5] && val[5].origin,
        sizeMode: val[5] && val[5].sizeMode,
        color: color,
        geometry: geometry
      }));
    });
  }
}

class TestDomSubject {
  constructor(node, options = {}) {
    this.node = new View(node.addChild());
    this.node
      .setSizeModeAbsolute()
      .setAbsoluteSize(200, 100, 0)
      .setPosition(...options.position)
      .createDOMElement();

    this.label = new Label(this.node.addChild(), {content: `<h2>${options.modifier}</h2>`});
    this.label.setPosition(0, 0, 0);

    this.boxContainer = new View(this.node.addChild());
    this.boxContainer.setPosition(0, 30, 0);

    this.modifier = options.modifier;
    this.modifierValueIn = Array.isArray(options.valueIn) ? options.valueIn : [options.valueIn];
    this.modifierValueOut = Array.isArray(options.valueOut) ? options.valueOut : [options.valueOut];
    this.modifierSetFn = options.setFn;
    this.modifierGetFn = options.getFn;
    this.state = '';

    this.createContent(options);

    this.box[this.modifierSetFn](...this.modifierValueIn);

    this.modifierOut();
    this.onUpdate();
  }

  createContent(options) {
    this.box = new Box(this.boxContainer.addChild());
    this.box
      .setOrigin(...(options.origin || [0.5, 0.5, 0.5]))
      .setSizeMode(...(options.sizeMode || [1, 1, 1]));
  }

  modifierIn() {
    this.state = `${this.modifierSetFn}(${(Math.floor(this.modifierValueIn * 10) / 10)})`;
    this.box[this.modifierSetFn](...this.modifierValueIn, {duration: 3000}, () => {
      this.modifierOut();
    });
    this.onUpdate();
  }

  modifierOut() {
    this.state = `${this.modifierSetFn}(${(Math.floor(this.modifierValueOut * 10) / 10)})`;
    this.box[this.modifierSetFn](...this.modifierValueOut, {duration: 3000}, () => {
      this.modifierIn();
    });
    this.onUpdate();
  }

  onUpdate() {
    // let result = this.box[this.modifier][this.modifierGetFn[0]]();
    // for (let i = 1; i < this.modifierGetFn.length; i++) {
    //   result = result[this.modifierGetFn[i]];
    // }
    this.label.setDOMContent(`${this.state}`);
  }
}

class TestGlSubject extends TestDomSubject {
  createContent(options) {
    this.box = new GlGeometry(this.boxContainer.addChild(), {
      color: options.color,
      geometry: options.geometry
    });
    this.box
      .setOrigin(...(options.origin || [0.5, 0.5, 0.5]))
      .setSizeMode(...(options.sizeMode || [1, 1, 1]));
  }
}
