precision mediump float;
// Couleur principale du modèle.
const vec3 COLOR = vec3(1, .5, 0);
const vec3 WHITE = vec3(1, 1, 1);
const vec3 BLACK = vec3(0, 0, 0);

// Direction de la lumière.
const vec3 LIGHT = normalize( vec3(10, -5, -2) );

const float LEVELS = 3.0;

varying vec3 varNormal;

void main() {
  vec3 color = COLOR;

  vec3 normal = normalize( varNormal );
  vec3 reflection = reflect( LIGHT, normal );
  float r = 1.0 + floor( 0.5 * LEVELS * (reflection.z + 1.0) );
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  if( r < LEVELS ) {
    if( mod( x - y, r * 4.0 ) < 1.0 ) color *= .5;      
  }
  
  gl_FragColor = vec4( color, 1.0 );
}
