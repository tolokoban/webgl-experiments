attribute float attI;
attribute float attJ;
// `vec3` est un vecteur à trois dimensions.
// On peut lire les valeurs de ces dimensions
// de plusieurs façons :
//   * attC.r == attC.x
//   * attC.g == attC.y
//   * attC.b == attC.z
attribute vec3 attC;

// Les `varying` sont des variables qu'on peut
// passer du vertex shader au fragment shader.
// Leurs valeurs sont interpolées entre les
// vertex les plus proches.
varying vec3 varColor;


// La fonction principale d'un shader soit toujours
// s'appeler `main`, n'avoir aucun argument et
// ne rien retourner.
void main() {
  // `gl_Position` est une variable SPECIALE de WebGL.
  // Il faut obligatoirement la renseigner pour
  // définir les coordonnées du vertex résultant.
  gl_Position = vec4( attI, attJ, 0.0, 1.0 );
  // On transmet la couleur au fragment color.
  varColor = attC;
}
