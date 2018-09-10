precision mediump float;
// Couleur principale d'une sphère.
const vec3 COLOR = vec3(1, .5, 0);

void main() {
  float x = 2.0 * (gl_PointCoord.x - .5);
  float y = 2.0 * (gl_PointCoord.y - .5);
  // Distance au carré.
  float r = x * x + y * y;
  // Au delà du rayon d'un cercle, on n'affiche rien.
  if( r > 1.0 ) discard;
  // Ajout d'un liseré noir dont l'épaisseur est
  // un dixième du rayon.
  if( r > .9 * .9 ) {
    gl_FragColor = vec4( 0, 0, 0, 1 );
    return;
  }
  // Assombrir quand le rayon devient grand.
  vec3 color = COLOR * (1.0 - r * .4);
  gl_FragColor = vec4( color, 1.0 );
}
