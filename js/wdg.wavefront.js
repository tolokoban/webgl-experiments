/** @module wdg.wavefront */require( 'wdg.wavefront', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "// Perspective\r\nuniform mat4 uniProjection;\r\n// Rotation de la multiball.\r\nuniform mat4 uniRotation;\r\n// Translation.\r\nuniform vec4 uniTranslation;\r\n// Largeur de l'écran en pixels.\r\nuniform float uniScreenWidth;\r\n\r\n// Coordonnées du centre du modèle.\r\nattribute vec3 attPoint;\r\n// Vecteur normal en ce point.\r\nattribute vec3 attNormal;\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  // Rotation, translation et projection en perspective.\r\n  vec4 vertex = uniRotation * vec4( attPoint, 1 ) + uniTranslation;\r\n  gl_Position = uniProjection * vertex;\r\n\r\n  vec4 normal = uniRotation * vec4( attNormal, 1 );\r\n  varNormal = normal.xyz;\r\n}\r\n",
  "frag": "precision mediump float;\r\n// Couleur principale du modèle.\r\nconst vec3 COLOR = vec3(1, .5, 0);\r\nconst vec3 WHITE = vec3(1, 1, 1);\r\nconst vec3 BLACK = vec3(0, 0, 0);\r\n\r\n// Direction de la lumière.\r\nconst vec3 LIGHT = normalize( vec3(10, -5, -2) );\r\n\r\nconst float LEVELS = 3.0;\r\n\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  vec3 color = COLOR;\r\n\r\n  vec3 normal = normalize( varNormal );\r\n  vec3 reflection = reflect( LIGHT, normal );\r\n  float r = 1.0 + floor( 0.5 * LEVELS * (reflection.z + 1.0) );\r\n  float x = gl_FragCoord.x;\r\n  float y = gl_FragCoord.y;\r\n  if( r < LEVELS ) {\r\n    if( mod( x - y, r * 4.0 ) < 1.0 ) color *= .5;      \r\n  }\r\n  \r\n  gl_FragColor = vec4( color, 1.0 );\r\n}\r\n",
  "vert2": "// Perspective\r\nuniform mat4 uniProjection;\r\n// Rotation de la multiball.\r\nuniform mat4 uniRotation;\r\n// Translation.\r\nuniform vec4 uniTranslation;\r\n// Largeur de l'écran en pixels.\r\nuniform float uniScreenWidth;\r\n// Border thickness.\r\nuniform float uniBorderThickness;\r\n\r\n// Coordonnées du centre du modèle.\r\nattribute vec3 attPoint;\r\n// Vecteur normal en ce point.\r\nattribute vec3 attNormal;\r\n\r\n\r\nvoid main() {\r\n  // Rotation, translation et projection en perspective.\r\n  vec4 vertex = uniRotation * vec4( attPoint + normalize(attNormal) * uniBorderThickness, 1 ) + uniTranslation;\r\n  gl_Position = uniProjection * vertex;\r\n}\r\n",
  "frag2": "precision mediump float;\r\n\r\nvoid main() {\r\n  gl_FragColor = vec4( 0, 0, 0, 1 );\r\n}\r\n"};
  // Code behind.
"use strict";

var CODE_BEHIND = {
  init: init,
  onFileLoaded: onFileLoaded
};


var $ = require("dom");
var M4 = require("webgl.math").m4;
var Resize = require("webgl.resize");
var Program = require("webgl.program");
var Fillpoly = require("webgl.fillpoly");


function init() {
  var that = this;

  var canvas = this.$elements.canvas.$;
  var gl = canvas.getContext( "webgl", { preserveDrawingBuffer: false } );
  this._gl = gl;

  var prg = new Program( gl, {
    vert: GLOBAL.vert,
    frag: GLOBAL.frag
  });
  var prg2 = new Program( gl, {
    vert: GLOBAL.vert2,
    frag: GLOBAL.frag2
  });

  this._buffVert = gl.createBuffer();
  this._buffElem = gl.createBuffer();

  gl.enable( gl.CULL_FACE );
  gl.enable( gl.DEPTH_TEST );
  gl.clearColor( 0, .5, 0.866666666667, 1 );
  gl.clearDepth( 1 );

  var projection = M4.identity();
  var rotation = M4.identity();
  var translation = new Float32Array([ 0, 0, -3, 0 ]);
  that._translation = translation;
  
  var angX = 0;
  var angY = 0;
  var rotX = 0;
  var rotY = 0;
  var touching = false;
  var time0 = 0;
  var time = 0;
  
  $.on( canvas, {
    down: function() {
      touching = true;
      angX += rotX;
      angY += rotY;
      rotX = 0;
      rotY = 0;
    },
    up: function() {
      touching = false;
      angX += rotX;
      angY += rotY;
      rotX = 0;
      rotY = 0;
      time0 = time;
    },
    drag: function( evt ) {
      console.info("[wdg.wavefront] evt=", evt);
      rotY = 2 * Math.PI * evt.dx / canvas.clientWidth;
      rotX = 2 * Math.PI * evt.dy / canvas.clientHeight;
    }
  });

  var draw = function( t ) {    
    requestAnimationFrame( draw );

    var translation = that._translation;
    time = t;
    var w = gl.canvas.clientWidth;
    var h = gl.canvas.clientHeight;
    Resize( gl );

    M4.perspective( Math.PI * .35, w/h, .1, 10, projection );
    if( !touching ) {
      rotX = 1.97 * Math.sin( (time - time0) * 0.0000347 );
      rotY = 5.78 * Math.sin( (time - time0) * 0.0000758 );
    }
    M4.rotationXY( angX + rotX, angY + rotY, rotation );

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    gl.bindBuffer( gl.ARRAY_BUFFER, that._buffVert );
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, that._buffElem );

    gl.cullFace( gl.BACK );
    prg.use();
    prg.$uniProjection = projection;
    prg.$uniRotation = rotation;
    prg.$uniTranslation = translation;

    prg.bindAttribs( that._buffVert, "attPoint", "attNormal" );
    gl.drawElements( gl.TRIANGLES, that.elemCount, gl.UNSIGNED_SHORT, 0 );

    if( that.borderVisible ) {
      gl.cullFace( gl.FRONT );
      prg2.use();
      prg2.$uniProjection = projection;
      prg2.$uniRotation = rotation;
      prg2.$uniTranslation = translation;
      prg2.$uniBorderThickness = that.borderThickness * 0.01;

      prg2.bindAttribs( that._buffVert, "attPoint", "attNormal" );
      gl.drawElements( gl.TRIANGLES, that.elemCount, gl.UNSIGNED_SHORT, 0 );
    }
  };

  requestAnimationFrame( draw );

  if( typeof fetch === 'function' ) {
    fetch( "./css/wdg.wavefront/wolf.obj" ).then(function( response ) {
      if( response.ok ) return response.text();
    }).then( parse.bind( that ) );
  }
}


function onFileLoaded( file ) {
  var that = this;

  var reader = new FileReader();
  reader.onload = function( event ) {
    var result = reader.result;
    parse.call( that, result );
  };
  reader.readAsText(file);
}


function parse( content ) {
  var model = parseResult.call( this, content );
  console.info("[wdg.wavefront] model=", model);
  this.vertCount = model.vert.length / 6;
  this.elemCount = model.elem.length;
  this._translation.z = -model.radius;
  console.info("[wdg.wavefront] this._translation=", this._translation);
  
  var gl = this._gl;

  if( !this._buffVert ) {
    this._buffVert = gl.createBuffer();
  }
  gl.bindBuffer( gl.ARRAY_BUFFER, this._buffVert );
  gl.bufferData( gl.ARRAY_BUFFER, model.vert, gl.STATIC_DRAW );

  if( !this._buffElem ) {
    this._buffElem = gl.createBuffer();
  }
  gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this._buffElem );
  gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, model.elem, gl.STATIC_DRAW );  
}

function parseResult( content ) {
  var def = parseWaveFront.call( this, content );
  var vertArray = [];
  var elemArray = [];
  var vertices = {};
  var count = 0;
  var maxLength = 0;
  def.f.forEach(function (triangle) {
    triangle.forEach(function (point) {
      var vertexIndex = vertices[point];
      if( typeof vertexIndex === 'undefined' ) {
        vertexIndex = count++;
        vertices[point] = vertexIndex;
        var pointPieces = point.split( '/' );
        var vIdx = pointPieces[0];
        var vnIdx = pointPieces[2];
        var v = def.v[vIdx];
        var vn = def.vn[vnIdx];
        var x = v[0], y = v[1], z = v[2];
        var length = x*x + y*y + z*z;
        maxLength = Math.max( maxLength, length );
        var xn = vn[0], yn = vn[1], zn = vn[2];
        vertArray.push( x, y, z, xn, yn, zn );
      }
      elemArray.push( vertexIndex );
    });
  });
  return {
    vert: new Float32Array( vertArray ),
    elem: new Uint16Array( elemArray ),
    radius: Math.sqrt( maxLength )
  };
}


function parseWaveFront( content ) {
  var def = waveFrontToDefinitions( content );
  this.vertexCount = def.v.length;
  this.normalCount = def.vn.length;
  this.faceCount = def.f.length;

  // [[x,y,z], ...]
  def.v = def.v.map( toVector3 );
  def.v.unshift( null ); // Because indexes must start from 1.
  // [[nx,ny,nz], ...]
  def.vn = def.vn.map( toVector3 );
  def.vn.unshift( null ); // Because indexes must start from 1.
  // [ ["7//1", "10//2", "4//3"], ... ]
  var F = [];
  cutFacesInTriangles( F, def );
  this.triangleCount = F.length;
  def.f = F;

  return def;
}


var RX_PREFIX = /^([a-z]+)[ ]+/g;

function waveFrontToDefinitions( content ) {
  var itr = new TextFileIterator( content );
  var line;
  var def = {};
  while( null != (line = itr.nextLine()) ) {
    RX_PREFIX.lastIndex = 0;
    var matcher = RX_PREFIX.exec( line );
    if( !matcher ) continue;
    var key = matcher[1];
    var val = line.substr( matcher[0].length ).trim();
    if( !Array.isArray( def[key] ) ) def[key] = [];
    def[key].push( val );
  }
  return def;
}


function cutFacesInTriangles( triangles, def ) {
  def.f.forEach(function (faceDef, faceDefIndex) {
    try {
      var poly = [];
      var face = faceDef.split( ' ' );
      if( face.length === 3 ) {
        triangles.push( face );
      }
      else {
        // More than 3 vertices, we must cut in triangles.
        face.forEach(function (vertex) {
          var vertexPieces = vertex.split( '/' );
          var idxVertex = parseInt( vertexPieces[0] );
          poly.push( def.v[idxVertex] );
        });

        var vertices = Fillpoly.vertexArrayToAttribs( poly );
        var trianglesElements = Fillpoly.fillPolyline( vertices );
        for( var k=0; k<trianglesElements.length/3; k++ ) {
          var idx0 = trianglesElements[k * 3 + 0];
          var idx1 = trianglesElements[k * 3 + 1];
          var idx2 = trianglesElements[k * 3 + 2];
          triangles.push([ face[idx0], face[idx1], face[idx2] ]);
        }
      }
    }
    catch( ex ) {
      console.error( "[wdg.wavefront.cutFacesInTriangles] error = ", ex );
      console.error( "[wdg.wavefront.cutFacesInTriangles] faceDef = ", faceDef );
      console.error( "[wdg.wavefront.cutFacesInTriangles] faceDefIndex = ", faceDefIndex );
      console.error( "[wdg.wavefront.cutFacesInTriangles] face = ", face );
      console.error( "[wdg.wavefront.cutFacesInTriangles] poly = ", poly );
      console.error( "[wdg.wavefront.cutFacesInTriangles] vertices = ", vertices );
      console.error( "[wdg.wavefront.cutFacesInTriangles] trianglesElements = ", trianglesElements );
      throw ex + "\n...in wdg.wavefront.cutFacesInTriangles";
    }
  });
  return triangles;
}


function toVector3( txt ) {
  return txt.split(" ").map( parseFloat );
}


var TextFileIterator = function( content ) {
  this._content = content;
  this._length = content.length;
  this._cursor = 0;
};

/**
 * @member TextFileIterator.nextLine
 */
TextFileIterator.prototype.nextLine = function() {
  var cursor = this._cursor;
  if( cursor >= this._length ) return null;
  var nextEndOfLine = this._content.indexOf( '\n', cursor );
  if( nextEndOfLine < 0 ) {
    this._cursor = this._length;
    return this._content.substr( cursor );
  }
  this._cursor = nextEndOfLine + 1;
  return this._content.substr( cursor, this._cursor - cursor );
};


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
    var TfwViewFlex = require('tfw.view.flex');
    var TfwViewTextbox = require('tfw.view.textbox');
    var TfwViewCheckbox = require('tfw.view.checkbox');
    var TfwViewFileInput = require('tfw.view.file-input');
    //-------------------------------------------------------
    // Check if needed functions are defined in code behind.
    View.ensureCodeBehind( CODE_BEHIND, "onFileLoaded", "init" );
    //-------------------
    // Global functions.
    function defVal(args, attName, attValue) { return args[attName] === undefined ? attValue : args[attName]; };
    //-------------------
    // Global variables.
    var conv_boolean = Converters.get('boolean');
    var conv_float = Converters.get('float');
    var conv_integer = Converters.get('integer');
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
        pm.create("file");
        pm.create("borderVisible", { cast: conv_boolean });
        pm.create("borderThickness", { cast: conv_float(0) });
        pm.create("vertexCount", { cast: conv_integer(0) });
        pm.create("normalCount", { cast: conv_integer(0) });
        pm.create("faceCount", { cast: conv_integer(0) });
        pm.create("triangleCount", { cast: conv_integer(0) });
        pm.create("vertCount", { cast: conv_integer(0) });
        pm.create("elemCount", { cast: conv_integer(0) });
        //------------------
        // Create elements.
        var e_ = new Tag('DIV', ["class"]);
        var e_0 = new TfwViewFileInput({ text: "Charger un fichier *.obj" });
        var e_2 = new Tag('DIV');
        var e_3 = new Tag('SPAN');
        $.add( e_3, "Sommets" );
        var e_4 = new Tag('B', ["textcontent"]);
        $.add( e_2, e_3, e_4 );
        var e_5 = new Tag('DIV');
        var e_6 = new Tag('SPAN');
        $.add( e_6, "Normales" );
        var e_7 = new Tag('B', ["textcontent"]);
        $.add( e_5, e_6, e_7 );
        var e_8 = new Tag('DIV');
        var e_9 = new Tag('SPAN');
        $.add( e_9, "Faces" );
        var e_A = new Tag('B', ["textcontent"]);
        $.add( e_8, e_9, e_A );
        var e_1 = new TfwViewFlex({
          justifyContent: "space-around",
          content: [
            e_2,
            e_5,
            e_8
          ]
        });
        var e_C = new Tag('DIV');
        var e_D = new Tag('SPAN');
        $.add( e_D, "Triangles" );
        var e_E = new Tag('B', ["textcontent"]);
        $.add( e_C, e_D, e_E );
        var e_F = new Tag('DIV');
        var e_G = new Tag('SPAN');
        $.add( e_G, "Vertices" );
        var e_H = new Tag('B', ["textcontent"]);
        $.add( e_F, e_G, e_H );
        var e_I = new Tag('DIV');
        var e_J = new Tag('SPAN');
        $.add( e_J, "Elements" );
        var e_K = new Tag('B', ["textcontent"]);
        $.add( e_I, e_J, e_K );
        var e_B = new TfwViewFlex({
          justifyContent: "space-around",
          content: [
            e_C,
            e_F,
            e_I
          ]
        });
        var e_canvas = new Tag('CANVAS', ["class"]);
        this.$elements.canvas = e_canvas;
        var e_N = new TfwViewCheckbox({ content: "Afficher le liseré" });
        var e_O = new TfwViewTextbox({ label: "Épaisseur" });
        var e_M = new TfwViewFlex({
          justifyContent: "space-around",
          content: [
            e_N,
            e_O
          ]
        });
        $.add( e_, e_0, e_1, e_B, e_canvas, e_M );
        //-----------------------
        // Declare root element.
        Object.defineProperty( this, '$', {value: e_.$, writable: false, enumerable: false, configurable: false } );
        //-------
        // Links
        new Link({
          A:{obj: that,
              name: 'file'},
          B:{obj: e_0,
              name: 'file'},
          name:"file > e_0/file"
        });
        new Link({
          A:{obj: that,
              name: 'vertexCount'},
          B:{obj: e_4,
              name: 'textcontent'},
          name:"vertex-count > e_4/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'normalCount'},
          B:{obj: e_7,
              name: 'textcontent'},
          name:"normal-count > e_7/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'faceCount'},
          B:{obj: e_A,
              name: 'textcontent'},
          name:"face-count > e_A/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'triangleCount'},
          B:{obj: e_E,
              name: 'textcontent'},
          name:"triangle-count > e_E/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'vertCount'},
          B:{obj: e_H,
              name: 'textcontent'},
          name:"vert-count > e_H/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'elemCount'},
          B:{obj: e_K,
              name: 'textcontent'},
          name:"elem-count > e_K/textcontent"
        });
        new Link({
          A:{obj: that,
              name: 'borderVisible'},
          B:{obj: e_N,
              name: 'value'},
          name:"border-visible > e_N/value"
        });
        new Link({
          A:{obj: that,
              name: 'borderThickness'},
          B:{obj: e_O,
              name: 'value'},
          name:"border-thickness > e_O/value"
        });
        //-----------------------
        // On attribute changed.
        pm.on( "file", function(v) {
          try {
            CODE_BEHIND.onFileLoaded.call( that, v );
          }
          catch( ex ) {
            console.error('Exception in function behind "onFileLoaded" of module "mod/wdg.wavefront.js" for attribute "file"!  ');
            console.error( ex );
          }} );
        //----------------------
        // Initialize elements.
        e_.class = "wdg-wavefront";
        e_canvas.class = "thm-ele8";
        //------------------------
        // Initialize attributes.
        this.file = args["file"];
        this.borderVisible = defVal(args, "borderVisible", true);
        this.borderThickness = defVal(args, "borderThickness", 2);
        this.vertexCount = defVal(args, "vertexCount", 0);
        this.normalCount = defVal(args, "normalCount", 0);
        this.faceCount = defVal(args, "faceCount", 0);
        this.triangleCount = defVal(args, "triangleCount", 0);
        this.vertCount = defVal(args, "vertCount", 0);
        this.elemCount = defVal(args, "elemCount", 0);
        // Initialization.
        CODE_BEHIND.init.call( this );
        $.addClass(this, 'view', 'custom');
      }
      catch( ex ) {
        console.error('mod/wdg.wavefront.js', ex);
        throw Error('Instantiation error in XJS of "mod/wdg.wavefront.js":\n' + ex)
      }
    };
    return ViewClass;
  }();
}
catch( ex ) {
  throw Error('Definition error in XJS of "mod/wdg.wavefront.js"\n' + ex)
}


  
module.exports._ = _;
/**
 * @module wdg.wavefront
 * @see module:$
 * @see module:dom
 * @see module:webgl.math
 * @see module:webgl.resize
 * @see module:webgl.program
 * @see module:webgl.fillpoly
 * @see module:dom
 * @see module:tfw.binding.property-manager
 * @see module:tfw.view
 * @see module:tfw.binding.link
 * @see module:tfw.view
 * @see module:tfw.binding.converters
 * @see module:tfw.view.flex
 * @see module:tfw.view.textbox
 * @see module:tfw.view.checkbox
 * @see module:tfw.view.file-input

 */
});