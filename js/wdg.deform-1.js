/** @module wdg.deform-1 */require( 'wdg.deform-1', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "uniform float uniTime;\nuniform float uniDelay;\nuniform float uniAngle;\n\nattribute float attRadius;\nattribute float attAngle;\nattribute float attLevel;\n\n// Pour faire un léger dégradé dans le fragment shader.\nvarying float varBrightness;\n\nvoid main() {\n  // Temps qui tient compte du décalage par level.\n  float t = uniTime - uniDelay * attLevel;\n  // Angle max d'inclinaison entre deux niveaux.\n  float a = radians( uniAngle ) * 0.1;\n  // Calculer en fonction du temps l'angle entre deux\n  // triangles consécutifs.\n  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);\n  // Plus le triangle à un level élevé, plus il est petit.\n  float scale = 1.0 / sqrt( 1.0 + attLevel );\n  // Coordonnées du centre du triangle de la base.\n  float xc = -0.5;\n  float yc = -0.7;\n  \n  int level = int( attLevel );\n  // A chaque niveau supplémentaire,\n  // l'angle s'incline un peu plus.\n  float angle = tilt - 0.05;\n  for( int i = 1 ; i < 10 ; i++ ) {\n    // Condition d'arrêt.\n    if ( i > level ) break;\n    // Calculer les coordonnées du centre du triangle.\n    yc += 0.4 * scale * cos( angle );\n    xc += 0.4 * scale * sin( angle );\n    // Incliner un peu plus pour le niveau suivant.\n    angle += tilt;\n  }\n  // Coordonnées du vertex dans l'espace de WebGL.\n  float x = scale * attRadius * cos( attAngle - angle );\n  float y = scale * attRadius * sin( attAngle - angle );\n  \n  gl_Position = vec4( \n    xc + x,\n    yc + y,\n    0, 1 \n  );\n  if (attLevel == 9.0) {\n    // Le dernier triangle est de couleur unie.\n    varBrightness = 0.0;\n  } else {\n    // Vaut 0 pour les vertex du bas du triangle\n    // et 1 pour le sommet.\n    // Cela donne l'effer d'une ombre.\n    varBrightness = sin( attAngle );\n  }\n}\n",
  "frag": "precision mediump float;\n\nvarying float varBrightness;\n\nconst vec4 COLOR_TOP = vec4(98.0 / 255.0, 110.0 / 255.0, 48.0 / 255.0, 1);\nconst vec4 COLOR_BOTTOM = vec4(193.0 / 255.0, 190.0 / 255.0, 145.0 / 255.0, 1);\n\nvoid main() {\n  gl_FragColor = mix( COLOR_BOTTOM, COLOR_TOP, varBrightness );\n}\n"};
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
      // attRadius, attAngle, attLevel.
      0.75, 0, level,              // A droite.
      0.5, Math.PI * 0.5, level,   // En haut.
      0.75, Math.PI, level         // A gauche.
    );
  }
  attributes = new Float32Array( attributes );
  // #(attribs)

  this.prg.use();

  var buf = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buf );
  gl.bufferData( gl.ARRAY_BUFFER, attributes, gl.STATIC_DRAW );

  var bpe = attributes.BYTES_PER_ELEMENT;
  var stride = 3 * bpe;
  var attRadius = this.prg.attribs.attRadius.location;
  gl.enableVertexAttribArray( attRadius );
  gl.vertexAttribPointer( attRadius, 1, gl.FLOAT, false, stride, 0 * bpe );
  var attAngle = this.prg.attribs.attAngle.location;
  gl.enableVertexAttribArray( attAngle );
  gl.vertexAttribPointer( attAngle, 1, gl.FLOAT, false, stride, 1 * bpe );
  var attLevel = this.prg.attribs.attLevel.location;
  gl.enableVertexAttribArray( attLevel );
  gl.vertexAttribPointer( attLevel, 1, gl.FLOAT, false, stride, 2 * bpe );

  this.vertexCount = LEVELS * 3;

  this.uniTime = gl.getUniformLocation( this.prg.program, "uniTime" );
  this.uniDelay = gl.getUniformLocation( this.prg.program, "uniDelay" );
  this.uniAngle = gl.getUniformLocation( this.prg.program, "uniAngle" );
  
  resolve();
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
  
  gl.drawArrays( gl.TRIANGLES, 0, this.vertexCount );
}
// #(render)


  
module.exports._ = _;
/**
 * @module wdg.deform-1
 * @see module:$
 * @see module:webgl.program
 * @see module:canvas
 * @see module:dom

 */
});