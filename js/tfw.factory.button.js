/** @module tfw.factory.button */require( 'tfw.factory.button', function(require, module, exports) { var _=function(){var D={"en":{"accept":"Accept","cancel":"Cancel","close":"Close","delete":"Delete","gotit":"Gotit","no":"No","ok":"Ok","refuse":"Refuse","save":"Save","skip":"Skip","yes":"Yes"},"fr":{"accept":"Accepter","cancel":"Annuler","close":"Fermer","delete":"Supprimer","gotit":"J'ai compris","no":"Non","ok":"Ok","refuse":"Refuser","save":"Sauvegarder","skip":"Sauter","yes":"Oui"}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    /************************************************************
 Button factory to create most commonly used buttons.
 ************************************************************/
"use strict";

exports.accept = makeButton.bind( null, "accept" );
exports.cancel = makeButton.bind( null, "cancel" );
exports.close = makeButton.bind( null, "close" );
exports.delete = makeButton.bind( null, "delete" );
exports.gotit = makeButton.bind( null, "gotit" );
exports.no = makeButton.bind( null, "no" );
exports.ok = makeButton.bind( null, "ok" );
exports.refuse = makeButton.bind( null, "refuse" );
exports.save = makeButton.bind( null, { text: _("save"), type: "primary", flat: false, icon: "import" } );
exports.skip = makeButton.bind( null, "skip" );
exports.yes = makeButton.bind( null, "yes" );


var Button = require("tfw.view.button");


function makeButton( name, argsBase, argsOverride ) {
  var base = { wide: false, type: "primary", flat: true };
  if( typeof name === 'string' ) {
    base.text = _(name);
  } else {
    base = extend( base, name );
  }
  return new Button(extend(base, argsBase, argsOverride));
}


function extend() {
  var result = {};
  Array.prototype.slice.call(arguments).forEach(function(overrider) {
    if( !overrider ) return;
    var key, val;
    for( key in overrider ) {
      val = overrider[key];
      result[key] = val;
    }
  });
  return result;
}


  
module.exports._ = _;
/**
 * @module tfw.factory.button
 * @see module:$
 * @see module:tfw.view.button

 */
});