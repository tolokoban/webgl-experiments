/** @module tfw.view.color-input */require( 'tfw.view.color-input', function(require, module, exports) { var _=function(){var D={"en":{"chromatic-region":"Chromatic region","expert-hint":"You can give a color code (ex: #42FD03, rgb(255,120,35), hsl(300,60,75), ...) and hit Return.","expert-label":"Color code","hue-selection":"Fix the hue","luminance":"Adjust the light"},"fr":{"chromatic-region":"Région chromatique","expert-hint":"Vous pouvez spécifier directement le code couleur (ex : #42FD03, rgb(255,120,35), hsl(300,60,75), ...) et taper Entrée.","expert-label":"Code couleur","hue-selection":"Ajustez la nuance","luminance":"Réglez l'éclairage"}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var CODE_BEHIND = {
  onValueChanged: onValueChanged,
  onTap: onTap
};

var CHROMATIC_REGIONS = 24;
var INV_CHROMATIC_REGIONS = 1 / CHROMATIC_REGIONS;

var $ = require("dom");
var PM = require("tfw.binding.property-manager");
var Color = require("tfw.color");
var Dialog = require("wdg.modal");
var Tapable = require("tfw.view.tapable");
var Textbox = require("tfw.view.textbox");
var ButtonFactory = require("tfw.factory.button");


function onValueChanged( cssColor ) {
  this.$elements.button.$.style.color = textColor( cssColor );
}

function onTap() {
  var that = this;

  var btnClose = ButtonFactory.cancel();
  var palette = $.div();
  var textbox = new Textbox({
    wide: true, label: _("expert-label"), value: this.value, width: "240px"
  });
  var hint = $.div("hint", [_('expert-hint')]);
  var pastille = $.div("pastille", ["X"]);
  $.css( pastille, { background: this.value });
  var expert = $.div( "expert", [
    $.tag('hr'),
    $.div("flex", [ textbox, pastille ]),
    hint
  ]);
  var content = $.div( "tfw-view-color-input-dialog", [ palette, expert ] );
  var dialog = new Dialog({
    header: this.label,
    content: content,
    footer: btnClose
  });
  PM( btnClose ).on( "action", dialog.detach.bind( dialog ) );
  dialog.attach();
  var done = function( color ) {
    dialog.detach();
    window.setTimeout(function() {
      that.value = color;
    }, 300);
  };

  pageChromaticRegion( palette )
    .then(function( color ) {
      textbox.value = color;
      return pageHueSelection( palette, color );
    })
    .then(function( color ) {
      textbox.value = color;
      return pageLuminance( palette, color );
    })
    .then( done );

  PM( textbox ).on( "action", function() {
    done( Color.parse( textbox.value ).stringify() );
  });
  PM( textbox ).on( "value", function( v ) {
    var color = Color.parse( textbox.value ).stringify();
    $.css( pastille, { background: color });
  });
}

function pageHueSelection( content, selectedCssColor ) {
  return new Promise(function (resolve, reject) {
    $.clear( content, $.div([_('hue-selection') + " - 2/3"]) );
    var cssColor;
    var color = Color.instance;
    color.parse( selectedCssColor );
    color.rgb2hsl();
    var overlap = 1;
    var size = 2 * overlap * INV_CHROMATIC_REGIONS;
    var H0 = color.H - size * 0.5;
    for( var k=0; k<CHROMATIC_REGIONS; k++ ) {
      color.H = H0 + size * k * INV_CHROMATIC_REGIONS;
      color.hsl2rgb();
      cssColor = color.stringify();
      $.add( content, createColorButton(
        cssColor, buttonEventHandler.bind( null, resolve, cssColor )
      ));
    }
  });
}

function pageLuminance( content, selectedCssColor ) {
  return new Promise(function (resolve, reject) {
    $.clear( content, $.div([_('luminance') + " - 3/3"]) );
    var cssColor;
    var color = Color.instance;
    color.parse( selectedCssColor );
    color.rgb2hsl();
    for( var L=0.9; L>0.3; L-=0.1 ) {
      color.L = L;
      for( var S=1; S>.3; S-=0.2 ) {
        color.S = S;
        color.hsl2rgb();
        cssColor = color.stringify();
        $.add( content, createColorButton(
          cssColor, buttonEventHandler.bind( null, resolve, cssColor )
        ));
      }
    }
  });
}

function pageChromaticRegion( content ) {
  return new Promise(function (resolve, reject) {
    $.clear( content, $.div([_('chromatic-region') + " - 1/3"]) );
    var cssColor;
    var color = Color.instance;
    for( var k=0; k<CHROMATIC_REGIONS; k++ ) {
      color.H = k * INV_CHROMATIC_REGIONS;
      color.S = 1;
      color.L = 0.7;
      color.hsl2rgb();
      cssColor = color.stringify();
      $.add( content, createColorButton(
        cssColor, buttonEventHandler.bind( null, resolve, cssColor )
      ));
    }
  });
}

function buttonEventHandler( resolve, color ) {
  resolve( color );
}

function createColorButton( background, onTap ) {
  var foreground = textColor( background );
  var btn = $.tag("button", "thm-ele2");
  $.css( btn, {
    background: background,
    color: foreground
  });
  btn.textContent = background;
  var tapable = new Tapable({ content: btn });
  tapable.on( onTap );
  return tapable;
}


function textColor( color ) {
  Color.instance.parse( color );
  var luminance = Color.instance.luminance();

  return luminance < .6 ? '#fff' : '#000';
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
    View.ensureCodeBehind( CODE_BEHIND, "onValueChanged", "onTap" );
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
    var conv_color = Converters.get('color');
    var conv_string = Converters.get('string');
    var conv_boolean = Converters.get('boolean');
    var conv_unit = Converters.get('unit');
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
        pm.create("value", { cast: conv_color });
        pm.create("label", { cast: conv_string });
        pm.create("focus", { cast: conv_boolean });
        pm.create("wide", { cast: conv_boolean });
        pm.create("visible", { cast: conv_boolean });
        pm.create("width", { cast: conv_unit });
        //------------------
        // Create elements.
        var e_ = new Tag('DIV', ["class"]);
        var e_head = new Tag('DIV', ["class"]);
        this.$elements.head = e_head;
        var e_body = new Tag('DIV', ["class"]);
        var e_button = new Tag('BUTTON', ["focus","class","textcontent"]);
        this.$elements.button = e_button;
        $.add( e_body, e_button );
        this.$elements.body = e_body;
        var e_foot = new Tag('DIV', ["class"]);
        this.$elements.foot = e_foot;
        var e_bottom = new Tag('DIV', ["class"]);
        this.$elements.bottom = e_bottom;
        $.add( e_, e_head, e_body, e_foot, e_bottom );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //---------
        // Events.
        View.events(e_button, {
          "tap": CODE_BEHIND.onTap.bind( this )
        });
        //-------
        // Links
        new Link({
          A:{obj: that,
              name: 'focus'},
          B:{action: function(v) {
          addClassIfTrue( e_, "focus", v );}},
          name:"focus > undefined"
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
              name: 'focus',
              open: false},
          B:{action: function(v) {
          addClassIfTrue( e_, "thm-bg3", v );}},
          name:"focus > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'focus'},
          B:{obj: e_button,
              name: 'focus'},
          name:"focus > e_button/focus"
        });
        new Link({
          A:{obj: that,
              name: 'value'},
          B:{obj: e_button,
              name: 'textcontent'},
          name:"value > e_button/textcontent"
        });
        //-----------------------
        // On attribute changed.
        pm.on( "value", function(v) {
          try {
            CODE_BEHIND.onValueChanged.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "onValueChanged" of module "mod/tfw.view.color-input.js" for attribute "value"!  ');
            console.error( ex );
          }} );
        pm.on('label', function(v) { $.clear(e_head, v); });
        pm.on("value", function(v) {
          e_button.$.style["background"] = v;
        });
        pm.on("width", function(v) {
          e_button.$.style["width"] = v;
        });
        //----------------------
        // Initialize elements.
        e_.class = "tfw-view-color-input";
        e_head.class = "head";
        e_body.class = "body";
        e_button.class = "thm-ele2";
        e_foot.class = "foot";
        e_bottom.class = "bottom thm-bgS";
        //------------------------
        // Initialize attributes.
        this.value = defVal(args, "value", "#fb7");
        this.label = defVal(args, "label", "Color");
        this.focus = defVal(args, "focus", false);
        this.wide = defVal(args, "wide", false);
        this.visible = defVal(args, "visible", true);
        this.width = defVal(args, "width", "100%");
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/tfw.view.color-input.js', ex);
        throw Error('Instantiation error in XJS of "mod/tfw.view.color-input.js":\n' + ex)
      }
    };
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/tfw.view.color-input.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module tfw.view.color-input
 * @see module:$
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.color
 * @see module:wdg.modal
 * @see module:tfw.view.tapable
 * @see module:tfw.view.textbox
 * @see module:tfw.factory.button
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.binding.link
 * @see module:tfw.view
 * @see module:tfw.binding.converters

 */
});