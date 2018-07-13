// La couleur est un vecteur à trois coordonées :
// une pour le rouge, une pour le vert et une pour le bleu.
attribute vec3 attColor;

attribute float attAngle;

// Voici un nouveau mot clef : "varying".
// Il doit être déclaré également dans le
// fragment shader. Cela permet de lui
// passer des données.
varying vec3 varColor;

void main() {
  // C'est ici que l'on passe la couleur du vertex
  // courant au fragment shader.
  varColor = attColor;

  float rad = radians( attAngle );
  float x = cos( rad );
  float y = sin( rad );

  gl_Position = vec4( x, y, 0.0, 1.0 );
}
