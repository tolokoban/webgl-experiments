// Code behind.
"use strict";

var CODE_BEHIND = {
  init: init
};

var M4 = require("webgl.math").m4;
var Resize = require("webgl.resize");
var Program = require("webgl.program");


function init() {
  var that = this;

  var gl = createContext3D( this.$elements.canvas.$ );
  var prg = new Program( gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  });
  var vertices = createVertices();
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
    prg.$uniScreenWidth = w * window.devicePixelRatio;
    prg.$uniDistance = 0.5;
    prg.$uniRadius = 0.3587 * 0.5;
    prg.$uniAlpha = that.alpha;

    prg.bindAttribs( buffData, "attPoint", "attLevel" );
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

function createVertices() {
  var vert = createIcosahedronVertices();
  var elem = createIcosahedronIndexes();
  var vertices = [];
  var faceIdx;
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
    r = Math.sqrt( x*x + y*y + z*z );

    vertices.push( x / r, y / r, z / r, 0 );
  }

  var loop;
  for( loop = 1; loop < 9; loop++ ) {
    for( faceIdx=0; faceIdx<20 ; faceIdx++ ) {
      x = vertices[faceIdx * 4 + 0];
      y = vertices[faceIdx * 4 + 1];
      z = vertices[faceIdx * 4 + 2];
      vertices.push( x, y, z, loop );
    }
  }
  console.info("[wdg.multiball-1] vertices=", vertices);
  return new Float32Array( vertices );
}
