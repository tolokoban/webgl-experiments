uniform mat4 uniProjection;
uniform mat4 uniRotation;
uniform float uniScreenWidth;

// Rayon de la sphère
uniform float uniRadius;
// Distance de la sphère au centre.
uniform float uniDistance;
// Facteur de diminution des rayons des sphères successives.
uniform float uniAlpha;

attribute vec3 attPoint;
attribute float attLevel;

varying vec3 varAxis;


void main() {
  vec4 axis = uniRotation * vec4( attPoint, 1 );
  varAxis = normalize( axis.xyz );
  
  vec4 translation = vec4(0, 0, -2.5, 0);
  
  float alpha1 = pow( uniAlpha, attLevel );
  float alpha2 = alpha1 * uniAlpha;
  float dist = uniDistance - uniRadius * (1.0 + alpha1) + 2.0 * uniRadius * (alpha2 - 1.0) / (uniAlpha - 1.0);
  
  vec4 vertex = uniRotation * vec4( attPoint * dist, 1 );  
  vertex +=  translation;
  gl_Position = uniProjection * vertex;

  vec4 point = vec4( uniRadius * alpha1, 0, vertex.z, 1 );
  vec4 size = uniProjection * point;
  
  gl_PointSize = uniScreenWidth * size.x / size.w;
}
