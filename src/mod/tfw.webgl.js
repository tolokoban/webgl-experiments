var BPE = (new Float32Array()).BYTES_PER_ELEMENT;


function Webgl(opts) {
    Object.defineProperty( this, 'gl', {
        value: opts.canvas.getContext('webgl') || opts.canvas.getContext('experimental-webgl'),
        writable: false,
        configurable: false,
        enumerable: true
    });

    this.render = function() {};
}

Webgl.prototype.createProgram = function(codes) {
    return new Program( this.gl, codes );
};

Webgl.prototype.start = function(renderingFunction) {
    if (typeof renderingFunction === 'function') {
        this.render = renderingFunction;
    }

    if (!this._animationIsOn) {
        var that = this;
        var rendering = function(time) {
            if (that._animationIsOn) {
                window.requestAnimationFrame( rendering );
            }
            that.render( time );
        };
        window.requestAnimationFrame( rendering );
        this._animationIsOn = true;
    }
};

Webgl.prototype.stop = function() {
    this._animationIsOn = false;
};

/**
 * @return void
 */
Webgl.prototype.getDataFromImage = function( img ) {
    var w = img.width;
    var h = img.height;
    var canvas = document.createElement( 'canvas' );
    canvas.setAttribute( "width", w );
    canvas.setAttribute( "height", h );
    var ctx = canvas.getContext( "2d" );
    ctx.drawImage( img, 0, 0 );
    return ctx.getImageData( 0, 0, w, h ).data;
};



function Program(gl, codes) {
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, getVertexShader(gl, codes.vertex || '//No Vertex Shader'));
    gl.attachShader(shaderProgram, getFragmentShader(gl, codes.fragment || '//No Fragment Shader'));
    gl.linkProgram(shaderProgram);

    this.use = function() {
        gl.useProgram(shaderProgram);
    };
    this.use();

    var index, item;
    var attribs = {};
    var attribsCount = gl.getProgramParameter(shaderProgram, gl.ACTIVE_ATTRIBUTES);
    for (index = 0; index < attribsCount; index++) {
        item = gl.getActiveAttrib( shaderProgram, index );
        attribs[item.name] = gl.getAttribLocation(shaderProgram, item.name);
        this['$' + item.name] = gl.getAttribLocation(shaderProgram, item.name);
    }

    Object.freeze(attribs);
    this.attribs = attribs;
    var uniforms = {};
    var uniformsCount = gl.getProgramParameter(shaderProgram, gl.ACTIVE_UNIFORMS);
    for (index = 0; index < uniformsCount; index++) {
        item = gl.getActiveUniform( shaderProgram, index );
        uniforms[item.name] = gl.getUniformLocation(shaderProgram, item.name);
        this['$' + item.name] = gl.getUniformLocation(shaderProgram, item.name);
    }
    Object.freeze(uniforms);
    this.uniforms = uniforms;
}



function getShader( type, gl, code ) {
    var shader = gl.createShader( type );
    gl.shaderSource( shader, code );
    gl.compileShader( shader );
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log( code );
        console.error("An error occurred compiling the shader: " + gl.getShaderInfoLog(shader));
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


module.exports = Webgl;
