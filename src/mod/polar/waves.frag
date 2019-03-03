precision mediump float;


uniform float uniTime;
uniform float uniCenterX;
uniform float uniCenterY;

const float PI = 3.141592653589793;
const float PI23 = 2. * PI / 3.;

const vec3 W = vec3(1,1,1);
const vec3 B = vec3(0,0,0);


vec2 convertToPolarCoords() {
  vec2 pt = gl_FragCoord.xy - vec2(uniCenterX, uniCenterY);
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
    // D1
    if( D2 < w ) {
      // D1 + D2
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
      // D1 + !D2
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
    // !D1
    if( D2 < w ) {
      // !D1 + D2
      if( D3 < w ) {
        // !D1 + D2 + D3
        if( z2 < z3 ) D = D2;
        else D = D3;
      } else {
        // !D1 + D2 + !D3
        D = D2;
      }            
    } else {
      // !D1 + !D2
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

void main() {
  vec2 coords = convertToPolarCoords();

  float v = wave( coords, 170., 30. );

  gl_FragColor = vec4(mix( W, B, v ), 1);
}
