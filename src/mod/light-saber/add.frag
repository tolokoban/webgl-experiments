#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif


uniform sampler2D uniTex0;
uniform sampler2D uniTex1;
uniform float uniBrightness;

varying vec2 varUV;

void main() {
    vec4 color0 = texture2D( uniTex0, varUV );
    vec4 color1 = texture2D( uniTex1, varUV );
    gl_FragColor = uniBrightness * color0 + color1;
}
