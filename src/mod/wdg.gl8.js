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

    var datSquare = new Float32Array([
            -1, -1, 0,
            -1, +1, 0,
            +1, -1, 0,
            +1, +1, 0
    ]);

    var prg = webgl.createProgram({ vertex: GLOBAL.vert, fragment: GLOBAL.frag });
    
    webgl.start(function(time) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        explosive.render( time );

        
    });
};


module.exports = Gl8;

