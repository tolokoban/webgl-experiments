"use strict";

WebGL.fetchAssets({
  musicSound: "../snd/music.ogg",
  diamSound: "../snd/diam.ogg",
  exitSound: "../snd/exit.ogg",
  explSound: "../snd/expl.ogg",
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
  assets.musicSound.addEventListener("canplay", function() {
    assets.musicSound.play();
  });
  
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var level = new Level( Levels[0] );
  assets.levelTexture = TextureAggregator( assets );

  //#(env)
  var env = {
    gl: gl,
    level: level,
    assets: assets,
    x: 0, y: 0, z: 0, w: 1,
    cellTime: 180,  // Temps en ms pour traverser une cellule.
    nextSynchro: -1,
    camX: level.cols / 2,
    camY: level.rows / 2,
    //#(eatDiam)
    eatenDiams: 0,
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
      console.log( this.eatenDiams, "/", this.level.need );
      if( this.eatenDiams == this.level.need ) {
        this.level.setType( this.level.exitX, this.level.exitY, Level.EXIT );
        assets.exitSound.play();
      }
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
          if( level.getType( x, y ) !== Level.WALL && level.getType( x, y ) !== Level.ROCK ) {
            level.setType( x, y, Level.EXP1 );
            level.setIndex( x, y, 1 );
            level.setMove( x, y, 0, 0 );
          }
        }
      }
      assets.explSound.pause();
      assets.explSound.currentTime = 0;
      assets.explSound.play();      
    },
    // Vie te mort du Héro.
    isHeroAlive: true,
    killHero: function() {
      this.camVX = this.camVY = 0;
      
      this.isHeroAlive = false;
      var col, row;
      for( row = 0; row < this.level.rows; row++ ) {
        for( col = 0; col < this.level.cols; col++ ) {
          if( this.level.getType( col, row ) === Level.HERO ) {
            this.explode( col, row );
          }
        }
      }
    },
    isLevelDone: false,
    nextLevel: function() {
      this.isLevelDone = true;
      this.killHero();
    }
  };
  //#(env)

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

      LevelLogic.apply( env );
      LevelLogic.process( env );
      levelPainter.update();
    }
    //#(synchro)

    //#(camera)
    // Positionner la caméra sur le héro.
    // Sauf si le cadrage arrive hors tableau.
    var t = (time % env.cellTime) / env.cellTime;
    env.x = Math.min(
      Math.max(
        env.camX + t * env.camVX,
        w * env.w * .5 / 64
      ),
      env.level.cols - 1 - w * env.w * .5 / 64
    );
    env.y = Math.min(
      Math.max(
        env.camY + t * env.camVY,
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
