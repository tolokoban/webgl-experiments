uniform float time;
uniform float width;
uniform float height;

attribute float angle;
attribute float depth;

varying float z;
varying vec2 uv;

const float PI2 = 6.283185307179586;
const float ANGLE_FACTOR = 3.0 / PI2;
const float DEPTH_FACTOR = 0.5 / 2.0;


float swing( float t, float period, float minValue, float maxValue ) {
  float radius = 0.5 * (maxValue - minValue);
  return minValue + radius * (1.0 + cos( PI2 * t / period ));
}


void main() {
  float u = angle * ANGLE_FACTOR;
  float v = depth * DEPTH_FACTOR + time * 0.0025;
  uv = vec2( u, v );
  float zoom = 1.0 + depth * 0.5;

  float vrille = cos(time * 0.0000533) * cos(time * 0.000211) * PI2;
  float a = angle + vrille;
  float x = sin(a) * 1.5;
  float y = cos(a) * 1.5;
  float chute = depth * depth * swing(time, 5000.0, 0.005, 0.05);
  x += chute * cos( vrille );
  y += chute * sin( vrille );
  z = -depth / 45.0;

  if( width > height ) {
    y *= width / height;
  } else {
    x *= height / width;
  }
  gl_Position = vec4( x, y, z * zoom, zoom );
}
