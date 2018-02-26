"use strict";

module.exports = require("draw")(function() {
  var xA1 = -1, yA1 = -1;
  var xB1 = +1, yB1 = -1;
  var xC1 = +1, yC1 = +1;
  var xD1 = -1, yD1 = +1;
  var xA2 = 0.6 * xA1, yA2 = 0.6 * yA1;
  var xB2 = 0.6 * xB1, yB2 = 0.6 * yB1;
  var xC2 = 0.6 * xC1, yC2 = 0.6 * yC1;
  var xD2 = 0.6 * xD1, yD2 = 0.6 * yD1;
  var xA3 = 0.6 * xA2, yA3 = 0.6 * yA2;
  var xB3 = 0.6 * xB2, yB3 = 0.6 * yB2;
  var xC3 = 0.6 * xC2, yC3 = 0.6 * yC2;
  var xD3 = 0.6 * xD2, yD3 = 0.6 * yD2;
  
  this
    .setColor("#08f")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#08e")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#07d")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#07c")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#06b")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#06a")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#059")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#058")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#047")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#046")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#035")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#034")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#023")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#022")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#011")
    .fillTri(xA1, yA1, xA2, yA2, xB1, yB1)
    .setColor("#001")
    .dot(xA1, yA1);
});
