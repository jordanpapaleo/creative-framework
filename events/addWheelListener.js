/**
 * Creates a global 'addWheelListener' method. The logic for this script was
 * borrowed from {@link https://developer.mozilla.org/en-US/docs/Web/Events/wheel|MDN}.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/wheel|MDN}
 *
 * @example
 *
 *     window.addWheelListener(elem, function (e) {
 *       e.preventDefault();
 *       console.log(e.deltaY);
 *     });
 *
 * @method  createAddWheelListener
 * @param   {Window}                window    Global window object.
 * @param   {Document}              document  Global document object.
 */
function createAddWheelListener(window, document) {
  let prefix = '';
  let _addEventListener;
  let support;

  // Detect event model
  if (window.addEventListener) {
    _addEventListener = 'addEventListener';
  } else {
    _addEventListener = 'attachEvent';
    prefix = 'on';
  }

  // Detect available wheel event
  // {wheel}           Supported by modern browsers
  // {mousewheel}      Supported by Webkit and IE
  // {DOMMouseScroll}  Support for older Firefox
  if ('onwheel' in document.createElement('div')) support = 'wheel';
  else if (document.onmousewheel !== undefined) support = 'mousewheel';
  else support = 'DOMMouseScroll';

  window.addWheelListener = function (elem, callback, useCapture) {
    _addWheelListener(elem, support, callback, useCapture);

    // Handle MozMousePixelScroll in older Firefox
    if (support === 'DOMMouseScroll') {
      _addWheelListener(elem, 'MozMousePixelScroll', callback, useCapture);
    }
  };

  function _addWheelListener(elem, eventName, callback, useCapture) {
    elem[ _addEventListener ](prefix + eventName, support === 'wheel' ? callback : function (originalEvent) {
      if (!originalEvent) originalEvent = window.event;

      // create a normalized event object
      let event = {
        // keep a ref to the original event object
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: 'wheel',
        deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
        deltaX: 0,
        deltaZ: 0,
        preventDefault: function () {
          if (originalEvent.preventDefault) originalEvent.preventDefault();
          else originalEvent.returnValue = false;
        }
      };

      // calculate deltaY (and deltaX) according to the event
      if (support === 'mousewheel') {
        let modifier = -(1 / 40);
        event.deltaY = modifier * originalEvent.wheelDelta;
        // Webkit also support wheelDeltaX
        if (originalEvent.wheelDeltaX) event.deltaX = modifier * originalEvent.wheelDeltaX;
      } else {
        event.deltaY = originalEvent.detail;
      }

      // it's time to fire the callback
      return callback(event);

    }, useCapture || false);
  }

}

// Only do this once
if (!window.addWheelListener) createAddWheelListener(window, document);

let addWheelListener = window.addWheelListener;

export default addWheelListener;
