#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform vec4 uniColor;

void main() {
  gl_FragColor = uniColor;
}
