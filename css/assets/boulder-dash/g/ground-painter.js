window.GroundPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    var vertexArray = getVertexArray( env.cave );

    this._count = vertexArray.length / 2;
    this._buffVert = WebGL.fillArrayBuffer( env.gl, new Float32Array( vertexArray ) );

    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.groundVert,
      frag: env.assets.groundFrag
    }, {
      coords: env.assets.coordsVert
    });

    this._texture = createTexture( env.gl, env.assets.groundTexture );
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
    prg.$uniWidth = env.width;
    prg.$uniHeight = env.height;
    prg.$uniX = env.x;
    prg.$uniY = env.y;
    prg.$uniZ = env.z;
    prg.$uniW = env.w;
    // Assignation de la texture.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._texture );
    prg.$texture = 0;
    // Attributs.
    prg.bindAttribs( this._buffVert, "attX", "attY" );
    // Dessin.
    gl.drawArrays( gl.POINTS, 0, this._count );
  };
  //#(draw)

  //#(createTexture)
  function createTexture( gl, img ) {
    var texture = gl.createTexture( );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    // Comme 80 n'est pas une puissance de 2, il faut utiliser
    // CLAMP_TO_EDGE.
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    // On charge l'image dans la texture de la carte graphique.
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );
    return texture;
  }
  //#(createTexture)

  //#(getVertexArray)
  function getVertexArray( cave ) {
    var rows = cave.rows;
    var cols = cave.cols;
    var col, row;
    var vertexArray = [];

    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( cave.get( row, col ) === '.' ) {
          vertexArray.push( col + .5, row + .5 );
        }
      }
    }

    return vertexArray;
  }
  //#(getVertexArray)

  return WP;
}();
