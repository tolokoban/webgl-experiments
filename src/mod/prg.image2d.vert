// Largeur et hauteur en pixels du canvas.
uniform float uniWidth;
uniform float uniHeight;

attribute vec3 attPosition;
attribute vec2 attUV;

// Passer au fragment shader les coordonnées UV pour la texture.
varying vec2 varUV;

void main() {
  varUV = attUV;
  
  gl_Position = vec4( attPosition, 1.0 );

  // Conversion des coordonnées pixels dans l'espace OpenGL.
  gl_Position.x = 2.0 * gl_Position.x / uniWidth - 1.0;
  gl_Position.y = 1.0 - 2.0 * gl_Position.y / uniHeight;
}
