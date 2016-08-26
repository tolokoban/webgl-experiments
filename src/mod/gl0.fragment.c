// Préciser la précision par défaut.
// Une ligne qu'il est conseillé de mettre
// au début de tous vos fragment shaders
// pour éviter de devoir préciser la précision
// à chaque déclaration de variable.
// Les précisions possibles sont
// lowp, mediump et highp.
precision mediump float;

varying vec3 varColor;

void main() {
  // `gl_FragColor` est une variable SPECIALE de WebGL.
  // Elle permet de déterminer la couleur du fragment.
  // C'est un vecteur à 4 dimensions : rouge, vert, bleu
  // et alpha (l'opacité). Toutes les valeurs sont entre
  // 0.0 et 1.0.
  gl_FragColor = vec4(varColor.rgb, 1.0);
}
