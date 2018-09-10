"use strict";

WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag"
}).then(function(assets) {
  var canvas = document.createElement( "canvas" );
  document.body.appendChild( canvas );
  var gl = canvas.getContext("webgl", {});
  
  var prg = new WebGL.Program( gl, assets );
  var vertices = new Float32Array([
      -1, -1, 1, 0, 0,
      +1, -1, 0, 1, 0,
      -1, +1, 0, 0, 0,
      +1, +1, 0, 0, 1
  ]);

  var buff = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buff );
  gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );  

  prg.bindAttribs( buff, "x", "y", "r", "g", "b" );
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
});
