/** @module wdg.lines1 */require( 'wdg.lines1', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

module.exports = require("draw")(function(args) {
  if( typeof args.n === 'undefined' ) args.n = 10;
  if( typeof args.f === 'undefined' ) args.f = 3;

  
  var that = this;

  var n = args.n;
  var f = args.f;

  var k, j;
  var radius = .95;
  var x = [];
  var y = [];
  var ang;
  
  for( k=0; k<n; k++ ) {
    ang = Math.PI * 2 * k / n;
    x.push( radius * Math.sin( ang ) );
    y.push( radius * Math.cos( ang ) );
  }
  
  this.setColor("#F70").setLine(4);
  for( k=0; k<n; k++ ) {
    j = (k * f) % n;
    this.drawLine( x[k], y[k], x[j], y[j] );
  }
  this.setColor("#000");
  for( k=0; k<n; k++ ) {
    this.dot( x[k], y[k] );
  }
  this.setColor("#06D");
  for( k=0; k<n; k++ ) {
    this.txt( k, x[k] * 1.15, y[k] * 1.15 );
  }
});


  
module.exports._ = _;
/**
 * @module wdg.lines1
 * @see module:$
 * @see module:draw

 */
});