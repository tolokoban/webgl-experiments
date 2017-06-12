uniform float uniX;
uniform float uniZ;

attribute vec3 attPosition;
attribute vec2 attUV;

// Pour faire un léger dégradé dans le fragment shader.
varying vec2 varUV;

void main() {
  varUV = attUV;
  gl_Position = vec4(
    attPosition.x + uniX,
    attPosition.y,
    attPosition.z * uniZ,
    1 
  );
}
