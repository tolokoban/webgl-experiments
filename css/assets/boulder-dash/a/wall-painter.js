window.WallPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    var vertexArray = getVertexArray( env.cave );
    console.info("[a/wall-painter] vertexArray=", vertexArray);
    this._verticesCount = vertexArray.length / 2;
    this._buffer = WebGL.fillArrayBuffer( env.gl, new Float32Array( vertexArray ) );
    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.wallVert,
      frag: env.assets.wallFrag
    }, {
      coords: env.assets.coordsVert
    });

    this._texture = createTexture( env.gl, env.assets.wallTexture );
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
    prg.bindAttribs( this._buffer, "attX", "attY" );
    // Dessin.
    gl.drawArrays( gl.TRIANGLES, 0, this._verticesCount );
  };
  //#(draw)

  //#(createTexture)
  function createTexture( gl, img ) {
    var texture = gl.createTexture( );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    // Pour pouvoir utiliser gl.REPEAT, il faut obligatoirement
    // que les dimensions de la texture soient en puissance de 2.
    // Par exemple, 64x64, 128x128, 256x256, 512x512, ...
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT );
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
        if( cave.get( row, col ) === 'w' ) {
          vertexArray.push(
            col, row,
            col + 1, row,
            col + 1, row + 1,
            col, row,
            col, row + 1,
            col + 1, row + 1
          );
        }
      }
    }
    return vertexArray;
  }
  //#(getVertexArray)


  return WP;
}();
