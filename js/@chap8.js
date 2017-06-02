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
        W('wdg.article40', 'wdg.article', {"content": [
          W({
              elem: "h1",
              attr: {"id": "framebuffer"},
              children: ["Framebuffer"]}),
          W({
              elem: "p",
              children: [
                "Jusqu",
                "&#39;",
                "à présent, nous avons toujours dessiné directement sur l",
                "&#39;",
                "écran, mais WebGL permet de faire du rendu dans des textures que l",
                "&#39;",
                "on peut réutiliser ensuite pour un nouvel affichage."]}),
          W({
              elem: "p",
              children: [                W('wdg.gl841', 'wdg.gl8', {
                  width: "512",
                  height: "512"})]}),
          W({
              elem: "p",
              children: [
                "Dans l",
                "&#39;",
                "exemple ci-dessus, nous utilisons le code du chapitre précédent, mais le rendu se fait dans une texture. Ensuite, nous affichons un carré et utilisons le fragment shader suivant sur la texture :"]}),
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
                      attr: {"class": "comment"},
                      children: ["// La texture créée à l'aide d'un Frame Buffer"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["uniform"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
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
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Les coordonnées de l'écran, comprises entre -1.0 et +1.0"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varying"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Temps en millisecondes"]}),
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
                      children: ["varTime"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Constante utilisée pour lire les pixels avoisinants."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["const"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
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
                      children: ["1.0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["128.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// La couleur fait-elle partie de l'arrière-plan ?"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// En fait, on vérifie qu'elle est blanche, ou proche du blanc."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["bool"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isBackground"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
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
                      children: ["&gt;"]}),
                    " .",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["9"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
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
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " .",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["9"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
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
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " .",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["9"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["true"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Effet 1 : on prend l'image telle qu'elle est."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["void"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
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
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Effet 2 : détextion de contour + seuil."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["void"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
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
                      children: ["color"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["9.0"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["v"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
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
                      children: ["v"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
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
                      children: ["gl_FragColor"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["r"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl_FragColor"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["g"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl_FragColor"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["b"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " .",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
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
                      attr: {"class": "keyword"},
                      children: ["if"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    "!",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isBackground"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["))"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n      ",
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
                      children: ["0.9"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
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
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " \n  ",
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Effet 3 : variation de couleur en fonction de la position."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["void"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
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
                      attr: {"class": "function"},
                      children: ["isBackground"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["))"]}),
                    " ",
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
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["else"]}),
                    " ",
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
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Effet 4 : autre effet. On peut faire varier les coefficients de"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// 9 pixels utilisés, à condition que leur somme soit égale à 1."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["void"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
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
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7.0"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["v"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
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
                      children: ["v"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    "    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
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
                      children: ["v"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["S"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
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
                      children: ["gl_FragColor"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["r"]}),
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
                      children: ["g"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl_FragColor"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["g"]}),
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
                      children: ["b"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl_FragColor"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["b"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
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
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["g"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["b"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
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
                      attr: {"class": "symbol"},
                      children: ["{"]}),
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
                      children: ["g"]}),
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n\n\n",
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
                      children: ["varUV"]}),
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
                      children: ["varUV"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Les coordonnées (u,v) sont comprises entre 0.0 et 1.0"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
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
                      children: ["1.0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["x"]}),
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
                      children: ["2.0"]}),
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
                      children: ["v"]}),
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
                      children: ["1.0"]}),
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
                      children: ["2.0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Mouvement du centre qui permet de séparer l'affichage en 4."]}),
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
                      children: ["varTime"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.000314"]}),
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
                      children: ["r"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
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
                      attr: {"class": "number"},
                      children: ["4581.15"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varTime"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.000711"]}),
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
                      children: ["cx"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
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
                      children: ["r"]}),
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
                      children: ["cy"]}),
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
                      children: ["ang"]}),
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
                      children: ["r"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Voici comment on lit un pixel dans une texture."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
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
                      attr: {"class": "function"},
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
                      attr: {"class": "function"},
                      children: ["vec2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// En fonction de la position du pixel courant par rapport"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// au centre (cx, cy), on applique un effet ou un autre."]}),
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
                      children: ["x"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cx"]}),
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
                      children: ["y"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cy"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
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
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
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
                      children: ["y"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cy"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
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
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fx4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["color"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
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
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: ["Voyons maintenant comment on utilise les Framebuffers."]}),
          W({
              elem: "p",
              children: [
                "IL faut commencer par créer un texture qui recevra les affichages : \n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Réserver de la mémoire dans la carte graphique"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// pour une texture."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["texture"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["createTexture"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Définir cette texture comme texture courante."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["bindTexture"]}),
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
                      children: ["TEXTURE_2D"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["texture"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Si on donne une coordonnée U (aussi appelée S) qui est inférieure à 0 "]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// ou supérieure à 1, on n'afiche rien, on ne répète pas la texture."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["texParameteri"]}),
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
                      children: ["TEXTURE_2D"]}),
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
                      children: ["TEXTURE_WRAP_S"]}),
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
                      children: ["CLAMP_TO_EDGE"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Même configuration pour la coordonnée V (aussi appelée T)."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["texParameteri"]}),
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
                      children: ["TEXTURE_2D"]}),
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
                      children: ["TEXTURE_WRAP_T"]}),
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
                      children: ["CLAMP_TO_EDGE"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Pour passer d'une coordonnée (u, v) en float à des entiers (x, y)"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// correspondant à un pixel de l'image, on décide de ne pas interpoler,"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// mais plutôt de prendre le pixel le plus proche (NEAREST en anglais)."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["texParameteri"]}),
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
                      children: ["TEXTURE_2D"]}),
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
                      children: ["TEXTURE_MIN_FILTER"]}),
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
                      children: ["NEAREST"]}),
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
                      children: ["texParameteri"]}),
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
                      children: ["TEXTURE_2D"]}),
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
                      children: ["TEXTURE_MAG_FILTER"]}),
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
                      children: ["NEAREST"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Initialisons les données de cette texture en spécifiant sa taille"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// 512x512."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["texImage2D"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["TEXTURE_2D"]}),
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
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["RGBA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["width"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["height"]}),
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
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["RGBA"]}),
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
                      children: ["UNSIGNED_BYTE"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["null"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Ensuite, il faut créer un ",
                W({
                  elem: "strong",
                  children: ["Framebuffer"]}),
                " :"]}),
          W({
              elem: "p",
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Réserver de l'espace mémoire sur la carte graphique"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// pour un nouveau Framebuffer."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["fb"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["createFramebuffer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Définer `fb` comme le Framebuffer courant."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["bindFramebuffer"]}),
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
                      children: ["FRAMEBUFFER"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["fb"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Associer ce Framebuffer à la "]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// texture précédemment créée."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["framebufferTexture2D"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["FRAMEBUFFER"]}),
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
                      children: ["COLOR_ATTACHMENT0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " \n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["TEXTURE_2D"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["texture"]}),
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
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: ["Le code du rendu ressemblera alors à cela :"]}),
          W({
              elem: "p",
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Tout ce qui suit sera rendu dans la texture."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["bindFramebuffer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["FRAMEBUFFER"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["fb"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n...\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Tout ce qui suit sera rendu dans le canvas."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["bindFramebuffer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["FRAMEBUFFER"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["null"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Dans le fragment shader, le premier `uniform`"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// de type `sampler2D` recevra la texture `texture`."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["bindTexture"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["TEXTURE_2D"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["texture"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n... "]})]}),
          W({
              elem: "h2",
              attr: {"id": "plus-de-d-tails"},
              children: ["Plus de détails"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "p",
                      children: [W({
                          elem: "a",
                          attr: {"href": "https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D"},
                          children: [W({
                              elem: "strong",
                              children: [W({
                                  elem: "code",
                                  children: ["gl.texImage2D(target, level, internalformat, width, height, border, format, type, pixels)"]})]})]})]}),
                    "\n",
                    W({
                      elem: "ul",
                      children: [
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["target"]}),
                            " : généralement ",
                            W({
                              elem: "code",
                              children: ["gl.TEXTURE_2D"]}),
                            ", sauf si vous voulez des textures 3D."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["level"]}),
                            " : niveau de détail. Généralement 0."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["internalformat"]}),
                            " : définit le fomat de stockage des pixels dans la texture. Généralement ",
                            W({
                              elem: "code",
                              children: ["gl.RGBA"]}),
                            ", ",
                            W({
                              elem: "code",
                              children: ["gl.RGB"]}),
                            " ou ",
                            W({
                              elem: "code",
                              children: ["gl.ALPHA"]}),
                            "."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["width"]}),
                            " : largeur en pixels."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["height"]}),
                            " : hauteur en pixels."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["border"]}),
                            " : épaisseur de la bordure. Généralement 0."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["format"]}),
                            " : Généralement, mettre la même chose que dans ",
                            W({
                              elem: "strong",
                              children: ["internalformat"]}),
                            "."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["type"]}),
                            " : permet de compresser les données. Généralement ",
                            W({
                              elem: "code",
                              children: ["gl.UNSIGNED_BYTE"]}),
                            "."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["pixels"]}),
                            " : peut être une image ou un tableau de pixels. Mais dans notre cas, on n",
                            "&#39;",
                            "initialise par, donc ",
                            W({
                              elem: "code",
                              children: ["null"]}),
                            "."]}),
                        "\n"]}),
                    "\n"]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "p",
                      children: [W({
                          elem: "a",
                          attr: {"href": "https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D"},
                          children: [W({
                              elem: "strong",
                              children: [W({
                                  elem: "code",
                                  children: ["framebufferTexture2D(target, attachment, textarget, texture, level)"]})]})]})]}),
                    "\n",
                    W({
                      elem: "ul",
                      children: [
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["target"]}),
                            " : Généralement ",
                            W({
                              elem: "code",
                              children: ["gl.FRAMEBUFFER"]}),
                            "."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["attachment"]}),
                            " : les trois valeurs les plus importantes sont :",
                            W({
                              elem: "ul",
                              children: [
                                "\n",
                                W({
                                  elem: "li",
                                  children: [
                                    W({
                                      elem: "strong",
                                      children: ["gl.COLOR_ATTACHMENT0"]}),
                                    " : stoquer la couleur des pixels dans la texture cible."]}),
                                "\n",
                                W({
                                  elem: "li",
                                  children: [
                                    W({
                                      elem: "strong",
                                      children: ["gl.DEPTH_ATTACHMENT"]}),
                                    " : stoquer le Z-buffer dans la texture cible. C",
                                    "&#39;",
                                    "est-à-dire la coordonnée ",
                                    W({
                                      elem: "strong",
                                      children: ["Z"]}),
                                    " de chaque pixel."]}),
                                "\n",
                                W({
                                  elem: "li",
                                  children: [
                                    W({
                                      elem: "strong",
                                      children: ["gl.STENCIL_ATTACHMENT"]}),
                                    " : stoquer le ",
                                    W({
                                      elem: "em",
                                      children: ["stencil"]}),
                                    " dans la texture cible. Nous verrons cela dans un prochain chapitre."]}),
                                "\n"]}),
                            "\n"]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["textarget"]}),
                            " : type de la texture cible. Généralement ",
                            W({
                              elem: "code",
                              children: ["gl.TEXTURE_2D"]}),
                            "."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["texture"]}),
                            " : la texture cible."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["level"]}),
                            " : Généralement 0."]}),
                        "\n"]}),
                    "\n"]}),
                "\n"]}),
          W({
              elem: "h2",
              attr: {"id": "a-quoi-peut-bien-servir-de-stoquer-le-z-buffer-"},
              children: ["A quoi peut bien servir de stoquer le Z-buffer ?"]}),
          W({
              elem: "p",
              children: [
                "Vous avez certainement déjà joué à des jeux 3D dans lesquels le personnage passe parfois derrière un élément du décor. Pour éviter de rendre le joueur aveugle, une astuce consiste à afficher l",
                "&#39;",
                "ombre du personnage en surimpression des éléments qui font obstacle à la caméra."]}),
          W({
              elem: "p",
              children: [
                "En stoquant le ",
                W({
                  elem: "strong",
                  children: ["depth buffer"]}),
                " (",
                W({
                  elem: "code",
                  children: ["gl.DEPTH_ATTACHMENT"]}),
                ") du décor et celui du personnage, il est ensuite de redessiner le personnage en comparant les pixels dans ces deux textures. Je vous laisse réfléchir aux détail, mais ce n",
                "&#39;",
                "est pas trop difficile maintenant que vous savez utiliser les Framebuffers et les textures."]}),
          W({
              elem: "hr"}),
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
                      attr: {"href": "chap7.html"},
                      children: ["Particules"]}),
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
require("wdg.gl8",function(e,n,r){var t=function(){function n(){return t(r,arguments)}var r={en:{}},t=e("$").intl;return n.all=r,n}(),o={vert:"// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n\n// Passer les coordonnées UV pour la texture.\nvarying vec2 varUV;\nvarying float varTime;\n\nvoid main() {\n  float x = attPosition.x;\n  float y = attPosition.y;\n  float z = 0.0;\n\n  gl_Position = vec4(x, y, z, 1.0 );\n\n  varUV = vec2( x, y );\n  varTime = uniTime;\n}\n",frag:"precision mediump float;\n\n// La texture créée à l'aide d'un Frame Buffer\nuniform sampler2D uniTexture;\n\n// Les coordonnées de l'écran, comprises entre -1.0 et +1.0\nvarying vec2 varUV;\n// Temps en millisecondes\nvarying float varTime;\n\n// Constante utilisée pour lire les pixels avoisinants.\nconst float S = 1.0 / 128.0;\n\n// La couleur fait-elle partie de l'arrière-plan ?\n// En fait, on vérifie qu'elle est blanche, ou proche du blanc.\nbool isBackground(vec4 color) {\n  if (color.r > .9 && color.g > .9 && color.b > .9) return true;\n  return false;\n}\n\n// Effet 1 : on prend l'image telle qu'elle est.\nvoid fx1(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color;\n}\n\n// Effet 2 : détextion de contour + seuil.\nvoid fx2(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color * 9.0\n    - texture2D( uniTexture, vec2(u - S, v - S) )\n    - texture2D( uniTexture, vec2(u    , v - S) )\n    - texture2D( uniTexture, vec2(u + S, v - S) )\n    - texture2D( uniTexture, vec2(u - S, v    ) )\n    - texture2D( uniTexture, vec2(u + S, v    ) )\n    - texture2D( uniTexture, vec2(u - S, v + S) )\n    - texture2D( uniTexture, vec2(u    , v + S) )\n    - texture2D( uniTexture, vec2(u + S, v + S) );\n  if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {\n    if (!isBackground(color)) {\n      gl_FragColor = vec4(1.0, 0.9 * u, 0.0, 1.0);\n    } \n  } else {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n  }\n}\n\n// Effet 3 : variation de couleur en fonction de la position.\nvoid fx3(vec4 color, float u, float v, float x, float y) {\n  if (isBackground(color)) gl_FragColor = color;\n  else gl_FragColor = vec4(1.0 - color.r * u, 1.0 - color.g * u * v, 1.0 - color.b * v, 1.0);\n}\n\n// Effet 4 : autre effet. On peut faire varier les coefficients de\n// 9 pixels utilisés, à condition que leur somme soit égale à 1.\nvoid fx4(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = - color * 7.0\n    + texture2D( uniTexture, vec2(u - S, v - S) )\n    + texture2D( uniTexture, vec2(u    , v - S) )\n    + texture2D( uniTexture, vec2(u + S, v - S) )\n    + texture2D( uniTexture, vec2(u - S, v    ) )\n    + texture2D( uniTexture, vec2(u + S, v    ) )\n    + texture2D( uniTexture, vec2(u - S, v + S) )\n    + texture2D( uniTexture, vec2(u    , v + S) )\n    + texture2D( uniTexture, vec2(u + S, v + S) );\n  float r = gl_FragColor.r;\n  float g = gl_FragColor.g;\n  float b = gl_FragColor.b;\n  if (r + g + b < 2.0) {\n    gl_FragColor = vec4( g, 0.0, 0.0, 1.0);\n  }\n}\n\n\nvoid main() {\n  float x = varUV.x;\n  float y = varUV.y;\n  // Les coordonnées (u,v) sont comprises entre 0.0 et 1.0\n  float u = (1.0 + x) / 2.0;\n  float v = (1.0 + y) / 2.0;\n  // Mouvement du centre qui permet de séparer l'affichage en 4.\n  float ang = varTime * 0.000314;\n  float r = cos(4581.15 + varTime * 0.000711);\n  float cx = cos(ang) * r;\n  float cy = sin(ang) * r;\n\n  // Voici comment on lit un pixel dans une texture.\n  vec4 color = texture2D( uniTexture, vec2(u, v) );\n  // En fonction de la position du pixel courant par rapport\n  // au centre (cx, cy), on applique un effet ou un autre.\n  if (x < cx) {\n    if (y < cy) {\n      fx1(color, u, v, x, y);\n    } else {\n      fx2(color, u, v, x, y);\n    }\n  } else {\n    if (y < cy) {\n      fx3(color, u, v, x, y);\n    } else {\n      fx4(color, u, v, x, y);\n    }\n  }\n}\n"},u=e("dom"),i=e("tfw.data-binding"),l=e("tfw.webgl"),a=e("explosive-tp"),f=function(e){var n=u.elem(this,"canvas");i.propInteger(this,"width")(function(e){n.setAttribute("width",e),n.style.width=e+"px"}),i.propInteger(this,"height")(function(e){n.setAttribute("height",e),n.style.height=e+"px"}),i.propBoolean(this,"zindex"),e=i.extend({width:640,height:480,zbuffer:!1},e,this);var r=new l(n),t=r.gl,f=new a(n),c=r.createTextureForFB(512,512),v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.bindFramebuffer(t.FRAMEBUFFER,null);var x=t.createBuffer(),s=new Float32Array([-1,-1,0,-1,1,0,1,-1,0,1,1,0]),g=r.createProgram({vertex:o.vert,fragment:o.frag});r.start(function(e){t.bindFramebuffer(t.FRAMEBUFFER,v),t.clear(t.COLOR_BUFFER_BIT),f.render(e),g.use(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,x),t.enableVertexAttribArray(g.$attPosition),t.vertexAttribPointer(g.$attPosition,3,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,s,t.STATIC_DRAW),t.bindTexture(t.TEXTURE_2D,c),g.$uniTime=e,t.drawArrays(t.TRIANGLE_STRIP,0,4)})};n.exports=f,n.exports._=t});
//# sourceMappingURL=wdg.gl8.js.map
require("explosive-tp",function(t,n,a){function e(t){var n=this._webgl,a=n.gl,e=a.createBuffer();this._buffer=e,a.bindBuffer(a.ARRAY_BUFFER,e);var r,o,i=0,s=n.getDataFromImage(t),l=[];for(o=0;o<t.height;o++)for(r=0;r<t.width;r++)s[i]+s[i+1]+s[i+2]<50&&s[i+3]>240&&l.push([2*r/t.width-1,1-2*o/t.height]),i+=4;var d=l.length,u=[];l.forEach(function(t){u.push(t[0]),u.push(t[1]),u.push(Math.random()),u.push(Math.random()),u.push(Math.random()),u.push(Math.random())});var c=new Float32Array(u);a.bufferData(a.ARRAY_BUFFER,c,a.STATIC_DRAW);var f=c.BYTES_PER_ELEMENT,g=6*f,p=a.getAttribLocation(this._prg.program,"attPosition");a.enableVertexAttribArray(p),a.vertexAttribPointer(p,2,a.FLOAT,!1,g,0);var m=a.getAttribLocation(this._prg.program,"attRandom");a.enableVertexAttribArray(m),a.vertexAttribPointer(m,4,a.FLOAT,!1,g,2*f),a.disable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE),a.blendEquation(a.FUNC_ADD),a.clearColor(1,1,1,1),a.bindBuffer(a.ARRAY_BUFFER,e),this._loaded=!0,this._count=d,this._data=c}var r=function(){function n(){return e(a,arguments)}var a={en:{}},e=t("$").intl;return n.all=a,n}(),o={vert:'// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\n// Ces valeurs donnent la "personnalité" de la particule\nattribute vec4 attRandom;\n\n// Couleur pour le fragment shader\nvarying vec3 varColor;\n// Indique au fragment shader si les particules sont\n// en place (1.0) ou en mouvement désordonné (0.0)\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  // Position "en place" de la particule.\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  // Créer un léger mouvement autour de la position normale.\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  // Coordonnées aléatoires en rotation dans tout l\'espace.\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  // Dans un cycle de 12 secondes, l\'image est stable\n  // pendant 8 secondes et en vrac pendant 4.\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  // Petites variations de vert.\n  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );\n  // La position est intrerpolée entre (x,y) et (xx,yy).\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  // Palpitation de la taille et diminution lors de la phase de désordre.\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\n}\n',frag:"precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\n}\n"},i=t("tfw.webgl"),s=function(t){var n=new i(t),a=n.createProgram({vertex:o.vert,fragment:o.frag});this._webgl=n,this._prg=a,this._loaded=!1;var r=new Image;r.src="css/explosive-tp/tp.png",r.onload=e.bind(this,r)};s.prototype.render=function(t){if(this._loaded){var n=this._webgl.gl,a=this._prg;a.use(),n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE),n.blendEquation(n.FUNC_ADD),a.$uniTime=t,n.bindBuffer(n.ARRAY_BUFFER,this._buffer);var e=this._data.BYTES_PER_ELEMENT,r=6*e,o=n.getAttribLocation(this._prg.program,"attPosition");n.enableVertexAttribArray(o),n.vertexAttribPointer(o,2,n.FLOAT,!1,r,0);var i=n.getAttribLocation(this._prg.program,"attRandom");n.enableVertexAttribArray(i),n.vertexAttribPointer(i,4,n.FLOAT,!1,r,2*e),n.bufferData(n.ARRAY_BUFFER,this._data,n.STATIC_DRAW),n.drawArrays(n.POINTS,0,this._count)}},n.exports=s,n.exports._=r});
//# sourceMappingURL=explosive-tp.js.map
require("tfw.webgl",function(e,t,r){function n(e){Object.defineProperty(this,"gl",{value:e.getContext("webgl")||e.getContext("experimental-webgl"),writable:!1,configurable:!1,enumerable:!0}),this.render=function(){}}function a(e,t){var r=e.createProgram();e.attachShader(r,s(e,t.vertex||"//No Vertex Shader")),e.attachShader(r,c(e,t.fragment||"//No Fragment Shader")),e.linkProgram(r),this.program=r,Object.freeze(this.program),this.use=function(){e.useProgram(r)},this.use();var n,a,u={},m=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(n=0;n<m;n++)a=e.getActiveAttrib(r,n),u[a.name]=e.getAttribLocation(r,a.name),this["$"+a.name]=e.getAttribLocation(r,a.name);Object.freeze(u),this.attribs=u;var E={},T=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(n=0;n<T;n++)a=e.getActiveUniform(r,n),E[a.name]=e.getUniformLocation(r,a.name),Object.defineProperty(this,"$"+a.name,{set:i(e,a,E[a.name]),get:o(a),enumerable:!0,configurable:!0});Object.freeze(E),this.uniforms=E}function i(e,t,r){var n="_$"+t.name;switch(t.type){case e.BYTE:case e.UNSIGNED_BYTE:case e.SHORT:case e.UNSIGNED_SHORT:case e.INT:case e.UNSIGNED_INT:return 1==t.size?function(t){e.uniform1i(r,t),this[n]=t}:function(t){e.uniform1iv(r,t),this[n]=t};case e.FLOAT:return 1==t.size?function(t){e.uniform1f(r,t),this[n]=t}:function(t){e.uniform1fv(r,t),this[n]=t}}}function o(e){var t="_$"+e.name;return function(){return this[t]}}function u(e,t,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.log(r),console.error("An error occurred compiling the shader: "+t.getShaderInfoLog(n)),null)}function c(e,t){return u(e.FRAGMENT_SHADER,e,t)}function s(e,t){return u(e.VERTEX_SHADER,e,t)}var m=function(){function t(){return n(r,arguments)}var r={en:{}},n=e("$").intl;return t.all=r,t}();(new Float32Array).BYTES_PER_ELEMENT;n.prototype.createProgram=function(e){return new a(this.gl,e)},n.prototype.start=function(e){if("function"==typeof e&&(this.render=e),!this._animationIsOn){var t=this,r=function(e){t._animationIsOn&&window.requestAnimationFrame(r),t.render(e)};window.requestAnimationFrame(r),this._animationIsOn=!0}},n.prototype.stop=function(){this._animationIsOn=!1},n.prototype.createTextureForFB=function(e,t){var r=this.gl,n=r.createTexture();return r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e,t,0,r.RGBA,r.UNSIGNED_BYTE,null),n},n.prototype.getDataFromImage=function(e){var t=e.width,r=e.height,n=document.createElement("canvas");n.setAttribute("width",t),n.setAttribute("height",r);var a=n.getContext("2d");return a.drawImage(e,0,0),a.getImageData(0,0,t,r).data},t.exports=n,t.exports._=m});
//# sourceMappingURL=tfw.webgl.js.map
