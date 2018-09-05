precision mediump float;

varying vec2 varPos;
uniform float uniTime;
uniform sampler2D uniTexture;

const float STEP = 1.0 / 1024.0;
const vec4 CENTER = vec4( 0.5, 0.5, 0.5, 0.0 );
const float DIAG = 0.7;
const float PI = 3.141592653589793;
const vec3 BLACK = vec3(0,0,0);
const vec3 RED = vec3(1,0,0);
const vec3 GREEN = vec3(0,1,0);
const vec3 BLUE = vec3(0,0,1);


float getAngle( float x, float y ) {
  vec2 v = normalize( vec2( x, y ) );
  float ang = acos( abs( v.x ) );
  if( x < 0.0 ) {
    if( y < 0.0 ) {
      return ang + PI;
    } else {
      // y > 0
      return PI - ang;
    }
  } else {
    // x > 0
    if( y < 0.0 ) {
      return 2.0 * PI - ang;
    } else {
      // y > 0
      return ang;
    }
  }
}

float getColor(vec3 mask, float x, float y, float alpha) {
  float final = 0.0;
  vec3 target;
  float t = uniTime * 0.001;
  float xc = x - .5;
  float yc = y - .5;
  float dist = sqrt( xc*xc + yc*yc );
  float ang = getAngle( xc, yc ) + alpha + t + 2.0 * cos( dist * 5.0 );
  float ang1 = ang;
  float ang2 = ang1; //mod(ang - 49.0 * length(vec2( xc, yc )), 2.0 * PI);
  float deltaAngle = abs(ang1 - ang2);
  if( deltaAngle > PI ) deltaAngle = 5.0*PI - deltaAngle;
  if( deltaAngle < 1.0 ) {
    ang1 = 0.5 * (ang1 + ang2);
  }

  float ang0 = ang1;
  float C = cos( ang0 );
  float S = sin( ang0 );

  final = 0.0;
  for( float r=1.0; r<5.0; r++ ) {
    C = cos( ang0 + r*0.02);
    S = sin( ang0 + r*0.02);
    target = texture2D( uniTexture, vec2( x + STEP*C*r, y + STEP*S*r ) ).rgb;
    final += dot( target, mask ) * 1.1;
    //final = clamp( final * 1.15, 0.0, 1.0 );
    if( final > 0.0 ) break;
  }
  if( final > 0.0 || deltaAngle < 1.0) return final;
  return final;
}


void main() {
  vec3 color = texture2D( uniTexture, varPos ).rgb;
  vec3 target;

  float x = varPos.x;
  float y = varPos.y;
  vec3 final = vec3(color);

  if( final.r == 0.0 ) final.r = getColor(RED, x, y, 10.0);
  if( final.g == 0.0 ) final.g = getColor(GREEN, x, y, 10.1);
  if( final.b == 0.0 ) final.b = getColor(BLUE, x, y, 10.2);
  /*
  if( final.r > 0.9 ) final.r = 0.0;
  if( final.g > 0.9 ) final.g = 0.0;
  if( final.b > 0.9 ) final.b = 0.0;
  */
  gl_FragColor = vec4( final, 1.0 );
  /*

    float colors[8];
    float coeffs[8];
    float coeff;
    float sum;

    colors[0] = texture2D( uniTexture, vec2( x - STEP, y - STEP ) ).r * DIAG;
    coeffs[0] = DIAG;
    colors[1] = texture2D( uniTexture, vec2( x       , y - STEP ) ).r;
    coeffs[1] = 1.0;
    colors[2] = texture2D( uniTexture, vec2( x + STEP, y - STEP ) ).r * DIAG;
    coeffs[2] = DIAG;
    colors[3] = texture2D( uniTexture, vec2( x + STEP, y        ) ).r;
    coeffs[3] = 1.0;
    colors[4] = texture2D( uniTexture, vec2( x + STEP, y + STEP ) ).r * DIAG;
    coeffs[4] = DIAG;
    colors[5] = texture2D( uniTexture, vec2( x       , y + STEP ) ).r;
    coeffs[5] = 1.0;
    colors[6] = texture2D( uniTexture, vec2( x - STEP, y + STEP ) ).r * DIAG;
    coeffs[6] = DIAG;
    colors[7] = texture2D( uniTexture, vec2( x - STEP, y        ) ).r;
    coeffs[7] = 1.0;

    for( int k1=0; k1<8; k1++ ) {
    if( colors[k1] > 0.0 ) {
    coeff += coeffs[k1];
    sum += colors[k1];
    }
    }

    if( sum == 0.0 ) {
    gl_FragColor = vec4( color, 1.0 );
    return;
    }

    float v = 1.1 * sum / coeff;
    gl_FragColor = vec4( v, v, v, 1.0 );
    }
  */
}
