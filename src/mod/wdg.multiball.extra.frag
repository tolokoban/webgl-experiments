precision mediump float;

const vec3 BLACK = vec3(0, 0, 0);
const vec3 WHITE = vec3(1, 1, 1);
const vec3 ORANGE = vec3(1, .5, 0);
const vec3 BLUE = vec3(0, .4, .866666667);

const vec3 LIGHT = normalize(vec3(-1, 2, 4));

varying vec3 varAxis;


/**
 * Si on fait face à un point de coordonnées (x,y) dans un cercle 2D.
 * On peut imaginer qu'il s'agit en fait d'un point (x,y,zz) dans une demi-sphère.
 * Cette fonction retourne les coordonnées (x,y,zz) à partir du point (x,y).
 */
vec3 getSphericalVector( float x, float y ) {
  float phi = asin( y );
  float radius = cos( phi );
  float theta = 0.0;
  if( x != 0.0 ) theta = asin( x / radius );

  float zz = radius * cos( theta );
  return vec3(x, -y, zz);
}


void main() {
  float x = 2.0 * (gl_PointCoord.x - .5);
  float y = 2.0 * (gl_PointCoord.y - .5);
  float r = x * x + y * y;
  if( r > 1.0 ) discard;

  vec3 color = BLUE;
  vec3 arrow = getSphericalVector( x, y );
  if( mod(1.0 + dot( arrow, varAxis ), .35) > 0.1 )
    color = ORANGE;

  if( r > .85 ) {
    // Liseré noir extérieur.
    color = BLACK;
  }

  float light = dot( arrow, LIGHT );
  if( light < 0.43 ) color *= .5;
  else if( light > 0.75 ) {
    color = mix( color, WHITE, (light - .75) * 3.0 );
  }
  
  gl_FragColor = vec4( color, 1.0 );
}
