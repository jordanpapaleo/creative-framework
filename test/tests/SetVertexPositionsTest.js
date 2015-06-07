import View from '../../display/View';
import Modifier from '../../display/Modifier';

const FamousEngine = FamousPlatform.core.FamousEngine;
const Plane = FamousPlatform.webglGeometries.Plane;

export class SetVertexPositionsTest {
  constructor(node) {
    this.rootNode = new Modifier(node.addChild());
    this.rootNode.setPosition(200, 200);
    this.rootNode.setAlign(0.5, 0.5, 0.5);
    this.rootNode.setOrigin(0.5, 0.5, 0.5);
    this.rootNode.setMountPoint(0.5, 0.5, 0.5);

    this.gl = new View(this.rootNode.addChild());
    this.gl.setDynamicGeometry(new Plane({ detailX: 1, detailY: 1 }));
    this.gl.vtxPositions = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

    this.gl.setSizeModeAbsolute();
    this.gl.setAbsoluteSize(500, 500);

    FamousEngine.requestUpdateOnNextTick(this);

  }

  onUpdate(time) {
    let c = (Math.cos(time * 0.001) * 0.5) + 0.5;
    let s = (Math.sin(time * 0.001) * 0.5) + 0.5;
    this.gl.vtxPositions[0] = c * -1;
    this.gl.vtxPositions[3] = c;
    this.gl.vtxPositions[6] = s * -1;
    this.gl.vtxPositions[9] = s;
    this.gl.setVertexPositions(this.gl.vtxPositions);
    FamousEngine.requestUpdateOnNextTick(this);
  }
}

