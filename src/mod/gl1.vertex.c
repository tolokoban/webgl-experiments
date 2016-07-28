attribute vec3 attVertexPosition;

uniform float uniWidth;
uniform float uniHeight;

void main() {
  float x = attVertexPosition.x;
  float y = attVertexPosition.y;

  x = (2.0 * x / uniWidth) - 1.0;
  y = 1.0 - (2.0 * y / uniHeight);

  gl_Position = vec4( x, y, 0.0, 1.0 );
}
