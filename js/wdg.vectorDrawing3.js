/** @module wdg.vectorDrawing3 */require( 'wdg.vectorDrawing3', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";


var Fillpoly = require("webgl.fillpoly");


var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

module.exports = require("draw")(function(args) {
  console.info("[wdg.vectorDrawing3] args=", args);
  var vertices = make( parseInt( args.index ) );
  var elemBuff = Fillpoly.fillPolyline( vertices );
  console.info("[wdg.vectorDrawing3] elemBuff=", elemBuff);
  var k, j, Ax, Ay, Bx, By, Cx, Cy, x, y;

  for( k = 0; k < elemBuff.length; k+=3 ) {
    j = elemBuff[k] * 2;
    Ax = vertices[j]; Ay = vertices[j + 1];
    j = elemBuff[(k + 1) % elemBuff.length] * 2;
    Bx = vertices[j]; By = vertices[j + 1];
    j = elemBuff[(k + 2) % elemBuff.length] * 2;
    Cx = vertices[j]; Cy = vertices[j + 1];
    this.setOpacity( .5 ).setColor( this.ORANGE ).fillTri( Ax, Ay, Bx, By, Cx, Cy );
    x = (Ax + Bx + Cx) / 3;
    y = (Ay + By + Cy) / 3;
    this.setOpacity( 1 ).setColor( this.BLUE ).txt( Math.floor( k / 3 ), x, y, "" );
  }
  this.setOpacity( 1 ).setLine( 2 ).setColor( this.BLUE );
  for( k = 0; k < elemBuff.length; k+=3 ) {
    j = elemBuff[k] * 2;
    Ax = vertices[j]; Ay = vertices[j + 1];
    j = elemBuff[(k + 1) % elemBuff.length] * 2;
    Bx = vertices[j]; By = vertices[j + 1];
    j = elemBuff[(k + 2) % elemBuff.length] * 2;
    Cx = vertices[j]; Cy = vertices[j + 1];
    this.drawTri( Ax, Ay, Bx, By, Cx, Cy );
  }

  this.setColor( "#000" );
  for( k = 0; k < vertices.length; k+=2 ) {
    Ax = vertices[k];
    Ay = vertices[k + 1];
    this.dot( Ax, Ay, ALPHABET.charAt( k / 2 ) );
  }
});

function make( index ) {
  switch( index ) {
  case 0:
    return makeTri();
  case 1:
    return makeBoat();
  case 2:
    return makeStar();
  case 3:
    return makePolygon();
  case 4:
    return makeSpiral();
  case 5:
    return makeCastle();
  }
  return makeNoise();
}

function makeBoat() {
  return [
    0,.7, .3,0, 1,.4, .9,0, .5,-.4,
    -.5,-.4, -.9,0, -1,.4, -.3,0
  ];
}


function makeTri() {
  return [.2,1, 1, -.2, -.9,-.7];
}


function makeStar() {
  var r;
  var vertices = [];
  for( var k=0; k<10; k++ ) {
    r = .3 + .6 * (k % 2);
    vertices.push(
      r * Math.sin( Math.PI * k / 5 ),
      r * Math.cos( Math.PI * k / 5 )
    );
  }
  return vertices;
}

function makePolygon() {
  var r = .95;
  var vertices = [];
  for( var k=0; k<6; k++ ) {
    r = .2 + .6 * (k % 2);
    vertices.push(
      r * Math.cos( 2 * Math.PI * k / 6 ),
      r * Math.sin( 2 * Math.PI * k / 6 )
    );
  }
  return vertices;
}

function makeSpiral() {
  var r, k;
  var N = 10;
  var vertices = [];
  for( k=0; k<N; k++ ) {
    r = 1 - .7 * k / N;
    vertices.push(
      r * Math.cos( 3 * Math.PI * k / N ),
      r * Math.sin( 3 * Math.PI * k / N )
    );
  }
  for( k=N-1; k>-1; k-- ) {
    r = .8 - .7 * k / N;
    vertices.push(
      r * Math.cos( 3 * Math.PI * k / N ),
      r * Math.sin( 3 * Math.PI * k / N )
    );
  }
  return vertices;
}

function makeNoise() {
  var r;
  var vertices = [];
  for( var k=0; k<8; k++ ) {
    r = Math.random() * .75 + .25;
    vertices.push(
      r * Math.cos( 2 * Math.PI * k / 8 ),
      r * Math.sin( 2 * Math.PI * k / 8 )
    );
  }
  return vertices;
}

function makeCastle() {
  var h1 = .4 + Math.random() * .6;
  var h2 = .4 + Math.random() * .6;
  var h3 = .4 + Math.random() * .6;
  return [
    -.6,h1, -.3,h1, -.3,.2, -.1,.2,
    -.2,h2, .2,h2, .1,.2, .3,.2, .3,h3, .6,h3,
    +.5,0, .3,-.2, .4,-1, -.4,-1, -.3,-.2, -.5,0
  ];
}


  
module.exports._ = _;
/**
 * @module wdg.vectorDrawing3
 * @see module:$
 * @see module:webgl.fillpoly
 * @see module:draw

 */
});