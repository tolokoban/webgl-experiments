precision mediump float;

uniform sampler2D uniTexture;

varying vec2 varUV;

void main() {
  vec4 color = texture2D( uniTexture, varUV );
  // Si le point est transparent, on ne l'affiche pas.
  if ( color.a < 0.1 ) discard;
  gl_FragColor = color;
}
