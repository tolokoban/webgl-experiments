"use strict";

var Program = require( "webgl.program" );
var Canvas = require( "canvas" );

module.exports = Canvas( {
  init: init,
  draw: draw
} );

var LEVELS = 1;

function init( resolve ) {
  var gl = this.gl;
  this.prg = new Program( this.gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  } );

  var attributes = [];
  for ( var level = 0; level < LEVELS; level++ ) {
    attributes.push(
      1, 0, level,
      1, Math.PI * 0.5, level,
      1, Math.PI, level
    );
  }

  attributes = new Float32Array( attributes );
console.info("attributes=", attributes);

  this.prg.use();

  var buf = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buf );
  gl.bufferData( gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW );

  var bpe = attributes.BYTES_PER_ELEMENT;
  var attRadius = this.prg.attribs.attRadius.location;
  gl.enableVertexAttribArray( attRadius );
  gl.vertexAttribPointer( attRadius, 1, gl.FLOAT, false, 0, 0 * bpe );
  var attAngle = this.prg.attribs.attAngle.location;
  gl.enableVertexAttribArray( attAngle );
  gl.vertexAttribPointer( attAngle, 1, gl.FLOAT, false, 0, 1 * bpe );
  var attLevel = this.prg.attribs.attLevel.location;
  gl.enableVertexAttribArray( attLevel );
  gl.vertexAttribPointer( attLevel, 1, gl.FLOAT, false, 0, 2 * bpe );

  this.vertexCount = LEVELS * 3;
  console.info("this.prg=", this.prg);

  resolve();
}

function draw( time ) {
  var gl = this.gl;

  gl.clearColor( 0.8, 0.9, 1.0, 1.0 );
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  //this.prg.use();

  gl.drawArrays( gl.TRIANGLES, 0, this.vertexCount );
}