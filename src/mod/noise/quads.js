"use strict";


/* exported CODE_BEHIND */
const CODE_BEHIND = { init, paint };


const Dom = require("dom"),
      Resize = require("webgl.resize"),
      Program = require("webgl.program");


/**
 * This function is called by the XJS code.
 *
 * @this Quads
 */
function init(  ) {
    const canvas = Dom( this ),
          gl = canvas.getContext("webgl", { preserveDrawingBuffer: false });

    this.prg = new Program(gl, {
      vert: GLOBAL.vert,
      frag: GLOBAL.frag
    });
    this.buffVert = gl.createBuffer();
    const arrayVert = new Float32Array([ -1, -1, +1, -1, -1, +1, +1, +1 ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
    gl.bufferData(gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW);


    this.gl = gl;
}


function paint() {

}
