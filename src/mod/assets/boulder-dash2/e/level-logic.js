"use strict";

window.LevelLogic = function() {
  function isRockOrDiam( level, col, row ) {
    var cell = level.getType( row, col );
    return cell === Level.ROCK || cell === Level.DIAM;
  }

  function isRockOrDiamOrWall( level, col, row ) {
    var cell = level.getType( row, col );
    return cell === Level.ROCK || cell === Level.DIAM || cell === Level.WALL;
  }

  function processRockOrDiam( level, col, row, env ) {
    var below = level.getType( row + 1, col );
    var falling = level.getVY( row, col ) != 0;
    if( falling ) {
      // La pierre est déjà en train de tomber.
      console.log("Falling! ", col, row );
      if( below !== Level.VOID ) {
        console.info("[level-logic] below=", below);
        level.setVX( row, col, 0 );
        level.setVY( row, col, 0 );
        if( below == Level.ROCK || below == Level.WALL || below == Level.DUST ) {
          // Le rocher  (ou diamant)  a été  stoppé :  on joue  un son
          // adéquat.
          env.playBoom();
        }
        else if( below == Level.HERO ) {
          env.killHero();
        }
        else if( below == Level.DIAM ) {
          env.explode( row + 1, col );
        }
      }
    } else {
      // La pierre est immobile .
      if( below === Level.VOID ) {
        level.setVY( row, col, 1 );
        console.log("Début de la chute");
      }
      else if( isRockOrDiamOrWall( level, col, row + 1 ) ) {
        if( !isRockOrDiam( level, col, row - 1 ) ) {
          // Si un rocher est posé sur un autre  et qu'il n'est pas sous un rocher/doamant, alors il
          // peut basculer à droite ou à gauche si l'espace est libre.
          if( level.getType( row, col + 1 ) == Level.VOID
              && level.getType( row + 1, col + 1 ) == Level.VOID
              && !isRockOrDiam( level, col + 1, row - 1 ) )
          {
            // On tombe sur la droite.
            level.setVX( row, col, 1 );
          }
          else if( level.getType( row, col - 1 ) == Level.VOID
                   && level.getType( row + 1, col - 1 ) == Level.VOID
                   && !isRockOrDiam( level, col - 1 , row - 1 ) )
          {
            // On tombe sur la gauche.
            level.setVX( row, col, -1 );
          }
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
          else if( cell === Level.EXPL ) {
            if( level.getIndex( row, col ) > 0 ) {
              level.setIndex( row, col, level.getIndex( row, col ) - 1 );
            } else {
              level.setType( row, col, Level.VOID );
            }
          }
        }
      }
    },
    apply: function( env ) {
      var level = env.level;
      var row, col;
      for( row = 0; row < level.rows; row++ ) {
        for( col = 0; col < level.cols; col++ ) {
          if( level.hasFlag( row, col ) ) {
            level.unflag( row, col );
            continue;
          }
          var vx = level.getVX( row, col );
          var vy = level.getVY( row, col );
          if( vx != 0 || vy != 0 ) {
            console.info("[level-logic] col, row, vx, vy, level.data=", col, row, vx, vy, level.data);
            level.move( row, col, row + vy, col + vx );
            if( vx > 0 || vy > 0 ) {
              level.flag( row + vy, col + vx );
            }
          }
        }
      }
    }
  };
}();
