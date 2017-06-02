require("wdg.gl2",function(t,e,r){function n(t){var e=t.getContext("webgl")||t.getContext("experimental-webgl"),r=e.createProgram();e.attachShader(r,a(e,u.vertex)),e.attachShader(r,o(e,u.fragment)),e.linkProgram(r),e.useProgram(r);var n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n);var i=t.width,h=t.height,g=[i/2,h/2,0],l=Math.min(1e3,Math.max(3,this.size));console.info("[wdg.gl2] n=...",l);for(var s,c,f=.45*Math.min(i,h),d=0;d<=l;d++)c=2*Math.PI*d/l,s=f,this.regular||(s*=.5+Math.random()/2),g.push(i/2+s*Math.cos(c)),g.push(h/2+s*Math.sin(c)),g.push(0);console.info("[wdg.gl2] vertices=...",g),e.bufferData(e.ARRAY_BUFFER,new Float32Array(g),e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,n);var m=e.getAttribLocation(r,"attVertexPosition");e.enableVertexAttribArray(m),e.vertexAttribPointer(m,3,e.FLOAT,!1,0,0);var A=e.getUniformLocation(r,"uniWidth"),x=e.getUniformLocation(r,"uniHeight");e.uniform1f(A,t.width),e.uniform1f(x,t.height),e.clearColor(0,0,1,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,l+2)}function i(t,e,r){var n=e.createShader(t);return e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.log(r),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(n)),null)}function o(t,e){return i(t.FRAGMENT_SHADER,t,e)}function a(t,e){return i(t.VERTEX_SHADER,t,e)}var h=function(){function e(){return n(r,arguments)}var r={en:{}},n=t("$").intl;return e.all=r,e}(),u={vertex:"attribute vec2 attVertexPosition;\n\nuniform float uniWidth;\nuniform float uniHeight;\n\nvoid main() {\n  float x = attVertexPosition.x;\n  float y = attVertexPosition.y;\n\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n\n  gl_Position = vec4( x, y, 0.0, 1.0 );\n}\n",fragment:"void main() {\n  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);\n}\n"},g=t("dom"),l=t("tfw.data-binding"),s=function(t){var e=this,r=g.elem(this,"canvas");l.propInteger(this,"width")(function(t){r.setAttribute("width",t),r.style.width=t+"px"}),l.propInteger(this,"height")(function(t){r.setAttribute("height",t),r.style.height=t+"px"}),l.propInteger(this,"size")(function(t){n.call(e,r)}),l.propInteger(this,"regular")(function(t){n.call(e,r)}),t=l.extend({width:640,height:480,size:5,regular:!0},t,this),window.setTimeout(n.bind(this,r),20)};e.exports=s,e.exports._=h});
//# sourceMappingURL=wdg.gl2.js.map