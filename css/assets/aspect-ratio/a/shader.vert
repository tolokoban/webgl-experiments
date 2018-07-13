uniform float uniTime;
uniform float uniWidth;
uniform float uniHeight;

attribute float attAngle;
attribute float attRayon;
attribute float attRouge;
attribute float attVert;
attribute float attBleu;

varying vec3 varColor;

void main() {
  varColor = vec3( attRouge, attVert, attBleu );
  
  float a = radians( attAngle ) + uniTime * 0.0001;
  float x = sin( a ) * attRayon;
  float y = cos( a ) * attRayon;

  if( uniWidth > uniHeight ) {
    // Mode paysage.
    x *= uniHeight / uniWidth;
  } else {
    // Mode portrait.
    y *= uniWidth / uniHeight;
  }
  
  gl_Position = vec4( x, y, 0.0, 1.0 );
}
