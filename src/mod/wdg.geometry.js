"use strict";

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");

/**
@class Geometry


 
@param {boolean} opts.visible - Set the visiblity of the component.

@example
var Geometry = require("Geometry");
var instance = new Geometry({ visible: false });
*/
var Geometry = function(opts) {
    var elem = $.elem( this, 'div', 'wdg-geometry' );
    
    DB.propRemoveClass( this, 'visible', 'hide' );
    DB.propString( this, 'value', "Axis(0,0)P(A)H()")

    opts = DB.extend({
         visible: true
    }, opts, this);
};


module.exports = Geometry;