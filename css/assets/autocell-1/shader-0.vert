attribute float attAngle;

void main() {
  float rad = radians( attAngle );
  float x = cos( rad );
  float y = sin( rad );

  gl_Position = vec4( x, y, 0.0, 1.0 );
}
