#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform sampler2D uniTexture;
uniform vec4 uniColor;

varying vec2 varUV;

void main() {
    vec4 color = texture2D( uniTexture, varUV );
    if( distance( color, uniColor ) < 0.1 ) gl_FragColor = color;
    else discard;
}
