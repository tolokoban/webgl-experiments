"use strict";

WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");
  
  var prg = new WebGL.Program( gl, assets );
  var vertices = new Float32Array([
    0, 1, 1, 0.4667, 0,
    0, .2, 1, 0.4667, 0,
    90, .2, 1, 0.4667, 0,
    
    90, 1, 0.1333, 0.5333, 1,
    90, .2, 0.1333, 0.5333, 1,
    180, .2, 0.1333, 0.5333, 1,
    
    180, 1, 1, 0.4667, 0,
    180, .2, 1, 0.4667, 0,
    270, .2, 1, 0.4667, 0,
    
    270, 1, 0.1333, 0.5333, 1,
    270, .2, 0.1333, 0.5333, 1,
    360, .2, 0.1333, 0.5333, 1,    
  ]);

  var buff = WebGL.fillArrayBuffer( gl, vertices );  
  prg.bindAttribs( buff, "attAngle", "attRayon", "attRouge", "attVert", "attBleu" );

  gl.clearColor( .8, .8, .8, 1 );
  gl.clear( gl.COLOR_BUFFER_BIT );
  
  prg.use();
  function anim( time ) {
    requestAnimationFrame( anim );
    prg.$uniTime = time;
    gl.drawArrays( gl.TRIANGLES, 0, 12 );
  }

  anim();
});
