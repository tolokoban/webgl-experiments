uniform mat4 uniProjection;

attribute vec3 attPoint;
attribute vec3 attColor;

varying vec4 varColor;

void main() {  
  varColor = vec4( attColor, 1.0 );
  // Une simple multiplication permet d'appliquer
  // la perspective.
  gl_Position = uniProjection * vec4( attPoint, 1.0 );
}
