/** @module wdg.modal */require( 'wdg.modal', function(require, module, exports) { var _=function(){var D={"en":{"cancel":"Cancel","close":"Got it","confirm":"Confirm","ok":"Accept"},"fr":{"cancel":"Annuler","close":"J'ai compris","confirm":"Confirmation","ok":"Accepter"}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
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

/**
@exports {class}
@param {object} opts.content -


*/
function Modal( opts ) {
  var that = this;

  var body = $.div();
  body.addEventListener("scroll", onScroll.bind( this, body ));
  var laterScroll = function() {
    window.setTimeout(function() {
      onScroll( body );
    });
  };
  var header = $.tag( 'header', 'thm-ele8', 'thm-bgPD' );
  var footer = $.tag( 'footer' );
  var cell = $.div( 'cell', 'thm-ele24', 'thm-bg0', [ header, body, footer ] );
  var elem = $.elem( this, 'div', 'wdg-modal', [ $.div([cell]) ] );

  DB.prop( this, 'content' )( function ( v ) {
    $.clear( body );
    if ( Array.isArray( v ) ) {
      v.forEach( function ( itm ) {
        $.add( body, itm );
      } );
    } else if ( typeof v !== 'undefined' && v !== null ) {
      $.add( body, v );
    }
    laterScroll();
  } );
  DB.prop( this, 'header' )( function ( v ) {
    if( !v || (typeof v === 'string' && v.trim().length === 0) ) {
      $.addClass( header, "hide" );
      return;
    }
    $.removeClass( header, "hide" );
    $.clear( header );
    if ( Array.isArray( v ) ) {
      v.forEach( function ( itm ) {
        $.add( header, itm );
      } );
    } else if ( typeof v !== 'undefined' && v !== null ) {
      $.add( header, v );
    }
    laterScroll();
  } );
  DB.prop( this, 'footer' )( function ( v ) {
    if( !v || (typeof v === 'string' && v.trim().length === 0) ) {
      $.addClass( footer, "hide" );
      return;
    }
    $.removeClass( footer, "hide" );
    $.clear( footer );    
    if ( Array.isArray( v ) ) {
      v.forEach( function ( itm ) {
        $.add( footer, itm );
      } );
    } else  {
      $.add( footer, v );
    }
    laterScroll();
  } );
  DB.propString( this, 'width' )( function ( v ) {
    $.css( body, {
      'max-width': v
    } );
    laterScroll();
  } );
  DB.propAddClass( this, 'fullscreen' );
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
    header: null,
    content: [],
    footer: null,
    padding: true,
    scroll: true,
    wide: false,
    fullscreen: false,
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
 * @param {array|object|string} args.content - Content to display.
 * @param {string} args.title - Modal title.
 * @param {string} args.yes - Text of the confirmation button. Default is `OK`.
 * @param {string} args.no - Text of the cancellation button. Default is `Cancel`.
 * @param {function} args.onYes - Callback for confirmation.
 * @param {function} args.onNo - Callback for cancel.
 */
Modal.confirm = function ( args, onYes, onNo ) {
  if( typeof onYes === 'function' ) {
    // This is the old calling way, with multiple arguments.
    args = {
      content: args,
      onYes: onYes,
      onNo: onNo
    };
  }
  if( typeof args.title === 'undefined' ) args.title = _('confirm');
  if( typeof args.yes === 'undefined' ) args.yes = _('ok');
  if( typeof args.no === 'undefined' ) args.no = _('cancel');
  if( typeof args.onYes === 'undefined' ) args.onYes = function() {};
  if( typeof args.onNo === 'undefined' ) args.onNo = function() {};

  onYes = args.onYes;
  onNo = args.onNo;

  var btnYes = new Button({ text: args.yes, flat: true });
  var btnNo = new Button({ text: args.no, flat: true });
  if ( Array.isArray(args.content) ) {
    // Arrays must be wrapped in a DIV.
    args.content = $.div(args.content);
  }
  if ( typeof args.content === 'string' && args.content.substr( 0, 6 ) == '<html>' ) {
    // This is HTML code.
    var html = args.content.substr( 6 );
    args.content = $.div();
    args.content.innerHTML = html;
  }
  var modal = new Modal( {
    header: args.title,
    footer: [btnNo, btnYes],
    content: args.content
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
  var btnOK = new Button( { text: _('close'), flat: true } );
  if ( typeof content === 'string' && content.substr( 0, 6 ) == '<html>' ) {
    // This is HTML code.
    var html = content.substr( 6 );
    content = $.div();
    content.innerHTML = html;
  }
  var modal = new Modal( {
    footer: btnOK,
    content: content
  } );
  modal.attach();

  btnOK.on( function () {
    modal.detach();
    if ( typeof onOK === 'function' ) onOK();
  } );
  return modal;
};


/**
 * Help the user to understand that the `body` can or cannot scroll to
 * the top or to the bottom, or both.
 * If the user can scroll up, a thin top inset shadow is displayed.
 * If the user can scroll down, a thin bottom inset shadow is displayed.
 */
function onScroll( body, evt ) {
  if( body.scrollTop > 0 ) {
    $.addClass( body, "top" );
  } else {
    $.removeClass( body, "top" );
  }

  if( body.scrollHeight - body.scrollTop > body.clientHeight ) {
    $.addClass( body, "bottom" );
  } else {
    $.removeClass( body, "bottom" );
  }
}


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