attribute float angle;
attribute float depth;

varying float z;

void main() {
  float zoom = 1.0 + depth * 0.5;
  float x = sin(angle);
  float y = cos(angle);
  z = zoom;
  gl_Position = vec4( x, y, 0.0, zoom );
}
