precision mediump float;

uniform sampler2D uniTexture;
uniform vec4 uniColor;

varying vec2 varUV;

const vec4 BLACK = vec4( 0, 0, 0, 0 );

void main() {
    vec4 color = texture2D( uniTexture, varUV );
    if( distance( color, uniColor ) < 0.1 ) gl_FragColor = color;
    else gl_FragColor = BLACK;
}
