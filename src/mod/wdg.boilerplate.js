"use strict";

module.exports = require("draw")(function(args) {
  var coords = [
      -0.7, +0.0,  // A
      +0.0, +0.8,  // B
      +0.7, +0.0,  // C

      -0.6, -0.8,  // D
      +0.0, -0.8,  // E
      -0.6, +0.0,  // F
      +0.0, -0.3,  // G
      +0.6, +0.0,  // H
      +0.2, -0.3,  // I
      +0.6, -0.8,  // J
      +0.2, -0.8   // K
  ];

  var xA = coords[0], yA = coords[1];
  var xB = coords[2], yB = coords[3];
  var xC = coords[4], yC = coords[5];
  var xD = coords[6], yD = coords[7];
  var xE = coords[8], yE = coords[9];
  var xF = coords[10], yF = coords[11];
  var xG = coords[12], yG = coords[13];
  var xH = coords[14], yH = coords[15];
  var xI = coords[16], yI = coords[17];
  var xJ = coords[18], yJ = coords[19];
  var xK = coords[20], yK = coords[21];

  this
    .axes()
    .setColor("#F70")
    .fillTri( xA, yA, xB, yB, xC, yC )
    .setColor("#28F")
    .fillTri( xD, yD, xE, yE, xF, yF )
    .setColor("#3AF")
    .fillTri( xE, yE, xF, yF, xG, yG )
    .setColor("#28F")
    .fillTri( xF, yF, xG, yG, xH, yH )
    .setColor("#3AF")
    .fillTri( xG, yG, xH, yH, xI, yI )
    .setColor("#28F")
    .fillTri( xH, yH, xI, yI, xJ, yJ )
    .setColor("#3AF")
    .fillTri( xI, yI, xJ, yJ, xK, yK );

  this
    .setColor("#000")
    .dot( xA, yA, "A(" + xA + "," + yA + ")", "RT" )
    .dot( xB, yB, "B(" + xB + "," + yB + ")", "B" )
    .dot( xC, yC, "C(" + xC + "," + yC + ")", "LT" )
    .dot( xD, yD, "D(" + xD + "," + yD + ")", "TR" )
    .dot( xE, yE, "E(" + xE + "," + yE + ")", "RB" )
    .dot( xF, yF, "F(" + xF + "," + yF + ")", "TL" )
    .dot( xG, yG, "G(" + xG + "," + yG + ")", "R" )
    .dot( xH, yH, "H(" + xH + "," + yH + ")", "RB" )
    .dot( xI, yI, "I(" + xI + "," + yI + ")", "L" )
    .dot( xJ, yJ, "J(" + xJ + "," + yJ + ")", "TL" )
    .dot( xK, yK, "K(" + xK + "," + yK + ")", "T" );
});
