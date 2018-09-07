uniform mat4 uniProjection;
uniform mat4 uniRotation;
uniform float uniScreenWidth;

attribute vec3 attPoint;
attribute float attRadius;

varying float varDepth;

void main() {
  vec4 translation = vec4(0, 0, -2.5, 0);
  vec4 vertex = uniRotation * vec4( attPoint, 1 );
  varDepth = clamp( vertex.z, -1.0, 1.0 ) * .3;
  vertex +=  translation;
  gl_Position = uniProjection * vertex;

  vec4 point = vec4( attRadius, 0, vertex.z, 1 );
  vec4 size = uniProjection * point;
  
  gl_PointSize = uniScreenWidth * size.x / size.w;

}
