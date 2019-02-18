// Perspective
uniform mat4 uniProjection;

// Point
attribute vec3 attPoint;

void main() {
  gl_Position = uniProjection * attPoint;
}
