precision mediump float;

varying vec4 attPosition;

void main() {
  float x = gl_PointCoord.x - 0.5;
  float y = gl_PointCoord.y - 0.5;
  float r = x*x + y*y;

  if (r > 0.25) {
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );
  } else {
    gl_FragColor = vec4( 1.0, gl_PointCoord.x, 0.0, 1.0 );
  }
}
