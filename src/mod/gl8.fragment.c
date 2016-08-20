precision mediump float;

uniform sampler2D uniTexture;

varying vec2 varUV;

void main() {
  gl_FragColor = texture2D( uniTexture, varUV );
  gl_FragColor = vec4(1.0, .9, .9, 1.0);
}
