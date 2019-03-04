precision mediump float;


uniform float uniTime;
uniform float uniCenterX;
uniform float uniCenterY;

const float RING = 30.;
const float FACTOR1 = .083;
const float INV_FACTOR1 = 1. / FACTOR1;

const float FACTOR2 = .061;
const float INV_FACTOR2 = 1. / FACTOR2;

const float FACTOR3 = .02;
const float INV_FACTOR3 = 1. / FACTOR3;

const float PI = 3.141592653589793;
const float INV_PI = 0.3183098861837907;
const float PI2 = 2. * PI;
const float PI23 = 2. * PI / 3.;
const float SECTOR7 = 2. * PI / 7.;
const float SECTOR16 = 2. * PI / 16.;

const vec3 W = vec3(.5,.8,1.4);
const vec3 B = vec3(.8,.9,1.0);


vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    vec2 i00 = i;
    vec2 i01 = i + vec2(0, 1);
    vec2 i10 = i + vec2(1, 0);
    vec2 i11 = i + vec2(1, 1);
    if( i10.x >= RING ) i10.x -= RING;
    if( i11.x >= RING ) i11.x -= RING;
    
    return mix( mix( dot( random2(i00), f - vec2(0.0,0.0) ),
                     dot( random2(i10), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i01), f - vec2(0.0,1.0) ),
                     dot( random2(i11), f - vec2(1.0,1.0) ), u.x), u.y);
}

vec2 convertToPolarCoords(vec2 coords) {
    vec2 pt = coords - vec2(uniCenterX, uniCenterY);
    float r = length(pt);
    float a = abs(mod(atan(pt.y,pt.x) + PI * .5, PI2) - PI);
    a *= INV_PI * INV_FACTOR1 * RING;
    return vec2( a, r );
}

void main() {
    vec2 coords = convertToPolarCoords(gl_FragCoord.xy);
    
    float border = .12;
    float v = noise(gl_FragCoord.xy * FACTOR3);
    v += noise((gl_FragCoord.xy - vec2(0,uniTime * 0.01)) * FACTOR3 * 1.745);
    v += noise((gl_FragCoord.xy + vec2(0,uniTime * 0.01)) * FACTOR3 * 1.334);
    
    if( v > -border && v < border ) v = smoothstep(-border * .05, border * .05, v);
    else if( v > 0. ) {
        v = 1.;
    } else {
        v = noise((gl_FragCoord.xy - vec2(uniTime * 0.005, 0)) * FACTOR1);
        v += noise((gl_FragCoord.xy + vec2(uniTime * 0.005, 0)) * FACTOR2);
        v = abs(v);
        v = 1. - smoothstep(.02, .06, v);
    }
    
    gl_FragColor = vec4(mix( W, B, v ), 1);
}
