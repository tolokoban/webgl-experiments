require("wdg.gl3",function(t,n){function r(){return s(l,arguments)}function e(t){var n=t.getContext("webgl")||t.getContext("experimental-webgl");console.info("[wdg.gl3] 'fragment-' + this.fragment=...","fragment-"+this.fragment);var r=n.createProgram();n.attachShader(r,a(n,c.vertex)),n.attachShader(r,o(n,c["fragment-"+this.fragment])),n.linkProgram(r),n.useProgram(r);var e=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,e);for(var i,l,s=t.width,g=t.height,f=[s/2,g/2,0],h=99,u=.45*Math.min(s,g),d=0;d<=h;d++)l=2*Math.PI*d/h,i=u*(.9+.1*Math.cos(7*l)),f.push(s/2+i*Math.cos(l)),f.push(g/2+i*Math.sin(l)),f.push(0);n.bufferData(n.ARRAY_BUFFER,new Float32Array(f),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,e);var v=n.getAttribLocation(r,"attVertexPosition");n.enableVertexAttribArray(v),n.vertexAttribPointer(v,3,n.FLOAT,!1,0,0);var x=n.getUniformLocation(r,"uniWidth"),m=n.getUniformLocation(r,"uniHeight");n.uniform1f(x,t.width),n.uniform1f(m,t.height),n.clearColor(0,0,1,1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.drawArrays(n.TRIANGLE_FAN,0,h+2)}function i(t,n,r){var e=n.createShader(t);return n.shaderSource(e,r),n.compileShader(e),n.getShaderParameter(e,n.COMPILE_STATUS)?e:(console.log(r),console.error("An error occurred compiling the shader: "+n.getShaderInfoLog(e)),null)}function o(t,n){return i(t.FRAGMENT_SHADER,t,n)}function a(t,n){return i(t.VERTEX_SHADER,t,n)}var l={en:{}},s=require("$").intl,g=require("dom"),f=require("tfw.data-binding"),h=function(t){var n=g.elem(this,"canvas");f.propInteger(this,"width")(function(t){n.setAttribute("width",t),n.style.width=t+"px"}),f.propInteger(this,"height")(function(t){n.setAttribute("height",t),n.style.height=t+"px"}),f.propString(this,"fragment"),t=f.extend({width:640,height:480,fragment:"a"},t,this),window.setTimeout(e.bind(this,n),20)};n.exports=h;var c={vertex:"attribute vec3 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nvarying lowp vec3 varVertexPosition;\n\nvoid main() {\n  varVertexPosition = attVertexPosition;\n  \n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n\n  gl_Position = vec4( x, y, 0.0, 1.0 );\n}\n","fragment-a":"varying lowp vec3 varVertexPosition;\n\nvoid main() {\n  if (mod( varVertexPosition.x, 20.0 ) > 6.0) {\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n  } else {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n  }\n}\n","fragment-b":"varying lowp vec3 varVertexPosition;\n\nvoid main() {\n  lowp float x = varVertexPosition.x;\n  lowp float y = varVertexPosition.y;\n\n  highp float radius = sqrt( (x*x) + (y*y) );\n\n  highp float r = abs( cos( radius / 77.12 ) );\n  highp float g = abs( cos( radius / 33.27 ) );\n  highp float b = abs( cos( radius / 62.43 ) );\n  \n  gl_FragColor = vec4( r, g, b, 1.0 );\n}\n","fragment-c":"varying lowp vec3 varVertexPosition;\n\nvoid main() {\n  // Couleur de la trame.\n  lowp float r1 = 1.0;\n  lowp float g1 = 0.5;\n  lowp float b1 = 0.0;\n  // Couleur du fond.\n  lowp float r2 = 0.0;\n  lowp float g2 = 0.0;\n  lowp float b2 = 1.0;\n\n  lowp float x = mod( varVertexPosition.x, 16.0 ) - 8.0;\n  lowp float y = mod( varVertexPosition.y, 16.0 ) - 8.0;\n\n  highp float radius = sqrt( (x*x) + (y*y) );\n\n  highp float dist = sqrt( varVertexPosition.x * varVertexPosition.x \n                           + varVertexPosition.y * varVertexPosition.y );\n  dist = dist / 300.0;\n  \n  lowp float limit = dist * 9.0;\n\n  if( radius < limit ) gl_FragColor = vec4( r1, g1, b1, 1.0 );\n  else {\n    // Ici, on fait de l'anti-aliasing.\n    lowp float c2 = clamp( radius - limit, 0.0, 1.0 );\n    lowp float c1 = 1.0 - c2;\n    gl_FragColor = vec4( c1 * r1 + c2 * r2, \n                         c1 * g1 + c2 * g2, \n                         c1 * b1 + c2 * b2, \n                         1.0 );\n  }\n}\n"};n.exports._=r});
//# sourceMappingURL=wdg.gl3.js.map