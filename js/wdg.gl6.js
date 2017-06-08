/** @module wdg.gl6 */require( 'wdg.gl6', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vertex": "attribute vec3 attPosition;\r\nattribute vec3 attColor;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nvoid main() {\r\n  float z = attPosition.z;\r\n  // Dans une projection 3D, les points éloignés de la caméra\r\n  // paraissent plus petits et plus proches les uns des autres.\r\n  // Cette variable permet de créer cet effet.\r\n  float depth = 3.0 / (2.0 - z);\r\n  // On utilise la 4ème composant `w` pour donner un effet de profndeur.\r\n  // En effet, les coordonnées seront multipliées/divisées par `depth`.\r\n  gl_Position = vec4(attPosition.xy, z, depth);\r\n\r\n  // La taille du point dépend aussi de la profondeur.\r\n  gl_PointSize = 150.0 / depth;\r\n  varPosition = attPosition;\r\n  varColor = attColor;\r\n}\r\n",
  "fragment": "precision mediump float;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nconst vec3 WHITE = vec3(1, 1, 1);\r\n\r\nvoid main() {\r\n  // Calculons la distance du fragment courant\r\n  // au centre du point.\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  // On ne calcule pas la racine carré pour gagner du temps.\r\n  float r = x*x + y*y;\r\n\r\n  x = gl_PointCoord.x;\r\n  y = gl_PointCoord.y;\r\n\r\n  // 0.25 = 0.5 * 0.5\r\n  if (r > 0.25) {\r\n    // Si on est à l'extérieur du cercle de rayon 0.5,\r\n    // on ignore le fragment.\r\n    discard;\r\n  } else if (r > .2 ) {\r\n    // Au delà d'un certain rayon, on met une couleur fixe\r\n    // qui nous sert de liseré.\r\n    gl_FragColor = vec4(varColor * 0.5, 1.0);\r\n  } else {\r\n    // Petit effet de dégradé.\r\n    vec3 col = x * varColor + y * WHITE.rgb;\r\n    gl_FragColor.a = 1.0;\r\n    gl_FragColor.rgb = mix(WHITE, varColor, r * 5.0);\r\n  }\r\n  // La luminosité varie avec la profondeur du point.\r\n  // En `z = 0.0`, la boule est noire.\r\n  float coeff = (1.0 - varPosition.z) * 0.5;\r\n  gl_FragColor.rgb = coeff * gl_FragColor.rgb;\r\n}\r\n"};
  // https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var COLORS = [
  [2,0,0], [0,2,0], [0,0,2],
  [2,1,0], [2,0,1], [1,2,0], [0,2,1], [1,0,2], [0,1,2],
  [0,2,2], [2,0,2], [2,2,0]
];

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
  var gl = canvas.getContext( "webgl", {
    alpha: false,
    depth: this.zbuffer,
    stencil: false,
    antialias: false,    
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true
  } );
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
  shuffle[COLORS];
  var color;
  for (var k = 0; k < count; k++) {
    color = COLORS[k];
    verticesData[6 * k + 3] = color[0] * 0.5;
    verticesData[6 * k + 4] = color[1] * 0.5;
    verticesData[6 * k + 5] = color[2] * 0.5;
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

function shuffle( arr ) {
  var i, k, tmp;
  for( i=0 ; i<arr.length ; i++) {
    k = Math.floor(Math.random(arr.length));
    tmp = arr[k];
    arr[k] = arr[i];
    arr[i] = tmp;
  }
  return arr;
}

  
module.exports._ = _;
/**
 * @module wdg.gl6
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding

 */
});