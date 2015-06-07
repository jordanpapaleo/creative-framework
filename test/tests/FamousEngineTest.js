import FamousEngine from '../../scaffolding/FamousEngine';
import Camera from '../../display/Camera';
import View from '../../display/View';

export class FamousEngineTest {
  constructor() {
    require('../../public/assets/famousEngineTest.css');
    this.setup(() => {
      this.initApp2();
      this.initApp1();
    });
  }

  setup(done) {
    document.body.classList.add('famousEngineTest');
    document.body.innerHTML += '<div id="app2"></div>';
    setTimeout(() => done(), 500);
  }

  initApp1() {
    let rootNode = FamousEngine.getRootNode('#app');
    let camera = new Camera(rootNode, {depth: 400});
    let app = new View(camera.addChild());
    app
      .setRotationY(0.4)
      .createDOMElement({
        properties: {
          background: 'yellow'
        },
        content: '<h1>Hello World, App 1!</h1>'
      });
  }

  initApp2() {
    FamousEngine.createScene('#app2');
    let rootNode = FamousEngine.getRootNode('#app2');
    let camera = new Camera(rootNode, {depth: 2000});
    let app = new View(camera.addChild());
    app
      .setRotationY(0.4)
      .createDOMElement({
        properties: {
          background: '#00ff00'
        },
        content: '<h1>Hello World, App 2!</h1>'
      });
  }
}
