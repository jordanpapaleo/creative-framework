const Curves = FamousPlatform.transitions.Curves;
const FamousEngine = FamousPlatform.core.FamousEngine;
const Size = FamousPlatform.components.Size;
const Transitionable = FamousPlatform.transitions.Transitionable;

export default class SetterTimeline {
  constructor(options = {}) {
    this.componentSet = [];
    this.timescale = options.timescale || 1;
    this.currentTime = new Transitionable(0);
    // for now update on all ticks until clock gets fixed
    this.callbacks = [];
    FamousEngine.requestUpdateOnNextTick(this);
  }

  registerComponent(animationData) {
    this.componentSet.push(animationData);
  }

  /**
   * Registers a callback function to fire at a specific time.
   * @method  registerCallback
   * @param   {Number}          time       Keyframe represented in milliseconds.
   * @param   {Function}        fn         The callback function.
   * @param   {Number}          direction  What direction to trigger this callback.
   */
  registerCallback(time, fn, direction) {
    this.callbacks.push({
      time: time,
      fn: fn,
      direction: (direction || 1)
    });
  }

  /**
   * Adds an array of {@link KeyframeObjs} to a {@link Timeline} instance.
   * @method  addKeyframes
   * @param   {KeyframeObjs}  keyframeObjs  An array of {@link KeyframeObjs}.
   */
  /*eslint no-underscore-dangle:0*/
  addKeyframes(keyframeObjs) {
    let layers = {};
    let i;
    let j;
    for (i = 0; i < keyframeObjs.length; i++) {
      let keyframes = keyframeObjs[i].keyframes;
      for (j = 0; j < keyframes.length; j++) {
        let keyframe = keyframes[j];
        let nodeProperty = keyframe.shift();
        let id = nodeProperty._dispatch._renderProxy._id;
        keyframe.unshift(keyframeObjs[i].time);
        if (!layers[id]) {
          layers[id] = {
            component: nodeProperty,
            path: []
          };
        }
        layers[id].path.push(keyframe);
      }
    }
    Object.keys(layers).forEach((id) => this.registerComponent(layers[id]));
  }

  set(time, transition, callback) {
    this.direction = time > this.currentTime.get() ? 1 : -1;
    // comment out no longer updates and stuff for now, race condition in clock.
    if (transition) {
      this.inTransition = true;
      FamousEngine.requestUpdate(this);
      this.currentTime.set(time, transition, () => {
        this.inTransition = false;
        FamousEngine.requestUpdate(this);
        if (callback) {
          callback();
        }
      });
    } else {
      this.currentTime.set(time);
      this.inTransition = true;
      FamousEngine.requestUpdate(this);
      this.inTransition = false;
    }
  }

  onUpdate(time) {
    // debugger;
    let res = [];
    time = this.currentTime.get() * this.timescale;

    for (var i = 0; i < this.callbacks.length; i++) {
      if (this.direction > 0 && this.callbacks[i].direction > 0) {
        // forward
        if (time >= this.callbacks[i].time) {
          this.callbacks[i].fn();
          // Set the direction to reverse
          this.callbacks[i].direction = -1;
        }
      } else if (this.direction < 0 && this.callbacks[i].direction < 0) {
        if (time <= this.callbacks[i].time) {
          this.callbacks[i].fn();
          this.callbacks[i].direction = 1; // set to forwards
        }
      }
    }
    for (let i = 0; i < this.componentSet.length; i++) {
      let animData = this.componentSet[i];
      for (let j = 0; j < animData.path.length; j++) {
        let currStep = animData.path[j];
        let nextStep = animData.path[j + 1];

        // currently mid path, calculate and apply.
        if (nextStep && currStep[0] <= time && nextStep[0] >= time) {
          let percentDone = (time - currStep[0]) / (nextStep[0] - currStep[0]);
          let state = currStep[2] ? currStep[2](percentDone) : Curves.linear(percentDone);

          if (currStep[1] instanceof Array) {
              for (let k = 0; k < currStep[1].length; k++) {
                res[k] = currStep[1][k] + (nextStep[1][k] - currStep[1][k]) * state;
              }
              if (animData.component instanceof Size) {
                animData.component.setAbsolute(...res);
              } else {
                animData.component.set(...res);
              }
          } else {
            animData.component.set(currStep[1] + (nextStep[1] - currStep[1]) * state);
          }
        }
        // we are passed last step, set object to final state.
        if (!nextStep && currStep[0] < time) {
          if (currStep[1] instanceof Array) {
              if (animData.component instanceof Size) {
                animData.component.setAbsolute(...res);
              } else {
                animData.component.set(...currStep[1]);
              }
          } else {
            animData.component.set(currStep[1]);
          }
        }
      }
    }
    if (this.inTransition) {
      FamousEngine.requestUpdateOnNextTick(this);
    }
  }
}
