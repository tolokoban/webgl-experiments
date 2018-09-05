precision mediump float;
uniform sampler2D texture;

void main() {
  vec4 color = texture2D( texture, gl_PointCoord );
  if( color.a < 0.1 ) discard;
  gl_FragColor = color;
}
