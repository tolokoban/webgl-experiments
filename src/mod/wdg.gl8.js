// https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");
var Webgl = require("tfw.webgl");
var ExplosiveTP = require("explosive-tp");


var Gl8 = function(opts) {
    var that = this;

    var canvas = $.elem( this, 'canvas' );

    DB.propInteger( this, 'width' )(function(v) {
        canvas.setAttribute( 'width', v );
        canvas.style.width = v + "px";
    });

    DB.propInteger( this, 'height' )(function(v) {
        canvas.setAttribute( 'height', v );
        canvas.style.height = v + "px";
    });

    DB.propBoolean( this, 'zindex' );

    opts = DB.extend({
        width: 640,
        height: 480,
        zbuffer: false
    }, opts, this);

    var webgl = new Webgl( canvas );
    var gl = webgl.gl;
    var explosive = new ExplosiveTP( canvas );

    var texture = webgl.createTextureForFB( 512, 512 );
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    var bufSquare = gl.createBuffer();
    var datSquare = new Float32Array([
            -1, -1, 0,
            -1, +1, 0,
            +1, -1, 0,
            +1, +1, 0
    ]);
   
    var prg = webgl.createProgram({ vertex: GLOBAL.vert, fragment: GLOBAL.frag });
    
    webgl.start(function(time) {
        gl.bindFramebuffer( gl.FRAMEBUFFER, fb );
        gl.clear( gl.COLOR_BUFFER_BIT );
        explosive.render( time );

        prg.use();
        gl.bindFramebuffer( gl.FRAMEBUFFER, null );
        gl.disable( gl.BLEND );
        gl.disable( gl.DEPTH_TEST );
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.bindBuffer( gl.ARRAY_BUFFER, bufSquare );
        gl.enableVertexAttribArray( prg.$attPosition );
        gl.vertexAttribPointer( prg.$attPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.bufferData( gl.ARRAY_BUFFER, datSquare, gl.STATIC_DRAW );
        gl.bindTexture( gl.TEXTURE_2D, texture );
        prg.$uniTime = time;
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );       
    });
};


module.exports = Gl8;

