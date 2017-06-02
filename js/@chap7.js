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
        W('wdg.article38', 'wdg.article', {"content": [
          W({
              elem: "h1",
              attr: {"id": "particules"},
              children: ["Particules"]}),
          W({
              elem: "p",
              children: [
                "Les particules sont en réalité des nuées de points qui peuvent servir à représenter de la fumnée, du feu, de l",
                "&#39;",
                "eau et tout ce que votre imagination peut créer."]}),
          W({
              elem: "p",
              children: [                W('wdg.gl739', 'wdg.gl7', {
                  width: "480",
                  height: "480"})]}),
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
                    "\n    ",
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
                    "\n\n    ",
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
                    "\n        ",
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
                    "\n\n        ",
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
                    "\n        ",
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
                    "\n        ",
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
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n    ",
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
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Temps courant en millisecondes"]}),
                    "\n",
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
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Position en valeurs comprises entre -1.0 et +1.0"]}),
                    "\n",
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// 4 Valeurs aléatoires comprises entre 0.0 et 1.0"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Ces valeurs donnent la \"personnalité\" de la particule"]}),
                    "\n",
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
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Couleur pour le fragment shader"]}),
                    "\n",
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Indique au fragment shader si les particules sont"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// en place (1.0) ou en mouvement désordonné (0.0)"]}),
                    "\n",
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
                    "\n\n",
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
                    "\n  ",
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Position \"en place\" de la particule."]}),
                    "\n  ",
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
                    "\n  ",
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
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Créer un léger mouvement autour de la position normale."]}),
                    "\n  ",
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
                    "\n  ",
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
                    "\n  ",
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
                    "\n  ",
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
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Coordonnées aléatoires en rotation dans tout l'espace."]}),
                    "\n  ",
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
                    "\n  ",
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
                    "\n  ",
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
                    "\n  ",
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
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Dans un cycle de 12 secondes, l'image est stable"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// pendant 8 secondes et en vrac pendant 4."]}),
                    "\n  ",
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
                    "\n  ",
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
                    "\n  ",
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
                    "\n    ",
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n  ",
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
                    "\n\n  ",
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Petites variations de vert."]}),
                    "\n  ",
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// La position est intrerpolée entre (x,y) et (xx,yy)."]}),
                    "\n  ",
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Palpitation de la taille et diminution lors de la phase de désordre."]}),
                    "\n  ",
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
                    "\n  ",
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
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
                " et qui devient de plus en plus transparent en allant vers la périphérie. A chaque affichage de particule, il faut que la transparence laisse voir ce qui est déjà à l",
                "&#39;",
                "écran. Ceci est réalisé par le ",
                W({
                  elem: "strong",
                  children: ["blending"]}),
                ". Le code qui donne la bonne configuration pour notre démonstration est le suivant :"]}),
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
                    "\n",
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
                    "\n",
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
                    "\n",
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
                  elem: "code",
                  children: ["blendFuncSeparate()"]}),
                " sont tous des énumérés dont voici les valeurs :\n",
                W({
                  elem: "pre",
                  children: ["\n Valeur                | Red, Green, Blue  | Alpha\n-----------------------+-------------------+-------\ngl.ZERO                | 0,0,0             | 0\ngl.ONE                 | 1,1,1             | 1\ngl.SRC_COLOR           | Rs, Gs, Bs        | As\ngl.ONE_MINUS_SRC_COLOR | 1-Rs, 1-Gs, 1-Bs  | 1-As\ngl.DST_COLOR           | Rd, Gd, Bd        | Ad\ngl.ONE_MINUS_DST_COLOR | 1-Rd, 1-Gd, 1-Bd  | 1-Ad\ngl.SRC_ALPHA           | As, As, As        | As\ngl.ONE_MINUS_SRC_ALPHA | 1-Ad, 1-Ad, 1-Ad  | 1-As\ngl.DST_ALPHA           | Ad, Ad, Ad        | Ad\ngl.ONE_MINUS_DST_ALPHA | 1-Ad, 1-Ad, 1-Ad  | 1-Ad\ngl.SRC_ALPHA_SATURATE  | min(As, 1 - Ad),  |\n                       | min(As, 1 - Ad),  | 1\n                       | min(As, 1 - Ad)   | \n"]})]}),
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
                  children: ["\nRed   := Rs * As + Rd * (1 - As)\nGreen := Gs * As + Gd * (1 - As)\nBlue  := Bs * As + Bd * (1 - As)\nAlpha := As * 0 + Ad * 1\n"]})]}),
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
require("$",function(r,n,t){t.config={name:'"webgl-experiments"',description:'"WebGL study by tutorials"',author:'"tolokoban"',version:'"0.0.74"',major:"0",minor:"0",revision:"74",date:"2017-06-02T17:14:06.000Z",consts:{}};var o=null;t.lang=function(r){return void 0===r&&(window.localStorage&&(r=window.localStorage.getItem("Language")),r||(r=window.navigator.language)||(r=window.navigator.browserLanguage)||(r="fr"),r=r.substr(0,2).toLowerCase()),o=r,window.localStorage&&window.localStorage.setItem("Language",r),r},t.intl=function(r,n){var o,e,a,i,g,u,l,s=r[t.lang()],w=n[0];for(l in r)break;if(!l)return w;if(!s&&!(s=r[l]))return w;if(o=s[w],o||(s=r[l],o=s[w]),!o)return w;if(n.length>1){for(e="",g=0,a=0;a<o.length;a++)i=o.charAt(a),"$"===i?(e+=o.substring(g,a),a++,u=o.charCodeAt(a)-48,u<0||u>=n.length?e+="$"+o.charAt(a):e+=n[u],g=a+1):"\\"===i&&(e+=o.substring(g,a),a++,e+=o.charAt(a),g=a+1);e+=o.substr(g),o=e}return o}});
//# sourceMappingURL=$.js.map
require("wdg.article",function(e,a,t){function n(){var e,a,t=o.tag("nav","theme-elevation-8");for(e in i)a=i[e],"$"===e.charAt(0)?o.add(t,o.tag("h1",[a])):o.add(t,o.tag("a",[a],{href:e+".html"}));return t}var r=function(){function a(){return n(t,arguments)}var t={en:{},fr:{}},n=e("$").intl;return a.all=t,a}(),i={$1:"Les bases",index:"Comprendre WebGL",chap1:"Dessiner un carré",chap2:"Dessiner un polygône",chap3:"Textures procédurales",chap4:"Textures animées",chap5:"Utiliser des images",$999:"脌 trier...",chap6:"Chap-6",chap7:"Chap-7",chap8:"Chap-8"};e("font.josefin");var o=e("dom"),c=e("tfw.data-binding"),s=function(e){var a=window.location.pathname.split("/").pop();a=a.substr(0,a.length-5),console.info("page=",a);var t=o.tag("header","theme-elevation-12",[i[a]]),r=n(),s=o.tag("article");o.elem(this,"div","article",[s,r,t]);c.prop(this,"content")(function(e){o.clear(s),Array.isArray(e)||(e=[e]),e.forEach(function(e){o.add(s,e)})}),e=c.extend({content:[]},e,this)};a.exports=s,a.exports._=r});
//# sourceMappingURL=wdg.article.js.map
require("tfw.data-binding",function(n,t,e){function r(n,t,r,o){var i="function"==typeof o;void 0===t[l]&&(t[l]={}),t[l][r]={value:o,event:new u};var a;a="function"==typeof n?function(e){e=n(e),(i||t[l][r].value!==e)&&(t[l][r].value=e,t[l][r].event.fire(e,t,r))}:function(n){(i||t[l][r].value!==n)&&(t[l][r].value=n,t[l][r].event.fire(n,t,r))};var f=o;return i||(f=function(){return t[l][r].value}),Object.defineProperty(t,r,{get:f,set:a,configurable:!1,enumerable:!0}),e.bind.bind(e,t,r)}var o=function(){function t(){return r(e,arguments)}var e={en:{}},r=n("$").intl;return t.all=e,t}();n("polyfill.string");var i=n("dom"),a=n("tfw.css").parseUnit,u=n("tfw.listeners"),l="_tfw.data-binding_",f={castArray:function(n){return Array.isArray(n)?n:null===n||void 0===n?[]:[n]},castBoolean:function(n){return"boolean"==typeof n?n:"string"==typeof n?"0"!=(n=n.trim().toLowerCase())&&"false"!=n&&"no"!=n&&"null"!=n&&"undefined"!=n:"number"==typeof n?0!=n:null},castColor:function(n){return""+n},castDate:function(n){return"number"==typeof n||"string"==typeof n?new Date(n):n instanceof Date?n:new Date},castEnum:function(n){var t=n.map(String.toLowerCase);return function(e){if("number"==typeof e)return n[Math.floor(e)%n.length];if("string"!=typeof e)return n[0];var r=t.indexOf(e.trim().toLowerCase());return r<0&&(r=0),n[r]}},castInteger:function(n){return"number"==typeof n?Math.floor(n):"boolean"==typeof n?n?1:0:"string"==typeof n?parseInt(n):Number.NaN},castFloat:function(n){return"number"==typeof n?n:"boolean"==typeof n?n?1:0:"string"==typeof n?parseFloat(n):Number.NaN},castRegexp:function(n){if(n instanceof RegExp)return n;if("string"==typeof n&&0!=n.trim().length)try{return new RegExp(n)}catch(t){console.error("[castRegexp] /"+n+"/ ",t)}return null},castString:function(n){return"string"==typeof n?n:void 0===n||null===n?"":JSON.stringify(n)},castStringArray:function(n){return Array.isArray(n)?n:null===n||void 0===n?[]:"string"==typeof n?n.split(",").map(String.trim):[JSON.stringify(n)]},castUnit:function(n){return n?void 0!==n.v?(n.v=parseFloat(n.v),isNaN(n.v)?{v:0,u:"px"}:("string"!=typeof n.u&&(n.u="px"),{v:n.v,u:n.u})):"number"==typeof n?{v:n,u:"px"}:"string"!=typeof n?{v:0,u:"px"}:a(""+n):{v:0,u:"px"}},castValidator:function(n){if("function"==typeof n)return n;if("boolean"==typeof n)return function(){return n};if("string"==typeof n&&0!=n.trim().length)try{var t=new RegExp(n);return t.test.bind(t)}catch(t){console.error("[castValidator] /"+n+"/ ",t)}return function(){return null}}};e.fire=function(n,t,e){var r=n[t];void 0===e&&(e=r),n[l][t].value=e,n[l][t].event.fire(n[t],n,t)},e.set=function(n,t,e){void 0===n[l]&&(n[l]={}),void 0===n[l][t]&&(n[l][t]={}),n[l][t].value=e},e.get=function(n,t){if(void 0!==n[l]&&void 0!==n[l][t])return n[l][t].value},e.readOnly=function(n,t,e){"function"==typeof att?Object.defineProperty(n,t,{get:e,set:function(){},configurable:!1,enumerable:!0}):Object.defineProperty(n,t,{value:e,writtable:!1,configurable:!1,enumerable:!0})},e.prop=r.bind(null,null),e.propToggleClass=function(n,t,e,o){"string"!=typeof o&&(o="");var a={};"string"==typeof e?a[e]=e:Array.isArray(e)?e.forEach(function(n){a[n]=n}):a=e,r(null,n,t)(function(t){var e,r;for(e in a)r=a[e],e==t?i.addClass(n.element,o+r):i.removeClass(n.element,o+r)})},e.propAddClass=function(n,t,e){void 0===e&&(e=t),r(f.castBoolean,n,t)(function(t){t?i.addClass(n.element,e):i.removeClass(n.element,e)})},e.propRemoveClass=function(n,t,e){void 0===e&&(e=t),r(f.castBoolean,n,t)(function(t){t?i.removeClass(n.element,e):i.addClass(n.element,e)})},e.propArray=r.bind(null,f.castArray),e.propBoolean=r.bind(null,f.castBoolean),e.propColor=r.bind(null,f.castColor),e.propDate=r.bind(null,f.castDate),e.propEnum=function(n){return r.bind(null,f.castEnum(n))},e.propInteger=r.bind(null,f.castInteger),e.propFloat=r.bind(null,f.castFloat),e.propRegexp=r.bind(null,f.castRegexp),e.propString=r.bind(null,f.castString),e.propStringArray=r.bind(null,f.castStringArray),e.propUnit=r.bind(null,f.castUnit),e.propValidator=r.bind(null,f.castValidator),e.bind=function(n,t,e,r,o){if(void 0===n[l]||void 0===n[l][t])throw console.error(JSON.stringify(t)+" is not a bindable property!",{srcObj:n,srcAtt:t,dstObj:e,dstAtt:r,options:o}),Error(JSON.stringify(t)+" is not a bindable property!");void 0===o&&(o={}),o.value&&(o.converter=function(){return o.value});var i="function"==typeof e?e:function(n,t,i){e[r]="function"==typeof o.converter?o.converter(n):n};return n[l][t].event.add(i),o},e.extend=function(n,t,e){var r,o,i=JSON.parse(JSON.stringify(n));for(r in t)"$"!=r.charAt(0)&&(o=t[r],void 0===i[r]?console.error("[tfw.data-binding.extend] Undefined argument: `"+r+"`!"):i[r]=o);if(void 0!==e){for(r in t)"$"==r.charAt(0)&&Object.defineProperty(e,r,{value:t[r],writable:!1,configurable:!1,enumerable:!1});for(r in i)"$"!=r.charAt(0)&&(e[r]=i[r])}return i},e.converters=f,t.exports._=o});
//# sourceMappingURL=tfw.data-binding.js.map
require("tfw.listeners",function(t,i,r){var n=function(){function i(){return n(r,arguments)}var r={en:{}},n=t("$").intl;return i.all=r,i}(),e=function(){this._list=[]};e.prototype.add=function(t,i){if("function"!=typeof t)return!1;this.remove(t);for(var r=0;r<this._list.length;r++)if(t===this._list[r])return!1;return this._list.push([t,i]),!0},e.prototype.remove=function(t,i){if("function"!=typeof t)return!1;for(var r=0;r<this._list.length;r++){var n=this._list[r];if(t===n[0]&&i===n[1])return this._list.splice(r,1),!0}return!1},e.prototype.clear=function(){this._list=[]},e.prototype.fire=function(){var t,i,r,n,e=[].slice.call(arguments);for(t=0;t<this._list.length;t++)if(n=this._list[t],i=n[0],r=n[1],!1===i.apply(r,e))return!1;return!0},i.exports=e,i.exports._=n});
//# sourceMappingURL=tfw.listeners.js.map
require("tfw.css",function(e,r,t){var i=function(){function r(){return i(t,arguments)}var t={en:{}},i=e("$").intl;return r.all=t,r}();t.parseUnit=function(e){for(var r,t=0,i=0;i<e.length;i++)if(r=e.charAt(i),0==t){if("-"==r||"+"==r||r>="0"&&r<="9")t=1;else if("."==r)t=2;else if(r>" ")break}else if(1==t){if("."==r)t=2;else if(r<"0"||r>"9")break}else if(2==t&&(r<"0"||r>"9"))break;return{v:parseFloat(e.substr(0,i)),u:e.substr(i).trim()}},r.exports._=i});
//# sourceMappingURL=tfw.css.js.map
require("dom",function(e,t,r){function n(e,t,r){return Object.defineProperty(e,"element",{value:t,writable:!1,configurable:!1,enumerable:!0}),r?e:(e.on=u.bind(e,t),e.css=i.bind(e,t),e.add=l.bind(e,t),e.att=s.bind(e,t),e.addClass=d.bind(e,t),e.hasClass=v.bind(e,t),e.removeClass=m.bind(e,t),e.toggleClass=y.bind(e,t),e)}function o(e,t){return e=L(e),t=L(t),t.parentNode.replaceChild(e,t),e}function i(e,t){e=L(e);var r,n;for(r in t)n=t[r],e.style[r]=n;return e}function s(e,t,r){e=L(e);var n,o;"string"==typeof t&&(n=t,t={},t[n]=r);for(n in t)o=t[n],e.setAttribute(n,o);return e}function a(e,t){return e=L(e),e.removeAttribute(t),e}function l(e){e=L(e);try{var t,r;for(t=1;t<arguments.length;t++){if("string"==typeof(r=arguments[t])||"number"==typeof r)if(r=""+r,"<html>"==r.substr(0,6)){var n=r.substr(6);r=L.tag("span"),r.innerHTML=n}else if(N.test(r)){var o=r;r=L.tag("span"),r.innerHTML=o}else r=document.createTextNode(r);else"function"==typeof r.element?r=r.element():void 0!==r.element&&(r=r.element);e.appendChild(r)}return e}catch(e){throw console.error("[DOM.add] arguments=",[].slice.call(arguments)),Error("[DOM.add] "+e)}}function c(e){if(Array.isArray(e))return e.forEach(function(e){c(e)}),e;if(void 0===e[S])return e;var t=e[S].events;if(void 0===t)return e;t.off(),delete e[S].events}function u(e,t){if("function"!=typeof t&&null!==t||(t={tap:t}),Array.isArray(e))return e.forEach(function(e){u(e,t)}),e;e=L(e),void 0===e[S]&&(e[S]={}),void 0===e[S].events&&(e[S].events=new x(e));var r,n,o;for(r in t)n=t[r],"!"==r.charAt(0)?(r=r.substr(1),o=!0):o=!1,"keydown"==r||"keyup"==r?e.addEventListener(r,n,o):e[S].events.on(r,n,o);return e}function f(e,t){try{var r,n,o,i,s=document.createElementNS(e,t);for(r=2;r<arguments.length;r++)if(n=arguments[r],Array.isArray(n))n.forEach(function(e){switch(typeof e){case"string":case"number":case"boolean":if(e=""+e,"<html>"==e.substr(0,6)){var t=e.substr(6);e=L.tag("span"),e.innerHTML=t}else e=document.createTextNode(e)}l(s,e)});else switch(typeof n){case"string":n.split(" ").forEach(function(e){e.length>0&&d(s,e)});break;case"object":for(o in n)i=n[o],s.setAttribute(o,i);break;default:throw Error("[dom.tag] Error creating <"+t+">: Invalid argument #"+r+"!")}return s}catch(r){console.error("[dom.tagNS] Error with `ns` = ",e," and `name` = ",t),console.error(r)}}function d(e){var t=[].slice.call(arguments,1);return Array.isArray(e)?(t.unshift(null),e.forEach(function(e){t[0]=e,d.apply(void 0,t)}),e):(e=L(e),t.forEach(function(t){if("string"==typeof t&&(t=t.trim(),0!=t.length))try{e.classList&&e.classList.add(t)}catch(e){console.error("[dom.addClass] Invalid class name: ",t),console.error(e)}}),e)}function v(e,t){return e=L(e),!!e.classList&&e.classList.contains(t)}function m(e){var t=[].slice.call(arguments,1);return Array.isArray(e)?(t.unshift(null),e.forEach(function(e){t[0]=e,m.apply(void 0,t)}),e):(e=L(e),t.forEach(function(t){if("string"==typeof t)try{e.classList&&e.classList.remove(t)}catch(e){console.error("[dom.removeClass] Invalid class name: ",t),console.error(e)}}),e)}function y(e){return[].slice.call(arguments,1).forEach(function(t){v(e,t)?m(e,t):d(e,t)}),e}function h(e){e=L(e);for(var t=e;t.firstChild;)t.removeChild(t.firstChild);var r=[].slice.call(arguments);return r.length>1&&l.apply(this,r),e}function p(e,t){return e=L(e),void 0===t&&(t=e,e=window.document),e.querySelector(t)}function g(e){e=L(e);var t=e.parentElement;return t?(t.removeChild(e),t):t}function w(e){var t=[].slice.call(arguments);t.shift(),0==t.length&&(t=["div"]),t.push("dom","custom");var r;return void 0!==t[0].element?(r=t[0].element,d(r,"dom","custom")):"function"==typeof t[0].appendChild?(r=t[0],d(r,"dom","custom")):r=L.tag.apply(L,t),Object.defineProperty(e,"element",{value:r,writable:!1,configurable:!1,enumerable:!0}),r}function b(e,t){return void 0===t&&(t=""),null===t&&(t=""),"string"!=typeof t&&(t=JSON.stringify(t)),"<html>"==t.substr(0,6)?e.innerHTML=t.substr(6):e.textContent=t,e}function A(e){if(!Array.isArray(e))return A(Array.prototype.slice.call(arguments));e.forEach(function(e){e=L(e),void 0===e[S]&&(e[S]={}),Array.isArray(e[S].style)||(e[S].style=[]),e[S].style.push(JSON.stringify(e.style))})}function E(e){if(!Array.isArray(e))return E(Array.prototype.slice.call(arguments));e.forEach(function(e){if(e=L(e),void 0===e[S]||!Array.isArray(e[S].style))throw Error("[dom.restoreStyle] `saveStyle()` has never been used on this element!");if(0==e[S].style.length)throw Error("[dom.restoreStyle] more `restore` than `save`!");var t,r,n=JSON.parse(e[S].style.pop());for(t in n)void 0!==(r=n[t])&&(e.style[t]=r)})}var C=function(){function t(){return n(r,arguments)}var r={en:{}},n=e("$").intl;return t.all=r,t}();e("polyfill.classList");var x=e("tfw.pointer-events"),L=function(e){if("string"==typeof e){var t=document.getElementById(e);return t||console.error("[dom] There is no DOM element with this ID: `"+e+"`"),t}if(!e)throw Error("`dom` is not a valid element!",e);return"function"==typeof e.element?e.element():e.element?e.element:e};t.exports=L;var S="@dom"+Date.now(),N=/^&(#[0-9]+|[a-zA-Z0-9]+);$/;L.tagNS=f,L.svgRoot=f.bind(void 0,"http://www.w3.org/2000/svg","svg",{version:"1.1","xmlns:svg":"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),L.svg=f.bind(void 0,"http://www.w3.org/2000/svg"),L.tag=f.bind(void 0,"http://www.w3.org/1999/xhtml"),L.div=f.bind(void 0,"http://www.w3.org/1999/xhtml","div"),L.txt=window.document.createTextNode.bind(window.document),L.textOrHtml=b,L.get=p,L.elem=w,L.css=i,L.att=s,L.removeAtt=a,L.addClass=d,L.hasClass=v,L.removeClass=m,L.toggleClass=y,L.saveStyle=A,L.restoreStyle=E,L.replace=o,L.detach=g,L.on=u,L.off=c,L.add=l,L.wrap=n,L.clear=h,t.exports._=C});
//# sourceMappingURL=dom.js.map
require("tfw.pointer-events",function(e,t,o){function n(e){var t=this;this._slots={},this._eventListeners=[],Object.defineProperty(n.prototype,"element",{value:e,writable:!1,configurable:!0,enumerable:!0}),a.call(t,e,"touchstart",function(o){d.touchDevice||(d.touchDevice=!0,document.body.removeEventListener("mousedown",l,!0),document.body.removeEventListener("mousemove",p,!0),document.body.removeEventListener("mouseup",v,!0));var n=t._slots;1==o.touches.length&&(d.rect=e.getBoundingClientRect(),d.bodyMoveX=o.touches[0].clientX,d.bodyMoveY=o.touches[0].clientY,d.bodyDownX=o.touches[0].clientX,d.bodyDownY=o.touches[0].clientY,d.targetX=o.touches[0].clientX-d.rect.left,d.targetY=o.touches[0].clientY-d.rect.top,d.time=Date.now(),n.down&&n.down({action:"down",target:e,x:d.targetX,y:d.targetY,stopPropagation:o.stopPropagation.bind(o),preventDefault:o.preventDefault.bind(o)}))}),a.call(t,e,"touchmove",function(o){var n=d.bodyMoveX,a=d.bodyMoveY;d.bodyMoveX=o.touches[0].clientX,d.bodyMoveY=o.touches[0].clientY;var r=t._slots;r.drag&&r.drag({action:"drag",target:e,x0:d.targetX,y0:d.targetY,x:d.bodyMoveX-d.rect.left,y:d.bodyMoveY-d.rect.top,dx:d.bodyMoveX-d.bodyDownX,dy:d.bodyMoveY-d.bodyDownY,vx:d.bodyMoveX-n,vy:d.bodyMoveY-a,stopPropagation:o.stopPropagation.bind(o),preventDefault:o.preventDefault.bind(o)})}),a.call(t,e,"touchend",function(e){var o=t._slots,n=d.bodyMoveX-d.bodyDownX,a=d.bodyMoveY-d.bodyDownY;if(o.up&&o.up({action:"up",target:t.element,x:d.bodyMoveX-d.rect.left,y:d.bodyMoveY-d.rect.top,dx:n,dy:a,stopPropagation:e.stopPropagation.bind(e),preventDefault:e.preventDefault.bind(e)}),n*n+a*a<256){var r=Date.now();d.lastTapTime>0&&(o.doubletap&&r-d.lastTapTime<400?o.doubletap({action:"doubletap",target:t.element,x:d.bodyMoveX-d.rect.left,y:d.bodyMoveY-d.rect.top,stopPropagation:e.stopPropagation.bind(e),preventDefault:e.preventDefault.bind(e)}):d.lastTapTime=0),o.tap&&0==d.lastTapTime&&(e.stopPropagation(),e.preventDefault(),o.tap({action:"tap",target:t.element,x:d.bodyMoveX-d.rect.left,y:d.bodyMoveY-d.rect.top,stopPropagation:e.stopPropagation.bind(e),preventDefault:e.preventDefault.bind(e)})),d.lastTapTime=r}}),a.call(t,e,"mousedown",function(o){if(!d.touchDevice){var n=t._slots,a=e.getBoundingClientRect();d.target=t,d.targetX=o.clientX-a.left,d.targetY=o.clientY-a.top,n.down&&n.down({action:"down",target:e,x:d.targetX,y:d.targetY,stopPropagation:o.stopPropagation.bind(o),preventDefault:o.preventDefault.bind(o)})}}),a.call(t,e,"mousemove",function(o){var n=t._slots;if(n.move){var a=e.getBoundingClientRect(),r=o.target.getBoundingClientRect();n.move({target:e,action:"move",x:o.offsetX+r.left-a.left,y:o.offsetY+r.top-a.top})}}),Object.defineProperty(this,"element",{value:e,writable:!0,configurable:!0,enumerable:!0})}function a(e,t,o,n){e.addEventListener(t,o,n),this._eventListeners.push([e,t,o,n])}var r=function(){function t(){return n(o,arguments)}var o={en:{}},n=e("$").intl;return t.all=o,t}(),i="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",d={touchDevice:!1,target:null,targetX:0,targetY:0,bodyDownX:0,bodyDownY:0,bodyMoveX:-1,bodyMoveY:-1,bodyMoveLastX:-1,bodyMoveLastY:-1,onDrag:null,lastTapTime:0},l=function(e){d.touchDevice||(d.bodyDownX=e.pageX,d.bodyDownY=e.pageY,d.bodyMoveX=e.pageX,d.bodyMoveY=e.pageY,d.bodyMoveLastX=e.pageX,d.bodyMoveLastY=e.pageY)},p=function(e){if(!d.touchDevice&&d.target&&(e.stopPropagation(),e.preventDefault(),d.bodyMoveLastX=d.bodyMoveX,d.bodyMoveLastY=d.bodyMoveY,d.bodyMoveX=e.pageX,d.bodyMoveY=e.pageY,d.target)){var t=d.target._slots;"function"==typeof t.drag&&t.drag({action:"drag",target:d.target.element,x0:d.targetX,y0:d.targetY,x:d.targetX+d.bodyMoveX-d.bodyDownX,y:d.targetY+d.bodyMoveY-d.bodyDownY,dx:d.bodyMoveX-d.bodyDownX,dy:d.bodyMoveY-d.bodyDownY,vx:d.bodyMoveX-d.bodyMoveLastX,vy:d.bodyMoveY-d.bodyMoveLastY})}},v=function(e){if(!d.touchDevice&&d.target){e.stopPropagation(),e.preventDefault();var t=Date.now(),o=d.target._slots,n=e.pageX-d.bodyDownX,a=e.pageY-d.bodyDownY;o.up&&o.up({action:"up",target:d.target.element,x:d.targetX+n,y:d.targetY+a,dx:n,dy:a}),n*n+a*a<1024&&(d.lastTapTime>0&&(o.doubletap&&t-d.lastTapTime<400?o.doubletap({action:"doubletap",target:d.target.element,x:d.targetX+n,y:d.targetY+a}):d.lastTapTime=0),o.tap&&0==d.lastTapTime&&o.tap({action:"tap",target:d.target.element,x:d.targetX+n,y:d.targetY+a}),d.lastTapTime=t),delete d.target}};document.body.addEventListener("mousedown",l,!0),document.body.addEventListener("mousemove",p,!0),document.body.addEventListener("mouseup",v,!0),n.prototype.on=function(e,t){var o=this,n=this._slots;return"function"==typeof t&&(n[e]=t),"wheel"==e&&a.call(o,this.element,i,function(e){var t=o.element.getBoundingClientRect();n.wheel({target:o.element,action:"wheel",delta:e.deltaY,x:e.clientX-t.left,y:e.clientY-t.top,stopPropagation:e.stopPropagation.bind(e),preventDefault:e.preventDefault.bind(e)})}),this},n.prototype.off=function(){this._eventListeners.forEach(function(e){var t=e[0],o=e[1],n=e[2],a=e[3];t.removeEventListener(o,n,a)})},t.exports=n,t.exports._=r});
//# sourceMappingURL=tfw.pointer-events.js.map
require("polyfill.classList",function(t,e,n){var i=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}();"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;n<i;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():function(t){"use strict";if("Element"in t){var e=t.Element.prototype,n=Object,i=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array.prototype.indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},r=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},o=function(t,e){if(""===e)throw new r("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new r("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(t,e)},c=function(t){for(var e=i.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],s=0,r=n.length;s<r;s++)this.push(n[s]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},a=c.prototype=[],l=function(){return new c(this)};if(r.prototype=Error.prototype,a.item=function(t){return this[t]||null},a.contains=function(t){return t+="",-1!==o(this,t)},a.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do{t=e[n]+"",-1===o(this,t)&&(this.push(t),s=!0)}while(++n<i);s&&this._updateClassName()},a.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do{for(t=n[i]+"",e=o(this,t);-1!==e;)this.splice(e,1),r=!0,e=o(this,t)}while(++i<s);r&&this._updateClassName()},a.toggle=function(t,e){t+="";var n=this.contains(t),i=n?!0!==e&&"remove":!1!==e&&"add";return i&&this[i](t),!0===e||!1===e?e:!n},a.toString=function(){return this.join(" ")},n.defineProperty){var u={get:l,enumerable:!0,configurable:!0};try{n.defineProperty(e,"classList",u)}catch(t){-2146823252===t.number&&(u.enumerable=!1,n.defineProperty(e,"classList",u))}}else n.prototype.__defineGetter__&&e.__defineGetter__("classList",l)}}(self)),e.exports._=i});
//# sourceMappingURL=polyfill.classList.js.map
require("polyfill.string",function(r,t,n){var e=function(){function t(){return e(n,arguments)}var n={en:{}},e=r("$").intl;return t.all=n,t}();"function"!=typeof String.toLowerCase&&(String.toLowerCase=function(r){return r.toLowerCase()},String.toUpperCase=function(r){return r.toUpperCase()},String.trim=function(r){return r.trim()}),t.exports._=e});
//# sourceMappingURL=polyfill.string.js.map
require("font.josefin",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{},fr:{}},e=n("$").intl;return r.all=t,r}();r.exports._=e});
//# sourceMappingURL=font.josefin.js.map
require("x-widget",function(e,t,r){function n(t,r,n){try{var i=e(r),d=new i(n),a="function"==typeof d.element?d.element():d.element;a.setAttribute("id",t);var u=document.getElementById(t);return u&&u.parentNode.replaceChild(a,u),o(t,d),d}catch(e){throw console.error("[x-widget] Unable to create widget `"+r+"`!"),console.error("[x-widget] id = ",t,", args = ",n),Error(e)}}function i(e){var t,r=a.tag(e.elem);e.attr&&(a.att(r,e.attr),t=e.attr.id),Array.isArray(e.children)&&e.children.forEach(function(e){a.add(r,e)});var n,i,d={};if(e.prop)for(n in e.prop)i=e.prop[n],Object.defineProperty(d,n,{value:i,writable:!1,configurable:!1,enumerable:!0});return Object.defineProperty(d,"element",{value:r,writable:!1,configurable:!1,enumerable:!0}),void 0!==t&&o(t,d),d}function o(e,t){c[e]=t;var r=f[e];return void 0!==r&&window.setTimeout(function(){r.forEach(function(e){e(t)}),delete f[e]}),"function"==typeof t.element?t.element:t.element||t}var d=function(){function t(){return n(r,arguments)}var r={en:{}},n=e("$").intl;return t.all=r,t}(),a=e("dom"),u=e("tfw.data-binding"),c={},f={},l=function(e,t,r){return"string"==typeof e?n.call(this,e,t,r):i.call(this,e)};l.template=function(t){var r,n,i,d="",a={};for(r in t)n=t[r],"name"==r?d=n:"id"==r?i=n:"$"==r.charAt(0)&&(a[r.substr(1)]=n);var u=e(d),c=new u(a);return i&&o(i,c),"function"==typeof c.element?c.element():c.element||c},l.getById=function(e){if(!c[e])throw Error("[x-widget.getById()] ID not found: "+e+"!");return c[e]},l.onWidgetCreation=function(e,t){void 0===c[e]?void 0===f[e]?f[e]=[t]:f[e].push(t):window.setTimeout(function(){t(c[e])})},l.bind=function(t,r){var n,i,o,d,a,f=c[t];for(n in r)d=r[n].B,Array.isArray(d)&&d.forEach(function(e){if(void 0===(i=c[e[0]]))return void console.error("[x-widget:bind("+t+')] Trying to bind attribute "'+n+'" of widget "'+t+'" to the unexisting widget "'+e[0]+'"!');o=e[1];try{if(2==e.length)u.bind(i,o,f,n);else{var r=e[2];u.bind(i,o,function(){f[n]=r})}}catch(r){console.error("Binding error for widget `"+t+"`!",{ex:r,binding:e})}}),a=r[n].S,Array.isArray(a)&&a.forEach(function(r){var i=APP,o=r;if(Array.isArray(r)){try{i=e(r[0])}catch(e){throw console.error("[x-widget:bind] Widget `"+t+"` can't require unexistent `"+r[0]+"`: ",e),e}o=r[1]}if("function"!=typeof(o=i[o]))throw Array.isArray(r)?Error("[x-widget:bind]  Widget `"+t+"` use unexisting slot `"+r[1]+"` of module `"+r[0]+"`!"):Error("[x-widget:bind]  Widget `"+t+"` use unexisting slot `"+r+"` of main module `APP`!");try{u.bind(f,n,o)}catch(e){console.error("Binding error for widget `"+t+"`!",{ex:e,dstObj:f,dstAtt:n,fct:o,slot:r})}})},t.exports=l,t.exports._=d});
//# sourceMappingURL=x-widget.js.map
require("wdg.gl7",function(t,n,e){function a(t,n){function e(t){window.requestAnimationFrame(e),a.clear(a.COLOR_BUFFER_BIT),a.uniform1f(E,t),a.drawArrays(a.POINTS,0,v)}var a=t.getContext("webgl")||t.getContext("experimental-webgl"),r=a.createProgram();a.attachShader(r,i(a,d.vertex)),a.attachShader(r,o(a,d.fragment)),a.linkProgram(r),a.useProgram(r);for(var s=a.getProgramParameter(r,a.ACTIVE_ATTRIBUTES),u=0;u<s;u++)console.log(a.getActiveAttrib(r,u));var c=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,c);var m,g,f=0,h=l(n),p=[];for(g=0;g<n.height;g++)for(m=0;m<n.width;m++)h[f]+h[f+1]+h[f+2]<50&&h[f+3]>240&&p.push([2*m/n.width-1,1-2*g/n.height]),f+=4;var v=p.length,A=[];p.forEach(function(t){A.push(t[0]),A.push(t[1]),A.push(Math.random()),A.push(Math.random()),A.push(Math.random()),A.push(Math.random())});var x=new Float32Array(A);a.bufferData(a.ARRAY_BUFFER,x,a.STATIC_DRAW);var R=x.BYTES_PER_ELEMENT,b=6*R,y=a.getAttribLocation(r,"attPosition");a.enableVertexAttribArray(y),a.vertexAttribPointer(y,2,a.FLOAT,!1,b,0);var C=a.getAttribLocation(r,"attRandom");a.enableVertexAttribArray(C),a.vertexAttribPointer(C,4,a.FLOAT,!1,b,2*R),a.disable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE),a.blendEquation(a.FUNC_ADD);var E=a.getUniformLocation(r,"uniTime");a.clearColor(1,1,1,1),a.bindBuffer(a.ARRAY_BUFFER,c),window.requestAnimationFrame(e)}function r(t,n,e){var a=n.createShader(t);return n.shaderSource(a,e),n.compileShader(a),n.getShaderParameter(a,n.COMPILE_STATUS)?a:(console.log(e),console.error("An error occurred compiling the shader: "+n.getShaderInfoLog(a)),null)}function o(t,n){return r(t.FRAGMENT_SHADER,t,n)}function i(t,n){return r(t.VERTEX_SHADER,t,n)}function l(t){var n=t.width,e=t.height,a=document.createElement("canvas");a.setAttribute("width",n),a.setAttribute("height",e);var r=a.getContext("2d");return r.drawImage(t,0,0),document.body.appendChild(a),r.getImageData(0,0,n,e).data}var s=function(){function n(){return a(e,arguments)}var e={en:{}},a=t("$").intl;return n.all=e,n}(),d={vertex:'// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\n// Ces valeurs donnent la "personnalité" de la particule\nattribute vec4 attRandom;\n\n// Couleur pour le fragment shader\nvarying vec3 varColor;\n// Indique au fragment shader si les particules sont\n// en place (1.0) ou en mouvement désordonné (0.0)\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  // Position "en place" de la particule.\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  // Créer un léger mouvement autour de la position normale.\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  // Coordonnées aléatoires en rotation dans tout l\'espace.\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  // Dans un cycle de 12 secondes, l\'image est stable\n  // pendant 8 secondes et en vrac pendant 4.\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  // Petites variations de vert.\n  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );\n  // La position est intrerpolée entre (x,y) et (xx,yy).\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  // Palpitation de la taille et diminution lors de la phase de désordre.\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\n}\n',fragment:"precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\n}\n"},u=t("dom"),c=t("tfw.data-binding"),m=function(t){var n=u.elem(this,"canvas");c.propInteger(this,"width")(function(t){n.setAttribute("width",t),n.style.width=t+"px"}),c.propInteger(this,"height")(function(t){n.setAttribute("height",t),n.style.height=t+"px"}),c.propBoolean(this,"zindex"),t=c.extend({width:640,height:480,zbuffer:!1},t,this);var e=new Image;e.src="css/wdg.gl7/tp.png",e.onload=a.bind(this,n,e)};n.exports=m,n.exports._=s});
//# sourceMappingURL=wdg.gl7.js.map
