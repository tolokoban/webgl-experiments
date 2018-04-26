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
        W('wdg.article120', 'wdg.article', {
            title: "Marilyn",
            content: [
          W({
              elem: "p",
              children: [
                W({
                  elem: "img",
                  attr: {
                    class: "right",
                    src: "css/assets/marilyn/marilyn.jpg"}}),
                W({
                  elem: "br"}),
                "Dans cet article, on va se prendre pour Andy Warhol et modifier la teinte d",
                "&#39;",
                "une image avec un fragment shader."]}),
          W({
              elem: "p",
              children: [
                "WebGL utilise des couleurs au format RGB. Ce format est très lié à la technologie des écrans qui combinent la lumière rouge, verte et bleu pour obtenir toutes les couleurs. Ainsi, si la lumière est inexistante, on obtien du noir. A l",
                "&#39;",
                "inverse, si on éclaire au maximum les spots rouge, vert et bleu, on a du blanc. L",
                "&#39;",
                "espace colorimétrique RGB est donc fait pour commander avec précision les petits cristaux liquides de notre écran. Mais pour un designer, c",
                "&#39;",
                "est parfoit un peu loin de son propre langage."]}),
          W({
              elem: "p",
              children: [
                "Un autre espace colorimétrique que l",
                "&#39;",
                "on peut utiliser est le HSL. Pour Hue (teinte), Saturation (saturation) et Luminance (luminosité). La ",
                W({
                  elem: "em",
                  children: ["saturation"]}),
                " contrôle l",
                "&#39;",
                "intensité de la couleur. Si elle vaut 0, on a du gris."]}),
          W({
              elem: "p",
              children: [
                "Pour jouer à Andy, nous allons dessiner une mosaïque de portraits de Marilyn et nous ferons varier aléatoirement la ",
                W({
                  elem: "em",
                  children: ["teinte"]}),
                " de chaque portrait."]}),
          W({
              elem: "p",
              children: [
                "Les formules pour passer d",
                "&#39;",
                "une espace RGB à HSL et vice versa se trouvent facilement sur Wikipedia.\n",
                W('wdg.showhide121','wdg.showhide',{
                  value: "false",
                  label: "Exemple de code",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight glsl"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["precision"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["mediump"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["uniform"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["sampler2D"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTexture"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Coordonnées UV pour la texture."]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["varying"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Décalage de teinte (valeur comprise entre 0 et 1)."]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["varying"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varHueShift"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Déplace dans l'espace HSL une couleur qui vient du RGB."]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rgb2hsl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["max"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["max"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["g"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["b"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["m"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["min"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["min"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["g"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["b"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["m"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["=="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["60.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["(("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["g"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["b"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["6.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["=="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["g"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["60.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["b"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["6.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["60.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["g"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["6.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["S"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["S"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["S"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["a"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Déplace dans l'espace RGB une couleur qui vient du HSL."]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["hsl2rgb"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["360.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["S"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["z"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["S"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["abs"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["60.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["R"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["G"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["B"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["180.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["60.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["R"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["G"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["120.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["R"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["G"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["G"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["B"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: [
                            "// H ",
                            "&gt;",
                            " 180"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["240.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["G"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["B"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["R"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["B"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["R"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["B"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["m"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["C"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["R"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["m"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["G"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["m"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["B"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["m"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["a"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["main"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["()"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Lire la couleur du pixel de la texture."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["texture2D"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTexture"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Passer dans l'espace HSL."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["hsl"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rgb2hsl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["color"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Décaler la teinte."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["hsl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varHueShift"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Revenir dans l'espace RGB."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rgb"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["hsl2rgb"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["hsl"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// La couleur du fragment doit toujours être exprimée en RGB."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["gl_FragColor"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rgb"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide121"})]}),
          W({
              elem: "p",
              children: [
                "Et voilà ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/marilyn/index.html"},
                  children: ["le résultat"]}),
                "."]})]},{"id":"wdg.article120"})

    }
);
