uniform float uniTime;
uniform float uniDelay;
uniform float uniAngle;

attribute float attRadius;
attribute float attAngle;
attribute float attLevel;
attribute vec2 attUV;

// Coordonnées dans la texture.
varying vec2 varUV;

const float PI = 3.141592653589793;
const float LEVELS = 32.0;

void main() {
  // Temps qui tient compte du décalage par level.
  float t = uniTime - uniDelay * attLevel;
  // Angle max d'inclinaison entre deux niveaux.
  float a = radians( uniAngle );
  // Calculer en fonction du temps l'angle entre deux
  // triangles consécutifs.
  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);
  // Coordonnées du centre du triangle de la base.
  float xc = 0.0;
  float yc = -1.0;
  
  int level = int( attLevel );
  // A chaque niveau supplémentaire,
  // l'angle s'incline un peu plus.
  float angle = tilt;
  for( int i = 1 ; i < 32 ; i++ ) {
    // Condition d'arrêt.
    if ( i > level ) break;
    // Calculer les coordonnées du centre du triangle.
    yc += cos( angle ) * 2.0 / LEVELS;
    xc += sin( angle ) * 2.0 / LEVELS;
    // Incliner un peu plus pour le niveau suivant.
    angle += tilt;
  }
  // Coordonnées du vertex dans l'espace de WebGL.
  float x = attRadius * cos( attAngle * PI - angle );
  float y = attRadius * sin( attAngle * PI - angle );
  
  gl_Position = vec4( 
    xc + x,   // Aspect ratio
    yc + y,
    0, 1 
  );
  
  varUV = attUV;
}
