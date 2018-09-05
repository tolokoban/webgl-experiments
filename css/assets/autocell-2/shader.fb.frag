precision mediump float;

varying vec2 varPos;
uniform float uniTime;
uniform sampler2D uniTexture;

const float STEP = 1.0 / 1024.0;


// R: Color, G: Energy, B: Terrain.
void main() {
  vec3 color = texture2D( uniTexture, varPos ).rgb;
  if( color.g < 1.0 ) {
    float x = varPos.x;
    float y = varPos.y;
    vec4 colors[8];

    colors[0] = texture2D( uniTexture, vec2( x - STEP, y - STEP ) );
    colors[1] = texture2D( uniTexture, vec2( x       , y - STEP ) );
    colors[2] = texture2D( uniTexture, vec2( x + STEP, y - STEP ) );
    colors[3] = texture2D( uniTexture, vec2( x + STEP, y        ) );
    colors[4] = texture2D( uniTexture, vec2( x + STEP, y + STEP ) );
    colors[5] = texture2D( uniTexture, vec2( x       , y + STEP ) );
    colors[6] = texture2D( uniTexture, vec2( x - STEP, y + STEP ) );
    colors[7] = texture2D( uniTexture, vec2( x - STEP, y        ) );

    float sum = 0.0;
    for( int k1=0; k1<8; k1+=2 ) {
      if( colors[k1].g == 1.0 ) {
        sum += colors[k1].b * 0.7;
      }
      if( colors[k1 + 1].g == 1.0 ) {
        sum += colors[k1 + 1].b;
      }
    }
    color.g += sum * 0.125;
    if( color.g >= 1.0 ) {
      color.r = mod((uniTime*0.002) * (uniTime*0.001), 1.0);
    }
  }
  gl_FragColor = vec4( color, 1.0 );
}
