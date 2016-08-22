precision mediump float;

uniform sampler2D uniTexture;

varying vec2 varUV;

const float S = 1.0 / 128.0;

void main() {
  float u = abs(varUV.x);
  float v = abs(varUV.y);
  
  vec4 color = texture2D( uniTexture, vec2(u, v) );
  if (varUV.x < 0.0) {
    if (varUV.y < 0.0) {
      gl_FragColor = color;
    } else {
      gl_FragColor = vec4( color.b, color.r, color.g, color.a );
    }
  } else {
    if (varUV.y < 0.0) {
      gl_FragColor = vec4( vec3(1.0, 1.0, 1.0) - color.rgb, 1.0 );
    } else {
      gl_FragColor = color * 9.0
        - texture2D( uniTexture, vec2(u - S, v - S) )
        - texture2D( uniTexture, vec2(u    , v - S) )
        - texture2D( uniTexture, vec2(u + S, v - S) )
        - texture2D( uniTexture, vec2(u - S, v    ) )
        - texture2D( uniTexture, vec2(u + S, v    ) )
        - texture2D( uniTexture, vec2(u - S, v + S) )
        - texture2D( uniTexture, vec2(u    , v + S) )
        - texture2D( uniTexture, vec2(u + S, v + S) );
      if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
      }
    }
  }
}
