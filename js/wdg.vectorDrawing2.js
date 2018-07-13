/** @module wdg.vectorDrawing2 */require( 'wdg.vectorDrawing2', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";


module.exports = require("draw")(function() {
  var A = [0,0];
  var B = [-.4,-.3];
  var C = [-.1,-.4];
  var M = [-.2,.4];

  this.setColor( this.ORANGE ).opacity( .5 );
  tri.call( this, B, A, C );
  this.setColor( this.BLUE );
  tri.call( this, C, A, B );
  this
    .opacity( 1 )
    .setColor("#000")
    .dot( A[0], A[1], "A", "LB" )
    .dot( B[0], B[1], "B", "RT" )
    .dot( C[0], C[1], "C", "LT" )
    .dot( M[0], M[1], "M", "LB" );
});


function tri( A, B, C ) {
  var Ax = A[0];
  var Ay = A[1];
  var Bx = Ax + 3 * (B[0] - Ax);
  var By = Ay + 3 * (B[1] - Ay);
  var Cx = Ax + 3 * (C[0] - Ax);
  var Cy = Ay + 3 * (C[1] - Ay);
  this.fillTri( Ax, Ay, Bx, By, Cx, Cy );
}


  
module.exports._ = _;
/**
 * @module wdg.vectorDrawing2
 * @see module:$
 * @see module:draw

 */
});