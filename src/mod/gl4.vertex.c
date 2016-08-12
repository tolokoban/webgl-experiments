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

  float speed = 0.0;

  if (x < 0.0) {
    if (y < 0.0) {
      speed = 1600.0;
    } else {
      speed = 1643.0;
    }
  } else {
    if (y < 0.0) {
      speed = 1703.0;
    } else {
      speed = 1742.0;
    }
  }

  float radius = 0.5 + (cos(time / speed) + 1.0) / 4.0;
  gl_Position = vec4( x * radius, y * radius, 0.0, 1.0 );
}
