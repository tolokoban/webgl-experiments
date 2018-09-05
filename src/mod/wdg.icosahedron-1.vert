uniform mat4 uniProjection;
uniform mat4 uniRotation;
uniform float uniExpansion;

attribute vec3 attPoint;
attribute vec3 attNormal;
attribute vec3 attColor;

varying vec3 varNormal;
varying vec3 varColor;

void main() {
  varColor = attColor;
  vec4 normal = uniRotation * vec4( attNormal, 1 );
  varNormal = normal.xyz;
  vec4 translation = vec4(0, 0, -2.5, 0);
  vec4 vertex = uniRotation
    * vec4( uniExpansion * attNormal + attPoint, 1 ) + translation;
  gl_Position = uniProjection * vertex;
}
