import View from '../../display/View';
import Timeline from '../../animation/Timeline';

const Color = FamousPlatform.utilities.Color;
const Plane = FamousPlatform.webglGeometries.Plane;

export class ViewTest extends View {
  constructor(node) {
    super(node);

    this.timeline = new Timeline();
    this.timeline.registerPath({
      handler: function (value) {
        console.log(value);
      },
      path: [
        [0, 0],
        [5000, 1000]
      ]
    });
    this.timeline.set(5000, {duration: 5000});

    this._createFirstView();
    this._createSecondView();
  }

  _createFirstView() {
    this.firstView = new View(this.node.addChild());
    this.firstView.createDOMElement({
      properties: {
        backgroundColor: 'red'
      }
    })
    .setGeometry(new Plane())
    .setBaseColor(new Color('#33CCFF'));

    this.firstView.setSizeModeAbsolute();
    this.firstView.setAbsoluteSize(50, 50);


    this.firstView.on('sudo', function () {
      console.log('got sudo event', arguments);
    });

    this.firstView.on('wheel', function () {
      console.log('wheel', arguments);
    });
    window.test = this.firstView;
  }

  _createSecondView() {
    this.secondView = new View(this.node.addChild());

    this.secondView.createDOMElement({
      properties: {
        backgroundColor: 'red'
      }
    });

    this.secondView.on('click', function () {
      // emit event to another view
      this.secondView.emit('sudo', 'data here');
    }.bind(this));

    this.secondView.setSizeModeAbsolute();
    this.secondView.setAbsoluteSize(100, 50);
    // this.secondView.setMountPoint(0.5, 0.5, 0.5);
    // this.secondView.setPosition(100, 100);
  }
}
