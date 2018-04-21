/** @module prg.image2d */require( 'prg.image2d', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "// Largeur et hauteur en pixels du canvas.\nuniform float uniWidth;\nuniform float uniHeight;\n\nattribute vec3 attPosition;\nattribute vec2 attUV;\n\n// Passer au fragment shader les coordonnées UV pour la texture.\nvarying vec2 varUV;\n\nvoid main() {\n  varUV = attUV;\n  \n  gl_Position = vec4( attPosition, 1.0 );\n\n  // Conversion des coordonnées pixels dans l'espace OpenGL.\n  gl_Position.x = 2.0 * gl_Position.x / uniWidth - 1.0;\n  gl_Position.y = 1.0 - 2.0 * gl_Position.y / uniHeight;\n}\n",
  "frag": "precision lowp float;\n\nvarying vec2 varUV;\n\n// Textures.\nuniform sampler2D tex;\n\nvoid main() { \n  gl_FragColor = texture2D(tex, varUV);\n  if( gl_FragColor.a <= 1.0 / 255.0 ) discard;\n}\n"};
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