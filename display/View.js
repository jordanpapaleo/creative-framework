/**
 * View class that extends Modifier and should be used for visual elements.
 */

import EventEmitter from '../events/EventEmitter';
import Modifier from './Modifier';

const Color = FamousPlatform.utilities.Color;
const Transitionable = FamousPlatform.transitions.Transitionable;
const DOMElement = FamousPlatform.domRenderables.DOMElement;
const DynamicGeometry = FamousPlatform.webglGeometries.DynamicGeometry;
const Geometry = FamousPlatform.webglGeometries.Geometry;
const EventMap = Object.keys(FamousPlatform.domRenderers.Events.EventMap);
const Mesh = FamousPlatform.webglRenderables.Mesh;
const OBJLoader = FamousPlatform.webglGeometries.OBJLoader;

/**
 * Converts raw text from an OBJ into a DynamicGeometry.
 * @method  objToGeometry
 * @param   {String}           rawText  The raw text from an OBJ file.
 * @return  {DynamicGeometry}  The new DynamicGeometry from the OBJ.
 */
function objToGeometry(rawText, options) {
  let buffers = OBJLoader.formatText(rawText, options);
  let geometry = new Geometry({
    buffers: [
      { name: 'a_pos', data: buffers[0].vertices, size: 3 },
      { name: 'a_normals', data: buffers[0].normals, size: 3 },
      { name: 'a_texCoord', data: buffers[0].textureCoords, size: 2 },
      { name: 'indices', data: buffers[0].indices, size: 1 }
    ]
  });
  return geometry;
}

export default class View extends Modifier{
  constructor(node, options) {
    super(node, options);
  }

  // ---------------------------------------------------------------------------
  // DOM Creation and Modifiers
  validateDOM(options) {
    if (!this.el) {
      this._events = {};
      this.el = new DOMElement(this.node, options);
      this.el.onReceive = (event, payload) => {
        if (this._events[event]) {
          this._events[event](payload);
        }
      };
    }
  }
  createDOMElement(options) {
    this.validateDOM(options);
    return this;
  }
  setDOMContent(content) {
    this.validateDOM();
    this.el.setContent(content);
    return this;
  }
  setDOMClasses(classes) {
    this.validateDOM();
    for (let i = 0; i < classes.length; i++) {
      this.el.addClass(classes[i]);
    }
    return this;
  }
  setDOMAttributes(attributes) {
    this.validateDOM();
    for (let attrName in attributes) {
      this.el.setAttribute(attrName, attributes[attrName]);
    }
    return this;
  }
  setDOMProperties(properties) {
    this.validateDOM();
    for (let propertyName in properties) {
      this.el.setProperty(propertyName, properties[propertyName]);
    }
    return this;
  }

  setDOMUnselectable() {
    this.validateDOM();
    // Make this DOM unselectable. Only needs to be applied once per DOM.
    if (!this._unselectable) {
      this._unselectable = true;
      this.setDOMProperties({
        '-moz-user-select': '-moz-none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        'cursor': 'pointer'
      });
    }
  }

  setCutoutState(useCutout) {
    this.validateDOM()
    this.el.setCutoutState(useCutout);
  }

  // ---------------------------------------------------------------------------
  // DOM Events
  on(evName, fn) {
    if (EventMap.indexOf(evName) > -1) {
      // DOM Event
      this.validateDOM();
      this.node.addUIEvent(evName);
      this._events[evName] = fn;
    } else {
      EventEmitter.on(evName, fn);
    }
    return this;
  }
  off(evName, fn) {
    if (EventMap.indexOf(evName) > -1) {
      // TODO: Not implemented for DOM yet
    } else {
      EventEmitter.off(evName, fn);
    }
  }

  // Global Events
  trigger(evName, payload) {
    EventEmitter.trigger(evName, payload);
    return this;
  }
  emit(evName, payload) {
    console.warn('View.emit() is deprecated. Use View.trigger() instead.');
    return this.trigger(evName, payload);
    // if (!this.eventEmitter) this.eventEmitter = new EventEmitter(this.node);
    // this.eventEmitter.emit(ev, payload);
  }

  // ---------------------------------------------------------------------------
  // WebGL Mesh Creation and Modifiers
  validateMesh() {
    if (!this.mesh) this.mesh = new Mesh(this.node);
  }
  // Mesh Getters
  getMeshBaseColor() {
    this.validateMesh();
    return this.mesh.getBaseColor();
  }
  getMeshDrawOptions() {
    this.validateMesh();
    return this.mesh.getDrawOptions();
  }
  getMeshFlatShading() {
    this.validateMesh();
    return this.mesh.getFlatShading();
  }
  getMeshGeometry() {
    this.validateMesh();
    return this.mesh.getGeometry();
  }
  getMeshGlossiness() {
    this.validateMesh();
    return this.mesh.getGlossiness();
  }
  getMeshMaterialExpressions() {
    this.validateMesh();
    return this.mesh.getMaterialExpressions();
  }
  getMeshNormals(materialExpression) {
    this.validateMesh();
    return this.mesh.getNormals(materialExpression);
  }
  getMeshPositionOffset(materialExpression) {
    this.validateMesh();
    return this.mesh.getPositionOffset(materialExpression);
  }
  getMeshValue() {
    this.validateMesh();
    return this.mesh.getValue();
  }

  setBaseColor(color, transition, callback) {
    this.validateMesh();
    if(!this.baseColor) {
      this.baseColor = (Color.isColorInstance(color)) ? color : new Color(color);
      this.mesh.setBaseColor(this.baseColor);
    }
    this.baseColor.set(color, transition, callback);
    return this;
  }

  setSpecularColor(color, strength, transition, callback) {
    this.validateMesh();
    if(!this.specularColor) {
      this.specularColor = (Color.isColorInstance(color)) ? color : new Color(color);
      this.mesh.setGlossiness(this.specularColor, strength);
    }
    this.specularColor.set(color, transition, callback);
    return this;
  }

  setMeshDrawOptions(options) {
    this.validateMesh();
    this.mesh.setDrawOptions(options);
    return this;
  }
  setMeshFlatShading(bool) {
    this.validateMesh();
    this.mesh.setFlatShading(bool);
    return this;
  }
  setMeshOptions(options) {
    this.validateMesh();
    this.mesh.setOptions(options);
    return this;
  }
  setMeshPositionOffset(materialExpression) {
    this.validateMesh();
    this.mesh.setPositionOffset(materialExpression);
    return this;
  }
  setGeometry(geometry, options) {
    this.validateMesh();
    this.geometry = geometry;
    this.mesh.setGeometry(geometry, options);
    return this;
  }

  // ---------------------------------------------------------------------------
  // WebGL Geometry
  // Geometry Getters
  getGeometryLength() { return this.geometry.getLength(); }
  getNormals() { return this.geometry.getNormals(); }
  getTextureCoords() { return this.geometry.getTextureCoords(); }
  getVertexBuffer(bufferName) { return this.geometry.getVertexBuffer(bufferName); }
  getVertexPositions() { return this.geometry.getVertexPositions(); }
  // Geometry Setters
  fromGeometry(geometry) {
    this.geometry.fromGeometry(geometry);
    this.setGeometry(this.geometry);
    return this;
  }
  setDrawType(value) {
    this.geometry.setDrawType(value);
    this.setGeometry(this.geometry);
    return this;
  }
  setIndices(indices) {
    this.geometry.setIndices(indices);
    this.setGeometry(this.geometry);
    return this;
  }
  setNormals(normals) {
    this.geometry.setNormals(normals);
    this.setGeometry(this.geometry);
    return this;
  }
  setTextureCoords(textureCoords) {
    this.geometry.setTextureCoords(textureCoords);
    this.setGeometry(this.geometry);
    return this;
  }
  setVertexBuffer(bufferName, value, size) {
    this.geometry.setVertexBuffer(bufferName, value, size);
    this.setGeometry(this.geometry);
    return this;
  }
  setVertexPositions(vertices) {
    this.geometry.setVertexPositions(vertices);
    this.setGeometry(this.geometry);
    return this;
  }

  // ---------------------------------------------------------------------------
  // WebGL Convenience Methods
  validateObjs() {
    if (!this.objs) this.objs = {};
  }

  setDynamicGeometry(geometry, options) {
    // Intended implementation - removes geometryParent
    this.setGeometry(new DynamicGeometry(), options);
    this.fromGeometry(geometry);
    this.setGeometry(this.geometry);
    return this;
  }

  /**
   * Create a new Geometry from the rawText of an OBJ.
   * @method  setObjGeometry
   * @param   {String}        objName             The name to apply
   * @param   {String}        rawText             The raw text from an OBJ file.
   * @param   {Array}         options.align       Set the Align of the Geometry.
   * @param   {Array}         options.mountpoint  Set the MountPoint of the Geometry.
   * @param   {Array}         options.origin      Set the Origin of the Geometry.
   */
  addObj(objName, rawText, options) {
    this.validateObjs();
    this.objs[objName] = new View(this.addChild());
    this.objs[objName].setGeometry(objToGeometry(rawText, options))
    return this;
  }
  hideObj(objName) {
    this.validateObjs();
    this.objs[objName].setOpacity(0);
    return this;
  }
  hideObjs() {
    this.validateObjs();
    Object.keys(this.objs).forEach((objName) => {
      this.objs[objName].setOpacity(0);
    });
    return this;
  }
  showObj(objName) {
    this.validateObjs();
    this.objs[objName].setOpacity(1);
    return this;
  }
  showObjs() {
    this.validateObjs();
    Object.keys(this.objs).forEach((objName) => {
      this.objs[objName].setOpacity(1);
    });
    return this;
  }
  setObjsOpacity(value, options, callback) {
    this.validateObjs();
    Object.keys(this.objs).forEach((objName, index) => {
      if (index === 0) this.objs[objName].setOpacity(value, options, callback);
      else this.objs[objName].setOpacity(value, options);
    });
    return this;
  }
}
