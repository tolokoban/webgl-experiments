/** @module wdg.gl5 */require( 'wdg.gl5', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
<<<<<<< HEAD
  "vertex": "// Coordonnées du centre du sprite.\nattribute vec3 attPosition;\n// Index du vertex (de 0.0 à 3.0).\nattribute float attIndex;\n// Angle de rotation en radians.\nattribute float attRotation;\n// Facteur d'échelle.\nattribute float attScale;\n// PI est une constante indispensable en trigonométrie.\nconst float PI = 3.1415926536;\n// La taille du canvas est utilisée pour convertir\n// des coordonnées en pixels vers l'espace de WebGL.\nuniform float uniWidth;\nuniform float uniHeight;\n// Passer au fragment shader les coordonnées UV\n// du vertex dans le bitmap.\nvarying vec2 varCoordsUV;\n\nvoid main() {\n  // On considère un cercle ce centre attPosition,\n  // et de rayon attScale.\n  // Les vertex sont sur ce cercle, c'est pourquoi\n  // on utilise attIndex comme un angle.\n  float x = attPosition.x \n    + attScale * cos( attRotation + attIndex * PI / 2.0 );\n  float y = attPosition.y\n    + attScale * sin( attRotation + attIndex * PI / 2.0 );\n  // On avait des coordonnées en pixels du canvas,\n  // il faut les convertir dans l'espace de WebGL.\n  x = (2.0 * x / uniWidth) - 1.0;\n  y = 1.0 - (2.0 * y / uniHeight);\n  // D�finir la position du vertex.\n  gl_Position = vec4( x, y, attPosition.z, 1.0 );\n  // Il faut associer à chaque attIndex, des coordonnées UV.\n  if (attIndex < 1.5) {\n    if (attIndex < 0.5) varCoordsUV = vec2(0.0, 0.0); // 0\n    else varCoordsUV = vec2(1.0, 0.0);                // 1\n  }\n  else {\n    if (attIndex < 2.5) varCoordsUV = vec2(1.0, 1.0); // 2\n    else varCoordsUV = vec2(0.0, 1.0);                // 3\n  }\n}\n",
  "fragment-a": "precision mediump float;\n// L'image de notre sprite.\nuniform sampler2D uniTexture;\n// Les coordonnes UV du pixel à dessiner.\n// (0,0) correspond au pixel en haut à gauche.\n// (1,1) correspond au pixel en bas à droite.\nvarying vec2 varCoordsUV;\n\nvoid main() {\n  // texture2D retourne la coleur à un endroit donné.\n  vec4 color = texture2D( uniTexture, varCoordsUV );\n  // Si le point est transparent, on ne l'affiche pas.\n  if ( color.a < 0.1 ) discard;\n  gl_FragColor = color;\n}\n",
  "fragment-b": "const highp float PI = 3.1415926539;\nconst lowp vec3 COLOR0 = vec3(0.7, 0.9, 1.0);\nconst lowp vec3 COLOR1 = vec3(0.0, 0.7, 0.9);\n\nvarying lowp vec3 varVertexPosition;\n\nuniform lowp float uniTimeF;\n\nvoid main() {\n  highp float time = uniTimeF / 700.0;\n  \n  lowp float x = varVertexPosition.x + time * 120.0;\n  lowp float y = varVertexPosition.y + sin(time) * 15.0;\n  \n  lowp float xx = x / 10.0;\n  lowp float yy = y / 10.0;\n  \n  lowp float h = cos(yy) * cos(xx) + sin(yy);\n  h = cos( PI * h + time);\n  \n  h = (1.0 + h) / 2.0;\n  gl_FragColor = vec4( h * COLOR0 + (1.0 - h) * COLOR1, 1.0);\n}\n"};
=======
  "vertex": "// Coordonnées du centre du sprite.\r\nattribute vec3 attPosition;\r\n// Index du vertex (de 0.0 à 3.0).\r\nattribute float attIndex;\r\n// Angle de rotation en radians.\r\nattribute float attRotation;\r\n// Facteur d'échelle.\r\nattribute float attScale;\r\n// PI est une constante indispensable en trigonométrie.\r\nconst float PI = 3.1415926536;\r\n// La taille du canvas est utilisée pour convertir\r\n// des coordonnées en pixels vers l'espace de WebGL.\r\nuniform float uniWidth;\r\nuniform float uniHeight;\r\n// Passer au fragment shader les coordonnées UV\r\n// du vertex dans le bitmap.\r\nvarying vec2 varCoordsUV;\r\n\r\nvoid main() {\r\n  // On considère un cercle ce centre attPosition,\r\n  // et de rayon attScale.\r\n  // Les vertex sont sur ce cercle, c'est pourquoi\r\n  // on utilise attIndex comme un angle.\r\n  float x = attPosition.x \r\n    + attScale * cos( attRotation + attIndex * PI / 2.0 );\r\n  float y = attPosition.y\r\n    + attScale * sin( attRotation + attIndex * PI / 2.0 );\r\n  // On avait des coordonnées en pixels du canvas,\r\n  // il faut les convertir dans l'espace de WebGL.\r\n  x = (2.0 * x / uniWidth) - 1.0;\r\n  y = 1.0 - (2.0 * y / uniHeight);\r\n  // D�finir la position du vertex.\r\n  gl_Position = vec4( x, y, attPosition.z, 1.0 );\r\n  // Il faut associer à chaque attIndex, des coordonnées UV.\r\n  if (attIndex < 1.5) {\r\n    if (attIndex < 0.5) varCoordsUV = vec2(0.0, 0.0); // 0\r\n    else varCoordsUV = vec2(1.0, 0.0);                // 1\r\n  }\r\n  else {\r\n    if (attIndex < 2.5) varCoordsUV = vec2(1.0, 1.0); // 2\r\n    else varCoordsUV = vec2(0.0, 1.0);                // 3\r\n  }\r\n}\r\n",
  "fragment-a": "precision mediump float;\r\n// L'image de notre sprite.\r\nuniform sampler2D uniTexture;\r\n// Les coordonnes UV du pixel à dessiner.\r\n// (0,0) correspond au pixel en haut à gauche.\r\n// (1,1) correspond au pixel en bas à droite.\r\nvarying vec2 varCoordsUV;\r\n\r\nvoid main() {\r\n  // texture2D retourne la coleur à un endroit donné.\r\n  vec4 color = texture2D( uniTexture, varCoordsUV );\r\n  // Si le point est transparent, on ne l'affiche pas.\r\n  if ( color.a < 0.1 ) discard;\r\n  gl_FragColor = color;\r\n}\r\n",
  "fragment-b": "const highp float PI = 3.1415926539;\r\nconst lowp vec3 COLOR0 = vec3(0.7, 0.9, 1.0);\r\nconst lowp vec3 COLOR1 = vec3(0.0, 0.7, 0.9);\r\n\r\nvarying lowp vec3 varVertexPosition;\r\n\r\nuniform lowp float uniTimeF;\r\n\r\nvoid main() {\r\n  highp float time = uniTimeF / 700.0;\r\n  \r\n  lowp float x = varVertexPosition.x + time * 120.0;\r\n  lowp float y = varVertexPosition.y + sin(time) * 15.0;\r\n  \r\n  lowp float xx = x / 10.0;\r\n  lowp float yy = y / 10.0;\r\n  \r\n  lowp float h = cos(yy) * cos(xx) + sin(yy);\r\n  h = cos( PI * h + time);\r\n  \r\n  h = (1.0 + h) / 2.0;\r\n  gl_FragColor = vec4( h * COLOR0 + (1.0 - h) * COLOR1, 1.0);\r\n}\r\n"};
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
  "use strict";

require("gfx");

var $ = require( "dom" );
var DB = require( "tfw.data-binding" );

var WdgGl5 = function( opts ) {
  var that = this;

  var canvas = $.elem( this, 'canvas' );

  DB.propInteger( this, 'width' )( function( v ) {
    canvas.setAttribute( 'width', v );
    canvas.style.width = v + "px";
  });

  DB.propInteger( this, 'height' )( function( v ) {
    canvas.setAttribute( 'height', v );
    canvas.style.height = v + "px";
  });

  DB.propString( this, 'fragment' );

  opts = DB.extend( {
    width: 640,
    height: 480,
    fragment: 'a'
  }, opts, this );

  window.setTimeout( start.bind( this, canvas ), 20 );
};

function start( canvas ) {
  var vertexShaderCode = GLOBAL['vertex'];
  var fragmentShaderCode = GLOBAL['fragment-' + this.fragment];

  // #(code)
  // #(init)
  var gl = canvas.getContext( "webgl", {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,    
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true
  } );
  // #(init)

  var shaderProgram = gl.createProgram( );
  gl.attachShader(shaderProgram, getVertexShader( gl, vertexShaderCode ));
  gl.attachShader(shaderProgram, getFragmentShader( gl, fragmentShaderCode ));
  gl.linkProgram( shaderProgram );
  gl.useProgram( shaderProgram );

  var W = canvas.width;
  var H = canvas.height;
  var spritesCount = 300;
  var sprites = createSprites( spritesCount );

  // #(defineAttributes)
  var squareVerticesBuffer = gl.createBuffer( );
  // Créer un tableau d'attributs pour tous les sprites. Il nous faut 3 éléments pour les coordonnées, 1 pour l'index, 1
  // pour l'angle et 1 pour le facteur de zoom. Et chaque sprite a besoin de 4 vertex.
  var spritesAttributes = new Float32Array( spritesCount * ( 3 + 1 + 1 + 1 ) * 4 );
  // Récupérer la taille en octets d'un élément du tableau.
  var bpe = spritesAttributes.BYTES_PER_ELEMENT;
  // Taille en octets d'un bloc représentant tous les attributs d'un vertex.
  var blockSize = ( 3 + 1 + 1 + 1 ) * bpe;

  gl.bindBuffer( gl.ARRAY_BUFFER, squareVerticesBuffer );
  // Définir la position des valeurs de l'attribute `attPosition`.
  var attPosition = gl.getAttribLocation( shaderProgram, "attPosition" );
  gl.enableVertexAttribArray( attPosition );
  gl.vertexAttribPointer( attPosition, 3, gl.FLOAT, false, blockSize, 0 );
  // Définir la position des valeurs de l'attribute `attIndex`.
  var attIndex = gl.getAttribLocation( shaderProgram, "attIndex" );
  gl.enableVertexAttribArray( attIndex );
  gl.vertexAttribPointer( attIndex, 1, gl.FLOAT, false, blockSize, 3 * bpe );
  // Définir la position des valeurs de l'attribute `attScale`.
  var attScale = gl.getAttribLocation( shaderProgram, "attScale" );
  gl.enableVertexAttribArray( attScale );
  gl.vertexAttribPointer( attScale, 1, gl.FLOAT, false, blockSize, 4 * bpe );
  // Définir la position des valeurs de l'attribute `attRotation`.
  var attRotation = gl.getAttribLocation( shaderProgram, "attRotation" );
  gl.enableVertexAttribArray( attRotation );
  gl.vertexAttribPointer( attRotation, 1, gl.FLOAT, false, blockSize, 5 * bpe );
  // #(defineAttributes)

  var vertexPositionAttribute = gl.getAttribLocation( shaderProgram, "attVertexPosition" );
  gl.enableVertexAttribArray( vertexPositionAttribute );
  gl.vertexAttribPointer( vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0 );

  var uniWidth = gl.getUniformLocation( shaderProgram, "uniWidth" );
  var uniHeight = gl.getUniformLocation( shaderProgram, "uniHeight" );

  // #(draw) 
  // Activer le test de profondeur.
  gl.disable( gl.DEPTH_TEST );
  //gl.depthFunc(gl.LEQUAL); Charger la texture.
    
  var texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );

  // Set the parameters so we can render any size image.
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

  // #(image)
  var image = new Image( );
  image.onload = function( ) {
    // Upload the image into the texture.
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );

    // Dessiner la prochaine frame.
    window.requestAnimationFrame( draw );
  };
  image.onerror = function( err ) {
    throw( err );
  };
  image.src = "css/gfx/champi.png";
  // #(image)

  // Définir la transparence pour les sprites.
  gl.enable( gl.BLEND );
  gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ); // gl.ONE);
  gl.disable( gl.DEPTH_TEST );

  // #(rendering)
  function draw( t ) {

    gl.bindTexture( gl.TEXTURE_2D, texture );

    // Valeurs pour la taille de l'écran.
    gl.uniform1f( uniWidth, canvas.width );
    gl.uniform1f( uniHeight, canvas.height );

    // Activer l'uniform relatif à notre texture.
    // On n'a qu'une texture donc on utilise le slot 0.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, 'uniTexture'), 0);
    
    // Mettre à jour le tableau des attributs.
    var idx = 0;
    sprites.forEach( function( sprite, spriteIdx ) {
      var x = sprite.x * W;
      var y = H - Math.abs(Math.cos( sprite.y * Math.PI + t * sprite.scale / 3613 )) * H;
      var z = Math.cos( t * sprite.scale / 2700 );
      var scale = 128 * ( 1 - 0.4 * z );
      var rotation = t * sprite.rotation / 700;
      // Alimentons le tableau.
      [ 0, 1, 3, 2 ].forEach( function( index ) {
        spritesAttributes[idx++] = x;
        spritesAttributes[idx++] = y;
        spritesAttributes[idx++] = z;
        spritesAttributes[idx++] = index;
        spritesAttributes[idx++] = scale;
        spritesAttributes[idx++] = rotation;
      });
    });
    // Transférer le tableau dans la mémoire de la carte graphique.
    gl.bindBuffer( gl.ARRAY_BUFFER, squareVerticesBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, spritesAttributes, gl.STATIC_DRAW );

    gl.clearColor( 0.9, 0.9, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    for ( var i = 0; i < spritesCount; i++ ) {
      gl.drawArrays( gl.TRIANGLE_STRIP, i * 4, 4 );
    }

    window.requestAnimationFrame( draw );
  }
  // #(rendering)

  // #(draw) #(code)
};

module.exports = WdgGl5;

// #(createSprites)
function createSprites( count ) {
  var sprites = [ ];
  while ( count-- > 0 ) {
    sprites.push({
      x: rand( 0, 1 ),
      y: rand( 0, 1 ),
      z: rand( 0.1, 0.9 ),
      // Taille initiale.
      size: rand( 20, 100 ),
      // Vitesse de changement de taille.
      scale: rand( 0.7, 3.2 ),
      // Vitesse de rotation.
      rotation: rand( -2, 2 )
    });
  }
  return sprites;
}

// Retourne un nombre aléatoire compris entre `min` et `max` .
function rand( min, max ) {
  return min + Math.random( ) * ( max - min );
}
// #(createSprites)

function getShader( type, gl, code ) {
  var shader = gl.createShader( type );
  gl.shaderSource( shader, code );
  gl.compileShader( shader );
  if (!gl.getShaderParameter( shader, gl.COMPILE_STATUS )) {
    console.log( code );
    console.error("An error occurred compiling the shader: " + gl.getShaderInfoLog( shader ));
    return null;
  }

  return shader;
}

function getFragmentShader( gl, code ) {
  return getShader( gl.FRAGMENT_SHADER, gl, code );
}

function getVertexShader( gl, code ) {
  return getShader( gl.VERTEX_SHADER, gl, code );
}


  
module.exports._ = _;
/**
 * @module wdg.gl5
 * @see module:$
 * @see module:gfx
 * @see module:dom
 * @see module:tfw.data-binding

 */
});