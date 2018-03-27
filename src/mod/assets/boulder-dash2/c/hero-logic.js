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
      default:
        move = false;
        break;
      }

      if( move ) {
        var nextX = level.heroX + level.heroVX;
        var nextY = level.heroY + level.heroVY;
        var cell = env.level.getType( nextY, nextX );
        if( cell === Level.WALL || cell === Level.ROCK ) {
          // Les murs et les pierres arrêtent le déplacement.
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
      if( level.heroVX != 0 || level.heroVY != 0 ){
        console.log( level.heroX, level.heroY, level.heroVX, level.heroVY );
        level.setType( level.heroY, level.heroX, Level.VOID );
        level.heroX += level.heroVX;
        level.heroY += level.heroVY;
        level.setType( level.heroY, level.heroX, Level.HERO );
      }
    }
  };
}();
