attribute float angle;
attribute float depth;

varying float z;
varying vec2 uv;

const float ANGLE_FACTOR = 3.0 / 6.283185307179586;
const float DEPTH_FACTOR = 0.5 / 2.0;

void main() {
  float u = angle * ANGLE_FACTOR;
  float v = depth * DEPTH_FACTOR;
  uv = vec2( u, v );
  float zoom = 1.0 + depth * 0.5;
  float x = sin(angle) * 1.5;
  float y = cos(angle) * 1.5;
  float chute = depth * depth * 0.005;
  z = -depth / 45.0;
  gl_Position = vec4( x, y - chute, z * zoom, zoom );
}
