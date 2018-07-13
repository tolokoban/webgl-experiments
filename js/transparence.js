/** @module transparence */require( 'transparence', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "uniform float uniWidth;\r\nuniform float uniHeight;\r\nuniform float uniTime;\r\nuniform float uniSpeed;\r\nuniform float uniPhase;\r\n\r\nattribute vec2 attPosition;\r\n\r\nvoid main() {\r\n  float x = attPosition.x * cos(uniPhase + uniTime * uniSpeed);\r\n  float z = attPosition.x * sin(uniPhase + uniTime * uniSpeed);\r\n  float y = attPosition.y + z * 0.5;\r\n  float w = 1.0 + 0.5 * z;\r\n\r\n  gl_Position = vec4( x, y, z, w );\r\n}\r\n",
  "frag": "precision lowp float;\r\n\r\nuniform vec4 uniColor;\r\n\r\nvoid main() { \r\n  gl_FragColor = uniColor;\r\n}\r\n"};
  "use strict";

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");
var Program = require("webgl.program");
var PrgImage2d = require("prg.image2d");
var ImageLoader = require("image-loader");


/**
 * @class Transparence
 *
 * @param {boolean} opts.visible - Set the visiblity of the component.
 *
 * @example
 * var Transparence = require("transparence");
 * var instance = new Transparence({visible: false});
 */
var Transparence = function(opts) {
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
  DB.propBoolean( this, "white" );
  DB.propBoolean( this, "depth" );
  DB.propBoolean( this, "bright" );
  DB.propBoolean( this, "multiply" );
  DB.propRemoveClass( this, 'visible', 'hide' );

  opts = DB.extend({
    width: 480, height: 320,
    white: false,
    depth: true,
    bright: false,
    multiply: false,
    visible: true
  }, opts, this);

  ImageLoader({ back: "vangogh.jpg" }).then( start.bind( this ) );
};


function start( images ) {
  var gl = createWebGlContext.call( this );
  var background = new BackPainter( gl, images );
  var opaque = new OpaquePainter( gl );
  var glasses1 = new GlassPainter( gl, [
    {
      color: new Float32Array([ 1, 1, 0.5, 0.5 ]),
      speed: 0.00008121,
      phase: 0
    },
    {
      color: new Float32Array([ 1, 0.5, 1, 0.5 ]),
      speed: -0.00007155,
      phase: 2 * Math.PI / 3
    },
    {
      color: new Float32Array([ 0.5, 1, 1, 0.5 ]),
      speed: 0.00009142,
      phase: 4 * Math.PI / 3
    }
  ]);
  var glasses2 = new GlassPainter( gl, [
    {
      color: new Float32Array([ 1, 1, 0, 0.5 ]),
      speed: 0.00008121,
      phase: 0
    },
    {
      color: new Float32Array([ 1, 0, 1, 0.5 ]),
      speed: -0.00007155,
      phase: 2 * Math.PI / 3
    },
    {
      color: new Float32Array([ 0, 1, 1, 0.5 ]),
      speed: 0.00009142,
      phase: 4 * Math.PI / 3
    }
  ]);

  var that = this;

  gl.depthFunc( gl.LEQUAL );

  var anim = function( time ) {
    requestAnimationFrame( anim );

    gl.enable( gl.DEPTH_TEST );
    gl.clear( gl.DEPTH_BUFFER_BIT );
    gl.depthMask( true );

    gl.disable( gl.BLEND );
    if( that.white ) {
      gl.clearColor( 1, 1, 1, 1 );
      gl.clear( gl.COLOR_BUFFER_BIT );
    } else {
      background.paint( time );
    }
    opaque.paint( time );

    if( that.multiply ) {
      gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
    } else {
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    gl.enable( gl.BLEND );
    gl.depthMask( that.depth );

    if( that.bright ) {
      glasses1.paint( time );
    } else {
      glasses2.paint( time );
    }
  };
  requestAnimationFrame( anim );
}


function BackPainter( gl, images ) {
  var texture = gl.createTexture();

  gl.bindTexture( gl.TEXTURE_2D, texture );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );

  gl.activeTexture( gl.TEXTURE0 );
  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images.back );

  var canvas = gl.canvas;
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;
  var data = new Float32Array([
    0, 0, 1, 0, 0,
    w, 0, 1, 1, 0,
    0, h, 1, 0, 1,
    w, h, 1, 1, 1
  ]);
  var buff = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buff );
  gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );

  var prg = new PrgImage2d( gl );

  this.paint = function( time ) {
    prg.use();

    prg.$uniWidth = w;
    prg.$uniHeight = h;

    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    prg.$tex = 0;

    prg.bindAttribs( buff, "attPosition", "attUV" );
    gl.bindBuffer( gl.ARRAY_BUFFER, buff );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  };
}


function GlassPainter( gl, glasses ) {
  var canvas = gl.canvas;
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;
  var s = 0.4;
  var data = new Float32Array([
      -1, s,
      +1, s,
      -1, -s,
      +1, -s
  ]);
  var buff = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buff );
  gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );

  var prg = new Program( gl, GLOBAL );

  this.paint = function( time ) {
    prg.use();

    prg.$uniWidth = w;
    prg.$uniHeight = h;
    prg.$uniTime = time;

    prg.bindAttribs( buff, "attPosition" );
    gl.bindBuffer( gl.ARRAY_BUFFER, buff );

    glasses.forEach(function (glass) {
      prg.$uniSpeed = glass.speed;
      prg.$uniPhase = glass.phase;
      prg.$uniColor = glass.color;

      gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    });
  };
}


function OpaquePainter( gl ) {
  var canvas = gl.canvas;
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;
  var x = 0.6;
  var y = 0.6;
  var color = new Float32Array([ 0.7, 0.7, 0.7, 1 ]);
  var data = new Float32Array([
    -x * 0.5, y * 0.2,
    x, y,
    -x * 0.5, -y * 0.2,
    x, -y
  ]);
  var buff = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buff );
  gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );

  var prg = new Program( gl, GLOBAL );

  this.paint = function( time ) {
    prg.use();

    prg.$uniWidth = w;
    prg.$uniHeight = h;
    prg.$uniTime = time;
    prg.$uniSpeed = 0.001;
    prg.$uniPhase = 0;
    prg.$uniColor = color;

    prg.bindAttribs( buff, "attPosition" );
    gl.bindBuffer( gl.ARRAY_BUFFER, buff );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  };
}


function createWebGlContext() {
  var gl = this.element.getContext( "webgl", {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true
  } );

  return gl;
}

module.exports = Transparence;


  
module.exports._ = _;
/**
 * @module transparence
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:webgl.program
 * @see module:prg.image2d
 * @see module:image-loader

 */
});