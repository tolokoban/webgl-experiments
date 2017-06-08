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
        W('wdg.article43', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [
                "Les particules sont en réalité des nuées de points qui peuvent servir à représenter de la fumnée, du feu, de l",
                "&#39;",
                "eau et tout ce que votre imagination peut créer."]}),
          W({
              elem: "p",
              children: [                W('wdg.gl744', 'wdg.gl7', {
                  width: "640",
                  height: "640"})]}),
          W({
              elem: "p",
              children: [
                "Pour que l",
                "&#39;",
                "affichage des particules soit efficace, il faut placer toute la logique dans les shaders. Voici à quoi est réduite la boucle de rendu en Javascript :"]}),
          W({
              elem: "p",
              children: [W({
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
                      children: ["clearColor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["bindBuffer"]}),
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
                      children: ["ARRAY_BUFFER"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["bufAttributes"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["render"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["time"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword2"},
                      children: ["window"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["requestAnimationFrame"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["render"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["clear"]}),
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
                      children: ["COLOR_BUFFER_BIT"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["uniform1f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["uniTime"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["time"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n        ",
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
                      children: ["POINTS"]}),
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
                      attr: {"class": "identifier"},
                      children: ["count"]}),
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
                      attr: {"class": "keyword2"},
                      children: ["window"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["requestAnimationFrame"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["render"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "La seule donnée variable est ",
                W({
                  elem: "code",
                  children: ["uniTime"]}),
                " et le ",
                W({
                  elem: "em",
                  children: ["vertex shader"]}),
                " se base sur cette variable pour calculer la position, la taille et la couleur du vertex, donc de la particule."]}),
          W({
              elem: "p",
              children: [                W('wdg.showhide45', 'wdg.showhide', {
                  value: "false",
                  label: "Vertex Shader",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Temps courant en millisecondes"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniform"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Position en valeurs comprises entre -1.0 et +1.0"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 4 Valeurs aléatoires comprises entre 0.0 et 1.0"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Ces valeurs donnent la \"personnalité\" de la particule"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Couleur pour le fragment shader"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varying"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varColor"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Indique au fragment shader si les particules sont"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// en place (1.0) ou en mouvement désordonné (0.0)"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varying"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoeff"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
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
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["dot"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10000.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Position \"en place\" de la particule."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Créer un léger mouvement autour de la position normale."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["02"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["z"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["sin"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Coordonnées aléatoires en rotation dans tout l'espace."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1.5"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["sin"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.01"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["));"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["yy"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["sin"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Dans un cycle de 12 secondes, l'image est stable"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// pendant 8 secondes et en vrac pendant 4."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c1"]}),
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
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["12000.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["if"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4000.0"]}),
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
                          children: ["c1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["sin"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3.1415926539"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4000.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
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
                          attr: {"class": "identifier"},
                          children: ["c1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoeff"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c2"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Petites variations de vert."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varColor"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vec3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["abs"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.01"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")),"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// La position est intrerpolée entre (x,y) et (xx,yy)."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl_Position"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vec4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["yy"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Palpitation de la taille et diminution lors de la phase de désordre."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRandom"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl_PointSize"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["max"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["8.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["32.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["8.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ang"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["))"]}),
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
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["c2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["));"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]})]}),
          W({
              elem: "p",
              children: [
                "Le ",
                W({
                  elem: "em",
                  children: ["fragment shader"]}),
                " va dessiner des cercles dont le centre à la couleur ",
                W({
                  elem: "code",
                  children: ["varColor"]}),
                "\net qui devient de plus en plus transparent en allant vers la périphérie."]}),
          W({
              elem: "p",
              children: [                W('wdg.showhide46', 'wdg.showhide', {
                  value: "false",
                  label: "Fragment Shader",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["precision"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mediump"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varying"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varColor"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varying"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoeff"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
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
                          children: ["// Calculons la distance du fragment courant"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// au centre du point."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl_PointCoord"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl_PointCoord"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// On ne calcule pas la racine carré pour gagner du temps."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
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
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["alpha"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["clamp"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl_FragColor"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vec4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varColor"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["alpha"]}),
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
                          attr: {"class": "identifier"},
                          children: ["varCoeff"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
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
                        " "]})]})]}),
          W({
              elem: "p",
              children: [
                "A chaque affichage de particule, il faut que la transparence laisse voir ce qui\nest déjà à l",
                "&#39;",
                "écran. Ceci est réalisé par le ",
                W({
                  elem: "strong",
                  children: ["blending"]}),
                ".\nLe code qui donne la bonne configuration pour notre démonstration est le suivant :"]}),
          W({
              elem: "p",
              children: [W({
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
                      children: ["disable"]}),
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
                      children: ["DEPTH_TEST"]}),
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
                      children: ["enable"]}),
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
                      children: ["BLEND"]}),
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
                      children: ["blendFuncSeparate"]}),
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
                      children: ["SRC_ALPHA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ONE_MINUS_SRC_ALPHA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ZERO"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ONE"]}),
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
                      children: ["blendEquation"]}),
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
                      children: ["FUNC_ADD"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Les 4 arguments de la fonction ",
                W({
                  elem: "a",
                  attr: {"href": "https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate"},
                  children: [W({
                      elem: "code",
                      children: ["blendFuncSeparate()"]})]}),
                "\nsont tous des énumérés dont voici les valeurs :"]}),
          W({
              elem: "table",
              children: [
                "\n",
                W({
                  elem: "thead",
                  children: [
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "th",
                          children: ["Valeur"]}),
                        "\n",
                        W({
                          elem: "th",
                          attr: {"style": "text-align:center"},
                          children: ["Red"]}),
                        "\n",
                        W({
                          elem: "th",
                          attr: {"style": "text-align:center"},
                          children: ["Green"]}),
                        "\n",
                        W({
                          elem: "th",
                          attr: {"style": "text-align:center"},
                          children: ["Blue"]}),
                        "\n",
                        W({
                          elem: "th",
                          attr: {"style": "text-align:center"},
                          children: ["Alpha"]}),
                        "\n"]}),
                    "\n"]}),
                "\n",
                W({
                  elem: "tbody",
                  children: [
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.ZERO"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["0"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["0"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["0"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["0"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.ONE"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.SRC_COLOR"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Rs"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Gs"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Bs"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["As"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.ONE_MINUS_SRC_COLOR"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Rs"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Gs"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Bs"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-As"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.DST_COLOR"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Rd"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Gd"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Bd"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Ad"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.ONE_MINUS_DST_COLOR"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Rd"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Gd"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Bd"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.SRC_ALPHA"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["As"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["As"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["As"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["As"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.ONE_MINUS_SRC_ALPHA"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-As"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.DST_ALPHA"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["Ad"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.ONE_MINUS_DST_ALPHA"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1-Ad"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["gl.SRC_ALPHA_SATURATE"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["min(As, 1 - Ad)"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["min(As, 1 - Ad)"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["min(As, 1 - Ad)"]}),
                        "\n",
                        W({
                          elem: "td",
                          attr: {"style": "text-align:center"},
                          children: ["1"]}),
                        "\n"]}),
                    "\n"]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "On appelle ",
                W({
                  elem: "strong",
                  children: ["source"]}),
                " la couleur qui résulte du ",
                W({
                  elem: "em",
                  children: ["fragment shader"]}),
                " et qui est dans la variable ",
                W({
                  elem: "code",
                  children: ["gl_FragColor"]}),
                ". Et on appelle ",
                W({
                  elem: "strong",
                  children: ["destination"]}),
                " la couleur qui est actuellement affichée."]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "La ",
                    W({
                      elem: "strong",
                      children: ["source"]}),
                    " a 4 composantes : ",
                    W({
                      elem: "code",
                      children: ["(Rs, Gs, Bs, As)"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "La ",
                    W({
                      elem: "strong",
                      children: ["destination"]}),
                    " a 4 composantes : ",
                    W({
                      elem: "code",
                      children: ["(Rd, Gd, Bd, Ad)"]}),
                    "."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "La fonction ",
                W({
                  elem: "strong",
                  children: ["blendFuncSeparate()"]}),
                " a les arguments suivants :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Coefficient à multiplier avec ",
                    W({
                      elem: "code",
                      children: ["(Rs, Gs, Bs)"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Coefficient à multiplier avec ",
                    W({
                      elem: "code",
                      children: ["(Rd, Gd, Bd)"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Coefficient à multiplier avec ",
                    W({
                      elem: "code",
                      children: ["(As)"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Coefficient à multiplier avec ",
                    W({
                      elem: "code",
                      children: ["(Ad)"]}),
                    "."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Le code ",
                W({
                  elem: "code",
                  children: ["gl.blendEquation(gl.FUNC_ADD)"]}),
                " indique qu",
                "&#39;",
                "il faut ensuite additionner les deux couleurs résultantes."]}),
          W({
              elem: "p",
              children: [
                "On en déduit que, dans notre exemple, on obtiendra ceci :\n",
                W({
                  elem: "pre",
                  children: ["\r\nRed   := Rs * As + Rd * (1 - As)\r\nGreen := Gs * As + Gd * (1 - As)\r\nBlue  := Bs * As + Bd * (1 - As)\r\nAlpha := As * 0 + Ad * 1\r\n"]})]}),
          W({
              elem: "p",
              children: ["Une fois bien compris, le blending est un outil puissant qui permet de réaliser de nombreux effets."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "hr"})]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Chapitre précédent : ",
                    W({
                      elem: "a",
                      attr: {"href": "chap6.html"},
                      children: [
                        "Un point c",
                        "&#39;",
                        "est tout"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Chapitre suivant : ",
                    W({
                      elem: "a",
                      attr: {"href": "chap8.html"},
                      children: ["Framebuffer"]}),
                    "."]}),
                "\n"]})]})

    }
);
