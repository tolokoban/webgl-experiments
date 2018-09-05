precision mediump float;

varying vec3 varNormal;
varying vec3 varColor;

const vec3 WHITE = vec3(1, 1, 1);
const vec3 BLACK = vec3(0, 0, 0);
const vec3 LIGHT = normalize(vec3(-1,1,1));

void main() {
  vec3 color = varColor;
  vec3 white = mix(color, WHITE, .7);
  vec3 black = mix(color, BLACK, .7);
  vec3 normal = normalize(varNormal);
  float light = dot(normal, LIGHT);
  if( light > 0.0 ) gl_FragColor = vec4( mix(varColor, white, light), 1.0 );
  else gl_FragColor = vec4( mix(varColor, black, -light), 1.0 );  
}
