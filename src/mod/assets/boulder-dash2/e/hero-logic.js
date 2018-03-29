"use strict";

window.HeroLogic = function() {
  return {
    process: function( env ) {
      var level = env.level;
      var move = true;

      level.heroVX = 0;
      level.heroVY = 0;

      switch( GameInputs.action ) {
      case GameInputs.UP:
        level.heroVX = 0;
        level.heroVY = -1;
        break;
      case GameInputs.RIGHT:
        level.heroVX = 1;
        level.heroVY = 0;
        level.heroIndex = 0;
        break;
      case GameInputs.DOWN:
        level.heroVX = 0;
        level.heroVY = 1;
        break;
      case GameInputs.LEFT:
        level.heroVX = -1;
        level.heroVY = 0;
        level.heroIndex = 1;
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
        var nextX = level.heroX + level.heroVX;
        var nextY = level.heroY + level.heroVY;
        var cell = level.getType( nextY, nextX );
        if( cell === Level.WALL ) {
          // Les murs arrêtent le déplacement.
          level.heroVX = 0;
          level.heroVY = 0;
        }
        else if( cell === Level.ROCK ) {
          // Les rochers aussi,  mais ils peuvent être  poussés au cas
          // où ils ont un espace vide derrière eux.
          if( level.heroVX === +1 && level.getType( nextY, nextX + 1 ) === Level.VOID ) {
            level.setVX( nextY, nextX, +1 );
          }
          else if( level.heroVX === -1 && level.getType( nextY, nextX - 1 ) === Level.VOID ) {
            level.setVX( nextY, nextX, -1 );
          }
          // Le héro s'arrête net.
          level.heroVX = 0;
          level.heroVY = 0;
        }
        else {
          if( cell === Level.DIAM ) env.eatDiam();
          level.setType( nextY, nextX, Level.VOID );
        }
      }
    },
    apply: function( env ) {
      var level = env.level;
      var vx = level.heroVX;
      var vy = level.heroVY;
      if( vx != 0 || vy != 0 ){
        var x = level.heroX;
        var y = level.heroY;
        level.move( y, x, y + vy, x + vx );
        level.heroX = x + vx;
        level.heroY = y + vy;
      }
    }
  };
}();
