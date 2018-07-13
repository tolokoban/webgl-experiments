"use strict";

WebGL.fetchAssets({
  marilyn: "marilyn.jpg",
  vert: "marilyn.vert",
  frag: "marilyn.frag"
}).then(function( assets ) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");
  gl.clearColor( 0, 0, 0, 1 );

  var random = generateRandomArray();
  var prg = new WebGL.Program( gl, { vert: assets.vert, frag: assets.frag });
  var buff = WebGL.fillArrayBuffer( gl, new Float32Array([ 0, 0, 1, 0, 0, 1, 1, 1 ]));
  var texture = createTexture( gl, assets.marilyn );

  function anim( time ) {
    window.requestAnimationFrame( anim );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var size = Math.min( width, height ) > 639 ? 256 : 128;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    gl.viewport(0, 0, width, height);

    var x, y, k = 0;
    for( y = 0; y < height ; y += size ) {
      for( x = 0; x < width ; x += size ) {
        prg.$uniTime = time;
        prg.$uniWidth = width;
        prg.$uniHeight = height;
        prg.$uniX = x;
        prg.$uniY = y;
        prg.$uniSize = size;
        prg.$uniRnd1 = random[k++];
        prg.$uniRnd2 = random[k++];
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, texture );
        prg.$uniTexture = 0;
        prg.bindAttribs( buff, "attX", "attY" );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
      }
    }
  }

  window.requestAnimationFrame( anim );
});



function generateRandomArray() {
  var count = 500;
  var result = [];
  while( count --> 0 ) {
    result.push( Math.random() );
  }
  return result;
}


function createTexture( gl, img ) {
  var texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
  // On charge l'image dans la texture de la carte graphique.
  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );
  return texture;
}
