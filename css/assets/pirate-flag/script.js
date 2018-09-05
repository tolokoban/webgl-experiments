// The more columns you have, the more smooth the animation is,
// but also the slower. That's being said, WebGL is so powerful
// that you can have 1000 COLUMNS at 60fps on an old smart phone.
var COLUMNS = 100;
// Technical stuff: number of bytes to use for a Float32.
var BPE = (new Float32Array()).BYTES_PER_ELEMENT;

var gl;
var prg;
var img;
var texture;  // The flag image.

// #(start)
function start() {
  img = new Image();
  img.src = "flag.png";
  img.onload = function() {
    gl = initWebGL();
    prg = createProgram( gl );
    createVertices();
    createTexture();
    // Schedule the next frame animation.
    requestAnimationFrame( anim );
  };
}
// #(start)

// #(anim)
function anim( time ) {
  // Schedule the next frame animation.
  requestAnimationFrame( anim );
  // binding texture.
  gl.bindTexture( gl.TEXTURE_2D, texture );
  // Passing the time to the vertex shader it's all we need to create the wave effect.
  var uniTime = gl.getUniformLocation( prg, 'uniTime' );
  gl.uniform1f( uniTime, time * 0.003 );
  // Setting attributes.
  var attCoords = gl.getAttribLocation( prg, "attCoords" );
  gl.enableVertexAttribArray( attCoords );
  gl.vertexAttribPointer( attCoords, 2, gl.FLOAT, false, 2 * BPE, 0 );
  // Drawing.
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 2 + 2 * COLUMNS );
}
// #(anim)


function initWebGL() {
  var canvas = document.getElementById("canvas");
  return canvas.getContext( "webgl" );
}

// #(createProgram)
function createProgram( gl ) {
  var program = gl.createProgram();

  // Vertex shader.
  var shaderVert = gl.createShader( gl.VERTEX_SHADER );
  var vertCode = getVertexShaderCode();
  gl.shaderSource( shaderVert, vertCode );
  gl.compileShader( shaderVert );
  if ( !gl.getShaderParameter( shaderVert, gl.COMPILE_STATUS ) ) {
    console.log( vertCode );
    console.error( "An error occurred compiling the vertex shader: " + gl.getShaderInfoLog( shaderVert ) );
    return null;
  }
  gl.attachShader( program, shaderVert );

  // Fragment shader.
  var shaderFrag = gl.createShader( gl.FRAGMENT_SHADER );
  var fragCode = getFragmentShaderCode();
  gl.shaderSource( shaderFrag, fragCode );
  gl.compileShader( shaderFrag );
  if ( !gl.getShaderParameter( shaderFrag, gl.COMPILE_STATUS ) ) {
    console.log( fragCode );
    console.error( "An error occurred compiling the fragment shader: " + gl.getShaderInfoLog( shaderFrag ) );
    return null;
  }
  gl.attachShader( program, shaderFrag );

  gl.linkProgram( program );

  // Set this program as the default one.
  gl.useProgram( program );
  return program;
}
// #(createProgram)


function getVertexShaderCode() {
  return `
uniform float uniTime;
attribute vec2 attCoords;
varying vec2 varUV;
varying float varSlope;
void main() {
  varUV = attCoords;

  float x = attCoords.x;
  float y = attCoords.y;

  float h = cos( uniTime + x * 10.0 );
  h += cos( x * 3.0 - uniTime * 0.1751 );
  y += h * x * 0.2;

  float x2 = x - 0.001;
  float h2 = cos( uniTime + x2 * 10.0 );
  h2 += cos( x2 * 3.0 - uniTime * 0.1751 );
  varSlope = h - h2;

  gl_Position = vec4( 2.0 * x - 1.0, 0.5 - y, 0.0, 1.0 );
}
`;
}


function getFragmentShaderCode() {
  return `
precision mediump float;
uniform sampler2D uniTexture;
varying vec2 varUV;
varying float varSlope;

void main() {
  vec4 color = texture2D( uniTexture, varUV );
  if( color.a == 1.0 ) {
    if( varSlope > 0.0 ) {
      color = mix( color, vec4(0,0,0,1), varSlope * 50.0 );
    }
    if( varSlope < 0.0 ) {
      color = mix( color, vec4(1,1,1,1), abs(varSlope) * 50.0 );
    }
  }
  gl_FragColor = color;
}
`;
}

// #(createVertices)
function createVertices() {
  var vertices = [];
  var x;
  for( var k = 0; k <= COLUMNS; k++ ) {
    x = k / COLUMNS;
    vertices.push( x, 0, x, 1 );
  }

  var buff = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buff );
  gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
}
// #(createVertices)

// #(createTexture)
function createTexture() {
  texture = gl.createTexture( );
  gl.bindTexture( gl.TEXTURE_2D, texture );

  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img );
}
// #(createTexture)
