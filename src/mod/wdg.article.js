"use strict";

var PAGES = {
  index: "Comprendre WebGL"
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
  var nav = $.tag('nav', 'theme-elevation-8');
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