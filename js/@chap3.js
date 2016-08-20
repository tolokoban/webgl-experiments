/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

var require = function() {
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
            body(exports, mod);
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
<<<<<<< HEAD
        W('wdg.gl39', 'wdg.gl3', {
            width: "300",
            height: "300",
            fragment: "a"})
        W('wdg.gl310', 'wdg.gl3', {
            width: "300",
            height: "300",
            fragment: "b"})
        W('wdg.gl311', 'wdg.gl3', {
=======
        W('wdg.gl327', 'wdg.gl3', {
            width: "300",
            height: "300",
            fragment: "a"})
        W('wdg.gl328', 'wdg.gl3', {
            width: "300",
            height: "300",
            fragment: "b"})
        W('wdg.gl329', 'wdg.gl3', {
>>>>>>> 509a8c8ca996e9d07bb19237057a74984fad9567
            width: "300",
            height: "300",
            fragment: "c"})

    }
);
