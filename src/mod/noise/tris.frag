precision mediump float;


uniform float uniTime;
uniform sampler2D uniRandom;

const vec3 BLUE = vec3( 0, .4, .687 );
const vec3 ORANGE = vec3( 1, .5, 0 );

const float INV = 1.0 / 32.0;

const float ZOOM = 0.005;

const float SQRT2 = 1.4142135623730951;
const float SQRT3 = 1.7320508075688772;
const float SQRT6 = 2.449489742783178;

const mat2 SKEW = mat2(2.7320508075688772, 0.7320508075688772, 0.7320508075688772, 2.7320508075688772);
const mat2 UNSKEW = mat2(0.39433756729740643, -0.10566243270259355, -0.10566243270259355, 0.39433756729740643);

const float RADIUS = .5 / sqrt(3.);
const vec2 UP = vec2(-0.25881904510252063, 0.9659258262890683) * RADIUS * SQRT2;
const vec2 DOWN = vec2(0.9659258262890683, -0.2588190451025207) * RADIUS * SQRT2;


vec3 hue( vec3 rnd ) {
  return rnd;
  
  vec2 v = 2. * (rnd.xy - .5 );
  const vec2 RED = vec2( .5, 0.8660254037844386 );
  const vec2 GREEN = vec2( .5, -0.8660254037844386 );
  const vec2 BLUE = vec2( -1, 0 );

  return vec3(clamp( dot( v, RED ), 0., 1. ),
              clamp( dot( v, GREEN ), 0., 1. ),
              clamp( dot( v, BLUE ), 0., 1. ));              
}

float smooth( float a ) {
  //return a;
  return a*a*a*(a*(a*6.-15.)+10.);
  //return smoothstep( 0., 1., a );
}

void main() {
  vec2 coords = gl_FragCoord.xy * ZOOM;

  vec2 pos = SKEW * coords;
  float x = pos.x;
  float y = pos.y;

  float u = fract(x);
  float v = fract(y);

  x = (x - u) * INV;
  y = (y - v) * INV;

  vec2 posM = coords;
  
  vec2 posA = UNSKEW*(pos - vec2(u,v));
  vec3 rndA = texture2D( uniRandom, vec2( x, y ) ).xyz;
  vec2 vecAM = posA - posM;
  
  vec2 posB = posA + RADIUS;
  vec3 rndB = texture2D( uniRandom, vec2( x + INV, y + INV ) ).xyz;
  vec2 vecBM = posB - posM;

  vec2 posC;
  vec3 rndC;  
  if( u < v ) {
    posC = posA + UP;
    rndC = texture2D( uniRandom, vec2( x, y + INV ) ).xyz;
  } else {
    posC = posA + DOWN;
    rndC = texture2D( uniRandom, vec2( x + INV, y ) ).xyz;
  }
  vec2 vecCM = posC - posM;

  vec2 vecCA = posA - posC;
  vec2 vecCB = posB - posC;
  
  float denom = vecCB.x * vecCA.y - vecCB.y * vecCA.x;
  float wA =  ( vecCB.y * vecCM.x - vecCB.x * vecCM.y ) / denom;
  float wB =  ( vecCA.x * vecCM.y - vecCA.y * vecCM.x ) / denom;
  float wC = 1. - wA - wB;

  wA = smooth( wA );
  wB = smooth( wB );
  wC = smooth( wC );

  /*
  vec3 color = wA * rndA + wB * rndB + wC * rndC;
  color /= wA + wB + wC;
  */

  float vA = dot(rndA.xy - .5, vecAM);
  float vB = dot(rndB.xy - .5, vecBM);
  float vC = dot(rndC.xy - .5, vecCM);

  float value = wA*vA + wB*vB + wC*vC;
  //value /= wA + wB + wC;
  value *= 16.;
  
  vec3 color;
  if( value < 0. ) color = -value * BLUE;
  else color = value * ORANGE;
  
  /*
  if( length(vecAM) < .1 ) color = vec3(1);
  if( length(vecBM) < .1 ) color = vec3(.8);
  if( length(vecCM) < .1 ) color = vec3(.6);
  if( u < v ) color *= .5;

  if( wA < -1.0 ) color = BLUE;
  else color = ORANGE;
  */
  gl_FragColor = vec4( color, 1 );
}
