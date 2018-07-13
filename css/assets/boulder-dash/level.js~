"use strict";

window.Cave = function() {
  var Cave = function( caveDef ) {
    readonly( this, "data", getDataFromDef( caveDef ) );
    readonly( this, "rows", caveDef.length );
    readonly( this, "cols", caveDef[0].length );    
  };

  Cave.prototype.get = function( row, col ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return null;
    return this.data[row * this.cols + col];
  };

  Cave.prototype.set = function( row, col, value ) {
    if( row < 0 || row >= this.rows || col < 0 || col >= this.cols )
      return;
    this.data[row * this.cols + col] = value;
  };

  Cave.prototype.clone = function() {
    var def = [];
    var col, row;
    for( row = 0 ; row < this.rows ; row++ ) {
      var line = "";
      for( col = 0 ; col < this.cols ; col++ ) {
        line += this.get( row, col );
      }
      def.push( line );
    }
    return new Cave( def );
  };

  function readonly( obj, name, value ) {
    Object.defineProperty(obj, name, {
      value: value,
      writable: false,
      enumarable: true,
      configurable: false
    });
  }

  function getDataFromDef( caveDef ) {
    var data = [];
    caveDef.forEach(function (row) {
      for( var k = 0; k < row.length; k++ ) {
        data.push( row.charAt( k ) );
      }
    });
    return data;
  }
  
  return Cave;
}();
