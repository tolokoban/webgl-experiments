precision mediump float;


uniform float uniTime;
uniform float uniCenterX;
uniform float uniCenterY;

const float PI = 3.141592653589793;
const float PI2 = 2. * PI;
const float PI23 = 2. * PI / 3.;
const float SECTOR7 = 2. * PI / 7.;
const float SECTOR16 = 2. * PI / 16.;

const vec3 W = vec3(1,.8,.4);
const vec3 B = vec3(.3,.2,.1);


vec2 convertToPolarCoords(vec2 coords) {
    vec2 pt = coords - vec2(uniCenterX, uniCenterY);
    float r = length(pt);
    float a = atan(pt.y,pt.x);
    return vec2( a, r );
}

float wave( vec2 coords, float dist, float radius ) {
    float x = coords.x;
    float y = coords.y;
    float w = 8.;
    float R = radius - w;

    float s1 = uniTime * 0.001;
    float s2 = s1 + cos(uniTime * 0.0008541) * .7 + PI23;
    float s3 = s2 + sin(uniTime * 0.0007105) * .7 + PI23;

    float a1 = x * 6. + s1;
    float D1 = abs(y - dist + R * cos( a1 ));
    float z1 = sin( a1 );
    float a2 = x * 6. + s2;
    float D2 = abs(y - dist + R * cos( a2 ));
    float z2 = sin( a2 );
    float a3 = x * 6. + s3;
    float D3 = abs(y - dist + R * cos( a3 ));
    float z3 = sin( a3 );

    float D = 0.;

    if( D1 < w ) {
        if( D2 < w ) {
            if( D3 < w ) {
                // D1 + D2 + D3
                if( z1 > z2 ) {
                    // z1 > z2
                    if( z2 > z3 ) D = D1;
                    else if( z1 > z3 ) D = D1;
                    else D = D3;
                } else {
                    // z2 > z1
                    if( z1 > z3 ) D = D2;
                    else if( z2 > z3 ) D = D2;
                    else D = D3;
                }
            } else {
                // D1 + D2 + !D3
                if( z1 > z2 ) D = D1;
                else D = D2;
            }
        } else {
            if( D3 < w ) {
                // D1 + !D2 + D3
                if( z1 > z3 ) D = D1;
                else D = D3;
            } else {
                // D1 + !D2 + !D3
                D = D1;
            }
        }
    } else {
        if( D2 < w ) {
            if( D3 < w ) {
                // !D1 + D2 + D3
                if( z2 < z3 ) D = D2;
                else D = D3;
            } else {
                // !D1 + D2 + !D3
                D = D2;
            }
        } else {
            if( D3 < w ) {
                // !D1 + !D2 + D3
                D = D3;
            } else {
                // !D1 + !D2 + !D3
                return 0.;
            }
        }
    }

    return 1. - smoothstep( w * .4, w * .4 + 2., D );
}


float dots( vec2 coords, float radius ) {
    float ang = mod(coords.x - uniTime * 0.0000648132, SECTOR7) - .5 * SECTOR7;
    float x = abs(ang * coords.y);
    float y = abs(coords.y - radius);
    float r = 20. + 4. * sin(uniTime * 0.001 + coords.x);
    float d = sqrt(x*x + y*y);
    float x0 = coords.y * cos(ang) - radius;
    float y0 = coords.y * sin(ang);
    d = sqrt(x0*x0 + y0*y0);

    if( d < r ) {
        if( d < r - 6. ) return 1. - smoothstep(0., 2., r - 6. - d);
        return 1. - smoothstep(r * .9, r, d);
    }
    if( y < 5. && d > r + 5. ) {
        float s = max((r + 7.) - d, 0.);
        s = max( s, max(y - 3., 0.) );
        return .5 - .5 * smoothstep(0., 2., s);
    }
    return 0.;
}


float rays( float radius ) {
    vec2 coords = convertToPolarCoords(gl_FragCoord.xy + vec2(0., 20.));
    float ang = mod(coords.x + uniTime * 0.000482, SECTOR16) - .5 * SECTOR16;
    float y = coords.y * (1.2 + .3 * cos(coords.x + PI * .5));
    float x = y * abs(ang * coords.y);
    float w = 600. * smoothstep( 0., radius, .5 * radius - abs(y - .5 * radius) );

    if( x > w ) return 0.;

    float k = w - x;
    
    return smoothstep(0., 200., k);
}


void main() {
    vec2 coords = convertToPolarCoords(gl_FragCoord.xy);

    float v;

    if( coords.y < 140. ) v = dots( coords, 100. ) + rays( 100. );
    else v = wave( coords, 170., 30. );

    gl_FragColor = vec4(mix( W, B, v ), 1);
}
