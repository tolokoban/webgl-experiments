precision mediump float;


uniform float uniTime;
uniform sampler2D uniRandom;


const float ALPHA = sqrt(3.);
const float INV = 1.0 / 32.0;

const float ZOOM = 0.005;

const float SQRT6 = 2.449489742783178;
const vec2 UP = vec2(-0.25881904510252063, 0.9659258262890683);
const vec2 DOWN = vec2(0.9659258262890683, -0.2588190451025207);


vec3 hue( vec2 rnd ) {
  vec2 v = normalize(rnd - .5 );
  const vec2 RED = vec2( .5, 0.8660254037844386 );
  const vec2 GREEN = vec2( .5, -0.8660254037844386 );
  const vec2 BLUE = vec2( -1, 0 );

  return vec3(clamp( dot( v, RED ), 0., 1. ),
              clamp( dot( v, GREEN ), 0., 1. ),
              clamp( dot( v, BLUE ), 0., 1. ));              
}

float computeDis( vec2 pt ) {
  vec2 pt2 = pt;
  float x = pt2.x;
  float y = pt2.y;
  return smoothstep( 0., 1., 1. - (x*x + y*y) );
}

void main() {
  float ang = 0.; //uniTime * 0.0001;
  float c = cos( ang );
  float s = sin( ang );
  mat2 rotation = mat2(c, -s, s, c);

  vec2 coords = rotation * gl_FragCoord.xy * ZOOM;

  float alpha = ALPHA;
  float sa = (1.0 + alpha);
  float sb = (alpha - 1.0);
  mat2 skew = mat2( sa, sb, sb, sa ); 
  mat2 unskew = mat2( sa, -sb, -sb, sa ) / (4. * alpha); 
  vec2 pos = skew * coords;
  float x = pos.x;
  float y = pos.y;

  float u = fract(x);
  float v = fract(y);

  x = (x - u) * INV;
  y = (y - v) * INV;

  vec2 posM = coords;
  
  vec2 pos0 = unskew*(pos - vec2(u,v));
  vec2 rnd0 = texture2D( uniRandom, vec2( x, y ) ).xy;
  float dis0 = computeDis( posM - pos0 );
  
  vec2 pos1 = pos0 + ZOOM;
  vec2 rnd1 = texture2D( uniRandom, vec2( x + INV, y + INV ) ).xy;
  float dis1 = computeDis( posM - pos1 );

  vec2 pos2;
  vec2 rnd2 = vec2( 0 );
  float dis2 = 0.;
  
  if( u < v ) {
    pos2 = pos0 + UP;
    rnd2 = texture2D( uniRandom, vec2( x, y + INV ) ).xy;
  } else {
    pos2 = pos0 + DOWN;
    rnd2 = texture2D( uniRandom, vec2( x + INV, y ) ).xy;
  }
  dis2 = computeDis( posM - pos2 );

  vec3 color = hue(rnd0) * dis0 + hue(rnd1) * dis1 + hue(rnd2) * dis2;
  
  if( abs(u - v) < 0.01 ) color *= abs(u - v) / 0.01;
  
  float d = distance(posM, pos0);
  if( d < 0.1 ) color = vec3(0);
  d = distance(posM, pos1);
  if( d < 0.05 ) color.g = 1.;
  d = distance(posM, pos2);
  if( d < 0.05 ) color.r = 1.;
  
  
  d = distance( posM, vec2(0) );
  if( d > 1./sqrt(6.) && d < 2./sqrt(6.) ) color *= .2;
  
  gl_FragColor = vec4( color, 1 );
}
