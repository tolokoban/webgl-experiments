attribute vec2 attVertexPosition;

uniform float uniTimeV;
uniform float uniWidth;
uniform float uniHeight;

varying lowp vec2 varVertexPosition;

void main() {
  highp float time = uniTimeV;

  varVertexPosition = attVertexPosition;
  
  float x0 = attVertexPosition.x * 1.4;
  float y0 = attVertexPosition.y * 1.4;

  float ang = time * 0.0002;
  
  float x = x0 * cos(ang) - y0 * sin(ang);
  float y = x0 * sin(ang) + y0 * cos(ang);
  
  if( uniWidth > uniHeight ) {
    y *= uniWidth / uniHeight;
  } else {
    x *= uniHeight / uniWidth;
  }
  float r = 1.25 + 0.25 * cos( time * 0.0002 );
  gl_Position = vec4( x * r, y * r, 0.0, 1.0 );
}
