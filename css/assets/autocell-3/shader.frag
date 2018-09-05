precision mediump float;

varying vec2 varPos;
uniform float uniTime;
uniform sampler2D uniTexture;

const vec3 GREEN = vec3(.7,.5,.2);
const vec3 YELLOW = vec3(1,1,.7);
const vec3 RED = vec3(.6,.4,.1);

void main() {
  vec4 color = texture2D( uniTexture, varPos );
  //gl_FragColor = color;
  vec3 c1;
  vec3 c2;
  float t = color.r;
  if( t < 0.25 ) {
    c1 = GREEN;
    c2 = YELLOW;
    t *= 4.0;
  }
  else if( t < 0.5 ) {
    c1 = YELLOW;
    c2 = RED;
    t = (t - 0.25) * 4.0;
  }
  else if( t < 0.75 ) {
    c1 = RED;
    c2 = YELLOW;
    t = (t - 0.5) * 4.0;
  }
  else {
    c1 = YELLOW;
    c2 = GREEN;
    t = (t - 0.75) * 4.0;
  }
  
  gl_FragColor = vec4(mix( c1, c2, t ), 1.0 );
}
