precision mediump float;

varying vec3 varNormal;
varying vec3 varColor;

const vec3 WHITE = vec3(1, 1, 1);
const vec3 BLACK = vec3(0, 0, 0);
const vec3 LIGHT = normalize(vec3(-1,1,1));

void main() {
  float x = mod( gl_FragCoord.x, 6.0 );
  float y = mod( gl_FragCoord.y, 6.0 );
  if( x > 4.5 && y > 4.5) discard;
  vec3 color = varColor;
  vec3 black = WHITE;
  vec3 white = BLACK;
  vec3 normal = normalize(varNormal);
  float light = dot(normal, LIGHT);
  if( light > 0.0 ) gl_FragColor = vec4( mix(varColor, white, light), 1.0 );
  else gl_FragColor = vec4( mix(varColor, black, -light), 1.0 );  
}
