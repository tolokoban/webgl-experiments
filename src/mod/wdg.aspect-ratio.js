"use strict";

module.exports = require("draw")(function(args) {
  this
    .setColor("#28f")
    .fillRect(-.8, -.4, .8, .4)
    .setColor("#f70")
    .setLine(4)
    .drawLine(-.8,-.8, -.8,+.8)
    .drawLine(-.8,-.8, +.8,-.8)
    .drawLine(+.8,+.8, -.8,+.8)
    .drawLine(+.8,+.8, +.8,-.8)
    .drawLine(-.4,-.4, -.4,+.4)
    .drawLine(-.4,-.4, +.4,-.4)
    .drawLine(+.4,+.4, -.4,+.4)
    .drawLine(+.4,+.4, +.4,-.4)
    .setColor("#000")
    .dot(-.8, -.8, "(-1,-2)", "BL")
    .dot(-.8, +.8, "(-1,+2)", "TL")
    .dot(+.8, -.8, "(+1,-2)", "BR")
    .dot(+.8, +.8, "(+1,+2)", "TR")
    .setColor("#000")
    .dot(-.4, -.4, "(-0.5,-2)", "T")
    .dot(-.4, +.4, "(-0.5,+2)", "B")
    .dot(+.4, -.4, "(+0.5,-2)", "T")
    .dot(+.4, +.4, "(+0.5,+2)", "B")
    .setColor("#000")
    .dot(-.8, -.4, "(-1,-1)", "TR")
    .dot(-.8, +.4, "(-1,+1)", "BR")
    .dot(+.8, -.4, "(+1,-1)", "TL")
    .dot(+.8, +.4, "(+1,+1)", "BL");
});
