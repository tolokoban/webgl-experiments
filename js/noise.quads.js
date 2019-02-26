"use strict";

/** @module noise.quads */
require('noise.quads', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  var GLOBAL = {
    "vert": "attribute vec2 attXY;\r\n\r\nvoid main() {\r\n    gl_Position = vec4( attXY, 0, 1);\r\n}\r\n",
    "frag": "precision mediump float;\r\n\r\nuniform float uniFactorX;\r\nuniform float uniFactorY;\r\nuniform float uniSize;\r\nuniform float uniMode;\r\n\r\nuniform sampler2D uniRandom;\r\n\r\nconst vec3 ORANGE = vec3(1., .5, 0.);\r\nconst vec3 BLUE = vec3(0, .4, .867);\r\n\r\nfloat interpolate( float a ) {\r\n  if( uniMode > 1.5 ) return a*a*a*(a*(a*6.-15.)+10.);\r\n  if( uniMode > 0.5 ) return smoothstep( 0.0, 1.0, a );\r\n  return a;\r\n}\r\n\r\nvoid main() {\r\n  float INV = 1.0 / 32.0;\r\n  \r\n  vec2 A = vec2( 0, 0 );\r\n  vec2 B = vec2( 0, INV );\r\n  vec2 C = vec2( INV, INV );\r\n  vec2 D = vec2( INV, 0 );\r\n\r\n  vec2 coords = uniSize * vec2( gl_FragCoord.x * uniFactorX, gl_FragCoord.y * uniFactorY ) * INV;\r\n  coords += 0.5 + uniSize * INV;\r\n  \r\n  vec2 cellA = fract( coords * 32.0 );\r\n  vec2 cellB = cellA - vec2(0, 1);\r\n  vec2 cellC = cellA - vec2(1, 1);\r\n  vec2 cellD = cellA - vec2(1, 0);\r\n\r\n  coords = coords - cellA * INV;\r\n\r\n  vec2 gradA = 2.0 * (texture2D( uniRandom, coords + A ).xy - 0.5);\r\n  vec2 gradB = 2.0 * (texture2D( uniRandom, coords + B ).xy - 0.5);\r\n  vec2 gradC = 2.0 * (texture2D( uniRandom, coords + C ).xy - 0.5);\r\n  vec2 gradD = 2.0 * (texture2D( uniRandom, coords + D ).xy - 0.5);\r\n\r\n  float vA = dot( cellA, gradA );\r\n  float vB = dot( cellB, gradB );\r\n  float vC = dot( cellC, gradC );\r\n  float vD = dot( cellD, gradD );\r\n\r\n  float alphaX = interpolate( cellA.x );\r\n  float alphaY = interpolate( cellA.y );\r\n\r\n  float vAB = mix(vA, vB, alphaY);\r\n  float vCD = mix(vD, vC, alphaY);\r\n\r\n  float v = 2.0 * mix(vAB, vCD, alphaX);\r\n\r\n  // Les valeurs positives seront orange,\r\n  if( v > 0.0 ) gl_FragColor = vec4( v * ORANGE, 1 );\r\n  // les négatives seront bleu.\r\n  else gl_FragColor = vec4( -v * BLUE, 1 );\r\n\r\n  // Ajouter les liserés blancs.\r\n  gl_FragColor.a = smoothstep(0.0, 0.2, abs( v ) );\r\n}\r\n"
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
   * @this Quads
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
    requestAnimationFrame(watchSize.bind(this));
  }

  function watchSize() {
    requestAnimationFrame(watchSize.bind(this));
    var gl = this.gl;
    if (gl && Resize(gl)) paint.call(this);
  }

  function paint() {
    var gl = this.gl,
        prg = this.prg,
        buffVert = this.buffVert,
        texture = this.texture;
    if (!gl) return;
    console.log("paint...");
    prg.use();
    prg.$uniSize = this.size;
    prg.$uniFactorX = 1 / gl.canvas.width;
    prg.$uniFactorY = 1 / gl.canvas.height;
    if (this.mode === 'linear') prg.$uniMode = 0;else if (this.mode === 'cubic') prg.$uniMode = 1;else prg.$uniMode = 2;
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
          y = Math.floor(128 + invlen * yRaw);
      data.push(x, y, 0, 255);
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

      var TfwViewCombo = require('tfw.view.combo');

      var TfwViewSlider = require('tfw.view.slider'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "paint", "init"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ; //-------------------
      // Global variables.

      var conv_enum = Converters.get('enum');
      var conv_integer = Converters.get('integer'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.create("mode", {
            cast: conv_enum(["linear", "cubic", "pentic"]),
            init: "cubic"
          });
          pm.create("size", {
            cast: conv_integer(0)
          }); //------------------
          // Create elements.

          var e_ = new Tag('DIV', ["class"]);
          var e_0 = new Tag('CENTER');
          var e_1 = new TfwViewCombo({
            wide: false,
            label: "Interpolation",
            keys: ["linear", "cubic", "pentic"],
            items: ["f(a)=a", "f(a)=3a²-2a³", "f(a)=6a⁵-15a⁴+10x³"]
          });
          $.add(e_0, e_1);
          var e_canvas = new Tag('CANVAS');
          this.$elements.canvas = e_canvas;
          var e_3 = new TfwViewSlider({
            min: 1,
            max: 32,
            smooth: true
          });
          $.add(e_, e_0, e_canvas, e_3); //-----------------------
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
              name: 'mode'
            },
            B: {
              obj: e_1,
              name: 'value'
            },
            name: "mode > e_1/value"
          });
          new Link({
            A: {
              obj: that,
              name: 'size'
            },
            B: {
              obj: e_3,
              name: 'value'
            },
            name: "size > e_3/value"
          }); //-----------------------
          // On attribute changed.

          pm.on("mode", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.quads.js" for attribute "mode"!');
              console.error(ex);
            }
          });
          pm.on("size", function (v) {
            try {
              CODE_BEHIND.paint.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "paint" of module "mod/noise.quads.js" for attribute "size"!');
              console.error(ex);
            }
          }); //----------------------
          // Initialize elements.

          e_.class = "noise-quads"; //------------------------
          // Initialize attributes.

          pm.set("mode", defVal(args, "mode", "cubic"));
          pm.set("size", defVal(args, "size", 14));
          pm.fire("mode");
          pm.fire("size"); // Initialization.

          CODE_BEHIND.init.call(this);
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/noise.quads.js', ex);
          throw Error('Instantiation error in XJS of "mod/noise.quads.js":\n' + ex);
        }
      };

      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/noise.quads.js"\n' + ex);
  }

  module.exports._ = _;
});
//# sourceMappingURL=quads.js.map