"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl1 = function(opts) {
    var canvas = $.elem( this, 'canvas' );

    DB.propInteger( this, 'width' )(function(v) {
        canvas.setAttribute( 'width', v );
        canvas.style.width = v + "px";
    });

    DB.propInteger( this, 'height' )(function(v) {
        canvas.setAttribute( 'height', v );
        canvas.style.height = v + "px";
    });

    opts = DB.extend({
        width: 640,
        height: 480
    }, opts, this);


    // #(init)
    var gl = canvas.getContext("webgl")
            || canvas.getContext("experimental-webgl");
    // #(init)

    // #(shaders)
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, getVertexShader(gl, GLOBAL['vertex']) );
    gl.attachShader(shaderProgram, getFragmentShader(gl, GLOBAL['fragment']) );
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    // #(shaders)

    // #(vertices)
    // Définition des attributs de nos trois points.
    var arrPoints = new Float32Array([
        // attI, attJ, attC.r, attC.g, attC.b
            -.4, +.8,  1,      0,      0,
            +.8, -.8,  0,      1,      0,
            -.8, -.8,  0,      0,      1
    ]);
    // Taille d'une valeur en octets.
    var bpe = arrPoints.BYTES_PER_ELEMENT;
    // Nombre d'octets utilisés par point.
    var block = 5 * bpe;
    // Création d'un buffer dans la carte graphique.
    // Un buffer est un tableau de nombres.
    var triangleVerticesBuffer = gl.createBuffer();
    // Définir ce buffer comme le buffer actif.
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuffer);
    // Copier des données dans le buffer actif.
    gl.bufferData(gl.ARRAY_BUFFER, arrPoints, gl.STATIC_DRAW);
    // #(vertices)

    // #(vertex-position)
    var attI = gl.getAttribLocation(shaderProgram, "attI");
    gl.enableVertexAttribArray(attI);
    gl.vertexAttribPointer(attI, 1, gl.FLOAT, false, block, 0);
    var attJ = gl.getAttribLocation(shaderProgram, "attJ");
    gl.enableVertexAttribArray(attJ);
    gl.vertexAttribPointer(attJ, 1, gl.FLOAT, false, block, 1 * bpe);
    var attC = gl.getAttribLocation(shaderProgram, "attC");
    gl.enableVertexAttribArray(attC);
    gl.vertexAttribPointer(attC, 3, gl.FLOAT, false, block, 2 * bpe);
    // #(vertex-position)

    // #(rendering)
    // Définir le noir (0,0,0) comme couleur d'arrière-plan.
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Effacer l'écran actuel.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Lancer le dessin du triangle composé de 3 points.
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    // #(rendering)
};


module.exports = WdgGl1;

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