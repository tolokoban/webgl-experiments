"use strict";

var PAGES = {
  $1: "Les bases",
  intro: "Introduction",
  index: "Comprendre WebGL",
  index2: "Comprendre WebGL (2)",
  chap1: "Dessiner un carré",
  chap2: "Dessiner un polygône",
  chap3: "Textures procédurales",
  chap4: "Textures animées",
  chap5: "Utiliser des images",
  chap6: "Un point c'est tout",
  "chap6-2": "La semi-transparence",
  transparence: "La semi-transparence (2)",
  chap7: "Particules",
  chap8: "Frame Buffer",
  deform: "Déformation",
  deform2: "Déformation (2)",
  $2: "La troisième dimension",
  interpolation: "Interpolation des varyings",
  $666: "Annexes",
  doc: "Documentations"
};

var TOC = [
  "Les bases", [
    "Intoduction | intro"
  ]
];

require("theme");
var $ = require( "dom" );
var DB = require( "tfw.data-binding" );
var Icon = require("tfw.view.icon");


/**
 * @class Article
 *
 * @example
 * var Article = require("Article");
 * var instance = new Article({ visible: false });
 */
var Article = function( opts ) {
  var args = require("tfw.url-args").parse();
  
  $.addClass( document.body, "thm-bg0" );
  
  var page = window.location.pathname.split('/').pop();
  page = page.substr(0, page.length - 5);  // Retirer ".html"

  if( typeof opts.title !== 'string' ) opts.title = page;

  var header = $.tag('header', 'thm-ele12', 'thm-bgP', [
    $.tag("a", { href: "index.html#" + args.id }, [
      new Icon({ size: "1.5rem", content: "menu" })
    ]),
    opts.title
  ]);
  var nav = createNav( page );
  var body = $.tag('article', 'thm-bg1');
  var elem = $.elem( this, 'div', 'article', [body, header] );
  
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
  var nav = $.tag('nav', 'thm-ele8', 'thm-bgPL');
  var key, val;
  for( key in PAGES) {
    val = PAGES[key];
    if ( key.charAt(0) === '$' ) {
      // This is a title.
      $.add( nav, $.tag('h1', [val]) );
    }
    else if ( key == currentPage ) {
      $.add( nav, $.tag('div', 'thm-ele1', [val]) );
    }
    else {
      $.add( nav, $.tag('a', [val], { href: key + ".html"}) );
    }
  }
  return nav;
}
