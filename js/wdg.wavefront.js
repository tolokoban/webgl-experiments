"use strict";

/** @module wdg.wavefront */
require('wdg.wavefront', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {},
      "fr": {}
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  var GLOBAL = {
    "vert": "// Perspective\r\nuniform mat4 uniProjection;\r\n// Rotation de la multiball.\r\nuniform mat4 uniRotation;\r\n// Translation.\r\nuniform vec4 uniTranslation;\r\n// Largeur de l'écran en pixels.\r\nuniform float uniScreenWidth;\r\n\r\n// Coordonnées du centre du modèle.\r\nattribute vec3 attPoint;\r\n// Vecteur normal en ce point.\r\nattribute vec3 attNormal;\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  // Rotation, translation et projection en perspective.\r\n  vec4 vertex = uniRotation * vec4( attPoint, 1 ) + uniTranslation;\r\n  gl_Position = uniProjection * vertex;\r\n\r\n  vec4 normal = uniRotation * vec4( attNormal, 1 );\r\n  varNormal = normal.xyz;\r\n}\r\n",
    "frag": "precision mediump float;\r\nuniform vec3 uniColor;\r\n\r\n// Couleur principale du modèle.\r\nconst vec3 WHITE = vec3(1, 1, 1);\r\nconst vec3 BLACK = vec3(0, 0, 0);\r\n\r\n// Direction de la lumière.\r\nconst vec3 LIGHT = normalize( vec3(10, -5, -2) );\r\n\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  vec3 color = uniColor;\r\n\r\n  vec3 normal = normalize( varNormal );\r\n  vec3 reflection = reflect( LIGHT, normal );\r\n  float r = reflection.z;\r\n  float x = gl_FragCoord.x;\r\n  float y = gl_FragCoord.y;\r\n  \r\n  if( r < -0.5 ) {\r\n    if( mod( x - y, 6.0 ) < 1.0 || mod( y, 6.0 ) < 1.0 ) color = BLACK;\r\n  }\r\n  else if( r < 0.5 ) {\r\n    if( mod( x - y, 6.0 ) < 1.0 ) color = BLACK;\r\n  }\r\n  \r\n  gl_FragColor = vec4( color, 1.0 );\r\n}\r\n",
    "frag_couleurs_franches": "precision mediump float;\r\nuniform vec3 uniColor;\r\n\r\n// Couleur principale du modèle.\r\nconst vec3 WHITE = vec3(1, 1, 1);\r\nconst vec3 BLACK = vec3(0, 0, 0);\r\n\r\n// Direction de la lumière.\r\nconst vec3 LIGHT = normalize( vec3(10, -5, -2) );\r\n\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  vec3 color = uniColor;\r\n\r\n  vec3 normal = normalize( varNormal );\r\n  vec3 reflection = reflect( LIGHT, normal );\r\n  float r = reflection.z;\r\n  float x = gl_FragCoord.x;\r\n  float y = gl_FragCoord.y;\r\n  \r\n  if( r < -0.5 ) {\r\n    color *= .3;\r\n  }\r\n  else if( r < 0.5 ) {\r\n    color *= .6;\r\n  }\r\n  \r\n  gl_FragColor = vec4( color, 1.0 );\r\n}\r\n",
    "frag_lisse": "precision mediump float;\r\nuniform vec3 uniColor;\r\n\r\n// Direction de la lumière.\r\nconst vec3 LIGHT = normalize( vec3(10, -5, -2) );\r\n\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  vec3 color = uniColor;\r\n\r\n  vec3 normal = normalize( varNormal );\r\n  vec3 reflection = reflect( LIGHT, normal );\r\n  float r = reflection.z;\r\n  float R = 0.5 + 0.25 * (1.0 + r);\r\n  \r\n  gl_FragColor = vec4( color * R, 1.0 );\r\n}\r\n",
    "frag_huile": "precision mediump float;\r\nuniform vec3 uniColor;\r\n\r\n// Direction de la lumière.\r\nconst vec3 LIGHT = normalize( vec3(10, -5, -2) );\r\n\r\nvarying vec3 varNormal;\r\n\r\nvoid main() {\r\n  vec3 color = uniColor;\r\n\r\n  vec3 normal = normalize( varNormal );\r\n  vec3 reflection = reflect( LIGHT, normal );\r\n  float r = reflection.z;\r\n  float R = 0.0 + 0.5 * (1.0 + r);\r\n  \r\n  if( r < -.95 ) color *= mix( 1.0, R, 12.0 * (1.0 + r));\r\n  else if( r > .82 ) color = mix( color, vec3(1, 1, 1), 0.9);\r\n  else if( r > .8 ) color = mix( color * R, vec3(1, 1, 1), 50.0 * (r - .8));\r\n  else color *= R;\r\n  gl_FragColor = vec4( color, 1.0 );\r\n}\r\n",
    "vert2": "// Perspective\r\nuniform mat4 uniProjection;\r\n// Rotation de la multiball.\r\nuniform mat4 uniRotation;\r\n// Translation.\r\nuniform vec4 uniTranslation;\r\n// Largeur de l'écran en pixels.\r\nuniform float uniScreenWidth;\r\n// Border thickness.\r\nuniform float uniBorderThickness;\r\n\r\n// Coordonnées du centre du modèle.\r\nattribute vec3 attPoint;\r\n// Vecteur normal en ce point.\r\nattribute vec3 attNormal;\r\n\r\n\r\nvoid main() {\r\n  // Rotation, translation et projection en perspective.\r\n  vec4 vertex = uniRotation * vec4( attPoint + normalize(attNormal) * uniBorderThickness, 1 ) + uniTranslation;\r\n  gl_Position = uniProjection * vertex;\r\n}\r\n",
    "frag2": "precision mediump float;\r\n\r\nvoid main() {\r\n  gl_FragColor = vec4( 0, 0, 0, 1 );\r\n}\r\n"
  }; // Code behind.

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
    this._colorArray = new Float32Array([0, 0, 0]);
    this._colorText = '';
    var that = this;
    var canvas = this.$elements.canvas.$;
    var gl = canvas.getContext("webgl", {
      preserveDrawingBuffer: false
    });
    this._gl = gl;
    var prgHachures = new Program(gl, {
      vert: GLOBAL.vert,
      frag: GLOBAL.frag
    });
    var prgCouleursFranches = new Program(gl, {
      vert: GLOBAL.vert,
      frag: GLOBAL.frag_couleurs_franches
    });
    var prgLisse = new Program(gl, {
      vert: GLOBAL.vert,
      frag: GLOBAL.frag_lisse
    });
    var prgHuile = new Program(gl, {
      vert: GLOBAL.vert,
      frag: GLOBAL.frag_huile
    });
    var prg1 = [prgHachures, prgCouleursFranches, prgLisse, prgHuile];
    var prg2 = new Program(gl, {
      vert: GLOBAL.vert2,
      frag: GLOBAL.frag2
    });
    this._buffVert = gl.createBuffer();
    this._buffElem = gl.createBuffer();
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, .5, 0.866666666667, 1);
    gl.clearDepth(1);
    var projection = M4.identity();
    var rotation = M4.identity();
    var translation = new Float32Array([0, 0, -3, 0]);
    that._translation = translation;
    var angX = 0;
    var angY = 0;
    var rotX = 0;
    var rotY = 0;
    var touching = false;
    var time0 = 0;
    var time = 0;
    $.on(canvas, {
      down: function down() {
        touching = true;
        angX += rotX;
        angY += rotY;
        rotX = 0;
        rotY = 0;
      },
      up: function up() {
        touching = false;
        angX += rotX;
        angY += rotY;
        rotX = 0;
        rotY = 0;
        time0 = time;
      },
      drag: function drag(evt) {
        rotY = 2 * Math.PI * evt.vx / canvas.clientWidth;
        rotX = 2 * Math.PI * evt.vy / canvas.clientHeight;
      }
    });

    var draw = function draw(t) {
      requestAnimationFrame(draw);
      var color = getColor.call(that);
      var translation = that._translation;
      time = t;
      var w = gl.canvas.clientWidth;
      var h = gl.canvas.clientHeight;
      Resize(gl);
      M4.perspective(Math.PI * .35, w / h, .1, 10, projection);

      if (!touching && that.automaticRotation) {
        rotX = 1.97 * Math.sin((time - time0) * 0.0000347);
        rotY = 5.78 * Math.sin((time - time0) * 0.0000758);
      }

      M4.rotationXY(angX + rotX, angY + rotY, rotation);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, that._buffVert);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, that._buffElem);
      gl.cullFace(gl.BACK);
      var prg = prg1[that.material];
      prg.use();
      prg.$uniColor = color;
      prg.$uniProjection = projection;
      prg.$uniRotation = rotation;
      prg.$uniTranslation = translation;
      prg.bindAttribs(that._buffVert, "attPoint", "attNormal");
      gl.drawElements(gl.TRIANGLES, that.elemCount, gl.UNSIGNED_SHORT, 0);

      if (that.borderVisible) {
        gl.cullFace(gl.FRONT);
        prg2.use();
        prg2.$uniProjection = projection;
        prg2.$uniRotation = rotation;
        prg2.$uniTranslation = translation;
        prg2.$uniBorderThickness = that.borderThickness * 0.01;
        prg2.bindAttribs(that._buffVert, "attPoint", "attNormal");
        gl.drawElements(gl.TRIANGLES, that.elemCount, gl.UNSIGNED_SHORT, 0);
      }
    };

    requestAnimationFrame(draw);

    if (typeof fetch === 'function') {
      fetch("./css/wdg.wavefront/wolf.obj").then(function (response) {
        if (response.ok) return response.text();
      }).then(parse.bind(that));
    }
  }

  function getColor() {
    var color = this.color;
    if (color == this._colorText) return this._colorArray;
    this._colorText = color;
    var rr = parseInt(color.substr(1, 2), 16) / 255;
    var gg = parseInt(color.substr(3, 2), 16) / 255;
    var bb = parseInt(color.substr(5, 2), 16) / 255;
    this._colorArray[0] = rr;
    this._colorArray[1] = gg;
    this._colorArray[2] = bb;
    return this._colorArray;
  }

  function onFileLoaded(file) {
    var that = this;
    var reader = new FileReader();

    reader.onload = function (event) {
      var result = reader.result;
      parse.call(that, result);
    };

    reader.readAsText(file);
  }

  function parse(content) {
    var model = parseResult.call(this, content);
    console.info("[wdg.wavefront] model=", model);
    this.vertCount = model.vert.length / 6;
    this.elemCount = model.elem.length;
    this._translation.z = -model.radius;
    console.info("[wdg.wavefront] this._translation=", this._translation);
    var gl = this._gl;

    if (!this._buffVert) {
      this._buffVert = gl.createBuffer();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffVert);
    gl.bufferData(gl.ARRAY_BUFFER, model.vert, gl.STATIC_DRAW);

    if (!this._buffElem) {
      this._buffElem = gl.createBuffer();
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffElem);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.elem, gl.STATIC_DRAW);
  }

  function parseResult(content) {
    var def = parseWaveFront.call(this, content);
    var vertArray = [];
    var elemArray = [];
    var vertices = {};
    var count = 0;
    var maxLength = 0;
    def.f.forEach(function (triangle) {
      triangle.forEach(function (point) {
        var vertexIndex = vertices[point];

        if (typeof vertexIndex === 'undefined') {
          vertexIndex = count++;
          vertices[point] = vertexIndex;
          var pointPieces = point.split('/');
          var vIdx = pointPieces[0];
          var vnIdx = pointPieces[2];
          var v = def.v[vIdx];
          var vn = def.vn[vnIdx];
          var x = v[0],
              y = v[1],
              z = v[2];
          var length = x * x + y * y + z * z;
          maxLength = Math.max(maxLength, length);
          var xn = vn[0],
              yn = vn[1],
              zn = vn[2];
          vertArray.push(x, y, z, xn, yn, zn);
        }

        elemArray.push(vertexIndex);
      });
    });
    return {
      vert: new Float32Array(vertArray),
      elem: new Uint16Array(elemArray),
      radius: Math.sqrt(maxLength)
    };
  }

  function parseWaveFront(content) {
    var def = waveFrontToDefinitions(content);
    this.vertexCount = def.v.length;
    this.normalCount = def.vn.length;
    this.faceCount = def.f.length; // [[x,y,z], ...]

    def.v = def.v.map(toVector3);
    def.v.unshift(null); // Because indexes must start from 1.
    // [[nx,ny,nz], ...]

    def.vn = def.vn.map(toVector3);
    def.vn.unshift(null); // Because indexes must start from 1.
    // [ ["7//1", "10//2", "4//3"], ... ]

    var F = [];
    cutFacesInTriangles(F, def);
    this.triangleCount = F.length;
    def.f = F;
    return def;
  }

  var RX_PREFIX = /^([a-z]+)[ ]+/g;

  function waveFrontToDefinitions(content) {
    var itr = new TextFileIterator(content);
    var line;
    var def = {};

    while (null != (line = itr.nextLine())) {
      RX_PREFIX.lastIndex = 0;
      var matcher = RX_PREFIX.exec(line);
      if (!matcher) continue;
      var key = matcher[1];
      var val = line.substr(matcher[0].length).trim();
      if (!Array.isArray(def[key])) def[key] = [];
      def[key].push(val);
    }

    return def;
  }

  function cutFacesInTriangles(triangles, def) {
    def.f.forEach(function (faceDef, faceDefIndex) {
      try {
        var poly = [];
        var face = faceDef.split(' ');

        if (face.length === 3) {
          triangles.push(face);
        } else {
          // More than 3 vertices, we must cut in triangles.
          face.forEach(function (vertex) {
            var vertexPieces = vertex.split('/');
            var idxVertex = parseInt(vertexPieces[0]);
            poly.push(def.v[idxVertex]);
          });
          var vertices = Fillpoly.vertexArrayToAttribs(poly);
          var trianglesElements = Fillpoly.fillPolyline(vertices);

          for (var k = 0; k < trianglesElements.length / 3; k++) {
            var idx0 = trianglesElements[k * 3 + 0];
            var idx1 = trianglesElements[k * 3 + 1];
            var idx2 = trianglesElements[k * 3 + 2];
            triangles.push([face[idx0], face[idx1], face[idx2]]);
          }
        }
      } catch (ex) {
        console.error("[wdg.wavefront.cutFacesInTriangles] error = ", ex);
        console.error("[wdg.wavefront.cutFacesInTriangles] faceDef = ", faceDef);
        console.error("[wdg.wavefront.cutFacesInTriangles] faceDefIndex = ", faceDefIndex);
        console.error("[wdg.wavefront.cutFacesInTriangles] face = ", face);
        console.error("[wdg.wavefront.cutFacesInTriangles] poly = ", poly);
        console.error("[wdg.wavefront.cutFacesInTriangles] vertices = ", vertices);
        console.error("[wdg.wavefront.cutFacesInTriangles] trianglesElements = ", trianglesElements);
        throw ex + "\n...in wdg.wavefront.cutFacesInTriangles";
      }
    });
    return triangles;
  }

  function toVector3(txt) {
    return txt.split(" ").map(parseFloat);
  }

  var TextFileIterator = function TextFileIterator(content) {
    this._content = content;
    this._length = content.length;
    this._cursor = 0;
  };
  /**
   * @member TextFileIterator.nextLine
   */


  TextFileIterator.prototype.nextLine = function () {
    var cursor = this._cursor;
    if (cursor >= this._length) return null;

    var nextEndOfLine = this._content.indexOf('\n', cursor);

    if (nextEndOfLine < 0) {
      this._cursor = this._length;
      return this._content.substr(cursor);
    }

    this._cursor = nextEndOfLine + 1;
    return this._content.substr(cursor, this._cursor - cursor);
  }; //===============================
  // XJS:View autogenerated code.


  try {
    module.exports = function () {
      //--------------------
      // Dependent modules.
      var $ = require('dom');

      var PM = require('tfw.binding.property-manager');

      var Tag = require('tfw.view').Tag;

      var View = require('tfw.view');

      ;

      var Converters = require('tfw.binding.converters'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "onFileLoaded", "init"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ; //-------------------
      // Global variables.

      var conv_boolean = Converters.get('boolean');
      var conv_float = Converters.get('float');
      var conv_integer = Converters.get('integer');
      var conv_color = Converters.get('color'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.create("file");
          pm.create("automaticRotation", {
            cast: conv_boolean
          });
          pm.create("borderVisible", {
            cast: conv_boolean
          });
          pm.create("borderThickness", {
            cast: conv_float(0)
          });
          pm.create("vertexCount", {
            cast: conv_integer(0)
          });
          pm.create("normalCount", {
            cast: conv_integer(0)
          });
          pm.create("faceCount", {
            cast: conv_integer(0)
          });
          pm.create("triangleCount", {
            cast: conv_integer(0)
          });
          pm.create("vertCount", {
            cast: conv_integer(0)
          });
          pm.create("elemCount", {
            cast: conv_integer(0)
          });
          pm.create("material", {
            cast: conv_integer(0)
          });
          pm.create("color", {
            cast: conv_color
          }); //------------------
          // Create elements.

          var e_ = new Tag('DIV', ["class"]); //-----------------------
          // Declare root element.

          Object.defineProperty(this, '$', {
            value: undefined.$,
            writable: false,
            enumerable: false,
            configurable: false
          }); //-----------------------
          // On attribute changed.

          pm.on("file", function (v) {
            try {
              CODE_BEHIND.onFileLoaded.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onFileLoaded" of module "mod/wdg.wavefront.js" for attribute "file"!');
              console.error(ex);
            }
          }); //----------------------
          // Initialize elements.

          e_.class = "wdg-wavefront"; //------------------------
          // Initialize attributes.

          pm.set("file", args["file"]);
          pm.set("automaticRotation", defVal(args, "automaticRotation", true));
          pm.set("borderVisible", defVal(args, "borderVisible", true));
          pm.set("borderThickness", defVal(args, "borderThickness", 2));
          pm.set("vertexCount", defVal(args, "vertexCount", 0));
          pm.set("normalCount", defVal(args, "normalCount", 0));
          pm.set("faceCount", defVal(args, "faceCount", 0));
          pm.set("triangleCount", defVal(args, "triangleCount", 0));
          pm.set("vertCount", defVal(args, "vertCount", 0));
          pm.set("elemCount", defVal(args, "elemCount", 0));
          pm.set("material", defVal(args, "material", 0));
          pm.set("color", defVal(args, "color", "#ff8800"));
          pm.fire("file");
          pm.fire("automaticRotation");
          pm.fire("borderVisible");
          pm.fire("borderThickness");
          pm.fire("vertexCount");
          pm.fire("normalCount");
          pm.fire("faceCount");
          pm.fire("triangleCount");
          pm.fire("vertCount");
          pm.fire("elemCount");
          pm.fire("material");
          pm.fire("color"); // Initialization.

          CODE_BEHIND.init.call(this);
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/wdg.wavefront.js', ex);
          throw Error('Instantiation error in XJS of "mod/wdg.wavefront.js":\n' + ex);
        }
      };

      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/wdg.wavefront.js"\n' + ex);
  }

  module.exports._ = _;
});
//# sourceMappingURL=wdg.wavefront.js.map