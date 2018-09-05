// Code behind.
"use strict";

var CODE_BEHIND = {
  init: init
};


var M4 = require("webgl.math").m4;
var Resize = require("webgl.resize");
var Program = require("webgl.program");
var EXPANSION1 = 0.06;
var EXPANSION2 = 0.075;

function init() {
  var gl = createContext3D( this.$ );
  var prg = new Program( gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  });
  var prgShadow = new Program( gl, {
    vert: GLOBAL.shadow_vert,
    frag: GLOBAL.shadow_frag
  });
  var vertices = createVertices();
  var buffData = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buffData );
  gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

  gl.enable( gl.DEPTH_TEST );
  gl.clearColor( 1, 1, 1, 1 );
  gl.clearDepth( 1 );
  gl.depthFunc( gl.LESS );
  gl.cullFace( gl.BACK );

  var projection = M4.identity();
  var rotation = M4.identity();

  var draw = function( time ) {
    requestAnimationFrame( draw );

    var w = gl.canvas.clientWidth;
    var h = gl.canvas.clientHeight;
    Resize( gl );

    M4.perspective( Math.PI * .35, w/h, .1, 10, projection );
    M4.rotationXY(
      3.27 * Math.cos( time * 0.000458),
      5.78 * Math.sin( time * 0.000147),
      rotation );
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    prgShadow.use();
    gl.enable(gl.CULL_FACE);
    prgShadow.$uniProjection = projection;
    prgShadow.$uniRotation = rotation;
    prgShadow.$uniExpansion = EXPANSION2;
    prgShadow.bindAttribs( buffData, "attPoint", "attNormal", "attColor" );
    gl.drawArrays( gl.TRIANGLES, 0, 60 );

    prg.use();
    gl.disable(gl.CULL_FACE);
    prg.$uniProjection = projection;
    prg.$uniRotation = rotation;
    prg.$uniExpansion = EXPANSION1;

    var speed = 200;  // Time to wait before next triangle.
    var pause = 15000;
    var duration = (20 * speed + pause);
    var t = time % (2 * duration);
    var count;
    if( t < duration ) {
      count = 3 * Math.ceil(t / speed);
      count = Math.min( 30, count );
    } else {
      t -= duration;
      count = 3 * Math.ceil(t / speed);
      count = 30 + Math.min( 30, count );
    }

    prg.bindAttribs( buffData, "attPoint", "attNormal", "attColor" );
    gl.drawArrays( gl.TRIANGLES, 0, count );    
  };

  requestAnimationFrame( draw );
}

function createContext3D( canvas ) {
  return canvas.getContext( "webgl", { preserveDrawingBuffer: true } );
}

function createIcosahedronVertices( radius ) {
  if( typeof radius === 'undefined' ) radius = 1;
  //#(vertices)
  var vertices = [0, 0, radius];
  var n, ang;
  for( n=0; n<5; n++ ) {
    ang = Math.PI * n * 0.4;
    vertices.push(
      radius * Math.cos( ang ),
      radius * Math.sin( ang ),
        .5
    );
  }
  for( n=0; n<5; n++ ) {
    ang = Math.PI * ( n * 0.4 + 0.2 );
    vertices.push(
      radius * Math.cos( ang ),
      radius * Math.sin( ang ),
      -.5
    );
  }
  vertices.push(0, 0, -radius);
  //#(vertices)
  return new Float32Array( vertices );
}

function createIcosahedronIndexes() {
  return new Uint16Array([
    0,1,2,   0,2,3,  0,3,4,  0,4,5,  0,5,1,
    1,6,2,   2,7,3,  3,8,4,  4,9,5,  5,10,1,
    11,10,9, 11,9,8, 11,8,7, 11,7,6, 11,6,10,
    10,6,1,  6,7,2,  7,8,3,  8,9,4,  9,10,5
  ]);
}

function createVertices() {
  var vert = createIcosahedronVertices();
  var elem = createIcosahedronIndexes();
  var vertices = [];
  var faceIdx;
  var cR, cG, cB;  // Color components.
  for( faceIdx=0; faceIdx<20 ; faceIdx++ ) {
    if( faceIdx < 10 ) {
      cR = 1;
      cG = .5;
      cB = 0;
    }
    else {
      cR = 0;
      cG = 0;
      cB = .8;
    }

    var x0 = vert[elem[3 * faceIdx + 0] * 3 + 0];
    var y0 = vert[elem[3 * faceIdx + 0] * 3 + 1];
    var z0 = vert[elem[3 * faceIdx + 0] * 3 + 2];
    var x1 = vert[elem[3 * faceIdx + 1] * 3 + 0];
    var y1 = vert[elem[3 * faceIdx + 1] * 3 + 1];
    var z1 = vert[elem[3 * faceIdx + 1] * 3 + 2];
    var x2 = vert[elem[3 * faceIdx + 2] * 3 + 0];
    var y2 = vert[elem[3 * faceIdx + 2] * 3 + 1];
    var z2 = vert[elem[3 * faceIdx + 2] * 3 + 2];
    var vxA = x1 - x0;
    var vyA = y1 - y0;
    var vzA = z1 - z0;
    var vxB = x2 - x0;
    var vyB = y2 - y0;
    var vzB = z2 - z0;
    var nx = vyA * vzB - vzA * vyB;
    var ny = vzA * vxB - vxA * vzB;
    var nz = vxA * vyB - vyA * vxB;
    vertices.push(
      x0, y0, z0, nx, ny, nz, cR, cG, cB,
      x1, y1, z1, nx, ny, nz, cR, cG, cB,
      x2, y2, z2, nx, ny, nz, cR, cG, cB
    );
  }
  console.info("[wdg.multiball-1] vertices=", vertices);
  return new Float32Array( vertices );
}
