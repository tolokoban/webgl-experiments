/**
 * @module tfw.pointer-events
 *
 * @description
 * Available actions are:
 * down, up, tap, doubletap,
 * drag, move, wheel.
 *
 * @example
 * var mod = require('tfw.pointer-events');
 */

// Webkit and Opera still use 'mousewheel' event type.
var WHEEL_EVENT = "onwheel" in document.createElement("div") ? "wheel" :
      // Modern browsers support "wheel"
      document.onmousewheel !== undefined ? "mousewheel" :
      // Webkit and IE support at least "mousewheel"
      "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox


var G = {
  // As soon as a touch occurs, no more mouse events can be handled.
  touchDevice: false,
  // When a DOM element is touched, `target` holds it.
  // Then we can track mouse events on __body__ using capture.
  // Items are objects: { element:..., x:..., y:..., time:... }
  target: [],
  // Coords of _down_ on body.
  bodyDownX: 0, bodyDownY: 0,
  // Current mouse position on body.
  bodyMoveX: -1, bodyMoveY: -1,
  // Last mouse position on body.
  bodyMoveLastX: -1, bodyMoveLastY: -1,
  // drag event.
  onDrag: null,
  // Last time tap for double tap detection.
  lastTapTime: 0
};

var onDocumentMouseDown = function(evt) {
  if (G.touchDevice) return;
  G.bodyDownX = evt.pageX;
  G.bodyDownY = evt.pageY;
  G.bodyMoveX = evt.pageX;
  G.bodyMoveY = evt.pageY;
  G.bodyMoveLastX = evt.pageX;
  G.bodyMoveLastY = evt.pageY;
  G.bodyTarget = evt.target;
  G.bodyButton = evt.button;
};

var onDocumentMouseMove = function(evt) {
  if (G.touchDevice) return;
  var target = getCurrentTarget( 'drag' );
  if (!target) return;

  evt.stopPropagation();
  evt.preventDefault();

  G.bodyMoveLastX = G.bodyMoveX;
  G.bodyMoveLastY = G.bodyMoveY;
  G.bodyMoveX = evt.pageX; // + rectB.left;
  G.bodyMoveY = evt.pageY; // + rectB.top;

  target.element.slots.drag({
    action: 'drag',
    target: target.element,
    x0: target.x,
    y0: target.y,
    x: target.x + G.bodyMoveX - G.bodyDownX,
    y: target.y + G.bodyMoveY - G.bodyDownY,
    dx: G.bodyMoveX - G.bodyDownX,
    dy: G.bodyMoveY - G.bodyDownY,
    vx: G.bodyMoveX - G.bodyMoveLastX,
    vy: G.bodyMoveY - G.bodyMoveLastY,
    button: G.bodyButton
  });
};

var onDocumentMouseUp = function(evt) {
  if( G.touchDevice ) return;
  var target = getCurrentTarget();
  if (!target) return;
  
  evt.stopPropagation();
  evt.preventDefault();

  console.log("DocumentMouseUp: ", G.target);
  
  var time = Date.now();
  var dx = evt.pageX - G.bodyDownX;
  var dy = evt.pageY - G.bodyDownY;

  target = getCurrentTarget( "up" );
  if( target ) {
    target.element.slots.up({
      action: 'up',
      //target: G.target.element,
      target: G.bodyTarget,
      x: G.targetX + dx,
      y: G.targetY + dy,
      dx: dx,
      dy: dy,
      button: G.bodyButton,
      stopPropagation: evt.stopPropagation.bind( evt ),
      preventDefault: evt.preventDefault.bind( evt )
    });
  }
  // Tap or doubletap.
  if (dx * dx + dy * dy < 1024) {
    if (G.lastTapTime > 0) {
      if (slots.doubletap && time - G.lastTapTime < 400) {
        slots.doubletap({
          action: 'doubletap',
          //target: G.target.element,
          target: G.bodyTarget,
          x: G.targetX + dx,
          y: G.targetY + dy
        });
      } else {
        G.lastTapTime = 0;
      }
    }
    if (slots.tap && G.lastTapTime == 0) {
      slots.tap({
        action: 'tap',
        //target: G.target.element,
        target: G.bodyTarget,
        x: G.targetX + dx,
        y: G.targetY + dy
      });
    }
    G.lastTapTime = time;
  }
  delete G.target;
};


document.body.addEventListener( 'mousedown', onDocumentMouseDown, true );
document.body.addEventListener( 'mousemove', onDocumentMouseMove, true );
document.body.addEventListener( 'mouseup', onDocumentMouseUp, true );


function PointerEvents( element ) {
  var that = this;

  this._slots = {};
  this._eventListeners = [];

  Object.defineProperty( PointerEvents.prototype, 'element', {
    value: element, writable: false, configurable: true, enumerable: true
  });

  //===============
  // Touch events.
  addEvent.call(that, element, 'touchstart', function(evt) {
    evt.preventDefault();

    if( !G.touchDevice ) {
      G.touchDevice = true;
      document.body.removeEventListener( 'mousedown', onDocumentMouseDown, true );
      document.body.removeEventListener( 'mousemove', onDocumentMouseMove, true );
      document.body.removeEventListener( 'mouseup', onDocumentMouseUp, true );
    }
    var slots = that._slots;
    if (evt.touches.length == 1) {
      G.rect = element.getBoundingClientRect();
      G.bodyMoveX = evt.touches[0].clientX;
      G.bodyMoveY = evt.touches[0].clientY;
      G.bodyDownX = evt.touches[0].clientX;
      G.bodyDownY = evt.touches[0].clientY;
      G.targetX = evt.touches[0].clientX - G.rect.left;
      G.targetY = evt.touches[0].clientY - G.rect.top;
      G.time = Date.now();
      if (slots.down) {
        slots.down({
          action: 'down',
          button: G.bodyButton,
          target: element,
          x: G.targetX,
          y: G.targetY,
          stopPropagation: evt.stopPropagation.bind( evt ),
          preventDefault: evt.preventDefault.bind( evt )
        });
      }
    }
  });
  addEvent.call(that, element, 'touchmove', function(evt) {
    evt.preventDefault();

    var lastX = G.bodyMoveX;
    var lastY = G.bodyMoveY;
    G.bodyMoveX = evt.touches[0].clientX;
    G.bodyMoveY = evt.touches[0].clientY;
    var slots = that._slots;
    if (slots.drag) {
      slots.drag({
        action: 'drag',
        target: element,
        x0: G.targetX,
        y0: G.targetY,
        x: G.bodyMoveX - G.rect.left,
        y: G.bodyMoveY - G.rect.top,
        dx: G.bodyMoveX - G.bodyDownX,
        dy: G.bodyMoveY - G.bodyDownY,
        vx: G.bodyMoveX - lastX,
        vy: G.bodyMoveY - lastY,
        stopPropagation: evt.stopPropagation.bind( evt ),
        preventDefault: evt.preventDefault.bind( evt )
      });
    }
  });
  addEvent.call(that, element, 'touchend', function(evt) {
    evt.preventDefault();

    var slots = that._slots;
    var dx = G.bodyMoveX - G.bodyDownX;
    var dy = G.bodyMoveY - G.bodyDownY;
    if (slots.up) {
      slots.up({
        action: 'up',
        target: that.element,
        x: G.bodyMoveX - G.rect.left,
        y: G.bodyMoveY - G.rect.top,
        dx: dx,
        dy: dy,
        stopPropagation: evt.stopPropagation.bind( evt ),
        preventDefault: evt.preventDefault.bind( evt )
      });
    }
    // Tap or doubletap.
    if (dx * dx + dy * dy < 256) {
      var time = Date.now();
      if (G.lastTapTime > 0) {
        if (slots.doubletap && time - G.lastTapTime < 400) {
          slots.doubletap({
            action: 'doubletap',
            //target: that.element,
            target: G.bodyTarget,
            x: G.bodyMoveX - G.rect.left,
            y: G.bodyMoveY - G.rect.top,
            stopPropagation: evt.stopPropagation.bind( evt ),
            preventDefault: evt.preventDefault.bind( evt )
          });
        } else {
          G.lastTapTime = 0;
        }
      }
      if (slots.tap && G.lastTapTime == 0) {
        evt.stopPropagation();
        evt.preventDefault();
        slots.tap({
          action: 'tap',
          //target: that.element,
          target: G.bodyTarget,
          x: G.bodyMoveX - G.rect.left,
          y: G.bodyMoveY - G.rect.top,
          stopPropagation: evt.stopPropagation.bind( evt ),
          preventDefault: evt.preventDefault.bind( evt )
        });
      }
      G.lastTapTime = time;
    }
  });

  //===============
  // Mouse events.
  addEvent.call(that, element, 'mousedown', function(evt) {
    if (G.touchDevice) return;
    var slots = that._slots;
    G.target = that;
    console.log("Mousedown target: ", that);
    var rect = element.getBoundingClientRect();
    G.targetX = evt.pageX - rect.left;
    G.targetY = evt.pageY - rect.top;
    if (slots.down) {
      slots.down({
        action: 'down',
        button: G.bodyButton,
        target: G.bodyTarget,
        x: G.targetX,
        y: G.targetY,
        stopPropagation: evt.stopPropagation.bind( evt ),
        preventDefault: evt.preventDefault.bind( evt )
      });
    }
  });
  addEvent.call(that, element, 'mousemove', function(evt) {
    var slots = that._slots;
    if (slots.move) {
      var rect = element.getBoundingClientRect();
      slots.move({
        target: element,
        action: 'move',
        x: evt.pageX - rect.left,
        y: evt.pageY - rect.top,
        stopPropagation: evt.stopPropagation.bind( evt ),
        preventDefault: evt.preventDefault.bind( evt )
      });
    }
  });

  Object.defineProperty( this, 'element', {
    value: element, writable: true, configurable: true, enumerable: true
  });
}


/**
 * @return void
 */
PointerEvents.prototype.on = function(action, event) {
  var that = this;

  var slots = this._slots;
  if (typeof event === 'function') {
    slots[action] = event;
  }
  if (action == 'wheel') {
    addEvent.call(that, this.element, WHEEL_EVENT, function(evt) {
      evt.target = G.bodyTarget;
      evt.action = 'wheel';
      var rect = that.element.getBoundingClientRect();      
      evt.x = evt.pageX - rect.left;
      evt.y = evt.pageY - rect.top;
      evt.delta = evt.deltaY;
      slots.wheel( evt );
    });
  }
  return this;
};


/**
 * @return void
 */
PointerEvents.prototype.off = function() {
  this._eventListeners.forEach(function (itm) {
    var element = itm[0];
    var event = itm[1];
    var listener = itm[2];
    var capture = itm[3];
    element.removeEventListener( event, listener, capture );
  });
};


function addEvent(element, event, listener, capture) {
  element.addEventListener( event, listener, capture );
  this._eventListeners.push([element, event, listener, capture]);
}

function addTarget( element, x, y ) {
  G.target.push({ element: element, x: x, y: y, time: Date.now() });
}
/**
 * Return the first taget listening on this `slot`.
 */
function getCurrentTarget( slot ) {
  if( !G.target ) return null;
  for( var i = 0 ; i < G.target.length ; i++ ) {
    var target = G.target[i];
    if( !slot || typeof target.slots[slot] === 'function' ) return target;
  }
  return null;
}

function clearCurrentTarget() {
  G.target = [];
}

module.exports = PointerEvents;


