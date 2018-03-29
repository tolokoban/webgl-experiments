"use strict";

window.Level = function() {
  var NB_ATTRIBS = 6;

  var VOID = 0;
  var WALL = 1;
  var HERO = 2;
  var DUST = 3;
  var ROCK = 4;
  var DIAM = 5;
  var EXIT = 6;
  var EXPL = 7;

  var Level = function( levelDef ) {
    this._levelDef = levelDef;
    parseLevelDef.call( this, levelDef );
  };

  Level.VOID = VOID;
  Level.WALL = WALL;
  Level.HERO = HERO;
  Level.DUST = DUST;
  Level.ROCK = ROCK;
  Level.DIAM = DIAM;
  Level.EXIT = EXIT;
  Level.EXPL = EXPL;

  Level.prototype.clone = function() {
    return new Level( this._levelDef );
  };

  Level.prototype.index = function( row, col ) {
    return NB_ATTRIBS * (row * this.cols + col);
  };

  Level.prototype.move = function( row1, col1, row2, col2 ) {
    var idx1 = this.index( row1, col1 );
    var idx2 = this.index( row2, col2 );
    var d = this.data;
    var cell = d[idx1];
    if( cell === Level.VOID ) return;
    d[idx2 + 0] = cell;  // Type
    d[idx2 + 5] = d[idx1 + 5];  // Index
    d[idx1 + 0] = Level.VOID;
    if( cell === Level.ROCK || cell === Level.DIAM ) {
      d[idx2 + 3] = d[idx1 + 3];  // VX
      d[idx2 + 4] = d[idx1 + 4];  // VY
    } else {
      d[idx2 + 3] = 0;  // VX
      d[idx2 + 4] = 0;  // VY
    }
    d[idx1 + 3] = 0;  // VX
    d[idx1 + 4] = 0;  // VY
  };

  Level.prototype.getType = function( row, col ) {
    return this.data[this.index(row, col) + 0];
  };

  Level.prototype.setType = function( row, col, value ) {
    this.data[this.index(row, col) + 0] = value;
  };

  Level.prototype.getX = function( row, col ) {
    return this.data[this.index(row, col) + 1];
  };

  Level.prototype.setX = function( row, col, x ) {
    this.data[this.index(row, col) + 1] = x;
  };

  Level.prototype.getY = function( row, col ) {
    return this.data[this.index(row, col) + 2];
  };

  Level.prototype.setY = function( row, col, y ) {
    this.data[this.index(row, col) + 2] = y;
  };

  Level.prototype.getVX = function( row, col ) {
    return this.data[this.index(row, col) + 3];
  };

  Level.prototype.setVX = function( row, col, vx ) {
    this.data[this.index(row, col) + 3] = vx;
  };

  Level.prototype.getVY = function( row, col ) {
    return this.data[this.index(row, col) + 4];
  };

  Level.prototype.setVY = function( row, col, vy ) {
    this.data[this.index(row, col) + 4] = vy;
  };

  Level.prototype.setMove = function( row, col, vx, vy ) {
    var idx = this.index(row, col);
    this.data[idx + 3] = vx;
    this.data[idx + 4] = vy;
  };

  Level.prototype.getIndex = function( row, col ) {
    return this.data[this.index(row, col) + 5];
  };

  Level.prototype.setIndex = function( row, col, value ) {
    this.data[this.index(row, col) + 5] = value;
  };

  /**
   * Les flags sont des drapeaux que l'on met sur des cellules du tableau pour indiquer 
   */
  Level.prototype.hasFlag = function( row, col ) {
    var idx = this.cols * row + col;
    return this._flags[idx];
  };
  
  Level.prototype.flag = function( row, col ) {
    var idx = this.cols * row + col;
    this._flags[idx] = 1;
  };
  
  Level.prototype.unflag = function( row, col ) {
    var idx = this.cols * row + col;
    this._flags[idx] = 0;
  };
  
  function readonly( obj, name, value ) {
    Object.defineProperty(obj, name, {
      value: value,
      writable: false,
      enumarable: true,
      configurable: false
    });
  }

  function parseLevelDef( levelDef ) {
    var rows = levelDef.rows;
    var data = [];
    var diamCount = 0;
    var heroCol, heroRow;
    var exitCol, exitRow;
    var flags = [];
    rows.forEach(function (row, y) {
      for( var x = 0; x < row.length; x++ ) {
        flags.push(0);
        var char = row.charAt( x );
        var type = VOID;
        var index = 0;
        switch( char ) {
        case ' ':
          type = VOID;
          break;
        case 'w':
          type = WALL;
          break;
        case '.':
          type = DUST;
          break;
        case 'r':
          type = ROCK;
          index = Math.floor( 16 * Math.random() );
          break;
        case 'd':
          type = DIAM;
          index = Math.floor( 16 * Math.random() );
          break;
        case 'E':
          type = HERO;
          heroCol = x;
          heroRow = y;
          break;
        case 'X':
          type = WALL;
          exitCol = x;
          exitRow = y;
          break;
        case '*':
          type = EXPL;
          exitCol = x;
          exitRow = y;
          break;
        }
        data.push( type, x, y, 0, 0, index );
      }
    });

    this._flags = flags;
    this.heroX = heroCol;
    this.heroY = heroRow;
    //#(heroVXY)
    Object.defineProperty( this, "heroVX", {
      get: function() {
        return this.data[this.index(this.heroY, this.heroX) + 3];
      },
      set: function( v ) {
        this.data[this.index(this.heroY, this.heroX) + 3] = v;
      }
    });
    Object.defineProperty( this, "heroVY", {
      get: function() {
        return this.data[this.index(this.heroY, this.heroX) + 4];
      },
      set: function( v ) {
        this.data[this.index(this.heroY, this.heroX) + 4] = v;
      }
    });
    Object.defineProperty( this, "heroIndex", {
      get: function() {
        return this.data[this.index(this.heroY, this.heroX) + 5];
      },
      set: function( v ) {
        this.data[this.index(this.heroY, this.heroX) + 5] = v;
      }
    });
    //#(heroVXY)
    readonly( this, "data", new Float32Array( data ) );
    readonly( this, "rows", rows.length );
    readonly( this, "cols", rows[0].length );
    readonly( this, "exitX", exitCol );
    readonly( this, "exitY", exitRow );

    console.info("[level] cols, rows, data=", this.cols, this.rows, data);
    return data;
  }

  return Level;
}();