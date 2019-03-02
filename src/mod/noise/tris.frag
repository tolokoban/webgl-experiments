precision mediump float;


uniform float uniTime;
uniform float uniCenterX;
uniform float uniCenterY;
uniform sampler2D uniRandom;

uniform float uniLoop;
uniform float uniAmpl;
uniform float uniFreq;
uniform float uniAmplAttenuation;
uniform float uniFreqAttenuation;

const vec3 BLUE = vec3( 0, .4, .687 );
const vec3 ORANGE = vec3( 1, .5, 0 );

const float INV = 1.0 / 32.0;

const float ZOOM = 0.01;

const float SQRT2 = 1.4142135623730951;
const float SQRT3 = 1.7320508075688772;
const float SQRT6 = 2.449489742783178;

const mat2 SKEW = mat2(2.7320508075688772, 0.7320508075688772, 0.7320508075688772, 2.7320508075688772);
const mat2 UNSKEW = mat2(0.39433756729740643, -0.10566243270259355, -0.10566243270259355, 0.39433756729740643);

const float RADIUS = .5 / SQRT3;
const vec2 UP = vec2(-0.25881904510252063, 0.9659258262890683) * RADIUS * SQRT2;
const vec2 DOWN = vec2(0.9659258262890683, -0.2588190451025207) * RADIUS * SQRT2;


vec3 gradient( vec2 pt, float seed ) {
  vec2 coord = mat2(seed, 1. - seed, 1. + seed, 1) * pt;
  return texture2D( uniRandom, coord ).xyz;
}


float simplexNoise(vec2 coords, float seed) {
  vec2 pos = SKEW * coords;
  float x = pos.x;
  float y = pos.y;

  float u = fract(x);
  float v = fract(y);

  x = (x - u) * INV;
  y = (y - v) * INV;

  vec2 posM = coords;
  
  vec2 posA = UNSKEW*(pos - vec2(u,v));
  vec3 rndA = gradient( vec2( x, y ), seed );
  vec2 vecAM = posA - posM;
  
  vec2 posB = posA + RADIUS;
  vec3 rndB = gradient( vec2( x + INV, y + INV ), seed );
  vec2 vecBM = posB - posM;

  vec2 posC;
  vec3 rndC;  
  if( u < v ) {
    posC = posA + UP;
    rndC = gradient( vec2( x, y + INV ), seed );
  } else {
    posC = posA + DOWN;
    rndC = gradient( vec2( x + INV, y ), seed );
  }
  vec2 vecCM = posC - posM;

  vec2 vecCA = posA - posC;
  vec2 vecCB = posB - posC;

  // Calcul des produits scalaires pour chaque sommet.
  float vA = dot(2. * rndA.xy - 1., vecAM);
  float vB = dot(2. * rndB.xy - 1., vecBM);
  float vC = dot(2. * rndC.xy - 1., vecCM);
  // Calcul des poids.
  // r2 est une valeur empirique. Des valeurs éloignées de .16 feront apparaître la grille.
  float r2 = .16;
  float wA = max(0., r2 - dot(vecAM, vecAM));
  float wB = max(0., r2 - dot(vecBM, vecBM));
  float wC = max(0., r2 - dot(vecCM, vecCM));
  // On élève chaque poids à la puissance 4.
  wA *= wA; wA *= wA;
  wB *= wB; wB *= wB;
  wC *= wC; wC *= wC;
  
  float value = wA*vA + wB*vB + wC*vC;
  // Normaliser `value` pour bien étaler entre [-1 et 1].
  // Là encore, c'est une valeur empirique.
  value *= 10000.;

  return value;
}

void main() {
  vec2 coords = (gl_FragCoord.xy - vec2(uniCenterY, uniCenterY)) * ZOOM;
  
  float value = 0.;
  float freq = uniFreq;
  float ampl = uniAmpl;
  float attF = uniFreqAttenuation;
  float attA = uniAmplAttenuation;
  for( int i=0; i<20; i++ ) {
    if( float(i) > uniLoop ) break;
    value += ampl * simplexNoise(coords * freq, 1. + float(i*i) * .1);
    ampl *= attA;
    freq *= attF;
  }
  
  vec3 color;
  if( value < 0. ) color = -value * BLUE;
  else color = value * ORANGE;
  
  gl_FragColor = vec4( color, 1 );
}
