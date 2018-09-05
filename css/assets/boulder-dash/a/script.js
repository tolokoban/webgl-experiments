"use strict";

WebGL.fetchAssets({
  wallVert: "wall.vert",
  wallFrag: "wall.frag",
  coordsVert: "../coords.vert",
  wallTexture: "../wall.jpg"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var cave = new Cave( Caves[0] );
  var env = {
    gl: gl,    
    cave: cave,
    assets: assets,
    x: 0,
    y: 0,
    z: 0,
    w: 1
  };
  attachMouseEvents( canvas, env );
  
  var wallPainter = new WallPainter( env );
  
  gl.clearColor( 0, 0, 0, 1 );
  function anim( time ) {
    window.requestAnimationFrame( anim );

    env.time = time;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    env.width = w;
    env.height = h;
    env.w = Math.min(w, h) < 481 ? 2 : 1;
    gl.viewport(0, 0, w, h);
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    
    wallPainter.draw( env );
  }
  window.requestAnimationFrame( anim );
});


function attachMouseEvents( canvas, env ) {
  function move(x, y) {
    env.x = env.cave.cols * x / canvas.clientWidth;
    env.y = env.cave.rows * y / canvas.clientHeight;
  }
  
  canvas.addEventListener("mousemove", function(evt) {
    move( evt.clientX, evt.clientY );
  });
}
