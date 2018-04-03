window.BoulderPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    this._env = env;
    var vertexArray = new Float32Array( getVertexArray.call( this, env.cave ) );
    this._vertexArray = vertexArray;
    this._count = vertexArray.length / 5;
    this._buffVert = WebGL.fillArrayBuffer( env.gl, vertexArray );

    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.boulderVert,
      frag: env.assets.boulderFrag
    }, {
      "coords-move": env.assets.coordsMoveVert
    });

    this._texture = createTexture( env.gl, env.assets.boulderTexture );
  };

  //#(process)
  WP.prototype.process = function() {
    var env = this._env;
    var cave = env.cave;
    var map = this._mapCells;
    var vertexArray = this._vertexArray;
    applyMoves( cave, vertexArray );
    computeNextMoves( cave, map, vertexArray );
    var gl = env.gl;
    gl.bindBuffer( gl.ARRAY_BUFFER, this._buffVert );
    gl.bufferData( gl.ARRAY_BUFFER, this._vertexArray, gl.STATIC_DRAW );
  };
  //#(process)

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
    prg.bindAttribs( this._buffVert, "attX", "attY", "attVx", "attVy", "attIndex" );
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
    var map = [];

    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( cave.get( row, col ) === 'r' ) {
          var boulderIndex = Math.floor( 16 * Math.random() );
          map.push( vertexArray.length );
          vertexArray.push(
            col, row, 0, 0, boulderIndex * 0.25 );
        } else {
          map.push( -1 );
        }
      }
    }
    this._mapCells = map;
    return vertexArray;
  }
  //#(getVertexArray)

  //#(computeNextMoves)
  function computeNextMoves( cave, map, vertexArray ) {
    var ptr, row, col, vx, vy;
    for( var k=0 ; k<map.length ; k++ ) {
      ptr = map[k];
      if( ptr < 0 ) continue;
      col = vertexArray[ptr + 0];
      row = vertexArray[ptr + 1];
      vx = vy = 0;
      if( vertexArray[ptr + 3] > 0 ) {
        // La pierre est en train de tomber.
        // Elle n'est donc pas arrêtée par
        // le héro.
        switch( cave.get( row + 1, col ) ) {
        case ' ':
        case 'E':
          vy = 1;
          break;
        }
      }
      else {
        // La pierre est immobile.
        switch( cave.get( row + 1, col ) ) {
        case ' ':
          // C'est vide dessous.
          vx = 0;  // Vx
          vy = 1;  // Vy
          break;
        case 'r':
        case 'd':
        case 'w':
          // On est posé sur un diamant ou un rocher.
          if( cave.get( row, col + 1 ) === ' '
              && cave.get( row + 1, col + 1 ) === ' ' )
          {
            // Le rocher bascule sur la droite.
            vx = 1;  // Vx
            vy = 0;  // Vy
          }
          else if( cave.get( row, col - 1 ) === ' '
                   && cave.get( row + 1, col - 1 ) === ' ' )
          {
            // Le rocher bascule sur la gauche.
            vx = -1;  // Vx
            vy = 0;  // Vy
          }
          break;
        }
      }
      cave.set( row + vy, col + vx, "r" );
      vertexArray[ptr + 2] = vx;
      vertexArray[ptr + 3] = vy;
    }
  }
  //#(computeNextMoves)

  //#(applyMoves)
  /**
   * Les rochers qui ont un Vx ou Vy non nul doivent être
   * déplacés vers la cellule adjacente.
   */
  function applyMoves( cave, vertexArray ) {
    var col1, row1;  // Cellule courante.
    var col2, row2;  // Cellule destination.
    for( var ptr = 0; ptr < vertexArray.length; ptr += 5 ) {
      col1 = vertexArray[ptr + 0];
      col2 = col1 + vertexArray[ptr + 2];
      row1 = vertexArray[ptr + 1];
      row2 = row1 + vertexArray[ptr + 3];
      if( row1 !== row2 || col1 !== col2 ) {
        vertexArray[ptr + 0] = col2;
        vertexArray[ptr + 1] = row2;
        // Mise à jour du tableau.
        cave.set( row1, col1, ' ' );
        cave.set( row2, col2, 'r' );
      }
    }
  }
  //#(applyMoves)

  return WP;
}();
