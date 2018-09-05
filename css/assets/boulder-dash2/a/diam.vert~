// On inclut la fonction getCoords().
#include "coords-move"

attribute float attIndex;

varying vec2 varUV;

void main() {
  float u = mod( attIndex, 1.0 );
  float v = 0.25 * (attIndex - u);
  varUV = vec2( u, v );
  
  gl_PointSize = 64.0 / uniW;
  gl_Position = getCoords();
}
