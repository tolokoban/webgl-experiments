/** @module wdg.gl8 */require( 'wdg.gl8', function(exports, module) { var _intl_={"en":{}},_$=require("$").intl;function _(){return _$(_intl_, arguments);}
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
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );       
    });
};


module.exports = Gl8;


var GLOBAL = {
  "vert": "// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n\n// Passer les coordonnées UV pour la texture.\nvarying vec2 varUV;\n\nvoid main() {\n  float x = attPosition.x;\n  float y = attPosition.y;\n  float z = 0.0;\n\n  gl_Position = vec4(x, y, z, 1.0 );\n\n  varUV = vec2( x, y );\n}\n",
  "frag": "precision mediump float;\n\nuniform sampler2D uniTexture;\n\nvarying vec2 varUV;\n\nconst float S = 1.0 / 128.0;\n\nvoid main() {\n  float u = abs(varUV.x);\n  float v = abs(varUV.y);\n  \n  vec4 color = texture2D( uniTexture, vec2(u, v) );\n  if (varUV.x < 0.0) {\n    if (varUV.y < 0.0) {\n      gl_FragColor = color;\n    } else {\n      gl_FragColor = vec4( color.b, color.r, color.g, color.a );\n    }\n  } else {\n    if (varUV.y < 0.0) {\n      gl_FragColor = vec4( vec3(1.0, 1.0, 1.0) - color.rgb, 1.0 );\n    } else {\n      gl_FragColor = color * 9.0\n        - texture2D( uniTexture, vec2(u - S, v - S) )\n        - texture2D( uniTexture, vec2(u    , v - S) )\n        - texture2D( uniTexture, vec2(u + S, v - S) )\n        - texture2D( uniTexture, vec2(u - S, v    ) )\n        - texture2D( uniTexture, vec2(u + S, v    ) )\n        - texture2D( uniTexture, vec2(u - S, v + S) )\n        - texture2D( uniTexture, vec2(u    , v + S) )\n        - texture2D( uniTexture, vec2(u + S, v + S) );\n      if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {\n        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);\n      }\n    }\n  }\n}\n"};
 
module.exports._ = _;
/**
 * @module wdg.gl8
 * @see module:$
 * @see module:dom
 * @see module:explosive-tp
 * @see module:tfw.data-binding
 * @see module:tfw.webgl
 * @see module:wdg.gl8

 */
});