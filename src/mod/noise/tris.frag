#ifdef GL_ES
precision mediump float;
#endif


uniform float uniTime;

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

  float dist = coords.x * coords.x + coords.y * coords.y;  
  float radius = 13000.0;
  float thickness = 500.0;
  float shadow = smoothstep(radius - thickness, radius + thickness, dist);
  shadow *= 1.0 - shadow;
  shadow = 2.0 * shadow;
  color += shadow;
  
  float grayscale = 0.2989 * color.r + 0.5870 * color.g + 0.1140 * color.b;
  gl_FragColor = vec4( mix(color, vec3(grayscale, grayscale, grayscale), transition), 1 );
}
