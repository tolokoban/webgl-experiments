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
        W('wdg.gl219', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "3"})
        W('wdg.gl220', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "5"})
        W('wdg.gl221', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "13"})
        W('wdg.gl222', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "500"})
        W('wdg.gl223', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "3",
            regular: "false"})
        W('wdg.gl224', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "5",
            regular: "false"})
        W('wdg.gl225', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "13",
            regular: "false"})
        W('wdg.gl226', 'wdg.gl2', {
            width: "200",
            height: "200",
            size: "500",
            regular: "false"})

    }
);
