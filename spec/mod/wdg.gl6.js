require("wdg.gl6",function(r,e){function n(){return c(u,arguments)}function t(r){function e(r){var t,a,i,l,s=r/566,g=Math.cos(s),f=Math.sin(s),v=r/979,A=Math.cos(v),h=Math.sin(v),_=g,p=0,b=f,E=f*h,P=A,C=-g*h,m=-f*A,F=h,R=g*A;for(l=0;l<u;l++)t=d[3*l+0],a=d[3*l+1],i=d[3*l+2],c[6*l+0]=t*_+a*p+i*b,c[6*l+1]=t*E+a*P+i*C,c[6*l+2]=t*m+a*F+i*R;n.bindBuffer(n.ARRAY_BUFFER,o),n.bufferData(n.ARRAY_BUFFER,c,n.STATIC_DRAW),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.drawArrays(n.POINTS,0,u),window.requestAnimationFrame(e)}var n=r.getContext("webgl")||r.getContext("experimental-webgl"),t=n.createProgram();n.attachShader(t,i(n,f.vertex)),n.attachShader(t,a(n,f.fragment)),n.linkProgram(t),n.useProgram(t);var o=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,o);var u=6,c=new Float32Array(36);n.bufferData(n.ARRAY_BUFFER,c,n.STATIC_DRAW);for(var s,d=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],g=0;g<u;g++)s=l(),c[6*g+3]=s.r,c[6*g+4]=s.g,c[6*g+5]=s.b;var v=c.BYTES_PER_ELEMENT,A=6*v,h=n.getAttribLocation(t,"attPosition");n.enableVertexAttribArray(h),n.vertexAttribPointer(h,3,n.FLOAT,!1,A,0);var _=n.getAttribLocation(t,"attColor");n.enableVertexAttribArray(_),n.vertexAttribPointer(_,3,n.FLOAT,!1,A,3*v),Boolean(this.zbuffer)?(n.enable(n.DEPTH_TEST),n.depthFunc(n.LEQUAL),n.disable(n.BLEND),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA)):(n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.disable(n.DEPTH_TEST)),n.clearColor(0,0,0,1),n.bindBuffer(n.ARRAY_BUFFER,o),window.requestAnimationFrame(e)}function o(r,e,n){var t=e.createShader(r);return e.shaderSource(t,n),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.log(n),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(t)),null)}function a(r,e){return o(r.FRAGMENT_SHADER,r,e)}function i(r,e){return o(r.VERTEX_SHADER,r,e)}function l(){var r=Math.random(),e=Math.random(),n=Math.random();return r<e?n<r?(r=1,n=0):(r=1,e>n?n=0:e=0):e>n?(r=1,n=0):(e=0,r>n?r=1:n=1),{r:r,g:e,b:n}}var u={en:{}},c=require("$").intl,s=require("dom"),d=require("tfw.data-binding"),g=function(r){var e=s.elem(this,"canvas");d.propInteger(this,"width")(function(r){e.setAttribute("width",r),e.style.width=r+"px"}),d.propInteger(this,"height")(function(r){e.setAttribute("height",r),e.style.height=r+"px"}),d.propBoolean(this,"zindex"),r=d.extend({width:640,height:480,zbuffer:!1},r,this),window.setTimeout(t.bind(this,e),20)};e.exports=g;var f={vertex:"attribute vec3 attPosition;\r\nattribute vec3 attColor;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nvoid main() {\r\n  float z = attPosition.z;\r\n  // Dans une projection 3D, les points éloignés de la caméra\r\n  // paraissent plus petits et plus proches les uns des autres.\r\n  // Cette variable permet de créer cet effet.\r\n  float depth = (2.0 - z) / 3.0;\r\n  gl_Position = vec4(attPosition.xy * depth, z, 1.0);\r\n\r\n  // La taille du point dépend aussi de la profondeur.\r\n  gl_PointSize = 150.0 * depth;\r\n  varPosition = attPosition;\r\n  varColor = attColor;\r\n}\r\n",fragment:"precision mediump float;\r\n\r\nvarying vec3 varPosition;\r\nvarying vec3 varColor;\r\n\r\nconst vec3 WHITE = vec3(1.0, 1.0, 1.0);\r\n\r\nvoid main() {\r\n  // Calculons la distance du fragment courant\r\n  // au centre du point.\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  // On ne calcule pas la racine carré pour gagner du temps.\r\n  float r = x*x + y*y;\r\n\r\n  x = gl_PointCoord.x;\r\n  y = gl_PointCoord.y;\r\n\r\n  // 0.25 = 0.5 * 0.5\r\n  if (r > 0.25) {\r\n    // Si on est à l'extérieur du cercle de rayon 0.5,\r\n    // on place un fragment transparent.\r\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );\r\n  } else if (r > .2 ) {\r\n    // Au delà d'un certain rayon, on met une couleur fixe\r\n    // qui nous sert de liseré.\r\n    gl_FragColor = vec4(varColor, 1.0);\r\n  } else {\r\n    // Petit effet de dégradé.\r\n    vec3 col = x * varColor + y * WHITE;\r\n    gl_FragColor = vec4( col, 1.0 );\r\n  }\r\n  // La luminosité varie avec la profondeur du point.\r\n  // En `z = 0.0`, la boule est noire.\r\n  gl_FragColor = vec4( gl_FragColor.rgb * (1.0 - varPosition.z) / 2.0, gl_FragColor.a);\r\n}\r\n"};e.exports._=n});
//# sourceMappingURL=wdg.gl6.js.map