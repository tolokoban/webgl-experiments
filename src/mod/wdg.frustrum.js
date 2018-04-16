"use strict";

module.exports = require("draw")(function() {
  this
    .setColor( this.ORANGE )
    .fillQuad( -.5, +.15, -.5, -.15, +.5, -.45, +.5, +.45 )
    .setColor( "#000" )
    .setLine( .5 )
    .drawLine( -1, 0, .9, 0 )
    .drawLine( -1, -.5, -1, .5 )
    .setColor( this.BLUE )
    .setLine( 4 )
    .drawLine( -1, 0, 1, .6 )
    .drawLine( -1, 0, 1, -.6 )
    .setColor( "#000" )
    .dot( -1, 0, "O", "R" )
    .dot( -.5, 0, "N", "TR" )
    .dot( .5, 0, "F", "TL" )
    .dot( -.5, .15, "A", "BR" )
    .dot( .5, .45, "B", "BL" )
    .setColor( this.ORANGE )
    .txt( "-Z", .9, 0, "L" )
    .txt( "Y", -1, .5, "B" )
    .txt( "-Y", -1, -.5, "T" )
  ;
});
