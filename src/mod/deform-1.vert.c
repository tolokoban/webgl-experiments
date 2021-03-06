uniform float uniTime;
uniform float uniDelay;
uniform float uniAngle;

attribute float attRadius;
attribute float attAngle;
attribute float attLevel;

// Pour faire un léger dégradé dans le fragment shader.
varying float varBrightness;

void main() {
  // Temps qui tient compte du décalage par level.
  float t = uniTime - uniDelay * attLevel;
  // Angle max d'inclinaison entre deux niveaux.
  float a = radians( uniAngle ) * 0.1;
  // Calculer en fonction du temps l'angle entre deux
  // triangles consécutifs.
  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);
  // Plus le triangle à un level élevé, plus il est petit.
  float scale = 1.0 / sqrt( 1.0 + attLevel );
  // Coordonnées du centre du triangle de la base.
  float xc = -0.5;
  float yc = -0.7;
  
  int level = int( attLevel );
  // A chaque niveau supplémentaire,
  // l'angle s'incline un peu plus.
  float angle = tilt - 0.05;
  for( int i = 1 ; i < 10 ; i++ ) {
    // Condition d'arrêt.
    if ( i > level ) break;
    // Calculer les coordonnées du centre du triangle.
    yc += 0.4 * scale * cos( angle );
    xc += 0.4 * scale * sin( angle );
    // Incliner un peu plus pour le niveau suivant.
    angle += tilt;
  }
  // Coordonnées du vertex dans l'espace de WebGL.
  float x = scale * attRadius * cos( attAngle - angle );
  float y = scale * attRadius * sin( attAngle - angle );
  
  gl_Position = vec4( 
    xc + x,
    yc + y,
    0, 1 
  );
  if (attLevel == 9.0) {
    // Le dernier triangle est de couleur unie.
    varBrightness = 0.0;
  } else {
    // Vaut 0 pour les vertex du bas du triangle
    // et 1 pour le sommet.
    // Cela donne l'effer d'une ombre.
    varBrightness = sin( attAngle );
  }
}
