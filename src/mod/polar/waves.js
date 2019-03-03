"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { init };


const Base  = require("polar.base");


class Waves extends Base {
  constructor( gl ) {
    super( gl, GLOBAL.frag );
  }
}


/**
 * @param {object} 
 * @return {Element} 
 */
function init(  ) {
  const gl = this.$elements.canvas.$.getContext( "webgl", {} ),
        waves = new Waves( gl );
}
