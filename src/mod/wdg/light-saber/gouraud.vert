// Perspective
uniform mat4 uniProjection;
// Rotation de la multiball.
uniform mat4 uniRotation;
// Translation.
uniform vec4 uniTranslation;
// Largeur de l'écran en pixels.
uniform float uniScreenWidth;

// Coordonnées du centre du modèle.
attribute vec3 attPoint;
// Vecteur normal en ce point.
attribute vec3 attNormal;
varying vec3 varNormal;

void main() {
  // Rotation, translation et projection en perspective.
  vec4 vertex = uniRotation * vec4( attPoint, 1 ) + uniTranslation;
  gl_Position = uniProjection * vertex;

  vec4 normal = uniRotation * vec4( attNormal, 1 );
  varNormal = normal.xyz;
}
