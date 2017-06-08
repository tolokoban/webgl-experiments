/** @module wdg.gl6-2 */require( 'wdg.gl6-2', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
<<<<<<< HEAD
  "vertex": "attribute vec3 attPosition;\nattribute vec3 attColor;\n\nvarying vec3 varPosition;\nvarying vec3 varColor;\n\nvoid main() {\n  float z = attPosition.z;\n  // Dans une projection 3D, les points éloignés de la caméra\n  // paraissent plus petits et plus proches les uns des autres.\n  // Cette variable permet de créer cet effet.\n  float depth = (1.5 - z) / 2.5;\n  gl_Position = vec4(attPosition.xy * depth, z, 1.0);\n\n  // La taille du point dépend aussi de la profondeur.\n  gl_PointSize = 80.0 * depth;\n  varPosition = attPosition;\n  varColor = attColor;\n}\n",
  "fragment": "precision mediump float;\n\nvarying vec3 varPosition;\nvarying vec3 varColor;\n\nconst vec3 WHITE = vec3(1.0, 1.0, 1.0);\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n\n  x = gl_PointCoord.x;\n  y = gl_PointCoord.y;\n\n  // 0.25 = 0.5 * 0.5\n  if (r > 0.25) {\n    // Si on est à l'extérieur du cercle de rayon 0.5,\n    // on place un fragment transparent.\n    discard;\n  } else if (r > .15 ) {\n    // Au delà d'un certain rayon, on met une couleur fixe\n    // qui nous sert de liseré.\n    gl_FragColor = vec4(varColor, 1.0);\n  } else {\n    // Petit effet de dégradé.\n    gl_FragColor = vec4(varColor, 0.5);\n  }\n  // La luminosité varie avec la profondeur du point.\n  // En `z = 0.0`, la boule est noire.\n  gl_FragColor = vec4( gl_FragColor.rgb * (1.0 - varPosition.z) / 2.0, gl_FragColor.a);\n}\n"};
=======
  "vertex": "attribute vec3 attPosition;\r\nattribute vec3 attColor;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nvoid main() {\r\n  float z = attPosition.z;\r\n  // Dans une projection 3D, les points éloignés de la caméra\r\n  // paraissent plus petits et plus proches les uns des autres.\r\n  // Cette variable permet de créer cet effet.\r\n  float depth = (1.5 - z) / 2.5;\r\n  gl_Position = vec4(attPosition.xy * depth, z, 1.0);\r\n\r\n  // La taille du point dépend aussi de la profondeur.\r\n  gl_PointSize = 80.0 * depth;\r\n  varPosition = attPosition;\r\n  varColor = attColor;\r\n}\r\n",
  "fragment": "precision mediump float;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nconst vec3 WHITE = vec3(1.0, 1.0, 1.0);\r\n\r\nvoid main() {\r\n  // Calculons la distance du fragment courant\r\n  // au centre du point.\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  // On ne calcule pas la racine carré pour gagner du temps.\r\n  float r = x*x + y*y;\r\n\r\n  x = gl_PointCoord.x;\r\n  y = gl_PointCoord.y;\r\n\r\n  // 0.25 = 0.5 * 0.5\r\n  if (r > 0.25) {\r\n    // Si on est à l'extérieur du cercle de rayon 0.5,\r\n    // on place un fragment transparent.\r\n    discard;\r\n  } else if (r > .15 ) {\r\n    // Au delà d'un certain rayon, on met une couleur fixe\r\n    // qui nous sert de liseré.\r\n    gl_FragColor = vec4(varColor, 1.0);\r\n  } else {\r\n    // Petit effet de dégradé.\r\n    gl_FragColor = vec4(varColor, 0.5);\r\n  }\r\n  // La luminosité varie avec la profondeur du point.\r\n  // En `z = 0.0`, la boule est noire.\r\n  gl_FragColor = vec4( gl_FragColor.rgb * (1.0 - varPosition.z) / 2.0, gl_FragColor.a);\r\n}\r\n"};
>>>>>>> 0277ca951134712cdb86243b1d949f854aaae6ee
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

  DB.propBoolean( this, 'sort' );

  opts = DB.extend({
    width: 640,
    height: 480,
    sort: false
  }, opts, this);

  window.setTimeout( start.bind( this, canvas ), 20 );
};

function start( canvas ) {
  var that = this;
  
  // #(init)
  var gl = canvas.getContext( "webgl", {
    alpha: false,
    depth: true,
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
  var bufAttributes = gl.createBuffer();
  // Définir ce buffer comme le buffer actif.
  gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);
  // Les attributs des vertex.
  var count = 56;
  var datAttributes = new Float32Array(6 * count);
  // Copier des données dans le buffer actif.
  gl.bufferData(gl.ARRAY_BUFFER, datAttributes, gl.STATIC_DRAW);
  var initialVertices = [];
  // Index que l'on pourra trier.
  var datIndexes = new Uint16Array(count);
  var bufIndexes = gl.createBuffer();
  gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, bufIndexes );
  gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, datIndexes, gl.STATIC_DRAW );

  // Initialiser les attributs et les index.
  (function(){
    var color, k, x, y, z, radius, ang1, ang2;
    // Nombre de boules dans l'axe central.
    var axe = 6;
    for (k = 0; k < count - axe; k++) {
      color = createVividColor( k );
      datAttributes[6 * k + 3] = color.r;
      datAttributes[6 * k + 4] = color.g;
      datAttributes[6 * k + 5] = color.b;
      datIndexes[k] = k;
      ang1 = 0.2 * Math.PI + (0.6 * k * Math.PI / (count - axe - 1));
      ang2 = 8.7 * k * Math.PI / (count - axe - 1);
      z = Math.cos(ang1);
      radius = Math.sin(ang1);
      x = radius * Math.cos(ang2);
      y = radius * Math.sin(ang2);
      initialVertices.push(x, y, z);
    }
    // Ajouter l'axe central.
    for (k = count - axe; k < count; k++) {
      color = createVividColor( k );
      datIndexes[k] = k;
      datAttributes[6 * k + 3] = color.r;
      datAttributes[6 * k + 4] = color.g;
      datAttributes[6 * k + 5] = color.b;
      initialVertices.push(0, 0, 2 * (k - count + axe) / (axe - 1) - 1);
    }
  })();
  // #(vertices)

  // #(attributes)
  var bpe = datAttributes.BYTES_PER_ELEMENT;
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

  // #(blend)
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  // #(blend)

  // #(rendering)
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);

  function render(time) {
    window.requestAnimationFrame( render );

    var ang1 = time / 3766.781248;
    var c1 = Math.cos( ang1 );
    var s1 = Math.sin( ang1 );

    var ang2 = time / 3979.998511;
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
      datAttributes[6 * k + 0] = x * m11 + y * m12 + z * m13;
      datAttributes[6 * k + 1] = x * m21 + y * m22 + z * m23;
      datAttributes[6 * k + 2] = x * m31 + y * m32 + z * m33;
    }

    if (that.sort) {
      datIndexes.sort(function( i, j ) {
        return datAttributes[6 * j + 2] - datAttributes[6 * i + 2];
      });
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);
    gl.bufferData(gl.ARRAY_BUFFER, datAttributes, gl.STATIC_DRAW);

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, bufIndexes );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, datIndexes, gl.STATIC_DRAW );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.POINTS, count, gl.UNSIGNED_SHORT, 0);
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

var COLORS = [
  [2,0,0], [0,2,0], [0,0,2],
  [2,1,0], [2,0,1], [1,2,0], [0,2,1], [1,0,2], [0,1,2],
  [0,2,2], [2,0,2], [2,2,0],
  [2,2,2]
];

function createVividColor(idx) {
  idx = (idx * 17 + 43) % COLORS.length;
  var color = COLORS[idx];
  return {
    r: color[0] * 0.5, 
    g: color[1] * 0.5, 
    b: color[2] * 0.5
  };
  
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

  
module.exports._ = _;
/**
 * @module wdg.gl6-2
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding

 */
});