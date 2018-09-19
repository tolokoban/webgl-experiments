/** @module tfw.view.textbox */require( 'tfw.view.textbox', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var $ = require("dom");

var CODE_BEHIND = {
  onKeyUp: onKeyUp,
  onValueChanged: onValueChanged
};

var MAX_AUTOCOMPLETION_SUGGESTIONS = 99;


function onKeyUp( evt ) {
  if( evt.key === 'Enter' ) this.action = this.value;
}

function onValueChanged( v ) {
  manageValidator.call( this, v );
  manageAutoCompletion.call( this, v );
}

function manageValidator( v ) {
  this.valid = this.validator( v );
}

function manageAutoCompletion( v ) {
  var that = this;
  var list = this.list;
  if( !Array.isArray( list ) || list.length === 0 ) return;

  var elemCompletion = this.$elements.completion;
  $.clear( elemCompletion );
  var textToSearch = v.trim().toLowerCase();
  var elementsCount = 0;
  list.forEach(function (completionText) {
    var pos = completionText.toLowerCase().indexOf( textToSearch );
    if( pos !== 0 ) return;
    elementsCount++;
    if( elementsCount > MAX_AUTOCOMPLETION_SUGGESTIONS ) return;
    addCompletionItem.call( that, elemCompletion, completionText, pos, textToSearch.length );
  });
  if( elementsCount < MAX_AUTOCOMPLETION_SUGGESTIONS ) {
    list.forEach(function (completionText) {
      var pos = completionText.toLowerCase().indexOf( textToSearch );
      if( pos < 1 ) return;
      elementsCount++;
      if( elementsCount > MAX_AUTOCOMPLETION_SUGGESTIONS ) return;
      addCompletionItem.call( that, elemCompletion, completionText, pos, textToSearch.length );
    });
  }
}


function addCompletionItem( elemCompletion, completionText, begin, length ) {
  var that = this;
  var elem = $.div();
  if( begin > 0 ) {
    $.add( elem, $.tag('span', [completionText.substr(0, begin)]) );
  }
  $.add( elem, $.tag('b', [completionText.substr(begin, length)]) );
  if( begin + length < completionText.length ) {
    $.add( elem, $.tag('span', [completionText.substr(begin + length)]) );
  }
  $.on( elem, function(v) {
    that.value = completionText;
  });
  $.add( elemCompletion, elem );
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
    View.ensureCodeBehind( CODE_BEHIND, "onValueChanged", "onKeyUp" );
    //-------------------
    // Global functions.
    function defVal(args, attName, attValue) { return args[attName] === undefined ? attValue : args[attName]; };
    function addClassIfTrue(element, className, value) {
    if( value ) $.addClass(element, className);
    else $.removeClass(element, className); };;
    function addClassIfFalse(element, className, value) {
    if( value ) $.removeClass(element, className);
    else $.addClass(element, className); };;
    function addAttribIfFalse(element, attribName, value) {
    if( value ) $.removeAtt(element, attribName);
    else $.att(element, attribName); };;
    //-------------------
    // Global variables.
    var conv_string = Converters.get('string');
    var conv_boolean = Converters.get('boolean');
    var conv_unit = Converters.get('unit');
    var conv_strings = Converters.get('strings');
    var conv_validator = Converters.get('validator');
    var conv_integer = Converters.get('integer');
    var conv_isEmpty = Converters.get('isEmpty');
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
        pm.create("label", { cast: conv_string });
        pm.create("type", { cast: conv_string });
        pm.create("wide", { cast: conv_boolean });
        pm.create("focus", { cast: conv_boolean });
        pm.create("enabled", { cast: conv_boolean });
        pm.create("visible", { cast: conv_boolean });
        pm.create("width", { cast: conv_unit });
        pm.createAction("action")
        pm.create("list", { cast: conv_strings });
        pm.create("validator", { cast: conv_validator });
        pm.create("valid", { cast: conv_boolean });
        pm.create("value", { cast: conv_string });
        pm.create("maxLength", { cast: conv_integer(0) });
        //------------------
        // Create elements.
        var e_ = new Tag('DIV', ["class"]);
        var e_head = new Tag('DIV', ["class","textcontent"]);
        this.$elements.head = e_head;
        var e_body = new Tag('DIV', ["class"]);
        var e_input = new Tag('INPUT', ["class","type","maxLength","value","focus"]);
        this.$elements.input = e_input;
        $.add( e_body, e_input );
        this.$elements.body = e_body;
        var e_foot = new Tag('DIV', ["class"]);
        this.$elements.foot = e_foot;
        var e_bottom = new Tag('DIV', ["class"]);
        this.$elements.bottom = e_bottom;
        var e_5 = new Tag('FOOTER');
        var e_completion = new Tag('DIV', ["class"]);
        this.$elements.completion = e_completion;
        $.add( e_5, e_completion );
        $.add( e_, e_head, e_body, e_foot, e_bottom, e_5 );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //---------
        // Events.
        View.events(e_input, {
          "keyup": CODE_BEHIND.onKeyUp.bind( this )
        });
        //-------
        // Links
        new Link({
          A:{obj: that,
              name: 'enabled'},
          B:{action: function(v) {
          addClassIfTrue( e_, "thm-ele2", v );}},
          name:"enabled > undefined"
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
              name: 'focus',
              open: false},
          B:{action: function(v) {
          addClassIfTrue( e_, "thm-bgSL", v );
          addClassIfFalse( e_, "thm-bg3", v );}},
          name:"focus > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'focus'},
          B:{action: function(v) {
          addClassIfTrue( e_, "focus", v );}},
          name:"focus > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'label'},
          B:{action: function(v) {
          addClassIfTrue( e_, "no-label", v );},
              converter: conv_isEmpty},
          name:"label > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'enabled'},
          B:{action: function(v) {
          addClassIfFalse( e_, "disabled", v );}},
          name:"enabled > undefined"
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
              name: 'valid'},
          B:{action: function(v) {
          addClassIfFalse( e_, "invalid", v );}},
          name:"valid > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'label'},
          B:{obj: e_head,
              name: 'textcontent'},
          name:"label > e_head/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'type'},
          B:{obj: e_input,
              name: 'type'},
          name:"type > e_input/type"
        });
        new Link({
          A:{obj: that,
              name: 'maxLength'},
          B:{obj: e_input,
              name: 'maxLength'},
          name:"max-length > e_input/maxLength"
        });
        new Link({
          A:{obj: that,
              name: 'value',
              delay: 350},
          B:{obj: e_input,
              name: 'value'},
          name:"value > e_input/value"
        });
        new Link({
          A:{obj: that,
              name: 'focus'},
          B:{obj: e_input,
              name: 'focus'},
          name:"focus > e_input/focus"
        });
        new Link({
          A:{obj: that,
              name: 'enabled'},
          B:{action: function(v) {
          addAttribIfFalse( e_input, "disabled", v );}},
          name:"enabled > undefined"
        });
        //-----------------------
        // On attribute changed.
        pm.on( "value", function(v) {
          try {
            CODE_BEHIND.onValueChanged.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "onValueChanged" of module "mod/tfw.view.textbox.js" for attribute "value"!  ');
            console.error( ex );
          }} );
        pm.on("width", function(v) {
          e_body.$.style["width"] = v;
        });
        //----------------------
        // Initialize elements.
        e_.class = "tfw-view-textbox";
        e_head.class = "head thm-fg";
        e_body.class = "body";
        e_input.class = "thm-fg";
        e_foot.class = "foot";
        e_bottom.class = "bottom thm-bgSD";
        e_completion.class = "completion thm-fg thm-bg2 thm-ele4";
        //------------------------
        // Initialize attributes.
        this.label = defVal(args, "label", "");
        this.type = defVal(args, "type", "text");
        this.wide = defVal(args, "wide", false);
        this.focus = defVal(args, "focus", false);
        this.enabled = defVal(args, "enabled", true);
        this.visible = defVal(args, "visible", true);
        this.width = defVal(args, "width", "auto");
        this.list = args["list"];
        this.validator = defVal(args, "validator", "");
        this.valid = defVal(args, "valid", false);
        this.value = defVal(args, "value", "");
        this.maxLength = defVal(args, "maxLength", 999);
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/tfw.view.textbox.js', ex);
        throw Error('Instantiation error in XJS of "mod/tfw.view.textbox.js":\n' + ex)
      }
    };
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/tfw.view.textbox.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module tfw.view.textbox
 * @see module:$
 * @see module:dom
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.binding.link
 * @see module:tfw.view
 * @see module:tfw.binding.converters

 */
});