"use strict";


var Fillpoly = require("webgl.fillpoly");


var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

module.exports = require("draw")(function(args) {
  console.info("[wdg.vectorDrawing3] args=", args);
  var vertices = make( parseInt( args.index ) );
  var elemBuff = Fillpoly.fillPolyline( vertices );
  console.info("[wdg.vectorDrawing3] elemBuff=", elemBuff);
  var k, j, Ax, Ay, Bx, By, Cx, Cy, x, y;

  this.setColor( this.ORANGE );
  this;
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
    return makeBoat();
  case 4:
    return makeBoat();    
  case 5:
    return makeBoat();    
  }
  return makeBoat();
}

function makeBoat() {
  return [
    0,.7, .3,0, 1,.2, .9,0, .5,-.4,
    -.5,-.4, -.9,0, -1,.2, -.3,0    
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
