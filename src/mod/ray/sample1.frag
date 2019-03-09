precision lowp float;

#define RADIUS 66.0
#define RADIUS_2 (RADIUS * RADIUS)
#define SPARSITY 200.0
#define HALF_SPARSITY (SPARSITY * 0.5)
#define EYE 1000.0
#define DEPTH 10
#define BOUNCES 2

const float PI = 3.14159265357;
const vec3 back = vec3(0.0, 0.0, 0.0);
const vec4 BLACK = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 WHITE = vec4(1.0, 1.0, 1.0, 1.0);

varying lowp vec3 vPoint;
uniform highp float X;
uniform highp float Y;
uniform highp float Z;
uniform highp float time;
uniform sampler2D colors;

struct Sphere {
  bool found;
  vec3 center;
  vec3 shift;
  vec3 impact;
  float radius;
  vec4 color;
};

// Given the center of the sphere, this function set its current radius and base color.
Sphere setRadiusAndColor(Sphere sphere) {
  float colorX = mod(abs(sphere.center.x * 13.954112
                         + sphere.center.z * 73.897458), 1711.0) / 1711.0;
  vec4 g = texture2D(colors, vec2(colorX, 0.5));
  float r = g.y + g.x * time / 900.0;
  g = texture2D(colors, vec2(fract(r), 0.5));
  float p = g.w;
  sphere.radius = RADIUS * (1.0 - p * 0.3);
  vec3 center = sphere.center / SPARSITY;
  colorX = mod(abs(center.x * 13.96 + center.y * 17.84 + center.z * 11.984122), 713.0) / 713.0;
  sphere.color = texture2D(colors, vec2(colorX, 0.5));
  sphere.shift = (vec3(sphere.color) + vec3(-0.5)) * (HALF_SPARSITY - RADIUS - 10.0);
  return sphere;
}

Sphere hitTest(vec3 point, vec3 vector, Sphere sphere) {
  // Compute ray and sphere intersection.
  // https://en.wikipedia.org/wiki/Line%E2%80%93sphere_intersection
  vec3 v = normalize(vector);
  vec3 o = point;
  vec3 c = sphere.center + sphere.shift;
  float r = sphere.radius;
  vec3 co = o - c;
  float tmp = dot(v, co);
  float delta = tmp * tmp - dot(co, co) + r * r;
  if (delta < 0.0) {
    sphere.found = false;
    return sphere;
  }
  float d = - tmp - sqrt(delta);
  sphere.impact = o + v * d;
  sphere.found = true;
  return sphere;
}

Sphere applyLight(Sphere sphere, vec3 origin) {
  vec4 c0 = sphere.color * 0.1 + BLACK * 0.9;
  vec4 c1 = sphere.color * 0.8 + WHITE * 0.2;
  float r = (dot((sphere.impact - sphere.center) / sphere.radius, vec3(0.0, 0.0, -1.0)) + 1.0) * 0.5;
  sphere.color = c1 * r + c0 * (1.0 - r);
  float d = distance(origin, sphere.impact) / (SPARSITY * float(DEPTH));
  sphere.color *= 1.0 - d;
  return sphere;
}

vec3 getMainDirection(vec3 point, vec3 vector) {
  // Find in which direction the vector points.
  // There are 6 possible directions : X1, X2, Y1, Y2, Z1 and Z2.
  float x = abs(vector.x);
  float y = abs(vector.y);
  float z = abs(vector.z);

  if (x > y) {
    // x > y
    if (x > z) {
      // x is the greatest.
      return normalize(vec3(vector.x, 0.0, 0.0));
    } else {
      // z is the greatest.
      return normalize(vec3(0.0, 0.0, vector.z));
    }
  } else {
    // y > x
    if (y > z) {
      // y is the greatest.
      return normalize(vec3(0.0, vector.y, 0.0));
    } else {
      // z is the greatest.
      return normalize(vec3(0.0, 0.0, vector.z));
    }
  }
}

Sphere findSphere(vec3 point, vec3 vector) {
  vec4 color;
  Sphere sphere;
  bool found = false;
  for (int bounce = 0 ; bounce < BOUNCES ; bounce++) {
    vec3 mainVect = getMainDirection(point, vector);
    if (mainVect.x != 0.0) {
      if (mainVect.x > 0.0) {
        sphere.center.x = SPARSITY * floor(point.x / SPARSITY) + SPARSITY;
      } else {
        sphere.center.x = SPARSITY * ceil(point.x / SPARSITY) - SPARSITY;
      }
      for (int loop = 0 ; loop < DEPTH ; loop++) {
        float coeff = (sphere.center.x - point.x) / vector.x;
        float z = point.z + vector.z * coeff + HALF_SPARSITY;
        float y = point.y + vector.y * coeff + HALF_SPARSITY;
        sphere.center.z = SPARSITY * floor(z / SPARSITY);
        sphere.center.y = SPARSITY * floor(y / SPARSITY);
        sphere = setRadiusAndColor(sphere);
        sphere = hitTest(point, vector, sphere);
        if (sphere.found) {
          sphere = applyLight(sphere, point);
          break;
        }
        sphere.center += mainVect * SPARSITY;
      }
    }
    else if (mainVect.y != 0.0) {
      if (mainVect.y > 0.0) {
        sphere.center.y = SPARSITY * floor(point.y / SPARSITY) + SPARSITY;
      } else {
        sphere.center.y = SPARSITY * ceil(point.y / SPARSITY) - SPARSITY;
      }
      for (int loop = 0 ; loop < DEPTH ; loop++) {
        float coeff = (sphere.center.y - point.y) / vector.y;
        float x = point.x + vector.x * coeff + HALF_SPARSITY;
        float z = point.z + vector.z * coeff + HALF_SPARSITY;
        sphere.center.x = SPARSITY * floor(x / SPARSITY);
        sphere.center.z = SPARSITY * floor(z / SPARSITY);
        sphere = setRadiusAndColor(sphere);
        sphere = hitTest(point, vector, sphere);
        if (sphere.found) {
          sphere = applyLight(sphere, point);
          break;
        }
        sphere.center += mainVect * SPARSITY;
      }
    }
    else if (mainVect.z != 0.0) {
      if (mainVect.z > 0.0) {
        sphere.center.z = SPARSITY * floor(point.z / SPARSITY) + SPARSITY;
      } else {
        sphere.center.z = SPARSITY * ceil(point.z / SPARSITY) - SPARSITY;
      }
      for (int loop = 0 ; loop < DEPTH ; loop++) {
        float coeff = (sphere.center.z - point.z) / vector.z;
        float x = point.x + vector.x * coeff + HALF_SPARSITY;
        float y = point.y + vector.y * coeff + HALF_SPARSITY;
        sphere.center.x = SPARSITY * floor(x / SPARSITY);
        sphere.center.y = SPARSITY * floor(y / SPARSITY);
        sphere = setRadiusAndColor(sphere);
        sphere = hitTest(point, vector, sphere);
        if (sphere.found) {
          sphere = applyLight(sphere, point);
          break;
        }
        sphere.center += mainVect * SPARSITY;
      }
    }
    // Looking for the next ray bounce.
    if (bounce > 0) {
      if (sphere.found) {
        float dist = clamp(distance( sphere.center, point ) * 0.0015, 0., 1.);
        color = mix( sphere.color, color, dist );
      }
    } else {
      found = sphere.found;
      color = sphere.color;
    }
    point = sphere.impact;
    vector = reflect(vector, sphere.impact - sphere.center);
  }
  sphere.found = found;
  float d = distance( sphere.center, point ) * 0.01;
  sphere.color = color / d;
  sphere.color.w = 1.;
  return sphere;
}


void main(void) {
  vec3 point = vec3(X, Y, Z);
  vec3 vector = vec3(vPoint.x, vPoint.y, EYE);
  Sphere sphere = findSphere(point, vector);
  if (sphere.found) {
    gl_FragColor = sphere.color;
  } else {
    gl_FragColor = vec4(back, 1.0);
  }
}
