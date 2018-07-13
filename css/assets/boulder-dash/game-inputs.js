"use strict";

window.GameInputs = function() {
  var STILL = 0;
  var UP = 1;
  var RIGHT = 2;
  var DOWN = 3;
  var LEFT = 4;
  var state = [0,0,0,0,0];

  function clear() {
    state[0] = state[1] = state[2] = state[3] = state[4] = 0;
  }

  // Mouvement à l'aide des touches du clavier.
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
  }, true);
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
  }, true);
  
  // Mouvement au toucher.
  // Quand on arrête de toucher l'écran, le héro s'arrête.
  // Sinon, il continue dans la direction courante.
  // Pour définir une direction, il faut glisser son doigt
  // dans la direction voulue en gardant le doigt sur l'écran.
  var touchX, touchY, touchId = null;
  var SENSIBILITE = 2;  // Sensibilité en pixels.
  document.addEventListener( "touchstart", function( evt ) {
    // S'il y a déjà un doigt sur l'écran, on ignore les suivants.
    if( touchId ) return;
    
    var touch = evt.changedTouches[0];
    touchId = touch.identifier;
    touchX = touch.clientX;
    touchY = touch.clientY;
  });
  document.addEventListener( "touchend", function( evt ) {
    var touch = evt.changedTouches[0];
    if( touch.identifier === touchId ) {
      touchId = null;
      clear();
    }
  });
  document.addEventListener( "touchmove", function( evt ) {
    var touch = evt.changedTouches[0];
    // S'agit-il bien du premier doigt ?
    if( touch.identifier !== touchId ) return;

    var vx = touch.clientX - touchX;
    var vy = touch.clientY - touchY;
    if( Math.abs( vx ) > Math.abs( vy ) ) {
      // Déplacement horizontal.
      if( Math.abs( vx ) < SENSIBILITE ) return;
      clear();
      if( vx > 0 ) state[RIGHT] = 1;
      else state[LEFT] = 1;
    } else {
      // Déplacement vertical.
      if( Math.abs( vy ) < SENSIBILITE ) return;
      clear();
      if( vy > 0 ) state[DOWN] = 1;
      else state[UP] = 1;
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
