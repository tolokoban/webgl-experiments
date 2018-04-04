/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

window.require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(f, mod, exports);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        var W = require('x-widget');
        W('wdg.menu85', 'wdg.menu', {"value": [["intro","Introduction aux concepts fondamentaux","attachShader bindBuffer bufferData clear clearColor clearProgram compileShader createBuffer createShader drawArrays enableVertexAttribArray getAttribLocation linkProgram shaderSource useProgram vertexAttribPointer"],["uniform","Passer un uniforme","requestAnimationFrame getUniformLocation uniform4f uniform1f"],["chap2","Du triangle au polygône","drawArrays"],["lines","Traçons des lignes","gl.LINES requestAnimationFrame"],["boilerplate","Boilerplate","WebGL.Program WebGL.fetchAssets WebGL.newCanvas, WebGL.fillArrayBuffer"],["varying","Variations sur les couleurs","varying"],["aspect-ratio","Aspect Ratio","viewport clientWidth clientHeight"],["chap3","Textures procédurales","mod clamp"],["chap4","Animations de Textures",""],["interpolation","Interpolation","Coordonnée 'w'"],["marilyn","Marilyn",""],["dot","Un point c'est tout",""],["particules","Particules",""],["frame-buffer","Frame Buffer",""],["sprites","Sprites","gl.createTexture gl.bindTexture gl.texParameteri"],["deform","Déformations",""],["tunnel","Tunnel","createTexture, bindTexture, texParameteri, texImage2D, drawElements"],["boulder-dash","Boulder Dash",""],["boulder-dash2","Boulder Dash (Version 2)",""]]},{"id":"wdg.menu85"})

    }
);
