"use strict";

var Program = require("webgl.program");

var Image2d = function( gl ) {
  Program.call( this, gl, GLOBAL );
};

// Inheritance from Widget
Image2d.prototype = Object.create(Program.prototype);
Image2d.prototype.constructor = Image2d;


module.exports = Image2d;
