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

  var Level = function( levelDef ) {
    parseLevelDef.call( this, levelDef );
  };

  Level.VOID = VOID;
  Level.WALL = WALL;
  Level.HERO = HERO;
  Level.DUST = DUST;
  Level.ROCK = ROCK;
  Level.DIAM = DIAM;
  Level.EXIT = EXIT;

  Level.prototype.getType = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[NB_ATTRIBS * (row * this.cols + col) + 0];
  };

  Level.prototype.setType = function( row, col, value ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[NB_ATTRIBS * (row * this.cols + col) + 0] = value;
  };

  Level.prototype.getX = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[NB_ATTRIBS * (row * this.cols + col) + 1];
  };

  Level.prototype.setX = function( row, col, x ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[NB_ATTRIBS * (row * this.cols + col) + 1] = x;
  };

  Level.prototype.getY = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[NB_ATTRIBS * (row * this.cols + col) + 2];
  };

  Level.prototype.setY = function( row, col, y ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[NB_ATTRIBS * (row * this.cols + col) + 2] = y;
  };

  Level.prototype.getVX = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[NB_ATTRIBS * (row * this.cols + col) + 3];
  };

  Level.prototype.setVX = function( row, col, vx ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[NB_ATTRIBS * (row * this.cols + col) + 3] = vx;
  };

  Level.prototype.getVY = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[NB_ATTRIBS * (row * this.cols + col) + 4];
  };

  Level.prototype.setVY = function( row, col, vy ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[NB_ATTRIBS * (row * this.cols + col) + 4] = vy;
  };

  Level.protoindex.getIndex = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[NB_ATTRIBS * (row * this.cols + col) + 5];
  };

  Level.protoindex.setIndex = function( row, col, value ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[NB_ATTRIBS * (row * this.cols + col) + 5] = value;
  };

  Level.prototype.clone = function() {
    var def = [];
    var col, row;
    for( row = 0 ; row < this.rows ; row++ ) {
      var line = "";
      for( col = 0 ; col < this.cols ; col++ ) {
        line += this.get( row, col );
      }
      def.push( line );
    }
    return new Level( def );
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
    rows.forEach(function (row, y) {
      for( var x = 0; x < row.length; x++ ) {
        var char = row.charAt( x );
        var type = 0;
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
        case 'X':
          type = EXIT;
          break;
        }
        data.push( type, x, y, 0, 0, index );
      }
    });

    readonly( this, "data", new Float32Array( data ) );
    readonly( this, "rows", rows.length );
    readonly( this, "cols", rows[0].length );    
    return data;
  }
  
  return Level;
}();
