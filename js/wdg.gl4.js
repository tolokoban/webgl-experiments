/** @module wdg.gl4 */require( 'wdg.gl4', function(exports, module) { var _intl_={"en":{}},_$=require("$").intl;function _(){return _$(_intl_, arguments);}
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


var GLOBAL = {
  "vertex": "attribute vec3 attVertexPosition;\r\n\r\nuniform float uniWidth;\r\nuniform float uniHeight;\r\n\r\nuniform lowp float uniTimeV;\r\n\r\nvarying lowp vec3 varVertexPosition;\r\n\r\nvoid main() {\r\n  highp float time = uniTimeV;\r\n\r\n  varVertexPosition = attVertexPosition;\r\n  \r\n  float x = attVertexPosition.x;\r\n  float y = attVertexPosition.y;\r\n\r\n  x = (2.0 * x / uniWidth) - 1.0;\r\n  y = 1.0 - (2.0 * y / uniHeight);\r\n\r\n  float speed = 0.0;\r\n\r\n  if (x < 0.0) {\r\n    if (y < 0.0) {\r\n      speed = 1600.0;\r\n    } else {\r\n      speed = 1643.0;\r\n    }\r\n  } else {\r\n    if (y < 0.0) {\r\n      speed = 1703.0;\r\n    } else {\r\n      speed = 1742.0;\r\n    }\r\n  }\r\n\r\n  float radius = 0.5 + (cos(time / speed) + 1.0) / 4.0;\r\n  gl_Position = vec4( x * radius, y * radius, 0.0, 1.0 );\r\n}\r\n",
  "fragment-a": "const highp float PI = 3.1415926539;\r\nconst lowp vec3 COLOR0 = vec3(0.7, 0.9, 1.0);\r\nconst lowp vec3 COLOR1 = vec3(0.0, 0.7, 0.9);\r\n\r\nvarying lowp vec3 varVertexPosition;\r\n\r\nuniform lowp float uniTimeF;\r\n\r\nvoid main() {\r\n  highp float time = uniTimeF / 700.0;\r\n  \r\n  lowp float x = varVertexPosition.x + time * 120.0;\r\n  lowp float y = varVertexPosition.y + sin(time) * 15.0;\r\n  \r\n  lowp float xx = x / 10.0;\r\n  lowp float yy = y / 10.0;\r\n  \r\n  lowp float h = cos(yy) * cos(xx) + sin(yy);\r\n  h = cos( PI * h + time);\r\n  \r\n  h = (1.0 + h) / 2.0;\r\n  gl_FragColor = vec4( h * COLOR0 + (1.0 - h) * COLOR1, 1.0);\r\n}\r\n"};
 
module.exports._ = _;
/**
 * @module wdg.gl4
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.gl4

 */
});