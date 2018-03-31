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
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");
  var header = document.createElement("header");
  header.innerHTML = "<div>Life x <b id='life'>3</b></div><div><b id='score'>0</b></div><div id='bonus'>0</div><div><b id='diam'>12</b> x diam</div>";
  document.body.appendChild( header );
  
  //#(env)
  var env = {
    gl: gl,
    assets: assets,
    x: 0, y: 0, z: 0, w: 1,
    cellTime: 180,  // Temps en ms pour traverser une cellule.
    nextSynchro: -1,
    levelNumber: 0,
    score: 0,
    bonus: 0,
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
      document.getElementById("diam").textContent = Math.max(0, this.level.need - this.eatenDiams );
      this.score += 50;
      document.getElementById("score").textContent = this.score;
    },
    //#(eatDiam)
    // Bruit du rocher dont la chute est stoppée par un obstacle.
    playBoom: function() {
      assets.rockSound.pause();
      assets.rockSound.currentTime = 0;
      assets.rockSound.play();
    },
    explode: function( col, row ) {
      var level = this.level;
      var x, y;
      for( y = row - 1; y < row + 2; y++ ) {
        for( x = col - 1; x < col + 2; x++ ) {
          if( level.getType( x, y ) !== Level.WALL && level.getType( x, y ) !== Level.ROCK ) {
            level.setType( x, y, Level.EXPL );
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
      this.transition = 6;
      console.info("[script] this=", this);
    },
    isLevelDone: false,
    nextLevel: function() {
      this.isLevelDone = true;
      this.killHero();
    }
  };
  //#(env)

  initLevel( env, 0 );

  gl.clearColor( 0, 0, 0, 1 );
  gl.enable( gl.DEPTH_TEST );
  gl.clearDepth( 0 );
  gl.depthFunc( gl.GREATER );

  function anim( time ) {
    window.requestAnimationFrame( anim );

    env.time = time;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    env.width = width;
    env.height = height;
    env.w = Math.min(width, height) < 481 ? 2 : 1;
    gl.viewport(0, 0, width, height);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    //#(synchro)
    // A la synchro, on fait les calculs de mouvements.
    if( env.nextSynchro < 0 ) {
      env.nextSynchro = Math.ceil( time / env.cellTime ) * env.cellTime;
    }
    else if( time >= env.nextSynchro ) {
      env.nextSynchro = Math.ceil( time / env.cellTime ) * env.cellTime;

      LevelLogic.apply( env );
      LevelLogic.process( env );
      env.levelPainter.update();

      env.bonus--;
      if( env.bonus === 0 ) env.killHero();
      document.getElementById("bonus").textContent = env.bonus;
      
      if( env.transition > -1 ) {
        env.transition--;
        if( env.transition <= 0 ) {
          if( env.isLevelDone ) {
            env.score += env.bonus;
            initLevel( env, env.levelNumber + 1 );
          } else {
            env.life--;
            if( env.life <= 0 ) env.levelNumber = 0;
            initLevel( env, env.levelNumber );
          }
        }
      }
    }
    //#(synchro)

    //#(camera)
    // Positionner la caméra sur le héro.
    // Sauf si le cadrage arrive hors tableau.
    var t = (time % env.cellTime) / env.cellTime;
    if( env.level.cols * 64 / env.w < width ) {
      env.x = env.level.cols / 2;
    } else {
      env.x = Math.min(
        Math.max(
          env.camX + t * env.camVX,
          width * env.w * .5 / 64
        ),
        env.level.cols - 1 - width * env.w * .5 / 64
      );
    }
    if( env.level.rows * 64 / env.w < height ) {
      env.y = env.level.rows / 2;
    } else {
      env.y = Math.min(
        Math.max(
          env.camY + t * env.camVY,
          height * env.w * .5 / 64
        ),
        env.level.rows - 1 - height * env.w * .5 / 64
      );
    }
    //#(camera)

    // On affiche tout.
    env.levelPainter.draw( env );
    env.z = 0.2;
    env.wallPainter.draw( env );
    env.z = 0;
    env.backgroundPainter.draw( env );
  }
  window.requestAnimationFrame( anim );
});


function initLevel( env, levelNumber ) {
  if( env.backgroundPainter ) env.backgroundPainter.destroy();
  if( env.wallPainter ) env.wallPainter.destroy();
  if( env.levelPainter ) env.levelPainter.destroy();

  var level = new Level( Levels[levelNumber] );
  env.assets.levelTexture = TextureAggregator( env.assets );

  env.level = level;
  env.camX = level.cols / 2;
  env.camY = level.rows / 2;
  env.camVX = 0;
  env.camVY = 0;
  env.eatenDiams = 0;
  env.nextSynchro = -1;
  env.isHeroAlive = true;
  env.isLevelDone = false;
  env.bonus = level.cols * level.rows * 5;
  env.transition = -1;
  env.levelNumber = levelNumber;
  if( levelNumber === 0 ) {
    env.life = 3;
    env.score = 0;
  }

  env.assets.musicSound.pause();
  env.assets.musicSound.currentTime = 0;
  env.assets.musicSound.play();

  env.backgroundPainter = new BackgroundPainter( env );
  env.wallPainter = new WallPainter( env );
  env.levelPainter = new LevelPainter( env );

  document.getElementById("diam").textContent = level.need;
  document.getElementById("life").textContent = env.life;
  document.getElementById("score").textContent = env.score;
  document.getElementById("bonus").textContent = env.bonus;
  
  return level;
}
