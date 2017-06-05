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