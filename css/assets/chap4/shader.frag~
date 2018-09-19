const highp float PI = 3.1415926539;
const lowp vec3 COLOR0 = vec3(1.0, 0.6470588235294118, 0.0);
const lowp vec3 COLOR1 = vec3(0.0, 0.466667, 1.0);

varying lowp vec3 varVertexPosition;

uniform lowp float uniTimeF;

void main() {
  highp float time = uniTimeF * 0.0005;
  
  lowp float x = varVertexPosition.x + time * 120.0;
  lowp float y = varVertexPosition.y + sin(time * 0.7) * 150.0;

  lowp float w = 40.0;
  lowp float h = w;
  lowp float xx = mod(x, w) - w * 0.5;
  lowp float yy = mod(y, h) - h * 0.5;
  lowp float r = xx*xx + yy*yy;
  lowp float limit = 1200.0 + 1000.0 * cos( time  - (varVertexPosition.x + varVertexPosition.y) * .01);
  
  if( r > limit || r < limit * 0.25 ) {
    gl_FragColor = vec4( COLOR1, 1.0);
  } else {
    gl_FragColor = vec4( COLOR0, 1.0);
  }
}
