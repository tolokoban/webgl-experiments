precision mediump float;
// L'image de notre sprite.
uniform sampler2D uniTexture;
// Les coordonnes UV du pixel à dessiner.
// (0,0) correspond au pixel en haut à gauche.
// (1,1) correspond au pixel en bas à droite.
varying vec2 varCoordsUV;

void main() {
  // texture2D retourne la coleur à un endroit donné.
  vec4 color = texture2D( uniTexture, varCoordsUV );
  // Si le point est transparent, on ne l'affiche pas.
  if ( color.a < 0.1 ) discard;
  gl_FragColor = color;
}
