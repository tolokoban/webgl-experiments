"use strict";

WebGL.fetchAssets({
  wallVert: "wall.vert",
  wallFrag: "wall.frag",
  wallTexture: "../wall.jpg"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var cave = new Cave( Caves[0] );
  var wallPainter = new WallPainter( gl, cave, assets.wallTexture );
  
  gl.clearColor( 0, 0, 0, 1 );
  function anim( time ) {
    window.requestAnimationFrame( anim );
    gl.clear( gl.COLOR_BUFFER_BIT );
    wallPainter.draw( time );
  }
  window.requestAnimationFrame( anim );
});
