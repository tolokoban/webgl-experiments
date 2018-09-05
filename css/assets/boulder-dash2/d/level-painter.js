window.LevelPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    this._env = env;
    this._count = env.level.data.length / 6;
    this._buffVert = WebGL.fillArrayBuffer( env.gl, env.level.data );

    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.levelVert,
      frag: env.assets.levelFrag
    });

    this._texture = createTexture( env.gl, env.assets.levelTexture );
  };

  // Pousser le VertexArray dans la carte graphique.
  WP.prototype.update = function() {
    var env = this._env;
    var gl = env.gl;
    gl.bindBuffer( gl.ARRAY_BUFFER, this._buffVert );
    gl.bufferData( gl.ARRAY_BUFFER, env.level.data, gl.STATIC_DRAW );
  };

  //#(draw)
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   * @param env.time
   * @param env.width
   * @param env.height
   */
  WP.prototype.draw = function( env ) {
    var gl = env.gl;
    var prg = this._prg;

    prg.use();
    // Dimensions de l'écran physique.
    prg.$uniTime = env.time;
    prg.$uniWidth = env.width;
    prg.$uniHeight = env.height;
    prg.$uniX = env.x;
    prg.$uniY = env.y;
    prg.$uniZ = env.z;
    prg.$uniW = env.w;
    prg.$uniCellTime = env.cellTime;
    // Assignation de la texture.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._texture );
    prg.$texture = 0;
    // Attributs.
    prg.bindAttribs( this._buffVert, "attType", "attX", "attY", "attVX", "attVY", "attIndex" );
    // Dessin.
    gl.drawArrays( gl.POINTS, 0, this._count );
  };
  //#(draw)

  //#(createTexture)
  function createTexture( gl, img ) {
    var texture = gl.createTexture( );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    // On charge l'image dans la texture de la carte graphique.
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );
    return texture;
  }
  //#(createTexture)

  return WP;
}();
