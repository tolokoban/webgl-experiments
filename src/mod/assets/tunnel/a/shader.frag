precision mediump float;

uniform vec3 color;

varying float z;

void main() {
  gl_FragColor = vec4( color / z, 1.0 );
}
