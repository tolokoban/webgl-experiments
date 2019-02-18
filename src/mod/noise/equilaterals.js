"use strict";


/* exported CODE_BEHIND */
const CODE_BEHIND = { init };


const Base = require("noise.base");

/**
 * @return {undefined}
 */
function init(  ) {
  const canvas = this.$elements.canvas.$,
        gl = canvas.getContext("webgl", { preserveDrawingBuffer: false }),
        base = new Base( gl, GLOBAL.frag );
}
