/** @module wdg.menu */require( 'wdg.menu', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";


var CODE_BEHIND = {
  refresh: refresh
};

require("theme");
var $ = require("dom");
var MenuItem = require("wdg.menu.item");


function refresh() {
  var article = this.$elements.article;
  $.clear( article );
  this.value.forEach(function (item) {
    var m = new MenuItem({
      id: item[0],
      title: item[1],
      keywords: item[2]
    });
    $.add( article, m );
  });
}


//===============================
// XJS:View autogenerated code.
try {
  module.exports = function() {
    //--------------------
    // Dependent modules.
    var $ = require('dom');
    var PM = require('tfw.binding.property-manager');
    var Tag = require('tfw.view').Tag;
    var View = require('tfw.view');;
    var Converters = require('tfw.binding.converters');
    //-------------------------------------------------------
    // Check if needed functions are defined in code behind.
    View.ensureCodeBehind( CODE_BEHIND, "refresh" );
    //-------------------
    // Global functions.
    function defVal(args, attName, attValue) { return args[attName] === undefined ? attValue : args[attName]; };
    //-------------------
    // Global variables.
    var conv_array = Converters.get('array');
    //-------------------
    // Class definition.
    var ViewClass = function( args ) {
      try {
        if( typeof args === 'undefined' ) args = {};
        this.$elements = {};
        var that = this;
        var pm = PM(this);
        //--------------------
        // Create attributes.
        pm.create("value", { cast: conv_array });
        //------------------
        // Create elements.
        var e_ = new Tag('DIV', ["class"]);
        var e_article = new Tag('ARTICLE', ["class"]);
        this.$elements.article = e_article;
        var e_1 = new Tag('HEADER', ["class"]);
        $.add( e_1, "Apprendre le WebGL" );
        $.add( e_, e_article, e_1 );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //-----------------------
        // On attribute changed.
        pm.on( "value", function(v) {
          try {
            CODE_BEHIND.refresh.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "refresh" of module "mod/wdg.menu.js" for attribute "value"!  ');
            console.error( ex );
          }} );
        //----------------------
        // Initialize elements.
        e_.class = "wdg-menu";
        e_article.class = "thm-bg1";
        e_1.class = "thm-bgP thm-ele8";
        //------------------------
        // Initialize attributes.
        this.value = defVal(args, "value", []);
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/wdg.menu.js', ex);
        throw Error('Instantiation error in XJS of "mod/wdg.menu.js":\n' + ex)
      }
    };
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/wdg.menu.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module wdg.menu
 * @see module:$
 * @see module:theme
 * @see module:dom
 * @see module:wdg.menu.item
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.view
 * @see module:tfw.binding.converters

 */
});