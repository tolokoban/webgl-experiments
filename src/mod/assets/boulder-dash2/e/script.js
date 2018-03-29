"use strict";

WebGL.fetchAssets({
  diamSound: "../snd/diam.ogg",
  rockSound: "../snd/rock.ogg",
  coordsVert: "../coords.vert",
  coordsMoveVert: "../coords-move.vert",
  backgroundVert: "background.vert",
  backgroundFrag: "background.frag",
  backgroundTexture: "../img/background.jpg",
  wallVert: "wall.vert",
  wallFrag: "wall.frag",
  wallTexture: "../img/wall.jpg",
  levelVert: "level.vert",
  levelFrag: "level.frag",
  boulderTexture: "../img/row-boulder.png",
  exitTexture: "../img/exit.png",
  diamTexture: "../img/row-diam.png",
  heroTexture: "../img/row-walk.png",
  exploTexture: "../img/row-explo.png",
  groundTexture: "../img/ground.png"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var level = new Level( Levels[0] );
  assets.levelTexture = TextureAggregator( assets );

  var env = {
    gl: gl,
    level: level,
    assets: assets,
    x: 0, y: 0, z: 0, w: 1,
    cellTime: 200,  // Temps en ms pour traverser une cellule.
    nextSynchro: -1,
    eatenDiams: 0,
    //#(eatDiam)
    eatDiam: function() {
      // Les assets finissant par 'ogg', 'mp3' ou 'wav'
      // sont transpformés en tag AUDIO.
      assets.diamSound.pause();
      // Il n'existe pas de méthode `stop()`.
      // On doit donc faire une pause, puis
      // remettre le curseur au début de la piste.
      assets.diamSound.currentTime = 0;
      assets.diamSound.play();
      this.eatenDiams++;
    },
    //#(eatDiam)
    // Bruit du rocher dont la chute est stoppée par un obstacle.
    playBoom: function() {
      assets.rockSound.pause();
      assets.rockSound.currentTime = 0;
      assets.rockSound.play();
    },
    explode: function( col, row ) {
      var x, y;
      for( y = row - 1; y < row + 2; y++ ) {
        for( x = col - 1; x < col + 2; x++ ) {
          if( level.getType( y, x ) !== Level.WALL && level.getType( y, x ) !== Level.ROCK ) {
            level.setType( y, x, Level.EXPL );
            level.setIndex( y, x, 1 );
            level.setMove( y, x, 0, 0 );
          }
        }
      }
    },
    // Vie te mort du Héro.
    isHeroAlive: true,
    killHero: function() {
      this.isHeroAlive = false;
      var col, row;
      for( row = 0; row < this.level.rows; row++ ) {
        for( col = 0; col < this.level.cols; col++ ) {
          if( this.level.getType( row, col ) === Level.HERO ) {
            this.explode( col, row );
          }
        }
      }
    }
  };

  var heroIsDead = false;

  var backgroundPainter = new BackgroundPainter( env );
  var wallPainter = new WallPainter( env );
  var levelPainter = new LevelPainter( env );

  gl.clearColor( 0, 0, 0, 1 );
  gl.enable( gl.DEPTH_TEST );
  gl.clearDepth( 0 );
  gl.depthFunc( gl.GREATER );

  function anim( time ) {
    window.requestAnimationFrame( anim );

    env.time = time;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    env.width = w;
    env.height = h;
    env.w = Math.min(w, h) < 481 ? 2 : 1;
    gl.viewport(0, 0, w, h);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var level = env.level;

    //#(synchro)
    // A la synchro, on fait les calculs de mouvements.
    if( env.nextSynchro < 0 ) {
      env.nextSynchro = Math.ceil( time / env.cellTime ) * env.cellTime;
    }
    else if( time >= env.nextSynchro ) {
      env.nextSynchro = Math.ceil( time / env.cellTime ) * env.cellTime;

      HeroLogic.apply( env );
      LevelLogic.apply( env );

      LevelLogic.process( env );
      HeroLogic.process( env );
      levelPainter.update();
    }
    //#(synchro)



    //#(camera)
    // Positionner la caméra sur le héro.
    // Sauf si le cadrage arrive hors tableau.
    var t = (time % env.cellTime) / env.cellTime;
    env.x = Math.min(
      Math.max(
        level.heroX + t * level.heroVX,
        w * env.w * .5 / 64
      ),
      env.level.cols - 1 - w * env.w * .5 / 64
    );
    env.y = Math.min(
      Math.max(
        level.heroY + t * level.heroVY,
        h * env.w * .5 / 64
      ),
      env.level.rows - 1 - h * env.w * .5 / 64
    );
    //#(camera)



    // On affiche tout.
    levelPainter.draw( env );
    env.z = 0.2;
    wallPainter.draw( env );
    env.z = 0;
    backgroundPainter.draw( env );
  }
  window.requestAnimationFrame( anim );
});