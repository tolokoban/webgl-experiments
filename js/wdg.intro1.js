/** @module wdg.intro1 */require( 'wdg.intro1', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

module.exports = require("draw")(function() {
  this
    .axes()
    .dot(1, 0)
    .dot(-1, 0)
    .dot(0, 1)
    .dot(0, -1)
    .dot(0, 0, "(0,0)")
    .dot(-0.7, 0.2, "(-0.7,0.2)")
    .setColor("#06F")
    .txtB("x=+1", 1, 0)
    .txtT("x=-1", -1, 0)
    .txtB("y=+1", 0, 1)
    .txtT("y=-1", 0, -1);
});


  
module.exports._ = _;
/**
 * @module wdg.intro1
 * @see module:$
 * @see module:draw

 */
});