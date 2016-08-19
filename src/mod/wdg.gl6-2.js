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
      color = createVividColor();
      datAttributes[6 * k + 3] = color.r;
      datAttributes[6 * k + 4] = color.g;
      datAttributes[6 * k + 5] = color.b;
      datIndexes[k] = k;
      ang1 = .2 * Math.PI + (.6 * k * Math.PI / (count - axe - 1));
      ang2 = 8.7 * k * Math.PI / (count - axe - 1);
      z = Math.cos(ang1);
      radius = Math.sin(ang1);
      x = radius * Math.cos(ang2);
      y = radius * Math.sin(ang2);
      initialVertices.push(x, y, z);
    }
    // Ajouter l'axe central.
    for (k = count - axe; k < count; k++) {
      color = createVividColor();
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
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);

  function render(time) {
    window.requestAnimationFrame( render );

    var ang1 = time / 1766.781248;
    var c1 = Math.cos( ang1 );
    var s1 = Math.sin( ang1 );

    var ang2 = time / 1979.998511;
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

    datIndexes.sort(function( i, j ) {
      return datAttributes[6 * j + 2] - datAttributes[6 * i + 2];
    });

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