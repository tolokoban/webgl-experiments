var MOUSEDOWN = 1;
var TOUCHSTART = 2;

/**
 * Deal with touch/mouse gestures to make an object rotate.
 * 
 * @param canvas {canvas} - the canvas on with we will attach touch/mouse events.
 * @param mesh {THREE.Mesh} - the object to rotate according to gestures.
 */
var Class = function(canvas, mesh) {
    var that = this;
    this.x = 0;
    this.y = 0;
    var status = 0;
    canvas.addEventListener("touchstart", function(evt) {
        status = TOUCHSTART;
        evt.preventDefault();
        var touches = evt.changedTouches;
        if (touches.length > 0) {
            
        }
    });
};




module.exports = Class;
