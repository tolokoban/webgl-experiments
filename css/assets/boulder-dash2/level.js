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
  var EXP1 = 7;
  var EXP2 = 8;
  var MONS = 9;
  var BOOM = 99;

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
  Level.EXP1 = EXP1;
  Level.EXP2 = EXP2;
  Level.MONS = MONS;
  // Destination d'une pierre ou d'un diamant en chute.
  Level.BOOM = BOOM;

  Level.prototype.clone = function() {
    return new Level( this._levelDef );
  };

  Level.prototype.index = function( col, row ) {
    return NB_ATTRIBS * (row * this.cols + col);
  };

  Level.prototype.move = function( col1, row1, col2, row2 ) {
    var idx1 = this.index( col1, row1 );
    var idx2 = this.index( col2, row2 );
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

  Level.prototype.getType = function( col, row ) {
    return this.data[this.index(col, row) + 0];
  };

  Level.prototype.setType = function( col, row, value ) {
    this.data[this.index(col, row) + 0] = value;
  };

  Level.prototype.getX = function( col, row ) {
    return this.data[this.index(col, row) + 1];
  };

  Level.prototype.setX = function( col, row, x ) {
    this.data[this.index(col, row) + 1] = x;
  };

  Level.prototype.getY = function( col, row ) {
    return this.data[this.index(col, row) + 2];
  };

  Level.prototype.setY = function( col, row, y ) {
    this.data[this.index(col, row) + 2] = y;
  };

  Level.prototype.getVX = function( col, row ) {
    return this.data[this.index(col, row) + 3];
  };

  Level.prototype.setVX = function( col, row, vx ) {
    this.data[this.index(col, row) + 3] = vx;
  };

  Level.prototype.getVY = function( col, row ) {
    return this.data[this.index(col, row) + 4];
  };

  Level.prototype.setVY = function( col, row, vy ) {
    this.data[this.index(col, row) + 4] = vy;
  };

  Level.prototype.setMove = function( col, row, vx, vy ) {
    var idx = this.index(col, row);
    this.data[idx + 3] = vx;
    this.data[idx + 4] = vy;
  };

  Level.prototype.getIndex = function( col, row ) {
    return this.data[this.index(col, row) + 5];
  };

  Level.prototype.setIndex = function( col, row, value ) {
    this.data[this.index(col, row) + 5] = value;
  };

  /**
   * Les flags sont des drapeaux que l'on met sur des cellules du tableau pour indiquer 
   */
  Level.prototype.hasFlag = function( col, row ) {
    var idx = this.cols * row + col;
    return this._flags[idx];
  };
  
  Level.prototype.flag = function( col, row ) {
    var idx = this.cols * row + col;
    this._flags[idx] = 1;
  };
  
  Level.prototype.unflag = function( col, row ) {
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
          type = EXP1;
          break;
        case '@':
          type = MONS;
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
        return this.data[this.index(this.heroX, this.heroY) + 3];
      },
      set: function( v ) {
        this.data[this.index(this.heroX, this.heroY) + 3] = v;
      }
    });
    Object.defineProperty( this, "heroVY", {
      get: function() {
        return this.data[this.index(this.heroX, this.heroY) + 4];
      },
      set: function( v ) {
        this.data[this.index(this.heroX, this.heroY) + 4] = v;
      }
    });
    Object.defineProperty( this, "heroIndex", {
      get: function() {
        return this.data[this.index(this.heroX, this.heroY) + 5];
      },
      set: function( v ) {
        this.data[this.index(this.heroX, this.heroY) + 5] = v;
      }
    });
    //#(heroVXY)
    readonly( this, "data", new Float32Array( data ) );
    readonly( this, "need", levelDef.need );
    readonly( this, "tint", levelDef.tint || {} );
    readonly( this, "rows", rows.length );
    readonly( this, "cols", rows[0].length );
    readonly( this, "exitX", exitCol );
    readonly( this, "exitY", exitRow );

    console.info("[level] cols, rows, data=", this.cols, this.rows, data);
    return data;
  }

  return Level;
}();
