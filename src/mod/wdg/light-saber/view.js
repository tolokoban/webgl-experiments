"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { init };

var M4 = require( "webgl.math" ).m4;
var Resize = require( "webgl.resize" );
var Program = require( "webgl.program" );


/**
 * @this ViewXJS
 */
function init() {
    const that = this;
    var prgBasic = new Program( gl, {
        vert: GLOBAL.vert,
        frag: GLOBAL.frag
    } );
    var prgExtra = new Program( gl, {
        vert: GLOBAL.vertExtra,
        frag: GLOBAL.fragExtra
    } );
    var vertices = createVertices();
    var buffData = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffData );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    gl.enable( gl.DEPTH_TEST );
    gl.clearColor( 1, 1, 1, 1 );
    gl.clearDepth( 1 );

    var projection = M4.identity();
    var rotation = M4.identity();

    var draw = function ( time ) {
        requestAnimationFrame( draw );

        var w = gl.canvas.clientWidth;
        var h = gl.canvas.clientHeight;
        Resize( gl );

        M4.perspective( Math.PI * .35, w / h, .1, 10, projection );
        M4.rotationXY(
            3.27 * Math.cos( time * 0.000458 ),
            5.78 * Math.sin( time * 0.000147 ),
            rotation );

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        var prg = that.extra ? prgExtra : prgBasic;

        prg.use();
        prg.$uniProjection = projection;
        prg.$uniRotation = rotation;
        prg.$uniScreenWidth = w * window.devicePixelRatio;
        prg.$uniDistance = 0.5;
        prg.$uniRadius = 0.17;
        prg.$uniAlpha = that.alpha;

        prg.bindAttribs( buffData, "attPoint", "attLevel" );
        var count = that.dense ? vertices.length / 4 : 20 * 10;
        gl.drawArrays( gl.POINTS, 0, count );
    };

    requestAnimationFrame( draw );
}