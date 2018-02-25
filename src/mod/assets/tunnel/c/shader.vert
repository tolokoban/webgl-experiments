attribute float angle;
attribute float depth;

varying float z;

void main() {
  float zoom = 1.0 + depth * 0.5;
  float x = sin(angle) * 1.5;
  float y = cos(angle) * 1.5;
  float chute = depth * depth * 0.005;
  z = -depth / 45.0;
  gl_Position = vec4( x, y - chute, z * zoom, zoom );
}
