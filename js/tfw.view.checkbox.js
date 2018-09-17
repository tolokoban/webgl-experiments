/** @module tfw.view.checkbox */require( 'tfw.view.checkbox', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var CODE_BEHIND = {
  init: init,
  on: on,
  onKeyUp: onKeyUp
};

var PM = require("tfw.binding.property-manager");
var Touchable = require("tfw.touchable");

function on( action ) {
  PM( this ).on( "value", action );
}

function onKeyUp( evt ) {
  if( ["enter", "space"].indexOf( evt.code.toLowerCase() ) > -1 ) {
    this.value = !this.value;
  }
}

function init() {
  new Touchable( this.$ );
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
    var Link = require('tfw.binding.link');
    var View = require('tfw.view');;
    var Converters = require('tfw.binding.converters');
    //-------------------------------------------------------
    // Check if needed functions are defined in code behind.
    View.ensureCodeBehind( CODE_BEHIND, "on", "init", "onKeyUp" );
    //-------------------
    // Global functions.
    function defVal(args, attName, attValue) { return args[attName] === undefined ? attValue : args[attName]; };
    function addClassIfTrue(element, className, value) {
    if( value ) $.addClass(element, className);
    else $.removeClass(element, className); };;
    function addClassIfFalse(element, className, value) {
    if( value ) $.removeClass(element, className);
    else $.addClass(element, className); };;
    //-------------------
    // Global variables.
    var conv_boolean = Converters.get('boolean');
    var conv_string = Converters.get('string');
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
        pm.create("value", { cast: conv_boolean });
        pm.create("inverted", { cast: conv_boolean });
        pm.create("visible", { cast: conv_boolean });
        pm.create("wide", { cast: conv_boolean });
        pm.create("content", { cast: conv_string });
        //------------------
        // Create elements.
        var e_ = new Tag('BUTTON', ["class"]);
        var e_0 = new Tag('DIV', ["class"]);
        var e_bar = new Tag('DIV', ["class"]);
        this.$elements.bar = e_bar;
        var e_btn = new Tag('DIV', ["class"]);
        this.$elements.btn = e_btn;
        $.add( e_0, e_bar, e_btn );
        var e_3 = new Tag('DIV', ["class"]);
        $.add( e_, e_0, e_3 );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //---------
        // Events.
        View.events(e_, {
          "tap": function(v) {
            that.value = that.value ? false : true;
          },
          "keyup": CODE_BEHIND.onKeyUp.bind( this )
        });
        //-------
        // Links
        new Link({
          A:{obj: that,
              name: 'value'},
          B:{action: function(v) {
          addClassIfTrue( e_, "ok", v );}},
          name:"value > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'inverted'},
          B:{action: function(v) {
          addClassIfTrue( e_, "inverted", v );}},
          name:"inverted > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'wide'},
          B:{action: function(v) {
          addClassIfTrue( e_, "wide", v );}},
          name:"wide > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'visible'},
          B:{action: function(v) {
          addClassIfFalse( e_, "hide", v );}},
          name:"visible > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'value'},
          B:{action: function(v) {
          addClassIfTrue( e_bar, "thm-bgSL", v );
          addClassIfFalse( e_bar, "thm-bg0", v );}},
          name:"value > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'value'},
          B:{action: function(v) {
          addClassIfTrue( e_btn, "thm-bgS", v );
          addClassIfFalse( e_btn, "thm-bg0", v );}},
          name:"value > undefined"
        });
        //-----------------------
        // On attribute changed.
        pm.on('content', function(v) { $.clear(e_3, v); });
        //----------------------
        // Initialize elements.
        e_.class = "tfw-view-checkbox";
        e_0.class = "pin";
        e_bar.class = "bar thm-ele2";
        e_btn.class = "btn thm-ele2";
        e_3.class = "txt";
        //------------------------
        // Initialize attributes.
        this.value = defVal(args, "value", false);
        this.inverted = defVal(args, "inverted", false);
        this.visible = defVal(args, "visible", true);
        this.wide = defVal(args, "wide", true);
        this.content = defVal(args, "content", "Checkbox");
        // Initialization.
        CODE_BEHIND.init.call( this );
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/tfw.view.checkbox.js', ex);
        throw Error('Instantiation error in XJS of "mod/tfw.view.checkbox.js":\n' + ex)
      }
    };
    //------------------
    // Static members..
    ViewClass.prototype.on = CODE_BEHIND.on;
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/tfw.view.checkbox.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module tfw.view.checkbox
 * @see module:$
 * @see module:tfw.binding.property-manager
 * @see module:tfw.touchable
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.binding.link
 * @see module:tfw.view
 * @see module:tfw.binding.converters

 */
});