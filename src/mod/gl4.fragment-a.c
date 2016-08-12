const highp float PI = 3.1415926539;
const lowp vec3 COLOR0 = vec3(0.7, 0.9, 1.0);
const lowp vec3 COLOR1 = vec3(0.0, 0.7, 0.9);

varying lowp vec3 varVertexPosition;

uniform lowp float uniTimeF;

void main() {
  highp float time = uniTimeF / 700.0;
  
  lowp float x = varVertexPosition.x + time * 120.0;
  lowp float y = varVertexPosition.y + sin(time) * 15.0;
  
  lowp float xx = x / 10.0;
  lowp float yy = y / 10.0;
  
  lowp float h = cos(yy) * cos(xx) + sin(yy);
  h = cos( PI * h + time);
  
  h = (1.0 + h) / 2.0;
  gl_FragColor = vec4( h * COLOR0 + (1.0 - h) * COLOR1, 1.0);
}
