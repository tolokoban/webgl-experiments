window.WallPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    var cave = env.cave.clone();
    var arrays = getArrays( cave );
    var vertexArray = arrays.vertex;
    console.info("[wall-painter] vertexArray=", vertexArray);
    var elementArray = arrays.element;
    console.info("[wall-painter] elementArray=", elementArray);

    this._count = elementArray.length;
    this._buffVert = WebGL.fillArrayBuffer( env.gl, new Float32Array( vertexArray ) );
    this._buffElem = WebGL.fillElementBuffer( env.gl, new Uint16Array( elementArray ) );

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
    prg.bindAttribs( this._buffVert, "attX", "attY" );
    // Dessin.
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this._buffElem );
    gl.drawElements( gl.TRIANGLES, this._count, gl.UNSIGNED_SHORT, 0 );
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

  //#(getArrays)
  function getArrays( cave ) {
    var cache = {};
    var rows = cave.rows;
    var cols = cave.cols;
    var col, row;
    var vertexArray = [];
    var elementArray = [];

    function addVertex( col, row ) {
      var key = row + "-" + col;
      var idx = cache[key];
      if( typeof idx === 'undefined' ) {
        // C'est un nouveau vertex.
        idx = Math.floor( vertexArray.length / 2 );
        vertexArray.push( col, row );
        cache[key] = idx;
      }
      elementArray.push( idx );
    }

    var ww, hh;
    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( cave.get( row, col ) === 'w' ) {
          var countRight = countWallToRight( cave, row, col );
          var countBottom = countWallToBottom( cave, row, col );
          if( countRight > countBottom ) {
            ww = countRight;
            hh = 1;
          } else {
            ww = 1;
            hh = countBottom;
          }
          addVertex( col, row );
          addVertex( col + ww, row );
          addVertex( col + ww, row + hh );
          addVertex( col, row );
          addVertex( col, row + hh );
          addVertex( col + ww, row + hh );
          clear( cave, row, col, hh, ww );
        }
      }
    }

    return {
      vertex: vertexArray, element: elementArray
    };
  }

  function countWallToRight( cave, row, col ) {
    var count = 1;
    while( col < cave.cols ) {
      col++;
      if( cave.get( row, col ) !== 'w' ) break;
      count++;
    }
    return count;
  }

  function countWallToBottom( cave, row, col ) {
    var count = 1;
    while( row < cave.rows ) {
      row++;
      if( cave.get( row, col ) !== 'w' ) break;
      count++;
    }
    return count;
  }

  function clear( cave, rr, cc, hh, ww ) {
    var row, col;
    for( row = rr ; row < rr + hh ; row++ ) {
      for( col = cc ; col < cc + ww ; col++ ) {
        cave.set( row, col, ' ' );
      }
    }
  }
  //#(getArrays)

  return WP;
}();
