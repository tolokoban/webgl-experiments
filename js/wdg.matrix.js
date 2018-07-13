/** @module wdg.matrix */require( 'wdg.matrix', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var $ = require("dom");


var Matrix = function(arg) {
  if( typeof arg === 'undefined' ) arg = "";
  var v = ("" + arg.value).trim();

  var body = $.div("wdg-matrix");
  this.element = body;
  var ctx = {
    parent: body,
    cursor: 0,
    text: v
  };
  while( parse(ctx) );
};


function parse( ctx ) {
  if( ctx.text.length <= ctx.cursor ) return false;
  var c = ctx.text.charAt( ctx.cursor++ ).trim();
  if( c.length === 0 ) return true;
  if( c === '[' ) return parseMatrix( ctx );
  if( c === '*' ) return parseTimes( ctx );  
  return parseSymbol( c, ctx );
}

function parseSymbol( c, ctx ) {
  var child = $.div();
  child.textContent = c;
  ctx.parent.appendChild( child );
  return true;
}

function parseTimes( ctx ) {
  var child = $.div();
  child.innerHTML = '&times;';
  ctx.parent.appendChild( child );
  return true;
}

function parseMatrix( ctx ) {
  var mat = $.div("mtx");
  var row = $.div();
  var cell = $.div();

  mat.appendChild( row );
  row.appendChild( cell );
  
  while( ctx.cursor < ctx.text.length ) {
    var c = ctx.text.charAt( ctx.cursor++ ).trim();
    if( c === ']' ) break;
    if( c === ',' ) {
      cell = $.div();
      row.appendChild( cell );      
    }
    else if( c === ';' ) {
      row = $.div();
      mat.appendChild( row );
      cell = $.div();
      row.appendChild( cell );      
    }
    else if( c === '*' ) {
      cell.innerHTML += "&times;";
    }
    else {
      cell.textContent += c;
    }
  }
  ctx.parent.appendChild( mat );
  return true;
}

module.exports = Matrix;


  
module.exports._ = _;
/**
 * @module wdg.matrix
 * @see module:$
 * @see module:dom

 */
});