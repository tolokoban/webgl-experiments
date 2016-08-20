// https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");
var WebGL = require("tfw.webgl");

var Gl8 = function(opts) {
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


    var logo = new Image();
    logo.src = "css/wdg.gl7/tp.png";
    logo.onload = start.bind( this, canvas, logo );
};

function start(canvas, logo) {
    var webgl = new WebGL({canvas: canvas});
    var gl = webgl.gl;

    var prg = webgl.createProgram({
        vertex: GLOBAL['vertex'],
        fragment: GLOBAL['fragment']
    });

    // #(vertices)
    // Création d'un buffer dans la carte graphique.
    // Un buffer est un tableau de nombres.
    var bufAttributes = gl.createBuffer();
    // Définir ce buffer comme le buffer actif.
    gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);
    // Lire les pixels de l'image.
    var datAttributes = getAttributes(webgl, logo);
    var count = datAttributes.length / 6;
    // Copier des données dans le buffer actif.
    gl.bufferData(gl.ARRAY_BUFFER, datAttributes, gl.STATIC_DRAW);
    // #(vertices)

    // #(attributes)
    var bpe = datAttributes.BYTES_PER_ELEMENT;
    var blockSize = 6 * bpe;
    // #(attributes)

    // #(blend)
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
    gl.blendEquation(gl.FUNC_ADD);
    // #(blend)

    // #(framebuffer)
    var bufFrame = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, bufFrame);

    var texFrame = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texFrame);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texFrame, 0);

    var bufRender = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, bufRender);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 512, 512);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, bufRender);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // #(framebuffer)

    // #(flag)
    var prg2 = webgl.createProgram({
        vertex: GLOBAL.vertex2,
        fragment: GLOBAL.fragment2
    });

    var bufFlag = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufFlag);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            -1, +1,
            +1, -1,
            +1, +1
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(prg2.$attPosition);
    gl.vertexAttribPointer(prg2.$attPosition, 2, gl.FLOAT, false, 2 * bpe, 0);
    // #(flag)

    // #(rendering)
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    webgl.start(function(time) {
        prg.use();
        gl.bindFramebuffer(gl.FRAMEBUFFER, bufFrame);
        gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);
        gl.bufferData(gl.ARRAY_BUFFER, datAttributes, gl.STATIC_DRAW);

        // attPosition
        gl.enableVertexAttribArray(prg.$attPosition);
        gl.vertexAttribPointer(prg.$attPosition, 2, gl.FLOAT, false, blockSize, 0);
        // attRandom
        gl.enableVertexAttribArray(prg.$attRandom);
        gl.vertexAttribPointer(prg.$attRandom, 4, gl.FLOAT, false, blockSize, 2 * bpe);

        gl.uniform1f(prg.$uniTime, time);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
        gl.drawArrays(gl.POINTS, 0, count);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        //-------------------------------------------------------
        prg2.use();
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texFrame);
        gl.bindBuffer(gl.ARRAY_BUFFER, bufFlag);
        gl.drawArrays(gl.POINTS, 0, 4);
    });
    // #(rendering)
};


module.exports = Gl8;


function getAttributes(webgl, logo) {
    // Lire les pixels de l'image.
    var col, row, index = 0, data = webgl.getDataFromImage(logo);
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
    return new Float32Array(arrAttributes);
}


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
