// Code behind.
"use strict";

var CODE_BEHIND = {
  init: init
};

var RADIUS = .5;


var M4 = require("webgl.math").m4;
var Resize = require("webgl.resize");
var Program = require("webgl.program");

function init() {
  var gl = createContext3D( this.$ );
  var prg = new Program( gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  });
  var vertices = createVertices( RADIUS );
  var buffData = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buffData );
  gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

  gl.enable( gl.DEPTH_TEST );
  gl.clearColor( 1, 1, 1, 1 );
  gl.clearDepth( 1 );

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

    prg.use();
    prg.$uniProjection = projection;
    prg.$uniRotation = rotation;
    prg.$uniScreenWidth = w;

    prg.bindAttribs( buffData, "attPoint", "attRadius" );
    gl.drawArrays( gl.POINTS, 0, vertices.length / 4 );
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
      radius * .5
    );
  }
  for( n=0; n<5; n++ ) {
    ang = Math.PI * ( n * 0.4 + 0.2 );
    vertices.push(
      radius * Math.cos( ang ),
      radius * Math.sin( ang ),
      radius * -.5
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

function createVertices( radius ) {
  if( typeof radius === 'undefined' ) radius = 1;

  var vert = createIcosahedronVertices( radius );
  var elem = createIcosahedronIndexes();
  var vertices = [];
  var faceIdx;
  var miniRadius = 0.3587 * radius;
  var x, y, z;
  var r;
  for( faceIdx=0; faceIdx<20 ; faceIdx++ ) {
    var x0 = vert[elem[3 * faceIdx + 0] * 3 + 0];
    var y0 = vert[elem[3 * faceIdx + 0] * 3 + 1];
    var z0 = vert[elem[3 * faceIdx + 0] * 3 + 2];
    var x1 = vert[elem[3 * faceIdx + 1] * 3 + 0];
    var y1 = vert[elem[3 * faceIdx + 1] * 3 + 1];
    var z1 = vert[elem[3 * faceIdx + 1] * 3 + 2];
    var x2 = vert[elem[3 * faceIdx + 2] * 3 + 0];
    var y2 = vert[elem[3 * faceIdx + 2] * 3 + 1];
    var z2 = vert[elem[3 * faceIdx + 2] * 3 + 2];
    x = x0 + x1 + x2;
    y = y0 + y1 + y2;
    z = z0 + z1 + z2;
    r = Math.sqrt( x*x + y*y + z*z ) / radius;

    vertices.push(
      x / r, y / r, z / r, miniRadius
    );
  }

  var loop;
  var coeff = 0.75;
  var miniRadius2 = miniRadius * coeff;
  r = radius;
  for( loop = 0; loop < 5; loop++ ) {
    r += miniRadius + miniRadius2;
    for( faceIdx=0; faceIdx<20 ; faceIdx++ ) {
      x = vertices[faceIdx * 4 + 0] * r / radius;
      y = vertices[faceIdx * 4 + 1] * r / radius;
      z = vertices[faceIdx * 4 + 2] * r / radius;
      vertices.push( x, y, z, miniRadius2 );
    }
    miniRadius = miniRadius2;
    miniRadius2 *= coeff;
  }
  console.info("[wdg.multiball-1] vertices=", vertices);
  return new Float32Array( vertices );
}
