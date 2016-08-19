attribute vec3 attPosition;
attribute vec3 attColor;

varying vec3 varPosition;
varying vec3 varColor;

void main() {
  float z = attPosition.z;
  // Dans une projection 3D, les points éloignés de la caméra
  // paraissent plus petits et plus proches les uns des autres.
  // Cette variable permet de créer cet effet.
  float depth = (1.5 - z) / 2.5;
  gl_Position = vec4(attPosition.xy * depth, z, 1.0);

  // La taille du point dépend aussi de la profondeur.
  gl_PointSize = 80.0 * depth;
  varPosition = attPosition;
  varColor = attColor;
}
