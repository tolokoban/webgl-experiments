precision mediump float;

uniform vec3 color;

varying float z;

void main() {
  float luminosite = 1.0 + z;
  gl_FragColor = vec4( color * luminosite, 1.0 );
}
