/** @module wdg.showhide */require( 'wdg.showhide', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    /**
 * @module tfw.view.label
 *
 * @description
 * * __label__: Text to display as title.
 * * __value__: If true, the content is visible.
 * * __content__: Array of the embeded elements.
 * @param {boolean} opts.simple
 *
 * @example
 * var mod = require('wdg.showhide');
 */

var $ = require("dom");
var DB = require("tfw.data-binding");
var Icon = require("wdg.icon");
var Focusable = require("tfw.focusable");


function Showhide( opts ) {
    var that = this;

    var icon = new Icon({content: "tri-right", size: "1.5em"});
    var label = $.tag('span', 'label');
    var head = $.div('head', 'theme-label', 'theme-color-bg-1', [icon, label]);
    var body = $.div('body', 'theme-color-bg-B1');
    var elem = $.elem( this, 'div', 'wdg-showhide', 'theme-elevation-2', [head, body] );

    Focusable( this, function(evt) {
        switch( evt.keyCode ) {
        case 13:
        case 32:
            that.value = !that.value;
            break;
        }
        console.info("[wdg.showhide] evt=", evt);
    });

    DB.propBoolean(this, 'value')(function(v) {
        if (v) {
            $.addClass( elem, 'show' );
            $.removeClass( elem, 'fade-in' );
            window.setTimeout(function() {
                $.addClass( elem, 'fade-in' );
            });
        }
        else $.removeClass( elem, 'show' );
    });
    DB.propBoolean(this, 'simple')(function(v) {
        if (v) {
            $.addClass( elem, 'simple' );
            $.removeClass( elem, 'theme-elevation-2' );
            $.removeClass( head, 'theme-label', 'theme-color-bg-1' );
            $.addClass( head, 'theme-color-7' );
        } else {
            $.removeClass( elem, 'simple' );
            $.addClass( elem, 'theme-elevation-2' );
            $.addClass( head, 'theme-label', 'theme-color-bg-1' );
            $.removeClass( head, 'theme-color-7' );
        }
    });
    DB.propString(this, 'label')(function(v) {
        label.textContent = v;
    });
    DB.propUnit(this, 'maxHeight')(function(unit) {
        if( unit.v <= 0 ) {
            // The size of the widget is determined by the size of its content.
            body.style.maxHeight = 'none';
        } else {
            // Set a max-height and activate scrolling.
            body.style.maxHeight = unit.v + unit.u;
        }
    });
    DB.prop(this, 'content')(function(v) {
        $.clear( body );
        if (Array.isArray( v )) {
            v.forEach(function (itm) {
                $.add( body, itm );
            });
        } else if (typeof v !== 'undefined' && v !== null){
            $.add( body, v );
        }
    });
    DB.propRemoveClass(this, 'wide', 'inline');
    DB.propRemoveClass(this, 'visible', 'hide');

    opts = DB.extend({
        value: true, label: '', content: null, maxHeight: null,
        visible: true, wide: true, simple: false, focus: false
    }, opts, this );

    // Toggle display on Tap.
    function reverseValue() { 
        that.value = !that.value;
        that.focus = true;
    }
    $.on( head, reverseValue);
    DB.bind(icon, 'action', reverseValue);

    this.append = function( item ) {
        if (!Array.isArray(that.content)) that.content = [];
        that.content.push( item );
        $.add( body, item );
        return that;
    };

    this.prepend = function( item ) {
        if (!Array.isArray(that.content)) that.content = [];
        that.content.push( item );
        body.insertBefore( item, body.childNodes[0] );
        return that;
    };
}


/**
 * @return void
 */
Showhide.prototype.clear = function() {
    this.content = [];
    return this;
};


/**
 * @class tfw.view.label
 * @param {string} value  - Text to display. If this  text starts with
 * `<html>`, it is parsed as HTML code.
 */
module.exports = Showhide;


  
module.exports._ = _;
/**
 * @module wdg.showhide
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.icon
 * @see module:tfw.focusable

 */
});