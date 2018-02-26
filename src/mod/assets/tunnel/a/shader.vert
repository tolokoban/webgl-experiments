attribute float angle;
attribute float depth;

varying float z;

void main() {
  float zoom = 1.0 + depth;
  float x = sin(angle) * 1.5;
  float y = cos(angle) * 1.5;
  z = 1.0 - depth / 20.0;
  gl_Position = vec4( x, y, 0.0, zoom );
}
