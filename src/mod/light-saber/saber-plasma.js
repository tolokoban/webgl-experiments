"use strict";

const
    M4 = require("webgl.math").m4,
    Colors = require("light-saber.colors"),
    Program = require("webgl.program");

class Plasma {
    constructor(gl) {
        this.gl = gl;
        this.prg = new Program(gl, {
            vert: GLOBAL.vert,
            frag: GLOBAL.frag
        });
        this.buffVert = gl.createBuffer();
        this.buffElem = gl.createBuffer();
        const { arrayVert, arrayElem } = createMesh();
        this.arrayVert = arrayVert;
        this.arrayElem = arrayElem;
        this.countElem = arrayElem.length;

        console.info("arrayVert, arrayElem=", arrayVert, arrayElem);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffElem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrayElem, gl.STATIC_DRAW);

        this.projection = M4.identity();
        this.rotation = M4.identity();
        this.translation = new Float32Array([0, 0, 0, 0]);

        this.color = Colors.PLASMA;
    }

    paint(time, delta) {
        const { gl, prg, projection, rotation, translation, buffVert, countElem } = this;

        prg.use();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffElem);

        prg.$uniProjection = projection;
        prg.$uniRotation = rotation;
        prg.$uniTranslation = translation;
        prg.$uniColor = this.color;

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.cullFace(gl.BACK);

        prg.bindAttribs(buffVert, "attPoint");
        gl.drawElements(gl.TRIANGLES, countElem, gl.UNSIGNED_SHORT, 0);
    }

    destroy() {
        const gl = this.gl;
        gl.deleteBuffer(this.buffVert);
        gl.deleteBuffer(this.buffElem);
    }
}

/**
 * Create the vertex and the element array for the light saber hilt.
 * This is merely a cylinder.
 *
 * @returns {object} `{ arrayVert, arrayElem }`
 */
function createMesh() {
    const
        sectors = 12,
        angleStep = 2 * Math.PI / sectors,
        line = [
            [0, 0.91],
            [0.02, 0.90],
            [0.03, 0.89],
            [0.02, 0]
        ],
        arrayVert = [0, line[0][1], 0],
        arrayElem = [];
    // --------------
    // define vertice
    for (let k = 1; k < line.length; k++) {
        const ring = line[k];
        for (let i = 0; i < sectors; i++) {
            const
                ang = angleStep * i,
                [radius, y] = ring,
                x = radius * Math.cos(ang),
                z = radius * Math.sin(ang);
            arrayVert.push(x, y, z);
        }
    }

    // ------------
    // Define faces

    // Top cone.
    for (let i = 0; i < sectors; i++) {
        arrayElem.push(i + 1, 0, ((i + 1) % sectors) + 1);
    }

    // Rings.
    for (let k = 0; k < line.length - 2; k++) {
        const
            idxRing0 = 1 + sectors * k,
            idxRing1 = idxRing0 + sectors;
        for (let i = 0; i < sectors; i++) {
            const
                A = idxRing0 + i,
                B = idxRing1 + i,
                C = idxRing1 + (i + 1) % sectors,
                D = idxRing0 + (i + 1) % sectors;
            arrayElem.push(A, C, B);
            arrayElem.push(A, D, C);
        }
    }

    return {
        arrayVert: new Float32Array(arrayVert),
        arrayElem: new Uint16Array(arrayElem)
    };
}

module.exports = Plasma;