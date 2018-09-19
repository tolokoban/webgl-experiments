precision mediump float;
uniform vec3 uniColor;

// Couleur principale du modèle.
const vec3 WHITE = vec3(1, 1, 1);
const vec3 BLACK = vec3(0, 0, 0);

// Direction de la lumière.
const vec3 LIGHT = normalize( vec3(10, -5, -2) );

varying vec3 varNormal;

void main() {
  vec3 color = uniColor;

  vec3 normal = normalize( varNormal );
  vec3 reflection = reflect( LIGHT, normal );
  float r = reflection.z;
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  
  if( r < -0.5 ) {
    color *= .3;
  }
  else if( r < 0.5 ) {
    color *= .6;
  }
  
  gl_FragColor = vec4( color, 1.0 );
}
