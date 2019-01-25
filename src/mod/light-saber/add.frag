precision mediump float;

uniform sampler2D uniTex0;
uniform sampler2D uniTex1;

varying vec2 varUV;

void main() {
    vec4 color0 = texture2D( uniTex0, varUV );
    vec4 color1 = texture2D( uniTex1, varUV );
    gl_FragColor = 0.7 * color0 + color1;
}