attribute vec3 attVertexPosition;

void main() {
  gl_Position = vec4(
      attVertexPosition.x, attVertexPosition.y,
      0.0, 1.0);
}
