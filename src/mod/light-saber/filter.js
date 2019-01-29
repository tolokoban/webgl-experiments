"use strict";

const
    Colors = require("light-saber.colors"),
    ImageProcessor = require("light-saber.image-processor");

class Filter {
    constructor(gl) {
        this.gl = gl;
        this.imageProcessor = new ImageProcessor(gl, GLOBAL.frag);
        this.prg = this.imageProcessor.prg;
        this.color = Colors.PLASMA;
    }

    paint(time, delta) {
        const { gl, prg, imageProcessor, texture } = this;

        prg.use();
        prg.$uniTexture = 0;
        prg.$uniColor = this.color;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        imageProcessor.paint(time, delta);
    }
}


module.exports = Filter;