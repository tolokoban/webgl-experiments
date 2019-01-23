"use strict";

const
    M4 = require( "webgl.math" ).m4,
    Program = require( "webgl.program" );

class Hilt {
    constructor( gl ) {
        this.gl = gl;
        this.prg = new Program( gl, {
            vert: GLOBAL.vert,
            frag: GLOBAL.frag
        } );
        this.buffVert = gl.createBuffer();
        this.buffElem = gl.createBuffer();
        const { arrayVert, arrayElem } = createMesh();
        this.arrayVert = arrayVert;
        this.arrayElem = arrayElem;
        this.countElem = arrayElem.length;

        gl.bindBuffer( gl.ARRAY_BUFFER, this.buffVert );
        gl.bufferData( gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.buffElem );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, arrayElem, gl.STATIC_DRAW );

        this.projection = M4.identity();
        this.rotation = M4.identity();
        this.translation = new Float32Array( [ 0, -0.1, -1, 0 ] );
    }

    paint( time, delta ) {
        const { gl, prg, projection, rotation, translation, buffVert, countElem } = this;

        prg.use();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.buffVert );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.buffElem );

        prg.$uniProjection = projection;
        prg.$uniRotation = rotation;
        prg.$uniTranslation = translation;

        gl.enable( gl.CULL_FACE );
        gl.enable( gl.DEPTH_TEST );
        gl.cullFace( gl.BACK );

        prg.bindAttribs( buffVert, "attPoint", "attNormal" );
        gl.drawElements( gl.TRIANGLES, countElem, gl.UNSIGNED_SHORT, 0 );
    }

    destroy() {
        const gl = this.gl;
        gl.deleteBuffer( this.buffVert );
        gl.deleteBuffer( this.buffElem );
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
        attribs = 6,
        sectors = 12,
        angleStep = 2 * Math.PI / sectors,
        line = [
            [ 0, 0 ],
            [ 0.05, 0.02 ],
            [ 0.02, 0 ],
            [ 0.03, -0.10 ],
            [ 0.03, -0.15 ],
            [ 0.02, -0.25 ],
            [ 0.03, -0.26 ],
            [ 0, -0.27 ]
        ],
        arrayVert = [ 0, line[ 0 ][ 1 ], 0, 0, 1, 0 ],
        arrayElem = [];
    // --------------
    // define vertice
    for ( let k = 1; k < line.length - 1; k++ ) {
        const
            ring0 = line[ k - 1 ],
            ring1 = line[ k ],
            ring2 = line[ k + 1 ];
        for ( let i = 0; i < sectors; i++ ) {
            const
                ang = angleStep * i,
                [ radius0, y0 ] = ring0,
                x0 = radius0 * Math.cos( ang ),
                z0 = radius0 * Math.sin( ang ),
                [ radius1, y1 ] = ring1,
                x1 = radius1 * Math.cos( ang ),
                z1 = radius1 * Math.sin( ang ),
                [ radius2, y2 ] = ring2,
                x2 = radius2 * Math.cos( ang ),
                z2 = radius2 * Math.sin( ang ),
                [ nx, ny, nz ] = computeNormal(
                    x0, y0, z0,
                    x1, y1, z1,
                    x2, y2, z2
                );
            arrayVert.push( x1, y1, z1, nx, ny, nz );
        }
    }
    // Add bottom vertex.
    arrayVert.push( 0, line[ line.length - 1 ][ 1 ], 0, 0, -1, 0 );

    // ------------
    // Define faces

    // Top cone.
    for ( let i = 0; i < sectors; i++ ) {
        arrayElem.push( i + 1, 0, ( ( i + 1 ) % sectors ) + 1 );
    }

    // Rings.
    for ( let k = 0; k < line.length - 3; k++ ) {
        const
            idxRing0 = 1 + sectors * k,
            idxRing1 = idxRing0 + sectors;
        for ( let i = 0; i < sectors; i++ ) {
            const
                A = idxRing0 + i,
                B = idxRing1 + i,
                C = idxRing1 + ( i + 1 ) % sectors,
                D = idxRing0 + ( i + 1 ) % sectors;
            arrayElem.push( A, C, B );
            arrayElem.push( A, D, C );
        }
    }

    // Bottom cone.
    const
        idxBottom = Math.floor( arrayVert.length / attribs ) - 1,
        idxRing = idxBottom - sectors;
    for ( let i = 0; i < sectors; i++ ) {
        arrayElem.push( idxBottom, idxRing + i, idxRing + ( i + 1 ) % sectors );
    }

    return {
        arrayVert: new Float32Array( arrayVert ),
        arrayElem: new Uint16Array( arrayElem )
    };
}

/**
 * [computeNormal description]
 *
 * @param   {[type]} x0 [description]
 * @param   {[type]} y0 [description]
 * @param   {[type]} z0 [description]
 * @param   {[type]} x1 [description]
 * @param   {[type]} y1 [description]
 * @param   {[type]} z1 [description]
 * @param   {[type]} x2 [description]
 * @param   {[type]} y2 [description]
 * @param   {[type]} z2 [description]
 * @returns {[type]}    [description]
 */
function computeNormal( x0, y0, z0, x1, y1, z1, x2, y2, z2 ) {
    const
        vxA = x0 - x1,
        vyA = y0 - y1,
        vzA = z0 - z1,
        invLenA = 1 / Math.sqrt( vxA * vxA + vyA * vyA + vzA * vzA ),
        vxB = x2 - x1,
        vyB = y2 - y1,
        vzB = z2 - z1,
        invLenB = 1 / Math.sqrt( vxB * vxB + vyB * vyB + vzB * vzB ),
        vx = invLenA * vxA + invLenB * vxB,
        vy = invLenA * vyA + invLenB * vyB,
        vz = invLenA * vzA + invLenB * vzB,
        invLen = 1 / Math.sqrt( vx * vx + vy * vy + vz * vz ),
        vnx = vx * invLen,
        vny = vy * invLen,
        vnz = vz * invLen,
        proj = x1 * vnx + y1 * vny + z1 * vnz;
    // The normal vector can be directed to the center of the object with this calculus.
    // If it is the case, we need to flip it.
    return proj > 0 ? [ vnx, vny, vnz ] : [ -vnx, -vny, -vnz ];
}

module.exports = Hilt;