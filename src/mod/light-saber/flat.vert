// Perspective
uniform mat4 uniProjection;
// Rotation de la multiball.
uniform mat4 uniRotation;
// Translation.
uniform vec4 uniTranslation;

// Coordonnées du centre du modèle.
attribute vec3 attPoint;

void main() {
  // Rotation, translation et projection en perspective.
  vec4 vertex = uniRotation * vec4( attPoint, 1 ) + uniTranslation;
  gl_Position = uniProjection * vertex;
}
