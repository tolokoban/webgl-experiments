/** @module wdg.gl7 */require( 'wdg.gl7', function(exports, module) { var _intl_={"en":{}},_$=require("$").intl;function _(){return _$(_intl_, arguments);}
 // https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl6 = function(opts) {
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

    var logo = new Image();
    logo.src = "css/wdg.gl7/tp.png";
    logo.onload = start.bind( this, canvas, logo );
};

function start( canvas, logo ) {
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
    // Création d'un buffer dans la carte graphique.
    // Un buffer est un tableau de nombres.
    var bufAttributes = gl.createBuffer();
    // Définir ce buffer comme le buffer actif.
    gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);
    // Lire les pixels de l'image.
    var col, row, index = 0, data = getDataFromImage(logo);
    var points = [];
    for (row = 0; row < logo.height; row++) {
        for (col = 0; col < logo.width; col++) {
            // On ne conserve que le noir.
            // Le data d'une image est une suite de pixels.
            // Chaque pixel est composé de 4 nombres entre 0 et 256 :
            // rouge, vert, bleu, opacité.
            if (data[index] + data[index + 1] + data[index + 2] < 50) {
                // On ne tient pas compte des pixels transparents.
                if (data[index + 3] > 240 ) {
                    points.push([
                        2 * col / logo.width - 1,
                        1 - 2 * row / logo.height
                    ]);
                }
            }
            index += 4;
        }
    }
    // Les attributs des vertex.
    var count = points.length;
    var arrAttributes = [];

    points.forEach(function (pt) {
        arrAttributes.push(pt[0]);
        arrAttributes.push(pt[1]);
        arrAttributes.push(Math.random());
        arrAttributes.push(Math.random());
        arrAttributes.push(Math.random());
        arrAttributes.push(Math.random());
    });
    var datAttributes = new Float32Array(arrAttributes);
    // Copier des données dans le buffer actif.
    gl.bufferData(gl.ARRAY_BUFFER, datAttributes, gl.STATIC_DRAW);
    // #(vertices)

    // #(attributes)
    var bpe = datAttributes.BYTES_PER_ELEMENT;
    var blockSize = 6 * bpe;
    // attPosition
    var attPosition = gl.getAttribLocation(shaderProgram, "attPosition");
    gl.enableVertexAttribArray(attPosition);
    gl.vertexAttribPointer(attPosition, 2, gl.FLOAT, false, blockSize, 0);
    // attRandom
    var attRandom = gl.getAttribLocation(shaderProgram, "attRandom");
    gl.enableVertexAttribArray(attRandom);
    gl.vertexAttribPointer(attRandom, 4, gl.FLOAT, false, blockSize, 2 * bpe);
    // #(attributes)

    // #(blend)
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // #(blend)

    var uniTime = gl.getUniformLocation(shaderProgram, "uniTime");

    // #(rendering)
    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);

    function render(time) {
        window.requestAnimationFrame( render );

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(uniTime, time);
        gl.drawArrays(gl.POINTS, 0, count);
    }
    window.requestAnimationFrame( render );
    // #(rendering)
};


module.exports = WdgGl6;

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


function createVividColor() {
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();
    if (r < g) {
        if (b < r) {
            r = 1;  b = 0;
        } else {
            // r > g et r > b
            r = 1;
            if (g > b) b = 0;
            else g = 0;
        }
    } else {
        // r > g
        if (g > b) {
            r = 1;  b = 0;
        } else {
            // r > g et b > g
            g = 0;
            if (r > b) r = 1;
            else b = 1;
        }
    }

    return { r: r, g: g, b: b };
}


function getDataFromImage( img ) {
    var w = img.width;
    var h = img.height;
    var canvas = document.createElement( 'canvas' );
    canvas.setAttribute( "width", w );
    canvas.setAttribute( "height", h );
    var ctx = canvas.getContext( "2d" );
    ctx.drawImage( img, 0, 0 );
    document.body.appendChild( canvas );
    return ctx.getImageData( 0, 0, w, h ).data;
}


var GLOBAL = {
  "vertex": "uniform float uniTime;\n\nattribute vec2 attPosition;\nattribute vec4 attRandom;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  varColor = vec3( attRandom.xyz );\n\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * c2);\n}\n",
  "fragment": "precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( 0.0, 0.0, 1.0, alpha * (1.0 - varCoeff * 0.5) );\n}\n"};
 
module.exports._ = _;
/**
 * @module wdg.gl7
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.gl7

 */
});