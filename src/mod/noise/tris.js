"use strict";


/* exported CODE_BEHIND */
const CODE_BEHIND = { init, paint };


const Dom = require("dom"),
      Resize = require("webgl.resize"),
      Program = require("webgl.program");


/**
 * This function is called by the XJS code.
 *
 * @this Tris
 */
function init(  ) {
    const canvas = this.$elements.canvas.$,
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
    this.texture = createRandomTexture( gl );
    requestAnimationFrame( paint.bind( this ) );
}


function paint( time ) {
    requestAnimationFrame( paint.bind( this ) );

    const { gl, prg, buffVert, texture } = this;
    if( !gl ) return;
    Resize( gl );

    prg.use();
    prg.$uniTime = time;
    prg.$uniCenterX = gl.canvas.width * 0.5;
    prg.$uniCenterY = gl.canvas.height * 0.5;

    prg.$uniLoop = this.loop - .5;
    prg.$uniAmpl = this.ampl;
    prg.$uniFreq = this.freq;
    prg.$uniAmplAttenuation = this.amplAtt;
    prg.$uniFreqAttenuation = this.freqAtt;
    prg.$uniRandom = 0;
    
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );

    prg.bindAttribs( buffVert, "attXY" );
    gl.bindBuffer( gl.ARRAY_BUFFER, buffVert );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}

//#(texture)
function createRandomTexture( gl ) {
    // Les coordonnées R, G, B et A sont des entiers entre 0 et 255.
    // On va créer des vecteurs normés et on stoquera la coordonnée X
    // dans R et la coordonnée Y dans G.
    // Les coordonnées X et Y sont des nombres décimaux compris entre -1 et +1.
    // Il faudra donc les transformer en nombres entiers entre 0 et 255.
    const data = [];
    const texture = gl.createTexture();
    const width = 32;
    const height = 32;

    for( let i = 0; i < width * height; i++ ) {
        const xRaw = Math.random() - 0.5,
              yRaw = Math.random() - 0.5,
              len = 2 * Math.sqrt( xRaw * xRaw + yRaw * yRaw ),
              invlen = 256 / len,
              x = Math.floor( 128 + invlen * xRaw ),
              y = Math.floor( 128 + invlen * yRaw ),
              z = Math.floor( Math.random() * 255 );
        data.push( x, y, z, 255 );
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( data )
    );

    return texture;
}
//#(texture)
