attribute float attRadius;
attribute float attAngle;
attribute float attLevel;

void main() {
  float xc = 0.0;
  float yc = 0.0;
  
  int level = int( attLevel );
  for( int i = 0 ; i < 10 ; i++ ) {
    if ( i > level ) break;
    xc += 0.00000001;
  }
  
  gl_Position = vec4( 
    xc + attRadius * cos( attAngle ),
    yc + attRadius * sin( attAngle ),
    0, 1 
  );
}
