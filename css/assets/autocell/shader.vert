attribute vec2 attPos;
varying vec2 varPos;

void main() {
  varPos = vec2((1.0 + attPos.x) * 0.5,
                (1.0 + attPos.y) * 0.5);
  gl_Position = vec4( attPos, 0.0, 1.0 );
}
