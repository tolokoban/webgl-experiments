"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { init };

const Resize = require("webgl.resize"),
      Program = require("webgl.program");

const COLORS = [
  [255, 127, 0],
  [0, 102, 221]
];

/**
 * @param {object}
 * @return {Element}
 */
function init( ) {
  const texture = {
    colors: {
      data: [],
      width: 2048
    }
  };

  for ( var j = 0; j < texture.colors.width; j++ ) {
    const i = Math.floor( Math.random() * COLORS.length );
    const [rr, gg, bb] = COLORS[i];
    
    //rr = gg = bb = 60;
    texture.colors.data.push( rr );
    texture.colors.data.push( gg );
    texture.colors.data.push( bb );
    texture.colors.data.push( 127 * ( 1 + Math.cos( Math.PI * 2 * j / texture.colors.width ) ) );
  }

  const plane = new Plane( {
    canvas: this.$elements.canvas.$,
    fps: this.$elements.fps.$,
    texture: texture,
    resolution: 1
  } );
  plane.start();
}


/**
 * @example
 * var Plane = require("webgl.plane");
 * var instance = new Plane();
 * @class Plane
 */
class Plane {
  constructor( args ) {
    if ( typeof args === 'undefined' ) args = {};
    if ( typeof args.uniform === 'undefined' ) args.uniform = {};
    if ( typeof args.texture === 'undefined' ) args.texture = {};
    if ( typeof args.resolution === 'undefined' ) args.resolution = 1;

    this._args = args;

    const canvas = args.canvas;
    if ( !canvas ) {
      throw Error( `Canvas not found in args.canvas!` );
    }
    const gl = canvas.getContext( "webgl" ) || canvas.getContext( "experimental-webgl" );

    this._prg = new Program( gl, GLOBAL );
    const W = 512, H = 512;
    this._squareVerticesBuffer = initBuffers( gl, W / args.resolution, H / args.resolution );

    const val = args.texture.colors;
    // Make sur data is an array of UNSIGNED_BYTE.
    val.data = new Uint8Array( val.data );
    const tex = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, tex );
    const width = val.width;
    const height = Math.floor( ( val.data.length >> 2 ) / width );
    gl.texImage2D(
      gl.TEXTURE_2D, // target
      0, // level
      gl.RGBA, // internal format
      width, height, // width, height
      0, // border
      gl.RGBA, // format
      gl.UNSIGNED_BYTE, // type
      val.data // data
    );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST );
    gl.generateMipmap( gl.TEXTURE_2D );

    this._gl = gl;
    this._started = false;
  }

  start() {
    const that = this;
    const gl = this._gl;
    const prg = this._prg;
    this._started = true;

    let time0 = 0;
    let nbFrames = 20;
    const fps = this._args.fps;

    function render( time ) {
      window.requestAnimationFrame( render );

      // Computing the FPS (Frames Per Second).
      if ( time0 === 0 ) {
        time0 = time;
        nbFrames = 20;
      } else {
        nbFrames--;
        if ( nbFrames <= 0 ) {
          fps.textContent = `${Math.floor( 0.5 + 20000 / ( time - time0 ) )} fps`;
          time0 = time;
          nbFrames = 20;
        }
      }

      Resize( gl, 1 );

      prg.use();
      prg.bindAttribs( that._squareVerticesBuffer, "aVertexPosition" );

      gl.activeTexture( gl.TEXTURE0 );      
      prg.$colors = 0;
      
      prg.$X = time * .1013;
      prg.$Y = time * .019;
      prg.$Z = time * .070;
      prg.$time = time;

      // Draw the square.
      gl.bindBuffer( gl.ARRAY_BUFFER, that._squareVerticesBuffer );
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }

    window.requestAnimationFrame( render );
  }
}


function initBuffers( gl, W, H ) {
  const squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, squareVerticesBuffer );
  const vertices = [
    W / 2, -H / 2, 0.0,
    -W / 2, -H / 2, 0.0,
    W / 2, H / 2, 0.0,
    -W / 2, H / 2, 0.0
  ];
  gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
  return squareVerticesBuffer;
}
