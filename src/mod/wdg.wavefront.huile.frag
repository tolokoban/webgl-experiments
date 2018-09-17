precision mediump float;
// Couleur principale du modèle.
const vec3 COLOR = vec3(1, .5, 0);
const vec3 BLACK = COLOR * .4;

varying vec3 varNormal;

void main() {
  vec3 color = COLOR;

  vec3 normal = normalize( varNormal );
  vec3 reflection = reflect( vec3(0,0,1), normal );
  if( reflection.z > 0.0 ) {
    color = BLACK;
  }
  else if( reflection.z > -0.1 ) {
    color = mix(color, BLACK, 1.0  + reflection.z * 10.0 );
  }
  
  gl_FragColor = vec4( color, 1.0 );
}
