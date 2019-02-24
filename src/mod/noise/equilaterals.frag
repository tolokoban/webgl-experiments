#ifdef GL_ES
precision mediump float;
#endif


uniform float uniTime;
uniform float uniCenterX;
uniform float uniCenterY;

const vec3 COLOR0 = vec3(.7, 1, 0);
const vec3 COLOR1 = vec3(.3, 0, 1);
const vec3 COLOR2 = vec3(1, .4, 0);
const vec3 COLOR3 = vec3(0, 1, 1);
const vec3 COLOR4 = vec3(.7, .7, 0);
const vec3 COLOR5 = vec3(1, .3, .7);
const vec3 COLOR6 = vec3(1, 1, 0);
const vec3 COLOR7 = vec3(1, .7, .3);

const float ALPHA = sqrt(3.);

void main() {
  float ang = uniTime * 0.0001;
  float c = cos( ang );
  float s = sin( ang );
  mat2 rotation = mat2(c, -s, s, c);
  
  vec2 coords = gl_FragCoord.xy - vec2( uniCenterX, uniCenterY );
  
  float zoom = 0.0075;
  float t = mod( uniTime, 30000.0 );
  float transition;
  
  if( t < 15000.0 ) transition = 0.0;
  else if ( t < 20000.0 ) transition = smoothstep(15000.0, 20000.0, t);
  else if ( t < 25000.0 ) transition = 1.0;
  else transition = 1.0 - smoothstep(25000.0, 30000.0, t);
  
  float alpha = mix(ALPHA, 1.0, transition);
  float sa = (1.0 + alpha);
  float sb = (alpha - 1.0);
  mat2 skew = mat2( sa, sb, sb, sa );
  vec2 pos = skew * rotation * coords * zoom;
  float x = pos.x;
  float y = pos.y;

  float u2 = fract(x * .5);
  float v2 = fract(y * .5);
  float u = fract(x);
  float v = fract(y);

  vec3 color;
  
  if( u2 < .5 ) {
    if( v2 < .5 ) {
      if( u < v ) color = COLOR0;
      else color = COLOR1;
    }
    else {
      if( u < v ) color = COLOR2;
      else color = COLOR3;
    }
  }
  else {
    if( v2 < .5 ) {
      if( u < v ) color = COLOR4;
      else color = COLOR5;
    }
    else {
      if( u < v ) color = COLOR6;
      else color = COLOR7;
    }
  }

  float grayscale = 0.2989 * color.r + 0.5870 * color.g + 0.1140 * color.b;
  gl_FragColor = vec4( mix(color, vec3(grayscale, grayscale, grayscale), transition), 1 );

  // Afficher la grande diagonale.
  if( abs(u - v) < 0.04 ) gl_FragColor = vec4( gl_FragColor.rgb * 25. * abs( u - v), 1 );
}
