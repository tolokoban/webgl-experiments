"use strict";

// Nombre de points pour faire un cercle.
var SECTEURS = 36;
// Nombre de cercles de notre tunnel.
var PROFONDEUR = 45;


WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag",
  texture: "../tile.jpg"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var prg = new WebGL.Program( gl, {
    vert: assets.vert,
    frag: assets.frag
  });
  var vertices = new Float32Array( getVertices() );
  var elements = new Uint16Array( getElements() );

  WebGL.fillElementBuffer( gl, elements );
  var buff = WebGL.fillArrayBuffer( gl, vertices );
  prg.bindAttribs( buff, "angle", "depth" );

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, makeTexture( gl, assets.texture ) );
  prg.$texture = 0;

  gl.enable( gl.DEPTH_TEST );
  gl.depthFunc( gl.GEQUAL );
  gl.clearDepth( -1 );

  gl.clearColor( 0, 0, 0, 1 );

  function anim( time ) {
    requestAnimationFrame( anim );
    prg.$time = time;
    prg.$width = canvas.clientWidth;
    prg.$height = canvas.clientHeight;
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLE_STRIP, elements.length, gl.UNSIGNED_SHORT, 0 );
  }
  requestAnimationFrame( anim );
});


function makeTexture( gl, img ) {
  console.info("[script] img=", img);
  var texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );
  
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );

  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );

  return texture;
}

function getVertices() {
  var vertices = [];
  var p, s;

  for( p=0; p<PROFONDEUR; p++ ) {
    for( s=0; s<=SECTEURS; s++ ) {
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
    offset = p * (SECTEURS + 1);
    for( s=0; s<(SECTEURS + 1); s++ ) {
      elements.push( offset + s, offset + s + (SECTEURS + 1) );
    }
    elements.push( offset );
  }
  elements.push( offset + (SECTEURS + 1) );

  return elements;
}
