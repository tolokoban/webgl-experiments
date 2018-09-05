/** @module prg.image2d */require( 'prg.image2d', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "// Largeur et hauteur en pixels du canvas.\r\nuniform float uniWidth;\r\nuniform float uniHeight;\r\n\r\nattribute vec3 attPosition;\r\nattribute vec2 attUV;\r\n\r\n// Passer au fragment shader les coordonnées UV pour la texture.\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  varUV = attUV;\r\n  \r\n  gl_Position = vec4( attPosition, 1.0 );\r\n\r\n  // Conversion des coordonnées pixels dans l'espace OpenGL.\r\n  gl_Position.x = 2.0 * gl_Position.x / uniWidth - 1.0;\r\n  gl_Position.y = 1.0 - 2.0 * gl_Position.y / uniHeight;\r\n}\r\n",
  "frag": "precision lowp float;\r\n\r\nvarying vec2 varUV;\r\n\r\n// Textures.\r\nuniform sampler2D tex;\r\n\r\nvoid main() { \r\n  gl_FragColor = texture2D(tex, varUV);\r\n  if( gl_FragColor.a <= 1.0 / 255.0 ) discard;\r\n}\r\n"};
  "use strict";

var Program = require("webgl.program");

var Image2d = function( gl ) {
  Program.call( this, gl, GLOBAL );
};

// Inheritance from Widget
Image2d.prototype = Object.create(Program.prototype);
Image2d.prototype.constructor = Image2d;


module.exports = Image2d;


  
module.exports._ = _;
/**
 * @module prg.image2d
 * @see module:$
 * @see module:webgl.program

 */
});