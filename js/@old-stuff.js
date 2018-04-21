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
        W('wdg.article122', 'wdg.article', {
            title: "Old stuff (à trier)",
            content: [
          W({
              elem: "pre",
              children: [W({
                  elem: "code",
                  children: [
                    W({
                      elem: "ul",
                      children: [
                        "\n        ",
                        W({
                          elem: "li",
                          children: [W({
                              elem: "a",
                              attr: {"href": "chap8.html"},
                              children: ["chap8"]})]}),
                        "\n        ",
                        W({
                          elem: "li",
                          children: [W({
                              elem: "a",
                              attr: {"href": "deform.html"},
                              children: ["deform"]})]}),
                        "\n        ",
                        W({
                          elem: "li",
                          children: [W({
                              elem: "a",
                              attr: {"href": "deform2.html"},
                              children: ["deform2"]})]}),
                        "\n        ",
                        W({
                          elem: "li",
                          children: [W({
                              elem: "a",
                              attr: {"href": "doc.html"},
                              children: ["doc"]})]}),
                        "\n    "]}),
                    "\n"]})]})]},{"id":"wdg.article122"})

    }
);
