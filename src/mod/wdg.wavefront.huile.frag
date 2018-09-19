precision mediump float;
uniform vec3 uniColor;

// Direction de la lumière.
const vec3 LIGHT = normalize( vec3(10, -5, -2) );

varying vec3 varNormal;

void main() {
  vec3 color = uniColor;

  vec3 normal = normalize( varNormal );
  vec3 reflection = reflect( LIGHT, normal );
  float r = reflection.z;
  float R = 0.0 + 0.5 * (1.0 + r);
  
  if( r < -.95 ) color *= mix( 1.0, R, 12.0 * (1.0 + r));
  else if( r > .82 ) color = mix( color, vec3(1, 1, 1), 0.9);
  else if( r > .8 ) color = mix( color * R, vec3(1, 1, 1), 50.0 * (r - .8));
  else color *= R;
  gl_FragColor = vec4( color, 1.0 );
}
