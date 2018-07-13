"use strict";

WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");
  
  var prg = new WebGL.Program( gl, assets );
  var vertices = new Float32Array([
      -0.7, +0.0,  // A
      +0.0, +0.8,  // B
      +0.7, +0.0,  // C
    //------------
      -0.6, -0.8,  // D
      +0.0, -0.8,  // E
      -0.6, +0.0,  // F
      +0.0, -0.3,  // G
      +0.6, +0.0,  // H
      +0.2, -0.3,  // I
      +0.6, -0.8,  // J
      +0.2, -0.8   // K
  ]);

  var buff = WebGL.fillArrayBuffer( gl, vertices );  
  prg.bindAttribs( buff, "x", "y" );

  gl.clearColor( .8, .9, .8, 1 );
  gl.clear( gl.COLOR_BUFFER_BIT );
  
  // Le toît.
  prg.$color = new Float32Array([ 1, 0.4667, 0 ]);
  gl.drawArrays( gl.TRIANGLES, 0, 3 );
  // La façade.
  prg.$color = new Float32Array([ 0.1333, 0.5333, 1 ]);
  gl.drawArrays( gl.TRIANGLE_STRIP, 3, 8 );
});
