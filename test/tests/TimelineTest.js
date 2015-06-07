import Box from '../fixtures/Box';
import Timeline from '../../animation/Timeline';

const time = [0, 1000, 2000, 3000, 4000];

export class TimelineTest {
  constructor(node) {
    this.box = new Box(node.addChild());
    this.timeline = new Timeline();
    this.timeline.registerPath({
      handler: (value) => {
        this.box.setPosition(...value);
      },
      path: [
        [time[0], [100, 100, 0]],
        [time[1], [600, 100, 0]],
        [time[2], [600, 400, 0]],
        [time[3], [100, 400, 0]],
        [time[4], [100, 100, 0]]
      ]
    });
    this.timeline.registerPath({
      handler: (value) => {
        this.box.setOpacity(value);
      },
      path: [
        [time[0], 1],
        [time[1], 0.1],
        [time[2], 1],
        [time[3], 0.1],
        [time[4], 1]
      ]
    });
    this.timeline.registerPath({
      handler: (value) => {
        this.box.setScale(...value);
      },
      path: [
        [time[0], [1.0, 1.0, 1.0]],
        [time[1], [0.5, 0.5, 0.5]],
        [time[2], [1.0, 1.0, 1.0]],
        [time[3], [0.5, 0.5, 0.5]],
        [time[4], [1.0, 1.0, 1.0]]
      ]
    });
    this.timeline.registerPath({
      handler: (value) => {
        this.box.setRotation(...value);
      },
      path: [
        [time[0], [0.0, 0.0, 0.0]],
        [time[1], [0.0, 0.0, Math.PI / 2]],
        [time[2], [0.0, 0.0, 0.0]],
        [time[3], [0.0, 0.0, Math.PI / 2]],
        [time[4], [0.0, 0.0, 0.0]]
      ]
    });
    this.forward();
  }
  forward() {
    this.timeline.set(time[0]);
    this.timeline.set(time[4], { duration: time[4] }, () => {
      this.reverse();
    });
  }
  reverse() {
    this.timeline.set(time[4]);
    this.timeline.set(time[0], { duration: time[4] }, () => {
      this.forward();
    });
  }
}
