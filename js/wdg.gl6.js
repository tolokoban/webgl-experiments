/** @module wdg.gl6 */require( 'wdg.gl6', function(exports, module) { var _intl_={"en":{}},_$=require("$").intl;function _(){return _$(_intl_, arguments);}
 // https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl6 = function(opts) {
  var that = this;

  var canvas = $.elem( this, 'canvas' );

  DB.propInteger( this, 'width' )(function(v) {
    canvas.setAttribute( 'width', v );
    canvas.style.width = v + "px";
  });

  DB.propInteger( this, 'height' )(function(v) {
    canvas.setAttribute( 'height', v );
    canvas.style.height = v + "px";
  });

  DB.propBoolean( this, 'zindex' );

  opts = DB.extend({
    width: 640,
    height: 480,
    zbuffer: false
  }, opts, this);

  window.setTimeout( start.bind( this, canvas ), 20 );
};

function start( canvas ) {
  // #(init)
  var gl = canvas.getContext("webgl")
        || canvas.getContext("experimental-webgl");
  // #(init)

  // #(shaders)
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, getVertexShader(gl, GLOBAL['vertex']) );
  gl.attachShader(shaderProgram, getFragmentShader(gl, GLOBAL['fragment']) );
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  // #(shaders)

  // #(vertices)
  // Création d'un buffer dans la carte graphique.
  // Un buffer est un tableau de nombres.
  var verticesBuffer = gl.createBuffer();
  // Définir ce buffer comme le buffer actif.
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  // Les attributs des vertex.
  var count = 6;
  var verticesData = new Float32Array(6 * 6);
  // Copier des données dans le buffer actif.
  gl.bufferData(gl.ARRAY_BUFFER, verticesData, gl.STATIC_DRAW);
  var initialVertices = [
      1,  0,  0,
      -1, 0,  0,
      0,  1,  0,
      0, -1,  0,
      0,  0,  1,
      0,  0, -1
  ];
  // Affecter des couleurs aléatoires.
  var color;
  for (var k = 0; k < count; k++) {
    color = createVividColor();
    verticesData[6 * k + 3] = color.r;
    verticesData[6 * k + 4] = color.g;
    verticesData[6 * k + 5] = color.b;
  }
  // #(vertices)

  // #(attributes)
  var bpe = verticesData.BYTES_PER_ELEMENT;
  var blockSize = 6 * bpe;
  // attPosition
  var attPosition = gl.getAttribLocation(shaderProgram, "attPosition");
  gl.enableVertexAttribArray(attPosition);
  gl.vertexAttribPointer(attPosition, 3, gl.FLOAT, false, blockSize, 0);
  // attColor1
  var attColor = gl.getAttribLocation(shaderProgram, "attColor");
  gl.enableVertexAttribArray(attColor);
  gl.vertexAttribPointer(attColor, 3, gl.FLOAT, false, blockSize, 3 * bpe);
  // #(attributes)

  if (Boolean(this.zbuffer)) {
    // #(zbuffer)
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    // #(zbuffer)
    gl.disable(gl.BLEND);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  } else {
    // #(blend)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    // #(blend)
}

  // #(rendering)
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

  function render(time) {
    var ang1 = time / 566;
    var c1 = Math.cos( ang1 );
    var s1 = Math.sin( ang1 );

    var ang2 = time / 979;
    var c2 = Math.cos( ang2 );
    var s2 = Math.sin( ang2 );

    var m11 = c1;
    var m12 = 0;
    var m13 = s1;
    var m21 = s1 * s2;
    var m22 = c2;
    var m23 = -c1 * s2;
    var m31 = -s1 * c2;
    var m32 = s2;
    var m33 = c1 * c2;
    var x, y, z, X, Y, Z, k;

    for (k = 0; k < count; k++) {
      x = initialVertices[3 * k + 0];
      y = initialVertices[3 * k + 1];
      z = initialVertices[3 * k + 2];
      verticesData[6 * k + 0] = x * m11 + y * m12 + z * m13;
      verticesData[6 * k + 1] = x * m21 + y * m22 + z * m23;
      verticesData[6 * k + 2] = x * m31 + y * m32 + z * m33;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesData, gl.STATIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, count);
    window.requestAnimationFrame( render );
  }
  window.requestAnimationFrame( render );
  // #(rendering)
};


module.exports = WdgGl6;

// #(shader)
function getShader( type, gl, code ) {
  var shader = gl.createShader( type );
  gl.shaderSource( shader, code );
  gl.compileShader( shader );
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log( code );
    console.error("An error occurred compiling the shader: " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

function getFragmentShader( gl, code ) {
  return getShader( gl.FRAGMENT_SHADER, gl, code );
}

function getVertexShader( gl, code ) {
  return getShader( gl.VERTEX_SHADER, gl, code );
}
// #(shader)


function createVividColor() {
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  if (r < g) {
    if (b < r) {
      r = 1;  b = 0;
    } else {
      // r > g et r > b
      r = 1;
      if (g > b) b = 0;
      else g = 0;
    }
  } else {
    // r > g
    if (g > b) {
      r = 1;  b = 0;
    } else {
      // r > g et b > g
      g = 0;
      if (r > b) r = 1;
      else b = 1;
    }
  }

  return { r: r, g: g, b: b };
}


var GLOBAL = {
  "vertex": "attribute vec3 attPosition;\nattribute vec3 attColor;\n\nvarying vec3 varPosition;\nvarying vec3 varColor;\n\nvoid main() {\n  float z = attPosition.z;\n  // Dans une projection 3D, les points éloignés de la caméra\n  // paraissent plus petits et plus proches les uns des autres.\n  // Cette variable permet de créer cet effet.\n  float depth = (2.0 - z) / 3.0;\n  gl_Position = vec4(attPosition.xy * depth, z, 1.0);\n\n  // La taille du point dépend aussi de la profondeur.\n  gl_PointSize = 150.0 * depth;\n  varPosition = attPosition;\n  varColor = attColor;\n}\n",
  "fragment": "precision mediump float;\n\nvarying vec3 varPosition;\nvarying vec3 varColor;\n\nconst vec4 WHITE = vec4(1.0, 1.0, 1.0, 0.5);\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n\n  x = gl_PointCoord.x;\n  y = gl_PointCoord.y;\n\n  // 0.25 = 0.5 * 0.5\n  if (r > 0.25) {\n    // Si on est à l'extérieur du cercle de rayon 0.5,\n    // on place un fragment transparent.\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );\n  } else if (r > .2 ) {\n    // Au delà d'un certain rayon, on met une couleur fixe\n    // qui nous sert de liseré.\n    gl_FragColor = vec4(varColor, 1.0);\n  } else {\n    // Petit effet de dégradé.\n    vec3 col = x * varColor + y * WHITE.rgb;\n    gl_FragColor = vec4( col, 1.0 );\n  }\n  // La luminosité varie avec la profondeur du point.\n  // En `z = 0.0`, la boule est noire.\n  float coeff = (3.0 - varPosition.z) / 3.0;\n  gl_FragColor = coeff * gl_FragColor + (1.0 - coeff) * WHITE;\n}\n"};
 
module.exports._ = _;
/**
 * @module wdg.gl6
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.gl6

 */
});