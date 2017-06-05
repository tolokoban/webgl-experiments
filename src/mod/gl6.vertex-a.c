attribute vec3 attPosition;
attribute vec3 attColor;

varying vec3 varPosition;
varying vec3 varColor;

void main() {
  float z = attPosition.z;
  // Dans une projection 3D, les points éloignés de la caméra
  // paraissent plus petits et plus proches les uns des autres.
  // Cette variable permet de créer cet effet.
  float depth = 3.0 / (2.0 - z);
  // On utilise la 4ème composant `w` pour donner un effet de profndeur.
  // En effet, les coordonnées seront multipliées/divisées par `depth`.
  gl_Position = vec4(attPosition.xy, z, depth);

  // La taille du point dépend aussi de la profondeur.
  gl_PointSize = 150.0 / depth;
  varPosition = attPosition;
  varColor = attColor;
}
