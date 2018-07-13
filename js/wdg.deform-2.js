/** @module wdg.deform-2 */require( 'wdg.deform-2', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "uniform float uniTime;\r\nuniform float uniDelay;\r\nuniform float uniAngle;\r\n\r\nattribute float attRadius;\r\nattribute float attAngle;\r\nattribute float attLevel;\r\nattribute vec2 attUV;\r\n\r\n// Coordonnées dans la texture.\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  // Temps qui tient compte du décalage par level.\r\n  float t = uniTime - uniDelay * attLevel;\r\n  // Angle max d'inclinaison entre deux niveaux.\r\n  float a = radians( uniAngle ) * 0.1;\r\n  // Calculer en fonction du temps l'angle entre deux\r\n  // triangles consécutifs.\r\n  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);\r\n  // Plus le triangle à un level élevé, plus il est petit.\r\n  float scale = 1.0 / sqrt( 1.0 + attLevel );\r\n  // Coordonnées du centre du triangle de la base.\r\n  float xc = -0.5;\r\n  float yc = -0.7;\r\n  \r\n  int level = int( attLevel );\r\n  // A chaque niveau supplémentaire,\r\n  // l'angle s'incline un peu plus.\r\n  float angle = tilt - 0.05;\r\n  for( int i = 1 ; i < 10 ; i++ ) {\r\n    // Condition d'arrêt.\r\n    if ( i > level ) break;\r\n    // Calculer les coordonnées du centre du triangle.\r\n    yc += 0.4 * scale * cos( angle );\r\n    xc += 0.4 * scale * sin( angle );\r\n    // Incliner un peu plus pour le niveau suivant.\r\n    angle += tilt;\r\n  }\r\n  // Coordonnées du vertex dans l'espace de WebGL.\r\n  float x = scale * attRadius * cos( attAngle - angle );\r\n  float y = scale * attRadius * sin( attAngle - angle );\r\n  \r\n  gl_Position = vec4( \r\n    xc + x,\r\n    yc + y,\r\n    0, 1 \r\n  );\r\n  \r\n  varUV = attUV;\r\n}\r\n",
  "frag": "precision mediump float;\r\n\r\nuniform sampler2D uniTexture;\r\n\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  vec4 color = texture2D( uniTexture, varUV );\r\n  // Si le point est transparent, on ne l'affiche pas.\r\n  if ( color.a < 0.1 ) discard;\r\n  gl_FragColor = color;\r\n}\r\n"};
  "use strict";

var Program = require( "webgl.program" );
var Canvas = require( "canvas" );
var $ = require( "dom" );

module.exports = Canvas( {
  init: init,
  draw: draw,
  context: {
    alpha: true
  },
  numbers: {
    delay: 0,
    angle: 30
  }
} );

var LEVELS = 10;

function init( resolve ) {
  var gl = this.gl;
  $.css( gl.canvas, {
    "background-image": "url(css/wdg.deform-1/forest.jpg)",
    "background-size": "100% 100%"
  });
  this.prg = new Program( this.gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  } );

  // #(attribs)
  var attributes = [];
  // LEVELS est le nombre de triangles.
  for ( var level = 0; level < LEVELS; level++ ) {
    attributes.push(
      // attRadius, attAngle,      attLevel, attUV.
      0.75,         0,             level,    1, 1,             
      0.5,          Math.PI * 0.5, level,    0.5, 0,
      0.75,         Math.PI,       level,    0, 1
    );
  }
  attributes = new Float32Array( attributes );
  // #(attribs)

  this.prg.use();

  var buf = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buf );
  gl.bufferData( gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW );

  var bpe = attributes.BYTES_PER_ELEMENT;
  var stride = 5 * bpe;
  var attRadius = this.prg.attribs.attRadius.location;
  gl.enableVertexAttribArray( attRadius );
  gl.vertexAttribPointer( attRadius, 1, gl.FLOAT, false, stride, 0 * bpe );
  var attAngle = this.prg.attribs.attAngle.location;
  gl.enableVertexAttribArray( attAngle );
  gl.vertexAttribPointer( attAngle, 1, gl.FLOAT, false, stride, 1 * bpe );
  var attLevel = this.prg.attribs.attLevel.location;
  gl.enableVertexAttribArray( attLevel );
  gl.vertexAttribPointer( attLevel, 1, gl.FLOAT, false, stride, 2 * bpe );
  var attUV = this.prg.attribs.attUV.location;
  gl.enableVertexAttribArray( attUV );
  gl.vertexAttribPointer( attUV, 2, gl.FLOAT, false, stride, 3 * bpe );

  this.vertexCount = LEVELS * 3;

  this.uniTime = gl.getUniformLocation( this.prg.program, "uniTime" );
  this.uniDelay = gl.getUniformLocation( this.prg.program, "uniDelay" );
  this.uniAngle = gl.getUniformLocation( this.prg.program, "uniAngle" );
  this.uniTexture = gl.getUniformLocation( this.prg.program, "uniTexture" );

  var texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );
  this.texture = texture;
  
  // Set the parameters so we can render any size image.
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

  // charger l'image des branches.
  var image = new Image( );
  image.onload = function( ) {
    // Upload the image into the texture.
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );

    resolve();
  };
  image.onerror = function( err ) {
    console.error("Unable to load", image.src + "!");
    console.error( err );
  };
  image.src = "css/wdg.deform-2/leaves.png";
}

// #(render)
function draw( time ) {
  var prg = this.prg.program;
  var gl = this.gl;

  gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
  gl.clear( gl.COLOR_BUFFER_BIT );

  gl.useProgram( prg );
  gl.uniform1f( this.uniTime, time );
  gl.uniform1f( this.uniDelay, this.delay );
  gl.uniform1f( this.uniAngle, this.angle );
  
  // Activer l'uniform relatif à notre texture.
  // On n'a qu'une texture donc on utilise le slot 0.
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.activeTexture( gl.TEXTURE0 );
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.uniform1i( this.uniTexture, 0 );
  
  
  gl.drawArrays( gl.TRIANGLES, 0, this.vertexCount );
}
// #(render)


  
module.exports._ = _;
/**
 * @module wdg.deform-2
 * @see module:$
 * @see module:webgl.program
 * @see module:canvas
 * @see module:dom

 */
});