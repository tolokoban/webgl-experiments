"use strict";

WebGL.fetchAssets({
  backgroundTexture: "../img/background.jpg",
  coordsVert: "../coords.vert",
  coordsMoveVert: "../coords-move.vert",
  wallVert: "wall.vert",
  wallFrag: "wall.frag",
  wallTexture: "../wall.jpg",
  boulderVert: "boulder.vert",
  boulderFrag: "boulder.frag",
  boulderTexture: "../img/boulders.png",
  diamVert: "diam.vert",
  diamFrag: "diam.frag",
  diamTexture: "../img/diams.png",
  heroVert: "hero.vert",
  heroFrag: "hero.frag",
  heroTexture: "../img/mole.png",
  backgroundVert: "background.vert",
  backgroundFrag: "background.frag",
  groundVert: "ground.vert",
  groundFrag: "ground.frag",
  groundTexture: "../img/fill.png"
}).then(function(assets) {
  var canvas = WebGL.newCanvas();
  var gl = canvas.getContext("webgl");

  var cave = new Cave( Caves[0] );
  var env = {
    gl: gl,
    cave: cave,
    assets: assets,
    x: 0, y: 0, z: 0, w: 1,
    cellTime: 200,  // Temps en ms pour traverser une cellule.
    nextSynchro: -1
  };

  var backgroundPainter = new BackgroundPainter( env );
  var groundPainter = new GroundPainter( env );
  var boulderPainter = new BoulderPainter( env );
  var diamPainter = new DiamPainter( env );
  var wallPainter = new WallPainter( env );
  var heroPainter = new HeroPainter( env );

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

    // A la synchro, on fait les calculs de mouvements.
    if( env.nextSynchro < 0 ) {
      env.nextSynchro = Math.ceil( time / env.cellTime ) * env.cellTime;
    }
    else if( time >= env.nextSynchro ) {
      processHero( heroPainter, env );
      env.nextSynchro += env.cellTime;
    }

    // Positionner la caméra sur le héro.
    // Sauf si le cadrage arrive hors tableau.
    var t = (time % env.cellTime) / env.cellTime;
    env.x = Math.min(
      Math.max(
        heroPainter.X + t * heroPainter.Vx,
        w * env.w * .5 / 64
      ),
      env.cave.cols - w * env.w * .5 / 64
    );
    env.y = Math.min(
      Math.max(
        heroPainter.Y + t * heroPainter.Vy,
        h * env.w * .5 / 64
      ),
      env.cave.rows - h * env.w * .5 / 64
    );
    
    // On affiche tout.
    env.z = 0.5;
    heroPainter.draw( env );
    groundPainter.draw( env );
    env.z = 0.4;
    boulderPainter.draw( env );
    diamPainter.draw( env );
    wallPainter.draw( env );
    env.z = 0;
    backgroundPainter.draw( env );
  }
  window.requestAnimationFrame( anim );
});


function processHero( heroPainter, env ) {
  heroPainter.X += heroPainter.Vx;
  heroPainter.Y += heroPainter.Vy;
  
  switch( GameInputs.action ) {
  case GameInputs.STILL:
    heroPainter.Vx = heroPainter.Vy = 0;
    break;
  case GameInputs.UP:
    heroPainter.Vx = 0;
    heroPainter.Vy = -1;
    break;
  case GameInputs.RIGHT:
    heroPainter.Vx = 1;
    heroPainter.Vy = 0;
    heroPainter.index = 0;
    break;
  case GameInputs.DOWN:
    heroPainter.Vx = 0;
    heroPainter.Vy = 1;
    break;
  case GameInputs.LEFT:
    heroPainter.Vx = -1;
    heroPainter.Vy = 0;
    heroPainter.index = 2;
    break;
  }

  var cell = env.cave.get( heroPainter.Y + heroPainter.Vy, heroPainter.X + heroPainter.Vx );
  if( !cell || "rw".indexOf( cell ) > -1 ) {
    // Les murs et les pierres arrêtent le déplacement.
    heroPainter.Vx = heroPainter.Vy = 0;
  }

  heroPainter.update();
}
