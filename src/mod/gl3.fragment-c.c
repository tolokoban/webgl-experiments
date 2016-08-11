varying lowp vec3 varVertexPosition;

void main() {
  // Couleur de la trame.
  lowp float r1 = 1.0;
  lowp float g1 = 0.5;
  lowp float b1 = 0.0;
  // Couleur du fond.
  lowp float r2 = 0.0;
  lowp float g2 = 0.0;
  lowp float b2 = 1.0;

  lowp float x = mod( varVertexPosition.x, 16.0 ) - 8.0;
  lowp float y = mod( varVertexPosition.y, 16.0 ) - 8.0;

  highp float radius = sqrt( (x*x) + (y*y) );

  highp float dist = sqrt( varVertexPosition.x * varVertexPosition.x 
                           + varVertexPosition.y * varVertexPosition.y );
  dist = dist / 300.0;
  
  lowp float limit = dist * 9.0;

  if( radius < limit ) gl_FragColor = vec4( r1, g1, b1, 1.0 );
  else {
    // Ici, on fait de l'anti-aliasing.
    lowp float c2 = clamp( radius - limit, 0.0, 1.0 );
    lowp float c1 = 1.0 - c2;
    gl_FragColor = vec4( c1 * r1 + c2 * r2, 
                         c1 * g1 + c2 * g2, 
                         c1 * b1 + c2 * b2, 
                         1.0 );
  }
}
