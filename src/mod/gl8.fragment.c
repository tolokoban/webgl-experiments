precision mediump float;

//uniform sampler2D uniTexture;

varying vec2 varUV;

void main() {
  //gl_FragColor = texture2D( uniTexture, varUV );
  float u = abs(varUV.u);
  float v = abs(varUV.v);
  gl_FragColor = vec4(u, v, u * v, 1.0);
}
