/** @module wdg.gl7 */require( 'wdg.gl7', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
<<<<<<< HEAD
  "vertex": "// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\n// Ces valeurs donnent la \"personnalité\" de la particule\nattribute vec4 attRandom;\n\n// Couleur pour le fragment shader\nvarying vec3 varColor;\n// Indique au fragment shader si les particules sont\n// en place (1.0) ou en mouvement désordonné (0.0)\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  // Position \"en place\" de la particule.\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  // Créer un léger mouvement autour de la position normale.\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  // Coordonnées aléatoires en rotation dans tout l'espace.\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  // Dans un cycle de 12 secondes, l'image est stable\n  // pendant 8 secondes et en vrac pendant 4.\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  // Petites variations de vert.\n  float color = .6 + .3 * abs(cos(attRandom.x * uniTime * 0.01));\n  varColor = vec3( color, color * 0.5, 0.0 );\n  // La position est intrerpolée entre (x,y) et (xx,yy).\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  // Palpitation de la taille et diminution lors de la phase de désordre.\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\n}\n",
  "fragment": "precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\n}\n"};
=======
  "vertex": "// Temps courant en millisecondes\r\nuniform float uniTime;\r\n\r\n// Position en valeurs comprises entre -1.0 et +1.0\r\nattribute vec2 attPosition;\r\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\r\n// Ces valeurs donnent la \"personnalité\" de la particule\r\nattribute vec4 attRandom;\r\n\r\n// Couleur pour le fragment shader\r\nvarying vec3 varColor;\r\n// Indique au fragment shader si les particules sont\r\n// en place (1.0) ou en mouvement désordonné (0.0)\r\nvarying float varCoeff;\r\n\r\nvoid main() {\r\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\r\n  // Position \"en place\" de la particule.\r\n  float x = attPosition.x;\r\n  float y = attPosition.y;\r\n\r\n  // Créer un léger mouvement autour de la position normale.\r\n  float radius = .02 * cos(t * attRandom.y);\r\n  float ang = uniTime * attRandom.z / 100.0;\r\n  x = x + radius * cos(ang);\r\n  y = y + radius * sin(ang);\r\n\r\n  // Coordonnées aléatoires en rotation dans tout l'espace.\r\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\r\n  ang = t * attRandom.x * 0.1;\r\n  float xx = radius * cos(ang);\r\n  float yy = radius * sin(ang);\r\n\r\n  // Dans un cycle de 12 secondes, l'image est stable\r\n  // pendant 8 secondes et en vrac pendant 4.\r\n  float c1 = 0.0;\r\n  float tt = mod(uniTime, 12000.0);\r\n  if (tt < 4000.0) {\r\n    c1 = sin(tt * 3.1415926539 / 4000.0);\r\n  }\r\n  float c2 = 1.0 - c1;\r\n\r\n  varCoeff = c2;\r\n  // Petites variations de vert.\r\n  float color = .6 + .3 * abs(cos(attRandom.x * uniTime * 0.01));\r\n  varColor = vec3( color, color * 0.5, 0.0 );\r\n  // La position est intrerpolée entre (x,y) et (xx,yy).\r\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\r\n  // Palpitation de la taille et diminution lors de la phase de désordre.\r\n  ang = t * attRandom.x;\r\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\r\n}\r\n",
  "fragment": "precision mediump float;\r\n\r\nvarying vec3 varColor;\r\nvarying float varCoeff;\r\n\r\nvoid main() {\r\n  // Calculons la distance du fragment courant\r\n  // au centre du point.\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  // On ne calcule pas la racine carré pour gagner du temps.\r\n  float r = x*x + y*y;\r\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\r\n\r\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\r\n}\r\n"};
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
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
var attribs = gl.getProgramParameter(shaderProgram, gl.ACTIVE_ATTRIBUTES);
for (var kk=0; kk < attribs; kk++) {
    console.log( gl.getActiveAttrib( shaderProgram, kk ) );
}
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
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
    gl.blendEquation(gl.FUNC_ADD);
    // #(blend)

    var uniTime = gl.getUniformLocation(shaderProgram, "uniTime");

    // #(rendering)
    gl.clearColor(0.133, 0.466, 1.0, 1.0);
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


  
module.exports._ = _;
/**
 * @module wdg.gl7
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding

 */
});