/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

window.require = function() {
  var mocks = {};
  var modules = {};
  var definitions = {};
  var nodejs_require = typeof window.require === 'function' ? window.require : null;

  var f = function(id, body) {
    var mock = mocks[id];
    if( mock ) return mock;
    
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
    }
    return mod;
  };

  f.mock = function( moduleName, module ) {
    mocks[moduleName] = module;
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
        W('wdg.article112', 'wdg.article', {
            title: "Introduction aux concepts fondamentaux",
            content: [
          W({
              elem: "h1",
              attr: {"id": "le-syst-me-de-coordonn-es"},
              children: ["Le système de coordonnées"]}),
          W({
              elem: "p",
              children: [W('wdg.intro1113','wdg.intro1',{
                  float: "right",
                  height: "200"},{"id":"wdg.intro1113"})]}),
          W({
              elem: "p",
              children: [
                "WebGL manipule les pixels de son ",
                W({
                  elem: "strong",
                  children: ["viewport"]}),
                ". Le ",
                W({
                  elem: "strong",
                  children: ["viewport"]}),
                " est le rectangle auquel on restreint l",
                "&#39;",
                "affichage. Le système de coordonnées de WebGL est totalement indépendant des dimension physiques de ce viewport."]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "L",
                    "&#39;",
                    "axe des ",
                    W({
                      elem: "strong",
                      children: ["X"]}),
                    " est horizontal et dirigé vers la droite.    "]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "L",
                    "&#39;",
                    "axe des ",
                    W({
                      elem: "strong",
                      children: ["Y"]}),
                    " est vertical et dirigé vers le haut."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Les coordonnées sont comprises entre ",
                W({
                  elem: "code",
                  children: ["-1"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["+1"]}),
                ". Le centre de l",
                "&#39;",
                "écran a donc ",
                W({
                  elem: "code",
                  children: ["(0,0)"]}),
                " comme coordonnées."]}),
          W({
              elem: "h1",
              attr: {"id": "le-pipeline"},
              children: ["Le pipeline"]}),
          W({
              elem: "p",
              children: [W('wdg.intro2114','wdg.intro2',{
                  float: "right",
                  width: "200",
                  height: "200"},{"id":"wdg.intro2114"})]}),
          W({
              elem: "p",
              children: [
                "La carte graphique est un mini ordinateur avec ses processeurs, sa mémoire, son langage de programmation.\nPour lui faire dessiner un simple triangle comme celui-ci (en orange), il faut bien comprendre le principe du ",
                W({
                  elem: "strong",
                  children: ["pipeline"]}),
                "."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "div",
                  attr: {"class": "tbl"},
                  children: [
                    "\r\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["Attributs de vertex"]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "box"},
                              children: ["Vertex Shader"]})]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        W({
                          elem: "div",
                          children: ["Coordonnées"]}),
                        "\r\n    "]}),
                    "\r\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["Coordonnées"]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "box"},
                              children: ["Rasterisation"]})]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        W({
                          elem: "div",
                          children: ["Fragments"]}),
                        "\r\n    "]}),
                    "\r\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["Fragments"]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "box"},
                              children: ["Fragment Shader"]})]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        W({
                          elem: "div",
                          children: ["Pixels"]}),
                        "\r\n    "]}),
                    "\r\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["Pixels"]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "box"},
                              children: ["Composition"]})]}),
                        W({
                          elem: "div",
                          children: ["&xrarr;"]}),
                        W({
                          elem: "div",
                          children: ["Frame Buffer"]}),
                        "\r\n    "]}),
                    "\r\n"]})]}),
          W({
              elem: "h2",
              attr: {"id": "le-vertex-shader"},
              children: ["Le vertex shader"]}),
          W({
              elem: "p",
              children: [
                "Le ",
                W({
                  elem: "strong",
                  children: ["vertex shader"]}),
                " est un programme de la carte graphique (que vous devez écrire vous-même) qui transforme des données de la mémoire en coordonnées pour le viewport."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "div",
                  attr: {"class": "tbl"},
                  children: [
                    "\r\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          attr: {"style": "color:#06D"},
                          children: [W({
                              elem: "b",
                              children: ["Attributs de Vertex"]})]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["&nbsp;"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          attr: {"style": "color:#06D"},
                          children: [W({
                              elem: "b",
                              children: ["Coordonnées"]})]}),
                        "\r\n    "]}),
                    "\r\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\r\n            ",
                            W({
                              elem: "div",
                              attr: {"class": "tbl"},
                              children: [
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    "\r\n                    ",
                                    W({
                                      elem: "div",
                                      attr: {"class": "tbl h48"},
                                      children: [
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          children: [W({
                                              elem: "div",
                                              children: ["A"]})]}),
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          children: [W({
                                              elem: "div",
                                              children: ["B"]})]}),
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          children: [W({
                                              elem: "div",
                                              children: ["C"]})]}),
                                        "\r\n                    "]}),
                                    "\r\n                    ",
                                    W({
                                      elem: "div",
                                      children: [
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          attr: {"class": "tbl grd h24"},
                                          children: [
                                            "\r\n                            ",
                                            W({
                                              elem: "div",
                                              children: [W({
                                                  elem: "div",
                                                  children: ["-0.7"]})]}),
                                            "\r\n                            ",
                                            W({
                                              elem: "div",
                                              children: [W({
                                                  elem: "div",
                                                  children: ["-0.5"]})]}),
                                            "\r\n                            ",
                                            W({
                                              elem: "div",
                                              children: [W({
                                                  elem: "div",
                                                  children: ["-0.1"]})]}),
                                            "\r\n                            ",
                                            W({
                                              elem: "div",
                                              children: [W({
                                                  elem: "div",
                                                  children: ["+0.7"]})]}),
                                            "\r\n                            ",
                                            W({
                                              elem: "div",
                                              children: [W({
                                                  elem: "div",
                                                  children: ["+0.5"]})]}),
                                            "\r\n                            ",
                                            W({
                                              elem: "div",
                                              children: [W({
                                                  elem: "div",
                                                  children: ["-0.8"]})]}),
                                            "\r\n                        "]}),
                                        "\r\n                    "]}),
                                    "\r\n                "]}),
                                "\r\n            "]}),
                            "\r\n        "]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\r\n            ",
                            W({
                              elem: "i",
                              children: ["vertex"]}),
                            W({
                              elem: "br"}),
                            "\r\n            ",
                            "&xrarr;",
                            W({
                              elem: "br"}),
                            "\r\n            ",
                            W({
                              elem: "i",
                              children: ["shader"]}),
                            "\r\n        "]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\r\n            ",
                            W({
                              elem: "div",
                              attr: {"class": "tbl"},
                              children: [
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    "\r\n                    ",
                                    W({
                                      elem: "div",
                                      attr: {"class": "tbl w48"},
                                      children: [
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          attr: {"class": "grd"},
                                          children: [
                                            W({
                                              elem: "div",
                                              children: ["-0.7"]}),
                                            W({
                                              elem: "div",
                                              children: ["-0.5"]}),
                                            W({
                                              elem: "div",
                                              children: ["0"]}),
                                            W({
                                              elem: "div",
                                              children: ["1"]})]}),
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          children: [
                                            W({
                                              elem: "div",
                                              children: ["x"]}),
                                            W({
                                              elem: "div",
                                              children: ["y"]}),
                                            W({
                                              elem: "div",
                                              children: ["z"]}),
                                            W({
                                              elem: "div",
                                              children: ["w"]})]}),
                                        "\r\n                    "]}),
                                    "\r\n                "]}),
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    "\r\n                    ",
                                    W({
                                      elem: "div",
                                      attr: {"class": "tbl"},
                                      children: [
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          attr: {"class": "grd w48"},
                                          children: [
                                            W({
                                              elem: "div",
                                              children: ["-0.1"]}),
                                            W({
                                              elem: "div",
                                              children: ["0.7"]}),
                                            W({
                                              elem: "div",
                                              children: ["0"]}),
                                            W({
                                              elem: "div",
                                              children: ["1"]})]}),
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          attr: {"class": "w48"},
                                          children: [
                                            W({
                                              elem: "div",
                                              children: ["x"]}),
                                            W({
                                              elem: "div",
                                              children: ["y"]}),
                                            W({
                                              elem: "div",
                                              children: ["z"]}),
                                            W({
                                              elem: "div",
                                              children: ["w"]})]}),
                                        "\r\n                    "]}),
                                    "\r\n                "]}),
                                "                \r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    "\r\n                    ",
                                    W({
                                      elem: "div",
                                      attr: {"class": "tbl"},
                                      children: [
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          attr: {"class": "grd w48"},
                                          children: [
                                            W({
                                              elem: "div",
                                              children: ["0.5"]}),
                                            W({
                                              elem: "div",
                                              children: ["-0.8"]}),
                                            W({
                                              elem: "div",
                                              children: ["0"]}),
                                            W({
                                              elem: "div",
                                              children: ["1"]})]}),
                                        "\r\n                        ",
                                        W({
                                          elem: "div",
                                          attr: {"class": "w48"},
                                          children: [
                                            W({
                                              elem: "div",
                                              children: ["x"]}),
                                            W({
                                              elem: "div",
                                              children: ["y"]}),
                                            W({
                                              elem: "div",
                                              children: ["z"]}),
                                            W({
                                              elem: "div",
                                              children: ["w"]})]}),
                                        "\r\n                    "]}),
                                    "\r\n                "]}),
                                "\r\n            "]}),
                            "\r\n        "]}),
                        "\r\n    "]}),
                    "\r\n"]})]}),
          W({
              elem: "p",
              children: [
                "Voici un exemple :\n",
                W({
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
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["x"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attribute"]}),
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
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "h2",
              attr: {"id": "rasterisation"},
              children: ["Rasterisation"]}),
          W({
              elem: "p",
              children: [
                "Avec ces coordonnées, la carte graphique peut faire trois choses : des ",
                W({
                  elem: "strong",
                  children: ["points"]}),
                ",\ndes ",
                W({
                  elem: "strong",
                  children: ["lignes"]}),
                " et des ",
                W({
                  elem: "strong",
                  children: ["triangles pleins"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "La phase de rasterization va donc prendre autant de points que nécessaires (1 pour les points, 2 pour les lignes et 3 pour les triangles) et déterminer quels sont les pixels à générer.\nComme on ne sait pas encore si ces pixels seront dessinés à l",
                "&#39;",
                "écran, on les appelle des ",
                W({
                  elem: "strong",
                  children: ["fragments"]}),
                "."]}),
          W({
              elem: "h2",
              attr: {"id": "fragment-shader"},
              children: ["Fragment Shader"]}),
          W({
              elem: "p",
              children: [
                "Le ",
                W({
                  elem: "strong",
                  children: ["fragment shader"]}),
                " est un programme (à écrire vous-même) qui décide si un fragment doit être gardé, et si oui quelle sera la couleur du pixel résultant."]}),
          W({
              elem: "p",
              children: [
                "La couleur est un vecteur à 4 coordonnées toutes comprises entre ",
                W({
                  elem: "code",
                  children: ["0"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["1"]}),
                " :\nle niveau de ",
                W({
                  elem: "strong",
                  children: ["rouge"]}),
                ", le niveau de ",
                W({
                  elem: "strong",
                  children: ["vert"]}),
                ", le niveau de ",
                W({
                  elem: "strong",
                  children: ["bleu"]}),
                " et l",
                "&#39;",
                W({
                  elem: "strong",
                  children: ["opacité"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Voici un exemple :\n",
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
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "h2",
              attr: {"id": "composition"},
              children: ["Composition"]}),
          W({
              elem: "p",
              children: [
                "Durant cette dernière phase il est possible d",
                "&#39;",
                "effectuer divers tests pour savoir si le pixel doit être écarté ou dessiné. Et s",
                "&#39;",
                "il est dessiné, on peut préciser comment il doit réagir avec le pixel déjà affiché à la même position."]}),
          W({
              elem: "h1",
              attr: {"id": "passons-la-pratique"},
              children: ["Passons à la pratique"]}),
          W({
              elem: "p",
              children: ["Maintenant que vous avez la théorie, nous allons décrire pas à pas le code Javascript qui va dessiner le triangle orange ci-dessus."]}),
          W({
              elem: "p",
              children: [
                "On commence par créer un canvas, on le place sur le document et on récupère le contexte WebGL.\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Créer l'élément HTML suivant :"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: [
                        "// ",
                        "&lt;",
                        "canvas width=\"1920\" height=\"1080\"",
                        "&gt;",
                        "&lt;",
                        "/canvas",
                        "&gt;"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["canvas"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["document"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["createElement"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"canvas\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["canvas"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setAttribute"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"width\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1920"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["canvas"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setAttribute"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"height\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1028"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// L'ajouter au document courant."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["document"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["body"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["appendChild"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["canvas"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Récupérer le contexte WebGL."]}),
                    "\r\n",
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
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Préparons le code de nos shaders :\n",
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
                      children: ["codeVert"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"attribute float x;\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"attribute float y;\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"void main() {\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"  gl_Position = vec4( x, y, 0.0, 1.0 );\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"}\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["codeFrag"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"precision mediump float;\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"void main() {\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"  gl_FragColor = vec4( 1.0, 0.5, 0.0, 1.0 );\""]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"}\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Créons un ",
                W({
                  elem: "strong",
                  children: ["Program"]}),
                " qui contient nos deux shaders :\n",
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
                      children: ["program"]}),
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
                      children: ["();"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Vertex shader."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderVert"]}),
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
                      children: ["createShader"]}),
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
                      children: ["VERTEX_SHADER"]}),
                    " ",
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
                      children: ["shaderSource"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderVert"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["codeVert"]}),
                    " ",
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
                      children: ["compileShader"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderVert"]}),
                    " ",
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
                      children: ["attachShader"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["program"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderVert"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Fragment shader."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderFrag"]}),
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
                      children: ["createShader"]}),
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
                      children: ["FRAGMENT_SHADER"]}),
                    " ",
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
                      children: ["shaderSource"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderFrag"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["codeFrag"]}),
                    " ",
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
                      children: ["compileShader"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderFrag"]}),
                    " ",
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
                      children: ["attachShader"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["program"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["shaderFrag"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Relier tout ça."]}),
                    "\r\n",
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
                      children: ["program"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Utiliser ce programme."]}),
                    "\r\n",
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
                      children: ["program"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Puisque nous voulons dessiner un triangle, il nous faut ",
                W({
                  elem: "strong",
                  children: ["3 vertex"]}),
                ".\nChaque vertex aura 2 attributs, l",
                "&#39;",
                "abscisse et l",
                "&#39;",
                "ordonnée du point."]}),
          W({
              elem: "p",
              children: [
                "On crée donc un tableau que l",
                "&#39;",
                "on pousse dans la mémoire de la carte graphique (ARRAY_BUFFER) :\n",
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
                      children: ["vertices"]}),
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
                      children: ["(["]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-0.7"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-0.5"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-0.1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "  ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.7"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n     ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.5"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-0.8"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Création d'un buffer dans la carte graphique."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Un buffer est un tableau de nombres."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["buff"]}),
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
                      children: ["();"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Définir ce buffer comme le buffer actif."]}),
                    "\r\n",
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
                      children: ["buff"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Copier des données dans le buffer actif."]}),
                    "\r\n",
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
                      children: ["vertices"]}),
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
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Il faut maintenant décrire ce qu",
                "&#39;",
                "on a mis dans l",
                "&#39;",
                "ARRAY_BUFFER."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Taille d'un Float32 en octets."]}),
                    "\r\n",
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
                      children: ["vertices"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BYTES_PER_ELEMENT"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Nombre d'octets utilisés par vertex."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["block"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// 2 attributs."]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attX"]}),
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
                      children: ["program"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"x\""]}),
                    " ",
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
                      children: ["enableVertexAttribArray"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attX"]}),
                    " ",
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
                      children: ["vertexAttribPointer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attX"]}),
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
                      children: ["block"]}),
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
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attY"]}),
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
                      children: ["program"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"y\""]}),
                    " ",
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
                      children: ["enableVertexAttribArray"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attY"]}),
                    " ",
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
                      children: ["vertexAttribPointer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attY"]}),
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
                      children: ["block"]}),
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
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Ensuite, on va effacer l",
                "&#39;",
                "écran en le coloriant en bleu :\n",
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
                      children: ["clearColor"]}),
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
                      children: ["0.4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0.867"]}),
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
                    "\r\n",
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
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Et enfin, on dessine notre triangle :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Dessiner des triangles en utilisant 3"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// vertex et en commençant par le premier"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// (index = 0)."]}),
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
                    " ",
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
                      children: ["0"]}),
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
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "h2",
              attr: {"id": "r-sultat"},
              children: ["Résultat"]}),
          W({
              elem: "p",
              children: [
                "Et voici le ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/intro/index.html"},
                  children: ["rendu final"]}),
                " :",
                W({
                  elem: "br"}),
                "\n",
                W({
                  elem: "iframe",
                  attr: {
                    src: "css/assets/intro/index.html",
                    width: "300",
                    height: "240"}})]})]},{"id":"wdg.article112"})

    }
);
