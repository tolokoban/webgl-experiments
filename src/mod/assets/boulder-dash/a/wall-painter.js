window.WallPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    var rows = env.cave.rows;
    var cols = env.cave.cols;
    var col, row;
    var vertexArray = [];
    
    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( env.cave.get( row, col ) ) {
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

    vertexArray = [
      0,0, 1,0, 0,1
    ];
    console.info("[wall-painter] vertexArray=", vertexArray);
    
    this._verticesCount = vertexArray.length / 2;
    this._buffer = WebGL.fillArrayBuffer( env.gl, new Float32Array( vertexArray ) );
    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.wallVert,
      frag: env.assets.wallFrag
    }, {
      coords: env.assets.coordsVert
    });
  };
  
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
    prg.$uniWidth = env.width;
    prg.$uniHeight = env.height;
    prg.bindAttribs( this._buffer, "attX", "attY" );
    gl.drawArrays( gl.TRIANGLES, 0, this._verticesCount );
  };

  return WP;
}();
