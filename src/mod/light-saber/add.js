"use strict";

const ImageProcessor = require( "light-saber.image-processor" );

class Add {
    constructor( gl, framebuffers, name0, name1 ) {
        this.gl = gl;
        this.framebuffers = framebuffers;
        this.name0 = name0;
        this.name1 = name1;
        this.imageProcessor = new ImageProcessor( gl, GLOBAL.frag );
        this.prg = this.imageProcessor.prg;
    }

    paint( time, delta ) {
        const { gl, prg, imageProcessor, framebuffers, name0, name1 } = this;
        const tex0 = framebuffers[ name0 ].texture;
        const tex1 = framebuffers[ name1 ].texture;

        prg.use();
        prg.$uniTex0 = 0;
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, tex0 );
        prg.$uniTex1 = 1;
        gl.activeTexture( gl.TEXTURE1 );
        gl.bindTexture( gl.TEXTURE_2D, tex1 );

        imageProcessor.paint( time, delta );
    }
}


module.exports = Add;