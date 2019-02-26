"use strict";

/** @module noise.tris */
require('noise.tris', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {
        "ampl": "Amplitude",
        "ampl-att": "Amp. atténuation",
        "freq": "Zoom",
        "freq-att": "Zoom atténuation"
      },
      "fr": {
        "ampl": "Amplitude",
        "ampl-att": "Amp. atténuation",
        "freq": "Échelle",
        "freq-att": "Éch. atténuation"
      }
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  var GLOBAL = {
    "vert": "attribute vec2 attXY;\r\n\r\nvoid main() {\r\n    gl_Position = vec4( attXY, 0, 1);\r\n}\r\n",
    "frag": "precision mediump float;\r\n\r\n\r\nuniform float uniTime;\r\nuniform float uniCenterX;\r\nuniform float uniCenterY;\r\nuniform sampler2D uniRandom;\r\n\r\nuniform float uniLoop;\r\nuniform float uniAmpl;\r\nuniform float uniFreq;\r\nuniform float uniAmplAttenuation;\r\nuniform float uniFreqAttenuation;\r\n\r\nconst vec3 BLUE = vec3( 0, .4, .687 );\r\nconst vec3 ORANGE = vec3( 1, .5, 0 );\r\n\r\nconst float INV = 1.0 / 32.0;\r\n\r\nconst float ZOOM = 0.01;\r\n\r\nconst float SQRT2 = 1.4142135623730951;\r\nconst float SQRT3 = 1.7320508075688772;\r\nconst float SQRT6 = 2.449489742783178;\r\n\r\nconst mat2 SKEW = mat2(2.7320508075688772, 0.7320508075688772, 0.7320508075688772, 2.7320508075688772);\r\nconst mat2 UNSKEW = mat2(0.39433756729740643, -0.10566243270259355, -0.10566243270259355, 0.39433756729740643);\r\n\r\nconst float RADIUS = .5 / SQRT3;\r\nconst vec2 UP = vec2(-0.25881904510252063, 0.9659258262890683) * RADIUS * SQRT2;\r\nconst vec2 DOWN = vec2(0.9659258262890683, -0.2588190451025207) * RADIUS * SQRT2;\r\n\r\n\r\nvec3 gradient( vec2 pt, float seed ) {\r\n  vec2 coord = mat2(seed, 1. - seed, 1. + seed, 1) * pt;\r\n  return texture2D( uniRandom, coord ).xyz;\r\n}\r\n\r\n\r\nfloat simplexNoise(vec2 coords, float seed) {\r\n  vec2 pos = SKEW * coords;\r\n  float x = pos.x;\r\n  float y = pos.y;\r\n\r\n  float u = fract(x);\r\n  float v = fract(y);\r\n\r\n  x = (x - u) * INV;\r\n  y = (y - v) * INV;\r\n\r\n  vec2 posM = coords;\r\n  \r\n  vec2 posA = UNSKEW*(pos - vec2(u,v));\r\n  vec3 rndA = gradient( vec2( x, y ), seed );\r\n  vec2 vecAM = posA - posM;\r\n  \r\n  vec2 posB = posA + RADIUS;\r\n  vec3 rndB = gradient( vec2( x + INV, y + INV ), seed );\r\n  vec2 vecBM = posB - posM;\r\n\r\n  vec2 posC;\r\n  vec3 rndC;  \r\n  if( u < v ) {\r\n    posC = posA + UP;\r\n    rndC = gradient( vec2( x, y + INV ), seed );\r\n  } else {\r\n    posC = posA + DOWN;\r\n    rndC = gradient( vec2( x + INV, y ), seed );\r\n  }\r\n  vec2 vecCM = posC - posM;\r\n\r\n  vec2 vecCA = posA - posC;\r\n  vec2 vecCB = posB - posC;\r\n\r\n  // Calcul des produits scalaires pour chaque sommet.\r\n  float vA = dot(2. * rndA.xy - 1., vecAM);\r\n  float vB = dot(2. * rndB.xy - 1., vecBM);\r\n  float vC = dot(2. * rndC.xy - 1., vecCM);\r\n  // Calcul des poids.\r\n  // r2 est une valeur empirique. Des valeurs éloignées de .16 feront apparaître la grille.\r\n  float r2 = .16;\r\n  float wA = max(0., r2 - dot(vecAM, vecAM));\r\n  float wB = max(0., r2 - dot(vecBM, vecBM));\r\n  float wC = max(0., r2 - dot(vecCM, vecCM));\r\n  // On élève chaque poids à la puissance 4.\r\n  wA *= wA; wA *= wA;\r\n  wB *= wB; wB *= wB;\r\n  wC *= wC; wC *= wC;\r\n  \r\n  float value = wA*vA + wB*vB + wC*vC;\r\n  // Normaliser `value` pour bien étaler entre [-1 et 1].\r\n  // Là encore, c'est une valeur empirique.\r\n  value *= 10000.;\r\n\r\n  return value;\r\n}\r\n\r\nvoid main() {\r\n  vec2 coords = (gl_FragCoord.xy - vec2(uniCenterY, uniCenterY)) * ZOOM;\r\n  \r\n  float value = 0.;\r\n  float freq = uniFreq;\r\n  float ampl = uniAmpl;\r\n  float attF = uniFreqAttenuation;\r\n  float attA = uniAmplAttenuation;\r\n  for( int i=0; i<20; i++ ) {\r\n    if( float(i) > uniLoop ) break;\r\n    value += ampl * simplexNoise(coords * freq, 1. + float(i*i) * .1);\r\n    ampl *= attA;\r\n    freq *= attF;\r\n  }\r\n  \r\n  vec3 color;\r\n  if( value < 0. ) color = -value * BLUE;\r\n  else color = value * ORANGE;\r\n  \r\n  gl_FragColor = vec4( color, 1 );\r\n}\r\n"
  };
  "use strict";
  /* exported CODE_BEHIND */


  var CODE_BEHIND = {
    init: init,
    paint: paint
  };

  var Dom = require("dom"),
      Resize = require("webgl.resize"),
      Program = require("webgl.program");
  /**
   * This function is called by the XJS code.
   *
   * @this Tris
   */


  function init() {
    var canvas = this.$elements.canvas.$,
        gl = canvas.getContext("webgl", {
      preserveDrawingBuffer: false
    });
    this.prg = new Program(gl, {
      vert: GLOBAL.vert,
      frag: GLOBAL.frag
    });
    this.buffVert = gl.createBuffer();
    var arrayVert = new Float32Array([-1, -1, +1, -1, -1, +1, +1, +1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
    gl.bufferData(gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW);
    this.gl = gl;
    this.texture = createRandomTexture(gl);
    requestAnimationFrame(paint.bind(this));
  }

  function paint(time) {
    requestAnimationFrame(paint.bind(this));
    var gl = this.gl,
        prg = this.prg,
        buffVert = this.buffVert,
        texture = this.texture;
    if (!gl) return;
    Resize(gl);
    prg.use();
    prg.$uniTime = time;
    prg.$uniCenterX = gl.canvas.width * 0.5;
    prg.$uniCenterY = gl.canvas.height * 0.5;
    prg.$uniLoop = this.loop - .5;
    prg.$uniAmpl = this.ampl;
    prg.$uniFreq = this.freq;
    prg.$uniAmplAttenuation = this.amplAtt;
    prg.$uniFreqAttenuation = this.freqAtt;
    prg.$uniRandom = 0;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    prg.bindAttribs(buffVert, "attXY");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  } //#(texture)


  function createRandomTexture(gl) {
    // Les coordonnées R, G, B et A sont des entiers entre 0 et 255.
    // On va créer des vecteurs normés et on stoquera la coordonnée X
    // dans R et la coordonnée Y dans G.
    // Les coordonnées X et Y sont des nombres décimaux compris entre -1 et +1.
    // Il faudra donc les transformer en nombres entiers entre 0 et 255.
    var data = [];
    var texture = gl.createTexture();
    var width = 32;
    var height = 32;

    for (var i = 0; i < width * height; i++) {
      var xRaw = Math.random() - 0.5,
          yRaw = Math.random() - 0.5,
          len = 2 * Math.sqrt(xRaw * xRaw + yRaw * yRaw),
          invlen = 256 / len,
          x = Math.floor(128 + invlen * xRaw),
          y = Math.floor(128 + invlen * yRaw),
          z = Math.floor(Math.random() * 255);
      data.push(x, y, z, 255);
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(data));
    return texture;
  } //#(texture)
  //===============================
  // XJS:View autogenerated code.


  try {
    module.exports = function () {
      //--------------------
      // Dependent modules.
      var $ = require('dom');

      var PM = require('tfw.binding.property-manager');

      var Tag = require('tfw.view').Tag;

      var Link = require('tfw.binding.link');

      var View = require('tfw.view');

      ;

      var Converters = require('tfw.binding.converters');

      var TfwViewSlider = require('tfw.view.slider');

      var TfwViewTextbox = require('tfw.view.textbox'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "paint", "init"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ; //-------------------
      // Global variables.

      var conv_integer = Converters.get('integer');
      var conv_float = Converters.get('float'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.create("loop", {
            cast: conv_integer(0)
          });
          pm.create("freq", {
            cast: conv_float(0)
          });
          pm.create("ampl", {
            cast: conv_float(0)
          });
          pm.create("freqAtt", {
            cast: conv_float(0)
          });
          pm.create("amplAtt", {
            cast: conv_float(0)
          }); //------------------
          // Create elements.

          var e_ = new Tag('DIV', ["class"]);
          var e_canvas = new Tag('CANVAS');
          this.$elements.canvas = e_canvas;
          var e_1 = new TfwViewSlider({
            min: 0,
            max: 20
          });
          var e_2 = new Tag('DIV', ["class"]);
          var e_3 = new TfwViewTextbox({
            label: _("freq")
          });
          var e_4 = new TfwViewTextbox({
            label: _("ampl")
          });
          var e_5 = new TfwViewTextbox({
            label: _("freq-att")
          });
          var e_6 = new TfwViewTextbox({
            label: _("ampl-att")
          });
          $.add(e_2, e_3, e_4, e_5, e_6);
          $.add(e_, e_canvas, e_1, e_2); //-----------------------
          // Declare root element.

          Object.defineProperty(this, '$', {
            value: e_.$,
            writable: false,
            enumerable: false,
            configurable: false
          }); //-------
          // Links

          new Link({
            A: {
              obj: that,
              name: 'loop'
            },
            B: {
              obj: e_1,
              name: 'value'
            },
            name: "loop > e_1/value"
          });
          new Link({
            A: {
              obj: that,
              name: 'freq'
            },
            B: {
              obj: e_3,
              name: 'value'
            },
            name: "freq > e_3/value"
          });
          new Link({
            A: {
              obj: that,
              name: 'ampl'
            },
            B: {
              obj: e_4,
              name: 'value'
            },
            name: "ampl > e_4/value"
          });
          new Link({
            A: {
              obj: that,
              name: 'freqAtt'
            },
            B: {
              obj: e_5,
              name: 'value'
            },
            name: "freq-att > e_5/value"
          });
          new Link({
            A: {
              obj: that,
              name: 'amplAtt'
            },
            B: {
              obj: e_6,
              name: 'value'
            },
            name: "ampl-att > e_6/value"
          }); //-----------------------
          // On attribute changed.

          pm.on("loop", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.tris.js" for attribute "loop"!');
              console.error(ex);
            }
          });
          pm.on("freq", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.tris.js" for attribute "freq"!');
              console.error(ex);
            }
          });
          pm.on("ampl", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.tris.js" for attribute "ampl"!');
              console.error(ex);
            }
          });
          pm.on("freqAtt", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.tris.js" for attribute "freqAtt"!');
              console.error(ex);
            }
          });
          pm.on("amplAtt", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.tris.js" for attribute "amplAtt"!');
              console.error(ex);
            }
          }); //----------------------
          // Initialize elements.

          e_.class = "noise-tris";
          e_2.class = "flex"; //------------------------
          // Initialize attributes.

          pm.set("loop", defVal(args, "loop", 1));
          pm.set("freq", defVal(args, "freq", 1));
          pm.set("ampl", defVal(args, "ampl", 1));
          pm.set("freqAtt", defVal(args, "freqAtt", 1.1));
          pm.set("amplAtt", defVal(args, "amplAtt", 0.8));
          pm.fire("loop");
          pm.fire("freq");
          pm.fire("ampl");
          pm.fire("freqAtt");
          pm.fire("amplAtt"); // Initialization.

          CODE_BEHIND.init.call(this);
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/noise.tris.js', ex);
          throw Error('Instantiation error in XJS of "mod/noise.tris.js":\n' + ex);
        }
      };

      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/noise.tris.js"\n' + ex);
  }

  module.exports._ = _;
});
//# sourceMappingURL=tris.js.map