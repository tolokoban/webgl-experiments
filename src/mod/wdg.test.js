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
    gl.attachShader(shaderProgram, getFragmentShader(gl, GLOBAL['fragment-' + this.fragment]) );
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    // #(shaders)

    // #(vertices)
    var squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    var W = canvas.width;
    var H = canvas.height;
    var vertices = [W / 2, H / 2, 0];
    var n = 99;
    var radius = Math.min(W, H) * .45;
    var r;
    var ang;
    for (var i=0; i<=n; i++) {
        ang = 2 * Math.PI * i / n;
        r = radius * (.9 + .1 * Math.cos(ang * 7));
        vertices.push( W / 2 + r * Math.cos( ang ) );
        vertices.push( H / 2 + r * Math.sin( ang ) );
        vertices.push( 0 );
    }
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    // #(vertices)

    // #(vertex-position)
    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "attVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    // #(vertex-position)

    // #(canvas-size)
    var uniWidth = gl.getUniformLocation(shaderProgram, "uniWidth");
    var uniHeight = gl.getUniformLocation(shaderProgram, "uniHeight");
    gl.uniform1f(uniWidth, canvas.width);
    gl.uniform1f(uniHeight, canvas.height);
    // #(canvas-size)

    // #(rendering)
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    function draw( time ) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 2);
        window.requestAnimationFrame( draw );
    }
    window.requestAnimationFrame( draw );
    // #(rendering)
};


module.exports = Test;


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
