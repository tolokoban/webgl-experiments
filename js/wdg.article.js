/** @module wdg.article */require( 'wdg.article', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
   "use strict";

var PAGES = {
  $1: "Les bases",
  index: "Comprendre WebGL",
  chap1: "Dessiner un carré",
  chap2: "Dessiner un polygône",
  chap3: "Textures procédurales",
  chap4: "Textures animées",
  chap5: "Utiliser des images",
  chap6: "Un point c'est tout",
  "chap6-2": "La semi-transparence",
  chap7: "Particules",
  chap8: "Frame Buffer",
  deform: "Déformation",
  deform2: "Déformation (2)",
  $2: "La troisième dimension",
  interpolation: "Interpolation des varyings",
  $666: "Annexes",
  doc: "Documentations"
};

require("font.josefin");
var $ = require( "dom" );
var DB = require( "tfw.data-binding" );

/**
 * @class Article
 *
 * @example
 * var Article = require("Article");
 * var instance = new Article({ visible: false });
 */
var Article = function( opts ) {
  var page = window.location.pathname.split('/').pop();
  page = page.substr(0, page.length - 5);  // Retirer ".html"
  
  var header = $.tag('header', 'theme-elevation-12', [PAGES[page]]);
  var nav = createNav( page );
  var body = $.tag('article');
  var elem = $.elem( this, 'div', 'article', [body, nav, header] );
  
  DB.prop( this, 'content' )( function( v ) {
    $.clear( body );
    if (!Array.isArray( v )) {
      v = [ v ];
    }
    v.forEach( function( elem ) {
      $.add( body, elem );
    });
  });

  opts = DB.extend( {
    content: []
  }, opts, this );
};

module.exports = Article;


function createNav( currentPage ) {
  var nav = $.tag('nav', 'theme-elevation-8');
  var key, val;
  for( key in PAGES) {
    val = PAGES[key];
    if ( key.charAt(0) === '$' ) {
      // This is a title.
      $.add( nav, $.tag('h1', [val]) );
    }
    else if ( key == currentPage ) {
      $.add( nav, $.tag('div', 'theme-elevation-1', [val]) );
    }
    else {
      $.add( nav, $.tag('a', [val], { href: key + ".html"}) );
    }
  }
  return nav;
}

  
module.exports._ = _;
/**
 * @module wdg.article
 * @see module:$
 * @see module:font.josefin
 * @see module:dom
 * @see module:tfw.data-binding

 */
});