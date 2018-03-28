"use strict";

window.LevelLogic = function() {
  function processRockOrDiam( level, col, row ) {
    var below = level.getType( row + 1, col );
    var falling = level.getVY( row, col ) != 0;
    if( below === Level.VOID ) {
      level.setVY( row, col, 1 );
    } else {
      level.setVY( row, col, 0 );
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
            processRockOrDiam( level, col, row );
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
