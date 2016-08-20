// Temps courant en millisecondes
uniform float uniTime;

// Position en valeurs comprises entre -1.0 et +1.0
attribute vec2 attPosition;

// Passer les coordonnées UV pour la texture.
varying vec2 varUV;

void main() {
  float x = attPosition.x;
  float y = attPosition.y;
  float z = 0.0;

  gl_Position = vec4(x, y, z, 1.0 );

  float u = (x + 1.0) / 2.0;
  float v = (1.0 - y) / 2.0;
  varUV = vec2( u, v );
}
