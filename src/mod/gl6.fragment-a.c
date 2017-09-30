precision mediump float;

varying vec3 varPosition;
varying vec3 varColor;

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
    // on ignore le fragment.
    discard;
  } else if (r > .2 ) {
    // Au delà d'un certain rayon, on met une couleur fixe
    // qui nous sert de liseré.
    gl_FragColor.rgb = vec3(1,1,1) - varColor;
    gl_FragColor.a = 1.0;
  } else {
    // Petit effet de dégradé.
    gl_FragColor.a = 1.0;
    gl_FragColor.rgb = mix(varColor, varColor * 0.25, r * 5.0);
  }
  // La luminosité varie avec la profondeur du point.
  // En `z = 0.0`, la boule est noire.
  float coeff = (1.0 - varPosition.z) * 0.5;
  gl_FragColor.rgb = coeff * gl_FragColor.rgb;
}
