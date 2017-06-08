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
        W('wdg.article59', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [
                "  ",
                                W('wdg.flex60', 'wdg.flex', {"content": [
                  W({
                      elem: "div",
                      children: [
                        "\n        ",
                                                W('wdg.deform-361', 'wdg.deform-3', {
                          width: "960",
                          height: "540",
                          delay: "0",
                          angle: "66"}),
                        "\n          ",
                                                W('wdg.flex62', 'wdg.flex', {"content": [
                                                      W('delay', 'wdg.text', {
                              label: "Délai par étage (ms)",
                              wide: "true",
                              value: "0"}),
                                                      W('angle', 'wdg.text', {
                              label: "Angle max (deg)",
                              wide: "true",
                              value: "66"}),
                                                      W('girafe', 'wdg.checkbox', {
                              text: "Afficher la girafe",
                              value: "false"})]}),
                        "\n      "]})]})]}),
          W({
              elem: "p",
              children: [
                "Avec la technique de l",
                "&#39;",
                "article précédent, il est possible de déformer des images entières."]})]})
        W.bind('wdg.deform-361',{"girafe":{"B":[["girafe","value"]]},"delay":{"B":[["delay","value"]]},"angle":{"B":[["angle","value"]]}});
    }
);
