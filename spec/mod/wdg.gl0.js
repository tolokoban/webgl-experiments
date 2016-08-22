require("wdg.gl0",function(e,t){function r(){return c(o,arguments)}function n(e,t,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.log(r),console.error("An error occurred compiling the shader: "+t.getShaderInfoLog(n)),null)}function i(e,t){return n(e.FRAGMENT_SHADER,e,t)}function a(e,t){return n(e.VERTEX_SHADER,e,t)}var o={en:{}},c=require("$").intl,g=require("dom"),h=require("tfw.data-binding"),u=function(e){var t=g.elem(this,"canvas");h.propInteger(this,"width")(function(e){t.setAttribute("width",e),t.style.width=e+"px"}),h.propInteger(this,"height")(function(e){t.setAttribute("height",e),t.style.height=e+"px"}),e=h.extend({width:640,height:480},e,this);var r=t.getContext("webgl")||t.getContext("experimental-webgl"),n=r.createProgram();r.attachShader(n,a(r,l.vertex)),r.attachShader(n,i(r,l.fragment)),r.linkProgram(n),r.useProgram(n);var o=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,o),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-.8,.8,0,.8,-.8,0,-.8,-.8,0]),r.STATIC_DRAW);var c=r.getAttribLocation(n,"attVertexPosition");r.enableVertexAttribArray(c),r.vertexAttribPointer(c,3,r.FLOAT,!1,0,0),r.clearColor(0,0,1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.drawArrays(r.TRIANGLE_STRIP,0,3)};t.exports=u;var l={vertex:"attribute vec3 attVertexPosition;\n\nvoid main() {\n  gl_Position = vec4(\n      attVertexPosition.x, attVertexPosition.y,\n      0.0, 1.0);\n}\n",fragment:"void main() {\n  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);\n}\n"};t.exports._=r});
//# sourceMappingURL=wdg.gl0.js.map