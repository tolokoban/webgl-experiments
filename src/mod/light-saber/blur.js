"use strict";

const ImageProcessor = require( "light-saber.image-processor" );

class Blur {
    constructor(
        gl, framebuffers, sourceName,
        centerCoeff = 0.332, segmentCoeff = 0.122, cornerCoeff = 0.045
    ) {
        this.gl = gl;
        this.framebuffers = framebuffers;
        this.sourceName = sourceName;
        this.imageProcessor = new ImageProcessor( gl, GLOBAL.frag );
        this.prg = this.imageProcessor.prg;
        this.centerCoeff = centerCoeff;
        this.segmentCoeff = segmentCoeff;
        this.cornerCoeff = cornerCoeff;
    }

    paint( time, delta ) {
        const { gl, prg, imageProcessor, framebuffers, sourceName } = this;
        const fb = framebuffers[ sourceName ];

        prg.use();
        prg.$uniTexture = 0;
        prg.$uniDx = 1 / fb.width;
        prg.$uniDy = 1 / fb.height;
        prg.$uniCenter = this.centerCoeff;
        prg.$uniSegment = this.segmentCoeff;
        prg.$uniCorner = this.cornerCoeff;
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, fb.texture );

        imageProcessor.paint( time, delta );
    }
}


module.exports = Blur;