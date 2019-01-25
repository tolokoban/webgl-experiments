"use strict";

/** @module webgl.resize */
require('webgl.resize', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {},
      "fr": {}
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();
  /*
  Functions to resize the canvas and the viewport.
  */


  "use strict";
  /**
   * @function
   * @param {object} gl - WebGL context.
   * @param {number} _resolution - Resolution in CSS pixels. If omitted, the real resolution
   * of the device is taken. On smartphones, for instance, the resolution is often greater than 1.
   *
   * @return {boolean} `true` if the size has changed.
   */


  module.exports = function (gl, _resolution) {
    var resolution = typeof _resolution !== "undefined" ? _resolution : window.devicePixelRatio,
        displayWidth = Math.floor(gl.canvas.clientWidth * resolution),
        displayHeight = Math.floor(gl.canvas.clientHeight * resolution); // Check if the canvas is not the same size.

    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
      // Make the canvas the same size
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
      gl.viewport(0, 0, displayWidth, displayHeight);
      return true;
    }

    return false;
  };

  module.exports._ = _;
});
//# sourceMappingURL=resize.js.map