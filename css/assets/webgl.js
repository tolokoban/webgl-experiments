"use strict";

window.WebGL = function() {
  function endsWith( text ) {
    text = text.trim().toLowerCase();
    var arg;
    for( var i=1; i<arguments.length; i++ ) {
      arg = arguments[i].toLowerCase();
      if( text.substr( text.length - arg.length ) == arg ) return true;
    }
    return false;
  }

  function Program( gl, codes, includes ) {
    if ( typeof codes.vert !== 'string' ) {
      throw Error( '[webgl.program] Missing attribute `vert` in argument `codes`!' );
    }
    if ( typeof codes.frag !== 'string' ) {
      throw Error( '[webgl.program] Missing attribute `frag` in argument `codes`!' );
    }

    codes = parseIncludes( codes, includes );

    this.gl = gl;
    Object.freeze( this.gl );

    this._typesNamesLookup = getTypesNamesLookup( gl );

    var shaderProgram = gl.createProgram();
    var shaderVert = getVertexShader( gl, codes.vert );
    var shaderFrag = getFragmentShader( gl, codes.frag );
    gl.attachShader( shaderProgram, shaderVert );
    gl.attachShader( shaderProgram, shaderFrag );
    gl.linkProgram( shaderProgram );
    /*
      gl.detachShader( shaderProgram, shaderVert );
      gl.deleteShader( shaderVert );
      gl.detachShader( shaderProgram, shaderFrag );
      gl.deleteShader( shaderFrag );
    */
    this.program = shaderProgram;
    Object.freeze( this.program );

    this.use();
    createAttributes( this, gl, shaderProgram );
    createUniforms( this, gl, shaderProgram );
  }

  Program.prototype.destroy = function() {
    this.gl.deleteProgram( this.program );
  };

  Program.prototype.use = function() {
    this.gl.useProgram( this.program );
  };

  Program.prototype.getTypeName = function ( typeId ) {
    return this._typesNamesLookup[ typeId ];
  };

  var BPE = ( new Float32Array() ).BYTES_PER_ELEMENT;

  Program.prototype.bindAttribs = function ( buffer ) {
    this.use();
    var gl = this.gl;
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    var names = Array.prototype.slice.call( arguments, 1 );
    var totalSize = 0;
    names.forEach( function ( name ) {
      var attrib = this.attribs[ name ];
      if ( !attrib ) {
        throw "Cannot find attribute \"" + name + "\"!\n" +
          "It may be not active because unused in the shader.\n" +
          "Available attributes are: " + Object.keys( this.attribs ).map( function ( name ) {
            return '"' + name + '"';
          } ).join( ", " );
      }
      totalSize += ( attrib.size * attrib.length ) * BPE;
    }, this );
    var offset = 0;
    names.forEach( function ( name ) {
      var attrib = this.attribs[ name ];
      gl.enableVertexAttribArray( attrib.location );
      gl.vertexAttribPointer(
        attrib.location,
        attrib.size * attrib.length,
        gl.FLOAT,
        false, // No normalisation.
        totalSize,
        offset
      );
      offset += ( attrib.size * attrib.length ) * BPE;
    }, this );
  };

  function createAttributes( that, gl, shaderProgram ) {
    var index, item;
    var attribs = {};
    var attribsCount = gl.getProgramParameter( shaderProgram, gl.ACTIVE_ATTRIBUTES );
    for ( index = 0; index < attribsCount; index++ ) {
      item = gl.getActiveAttrib( shaderProgram, index );
      item.typeName = that.getTypeName( item.type );
      item.length = getSize.call( that, gl, item );
      item.location = gl.getAttribLocation( shaderProgram, item.name );
      console.info( "item=", item );
      attribs[ item.name ] = item;
    }

    that.attribs = attribs;
    Object.freeze( that.attribs );
  }

  function createAttributeSetter( gl, item, shaderProgram ) {
    console.info( "item=", item );
    var name = item.name;
    return function ( v ) {
      if ( typeof v !== 'boolean' ) {
        throw "[webgl.program::$" + name +
          "] Value must be a boolean: true if you want to enable this attribute, and false to disable it.";
      }
      if ( v ) {
        console.log( "enableVertexAttribArray(", gl.getAttribLocation( shaderProgram, name ), ")" );
        gl.enableVertexAttribArray(
          gl.getAttribLocation( shaderProgram, name )
        );
      } else {
        gl.disableVertexAttribArray(
          gl.getAttribLocation( shaderProgram, name )
        );
      }
    };
  }

  function createAttributeGetter( gl, item, shaderProgram ) {
    var loc = gl.getAttribLocation( shaderProgram, item.name );
    return function () {
      return loc;
    };
  }

  function createUniforms( that, gl, shaderProgram ) {
    var index, item;
    var uniforms = {};
    var uniformsCount = gl.getProgramParameter( shaderProgram, gl.ACTIVE_UNIFORMS );
    for ( index = 0; index < uniformsCount; index++ ) {
      item = gl.getActiveUniform( shaderProgram, index );
      uniforms[ item.name ] = gl.getUniformLocation( shaderProgram, item.name );
      Object.defineProperty( that, '$' + item.name, {
        set: createUniformSetter( gl, item, uniforms[ item.name ], that._typesNamesLookup ),
        get: createUniformGetter( item ),
        enumerable: true,
        configurable: false
      } );
    }
    that.uniforms = uniforms;
    Object.freeze( that.uniforms );
  }

  /**
   * This is a preprocessor for shaders.
   * Directives  `#include`  will be  replaced  by  the content  of  the
   * correspondent attribute in `includes`.
   */
  function parseIncludes( codes, includes ) {
    var result = {};
    var id, code;
    for ( id in codes ) {
      code = codes[ id ];
      result[ id ] = code.split( '\n' ).map( function ( line ) {
        if ( line.trim().substr( 0, 8 ) != '#include' ) return line;
        var pos = line.indexOf( '#include' ) + 8;
        var includeName = line.substr( pos ).trim();
        // We accept all this systaxes:
        // #include foo
        // #include 'foo'
        // #include <foo>
        // #include "foo"
        if ( "'<\"".indexOf( includeName.charAt( 0 ) ) > -1 ) {
          includeName = includeName.substr( 1, includeName.length - 2 );
        }
        var snippet = includes[ includeName ];
        if ( typeof snippet !== 'string' ) {
          console.error( "Include <" + includeName + "> not found in ", includes );
          throw Error( "Include not found in shader: " + includeName );
        }
        return snippet;
      } ).join( "\n" );
    }
    return result;
  }


  function createUniformSetter( gl, item, nameGL, lookup ) {
    var nameJS = '_$' + item.name;

    switch ( item.type ) {
    case gl.BYTE:
    case gl.UNSIGNED_BYTE:
    case gl.SHORT:
    case gl.UNSIGNED_SHORT:
    case gl.INT:
    case gl.UNSIGNED_INT:
    case gl.SAMPLER_2D: // For textures, we specify the texture unit.
      if ( item.size == 1 ) {
        return function ( v ) {
          gl.uniform1i( nameGL, v );
          this[ nameJS ] = v;
        };
      } else {
        return function ( v ) {
          gl.uniform1iv( nameGL, v );
          this[ nameJS ] = v;
        };
      }
      break;
    case gl.FLOAT:
      if ( item.size == 1 ) {
        return function ( v ) {
          gl.uniform1f( nameGL, v );
          this[ nameJS ] = v;
        };
      } else {
        return function ( v ) {
          gl.uniform1fv( nameGL, v );
          this[ nameJS ] = v;
        };
      }
      break;
    case gl.FLOAT_VEC3:
      if ( item.size == 1 ) {
        return function ( v ) {
          gl.uniform3fv( nameGL, v );
          this[ nameJS ] = v;
        };
      } else {
        throw Error(
          "[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform `" +
            item.name + "'!'"
        );
      }
      break;
    case gl.FLOAT_VEC4:
      if ( item.size == 1 ) {
        return function ( v ) {
          gl.uniform4fv( nameGL, v );
          this[ nameJS ] = v;
        };
      } else {
        throw Error(
          "[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform `" +
            item.name + "'!'"
        );
      }
      break;
    case gl.FLOAT_MAT3:
      if ( item.size == 1 ) {
        return function ( v ) {
          gl.uniformMatrix3fv( nameGL, false, v );
          this[ nameJS ] = v;
        };
      } else {
        throw Error(
          "[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform `" +
            item.name + "'!'"
        );
      }
      break;
    case gl.FLOAT_MAT4:
      if ( item.size == 1 ) {
        return function ( v ) {
          gl.uniformMatrix4fv( nameGL, false, v );
          this[ nameJS ] = v;
        };
      } else {
        throw Error(
          "[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform `" +
            item.name + "'!'"
        );
      }
      break;
    default:
      throw Error(
        "[webgl.program.createWriter] Don't know how to deal with uniform `" +
          item.name + "` of type " + lookup[ item.type ] + "!"
      );
    }
  }

  function createUniformGetter( item ) {
    var name = '_$' + item.name;
    return function () {
      return this[ name ];
    };
  }


  function getShader( type, gl, code ) {
    var shader = gl.createShader( type );
    gl.shaderSource( shader, code );
    gl.compileShader( shader );
    if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
      console.log( code );
      console.error( "An error occurred compiling the shader: " + gl.getShaderInfoLog( shader ) );
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

  function getTypesNamesLookup( gl ) {
    var lookup = {};
    var k, v;
    for ( k in gl ) {
      v = gl[ k ];
      if ( typeof v === 'number' ) {
        lookup[ v ] = k;
      }
    }
    return lookup;
  }

  function getSize( gl, item ) {
    switch ( item.type ) {
    case gl.FLOAT_VEC4:
      return 4;
    case gl.FLOAT_VEC3:
      return 3;
    case gl.FLOAT_VEC2:
      return 2;
    case gl.FLOAT:
      return 1;
    default:
      throw "[webgl.program:getSize] I don't know the size of the attribute '" + item.name +
        "' because I don't know the type " + this.getTypeName( item.type ) + "!";
    }
  }

  function fetchAssets( assets ) {
    return new Promise(function (resolve, reject) {
      showSplashScreen().then(function() {
        var count = 0;
        var done = 0;
        for( var key in assets ) count++;
        var progress = document.getElementById("PROGRESS");
        var result = {};

        function next( url ) {
          done++;
          var percent = done / count;
          progress.style.transform = "scaleX(" + percent + ")";
          console.log( url, (100 * percent).toFixed(0) + "%");

          if( done >= count ) {
            resolve( result );
            hideSplashScreen();
            return;
          }
        }

        Object.keys( assets ).forEach(function( key ) {
          var url = assets[key];
          if( endsWith( url, "jpg", "png", "gif", "svg" ) ) {
            var img = new Image();
            img.crossOrigin = "anonymous";
            result[key] = img;
            img.onload = next.bind(null, url);
            img.onerror = function( ex ) {
              console.error("Unable to load image \"" + key + "\":", url);
              console.error( ex );
              next( url );
            };
            img.src = url;
          } else if( endsWith( url, "ogg", "wav", "mp3" ) ) {
            var audio = document.createElement("audio");
            result[key] = audio;
            var slot = function() {
              if( audio._loaded ) return;
              audio._loaded = true;
              next( url );              
            };
            audio.addEventListener( "canplay", slot );
            audio.addEventListener( "loadeddata", slot );
            audio.addEventListener( "error", function( ex ) {
              console.error("Unable to load sound \"" + key + "\":", url);
              console.error( ex );
              next( url );
            });
            audio.src = url;
          } else {
            fetch( url ).then(function(response) {
              if( !response.ok ) throw "";
              if( endsWith( url, "json" ) ) {
                return response.json();
              } else {
                return response.text();
              }
            }).then(function(content) {
              result[key] = content;
              next( url );
            }).catch(function(ex) {
              console.error("Unable to fetch asset \"" + key + "\": ", url);
              next( url );
            });
          }
        });
      });
    });
  }

  function fillArrayBuffer( gl, vertices ) {
    if( !(gl instanceof WebGLRenderingContext) && !(gl instanceof WebGL2RenderingContext) ) {
      throw "Le premier argument de WebGL.fillArrayBuffer doit obligatoirment être de type WebGLRenderingContext ou WebGL2RenderingContext !";
    }
    if( !(vertices instanceof Float32Array) ) {
      throw "Le second argument de WebGL.fillArrayBuffer doit obligatoirment être de type Float32Array !";
    }

    var buff = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buff );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
    return buff;
  }

  function fillElementBuffer( gl, elements ) {
    if( !(gl instanceof WebGLRenderingContext) && !(gl instanceof WebGL2RenderingContext) ) {
      throw "Le premier argument de WebGL.fillArrayBuffer doit obligatoirment être de type WebGLRenderingContext ou WebGL2RenderingContext !";
    }
    if( !(elements instanceof Uint16Array) ) {
      throw "Le second argument de WebGL.fillArrayBuffer doit obligatoirment être de type Uint16Array !";
    }

    var buff = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buff );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, elements, gl.STATIC_DRAW );
    return buff;
  }

  function newCanvas() {
    var body = document.body;
    var canvas = document.createElement( "canvas" );
    canvas.setAttribute( "width", body.clientWidth );
    canvas.setAttribute( "height", body.clientHeight );
    body.appendChild( canvas );
    return canvas;
  }

  function showSplashScreen( applicationName ) {
    if( typeof applicationName === 'undefined' ) applicationName = 'TOLOKOBAN';

    return new Promise(function (resolve, reject) {
      function show() {
        var splash = document.createElement( "div" );
        splash.setAttribute( "id", "SPLASH" );
        splash.innerHTML = "<div>" + applicationName + "</div><div>" + applicationName + "</div>";
        document.body.appendChild( splash );
        var progress = document.createElement( "div" );
        progress.setAttribute( "id", "PROGRESS" );
        document.body.appendChild( progress );
        window.setTimeout(function() {
          splash.setAttribute( "class", "show" );
        }, 50);
        resolve();
      }
      if( document.readyState === "complete" ) {
        show();
      } else {
        document.addEventListener( "DOMContentLoaded", show );
      }
    });
  }

  function hideSplashScreen() {
    var splash = document.getElementById( "SPLASH" );
    splash.setAttribute( "class", "hide" );
    var progress = document.getElementById( "PROGRESS" );
    document.body.removeChild( progress );
    window.setTimeout(function() {
      document.body.removeChild( splash );
    }, 500);
  }


  //========================================================================================
  return {
    Program: Program,
    fetchAssets: fetchAssets,
    fillArrayBuffer: fillArrayBuffer,
    fillElementBuffer: fillElementBuffer,
    newCanvas: newCanvas
  };
}();