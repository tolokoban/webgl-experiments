varying lowp vec3 varVertexPosition;

void main() {
  if (mod( varVertexPosition.x, 20.0 ) > 6.0) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
