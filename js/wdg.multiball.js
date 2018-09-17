/** @module wdg.multiball */require( 'wdg.multiball', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "// Perspective\r\nuniform mat4 uniProjection;\r\n// Rotation de la multiball.\r\nuniform mat4 uniRotation;\r\n// Largeur de l'écran en pixels.\r\nuniform float uniScreenWidth;\r\n\r\n// Rayon de la sphère\r\nuniform float uniRadius;\r\n// Distance de la sphère au centre.\r\n// (rayon de son orbite)\r\nuniform float uniDistance;\r\n// Facteur de diminution des rayons des sphères\r\n// sur les orbites successives\r\nuniform float uniAlpha;\r\n\r\n// Coordonnées du centre de la sphère\r\n// comme si elle était sur l'orbite 0.\r\nattribute vec3 attPoint;\r\n// Numéro d'orbite (de 0 à 9).\r\nattribute float attLevel;\r\n\r\nvoid main() {\r\n  // On va reculer un peu la multiball pour qu'on la voit bien\r\n  vec4 translation = vec4(0, 0, -2.5, 0);\r\n\r\n  // Application de la formule pour calculer le rayon de l'orbite courante.\r\n  float alpha1 = pow( uniAlpha, attLevel );\r\n  float alpha2 = alpha1 * uniAlpha;\r\n  float dist = uniDistance - uniRadius * (1.0 + alpha1)\r\n    + 2.0 * uniRadius * (alpha2 - 1.0) / (uniAlpha - 1.0);\r\n\r\n  // Rotation, translation et projection en perspective.\r\n  vec4 vertex = uniRotation * vec4( attPoint * dist, 1 );\r\n  vertex +=  translation;\r\n  gl_Position = uniProjection * vertex;\r\n\r\n  // Détermination de la taille de la sphère en pixels.\r\n  vec4 point = vec4( uniRadius * alpha1, 0, vertex.z, 1 );\r\n  vec4 size = uniProjection * point;  \r\n  gl_PointSize = uniScreenWidth * size.x / size.w;\r\n\r\n}\r\n",
  "frag": "precision mediump float;\r\n// Couleur principale d'une sphère.\r\nconst vec3 COLOR = vec3(1, .5, 0);\r\n\r\nvoid main() {\r\n  float x = 2.0 * (gl_PointCoord.x - .5);\r\n  float y = 2.0 * (gl_PointCoord.y - .5);\r\n  // Distance au carré.\r\n  float r = x * x + y * y;\r\n  // Au delà du rayon d'un cercle, on n'affiche rien.\r\n  if( r > 1.0 ) discard;\r\n  // Ajout d'un liseré noir dont l'épaisseur est\r\n  // un dixième du rayon.\r\n  if( r > .9 * .9 ) {\r\n    gl_FragColor = vec4( 0, 0, 0, 1 );\r\n    return;\r\n  }\r\n  // Assombrir quand le rayon devient grand.\r\n  vec3 color = COLOR * (1.0 - r * .4);\r\n  gl_FragColor = vec4( color, 1.0 );\r\n}\r\n",
  "vertExtra": "uniform mat4 uniProjection;\r\nuniform mat4 uniRotation;\r\nuniform float uniScreenWidth;\r\n\r\n// Rayon de la sphère\r\nuniform float uniRadius;\r\n// Distance de la sphère au centre.\r\nuniform float uniDistance;\r\n// Facteur de diminution des rayons des sphères successives.\r\nuniform float uniAlpha;\r\n\r\nattribute vec3 attPoint;\r\nattribute float attLevel;\r\n\r\nvarying vec3 varAxis;\r\n\r\n\r\nvoid main() {\r\n  vec4 axis = uniRotation * vec4( attPoint, 1 );\r\n  varAxis = normalize( axis.xyz );\r\n  \r\n  vec4 translation = vec4(0, 0, -2.5, 0);\r\n  \r\n  float alpha1 = pow( uniAlpha, attLevel );\r\n  float alpha2 = alpha1 * uniAlpha;\r\n  float dist = uniDistance - uniRadius * (1.0 + alpha1) + 2.0 * uniRadius * (alpha2 - 1.0) / (uniAlpha - 1.0);\r\n  \r\n  vec4 vertex = uniRotation * vec4( attPoint * dist, 1 );  \r\n  vertex +=  translation;\r\n  gl_Position = uniProjection * vertex;\r\n\r\n  vec4 point = vec4( uniRadius * alpha1, 0, vertex.z, 1 );\r\n  vec4 size = uniProjection * point;\r\n  \r\n  gl_PointSize = uniScreenWidth * size.x / size.w;\r\n}\r\n",
  "fragExtra": "precision mediump float;\r\n\r\nconst vec3 BLACK = vec3(0, 0, 0);\r\nconst vec3 WHITE = vec3(1, 1, 1);\r\nconst vec3 ORANGE = vec3(1, .5, 0);\r\nconst vec3 BLUE = vec3(0, .4, .866666667);\r\n\r\nconst vec3 LIGHT = normalize(vec3(-1, 2, 4));\r\n\r\nvarying vec3 varAxis;\r\n\r\n\r\n// Si on fait face à un point de coordonnées (x,y) dans un cercle 2D.\r\n// On peut imaginer qu'il s'agit en fait d'un point (x,y,zz) dans une demi-sphère.\r\n// Cette fonction retourne les coordonnées (x,y,zz) à partir du point (x,y).\r\nvec3 getSphericalVector( float x, float y ) {\r\n  float phi = asin( y );\r\n  float radius = cos( phi );\r\n  float theta = 0.0;\r\n  if( x != 0.0 ) theta = asin( x / radius );\r\n\r\n  float zz = radius * cos( theta );\r\n  return vec3(x, -y, zz);\r\n}\r\n\r\n\r\nvoid main() {\r\n  float x = 2.0 * (gl_PointCoord.x - .5);\r\n  float y = 2.0 * (gl_PointCoord.y - .5);\r\n  float r = x * x + y * y;\r\n  if( r > 1.0 ) discard;\r\n\r\n  vec3 color = BLUE;\r\n  vec3 arrow = getSphericalVector( x, y );\r\n  if( mod(1.0 + dot( arrow, varAxis ), .35) > 0.1 )\r\n    color = ORANGE;\r\n\r\n  if( r > .85 ) {\r\n    // Liseré noir extérieur.\r\n    color = BLACK;\r\n  }\r\n\r\n  float light = dot( arrow, LIGHT );\r\n  if( light < 0.43 ) color *= .5;\r\n  else if( light > 0.95 ) {    \r\n    color = mix( color, WHITE, .75 );\r\n  }\r\n  else if( light > 0.75 ) {    \r\n    color = mix( color, WHITE, .5 );\r\n  }\r\n  \r\n  gl_FragColor = vec4( color, 1.0 );\r\n}\r\n"};
  // Code behind.
"use strict";

var CODE_BEHIND = {
  init: init
};

var M4 = require("webgl.math").m4;
var Resize = require("webgl.resize");
var Program = require("webgl.program");


function init() {
  var that = this;

  var gl = createContext3D( this.$elements.canvas.$ );
  var prgBasic = new Program( gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  });
  var prgExtra = new Program( gl, {
    vert: GLOBAL.vertExtra,
    frag: GLOBAL.fragExtra
  });
  var vertices = createVertices();
  var buffData = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buffData );
  gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

  gl.enable( gl.DEPTH_TEST );
  gl.clearColor( 1, 1, 1, 1 );
  gl.clearDepth( 1 );

  var projection = M4.identity();
  var rotation = M4.identity();

  var draw = function( time ) {
    requestAnimationFrame( draw );

    var w = gl.canvas.clientWidth;
    var h = gl.canvas.clientHeight;
    Resize( gl );

    M4.perspective( Math.PI * .35, w/h, .1, 10, projection );
    M4.rotationXY(
      3.27 * Math.cos( time * 0.000458),
      5.78 * Math.sin( time * 0.000147),
      rotation );

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var prg = that.extra ? prgExtra : prgBasic;

    prg.use();
    prg.$uniProjection = projection;
    prg.$uniRotation = rotation;
    prg.$uniScreenWidth = w * window.devicePixelRatio;
    prg.$uniDistance = 0.5;
    prg.$uniRadius = 0.17;
    prg.$uniAlpha = that.alpha;

    prg.bindAttribs( buffData, "attPoint", "attLevel" );
    var count = that.dense ? vertices.length / 4 : 20 * 10;
    gl.drawArrays( gl.POINTS, 0, count );
  };

  requestAnimationFrame( draw );
}

function createContext3D( canvas ) {
  return canvas.getContext( "webgl", { preserveDrawingBuffer: true } );
}

function createIcosahedronVertices( radius ) {
  if( typeof radius === 'undefined' ) radius = 1;
  //#(vertices)
  var vertices = [0, 0, radius];
  var n, ang;
  for( n=0; n<5; n++ ) {
    ang = Math.PI * n * 0.4;
    vertices.push(
      radius * Math.cos( ang ),
      radius * Math.sin( ang ),
      radius * .5
    );
  }
  for( n=0; n<5; n++ ) {
    ang = Math.PI * ( n * 0.4 + 0.2 );
    vertices.push(
      radius * Math.cos( ang ),
      radius * Math.sin( ang ),
      radius * -.5
    );
  }
  vertices.push(0, 0, -radius);
  //#(vertices)
  return new Float32Array( vertices );
}

function createIcosahedronIndexes() {
  return new Uint16Array([
    0,1,2,   0,2,3,  0,3,4,  0,4,5,  0,5,1,
    1,6,2,   2,7,3,  3,8,4,  4,9,5,  5,10,1,
    11,10,9, 11,9,8, 11,8,7, 11,7,6, 11,6,10,
    10,6,1,  6,7,2,  7,8,3,  8,9,4,  9,10,5
  ]);
}

function createVertices() {
  var vert = createIcosahedronVertices();
  var elem = createIcosahedronIndexes();
  var vertices = [];
  var idx;
  var x, y, z;
  var r;
  for( idx=0; idx<20 ; idx++ ) {
    var x0 = vert[elem[3 * idx + 0] * 3 + 0];
    var y0 = vert[elem[3 * idx + 0] * 3 + 1];
    var z0 = vert[elem[3 * idx + 0] * 3 + 2];
    var x1 = vert[elem[3 * idx + 1] * 3 + 0];
    var y1 = vert[elem[3 * idx + 1] * 3 + 1];
    var z1 = vert[elem[3 * idx + 1] * 3 + 2];
    var x2 = vert[elem[3 * idx + 2] * 3 + 0];
    var y2 = vert[elem[3 * idx + 2] * 3 + 1];
    var z2 = vert[elem[3 * idx + 2] * 3 + 2];
    x = x0 + x1 + x2;
    y = y0 + y1 + y2;
    z = z0 + z1 + z2;
    r = Math.sqrt( x*x + y*y + z*z );

    vertices.push( x / r, y / r, z / r, 0 );
  }

  var loop;
  for( loop = 1; loop < 10; loop++ ) {
    for( idx=0; idx<20 ; idx++ ) {
      x = vertices[idx * 4 + 0];
      y = vertices[idx * 4 + 1];
      z = vertices[idx * 4 + 2];
      vertices.push( x, y, z, loop );
    }
  }

  // Combler les trous.
  for( idx = 0; idx < 12; idx++ ) {
    x = vert[idx * 3 + 0];
    y = vert[idx * 3 + 1];
    z = vert[idx * 3 + 2];
    r = Math.sqrt( x*x + y*y + z*z );
    for( loop = 0; loop < 10; loop++ ) {
      vertices.push( x / r, y / r, z / r, loop );
    }
  }


  console.info("[wdg.multiball-1] vertices=", vertices);
  return new Float32Array( vertices );
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
    var TfwViewCheckbox = require('tfw.view.checkbox');
    //-------------------------------------------------------
    // Check if needed functions are defined in code behind.
    View.ensureCodeBehind( CODE_BEHIND, "init" );
    //-------------------
    // Global functions.
    function defVal(args, attName, attValue) { return args[attName] === undefined ? attValue : args[attName]; };
    function addClassIfTrue(element, className, value) {
    if( value ) $.addClass(element, className);
    else $.removeClass(element, className); };;
    //-------------------
    // Global variables.
    var conv_boolean = Converters.get('boolean');
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
        pm.create("fullscreen", { cast: conv_boolean });
        pm.create("extra", { cast: conv_boolean });
        pm.create("dense", { cast: conv_boolean });
        pm.create("alpha", { cast: conv_float(0) });
        //------------------
        // Create elements.
        var e_ = new Tag('DIV', ["class"]);
        var e_canvas = new Tag('CANVAS');
        this.$elements.canvas = e_canvas;
        var e_1 = new TfwViewTextbox({
          label: "Coeff",
          width: "48px"
        });
        var e_2 = new Tag('DIV', ["class"]);
        var e_3 = new TfwViewCheckbox({
          content: "Plein écran",
          wide: false
        });
        $.add( e_2, e_3 );
        var e_4 = new Tag('DIV', ["class"]);
        var e_5 = new TfwViewCheckbox({
          content: "Dense",
          wide: false
        });
        $.add( e_4, e_5 );
        var e_6 = new Tag('DIV', ["class"]);
        var e_7 = new TfwViewCheckbox({
          content: "Rayures",
          wide: false
        });
        $.add( e_6, e_7 );
        $.add( e_, e_canvas, e_1, e_2, e_4, e_6 );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //-------
        // Links
        new Link({
          A:{obj: that,
              name: 'fullscreen'},
          B:{action: function(v) {
          addClassIfTrue( e_, "fullscreen", v );}},
          name:"fullscreen > undefined"
        });
        new Link({
          A:{obj: that,
              name: 'alpha'},
          B:{obj: e_1,
              name: 'value'},
          name:"alpha > e_1/value"
        });
        new Link({
          A:{obj: that,
              name: 'fullscreen'},
          B:{obj: e_3,
              name: 'value'},
          name:"fullscreen > e_3/value"
        });
        new Link({
          A:{obj: that,
              name: 'dense'},
          B:{obj: e_5,
              name: 'value'},
          name:"dense > e_5/value"
        });
        new Link({
          A:{obj: that,
              name: 'extra'},
          B:{obj: e_7,
              name: 'value'},
          name:"extra > e_7/value"
        });
        //----------------------
        // Initialize elements.
        e_.class = "thm-ele8 wdg-multiball";
        e_2.class = "bottom";
        e_4.class = "left";
        e_6.class = "top";
        //------------------------
        // Initialize attributes.
        this.fullscreen = defVal(args, "fullscreen", false);
        this.extra = defVal(args, "extra", false);
        this.dense = defVal(args, "dense", false);
        this.alpha = defVal(args, "alpha", 0.5);
        // Initialization.
        CODE_BEHIND.init.call( this );
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/wdg.multiball.js', ex);
        throw Error('Instantiation error in XJS of "mod/wdg.multiball.js":\n' + ex)
      }
    };
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/wdg.multiball.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module wdg.multiball
 * @see module:$
 * @see module:webgl.math
 * @see module:webgl.resize
 * @see module:webgl.program
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.binding.link
 * @see module:tfw.view
 * @see module:tfw.binding.converters
 * @see module:tfw.view.textbox
 * @see module:tfw.view.checkbox

 */
});