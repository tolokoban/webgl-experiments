// Définir la précision par défaut
// pour tous les floats.
precision mediump float;

uniform sampler2D uniTexture;
 
varying vec2 varCoordsUV;

void main() {
  gl_FragColor = texture2D( uniTexture, varCoordsUV );
}
