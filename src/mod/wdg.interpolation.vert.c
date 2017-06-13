// Le temps set à la rotation lente du rectangle.
uniform float uniTime;
// Type de calcul a effectué pour le relief.
uniform float uniType;

attribute vec2 attPosition;
attribute vec2 attUV;  // Coordonnées de la texture.

varying vec2 varUV;
// Profondeur de champ comprise entre 0.0 et 1.0.
const float DOF = 0.9;

void main() {
  varUV = attUV;
  // Rotation lente du rectangle.
  float angle = uniTime * 0.0002;
  float x = attPosition.x;
  float y = attPosition.y * cos(angle);
  float z = attPosition.y * sin(angle);
  // Diviseur, calculé selon z.
  float w = z * DOF + 1.0;
  
  if ( uniType > 0.0 ) {
    // Partie de droite.
    gl_Position = vec4( 
      x, 
      y, 
      z*w, 
      w 
    );
  } else {
    // Partie de gauche.
    gl_Position = vec4( 
      x/w, 
      y/w, 
      z, 
      1.0 
    );
  }
}
