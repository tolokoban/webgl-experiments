"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl4 = function(opts) {
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
    var vertexShaderCode = GLOBAL['vertex'];
    var fragmentShaderCode = GLOBAL['fragment-' + this.fragment];

    // #(code)
    var gl = canvas.getContext("webgl")
            || canvas.getContext("experimental-webgl");

    var shaderProgram = gl.createProgram();
    gl.attachShader( 
        shaderProgram, 
        getVertexShader(gl, vertexShaderCode) );
    gl.attachShader( 
        shaderProgram, 
        getFragmentShader(gl, fragmentShaderCode) );
    gl.linkProgram( shaderProgram );
    gl.useProgram( shaderProgram );

    var squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    var W = canvas.width;
    var H = canvas.height;
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0, 0,
            W, 0, 0,
            0, H, 0,
            W, H, 0
        ]),
        gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "attVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Déclaration de l'uniform `uniTime`.
    var uniTimeV = gl.getUniformLocation(shaderProgram, "uniTimeV");
    var uniTimeF = gl.getUniformLocation(shaderProgram, "uniTimeF");

    var uniWidth = gl.getUniformLocation(shaderProgram, "uniWidth");
    var uniHeight = gl.getUniformLocation(shaderProgram, "uniHeight");

    function draw( t ) {
        // Valeurs pour la taille de l'écran.
        gl.uniform1f(uniWidth, canvas.width);
        gl.uniform1f(uniHeight, canvas.height);
        // Valeur de la variable uniforme pour le temps.
        gl.uniform1f(uniTimeV, t);
        gl.uniform1f(uniTimeF, t);

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Dessiner la prochaine frame.
        window.requestAnimationFrame( draw );
    }

    window.requestAnimationFrame( draw );
    // #(code)
};


module.exports = WdgGl4;


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
