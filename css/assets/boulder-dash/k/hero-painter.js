"use strict";

window.HeroPainter = function() {
  /**
   * @param env.gl
   * @param env.assets
   * @param env.cave
   */
  var WP = function( env ) {
    var vertexArray = getVertexArray( env.cave );
    this._vertexArray = new Float32Array( vertexArray );
    this._gl = env.gl;
    this._buffVert = WebGL.fillArrayBuffer( env.gl, this._vertexArray );
    
    this._prg = new WebGL.Program( env.gl, {
      vert: env.assets.heroVert,
      frag: env.assets.heroFrag
    }, {
      "coords-move": env.assets.coordsMoveVert
    });

    this._texture = createTexture( env.gl, env.assets.heroTexture );

    addProps( this, {
      X: {
        get: function() { return this._vertexArray[0]; },
        set: function( v ) { this._vertexArray[0] = v; }
      },
      Y: {
        get: function() { return this._vertexArray[1]; },
        set: function( v ) { this._vertexArray[1] = v; }
      },
      Vx: {
        get: function() { return this._vertexArray[2]; },
        set: function( v ) { this._vertexArray[2] = v; }
      },
      Vy: {
        get: function() { return this._vertexArray[3]; },
        set: function( v ) { this._vertexArray[3] = v; }
      },
      index: {
        get: function() { return this._vertexArray[4]; },
        set: function( v ) { this._vertexArray[4] = v; }
      }
    });

    console.info("[hero-painter] this._vertexArray=", this._vertexArray);
  };

  /**
   * 
   */
  WP.prototype.update = function() {
    var gl = this._gl;
    gl.bindBuffer( gl.ARRAY_BUFFER, this._buffVert );
    gl.bufferData( gl.ARRAY_BUFFER, this._vertexArray, gl.STATIC_DRAW );    
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
    prg.bindAttribs( this._buffVert, "attX", "attY", "attVx", "attVy", "attIndex" );
    // Dessin.
    gl.drawArrays( gl.POINTS, 0, 1 );
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

  //#(getVertexArray)
  function getVertexArray( cave ) {
    var rows = cave.rows;
    var cols = cave.cols;
    var col, row;
    var vertexArray = [];

    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( cave.get( row, col ) === 'E' ) {
          vertexArray.push( col, row, 0, 0, 0 );
          break;
        }
      }
    }

    return vertexArray;
  }
  //#(getVertexArray)

  function addProps( obj, props ) {
    var name, def;
    for( name in props ) {
      def = props[name];
      Object.defineProperty( obj, name, {
        get: def.get, set: def.set,
        configurable: false, enumerable: true
      });
    }
  }

  return WP;
}();
