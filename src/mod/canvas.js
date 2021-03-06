"use strict";

const
$ = require( "dom" ),
DB = require( "tfw.data-binding" ),
Resize = require( "webgl.resize" );

module.exports = function ( slots ) {
  if( typeof slots.numbers === "undefined" ) slots.numbers = {};
  if( typeof slots.strings === "undefined" ) slots.strings = {};
  if( typeof slots.booleans === "undefined" ) slots.booleans = {};
  if( typeof slots.context === "undefined" ) slots.context = {};
  if( typeof slots.init !== "function" ) {
    slots.init = function(resolve) {
      resolve();
    };
  }
  if( typeof slots.draw !== "function" ) slots.draw = function() {
    // Empty
  };

  const webgl = {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true
  };
  for( let key in slots.context ) {
    webgl[key] = slots.context[key];
  }

  var constructor = function ( opts ) {
    var canvas = $.elem( this, 'canvas' );

    DB.propInteger( this, 'width' )( function ( v ) {
      canvas.setAttribute( 'width', v );
      canvas.style.width = v + "px";
    } );

    DB.propInteger( this, 'height' )( function ( v ) {
      canvas.setAttribute( 'height', v );
      canvas.style.height = v + "px";
    } );

    var defValues = { width: 640, height: 480 };

    var key, val;

    for( key in slots.strings ) {
      val = slots.strings[key];
      DB.propString( this, key );
      defValues[key] = val;
    }
    for( key in slots.numbers ) {
      val = slots.numbers[key];
      DB.propFloat( this, key );
      defValues[key] = val;
    }
    for( key in slots.booleans ) {
      val = slots.booleans[key];
      DB.propBoolean( this, key );
      defValues[key] = val;
    }

    opts = DB.extend( defValues, opts, this );

    window.setTimeout( start.bind( this, canvas, webgl, slots ), 20 );
  };

  return constructor;
};


function start( canvas, webgl, slots ) {
  var gl = canvas.getContext( 'webgl', webgl );
  this.gl = gl;
  Object.freeze( this.gl );

  var init = new Promise(slots.init.bind( this ));
  var draw = slots.draw.bind( this );

  var anim = function( time ) {
    window.requestAnimationFrame( anim );
    Resize( gl );
    draw( time );
  };
  init.then( anim );
}
