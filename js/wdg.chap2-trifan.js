/** @module wdg.chap2-trifan */require( 'wdg.chap2-trifan', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

module.exports = require("draw")(function() {
  var that = this;

  var radius = 1;
  var k, j;
  var x = [];
  var y = [];
  for( k=0; k<6; k++ ) {
    x.push( radius * Math.cos( 2 * Math.PI * k / 6 ) );
    y.push( radius * Math.sin( 2 * Math.PI * k / 6 ) );
  }
  this.setColor("#06F").setLine(4);
  for( k=0; k<6; k++ ) {
    j = (k + 1) % 6;
    this.fillTri(
      0, 0,
      x[k], y[k],
      x[j], y[j]
    ).drawTri(
      0, 0,
      x[k], y[k],
      x[j], y[j]
    );
  }
  this.setColor("#F70");
  for( k=1; k<6; k++ ) {
    j = (k + 1) % 6;
    this.drawTri(
      x[0], y[0],
      x[k], y[k],
      x[j], y[j]
    );
  }
  this
    .setColor("#000")
    .dot(x[0], y[0], "A", "L")
    .dot(x[1], y[1], "B", "LB")
    .dot(x[2], y[2], "C", "RB")
    .dot(x[3], y[3], "D", "R")
    .dot(x[4], y[4], "E", "RT")
    .dot(x[5], y[5], "F", "LT");
});


  
module.exports._ = _;
/**
 * @module wdg.chap2-trifan
 * @see module:$
 * @see module:draw

 */
});