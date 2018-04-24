"use strict";

/**
 * @param {Float32Array} vertices - attributs of each vertex. The first must be X and the second Y.
 * @param {number=2} attributesCount - Number of attribute per vertex. At least 2 (X and Y).
 * @param {number=0}  offset - Index  of the first  element. Usefull when  you need to  concat several
 * elements buffers.
 * @return {Uint16Array}
 */
exports.fillPolyline = fillPolyline;

//#(fillPolyline)
function fillPolyline( vertices, attributesCount, offset ) {
  if( typeof attributesCount === 'undefined' ) attributesCount = 2;
  if( typeof offset === 'undefined' ) offset = 0;

  var polyline = new Polyline( vertices, attributesCount );
  return new Uint16Array(
    doFillPolyline( +1, polyline, offset ) || doFillPolyline( -1, polyline, offset )
  );
}

function doFillPolyline( orientation, polyline, offset ) {
  var elemBuff = [];
  while( polyline.length > 3 ) {
    var count = 0;
    while( !polyline.isCandidate( orientation ) && count++ < polyline.length ) {
      count++;
      polyline.next();
    }
    if( count >= polyline.length ) return null;
    polyline.removeTriangle( elemBuff, offset );
  }
  var idx1 = polyline.get().index;
  polyline.next();
  var idx2 = polyline.get().index;
  polyline.next();
  var idx3 = polyline.get().index;
  elemBuff.push( idx1, idx2, idx3 );
  return elemBuff;
}

var PTR = 0;
var PREV = 1;
var NEXT = 2;

var Polyline = function( vertices, attributesCount ) {
  var points = [];
  var size = Math.floor( vertices.length / attributesCount );
  for( var k = 0; k < size; k++ ) {
    points.push([ k * attributesCount, (k + size - 1 ) % size, (k + 1) % size ]);
  }
  this.length = size;
  this._vertices = vertices;
  this._cursor = 0;
  this._points = points;
};

Polyline.prototype.isCandidate = function( orientation ) {
  var index = this._cursor;
  var next = this._points[index][NEXT];
  var prev = this._points[index][PREV];
  var indexPtr = this._points[index][PTR];
  var nextPtr = this._points[next][PTR];
  var prevPtr = this._points[prev][PTR];
  var Ax = this._vertices[ indexPtr ];
  var Ay = this._vertices[ indexPtr + 1 ];
  var Bx = this._vertices[ nextPtr ];
  var By = this._vertices[ nextPtr + 1 ];
  var Cx = this._vertices[ prevPtr ];
  var Cy = this._vertices[ prevPtr + 1 ];
  var Ux = Cx - Ax;
  var Uy = Cy - Ay;
  var Vx = Bx - Ax;
  var Vy = By - Ay;
  var vectprod = Ux*Vy-Uy*Vx;
  if( vectprod > 0 && orientation < 0 ) return false;
  if( vectprod < 0 && orientation > 0 ) return false;
  return true;
};

Polyline.prototype.get = function() {
  var index = this._cursor;
  var pointer = this._points[index][PTR];
  return {
    index: index,
    x: this._vertices[pointer],
    y: this._vertices[pointer + 1]
  };
};

Polyline.prototype.next = function() {
  var index = this._cursor;
  this._cursor = this._points[index][NEXT];
};

Polyline.prototype.removeTriangle = function( elemBuff, offset ) {
  var index = this._cursor;
  var prev = this._points[index][PREV];
  var next = this._points[index][NEXT];
  this._points[prev][NEXT] = next;
  this._points[next][PREV] = prev;
  this.length--;
  if( this._cursor === index ) this._cursor = next;
  elemBuff.push( index + offset, next + offset, prev + offset );
};
//#(fillPolyline)
