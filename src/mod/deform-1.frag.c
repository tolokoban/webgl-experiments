precision mediump float;

varying float varBrightness;

const vec4 COLOR_TOP = vec4(98.0 / 255.0, 110.0 / 255.0, 48.0 / 255.0, 1);
const vec4 COLOR_BOTTOM = vec4(193.0 / 255.0, 190.0 / 255.0, 145.0 / 255.0, 1);

void main() {
  gl_FragColor = mix( COLOR_BOTTOM, COLOR_TOP, varBrightness );
}
