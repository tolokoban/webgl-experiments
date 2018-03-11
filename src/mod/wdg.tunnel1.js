"use strict";

module.exports = require("draw")(function() {
  var xx = [];
  var yy = [];
  var N = 3;   // Nb de points par cercle.
  var D = 3;   // Profondeur : nombre de cercles.
  var R = 1;   // Rayon du cercle le plus proche.
  var F = 0.5; // Facteur de réduction du rayon à chaque cercle.
  var n, d;
  var ang;

  for( d=0 ; d<D ; d++ ) {
    for( n=0 ; n<N ; n++ ) {
      ang = Math.PI * 2 * n / N;
      xx.push( R * Math.sin( ang ) );
      yy.push( R * Math.cos( ang ) );
    }
    R *= F;
  }

  var elements = getElements( N, D );
  console.log( elements.join(" | ") );

  for( var k=0 ; k<elements.length - 2 ; k++ ) {
    var color = mix( [200, 100, 0], [255,255,255], k / elements.length );
    console.info("[wdg.tunnel1] color=", color);
    this
      .setColor( color )
      .fillTri(
        xx[elements[k]], yy[elements[k]],
        xx[elements[k + 1]], yy[elements[k + 1]],
        xx[elements[k + 2]], yy[elements[k + 2]]
      );
  }

  this.setColor("#000");
  xx.forEach(function (x, idx) {
    var y = yy[idx];
    this.dot( x, y, "" + idx, "B" );
  }, this);

});


function getElements(N, D) {
  var elements = [];
  var offset;
  var p, s;

  for( p=0; p<D - 1; p++ ) {
    offset = p * N;
    for( s=0; s<N; s++ ) {
      elements.push( offset + s, offset + s + N );
    }
    elements.push( offset );
  }
  elements.push( offset + N );

  return elements;
}


function mix( c1, c2, a ) {
  if( !Array.isArray( c1 ) ) c1 = [c1];
  if( !Array.isArray( c2 ) ) c2 = [c2];
  var result = [];
  c1.forEach(function (v1, idx) {
    var v2 = c2[idx];
    result.push( Math.floor( (1 - a) * v1 + a * v2 ) );
  });

  var R = result[0].toString(16);
  if( R.length < 2 ) R = "0" + R;
  var G = result[1].toString(16);
  if( G.length < 2 ) G = "0" + G;
  var B = result[2].toString(16);
  if( B.length < 2 ) B = "0" + B;

  return "#" + R + G + B;
}
