// Perspective
uniform mat4 uniProjection;
// Rotation de la multiball.
uniform mat4 uniRotation;
// Largeur de l'écran en pixels.
uniform float uniScreenWidth;

// Rayon de la sphère
uniform float uniRadius;
// Distance de la sphère au centre.
// (rayon de son orbite)
uniform float uniDistance;
// Facteur de diminution des rayons des sphères
// sur les orbites successives
uniform float uniAlpha;

// Coordonnées du centre de la sphère
// comme si elle était sur l'orbite 0.
attribute vec3 attPoint;
// Numéro d'orbite (de 0 à 9).
attribute float attLevel;

void main() {
  // On va reculer un peu la multiball pour qu'on la voit bien
  vec4 translation = vec4(0, 0, -2.5, 0);

  // Application de la formule pour calculer le rayon de l'orbite courante.
  float alpha1 = pow( uniAlpha, attLevel );
  float alpha2 = alpha1 * uniAlpha;
  float dist = uniDistance - uniRadius * (1.0 + alpha1)
    + 2.0 * uniRadius * (alpha2 - 1.0) / (uniAlpha - 1.0);

  // Rotation, translation et projection en perspective.
  vec4 vertex = uniRotation * vec4( attPoint * dist, 1 );
  vertex +=  translation;
  gl_Position = uniProjection * vertex;

  // Détermination de la taille de la sphère en pixels.
  vec4 point = vec4( uniRadius * alpha1, 0, vertex.z, 1 );
  vec4 size = uniProjection * point;  
  gl_PointSize = uniScreenWidth * size.x / size.w;

}
