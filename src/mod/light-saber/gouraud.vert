// Perspective
uniform mat4 uniProjection;
// Rotation de la multiball.
uniform mat4 uniRotation;
// Translation.
uniform vec4 uniTranslation;

// Coordonnées du centre du modèle.
attribute vec3 attPoint;
// Vecteur normal en ce point.
attribute vec3 attNormal;

const vec3 COLOR = vec3(0.1, 0.5, 0.86666666666666666);
const vec3 LIGHT = normalize(vec3(.5, -.5, -1));

varying vec3 varColor;

float ramp(vec3 ray, float minValue, float maxValue) {
    float diff = maxValue - minValue;
    float alpha = 0.5 * (ray.z + 1.0);
    return minValue + alpha * diff;
}

void main() {
  // Rotation, translation et projection en perspective.
  vec4 vertex = uniRotation * vec4( attPoint, 1 ) + uniTranslation;
  gl_Position = uniProjection * vertex;

  vec4 normal = uniRotation * vec4( attNormal, 1 );
  vec3 ray = reflect(LIGHT, normal.xyz);
  float lightPower = ramp(ray, 0.4, 1.5);

  varColor = COLOR * lightPower;
}
