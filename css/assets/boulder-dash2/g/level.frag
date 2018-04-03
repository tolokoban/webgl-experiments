precision mediump float;
uniform sampler2D texture;

varying vec2 varUV;
varying vec2 varDimension;


void main() {
  vec4 color = texture2D( texture,
                          varUV + vec2(gl_PointCoord.x * varDimension.x,
                                       gl_PointCoord.y * varDimension.y ) );
<<<<<<< HEAD
  if( color.a < 0.8 ) discard;
=======
  if( color.a < 0.1 ) discard;
>>>>>>> 087a08f948b2fa3cb3efb25e138c5b93962066cd
  gl_FragColor = color;
}
