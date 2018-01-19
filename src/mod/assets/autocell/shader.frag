precision mediump float;

varying vec2 varPos;
uniform sampler2D uniTexture;

void main() {
  vec4 color = texture2D( uniTexture, varPos );
  gl_FragColor = vec4(color.rg, 0.0, 1.0);
}
