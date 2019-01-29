"use strict";

const
    MathGL = require("webgl.math"),
    ImageProcessor = require("light-saber.image-processor");

const HEADER = `#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform sampler2D uniTexture;
uniform float uniStep;

varying vec2 varUV;

void main() {
    gl_FragColor = `;


class HorizontalBlur {
    constructor(gl, framebuffers, sourceName, size = 13, energy = 1) {
        this.gl = gl;
        this.framebuffers = framebuffers;
        this.sourceName = sourceName;
        this.imageProcessor = new ImageProcessor(gl, createFragmentShaderCode(size, energy));
        this.prg = this.imageProcessor.prg;
    }

    paint(time, delta) {
        const { gl, prg, imageProcessor, framebuffers, sourceName } = this;
        const fb = framebuffers[sourceName];

        prg.use();
        prg.$uniTexture = 0;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, fb.texture);
        prg.$uniStep = 1 / fb.height;

        imageProcessor.paint(time, delta);
    }
}

/**
 * Create an optimized GLSL code for a gaussian blur of a given size.
 *
 * @param  {[type]} size [description]
 *
 * @return {[type]}      [description]
 */
function createFragmentShaderCode(size, energy) {
    const binom = MathGL.computeBinomialCoeffs(size + 4);
    const subset = binom.slice(2, size + 2);
    const sum = subset.reduce((a, b) => a + b);
    const gauss = subset.map(x => (x * energy) / sum);
    const statements = [];
    const center = Math.floor(size / 2);

    if (size % 2 === 1) {
        // Odd number of elements. We have a central element.
        statements.push(tex(0, gauss[center]));
    }

    // Max value for Y.
    const radius = size / 2;

    for (let k = 0; k < center; k += 2) {
        const
            g0 = gauss[k],
            g1 = gauss[k + 1],
            x = radius - k - 2 * g1 / (g0 + g1),
            weight = g0 + g1;
        statements.push(tex(x, weight), tex(-x, weight));
    }

    return `${HEADER}${statements.join(" +\n        ")};\n}`;
}

/**
 * Create a statement for texture reading.
 *
 * @param {double} x - X position relative to current one.
 * @param {double} w - Pixel weight.
 *
 * @return {string} GLSL code.
 */
function tex(x, w) {
    if (x === 0) {
        return `texture2D( uniTexture, varUV ) * ${w}`;
    }
    return `texture2D( uniTexture, vec2(varUV.x + uniStep * ${x}, varUV.y) ) * ${w}`;
}

module.exports = HorizontalBlur;