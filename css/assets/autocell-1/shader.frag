precision mediump float;

varying vec2 varPos;
uniform sampler2D uniTexture;

void main() {
  vec4 color = texture2D( uniTexture, varPos );
  gl_FragColor = color;
}
