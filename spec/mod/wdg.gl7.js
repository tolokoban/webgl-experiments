require("wdg.gl7",function(t,n,e){function a(t,n){function e(t){window.requestAnimationFrame(e),a.clear(a.COLOR_BUFFER_BIT),a.uniform1f(E,t),a.drawArrays(a.POINTS,0,v)}var a=t.getContext("webgl")||t.getContext("experimental-webgl"),r=a.createProgram();a.attachShader(r,i(a,d.vertex)),a.attachShader(r,o(a,d.fragment)),a.linkProgram(r),a.useProgram(r);for(var s=a.getProgramParameter(r,a.ACTIVE_ATTRIBUTES),u=0;u<s;u++)console.log(a.getActiveAttrib(r,u));var c=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,c);var m,g,f=0,h=l(n),p=[];for(g=0;g<n.height;g++)for(m=0;m<n.width;m++)h[f]+h[f+1]+h[f+2]<50&&h[f+3]>240&&p.push([2*m/n.width-1,1-2*g/n.height]),f+=4;var v=p.length,A=[];p.forEach(function(t){A.push(t[0]),A.push(t[1]),A.push(Math.random()),A.push(Math.random()),A.push(Math.random()),A.push(Math.random())});var x=new Float32Array(A);a.bufferData(a.ARRAY_BUFFER,x,a.STATIC_DRAW);var R=x.BYTES_PER_ELEMENT,b=6*R,y=a.getAttribLocation(r,"attPosition");a.enableVertexAttribArray(y),a.vertexAttribPointer(y,2,a.FLOAT,!1,b,0);var C=a.getAttribLocation(r,"attRandom");a.enableVertexAttribArray(C),a.vertexAttribPointer(C,4,a.FLOAT,!1,b,2*R),a.disable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE),a.blendEquation(a.FUNC_ADD);var E=a.getUniformLocation(r,"uniTime");a.clearColor(1,1,1,1),a.bindBuffer(a.ARRAY_BUFFER,c),window.requestAnimationFrame(e)}function r(t,n,e){var a=n.createShader(t);return n.shaderSource(a,e),n.compileShader(a),n.getShaderParameter(a,n.COMPILE_STATUS)?a:(console.log(e),console.error("An error occurred compiling the shader: "+n.getShaderInfoLog(a)),null)}function o(t,n){return r(t.FRAGMENT_SHADER,t,n)}function i(t,n){return r(t.VERTEX_SHADER,t,n)}function l(t){var n=t.width,e=t.height,a=document.createElement("canvas");a.setAttribute("width",n),a.setAttribute("height",e);var r=a.getContext("2d");return r.drawImage(t,0,0),document.body.appendChild(a),r.getImageData(0,0,n,e).data}var s=function(){function n(){return a(e,arguments)}var e={en:{}},a=t("$").intl;return n.all=e,n}(),d={vertex:'// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\n// Ces valeurs donnent la "personnalité" de la particule\nattribute vec4 attRandom;\n\n// Couleur pour le fragment shader\nvarying vec3 varColor;\n// Indique au fragment shader si les particules sont\n// en place (1.0) ou en mouvement désordonné (0.0)\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  // Position "en place" de la particule.\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  // Créer un léger mouvement autour de la position normale.\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  // Coordonnées aléatoires en rotation dans tout l\'espace.\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  // Dans un cycle de 12 secondes, l\'image est stable\n  // pendant 8 secondes et en vrac pendant 4.\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  // Petites variations de vert.\n  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );\n  // La position est intrerpolée entre (x,y) et (xx,yy).\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  // Palpitation de la taille et diminution lors de la phase de désordre.\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\n}\n',fragment:"precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\n}\n"},u=t("dom"),c=t("tfw.data-binding"),m=function(t){var n=u.elem(this,"canvas");c.propInteger(this,"width")(function(t){n.setAttribute("width",t),n.style.width=t+"px"}),c.propInteger(this,"height")(function(t){n.setAttribute("height",t),n.style.height=t+"px"}),c.propBoolean(this,"zindex"),t=c.extend({width:640,height:480,zbuffer:!1},t,this);var e=new Image;e.src="css/wdg.gl7/tp.png",e.onload=a.bind(this,n,e)};n.exports=m,n.exports._=s});
//# sourceMappingURL=wdg.gl7.js.map