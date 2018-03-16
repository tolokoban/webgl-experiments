#include "coords"

attribute float attX;
attribute float attY;

void main() {
  gl_Position = vec4( getCoords( attX, attY ), 0.0, 1.0 );
}
