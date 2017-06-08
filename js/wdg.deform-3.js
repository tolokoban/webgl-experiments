/** @module wdg.deform-3 */require( 'wdg.deform-3', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "uniform float uniTime;\nuniform float uniDelay;\nuniform float uniAngle;\n\nattribute float attRadius;\nattribute float attAngle;\nattribute float attLevel;\nattribute vec2 attUV;\n\n// Coordonnées dans la texture.\nvarying vec2 varUV;\n\nconst float PI = 3.141592653589793;\nconst float LEVELS = 32.0;\n\nvoid main() {\n  // Temps qui tient compte du décalage par level.\n  float t = uniTime - uniDelay * attLevel;\n  // Angle max d'inclinaison entre deux niveaux.\n  float a = radians( uniAngle );\n  // Calculer en fonction du temps l'angle entre deux\n  // triangles consécutifs.\n  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);\n  // Coordonnées du centre du triangle de la base.\n  float xc = 0.0;\n  float yc = -1.0;\n  \n  int level = int( attLevel );\n  // A chaque niveau supplémentaire,\n  // l'angle s'incline un peu plus.\n  float angle = tilt;\n  for( int i = 1 ; i < 32 ; i++ ) {\n    // Condition d'arrêt.\n    if ( i > level ) break;\n    // Calculer les coordonnées du centre du triangle.\n    yc += cos( angle ) * 2.0 / LEVELS;\n    xc += sin( angle ) * 2.0 / LEVELS;\n    // Incliner un peu plus pour le niveau suivant.\n    angle += tilt;\n  }\n  // Coordonnées du vertex dans l'espace de WebGL.\n  float x = attRadius * cos( attAngle * PI - angle );\n  float y = attRadius * sin( attAngle * PI - angle );\n  \n  gl_Position = vec4( \n    xc + x,   // Aspect ratio\n    yc + y,\n    0, 1 \n  );\n  \n  varUV = attUV;\n}\n",
  "frag": "precision mediump float;\n\nuniform sampler2D uniTexture;\n\nvarying vec2 varUV;\n\nvoid main() {\n  vec4 color = texture2D( uniTexture, varUV );\n  // Si le point est transparent, on ne l'affiche pas.\n  if ( color.a < 0.1 ) discard;\n  gl_FragColor = color;\n}\n"};
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
  },
  booleans: { girafe: false }
} );

var LEVELS = 32;

function init( resolve ) {
  var gl = this.gl;
  $.css( gl.canvas, {
    "background-image": "url(css/wdg.deform-3/background.jpg)",
    "background-size": "100% 100%"
  });
  this.prg = new Program( this.gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  } );

  // #(attribs)
  var attributes = [];
  var level;
  // LEVELS est le nombre de triangles.
  for ( level = 0; level < LEVELS; level++ ) {
    attributes.push(
      // attRadius, attAngle, attLevel, attUV.
      0.18,         0,          level,    0.36, 1 - level / (LEVELS - 1),             
      0.18,         1,          level,    0.00, 1 - level / (LEVELS - 1)
    );
  }
  // Girafe
  for ( level = 0; level < LEVELS; level++ ) {
    attributes.push(
      // attRadius, attAngle, attLevel, attUV.
      0.25,          0,          level,    1.0, 1 - level / (LEVELS - 1),             
      0.25,          1,          level,    0.5, 1 - level / (LEVELS - 1)
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

  this.vertexCount = LEVELS * 2;

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
  image.src = "css/wdg.deform-3/texture.png";
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
  gl.uniform1f( this.uniAngle, this.angle / LEVELS );
  
  // Activer l'uniform relatif à notre texture.
  // On n'a qu'une texture donc on utilise le slot 0.
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.activeTexture( gl.TEXTURE0 );
  gl.bindTexture( gl.TEXTURE_2D, this.texture );
  gl.uniform1i( this.uniTexture, 0 );
  
  
  gl.drawArrays( 
    gl.TRIANGLE_STRIP, 
    this.girafe ? this.vertexCount : 0, 
    this.vertexCount 
  );
}
// #(render)


  
module.exports._ = _;
/**
 * @module wdg.deform-3
 * @see module:$
 * @see module:webgl.program
 * @see module:canvas
 * @see module:dom

 */
});