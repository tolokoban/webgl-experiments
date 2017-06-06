require("wdg.gl2",function(t,r,e){function n(t){var r=t.getContext("webgl")||t.getContext("experimental-webgl"),e=r.createProgram();r.attachShader(e,a(r,u.vertex)),r.attachShader(e,o(r,u.fragment)),r.linkProgram(e),r.useProgram(e);var n=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,n);var i=t.width,h=t.height,g=[i/2,h/2,0],l=Math.min(1e3,Math.max(3,this.size));console.info("[wdg.gl2] n=...",l);for(var s,c,f=.45*Math.min(i,h),d=0;d<=l;d++)c=2*Math.PI*d/l,s=f,this.regular||(s*=.5+Math.random()/2),g.push(i/2+s*Math.cos(c)),g.push(h/2+s*Math.sin(c)),g.push(0);console.info("[wdg.gl2] vertices=...",g),r.bufferData(r.ARRAY_BUFFER,new Float32Array(g),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,n);var m=r.getAttribLocation(e,"attVertexPosition");r.enableVertexAttribArray(m),r.vertexAttribPointer(m,3,r.FLOAT,!1,0,0);var A=r.getUniformLocation(e,"uniWidth"),x=r.getUniformLocation(e,"uniHeight");r.uniform1f(A,t.width),r.uniform1f(x,t.height),r.clearColor(0,0,1,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.drawArrays(r.TRIANGLE_FAN,0,l+2)}function i(t,r,e){var n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)?n:(console.log(e),console.error("An error occurred compiling the shader: "+r.getShaderInfoLog(n)),null)}function o(t,r){return i(t.FRAGMENT_SHADER,t,r)}function a(t,r){return i(t.VERTEX_SHADER,t,r)}var h=function(){function r(){return n(e,arguments)}var e={en:{}},n=t("$").intl;return r.all=e,r}(),u={vertex:"attribute vec2 attVertexPosition;\r\n\r\nuniform float uniWidth;\r\nuniform float uniHeight;\r\n\r\nvoid main() {\r\n  float x = attVertexPosition.x;\r\n  float y = attVertexPosition.y;\r\n\r\n  x = (2.0 * x / uniWidth) - 1.0;\r\n  y = 1.0 - (2.0 * y / uniHeight);\r\n\r\n  gl_Position = vec4( x, y, 0.0, 1.0 );\r\n}\r\n",fragment:"void main() {\r\n  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);\r\n}\r\n"},g=t("dom"),l=t("tfw.data-binding"),s=function(t){var r=this,e=g.elem(this,"canvas");l.propInteger(this,"width")(function(t){e.setAttribute("width",t),e.style.width=t+"px"}),l.propInteger(this,"height")(function(t){e.setAttribute("height",t),e.style.height=t+"px"}),l.propInteger(this,"size")(function(t){n.call(r,e)}),l.propInteger(this,"regular")(function(t){n.call(r,e)}),t=l.extend({width:640,height:480,size:5,regular:!0},t,this),window.setTimeout(n.bind(this,e),20)};r.exports=s,r.exports._=h});
//# sourceMappingURL=wdg.gl2.js.map