require("wdg.gl1",function(t,e){function r(){return h(u,arguments)}function n(t){function e(n){r.uniform1f(h,t.width),r.uniform1f(g,t.height),r.clearColor(0,0,1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.drawArrays(r.TRIANGLE_STRIP,0,4),requestAnimationFrame(e)}var r=t.getContext("webgl")||t.getContext("experimental-webgl"),n=r.createProgram();r.attachShader(n,a(r,d.vertex)),r.attachShader(n,o(r,d.fragment)),r.linkProgram(n),r.useProgram(n);var i=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,new Float32Array([20,20,0,120,20,0,20,120,0,120,120,0]),r.STATIC_DRAW);var u=r.getAttribLocation(n,"attVertexPosition");r.enableVertexAttribArray(u),r.vertexAttribPointer(u,3,r.FLOAT,!1,0,0);var h=r.getUniformLocation(n,"uniWidth"),g=r.getUniformLocation(n,"uniHeight");requestAnimationFrame(e)}function i(t,e,r){var n=e.createShader(t);return e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.log(r),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(n)),null)}function o(t,e){return i(t.FRAGMENT_SHADER,t,e)}function a(t,e){return i(t.VERTEX_SHADER,t,e)}var u={en:{}},h=require("$").intl,g=require("dom"),f=require("tfw.data-binding"),c=function(t){var e=g.elem(this,"canvas");f.propInteger(this,"width")(function(t){e.setAttribute("width",t),e.style.width=t+"px"}),f.propInteger(this,"height")(function(t){e.setAttribute("height",t),e.style.height=t+"px"}),t=f.extend({width:640,height:480},t,this),window.setTimeout(n.bind(this,e),20)};e.exports=c;var d={vertex:"attribute vec3 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nvoid main() {\n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n\n  gl_Position = vec4( x, y, 0.0, 1.0 );\n}\n",fragment:"void main() {\n  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);\n}\n"};e.exports._=r});
//# sourceMappingURL=wdg.gl1.js.map