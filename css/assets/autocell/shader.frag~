precision mediump float;

varying vec2 varPos;
uniform sampler2D uniTexture;

const float STEP = 1.0 / 512.0;
const vec4 CENTER = vec4( 0.5, 0.5, 0.0, 0.0 );

void main() {
  vec4 color = texture2D( uniTexture, varPos );
  float x = varPos.x;
  float y = varPos.y;
  vec4 colorA = texture2D( uniTexture, vec2( x - STEP, y - STEP ) );
  vec4 colorB = texture2D( uniTexture, vec2( x       , y - STEP ) );
  vec4 colorC = texture2D( uniTexture, vec2( x + STEP, y - STEP ) );
  vec4 colorD = texture2D( uniTexture, vec2( x + STEP, y        ) );
  vec4 colorE = texture2D( uniTexture, vec2( x + STEP, y + STEP ) );
  vec4 colorF = texture2D( uniTexture, vec2( x       , y + STEP ) );
  vec4 colorG = texture2D( uniTexture, vec2( x - STEP, y + STEP ) );
  vec4 colorH = texture2D( uniTexture, vec2( x - STEP, y        ) );

  vec4 average = 0.125 * (colorA + colorB + colorC + colorD + colorE + colorF + colorG + colorH);
  gl_FragColor = vec4(average.rgb, 1.0);
}
