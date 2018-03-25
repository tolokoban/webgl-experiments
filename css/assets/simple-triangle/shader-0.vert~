uniform float uniTime;

attribute vec3 attColor;
attribute float attAngle;

varying vec3 varColor;

void main() {
  varColor = attColor;

  float deg = attAngle + uniTime * 0.01;
  float rad = radians( deg );
  float x = cos( rad );
  float y = sin( rad );

  gl_Position = vec4( x, y, 0.0, 1.0 );
}
