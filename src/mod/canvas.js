"use strict";

var $ = require( "dom" );
var DB = require( "tfw.data-binding" );

module.exports = function ( slots ) {
  if( typeof slots.numbers === "undefined" ) slots.numbers = {};
  if( typeof slots.strings === "undefined" ) slots.strings = {};
  if( typeof slots.context === "undefined" ) slots.context = {};
  if( typeof slots.init !== "function" ) {
    slots.init = function(resolve) {
      resolve();
    };
  }
  if( typeof slots.draw !== "function" ) slots.draw = function() {};

  var key;
  var webgl = {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,    
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true
  };
  for( key in slots.context ) {
    webgl[key] = slots.context[key];    
  }
  
  var constructor = function ( opts ) {
    var canvas = $.elem( this, 'canvas' );
    this.canvas = canvas;
    Object.freeze( this.canvas );
    this.gl = canvas.getContext( 'webgl', webgl );
    Object.freeze( this.gl );

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

    opts = DB.extend( defValues, opts, this );

    var init = new Promise(slots.init.bind( this ));
    var draw = slots.draw.bind( this );

    var anim = function( time ) {
      window.requestAnimationFrame( anim );
      draw( time );
    };
    init.then(anim);
  };
  return constructor;
};