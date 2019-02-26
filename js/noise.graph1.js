"use strict";

/** @module noise.graph1 */
require('noise.graph1', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var SIDE = .5;

  function vec(painter, x, y, text, position, degree) {
    var ang = degree * Math.PI / 180,
        vx = SIDE * Math.cos(ang),
        vy = SIDE * Math.sin(ang);
    painter.setColor(painter.ORANGE).drawVector(x, y, x + vx, y + vy).setColor("#fff").dot(x, y, text, position);
  }

  module.exports = require("draw")(function () {
    try {
      var x = -0.05,
          y = -0.12;
      this.setColor("#9CF").fillRect(-1, -1, +1, +1).setColor("#CEF").fillRect(-SIDE, -1, SIDE, 1).fillRect(-1, -SIDE, 1, SIDE).setColor(this.BLUE).fillRect(-SIDE, -SIDE, SIDE, SIDE).setColor("#9CF").setLine(1).drawVector(-SIDE, -SIDE, x, y).drawVector(-SIDE, +SIDE, x, y).drawVector(+SIDE, -SIDE, x, y).drawVector(+SIDE, +SIDE, x, y).setColor("#000").drawLine(-SIDE, y, SIDE, y).dot(-SIDE, y, "Vab", "R").dot(+SIDE, y, "Vcd", "L").setColor("#fff").dot(x, y, "F", "BL").setLine(4);
      vec(this, -SIDE, -SIDE, "A", "BL", 190);
      vec(this, -SIDE, +SIDE, "B", "TL", -15);
      vec(this, +SIDE, +SIDE, "C", "TR", -60);
      vec(this, +SIDE, -SIDE, "D", "BR", -40);
    } catch (err) {
      console.error(err);
    }
  });
  module.exports._ = _;
});
//# sourceMappingURL=graph1.js.map