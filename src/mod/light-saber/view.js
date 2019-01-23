"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { init };

const
    M4 = require( "webgl.math" ).m4,
    Resize = require( "webgl.resize" ),
    HiltObject = require( "light-saber.saber-hilt" ),
    PlasmaObject = require( "light-saber.saber-plasma" );


/**
 * According to wikipedia, a light saber has a tilt of 27 cm and a plasma blade of 91 cm.
 * @this ViewXJS
 */
function init() {
    const
        canvas = this.$elements.canvas.$,
        gl = canvas.getContext( "webgl", { preserveDrawingBuffer: false } ),
        frameBuffers = {},
        hiltObject = new HiltObject( gl ),
        plasmaObject = new PlasmaObject( gl ),
        projection = M4.identity(),
        rotation = M4.identity(),
        translation = new Float32Array( [ 0, -0.4, -1.5, 0 ] );

    hiltObject.projection = projection;
    hiltObject.rotation = rotation;
    hiltObject.translation = translation;
    plasmaObject.projection = projection;
    plasmaObject.rotation = rotation;
    plasmaObject.translation = translation;

    gl.enable( gl.DEPTH_TEST );
    gl.clearColor( 0, 0, 0, 0 );
    gl.clearDepth( 1 );


    const draw = function ( time ) {
        requestAnimationFrame( draw );

        const
            w = gl.canvas.clientWidth,
            h = gl.canvas.clientHeight;
        if ( Resize( gl ) ) {
            console.log( "Resize!" );
            createFrameBuffers( gl, frameBuffers );
        }

        M4.perspective( Math.PI * .35, w / h, .1, 10, projection );
        M4.rotationYX(
            4 * Math.cos( time * 0.000458 ),
            ramp( Math.sin( 1 + time * 0.000147 ), -Math.PI * 0.5, Math.PI * 0.5 ),
            rotation );
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        hiltObject.paint( time );
        plasmaObject.paint( time );
    };

    requestAnimationFrame( draw );
}

/**
 * Tak a number between -1 and +1 and project it between min and max.
 *
 * @param   {float} value - Value between -1 and +1.
 * @param   {float} min - Mapped value for -1.
 * @param   {float} max - Mapped value for +1.
 * @returns {float} .
 */
function ramp( value, min, max ) {
    const delta = max - min;
    return min + ( value + 1 ) * 0.5 * delta;
}


function createFrameBuffers( gl, frameBuffers ) {
    const
        w = Math.max( 1, gl.canvas.width ),
        h = Math.max( 1, gl.canvas.height );

}

/**
 * Crate a FrameBuffer and its associated texture.
 *
 * @param   {[type]} gl     [description]
 * @param   {[type]} width  [description]
 * @param   {[type]} height [description]
 *
 * @returns {object} `{ texture, framebuffer }`
 */
function createFrameBuffer( gl, width, height ) {
    const texture = gl.createTexture();

    // Tell GL that the current texture is this one.
    gl.bindTexture( gl.TEXTURE_2D, texture );

    // The texture doesn't wrap and it uses linear interpolation.
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );

    // Set texture dimension.
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, null );

    const framebuffer = gl.createFrameBuffer();

    // Tell GL that the current framebuffer is this one.
    gl.bindFramebuffer( gl.FRAMEBUFFER, framebuffer );

    // Attach the texture to this framebuffer.
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D, texture, 0 );

    return { texture, framebuffer };
}