window.GroundPainter = function() {
  "use strict";

  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    this._env = env;
    // On va stoquer la position du vertex en fonction de la cellule.
    this._mapCells = [];
    var vertexArray = new Float32Array( getVertexArray( env.cave, this._mapCells ) );
    this._vertexArray = vertexArray;
    console.info("[ground-painter] vertexArray=", vertexArray);
    console.info("[ground-painter] this._mapCells=", this._mapCells);
    
    this._count = vertexArray.length / 2;
    this._buffVert = WebGL.fillArrayBuffer( env.gl, vertexArray );

    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.groundVert,
      frag: env.assets.groundFrag
    }, {
      coords: env.assets.coordsVert
    });

    this._texture = createTexture( env.gl, env.assets.groundTexture );
  };

  WP.prototype.update = function() {
    var gl = this._env.gl;
    gl.bindBuffer( gl.ARRAY_BUFFER, this._buffVert );
    gl.bufferData( gl.ARRAY_BUFFER, this._vertexArray, gl.STATIC_DRAW );    
  };

  //#(hitCell)
  /**
   * Quand le héro se déplace, il appelle cette  méthode avec sa position en argument.
   * Si la cellule contient des feuilles, on modifie les vertexArray et on le renvoie
   * dans la carte graphique.
   */
  WP.prototype.hitCell = function( row, col ) {
    var env = this._env;
    var cols = env.cave.cols;
    var idx = row * cols + col;
    var pointer = this._mapCells[idx];
    if( pointer < 0 ) {
      // Il n'y a pas de feuille ici, on sort.
      return;
    }
    // On met à jour le tableau.
    env.cave.set( row, col, " " );
    this._mapCells[idx] = -1;
    // Pour  retirer un  élément sans  devoir en  déplacer toute  une série,
    // il suffit  de diminuer `this._count` et de mettre l'élément qui se trouve
    // à la fin à la place de celui que l'on veut supprimer.
    this._count--;
    var ptrLast = this._count * 2;
    // Evidemment, si celui qu'on veut supprimer se trouve aussi être
    // le dernier de la liste, il n'y a rien de plus à faire.
    if( pointer === ptrLast ) return;
    // Il faut garder à jour la variable `this._mapCells`.
    var colLast = this._vertexArray[ptrLast + 0];
    var rowLast = this._vertexArray[ptrLast + 1];
    var idxLast = rowLast * cols + colLast;
    this._vertexArray[pointer + 0] = colLast;
    this._vertexArray[pointer + 1] = rowLast;    
    this._mapCells[idxLast] = pointer;
    this.update();
  };
  //#(hitCell)
  
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
  function getVertexArray( cave, mapCells ) {
    var rows = cave.rows;
    var cols = cave.cols;
    var col, row;
    var vertexArray = [];

    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( cave.get( row, col ) === '.' ) {
          mapCells.push( vertexArray.length );
          vertexArray.push( col, row );
        } else {
          // Pas de feuilles dans cette cellule.
          mapCells.push( -1 );
        }
      }
    }

    return vertexArray;
  }
  //#(getVertexArray)

  return WP;
}();
