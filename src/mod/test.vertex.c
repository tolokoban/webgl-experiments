attribute vec3 attVertexPosition;

varying vec4 attPosition;

void main() {
  gl_Position = vec4( attVertexPosition.xyz, 1.0 );
  gl_PointSize = 250.0
    + (attVertexPosition.z - 1.0) * 120.0;
  attPosition = gl_Position;
}
