/** @module wdg.modal */require( 'wdg.modal', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    /**
 * @module wdg.modal
 *
 * @class
 * @param {boolean} scroll - Default true.
 *
 *
 * @example
 * var mod = require('wdg.modal');
 */
var $ = require( "dom" );
var DB = require( "tfw.data-binding" );
var Flex = require( "wdg.flex" );
var Button = require( "wdg.button" );


function Modal( opts ) {
  var that = this;

  var body = $.div( 'theme-elevation-24', 'theme-color-bg-B3' );
  var cell = $.div( [ body ] );
  var elem = $.elem( this, 'div', 'wdg-modal', [ cell ] );

  DB.prop( this, 'content' )( function ( v ) {
    $.clear( body );
    if ( Array.isArray( v ) ) {
      v.forEach( function ( itm ) {
        $.add( body, itm );
      } );
    } else if ( typeof v !== 'undefined' && v !== null ) {
      $.add( body, v );
    }
  } );
  DB.propString( this, 'width' )( function ( v ) {
    $.css( body, {
      'max-width': v
    } );
  } );
  DB.propAddClass( this, 'padding' );
  DB.propAddClass( this, 'scroll' );
  DB.propAddClass( this, 'wide' );
  DB.propBoolean( this, 'visible' )( function ( v ) {
    if ( v ) {
      that.attach();
    } else {
      that.detach();
    }
  } );

  opts = DB.extend( {
    visible: false,
    content: [],
    padding: true,
    scroll: true,
    wide: false,
    width: 'auto'
  }, opts, this );
}


/**
 * @member Modal.refresh
 * Refresh the content.
 */
Modal.prototype.refresh = function () {
  DB.fire( this, 'content' );
  return this;
};

/**
 * @member Modal.attach
 * Append element to body.
 */
Modal.prototype.attach = function () {
  var that = this;

  if ( this._timeoutDetach ) {
    window.clearTimeout( this._timeoutDetach );
    delete this._timeoutDetach;
  }
  document.body.appendChild( this.element );
  DB.set( this, 'visible', true );
  $.addClass( this, 'fadeout' );
  window.setTimeout( function () {
    $.removeClass( that, 'fadeout' );
  } );
};

/**
 * @member Modal.detach
 * Remove element from body.
 */
Modal.prototype.detach = function () {
  var that = this;

  window.setTimeout( function () {
    $.addClass( that, 'fadeout' );
  } );
  this._timeoutDetach = window.setTimeout( function () {
    delete this._timeoutDetach;
    DB.set( that, 'visible', false );
    $.detach( that.element );
  }, 250 );
};

/**
 * @function Modal.comfirm
 */
Modal.confirm = function ( content, onYes, onNo ) {
  var btnNo = Button.No();
  var btnYes = Button.Yes( 'warning' );
  var buttons = $.div( [ $.tag( 'hr' ), new Flex( {
    content: [ btnNo, btnYes ]
  } ) ] );
  if ( typeof content === 'string' && content.substr( 0, 6 ) == '<html>' ) {
    // This is HTML code.
    var html = content.substr( 6 );
    content = $.div();
    content.innerHTML = html;
  }
  var modal = new Modal( {
    content: $.div( [ content, buttons ] ),
    padding: true
  } );
  modal.attach();

  btnNo.on( function () {
    modal.detach();
    if ( typeof onNo === 'function' ) {
      onNo();
    }
  } );
  btnYes.on( function () {
    if ( typeof onYes === 'function' ) {
      var caption = onYes();
      if ( typeof caption !== 'string' ) modal.detach();
      else {
        btnNo.visible = false;
        btnYes.waitOn( caption );
      }
    } else {
      modal.detach();
    }
  } );
  return modal;
};

/**
 * Display a message with an OK button.
 */
Modal.alert = function ( content, onOK ) {
  var btnOK = Button.Close( 'simple' );
  var buttons = $.div( [ $.tag( 'hr' ), new Flex( {
    content: [ btnOK ]
  } ) ] );
  if ( typeof content === 'string' && content.substr( 0, 6 ) == '<html>' ) {
    // This is HTML code.
    var html = content.substr( 6 );
    content = $.div();
    content.innerHTML = html;
  }
  var modal = new Modal( {
    scroll: false,
    content: $.div( [
        $.div( 'scrollable', [ content ] ), buttons
    ] ),
    padding: true
  } );
  modal.attach();

  btnOK.on( function () {
    modal.detach();
    if ( typeof onOK === 'function' ) onOK();
  } );
  return modal;
};


module.exports = Modal;

  
module.exports._ = _;
/**
 * @module wdg.modal
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.flex
 * @see module:wdg.button

 */
});