"use strict";

WebGL.fetchAssets({
  boulderTexture: "../img/row-boulder.png",
  exitTexture: "../img/exit.png",
  diamTexture: "../img/row-diam.png",
  heroTexture: "../img/row-walk.png",
  exploTexture: "../img/row-explo.png",
  groundTexture: "../img/ground.png"
}).then(function(assets) {
  var canvas = TextureAggregator( assets );
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  canvas.style.background = "#444";
  document.body.appendChild( canvas );
});


//#(ProcessHero)
