"use strict";

WebGL.fetchAssets({
  musicSound: "../snd/music.ogg",
  diamSound: "../snd/diam.ogg",
  exitSound: "../snd/exit.ogg",
  explSound: "../snd/expl.ogg",
  rockSound: "../snd/rock.ogg",
  hueVert: "hue.vert",
  hueFrag: "hue.frag",
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
  monsterTexture: "../img/row-monster.png",
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

  var env = LevelLogic.createEnv( gl, assets );

  initLevel( env, parseInt( location.search.substr(1) ) );

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
      LevelLogic.process( env, GameInputs.action );
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
  if( typeof levelNumber !== 'number' || isNaN( levelNumber ) ) levelNumber = 0;
  if( env.backgroundPainter ) env.backgroundPainter.destroy();
  if( env.wallPainter ) env.wallPainter.destroy();
  if( env.levelPainter ) env.levelPainter.destroy();

  var level = new Level( Levels[levelNumber] );
  console.info("[script] level.tint=", level.tint);
  env.assets.levelTexture = TextureAggregator( env.assets, level.tint );

  env.level = level;
  env.camX = level.cols / 2;
  env.camY = level.rows / 2;
  env.camVX = 0;
  env.camVY = 0;
  env.eatenDiams = 0;
  env.nextSynchro = -1;
  env.isHeroAlive = true;
  env.isLevelDone = false;
  env.bonus = level.cols * level.rows * 4;
  env.transition = -1;
  env.levelNumber = levelNumber;
  if( levelNumber === 0 ) {
    env.life = 3;
    env.score = 0;
  }

  env.assets.musicSound.pause();
  env.assets.musicSound.currentTime = 0;
  env.assets.musicSound.play();

  var tinter = new TextureAggregator.Tinter( env.assets.hueVert, env.assets.hueFrag );
  var backgroundTexture = env.assets.backgroundTexture;
  env.backgroundPainter = new BackgroundPainter( env, tinter.shiftHue( backgroundTexture, level.tint.void ) );
  var wallTexture = env.assets.wallTexture;
  env.wallPainter = new WallPainter( env, tinter.shiftHue( wallTexture, level.tint.wall ) );
  env.levelPainter = new LevelPainter( env );

  document.getElementById("diam").textContent = level.need;
  document.getElementById("life").textContent = env.life;
  document.getElementById("score").textContent = env.score;
  document.getElementById("bonus").textContent = env.bonus;
  
  return level;
}
//#(env)  
