"use strict";

WebGL.fetchAssets({
  coordsVert: "../coords.vert",
  wallVert: "wall.vert",
  wallFrag: "wall.frag",
  wallTexture: "../wall.jpg",
  groundVert: "ground.vert",
  groundFrag: "ground.frag",
  groundTexture: "../img/fill.png"
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
  
  var groundPainter = new GroundPainter( env );
  var wallPainter = new WallPainter( env );
  
  gl.clearColor( 0, 0, 0, 1 );
  gl.enable( gl.DEPTH_TEST );
  gl.clearDepth( 0 );
  gl.depthFunc( gl.GREATER );
  
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

    env.z = 0.5;
    groundPainter.draw( env );
    env.z = 0.4;
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
