uniform float uniWidth;
uniform float uniHeight;
uniform float uniTime;
uniform float uniSpeed;
uniform float uniPhase;

attribute vec2 attPosition;

void main() {
  float x = attPosition.x * cos(uniPhase + uniTime * uniSpeed);
  float z = attPosition.x * sin(uniPhase + uniTime * uniSpeed);
  float y = attPosition.y + z * 0.5;
  float w = 1.0 + 0.5 * z;

  gl_Position = vec4( x, y, z, w );
}
