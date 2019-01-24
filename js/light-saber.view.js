"use strict";

/** @module light-saber.view */
require('light-saber.view', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";
  /* exported CODE_BEHIND */


  var CODE_BEHIND = {
    init: init
  };

  require("assets");

  var M4 = require("webgl.math").m4,
      Add = require("light-saber.add"),
      Blur = require("light-saber.blur"),
      Filter = require("light-saber.filter"),
      Resize = require("webgl.resize"),
      HiltObject = require("light-saber.saber-hilt"),
      PlasmaObject = require("light-saber.saber-plasma");
  /**
   * According to wikipedia, a light saber has a tilt of 27 cm and a plasma blade of 91 cm.
   * @this ViewXJS
   */


  function init() {
    var that = this,
        canvas = this.$elements.canvas.$,
        gl = canvas.getContext("webgl", {
      preserveDrawingBuffer: false
    }),
        framebuffers = {},
        add = new Add(gl, framebuffers, "persistence1", "scene"),
        blur1 = new Blur(gl, framebuffers, "filter"),
        blur2 = new Blur(gl, framebuffers, "blur1"),
        filter = new Filter(gl, framebuffers, "scene"),
        blurPersistence = new Blur(gl, framebuffers, "persistence1"),
        addPersistence = new Add(gl, framebuffers, "persistence2", "blur2"),
        hiltObject = new HiltObject(gl),
        plasmaObject = new PlasmaObject(gl),
        projection = M4.identity(),
        rotation = M4.identity(),
        translation = new Float32Array([0, -0.4, -1.5, 0]);
    hiltObject.projection = projection;
    hiltObject.rotation = rotation;
    hiltObject.translation = translation;
    plasmaObject.projection = projection;
    plasmaObject.rotation = rotation;
    plasmaObject.translation = translation;
    createFramebuffers(gl, framebuffers);

    var paint = function paint(time) {
      requestAnimationFrame(paint);

      if (Resize(gl)) {
        console.log("Resize!");
        createFramebuffers(gl, framebuffers);
      }

      var angX = ramp(Math.sin(1 + time * 0.000147), -Math.PI * 0.5, Math.PI * 0.5),
          angY = 4 * Math.cos(time * 0.000458),
          w = gl.canvas.clientWidth,
          h = gl.canvas.clientHeight;
      M4.rotationYX(angY, angX, rotation);
      M4.perspective(Math.PI * .35, w / h, .1, 10, projection);
      var sceneFB = framebuffers.scene;
      var filterFB = framebuffers.filter;
      var blur1FB = framebuffers.blur1;
      var blur2FB = framebuffers.blur2;
      var persistence1FB = framebuffers.persistence1;
      renderScene(gl, sceneFB, that.gloom, hiltObject, plasmaObject, time);

      if (that.gloom) {
        renderFilter(gl, filter, filterFB, time);
        renderPersistence(gl, blurPersistence, framebuffers, time);
        renderBlur(gl, blur1, blur1FB, time);
        renderBlur(gl, blur2, blur2FB, time);
        renderAdd(gl, addPersistence, time, persistence1FB);
        renderAdd(gl, add, time);
      }
    };

    requestAnimationFrame(paint);
  }
  /**
   * Render the scene on screen or in a frame buffer.
   *
   * @param   {[type]} gl      [description]
   * @param   {[type]} sceneFB [description]
   * @param   {[type]} gloom   [description]
   * @param {object} hiltObject -
   * @param {object} plasmaObject -
   * @param {float} time -
   */


  function renderScene(gl, sceneFB, gloom, hiltObject, plasmaObject, time) {
    if (gloom) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFB.fb);
      gl.viewport(0, 0, sceneFB.width, sceneFB.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    hiltObject.paint(time);
    plasmaObject.paint(time);
  }
  /**
   * Keep only the saber plasma.
   *
   * @param   {[type]} gl       [description]
   * @param   {[type]} filter   [description]
   * @param   {[type]} filterFB [description]
   * @param {double} time -
   */


  function renderFilter(gl, filter, filterFB, time) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, filterFB.fb);
    gl.viewport(0, 0, filterFB.width, filterFB.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    filter.paint(time);
  }
  /**
   * Gaussian blur.
   *
   * @param   {[type]} gl       [description]
   * @param   {[type]} blur   [description]
   * @param   {[type]} blurFB [description]
   * @param {double} time -
   */


  function renderBlur(gl, blur, blurFB, time) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurFB.fb);
    gl.viewport(0, 0, blurFB.width, blurFB.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var attenuation = 1.75;
    blur.centerCoeff = 0.332 * attenuation;
    blur.segmentCoeff = 0.122 * attenuation;
    blur.cornerCoeff = 0.045 * attenuation;
    blur.paint(time);
  }
  /**
   * Add glowing effect above final image.
   *
   * @param   {[type]} gl   [description]
   * @param   {[type]} add  [description]
   * @param   {[type]} time [description]
   * @param {object} fb -
   */


  function renderAdd(gl, add, time) {
    var fb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (fb === null) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb.fb);
      gl.viewport(0, 0, fb.width, fb.height);
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    add.paint(time);
  }
  /**
   * Fade persistence buffer.
   *
   * @param   {[type]} gl           [description]
   * @param   {[type]} blur         [description]
   * @param   {[type]} framebuffers [description]
   * @param   {[type]} time         [description]
   */


  function renderPersistence(gl, blur, framebuffers, time) {
    var fb = framebuffers.persistence2;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb.fb);
    gl.viewport(0, 0, fb.width, fb.height);
    var attenuation = 1.0;
    blur.centerCoeff = 0.332 * attenuation;
    blur.segmentCoeff = 0.122 * attenuation;
    blur.cornerCoeff = 0.045 * attenuation;
    blur.paint(time);
  }
  /**
   * Take a number between -1 and +1 and project it between min and max.
   *
   * @param   {float} value - Value between -1 and +1.
   * @param   {float} min - Mapped value for -1.
   * @param   {float} max - Mapped value for +1.
   * @returns {float} .
   */


  function ramp(value, min, max) {
    var delta = max - min;
    return min + (value + 1) * 0.5 * delta;
  }
  /**
   * Create all needed framebuffers and delete the previous one.
   *
   * @param   {[type]} gl           [description]
   * @param   {[type]} framebuffers [description]
   */


  function createFramebuffers(gl, framebuffers) {
    Object.values(framebuffers).forEach(deleteFramebuffer.bind(null, gl));
    var w = Math.max(1, gl.canvas.width),
        h = Math.max(1, gl.canvas.height);
    framebuffers.scene = createFramebuffer(gl, w, h);
    framebuffers.filter = createFramebuffer(gl, w / 2, h / 2);
    framebuffers.blur1 = createFramebuffer(gl, w / 8, h / 8);
    framebuffers.blur2 = createFramebuffer(gl, w / 8, h / 8);
    framebuffers.persistence1 = createFramebuffer(gl, w / 2, h / 2);
    framebuffers.persistence2 = createFramebuffer(gl, w / 2, h / 2);
  }
  /**
   * Crate a Framebuffer and its associated texture.
   *
   * @param   {[type]} gl     [description]
   * @param   {[type]} width  [description]
   * @param   {[type]} height [description]
   *
   * @returns {object} `{ texture, framebuffer }`
   */


  function createFramebuffer(gl, width, height) {
    var texture = gl.createTexture(); // Tell GL that the current texture is this one.

    gl.bindTexture(gl.TEXTURE_2D, texture); // The texture doesn't wrap and it uses linear interpolation.

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    // gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    // Set texture dimension.

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var fb = gl.createFramebuffer(); // Tell GL that the current framebuffer is this one.

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb); // Attach the texture to this framebuffer.

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    return {
      texture: texture,
      fb: fb,
      width: width,
      height: height
    };
  }
  /**
   * Clean up the framebuffer and its texture.
   *
   * @param   {[type]} gl          [description]
   * @param   {[type]} frameBuffer [description]
   */


  function deleteFramebuffer(gl, _ref) {
    var texture = _ref.texture,
        fb = _ref.fb;
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fb);
  } //===============================
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

      var TfwViewCheckbox = require('tfw.view.checkbox'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "init"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ;

      function addClassIfTrue(element, className, value) {
        if (value) $.addClass(element, className);else $.removeClass(element, className);
      }

      ;
      ; //-------------------
      // Global variables.

      var conv_boolean = Converters.get('boolean'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.create("fullscreen", {
            cast: conv_boolean
          });
          pm.create("gloom", {
            cast: conv_boolean
          }); //------------------
          // Create elements.

          var e_ = new Tag('DIV', ["class"]);
          var e_canvas = new Tag('CANVAS');
          this.$elements.canvas = e_canvas;
          var e_1 = new Tag('DIV', ["class"]);
          var e_2 = new TfwViewCheckbox({
            content: "Plein écran",
            wide: false
          });
          $.add(e_1, e_2);
          var e_3 = new Tag('DIV', ["class"]);
          var e_4 = new TfwViewCheckbox({
            content: "Halo",
            wide: false
          });
          $.add(e_3, e_4);
          $.add(e_, e_canvas, e_1, e_3); //-----------------------
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
              name: 'fullscreen'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "fullscreen", v);
              }
            },
            name: "fullscreen > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'fullscreen'
            },
            B: {
              obj: e_2,
              name: 'value'
            },
            name: "fullscreen > e_2/value"
          });
          new Link({
            A: {
              obj: that,
              name: 'gloom'
            },
            B: {
              obj: e_4,
              name: 'value'
            },
            name: "gloom > e_4/value"
          }); //----------------------
          // Initialize elements.

          e_.class = "wdg-light-saber-view";
          e_1.class = "bottom";
          e_3.class = "left"; //------------------------
          // Initialize attributes.

          pm.set("fullscreen", defVal(args, "fullscreen", false));
          pm.set("gloom", defVal(args, "gloom", false));
          pm.fire("fullscreen");
          pm.fire("gloom"); // Initialization.

          CODE_BEHIND.init.call(this);
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/light-saber.view.js', ex);
          throw Error('Instantiation error in XJS of "mod/light-saber.view.js":\n' + ex);
        }
      };

      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/light-saber.view.js"\n' + ex);
  }

  module.exports._ = _;
});
//# sourceMappingURL=view.js.map