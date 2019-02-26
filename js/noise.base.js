"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @module noise.base */
require('noise.base', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  var GLOBAL = {
    "vert": "attribute vec2 attXY;\r\n\r\nvoid main() {\r\n    gl_Position = vec4( attXY, 0, 1);\r\n}\r\n"
  };
  "use strict";

  var Resize = require("webgl.resize"),
      Program = require("webgl.program");

  var Base = function Base(gl, fragCode) {
    _classCallCheck(this, Base);

    this.gl = gl;
    this.prg = new Program(gl, {
      vert: GLOBAL.vert,
      frag: fragCode
    });
    this.buffVert = gl.createBuffer();
    var arrayVert = new Float32Array([-1, -1, +1, -1, -1, +1, +1, +1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
    gl.bufferData(gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW);
    requestAnimationFrame(paint.bind(this));
  };

  function paint(time) {
    requestAnimationFrame(paint.bind(this));
    var gl = this.gl,
        prg = this.prg,
        buffVert = this.buffVert;
    Resize(gl);
    prg.use();
    prg.$uniTime = time;
    prg.$uniCenterX = gl.canvas.width * 0.5;
    prg.$uniCenterY = gl.canvas.height * 0.5;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
    prg.bindAttribs(buffVert, "attXY");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  module.exports = Base;
  module.exports._ = _;
});
//# sourceMappingURL=base.js.map