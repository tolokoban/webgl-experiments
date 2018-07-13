precision mediump float;
uniform sampler2D texture;

varying vec2 varUV;

void main() {
  vec4 color = texture2D( texture, varUV + 0.25 * gl_PointCoord );
  if( color.a < 0.1 ) discard;
  gl_FragColor = color;
}
