"use strict";

var Program = require( "webgl.program" );
var Canvas = require( "canvas" );
var $ = require( "dom" );

module.exports = Canvas( {
  init: init,
  draw: draw,
  context: {
    alpha: false
  },
  numbers: {
    z: 1
  }
} );

function init( resolve ) {
  var gl = this.gl;
  this.prg = new Program( this.gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  } );

  var canvas = document.createElement( "canvas" );
  canvas.setAttribute( "width", 64 );
  canvas.setAttribute( "height", 64 );
  var ctx = canvas.getContext( '2d' );
  ctx.fillStyle = "#00f";
  ctx.fillRect( 0, 0, 64, 64 );
  ctx.fillStyle = "#f80";
  for ( var y = 0 ; y < 64 ; y += 8 ) {
    ctx.fillRect( 0, y + 3, 64, 2 );
  }
    
  var texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );
  this.texture = texture;

  // Set the parameters so we can render any size image.
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas );
  
  // #(attribs)
  var attributes = new Float32Array([
    // X, Y, Z, U, V
    -1, -1, -1, 0, 0,
    +0, -1, -1, 1, 0,
    -1, +1, +1, 0, 1,
    +0, +1, +1, 1, 1
  ]);
  // #(attribs)

  this.prg.use();

  var buf = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buf );
  gl.bufferData( gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW );

  var bpe = attributes.BYTES_PER_ELEMENT;
  var stride = 5 * bpe;
  var attPosition = this.prg.attribs.attPosition.location;
  gl.enableVertexAttribArray( attPosition );
  gl.vertexAttribPointer( attPosition, 3, gl.FLOAT, false, stride, 0 * bpe );
  var attUV = this.prg.attribs.attUV.location;
  gl.enableVertexAttribArray( attUV );
  gl.vertexAttribPointer( attUV, 2, gl.FLOAT, false, stride, 3 * bpe );

  this.vertexCount = 4;

  this.uniX = gl.getUniformLocation( this.prg.program, "uniX" );
  this.uniZ = gl.getUniformLocation( this.prg.program, "uniZ" );
  this.uniTexture = gl.getUniformLocation( this.prg.program, "uniTexture" );
  
  resolve();
}

// #(render)
function draw( time ) {
  var prg = this.prg;
  var gl = this.gl;

  gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
  gl.clear( gl.COLOR_BUFFER_BIT );

  prg.use();
  
  gl.activeTexture( gl.TEXTURE0 );
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.uniform1i( this.uniTexture, 0 );
  
  gl.uniform1f( this.uniX, 0 );
  gl.uniform1f( this.uniZ, 0 );  
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, this.vertexCount );
    
  gl.uniform1f( this.uniX, 1 );
  gl.uniform1f( this.uniZ, this.z );  
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, this.vertexCount );
}
// #(render)
