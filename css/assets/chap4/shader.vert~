attribute vec3 attVertexPosition;

uniform float uniWidth;
uniform float uniHeight;

uniform lowp float uniTimeV;

varying lowp vec3 varVertexPosition;

void main() {
  highp float time = uniTimeV;

  varVertexPosition = attVertexPosition;
  
  float x = attVertexPosition.x;
  float y = attVertexPosition.y;

  x = (2.0 * x / uniWidth) - 1.0;
  y = 1.0 - (2.0 * y / uniHeight);
  float r = 2.0 + cos( time * 0.0007 );
  gl_Position = vec4( x * r, y * r, 0.0, 1.0 );
}
