"use strict";

// Nombre de points pour faire un cercle.
var SECTEURS = 36;
// Nombre de cercles de notre tunnel.
var PROFONDEUR = 45;


WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");
  
  var prg = new WebGL.Program( gl, assets );
  var vertices = new Float32Array( getVertices() );
  var elements = new Uint16Array( getElements() );

  console.info("[tunnel/script] vertices=", vertices);
  console.info("[tunnel/script] elements=", elements);
  
  WebGL.fillElementBuffer( gl, elements );  
  var buff = WebGL.fillArrayBuffer( gl, vertices );  
  prg.bindAttribs( buff, "angle", "depth" );

  gl.enable( gl.DEPTH_TEST );
  gl.depthFunc( gl.GEQUAL );
  gl.clearDepth( -1 );
  
  gl.clearColor( 0.1333, 0.5333, 1, 1 );
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  
  prg.$color = new Float32Array([ 1, 0.4667, 0 ]);
  gl.drawElements( gl.TRIANGLE_STRIP, elements.length, gl.UNSIGNED_SHORT, 0 );
});


function getVertices() {
  var vertices = [];
  var p, s;

  for( p=0; p<PROFONDEUR; p++ ) {
    for( s=0; s<SECTEURS; s++ ) {
      vertices.push( Math.PI * 2 * s / SECTEURS, p );
    }
  }

  return vertices;
}


function getElements() {
  var elements = [];
  var offset;
  var p, s;

  for( p=0; p<PROFONDEUR - 1; p++ ) {
    offset = p * SECTEURS;
    for( s=0; s<SECTEURS; s++ ) {
      elements.push( offset + s, offset + s + SECTEURS );
    }
    elements.push( offset );
  }
  elements.push( offset + SECTEURS );

  return elements;
}
