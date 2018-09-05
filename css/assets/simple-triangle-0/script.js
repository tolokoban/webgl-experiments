start(["shader.vert", "shader.frag"], function( assets, canvas ) {
  // #(init)
  var gl = canvas.getContext( "webgl" );
  // #(init)

  // #(shaders)
  // On crée un programme vierge.
  var program = gl.createProgram();
  // Vertex shader.
  var shaderVert = gl.createShader( gl.VERTEX_SHADER );
  var codeVert = assets["shader.vert"];
  gl.shaderSource( shaderVert, codeVert );
  gl.compileShader( shaderVert );
  if( !gl.getShaderParameter( shaderVert, gl.COMPILE_STATUS ) ) {
    console.error( codeVert );
    console.error( "Erreur de compilation du vertex shader: " + gl.getShaderInfoLog( shaderVert ) );
    alert( "Erreur de compilation du vertex shader: " + gl.getShaderInfoLog( shaderVert ) );
    return;
  }
  gl.attachShader( program, shaderVert );
  // Fragment shader.
  var shaderFrag = gl.createShader( gl.FRAGMENT_SHADER );
  var codeFrag = assets["shader.frag"];
  gl.shaderSource( shaderFrag, codeFrag );
  gl.compileShader( shaderFrag );
  if( !gl.getShaderParameter( shaderFrag, gl.COMPILE_STATUS ) ) {
    console.error( codeFrag );
    console.error( "Erreur de compilation du fragex shader: " + gl.getShaderInfoLog( shaderFrag ) );
    alert( "Erreur de compilation du fragex shader: " + gl.getShaderInfoLog( shaderFrag ) );
    return;
  }
  gl.attachShader( program, shaderFrag );
  gl.linkProgram( program );
  // On libère la mémoire.
  gl.detachShader( program, shaderVert );
  gl.deleteShader( shaderVert );
  gl.detachShader( program, shaderFrag );
  gl.deleteShader( shaderFrag );
  // #(shaders)

  // #(attributes)
  var arrPoints = new Float32Array([ 0, 130, 200 ]);
  // #(attributes)

  // #(vertices)
  // Création d'un buffer dans la carte graphique.
  // Un buffer est un tableau de nombres.
  var triangleVerticesBuffer = gl.createBuffer( );
  // Définir ce buffer comme le buffer actif.
  gl.bindBuffer( gl.ARRAY_BUFFER, triangleVerticesBuffer );
  // Copier des données dans le buffer actif.
  gl.bufferData( gl.ARRAY_BUFFER, arrPoints, gl.STATIC_DRAW );
  // #(vertices)

  // #(vertex-position)
  // Taille d'un Float32 en octets.
  var bpe = arrPoints.BYTES_PER_ELEMENT;
  // Nombre d'octets utilisés par point.
  var block = 1 * bpe;
  // Récupérer l'index de l'attribut "attAngle".
  var attAngle = gl.getAttribLocation( program, "attAngle" );
  // Activer l'attribut pour qu'il puisse recevoir les données.
  gl.enableVertexAttribArray( attAngle );
  // L'attribut "attAngle" est un vecteur à "1" dimensions
  // dont la coordonnée est de type "gl.FLOAT", qui n'a pas
  // besoin d'être normalisée ("false").
  // Les données pour le premier vertex commencent à la position "0"
  // et le vertex suivant sera "block" octets plus loin.
  gl.vertexAttribPointer( attAngle, 1, gl.FLOAT, false, block, 0 );
  // #(vertex-position)

  // #(rendering)
  // Définir le blanc (1,1,1) comme couleur d'arrière-plan.
  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  // Effacer l'écran actuel.
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  // Définir le programme à utiliser.
  gl.useProgram( program );
  // Lancer le dessin du triangle composé de "3" points
  // en commençant par le point d'indice "0".
  gl.drawArrays( gl.TRIANGLES, 0, 3 );
  // #(rendering)
});
