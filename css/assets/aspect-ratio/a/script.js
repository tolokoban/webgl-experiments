"use strict";

WebGL.fetchAssets({
  vert: "shader.vert",
  frag: "shader.frag"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");
  
  var prg = new WebGL.Program( gl, assets );
  var vertices = new Float32Array([
    0, 1, 1/2, 0.4667/2, 0,
    0, .2, 1, 0.4667, 0,
    90, .5, 1, 0.4667, 0,
    
    90, 1, 0.1333/2, 0.5333/2, 1/2,
    90, .2, 0.1333, 0.5333, 1,
    180, .5, 0.1333, 0.5333, 1,
    
    180, 1, 1/2, 0.4667/2, 0,
    180, .2, 1, 0.4667, 0,
    270, .5, 1, 0.4667, 0,
    
    270, 1, 0.1333/2, 0.5333/2, 1/2,
    270, .2, 0.1333, 0.5333, 1,
    360, .5, 0.1333, 0.5333, 1,    
  ]);

  var buff = WebGL.fillArrayBuffer( gl, vertices );  
  prg.bindAttribs( buff, "attAngle", "attRayon", "attRouge", "attVert", "attBleu" );

  gl.clearColor( .8, .8, .8, 1 );
  gl.clear( gl.COLOR_BUFFER_BIT );
  
  prg.use();
  function anim( time ) {
    requestAnimationFrame( anim );
    //#(adjust)
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    prg.$uniWidth = w;
    prg.$uniHeight = h;
    gl.viewport(0, 0, w, h);
    //#(adjust)
    prg.$uniTime = time;
    gl.drawArrays( gl.TRIANGLES, 0, 12 );
  }

  anim();
});
