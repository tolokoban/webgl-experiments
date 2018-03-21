// On inclut la fonction getCoords().
#include "coords-move"

attribute float attIndex;

varying vec2 varUV;

void main() {
  float t = 4.0 * mod( uniTime, uniCellTime ) / uniCellTime;
  float u = 0.25 * floor( t );
  float v = attIndex * 0.25;
  varUV = vec2( u, v );
  
  gl_PointSize = 64.0 / uniW;
  gl_Position = getCoords();
}
