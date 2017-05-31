<<<<<<< HEAD
require("wdg.gl4",function(n,e){function t(){return h(f,arguments)}function i(n){function e(t){r.uniform1f(d,n.width),r.uniform1f(x,n.height),r.uniform1f(g,t),r.uniform1f(m,t),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.drawArrays(r.TRIANGLE_STRIP,0,4),window.requestAnimationFrame(e)}var t=c.vertex,i=c["fragment-"+this.fragment],r=n.getContext("webgl")||n.getContext("experimental-webgl"),f=r.createProgram();r.attachShader(f,a(r,t)),r.attachShader(f,o(r,i)),r.linkProgram(f),r.useProgram(f);var h=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,h);var s=n.width,u=n.height;r.bufferData(r.ARRAY_BUFFER,new Float32Array([0,0,0,s,0,0,0,u,0,s,u,0]),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,h);var l=r.getAttribLocation(f,"attVertexPosition");r.enableVertexAttribArray(l),r.vertexAttribPointer(l,3,r.FLOAT,!1,0,0);var g=r.getUniformLocation(f,"uniTimeV"),m=r.getUniformLocation(f,"uniTimeF"),d=r.getUniformLocation(f,"uniWidth"),x=r.getUniformLocation(f,"uniHeight");window.requestAnimationFrame(e)}function r(n,e,t){var i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(console.log(t),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(i)),null)}function o(n,e){return r(n.FRAGMENT_SHADER,n,e)}function a(n,e){return r(n.VERTEX_SHADER,n,e)}var f={en:{}},h=require("$").intl,s=require("dom"),u=require("tfw.data-binding"),l=function(n){var e=s.elem(this,"canvas");u.propInteger(this,"width")(function(n){e.setAttribute("width",n),e.style.width=n+"px"}),u.propInteger(this,"height")(function(n){e.setAttribute("height",n),e.style.height=n+"px"}),u.propString(this,"fragment"),n=u.extend({width:640,height:480,fragment:"a"},n,this),window.setTimeout(i.bind(this,e),20)};e.exports=l;var c={vertex:"attribute vec3 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nuniform lowp float uniTimeV;\n\nvarying lowp vec3 varVertexPosition;\n\nvoid main() {\n  highp float time = uniTimeV;\n\n  varVertexPosition = attVertexPosition;\n  \n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n\n  float speed = 0.0;\n\n  if (x < 0.0) {\n    if (y < 0.0) {\n      speed = 1600.0;\n    } else {\n      speed = 1643.0;\n    }\n  } else {\n    if (y < 0.0) {\n      speed = 1703.0;\n    } else {\n      speed = 1742.0;\n    }\n  }\n\n  float radius = 0.5 + (cos(time / speed) + 1.0) / 4.0;\n  gl_Position = vec4( x * radius, y * radius, 0.0, 1.0 );\n}\n","fragment-a":"const highp float PI = 3.1415926539;\nconst lowp vec3 COLOR0 = vec3(0.7, 0.9, 1.0);\nconst lowp vec3 COLOR1 = vec3(0.0, 0.7, 0.9);\n\nvarying lowp vec3 varVertexPosition;\n\nuniform lowp float uniTimeF;\n\nvoid main() {\n  highp float time = uniTimeF / 700.0;\n  \n  lowp float x = varVertexPosition.x + time * 120.0;\n  lowp float y = varVertexPosition.y + sin(time) * 15.0;\n  \n  lowp float xx = x / 10.0;\n  lowp float yy = y / 10.0;\n  \n  lowp float h = cos(yy) * cos(xx) + sin(yy);\n  h = cos( PI * h + time);\n  \n  h = (1.0 + h) / 2.0;\n  gl_FragColor = vec4( h * COLOR0 + (1.0 - h) * COLOR1, 1.0);\n}\n"};e.exports._=t});
=======
require("wdg.gl4",function(r,n,t){function e(r){function n(t){i.uniform1f(d,r.width),i.uniform1f(x,r.height),i.uniform1f(g,t),i.uniform1f(m,t),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),i.drawArrays(i.TRIANGLE_STRIP,0,4),window.requestAnimationFrame(n)}var t=l.vertex,e=l["fragment-"+this.fragment],i=r.getContext("webgl")||r.getContext("experimental-webgl"),f=i.createProgram();i.attachShader(f,a(i,t)),i.attachShader(f,o(i,e)),i.linkProgram(f),i.useProgram(f);var h=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,h);var s=r.width,u=r.height;i.bufferData(i.ARRAY_BUFFER,new Float32Array([0,0,0,s,0,0,0,u,0,s,u,0]),i.STATIC_DRAW),i.bindBuffer(i.ARRAY_BUFFER,h);var c=i.getAttribLocation(f,"attVertexPosition");i.enableVertexAttribArray(c),i.vertexAttribPointer(c,3,i.FLOAT,!1,0,0);var g=i.getUniformLocation(f,"uniTimeV"),m=i.getUniformLocation(f,"uniTimeF"),d=i.getUniformLocation(f,"uniWidth"),x=i.getUniformLocation(f,"uniHeight");window.requestAnimationFrame(n)}function i(r,n,t){var e=n.createShader(r);return n.shaderSource(e,t),n.compileShader(e),n.getShaderParameter(e,n.COMPILE_STATUS)?e:(console.log(t),console.error("An error occurred compiling the shader: "+n.getShaderInfoLog(e)),null)}function o(r,n){return i(r.FRAGMENT_SHADER,r,n)}function a(r,n){return i(r.VERTEX_SHADER,r,n)}var f=function(){function n(){return e(t,arguments)}var t={en:{}},e=r("$").intl;return n.all=t,n}(),l={vertex:"attribute vec3 attVertexPosition;\r\n\r\nuniform float uniWidth;\r\nuniform float uniHeight;\r\n\r\nuniform lowp float uniTimeV;\r\n\r\nvarying lowp vec3 varVertexPosition;\r\n\r\nvoid main() {\r\n  highp float time = uniTimeV;\r\n\r\n  varVertexPosition = attVertexPosition;\r\n  \r\n  float x = attVertexPosition.x;\r\n  float y = attVertexPosition.y;\r\n\r\n  x = (2.0 * x / uniWidth) - 1.0;\r\n  y = 1.0 - (2.0 * y / uniHeight);\r\n\r\n  float speed = 0.0;\r\n\r\n  if (x < 0.0) {\r\n    if (y < 0.0) {\r\n      speed = 1600.0;\r\n    } else {\r\n      speed = 1643.0;\r\n    }\r\n  } else {\r\n    if (y < 0.0) {\r\n      speed = 1703.0;\r\n    } else {\r\n      speed = 1742.0;\r\n    }\r\n  }\r\n\r\n  float radius = 0.5 + (cos(time / speed) + 1.0) / 4.0;\r\n  gl_Position = vec4( x * radius, y * radius, 0.0, 1.0 );\r\n}\r\n","fragment-a":"const highp float PI = 3.1415926539;\r\nconst lowp vec3 COLOR0 = vec3(0.7, 0.9, 1.0);\r\nconst lowp vec3 COLOR1 = vec3(0.0, 0.7, 0.9);\r\n\r\nvarying lowp vec3 varVertexPosition;\r\n\r\nuniform lowp float uniTimeF;\r\n\r\nvoid main() {\r\n  highp float time = uniTimeF / 700.0;\r\n  \r\n  lowp float x = varVertexPosition.x + time * 120.0;\r\n  lowp float y = varVertexPosition.y + sin(time) * 15.0;\r\n  \r\n  lowp float xx = x / 10.0;\r\n  lowp float yy = y / 10.0;\r\n  \r\n  lowp float h = cos(yy) * cos(xx) + sin(yy);\r\n  h = cos( PI * h + time);\r\n  \r\n  h = (1.0 + h) / 2.0;\r\n  gl_FragColor = vec4( h * COLOR0 + (1.0 - h) * COLOR1, 1.0);\r\n}\r\n"},h=r("dom"),s=r("tfw.data-binding"),u=function(r){var n=h.elem(this,"canvas");s.propInteger(this,"width")(function(r){n.setAttribute("width",r),n.style.width=r+"px"}),s.propInteger(this,"height")(function(r){n.setAttribute("height",r),n.style.height=r+"px"}),s.propString(this,"fragment"),r=s.extend({width:640,height:480,fragment:"a"},r,this),window.setTimeout(e.bind(this,n),20)};n.exports=u,n.exports._=f});
>>>>>>> ed60770fef43ceb6207a072673d058559ad5436c
//# sourceMappingURL=wdg.gl4.js.map