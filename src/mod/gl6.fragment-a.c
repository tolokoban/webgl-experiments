precision mediump float;

varying vec3 varPosition;
varying vec3 varColor;

const vec4 WHITE = vec4(1.0, 1.0, 1.0, 0.5);

void main() {
  // Calculons la distance du fragment courant
  // au centre du point.
  float x = gl_PointCoord.x - 0.5;
  float y = gl_PointCoord.y - 0.5;
  // On ne calcule pas la racine carré pour gagner du temps.
  float r = x*x + y*y;

  x = gl_PointCoord.x;
  y = gl_PointCoord.y;

  // 0.25 = 0.5 * 0.5
  if (r > 0.25) {
    // Si on est à l'extérieur du cercle de rayon 0.5,
    // on place un fragment transparent.
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );
  } else if (r > .2 ) {
    // Au delà d'un certain rayon, on met une couleur fixe
    // qui nous sert de liseré.
    gl_FragColor = vec4(varColor, 1.0);
  } else {
    // Petit effet de dégradé.
    vec3 col = x * varColor + y * WHITE.rgb;
    gl_FragColor = vec4( col, 1.0 );
  }
  // La luminosité varie avec la profondeur du point.
  // En `z = 0.0`, la boule est noire.
  float coeff = (3.0 - varPosition.z) / 3.0;
  gl_FragColor = coeff * gl_FragColor + (1.0 - coeff) * WHITE;
}
