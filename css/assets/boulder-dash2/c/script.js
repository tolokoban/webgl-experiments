"use strict";

WebGL.fetchAssets({
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
  diamTexture: "../img/row-diam.png",
  heroTexture: "../img/row-walk.png",
  groundTexture: "../img/ground.png"
}).then(function(assets) {
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
    cellTime: 200,  // Temps en ms pour traverser une cellule.
    nextSynchro: -1,
    eatenDiams: 0,
    // On compte les diamants mangés.
    eatDiam: function() { this.eatenDiams++; }
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
      env.nextSynchro += env.cellTime;
      // Appliquer les déplacements du héro.
      HeroLogic.apply( env );
      // Prévoir le prochain déplacement du héro.
      HeroLogic.process( env );
      // Pousser le VertexArray du tableau dans la carte graphique.
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
