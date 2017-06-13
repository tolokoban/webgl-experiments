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
  canvas.setAttribute( "width", 256 );
  canvas.setAttribute( "height", 256 );
  var ctx = canvas.getContext( '2d' );
  ctx.fillStyle = "#00f";
  ctx.fillRect( 0, 0, 256, 256 );
  ctx.fillStyle = "#f80";
  var x, y, s2 = 32, s1 = s2 >> 1;
  for ( y = 0 ; y < 256 ; y += s2 ) {
    for ( x = 0 ; x < 256 ; x += s2 ) {
      ctx.beginPath();
      ctx.moveTo( x + s1, y );
      ctx.lineTo( x + s2, y + s1 );
      ctx.lineTo( x + s1, y + s2 );
      ctx.lineTo( x, y + s1 );
      ctx.closePath();
      ctx.fill();
    }
  }
  
  var texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );
  this.texture = texture;

  // Set the parameters so we can render any size image.
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );

  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas );
  
  // #(attribs)
  var attributes = new Float32Array([
    // X, Y, U, V
    -1, -1, 0, 0,
    -1, +1, 0, 1,
    +0, -1, 1, 0,
    +0, +1, 1, 1,
    // Deuxième carré.
    0, -1, 0, 0,
    1, -1, 1, 0,
    0, +1, 0, 1,
    1, +1, 1, 1
  ]);
  // #(attribs)

  this.prg.use();

  var buf = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buf );
  gl.bufferData( gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW );

  var bpe = attributes.BYTES_PER_ELEMENT;
  var stride = 4 * bpe;
  var attPosition = this.prg.attribs.attPosition.location;
  gl.enableVertexAttribArray( attPosition );
  gl.vertexAttribPointer( attPosition, 2, gl.FLOAT, false, stride, 0 * bpe );
  var attUV = this.prg.attribs.attUV.location;
  gl.enableVertexAttribArray( attUV );
  gl.vertexAttribPointer( attUV, 2, gl.FLOAT, false, stride, 2 * bpe );

  this.vertexCount = 4;

  this.uniTexture = gl.getUniformLocation( this.prg.program, "uniTexture" );
  this.uniTime = gl.getUniformLocation( this.prg.program, "uniTime" );
  this.uniType = gl.getUniformLocation( this.prg.program, "uniType" );
  
  resolve();
}

// #(render)
function draw( time ) {
  var prg = this.prg;
  var gl = this.gl;

  gl.clearColor( 1, 1, 1, 1 );
  gl.clear( gl.COLOR_BUFFER_BIT );

  prg.use();
  
  gl.activeTexture( gl.TEXTURE0 );
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.uniform1i( this.uniTexture, 0 );
  
  gl.uniform1f( this.uniTime, time );
  
  gl.uniform1f( this.uniType, 0 );
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, this.vertexCount );    
  gl.uniform1f( this.uniType, 1 );
  gl.drawArrays( gl.TRIANGLE_STRIP, 4, this.vertexCount );
}
// #(render)
