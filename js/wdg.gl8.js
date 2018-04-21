/** @module wdg.gl8 */require( 'wdg.gl8', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
  "vert": "// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n\n// Passer les coordonnées UV pour la texture.\nvarying vec2 varUV;\nvarying float varTime;\n\nvoid main() {\n  float x = attPosition.x;\n  float y = attPosition.y;\n  float z = 0.0;\n\n  gl_Position = vec4(x, y, z, 1.0 );\n\n  varUV = vec2( x, y );\n  varTime = uniTime;\n}\n",
  "frag": "precision mediump float;\n\n// La texture créée à l'aide d'un Frame Buffer\nuniform sampler2D uniTexture;\n\n// Les coordonnées de l'écran, comprises entre -1.0 et +1.0\nvarying vec2 varUV;\n// Temps en millisecondes\nvarying float varTime;\n\n// Constante utilisée pour lire les pixels avoisinants.\nconst float S = 1.0 / 128.0;\n\n// La couleur fait-elle partie de l'arrière-plan ?\n// En fait, on vérifie qu'elle est blanche, ou proche du blanc.\nbool isBackground(vec4 color) {\n  if (color.r > .9 && color.g > .9 && color.b > .9) return true;\n  return false;\n}\n\n// Effet 1 : on prend l'image telle qu'elle est.\nvoid fx1(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color;\n}\n\n// Effet 2 : détextion de contour + seuil.\nvoid fx2(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color * 9.0\n    - texture2D( uniTexture, vec2(u - S, v - S) )\n    - texture2D( uniTexture, vec2(u    , v - S) )\n    - texture2D( uniTexture, vec2(u + S, v - S) )\n    - texture2D( uniTexture, vec2(u - S, v    ) )\n    - texture2D( uniTexture, vec2(u + S, v    ) )\n    - texture2D( uniTexture, vec2(u - S, v + S) )\n    - texture2D( uniTexture, vec2(u    , v + S) )\n    - texture2D( uniTexture, vec2(u + S, v + S) );\n  if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {\n    if (!isBackground(color)) {\n      gl_FragColor = vec4(1.0, 0.9 * u, 0.0, 1.0);\n    } \n  } else {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n  }\n}\n\n// Effet 3 : variation de couleur en fonction de la position.\nvoid fx3(vec4 color, float u, float v, float x, float y) {\n  if (isBackground(color)) gl_FragColor = color;\n  else gl_FragColor = vec4(1.0 - color.r * u, 1.0 - color.g * u * v, 1.0 - color.b * v, 1.0);\n}\n\n// Effet 4 : autre effet. On peut faire varier les coefficients de\n// 9 pixels utilisés, à condition que leur somme soit égale à 1.\nvoid fx4(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = - color * 7.0\n    + texture2D( uniTexture, vec2(u - S, v - S) )\n    + texture2D( uniTexture, vec2(u    , v - S) )\n    + texture2D( uniTexture, vec2(u + S, v - S) )\n    + texture2D( uniTexture, vec2(u - S, v    ) )\n    + texture2D( uniTexture, vec2(u + S, v    ) )\n    + texture2D( uniTexture, vec2(u - S, v + S) )\n    + texture2D( uniTexture, vec2(u    , v + S) )\n    + texture2D( uniTexture, vec2(u + S, v + S) );\n  float r = gl_FragColor.r;\n  float g = gl_FragColor.g;\n  float b = gl_FragColor.b;\n  if (r + g + b < 2.0) {\n    gl_FragColor = vec4( g, 0.0, 0.0, 1.0);\n  }\n}\n\n\nvoid main() {\n  float x = varUV.x;\n  float y = varUV.y;\n  // Les coordonnées (u,v) sont comprises entre 0.0 et 1.0\n  float u = (1.0 + x) / 2.0;\n  float v = (1.0 + y) / 2.0;\n  // Mouvement du centre qui permet de séparer l'affichage en 4.\n  float ang = varTime * 0.000314;\n  float r = cos(4581.15 + varTime * 0.000711);\n  float t= varTime * 0.002;\n  float cx = (cos(ang) + 0.35 * cos(t + y * 5.0)) * r;\n  float cy = (sin(ang) + 0.35 * cos(t + x * 5.0)) * r;\n\n  // Voici comment on lit un pixel dans une texture.\n  vec4 color = texture2D( uniTexture, vec2(u, v) );\n  // En fonction de la position du pixel courant par rapport\n  // au centre (cx, cy), on applique un effet ou un autre.\n  if (x < cx) {\n    if (y < cy) {\n      fx1(color, u, v, x, y);\n    } else {\n      fx2(color, u, v, x, y);\n    }\n  } else {\n    if (y < cy) {\n      fx3(color, u, v, x, y);\n    } else {\n      fx4(color, u, v, x, y);\n    }\n  }\n}\n"};
  // https://www.opengl.org/wiki/Primitive#Point_primitives

"use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");
var Webgl = require("tfw.webgl");
var ExplosiveTP = require("explosive-tp");


var Gl8 = function(opts) {
    var that = this;

    var canvas = $.elem( this, 'canvas' );

    DB.propInteger( this, 'width' )(function(v) {
        canvas.setAttribute( 'width', v );
        canvas.style.width = v + "px";
    });

    DB.propInteger( this, 'height' )(function(v) {
        canvas.setAttribute( 'height', v );
        canvas.style.height = v + "px";
    });

    DB.propBoolean( this, 'zindex' );

    opts = DB.extend({
        width: 640,
        height: 480,
        zbuffer: false
    }, opts, this);

    var webgl = new Webgl( canvas );
    var gl = webgl.gl;
    var explosive = new ExplosiveTP( canvas );

    var texture = webgl.createTextureForFB( 512, 512 );
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    var bufSquare = gl.createBuffer();
    var datSquare = new Float32Array([
            -1, -1, 0,
            -1, +1, 0,
            +1, -1, 0,
            +1, +1, 0
    ]);
   
    var prg = webgl.createProgram({ vertex: GLOBAL.vert, fragment: GLOBAL.frag });
    
    webgl.start(function(time) {
        gl.bindFramebuffer( gl.FRAMEBUFFER, fb );
        gl.clear( gl.COLOR_BUFFER_BIT );
        explosive.render( time );

        prg.use();
        gl.bindFramebuffer( gl.FRAMEBUFFER, null );
        gl.disable( gl.BLEND );
        gl.disable( gl.DEPTH_TEST );
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.bindBuffer( gl.ARRAY_BUFFER, bufSquare );
        gl.enableVertexAttribArray( prg.$attPosition );
        gl.vertexAttribPointer( prg.$attPosition, 3, gl.FLOAT, false, 0, 0 );
        gl.bufferData( gl.ARRAY_BUFFER, datSquare, gl.STATIC_DRAW );
        gl.bindTexture( gl.TEXTURE_2D, texture );
        prg.$uniTime = time;
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );       
    });
};


module.exports = Gl8;



  
module.exports._ = _;
/**
 * @module wdg.gl8
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:tfw.webgl
 * @see module:explosive-tp

 */
});