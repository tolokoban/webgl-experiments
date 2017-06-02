// Coordonnées du centre du sprite.
attribute vec3 attPosition;
// Index du vertex (de 0.0 à 3.0).
attribute float attIndex;
// Angle de rotation en radians.
attribute float attRotation;
// Facteur d'échelle.
attribute float attScale;
// PI est une constante indispensable en trigonométrie.
const float PI = 3.1415926536;
// La taille du canvas est utilisée pour convertir
// des coordonnées en pixels vers l'espace de WebGL.
uniform float uniWidth;
uniform float uniHeight;
// Passer au fragment shader les coordonnées UV
// du vertex dans le bitmap.
varying vec2 varCoordsUV;

void main() {
  // On considère un cercle ce centre attPosition,
  // et de rayon attScale.
  // Les vertex sont sur ce cercle, c'est pourquoi
  // on utilise attIndex comme un angle.
  float x = attPosition.x 
    + attScale * cos( attRotation + attIndex * PI / 2.0 );
  float y = attPosition.y
    + attScale * sin( attRotation + attIndex * PI / 2.0 );
  // On avait des coordonnées en pixels du canvas,
  // il faut les convertir dans l'espace de WebGL.
  x = (2.0 * x / uniWidth) - 1.0;
  y = 1.0 - (2.0 * y / uniHeight);
  // D�finir la position du vertex.
  gl_Position = vec4( x, y, attPosition.z, 1.0 );
  // Il faut associer à chaque attIndex, des coordonnées UV.
  if (attIndex < 1.5) {
    if (attIndex < 0.5) varCoordsUV = vec2(0.0, 0.0); // 0
    else varCoordsUV = vec2(1.0, 0.0);                // 1
  }
  else {
    if (attIndex < 2.5) varCoordsUV = vec2(1.0, 1.0); // 2
    else varCoordsUV = vec2(0.0, 1.0);                // 3
  }
}
