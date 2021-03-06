
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
                -.8, +.8, .5,
                -.6, +.6, .4,
                -.4, +.4, .7,
                -.2, +.2, .6,
                -.0, +.0, .8,
                +.2, -.2, .0,
                +.4, -.4, .1,
                +.6, -.6, .3,
                +.8, -.8, .2
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
    /*
     gl.enable(gl.DEPTH_TEST);
     gl.depthFunc(gl.LEQUAL);
     */

    var NB_POINTS = 7;
    var points = new Float32Array(NB_POINTS * 3);
    var ang;

    // #(rendering)
    function render(time) {
        for (var k = 0; k < NB_POINTS; k++) {
            ang = time / 700 + k * Math.PI * 2 / NB_POINTS;
            points[3 * k + 0] = .7 * Math.cos( ang );
            points[3 * k + 1] = .2 * Math.sin( ang );
            points[3 * k + 2] = .7 * Math.sin( ang );
        }
        // Définir ce buffer comme le buffer actif.
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuffer);
        // Copier des données dans le buffer actif.
        gl.bufferData( gl.ARRAY_BUFFER, points, gl.STATIC_DRAW );

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, NB_POINTS);
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
