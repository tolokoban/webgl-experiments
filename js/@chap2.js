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
        W('wdg.article5', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [
                "Il est possible de créer des polygônes de n",
                "&#39;",
                "importe quelle forme.\nCes derniers seront toujours constitués de triangles dont les sommets seront pris dans un tableau.\nMais à partir de cet unique tableau, il existe plusieurs façons de dessiner nos triangles."]}),
          W({
              elem: "p",
              children: [
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["3 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl26', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "3"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["5 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl27', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "5"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["13 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl28', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "13"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["100 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl29', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "100"}),
                    "\r\n    "]})]}),
          W({
              elem: "p",
              children: [
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["3 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl210', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "3",
                      regular: "false"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["5 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl211', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "5",
                      regular: "false"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["13 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl212', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "13",
                      regular: "false"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["100 sommets"]}),
                    "\r\n        ",
                                        W('wdg.gl213', 'wdg.gl2', {
                      width: "200",
                      height: "200",
                      size: "100",
                      regular: "false"}),
                    "\r\n    "]})]}),
          W({
              elem: "p",
              children: [
                "Regardons de près les arguments de la fonction ",
                W({
                  elem: "code",
                  children: ["drawArrays( mode, first, count )"]}),
                "."]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["first"]}),
                    " : index du premier point. Dans un tableau, le premier point a l",
                    "&#39;",
                    "index 0."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["count"]}),
                    " : nombre de points à lire."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["mode"]}),
                    " : indique ce qu",
                    "&#39;",
                    "il faut faire avec ces points",
                    W({
                      elem: "ul",
                      children: [
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.POINTS"]}),
                            " : afficher seulement un pixel pour chaque point. (on verra plus tard comment définir la taille de ces ",
                            "&quot;",
                            "pixels",
                            "&quot;",
                            ")."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.LINE_STRIP"]}),
                            " : tracer une ligne qui passe par chaque point."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.LINE_LOOP"]}),
                            " : tracer une ligne qui passe par chaque point, mais ajoute un segment entre le dernier et le premier point, formant ainsi une boucle."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.LINES"]}),
                            " : Prend deux points et trace un segment. Puis on continue ainsi tant qu",
                            "&#39;",
                            "il reste au moins deux points. Cela permet de créer des lignes disjointes."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.TRIANGLE_STRIP"]}),
                            " : pour les points [A, B, C, D, E], on dessinera 3 triangles : ABC, BDC, CDE."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.TRIANGLE_FAN"]}),
                            " : pour les points [A, B, C, D, E], on dessinera 3 triangles : ABC, ACD, ADE. \nOn peut penser à un éventail."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.TRAIANGLES"]}),
                            " : dessine des triangles qui peuvent être disjoints. pour les points [A, B, C, D, E, F], on dessinera 2 triangles : ABC, DEF."]}),
                        "\n"]}),
                    "\n"]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Et, bien sûr, rien ne vous empêche d",
                "&#39;",
                "enchaîner les appels :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["drawArrays"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["TRIANGLE_FAN"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["drawArrays"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["TRIANGLES"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["8"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["38"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["drawArrays"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["LINE_LOOP"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["45"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["53"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n... "]})]})]})

    }
);
