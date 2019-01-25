#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform sampler2D uniTexture;
uniform float uniDx;
uniform float uniDy;
uniform float uniCenter;
uniform float uniSegment;
uniform float uniCorner;

varying vec2 varUV;

vec4 pickColor(float x, float y, float alpha ) {
    vec4 color = texture2D( uniTexture, varUV + vec2(x, y) );
    return color * alpha;
}

void main() {
    vec4 color =
        pickColor( 0.0, 0.0, uniCenter ) +
        pickColor( -uniDx, 0.0, uniSegment ) +
        pickColor( uniDx, 0.0, uniSegment ) +
        pickColor( 0.0, -uniDy, uniSegment ) +
        pickColor( 0.0, uniDy, uniSegment ) +
        pickColor( -uniDx, -uniDy, uniCorner ) +
        pickColor( -uniDx, uniDy, uniCorner ) +
        pickColor( uniDx, uniDy, uniCorner ) +
        pickColor( uniDx, -uniDy, uniCorner );
    gl_FragColor = color;
}
