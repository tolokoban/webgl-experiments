require("wdg.gl0",function(t,r,e){function n(t,r,e){var n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)?n:(console.log(e),console.error("An error occurred compiling the shader: "+r.getShaderInfoLog(n)),null)}function a(t,r){return n(t.FRAGMENT_SHADER,t,r)}function o(t,r){return n(t.VERTEX_SHADER,t,r)}var i=function(){function r(){return n(e,arguments)}var e={en:{}},n=t("$").intl;return r.all=e,r}(),l=t("dom"),c=t("tfw.data-binding"),u=function(t){function r(t){window.requestAnimationFrame(r),n.clearColor(1,1,1,1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT);var e=n.getUniformLocation(i,"uniTime");n.uniform1f(e,t),n.drawArrays(n.TRIANGLE_STRIP,0,3)}var e=l.elem(this,"canvas","theme-elevation-8");c.propInteger(this,"width")(function(t){e.setAttribute("width",t),e.style.width=t+"px"}),c.propInteger(this,"height")(function(t){e.setAttribute("height",t),e.style.height=t+"px"}),t=c.extend({width:640,height:480},t,this);var n=e.getContext("webgl"),i=n.createProgram();n.attachShader(i,o(n,"uniform float uniTime; \nattribute vec3 attColor; \nattribute float attAngle; \nvarying vec3 varColor; \nvoid main() { \n  float deg = attAngle + uniTime * 0.01; \n  float rad = radians( deg ); \n  float x = cos( rad ); \n  float y = sin( rad ); \n  gl_Position = vec4( x, y, 0.0, 1.0 ); \n  varColor = attColor; \n}")),n.attachShader(i,a(n,"precision mediump float; \nvarying vec3 varColor; \nvoid main() { \n  gl_FragColor = vec4(varColor.rgb, 1.0); \n}")),n.linkProgram(i),n.useProgram(i);var u=new Float32Array([0,1,0,0,130,0,1,0,200,0,0,1]),g=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,g),n.bufferData(n.ARRAY_BUFFER,u,n.STATIC_DRAW);var d=u.BYTES_PER_ELEMENT,A=4*d,f=n.getAttribLocation(i,"attAngle");n.enableVertexAttribArray(f),n.vertexAttribPointer(f,1,n.FLOAT,!1,A,0*d);var h=n.getAttribLocation(i,"attColor");n.enableVertexAttribArray(h),n.vertexAttribPointer(h,3,n.FLOAT,!1,A,1*d),window.requestAnimationFrame(r)};r.exports=u,r.exports._=i});
//# sourceMappingURL=wdg.gl0.js.map