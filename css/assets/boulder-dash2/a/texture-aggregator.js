"use strict";

window.TextureAggregator = function() {
  function Tinter( img, shift ) {
    // Pour le moment, on ne touche pas à la teinte.
    return img;
  }
  return function( assets, tint ) {
    if( typeof tint === 'undefined' ) tint = {};

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", 1024);
    canvas.setAttribute("height", 384);
    var ctx = canvas.getContext("2d");

    ctx.drawImage( assets.heroTexture, 0, 0 );
    ctx.drawImage( assets.boulderTexture, 0, 64 );
    ctx.drawImage( assets.diamTexture, 0, 128 );
    ctx.drawImage( assets.groundTexture, 0, 192 );
    ctx.drawImage( assets.exitTexture, 80, 192 );
    ctx.drawImage( assets.exploTexture, 512, 192 );
    ctx.drawImage( assets.monsterTexture, 0, 320 );

    // Retourner le héro image par image.
    ctx.scale( -1, 1 );
    for( var k = 0; k < 8; k++ ) {
      ctx.drawImage(
        assets.heroTexture, 64 * k, 0, 64, 64,
        -576 - 64 * k, 0, 64, 64 );
    }

    return canvas;
  };
}();
