uniform float uniWidth;
uniform float uniHeight;

vec2 getCoords(float x, float y) {
  return vec2( x * 0.1 - 1.0,
               y * 0.1 - 1.0 );
}
