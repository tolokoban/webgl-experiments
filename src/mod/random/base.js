"use strict";


const Resize = require("webgl.resize"),
      Program = require("webgl.program");


class Base {
  constructor( gl, fragCode ) {
    this.gl = gl;

    this.prg = new Program(gl, {
      vert: GLOBAL.vert,
      frag: fragCode
    });
    this.buffVert = gl.createBuffer();
    const arrayVert = new Float32Array([ -1, -1, +1, -1, -1, +1, +1, +1 ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
    gl.bufferData(gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW);

    requestAnimationFrame( paint.bind( this ) );
  }
}

function paint( time ) {
  requestAnimationFrame( paint.bind( this ) );

  const { gl, prg, buffVert } = this;
    Resize( gl, 1 );

  prg.use();
  prg.$uniTime = time;
  prg.$uniCenterX = gl.canvas.width * 0.5;
  prg.$uniCenterY = gl.canvas.height * 0.5;
  gl.bindBuffer( gl.ARRAY_BUFFER, buffVert );

  prg.bindAttribs( buffVert, "attXY" );
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}


module.exports = Base;
