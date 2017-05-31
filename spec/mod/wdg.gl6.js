<<<<<<< HEAD
require("wdg.gl6",function(e,n){function r(){return c(u,arguments)}function t(e){function n(e){var t,a,i,l,s=e/566,f=Math.cos(s),g=Math.sin(s),v=e/979,A=Math.cos(v),h=Math.sin(v),p=f,_=0,b=g,E=g*h,P=A,m=-f*h,C=-g*A,R=h,F=f*A;for(l=0;l<u;l++)t=d[3*l+0],a=d[3*l+1],i=d[3*l+2],c[6*l+0]=t*p+a*_+i*b,c[6*l+1]=t*E+a*P+i*m,c[6*l+2]=t*C+a*R+i*F;r.bindBuffer(r.ARRAY_BUFFER,o),r.bufferData(r.ARRAY_BUFFER,c,r.STATIC_DRAW),r.clear(r.COLOR_BUFFER_BIT),r.drawArrays(r.POINTS,0,u),window.requestAnimationFrame(n)}var r=e.getContext("webgl")||e.getContext("experimental-webgl"),t=r.createProgram();r.attachShader(t,i(r,g.vertex)),r.attachShader(t,a(r,g.fragment)),r.linkProgram(t),r.useProgram(t);var o=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,o);var u=6,c=new Float32Array(36);r.bufferData(r.ARRAY_BUFFER,c,r.STATIC_DRAW);for(var s,d=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],f=0;f<u;f++)s=l(),c[6*f+3]=s.r,c[6*f+4]=s.g,c[6*f+5]=s.b;var v=c.BYTES_PER_ELEMENT,A=6*v,h=r.getAttribLocation(t,"attPosition");r.enableVertexAttribArray(h),r.vertexAttribPointer(h,3,r.FLOAT,!1,A,0);var p=r.getAttribLocation(t,"attColor");r.enableVertexAttribArray(p),r.vertexAttribPointer(p,3,r.FLOAT,!1,A,3*v),Boolean(this.zbuffer)?(r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.disable(r.BLEND),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA)):(r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.disable(r.DEPTH_TEST)),r.clearColor(1,1,1,1),r.bindBuffer(r.ARRAY_BUFFER,o),window.requestAnimationFrame(n)}function o(e,n,r){var t=n.createShader(e);return n.shaderSource(t,r),n.compileShader(t),n.getShaderParameter(t,n.COMPILE_STATUS)?t:(console.log(r),console.error("An error occurred compiling the shader: "+n.getShaderInfoLog(t)),null)}function a(e,n){return o(e.FRAGMENT_SHADER,e,n)}function i(e,n){return o(e.VERTEX_SHADER,e,n)}function l(){var e=Math.random(),n=Math.random(),r=Math.random();return e<n?r<e?(e=1,r=0):(e=1,n>r?r=0:n=0):n>r?(e=1,r=0):(n=0,e>r?e=1:r=1),{r:e,g:n,b:r}}var u={en:{}},c=require("$").intl,s=require("dom"),d=require("tfw.data-binding"),f=function(e){var n=s.elem(this,"canvas");d.propInteger(this,"width")(function(e){n.setAttribute("width",e),n.style.width=e+"px"}),d.propInteger(this,"height")(function(e){n.setAttribute("height",e),n.style.height=e+"px"}),d.propBoolean(this,"zindex"),e=d.extend({width:640,height:480,zbuffer:!1},e,this),window.setTimeout(t.bind(this,n),20)};n.exports=f;var g={vertex:"attribute vec3 attPosition;\nattribute vec3 attColor;\n\nvarying vec3 varPosition;\nvarying vec3 varColor;\n\nvoid main() {\n  float z = attPosition.z;\n  // Dans une projection 3D, les points éloignés de la caméra\n  // paraissent plus petits et plus proches les uns des autres.\n  // Cette variable permet de créer cet effet.\n  float depth = (2.0 - z) / 3.0;\n  gl_Position = vec4(attPosition.xy * depth, z, 1.0);\n\n  // La taille du point dépend aussi de la profondeur.\n  gl_PointSize = 150.0 * depth;\n  varPosition = attPosition;\n  varColor = attColor;\n}\n",fragment:"precision mediump float;\n\nvarying vec3 varPosition;\nvarying vec3 varColor;\n\nconst vec4 WHITE = vec4(1.0, 1.0, 1.0, 0.5);\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n\n  x = gl_PointCoord.x;\n  y = gl_PointCoord.y;\n\n  // 0.25 = 0.5 * 0.5\n  if (r > 0.25) {\n    // Si on est à l'extérieur du cercle de rayon 0.5,\n    // on place un fragment transparent.\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );\n  } else if (r > .2 ) {\n    // Au delà d'un certain rayon, on met une couleur fixe\n    // qui nous sert de liseré.\n    gl_FragColor = vec4(varColor, 1.0);\n  } else {\n    // Petit effet de dégradé.\n    vec3 col = x * varColor + y * WHITE.rgb;\n    gl_FragColor = vec4( col, 1.0 );\n  }\n  // La luminosité varie avec la profondeur du point.\n  // En `z = 0.0`, la boule est noire.\n  float coeff = (3.0 - varPosition.z) / 3.0;\n  gl_FragColor = coeff * gl_FragColor + (1.0 - coeff) * WHITE;\n}\n"};n.exports._=r});
=======
require("wdg.gl6",function(r,e,n){function t(r){function e(r){var t,a,i,l,u=r/566,d=Math.cos(u),g=Math.sin(u),v=r/979,A=Math.cos(v),h=Math.sin(v),p=d,_=g,b=g*h,E=A,P=-d*h,m=-g*A,C=h,R=d*A;for(l=0;l<c;l++)t=f[3*l+0],a=f[3*l+1],i=f[3*l+2],s[6*l+0]=t*p+0*a+i*_,s[6*l+1]=t*b+a*E+i*P,s[6*l+2]=t*m+a*C+i*R;n.bindBuffer(n.ARRAY_BUFFER,o),n.bufferData(n.ARRAY_BUFFER,s,n.STATIC_DRAW),n.clear(n.COLOR_BUFFER_BIT),n.drawArrays(n.POINTS,0,c),window.requestAnimationFrame(e)}var n=r.getContext("webgl")||r.getContext("experimental-webgl"),t=n.createProgram();n.attachShader(t,i(n,u.vertex)),n.attachShader(t,a(n,u.fragment)),n.linkProgram(t),n.useProgram(t);var o=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,o);var c=6,s=new Float32Array(36);n.bufferData(n.ARRAY_BUFFER,s,n.STATIC_DRAW);for(var d,f=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],g=0;g<c;g++)d=l(),s[6*g+3]=d.r,s[6*g+4]=d.g,s[6*g+5]=d.b;var v=s.BYTES_PER_ELEMENT,A=6*v,h=n.getAttribLocation(t,"attPosition");n.enableVertexAttribArray(h),n.vertexAttribPointer(h,3,n.FLOAT,!1,A,0);var p=n.getAttribLocation(t,"attColor");n.enableVertexAttribArray(p),n.vertexAttribPointer(p,3,n.FLOAT,!1,A,3*v),Boolean(this.zbuffer)?(n.enable(n.DEPTH_TEST),n.depthFunc(n.LEQUAL),n.disable(n.BLEND),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA)):(n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.disable(n.DEPTH_TEST)),n.clearColor(1,1,1,1),n.bindBuffer(n.ARRAY_BUFFER,o),window.requestAnimationFrame(e)}function o(r,e,n){var t=e.createShader(r);return e.shaderSource(t,n),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.log(n),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(t)),null)}function a(r,e){return o(r.FRAGMENT_SHADER,r,e)}function i(r,e){return o(r.VERTEX_SHADER,r,e)}function l(){var r=Math.random(),e=Math.random(),n=Math.random();return r<e?n<r?(r=1,n=0):(r=1,e>n?n=0:e=0):e>n?(r=1,n=0):(e=0,r>n?r=1:n=1),{r:r,g:e,b:n}}var c=function(){function e(){return t(n,arguments)}var n={en:{}},t=r("$").intl;return e.all=n,e}(),u={vertex:"attribute vec3 attPosition;\r\nattribute vec3 attColor;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nvoid main() {\r\n  float z = attPosition.z;\r\n  // Dans une projection 3D, les points éloignés de la caméra\r\n  // paraissent plus petits et plus proches les uns des autres.\r\n  // Cette variable permet de créer cet effet.\r\n  float depth = (2.0 - z) / 3.0;\r\n  gl_Position = vec4(attPosition.xy * depth, z, 1.0);\r\n\r\n  // La taille du point dépend aussi de la profondeur.\r\n  gl_PointSize = 150.0 * depth;\r\n  varPosition = attPosition;\r\n  varColor = attColor;\r\n}\r\n",fragment:"precision mediump float;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nconst vec4 WHITE = vec4(1.0, 1.0, 1.0, 0.5);\r\n\r\nvoid main() {\r\n  // Calculons la distance du fragment courant\r\n  // au centre du point.\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  // On ne calcule pas la racine carré pour gagner du temps.\r\n  float r = x*x + y*y;\r\n\r\n  x = gl_PointCoord.x;\r\n  y = gl_PointCoord.y;\r\n\r\n  // 0.25 = 0.5 * 0.5\r\n  if (r > 0.25) {\r\n    // Si on est à l'extérieur du cercle de rayon 0.5,\r\n    // on place un fragment transparent.\r\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );\r\n  } else if (r > .2 ) {\r\n    // Au delà d'un certain rayon, on met une couleur fixe\r\n    // qui nous sert de liseré.\r\n    gl_FragColor = vec4(varColor, 1.0);\r\n  } else {\r\n    // Petit effet de dégradé.\r\n    vec3 col = x * varColor + y * WHITE.rgb;\r\n    gl_FragColor = vec4( col, 1.0 );\r\n  }\r\n  // La luminosité varie avec la profondeur du point.\r\n  // En `z = 0.0`, la boule est noire.\r\n  float coeff = (3.0 - varPosition.z) / 3.0;\r\n  gl_FragColor = coeff * gl_FragColor + (1.0 - coeff) * WHITE;\r\n}\r\n"},s=r("dom"),d=r("tfw.data-binding"),f=function(r){var e=s.elem(this,"canvas");d.propInteger(this,"width")(function(r){e.setAttribute("width",r),e.style.width=r+"px"}),d.propInteger(this,"height")(function(r){e.setAttribute("height",r),e.style.height=r+"px"}),d.propBoolean(this,"zindex"),r=d.extend({width:640,height:480,zbuffer:!1},r,this),window.setTimeout(t.bind(this,e),20)};e.exports=f,e.exports._=c});
>>>>>>> ed60770fef43ceb6207a072673d058559ad5436c
//# sourceMappingURL=wdg.gl6.js.map