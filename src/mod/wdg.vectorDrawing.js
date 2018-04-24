"use strict";

var ZOOM = .4;

module.exports = require("draw")(function() {
  var A = [0,1];
  var B = [.8,-.5];
  var C = [0,0];
  var D = [-.8,-.5];
  
  tri.call( this, -.5, .5, A, B, C );
  kite.call( this, -.5, .5, A, B, C, D );
  tri.call( this, .5, .5, B, C, D );
  kite.call( this, .5, .5, A, B, C, D );
  tri.call( this, -.5, -.5, C, D, A );
  kite.call( this, -.5, -.5, A, B, C, D );
  tri.call( this, .5, -.5, D, A, B );
  kite.call( this, .5, -.5, A, B, C, D );
});


function tri(x, y, A, B, C) {
  var Ax = ZOOM * A[0] + x;
  var Ay = ZOOM * A[1] + y;
  var Bx = ZOOM * B[0] + x;
  var By = ZOOM * B[1] + y;
  var Cx = ZOOM * C[0] + x;
  var Cy = ZOOM * C[1] + y;
  this
    .setColor( this.ORANGE )
    .fillTri( Ax, Ay, Bx, By, Cx, Cy );
}

function kite(x, y, A, B, C, D) {
  var Ax = ZOOM * A[0] + x;
  var Ay = ZOOM * A[1] + y;
  var Bx = ZOOM * B[0] + x;
  var By = ZOOM * B[1] + y;
  var Cx = ZOOM * C[0] + x;
  var Cy = ZOOM * C[1] + y;
  var Dx = ZOOM * D[0] + x;
  var Dy = ZOOM * D[1] + y;
  this
    .setColor( this.BLUE )
    .setLine( 4 )
    .drawLine( Ax, Ay, Bx, By )
    .drawLine( Bx, By, Cx, Cy )
    .drawLine( Cx, Cy, Dx, Dy )
    .drawLine( Dx, Dy, Ax, Ay )
    .setColor("#000")
    .dot(
      ZOOM * A[0] + x,
      ZOOM * A[1] + y,
      "A", "B"
    )
    .dot(
      ZOOM * B[0] + x,
      ZOOM * B[1] + y,
      "B", "LT"
    )
    .dot(
      ZOOM * C[0] + x,
      ZOOM * C[1] + y,
      "C", "B"
    )
    .dot(
      ZOOM * D[0] + x,
      ZOOM * D[1] + y,
      "D", "RT"
    );
}
