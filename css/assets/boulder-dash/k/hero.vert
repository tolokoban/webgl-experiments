// On inclut la fonction getCoords().
#include "coords-move"

attribute float attIndex;

varying vec2 varUV;

void main() {
  float ct = 500.0;
  float t = 8.0 * mod( uniTime, ct ) / ct;
  float u = 0.125 * floor( t );
  float v = attIndex * 0.5;
  varUV = vec2( u, v );
  
  gl_PointSize = 64.0 / uniW;
  gl_Position = getCoords();
}
