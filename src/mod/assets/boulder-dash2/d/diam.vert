// On inclut la fonction getCoords().
#include "coords-move"

attribute float attIndex;

varying vec2 varUV;

void main() {
  float index = attIndex + uniTime * 0.005;
  index = mod( index, 4.0 );
  index -= mod( index, 0.25 );
  float u = mod( index, 1.0 );
  float v = 0.25 * (index - u);
  varUV = vec2( u, v );
  
  gl_PointSize = 64.0 / uniW;
  gl_Position = getCoords();
}
