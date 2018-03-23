"use strict";

window.GameInputs = function() {
  var STILL = 0;
  var UP = 1;
  var RIGHT = 2;
  var DOWN = 3;
  var LEFT = 4;
  var state = [0,0,0,0,0];

  document.addEventListener( "keydown", function( evt ) {
    var catchKey = true;
    switch( evt.key.toLowerCase() ) {
    case 'arrowup':
      state[UP] = 1;
      break;
    case 'arrowright':
      state[RIGHT] = 1;
      break;
    case 'arrowdown':
      state[DOWN] = 1;
      break;
    case 'arrowleft':
      state[LEFT] = 1;
      break;
    default:
      catchKey = false;
    }
    if( catchKey ) evt.preventDefault();
  });

  document.addEventListener( "keyup", function( evt ) {
    switch( evt.key.toLowerCase() ) {
    case 'arrowup':
      state[UP] = 0;
      break;
    case 'arrowright':
      state[RIGHT] = 0;
      break;
    case 'arrowdown':
      state[DOWN] = 0;
      break;
    case 'arrowleft':
      state[LEFT] = 0;
      break;
    }
  });
  
  var context = {
    STILL: 0,
    UP: UP,
    RIGHT: RIGHT,
    DOWN: DOWN,
    LEFT: LEFT
  };

  Object.defineProperty( context, "action", {
    get: function() {
      if( state[UP] ) return UP;
      if( state[RIGHT] ) return RIGHT;
      if( state[DOWN] ) return DOWN;
      if( state[LEFT] ) return LEFT;
      return STILL;
    }
  });

  return context;
}();
