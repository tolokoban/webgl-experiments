attribute vec3 attVertexPosition;

varying vec4 attPosition;

void main() {
  gl_Position = vec4(
      attVertexPosition.x, attVertexPosition.y,
      0.0, 1.0);
  gl_PointSize = 250.0;
  attPosition = gl_Position;
}
