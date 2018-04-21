/** @module wdg.gl4 */require( 'wdg.gl4', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vertex": "attribute vec3 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nuniform lowp float uniTimeV;\n\nvarying lowp vec3 varVertexPosition;\n\nvoid main() {\n  highp float time = uniTimeV;\n\n  varVertexPosition = attVertexPosition;\n  \n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n  float r = 2.0 + cos( time * 0.0007 );\n  gl_Position = vec4( x * r, y * r, 0.0, 1.0 );\n}\n",
  "fragment-a": "const highp float PI = 3.1415926539;\nconst lowp vec3 COLOR0 = vec3(1.0, 0.6470588235294118, 0.0);\nconst lowp vec3 COLOR1 = vec3(0.0, 0.466667, 1.0);\n\nvarying lowp vec3 varVertexPosition;\n\nuniform lowp float uniTimeF;\n\nvoid main() {\n  highp float time = uniTimeF * 0.0005;\n  \n  lowp float x = varVertexPosition.x + time * 120.0;\n  lowp float y = varVertexPosition.y + sin(time * 0.7) * 150.0;\n\n  lowp float w = 40.0;\n  lowp float h = w;\n  lowp float xx = mod(x, w) - w * 0.5;\n  lowp float yy = mod(y, h) - h * 0.5;\n  lowp float r = xx*xx + yy*yy;\n  lowp float limit = 1200.0 + 1000.0 * cos( time  - (varVertexPosition.x + varVertexPosition.y) * .01);\n  \n  if( r > limit || r < limit * 0.25 ) {\n    gl_FragColor = vec4( COLOR1, 1.0);\n  } else {\n    gl_FragColor = vec4( COLOR0, 1.0);\n  }\n}\n"};
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
        gl.uniform1f(uniWidth, canvas.clientWidth);
        gl.uniform1f(uniHeight, canvas.clientHeight);
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


  
module.exports._ = _;
/**
 * @module wdg.gl4
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding

 */
});