// Temps courant en millisecondes
uniform float uniTime;

// Position en valeurs comprises entre -1.0 et +1.0
attribute vec2 attPosition;
// 4 Valeurs aléatoires comprises entre 0.0 et 1.0
// Ces valeurs donnent la "personnalité" de la particule
attribute vec4 attRandom;

// Couleur pour le fragment shader
varying vec3 varColor;
// Indique au fragment shader si les particules sont
// en place (1.0) ou en mouvement désordonné (0.0)
varying float varCoeff;

void main() {
  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;
  // Position "en place" de la particule.
  float x = attPosition.x;
  float y = attPosition.y;

  // Créer un léger mouvement autour de la position normale.
  float radius = .02 * cos(t * attRandom.y);
  float ang = uniTime * attRandom.z / 100.0;
  x = x + radius * cos(ang);
  y = y + radius * sin(ang);

  // Coordonnées aléatoires en rotation dans tout l'espace.
  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));
  ang = t * attRandom.x * 0.1;
  float xx = radius * cos(ang);
  float yy = radius * sin(ang);

  // Dans un cycle de 12 secondes, l'image est stable
  // pendant 8 secondes et en vrac pendant 4.
  float c1 = 0.0;
  float tt = mod(uniTime, 12000.0);
  if (tt < 4000.0) {
    c1 = sin(tt * 3.1415926539 / 4000.0);
  }
  float c2 = 1.0 - c1;

  varCoeff = c2;
  // Petites variations de vert.
  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );
  // La position est intrerpolée entre (x,y) et (xx,yy).
  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );
  // Palpitation de la taille et diminution lors de la phase de désordre.
  ang = t * attRandom.x;
  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));
}
