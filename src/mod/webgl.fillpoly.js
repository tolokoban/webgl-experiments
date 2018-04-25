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
  var vertexCount = Math.floor( vertices.length / attributesCount );
  console.info("[webgl.fillpoly] vertexCount=", vertexCount);
  var expectedTriangles = vertexCount - 2;
  var elemBuff = doFillPolyline( -1, polyline, offset, attributesCount );
  if( elemBuff && elemBuff.length === 3 * expectedTriangles  ) {
    console.log( "Orientation:", -1 );
    return elemBuff;
  }

  console.log( "Found with orientation +1" );
  return new Uint16Array( doFillPolyline( +1, polyline, offset, attributesCount ) );
}

function doFillPolyline( orientation, polyline, offset, attributesCount ) {
  var elemBuff = [];
  while( polyline.length > 3 ) {
    var count = 0;
    while( !polyline.isCandidate( orientation ) && count++ < polyline.length ) {
      count++;
      polyline.next();
    }
    if( count >= polyline.length ) return null;
    polyline.removeTriangle( elemBuff, offset, orientation );
  }
  var A = polyline.get();
  polyline.next();
  var B = polyline.get();
  polyline.next();
  var C = polyline.get();

  var Ax = A.x;
  var Ay = A.y;
  var Bx = B.x;
  var By = B.y;
  var Cx = C.x;
  var Cy = C.y;

  if( hasNoPointInside( Ax,Ay,Bx,By,Cx,Cy, polyline._points, polyline._vertices, orientation ) ) {
    elemBuff.push( A.index, B.index, C.index );
    console.log("Added last triangle", alpha(A.index, B.index, C.index));
    return elemBuff;
  }
  console.log( "Last triangle contains at least one vertex!" );
  return null;
}

var PTR = 0;
var PREV = 1;
var NEXT = 2;
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
  var Ux = Bx - Ax;
  var Uy = By - Ay;
  var Vx = Cx - Ax;
  var Vy = Cy - Ay;
  var crossprod = Ux*Vy-Uy*Vx;

  console.log( "    Cross prod of", alpha( prev, index, next ), "=", crossprod );

  if( crossprod > 0 && orientation < 0 ) {
    console.log("    Triangle", alpha(prev, index, next), "est concave!");
    return false;
  }
  if( crossprod < 0 && orientation > 0 ) {
    console.log("    Triangle", alpha(prev, index, next), "est concave!");
    return false;
  }

  // On vérifie maintenant qu'aucun point n'est à l'intérieur du triangle.
  console.log("    Check for point inside", alpha(prev, index, next));
  return hasNoPointInside(
    Ax, Ay, Bx, By, Cx, Cy,
    this._points, this._vertices,
    orientation );
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

Polyline.prototype.removeTriangle = function( elemBuff, offset, orientation ) {
  var index = this._cursor;
  var prev = this._points[index][PREV];
  var next = this._points[index][NEXT];
  this._points[prev][NEXT] = next;
  this._points[next][PREV] = prev;
  this.length--;
  if( this._cursor === index ) this._cursor = next;
  elemBuff.push( index + offset, next + offset, prev + offset );

  console.log("Added triangle", alpha(prev, index, next));
  var txt = '';
  index = next;
  while( index !== prev ) {
    txt += alpha( index );
    index = this._points[index][NEXT];
  }
  txt += alpha( index );
  console.log( "    Points:", txt );
};

function cross( Ax, Ay, Bx, By, Mx, My ) {
  var x1 = Bx - Ax;
  var y1 = By - Ay;
  var x2 = Mx - Ax;
  var y2 = My - Ay;

  return x1*y2 - x2*y1;
}

function hasNoPointInside( Ax, Ay, Bx, By, Cx, Cy, points, vertices, orientation ) {
  var ptr, Mx, My;
  for( var index = 0; index < points.length; index++ ) {
    ptr = points[index][PTR];
    Mx = vertices[ptr];
    My = vertices[ptr + 1];
    if( Ax == Mx && Ay == My ) continue;
    if( Bx == Mx && By == My ) continue;
    if( Cx == Mx && Cy == My ) continue;
    if( hasPointInside( Ax, Ay, Bx, By, Cx, Cy, Mx, My, orientation ) ) {
      console.log("        " + alpha( index ), "is inside the triangle!!!");
      return false;
    }
    console.log("        " + alpha( index ), "is outside the triangle.");
  }
  return true;
}

function hasPointInside( Ax, Ay, Bx, By, Cx, Cy, Mx, My, orientation ) {
  if( orientation > 0 ) return hasPointInsidePos( Ax, Ay, Bx, By, Cx, Cy, Mx, My );
  return hasPointInsideNeg( Ax, Ay, Bx, By, Cx, Cy, Mx, My );
}

function hasPointInsidePos( Ax, Ay, Bx, By, Cx, Cy, Mx, My ) {
  if( cross( Ax, Ay, Bx, By, Mx, My ) < 0 ) return false;
  if( cross( Bx, By, Cx, Cy, Mx, My ) < 0 ) return false;
  if( cross( Cx, Cy, Ax, Ay, Mx, My ) < 0 ) return false;
  return true;
}

function hasPointInsideNeg( Ax, Ay, Bx, By, Cx, Cy, Mx, My ) {
  if( cross( Ax, Ay, Bx, By, Mx, My ) > 0 ) return false;
  if( cross( Bx, By, Cx, Cy, Mx, My ) > 0 ) return false;
  if( cross( Cx, Cy, Ax, Ay, Mx, My ) > 0 ) return false;
  return true;
}
//#(fillPolyline)


function alpha( index ) {
  var txt = '';
  Array.prototype.slice.call(arguments).forEach(function(arg) {
    txt += ALPHABET.charAt( arg );
  });
  return txt;
}


/*
  window.Jasmine = {
  describe: [],
  specCount: 0,
  failCount: 0
  };


  window.describe = function( name, slot ) {
  Jasmine.describe.push( name.trim() );
  try {
  slot();
  }
  catch( ex ) {
  console.error( "Failure! ", Jasmine.describe.join(" ") );
  console.error( ex );
  }
  Jasmine.describe.pop();
  if( Jasmine.describe.length === 0 ) {
  console.log("============================================================");
  console.log(" Number of tests: ", Jasmine.specCount );
  console.log(" Success: ", Jasmine.specCount - Jasmine.failCount );
  console.log(" Failure: ", Jasmine.failCount );
  console.log(" Quality: ",
  parseFloat((100*(Jasmine.specCount - Jasmine.failCount) / Jasmine.specCount).toFixed(1)),
  "%" );
  console.log("------------------------------------------------------------");
  }
  };

  window.it = function( name, slot ) {
  Jasmine.describe.push( name.trim() );
  Jasmine.specCount++;
  try {
  slot();
  }
  catch( ex ) {
  Jasmine.failCount++;
  console.error( "Failure! ", Jasmine.describe.join(" "), "\n", ex );
  }
  Jasmine.describe.pop();
  };


  describe('webgl.fillpoly', function() {
  describe('cross', function() {
  [
  [0,0, 1,0, 0,-1, -1],
  [0,0, 1,0, 0,1, 1]
  ].forEach(function (item) {
  var Ax = item[0];
  var Ay = item[1];
  var Bx = item[2];
  var By = item[3];
  var Mx = item[4];
  var My = item[5];
  var value = item[6];
  it("(" + Ax + "," + Ay + "," + Bx + "," + By + "," + Mx + "," + My + ") should give " + value, function() {
  var Ux = Bx - Ax;
  var Uy = By - Ay;
  var Vx = Mx - Ax;
  var Vy = My - Ay;
  var expected = Ux*Vy - Uy*Vx;
  if( value !== expected )
  throw("Expected " + value + " to be " + expected);
  });
  });
  });
  describe('hasPointInsideNeg', function() {
  [
  [0,0,1,0,0,-1, .2,.2, false],
  [0,0,1,0,0,-1, -.2,0, false],
  [0,0,1,0,0,-1, -.1,-.1, false],
  [0,0,1,0,0,-1, .5,-.5, true],
  [0,0,1,0,0,-1, .5,0, true],
  [0,0,1,0,0,-1, 0,-.5, true],
  [0,0,1,0,0,-1, .2,-.2, true],
  [0,0,1,0,0,-1, .3,-.1, true],
  [0,0,1,0,0,-1, 1,0, true],
  [0,0,1,0,0,-1, 0,-1, true],
  [0,0,1,0,0,-1, 0,0, true]
  ].forEach(function (item) {
  var Ax = item[0];
  var Ay = item[1];
  var Bx = item[2];
  var By = item[3];
  var Cx = item[4];
  var Cy = item[5];
  var Mx = item[6];
  var My = item[7];
  var value = item[8];
  it('(' + Ax + "," + Ay + "," + Bx + "," + By + "," + Cx + "," + Cy + "," + Mx + "," + My
  + ') should return ' + value, function(){
  var result = hasPointInsideNeg(Ax,Ay,Bx,By,Cx,Cy,Mx,My);
  if( result !== value )
  throw "Expected " + result + " to be " + value + "!";
  });
  });
  });
  describe('hasPointInsidePos', function() {
  [
  [0,0,1,0,0,1, .2,.2, true],
  [0,0,1,0,0,1, -.2,0, false],
  [0,0,1,0,0,1, -.1,-.1, false],
  [0,0,1,0,0,1, .5,-.5, false],
  [0,0,1,0,0,1, .5,0, true],
  [0,0,1,0,0,1, 0,-.5, false],
  [0,0,1,0,0,1, .2,-.2, false],
  [0,0,1,0,0,1, .3,-.1, false],
  [0,0,1,0,0,1, 1,0, true],
  [0,0,1,0,0,1, 0,-1, false],
  [0,0,1,0,0,1, 0,0, true]
  ].forEach(function (item) {
  var Ax = item[0];
  var Ay = item[1];
  var Bx = item[2];
  var By = item[3];
  var Cx = item[4];
  var Cy = item[5];
  var Mx = item[6];
  var My = item[7];
  var value = item[8];
  it('(' + Ax + "," + Ay + "," + Bx + "," + By + "," + Cx + "," + Cy + "," + Mx + "," + My
  + ') should return ' + value, function(){
  var result = hasPointInsidePos(Ax,Ay,Bx,By,Cx,Cy,Mx,My);
  if( result !== value )
  throw "Expected " + result + " to be " + value + "!";
  });
  });
  });
  });
*/
