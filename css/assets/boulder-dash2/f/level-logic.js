"use strict";

window.LevelLogic = function() {
  function isRockOrDiam( level, col, row ) {
    var cell = level.getType( col, row );
    return cell === Level.ROCK || cell === Level.DIAM;
  }

  function isRockOrDiamOrWall( level, col, row ) {
    var cell = level.getType( col, row );
    return cell === Level.ROCK || cell === Level.DIAM || cell === Level.WALL;
  }

  function processFallingRockOrDiam( level, col, row, env, below ) {
    // La pierre est déjà en train de tomber.
    // On regarde s'il y a autre chose que du vide dessous. Si c'est
    // le cas, la chute est stoppée,  mais il peut aussi y avoir des
    // conséquences sur l'élément qui se trouvait en dessous.
    if( below !== Level.VOID ) {
      // On arrête la chute dans tous les cas.
      level.setVY( col, row, 0 );
      if( below == Level.ROCK || below == Level.WALL || below == Level.DUST ) {
        // Le rocher  (ou diamant)  a été  stoppé :  on joue  un son
        // adéquat.
        env.playBoom();
      }
      else if( below == Level.HERO ) {
        // On tombe sur le héro : ça le tue.
        env.killHero();
      }
      else if( below == Level.DIAM ) {
        // Si c'est une pierre qui tombe sur un diamant, il explose.
        if( level.getType( col, row ) === Level.ROCK ) {
          env.explode( col, row + 1 );
        }
      }
    } else {
      level.setType( col, row + 1, Level.BOOM );
    }
  }

  function processSteadyRockOrDiam( level, col, row, env, below ) {
    // La pierre est au repos.
    if( below === Level.VOID ) {
      level.setMove( col, row, 0, 1 );
      level.setType( col, row + 1, Level.BOOM );
    }
    else if( isRockOrDiamOrWall( level, col, row + 1 ) ) {
      if( !isRockOrDiam( level, col, row - 1 ) ) {
        // Si un rocher est posé sur un autre  et qu'il n'est pas sous un rocher/diamant, alors il
        // peut basculer à droite ou à gauche si l'espace est libre.
        if( level.getType( col + 1, row ) == Level.VOID
            && level.getType( col + 1, row + 1 ) == Level.VOID
            && !isRockOrDiam( level, col + 1, row - 1 ) )
        {
          // On tombe sur la droite.
          level.setMove( col, row, +1, 0 );
        }
        else if( level.getType( col - 1, row ) == Level.VOID
                 && level.getType( col - 1, row + 1 ) == Level.VOID
                 && !isRockOrDiam( level, col - 1 , row - 1 ) )
        {
          // On tombe sur la gauche seulement s'il n'y a pas déjà un
          // rocher qui tombe sur la droite juste en face.
          if( col < 2 || !isRockOrDiam( level, col - 2, row ) || level.getVX( col - 2, row ) < 1 ) {
            level.setMove( col, row, -1, 0 );
          }
        }
      }
    }
  }

  function processRockOrDiam( level, col, row, env ) {
    level.setVX( col, row, 0 ); // On arrête tout déplacement horizontal.

    var below = level.getType( col, row + 1 );
    var falling = level.getVY( col, row ) != 0;
    if( falling ) {
      processFallingRockOrDiam( level, col, row, env, below );
    } else {
      processSteadyRockOrDiam( level, col, row, env, below );
    }
  }

  function processExplosion( level, col, row ) {
    // Une explosion a une durée de vie de 2 cycles.
    if( level.getIndex( col, row ) > 0 ) {
      // Encore un cycle...
      level.setIndex( col, row, level.getIndex( col, row ) - 1 );
    } else {
      // C'est terminé pour l'explosion.
      level.setType( col, row, Level.VOID );
    }
  }

  function processHero( env, level, col, row ) {
    // Si le héro est mort, on ne fait rien du tout.
    if( !env.isHeroAlive ) return;

    var move = true;

    var vx = 0;
    var vy = 0;

    switch( GameInputs.action ) {
    case GameInputs.UP:
      vx = 0;
      vy = -1;
      break;
    case GameInputs.RIGHT:
      vx = 1;
      vy = 0;
      level.setIndex( col, row, 0 );
      break;
    case GameInputs.DOWN:
      vx = 0;
      vy = 1;
      break;
    case GameInputs.LEFT:
      vx = -1;
      vy = 0;
      level.setIndex( col, row, 1 );
      break;
    case GameInputs.SUICIDE:
      env.killHero();
      move = false;
      break;
    default:
      move = false;
      break;
    }

    if( move ) {
      var nextX = col + vx;
      var nextY = row + vy;
      var cell = level.getType( nextX, nextY );
      if( cell === Level.WALL || cell === Level.HERO ) {
        // Les murs arrêtent le déplacement. Les clones aussi.
        return;
      }

      if( cell === Level.ROCK ) {
        // Les rochers aussi, mais ils  peuvent être poussés s'ils ont
        // un espace vide derrière eux.
        if( vx === +1 && level.getType( nextX + 1, nextY ) === Level.VOID ) {
          level.setVX( nextX, nextY, +1 );
          level.flag( nextX, nextY );
        }
        else if( vx === -1 && level.getType( nextX - 1, nextY ) === Level.VOID ) {
          level.setVX( nextX, nextY, -1 );
        }
        // Le héro s'arrête net parce que le rocher est lourd.
        level.setMove( col, row, 0, 0 );
        vx = vy = 0;
      }
      else {
        if( cell === Level.DIAM ) env.eatDiam();
        else if( cell === Level.EXIT ) env.nextLevel();
        else if( cell === Level.BOOM ) env.killHero();
        level.setType( nextX, nextY, Level.VOID );
        level.flag( nextX, nextY );
        level.setMove( col, row, vx, vy );
      }
    }
    env.camX = col;
    env.camY = row;
    env.camVX = vx;
    env.camVY = vy;
  }

  return {
    // Déterminer les déplacements futurs.
    process: function( env ) {
      var level = env.level;
      var row, col;
      for( row = 0; row < level.rows; row++ ) {
        for( col = 0; col < level.cols; col++ ) {
          if( level.hasFlag( col, row ) ) {
            level.unflag( col, row );
            continue;
          }

          var cell = level.getType( col, row );
          if( cell === Level.ROCK || cell === Level.DIAM ) {
            processRockOrDiam( level, col, row, env );
          }
          else if( cell === Level.EXP1 ) {
            processExplosion( level, col, row );
          }
          else if( cell === Level.HERO ) {
            processHero( env, level, col, row );
          }
        }
      }
    },
    // Appliquer les déplacements de chaque cellule.
    apply: function( env ) {
      var level = env.level;
      var row, col;
      for( row = 0; row < level.rows; row++ ) {
        for( col = 0; col < level.cols; col++ ) {
          if( level.hasFlag( col, row ) ) {
            // Cellule avec un flag : il ne faut pas la traiter.
            level.unflag( col, row );
            continue;
          }
          var vx = level.getVX( col, row );
          var vy = level.getVY( col, row );
          if( vx != 0 || vy != 0 ) {
            level.move( col, row, col + vx, row + vy );
            if( vx > 0 || vy > 0 ) {
              // On  flag une  cellule  si  elle est  à  droite ou  en
              // dessous de  la cellule courante.  Cela  évitera de la
              // prendre  en compte  une  deuxième fois  dans le  même
              // cycle.
              level.flag( col + vx, row + vy );
            }
          }
        }
      }
    }
  };
}();
