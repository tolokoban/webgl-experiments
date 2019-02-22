#ifdef GL_ES
precision mediump float;
#endif

uniform float uniFactorX;
uniform float uniFactorY;
uniform float uniSize;
uniform float uniMode;

uniform sampler2D uniRandom;

const float CELLS = 8.0;
const float INV = 1.0 / CELLS;

const vec3 ORANGE = vec3(1., .5, 0.);
const vec3 BLUE = vec3(0, .4, .867);

float interpolate( float a ) {
  if( uniMode > 1.5 ) return a*a*a*(a*(a*6.-15.)+10.);
  if( uniMode > 0.5 ) return smoothstep( 0.0, 1.0, a );
  return a;
}

void main() {
  float INV = 1.0 / uniSize;
  
  vec2 A = vec2( 0, 0 );
  vec2 B = vec2( 0, INV );
  vec2 C = vec2( INV, INV );
  vec2 D = vec2( INV, 0 );

  vec2 coords = vec2( gl_FragCoord.x * uniFactorX, gl_FragCoord.y * uniFactorY );

  vec2 cellA = fract( coords * uniSize );
  vec2 cellB = cellA - vec2(0, 1);
  vec2 cellC = cellA - vec2(1, 1);
  vec2 cellD = cellA - vec2(1, 0);

  coords = coords - cellA * INV;

  vec2 gradA = 2.0 * (texture2D( uniRandom, coords + A ).xy - 0.5);
  vec2 gradB = 2.0 * (texture2D( uniRandom, coords + B ).xy - 0.5);
  vec2 gradC = 2.0 * (texture2D( uniRandom, coords + C ).xy - 0.5);
  vec2 gradD = 2.0 * (texture2D( uniRandom, coords + D ).xy - 0.5);

  float vA = dot( cellA, gradA );
  float vB = dot( cellB, gradB );
  float vC = dot( cellC, gradC );
  float vD = dot( cellD, gradD );

  float alphaX = interpolate( cellA.x );
  float alphaY = interpolate( cellA.y );

  float vAB = mix(vA, vB, alphaY);
  float vCD = mix(vD, vC, alphaY);

  float v = 2.0 * mix(vAB, vCD, alphaX);

  // Les valeurs positives seront orange,
  if( v > 0.0 ) gl_FragColor = vec4( v * ORANGE, 1 );
  // les négatives seront bleues.
  else gl_FragColor = vec4( -v * BLUE, 1 );

  // Ajouter les liserés blancs.
  gl_FragColor.a = smoothstep(0.0, 0.2, abs( v ) );
}
