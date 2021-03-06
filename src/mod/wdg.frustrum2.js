// Code behind.
"use strict";

var CODE_BEHIND = {
  init: init,
  draw: draw
};


var Program = require("webgl.program");


function init() {
  this._3d = createContext3D( this.$elements.projection.$ );
  this._2d = createContext2D( this.$elements.flat.$ );

  this._prg = new Program( this._3d, GLOBAL );
  var vertices = createBufferForAllOurCubes();
  console.info("[wdg.frustrum2] vertices=", vertices);
  this._bpe = vertices.BYTES_PER_ELEMENT;
  this._count = Math.floor( vertices.length / 6 );
  this._buffer = this._3d.createBuffer();
  this._3d.bindBuffer( this._3d.ARRAY_BUFFER, this._buffer );
  this._3d.bufferData( this._3d.ARRAY_BUFFER, vertices, this._3d.STATIC_DRAW );
  draw.call( this );
}


/**
 * Afficher
 */
function draw() {
  if( this._3d ) draw3D.call( this );
  if( this._2d ) draw2D.call( this );
}

function draw2D() {
  var n = this.argN;
  var f = this.argF;
  var h = this.argH;
  var ctx = this._2d;
  var W = ctx.canvas.width;
  var H = ctx.canvas.height;
  ctx.clearRect( 0, 0, W, H );
  try {
    if( n <= 0 ) throw "N doit être strictement positif !";
    if( f <= n ) throw "F doit être strictement supérieur à N !";
    if( h <= 0 ) throw "H doit être strictement positif !";
  }
  catch( ex ) {
    ctx.fillStyle = "red";
    ctx.fillText( ex, 0, 10 );
  }

  var h2 = h * f / n;
  ctx.save();
  ctx.translate( 0, H / 2 );
  var zoom = Math.min( W / f, H / (2 * h2) ) * .9;
  ctx.scale( zoom, zoom );

  ctx.fillStyle = "#f70";
  ctx.beginPath();
  ctx.moveTo( n, h );
  ctx.lineTo( f, h2 );
  ctx.lineTo( f, -h2 );
  ctx.lineTo( n, -h );
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1 / zoom;
  var x, y;
  for( x = 0; x < 11; x++ ) {
    ctx.beginPath();
    ctx.moveTo( x, -h2 * 10 );
    ctx.lineTo( x, h2 * 10 );
    ctx.stroke();
  }
  for( y = -5; y < 6; y++ ) {
    ctx.beginPath();
    ctx.moveTo( 0, y );
    ctx.lineTo( 10, y );
    ctx.stroke();
  }

  ctx.fillStyle = "#000";
  ctx.globalAlpha = .3;
  var r = .5;
  for( x = -3; x > -10; x -= 2 ) {
    for( y = -5; y < 6 ; y += 2 ) {
      ctx.fillRect( -x - r, -y - r, 2*r, 2*r );
    }
  }
  ctx.globalAlpha = 1;

  ctx.lineWidth = 4 / zoom;
  ctx.strokeStyle = "#28f";
  ctx.beginPath();
  ctx.moveTo( 0, 0 );
  ctx.lineTo( f * 10, h2 * 10 );
  ctx.moveTo( 0, 0 );
  ctx.lineTo( f * 10, -h2 * 10 );
  ctx.stroke();

  ctx.restore();
}

function draw3D() {
  var gl = this._3d;
  var prg = this._prg;

  //#(draw)
  prg.use();
  var proj = createProjectionMatrix( this._3d.canvas, this.argN, this.argF, this.argH );
  console.info("[wdg.frustrum2] proj=", proj);
  prg.$uniProjection = proj;

  gl.enable( gl.DEPTH_TEST );
  gl.clearColor( 1, 1, 1, 1 );
  gl.clearDepth( 1 );
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  gl.depthFunc( gl.LESS );

  var bpe = this._bpe;
  var block = 6 * bpe;

  var attPoint = gl.getAttribLocation( prg.program, "attPoint" );
  gl.enableVertexAttribArray( attPoint );
  gl.vertexAttribPointer( attPoint, 3, gl.FLOAT, false, block, 0 * bpe );

  var attColor = gl.getAttribLocation( prg.program, "attColor" );
  gl.enableVertexAttribArray( attColor );
  gl.vertexAttribPointer( attColor, 3, gl.FLOAT, false, block, 3 * bpe );

  this._3d.bindBuffer( this._3d.ARRAY_BUFFER, this._buffer );
  gl.drawArrays( gl.TRIANGLES, 0, this._count );
  //#(draw)
}

//#(createProjectionMatrix)
function createProjectionMatrix( canvas, n, f, h ) {
  try {
    var W = canvas.width;
    var H = canvas.height;
    if( W >= H ) {
      return new Float32Array([
        n/h, 0,           0,           0,
        0,   n*W / (h*H), 0,           0,
        0,   0,           (n+f)/(n-f), -1,
        0,   0,           2*n*f/(n-f), 0
      ]);
    } else {
      return new Float32Array([
        n*H/(h*W), 0,   0,           0,
        0,         h/n, 0,           0,
        0,         0,   (n+f)/(n-f), -1,
        0,         0,   2*n*f/(n-f), 0
      ]);
    }
  }
  catch( ex ) {
    // Si les arguments  n, f et h produisent  une incohérence (par exemple, n=0  donne une division
    // par zéro), alors on retourne une matrice nulle et rien ne sera affiché.
    return new Float32Array([
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ]);
  }
}
//#(createProjectionMatrix)

function createContext3D( canvas ) {
  return canvas.getContext( "webgl", { preserveDrawingBuffer: true } );
}


function createContext2D( canvas ) {
  return canvas.getContext( "2d" );
}


function createBufferForAllOurCubes() {
  var x, y, z;
  // Rayon du cube (moitié d'un côté).
  var r = .5;
  var arr = [];
  var shadow;
  for( z = -3; z > -10; z -= 2 ) {
    shadow = 1 + (z + 2.5) / 15;
    for( y = -5; y < 6 ; y += 2 ) {
      for( x = -5; x < 6 ; x += 2 ) {
        // Face.
        addQuad(
          arr,
          x - r, y - r, z + r,
          x + r, y - r, z + r,
          x + r, y + r, z + r,
          x - r, y + r, z + r,
          shadow, 0.4667 * shadow, 0
        );
        // Droite.
        addQuad(
          arr,
          x + r, y - r, z - r,
          x + r, y + r, z - r,
          x + r, y + r, z + r,
          x + r, y - r, z + r,
          0.1333 * shadow, 0.5333 * shadow, shadow
        );
        // Gauche.
        addQuad(
          arr,
          x - r, y - r, z - r,
          x - r, y + r, z - r,
          x - r, y + r, z + r,
          x - r, y - r, z + r,
          0.1333 * shadow, 0.5333 * shadow, shadow
        );
        // Bas.
        addQuad(
          arr,
          x - r, y - r, z - r,
          x + r, y - r, z - r,
          x + r, y - r, z + r,
          x - r, y - r, z + r,
          0.0667 * shadow, 0.2667 * shadow, 0.5 * shadow
        );
        // Haut.
        addQuad(
          arr,
          x - r, y + r, z - r,
          x + r, y + r, z - r,
          x + r, y + r, z + r,
          x - r, y + r, z + r,
          0.5667 * shadow, 0.7667 * shadow, shadow
        );
      }
    }
  }
  return new Float32Array( arr );
}


function addQuad( arr, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, r, g, b ) {
  arr.push(
    x1, y1, z1, r, g, b,
    x2, y2, z2, r, g, b,
    x3, y3, z3, r, g, b,
    x1, y1, z1, r, g, b,
    x3, y3, z3, r, g, b,
    x4, y4, z4, r, g, b
  );
}
