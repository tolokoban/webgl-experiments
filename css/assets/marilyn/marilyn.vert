uniform float uniTime;
uniform float uniWidth;
uniform float uniHeight;
uniform float uniX;
uniform float uniY;
uniform float uniRnd1;
uniform float uniRnd2;
uniform float uniSize;

attribute float attX;
attribute float attY;

varying vec2 varUV;
varying float varHueShift;

void main() {
  varHueShift = 360.0 * uniRnd1 + uniTime * (0.01 + uniRnd2 * 0.1);
  varUV = vec2( attX, attY );
  float x = attX * uniSize + uniX;
  float y = attY * uniSize + uniY;
  x = 2.0 * x / uniWidth - 1.0;
  y = 1.0 - 2.0 * y / uniHeight;
  gl_Position = vec4( x, y, 0.0, 1.0 );
}
