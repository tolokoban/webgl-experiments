precision mediump float;
// Couleur principale du modèle.
const vec3 COLOR = vec3(1, .5, 0);
const vec3 WHITE = vec3(1, 1, 1);
const vec3 BLACK = vec3(0, 0, 0);

// Direction de la lumière.
const vec3 LIGHT = normalize( vec3(10, -5, -2) );

varying vec3 varNormal;

void main() {
  vec3 color = COLOR;

  vec3 normal = normalize( varNormal );
  vec3 reflection = reflect( LIGHT, normal );
  float r = reflection.z;
  float R = 0.5 + 0.25 * (1.0 + r);
  
  gl_FragColor = vec4( color * R, 1.0 );
}
