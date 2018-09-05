start(["shader.vert", "shader.frag"], function( assets, canvas ) {
  // #(init)
  var gl = canvas.getContext( "webgl" );
  // #(init)

  // #(shaders)
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
  // #(shaders)

  // #(attributes)
  var arrPoints = new Float32Array([ -1, -1, 1, -1, -1, 1, 1, 1 ]);
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

  gl.useProgram( program );
  var uniTimeV = gl.getUniformLocation(program, 'uniTimeV');
  var uniTimeF = gl.getUniformLocation(program, 'uniTimeF');
  var uniWidth = gl.getUniformLocation(program, 'uniWidth');
  var uniHeight = gl.getUniformLocation(program, 'uniHeight');
  
  // #(vertex-position)
  // Taille d'un Float32 en octets.
  var bpe = arrPoints.BYTES_PER_ELEMENT;
  // Nombre d'octets utilisés par point.
  var block = 2 * bpe;
  var attVertexPosition = gl.getAttribLocation( program, "attVertexPosition" );
  gl.enableVertexAttribArray( attVertexPosition );
  gl.vertexAttribPointer( attVertexPosition, 2, gl.FLOAT, false, block, 0 * bpe );
  // #(vertex-position)

  // Définir le blanc (1,1,1) comme couleur d'arrière-plan.
  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  // Effacer l'écran actuel.
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  // #(rendering)
  function render( time ) {
    window.requestAnimationFrame( render );
    // Mettre à jour la variable globale `uniTime`.
    gl.useProgram( program );
    gl.uniform1f( uniTimeV, time );
    gl.uniform1f( uniTimeF, time );
    gl.uniform1f( uniWidth, canvas.clientWidth );
    gl.uniform1f( uniHeight, canvas.clientHeight );
    // Lancer le dessin du triangle composé de 4 points.
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  }

  window.requestAnimationFrame( render );
  // #(rendering)
});
