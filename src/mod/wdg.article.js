"use strict";

var PAGES = {
  $1: "Les bases",
  index: "Comprendre WebGL",
  chap1: "Dessiner un carré",
  chap2: "Dessiner un polygône",
  chap3: "Textures procédurales",
  chap4: "Textures animées",
  chap5: "Utiliser des images",
  $999: "脌 trier...",
  chap6: "Chap-6",
  chap7: "Chap-7",
  chap8: "Chap-8",
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
  
console.info("page=", page);

  var header = $.tag('header', 'theme-elevation-12', [PAGES[page]]);
  var nav = createNav();
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


function createNav() {
  var nav = $.tag('nav', 'theme-elevation-8');
  var key, val;
  for( key in PAGES) {
    val = PAGES[key];
    if ( key.charAt(0) === '$' ) {
      // This is a title.
      $.add( nav, $.tag('h1', [val]) );
    }
    else {
      $.add( nav, $.tag('a', [val], { href: key + ".html"}) );
    }
  }
  return nav;
}