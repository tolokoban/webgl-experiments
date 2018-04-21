/** @module wdg.gl3 */require( 'wdg.gl3', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
<<<<<<< HEAD
  "vertex": "attribute vec3 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nvarying lowp vec3 varVertexPosition;\n\nvoid main() {\n  varVertexPosition = attVertexPosition;\n  \n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n\n  gl_Position = vec4( x, y, 0.0, 1.0 );\n}\n",
  "fragment-a": "varying lowp vec3 varVertexPosition;\n\nvoid main() {\n  if (mod( varVertexPosition.x, 20.0 ) > 6.0) {\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n  } else {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n  }\n}\n",
  "fragment-b": "varying lowp vec3 varVertexPosition;\n\nvoid main() {\n  lowp float x = varVertexPosition.x;\n  lowp float y = varVertexPosition.y;\n\n  highp float radius = sqrt( (x*x) + (y*y) );\n\n  highp float r = abs( cos( radius / 77.12 ) );\n  highp float g = abs( cos( radius / 33.27 ) );\n  highp float b = abs( cos( radius / 62.43 ) );\n  \n  gl_FragColor = vec4( r, g, b, 1.0 );\n}\n",
  "fragment-c": "varying lowp vec3 varVertexPosition;\n\nvoid main() {\n  // Couleur de la trame.\n  lowp float r1 = 1.0;\n  lowp float g1 = 0.5;\n  lowp float b1 = 0.0;\n  // Couleur du fond.\n  lowp float r2 = 0.0;\n  lowp float g2 = 0.0;\n  lowp float b2 = 1.0;\n\n  lowp float x = mod( varVertexPosition.x, 16.0 ) - 8.0;\n  lowp float y = mod( varVertexPosition.y, 16.0 ) - 8.0;\n\n  highp float radius = sqrt( (x*x) + (y*y) );\n\n  highp float dist = sqrt( varVertexPosition.x * varVertexPosition.x \n                           + varVertexPosition.y * varVertexPosition.y );\n  dist = dist / 300.0;\n  \n  lowp float limit = dist * 9.0;\n\n  if( radius < limit ) gl_FragColor = vec4( r1, g1, b1, 1.0 );\n  else {\n    // Ici, on fait de l'anti-aliasing.\n    lowp float c2 = clamp( radius - limit, 0.0, 1.0 );\n    lowp float c1 = 1.0 - c2;\n    gl_FragColor = vec4( c1 * r1 + c2 * r2, \n                         c1 * g1 + c2 * g2, \n                         c1 * b1 + c2 * b2, \n                         1.0 );\n  }\n}\n"};
=======
  "vertex": "attribute vec3 attVertexPosition;\r\n\r\nuniform float uniWidth;\r\nuniform float uniHeight;\r\n\r\nvarying lowp vec3 varVertexPosition;\r\n\r\nvoid main() {\r\n  varVertexPosition = attVertexPosition;\r\n  \r\n  float x = attVertexPosition.x;\r\n  float y = attVertexPosition.y;\r\n\r\n  x = (2.0 * x / uniWidth) - 1.0;\r\n  y = 1.0 - (2.0 * y / uniHeight);\r\n\r\n  gl_Position = vec4( x, y, 0.0, 1.0 );\r\n}\r\n",
  "fragment-a": "varying lowp vec3 varVertexPosition;\r\n\r\nvoid main() {\r\n  if (mod( varVertexPosition.x, 20.0 ) > 6.0) {\r\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\r\n  } else {\r\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\r\n  }\r\n}\r\n",
  "fragment-b": "varying lowp vec3 varVertexPosition;\r\n\r\nvoid main() {\r\n  lowp float x = varVertexPosition.x;\r\n  lowp float y = varVertexPosition.y;\r\n\r\n  highp float radius = sqrt( (x*x) + (y*y) );\r\n\r\n  highp float r = abs( cos( radius / 77.12 ) );\r\n  highp float g = abs( cos( radius / 33.27 ) );\r\n  highp float b = abs( cos( radius / 62.43 ) );\r\n  \r\n  gl_FragColor = vec4( r, g, b, 1.0 );\r\n}\r\n",
  "fragment-c": "varying lowp vec3 varVertexPosition;\r\n\r\nvoid main() {\r\n  // Couleur de la trame.\r\n  lowp float r1 = 1.0;\r\n  lowp float g1 = 0.5;\r\n  lowp float b1 = 0.0;\r\n  // Couleur du fond.\r\n  lowp float r2 = 0.0;\r\n  lowp float g2 = 0.0;\r\n  lowp float b2 = 1.0;\r\n\r\n  lowp float x = mod( varVertexPosition.x, 16.0 ) - 8.0;\r\n  lowp float y = mod( varVertexPosition.y, 16.0 ) - 8.0;\r\n\r\n  highp float radius = sqrt( (x*x) + (y*y) );\r\n\r\n  highp float dist = sqrt( varVertexPosition.x * varVertexPosition.x \r\n                           + varVertexPosition.y * varVertexPosition.y );\r\n  dist = dist / 300.0;\r\n  \r\n  lowp float limit = dist * 9.0;\r\n\r\n  if( radius < limit ) gl_FragColor = vec4( r1, g1, b1, 1.0 );\r\n  else {\r\n    // Ici, on fait de l'anti-aliasing.\r\n    lowp float c2 = clamp( radius - limit, 0.0, 1.0 );\r\n    lowp float c1 = 1.0 - c2;\r\n    gl_FragColor = vec4( c1 * r1 + c2 * r2, \r\n                         c1 * g1 + c2 * g2, \r\n                         c1 * b1 + c2 * b2, \r\n                         1.0 );\r\n  }\r\n}\r\n"};
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
  "use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl3 = function(opts) {
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
    // Placer le point central de l'éventail.
    var vertices = [
      W / 2,
      H / 2
    ];
    // Définir le nombre de points.
    var n = 127;
    var radius = Math.min(W, H) * 0.49;
    var r;
    var ang;
    for (var i=0; i<=n; i++) {
        ang = 2 * Math.PI * i / n;
        r = radius * (0.8 + 0.2 * Math.cos(ang * 7));
        vertices.push( W / 2 + r * Math.cos( ang ) );
        vertices.push( H / 2 + r * Math.sin( ang ) );
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
    gl.vertexAttribPointer(vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
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


module.exports = WdgGl3;


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
 * @module wdg.gl3
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding

 */
});