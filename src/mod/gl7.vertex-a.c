uniform float uniTime;

attribute vec2 attPosition;
attribute vec4 attRandom;

varying vec3 varColor;
varying float varCoeff;

void main() {
  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;
  float x = attPosition.x;
  float y = attPosition.y;

  float radius = .02 * cos(t * attRandom.y);
  float ang = uniTime * attRandom.z / 100.0;
  x = x + radius * cos(ang);
  y = y + radius * sin(ang);

  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));
  ang = t * attRandom.x * 0.1;
  float xx = radius * cos(ang);
  float yy = radius * sin(ang);

  float c1 = 0.0;
  float tt = mod(uniTime, 12000.0);
  if (tt < 4000.0) {
    c1 = sin(tt * 3.1415926539 / 4000.0);
  }
  float c2 = 1.0 - c1;

  varCoeff = c2;
  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );

  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );
  ang = t * attRandom.x;
  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * c2);
}
