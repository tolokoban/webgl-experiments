<<<<<<< HEAD
require("wdg.gl8",function(e,n){function r(){return o(t,arguments)}var t={en:{}},o=require("$").intl,i=require("dom"),u=require("tfw.data-binding"),a=require("tfw.webgl"),l=require("explosive-tp"),f=function(e){var n=i.elem(this,"canvas");u.propInteger(this,"width")(function(e){n.setAttribute("width",e),n.style.width=e+"px"}),u.propInteger(this,"height")(function(e){n.setAttribute("height",e),n.style.height=e+"px"}),u.propBoolean(this,"zindex"),e=u.extend({width:640,height:480,zbuffer:!1},e,this);var r=new a(n),t=r.gl,o=new l(n),f=r.createTextureForFB(512,512),v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,f,0),t.bindFramebuffer(t.FRAMEBUFFER,null);var x=t.createBuffer(),s=new Float32Array([-1,-1,0,-1,1,0,1,-1,0,1,1,0]),g=r.createProgram({vertex:c.vert,fragment:c.frag});r.start(function(e){t.bindFramebuffer(t.FRAMEBUFFER,v),t.clear(t.COLOR_BUFFER_BIT),o.render(e),g.use(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,x),t.enableVertexAttribArray(g.$attPosition),t.vertexAttribPointer(g.$attPosition,3,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,s,t.STATIC_DRAW),t.bindTexture(t.TEXTURE_2D,f),g.$uniTime=e,t.drawArrays(t.TRIANGLE_STRIP,0,4)})};n.exports=f;var c={vert:"// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n\n// Passer les coordonnées UV pour la texture.\nvarying vec2 varUV;\nvarying float varTime;\n\nvoid main() {\n  float x = attPosition.x;\n  float y = attPosition.y;\n  float z = 0.0;\n\n  gl_Position = vec4(x, y, z, 1.0 );\n\n  varUV = vec2( x, y );\n  varTime = uniTime;\n}\n",frag:"precision mediump float;\n\n// La texture créée à l'aide d'un Frame Buffer\nuniform sampler2D uniTexture;\n\n// Les coordonnées de l'écran, comprises entre -1.0 et +1.0\nvarying vec2 varUV;\n// Temps en millisecondes\nvarying float varTime;\n\n// Constante utilisée pour lire les pixels avoisinants.\nconst float S = 1.0 / 128.0;\n\n// La couleur fait-elle partie de l'arrière-plan ?\n// En fait, on vérifie qu'elle est blanche, ou proche du blanc.\nbool isBackground(vec4 color) {\n  if (color.r > .9 && color.g > .9 && color.b > .9) return true;\n  return false;\n}\n\n// Effet 1 : on prend l'image telle qu'elle est.\nvoid fx1(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color;\n}\n\n// Effet 2 : détextion de contour + seuil.\nvoid fx2(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color * 9.0\n    - texture2D( uniTexture, vec2(u - S, v - S) )\n    - texture2D( uniTexture, vec2(u    , v - S) )\n    - texture2D( uniTexture, vec2(u + S, v - S) )\n    - texture2D( uniTexture, vec2(u - S, v    ) )\n    - texture2D( uniTexture, vec2(u + S, v    ) )\n    - texture2D( uniTexture, vec2(u - S, v + S) )\n    - texture2D( uniTexture, vec2(u    , v + S) )\n    - texture2D( uniTexture, vec2(u + S, v + S) );\n  if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {\n    if (!isBackground(color)) {\n      gl_FragColor = vec4(1.0, 0.9 * u, 0.0, 1.0);\n    } \n  } else {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n  }\n}\n\n// Effet 3 : variation de couleur en fonction de la position.\nvoid fx3(vec4 color, float u, float v, float x, float y) {\n  if (isBackground(color)) gl_FragColor = color;\n  else gl_FragColor = vec4(1.0 - color.r * u, 1.0 - color.g * u * v, 1.0 - color.b * v, 1.0);\n}\n\n// Effet 4 : autre effet. On peut faire varier les coefficients de\n// 9 pixels utilisés, à condition que leur somme soit égale à 1.\nvoid fx4(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = - color * 7.0\n    + texture2D( uniTexture, vec2(u - S, v - S) )\n    + texture2D( uniTexture, vec2(u    , v - S) )\n    + texture2D( uniTexture, vec2(u + S, v - S) )\n    + texture2D( uniTexture, vec2(u - S, v    ) )\n    + texture2D( uniTexture, vec2(u + S, v    ) )\n    + texture2D( uniTexture, vec2(u - S, v + S) )\n    + texture2D( uniTexture, vec2(u    , v + S) )\n    + texture2D( uniTexture, vec2(u + S, v + S) );\n  float r = gl_FragColor.r;\n  float g = gl_FragColor.g;\n  float b = gl_FragColor.b;\n  if (r + g + b < 2.0) {\n    gl_FragColor = vec4( g, 0.0, 0.0, 1.0);\n  }\n}\n\n\nvoid main() {\n  float x = varUV.x;\n  float y = varUV.y;\n  // Les coordonnées (u,v) sont comprises entre 0.0 et 1.0\n  float u = (1.0 + x) / 2.0;\n  float v = (1.0 + y) / 2.0;\n  // Mouvement du centre qui permet de séparer l'affichage en 4.\n  float ang = varTime * 0.000314;\n  float r = cos(4581.15 + varTime * 0.000711);\n  float cx = cos(ang) * r;\n  float cy = sin(ang) * r;\n\n  // Voici comment on lit un pixel dans une texture.\n  vec4 color = texture2D( uniTexture, vec2(u, v) );\n  // En fonction de la position du pixel courant par rapport\n  // au centre (cx, cy), on applique un effet ou un autre.\n  if (x < cx) {\n    if (y < cy) {\n      fx1(color, u, v, x, y);\n    } else {\n      fx2(color, u, v, x, y);\n    }\n  } else {\n    if (y < cy) {\n      fx3(color, u, v, x, y);\n    } else {\n      fx4(color, u, v, x, y);\n    }\n  }\n}\n"};n.exports._=r});
=======
require("wdg.gl8",function(r,e,n){var t=function(){function e(){return t(n,arguments)}var n={en:{}},t=r("$").intl;return e.all=n,e}(),o={vert:"// Temps courant en millisecondes\r\nuniform float uniTime;\r\n\r\n// Position en valeurs comprises entre -1.0 et +1.0\r\nattribute vec2 attPosition;\r\n\r\n// Passer les coordonnées UV pour la texture.\r\nvarying vec2 varUV;\r\nvarying float varTime;\r\n\r\nvoid main() {\r\n  float x = attPosition.x;\r\n  float y = attPosition.y;\r\n  float z = 0.0;\r\n\r\n  gl_Position = vec4(x, y, z, 1.0 );\r\n\r\n  varUV = vec2( x, y );\r\n  varTime = uniTime;\r\n}\r\n",frag:"precision mediump float;\r\n\r\n// La texture créée à l'aide d'un Frame Buffer\r\nuniform sampler2D uniTexture;\r\n\r\n// Les coordonnées de l'écran, comprises entre -1.0 et +1.0\r\nvarying vec2 varUV;\r\n// Temps en millisecondes\r\nvarying float varTime;\r\n\r\n// Constante utilisée pour lire les pixels avoisinants.\r\nconst float S = 1.0 / 128.0;\r\n\r\n// La couleur fait-elle partie de l'arrière-plan ?\r\n// En fait, on vérifie qu'elle est blanche, ou proche du blanc.\r\nbool isBackground(vec4 color) {\r\n  if (color.r > .9 && color.g > .9 && color.b > .9) return true;\r\n  return false;\r\n}\r\n\r\n// Effet 1 : on prend l'image telle qu'elle est.\r\nvoid fx1(vec4 color, float u, float v, float x, float y) {\r\n  gl_FragColor = color;\r\n}\r\n\r\n// Effet 2 : détextion de contour + seuil.\r\nvoid fx2(vec4 color, float u, float v, float x, float y) {\r\n  gl_FragColor = color * 9.0\r\n    - texture2D( uniTexture, vec2(u - S, v - S) )\r\n    - texture2D( uniTexture, vec2(u    , v - S) )\r\n    - texture2D( uniTexture, vec2(u + S, v - S) )\r\n    - texture2D( uniTexture, vec2(u - S, v    ) )\r\n    - texture2D( uniTexture, vec2(u + S, v    ) )\r\n    - texture2D( uniTexture, vec2(u - S, v + S) )\r\n    - texture2D( uniTexture, vec2(u    , v + S) )\r\n    - texture2D( uniTexture, vec2(u + S, v + S) );\r\n  if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {\r\n    if (!isBackground(color)) {\r\n      gl_FragColor = vec4(1.0, 0.9 * u, 0.0, 1.0);\r\n    } \r\n  } else {\r\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\r\n  }\r\n}\r\n\r\n// Effet 3 : variation de couleur en fonction de la position.\r\nvoid fx3(vec4 color, float u, float v, float x, float y) {\r\n  if (isBackground(color)) gl_FragColor = color;\r\n  else gl_FragColor = vec4(1.0 - color.r * u, 1.0 - color.g * u * v, 1.0 - color.b * v, 1.0);\r\n}\r\n\r\n// Effet 4 : autre effet. On peut faire varier les coefficients de\r\n// 9 pixels utilisés, à condition que leur somme soit égale à 1.\r\nvoid fx4(vec4 color, float u, float v, float x, float y) {\r\n  gl_FragColor = - color * 7.0\r\n    + texture2D( uniTexture, vec2(u - S, v - S) )\r\n    + texture2D( uniTexture, vec2(u    , v - S) )\r\n    + texture2D( uniTexture, vec2(u + S, v - S) )\r\n    + texture2D( uniTexture, vec2(u - S, v    ) )\r\n    + texture2D( uniTexture, vec2(u + S, v    ) )\r\n    + texture2D( uniTexture, vec2(u - S, v + S) )\r\n    + texture2D( uniTexture, vec2(u    , v + S) )\r\n    + texture2D( uniTexture, vec2(u + S, v + S) );\r\n  float r = gl_FragColor.r;\r\n  float g = gl_FragColor.g;\r\n  float b = gl_FragColor.b;\r\n  if (r + g + b < 2.0) {\r\n    gl_FragColor = vec4( g, 0.0, 0.0, 1.0);\r\n  }\r\n}\r\n\r\n\r\nvoid main() {\r\n  float x = varUV.x;\r\n  float y = varUV.y;\r\n  // Les coordonnées (u,v) sont comprises entre 0.0 et 1.0\r\n  float u = (1.0 + x) / 2.0;\r\n  float v = (1.0 + y) / 2.0;\r\n  // Mouvement du centre qui permet de séparer l'affichage en 4.\r\n  float ang = varTime * 0.000314;\r\n  float r = cos(4581.15 + varTime * 0.000711);\r\n  float cx = cos(ang) * r;\r\n  float cy = sin(ang) * r;\r\n\r\n  // Voici comment on lit un pixel dans une texture.\r\n  vec4 color = texture2D( uniTexture, vec2(u, v) );\r\n  // En fonction de la position du pixel courant par rapport\r\n  // au centre (cx, cy), on applique un effet ou un autre.\r\n  if (x < cx) {\r\n    if (y < cy) {\r\n      fx1(color, u, v, x, y);\r\n    } else {\r\n      fx2(color, u, v, x, y);\r\n    }\r\n  } else {\r\n    if (y < cy) {\r\n      fx3(color, u, v, x, y);\r\n    } else {\r\n      fx4(color, u, v, x, y);\r\n    }\r\n  }\r\n}\r\n"},u=r("dom"),i=r("tfw.data-binding"),l=r("tfw.webgl"),a=r("explosive-tp"),f=function(r){var e=u.elem(this,"canvas");i.propInteger(this,"width")(function(r){e.setAttribute("width",r),e.style.width=r+"px"}),i.propInteger(this,"height")(function(r){e.setAttribute("height",r),e.style.height=r+"px"}),i.propBoolean(this,"zindex"),r=i.extend({width:640,height:480,zbuffer:!1},r,this);var n=new l(e),t=n.gl,f=new a(e),c=n.createTextureForFB(512,512),v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.bindFramebuffer(t.FRAMEBUFFER,null);var x=t.createBuffer(),s=new Float32Array([-1,-1,0,-1,1,0,1,-1,0,1,1,0]),g=n.createProgram({vertex:o.vert,fragment:o.frag});n.start(function(r){t.bindFramebuffer(t.FRAMEBUFFER,v),t.clear(t.COLOR_BUFFER_BIT),f.render(r),g.use(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,x),t.enableVertexAttribArray(g.$attPosition),t.vertexAttribPointer(g.$attPosition,3,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,s,t.STATIC_DRAW),t.bindTexture(t.TEXTURE_2D,c),g.$uniTime=r,t.drawArrays(t.TRIANGLE_STRIP,0,4)})};e.exports=f,e.exports._=t});
>>>>>>> ed60770fef43ceb6207a072673d058559ad5436c
//# sourceMappingURL=wdg.gl8.js.map