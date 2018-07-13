/** @module wdg.interpolation */require( 'wdg.interpolation', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "// Le temps set à la rotation lente du rectangle.\r\nuniform float uniTime;\r\n// Type de calcul a effectué pour le relief.\r\nuniform float uniType;\r\n\r\nattribute vec2 attPosition;\r\nattribute vec2 attUV;  // Coordonnées de la texture.\r\n\r\nvarying vec2 varUV;\r\n// Profondeur de champ comprise entre 0.0 et 1.0.\r\nconst float DOF = 0.9;\r\n\r\nvoid main() {\r\n  varUV = attUV;\r\n  // Rotation lente du rectangle.\r\n  float angle = uniTime * 0.0002;\r\n  float x = attPosition.x;\r\n  float y = attPosition.y * cos(angle);\r\n  float z = attPosition.y * sin(angle);\r\n  // Diviseur, calculé selon z.\r\n  float w = z * DOF + 1.0;\r\n  \r\n  if ( uniType > 0.0 ) {\r\n    // Partie de droite.\r\n    gl_Position = vec4( \r\n      x, \r\n      y, \r\n      z*w, \r\n      w \r\n    );\r\n  } else {\r\n    // Partie de gauche.\r\n    gl_Position = vec4( \r\n      x/w, \r\n      y/w, \r\n      z, \r\n      1.0 \r\n    );\r\n  }\r\n}\r\n",
  "frag": "precision mediump float;\r\n\r\nuniform sampler2D uniTexture;\r\n\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  gl_FragColor = texture2D( uniTexture, varUV );\r\n}\r\n"};
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
  ctx.fillStyle = "#27f";
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


  
module.exports._ = _;
/**
 * @module wdg.interpolation
 * @see module:$
 * @see module:webgl.program
 * @see module:canvas
 * @see module:dom

 */
});