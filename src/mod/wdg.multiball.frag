precision mediump float;

varying float varDepth;

const vec3 WHITE = vec3(1, 1, 1);
const vec3 BLACK = vec3(0, 0, 0);
const vec3 DARK = vec3(.4, .2, 0);
const vec3 COLOR = vec3(1, .5, 0);

void main() {
  float x = 2.0 * (gl_PointCoord.x - .5);
  float y = 2.0 * (gl_PointCoord.y - .5);
  float r = x * x + y * y;
  if( r > 1.0 ) discard;
  if( r > .8 ) {
    gl_FragColor = vec4( 0, 0, 0, 1 );
    return;
  }
  
  vec3 color = mix( COLOR, DARK, r );
  float z = varDepth;
  if( z > 0.0 )
    color = mix( color, WHITE, z );
  else
    color = mix( color, BLACK, -z );
  gl_FragColor = vec4( color, 1.0 );
}
