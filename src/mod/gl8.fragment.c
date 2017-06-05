precision mediump float;

// La texture créée à l'aide d'un Frame Buffer
uniform sampler2D uniTexture;

// Les coordonnées de l'écran, comprises entre -1.0 et +1.0
varying vec2 varUV;
// Temps en millisecondes
varying float varTime;

// Constante utilisée pour lire les pixels avoisinants.
const float S = 1.0 / 128.0;

// La couleur fait-elle partie de l'arrière-plan ?
// En fait, on vérifie qu'elle est blanche, ou proche du blanc.
bool isBackground(vec4 color) {
  if (color.r > .9 && color.g > .9 && color.b > .9) return true;
  return false;
}

// Effet 1 : on prend l'image telle qu'elle est.
void fx1(vec4 color, float u, float v, float x, float y) {
  gl_FragColor = color;
}

// Effet 2 : détextion de contour + seuil.
void fx2(vec4 color, float u, float v, float x, float y) {
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
    if (!isBackground(color)) {
      gl_FragColor = vec4(1.0, 0.9 * u, 0.0, 1.0);
    } 
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}

// Effet 3 : variation de couleur en fonction de la position.
void fx3(vec4 color, float u, float v, float x, float y) {
  if (isBackground(color)) gl_FragColor = color;
  else gl_FragColor = vec4(1.0 - color.r * u, 1.0 - color.g * u * v, 1.0 - color.b * v, 1.0);
}

// Effet 4 : autre effet. On peut faire varier les coefficients de
// 9 pixels utilisés, à condition que leur somme soit égale à 1.
void fx4(vec4 color, float u, float v, float x, float y) {
  gl_FragColor = - color * 7.0
    + texture2D( uniTexture, vec2(u - S, v - S) )
    + texture2D( uniTexture, vec2(u    , v - S) )
    + texture2D( uniTexture, vec2(u + S, v - S) )
    + texture2D( uniTexture, vec2(u - S, v    ) )
    + texture2D( uniTexture, vec2(u + S, v    ) )
    + texture2D( uniTexture, vec2(u - S, v + S) )
    + texture2D( uniTexture, vec2(u    , v + S) )
    + texture2D( uniTexture, vec2(u + S, v + S) );
  float r = gl_FragColor.r;
  float g = gl_FragColor.g;
  float b = gl_FragColor.b;
  if (r + g + b < 2.0) {
    gl_FragColor = vec4( g, 0.0, 0.0, 1.0);
  }
}


void main() {
  float x = varUV.x;
  float y = varUV.y;
  // Les coordonnées (u,v) sont comprises entre 0.0 et 1.0
  float u = (1.0 + x) / 2.0;
  float v = (1.0 + y) / 2.0;
  // Mouvement du centre qui permet de séparer l'affichage en 4.
  float ang = varTime * 0.000314;
  float r = cos(4581.15 + varTime * 0.000711);
  float t= varTime * 0.002;
  float cx = (cos(ang) + 0.35 * cos(t + y * 5.0)) * r;
  float cy = (sin(ang) + 0.35 * cos(t + x * 5.0)) * r;

  // Voici comment on lit un pixel dans une texture.
  vec4 color = texture2D( uniTexture, vec2(u, v) );
  // En fonction de la position du pixel courant par rapport
  // au centre (cx, cy), on applique un effet ou un autre.
  if (x < cx) {
    if (y < cy) {
      fx1(color, u, v, x, y);
    } else {
      fx2(color, u, v, x, y);
    }
  } else {
    if (y < cy) {
      fx3(color, u, v, x, y);
    } else {
      fx4(color, u, v, x, y);
    }
  }
}
