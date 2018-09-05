precision mediump float;

uniform sampler2D texture;

varying float z;
varying vec2 uv;

void main() {
  vec3 color = texture2D( texture, uv ).xyz;
  float luminosite = 1.0 + z;
  gl_FragColor = vec4( color * luminosite, 1.0 );
}
