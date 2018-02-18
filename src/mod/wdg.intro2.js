"use strict";

module.exports = require("draw")(function() {
  var x1 = -.7, y1 = -.5;
  var x2 = -.1, y2 = .7;
  var x3 = .5, y3 = -.8;
  
  this
    .axes()
    .setColor("orange")
    .fillTri(x1,y1,x2,y2,x3,y3)
    .setColor("#000")
    .dot(x1,y1, "A (" + x1 + "," + y1 + ")", "B")
    .dot(x2,y2, "B (" + x2 + "," + y2 + ")", "B")
    .dot(x3,y3, "C (" + x3 + "," + y3 + ")", "T");
});
