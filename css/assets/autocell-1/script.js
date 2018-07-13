"use strict";

var W = 1024;
var H = 1024;


start(["shader.vert", "shader.frag", "shader.fb.frag", "example.jpg"], function( assets, canvas ) {
  // #(init)
  var gl = canvas.getContext( "webgl" );
  // #(init)

  // #(shaders)
  var prg = createProgram( gl, assets["shader.vert"], assets["shader.frag"] );
  var prgFB = createProgram( gl, assets["shader.vert"], assets["shader.fb.frag"] );
  // #(shaders)

  // #(attributes)
  var arrPoints = new Float32Array([
    // x, y, x, y, x, y, x, y.
      -1, -1, 1, -1, -1, 1, 1, 1
  ]);
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
  var block = 2 * bpe;
  // #(vertex-position)

  var tex1 = createTexture( gl, W, H, createImage(W,H) );
  var tex2 = createTexture( gl, W, H, createImage(W,H) );

  // Réserver de l'espace mémoire sur la carte graphique
  // pour un nouveau Framebuffer.
  var fb = gl.createFramebuffer();
  // Définer `fb` comme le Framebuffer courant.
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

  // #(rendering)
  function render( time ) {
    var attPos;
    window.requestAnimationFrame( render );

    gl.viewport( 0, 0, W, H );
    // Définir `fb` comme le Framebuffer courant.
    gl.bindFramebuffer( gl.FRAMEBUFFER, fb );
    // Associer ce Framebuffer à la
    // texture précédemment créée.
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D, tex2, 0);
    gl.useProgram( prgFB );
    var location = gl.getUniformLocation(prgFB, 'uniTime');
    gl.uniform1f( location, time );
    attPos = gl.getAttribLocation( prgFB, "attPos" );
    gl.enableVertexAttribArray( attPos );
    gl.vertexAttribPointer( attPos, 2, gl.FLOAT, false, block, 0 * bpe );
    gl.disable( gl.BLEND );
    gl.disable( gl.DEPTH_TEST );
    // Utiliser la texture.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture( gl.TEXTURE_2D, tex1 );
    // Lancer le dessin du triangle composé de 4 points.
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    // Tout ce qui suit sera rendu dans le canvas.
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );
    gl.useProgram( prg );
    attPos = gl.getAttribLocation( prg, "attPos" );
    gl.enableVertexAttribArray( attPos );
    gl.vertexAttribPointer( attPos, 2, gl.FLOAT, false, block, 0 * bpe );
    gl.disable( gl.BLEND );
    gl.disable( gl.DEPTH_TEST );
    // Utiliser la texture.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture( gl.TEXTURE_2D, tex2 );
    // Lancer le dessin du triangle composé de 4 points.
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    // Swap textures and frame buffers.
    var tmp = tex1;
    tex1 = tex2;
    tex2 = tmp;
  }

  window.requestAnimationFrame( render );
  // #(rendering)
});


function createProgram(gl, codeVert, codeFrag) {
  var program = gl.createProgram();
  // Vertex shader.
  var shaderVert = gl.createShader( gl.VERTEX_SHADER );
  gl.shaderSource( shaderVert, codeVert );
  gl.compileShader( shaderVert );
  if( !gl.getShaderParameter( shaderVert, gl.COMPILE_STATUS ) ) {
    console.error( codeVert );
    console.error( "Erreur de compilation du vertex shader: " + gl.getShaderInfoLog( shaderVert ) );
    alert( "Erreur de compilation du vertex shader: " + gl.getShaderInfoLog( shaderVert ) );
    return null;
  }
  gl.attachShader( program, shaderVert );
  // Fragment shader.
  var shaderFrag = gl.createShader( gl.FRAGMENT_SHADER );
  gl.shaderSource( shaderFrag, codeFrag );
  gl.compileShader( shaderFrag );
  if( !gl.getShaderParameter( shaderFrag, gl.COMPILE_STATUS ) ) {
    console.error( codeFrag );
    console.error( "Erreur de compilation du fragex shader: " + gl.getShaderInfoLog( shaderFrag ) );
    alert( "Erreur de compilation du fragex shader: " + gl.getShaderInfoLog( shaderFrag ) );
    return null;
  }
  gl.attachShader( program, shaderFrag );
  gl.linkProgram( program );
  return program;
}

function createTexture(gl, width, height, canvas) {
  // Réserver de la mémoire dans la carte graphique
  // pour une texture.
  var texture = gl.createTexture();

  // Définir cette texture comme texture courante.
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Si on donne une coordonnée U (aussi appelée S) qui est inférieure à 0
  // ou supérieure à 1, on n'affiche rien, on ne répète pas la texture.
  // C'est ce que signifie gl.CLAMP_TO_EDGE.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  // Même configuration pour la coordonnée V (aussi appelée T).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  // Pour passer d'une coordonnée (u, v) en float à des entiers (x, y)
  // correspondant à un pixel de l'image, on décide de ne pas interpoler,
  // mais plutôt de prendre le pixel le plus proche (NEAREST en anglais).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Initialisons les données de cette texture avec une image.
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
    gl.RGBA, gl.UNSIGNED_BYTE, canvas.getContext("2d").getImageData(0, 0, width, height).data );

  return texture;
}


var getDataFromImage = function( img ) {
  var w = img.width;
  var h = img.height;
  var canvas = document.createElement( 'canvas' );
  canvas.setAttribute( "width", w );
  canvas.setAttribute( "height", h );
  var ctx = canvas.getContext( "2d" );
  ctx.drawImage( img, 0, 0 );
  return ctx.getImageData( 0, 0, w, h ).data;
};


function createImage( width, height ) {
  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  var ctx = canvas.getContext("2d");

  var x, y;
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = "#000";
  ctx.fillRect( 0, 0, width, height );
  ctx.fillStyle = "#fff";
  
  for( var loop=0; loop<1000; loop++ ) {
    x = Math.floor(width * Math.random());
    y = Math.floor(height * Math.random());
    for( var spots=0; spots<1; spots++ ) {      
      ctx.fillRect( x, y, 1, 1 );
    }
  }

  return canvas;
}
