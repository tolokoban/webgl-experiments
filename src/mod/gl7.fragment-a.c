precision mediump float;

varying vec3 varColor;
varying float varCoeff;

void main() {
  // Calculons la distance du fragment courant
  // au centre du point.
  float x = gl_PointCoord.x - 0.5;
  float y = gl_PointCoord.y - 0.5;
  // On ne calcule pas la racine carré pour gagner du temps.
  float r = x*x + y*y;
  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);

  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );
}
