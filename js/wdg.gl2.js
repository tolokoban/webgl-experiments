/** @module wdg.gl2 */require( 'wdg.gl2', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vertex": "attribute vec2 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nvoid main() {\n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n\n  gl_Position = vec4( x, y, 0.0, 1.0 );\n}\n",
  "fragment": "void main() {\n  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);\n}\n"};
  "use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl1 = function(opts) {
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

    DB.propInteger( this, 'size' )(function(v) {
        start.call( that, canvas );
    });

    DB.propInteger( this, 'regular' )(function(v) {
        start.call( that, canvas );
    });

    opts = DB.extend({
        width: 640,
        height: 480,
        size: 5,
        regular: true
    }, opts, this);

    window.setTimeout( start.bind( this, canvas ), 20 );
};

function start( canvas ) {
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
    var squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    var W = canvas.width;
    var H = canvas.height;
    var vertices = [W / 2, H / 2, 0];
    var n = Math.min(1000, Math.max(3, this.size));
    console.info("[wdg.gl2] n=...", n);
    var radius = Math.min(W, H) * .45;
    var r;
    var ang;
    for (var i=0; i<=n; i++) {
        ang = 2 * Math.PI * i / n;
        r = radius;
        if (!this.regular) {
            r *= .5 + Math.random() / 2;
        }
        vertices.push( W / 2 + r * Math.cos( ang ) );
        vertices.push( H / 2 + r * Math.sin( ang ) );
        vertices.push( 0 );
    }
    console.info("[wdg.gl2] vertices=...", vertices);
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 2);
    // #(rendering)
};


module.exports = WdgGl1;


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


  
module.exports._ = _;
/**
 * @module wdg.gl2
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding

 */
});