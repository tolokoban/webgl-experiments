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
        W('wdg.article35', 'wdg.article', {"content": [
          W({
              elem: "h1",
              attr: {"id": "un-point-c-est-tout"},
              children: [
                "Un point c",
                "&#39;",
                "est tout"]}),
          W({
              elem: "p",
              children: [
                "Dans les options de ",
                W({
                  elem: "code",
                  children: ["gl.drawArrays()"]}),
                ", il y a une valeur qui semble à priori inutile : ",
                W({
                  elem: "strong",
                  children: [W({
                      elem: "code",
                      children: ["gl.POINTS"]})]}),
                ". Ce chapitre va nous montrer qu",
                "&#39;",
                "on peut bien s",
                "&#39;",
                "amuser avec. Cet exemple utilise 6 vertices, par exemple :"]}),
          W({
              elem: "p",
              children: [                W('wdg.gl636', 'wdg.gl6', {
                  width: "480",
                  height: "480"})]}),
          W({
              elem: "p",
              children: [
                "Pour qu",
                "&#39;",
                "un point puisse être visualisé comme une sphère, on utilise deux variable du GLSL :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["gl_PointSize"]}),
                    ": détermine la taille en pixel d",
                    "&#39;",
                    "un point (dansa le vertex shader). Par exemple ",
                    W({
                      elem: "code",
                      children: ["gl_PointSize = MIN_SIZE + (attPosition.z + 1.0) * (MAX_SIZE - MIN_SIZE) / 2.0;"]}),
                    " permet de donner la taille MAX_SIZE aux points en ",
                    W({
                      elem: "code",
                      children: ["z = 1.0"]}),
                    " et MIN_SIZE à ceux en ",
                    W({
                      elem: "code",
                      children: ["z = -1.0"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["gl_PointCoord"]}),
                    ": vecteur à deux dimensions dont les valeurs des scalaires sont comprises entre 0 et 1. On peut comparer cela aux coordonnées UV utilisées pour les textures. Ainsi, (0,0) représente le coin supérieur gauche du point (qui est en fait un carré de côté ",
                    W({
                      elem: "em",
                      children: ["gl_PointSize"]}),
                    ")."]}),
                "\n"]}),
          W({
              elem: "p",
              children: ["Voici les shaders qui sont utilisés ici :"]}),
          W({
              elem: "p",
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attribute"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec3"]}),
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
                      attr: {"class": "identifier"},
                      children: ["attribute"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec3"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attColor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n",
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
                      children: ["varPosition"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
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
                      children: ["z"]}),
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
                      children: ["z"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Dans une projection 3D, les points éloignés de la caméra"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// paraissent plus petits et plus proches les uns des autres."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Cette variable permet de créer cet effet."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["depth"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
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
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["z"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["3.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attPosition"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["xy"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["depth"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["z"]}),
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
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// La taille du point dépend aussi de la profondeur."]}),
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
                      attr: {"class": "number"},
                      children: ["150.0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["depth"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varPosition"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
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
                      attr: {"class": "identifier"},
                      children: ["attColor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [W({
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
                    "\n\n",
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
                      children: ["varPosition"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
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
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["const"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["WHITE"]}),
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
                      children: ["0.5"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
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
                      attr: {"class": "comment"},
                      children: ["// Calculons la distance du fragment courant"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// au centre du point."]}),
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On ne calcule pas la racine carré pour gagner du temps."]}),
                    "\n  ",
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
                    "\n\n  ",
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
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
                      children: ["gl_PointCoord"]}),
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
                      children: ["// 0.25 = 0.5 * 0.5"]}),
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
                      children: ["r"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.25"]}),
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
                      attr: {"class": "comment"},
                      children: ["// Si on est à l'extérieur du cercle de rayon 0.5,"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// on place un fragment transparent."]}),
                    "\n    ",
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
                      children: ["0.0"]}),
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
                      children: ["0.0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["r"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " .",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
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
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Au delà d'un certain rayon, on met une couleur fixe"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// qui nous sert de liseré."]}),
                    "\n    ",
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
                      attr: {"class": "number"},
                      children: ["1.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
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
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Petit effet de dégradé."]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec3"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varColor"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["WHITE"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rgb"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n    ",
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
                      children: ["col"]}),
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
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// La luminosité varie avec la profondeur du point."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// En `z = 0.0`, la boule est noire."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["coeff"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["3.0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varPosition"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["z"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["3.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
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
                      attr: {"class": "identifier"},
                      children: ["coeff"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl_FragColor"]}),
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
                      children: ["coeff"]}),
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
                      attr: {"class": "identifier"},
                      children: ["WHITE"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Il reste cependant un problème de taille : les balles qui sont à l",
                "&#39;",
                "arrière passent parfois devant celles de devant, ruinant ainsi le bel effet 3D auquel on s",
                "&#39;",
                "attendait."]}),
          W({
              elem: "p",
              children: [
                "Cela est du au fait que nous avons demandé à WebGL de superposer les images sans tenir compte du Z-buffer (technique utilisée pour ne pas afficher un pixel si le précedent à un ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " plus grand). Car voici ce qui se passe avec le Z-buffer activé :"]}),
          W({
              elem: "p",
              children: [                W('wdg.gl637', 'wdg.gl6', {
                  width: "480",
                  height: "480",
                  zbuffer: "true"})]}),
          W({
              elem: "p",
              children: [
                "Ce ",
                W({
                  elem: "strong",
                  children: ["carré noir"]}),
                " qui apparaît autour de nos sphères est du au fonctionnement du Z-buffer. En effet, à chaque fois que WebGL veut afficher un pixel, il commence par regarder sa coordonnée ",
                W({
                  elem: "code",
                  children: ["z"]}),
                ". Dans un buffer (justement nommé Z-buffer) il garde la position ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " de chaque pixel de l",
                "&#39;",
                "écran. Cela lui sert à comparer avec le nouveau pixel. Si ce dernier a un ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " inférieur à celui trouvé dans le buffer pour la même position, alors ",
                W({
                  elem: "strong",
                  children: [
                    "le fragment shader n",
                    "&#39;",
                    "est même pas appelé"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Si vous regardez de plus près, vous vous dite : ",
                "&quot;",
                "Hé ! Mais ça fonctionne pour certaines boules et pas pour les autres !!",
                "&quot;",
                "."]}),
          W({
              elem: "p",
              children: [
                "C",
                "&#39;",
                "est parce que ça dépend de l",
                "&#39;",
                "ordre d",
                "&#39;",
                "affichage des sphères. Si vous affichez une sphère de premier plan avant les autres, elle va placer son ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " dans le Z-buffer pour tous les pixels de son carré. Les pixels transparents ont le même ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " que les autres donc rien ne pourra être dessiné derrière eux, après eux. Mais s",
                "&#39;",
                "il y avait déjà quelque chose à l",
                "&#39;",
                "écran, alors on le verrait par transparence."]}),
          W({
              elem: "p",
              children: [
                "Une solution serait de donner à chaque pixel transparent un ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " très petit différent de celui du vertex.\nMalheureusement, il est impossible de modifier le ",
                W({
                  elem: "code",
                  children: ["z"]}),
                " dans un fragment shader."]}),
          W({
              elem: "p",
              children: [
                "Il ne nous reste qu",
                "&#39;",
                "une chose à faire : ne plus utiliser le Z-buffer et ",
                W({
                  elem: "strong",
                  children: ["trier nous-même les sphères"]}),
                " avant affichage."]}),
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
                      attr: {"href": "chap5.html"},
                      children: ["Textures bitmaps"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Page suivante : ",
                    W({
                      elem: "a",
                      attr: {"href": "chap6-2.html"},
                      children: [
                        "Un point c",
                        "&#39;",
                        "est tout (page 2)"]}),
                    "."]}),
                "\n"]})]})

    }
);
