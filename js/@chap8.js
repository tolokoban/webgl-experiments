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
        W('wdg.article47', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [
                "Jusqu",
                "&#39;",
                "à présent, nous avons toujours dessiné directement sur l",
                "&#39;",
                "écran, mais WebGL\npermet de faire du rendu dans des textures que l",
                "&#39;",
                "on peut réutiliser ensuite pour\nun nouvel affichage."]}),
          W({
              elem: "p",
              children: [                W('wdg.gl848', 'wdg.gl8', {
                  width: "512",
                  height: "512"})]}),
          W({
              elem: "p",
              children: [
                "Dans l",
                "&#39;",
                "exemple ci-dessus, nous utilisons le code du chapitre précédent, mais le\nrendu se fait dans une texture. Ensuite, nous affichons un carré et utilisons\nle fragment shader suivant sur la texture :"]}),
          W({
              elem: "p",
              children: [                W('wdg.showhide49', 'wdg.showhide', {
                  value: "false",
                  label: "Fragment Shader",
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
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// La texture créée à l'aide d'un Frame Buffer"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Les coordonnées de l'écran, comprises entre -1.0 et +1.0"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Temps en millisecondes"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          children: ["varTime"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Constante utilisée pour lire les pixels avoisinants."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// La couleur fait-elle partie de l'arrière-plan ?"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// En fait, on vérifie qu'elle est blanche, ou proche du blanc."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
                          children: ["true"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Effet 1 : on prend l'image telle qu'elle est."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          children: ["color"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Effet 2 : détextion de contour + seuil."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword2"},
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
                          attr: {"class": "keyword2"},
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
                          attr: {"class": "keyword2"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n      ",
=======
                        "\n      ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        " \r\n  ",
=======
                        " \n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Effet 3 : variation de couleur en fonction de la position."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          children: ["color"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Effet 4 : autre effet. On peut faire varier les coefficients de"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 9 pixels utilisés, à condition que leur somme soit égale à 1."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword2"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword2"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword2"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n\r\n\r\n",
=======
                        "\n\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Les coordonnées (u,v) sont comprises entre 0.0 et 1.0"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Mouvement du centre qui permet de séparer l'affichage en 4."]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "keyword2"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
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
                          children: ["0.002"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.35"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
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
                          attr: {"class": "number"},
                          children: ["5.0"]}),
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
                          children: ["r"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.35"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["t"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5.0"]}),
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
                          children: ["r"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
<<<<<<< HEAD
                        "\r\n\r\n  ",
=======
                        "\n\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Voici comment on lit un pixel dans une texture."]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                          attr: {"class": "keyword"},
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
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// En fonction de la position du pixel courant par rapport"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// au centre (cx, cy), on applique un effet ou un autre."]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n      ",
=======
                        "\n      ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n      ",
=======
                        "\n      ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n      ",
=======
                        "\n      ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n      ",
=======
                        "\n      ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n  ",
=======
                        "\n  ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]})]}),
          W({
              elem: "p",
              children: ["Voyons maintenant comment on utilise les Framebuffers."]}),
          W({
              elem: "p",
              children: [
                "Il faut commencer par créer un texture qui recevra les affichages : \n",
                                W('wdg.showhide50', 'wdg.showhide', {
                  value: "false",
                  label: "Code Javascript",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Réserver de la mémoire dans la carte graphique"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// pour une texture."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Définir cette texture comme texture courante."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Si on donne une coordonnée U (aussi appelée S) qui est inférieure à 0 "]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// ou supérieure à 1, on n'afiche rien, on ne répète pas la texture."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Même configuration pour la coordonnée V (aussi appelée T)."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Pour passer d'une coordonnée (u, v) en float à des entiers (x, y)"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// correspondant à un pixel de l'image, on décide de ne pas interpoler,"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// mais plutôt de prendre le pixel le plus proche (NEAREST en anglais)."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n\r\n",
=======
                        "\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Initialisons les données de cette texture en spécifiant sa taille"]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// 512x512."]}),
<<<<<<< HEAD
                        "\r\n",
=======
                        "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                        "\r\n    ",
=======
                        "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                        " "]})]})]}),
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
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// pour un nouveau Framebuffer."]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Définer `fb` comme le Framebuffer courant."]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Associer ce Framebuffer à la "]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// texture précédemment créée."]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n    ",
=======
                    "\n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    " \r\n    ",
=======
                    " \n    ",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n...\r\n\r\n",
=======
                    "\n...\n\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Tout ce qui suit sera rendu dans le canvas."]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Dans le fragment shader, le premier `uniform`"]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// de type `sampler2D` recevra la texture `texture`."]}),
<<<<<<< HEAD
                    "\r\n",
=======
                    "\n",
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
<<<<<<< HEAD
                    "\r\n... "]})]}),
=======
                    "\n... "]})]}),
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
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
                "\n"]})]})

    }
);
<<<<<<< HEAD
=======
require("$",function(r,n,t){t.config={name:'"webgl-experiments"',description:'"WebGL study by tutorials"',author:'"tolokoban"',version:'"0.0.76"',major:"0",minor:"0",revision:"76",date:"2017-06-05T14:17:26.000Z",consts:{}};var o=null;t.lang=function(r){return void 0===r&&(window.localStorage&&(r=window.localStorage.getItem("Language")),r||(r=window.navigator.language)||(r=window.navigator.browserLanguage)||(r="fr"),r=r.substr(0,2).toLowerCase()),o=r,window.localStorage&&window.localStorage.setItem("Language",r),r},t.intl=function(r,n){var o,e,a,i,g,u,l,s=r[t.lang()],w=n[0];for(l in r)break;if(!l)return w;if(!s&&!(s=r[l]))return w;if(o=s[w],o||(s=r[l],o=s[w]),!o)return w;if(n.length>1){for(e="",g=0,a=0;a<o.length;a++)i=o.charAt(a),"$"===i?(e+=o.substring(g,a),a++,u=o.charCodeAt(a)-48,u<0||u>=n.length?e+="$"+o.charAt(a):e+=n[u],g=a+1):"\\"===i&&(e+=o.substring(g,a),a++,e+=o.charAt(a),g=a+1);e+=o.substr(g),o=e}return o}});
//# sourceMappingURL=$.js.map
require("wdg.article",function(e,a,t){function n(e){var a,t,n=c.tag("nav","theme-elevation-8");for(a in i)t=i[a],"$"===a.charAt(0)?c.add(n,c.tag("h1",[t])):a==e?c.add(n,c.tag("div","theme-elevation-1",[t])):c.add(n,c.tag("a",[t],{href:a+".html"}));return n}var r=function(){function a(){return n(t,arguments)}var t={en:{},fr:{}},n=e("$").intl;return a.all=t,a}(),i={$1:"Les bases",index:"Comprendre WebGL",chap1:"Dessiner un carré",chap2:"Dessiner un polygône",chap3:"Textures procédurales",chap4:"Textures animées",chap5:"Utiliser des images",chap6:"Un point c'est tout","chap6-2":"La semi-transparence",chap7:"Particules",chap8:"Frame Buffer"};e("font.josefin");var c=e("dom"),o=e("tfw.data-binding"),s=function(e){var a=window.location.pathname.split("/").pop();a=a.substr(0,a.length-5);var t=c.tag("header","theme-elevation-12",[i[a]]),r=n(a),s=c.tag("article");c.elem(this,"div","article",[s,r,t]);o.prop(this,"content")(function(e){c.clear(s),Array.isArray(e)||(e=[e]),e.forEach(function(e){c.add(s,e)})}),e=o.extend({content:[]},e,this)};a.exports=s,a.exports._=r});
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
require("wdg.showhide",function(e,t,n){function o(e){function t(){n.value=!n.value,n.focus=!0}var n=this,o=new l({content:"tri-right",size:"1.5em"}),i=s.tag("span","label"),d=s.div("head","theme-label","theme-color-bg-1",[o,i]),h=s.div("body","theme-color-bg-B1"),c=s.elem(this,"div","wdg-showhide","theme-elevation-2",[d,h]);r(this,function(e){switch(e.keyCode){case 13:case 32:n.value=!n.value}console.info("[wdg.showhide] evt=",e)}),a.propBoolean(this,"value")(function(e){e?(s.addClass(c,"show"),s.removeClass(c,"fade-in"),window.setTimeout(function(){s.addClass(c,"fade-in")})):s.removeClass(c,"show")}),a.propBoolean(this,"simple")(function(e){e?(s.addClass(c,"simple"),s.removeClass(c,"theme-elevation-2"),s.removeClass(d,"theme-label","theme-color-bg-1"),s.addClass(d,"theme-color-7")):(s.removeClass(c,"simple"),s.addClass(c,"theme-elevation-2"),s.addClass(d,"theme-label","theme-color-bg-1"),s.removeClass(d,"theme-color-7"))}),a.propString(this,"label")(function(e){i.textContent=e}),a.propUnit(this,"maxHeight")(function(e){e.v<=0?h.style.maxHeight="none":h.style.maxHeight=e.v+e.u}),a.prop(this,"content")(function(e){s.clear(h),Array.isArray(e)?e.forEach(function(e){s.add(h,e)}):void 0!==e&&null!==e&&s.add(h,e)}),a.propRemoveClass(this,"wide","inline"),a.propRemoveClass(this,"visible","hide"),e=a.extend({value:!0,label:"",content:null,maxHeight:null,visible:!0,wide:!0,simple:!1,focus:!1},e,this),s.on(d,t),a.bind(o,"action",t),this.append=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),s.add(h,e),n},this.prepend=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),h.insertBefore(e,h.childNodes[0]),n}}var i=function(){function t(){return o(n,arguments)}var n={en:{}},o=e("$").intl;return t.all=n,t}(),s=e("dom"),a=e("tfw.data-binding"),l=e("wdg.icon"),r=e("tfw.focusable");o.prototype.clear=function(){return this.content=[],this},t.exports=o,t.exports._=i});
//# sourceMappingURL=wdg.showhide.js.map
require("tfw.focusable",function(n,t,e){var o=function(){function t(){return o(e,arguments)}var e={en:{},fr:{}},o=n("$").intl;return t.all=e,t}(),f=n("dom"),u=n("tfw.data-binding"),i=function(n,t){"function"!=typeof t&&(t=function(){}),f.addClass(n,"tfw-focusable");var e=f.tag("input");f(n).insertAdjacentElement("afterbegin",f.div("tfw-focusable-invisible",[e])),e.addEventListener("keydown",function(n){t(n),e.value=""}),e.addEventListener("focus",function(){f.addClass(n,"focus"),n.focus=!0}),e.addEventListener("blur",function(){f.removeClass(n,"focus"),n.focus=!1}),u.propBoolean(n,"focus")(function(n){console.info("[tfw.focusable] v=",n),window.setTimeout(function(){n?e.focus():e.blur()})})};t.exports=i,t.exports._=o});
//# sourceMappingURL=tfw.focusable.js.map
require("wdg.icon",function(t,e,o){function r(t,e,o){if(a.clear(e),"string"==typeof o){var r=M.Icons[o.trim().toLowerCase()];if(void 0!==r)o=r;else try{o=JSON.parse(o)}catch(t){return console.error("[wdg.icon:content] Bad value: ",o),void console.error(t)}}if(!Array.isArray(o))return void console.error("[wdg.icon:content] Value must be an array: ",o);try{i.call(this,t,e,o)}catch(t){console.error("[wdg.icon:content] Bad content: ",o),console.error(t)}}function i(t,e,o){if("string"==typeof o){var r=window.document.createTextNode(o);return void e.appendChild(r)}if(!Array.isArray(o)||0==o.length)return console.error("[wdg.icon:content] `child` must be an array: ",o),void console.error("parent = ",e);var l;o.forEach(function(o,r){var h,n,s,H;if(0==r)l=a.svg(o),a.add(e,l);else if("string"==typeof o)a.addClass(l,o);else if(Array.isArray(o))o.forEach(function(e){i.call(this,t,l,e)},this);else if("object"==typeof o)for(h in o)n=o[h],"fill"!=h&&"stroke"!=h||"number"!=typeof n||(H=Math.floor(n)%6,s="color"+H,n=this[s],void 0===t[H]&&(t[H]={fill:[],stroke:[]}),t[H][h].push(l)),a.att(l,h,n)},this)}function l(t){return["g",[["path",{d:t,stroke:0,"stroke-width":40}],["path",{d:t,stroke:1,"stroke-width":24}]]]}function h(t){return["g",[["path",{d:t,stroke:0,fill:"none","stroke-width":16}],["path",{d:t,stroke:"none",fill:1}]]]}var n=function(){function e(){return r(o,arguments)}var o={en:{}},r=t("$").intl;return e.all=o,e}(),a=t("dom"),s=t("tfw.data-binding"),H=t("tfw.touchable"),M=function(t){var e=this,o=[],i=a.svg("g",{"stroke-width":6,fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}),l=a.svgRoot({width:"100%",height:"100%",viewBox:"-65 -65 130 130",preserveAspectRatio:"xMidYMid meet"}),h=a.div("wdg-icon",[l]),n=a.elem(this,h);a.add(l,i),s.prop(this,"content")(r.bind(this,o,i)),s.prop(this,"value"),s.propBoolean(this,"rotate")(function(t){t?a.addClass(l,"rotate"):a.removeClass(l,"rotate")}),s.propBoolean(this,"button")(function(t){if(t){a.addClass(n,"theme-elevation-8"),a.removeClass(n,"flat");var o=e.size;a.css(n,{padding:"calc(0.25 * "+o.v+o.u+") 0 0 0",width:"calc(1.5 * "+o.v+o.u+")",height:"calc(1.5 * "+o.v+o.u+")","line-height":o.v+o.u}),a.css(l,{"line-height":o.v+o.u});new H(n,{classToAdd:"theme-elevation-16"}).tap.add(s.fire.bind(s,e,"action",e.value))}else a.removeClass(n,"theme-elevation-8"),a.addClass(n,"flat"),a.css(n,{padding:0}),a.off(n)}),s.propUnit(this,"size")(function(t){var e=t.v+t.u;a.css(l,{width:e,height:e,"line-height":e})}),s.prop(this,"action"),s.propAddClass(this,"wide"),s.propRemoveClass(this,"visible","hide"),s.propToggleClass(this,"type",{default:"theme-color-bg-B0",accent:"theme-color-bg-A5"});for(var M=function(t,r){var i=o[t];void 0!==i&&(i.fill.forEach(function(o){a.att(o,"fill",e["color"+t])}),i.stroke.forEach(function(o){a.att(o,"stroke",e["color"+t])}))},f=0;f<6;f++)s.propColor(this,"color"+f)(M.bind(this,f));t=s.extend({color0:"#000000",color1:"#ffffff",color2:"#777777",color3:"#ff0000",color4:"#00ff00",color5:"#0000ff",content:["circle",{stroke:1,fill:0,r:90,cx:0,cy:0}],type:"default",angle:0,size:"2rem",button:!1,value:"icon",rotate:!1,wide:!1,visible:!0},t,this)};M.prototype.on=function(t){return s.bind(this,"action",t)},M.prototype.fire=function(){s.fire(this,"action",this.value)},M.Icons={android:h("M15,-35H10V-40H15M-10,-35H-15V-40H-10M18,-49L24,-56C25,-57,25,-58,24,-59C23,-60,22,-60,21,-59L13,-52C9,-54,5,-55,0,-55C-5,-55,-9,-54,-13,-52L-21,-59C-22,-60,-23,-60,-24,-59C-25,-58,-25,-57,-24,-56L-18,-49C-25,-44,-30,-35,-30,-25H30C30,-35,25,-44,18,-49M43,-20A8,8,0,0,0,35,-12V23A8,8,0,0,0,43,30A8,8,0,0,0,50,23V-12A8,8,0,0,0,43,-20M-42,-20A8,8,0,0,0,-50,-12V23A8,8,0,0,0,-42,30A8,8,0,0,0,-35,23V-12A8,8,0,0,0,-42,-20M-30,30A5,5,0,0,0,-25,35H-20V53A8,8,0,0,0,-12,60A8,8,0,0,0,-5,53V35H5V53A8,8,0,0,0,13,60A8,8,0,0,0,20,53V35H25A5,5,0,0,0,30,30V-20H-30V30Z"),bug:h("M10,0H-10V-10H10M10,20H-10V10H10M40,-20H26C24,-24 21,-27 17,-30L25,-38L18,-45L7,-34C5,-35 3,-35 0,-35C-2,-35 -5,-35 -7,-34L-18,-45L-25,-38L-17,-30C-21,-27 -24,-24 -26,-20H-40V-10H-30C-30,-8 -30,-7 -30,-5V0H-40V10H-30V15C-30,17 -30,18 -30,20H-40V30H-26C-21,39 -11,45 0,45C11,45 21,39 26,30H40V20H30C30,18 30,17 30,15V10H40V0H30V-5C30,-7 30,-8 30,-10H40V-20Z"),camera:h("M-40,-40H-25L-15,-50H15L25,-40H40A10,10,0,0,1,50,-30V30A10,10,0,0,1,40,40H-40A10,10,0,0,1,-50,30V-30A10,10,0,0,1,-40,-40M0,-25A25,25,0,0,0,-25,0A25,25,0,0,0,0,25A25,25,0,0,0,25,0A25,25,0,0,0,0,-25M0,-15A15,15,0,0,1,15,0A15,15,0,0,1,0,15A15,15,0,0,1,-15,0A15,15,0,0,1,0,-15Z"),cancel:["g",[["path",{d:"M-30,-30L30,30M-30,30L30,-30",stroke:0,"stroke-width":30}],["path",{d:"M-30,-30L30,30M-30,30L30,-30",stroke:3,"stroke-width":16}]]],center:h("M0,-15A15,15,0,0,0,-15,0A15,15,0,0,0,0,15A15,15,0,0,0,15,0A15,15,0,0,0,0,-15M35,35H15V45H35A10,10,0,0,0,45,35V15H35M35,-45H15V-35H35V-15H45V-35A10,10,0,0,0,35,-45M-35,-35H-15V-45H-35A10,10,0,0,0,-45,-35V-15H-35M-35,15H-45V35A10,10,0,0,0,-35,45H-15V35H-35V15Z"),close:l("M-40,-40L40,40M-40,40L40,-40"),code:h("M13,23L36,0L13,-23L20,-30L50,0L20,30L13,23M-13,23L-36,0L-13,-23L-20,-30L-50,0L-20,30L-13,23Z"),delete:h("M35,-40H18L13,-45H-12L-17,-40H-35V-30H35M-30,35A10,10,0,0,0,-20,45H20A10,10,0,0,0,30,35V-25H-30V35Z"),down:l("M-30,-30L0,30,30,-30"),"down-double":l("M-30,-40L0,-10,30,-40M-30,10L0,40,30,10"),edit:h("M24,-46C22,-46,20,-46,19,-44L8,-34L35,-7L45,-17C48,-21,48,-25,45,-28L29,-44C28,-46,26,-46,24,-46M5,-30L-36,11L-23,12L-22,23L-11,24L-9,37L31,-3M-39,15L-47,49L-14,40L-15,29L-27,28L-28,16"),export:h("M-35,40H35V30H-35M35,-15H15V-45H-15V-15H-35L0,20L35,-15Z"),"flag-jp":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#fff",d:"M-60,45h120v-90h-120z"}],["circle",{fill:"#bc002d",r:24}]]],"flag-fr":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#002395",d:"M-60,45h40v-90h-40z"}],["path",{fill:"#fff",d:"M-20,45h40v-90h-40z"}],["path",{fill:"#ed2939",d:"M20,45h40v-90h-40z"}]]],"flag-it":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#009246",d:"M-60,45h40v-90h-40z"}],["path",{fill:"#fff",d:"M-20,45h40v-90h-40z"}],["path",{fill:"#ce2b37",d:"M20,45h40v-90h-40z"}]]],"flag-de":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,41h130v-82h-130z"}],["path",{fill:"#ffce00",d:"M-60,36h120v-24h-120z"}],["path",{fill:"#dd0000",d:"M-60,12h120v-24h-120z"}]]],"flag-en":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,37h130v-75h-130z"}],["path",{fill:"#bb133e",d:"M-60,32h120v-65h-120z"}],["path",{fill:"#fff",d:"M-60,22h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,12h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,2h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-8h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-18h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-28h120v5h-120z"}],["path",{fill:"#002664",d:"M-60,-33h48v35h-48z"}]]],"format-align-center":h("M-45,-45H45V-35H-45V-45M-25,-25H25V-15H-25V-25M-45,-5H45V5H-45V-5M-25,15H25V25H-25V15M-45,35H45V45H-45V35Z"),"format-align-justify":h("M-45,-45H45V-35H-45V-45M-45,-25H45V-15H-45V-25M-45,-5H45V5H-45V-5M-45,15H45V25H-45V15M-45,35H45V45H-45V35Z"),"format-align-left":h("M-45,-45H45V-35H-45V-45M-45,-25H15V-15H-45V-25M-45,-5H45V5H-45V-5M-45,15H15V25H-45V15M-45,35H45V45H-45V35Z"),"format-align-right":h(" M-45,-45H45V-35H-45V-45M-15,-25H45V-15H-15V-25M-45,-5H45V5H-45V-5M-15,15H45V25H-15V15M-45,35H45V45H-45V35Z "),"format-bold":h("M8,18H-10V3H8A8,8,0,0,1,15,10A8,8,0,0,1,8,18M-10,-27H5A8,8,0,0,1,13,-20A8,8,0,0,1,5,-12H-10M18,-6C23,-9,26,-15,26,-20C26,-31,18,-40,6,-40H-25V30H10C21,30,29,22,29,11C29,3,24,-3,18,-6Z"),"format-italic":h("M-10,-40V-25H1L-16,15H-30V30H10V15H-1L16,-25H30V-40H-10Z"),"format-underline":h("M-35,45H35V35H-35V45M0,25A30,30,0,0,0,30,-5V-45H18V-5A18,18,0,0,1,0,13A18,18,0,0,1,-17,-5V-45H-30V-5A30,30,0,0,0,0,25Z"),fullscreen:["g",[["path",{d:"M-20,-10h70v50h-70Z",stroke:0,fill:1,"stroke-width":8}],["path",{d:"M-40,-30h70v50h-70Z",stroke:0,fill:1,"stroke-width":8}]]],gear:h("M0,18A18,18,0,0,1,-17,0A18,18,0,0,1,0,-17A18,18,0,0,1,18,0A18,18,0,0,1,0,18M37,5C37,3,38,2,38,0C38,-2,37,-3,37,-5L48,-13C49,-14,49,-15,48,-16L38,-34C38,-35,36,-35,35,-35L23,-30C20,-32,18,-33,14,-35L13,-48C12,-49,11,-50,10,-50H-10C-11,-50,-12,-49,-12,-48L-14,-35C-17,-33,-20,-32,-23,-30L-35,-35C-36,-35,-38,-35,-38,-34L-48,-16C-49,-15,-49,-14,-48,-13L-37,-5C-37,-3,-37,-2,-37,0C-37,2,-37,3,-37,5L-48,13C-49,14,-49,15,-48,16L-38,34C-38,35,-36,35,-35,35L-23,30C-20,32,-17,33,-14,35L-12,48C-12,49,-11,50,-10,50H10C11,50,12,49,13,48L14,35C18,33,20,32,23,30L35,35C36,35,38,35,38,34L48,16C49,15,49,14,48,13L37,5Z"),gps:h("M0,-20A20,20,0,0,1,20,0A20,20,0,0,1,0,20A20,20,0,0,1,-20,0A20,20,0,0,1,0,-20M-45,5H-55V-5H-45C-42,-26,-26,-42,-5,-45V-55H5V-45C26,-42,43,-26,45,-5H55V5H45C43,26,26,43,5,45V55H-5V45C-26,43,-42,26,-45,5M0,-35A35,35,0,0,0,-35,0A35,35,0,0,0,0,35A35,35,0,0,0,35,0A35,35,0,0,0,0,-35Z"),hand:h("M-10,-50A10,10,0,0,1,0,-40V-17C0,-17,10,-19,10,-14C10,-14,20,-15,20,-10C20,-10,30,-11,30,-6C30,-6,40,-7,40,-2V15C40,20,25,45,25,50H-15C-15,50,-25,15,-40,5C-40,5,-45,-25,-20,0V-40A10,10,0,0,1,-10,-50Z"),heart:["g",[["path",{d:"M0,-20c0,-30,40,-30,40,0c0,40,-40,40,-40,60c0,-20,-40,-20,-40,-60c0,-30,40,-30,40,0","stroke-width":8,fill:1,stroke:0}]]],hide:h("M-1,-15L15,1C15,1,15,0,15,0A15,15,0,0,0,0,-15C0,-15,-1,-15,-1,-15M-22,-11L-15,-3C-15,-2,-15,-1,-15,0A15,15,0,0,0,0,15C1,15,2,15,3,15L11,22C8,24,4,25,0,25A25,25,0,0,1,-25,0C-25,-4,-24,-8,-22,-11M-50,-39L-39,-27L-36,-25C-45,-18,-51,-10,-55,0C-46,22,-25,38,0,38C8,38,15,36,22,33L24,35L39,50L45,44L-44,-45M0,-25A25,25,0,0,1,25,0C25,3,24,6,23,9L38,24C45,18,51,9,55,0C46,-22,25,-37,0,-37C-7,-37,-14,-36,-20,-34L-9,-23C-6,-24,-3,-25,0,-25Z"),home:h("M-10,40V10H10V40H35V0H50L0,-45L-50,0H-35V40H-10Z"),import:h("M-15,20V-10H-35L0,-45L35,-10H15V20H-15M-35,40V30H35V40H-35Z"),improvement:h("M0,50A50,50,0,0,1,-50,0A50,50,0,0,1,0,-50A50,50,0,0,1,50,0A50,50,0,0,1,0,50M0,-25L-25,0H-10V20H10V0H25L0,-25Z"),left:l("M30,-30L-30,0,30,30"),"left-double":l("M-10,-30L-40,0,-10,30M40,-30L10,0,40,30"),link:h("M-7,7C-5,9,-5,12,-7,14C-9,16,-12,16,-14,14C-24,4,-24,-11,-14,-21V-21L4,-39C13,-49,29,-49,39,-39C49,-29,49,-13,39,-4L31,4C32,0,31,-4,29,-8L32,-11C38,-16,38,-26,32,-32C26,-38,16,-38,11,-32L-7,-14C-13,-8,-13,1,-7,7M7,-14C9,-16,12,-16,14,-14C24,-4,24,11,14,21V21L-4,39C-13,49,-29,49,-39,39C-49,29,-49,13,-39,4L-31,-4C-31,0,-31,4,-29,8L-32,11C-38,16,-38,26,-32,32C-26,38,-16,38,-11,32L7,14C13,8,13,-1,7,-7C5,-9,5,-12,7,-14Z"),location:["g",{"stroke-linejoin":"miter"},[["path",{fill:1,stroke:0,"stroke-width":8,d:"M0,50L20,0c20,-20,10,-50,-20,-50c-30,0,-40,30,-20,50Z"}],["circle",{fill:0,stroke:"none",r:10,cy:-20}]]],logout:h("M25,26V10H-10V-10H25V-26L51,0L25,26M5,-50A10,10,0,0,1,15,-40V-20H5V-40H-40V40H5V20H15V40A10,10,0,0,1,5,50H-40A10,10,0,0,1,-50,40V-40A10,10,0,0,1,-40,-50H5Z"),mail:h("M40,-40H-40A10,10,0,0,0,-50,-30V30A10,10,0,0,0,-40,40H40A10,10,0,0,0,50,30V-30A10,10,0,0,0,40,-40M40,30H-40V-20L0,5L40,-20V30M40,-30L0,-5L-40,-30V-30H40V-30Z"),"map-layer":h("M0,20L37,-9L45,-15L0,-50L-45,-15L-37,-9M0,33L-37,4L-45,10L0,45L45,10L37,4L0,33Z"),menu:l("M-40,-34h80M-40,0h80M-40,34h80"),minus:l("M-45,0H45"),"minus-o":["g",[["circle",{r:60,stroke:"none",fill:0}],["circle",{r:50,stroke:"none",fill:1}],["path",{d:"M-30,0H30",fill:"none",stroke:0,"stroke-width":16}]]],"minus-small":l("M-30,0H30"),ok:["g",[["path",{d:"M-30,0L-10,30,30,-30",stroke:0,"stroke-width":30}],["path",{d:"M-30,0L-10,30,30,-30",stroke:4,"stroke-width":16}]]],plus:l("M-45,0H45M0,-45V45"),"plus-o":["g",[["circle",{r:60,stroke:"none",fill:0}],["circle",{r:50,stroke:"none",fill:1}],["path",{d:"M-30,0H30M0,-30V30",fill:"none",stroke:0,"stroke-width":16}]]],"plus-small":l("M-30,0H30M0,-30V30"),print:["path",{fill:0,d:"M30,-45H-30V-25H30M35,0A5,5,0,0,1,30,-5A5,5,0,0,1,35,-10A5,5,0,0,1,40,-5A5,5,0,0,1,35,0M20,35H-20V10H20M35,-20H-35A15,15,0,0,0,-50,-5V25H-30V45H30V25H50V-5A15,15,0,0,0,35,-20Z"}],question:h("M-10,35H5V50H-10V35M0,-50C27,-49,38,-22,23,-2C18,3,12,7,8,11C5,15,5,20,5,25H-10C-10,17,-10,10,-7,5C-3,0,3,-3,8,-7C20,-18,17,-34,0,-35A15,15,0,0,0,-15,-20H-30A30,30,0,0,1,0,-50Z"),refresh:h("M28,-28C21,-35,11,-40,0,-40A40,40,0,0,0,-40,0A40,40,0,0,0,0,40C19,40,34,27,39,10H28C24,22,13,30,0,30A30,30,0,0,1,-30,0A30,30,0,0,1,0,-30C8,-30,16,-27,21,-21L5,-5H40V-40L28,-28Z"),right:l("M-30,-30L30,0,-30,30"),"right-double":l("M10,-30L40,0,10,30M-40,-30L-10,0,-40,30"),search:h("M-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45M-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35Z"),share:h("M30,20C26,20,23,22,20,24L-15,3C-15,2,-15,1,-15,0C-15,-1,-15,-2,-15,-3L20,-24C23,-22,26,-20,30,-20A15,15,0,0,0,45,-35A15,15,0,0,0,30,-50A15,15,0,0,0,15,-35C15,-34,15,-33,15,-31L-20,-11C-22,-13,-26,-15,-30,-15A15,15,0,0,0,-45,0A15,15,0,0,0,-30,15C-26,15,-22,13,-20,11L16,32C16,33,15,34,15,35C15,43,22,50,30,50C38,50,45,43,45,35A15,15,0,0,0,30,20Z"),show:h("M0,-15A15,15,0,0,0,-15,0A15,15,0,0,0,0,15A15,15,0,0,0,15,0A15,15,0,0,0,0,-15M0,25A25,25,0,0,1,-25,0A25,25,0,0,1,0,-25A25,25,0,0,1,25,0A25,25,0,0,1,0,25M0,-37C-25,-37,-46,-22,-55,0C-46,22,-25,38,0,38C25,38,46,22,55,0C46,-22,25,-37,0,-37Z"),star:["g",[["path",{d:"M0,-60L18,-24L57,-19L29,9L35,49L0,30L-35,49L-29,9L-57,-19L-18,-24Z","stroke-width":8,fill:1,stroke:0}]]],"tri-down":["g",[["path",{d:"M-30,-30L0,30,30,-30Z",stroke:0,fill:1,"stroke-width":8}]]],"tri-left":["g",[["path",{d:"M30,-30L-30,0,30,30Z",stroke:0,fill:1,"stroke-width":8}]]],"tri-right":["g",[["path",{d:"M-30,-30L30,0,-30,30Z",stroke:0,fill:1,"stroke-width":8}]]],"tri-up":["g",[["path",{d:"M-30,30L0,-30,30,30Z",stroke:0,fill:1,"stroke-width":8}]]],up:l("M-30,30L0,-30,30,30"),"up-double":l("M-30,40L0,10,30,40M-30,-10L0,-40,30,-10"),user:h("M0,-40A20,20,0,0,1,20,-20A20,20,0,0,1,0,0A20,20,0,0,1,-20,-20A20,20,0,0,1,0,-40M0,10C22,10,40,19,40,30V40H-40V30C-40,19,-22,10,0,10Z"),wait:["g",[["path",{d:"M0,40 A40,40,0,1,1,40,0",stroke:0,"stroke-width":40}],["path",{d:"M0,40 A40,40,0,1,1,40,0",stroke:1,"stroke-width":24}]]],"zoom-in":["g",[h("M-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45M-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35Z"),h("M-50,42h10v-10h4v10h10v4h-10v10h-4v-10h-10Z")]],"zoom-out":["g",[h("M-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45M-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35Z"),h("M-50,42h24v4h-32Z")]]},M.Icons.add=M.Icons.plus,M.Icons.back=M.Icons.left,M.Icons.help=M.Icons.question,M.Icons.save=M.Icons.export,M.draw=l,M.path2=h,M.register=function(t){var e,o;for(e in t)o=t[e],M.Icons[e]=o},e.exports=M,e.exports._=n});
//# sourceMappingURL=wdg.icon.js.map
require("tfw.touchable",function(t,e,a){var o=function(){function e(){return o(a,arguments)}var a={en:{},fr:{}},o=t("$").intl;return e.all=a,e}(),s=t("dom"),i=t("dom.fx"),n=t("tfw.listeners"),l=function(t,e){var a=this;void 0===e&&(e={}),void 0===e.enabled&&(e.enabled=!0),t=s(t),this.enabled=e.enabled,this.color=e.color||"#fd8",this.classToAdd=e.classToAdd,this.opacity=e.opacity||.4,this.element=s(t),this.tap=new n,this.press=new n,s.addClass(t,"tfw-touchable");var o,l,r=s.div("tfw-touchable-shadow"),d=i().css(r,{transition:"none"}).exec(function(e){var i=a.classToAdd;"string"==typeof i&&s.addClass(t,i),-1==["relative","absolute","fixed"].indexOf(getComputedStyle(t).position)&&(t.style.position="relative"),t.style.overflow="hidden";var n=t.getBoundingClientRect(),d=n.width,c=n.height;d=Math.max(o,d-o),c=Math.max(l,c-l);var h=Math.ceil(Math.sqrt(d*d+c*c));s.css(r,{left:o+"px",top:l+"px",margin:"-"+h+"px",width:2*h+"px",height:2*h+"px",opacity:a.opacity,background:a.color,transform:"scale(0)"}),s.add(t,r)}).css(r,{transition:"all .3s ease"}).css(r,{transform:"scale(1)"}).wait(300).css(r,{transition:"all .2s ease"}).css(r,{opacity:0}).wait(200).detach(r),c=0;s.on(t,{down:function(t){a.enabled&&(t.stopPropagation(),t.preventDefault(),o=Math.floor(t.x),l=Math.floor(t.y),d.start(),c=Date.now())},tap:function(t){a.enabled&&(console.log("TAP",t),a.tap.fire(t))}})};e.exports=l,e.exports._=o});
//# sourceMappingURL=tfw.touchable.js.map
require("dom.fx",function(t,e,n){function i(t){if(t==this._session){if(this._index>=this._tasks.length)return this._index=0,this._started=!1,delete this._session,void this._onEnd(this);var e=this,n=this._tasks[this._index++];this._debug&&console.info("[dom.fx] tsk["+(this._index-1)+"]: ",n.label,"("+(Date.now()-this._startTime)+" ms)",n.args,t),n(function(){f(i.bind(e,t))},!0)}}function o(t,e){e.terminate&&e.terminate();var n=t.getBoundingClientRect();console.info("[dom.fx] rect=...",n);var i=l.div();l.css(i,{display:"inline-block",width:n.width+"px",height:n.height+"px"}),e.onBeforeReplace(t),l.replace(i,t),e.onAfterReplace(t),e.substitute=i,e.styles=r(t),e.overlay=l.div("dom-fx-fullscreen"),document.body.appendChild(e.overlay),e.overlay.appendChild(t),l.css(t,{left:n.left+"px",top:n.top+"px",width:n.width+"px",height:n.height+"px"}),l.addClass(t,"dom-fx-fullscreen-target"),f(function(){var n=e.overlay.getBoundingClientRect();l.css(t,{left:"20px",top:"20px",width:n.width-40+"px",height:n.height-40+"px"})})}function s(t,e){var n=e.substitute.getBoundingClientRect();l.css(t,{left:n.left+"px",top:n.top+"px",width:n.width+"px",height:n.height+"px"}),e.terminate=function(){l.detach(e.overlay),e.onBeforeReplace(t),l.replace(t,e.substitute),e.onAfterReplace(t),a(t,e.styles),delete e.terminate},f(e.terminate,200)}function r(t){var e,n,i={};for(e in t.style)n=t.style[e],i[e]=n;return console.info("[dom.fx] styles=...",i),i}function a(t,e){for(var n in e)t.style[n]=e[n]}var d=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}();t("polyfill.promise");var l=t("dom"),c=t("tfw.data-binding"),f=window.setTimeout,h=function(){},p=1,u=function(t){this._session={},Object.defineProperty(u.prototype,"name",{value:t,writable:!1,configurable:!0,enumerable:!0}),this._name=t,this._tasks=[],this._index=0,this._started=!1,this._startTime=0,this._onEnd=h};u.prototype.start=function(t){this._started&&this.end(),"function"!=typeof t&&(t=h),this._onEnd=t,this._started=!0,this._index=0,this._session={$id:p++},this._startTime=Date.now(),i.call(this,this._session)},u.prototype.end=function(){if(!this._started)return this;var t=this;for(this._started=!1,delete this._session;this._index<this._tasks.length;){var e=this._tasks[this._index++];t._debug&&console.info("[dom.fx.end] tsk["+(this._index-1)+"]: ",e.label,e.args),e(h,!1)}return this._onEnd(this),this},u.prototype.debug=function(t){return this.addTask(function(e){this._debug=!!t,e()}),this},u.prototype.addTask=function(t,e,n){return t.label=e,t.args=n,this._tasks.push(t),this},u.prototype.log=function(t){return this.addTask(function(e){console.log("[dom.fx]",t),e()},"log"),this},u.prototype.pause=function(){return this.addTask(h,"pause"),this},u.prototype.exec=function(t){var e=Array.prototype.slice.call(arguments);return this.addTask(function(t,n){e.forEach(function(t){try{"function"==typeof t?t(n):console.log("[dom.fx]",t)}catch(t){console.error(t)}}),t()},"exec",e),this},["css","addClass","removeClass","toggleClass","detach","saveStyle","restoreStyle","add","removeAtt","replace"].forEach(function(t){var e=l[t];u.prototype[t]=function(){var n=Array.prototype.slice.call(arguments);return this.addTask(function(t){e.apply(l,n),t()},t,n),this}}),u.prototype.vanish=function(t,e){return e=parseInt(e),isNaN(e)&&(e=300),this.css(t,{transition:"none"}).css(t,{transition:"opacity "+e+"ms",opacity:0}).wait(e)},u.prototype.wait=function(t){var e=Array.prototype.slice.call(arguments);return void 0===t&&(t=0),"number"==typeof t?this.addTask(function(e,n){n&&f(e,t)},"wait",e):this.addTask(function(e,n){if(n){var i=l(t),o=function(t){["transitionend","oTransitionEnd","webkitTransitionEnd"].forEach(function(t){i.removeEventListener(t,o)}),e()};["transitionend","oTransitionEnd","webkitTransitionEnd"].forEach(function(t){i.addEventListener(t,o)})}},"wait",e),this},e.exports=function(t){return new u(t)},e.exports.Fullscreen=function(t){if(void 0===t)throw Error("[dom.fx:fullscreen] Missing argument!");if(void 0===t.target)throw Error("[dom.fx:fullscreen] Missing `opts.target`!");"function"==typeof t.target.element&&(t.target=t.target.element()),void 0!==t.target.element&&(t.target=t.target.element);var e=function(){},n={onBeforeReplace:"function"==typeof t.onBeforeReplace?t.onBeforeReplace:e,onAfterReplace:"function"==typeof t.onAfterReplace?t.onAfterReplace:e};c.propBoolean(this,"value")(function(e){e?o(t.target,n):s(t.target,n)})},e.exports._=d});
//# sourceMappingURL=dom.fx.js.map
require("polyfill.promise",function(t,n,e){var r=function(){function n(){return r(e,arguments)}var e={en:{},fr:{}},r=t("$").intl;return n.all=e,n}();window.Promise||function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function n(t){return"function"==typeof t}function e(t){return"object"==typeof t&&null!==t}function r(){}function o(){for(var t=0;t<S;t+=2){(0,D[t])(D[t+1]),D[t]=void 0,D[t+1]=void 0}S=0}function i(){}function s(){return new TypeError("You cannot resolve a promise with itself")}function u(){return new TypeError("A promises callback cannot return that same promise.")}function c(t){try{return t.then}catch(t){return K.error=t,K}}function a(t,n,e,r){try{t.call(n,e,r)}catch(t){return t}}function f(t,n,e){C(function(t){var r=!1,o=a(e,n,function(e){r||(r=!0,n!==e?_(t,e):v(t,e))},function(n){r||(r=!0,d(t,n))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,d(t,o))},t)}function l(t,n){n._state===q?v(t,n._result):t._state===F?d(t,n._result):y(n,void 0,function(n){_(t,n)},function(n){d(t,n)})}function h(t,e){if(e.constructor===t.constructor)l(t,e);else{var r=c(e);r===K?d(t,K.error):void 0===r?v(t,e):n(r)?f(t,e,r):v(t,e)}}function _(n,e){n===e?d(n,s()):t(e)?h(n,e):v(n,e)}function p(t){t._onerror&&t._onerror(t._result),m(t)}function v(t,n){t._state===I&&(t._result=n,t._state=q,0===t._subscribers.length||C(m,t))}function d(t,n){t._state===I&&(t._state=F,t._result=n,C(p,t))}function y(t,n,e,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=n,o[i+q]=e,o[i+F]=r,0===i&&t._state&&C(m,t)}function m(t){var n=t._subscribers,e=t._state;if(0!==n.length){for(var r,o,i=t._result,s=0;s<n.length;s+=3)r=n[s],o=n[s+e],r?g(e,r,o,i):o(i);t._subscribers.length=0}}function w(){this.error=null}function b(t,n){try{return t(n)}catch(t){return N.error=t,N}}function g(t,e,r,o){var i,s,c,a,f=n(r);if(f){if(i=b(r,o),i===N?(a=!0,s=i.error,i=null):c=!0,e===i)return void d(e,u())}else i=o,c=!0;e._state!==I||(f&&c?_(e,i):a?d(e,s):t===q?v(e,i):t===F&&d(e,i))}function A(t,n){try{n(function(n){_(t,n)},function(n){d(t,n)})}catch(n){d(t,n)}}function j(t,n,e,r){this._instanceConstructor=t,this.promise=new t(i,r),this._abortOnReject=e,this._validateInput(n)?(this._input=n,this.length=n.length,this._remaining=n.length,this._init(),0===this.length?v(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&v(this.promise,this._result))):d(this.promise,this._validationError())}function E(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function P(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function T(t,e){this._id=G++,this._label=e,this._state=void 0,this._result=void 0,this._subscribers=[],i!==t&&(n(t)||E(),this instanceof T||P(),A(this,t))}var k;k=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var M,O=k,S=(Date.now,Object.create,0),C=function(t,n){D[S]=t,D[S+1]=n,2===(S+=2)&&M()},R="undefined"!=typeof window?window:{},x=R.MutationObserver||R.WebKitMutationObserver,Y="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,D=new Array(1e3);M="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?function(){return function(){process.nextTick(o)}}():x?function(){var t=0,n=new x(o),e=document.createTextNode("");return n.observe(e,{characterData:!0}),function(){e.data=t=++t%2}}():Y?function(){var t=new MessageChannel;return t.port1.onmessage=o,function(){t.port2.postMessage(0)}}():function(){return function(){setTimeout(o,1)}}();var I=void 0,q=1,F=2,K=new w,N=new w;j.prototype._validateInput=function(t){return O(t)},j.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},j.prototype._init=function(){this._result=new Array(this.length)};var U=j;j.prototype._enumerate=function(){for(var t=this.length,n=this.promise,e=this._input,r=0;n._state===I&&r<t;r++)this._eachEntry(e[r],r)},j.prototype._eachEntry=function(t,n){var r=this._instanceConstructor;e(t)?t.constructor===r&&t._state!==I?(t._onerror=null,this._settledAt(t._state,n,t._result)):this._willSettleAt(r.resolve(t),n):(this._remaining--,this._result[n]=this._makeResult(q,n,t))},j.prototype._settledAt=function(t,n,e){var r=this.promise;r._state===I&&(this._remaining--,this._abortOnReject&&t===F?d(r,e):this._result[n]=this._makeResult(t,n,e)),0===this._remaining&&v(r,this._result)},j.prototype._makeResult=function(t,n,e){return e},j.prototype._willSettleAt=function(t,n){var e=this;y(t,void 0,function(t){e._settledAt(q,n,t)},function(t){e._settledAt(F,n,t)})};var W=function(t,n){return new U(this,t,!0,n).promise},$=function(t,n){function e(t){_(s,t)}function r(t){d(s,t)}var o=this,s=new o(i,n);if(!O(t))return d(s,new TypeError("You must pass an array to race.")),s;for(var u=t.length,c=0;s._state===I&&c<u;c++)y(o.resolve(t[c]),void 0,e,r);return s},z=function(t,n){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(i,n);return _(r,t),r},B=function(t,n){var e=this,r=new e(i,n);return d(r,t),r},G=0,H=T;T.all=W,T.race=$,T.resolve=z,T.reject=B,T.prototype={constructor:T,then:function(t,n,e){var r=this,o=r._state;if(o===q&&!t||o===F&&!n)return this;r._onerror=null;var s=new this.constructor(i,e),u=r._result;if(o){var c=arguments[o-1];C(function(){g(o,s,c,u)})}else y(r,s,t,n);return s},catch:function(t,n){return this.then(null,t,n)}};var J=function(){var t;"Promise"in(t="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self)&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),n(e)}()||(t.Promise=H)};J()}.call(this),n.exports._=r});
//# sourceMappingURL=polyfill.promise.js.map
require("wdg.gl8",function(e,n,r){var t=function(){function n(){return t(r,arguments)}var r={en:{}},t=e("$").intl;return n.all=r,n}(),o={vert:"// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n\n// Passer les coordonnées UV pour la texture.\nvarying vec2 varUV;\nvarying float varTime;\n\nvoid main() {\n  float x = attPosition.x;\n  float y = attPosition.y;\n  float z = 0.0;\n\n  gl_Position = vec4(x, y, z, 1.0 );\n\n  varUV = vec2( x, y );\n  varTime = uniTime;\n}\n",frag:"precision mediump float;\n\n// La texture créée à l'aide d'un Frame Buffer\nuniform sampler2D uniTexture;\n\n// Les coordonnées de l'écran, comprises entre -1.0 et +1.0\nvarying vec2 varUV;\n// Temps en millisecondes\nvarying float varTime;\n\n// Constante utilisée pour lire les pixels avoisinants.\nconst float S = 1.0 / 128.0;\n\n// La couleur fait-elle partie de l'arrière-plan ?\n// En fait, on vérifie qu'elle est blanche, ou proche du blanc.\nbool isBackground(vec4 color) {\n  if (color.r > .9 && color.g > .9 && color.b > .9) return true;\n  return false;\n}\n\n// Effet 1 : on prend l'image telle qu'elle est.\nvoid fx1(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color;\n}\n\n// Effet 2 : détextion de contour + seuil.\nvoid fx2(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = color * 9.0\n    - texture2D( uniTexture, vec2(u - S, v - S) )\n    - texture2D( uniTexture, vec2(u    , v - S) )\n    - texture2D( uniTexture, vec2(u + S, v - S) )\n    - texture2D( uniTexture, vec2(u - S, v    ) )\n    - texture2D( uniTexture, vec2(u + S, v    ) )\n    - texture2D( uniTexture, vec2(u - S, v + S) )\n    - texture2D( uniTexture, vec2(u    , v + S) )\n    - texture2D( uniTexture, vec2(u + S, v + S) );\n  if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b > .1) {\n    if (!isBackground(color)) {\n      gl_FragColor = vec4(1.0, 0.9 * u, 0.0, 1.0);\n    } \n  } else {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n  }\n}\n\n// Effet 3 : variation de couleur en fonction de la position.\nvoid fx3(vec4 color, float u, float v, float x, float y) {\n  if (isBackground(color)) gl_FragColor = color;\n  else gl_FragColor = vec4(1.0 - color.r * u, 1.0 - color.g * u * v, 1.0 - color.b * v, 1.0);\n}\n\n// Effet 4 : autre effet. On peut faire varier les coefficients de\n// 9 pixels utilisés, à condition que leur somme soit égale à 1.\nvoid fx4(vec4 color, float u, float v, float x, float y) {\n  gl_FragColor = - color * 7.0\n    + texture2D( uniTexture, vec2(u - S, v - S) )\n    + texture2D( uniTexture, vec2(u    , v - S) )\n    + texture2D( uniTexture, vec2(u + S, v - S) )\n    + texture2D( uniTexture, vec2(u - S, v    ) )\n    + texture2D( uniTexture, vec2(u + S, v    ) )\n    + texture2D( uniTexture, vec2(u - S, v + S) )\n    + texture2D( uniTexture, vec2(u    , v + S) )\n    + texture2D( uniTexture, vec2(u + S, v + S) );\n  float r = gl_FragColor.r;\n  float g = gl_FragColor.g;\n  float b = gl_FragColor.b;\n  if (r + g + b < 2.0) {\n    gl_FragColor = vec4( g, 0.0, 0.0, 1.0);\n  }\n}\n\n\nvoid main() {\n  float x = varUV.x;\n  float y = varUV.y;\n  // Les coordonnées (u,v) sont comprises entre 0.0 et 1.0\n  float u = (1.0 + x) / 2.0;\n  float v = (1.0 + y) / 2.0;\n  // Mouvement du centre qui permet de séparer l'affichage en 4.\n  float ang = varTime * 0.000314;\n  float r = cos(4581.15 + varTime * 0.000711);\n  float t= varTime * 0.002;\n  float cx = (cos(ang) + 0.35 * cos(t + y * 5.0)) * r;\n  float cy = (sin(ang) + 0.35 * cos(t + x * 5.0)) * r;\n\n  // Voici comment on lit un pixel dans une texture.\n  vec4 color = texture2D( uniTexture, vec2(u, v) );\n  // En fonction de la position du pixel courant par rapport\n  // au centre (cx, cy), on applique un effet ou un autre.\n  if (x < cx) {\n    if (y < cy) {\n      fx1(color, u, v, x, y);\n    } else {\n      fx2(color, u, v, x, y);\n    }\n  } else {\n    if (y < cy) {\n      fx3(color, u, v, x, y);\n    } else {\n      fx4(color, u, v, x, y);\n    }\n  }\n}\n"},i=e("dom"),u=e("tfw.data-binding"),a=e("tfw.webgl"),l=e("explosive-tp"),c=function(e){var n=i.elem(this,"canvas");u.propInteger(this,"width")(function(e){n.setAttribute("width",e),n.style.width=e+"px"}),u.propInteger(this,"height")(function(e){n.setAttribute("height",e),n.style.height=e+"px"}),u.propBoolean(this,"zindex"),e=u.extend({width:640,height:480,zbuffer:!1},e,this);var r=new a(n),t=r.gl,c=new l(n),f=r.createTextureForFB(512,512),v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,f,0),t.bindFramebuffer(t.FRAMEBUFFER,null);var s=t.createBuffer(),x=new Float32Array([-1,-1,0,-1,1,0,1,-1,0,1,1,0]),g=r.createProgram({vertex:o.vert,fragment:o.frag});r.start(function(e){t.bindFramebuffer(t.FRAMEBUFFER,v),t.clear(t.COLOR_BUFFER_BIT),c.render(e),g.use(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,s),t.enableVertexAttribArray(g.$attPosition),t.vertexAttribPointer(g.$attPosition,3,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,x,t.STATIC_DRAW),t.bindTexture(t.TEXTURE_2D,f),g.$uniTime=e,t.drawArrays(t.TRIANGLE_STRIP,0,4)})};n.exports=c,n.exports._=t});
//# sourceMappingURL=wdg.gl8.js.map
require("explosive-tp",function(t,n,a){function e(t){var n=this._webgl,a=n.gl,e=a.createBuffer();this._buffer=e,a.bindBuffer(a.ARRAY_BUFFER,e);var r,o,i=0,s=n.getDataFromImage(t),l=[];for(o=0;o<t.height;o++)for(r=0;r<t.width;r++)s[i]+s[i+1]+s[i+2]<50&&s[i+3]>240&&l.push([2*r/t.width-1,1-2*o/t.height]),i+=4;var d=l.length,u=[];l.forEach(function(t){u.push(t[0]),u.push(t[1]),u.push(Math.random()),u.push(Math.random()),u.push(Math.random()),u.push(Math.random())});var c=new Float32Array(u);a.bufferData(a.ARRAY_BUFFER,c,a.STATIC_DRAW);var f=c.BYTES_PER_ELEMENT,g=6*f,p=a.getAttribLocation(this._prg.program,"attPosition");a.enableVertexAttribArray(p),a.vertexAttribPointer(p,2,a.FLOAT,!1,g,0);var m=a.getAttribLocation(this._prg.program,"attRandom");a.enableVertexAttribArray(m),a.vertexAttribPointer(m,4,a.FLOAT,!1,g,2*f),a.disable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE),a.blendEquation(a.FUNC_ADD),a.clearColor(1,1,1,1),a.bindBuffer(a.ARRAY_BUFFER,e),this._loaded=!0,this._count=d,this._data=c}var r=function(){function n(){return e(a,arguments)}var a={en:{}},e=t("$").intl;return n.all=a,n}(),o={vert:'// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\n// Ces valeurs donnent la "personnalité" de la particule\nattribute vec4 attRandom;\n\n// Couleur pour le fragment shader\nvarying vec3 varColor;\n// Indique au fragment shader si les particules sont\n// en place (1.0) ou en mouvement désordonné (0.0)\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  // Position "en place" de la particule.\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  // Créer un léger mouvement autour de la position normale.\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  // Coordonnées aléatoires en rotation dans tout l\'espace.\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  // Dans un cycle de 12 secondes, l\'image est stable\n  // pendant 8 secondes et en vrac pendant 4.\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  // Petites variations de vert.\n  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );\n  // La position est intrerpolée entre (x,y) et (xx,yy).\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  // Palpitation de la taille et diminution lors de la phase de désordre.\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\n}\n',frag:"precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\n}\n"},i=t("tfw.webgl"),s=function(t){var n=new i(t),a=n.createProgram({vertex:o.vert,fragment:o.frag});this._webgl=n,this._prg=a,this._loaded=!1;var r=new Image;r.src="css/explosive-tp/tp.png",r.onload=e.bind(this,r)};s.prototype.render=function(t){if(this._loaded){var n=this._webgl.gl,a=this._prg;a.use(),n.disable(n.DEPTH_TEST),n.enable(n.BLEND),n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE),n.blendEquation(n.FUNC_ADD),a.$uniTime=t,n.bindBuffer(n.ARRAY_BUFFER,this._buffer);var e=this._data.BYTES_PER_ELEMENT,r=6*e,o=n.getAttribLocation(this._prg.program,"attPosition");n.enableVertexAttribArray(o),n.vertexAttribPointer(o,2,n.FLOAT,!1,r,0);var i=n.getAttribLocation(this._prg.program,"attRandom");n.enableVertexAttribArray(i),n.vertexAttribPointer(i,4,n.FLOAT,!1,r,2*e),n.bufferData(n.ARRAY_BUFFER,this._data,n.STATIC_DRAW),n.drawArrays(n.POINTS,0,this._count)}},n.exports=s,n.exports._=r});
//# sourceMappingURL=explosive-tp.js.map
require("tfw.webgl",function(e,t,r){function n(e){Object.defineProperty(this,"gl",{value:e.getContext("webgl")||e.getContext("experimental-webgl"),writable:!1,configurable:!1,enumerable:!0}),this.render=function(){}}function a(e,t){var r=e.createProgram();e.attachShader(r,s(e,t.vertex||"//No Vertex Shader")),e.attachShader(r,c(e,t.fragment||"//No Fragment Shader")),e.linkProgram(r),this.program=r,Object.freeze(this.program),this.use=function(){e.useProgram(r)},this.use();var n,a,u={},m=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(n=0;n<m;n++)a=e.getActiveAttrib(r,n),u[a.name]=e.getAttribLocation(r,a.name),this["$"+a.name]=e.getAttribLocation(r,a.name);Object.freeze(u),this.attribs=u;var E={},T=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(n=0;n<T;n++)a=e.getActiveUniform(r,n),E[a.name]=e.getUniformLocation(r,a.name),Object.defineProperty(this,"$"+a.name,{set:i(e,a,E[a.name]),get:o(a),enumerable:!0,configurable:!0});Object.freeze(E),this.uniforms=E}function i(e,t,r){var n="_$"+t.name;switch(t.type){case e.BYTE:case e.UNSIGNED_BYTE:case e.SHORT:case e.UNSIGNED_SHORT:case e.INT:case e.UNSIGNED_INT:return 1==t.size?function(t){e.uniform1i(r,t),this[n]=t}:function(t){e.uniform1iv(r,t),this[n]=t};case e.FLOAT:return 1==t.size?function(t){e.uniform1f(r,t),this[n]=t}:function(t){e.uniform1fv(r,t),this[n]=t}}}function o(e){var t="_$"+e.name;return function(){return this[t]}}function u(e,t,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.log(r),console.error("An error occurred compiling the shader: "+t.getShaderInfoLog(n)),null)}function c(e,t){return u(e.FRAGMENT_SHADER,e,t)}function s(e,t){return u(e.VERTEX_SHADER,e,t)}var m=function(){function t(){return n(r,arguments)}var r={en:{}},n=e("$").intl;return t.all=r,t}();(new Float32Array).BYTES_PER_ELEMENT;n.prototype.createProgram=function(e){return new a(this.gl,e)},n.prototype.start=function(e){if("function"==typeof e&&(this.render=e),!this._animationIsOn){var t=this,r=function(e){t._animationIsOn&&window.requestAnimationFrame(r),t.render(e)};window.requestAnimationFrame(r),this._animationIsOn=!0}},n.prototype.stop=function(){this._animationIsOn=!1},n.prototype.createTextureForFB=function(e,t){var r=this.gl,n=r.createTexture();return r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e,t,0,r.RGBA,r.UNSIGNED_BYTE,null),n},n.prototype.getDataFromImage=function(e){var t=e.width,r=e.height,n=document.createElement("canvas");n.setAttribute("width",t),n.setAttribute("height",r);var a=n.getContext("2d");return a.drawImage(e,0,0),a.getImageData(0,0,t,r).data},t.exports=n,t.exports._=m});
//# sourceMappingURL=tfw.webgl.js.map
>>>>>>> bc213b653f20af71ccef265b5c8672194cc53dcc
