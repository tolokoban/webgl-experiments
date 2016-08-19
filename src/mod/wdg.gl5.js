"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

var WdgGl5 = function(opts) {
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

    var W = canvas.width;
    var H = canvas.height;
    var spritesCount = 50;
    var sprites = createSprites( spritesCount );

    // #(defineAttributes)
    var squareVerticesBuffer = gl.createBuffer();
    // Créer un tableau d'attributs pour tous les
    // sprites. Il nous faut 3 éléments pour les
    // coordonnées, 1 pour l'index, 1 pour l'angle
    // et 1 pour le facteur de zoom. Et chaque
    // sprite a besoin de 4 vertex.
    var spritesAttributes = new Float32Array(
        spritesCount * (3 + 1 + 1 + 1) * 4
    );
    // Récupérer la taille en octets d'un élément
    // du tableau.
    var bpe = spritesAttributes.BYTES_PER_ELEMENT;
    // Taille en octets d'un bloc représentant
    // tous les attributs d'un vertex.
    var blockSize = (3 + 1 + 1 + 1) * bpe;

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    // Définir la position des valeurs de l'attribute `attPosition`.
    var attPosition = gl.getAttribLocation(shaderProgram, "attPosition");
    gl.enableVertexAttribArray(attPosition);
    gl.vertexAttribPointer(attPosition, 3, gl.FLOAT, false, blockSize, 0);
    // Définir la position des valeurs de l'attribute `attIndex`.
    var attIndex = gl.getAttribLocation(shaderProgram, "attIndex");
    gl.enableVertexAttribArray(attIndex);
    gl.vertexAttribPointer(attIndex, 1, gl.FLOAT, false, blockSize, 3 * bpe);
    // Définir la position des valeurs de l'attribute `attScale`.
    var attScale = gl.getAttribLocation(shaderProgram, "attScale");
    gl.enableVertexAttribArray(attScale);
    gl.vertexAttribPointer(attScale, 1, gl.FLOAT, false, blockSize, 4 * bpe);
    // Définir la position des valeurs de l'attribute `attRotation`.
    var attRotation = gl.getAttribLocation(shaderProgram, "attRotation");
    gl.enableVertexAttribArray(attRotation);
    gl.vertexAttribPointer(attRotation, 1, gl.FLOAT, false, blockSize, 5 * bpe);
    // #(defineAttributes)

    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "attVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var uniWidth = gl.getUniformLocation(shaderProgram, "uniWidth");
    var uniHeight = gl.getUniformLocation(shaderProgram, "uniHeight");

    // #(draw)
    // Activer le test de profondeur.
    gl.disable(gl.DEPTH_TEST);
    //gl.depthFunc(gl.LEQUAL);

    // Charger la texture.
    var image = new Image();
    image.onload = function() {
        // Dessiner la prochaine frame.
        window.requestAnimationFrame( draw );
    };
    image.onerror = function(err) {
        throw(err);
    };
    image.src = "css/wdg.gl5/champi.png";

    // Définir la transparence pour les sprites.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    function draw( t ) {

        // Create a texture.
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Upload the image into the texture.
        gl.texImage2D(
            gl.TEXTURE_2D, 0, 
            gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, 
            image);

        // Valeurs pour la taille de l'écran.
        gl.uniform1f(uniWidth, canvas.width);
        gl.uniform1f(uniHeight, canvas.height);

        // Mettre à jour le tableau des attributs.
        var idx = 0;
        sprites.forEach(function (sprite, spriteIdx) {
            var x = sprite.x * W;
            var y = H - Math.abs(Math.cos(sprite.y * Math.PI + t * sprite.scale / 3613)) * H;
            var z = Math.cos( t * sprite.scale / 2700);
            var scale = 48 * (1 - .4 * z);
            var rotation = t * sprite.rotation / 700;
            // Alimentons le tableau.
            [0, 1, 3, 2].forEach(function (index) {
                spritesAttributes[idx++] = x;
                spritesAttributes[idx++] = y;
                spritesAttributes[idx++] = z;
                spritesAttributes[idx++] = index;
                spritesAttributes[idx++] = scale;
                spritesAttributes[idx++] = rotation;
            });
        });
        // Transférer le tableau dans la mémoire
        // de la carte graphique.
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER, spritesAttributes, gl.STATIC_DRAW
        );

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (var i = 0; i < spritesCount; i++) {
            gl.drawArrays(gl.TRIANGLE_STRIP, i * 4, 4);
        }

        window.requestAnimationFrame( draw );
    }

    // #(draw)
    // #(code)
};


module.exports = WdgGl5;


// #(createSprites)
function createSprites( count ) {
    var sprites = [];
    while (count --> 0) {
        sprites.push({
            x: rand(0, 1),
            y: rand(0, 1),
            z: rand(0.1, 0.9),
            // Taille initiale.
            size: rand(20, 100),
            // Vitesse de changement de taille.
            scale: rand(0.7, 3.2),
            // Vitesse de rotation.
            rotation: rand(-2, 2)
        });
    }
    return sprites;
}

// Retourne un nombre aléatoire compris
// entre `min` et `max` .
function rand(min, max) {
    return min + Math.random() * (max - min);
}
// #(createSprites)

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
