attribute vec3 attPosition;
// Index du vertex (de 0.0 à 3.0).
attribute float attIndex;
// Angle de rotation.
attribute float attRotation;
// Facteur d'échelle.
attribute float attScale;

const float PI = 3.1415926536;

uniform float uniWidth;
uniform float uniHeight;

varying vec2 varCoordsUV;

void main() {
  float x = attPosition.x 
    + attScale * cos( attRotation + attIndex * PI / 2.0 );
  float y = attPosition.y
    + attScale * sin( attRotation + attIndex * PI / 2.0 );

  x = (2.0 * x / uniWidth) - 1.0;
  y = 1.0 - (2.0 * y / uniHeight);

  gl_Position = vec4( x, y, attPosition.z, 1.0 );

  // Define a different color for each point.
  if (attIndex == 0.0) varCoordsUV = vec2(0.0, 0.0);
  else if (attIndex == 1.0) varCoordsUV = vec2(1.0, 0.0);
  else if (attIndex == 2.0) varCoordsUV = vec2(1.0, 1.0);
  else varCoordsUV = vec2(0.0, 1.0);
}
