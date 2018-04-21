/** @module wdg.frustrum2 */require( 'wdg.frustrum2', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "uniform mat4 uniProjection;\n\nattribute vec3 attPoint;\nattribute vec3 attColor;\n\nvarying vec4 varColor;\n\nvoid main() {\n  varColor = vec4( attColor, 1.0 );\n  gl_Position = uniProjection * vec4( attPoint, 1.0 );  \n}\n",
  "frag": "precision mediump float;\n\nvarying vec4 varColor;\n\nvoid main() {  \n  gl_FragColor = varColor;\n}\n"};
  // Code behind.
"use strict";

var CODE_BEHIND = {
  init: init,
  draw: draw
};


var Program = require("webgl.program");


function init() {
  this._3d = createContext3D( this.$elements.projection.$ );
  this._2d = createContext2D( this.$elements.flat.$ );

  this._prg = new Program( this._3d, GLOBAL );
  var vertices = createBufferForAllOurCubes();
  console.info("[wdg.frustrum2] vertices=", vertices);
  this._bpe = vertices.BYTES_PER_ELEMENT;
  this._count = Math.floor( vertices.length / 6 );
  this._buffer = this._3d.createBuffer();
  this._3d.bindBuffer( this._3d.ARRAY_BUFFER, this._buffer );
  this._3d.bufferData( this._3d.ARRAY_BUFFER, vertices, this._3d.STATIC_DRAW );
  draw.call( this );
}


/**
 * Afficher
 */
function draw() {
  if( !this._3d ) return;
  
  var gl = this._3d;
  var prg = this._prg;

  prg.use();
  var proj = createProjectionMatrix( this._3d.canvas, this.argN, this.argF, this.argH );
  console.info("[wdg.frustrum2] proj=", proj);
  prg.$uniProjection = proj;

  gl.enable( gl.DEPTH_TEST );
  gl.clearColor( .1, .1, .1, 1.0 );
  gl.clearDepth( 0.0 );
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  gl.depthFunc( gl.GREATER );

  var bpe = this._bpe;
  var block = 6 * bpe;

  var attPoint = gl.getAttribLocation( prg.program, "attPoint" );
  gl.enableVertexAttribArray( attPoint );
  gl.vertexAttribPointer( attPoint, 3, gl.FLOAT, false, block, 0 * bpe );

  var attColor = gl.getAttribLocation( prg.program, "attColor" );
  gl.enableVertexAttribArray( attColor );
  gl.vertexAttribPointer( attColor, 3, gl.FLOAT, false, block, 3 * bpe );

  this._3d.bindBuffer( this._3d.ARRAY_BUFFER, this._buffer );
  gl.drawArrays( gl.TRIANGLES, 0, this._count );
}

//#(createProjectionMatrix)
function createProjectionMatrix( canvas, n, f, h ) {
  try {
    var W = canvas.width;
    var H = canvas.height;
    if( W > H ) {
      return new Float32Array([
        h/n, 0,           0,           0,
        0,   h*W / (n*H), 0,           0,
        0,   0,           (f-n)/(f+n), -1,
        0,   0,           2*f*n/(f+n), 0
      ]);
    } else {
      return new Float32Array([
        h*H/(n*W), 0,   0,           0,
        0,         h/n, 0,           0,
        0,         0,   (f-n)/(f+n), -1,
        0,         0,   2*f*n/(f+n), 0
      ]);
    }
  }
  catch( ex ) {
    // Si les arguments  n, f et h produisent  une incohérence (par exemple, n=0  donne une division
    // par zéro), alors on retourne une matrice nulle et rien ne sera affiché.
    return new Float32Array([
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ]);
  }
}
//#(createProjectionMatrix)

function createContext3D( canvas ) {
  return canvas.getContext( "webgl", { preserveDrawingBuffer: true } );
}


function createContext2D( canvas ) {
  return canvas.getContext( "2d" );
}


function createBufferForAllOurCubes() {
  var x, y, z;
  // Rayon du cube (moitié d'un côté).
  var r = .5;
  var arr = [];
  var shadow;
  for( z = -3; z > -10; z -= 2 ) {
    shadow = 1 + (z + 2.5) / 15;
    for( y = -5; y < 6 ; y += 2 ) {
      for( x = -5; x < 6 ; x += 2 ) {
        // Face.
        addQuad(
          arr,
          x - r, y - r, z + r,
          x + r, y - r, z + r,
          x + r, y + r, z + r,
          x - r, y + r, z + r,
          shadow, 0.4667 * shadow, 0
        );
        // Droite.
        addQuad(
          arr,
          x + r, y - r, z - r,
          x + r, y + r, z - r,
          x + r, y + r, z + r,
          x + r, y - r, z + r,
          0.1333 * shadow, 0.5333 * shadow, shadow
        );
        // Gauche.
        addQuad(
          arr,
          x - r, y - r, z - r,
          x - r, y + r, z - r,
          x - r, y + r, z + r,
          x - r, y - r, z + r,
          0.1333 * shadow, 0.5333 * shadow, shadow
        );
        // Bas.
        addQuad(
          arr,
          x - r, y - r, z - r,
          x + r, y - r, z - r,
          x + r, y - r, z + r,
          x - r, y - r, z + r,
          0.0667 * shadow, 0.2667 * shadow, 0.5 * shadow
        );
        // Haut.
        addQuad(
          arr,
          x - r, y + r, z - r,
          x + r, y + r, z - r,
          x + r, y + r, z + r,
          x - r, y + r, z + r,
          0.5667 * shadow, 0.7667 * shadow, shadow
        );
      }
    }
  }
  return new Float32Array( arr );
}


function addQuad( arr, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, r, g, b ) {
  arr.push(
    x1, y1, z1, r, g, b,
    x2, y2, z2, r, g, b,
    x3, y3, z3, r, g, b,
    x1, y1, z1, r, g, b,
    x3, y3, z3, r, g, b,
    x4, y4, z4, r, g, b
  );
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
    var TfwViewTextbox = require('tfw.view.textbox');
    //-------------------------------------------------------
    // Check if needed functions are defined in code behind.
    View.ensureCodeBehind( CODE_BEHIND, "draw", "init" );
    //-------------------
    // Global functions.
    function defVal(args, attName, attValue) { return args[attName] === undefined ? attValue : args[attName]; };
    //-------------------
    // Global variables.
    var conv_float = Converters.get('float');
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
        pm.create("argN", { cast: conv_float(0) });
        pm.create("argF", { cast: conv_float(0) });
        pm.create("argH", { cast: conv_float(0) });
        //------------------
        // Create elements.
        var e_ = new Tag('DIV', ["class"]);
        var e_projection = new Tag('CANVAS', ["width","height"]);
        this.$elements.projection = e_projection;
        var e_1 = new Tag('DIV');
        var e_10 = new TfwViewTextbox({ label: "N=" });
        var e_11 = new TfwViewTextbox({ label: "F=" });
        var e_12 = new TfwViewTextbox({ label: "H=" });
        $.add( e_1, e_10, e_11, e_12 );
        var e_flat = new Tag('CANVAS', ["width","height"]);
        this.$elements.flat = e_flat;
        $.add( e_, e_projection, e_1, e_flat );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //-------
        // Links
        new Link({
          A:{obj: that, name: 'argN'},
          B:{obj: e_10, name: 'value'}
        });
        new Link({
          A:{obj: that, name: 'argF'},
          B:{obj: e_11, name: 'value'}
        });
        new Link({
          A:{obj: that, name: 'argH'},
          B:{obj: e_12, name: 'value'}
        });
        //-----------------------
        // On attribute changed.
        pm.on( "argN", function(v) {
          try {
            CODE_BEHIND.draw.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "draw" of module "mod/wdg.frustrum2.js" for attribute "argN"!  ');
            console.error( ex );
          }} );
        pm.on( "argF", function(v) {
          try {
            CODE_BEHIND.draw.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "draw" of module "mod/wdg.frustrum2.js" for attribute "argF"!  ');
            console.error( ex );
          }} );
        pm.on( "argH", function(v) {
          try {
            CODE_BEHIND.draw.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "draw" of module "mod/wdg.frustrum2.js" for attribute "argH"!  ');
            console.error( ex );
          }} );
        //----------------------
        // Initialize elements.
        e_.class = "wdg-frustrum2";
        e_projection.width = 450;
        e_projection.height = 300;
        e_flat.width = 300;
        e_flat.height = 200;
        //------------------------
        // Initialize attributes.
        this.argN = defVal(args, "argN", 2);
        this.argF = defVal(args, "argF", 6);
        this.argH = defVal(args, "argH", 1);
        // Initialization.
        CODE_BEHIND.init.call( this );
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/wdg.frustrum2.js', ex);
        throw Error('Instantiation error in XJS of "mod/wdg.frustrum2.js":\n' + ex)
      }
    };
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/wdg.frustrum2.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module wdg.frustrum2
 * @see module:$
 * @see module:webgl.program
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.binding.link
 * @see module:tfw.view
 * @see module:tfw.binding.converters
 * @see module:tfw.view.textbox

 */
});