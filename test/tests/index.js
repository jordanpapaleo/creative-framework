import FamousEngine from '../../scaffolding/FamousEngine';

// Test entry point
// import {BackgroundColorTest as Test} from './BackgroundColorTest';
// import {DOMAlignmentTest as Test} from './DOMAlignmentTest';
// import {DOMElementsTest as Test} from './DOMElementsTest';
// import {FamousEngineTest as Test} from './FamousEngineTest';
// import {GeodesicSphereTest as Test} from './GeodesicSphereTest';
// import {GLColorTest as Test} from './GLColorTest';
import {IllustratorExportTest as Test} from './IllustratorExportTest';
// import {LightTest as Test} from './LightTest';
// import {ManyChildrenTest as Test} from './ManyChildrenTest';
// import {ModifierTest as Test} from './ModifierTest';
// import {MouseEventTest as Test} from './MouseEventTest';
// import {NestedDOMAnimationTest as Test} from './NestedDOMAnimationTest';
// import {NodeShowHideTest as Test} from './NodeShowHideTest';
// import {PositionZTest as Test} from './PositionZTest';
// import {RotationTest as Test} from './RotationTest';
// import {RotationWheelTest as Test} from './RotationWheelTest';
// import {SetVertexPositionsTest as Test} from './SetVertexPositionsTest';
// import {TimelineTest as Test} from './TimelineTest';
// import {ViewTest as Test} from './ViewTest';
// import {VWTest as Test} from './VWTest';

// Load styles
require('./styles.css');

// Boilerplate
FamousEngine.createScene('#app');
window.test = new Test(FamousEngine.addChild());
