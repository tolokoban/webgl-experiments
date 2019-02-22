attribute vec2 attXY;

void main() {
    gl_Position = vec4( attXY, 0, 1);
}
