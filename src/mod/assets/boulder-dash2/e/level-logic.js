"use strict";

window.LevelLogic = function() {
  function isRockOrDiam( level, col, row ) {
    var cell = level.getType( row, col );
    return cell === Level.ROCK || cell === Level.DIAM;
  }

  function processRockOrDiam( level, col, row, env ) {
    var below = level.getType( row + 1, col );
    var falling = level.getVY( row, col ) != 0;
    if( falling ) {
      // La pierre est déjà en train de tomber.
      if( below !== Level.VOID ) {
        if( below == Level.ROCK || below == Level.WALL || below == Level.DUST ) {
          level.setVX( row, col, 0 );
          level.setVY( row, col, 0 );
          // Le rocher  (ou diamant)  a été  stoppé :  on joue  un son
          // adéquat.
          env.playBoom();
        }
      }
    } else {
      // La pierre est immobile .
      if( below === Level.VOID ) {
        level.setVY( row, col, 1 );
      }
      else if( isRockOrDiam( level, col, row + 1 ) ) {
        // Si un  rocher est posé  sur un  autre il peut  basculer à
        // droite ou à gauche si l'espace est libre.
        if( level.getType( row, col + 1 ) == Level.VOID
            && level.getType( row + 1, col + 1 ) == Level.VOID )
        {
          // On tombe sur la droite.
          level.setVX( row, col, 1 );
        }
        else if( level.getType( row, col - 1 ) == Level.VOID
                 && level.getType( row + 1, col - 1 ) == Level.VOID )
        {
          // On tombe sur la gauche.
          level.setVX( row, col, -1 );
        }
      }
    }
  }

  return {
    process: function( env ) {
      var level = env.level;
      var row, col;
      for( row = 0; row < level.rows; row++ ) {
        for( col = 0; col < level.cols; col++ ) {
          var cell = level.getType( row, col );
          if( cell === Level.ROCK || cell === Level.DIAM ) {
            processRockOrDiam( level, col, row, env );
          }
        }
      }
    },
    apply: function( env ) {
      var level = env.level;
      var row, col;
      for( row = 0; row < level.rows; row++ ) {
        for( col = 0; col < level.cols; col++ ) {
          var vx = level.getVX( row, col );
          var vy = level.getVY( row, col );
          if( vx != 0 || vy != 0 ) {
            level.move( row, col, row + vy, col + vx );
          }
        }
      }
    }
  };
}();
