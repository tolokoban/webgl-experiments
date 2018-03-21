const highp float PI = 3.1415926539;
const lowp vec3 COLOR0 = vec3(0.0, 0.466667, 1.0);
const lowp vec3 COLOR1 = vec3(1.0, 0.6470588235294118, 0.0);
const lowp float RADIUS = 0.05;

varying lowp vec2 varVertexPosition;

uniform lowp float uniTimeF;

void main() {
  highp float time = uniTimeF * 0.0005;
  
  lowp float x = varVertexPosition.x;
  lowp float y = varVertexPosition.y;

  x += sin(y);
  
  lowp float w = RADIUS * abs(cos(x));
  lowp float h = RADIUS * abs(cos(y));
  lowp float xx = mod(x, w) - w * 0.5;
  lowp float yy = mod(y, h) - h * 0.5;
  lowp float r = sqrt(xx*xx + yy*yy);
  lowp float limit = RADIUS * abs(cos(time + x - y*y));
  
  if( r > limit || r < limit * 0.5 ) {
    gl_FragColor = vec4( COLOR0, 1.0);
  } else {
    gl_FragColor = vec4( COLOR1, 1.0);
  }
}
