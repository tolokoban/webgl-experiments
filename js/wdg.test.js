/** @module wdg.test */require( 'wdg.test', function(exports, module) { var _intl_={"en":{}},_$=require("$").intl;function _(){return _$(_intl_, arguments);}
 // https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var Test = function(opts) {
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

    DB.propString( this, 'fragment' );

    opts = DB.extend({
        width: 640,
        height: 480,        
        fragment: 'a'
    }, opts, this);

    window.setTimeout( start.bind( this, canvas ), 20 );
};

function start( canvas ) {
    // #(init)
    var gl = canvas.getContext("webgl")
            || canvas.getContext("experimental-webgl");
    // #(init)

    console.info("[wdg.gl3] 'fragment-' + this.fragment=...", 'fragment-' + this.fragment);
    // #(shaders)
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, getVertexShader(gl, GLOBAL['vertex']) );
    gl.attachShader(shaderProgram, getFragmentShader(gl, GLOBAL['fragment']) );
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    // #(shaders)

    // #(vertices)
    // Création d'un buffer dans la carte graphique.
    // Un buffer est un tableau de nombres.
    var triangleVerticesBuffer = gl.createBuffer();
    // Définir ce buffer comme le buffer actif.
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuffer);
    // Copier des données dans le buffer actif.
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
                -.8, +.8, .0,
                +.8, -.8, .0,
                +.3, -.4, .0,
                +.0, -.0, .0,
                -.8, -.8, .0
        ]),
        gl.STATIC_DRAW
    );
    // #(vertices)

    // #(vertex-position)
    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "attVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    // #(vertex-position)

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    // #(rendering)
    function render(time) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 5);
        window.requestAnimationFrame( render );
    }
    window.requestAnimationFrame( render );
    // #(rendering)
};


module.exports = Test;

// #(shader)
function getShader( type, gl, code ) {
    var shader = gl.createShader( type );
    gl.shaderSource( shader, code );
    gl.compileShader( shader );
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log( code );
        console.error("An error occurred compiling the shader: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function getFragmentShader( gl, code ) {
    return getShader( gl.FRAGMENT_SHADER, gl, code );
}

function getVertexShader( gl, code ) {
    return getShader( gl.VERTEX_SHADER, gl, code );
}
// #(shader)


var GLOBAL = {
  "vertex": "attribute vec3 attVertexPosition;\r\n\r\nvarying vec4 attPosition;\r\n\r\nvoid main() {\r\n  gl_Position = vec4(\r\n      attVertexPosition.x, attVertexPosition.y,\r\n      0.0, 1.0);\r\n  gl_PointSize = 250.0;\r\n  attPosition = gl_Position;\r\n}\r\n",
  "fragment": "precision mediump float;\r\n\r\nvarying vec4 attPosition;\r\n\r\nvoid main() {\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  float r = x*x + y*y;\r\n\r\n  if (r > 0.25) {\r\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );\r\n  } else {\r\n    gl_FragColor = vec4( 1.0, gl_PointCoord.x, 0.0, 1.0 );\r\n  }\r\n}\r\n"};
 
module.exports._ = _;
/**
 * @module wdg.test
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.test

 */
});