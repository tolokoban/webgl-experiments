"use strict";

const
    Colors = require( "light-saber.colors" ),
    ImageProcessor = require( "light-saber.image-processor" );

class Blur {
    constructor( gl, framebuffers, sourceName ) {
        this.gl = gl;
        this.framebuffers = framebuffers;
        this.sourceName = sourceName;
        this.imageProcessor = new ImageProcessor( gl, GLOBAL.frag );
        this.prg = this.imageProcessor.prg;
        this.color = Colors.PLASMA;
    }

    paint( time, delta ) {
        const { gl, prg, imageProcessor, framebuffers, sourceName } = this;
        const fb = framebuffers[ sourceName ];

        prg.use();
        prg.$uniTexture = 0;
        prg.$uniColor = this.color;
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, fb.texture );

        imageProcessor.paint( time, delta );
    }
}


module.exports = Blur;