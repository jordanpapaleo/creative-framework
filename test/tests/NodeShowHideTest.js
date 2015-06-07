import LightModifier from '../../display/LightModifier';
import View from '../../display/View';

const Color = FamousPlatform.utilities.Color;
const FamousEngine = FamousPlatform.core.FamousEngine;
const Geometry = FamousPlatform.webglGeometries.GeodesicSphere;

const speed = Math.PI / 100;
const revolution = Math.PI * 2;

export class NodeShowHideTest {
  constructor(node) {
    this.angle = 0;
    this.toggleShowHide = true;
    this.toggleMount = true;
    this.toggleOpacity = true;
    this.createParent(node);
    this.createButtons(this.parent);
    this.createDOMNode(this.parent);
    this.createDOMGLNode(this.parent);
    this.createLight(node);
    this.attachEvents();
    window.app = this;
    FamousEngine.requestUpdateOnNextTick(this);
  }

  createParent(node) {
    this.parent = new View(node.addChild());
    this.parent
      .moveCenter()
      .setSizeModeAbsolute()
      .setAbsoluteSize(600, 300, 0)
      .createDOMElement({
        properties: {
          background: '#333333',
          color: '#eeeeee',
          fontFamily: 'Arial',
          fontSize: '14px'
        }
      });
    this.updateStateInfo();
  }

  createButtons(node) {
    let props = {
      background: '#666666',
      color: '#eeeeee',
      fontFamily: 'Arial',
      fontSize: '14px',
      textAlign: 'center'
    };
    this.btnShowHide = new View(node.addChild());
    this.btnShowHide
      .moveTopLeft()
      .setPositionY(50)
      .setSizeModeAbsolute()
      .setAbsoluteSize(180, 40, 0)
      .createDOMElement({
        properties: props,
        content: 'Click to toggle<br/>Node.show() / Node.hide()'
      });
    this.btnMount = new View(node.addChild());
    this.btnMount
      .moveTopCenter()
      .setPositionY(50)
      .setSizeModeAbsolute()
      .setAbsoluteSize(180, 40, 0)
      .createDOMElement({
        properties: props,
        content: 'Click to toggle<br/>addChild / removeChild'
      });
    this.btnOpacity = new View(node.addChild());
    this.btnOpacity
      .moveTopRight()
      .setPositionY(50)
      .setSizeModeAbsolute()
      .setAbsoluteSize(180, 40, 0)
      .createDOMElement({
        properties: props,
        content: 'Click to toggle<br/>opacity(1) / opacity(0)'
      });
  }

  createDOMNode(node) {
    // Add DOM Node
    this.dom = new View(node.addChild());
    this.dom
      .setSizeModeAbsolute()
      .setAbsoluteSize(100, 100, 100)
      .moveBottomLeft()
      .createDOMElement({
        properties: {
          background: '#00ff00',
          color: '#333333'
        },
        content: 'I am DOM'
      });
  }

  createDOMGLNode(node) {
    // Add DOM/GL Node
    this.gl = new View(node.addChild());
    this.gl
      .setSizeModeAbsolute()
      .moveBottomRight()
      .setAbsoluteSize(100, 100, 100)
      .setGeometry(new Geometry())
      .setBaseColor(new Color('#ff0099'))
      .createDOMElement({
        properties: {
          background: '#00ff00',
          color: '#333333'
        },
        content: 'I am DOM<br/>and GL'
      });
  }

  createLight(node) {
    // Add a Light
    this.pointLight = new LightModifier(node.addChild(), {
      type: 'point',
      color: new Color('#fff'),
      position: [500, -500, 5000]
    });
  }

  attachEvents() {
    this.btnShowHide.on('click', () => {
      if (this.toggleShowHide) {
        this.dom.hide();
        this.gl.hide();
      } else {
        this.dom.show();
        this.gl.show();
      }
      this.toggleShowHide = !this.toggleShowHide;
      this.updateStateInfo();
    });
    this.btnMount.on('click', () => {
      if (this.toggleMount) {
        this.dom.detach();
        this.gl.detach();
      } else {
        this.dom.attachTo(this.parent);
        this.gl.attachTo(this.parent);
      }
      this.toggleMount = !this.toggleMount;
      this.updateStateInfo();
    });
    this.btnOpacity.on('click', () => {
      if (this.toggleOpacity) {
        this.dom.setOpacity(0);
        this.gl.setOpacity(0);
      } else {
        this.dom.setOpacity(1);
        this.gl.setOpacity(1);
      }
      this.toggleOpacity = !this.toggleOpacity;
      this.updateStateInfo();
    });
  }

  updateStateInfo() {
    let showHideState = this.toggleShowHide ? 'SHOW' : 'HIDE';
    let mountState = this.toggleMount ? 'ADD CHILD' : 'REMOVE CHILD';
    let opacityState = this.toggleOpacity ? 'OPACITY 1' : 'OPACITY 0';
    this.parent.setDOMContent(`${showHideState} | ${mountState} | ${opacityState}`);
  }

  onUpdate() {
    this.angle += speed;
    if (this.angle >= revolution || this.angle <= -revolution) this.angle = 0;
    if (this.toggleMount) this.gl.setRotationY(this.angle);
    FamousEngine.requestUpdateOnNextTick(this);
  }
}
