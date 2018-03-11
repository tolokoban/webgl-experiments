"use strict";

// Nombre de points pour faire un cercle.
var SECTEURS = 12;
// Nombre de cercles de notre tunnel.
var PROFONDEUR = 45;


WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag",
  texture: "../tile.jpg"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var img = document.createElement("img");
  img.setAttribute("crossOrigin", "anonymous");
  img.setAttribute("src", "../tile.jpg");
  document.body.appendChild( img );
  
  var prg = new WebGL.Program( gl, {
    vert: assets.vert,
    frag: assets.frag
  });
  var vertices = new Float32Array( getVertices() );
  console.info("[script] vertices=", vertices);
  var elements = new Uint16Array( getElements() );

  WebGL.fillElementBuffer( gl, elements );
  var buff = WebGL.fillArrayBuffer( gl, vertices );
  prg.bindAttribs( buff, "angle", "depth" );

  //#(bindtexture)
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, makeTexture( gl, assets.texture ) );
  prg.$texture = 0;
  //#(bindtexture)

  gl.enable( gl.DEPTH_TEST );
  gl.depthFunc( gl.GEQUAL );
  gl.clearDepth( -1 );

  gl.clearColor( 0.1333, 0.5333, 1, 1 );

  function anim( time ) {
    requestAnimationFrame( anim );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLE_STRIP, elements.length, gl.UNSIGNED_SHORT, 0 );
  }
  requestAnimationFrame( anim );
});


//#(maketexture)
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
//#(maketexture)

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
