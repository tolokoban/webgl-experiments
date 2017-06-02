// Temps en millisecondes.
uniform float uniTime;

// Angle en degrés.
attribute float attAngle;

// `vec3` est un vecteur à trois dimensions.
// On peut lire les valeurs de ces dimensions
// de plusieurs façons :
//   * attColor.r == attColor.x
//   * attColor.g == attColor.y
//   * attColor.b == attColor.z
attribute vec3 attColor;

// Les `varying` sont des variables qu'on peut
// passer du vertex shader au fragment shader.
// Leurs valeurs sont interpolées entre les
// vertex les plus proches.
varying vec3 varColor;


// La fonction principale d'un shader doit toujours
// s'appeler `main`, n'avoir aucun argument et
// ne rien retourner.
void main() {
  // Un peu de trigonométrie pour trouver les coordonnées d'un points
  // sur un cercle quand on connaît l'angle.
  float deg = attAngle + uniTime * 0.01;
  float rad = radians( deg );
  float x = cos( rad );
  float y = sin( rad );
  
  // `gl_Position` est une variable SPECIALE de WebGL.
  // Il faut obligatoirement la renseigner pour
  // définir les coordonnées du vertex résultant.
  gl_Position = vec4( x, y, 0.0, 1.0 );
  // On transmet la couleur au fragment color.
  varColor = attColor;
}
