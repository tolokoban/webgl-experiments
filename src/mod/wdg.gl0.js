"use strict";

var $ = require( "dom" );
var DB = require( "tfw.data-binding" );

var WdgGl1 = function( opts ) {
  var canvas = $.elem( this, 'canvas', 'theme-elevation-8' );

  DB.propInteger( this, 'width' )( function( v ) {
    canvas.setAttribute( 'width', v );
    canvas.style.width = v + "px";
  });

  DB.propInteger( this, 'height' )( function( v ) {
    canvas.setAttribute( 'height', v );
    canvas.style.height = v + "px";
  });

  opts = DB.extend( {
    width: 640,
    height: 480
  }, opts, this );

  // #(code)
  // #(init)
  var gl = canvas.getContext( "webgl" );
  // #(init) 
  
  // #(shaders)
  var program = gl.createProgram( );
  gl.attachShader(program, getVertexShader(gl,
    "uniform float uniTime; \n" +
    "attribute vec3 attColor; \n" +
    "attribute float attAngle; \n" +
    "varying vec3 varColor; \n" +
    "void main() { \n" +
    "  float deg = attAngle + uniTime * 0.01; \n" +
    "  float rad = radians( deg ); \n" +
    "  float x = cos( rad ); \n" +
    "  float y = sin( rad ); \n" +
    "  gl_Position = vec4( x, y, 0.0, 1.0 ); \n" +
    "  varColor = attColor; \n" +
    "}"));
  gl.attachShader(program, getFragmentShader(gl,
    "precision mediump float; \n" +
    "varying vec3 varColor; \n" +
    "void main() { \n" +
    "  gl_FragColor = vec4(varColor.rgb, 1.0); \n" +
    "}"));
  gl.linkProgram( program );
  gl.useProgram( program );
  // #(shaders)
  
  // #(attributes) 
  // Définition des attributs de nos trois points.
  var arrPoints = new Float32Array([
    // attAngle, attColor.r, attColor.g, attColor.b
    0, 1, 0, 0,
    // attAngle, attColor.r, attColor.g, attColor.b
    130, 0, 1, 0,
    // attAngle, attColor.r, attColor.g, attColor.b
    200, 0, 0, 1
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
  var block = 4 * bpe;
  var attAngle = gl.getAttribLocation( program, "attAngle" );
  gl.enableVertexAttribArray( attAngle );
  gl.vertexAttribPointer( attAngle, 1, gl.FLOAT, false, block, 0 * bpe );
  var attColor = gl.getAttribLocation( program, "attColor" );
  gl.enableVertexAttribArray( attColor );
  gl.vertexAttribPointer( attColor, 3, gl.FLOAT, false, block, 1 * bpe );
  // #(vertex-position)
  
  // #(rendering)
  function render( time ) {
    window.requestAnimationFrame( render );
    // Définir le blanc (1,1,1) comme couleur d'arrière-plan.
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    // Effacer l'écran actuel.
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    // Mettre à jour la variable globale `uniTime`.
    var location = gl.getUniformLocation(program, 'uniTime');
    gl.uniform1f( location, time );
    // Lancer le dessin du triangle composé de 3 points.
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );
  }
  
  window.requestAnimationFrame( render );  
  // #(rendering)
  // #(code)

};

module.exports = WdgGl1;

// #(shader)
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
// #(shader)