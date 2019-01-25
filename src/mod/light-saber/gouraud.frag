#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec3 varColor;

void main() {
  gl_FragColor = vec4( varColor, 1.0 );
}
