varying lowp vec3 varVertexPosition;

void main() {
  lowp float x = varVertexPosition.x;
  lowp float y = varVertexPosition.y;

  highp float radius = sqrt( (x*x) + (y*y) );

  highp float r = abs( cos( radius / 77.12 ) );
  highp float g = abs( cos( radius / 33.27 ) );
  highp float b = abs( cos( radius / 62.43 ) );
  
  gl_FragColor = vec4( r, g, b, 1.0 );
}
