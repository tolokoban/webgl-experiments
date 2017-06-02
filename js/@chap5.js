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
        W('wdg.article27', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: ["Dans ce chapitre, nous allons utiliser WebGL pour afficher 150 sprites.\nVous pouvez constater que ça reste fluide."]}),
          W({
              elem: "p",
              children: [                W('wdg.gl528', 'wdg.gl5', {
                  width: "880",
                  height: "660"})]}),
          W({
              elem: "p",
              children: ["Pour WebGL, chaque sprite sera un carré formé de 4 vertices qui auront tous les mêmes coordonnées\n(celles du centre du sprite) ainsi que les attributs suivants :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Index du vertex (de 0 à 3). Les points se suivent dans le sens inverse des aiguilles d",
                    "&#39;",
                    "une montre."]}),
                "\n",
                W({
                  elem: "li",
                  children: ["Angle de rotation en radians."]}),
                "\n",
                W({
                  elem: "li",
                  children: ["Facteur de zoom. Si ce facteur vaut 7, par exemple, le sprite fera 14 x 14 pixels."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Nous aurons donc besoin des attributs suivants :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight glsl"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["attribute"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
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
                      attr: {"class": "keyword"},
                      children: ["attribute"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attIndex"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["attribute"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attRotation"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["attribute"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attScale"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Le ",
                W({
                  elem: "em",
                  children: ["fragment shader"]}),
                " est relativement simple :\n",
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// L'image de notre sprite."]}),
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Les coordonnes UV du pixel à dessiner."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// (0,0) correspond au pixel en haut à gauche."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// (1,1) correspond au pixel en bas à droite."]}),
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
                      children: ["varCoordsUV"]}),
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
                      attr: {"class": "comment"},
                      children: ["// texture2D retourne la coleur à un endroit donné."]}),
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
                      attr: {"class": "identifier"},
                      children: ["varCoordsUV"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Si le point est transparent, on ne l'affiche pas."]}),
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
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["discard"]}),
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
                    " "]})]}),
          W({
              elem: "p",
              children: [                W('wdg.showhide29', 'wdg.showhide', {
                  value: "false",
                  label: "Le plus gros de la logique se trouve dans le vertex shader",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight glsl"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Coordonnées du centre du sprite."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["attribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "comment"},
                          children: ["// Index du vertex (de 0.0 à 3.0)."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["attribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Angle de rotation en radians."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["attribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Facteur d'échelle."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["attribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// PI est une constante indispensable en trigonométrie."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["PI"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3.1415926536"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// La taille du canvas est utilisée pour convertir"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// des coordonnées en pixels vers l'espace de WebGL."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["uniform"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniWidth"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["uniform"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniHeight"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Passer au fragment shader les coordonnées UV"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// du vertex dans le bitmap."]}),
                        "\n",
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
                          children: ["varCoordsUV"]}),
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
                          attr: {"class": "comment"},
                          children: ["// On considère un cercle ce centre attPosition,"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// et de rayon attScale."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Les vertex sont sur ce cercle, c'est pourquoi"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// on utilise attIndex comme un angle."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                        " \n    ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["PI"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["sin"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["PI"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// On avait des coordonnées en pixels du canvas,"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// il faut les convertir dans l'espace de WebGL."]}),
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
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniWidth"]}),
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
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniHeight"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// D�finir la position du vertex."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["gl_Position"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
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
                          children: [","]}),
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
                          children: ["// Il faut associer à chaque attIndex, des coordonnées UV."]}),
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
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1.5"]}),
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
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoordsUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
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
                          children: [");"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 0"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoordsUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
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
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "                ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 1"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n  ",
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
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2.5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoordsUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
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
                          children: [");"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 2"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varCoordsUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
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
                          children: ["1.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "                ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 3"]}),
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
                        " "]})]})]}),
          W({
              elem: "p",
              children: [
                "Côté Javascript, nous allons faire varier les valeurs des attributs de chaque sprite\nen fonction du temps.\nAinsi, à chaque frame, nous devrons rafraichir le buffer lié à ces attributs.\n",
                                W('wdg.showhide30', 'wdg.showhide', {
                  value: "false",
                  label: "Voici le code de la fonction qui défini les sprites pour le Javascript",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["createSprites"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["count"]}),
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
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["sprites"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["];"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["while"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["count"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
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
                          attr: {"class": "identifier"},
                          children: ["sprites"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["push"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["({"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["z"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.1"]}),
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
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Taille initiale."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["size"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["20"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Vitesse de changement de taille."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["scale"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.7"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3.2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Vitesse de rotation."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rotation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-2"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["});"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["sprites"]}),
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
                          children: ["// Retourne un nombre aléatoire compris entre `min` et `max` ."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["rand"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["min"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["max"]}),
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
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["min"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["Math"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["random"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["max"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["min"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]})]}),
          W({
              elem: "p",
              children: ["Nous allons maintenant définir le lien entre un buffer et les attributs dont on a besoin.\nNotre vertex shader aura besoin des 4 attributs suivants :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attribute vec3 attPosition;   // offset 0"]}),
                    " "]}),
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
                      children: ["attribute float attIndex;     // offset 3"]})]}),
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
                      children: ["attribute float attScale;     // offset 4"]})]}),
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
                      children: ["attribute float attRotation;  // offset 5"]})]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Il nous faut donc 6 ",
                W({
                  elem: "code",
                  children: ["float"]}),
                " pour définir un vertex : c",
                "&#39;",
                "est la taille d",
                "&#39;",
                "un ",
                W({
                  elem: "em",
                  children: ["bloc"]}),
                ".\nA l",
                "&#39;",
                "appel de ",
                W({
                  elem: "strong",
                  children: ["drawArrays()"]}),
                ", WebGL va lire toutes les données d",
                "&#39;",
                "un bloc et alimenter les attributs avec ces valeurs avant d",
                "&#39;",
                "appeler le premier microprocesseur de vertex shader disponible."]}),
          W({
              elem: "p",
              children: [                W('wdg.showhide31', 'wdg.showhide', {
                  value: "false",
                  label: "Voici le code qui définit l'association entre les attributs et les blocs du tableau",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["squareVerticesBuffer"]}),
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
                          children: ["createBuffer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Créer un tableau d'attributs pour tous les sprites. Il nous faut 3 éléments pour les coordonnées, 1 pour l'index, 1"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// pour l'angle et 1 pour le facteur de zoom. Et chaque sprite a besoin de 4 vertex."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["new"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["Float32Array"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesCount"]}),
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
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
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
                          children: ["4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Récupérer la taille en octets d'un élément du tableau."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["BYTES_PER_ELEMENT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Taille en octets d'un bloc représentant tous les attributs d'un vertex."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
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
                          children: ["bpe"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n  ",
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
                        " ",
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
                          children: ["squareVerticesBuffer"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attPosition`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attPosition\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attIndex`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attIndex\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attScale`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attScale\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attRotation`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attRotation\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        " "]})]})]}),
          W({
              elem: "p",
              children: [                W('wdg.showhide32', 'wdg.showhide', {
                  value: "false",
                  label: "Et celui qui dessine chaque frame",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["getContext"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"webgl\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
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
                          children: ["createProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["attachShader"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["getVertexShader"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertexShaderCode"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["));"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["attachShader"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["getFragmentShader"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["fragmentShaderCode"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["));"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["linkProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["useProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["W"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
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
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesCount"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["150"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["sprites"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["createSprites"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesCount"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// #(defineAttributes)"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["squareVerticesBuffer"]}),
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
                          children: ["createBuffer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Créer un tableau d'attributs pour tous les sprites. Il nous faut 3 éléments pour les coordonnées, 1 pour l'index, 1"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// pour l'angle et 1 pour le facteur de zoom. Et chaque sprite a besoin de 4 vertex."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["new"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["Float32Array"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesCount"]}),
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
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
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
                          children: ["4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Récupérer la taille en octets d'un élément du tableau."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["BYTES_PER_ELEMENT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Taille en octets d'un bloc représentant tous les attributs d'un vertex."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        " ",
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
                          children: ["bpe"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n  ",
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
                        " ",
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
                          children: ["squareVerticesBuffer"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attPosition`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attPosition\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attPosition"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attIndex`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attIndex\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attScale`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attScale\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attScale"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la position des valeurs de l'attribute `attRotation`."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attRotation\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRotation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["blockSize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["bpe"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// #(defineAttributes)"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertexPositionAttribute"]}),
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
                          children: ["getAttribLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attVertexPosition\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["enableVertexAttribArray"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertexPositionAttribute"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vertexAttribPointer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertexPositionAttribute"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
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
                          children: ["FLOAT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
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
                          children: ["0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniWidth"]}),
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
                          children: ["getUniformLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"uniWidth\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniHeight"]}),
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
                          children: ["getUniformLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"uniHeight\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// #(draw) Activer le test de profondeur."]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["DEPTH_TEST"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["//gl.depthFunc(gl.LEQUAL); Charger la texture."]}),
                        "\n  ",
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
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
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
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Set the parameters so we can render any size image."]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["image"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["new"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["Image"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["image"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["onload"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["// Upload the image into the texture."]}),
                        "\n    ",
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
                          children: ["image"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Dessiner la prochaine frame."]}),
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
                          children: ["draw"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["image"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["onerror"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["err"]}),
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
                          attr: {"class": "keyword"},
                          children: ["throw"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["err"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["image"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["src"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"css/wdg.gl5/champi.png\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir la transparence pour les sprites."]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["BLEND"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["blendFunc"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// gl.ONE);"]}),
                        "\n  ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["DEPTH_TEST"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["draw"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
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
                        "\n\n    ",
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
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Valeurs pour la taille de l'écran."]}),
                        "\n    ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniWidth"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        " ",
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
                          children: ["uniform1f"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniHeight"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Activer l'uniform relatif à notre texture."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// On n'a qu'une texture donc on utilise le slot 0."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["activeTexture"]}),
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
                          children: ["TEXTURE0"]}),
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
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["uniform1i"]}),
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
                          attr: {"class": "function"},
                          children: ["getUniformLocation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shaderProgram"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["'uniTexture'"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    \n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Mettre à jour le tableau des attributs."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["sprites"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["forEach"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["sprite"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spriteIdx"]}),
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
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
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
                          children: ["sprite"]}),
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
                          children: ["W"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
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
                          children: ["H"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["Math"]}),
                        ".",
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
                          attr: {"class": "keyword2"},
                          children: ["Math"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["sprite"]}),
                        ".",
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
                          attr: {"class": "keyword2"},
                          children: ["Math"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["PI"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          children: ["sprite"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3613"]}),
                        " ",
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
                          attr: {"class": "identifier"},
                          children: ["H"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
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
                          attr: {"class": "keyword2"},
                          children: ["Math"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["cos"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["sprite"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2700"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["128"]}),
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
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["z"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rotation"]}),
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
                          children: ["sprite"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rotation"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["700"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Alimentons le tableau."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
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
                          children: ["1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["forEach"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["index"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
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
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["z"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["index"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["scale"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["idx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rotation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["});"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["});"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Transférer le tableau dans la mémoire de la carte graphique."]}),
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
                        " ",
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
                          children: ["squareVerticesBuffer"]}),
                        " ",
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
                          children: ["bufferData"]}),
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
                          children: ["ARRAY_BUFFER"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesAttributes"]}),
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
                          children: ["STATIC_DRAW"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.8"]}),
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
                        " ",
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
                          children: ["clear"]}),
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
                          children: ["COLOR_BUFFER_BIT"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["|"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["DEPTH_BUFFER_BIT"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["for"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["i"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["i"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["spritesCount"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["i"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                        "\n      ",
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["TRIANGLE_STRIP"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["i"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n    ",
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
                          children: ["draw"]}),
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
                        " "]})]})]}),
          W({
              elem: "h1",
              attr: {"id": "les-textures-partir-d-images"},
              children: [
                "Les textures à partir d",
                "&#39;",
                "images"]})]})

    }
);
