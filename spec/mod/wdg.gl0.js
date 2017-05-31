require("wdg.gl0",function(e,t){function r(){return s(o,arguments)}function n(e,t,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.log(r),console.error("An error occurred compiling the shader: "+t.getShaderInfoLog(n)),null)}function a(e,t){return n(e.FRAGMENT_SHADER,e,t)}function i(e,t){return n(e.VERTEX_SHADER,e,t)}var o={en:{}},s=require("$").intl,l=require("dom"),u=require("tfw.data-binding"),c=function(e){var t=l.elem(this,"canvas");u.propInteger(this,"width")(function(e){t.setAttribute("width",e),t.style.width=e+"px"}),u.propInteger(this,"height")(function(e){t.setAttribute("height",e),t.style.height=e+"px"}),e=u.extend({width:640,height:480},e,this);var r=t.getContext("webgl")||t.getContext("experimental-webgl"),n=r.createProgram();r.attachShader(n,i(r,d.vertex)),r.attachShader(n,a(r,d.fragment)),r.linkProgram(n),r.useProgram(n);var o=new Float32Array([-.4,.8,1,0,0,.8,-.8,0,1,0,-.8,-.8,0,0,1]),s=o.BYTES_PER_ELEMENT,c=5*s,g=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,g),r.bufferData(r.ARRAY_BUFFER,o,r.STATIC_DRAW);var v=r.getAttribLocation(n,"attI");r.enableVertexAttribArray(v),r.vertexAttribPointer(v,1,r.FLOAT,!1,c,0);var p=r.getAttribLocation(n,"attJ");r.enableVertexAttribArray(p),r.vertexAttribPointer(p,1,r.FLOAT,!1,c,1*s);var h=r.getAttribLocation(n,"attC");r.enableVertexAttribArray(h),r.vertexAttribPointer(h,3,r.FLOAT,!1,c,2*s),r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.drawArrays(r.TRIANGLE_STRIP,0,3)};t.exports=c;var d={vertex:"attribute float attI;\nattribute float attJ;\n// `vec3` est un vecteur à trois dimensions.\n// On peut lire les valeurs de ces dimensions\n// de plusieurs façons :\n//   * attC.r == attC.x\n//   * attC.g == attC.y\n//   * attC.b == attC.z\nattribute vec3 attC;\n\n// Les `varying` sont des variables qu'on peut\n// passer du vertex shader au fragment shader.\n// Leurs valeurs sont interpolées entre les\n// vertex les plus proches.\nvarying vec3 varColor;\n\n\n// La fonction principale d'un shader soit toujours\n// s'appeler `main`, n'avoir aucun argument et\n// ne rien retourner.\nvoid main() {\n  // `gl_Position` est une variable SPECIALE de WebGL.\n  // Il faut obligatoirement la renseigner pour\n  // définir les coordonnées du vertex résultant.\n  gl_Position = vec4( attI, attJ, 0.0, 1.0 );\n  // On transmet la couleur au fragment color.\n  varColor = attC;\n}\n",fragment:"// Préciser la précision par défaut.\n// Une ligne qu'il est conseillé de mettre\n// au début de tous vos fragment shaders\n// pour éviter de devoir préciser la précision\n// à chaque déclaration de variable.\n// Les précisions possibles sont\n// lowp, mediump et highp.\nprecision mediump float;\n\nvarying vec3 varColor;\n\nvoid main() {\n  // `gl_FragColor` est une variable SPECIALE de WebGL.\n  // Elle permet de déterminer la couleur du fragment.\n  // C'est un vecteur à 4 dimensions : rouge, vert, bleu\n  // et alpha (l'opacité). Toutes les valeurs sont entre\n  // 0.0 et 1.0.\n  gl_FragColor = vec4(varColor.rgb, 1.0);\n}\n"};t.exports._=r});
//# sourceMappingURL=wdg.gl0.js.map