precision mediump float;
uniform vec3 uniColor;

varying vec3 varNormal;

void main() {
  vec3 color = uniColor;
  vec3 black = color * .4;
  
  vec3 normal = normalize( varNormal );
  vec3 reflection = reflect( vec3(0,0,1), normal );
  if( reflection.z > 0.0 ) {
    color = black;
  }
  else if( reflection.z > -0.1 ) {
    color = mix(color, black, 1.0  + reflection.z * 10.0 );
  }
  
  gl_FragColor = vec4( color, 1.0 );
}
