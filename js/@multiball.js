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
        W('wdg.article124', 'wdg.article', {
            title: "Multi-Ball",
            content: [
          W({
              elem: "p",
              children: [W('wdg.multiball125','wdg.multiball',{},{"id":"wdg.multiball125","class":"right"})]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "animation ci-contre est composée de sphères placées sur 10 orbites différentes. Sur une même orbite, toutes les sphères ont le même rayon, à chaque fois qu",
                "&#39;",
                "on passe à l",
                "&#39;",
                "orbite suivante, on multiplie ce rayon par un coefficient que vous pouvez modifier en direct."]}),
          W({
              elem: "p",
              children: [
                "Normalement il y a 20 sphères sur une orbite, mais en mode dense, on en affiche 32. Le mode ",
                W({
                  elem: "em",
                  children: ["rayures"]}),
                " permet de donner plus de relief aux sphères tout en leur ajoutant des ombres façon cartoon."]}),
          W({
              elem: "h1",
              attr: {"id": "calcul-des-coordonn-es-des-sph-res-d-une-orbite"},
              children: [
                "Calcul des coordonnées des sphères d",
                "&#39;",
                "une orbite"]}),
          W({
              elem: "p",
              children: [
                "Afin d",
                "&#39;",
                "avoir une symétrie parfaite, on se base sur un ",
                W({
                  elem: "a",
                  attr: {"href": "icosahedron.html"},
                  children: ["icosaèdre"]}),
                " pour placer les sphères d",
                "&#39;",
                "une orbite. Ce polyèdre possède 20 faces et 12 sommets. Si on considère chaque sommet comme un vecteur partant du centre, on peut déterminer les positions relatives aux faces en normalisant le vecteur résultant de l",
                "&#39;",
                "ajout des vecteurs associés aux sommets du triangle de chaque face."]}),
          W({
              elem: "h1",
              attr: {"id": "changer-le-coefficient-sans-modifier-les-vertex"},
              children: ["Changer le coefficient sans modifier les vertex"]}),
          W({
              elem: "p",
              children: ["Chaque sphère est représentée par 4 attributs :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "les coordonnes X, Y et Z du centre de la sphère si elle était sur l",
                    "&#39;",
                    "orbite 0,"]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "et le numéro de l",
                    "&#39;",
                    "orbite (de 0 à 9)."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Posons ",
                W({
                  elem: "code",
                  children: ["R"]}),
                " le rayon de l",
                "&#39;",
                "orbite 0, ",
                W({
                  elem: "code",
                  children: ["r"]}),
                " le rayon des sphères sur l",
                "&#39;",
                "orbite 0 et ",
                W({
                  elem: "code",
                  children: ["c"]}),
                " le coefficient de modification de ce rayon pour passer à l",
                "&#39;",
                "orbite suivante. On aura alors :"]}),
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
                          children: ["Orbite"]}),
                        "\n",
                        W({
                          elem: "th",
                          children: [
                            "Rayon de l",
                            "&#39;",
                            "orbite"]}),
                        "\n",
                        W({
                          elem: "th",
                          children: ["Rayon de la sphère"]}),
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
                          children: ["0"]}),
                        "\n",
                        W({
                          elem: "td",
                          children: ["R"]}),
                        "\n",
                        W({
                          elem: "td",
                          children: ["r"]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["1"]}),
                        "\n",
                        W({
                          elem: "td",
                          children: [
                            "R + r + r",
                            W({
                              elem: "sup",
                              children: ["2"]})]}),
                        "\n",
                        W({
                          elem: "td",
                          children: [
                            "r",
                            W({
                              elem: "sup",
                              children: ["2"]})]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["2"]}),
                        "\n",
                        W({
                          elem: "td",
                          children: [
                            "R + r + 2.r",
                            W({
                              elem: "sup",
                              children: ["2"]}),
                            " + r",
                            W({
                              elem: "sup",
                              children: ["3"]})]}),
                        "\n",
                        W({
                          elem: "td",
                          children: [
                            "r",
                            W({
                              elem: "sup",
                              children: ["3"]})]}),
                        "\n"]}),
                    "\n",
                    W({
                      elem: "tr",
                      children: [
                        "\n",
                        W({
                          elem: "td",
                          children: ["3"]}),
                        "\n",
                        W({
                          elem: "td",
                          children: [
                            "R + r + 2.r",
                            W({
                              elem: "sup",
                              children: ["2"]}),
                            " + 2.r",
                            W({
                              elem: "sup",
                              children: ["3"]}),
                            " + r",
                            W({
                              elem: "sup",
                              children: ["4"]})]}),
                        "\n",
                        W({
                          elem: "td",
                          children: [
                            "r",
                            W({
                              elem: "sup",
                              children: ["4"]})]}),
                        "\n"]}),
                    "\n"]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Si on pose ",
                W({
                  elem: "code",
                  children: ["n"]}),
                " le numéro de l",
                "&#39;",
                "orbite, on obtient la formule suivante :",
                W({
                  elem: "br"}),
                W({
                  elem: "code",
                  children: [
                    "R(n) = R - r.(1 + c",
                    W({
                      elem: "sup",
                      children: ["n"]}),
                    ") + (2r.(c",
                    W({
                      elem: "sup",
                      children: ["n + 1"]}),
                    " - 1)) / (c - 1)"]})]}),
          W({
              elem: "p",
              children: [W('wdg.showhide126','wdg.showhide',{
                  value: "false",
                  label: "Le vertex shader qui applique cette formule",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Perspective"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniform"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mat4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniProjection"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Rotation de la multiball."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniform"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mat4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniRotation"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Largeur de l'écran en pixels."]}),
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
                          children: ["uniScreenWidth"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Rayon de la sphère"]}),
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
                          children: ["uniRadius"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Distance de la sphère au centre."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// (rayon de son orbite)"]}),
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
                          children: ["uniDistance"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Facteur de diminution des rayons des sphères"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// sur les orbites successives"]}),
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
                          children: ["uniAlpha"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Coordonnées du centre de la sphère"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// comme si elle était sur l'orbite 0."]}),
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
                          children: ["attPoint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Numéro d'orbite (de 0 à 9)."]}),
                        "\n",
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
                          children: ["attLevel"]}),
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
                          children: ["// On va reculer un peu la multiball pour qu'on la voit bien"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["translation"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-2.5"]}),
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
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Application de la formule pour calculer le rayon de l'orbite courante."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["alpha1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["pow"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAlpha"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attLevel"]}),
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
                          children: ["alpha2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["alpha1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAlpha"]}),
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
                          children: ["dist"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniDistance"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniRadius"]}),
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
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["alpha1"]}),
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
                          children: ["uniRadius"]}),
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
                          children: ["alpha2"]}),
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
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAlpha"]}),
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
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Rotation, translation et projection en perspective."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniRotation"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
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
                          children: ["attPoint"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dist"]}),
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
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["translation"]}),
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
                          attr: {"class": "identifier"},
                          children: ["uniProjection"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertex"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Détermination de la taille de la sphère en pixels."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["point"]}),
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
                          children: ["uniRadius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["alpha1"]}),
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
                          children: ["vertex"]}),
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
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["size"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniProjection"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["point"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "  \n  ",
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
                          attr: {"class": "identifier"},
                          children: ["uniScreenWidth"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["size"]}),
                        ".",
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
                          children: ["size"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["w"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide126"})]}),
          W({
              elem: "h1",
              attr: {"id": "dessiner-un-cercle-partir-d-un-point"},
              children: [
                "Dessiner un cercle à partir d",
                "&#39;",
                "un point"]}),
          W({
              elem: "p",
              children: [
                "Nos sphères sont vuew pas WebGL comme des points :\n",
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
                    " ",
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "On précise que ces points sont des carrés avec un certain nombre de pixels de côté :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Détermination de la taille de la sphère en pixels."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["point"]}),
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
                      children: ["uniRadius"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["alpha1"]}),
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
                      children: ["vertex"]}),
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
                      children: ["1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["size"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["uniProjection"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["point"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "  \n",
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
                      attr: {"class": "identifier"},
                      children: ["uniScreenWidth"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["size"]}),
                    ".",
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
                      children: ["size"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["w"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Pour cela, on imagine un vecteur se trouvant dans un plan faisant face à la caméra. Ce vecteur est centré sur le centre de la sphère courante. En multipliant par la matrice ",
                W({
                  elem: "code",
                  children: ["uniProjection"]}),
                ", on obtient ses coordonnées dans l",
                "&#39;",
                "espace WebGL. Il faudra multiplier par la largeur réelle de l",
                "&#39;",
                "écran en pixels pour définir la taille du point.\nMais avant cela, on divise par la coordonnée ",
                W({
                  elem: "code",
                  children: ["w"]}),
                " comme le ferait WebGL si on avait assigné ce vecteur à ",
                W({
                  elem: "code",
                  children: ["gl_Position"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Ce point donne un carré, donc il va générer plusieurs fragments avec la variable ",
                W({
                  elem: "code",
                  children: ["gl_PointCoord"]}),
                " indiquant quelle partie du carré on est en train d",
                "&#39;",
                "afficher.\nComme pour les textures, le point ",
                W({
                  elem: "code",
                  children: ["(0,0)"]}),
                " correspond au coin supérieur gauche et ",
                W({
                  elem: "code",
                  children: ["(1,1)"]}),
                " au coin inférieur droit."]}),
          W({
              elem: "p",
              children: [
                "Si on ajoute 1 puis qu",
                "&#39;",
                "on multiplie par deux les coordonnées de ",
                W({
                  elem: "code",
                  children: ["gl_PointCoord"]}),
                ", on obtient un repère bien plus intéressant avec ",
                W({
                  elem: "code",
                  children: ["(0,0)"]}),
                " au centre. Dans ce repère, un fragment est en dehors du disque si et seulement si sa distance au centre est supérieure à 1."]}),
          W({
              elem: "p",
              children: [W('wdg.showhide127','wdg.showhide',{
                  value: "false",
                  label: "Le fragment shader",
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Couleur principale d'une sphère."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["COLOR"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                          children: ["2.0"]}),
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
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Distance au carré."]}),
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
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Au delà du rayon d'un cercle, on n'affiche rien."]}),
                        "\n  ",
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
                          children: ["1.0"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Ajout d'un liseré noir dont l'épaisseur est"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// un dixième du rayon."]}),
                        "\n  ",
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
                          children: ["*"]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["9"]}),
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
                          children: ["1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Assombrir quand le rayon devient grand."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
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
                          attr: {"class": "identifier"},
                          children: ["COLOR"]}),
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
                          children: ["r"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
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
                          children: ["color"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide127"})]}),
          W({
              elem: "p",
              children: [
                "Pour que les disques ressemblent plus à des sphères, on ajoute un léger effet d",
                "&#39;",
                "éclairage qui assombrit la couleur quand on se rapproche des bords."]}),
          W({
              elem: "h1",
              attr: {"id": "z-brer-les-sph-res"},
              children: ["Zébrer les sphères"]}),
          W({
              elem: "p",
              children: [
                "En mode dense, on affiche 320 sphères avec seulement 320 vertices. Et quelque soit la taille des sphères affichées, les contours sont toujours parfaitement ronds. La technique du point semble donc bien avantageuse. Mais il faut se méfier de deux choses : ",
                W({
                  elem: "b",
                  children: ["les intersections de volumes"]}),
                " et l",
                "&#39;",
                W({
                  elem: "b",
                  children: ["effet sprite"]}),
                "."]}),
          W({
              elem: "h2",
              attr: {"id": "les-intersections-de-volumes"},
              children: ["Les intersections de volumes"]}),
          W({
              elem: "p",
              children: [
                "Même si on donne l",
                "&#39;",
                "illusion d",
                "&#39;",
                "avoir affaire à des sphères, pour WebGL, ce sont des disques. C",
                "&#39;",
                "est-à-dire que chaque fragement d",
                "&#39;",
                "un point aura exactement la même coordonnée ",
                W({
                  elem: "code",
                  children: ["z"]}),
                ". Ainsi, si deux sphères ont une intersection, le résultat sera faux car avec cette technique, une sphère est toujours soit devant soit derrière une autre sphère."]}),
          W({
              elem: "p",
              children: [
                "Le seul moyen d",
                "&#39;",
                "éviter ce problème est de faire en sorte qu",
                "&#39;",
                "aucune sphère n",
                "&#39;",
                "entre en collision avec aucune autre."]}),
          W({
              elem: "h2",
              attr: {"id": "l-effet-sprite"},
              children: [
                "L",
                "&#39;",
                "effet sprite"]}),
          W({
              elem: "p",
              children: ["Les boules oranges sont toutes identiques et au lieu de faire des calcules pour assombrir les bords et donner un aspect sphérique à notre carré initial, on aurait tout aussi bien pu appliquer une texture. Le résultat aurait peut-être été un peu pixélisé sur les très grandes sphères, mais WebGL serait plus rapide."]}),
          W({
              elem: "p",
              children: [
                "Alors c",
                "&#39;",
                "est comme pour un tour de magie :\nil y a toujours quelqu",
                "&#39;",
                "un dans la salle qui croit avoir découvert le truc."]}),
          W({
              elem: "p",
              children: [
                "Dans notre cas, il dira que ce n",
                "&#39;",
                "est rien de plus que l",
                "&#39;",
                "animation de sprites. Alors il faut lui montrer quelque chose que les sprites ne peuvent pas faire. Et pour cela, rajouter des rayures suffit car de cette façon, toutes les sphères sont différentes et l",
                "&#39;",
                "hypothèse du sprite ne tient plus."]}),
          W({
              elem: "h3",
              attr: {"id": "mais-comment-faire-ces-rayures-"},
              children: ["Mais comment faire ces rayures ?"]}),
          W({
              elem: "p",
              children: [
                "Il faut déterminer où le fragment courant se trouve sur une sphère. Supposons qu",
                "&#39;",
                "on regarde une demi-sphère de face, la variable ",
                W({
                  elem: "code",
                  children: ["gl_PointCoord"]}),
                " nous donne déjà les coordonnées ",
                W({
                  elem: "code",
                  children: ["x"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["y"]}),
                ", il ne nous reste qu",
                "&#39;",
                "à calculer ",
                W({
                  elem: "code",
                  children: ["z"]}),
                ".\nUn peu de trigonométrie nous mène à la fonction suivante que l",
                "&#39;",
                "on va mettre dans un fragment shader :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec3"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getSphericalVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["phi"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["asin"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
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
                      children: ["radius"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["phi"]}),
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
                      children: ["theta"]}),
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
                      children: ["x"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!="]}),
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
                      attr: {"class": "identifier"},
                      children: ["theta"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["asin"]}),
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
                      children: ["/"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["radius"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["float"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["zz"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["theta"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["vec3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["zz"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Si on voulait juste mettre une couleur différente sur chaque hémisphère, il suffit de faire un produit scalaire de ce point avec le vecteur directeur de la sphère. Si le résultat est positif, on est dans l",
                "&#39;",
                "hémisphère du haut, sinon, on est dans celle du bas."]}),
          W({
              elem: "p",
              children: [W('wdg.showhide128','wdg.showhide',{
                  value: "false",
                  label: "Le fragment shader pour les rayures",
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
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["BLACK"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
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
                          children: ["vec3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["1"]}),
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
                          children: [");"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ORANGE"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["BLUE"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["866666667"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["LIGHT"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["normalize"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vec3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["));"]}),
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
                          children: ["varAxis"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Si on fait face à un point de coordonnées (x,y) dans un cercle 2D."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// On peut imaginer qu'il s'agit en fait d'un point (x,y,zz) dans une demi-sphère."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Cette fonction retourne les coordonnées (x,y,zz) à partir du point (x,y)."]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["getSphericalVector"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["phi"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["asin"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
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
                          children: ["radius"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["phi"]}),
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
                          children: ["theta"]}),
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
                          children: ["x"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["!="]}),
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
                          attr: {"class": "identifier"},
                          children: ["theta"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["asin"]}),
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
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["radius"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["zz"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["theta"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["vec3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          attr: {"class": "operator"},
                          children: ["-"]}),
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
                          children: ["zz"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                          children: ["2.0"]}),
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
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
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
                          children: ["1.0"]}),
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
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
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
                          attr: {"class": "identifier"},
                          children: ["BLUE"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vec3"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["arrow"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["getSphericalVector"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          attr: {"class": "function"},
                          children: ["dot"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["arrow"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varAxis"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["),"]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["35"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
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
                        "\n    ",
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
                          attr: {"class": "identifier"},
                          children: ["ORANGE"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n  ",
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
                          children: ["85"]}),
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
                          children: ["// Liseré noir extérieur."]}),
                        "\n    ",
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
                          attr: {"class": "identifier"},
                          children: ["BLACK"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["light"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["arrow"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["LIGHT"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["light"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.43"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                          children: ["light"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.95"]}),
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
                        "    \n    ",
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
                          children: ["mix"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["WHITE"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["75"]}),
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
                          children: ["light"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.75"]}),
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
                        "    \n    ",
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
                          children: ["mix"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["WHITE"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " .",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5"]}),
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
                        "\n  \n  ",
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
                          children: ["color"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide128"})]})]},{"id":"wdg.article124"})

    }
);
<<<<<<< HEAD
require("$",function(r,n,t){t.config={name:'"webgl-experiments"',description:'"WebGL study by tutorials"',author:'"tolokoban"',version:'"0.0.107"',major:"0",minor:"0",revision:"107",date:"2018-09-20T17:01:25.000Z",consts:{}};var o=null;t.lang=function(r){return void 0===r&&(window.localStorage&&(r=window.localStorage.getItem("Language")),r||(r=window.navigator.language)||(r=window.navigator.browserLanguage)||(r="fr"),r=r.substr(0,2).toLowerCase()),o=r,window.localStorage&&window.localStorage.setItem("Language",r),r},t.intl=function(r,n){var o,e,a,i,g,u,l,s=r[t.lang()],w=n[0];for(l in r)break;if(!l)return w;if(!s&&!(s=r[l]))return w;if(o=s[w],o||(s=r[l],o=s[w]),!o)return w;if(n.length>1){for(e="",g=0,a=0;a<o.length;a++)i=o.charAt(a),"$"===i?(e+=o.substring(g,a),a++,u=o.charCodeAt(a)-48,u<0||u>=n.length?e+="$"+o.charAt(a):e+=n[u],g=a+1):"\\"===i&&(e+=o.substring(g,a),a++,e+=o.charAt(a),g=a+1);e+=o.substr(g),o=e}return o}});
=======
require("$",function(r,n,t){t.config={name:'"webgl-experiments"',description:'"WebGL study by tutorials"',author:'"tolokoban"',version:'"0.0.110"',major:"0",minor:"0",revision:"110",date:"2018-09-19T20:35:15.000Z",consts:{}};var o=null;t.lang=function(r){return void 0===r&&(window.localStorage&&(r=window.localStorage.getItem("Language")),r||(r=window.navigator.language)||(r=window.navigator.browserLanguage)||(r="fr"),r=r.substr(0,2).toLowerCase()),o=r,window.localStorage&&window.localStorage.setItem("Language",r),r},t.intl=function(r,n){var o,e,a,i,g,u,l,s=r[t.lang()],w=n[0];for(l in r)break;if(!l)return w;if(!s&&!(s=r[l]))return w;if(o=s[w],o||(s=r[l],o=s[w]),!o)return w;if(n.length>1){for(e="",g=0,a=0;a<o.length;a++)i=o.charAt(a),"$"===i?(e+=o.substring(g,a),a++,u=o.charCodeAt(a)-48,u<0||u>=n.length?e+="$"+o.charAt(a):e+=n[u],g=a+1):"\\"===i&&(e+=o.substring(g,a),a++,e+=o.charAt(a),g=a+1);e+=o.substr(g),o=e}return o}});
>>>>>>> 26ae07ae43a3ac603b0e470fcd13ee7b8e0fd92a
//# sourceMappingURL=$.js.map
require("assets",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{},fr:{}},e=n("$").intl;return r.all=t,r}();r.exports._=e});
//# sourceMappingURL=assets.js.map
require("wdg.article",function(e,t,n){function a(e){var t,n,a=o.tag("nav","thm-ele8","thm-bgPL");for(t in i)n=i[t],"$"===t.charAt(0)?o.add(a,o.tag("h1",[n])):t==e?o.add(a,o.tag("div","thm-ele1",[n])):o.add(a,o.tag("a",[n],{href:t+".html"}));return a}var r=function(){function t(){return a(n,arguments)}var n={en:{},fr:{}},a=e("$").intl;return t.all=n,t}(),i={$1:"Les bases",intro:"Introduction",index:"Comprendre WebGL",index2:"Comprendre WebGL (2)",chap1:"Dessiner un carré",chap2:"Dessiner un polygône",chap3:"Textures procédurales",chap4:"Textures animées",chap5:"Utiliser des images",chap6:"Un point c'est tout","chap6-2":"La semi-transparence",transparence:"La semi-transparence (2)",chap7:"Particules",chap8:"Frame Buffer",deform:"Déformation",deform2:"Déformation (2)",$2:"La troisième dimension",interpolation:"Interpolation des varyings",$666:"Annexes",doc:"Documentations"};e("theme");var o=e("dom"),s=e("tfw.data-binding"),c=e("tfw.view.icon"),d=function(t){var n=e("tfw.url-args").parse();o.addClass(document.body,"thm-bg0");var r=window.location.pathname.split("/").pop();r=r.substr(0,r.length-5),"string"!=typeof t.title&&(t.title=r);var i=o.tag("header","thm-ele12","thm-bgP",[o.tag("a",{href:"index.html#"+n.id},[new c({size:"1.5rem",content:"menu"})]),t.title]),d=(a(r),o.tag("article","thm-bg1"));o.elem(this,"div","article",[d,i]);s.prop(this,"content")(function(e){o.clear(d),Array.isArray(e)||(e=[e]),e.forEach(function(e){o.add(d,e)})}),t=s.extend({content:[]},t,this)};t.exports=d;t.exports._=r});
//# sourceMappingURL=wdg.article.js.map
require("tfw.url-args",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{},fr:{}},e=n("$").intl;return r.all=t,r}();t.parse=function(){var n,r,t={},e=location.search;if(e.length<2)return t;for(e=e.substring(1).split("&"),n=0;n<e.length;n++)r=e[n].split("="),1==r.length?t[""]=decodeURIComponent(r[0]):t[r[0]]=decodeURIComponent(r[1]);return t},t.stringify=function(n){},r.exports._=e});
//# sourceMappingURL=tfw.url-args.js.map
require("tfw.view.icon",function(n,e,t){function o(n){try{if("string"==typeof n&&(n=p.iconsBook[n]),this._content=i.call(this,n),!this._content)return;u.clear(this,this._content.svgRootGroup),[0,1,2,3,4,5,6,7].forEach(function(n){s.call(this,n,this["pen"+n])},this),this.$.style.display=""}catch(n){this.$.style.display="none",""!=this.content&&(this.content="")}}function i(n){var e=(u.svg("g",{"stroke-width":6,fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}),[[],[],[],[],[],[],[],[]]),t=[[],[],[],[],[],[],[],[]],o=r(this.$,e,t,n);return o?(u.att(o,{"stroke-width":6,fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}),{svgRootGroup:o,elementsToFillPerColor:e,elementsToStrokePerColor:t}):null}function r(n,e,t,o){if("string"==typeof o)return u.add(n,o);if(!a(o))return null;var i=o[0],s=u.svg(i);return o.forEach(function(n,o){0!==o&&(Array.isArray(n)?n.forEach(r.bind(null,s,e,t)):c(s,e,t,n))}),u.add(n,s),s}function c(n,e,t,o){var i,r,c,a;for(i in o)r=o[i],"fill"===i||"stroke"===i?(c=parseInt(r),isNaN(c)?u.att(n,i,r):(a="fill"===i?e:t,c=h(c,0,a.length-1),a[c].push(n))):u.att(n,i,r)}function a(n){if(void 0===n)return!1;if(!Array.isArray(n))throw"Definition of SVG elements must be arrays!\n"+JSON.stringify(n);var e=n[0];if("string"!=typeof e)throw"The first item of a SVG element must be a string!\n"+e;return!0}function s(n,e){void 0===e&&(e="0");var t=this._content.elementsToFillPerColor[n];Array.isArray(t)||(t=[]);var o=this._content.elementsToStrokePerColor[n];Array.isArray(o)||(o=[]),l(t,o,e)}function l(n,e,t){f("fill",n,v,t),f("stroke",e,m,t)}function f(n,e,t,o){var i=t[o];e.forEach(function(n){Object.values(t).forEach(function(e){u.removeClass(n,e)})}),void 0===i?e.forEach(function(e){u.att(e,n,o)}):e.forEach(function(e){u.addClass(e,i),u.removeAtt(e,n)})}function h(n,e,t){return n<e?e:n>t?t:n}var d=function(){function e(){return o(t,arguments)}var t={en:{},fr:{}},o=n("$").intl;return e.all=t,e}();n("polyfill.object.values");var u=n("dom"),p=n("tfw.icons"),g={onContentChanged:o,onPen0Changed:function(n){s.call(this,0,n)},onPen1Changed:function(n){s.call(this,1,n)},onPen2Changed:function(n){s.call(this,2,n)},onPen3Changed:function(n){s.call(this,3,n)},onPen4Changed:function(n){s.call(this,4,n)},onPen5Changed:function(n){s.call(this,5,n)},onPen6Changed:function(n){s.call(this,6,n)},onPen7Changed:function(n){s.call(this,7,n)}},v={0:"thm-svg-fill0",1:"thm-svg-fill1",P:"thm-svg-fill-P",PL:"thm-svg-fill-PL",PD:"thm-svg-fill-PD",S:"thm-svg-fill-S",SL:"thm-svg-fill-SL",SD:"thm-svg-fill-SD"},m={0:"thm-svg-stroke0",1:"thm-svg-stroke1",P:"thm-svg-stroke-P",PL:"thm-svg-stroke-PL",PD:"thm-svg-stroke-PD",S:"thm-svg-stroke-S",SL:"thm-svg-stroke-SL",SD:"thm-svg-stroke-SD"};try{e.exports=function(){function e(n,e,t){return void 0===n[e]?t:n[e]}function t(n,e,t){t?i.removeClass(n,e):i.addClass(n,e)}function o(n,e,t){t?i.addClass(n,e):i.removeClass(n,e)}var i=n("dom"),r=n("tfw.binding.property-manager"),c=n("tfw.view").Tag,a=n("tfw.binding.link"),s=n("tfw.view"),l=n("tfw.binding.converters");s.ensureCodeBehind(g,"onContentChanged","onPen0Changed","onPen1Changed","onPen2Changed","onPen3Changed","onPen4Changed","onPen6Changed","onPen7Changed");var f=l.get("boolean"),h=l.get("unit"),d=l.get("string");return function(n){try{void 0===n&&(n={}),this.$elements={};var s=this,l=r(this);l.create("visible",{cast:f}),l.create("content"),l.create("size",{cast:h}),l.create("animate",{cast:f}),l.create("flipH",{cast:f}),l.create("flipV",{cast:f}),l.create("pen0",{cast:d}),l.create("pen1",{cast:d}),l.create("pen2",{cast:d}),l.create("pen3",{cast:d}),l.create("pen4",{cast:d}),l.create("pen5",{cast:d}),l.create("pen6",{cast:d}),l.create("pen7",{cast:d});var u=new c("SVG",["class","width","height","viewBox","preserveAspectRatio"]);Object.defineProperty(this,"$",{value:u.$,writable:!1,enumerable:!1,configurable:!1}),new a({A:{obj:s,name:"visible"},B:{action:function(n){t(u,"hide",n)}},name:"visible > undefined"}),new a({A:{obj:s,name:"animate"},B:{action:function(n){o(u,"animate",n)}},name:"animate > undefined"}),new a({A:{obj:s,name:"flipH"},B:{action:function(n){o(u,"flipH",n)}},name:"flip-h > undefined"}),new a({A:{obj:s,name:"flipV"},B:{action:function(n){o(u,"flipV",n)}},name:"flip-v > undefined"}),l.on("content",function(n){try{g.onContentChanged.call(s,n)}catch(n){console.error('Exception in function behind "onContentChanged" of module "mod/tfw.view.icon.js" for attribute "content"!  '),console.error(n)}}),l.on("pen0",function(n){try{g.onPen0Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen0Changed" of module "mod/tfw.view.icon.js" for attribute "pen0"!  '),console.error(n)}}),l.on("pen1",function(n){try{g.onPen1Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen1Changed" of module "mod/tfw.view.icon.js" for attribute "pen1"!  '),console.error(n)}}),l.on("pen2",function(n){try{g.onPen2Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen2Changed" of module "mod/tfw.view.icon.js" for attribute "pen2"!  '),console.error(n)}}),l.on("pen3",function(n){try{g.onPen3Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen3Changed" of module "mod/tfw.view.icon.js" for attribute "pen3"!  '),console.error(n)}}),l.on("pen4",function(n){try{g.onPen3Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen3Changed" of module "mod/tfw.view.icon.js" for attribute "pen4"!  '),console.error(n)}}),l.on("pen5",function(n){try{g.onPen4Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen4Changed" of module "mod/tfw.view.icon.js" for attribute "pen5"!  '),console.error(n)}}),l.on("pen6",function(n){try{g.onPen6Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen6Changed" of module "mod/tfw.view.icon.js" for attribute "pen6"!  '),console.error(n)}}),l.on("pen7",function(n){try{g.onPen7Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen7Changed" of module "mod/tfw.view.icon.js" for attribute "pen7"!  '),console.error(n)}}),l.on("size",function(n){u.$.style.width=n}),l.on("size",function(n){u.$.style.height=n}),u.class="tfw-view-icon",u.width="100%",u.height="100%",u.viewBox="-65 -65 130 130",u.preserveAspectRatio="xMidYMid meet",this.visible=e(n,"visible",!0),this.content=e(n,"content","ok"),this.size=e(n,"size",28),this.animate=e(n,"animate",!1),this.flipH=e(n,"flipH",!1),this.flipV=e(n,"flipV",!1),this.pen0=e(n,"pen0",0),this.pen1=e(n,"pen1",1),this.pen2=e(n,"pen2","P"),this.pen3=e(n,"pen3","PD"),this.pen4=e(n,"pen4","PL"),this.pen5=e(n,"pen5","S"),this.pen6=e(n,"pen6","SD"),this.pen7=e(n,"pen7","SL"),i.addClass(this,"view","custom")}catch(n){throw console.error("mod/tfw.view.icon.js",n),Error('Instantiation error in XJS of "mod/tfw.view.icon.js":\n'+n)}}}()}catch(n){throw Error('Definition error in XJS of "mod/tfw.view.icon.js"\n'+n)}e.exports._=d});
//# sourceMappingURL=tfw.view.icon.js.map
require("tfw.binding.converters",function(r,n,t){function e(r){if("number"==typeof r)return r+"px";if("string"!=typeof r)return"0";if("auto"===(r=(""+r).trim().toLowerCase())||"inherit"===r)return r;var n=M.exec(r);if(!n)return"0";var t=parseFloat(n[1]);if(isNaN(t)||0==t)return"0";var e=n[2];return e.length<1&&(e="px"),t+e}function i(r){switch(typeof r){case"string":if(0===r.trim().length)return S;var n=new RegExp(r);return function(r){return n.test(r)};case"function":return function(n){return s(r(n))}}return S}function u(r){return Array.isArray(r)?r.map(e):[]}function o(r){switch(typeof r){case"string":return"true"===r.trim().toLowerCase();case"number":return 0!==r;default:return!!r}}function f(r){if(!r)return[];var n=[];for(var t in r)n.push(t);return n}function a(r){return f(r).sort()}function s(r){return Array.isArray(r)?r.map(o):[]}function c(r){return"string"!=typeof r?"#000":k.instance.parse(r)?k.instance.stringify():"#000"}function l(r){return!o(r)}function y(r){return j.isList(r)?r.slice():Array.isArray(r)?r:[r]}function p(r){return r&&"number"==typeof r.length?r.length:0}function g(r){return!r||("string"==typeof r?0===r.trim().length:"number"==typeof r.length&&0===r.length)}function v(r){return!g(r)}function m(r){return Array.isArray(r)?r.map(function(r){return""+r}):[]}function h(r){return null===r||void 0===r?"":"object"==typeof r?Array.isArray(r)?JSON.stringify(r):d(r):""+r}function A(r){if(!Array.isArray(r)&&"object"!=typeof r){var n={};return n[F.lang()]=""+r,n}return r}function d(r){if("string"==typeof r)return r;if(void 0===r)return"";if(null===r)return"";var n=r[F.lang()];if(!n)for(var t in r){n=r[t];break}return"string"!=typeof n?"":n}function b(r){return j.isList(r)?r:new j(y(r))}function w(r){return"number"==typeof r?function(n){var t=parseInt(n);return isNaN(t)?r:t}:parseInt}function x(r){return"number"==typeof r?function(n){var t=parseFloat(n);return isNaN(t)?r:t}:parseFloat}function N(r){r=y(r);var n=r.map(function(r){return r.toLowerCase()});return function(t){var e=Math.max(0,n.indexOf((""+t).toLowerCase()));return r[e]}}function O(r){return r instanceof Date?r:"number"==typeof r?L(r):"string"==typeof r?C(r):null}function L(r){return new Date(r)}function C(r){for(var n=0,t=0,e=0,i=0,u=0,o=r.length,f=0;u<o&&-1===$.indexOf(r.charAt(u));)u++;for(f=0;u<o&&f<2&&-1!==(i=$.indexOf(r.charAt(u)));)n=10*n+i,u++,f++;for(;u<o&&-1===$.indexOf(r.charAt(u));)u++;for(f=0;u<o&&f<2&&-1!==(i=$.indexOf(r.charAt(u)));)t=10*t+i,f++,u++;for(;u<o&&-1===$.indexOf(r.charAt(u));)u++;for(f=0;u<o&&f<2&&-1!==(i=$.indexOf(r.charAt(u)));)e=10*e+i,u++,f++;var a=new Date(0);return a.setHours(n),a.setMinutes(t),a.setSeconds(e),a}function D(r){if(r instanceof Date)return r}var E=function(){function n(){return e(t,arguments)}var t={en:{},fr:{}},e=r("$").intl;return n.all=t,n}(),F=r("$"),j=r("tfw.binding.list"),k=r("tfw.color"),I={array:y,boolean:o,booleans:s,color:c,date:D,enum:N,float:x,integer:w,intl:d,isEmpty:g,isNotEmpty:v,keys:f,length:p,list:b,multilang:A,not:l,sortedKeys:a,string:h,strings:m,time:O,unit:e,units:u,validator:i};t.get=function(r){return I[r]},t.set=function(r,n){"function"==typeof n?I[r]=n:delete I[r]};var M=/^(-?[.0-9]+)[ \n\r]*([a-z%]*)/,S=function(){return!0},$="0123456789";n.exports._=E});
//# sourceMappingURL=tfw.binding.converters.js.map
require("tfw.color",function(t,s,r){function n(t){this.R=0,this.G=0,this.B=0,this.A=0,this.H=0,this.S=0,this.L=0,"string"==typeof t&&this.parse(t)}function i(){var t=this.R,s=this.G,r=this.B,n=Math.min(t,s,r),i=Math.max(t,s,r),e=i-n;this.L=.5*(i+n),e<1e-6?(this.H=0,this.S=0):(this.S=e/(1-Math.abs(2*this.L-1)),this.H=i===t?s>=r?w*((s-r)/e):1-w*((r-s)/e):i===s?w*(2+(r-t)/e):w*(4+(t-s)/e))}function e(){var t,s,r,n=6*this.H,i=this.S,e=this.L,a=(1-Math.abs(2*e-1))*i,h=a*(1-Math.abs(n%2-1));n<3?n<1?(t=a,s=h,r=0):n<2?(t=h,s=a,r=0):(t=0,s=a,r=h):n<4?(t=0,s=h,r=a):n<5?(t=h,s=0,r=a):(t=a,s=0,r=h);var u=e-.5*a;this.R=t+u,this.G=s+u,this.B=r+u}function a(){return.2126*this.R+.7152*this.G+.0722*this.B}function h(){var t="#"+I(255*this.R)+I(255*this.G)+I(255*this.B);return this.A<1&&(t+=I(255*this.A)),t}function u(t){"string"!=typeof t&&(t="#000000");var s=t.trim().toUpperCase();return!!p.call(this,s)||(!!c.call(this,s)||(!!o.call(this,s)||!!f.call(this,s)))}function p(t){if("#"!==t.charAt(0))return!1;var s=0,r=0,n=0,i=1;switch(t.length){case 4:s=parseInt(t.charAt(1),16)*S,r=parseInt(t.charAt(2),16)*S,n=parseInt(t.charAt(3),16)*S;break;case 5:s=parseInt(t.charAt(1),16)*S,r=parseInt(t.charAt(2),16)*S,n=parseInt(t.charAt(3),16)*S,i=parseInt(t.charAt(4),16)*S;break;case 7:s=parseInt(t.substr(1,2),16)*L,r=parseInt(t.substr(3,2),16)*L,n=parseInt(t.substr(5,2),16)*L;break;case 9:s=parseInt(t.substr(1,2),16)*L,r=parseInt(t.substr(3,2),16)*L,n=parseInt(t.substr(5,2),16)*L,i=parseInt(t.substr(7,2),16)*L}return isNaN(s)||isNaN(r)||isNaN(n)||isNaN(i)?this.R=this.G=this.B=this.A=0:(this.R=s,this.G=r,this.B=n,this.A=i),!0}function c(t){var s=m.exec(t);return!!s&&(this.R=B(parseInt(s[1])*L),this.G=B(parseInt(s[2])*L),this.B=B(parseInt(s[3])*L),this.A=1,!0)}function o(t){var s=x.exec(t);return!!s&&(this.R=B(parseInt(s[1])*L),this.G=B(parseInt(s[2])*L),this.B=B(parseInt(s[3])*L),this.A=B(parseFloat(s[4])),!0)}function f(t){var s=M.exec(t);return!!s&&(this.H=B(parseInt(s[1])*N),this.S=B(parseInt(s[2])*H),this.L=B(parseInt(s[3])*H),this.A=1,this.hsl2rgb(),!0)}function I(t){var s=Math.floor(t).toString(16);return s.length<2&&(s="0"+s),s}function l(){var t=new y;return t.R=this.R,t.G=this.G,t.B=this.B,t.A=this.A,t.H=this.H,t.S=this.S,t.L=this.L,t}function A(t,s,r){var n=new y;return n.R=t,n.G=t,n.B=t,n}function v(t,s,r,n){var i=new y;return i.R=t,i.G=t,i.B=t,i.A=t,i}function B(t){return t<0?0:t>1?1:t}function G(t){var s=new y;return s.parse(t),s}function R(t){return G(t).luminance()}var b=function(){function s(){return n(r,arguments)}var r={en:{},fr:{}},n=t("$").intl;return s.all=r,s}(),y=n;y.prototype.luminance=a,y.prototype.stringify=h,y.prototype.parse=u,y.prototype.copy=l,y.prototype.hsl2rgb=e,y.prototype.rgb2hsl=i;var g=new y;y.instance=g,y.parse=G,y.luminance=R,y.newRGB=A,y.newRGBA=v;var w=1/6,S=1/15,H=1/99,L=1/255,N=1/359,m=/^RGB[\s\(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/,x=/^RGBA[\s\(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9\.]+([0-9\.]+)/,M=/^HSL[\s\(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/;s.exports=y,s.exports._=b});
//# sourceMappingURL=tfw.color.js.map
require("tfw.binding.list",function(r,t,e){function i(r,t){if(r.length<2)return!0;for(var e,i=r[0],n=1;n<r.length;n++){if(e=r[n],t(i,e)>0)return!1;i=e}return!0}function n(r){return!!r&&"number"==typeof r[u]}function o(r,t,e){Object.defineProperty(r,t,{value:e,writable:!1,configurable:!1,enumerable:!0})}var s=function(){function t(){return i(e,arguments)}var e={en:{},fr:{}},i=r("$").intl;return t.all=e,t}(),a=r("tfw.binding.property-manager"),f=r("tfw.listeners"),u="__tfw.binding.list__",h=1,p=function(r){o(this,u,h++),o(this,"_listeners",new f),o(this,"_links",[]),o(this,"isContentChangeAware",!0),Array.isArray(r)?o(this,"_array",r):n(r)?(o(this,"_array",r._array),this.link(r)):o(this,"_array",[r])};t.exports=p,p.isList=n,p.prototype.fire=function(r,t,e){var i=this[u];Array.isArray(e)?-1===e.indexOf(i)&&e.push(i):e=[i],this._listeners.fire(r,t,e),this._links.forEach(function(i){e.indexOf(i[u])>-1||i.fire(r,t,e)});var n=a.getProperties(this);Array.isArray(n)&&n.forEach(function(r){r.manager.fire(r.name)})},p.prototype.addListener=function(r){this._listeners.add(r)},p.prototype.removeListener=function(r){this._listeners.remove(r)},p.prototype.link=function(r){if(!n(r))throw console.error("Argument: ",r),Error("[tfw.binding.list.link] Argument must be a tfw.binding.list object!");-1===this._links.indexOf(r)&&(this._links.push(r),r.link(this))},p.prototype.unlink=function(r){var t=this._links.indexOf(r);-1!==t&&(this._links.splice(t,1),r.unlink(this))},p.prototype.get=function(r){return this._array[r]},p.prototype.put=function(r,t){var e=this._array[r];return e!==t&&(this._array[r]=t,this.fire("put",{index:r,oldValue:e,newValue:t}),!0)},p.prototype.remove=function(r){var t=this._array.indexOf(r);return-1!==t&&(this._array.splice(t,1),this.fire("remove",{elem:r,index:t}),!0)},p.prototype.removeAt=function(r){var t=this._array[r];return this._array.splice(r,1),this.fire("remove",{elem:t,index:r}),!0},p.prototype.mapInPlace=function(r){var t=this;return this._Array.forEach(function(e,i){var n=r(e);t.put(i,n)}),this};var l=function(r,t){return r==t?0:r<t?-1:1};p.prototype.sort=function(r){return"function"!=typeof r&&(r=l),i(this._array,r)?this:(this._array.sort(r),this.fire("sort",r),this)},["push","pop","shift","unshift","splice","reverse"].forEach(function(r){p.prototype[r]=function(){var t=Array.prototype.slice.call(arguments),e=Array.prototype[r].apply(this._array,t);return this.fire(r,t),e}}),["slice","forEach","filter","map","reduce","indexOf","lastIndexOf"].forEach(function(r){p.prototype[r]=function(){var t=Array.prototype.slice.call(arguments);return Array.prototype[r].apply(this._array,t)}}),Object.defineProperty(p.prototype,"length",{get:function(){return this._array.length},set:function(r){this._array.length=r,this.fire("length",r)},configurable:!1,enumerable:!0}),t.exports._=s});
//# sourceMappingURL=tfw.binding.list.js.map
require("tfw.listeners",function(t,r,i){var n=function(){function r(){return n(i,arguments)}var i={en:{}},n=t("$").intl;return r.all=i,r}(),e=function(){this._list=[]};e.prototype.add=function(t,r){if("function"!=typeof t)return!1;this.remove(t);for(var i=0;i<this._list.length;i++)if(t===this._list[i])return!1;return this._list.push([t,r]),!0},e.prototype.remove=function(t,r){if("function"!=typeof t)return!1;for(var i=0;i<this._list.length;i++){var n=this._list[i];if(t===n[0]&&r===n[1])return this._list.splice(i,1),!0}return!1},e.prototype.clear=function(){this._list=[]},e.prototype.fire=function(){var t,r,i,n,e=Array.prototype.slice.call(arguments);for(t=0;t<this._list.length;t++)if(n=this._list[t],r=n[0],i=n[1],!1===r.apply(i,e))return!1;return!0},r.exports=e,r.exports._=n});
//# sourceMappingURL=tfw.listeners.js.map
require("tfw.binding.property-manager",function(t,e,r){function n(t){Object.defineProperty(this,"id",{value:_++,writable:!1,configurable:!1,enumerable:!0}),this.name=this.id,this._props={},this._container=t}function i(t){void 0===t&&l("Argument `container` is mandatory!");var e=t[w];return e||(e=new n(t),t[w]=e),e}function o(t,e){return void 0!==t[w]&&("string"!=typeof e||void 0!==t[w]._props[e])}function a(t){return void 0===t[w]?[]:Object.keys(t[w]._props)}function u(t){var e=t[A];return Array.isArray(e)?e:null}function f(t,e){var r=this,n={value:void 0,event:new b,filter:g(e.filter),converter:g(e.converter),delay:d(e.delay),action:null,alwaysFired:!!e.alwaysFired,manager:this,name:t,timeout:0};return n.get=c(n,e),n.set=s(n,e,r,t),this._props[t]=n,void 0!==e.init&&n.set(e.init),Object.defineProperty(this._container,t,{get:n.get.bind(n),set:r.change.bind(r,t),enumerable:!0,configurable:!1}),n}function c(t,e){return"function"==typeof e.get?function(r){var n=e.get(r);return p(t,n),n}:function(e){return t.value}}function s(t,e,r,n){return"function"==typeof e.cast?"function"==typeof e.set?function(n){v(t,t.get());var i=e.cast(n,r);p(t,t.value),e.set(i)}:function(n){v(t,t.get()),t.value=e.cast(n,r),p(t,t.value)}:"function"==typeof e.set?e.set:function(e){v(t,t.get()),t.value=e,p(t,t.value)}}function p(t,e){if(void 0!==e&&null!==e&&!0===e.isContentChangeAware){var r=e[A];Array.isArray(r)?-1===r.indexOf(t)&&r.push(t):r=[t],e[A]=r}}function v(t,e){if(void 0!==e&&null!==e&&!0===e.isContentChangeAware){var r=e[A];if(Array.isArray(r)){var n=r.indexOf(t);-1!==n&&r.splice(n,1)}}}function y(t,e){t.delay?(clearTimeout(t.timeout),t.timeout=setTimeout(e,t.delay)):e()}function l(t,e){throw e=void 0===e?"":"::"+e,Error("[tfw.binding.property-manager"+e+"] "+t)}function d(t){return"number"!=typeof t?0:isNaN(t)?0:Math.max(0,Math.floor(t))}function g(t){if("function"==typeof t)return t}function h(t,e){return t!==e}var m=function(){function e(){return n(r,arguments)}var r={en:{},fr:{}},n=t("$").intl;return e.all=r,e}();e.exports=i,e.exports.isLinkable=o,e.exports.getAllAttributesNames=a,e.exports.getProperties=u;var b=t("tfw.event"),_=0,w="__tfw.property-manager__",A="__tfw.binding.property-manager__";n.prototype.set=function(t,e){this.create(t).set(e)},n.prototype.isLinkable=function(t){var e=this._container;return!!e&&(void 0!==e[w]&&void 0!==e[w]._props[t])},n.prototype.get=function(t){return this.create(t).get()},n.prototype.propertyId=function(t){return this.create(t).id},n.prototype.fire=function(t,e){var r=this.create(t);r.event.fire(r.get(),t,this._container,e)},n.prototype.change=function(t,e,r){void 0===r&&(r=[]);var n=this.create(t),i=n.converter;"function"==typeof i&&(e=i(e));var o=n.get();if(n.alwaysFired||h(e,o)){n.set(e);var a=this;y(n,function(){a.fire(t,r)})}},n.prototype.converter=function(t,e){var r=this.create(t);if("function"==typeof e)r.converter=e;else if(void 0!==e)throw Error("[tfw.binding.property-manager::converter] `converter` must be of type function or undefined!");return r.converter},n.prototype.delay=function(t,e){var r=this.create(t);if(e=parseFloat(e),isNaN(e))return r.delay;r.delay=e},n.prototype.on=function(t,e){this.create(t).event.add(e)},n.prototype.off=function(t,e){this.create(t).event.remove(e)},n.prototype.create=function(t,e){"string"!=typeof t&&l("propertyName must be a string!");var r=this._props[t];return r||(void 0===e&&(e={}),r=f.call(this,t,e)),r},n.prototype.createAction=function(t,e){return void 0===e&&(e={}),e.alwaysFired=!0,this.create(t,e)},e.exports._=m});
//# sourceMappingURL=tfw.binding.property-manager.js.map
require("tfw.event",function(t,r,i){var n=function(){function r(){return n(i,arguments)}var i={en:{},fr:{}},n=t("$").intl;return r.all=i,r}(),e=function(){this._list=[]};e.prototype.add=function(t){if("function"!=typeof t)return!1;this.remove(t);for(var r=0;r<this._list.length;r++)if(t===this._list)return!1;return this._list.push(t),!0},e.prototype.remove=function(t){if("function"!=typeof t)return!1;for(var r=0;r<this._list.length;r++){if(t===this._list)return this._list.splice(r,1),!0}return!1},e.prototype.clear=function(){this._list=[]},e.prototype.fire=function(){var t,r,i=Array.prototype.slice.call(arguments);for(t=0;t<this._list.length;t++)if(r=this._list[t],!1===r.apply(r,i))return!1;return!0},r.exports=e,r.exports._=n});
//# sourceMappingURL=tfw.event.js.map
require("tfw.view",function(t,e,n){function a(t,e){t=t.trim().toLowerCase();var n="svg"===t?y.svgRoot():r(t);if(Object.defineProperty(this,"$",{value:n,writable:!1,enumerable:!0,configurable:!1}),Array.isArray(e)){var a=this;e.forEach(function(t){switch(t.toLowerCase()){case"value":i.call(a,n);break;case"focus":o.call(a,n);break;case"textcontent":s.call(a,n);break;case"innerhtml":c.call(a,n);break;default:f.call(a,n,t)}})}}function r(t){return-1!==E.indexOf(t.toLowerCase())?y.svg(t):y.tag(t)}function i(t){var e=this,n=null;m(this).create("value",{get:function(){return n},set:function(e){t.value=e,n=e}}),t.addEventListener("input",function(t){m(e).change("value",t.target.value)},!1)}function o(t){var e=this;m(this).create("focus",{cast:C.get("boolean")(),delay:1}),m(this).on("focus",function(e){e?t.focus():t.blur()}),t.addEventListener("focus",function(){e.focus=!0},!1),t.addEventListener("blur",function(){e.focus=!1},!1)}function s(t){["textContent","textcontent"].forEach(function(e){m(this).create(e,{get:function(){return t.textContent},set:function(e){"string"!=typeof e&&(e=""+e),"<html>"===e.substr(0,6)?t.innerHTML=e.substr(6):t.textContent=e}})},this)}function c(t){["innerHTML","innerhtml"].forEach(function(e){m(this).create(e,{get:function(){return t.innerHTML},set:function(e){t.innerHTML=e}})},this)}function f(t,e){m(this).create(e,{get:function(){return t.getAttribute(e)},set:function(n){t.setAttribute(e,n)}})}function u(t){if(void 0===t)throw"Missing mandatory global variable CODE_BEHIND!";var e,n;for(e=1;e<arguments.length;e++)if(n=arguments[e],"function"!=typeof t[n])throw"Expected CODE_BEHIND."+n+" to be a function!"}function l(t,e){var n=y(t),a={},r=0;if(Object.keys(e).forEach(function(t){t=t.toLowerCase();var i=e[t];A.indexOf(t)>-1?(a[t]=i,r=!0):n.addEventListener(t,i,!1)}),r){var i=new w(n);Object.keys(a).forEach(function(t){var n=e[t];i.on(t,n)})}}function d(t,e,n){var a,r;for(a in n)r=n[a],void 0===e[a]?t[a]=r:t[a]=e[a]}function p(t,e,n){n?y.addClass(t,e):y.removeClass(t,e)}function h(t,e,n){n?y.removeClass(t,e):y.addClass(t,e)}function v(t,e,n){n?y.att(t,e):y.removeAtt(t,e)}function b(t,e,n){n?y.removeAtt(t,e):y.att(t,e)}var g=function(){function e(){return a(n,arguments)}var n={en:{},fr:{}},a=t("$").intl;return e.all=n,e}(),y=t("dom"),m=t("tfw.binding.property-manager"),w=t("external.hammer"),C=t("tfw.binding.converters");n.Tag=a,n.ensureCodeBehind=u,n.events=l,n.defVal=d,n.addClassIfTrue=p,n.addClassIfFalse=h,n.addAttribIfTrue=v,n.addAttribIfFalse=b,a.prototype.applyClass=function(t,e){var n=this.$;void 0===e&&(e=0),void 0===this._applyer&&(this._applyer={}),Array.isArray(t)||(t=[t]);var a=this._applyer[e];Array.isArray(a)&&a.forEach(y.removeClass.bind(y,n)),this._applyer[e]=t,t.forEach(y.addClass.bind(y,n))};var E=["g","rect","circle","line","path","defs"],A=["tap","doubletap","press","pan","panstart","panmove","panup","pandown","panleft","panright","panend","pancancel","swipe","swipeleft","swipteright","swipetop","swipebottom","pinch","pinchin","pinchout","pinchstart","pinchmove","pinchend","pinchcancel","rotate","rotatestart","rotatemove","rotateend","rotatecancel"];e.exports._=g});
//# sourceMappingURL=tfw.view.js.map
require("external.hammer",function(t,e,n){var i=function(){function e(){return i(n,arguments)}var n={en:{},fr:{}},i=t("$").intl;return e.all=n,e}();!function(t,n,i,r){"use strict";function s(t,e,n){return setTimeout(c(t,n),e)}function o(t,e,n){return!!Array.isArray(t)&&(a(t,n[e],n),!0)}function a(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==r)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function u(e,n,i){var r="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=t.console&&(t.console.warn||t.console.log);return s&&s.call(t.console,r,i),e.apply(this,arguments)}}function h(t,e,n){var i,r=e.prototype;i=t.prototype=Object.create(r),i.constructor=t,i._super=r,n&&lt(i,n)}function c(t,e){return function(){return t.apply(e,arguments)}}function l(t,e){return typeof t==vt?t.apply(e?e[0]||r:r,e):t}function p(t,e){return t===r?e:t}function f(t,e,n){a(g(e),function(e){t.addEventListener(e,n,!1)})}function v(t,e,n){a(g(e),function(e){t.removeEventListener(e,n,!1)})}function d(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function g(t){return t.trim().split(/\s+/g)}function T(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function y(t){return Array.prototype.slice.call(t,0)}function E(t,e,n){for(var i=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];T(r,o)<0&&i.push(t[s]),r[s]=o,s++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function I(t,e){for(var n,i,s=e[0].toUpperCase()+e.slice(1),o=0;o<pt.length;){if(n=pt[o],(i=n?n+s:e)in t)return i;o++}return r}function A(){return Et++}function _(e){var n=e.ownerDocument||e;return n.defaultView||n.parentWindow||t}function C(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){l(t.options.enable,[t])&&n.handler(e)},this.init()}function S(t){var e=t.options.inputClass;return new(e||(_t?q:Ct?k:At?U:F))(t,b)}function b(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,s=e&bt&&i-r==0,o=e&(xt|Dt)&&i-r==0;n.isFirst=!!s,n.isFinal=!!o,s&&(t.session={}),n.eventType=e,P(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function P(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=w(e)),r>1&&!n.firstMultiple?n.firstMultiple=w(e):1===r&&(n.firstMultiple=!1);var s=n.firstInput,o=n.firstMultiple,a=o?o.center:s.center,u=e.center=O(i);e.timeStamp=gt(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=N(a,u),e.distance=z(a,u),x(n,e),e.offsetDirection=M(e.deltaX,e.deltaY);var h=R(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=h.x,e.overallVelocityY=h.y,e.overallVelocity=mt(h.x)>mt(h.y)?h.x:h.y,e.scale=o?Y(o.pointers,i):1,e.rotation=o?X(o.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,D(n,e);var c=t.element;d(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}function x(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==bt&&s.eventType!==xt||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}function D(t,e){var n,i,s,o,a=t.lastInterval||e,u=e.timeStamp-a.timeStamp;if(e.eventType!=Dt&&(u>St||a.velocity===r)){var h=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,l=R(u,h,c);i=l.x,s=l.y,n=mt(l.x)>mt(l.y)?l.x:l.y,o=M(h,c),t.lastInterval=e}else n=a.velocity,i=a.velocityX,s=a.velocityY,o=a.direction;e.velocity=n,e.velocityX=i,e.velocityY=s,e.direction=o}function w(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:dt(t.pointers[n].clientX),clientY:dt(t.pointers[n].clientY)},n++;return{timeStamp:gt(),pointers:e,center:O(e),deltaX:t.deltaX,deltaY:t.deltaY}}function O(t){var e=t.length;if(1===e)return{x:dt(t[0].clientX),y:dt(t[0].clientY)};for(var n=0,i=0,r=0;r<e;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:dt(n/e),y:dt(i/e)}}function R(t,e,n){return{x:e/t||0,y:n/t||0}}function M(t,e){return t===e?wt:mt(t)>=mt(e)?t<0?Ot:Rt:e<0?Mt:zt}function z(t,e,n){n||(n=Ft);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function N(t,e,n){n||(n=Ft);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}function X(t,e){return N(e[1],e[0],qt)+N(t[1],t[0],qt)}function Y(t,e){return z(e[0],e[1],qt)/z(t[0],t[1],qt)}function F(){this.evEl=Ht,this.evWin=kt,this.pressed=!1,C.apply(this,arguments)}function q(){this.evEl=Vt,this.evWin=jt,C.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function W(){this.evTarget=Zt,this.evWin=Bt,this.started=!1,C.apply(this,arguments)}function H(t,e){var n=y(t.touches),i=y(t.changedTouches);return e&(xt|Dt)&&(n=E(n.concat(i),"identifier",!0)),[n,i]}function k(){this.evTarget=Jt,this.targetIds={},C.apply(this,arguments)}function L(t,e){var n=y(t.touches),i=this.targetIds;if(e&(bt|Pt)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,s,o=y(t.changedTouches),a=[],u=this.target;if(s=n.filter(function(t){return d(t.target,u)}),e===bt)for(r=0;r<s.length;)i[s[r].identifier]=!0,r++;for(r=0;r<o.length;)i[o[r].identifier]&&a.push(o[r]),e&(xt|Dt)&&delete i[o[r].identifier],r++;return a.length?[E(s.concat(a),"identifier",!0),a]:void 0}function U(){C.apply(this,arguments);var t=c(this.handler,this);this.touch=new k(this.manager,t),this.mouse=new F(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function V(t,e){t&bt?(this.primaryTouch=e.changedPointers[0].identifier,j.call(this,e)):t&(xt|Dt)&&j.call(this,e)}function j(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches,r=function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)};setTimeout(r,Kt)}}function G(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],s=Math.abs(e-r.x),o=Math.abs(n-r.y);if(s<=Qt&&o<=Qt)return!0}return!1}function Z(t,e){this.manager=t,this.set(e)}function B(t){if(m(t,re))return re;var e=m(t,se),n=m(t,oe);return e&&n?re:e||n?e?se:oe:m(t,ie)?ie:ne}function $(t){this.options=lt({},this.defaults,t||{}),this.id=A(),this.manager=null,this.options.enable=p(this.options.enable,!0),this.state=ue,this.simultaneous={},this.requireFail=[]}function J(t){return t&fe?"cancel":t&le?"end":t&ce?"move":t&he?"start":""}function K(t){return t==zt?"down":t==Mt?"up":t==Ot?"left":t==Rt?"right":""}function Q(t,e){var n=e.manager;return n?n.get(t):t}function tt(){$.apply(this,arguments)}function et(){tt.apply(this,arguments),this.pX=null,this.pY=null}function nt(){tt.apply(this,arguments)}function it(){$.apply(this,arguments),this._timer=null,this._input=null}function rt(){tt.apply(this,arguments)}function st(){tt.apply(this,arguments)}function ot(){$.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function at(t,e){return e=e||{},e.recognizers=p(e.recognizers,at.defaults.preset),new ut(t,e)}function ut(t,e){this.options=lt({},at.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=S(this),this.touchAction=new Z(this,this.options.touchAction),ht(this,!0),a(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ht(t,e){var n=t.element;if(n.style){var i;a(t.options.cssProps,function(r,s){i=I(n.style,s),e?(t.oldCssProps[i]=n.style[i],n.style[i]=r):n.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={})}}function ct(t,e){var i=n.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}var lt,pt=["","webkit","Moz","MS","ms","o"],ft=n.createElement("div"),vt="function",dt=Math.round,mt=Math.abs,gt=Date.now;lt="function"!=typeof Object.assign?function(t){if(t===r||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==r&&null!==i)for(var s in i)i.hasOwnProperty(s)&&(e[s]=i[s])}return e}:Object.assign;var Tt=u(function(t,e,n){for(var i=Object.keys(e),s=0;s<i.length;)(!n||n&&t[i[s]]===r)&&(t[i[s]]=e[i[s]]),s++;return t},"extend","Use `assign`."),yt=u(function(t,e){return Tt(t,e,!0)},"merge","Use `assign`."),Et=1,It=/mobile|tablet|ip(ad|hone|od)|android/i,At="ontouchstart"in t,_t=I(t,"PointerEvent")!==r,Ct=At&&It.test(navigator.userAgent),St=25,bt=1,Pt=2,xt=4,Dt=8,wt=1,Ot=2,Rt=4,Mt=8,zt=16,Nt=Ot|Rt,Xt=Mt|zt,Yt=Nt|Xt,Ft=["x","y"],qt=["clientX","clientY"];C.prototype={handler:function(){},init:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(_(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&v(this.element,this.evEl,this.domHandler),this.evTarget&&v(this.target,this.evTarget,this.domHandler),this.evWin&&v(_(this.element),this.evWin,this.domHandler)}};var Wt={mousedown:bt,mousemove:Pt,mouseup:xt},Ht="mousedown",kt="mousemove mouseup";h(F,C,{handler:function(t){var e=Wt[t.type];e&bt&&0===t.button&&(this.pressed=!0),e&Pt&&1!==t.which&&(e=xt),this.pressed&&(e&xt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:"mouse",srcEvent:t}))}});var Lt={pointerdown:bt,pointermove:Pt,pointerup:xt,pointercancel:Dt,pointerout:Dt},Ut={2:"touch",3:"pen",4:"mouse",5:"kinect"},Vt="pointerdown",jt="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Vt="MSPointerDown",jt="MSPointerMove MSPointerUp MSPointerCancel"),h(q,C,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=Lt[i],s=Ut[t.pointerType]||t.pointerType,o="touch"==s,a=T(e,t.pointerId,"pointerId");r&bt&&(0===t.button||o)?a<0&&(e.push(t),a=e.length-1):r&(xt|Dt)&&(n=!0),a<0||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var Gt={touchstart:bt,touchmove:Pt,touchend:xt,touchcancel:Dt},Zt="touchstart",Bt="touchstart touchmove touchend touchcancel";h(W,C,{handler:function(t){var e=Gt[t.type];if(e===bt&&(this.started=!0),this.started){var n=H.call(this,t,e);e&(xt|Dt)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}}});var $t={touchstart:bt,touchmove:Pt,touchend:xt,touchcancel:Dt},Jt="touchstart touchmove touchend touchcancel";h(k,C,{handler:function(t){var e=$t[t.type],n=L.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}});var Kt=2500,Qt=25;h(U,C,{handler:function(t,e,n){var i="touch"==n.pointerType,r="mouse"==n.pointerType;if(!(r&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)V.call(this,e,n);else if(r&&G.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var te=I(ft.style,"touchAction"),ee=te!==r,ne="auto",ie="manipulation",re="none",se="pan-x",oe="pan-y",ae=function(){if(!ee)return!1;var e={},n=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){e[i]=!n||t.CSS.supports("touch-action",i)}),e}();Z.prototype={set:function(t){"compute"==t&&(t=this.compute()),ee&&this.manager.element.style&&ae[t]&&(this.manager.element.style[te]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return a(this.manager.recognizers,function(e){l(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),B(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,r=m(i,re)&&!ae[re],s=m(i,oe)&&!ae[oe],o=m(i,se)&&!ae[se];if(r){var a=1===t.pointers.length,u=t.distance<2,h=t.deltaTime<250;if(a&&u&&h)return}return o&&s?void 0:r||s&&n&Nt||o&&n&Xt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ue=1,he=2,ce=4,le=8,pe=le,fe=16;$.prototype={defaults:{},set:function(t){return lt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(o(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=Q(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return o(t,"dropRecognizeWith",this)?this:(t=Q(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(o(t,"requireFailure",this))return this;var e=this.requireFail;return t=Q(t,this),-1===T(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(o(t,"dropRequireFailure",this))return this;t=Q(t,this);var e=T(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;i<le&&e(n.options.event+J(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=le&&e(n.options.event+J(i))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=32},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|ue)))return!1;t++}return!0},recognize:function(t){var e=lt({},t);if(!l(this.options.enable,[this,e]))return this.reset(),void(this.state=32);this.state&(pe|fe|32)&&(this.state=ue),this.state=this.process(e),this.state&(he|ce|le|fe)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},h(tt,$,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(he|ce),r=this.attrTest(t);return i&&(n&Dt||!r)?e|fe:i||r?n&xt?e|le:e&he?e|ce:he:32}}),h(et,tt,{defaults:{event:"pan",threshold:10,pointers:1,direction:Yt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Nt&&e.push(oe),t&Xt&&e.push(se),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&Nt?(r=0===s?wt:s<0?Ot:Rt,n=s!=this.pX,i=Math.abs(t.deltaX)):(r=0===o?wt:o<0?Mt:zt,n=o!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return tt.prototype.attrTest.call(this,t)&&(this.state&he||!(this.state&he)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=K(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),h(nt,tt,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[re]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&he)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),h(it,$,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[ne]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(xt|Dt)&&!r)this.reset();else if(t.eventType&bt)this.reset(),this._timer=s(function(){this.state=pe,this.tryEmit()},e.time,this);else if(t.eventType&xt)return pe;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===pe&&(t&&t.eventType&xt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=gt(),this.manager.emit(this.options.event,this._input)))}}),h(rt,tt,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[re]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&he)}}),h(st,tt,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Nt|Xt,pointers:1},getTouchAction:function(){return et.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Nt|Xt)?e=t.overallVelocity:n&Nt?e=t.overallVelocityX:n&Xt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&mt(e)>this.options.velocity&&t.eventType&xt},emit:function(t){var e=K(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(ot,$,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ie]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&bt&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=xt)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||z(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t;if(0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=s(function(){this.state=pe,this.tryEmit()},e.interval,this),he):pe}return 32},failTimeout:function(){return this._timer=s(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==pe&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),at.VERSION="2.0.8",at.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[rt,{enable:!1}],[nt,{enable:!1},["rotate"]],[st,{direction:Nt}],[et,{direction:Nt},["swipe"]],[ot],[ot,{event:"doubletap",taps:2},["tap"]],[it]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};ut.prototype={set:function(t){return lt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&pe)&&(r=e.curRecognizer=null);for(var s=0;s<i.length;)n=i[s],2===e.stopped||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(he|ce|le)&&(r=e.curRecognizer=n),s++}},get:function(t){if(t instanceof $)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(o(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(o(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=T(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==r&&e!==r){var n=this.handlers;return a(g(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==r){var n=this.handlers;return a(g(t),function(t){e?n[t]&&n[t].splice(T(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&ct(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&ht(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},lt(at,{INPUT_START:bt,INPUT_MOVE:Pt,INPUT_END:xt,INPUT_CANCEL:Dt,STATE_POSSIBLE:ue,STATE_BEGAN:he,STATE_CHANGED:ce,STATE_ENDED:le,STATE_RECOGNIZED:pe,STATE_CANCELLED:fe,STATE_FAILED:32,DIRECTION_NONE:wt,DIRECTION_LEFT:Ot,DIRECTION_RIGHT:Rt,DIRECTION_UP:Mt,DIRECTION_DOWN:zt,DIRECTION_HORIZONTAL:Nt,DIRECTION_VERTICAL:Xt,DIRECTION_ALL:Yt,Manager:ut,Input:C,TouchAction:Z,TouchInput:k,MouseInput:F,PointerEventInput:q,TouchMouseInput:U,SingleTouchInput:W,Recognizer:$,AttrRecognizer:tt,Tap:ot,Pan:et,Swipe:st,Pinch:nt,Rotate:rt,Press:it,on:f,off:v,each:a,merge:yt,extend:Tt,assign:lt,inherit:h,bindFn:c,prefixed:I}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=at,"function"==typeof define&&define.amd?define(function(){return at}):void 0!==e&&e.exports?e.exports=at:t.Hammer=at}(window,document),e.exports=Hammer,e.exports._=i});
//# sourceMappingURL=external.hammer.js.map
require("dom",function(e,r,t){function n(e,r,t){return Object.defineProperty(e,"element",{value:r,writable:!1,configurable:!1,enumerable:!0}),t?e:(e.on=v.bind(e,r),e.css=i.bind(e,r),e.add=l.bind(e,r),e.att=s.bind(e,r),e.addClass=y.bind(e,r),e.hasClass=h.bind(e,r),e.removeClass=p.bind(e,r),e.toggleClass=g.bind(e,r),e)}function o(e,r){return e=M(e),r=M(r),r.parentNode.replaceChild(e,r),e}function i(e,r){e=M(e);var t,n;for(t in r)n=r[t],e.style[t]=n;return e}function s(e,r,t){e=M(e);var n,o;"string"==typeof r&&(void 0===t&&(t=""),n=r,r={},r[n]=t);for(n in r)o=r[n],e.setAttribute(n,o);return e}function a(e,r){return e=M(e),e.removeAttribute(r),e}function l(e){e=M(e);try{var r,t;for(r=1;r<arguments.length;r++)t=arguments[r],u(e,t)||f(e,t)||c(e,t)||console.error("Argument #"+r+" of dom.add() is invalid!",arguments);return e}catch(e){console.error("[DOM.add] arguments=",[].slice.call(arguments)),console.error("[DOM.add] exception=",e)}}function c(e,r){return(r=M(r))instanceof Node&&(e.appendChild(r),!0)}function f(e,r){if("number"==typeof r&&(r=""+r),"string"!=typeof r)return!1;if("<html>"==r.substr(0,6).toLowerCase()){var t=r.substr(6);r=M.tag("span"),r.innerHTML=t}else if(D.test(r)){var n=r;r=M.tag("span"),r.innerHTML=n}else r=document.createTextNode(r);return e.appendChild(r),!0}function u(e,r){return!!Array.isArray(r)&&(r.forEach(function(r){l(e,r)}),!0)}function d(e){if(Array.isArray(e))return e.forEach(function(e){d(e)}),e;if(void 0===e[k])return e;var r=e[k].events;if(void 0===r)return e;r.off(),delete e[k].events}function v(e,r,t){if("function"==typeof r||null===r)r={tap:r};else if("string"==typeof r&&"function"==typeof t){var n={};n[r]=t,r=n}if(Array.isArray(e))return e.forEach(function(e){v(e,r)}),e;e=M(e),void 0===e[k]&&(e[k]={}),void 0===e[k].events&&(e[k].events=O(e));var o,i,s;for(o in r)i=r[o],"!"==o.charAt(0)?(o=o.substr(1),s=!0):s=!1,H.indexOf(o.toLowerCase())>-1?e.addEventListener(o,i,s):e[k].events.on(o,i,s);return e}function m(e,r){try{var t,n,o,i,s=document.createElementNS(e,r.trim().toLowerCase());for(t=2;t<arguments.length;t++)if(n=arguments[t],Array.isArray(n))n.forEach(function(e){switch(typeof e){case"string":case"number":case"boolean":if(e=""+e,"<html>"==e.substr(0,6)){var r=e.substr(6);e=M.tag("span"),e.innerHTML=r}else e=document.createTextNode(e)}l(s,e)});else switch(typeof n){case"string":n.split(" ").forEach(function(e){e.length>0&&y(s,e)});break;case"object":for(o in n)i=n[o],s.setAttribute(o,i);break;default:throw Error("[dom.tag] Error creating <"+r+">: Invalid argument #"+t+"!")}return s}catch(t){console.error("[dom.tagNS] Error with `ns` = ",e," and `name` = ",r),console.error(t)}}function y(e){var r=[].slice.call(arguments,1);return Array.isArray(e)?(r.unshift(null),e.forEach(function(e){r[0]=e,y.apply(void 0,r)}),e):(e=M(e),r.forEach(function(r){if("string"==typeof r&&(r=r.trim(),0!=r.length))try{e.classList&&e.classList.add(r)}catch(e){console.error("[dom.addClass] Invalid class name: ",r),console.error(e)}}),e)}function h(e,r){return e=M(e),!!e.classList&&e.classList.contains(r)}function p(e){var r=[].slice.call(arguments,1);return Array.isArray(e)?(r.unshift(null),e.forEach(function(e){r[0]=e,p.apply(void 0,r)}),e):(e=M(e),r.forEach(function(r){if("string"==typeof r)try{e.classList&&e.classList.remove(r)}catch(e){console.error("[dom.removeClass] Invalid class name: ",r),console.error(e)}}),e)}function g(e){return[].slice.call(arguments,1).forEach(function(r){h(e,r)?p(e,r):y(e,r)}),e}function w(e){e=M(e);for(var r=e;r.firstChild;)r.removeChild(r.firstChild);var t=[].slice.call(arguments);return t.length>1&&l.apply(this,t),e}function b(e,r){return e=M(e),void 0===r&&(r=e,e=window.document),e.querySelector(r)}function A(e){e=M(e);var r=e.parentElement;return r?(r.removeChild(e),r):r}function C(e){var r=[].slice.call(arguments);r.shift(),0==r.length&&(r=["div"]),r.push("dom","custom");var t;return void 0!==r[0].element?(t=r[0].element,y(t,"dom","custom")):"function"==typeof r[0].appendChild?(t=r[0],y(t,"dom","custom")):t=M.tag.apply(M,r),Object.defineProperty(e,"element",{value:t,writable:!1,configurable:!1,enumerable:!0}),t}function E(e,r){return void 0===r&&(r=""),null===r&&(r=""),"string"!=typeof r&&(r=JSON.stringify(r)),"<html>"==r.substr(0,6)?e.innerHTML=r.substr(6):e.textContent=r,e}function x(e){if(!Array.isArray(e))return x(Array.prototype.slice.call(arguments));e.forEach(function(e){e=M(e),void 0===e[k]&&(e[k]={}),Array.isArray(e[k].style)||(e[k].style=[]),e[k].style.push(JSON.stringify(e.style))})}function L(e){if(!Array.isArray(e))return L(Array.prototype.slice.call(arguments));e.forEach(function(e){if(e=M(e),void 0===e[k]||!Array.isArray(e[k].style))throw Error("[dom.restoreStyle] `saveStyle()` has never been used on this element!");if(0==e[k].style.length)throw Error("[dom.restoreStyle] more `restore` than `save`!");var r,t,n=JSON.parse(e[k].style.pop());for(r in n)void 0!==(t=n[r])&&(e.style[r]=t)})}function N(e,r){T.register.call(this,e,r),T.apply.call(this,e)}var S=function(){function r(){return n(t,arguments)}var t={en:{}},n=e("$").intl;return r.all=t,r}();e("polyfill.classList");var T=e("dom.theme"),O=e("tfw.gestures"),M=function(e){if(e instanceof Node)return e;if(void 0===e||null===e)throw Error("`dom` is not a valid element!",e);if(e.$ instanceof Node)return e.$;if(e.element instanceof Node)return e.element;if("string"==typeof e){var r=document.getElementById(e);return r||console.error("[dom] There is no DOM element with this ID: `"+e+"`"),r}return"function"==typeof e.element?e.element():e};r.exports=M;var k="@dom"+Date.now(),D=/^&(#[0-9]+|[a-zA-Z0-9]+);$/;M.tagNS=m,M.svgRoot=m.bind(void 0,"http://www.w3.org/2000/svg","svg",{version:"1.1","xmlns:svg":"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),M.svg=m.bind(void 0,"http://www.w3.org/2000/svg"),M.tag=m.bind(void 0,"http://www.w3.org/1999/xhtml"),M.div=m.bind(void 0,"http://www.w3.org/1999/xhtml","div"),M.txt=window.document.createTextNode.bind(window.document),M.textOrHtml=E,M.get=b,M.elem=C,M.css=i,M.att=s,M.removeAtt=a,M.addClass=y,M.hasClass=h,M.removeClass=p,M.toggleClass=g,M.saveStyle=x,M.restoreStyle=L,M.registerTheme=T.register.bind(M),M.applyTheme=T.apply.bind(M),M.registerAndApplyTheme=N,M.replace=o,M.detach=A,M.on=v,M.off=d,M.add=l,M.wrap=n,M.clear=w;var H=["keyup","keydown","scroll","load","error"];r.exports._=S});
//# sourceMappingURL=dom.js.map
require("tfw.gestures",function(t,e,n){function r(t){return t=u(t),t[m]||(t[m]=new _(t)),t[m]}function o(t,e){for(var n=this._events[t].chain,r=0;r<n.length;r++){if(!0===(0,n[r])(e))return}}function a(t,e){var n=v(t,"hammer.");n&&!this._hammer&&(this._hammer=new y(this.$));var r=this._events[t];if(!r){var a=o.bind(this,t);r={chain:[],handler:a},n?this._hammer.on(n,a):this.$.addEventListener(t,a),this._events[t]=r}r.chain.push(e)}function i(t,e){if("string"!=typeof t)throw Error("[Gestures.on] `name` must be a string: "+JSON(t)+"!");if(-1===x.indexOf(t))throw Error("Unknown gesture's name `"+t+"`!\nAvailable names are: "+x.join(", ")+".");if("function"!=typeof e)throw Error("Gesture `"+t+"` must have a function as slot!")}function u(t){if(t instanceof Node)return t;if(void 0===t||null===t)throw Error("Not a valid DOM element!",t);if(t.$ instanceof Node)return t.$;if(t.element instanceof Node)return t.element;if("string"==typeof t){var e=document.getElementById(t);return e||console.error("There is no DOM element with this ID: `"+t+"`"),e}return"function"==typeof t.element?t.element():t}function s(t,e){var n,r;e.center?(n=e.center.x,r=e.center.y):(n=e.clientX,r=e.clientY);var o=t.getBoundingClientRect();e.x=n-o.left,e.y=r-o.top}function c(t,e){e.dx=e.deltaX,e.dy=e.deltaY}function l(t,e,n){var r=this;t("hammer.tap",function(t){return 1===t.tapCount&&(s(r.$,t),e({x:t.x,y:t.y,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation}),!0)})}function f(t,e,n){var r=this;t("hammer.tap",function(t){return 2===t.tapCount&&(s(r.$,t),e({x:t.x,y:t.y,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation}),!0)})}function p(t,e,n){var r=this;t("hammer.pan",function(t){return s(r.$,t),c(r.$,t),e({x:t.x,y:t.y,dx:t.dx,dy:t.dy,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation}),!0})}function h(t,e,n){var r=this;t("touchstart",function(t){if(!t.changedTouches||t.changedTouches.length<1)return!1;var n=t.changedTouches[0],o=r.$.getBoundingClientRect();try{e({x:n.clientX-o.left,y:n.clientY-o.top,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation})}catch(t){console.error(t)}return!0}),t("mousedown",function(t){if(Date.now()-r._touchstart<350)return t.preventDefault(),t.stopPropagation(),!1;var n=r.$.getBoundingClientRect();try{e({x:t.clientX-n.left,y:t.clientY-n.top,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation})}catch(t){console.error(t)}return r._touchstart=0,!0})}function g(t,e,n){var r=this;t("touchend",function(t){if(!t.changedTouches||t.changedTouches.length<1)return!1;var n=t.changedTouches[0],o=r.$.getBoundingClientRect();try{e({x:n.clientX-o.left,y:n.clientY-o.top,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation})}catch(t){console.error(t)}return r._touchstart=Date.now(),!0}),t("mouseup",function(t){if(r._touchstart>0)return t.preventDefault(),t.stopPropagation(),!1;var n=r.$.getBoundingClientRect();try{e({x:t.clientX-n.left,y:t.clientY-n.top,preventDefault:t.preventDefault,stopPropagation:t.stopPropagation})}catch(t){console.error(t)}return r._touchstart=0,!0})}function v(t,e){return t.substr(0,e.length)==e?t.substr(e.length):null}var d=function(){function e(){return r(n,arguments)}var n={en:{},fr:{}},r=t("$").intl;return e.all=n,e}();e.exports=r;var m="__tfw.gestures__",y=t("external.hammer"),D={tap:l,doubletap:f,drag:p,down:h,up:g},x=Object.keys(D),_=function(t){Object.defineProperty(this,"$",{writable:!1,value:t,configurable:!1}),this._events={},this._touchstart=0};_.prototype.on=function(t,e,n){try{return"function"==typeof t?(e=t,t="tap"):i(t,e),D[t].call(this,a.bind(this),e,n)}catch(r){throw console.error("[Gesture.on( name, slot, args )]"),console.error("   name",t),console.error("   slot",e),console.error("   args",n),console.error("   ERROR",r),Error(r)}},e.exports._=d});
//# sourceMappingURL=tfw.gestures.js.map
require("dom.theme",function(t,n,e){function o(t,n){n=m(n);var e=g(t,n);e+=b(t,n),e+=i(t,n),e+=r(t,n);var o=l.css[t];return o||(o=document.createElement("style"),document.getElementsByTagName("head")[0].appendChild(o),l.css[t]=o),o.textContent=e,this}function r(t,n){for(var e="",o=1;o<=10;o++)u.forEach(function(r){for(var g=".thm-bg"+r,b=".thm-fg"+r,i=1;i<=o;i++){for(var h=[],m=[],a=[],d=1;d<=o;d++)a.push(i===d?g:"*"),m.push(i===d?g:"*"),h.push(i===d?b:"*"),d===o&&(a.push(a.pop()+".thm-fg"),h.push(h.pop()+b));e+="body.dom-theme-"+t+" "+a.join(" > ")+" { color: "+n["fg"+r]+" }\n",e+="body.dom-theme-"+t+" "+h.join(" > ")+" { color: "+n["bg"+r]+" }\n",e+="body.dom-theme-"+t+" "+m.join(" > ")+" .thm-svg-fill0 { fill: "+n["fg"+r]+" }\n",e+="body.dom-theme-"+t+" "+m.join(" > ")+" .thm-svg-stroke0 { stroke: "+n["fg"+r]+" }\n"}});return e}function g(t,n){var e="body.dom-theme-"+t+"{\n";return u.forEach(function(t){e+="  --thm-bg"+t+": "+n["bg"+t]+";\n"}),e+="}\n"}function b(t,n){var e="";return u.forEach(function(o){e+="body.dom-theme-"+t+".thm-bg"+o+" { background-color: "+n["bg"+o]+" }\n",e+="body.dom-theme-"+t+" .thm-fg"+o+" { color: "+n["fg"+o]+" }\n",e+="body.dom-theme-"+t+" .thm-bg"+o+" { background-color: "+n["bg"+o]+" }\n",e+="body.dom-theme-"+t+" .thm-bg"+o+"-bottom { background: linear-gradient(to top,"+n["bg"+o]+",transparent) }\n",e+="body.dom-theme-"+t+" .thm-bg"+o+"-top { background: linear-gradient(to bottom,"+n["bg"+o]+",transparent) }\n",e+="body.dom-theme-"+t+" .thm-bg"+o+"-left { background: linear-gradient(to right,"+n["bg"+o]+",transparent) }\n",e+="body.dom-theme-"+t+" .thm-bg"+o+"-right { background: linear-gradient(to left,"+n["bg"+o]+",transparent) }\n",isNaN(parseInt(o))&&(e+="body.dom-theme-"+t+" .thm-svg-fill"+o+" { fill: "+n["bg"+o]+" }\n",e+="body.dom-theme-"+t+" .thm-svg-stroke"+o+" { stroke: "+n["bg"+o]+" }\n")}),e}function i(t,n){var e=c.luminance(n.bg2),o=e<.6?s(n.white,Math.ceil(10*e)):s(n.black,"6"),r="";return[0,1,2,3,4,6,8,9,12,16,24].forEach(function(n){r+="body.dom-theme-"+t+" .thm-ele"+n+" {\n  box-shadow: 0 "+n+"px "+2*n+"px "+o+"\n}\n"}),r}function h(t,n){if(void 0===n&&(n=document.body),!l.css[t])return void console.error("This theme has not been registered: ",t);var e=document.body;"string"==typeof l.current&&this.removeClass(e,"dom-theme-"+l.current),l.current=t,this.addClass(e,"dom-theme-"+l.current)}function m(t){return void 0===t&&(t={}),"string"!=typeof t.bg0&&(t.bg0="#E0E0E0"),"string"!=typeof t.bg1&&(t.bg1="#F5F5F5"),"string"!=typeof t.bg2&&(t.bg2="#FAFAFA"),"string"!=typeof t.bg3&&(t.bg3="#FFF"),"string"!=typeof t.bgP&&(t.bgP="#3E50B4"),"string"!=typeof t.bgPD&&(t.bgPD=a(t.bgP)),"string"!=typeof t.bgPL&&(t.bgPL=d(t.bgP)),"string"!=typeof t.bgS&&(t.bgS="#FF3F80"),"string"!=typeof t.bgSD&&(t.bgSD=a(t.bgS)),"string"!=typeof t.bgSL&&(t.bgSL=d(t.bgS)),void 0===t.white&&(t.white="#fff"),void 0===t.black&&(t.black="#000"),u.forEach(function(n){var e=t["bg"+n],o=c.luminance(e);t["fg"+n]=o<.6?t.white:t.black}),t}function a(t){var n=new c(t);return n.rgb2hsl(),n.L*=.75,n.hsl2rgb(),n.stringify()}function d(t){var n=new c(t);return n.rgb2hsl(),n.L=.4+.6*n.L,n.hsl2rgb(),n.stringify()}function s(t,n){return t.length<5?t+n:t+n+n}var f=function(){function n(){return o(e,arguments)}var e={en:{},fr:{}},o=t("$").intl;return n.all=e,n}();e.register=o,e.apply=h;var c=t("tfw.color"),u=["0","1","2","3","P","PD","PL","S","SD","SL"],l={css:{},current:null};n.exports._=f});
//# sourceMappingURL=dom.theme.js.map
require("polyfill.classList",function(t,e,n){var i=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}();"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;n<i;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():function(t){"use strict";if("Element"in t){var e=t.Element.prototype,n=Object,i=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array.prototype.indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},r=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},o=function(t,e){if(""===e)throw new r("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new r("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(t,e)},c=function(t){for(var e=i.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],s=0,r=n.length;s<r;s++)this.push(n[s]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},a=c.prototype=[],l=function(){return new c(this)};if(r.prototype=Error.prototype,a.item=function(t){return this[t]||null},a.contains=function(t){return t+="",-1!==o(this,t)},a.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do{t=e[n]+"",-1===o(this,t)&&(this.push(t),s=!0)}while(++n<i);s&&this._updateClassName()},a.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do{for(t=n[i]+"",e=o(this,t);-1!==e;)this.splice(e,1),r=!0,e=o(this,t)}while(++i<s);r&&this._updateClassName()},a.toggle=function(t,e){t+="";var n=this.contains(t),i=n?!0!==e&&"remove":!1!==e&&"add";return i&&this[i](t),!0===e||!1===e?e:!n},a.toString=function(){return this.join(" ")},n.defineProperty){var u={get:l,enumerable:!0,configurable:!0};try{n.defineProperty(e,"classList",u)}catch(t){-2146823252===t.number&&(u.enumerable=!1,n.defineProperty(e,"classList",u))}}else n.prototype.__defineGetter__&&e.__defineGetter__("classList",l)}}(self)),e.exports._=i});
//# sourceMappingURL=polyfill.classList.js.map
require("tfw.binding.link",function(e,n,r){function o(e,n,r,o){var t=this,a=[];return e[o].forEach(function(o,c){if(o.open){p(o.obj);e[r].forEach(function(r,s){if("string"==typeof r.name&&"string"==typeof o.name&&r.obj===o.obj&&r.name===o.name)return console.error("It is forbidden to bind a property on itself! ("+s+" -> "+c+")"),void console.info("[tfw.binding.link] args=",e);var f=p(r.obj),l=i.bind(t,r,o,n);f.on(r.name,l),a.push({pm:f,name:r.name,slot:l})})}}),a}function t(e,n){this.destroy=function(){e.forEach(function(e){e.pm.off(e.name,e.slot)}),n.forEach(function(e){e.pm.off(e.name,e.slot)})}}function i(e,n,r,o,t,i,a){if(Array.isArray(a)||(a=[]),this.dbg&&console.log("Link "+this.dbg+": ",{src:e,dst:n,id:r,value:o,propertyName:t,container:i,wave:a}),f(r,a))return void(this.dbg&&console.log("...has been BLOCKED by the wave! ",a));var c=this,s=p(e.obj),g=p(n.obj);if(o=b(o,e,n),o=u(o,n,s),o=m(o,e,n),l(o,e,n))return void(this.dbg&&console.log("...has been FILTERED!"));o=h(o,e,n),o=d(o,e,n),"number"==typeof n.delay?(this.debug&&console.log("...has been DELAYED for "+n.delay+" ms!"),clearTimeout(n._id),n._id=setTimeout(function(){c.dbg&&(console.log("Link "+c.dbg+" (after "+n.delay+" ms): ",{src:e,dst:n,id:r,value:o,propertyName:t,wave:a}),console.log("...try to change a value. ",{target:g,propertyName:n.name,value:o,wave:a})),g.change(n.name,o,a)},n.delay)):(this.debug&&console.log("...try to change a value. ",{target:g,propertyName:n.name,value:o,wave:a}),g.change(n.name,o,a))}function a(e){try{void 0===e.name&&(e.name=e.debug),"string"!=typeof e.name&&(e.name="Link#"+this.id),void 0===e&&s("Missing mandatory argument!"),void 0===e.A&&s("Missing `args.A`!"),Array.isArray(e.A)||(e.A=[e.A]),void 0===e.B&&s("Missing `args.B`!"),Array.isArray(e.B)||(e.B=[e.B]);var n;for(n=0;n<e.A.length;n++)c(e.A[n],n);for(n=0;n<e.B.length;n++)c(e.B[n],n);this.name=e.name,this.debug=e.debug}catch(n){console.error("checkArgs( "+e+" )"),s(n,"checkArgs( <args> )")}}function c(e,n){try{if(e.action){if("function"!=typeof e.action)throw"Attribute `["+n+"].action` must be a function!";if(void 0!==e.obj)throw"["+n+"].action cannot be defined in the same time of ["+n+"].obj! They are exclusive attributes.";if(void 0!==e.name)throw"["+n+"].action cannot be defined in the same time of ["+n+"].name! They are exclusive attributes.";var r={};p(r).create("<action>",{set:e.action}),e.obj=r,e.name="<action>"}else if(void 0===e.obj&&s("Missing `["+n+"].obj`!"),void 0===e.name&&(e.name="*"),!p.isLinkable(e.obj,e.name))throw"`"+e.name+"` is not a linkable attribute.\nValid linkable attributes are: "+p.getAllAttributesNames(e.obj).join(", ")+".";void 0===e.open&&(e.open=!0)}catch(r){console.error("checkpod(",e,", ",n,")"),s(r,"checkpod( <pod>, "+n+")")}}function s(e,n){throw n=void 0===n?"":"::"+n,e+"\n[tfw.binding.link"+n+"]"}function f(e,n){if(Array.isArray(n)){if(!(n.indexOf(e)<0))return!0;n.push(e)}return!1}function l(e,n,r){if("function"==typeof r.filter)try{if(!r.filter(e))return!0}catch(e){console.error(e),s("Error in filter of link "+p(n.obj)+"."+n.name+" -> "+p(r.obj)+"."+r.name+"!")}return!1}function u(e,n,r){return"string"==typeof n.switch?r.get(n.switch):Array.isArray(n.switch)?n.switch.map(function(e){return r.get(e)}):e}function m(e,n,r){if("function"==typeof r.converter)try{return r.converter(e)}catch(e){console.error(e),s("Error in converter of link "+p(n.obj)+"."+n.name+" -> "+p(r.obj)+"."+r.name+"!")}return e}function h(e,n,r){if(!r.format)return e;try{if(!Array.isArray(r.format))throw"Must be an array with two elements!";var o=r.format[0];if("function"!=typeof o)throw"First element of the array must be a function!";var t=r.format[1];if("string"!=typeof t)throw"Second element of the array must be a string!";return o(t,e)}catch(e){console.error(e),s("Error in format of link "+p(n.obj)+"."+n.name+" -> "+p(r.obj)+"."+r.name+"!\n"+e)}}function d(e,n,r){if(e&&"function"==typeof e.map&&"function"==typeof r.map)try{var o=[],t={context:{},list:e,index:0};if("function"==typeof r.header)try{o.push(r.header(e,t.context))}catch(o){console.error("[tfw.binding.link/processMap] Exception while calling a header function: ",o),console.error({value:e,src:n,dst:r,more:t})}if(e.forEach(function(i,a){t.index=a;try{o.push(r.map(i,t))}catch(c){console.error("[tfw.binding.link/processMap] Exception while calling a map function: ",c),console.error({item:i,index:a,value:e,src:n,dst:r,result:o,more:t})}}),"function"==typeof r.footer)try{o.push(r.header(e,t.context))}catch(i){console.error("[tfw.binding.link/processMap] Exception while calling a footer function: ",i),console.error({value:e,src:n,dst:r,result:o,more:t})}return o.filter(function(e){return null!=e})}catch(e){console.error(e),s("Error in map of link "+p(n.obj)+"."+n.name+" -> "+p(r.obj)+"."+r.name+"!")}return e}function b(e,n,r){if(void 0===r.value)return e;if("function"==typeof r.value)try{return r.value(n.name)}catch(e){console.error(e),s("Error in value("+n.name+") of link "+p(n.obj)+"."+n.name+" -> "+p(r.obj)+"."+r.name+"!")}return r.value}var g=function(){function n(){return o(r,arguments)}var r={en:{},fr:{}},o=e("$").intl;return n.all=r,n}(),p=e("tfw.binding.property-manager"),y=0,v=function(e){try{var n=y++;a.call(this,e);var r=o.call(this,e,n,"A","B"),i=o.call(this,e,n,"B","A");t.call(this,r,i)}catch(n){console.error("new Link( "+e+" )"),s(n,"new Link( <args> ) "+(this.name||""))}};n.exports=v,n.exports._=g});
//# sourceMappingURL=tfw.binding.link.js.map
require("tfw.icons",function(H,V,L){function C(H){return["path",{d:H,stroke:"none",fill:0}]}var M=function(){function V(){return C(L,arguments)}var L={en:{},fr:{}},C=H("$").intl;return V.all=L,V}();V.exports.draw=C,V.exports.register=function(H){var L,C;for(L in H)C=H[L],V.exports.iconsBook[L]=C},V.exports.iconsBook={android:C("M15,-35H10V-40H15M-10,-35H-15V-40H-10M18,-49L24,-56C25,-57,25,-58,24,-59C23,-60,22,-60,21,-59L13,-52C9,-54,5,-55,0,-55C-5,-55,-9,-54,-13,-52L-21,-59C-22,-60,-23,-60,-24,-59C-25,-58,-25,-57,-24,-56L-18,-49C-25,-44,-30,-35,-30,-25H30C30,-35,25,-44,18,-49M43,-20A8,8,0,0,0,35,-12V23A8,8,0,0,0,43,30A8,8,0,0,0,50,23V-12A8,8,0,0,0,43,-20M-42,-20A8,8,0,0,0,-50,-12V23A8,8,0,0,0,-42,30A8,8,0,0,0,-35,23V-12A8,8,0,0,0,-42,-20M-30,30A5,5,0,0,0,-25,35H-20V53A8,8,0,0,0,-12,60A8,8,0,0,0,-5,53V35H5V53A8,8,0,0,0,13,60A8,8,0,0,0,20,53V35H25A5,5,0,0,0,30,30V-20H-30V30Z"),bug:C("M10,0H-10V-10H10M10,20H-10V10H10M40,-20H26C24,-24 21,-27 17,-30L25,-38L18,-45L7,-34C5,-35 3,-35 0,-35C-2,-35 -5,-35 -7,-34L-18,-45L-25,-38L-17,-30C-21,-27 -24,-24 -26,-20H-40V-10H-30C-30,-8 -30,-7 -30,-5V0H-40V10H-30V15C-30,17 -30,18 -30,20H-40V30H-26C-21,39 -11,45 0,45C11,45 21,39 26,30H40V20H30C30,18 30,17 30,15V10H40V0H30V-5C30,-7 30,-8 30,-10H40V-20Z"),camera:C("M-40,-40H-25L-15,-50H15L25,-40H40A10,10,0,0,1,50,-30V30A10,10,0,0,1,40,40H-40A10,10,0,0,1,-50,30V-30A10,10,0,0,1,-40,-40M0,-25A25,25,0,0,0,-25,0A25,25,0,0,0,0,25A25,25,0,0,0,25,0A25,25,0,0,0,0,-25M0,-15A15,15,0,0,1,15,0A15,15,0,0,1,0,15A15,15,0,0,1,-15,0A15,15,0,0,1,0,-15Z"),cancel:C("M7,0L35,28V35H28L0,7L-28,35H-35V28L-7,0L-35,-28V-35H-28L0,-7L28,-35H35V-28L7,0Z"),center:C("M0,-15A15,15,0,0,0,-15,0A15,15,0,0,0,0,15A15,15,0,0,0,15,0A15,15,0,0,0,0,-15M35,35H15V45H35A10,10,0,0,0,45,35V15H35M35,-45H15V-35H35V-15H45V-35A10,10,0,0,0,35,-45M-35,-35H-15V-45H-35A10,10,0,0,0,-45,-35V-15H-35M-35,15H-45V35A10,10,0,0,0,-35,45H-15V35H-35V15Z"),close:C("M0,-50C28,-50,50,-28,50,0C50,28,28,50,0,50C-28,50,-50,28,-50,0C-50,-28,-28,-50,0,-50M18,-25L0,-7L-18,-25L-25,-18L-7,0L-25,18L-18,25L0,7L18,25L25,18L7,0L25,-18L18,-25Z"),code:C("M13,23L36,0L13,-23L20,-30L50,0L20,30L13,23M-13,23L-36,0L-13,-23L-20,-30L-50,0L-20,30L-13,23Z"),copy:C("M35,45H-20V-25H35M35,-35H-20A10,10,0,0,0,-30,-25V45A10,10,0,0,0,-20,55H35A10,10,0,0,0,45,45V-25A10,10,0,0,0,35,-35M20,-55H-40A10,10,0,0,0,-50,-45V25H-40V-45H20V-55Z"),delete:C("M35,-40H18L13,-45H-12L-17,-40H-35V-30H35M-30,35A10,10,0,0,0,-20,45H20A10,10,0,0,0,30,35V-25H-30V35Z"),direction:C("M10,13V0H-10V15H-20V-5A5,5,0,0,1,-15,-10H10V-22L28,-5M49,-4L4,-49H3C2,-50,-2,-50,-4,-49L-49,-4C-50,-2,-50,2,-49,4L-4,49C-2,50,2,51,4,49L49,4C51,2,51,-2,49,-4Z"),down:C("M-30,-30L0,30,30,-30"),"down-double":C("M-30,-40L0,-10,30,-40M-30,10L0,40,30,10"),edit:C("M24,-46C22,-46,20,-46,19,-44L8,-34L35,-7L45,-17C48,-21,48,-25,45,-28L29,-44C28,-46,26,-46,24,-46M5,-30L-36,11L-23,12L-22,23L-11,24L-9,37L31,-3M-39,15L-47,49L-14,40L-15,29L-27,28L-28,16"),eraser:C("M21,-42L46,-17C50,-14,50,-7,46,-3L0,43C-8,50,-20,50,-28,43L-46,25C-50,21,-50,15,-46,11L7,-42C11,-46,17,-46,21,-42M-39,18L-21,36C-17,39,-11,39,-7,36L11,18L-14,-7L-39,18Z"),export:C("M-35,40H35V30H-35M35,-15H15V-45H-15V-15H-35L0,20L35,-15Z"),"flag-jp":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#fff",d:"M-60,45h120v-90h-120z"}],["circle",{fill:"#bc002d",r:24}]]],"flag-fr":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#002395",d:"M-60,45h40v-90h-40z"}],["path",{fill:"#fff",d:"M-20,45h40v-90h-40z"}],["path",{fill:"#ed2939",d:"M20,45h40v-90h-40z"}]]],"flag-it":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#009246",d:"M-60,45h40v-90h-40z"}],["path",{fill:"#fff",d:"M-20,45h40v-90h-40z"}],["path",{fill:"#ce2b37",d:"M20,45h40v-90h-40z"}]]],"flag-de":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,41h130v-82h-130z"}],["path",{fill:"#ffce00",d:"M-60,36h120v-24h-120z"}],["path",{fill:"#dd0000",d:"M-60,12h120v-24h-120z"}]]],"flag-en":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,37h130v-75h-130z"}],["path",{fill:"#bb133e",d:"M-60,32h120v-65h-120z"}],["path",{fill:"#fff",d:"M-60,22h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,12h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,2h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-8h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-18h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-28h120v5h-120z"}],["path",{fill:"#002664",d:"M-60,-33h48v35h-48z"}]]],font:C("M25,-20H40V40H45V45H25V40H30V25H10L3,40H10V45H-10V40H-5L25,-20M30,-15L13,20H30V-15M-35,-45H-10C-4,-45,0,-41,0,-35V20H-15V-5H-30V20H-45V-35C-45,-41,-41,-45,-35,-45M-30,-35V-15H-15V-35H-30Z"),"format-align-center":C("M-45,-45H45V-35H-45V-45M-25,-25H25V-15H-25V-25M-45,-5H45V5H-45V-5M-25,15H25V25H-25V15M-45,35H45V45H-45V35Z"),"format-align-justify":C("M-45,-45H45V-35H-45V-45M-45,-25H45V-15H-45V-25M-45,-5H45V5H-45V-5M-45,15H45V25H-45V15M-45,35H45V45H-45V35Z"),"format-align-left":C("M-45,-45H45V-35H-45V-45M-45,-25H15V-15H-45V-25M-45,-5H45V5H-45V-5M-45,15H15V25H-45V15M-45,35H45V45H-45V35Z"),"format-align-right":C(" M-45,-45H45V-35H-45V-45M-15,-25H45V-15H-15V-25M-45,-5H45V5H-45V-5M-15,15H45V25H-15V15M-45,35H45V45H-45V35Z "),"format-bold":C("M8,18H-10V3H8A8,8,0,0,1,15,10A8,8,0,0,1,8,18M-10,-27H5A8,8,0,0,1,13,-20A8,8,0,0,1,5,-12H-10M18,-6C23,-9,26,-15,26,-20C26,-31,18,-40,6,-40H-25V30H10C21,30,29,22,29,11C29,3,24,-3,18,-6Z"),"format-italic":C("M-10,-40V-25H1L-16,15H-30V30H10V15H-1L16,-25H30V-40H-10Z"),"format-float-center":C("M-15,-25H15V5H-15V-25M-45,-45H45V-35H-45V-45M-45,15H45V25H-45V15M-45,35H25V45H-45V35Z"),"format-float-left":C("M-45,-25H-15V5H-45V-25M-45,-45H45V-35H-45V-45M45,-25V-15H-5V-25H45M45,-5V5H-5V-5H45M-45,15H25V25H-45V15M-45,35H45V45H-45V35Z"),"format-float-none":C("M-45,-25H-15V5H-45V-25M-45,-45H45V-35H-45V-45M45,-5V5H-5V-5H45M-45,15H25V25H-45V15M-45,35H45V45H-45V35Z"),"format-float-right":C("M15,-25H45V5H15V-25M-45,-45H45V-35H-45V-45M5,-25V-15H-45V-25H5M-15,-5V5H-45V-5H-15M-45,15H25V25H-45V15M-45,35H45V45H-45V35Z"),"format-header":C("M-40,-40H-30V-10H-10V-40H0V30H-10V0H-30V30H-40V-40M13,-23L31,-5L13,13L20,20L45,-5L20,-30L13,-23Z"),"format-underline":C("M-35,45H35V35H-35V45M0,25A30,30,0,0,0,30,-5V-45H18V-5A18,18,0,0,1,0,13A18,18,0,0,1,-17,-5V-45H-30V-5A30,30,0,0,0,0,25Z"),fullscreen:C("M-35,-35H-10V-25H-25V-10H-35V-35M10,-35H35V-10H25V-25H10V-35M25,10H35V35H10V25H25V10M-10,25V35H-35V10H-25V25H-10Z"),gear:C("M0,18A18,18,0,0,1,-17,0A18,18,0,0,1,0,-17A18,18,0,0,1,18,0A18,18,0,0,1,0,18M37,5C37,3,38,2,38,0C38,-2,37,-3,37,-5L48,-13C49,-14,49,-15,48,-16L38,-34C38,-35,36,-35,35,-35L23,-30C20,-32,18,-33,14,-35L13,-48C12,-49,11,-50,10,-50H-10C-11,-50,-12,-49,-12,-48L-14,-35C-17,-33,-20,-32,-23,-30L-35,-35C-36,-35,-38,-35,-38,-34L-48,-16C-49,-15,-49,-14,-48,-13L-37,-5C-37,-3,-37,-2,-37,0C-37,2,-37,3,-37,5L-48,13C-49,14,-49,15,-48,16L-38,34C-38,35,-36,35,-35,35L-23,30C-20,32,-17,33,-14,35L-12,48C-12,49,-11,50,-10,50H10C11,50,12,49,13,48L14,35C18,33,20,32,23,30L35,35C36,35,38,35,38,34L48,16C49,15,49,14,48,13L37,5Z"),gps:C("M0,-20A20,20,0,0,1,20,0A20,20,0,0,1,0,20A20,20,0,0,1,-20,0A20,20,0,0,1,0,-20M-45,5H-55V-5H-45C-42,-26,-26,-42,-5,-45V-55H5V-45C26,-42,43,-26,45,-5H55V5H45C43,26,26,43,5,45V55H-5V45C-26,43,-42,26,-45,5M0,-35A35,35,0,0,0,-35,0A35,35,0,0,0,0,35A35,35,0,0,0,35,0A35,35,0,0,0,0,-35Z"),hand:C("M-10,-50A10,10,0,0,1,0,-40V-17C0,-17,10,-19,10,-14C10,-14,20,-15,20,-10C20,-10,30,-11,30,-6C30,-6,40,-7,40,-2V15C40,20,25,45,25,50H-15C-15,50,-25,15,-40,5C-40,5,-45,-25,-20,0V-40A10,10,0,0,1,-10,-50Z"),heart:C("M0,47L-7,40C-33,17,-50,1,-50,-17C-50,-33,-38,-45,-22,-45C-14,-45,-5,-41,0,-35C5,-41,14,-45,23,-45C38,-45,50,-33,50,-17C50,1,33,17,7,40L0,47Z"),hide:C("M-1,-15L15,1C15,1,15,0,15,0A15,15,0,0,0,0,-15C0,-15,-1,-15,-1,-15M-22,-11L-15,-3C-15,-2,-15,-1,-15,0A15,15,0,0,0,0,15C1,15,2,15,3,15L11,22C8,24,4,25,0,25A25,25,0,0,1,-25,0C-25,-4,-24,-8,-22,-11M-50,-39L-39,-27L-36,-25C-45,-18,-51,-10,-55,0C-46,22,-25,38,0,38C8,38,15,36,22,33L24,35L39,50L45,44L-44,-45M0,-25A25,25,0,0,1,25,0C25,3,24,6,23,9L38,24C45,18,51,9,55,0C46,-22,25,-37,0,-37C-7,-37,-14,-36,-20,-34L-9,-23C-6,-24,-3,-25,0,-25Z"),home:C("M-10,40V10H10V40H35V0H50L0,-45L-50,0H-35V40H-10Z"),image:C("M5,-15H33L5,-42V-15M-30,-50H10L40,-20V40A10,10,0,0,1,30,50H-30C-36,50,-40,46,-40,40V-40C-40,-46,-36,-50,-30,-50M-30,40H15L30,40V0L10,20L0,10L-30,40M-20,-15A10,10,0,0,0,-30,-5A10,10,0,0,0,-20,5A10,10,0,0,0,-10,-5A10,10,0,0,0,-20,-15Z"),import:C("M-15,20V-10H-35L0,-45L35,-10H15V20H-15M-35,40V30H35V40H-35Z"),improvement:C("M0,50A50,50,0,0,1,-50,0A50,50,0,0,1,0,-50A50,50,0,0,1,50,0A50,50,0,0,1,0,50M0,-25L-25,0H-10V20H10V0H25L0,-25Z"),info:C("M8,-40A8,8,0,0,0,0,-32A8,8,0,0,0,8,-25A8,8,0,0,0,15,-32A8,8,0,0,0,8,-40M6,-16C0,-16,-17,-3,-17,-3C-17,-2,-17,-2,-16,-1C-16,1,-16,1,-15,0C-14,0,-12,-2,-9,-3C1,-10,-8,6,-12,32C-14,45,-2,39,1,37C4,35,12,29,13,28C14,28,13,27,12,26C12,25,11,26,11,26C8,28,2,32,1,29C0,27,6,7,9,-6C10,-10,12,-17,6,-16Z"),left:["path",{fill:0,d:"M40,-5V5H-20L8,33L0,40L-39,0L0,-40L8,-32L-20,-5H40Z"}],"left-double":C("M-10,-30L-40,0,-10,30M40,-30L10,0,40,30"),link:C("M-7,7C-5,9,-5,12,-7,14C-9,16,-12,16,-14,14C-24,4,-24,-11,-14,-21V-21L4,-39C13,-49,29,-49,39,-39C49,-29,49,-13,39,-4L31,4C32,0,31,-4,29,-8L32,-11C38,-16,38,-26,32,-32C26,-38,16,-38,11,-32L-7,-14C-13,-8,-13,1,-7,7M7,-14C9,-16,12,-16,14,-14C24,-4,24,11,14,21V21L-4,39C-13,49,-29,49,-39,39C-49,29,-49,13,-39,4L-31,-4C-31,0,-31,4,-29,8L-32,11C-38,16,-38,26,-32,32C-26,38,-16,38,-11,32L7,14C13,8,13,-1,7,-7C5,-9,5,-12,7,-14Z"),location:C("M0,-2A13,13,0,0,1,-12,-15A13,13,0,0,1,0,-27A13,13,0,0,1,13,-15A13,13,0,0,1,0,-2M0,-50A35,35,0,0,0,-35,-15C-35,11,0,50,0,50C0,50,35,11,35,-15A35,35,0,0,0,0,-50Z"),logout:C("M25,26V10H-10V-10H25V-26L51,0L25,26M5,-50A10,10,0,0,1,15,-40V-20H5V-40H-40V40H5V20H15V40A10,10,0,0,1,5,50H-40A10,10,0,0,1,-50,40V-40A10,10,0,0,1,-40,-50H5Z"),mail:C("M40,-40H-40A10,10,0,0,0,-50,-30V30A10,10,0,0,0,-40,40H40A10,10,0,0,0,50,30V-30A10,10,0,0,0,40,-40M40,30H-40V-20L0,5L40,-20V30M40,-30L0,-5L-40,-30V-30H40V-30Z"),map:C("M15,35L-15,24V-35L15,-24M43,-45C42,-45,42,-45,42,-45L15,-34L-15,-45L-43,-35C-44,-35,-45,-34,-45,-33V43A3,3,0,0,0,-42,45C-42,45,-42,45,-42,45L-15,34L15,45L43,36C44,35,45,34,45,33V-42A3,3,0,0,0,43,-45Z"),"map-layer":C("M0,20L37,-9L45,-15L0,-50L-45,-15L-37,-9M0,33L-37,4L-45,10L0,45L45,10L37,4L0,33Z"),menu:C("M-45,-30H45V-20H-45V-30M-45,-5H45V5H-45V-5M-45,20H45V30H-45V20Z"),minus:C("M35,5H-35V-5H35V5Z"),"minus-o":C("M0,40C-22,40,-40,22,-40,0C-40,-22,-22,-40,0,-40C22,-40,40,-22,40,0C40,22,22,40,0,40M0,-50A50,50,0,0,0,-50,0A50,50,0,0,0,0,50A50,50,0,0,0,50,0A50,50,0,0,0,0,-50M-25,5H25V-5H-25"),"minus-small":C("M35,35V-35H-35V35H35M35,-45A10,10,0,0,1,45,-35V35A10,10,0,0,1,35,45H-35A10,10,0,0,1,-45,35V-35C-45,-41,-40,-45,-35,-45H35M25,-5V5H-25V-5H25Z"),ok:C("M45,-25L-15,35L-42,8L-35,0L-15,21L38,-32L45,-25Z"),pack:["path",{fill:0,d:"M45,23C45,24,44,26,42,27L3,49C2,50,1,50,0,50C-1,50,-2,50,-3,49L-42,27C-44,26,-45,24,-45,23V-22C-45,-24,-44,-26,-42,-27L-3,-49C-2,-50,-1,-50,0,-50C1,-50,2,-50,3,-49L42,-27C44,-26,45,-24,45,-22V23M0,-39L-35,-20V20L0,39L35,20V-20L0,-39M0,-29L24,-15L0,-1L-24,-15L0,-29M25,14L5,26V8L25,-3V14M-5,26L-25,14V-3L-5,8V26Z"}],plug:C("M20,-25V-45H10V-25H-10V-45H-20V-25H-20C-25,-25,-30,-20,-30,-15V13L-12,30V45H13V30L30,13V-15C30,-20,25,-25,20,-25Z"),plus:C("M35,5H5V35H-5V5H-35V-5H-5V-35H5V-5H35V5Z"),"plus-o":C("M0,40C-22,40,-40,22,-40,0C-40,-22,-22,-40,0,-40C22,-40,40,-22,40,0C40,22,22,40,0,40M0,-50A50,50,0,0,0,-50,0A50,50,0,0,0,0,50A50,50,0,0,0,50,0A50,50,0,0,0,0,-50M5,-25H-5V-5H-25V5H-5V25H5V5H25V-5H5V-25Z"),"plus-small":C("M35,35V-35H-35V35H35M35,-45A10,10,0,0,1,45,-35V35A10,10,0,0,1,35,45H-35A10,10,0,0,1,-45,35V-35C-45,-41,-40,-45,-35,-45H35M-5,-25H5V-5H25V5H5V25H-5V5H-25V-5H-5V-25Z"),print:["path",{fill:0,d:"M30,-45H-30V-25H30M35,0A5,5,0,0,1,30,-5A5,5,0,0,1,35,-10A5,5,0,0,1,40,-5A5,5,0,0,1,35,0M20,35H-20V10H20M35,-20H-35A15,15,0,0,0,-50,-5V25H-30V45H30V25H50V-5A15,15,0,0,0,35,-20Z"}],question:C("M-10,35H5V50H-10V35M0,-50C27,-49,38,-22,23,-2C18,3,12,7,8,11C5,15,5,20,5,25H-10C-10,17,-10,10,-7,5C-3,0,3,-3,8,-7C20,-18,17,-34,0,-35A15,15,0,0,0,-15,-20H-30A30,30,0,0,1,0,-50Z"),redo:C("M32,-7C23,-15,11,-20,-2,-20C-26,-20,-45,-5,-52,16L-40,20C-35,4,-20,-7,-2,-7C7,-7,16,-4,23,2L5,20H50V-25L32,-7Z"),refresh:C("M28,-28C21,-35,11,-40,0,-40A40,40,0,0,0,-40,0A40,40,0,0,0,0,40C19,40,34,27,39,10H28C24,22,13,30,0,30A30,30,0,0,1,-30,0A30,30,0,0,1,0,-30C8,-30,16,-27,21,-21L5,-5H40V-40L28,-28Z"),right:["path",{fill:0,d:"M-40,-5V5H20L-7,33L0,40L39,0L0,-40L-7,-32L20,-5H-40Z"}],"right-double":C("M10,-30L40,0,10,30M-40,-30L-10,0,-40,30"),run:C("M23,-32A10,10,0,0,0,33,-42A10,10,0,0,0,23,-52A10,10,0,0,0,13,-42A10,10,0,0,0,23,-32M5,37L10,15L20,25V55H30V18L20,8L23,-7C29,0,39,5,50,5V-5C41,-5,33,-9,28,-17L23,-25C22,-28,18,-30,15,-30C13,-30,13,-29,11,-29L-15,-18V5H-5V-12L4,-15L-4,25L-28,20L-30,30L5,37M-40,-15A5,5,0,0,1,-45,-20A5,5,0,0,1,-40,-25H-25V-15H-40M-35,-35A5,5,0,0,1,-40,-40A5,5,0,0,1,-35,-45H-10V-35H-35M-45,5A5,5,0,0,1,-50,0A5,5,0,0,1,-45,-5H-25V5H-45Z"),search:C("M-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45M-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35Z"),select:C("M35,35H-35V-35H15V-45H-35C-41,-45,-45,-41,-45,-35V35A10,10,0,0,0,-35,45H35A10,10,0,0,0,45,35V-5H35M-20,-10L-27,-2L-5,20L45,-30L38,-37L-5,6L-20,-10Z"),unselect:C("M35,-45H-35C-41,-45,-45,-41,-45,-35V35A10,10,0,0,0,-35,45H35A10,10,0,0,0,45,35V-35C45,-41,41,-45,35,-45M35,-35V35H-35V-35H35Z"),share:C("M30,20C26,20,23,22,20,24L-15,3C-15,2,-15,1,-15,0C-15,-1,-15,-2,-15,-3L20,-24C23,-22,26,-20,30,-20A15,15,0,0,0,45,-35A15,15,0,0,0,30,-50A15,15,0,0,0,15,-35C15,-34,15,-33,15,-31L-20,-11C-22,-13,-26,-15,-30,-15A15,15,0,0,0,-45,0A15,15,0,0,0,-30,15C-26,15,-22,13,-20,11L16,32C16,33,15,34,15,35C15,43,22,50,30,50C38,50,45,43,45,35A15,15,0,0,0,30,20Z"),show:C("M0,-15A15,15,0,0,0,-15,0A15,15,0,0,0,0,15A15,15,0,0,0,15,0A15,15,0,0,0,0,-15M0,25A25,25,0,0,1,-25,0A25,25,0,0,1,0,-25A25,25,0,0,1,25,0A25,25,0,0,1,0,25M0,-37C-25,-37,-46,-22,-55,0C-46,22,-25,38,0,38C25,38,46,22,55,0C46,-22,25,-37,0,-37Z"),speaker:C("M40,35L33,28C41,21,45,11,45,0C45,-11,41,-21,33,-28L40,-35C49,-26,55,-14,55,0C55,14,49,26,40,35M26,21L19,14C23,11,25,6,25,0C25,-6,23,-11,19,-14L26,-21C32,-16,35,-8,35,0C35,8,32,16,26,21M-40,-45H0A10,10,0,0,1,10,-35V35A10,10,0,0,1,0,45H-40A10,10,0,0,1,-50,35V-35A10,10,0,0,1,-40,-45M-20,-35A10,10,0,0,0,-30,-25A10,10,0,0,0,-20,-15A10,10,0,0,0,-10,-25A10,10,0,0,0,-20,-35M-20,-5A20,20,0,0,0,-40,15A20,20,0,0,0,-20,35A20,20,0,0,0,0,15A20,20,0,0,0,-20,-5M-20,5A10,10,0,0,1,-10,15A10,10,0,0,1,-20,25A10,10,0,0,1,-30,15A10,10,0,0,1,-20,5Z"),"split-vertical":C("M30,20V5H15V50H5V-50H15V-5H30V-20L50,0L30,20M-50,0L-30,20V5H-15V50H-5V-50H-15V-5H-30V-20L-50,0Z"),"split-horizontal":C("M-20,30H-5V15H-50V5H50V15H5V30H20L0,50L-20,30M0,-50L-20,-30H-5V-15H-50V-5H50V-15H5V-30H20L0,-50Z"),star:C("M0,26L31,45L23,10L50,-14L14,-17L0,-50L-14,-17L-50,-14L-23,10L-31,45L0,26Z"),"tri-down":C("M-23,-17L0,6L23,-17L30,-10L0,20L-30,-10L-23,-17Z"),"tri-left":C("M17,23L-6,0L17,-23L10,-30L-20,0L10,30L17,23Z"),"tri-right":C("M-17,23L6,0L-17,-23L-10,-30L20,0L-10,30L-17,23Z"),"tri-up":C("M-23,17L0,-6L23,17L30,10L0,-20L-30,10L-23,17Z"),twitter:C("M52,-30C48,-28,44,-27,40,-27C44,-29,48,-33,49,-38C45,-36,41,-34,36,-33C32,-37,26,-40,20,-40C8,-40,-1,-30,-1,-19C-1,-17,-1,-15,-1,-14C-19,-15,-34,-23,-45,-36C-47,-33,-48,-29,-48,-25C-48,-18,-44,-11,-38,-7C-42,-7,-45,-8,-48,-10C-48,-10,-48,-10,-48,-10C-48,1,-41,9,-31,11C-33,12,-35,12,-37,12C-38,12,-39,12,-41,12C-38,20,-30,26,-21,26C-28,32,-37,36,-47,36C-49,36,-51,36,-52,35C-43,41,-31,45,-19,45C20,45,42,12,42,-16C42,-17,42,-18,42,-19C46,-22,49,-26,52,-30Z"),undo:C("M3,-20C-11,-20,-23,-15,-32,-7L-50,-25V20H-5L-23,2C-16,-4,-7,-7,3,-7C20,-7,35,4,41,20L52,16C45,-5,26,-20,3,-20Z"),up:C("M-30,30L0,-30,30,30"),"up-double":C("M-30,40L0,10,30,40M-30,-10L0,-40,30,-10"),user:C("M0,-40A20,20,0,0,1,20,-20A20,20,0,0,1,0,0A20,20,0,0,1,-20,-20A20,20,0,0,1,0,-40M0,10C22,10,40,19,40,30V40H-40V30C-40,19,-22,10,0,10Z"),wait:C("M0,-5A5,5,0,0,0,-5,0A5,5,0,0,0,0,5A5,5,0,0,0,5,0A5,5,0,0,0,0,-5M3,-50C25,-50,26,-32,14,-26C9,-24,7,-19,6,-14C8,-13,10,-11,12,-9C30,-19,50,-15,50,3C50,25,32,26,26,14C24,9,19,7,14,6C13,8,11,10,9,12C19,30,15,50,-2,50C-25,50,-25,32,-14,26C-9,24,-7,19,-6,14C-8,13,-10,11,-12,9C-30,19,-50,15,-50,-2C-50,-25,-32,-26,-26,-14C-24,-9,-19,-7,-14,-6C-13,-8,-11,-10,-9,-12C-19,-30,-15,-50,3,-50Z"),"zoom-in":C("M18,10L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18M-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10M0,-10H-10V0H-15V-10H-25V-15H-15V-25H-10V-15H0V-10Z"),"zoom-out":C("M18,10H14L12,9C17,3,20,-4,20,-12A33,33,0,0,0,-12,-45A33,33,0,0,0,-45,-12A33,33,0,0,0,-12,20C-4,20,3,17,9,12L10,14V18L35,43L43,35L18,10M-12,10C-25,10,-35,0,-35,-12C-35,-25,-25,-35,-12,-35C0,-35,10,-25,10,-12C10,0,0,10,-12,10M-25,-15H0V-10H-25V-15Z")};var A,t,l={add:"plus",back:"left",help:"question",save:"export"};for(A in l)t=l[A],V.exports.iconsBook[A]=V.exports.iconsBook[t];V.exports._=M});
//# sourceMappingURL=tfw.icons.js.map
require("polyfill.object.values",function(n,r,e){var t=function(){function r(){return t(e,arguments)}var e={en:{},fr:{}},t=n("$").intl;return r.all=e,r}();Object.values||(window.Object.values=function(n){var r=[];for(var e in n)r.push(n[e]);return r}),r.exports._=t});
//# sourceMappingURL=polyfill.object.values.js.map
require("tfw.data-binding",function(n,t,e){function r(n,t,r,o){var i="function"==typeof o;void 0===t[c]&&(t[c]={}),t[c][r]={value:o,event:new l};var u;u="function"==typeof n?function(e){e=n(e),(i||t[c][r].value!==e)&&(t[c][r].value=e,t[c][r].event.fire(e,t,r))}:function(n){(i||t[c][r].value!==n)&&(t[c][r].value=n,t[c][r].event.fire(n,t,r))};var a=o;return i||(a=function(){return t[c][r].value}),Object.defineProperty(t,r,{get:a,set:u,configurable:!1,enumerable:!0}),e.bind.bind(e,t,r)}function o(n){return n.toLowerCase()}function i(n){return n.trim()}var u=function(){function t(){return r(e,arguments)}var e={en:{}},r=n("$").intl;return t.all=e,t}();n("polyfill.string");var a=n("dom"),f=n("tfw.css").parseUnit,l=n("tfw.listeners"),c="_tfw.data-binding_",s={castFunction:function(n){return"function"!=typeof n?null:n},castArray:function(n){return Array.isArray(n)?n:null===n||void 0===n?[]:[n]},castBoolean:function(n){return"boolean"==typeof n?n:"string"==typeof n?"0"!=(n=n.trim().toLowerCase())&&"false"!=n&&"no"!=n&&"null"!=n&&"undefined"!=n:"number"==typeof n?0!==n:null},castColor:function(n){return""+n},castDate:function(n){return"number"==typeof n||"string"==typeof n?new Date(n):n instanceof Date?n:new Date},castEnum:function(n){var t=n.map(o);return function(e){if("number"==typeof e)return n[Math.floor(e)%n.length];if("string"!=typeof e)return n[0];var r=t.indexOf(e.trim().toLowerCase());return r<0&&(r=0),n[r]}},castInteger:function(n){return"number"==typeof n?Math.floor(n):"boolean"==typeof n?n?1:0:"string"==typeof n?parseInt(n):Number.NaN},castFloat:function(n){return"number"==typeof n?n:"boolean"==typeof n?n?1:0:"string"==typeof n?parseFloat(n):Number.NaN},castRegexp:function(n){if(n instanceof RegExp)return n;if("string"==typeof n&&0!=n.trim().length)try{return new RegExp(n)}catch(t){console.error("[castRegexp] /"+n+"/ ",t)}return null},castString:function(n){return"string"==typeof n?n:void 0===n||null===n?"":JSON.stringify(n)},castStringArray:function(n){return Array.isArray(n)?n:null===n||void 0===n?[]:"string"==typeof n?n.split(",").map(i):[JSON.stringify(n)]},castUnit:function(n){return n?void 0!==n.v?(n.v=parseFloat(n.v),isNaN(n.v)?{v:0,u:"px"}:("string"!=typeof n.u?n.u="px":n.u=n.u.trim().toLowerCase(),""===n.u&&(n.u="px"),{v:n.v,u:n.u})):"number"==typeof n?{v:n,u:"px"}:"string"!=typeof n?{v:0,u:"px"}:f(""+n):{v:0,u:"px"}},castValidator:function(n){if("function"==typeof n)return n;if("boolean"==typeof n)return function(){return n};if("string"==typeof n&&0!=n.trim().length)try{var t=new RegExp(n);return t.test.bind(t)}catch(t){console.error("[castValidator] /"+n+"/ ",t)}return function(){return null}}};e.fire=function(n,t,e){var r=n[t];void 0===e&&(e=r),n[c][t].value=e,n[c][t].event.fire(n[t],n,t)},e.set=function(n,t,e){void 0===n[c]&&(n[c]={}),void 0===n[c][t]&&(n[c][t]={}),n[c][t].value=e},e.get=function(n,t){if(void 0!==n[c]&&void 0!==n[c][t])return n[c][t].value},e.readOnly=function(n,t,e){"function"==typeof e?Object.defineProperty(n,t,{get:e,set:function(){},configurable:!1,enumerable:!0}):Object.defineProperty(n,t,{value:e,writtable:!1,configurable:!1,enumerable:!0})},e.prop=r.bind(null,null),e.propWidget=function(n,t,r,o){return void 0===o&&(o=t),void 0===n[c]&&(n[c]={}),n[c][t]={event:new l},e.bind(r,o,function(e){n[c][t].event.fire(e,n,t)}),Object.defineProperty(n,t,{get:function(){return r[o]},set:function(n){r[o]=n},configurable:!1,enumerable:!0}),e.bind.bind(e,n,t)},e.propToggleClass=function(n,t,e,o){"string"!=typeof o&&(o="");var i={};return"string"==typeof e?i[e]=e:Array.isArray(e)?e.forEach(function(n){i[n]=n}):i=e,r(null,n,t)(function(t){var e,r;for(e in i)r=i[e],e==t?a.addClass(n.element,o+r):a.removeClass(n.element,o+r)})},e.propAddClass=function(n,t,e){return void 0===e&&(e=t),r(s.castBoolean,n,t)(function(t){t?a.addClass(n.element,e):a.removeClass(n.element,e)})},e.propRemoveClass=function(n,t,e){return void 0===e&&(e=t),r(s.castBoolean,n,t)(function(t){t?a.removeClass(n.element,e):a.addClass(n.element,e)})},e.propArray=r.bind(null,s.castArray),e.propBoolean=r.bind(null,s.castBoolean),e.propColor=r.bind(null,s.castColor),e.propDate=r.bind(null,s.castDate),e.propEnum=function(n){return r.bind(null,s.castEnum(n))},e.propFunction=r.bind(null,s.castFunction),e.propInteger=r.bind(null,s.castInteger),e.propFloat=r.bind(null,s.castFloat),e.propRegexp=r.bind(null,s.castRegexp),e.propString=r.bind(null,s.castString),e.propStringArray=r.bind(null,s.castStringArray),e.propUnit=r.bind(null,s.castUnit),e.propValidator=r.bind(null,s.castValidator),e.bind=function(n,t,e,r,o){if(void 0===n[c]||void 0===n[c][t])throw console.error(JSON.stringify(t)+" is not a bindable property!",{srcObj:n,srcAtt:t,dstObj:e,dstAtt:r,options:o}),Error(JSON.stringify(t)+" is not a bindable property!");void 0===o&&(o={}),o.value&&(o.converter=function(){return o.value});var i="function"==typeof e?e:function(n,t,i){e[r]="function"==typeof o.converter?o.converter(n):n};return n[c][t].event.add(i),o},e.extend=function(n,t,r,o){var i,u,a=JSON.parse(JSON.stringify(n));for(i in t)"$"!=i.charAt(0)&&(u=t[i],void 0===a[i]?console.error("[tfw.data-binding.extend] Undefined argument: `"+i+"`!"):a[i]=u);if(void 0!==r){for(i in t)"$"==i.charAt(0)&&Object.defineProperty(r,i,{value:t[i],writable:!1,configurable:!1,enumerable:!1});for(i in a)"$"!=i.charAt(0)&&(r[i]=a[i]);if("function"==typeof o){for(i in r[c])e.bind(r,i,o);o()}}return a},e.converters=s,t.exports._=u});
//# sourceMappingURL=tfw.data-binding.js.map
require("tfw.css",function(e,r,t){var i=function(){function r(){return i(t,arguments)}var t={en:{}},i=e("$").intl;return r.all=t,r}();t.parseUnit=function(e){for(var r,t=0,i=0;i<e.length;i++)if(r=e.charAt(i),0===t){if("-"==r||"+"==r||r>="0"&&r<="9")t=1;else if("."==r)t=2;else if(r>" ")break}else if(1==t){if("."==r)t=2;else if(r<"0"||r>"9")break}else if(2==t&&(r<"0"||r>"9"))break;var n={v:parseFloat(e.substr(0,i)),u:e.substr(i).trim().toLowerCase()};return""===n.u&&(n.u="px"),n},r.exports._=i});
//# sourceMappingURL=tfw.css.js.map
require("polyfill.string",function(r,t,n){var e=function(){function t(){return e(n,arguments)}var n={en:{}},e=r("$").intl;return t.all=n,t}();"function"!=typeof String.toLowerCase&&(String.toLowerCase=function(r){return r.toLowerCase()},String.toUpperCase=function(r){return r.toUpperCase()},String.trim=function(r){return r.trim()}),t.exports._=e});
//# sourceMappingURL=polyfill.string.js.map
require("theme",function(e,n,r){var t=function(){function n(){return t(r,arguments)}var r={en:{},fr:{}},t=e("$").intl;return n.all=r,n}();e("assets"),e("font.josefin");var i=e("dom");i.registerTheme("main",{bgP:"#06D",bgS:"#F80"}),i.applyTheme("main"),n.exports._=t});
//# sourceMappingURL=theme.js.map
require("font.josefin",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{},fr:{}},e=n("$").intl;return r.all=t,r}();r.exports._=e});
//# sourceMappingURL=font.josefin.js.map
require("x-widget",function(e,r,t){function n(r,t,n,i){void 0===i&&(i={});try{var a,c=e(t),f=new c(n);if("function"==typeof f.element)a=f.element();else if(f.element instanceof Node)a=f.element;else{if(!(f.$ instanceof Node))throw Error('Sorry, but "'+t+'" is not a widget nor a view!',f);a=f.$}var u=document.getElementById(r);return u&&u.parentNode.replaceChild(a,u),a.setAttribute("id",r),d.addClass(a,i.class||""),o(r,f),f}catch(e){throw console.error("[x-widget] Unable to create widget `"+t+"`!"),console.error("[x-widget] id = ",r,", args = ",n),Error(e)}}function i(e){var r,t=d.tag(e.elem);e.attr&&(d.att(t,e.attr),r=e.attr.id),Array.isArray(e.children)&&e.children.forEach(function(e){d.add(t,e)});var n,i,a={};if(e.prop)for(n in e.prop)i=e.prop[n],Object.defineProperty(a,n,{value:i,writable:!1,configurable:!1,enumerable:!0});return Object.defineProperty(a,"element",{value:t,writable:!1,configurable:!1,enumerable:!0}),void 0!==r&&o(r,a),a}function o(e,r){f[e]=r;var t=u[e];return void 0!==t&&window.setTimeout(function(){t.forEach(function(e){e(r)}),delete u[e]}),"function"==typeof r.element?r.element:r.element||r}var a=function(){function r(){return n(t,arguments)}var t={en:{}},n=e("$").intl;return r.all=t,r}(),d=e("dom"),c=e("tfw.data-binding"),f={},u={},l=function(e,r,t,o){try{return"string"==typeof e?n.call(this,e,r,t,o):i.call(this,e)}catch(e){throw console.error(e),Error("Exception in "+r+"("+JSON.stringify(t)+"):\n"+e)}};l.template=function(r){var t,n,i,a="",d={};for(t in r)n=r[t],"name"==t?a=n:"id"==t?i=n:"$"==t.charAt(0)&&(d[t.substr(1)]=n);var c=e(a),f=new c(d);return i&&o(i,f),"function"==typeof f.element?f.element():f.element||f},l.getById=function(e){if(!f[e])throw Error("[x-widget.getById()] ID not found: "+e+"!");return f[e]},l.onWidgetCreation=function(e,r){void 0===f[e]?void 0===u[e]?u[e]=[r]:u[e].push(r):window.setTimeout(function(){r(f[e])})},l.bind=function(r,t){var n,i,o,a,d,u=f[r];for(n in t)a=t[n].B,Array.isArray(a)&&a.forEach(function(e){if(void 0===(i=f[e[0]]))return void console.error("[x-widget:bind("+r+')] Trying to bind attribute "'+n+'" of widget "'+r+'" to the unexisting widget "'+e[0]+'"!');o=e[1];try{if(2==e.length)c.bind(i,o,u,n);else{var t=e[2];c.bind(i,o,function(){u[n]=t})}}catch(t){console.error("Binding error for widget `"+r+"`!",{ex:t,binding:e})}}),d=t[n].S,Array.isArray(d)&&d.forEach(function(t){var i=APP,o=t;if(Array.isArray(t)){try{i=e(t[0])}catch(e){throw console.error("[x-widget:bind] Widget `"+r+"` can't require unexistent `"+t[0]+"`: ",e),e}o=t[1]}if("function"!=typeof(o=i[o]))throw Array.isArray(t)?Error("[x-widget:bind]  Widget `"+r+"` use unexisting slot `"+t[1]+"` of module `"+t[0]+"`!"):Error("[x-widget:bind]  Widget `"+r+"` use unexisting slot `"+t+"` of main module `APP`!");try{c.bind(u,n,o)}catch(e){console.error("Binding error for widget `"+r+"`!",{ex:e,dstObj:u,dstAtt:n,fct:o,slot:t})}})},r.exports=l,r.exports._=a});
//# sourceMappingURL=x-widget.js.map
require("wdg.showhide",function(e,t,n){function i(e){function t(){n.value=!n.value,n.focus=!0}var n=this,i=new l({content:"tri-right",size:"24px"}),o=s.tag("span","label"),d=s.div("head",[i,o]),h=s.div("body","thm-bg0"),c=s.elem(this,"div","wdg-showhide","thm-ele2",[d,h]);r(this,function(e){switch(e.keyCode){case 13:case 32:n.value=!n.value}console.info("[wdg.showhide] evt=",e)}),a.propBoolean(this,"value")(function(e){e?(s.addClass(c,"show"),s.removeClass(c,"fade-in"),window.setTimeout(function(){s.addClass(c,"fade-in")})):s.removeClass(c,"show")}),a.propBoolean(this,"simple")(function(e){e?(s.addClass(c,"simple"),s.removeClass(c,"thm-ele2"),s.removeClass(d,"thm-bgPD")):(s.removeClass(c,"simple"),s.addClass(c,"thm-ele2"),s.addClass(d,"thm-bgPD"))}),a.propString(this,"label")(function(e){o.textContent=e}),a.propUnit(this,"maxHeight")(function(e){e.v<=0?h.style.maxHeight="none":h.style.maxHeight=e.v+e.u}),a.prop(this,"content")(function(e){s.clear(h),Array.isArray(e)?e.forEach(function(e){s.add(h,e)}):void 0!==e&&null!==e&&s.add(h,e)}),a.propRemoveClass(this,"wide","inline"),a.propRemoveClass(this,"visible","hide"),e=a.extend({value:!0,label:"",content:null,maxHeight:null,visible:!0,wide:!0,simple:!1,focus:!1},e,this),s.on(d,t),this.append=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),s.add(h,e),n},this.prepend=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),h.insertBefore(e,h.childNodes[0]),n}}var o=function(){function t(){return i(n,arguments)}var n={en:{}},i=e("$").intl;return t.all=n,t}(),s=e("dom"),a=e("tfw.data-binding"),l=e("wdg.icon"),r=e("tfw.focusable");i.prototype.clear=function(){return this.content=[],this},t.exports=i,t.exports._=o});
//# sourceMappingURL=wdg.showhide.js.map
require("tfw.focusable",function(n,t,e){var o=function(){function t(){return o(e,arguments)}var e={en:{},fr:{}},o=n("$").intl;return t.all=e,t}(),u=n("dom"),f=n("tfw.data-binding"),i=function(n,t){"function"!=typeof t&&(t=function(){}),u.addClass(n,"tfw-focusable");var e=u.tag("input");u(n).insertAdjacentElement("afterbegin",u.div("tfw-focusable-invisible",[e])),e.addEventListener("keydown",function(n){t(n),e.value=""}),e.addEventListener("focus",function(){u.addClass(n,"focus"),n.focus=!0}),e.addEventListener("blur",function(){u.removeClass(n,"focus"),n.focus=!1}),f.propBoolean(n,"focus")(function(n){window.setTimeout(function(){n?e.focus():e.blur()})})};t.exports=i,t.exports._=o});
//# sourceMappingURL=tfw.focusable.js.map
require("wdg.icon",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{}},e=n("$").intl;return r.all=t,r}();r.exports=n("tfw.view.icon"),r.exports._=e});
//# sourceMappingURL=wdg.icon.js.map
require("wdg.multiball",function(n,e,t){function a(){var n=this,e=i(this.$elements.canvas.$),t=new v(e,{vert:c.vert,frag:c.frag}),a=new v(e,{vert:c.vertExtra,frag:c.fragExtra}),r=l(),o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enable(e.DEPTH_TEST),e.clearColor(1,1,1,1),e.clearDepth(1);var s=d.identity(),u=d.identity(),h=function(i){requestAnimationFrame(h);var l=e.canvas.clientWidth,c=e.canvas.clientHeight;f(e),d.perspective(.35*Math.PI,l/c,.1,10,s),d.rotationXY(3.27*Math.cos(458e-6*i),5.78*Math.sin(147e-6*i),u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);var v=n.extra?a:t;v.use(),v.$uniProjection=s,v.$uniRotation=u,v.$uniScreenWidth=l*window.devicePixelRatio,v.$uniDistance=.5,v.$uniRadius=.17,v.$uniAlpha=n.alpha,v.bindAttribs(o,"attPoint","attLevel");var p=n.dense?r.length/4:200;e.drawArrays(e.POINTS,0,p)};requestAnimationFrame(h)}function i(n){return n.getContext("webgl",{preserveDrawingBuffer:!0})}function r(n){void 0===n&&(n=1);var e,t,a=[0,0,n];for(e=0;e<5;e++)t=Math.PI*e*.4,a.push(n*Math.cos(t),n*Math.sin(t),.5*n);for(e=0;e<5;e++)t=Math.PI*(.4*e+.2),a.push(n*Math.cos(t),n*Math.sin(t),-.5*n);return a.push(0,0,-n),new Float32Array(a)}function o(){return new Uint16Array([0,1,2,0,2,3,0,3,4,0,4,5,0,5,1,1,6,2,2,7,3,3,8,4,4,9,5,5,10,1,11,10,9,11,9,8,11,8,7,11,7,6,11,6,10,10,6,1,6,7,2,7,8,3,8,9,4,9,10,5])}function l(){var n,e,t,a,i,l=r(),s=o(),c=[];for(n=0;n<20;n++){var u=l[3*s[3*n+0]+0],d=l[3*s[3*n+0]+1],f=l[3*s[3*n+0]+2],v=l[3*s[3*n+1]+0],h=l[3*s[3*n+1]+1],p=l[3*s[3*n+1]+2],m=l[3*s[3*n+2]+0],w=l[3*s[3*n+2]+1],x=l[3*s[3*n+2]+2];e=u+v+m,t=d+h+w,a=f+p+x,i=Math.sqrt(e*e+t*t+a*a),c.push(e/i,t/i,a/i,0)}var g;for(g=1;g<10;g++)for(n=0;n<20;n++)e=c[4*n+0],t=c[4*n+1],a=c[4*n+2],c.push(e,t,a,g);for(n=0;n<12;n++)for(e=l[3*n+0],t=l[3*n+1],a=l[3*n+2],i=Math.sqrt(e*e+t*t+a*a),g=0;g<10;g++)c.push(e/i,t/i,a/i,g);return console.info("[wdg.multiball-1] vertices=",c),new Float32Array(c)}var s=function(){function e(){return a(t,arguments)}var t={en:{},fr:{}},a=n("$").intl;return e.all=t,e}(),c={vert:"// Perspective\nuniform mat4 uniProjection;\n// Rotation de la multiball.\nuniform mat4 uniRotation;\n// Largeur de l'écran en pixels.\nuniform float uniScreenWidth;\n\n// Rayon de la sphère\nuniform float uniRadius;\n// Distance de la sphère au centre.\n// (rayon de son orbite)\nuniform float uniDistance;\n// Facteur de diminution des rayons des sphères\n// sur les orbites successives\nuniform float uniAlpha;\n\n// Coordonnées du centre de la sphère\n// comme si elle était sur l'orbite 0.\nattribute vec3 attPoint;\n// Numéro d'orbite (de 0 à 9).\nattribute float attLevel;\n\nvoid main() {\n  // On va reculer un peu la multiball pour qu'on la voit bien\n  vec4 translation = vec4(0, 0, -2.5, 0);\n\n  // Application de la formule pour calculer le rayon de l'orbite courante.\n  float alpha1 = pow( uniAlpha, attLevel );\n  float alpha2 = alpha1 * uniAlpha;\n  float dist = uniDistance - uniRadius * (1.0 + alpha1)\n    + 2.0 * uniRadius * (alpha2 - 1.0) / (uniAlpha - 1.0);\n\n  // Rotation, translation et projection en perspective.\n  vec4 vertex = uniRotation * vec4( attPoint * dist, 1 );\n  vertex +=  translation;\n  gl_Position = uniProjection * vertex;\n\n  // Détermination de la taille de la sphère en pixels.\n  vec4 point = vec4( uniRadius * alpha1, 0, vertex.z, 1 );\n  vec4 size = uniProjection * point;  \n  gl_PointSize = uniScreenWidth * size.x / size.w;\n\n}\n",frag:"precision mediump float;\n// Couleur principale d'une sphère.\nconst vec3 COLOR = vec3(1, .5, 0);\n\nvoid main() {\n  float x = 2.0 * (gl_PointCoord.x - .5);\n  float y = 2.0 * (gl_PointCoord.y - .5);\n  // Distance au carré.\n  float r = x * x + y * y;\n  // Au delà du rayon d'un cercle, on n'affiche rien.\n  if( r > 1.0 ) discard;\n  // Ajout d'un liseré noir dont l'épaisseur est\n  // un dixième du rayon.\n  if( r > .9 * .9 ) {\n    gl_FragColor = vec4( 0, 0, 0, 1 );\n    return;\n  }\n  // Assombrir quand le rayon devient grand.\n  vec3 color = COLOR * (1.0 - r * .4);\n  gl_FragColor = vec4( color, 1.0 );\n}\n",vertExtra:"uniform mat4 uniProjection;\nuniform mat4 uniRotation;\nuniform float uniScreenWidth;\n\n// Rayon de la sphère\nuniform float uniRadius;\n// Distance de la sphère au centre.\nuniform float uniDistance;\n// Facteur de diminution des rayons des sphères successives.\nuniform float uniAlpha;\n\nattribute vec3 attPoint;\nattribute float attLevel;\n\nvarying vec3 varAxis;\n\n\nvoid main() {\n  vec4 axis = uniRotation * vec4( attPoint, 1 );\n  varAxis = normalize( axis.xyz );\n  \n  vec4 translation = vec4(0, 0, -2.5, 0);\n  \n  float alpha1 = pow( uniAlpha, attLevel );\n  float alpha2 = alpha1 * uniAlpha;\n  float dist = uniDistance - uniRadius * (1.0 + alpha1) + 2.0 * uniRadius * (alpha2 - 1.0) / (uniAlpha - 1.0);\n  \n  vec4 vertex = uniRotation * vec4( attPoint * dist, 1 );  \n  vertex +=  translation;\n  gl_Position = uniProjection * vertex;\n\n  vec4 point = vec4( uniRadius * alpha1, 0, vertex.z, 1 );\n  vec4 size = uniProjection * point;\n  \n  gl_PointSize = uniScreenWidth * size.x / size.w;\n}\n",fragExtra:"precision mediump float;\n\nconst vec3 BLACK = vec3(0, 0, 0);\nconst vec3 WHITE = vec3(1, 1, 1);\nconst vec3 ORANGE = vec3(1, .5, 0);\nconst vec3 BLUE = vec3(0, .4, .866666667);\n\nconst vec3 LIGHT = normalize(vec3(-1, 2, 4));\n\nvarying vec3 varAxis;\n\n\n// Si on fait face à un point de coordonnées (x,y) dans un cercle 2D.\n// On peut imaginer qu'il s'agit en fait d'un point (x,y,zz) dans une demi-sphère.\n// Cette fonction retourne les coordonnées (x,y,zz) à partir du point (x,y).\nvec3 getSphericalVector( float x, float y ) {\n  float phi = asin( y );\n  float radius = cos( phi );\n  float theta = 0.0;\n  if( x != 0.0 ) theta = asin( x / radius );\n\n  float zz = radius * cos( theta );\n  return vec3(x, -y, zz);\n}\n\n\nvoid main() {\n  float x = 2.0 * (gl_PointCoord.x - .5);\n  float y = 2.0 * (gl_PointCoord.y - .5);\n  float r = x * x + y * y;\n  if( r > 1.0 ) discard;\n\n  vec3 color = BLUE;\n  vec3 arrow = getSphericalVector( x, y );\n  if( mod(1.0 + dot( arrow, varAxis ), .35) > 0.1 )\n    color = ORANGE;\n\n  if( r > .85 ) {\n    // Liseré noir extérieur.\n    color = BLACK;\n  }\n\n  float light = dot( arrow, LIGHT );\n  if( light < 0.43 ) color *= .5;\n  else if( light > 0.95 ) {    \n    color = mix( color, WHITE, .75 );\n  }\n  else if( light > 0.75 ) {    \n    color = mix( color, WHITE, .5 );\n  }\n  \n  gl_FragColor = vec4( color, 1.0 );\n}\n"},u={init:a},d=n("webgl.math").m4,f=n("webgl.resize"),v=n("webgl.program");try{e.exports=function(){function e(n,e,t){return void 0===n[e]?t:n[e]}function t(n,e,t){t?a.addClass(n,e):a.removeClass(n,e)}var a=n("dom"),i=n("tfw.binding.property-manager"),r=n("tfw.view").Tag,o=n("tfw.binding.link"),l=n("tfw.view"),s=n("tfw.binding.converters"),c=n("tfw.view.textbox"),d=n("tfw.view.checkbox");l.ensureCodeBehind(u,"init");var f=s.get("boolean"),v=s.get("float");return function(n){try{void 0===n&&(n={}),this.$elements={};var l=this,s=i(this);s.create("fullscreen",{cast:f}),s.create("extra",{cast:f}),s.create("dense",{cast:f}),s.create("alpha",{cast:v(0)});var h=new r("DIV",["class"]),p=new r("CANVAS");this.$elements.canvas=p;var m=new c({label:"Coeff",width:"48px"}),w=new r("DIV",["class"]),x=new d({content:"Plein écran",wide:!1});a.add(w,x);var g=new r("DIV",["class"]),b=new d({content:"Dense",wide:!1});a.add(g,b);var A=new r("DIV",["class"]),y=new d({content:"Rayures",wide:!1});a.add(A,y),a.add(h,p,m,w,g,A),Object.defineProperty(this,"$",{value:h.$,writable:!1,enumerable:!1,configurable:!1}),new o({A:{obj:l,name:"fullscreen"},B:{action:function(n){t(h,"fullscreen",n)}},name:"fullscreen > undefined"}),new o({A:{obj:l,name:"alpha"},B:{obj:m,name:"value"},name:"alpha > e_1/value"}),new o({A:{obj:l,name:"fullscreen"},B:{obj:x,name:"value"},name:"fullscreen > e_3/value"}),new o({A:{obj:l,name:"dense"},B:{obj:b,name:"value"},name:"dense > e_5/value"}),new o({A:{obj:l,name:"extra"},B:{obj:y,name:"value"},name:"extra > e_7/value"}),h.class="thm-ele8 wdg-multiball",w.class="bottom",g.class="left",A.class="top",this.fullscreen=e(n,"fullscreen",!1),this.extra=e(n,"extra",!1),this.dense=e(n,"dense",!1),this.alpha=e(n,"alpha",.5),u.init.call(this),a.addClass(this,"view","custom")}catch(n){throw console.error("mod/wdg.multiball.js",n),Error('Instantiation error in XJS of "mod/wdg.multiball.js":\n'+n)}}}()}catch(n){throw Error('Definition error in XJS of "mod/wdg.multiball.js"\n'+n)}e.exports._=s});
//# sourceMappingURL=wdg.multiball.js.map
require("tfw.view.checkbox",function(e,n,t){function i(e){r(this).on("value",e)}function a(e){["enter","space"].indexOf(e.code.toLowerCase())>-1&&(this.value=!this.value)}function o(){new l(this.$)}var s=function(){function n(){return i(t,arguments)}var t={en:{},fr:{}},i=e("$").intl;return n.all=t,n}(),c={init:o,on:i,onKeyUp:a},r=e("tfw.binding.property-manager"),l=e("tfw.touchable");try{n.exports=function(){function n(e,n,t){return void 0===e[n]?t:e[n]}function t(e,n,t){t?a.addClass(e,n):a.removeClass(e,n)}function i(e,n,t){t?a.removeClass(e,n):a.addClass(e,n)}var a=e("dom"),o=e("tfw.binding.property-manager"),s=e("tfw.view").Tag,r=e("tfw.binding.link"),l=e("tfw.view"),d=e("tfw.binding.converters");l.ensureCodeBehind(c,"on","init","onKeyUp");var u=d.get("boolean"),v=d.get("string"),f=function(e){try{void 0===e&&(e={}),this.$elements={};var d=this,f=o(this);f.create("value",{cast:u}),f.create("inverted",{cast:u}),f.create("visible",{cast:u}),f.create("wide",{cast:u}),f.create("content",{cast:v});var w=new s("BUTTON",["class"]),h=new s("DIV",["class"]),b=new s("DIV",["class"]);this.$elements.bar=b;var m=new s("DIV",["class"]);this.$elements.btn=m,a.add(h,b,m);var p=new s("DIV",["class"]);a.add(w,h,p),Object.defineProperty(this,"$",{value:w.$,writable:!1,enumerable:!1,configurable:!1}),l.events(w,{tap:function(e){d.value=!d.value},keyup:c.onKeyUp.bind(this)}),new r({A:{obj:d,name:"value"},B:{action:function(e){t(w,"ok",e)}},name:"value > undefined"}),new r({A:{obj:d,name:"inverted"},B:{action:function(e){t(w,"inverted",e)}},name:"inverted > undefined"}),new r({A:{obj:d,name:"wide"},B:{action:function(e){t(w,"wide",e)}},name:"wide > undefined"}),new r({A:{obj:d,name:"visible"},B:{action:function(e){i(w,"hide",e)}},name:"visible > undefined"}),new r({A:{obj:d,name:"value"},B:{action:function(e){t(b,"thm-bgSL",e),i(b,"thm-bg0",e)}},name:"value > undefined"}),new r({A:{obj:d,name:"value"},B:{action:function(e){t(m,"thm-bgS",e),i(m,"thm-bg0",e)}},name:"value > undefined"}),f.on("content",function(e){a.clear(p,e)}),w.class="tfw-view-checkbox",h.class="pin",b.class="bar thm-ele2",m.class="btn thm-ele2",p.class="txt",this.value=n(e,"value",!1),this.inverted=n(e,"inverted",!1),this.visible=n(e,"visible",!0),this.wide=n(e,"wide",!0),this.content=n(e,"content","Checkbox"),c.init.call(this),a.addClass(this,"view","custom")}catch(e){throw console.error("mod/tfw.view.checkbox.js",e),Error('Instantiation error in XJS of "mod/tfw.view.checkbox.js":\n'+e)}};return f.prototype.on=c.on,f}()}catch(e){throw Error('Definition error in XJS of "mod/tfw.view.checkbox.js"\n'+e)}n.exports._=s});
//# sourceMappingURL=tfw.view.checkbox.js.map
require("tfw.touchable",function(t,e,a){var i=function(){function e(){return i(a,arguments)}var a={en:{},fr:{}},i=t("$").intl;return e.all=a,e}(),o=t("dom"),n=t("dom.fx"),s=t("tfw.listeners"),r=function(t,e){var a=this;void 0===e&&(e={}),void 0===e.enabled&&(e.enabled=!0),t=o(t),this.enabled=e.enabled,this.color=e.color||"#333",this.classToAdd=e.classToAdd,this.opacity=e.opacity||.4,this.element=o(t),this.tap=new s,this.press=new s,o.addClass(t,"tfw-touchable");var i,r,c=o.div("tfw-touchable-shadow"),l=o.div("tfw-touchable-container",[c]),d=n().css(c,{transition:"none",transform:"scale(0)"}).exec(function(e){var n=a.classToAdd;"string"==typeof n&&o.addClass(t,n),-1==["relative","absolute","fixed"].indexOf(getComputedStyle(t).position)&&(t.style.position="relative");var s=t.getBoundingClientRect(),d=s.width,f=s.height;d=Math.max(i,d-i),f=Math.max(r,f-r);var u=Math.ceil(Math.sqrt(d*d+f*f));o.css(c,{left:i+"px",top:r+"px",margin:"-"+u+"px",width:2*u+"px",height:2*u+"px",opacity:0,background:a.color,transform:"scale(0)",transition:"all .15s ease","transition-timing-function":"cubic-bezier(0,1,0.780,1)","-moz-transition-timing-function":"cubic-bezier(0,1,0.780,1)","-webkit-transition-timing-function":"cubic-bezier(0,1,0.780,1)"}),o.add(t,l)}).wait(10).css(c,{opacity:a.opacity,transform:"scale(.25)"}).wait(150).css(c,{transform:"scale(.2)"}).wait(150).css(c,{transition:"all .6s ease",transform:"scale(1)",opacity:0}).wait(600).detach(l).exec(function(){var e=a.classToAdd;"string"==typeof e&&o.removeClass(t,e)}),f=0;o.on(t,{down:function(t){a.enabled&&(t.stopPropagation(),t.preventDefault(),i=Math.floor(t.x),r=Math.floor(t.y),d.start(),f=Date.now())},tap:function(t){if(!a.enabled)return void console.log("[tfw.touchable] DISABLED!");console.log("[tfw.touchable] TAP",t),a.tap.fire(t)}})};e.exports=r,e.exports._=i});
//# sourceMappingURL=tfw.touchable.js.map
require("dom.fx",function(t,e,n){function i(t){if(t==this._session){if(this._index>=this._tasks.length)return this._index=0,this._started=!1,delete this._session,void this._onEnd(this);var e=this,n=this._tasks[this._index++];this._debug&&console.info("[dom.fx] tsk["+(this._index-1)+"]: ",n.label,"("+(Date.now()-this._startTime)+" ms)",n.args,t),n(function(){l(i.bind(e,t))},!0)}}function o(t,e){e.terminate&&e.terminate();var n=t.getBoundingClientRect();console.info("[dom.fx] rect=...",n);var i=c.div();c.css(i,{display:"inline-block",width:n.width+"px",height:n.height+"px"}),e.onBeforeReplace(t),c.replace(i,t),e.onAfterReplace(t),e.substitute=i,e.styles=r(t),e.overlay=c.div("dom-fx-fullscreen"),document.body.appendChild(e.overlay),e.overlay.appendChild(t),c.css(t,{left:n.left+"px",top:n.top+"px",width:n.width+"px",height:n.height+"px"}),c.addClass(t,"dom-fx-fullscreen-target"),l(function(){var n=e.overlay.getBoundingClientRect();c.css(t,{left:"20px",top:"20px",width:n.width-40+"px",height:n.height-40+"px"})})}function s(t,e){var n=e.substitute.getBoundingClientRect();c.css(t,{left:n.left+"px",top:n.top+"px",width:n.width+"px",height:n.height+"px"}),e.terminate=function(){c.detach(e.overlay),e.onBeforeReplace(t),c.replace(t,e.substitute),e.onAfterReplace(t),a(t,e.styles),delete e.terminate},l(e.terminate,200)}function r(t){var e,n,i={};for(e in t.style)n=t.style[e],i[e]=n;return console.info("[dom.fx] styles=...",i),i}function a(t,e){for(var n in e)t.style[n]=e[n]}var d=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}();t("polyfill.promise");var c=t("dom"),h=t("tfw.data-binding"),l=window.setTimeout,f=function(){},p=1,u=function(t){this._session={},Object.defineProperty(u.prototype,"name",{value:t,writable:!1,configurable:!0,enumerable:!0}),this._name=t,this._tasks=[],this._index=0,this._started=!1,this._startTime=0,this._onEnd=f};u.prototype.start=function(t){this._started&&this.end(),"function"!=typeof t&&(t=f),this._onEnd=t,this._started=!0,this._index=0,this._session={$id:p++},this._startTime=Date.now(),i.call(this,this._session)},u.prototype.end=function(){if(!this._started)return this;var t=this;for(this._started=!1,delete this._session;this._index<this._tasks.length;){var e=this._tasks[this._index++];t._debug&&console.info("[dom.fx.end] tsk["+(this._index-1)+"]: ",e.label,e.args),e(f,!1)}return this._onEnd(this),this},u.prototype.debug=function(t){return this.addTask(function(e){this._debug=!!t,e()}),this},u.prototype.addTask=function(t,e,n){return t.label=e,t.args=n,this._tasks.push(t),this},u.prototype.log=function(t){return this.addTask(function(e){console.log("[dom.fx]",t),e()},"log"),this},u.prototype.pause=function(){return this.addTask(f,"pause"),this},u.prototype.exec=function(){var t=Array.prototype.slice.call(arguments);return this.addTask(function(e,n){t.forEach(function(t){try{"function"==typeof t?t(n):console.log("[dom.fx]",t)}catch(t){console.error(t)}}),e()},"exec",t),this},["css","addClass","removeClass","toggleClass","detach","saveStyle","restoreStyle","add","removeAtt","replace"].forEach(function(t){var e=c[t];u.prototype[t]=function(){var n=Array.prototype.slice.call(arguments);return this.addTask(function(t){e.apply(c,n),t()},t,n),this}}),u.prototype.vanish=function(t,e){return e=parseInt(e),isNaN(e)&&(e=300),this.css(t,{transition:"none"}).css(t,{transition:"opacity "+e+"ms",opacity:0}).wait(e)},u.prototype.vanishAndDetach=function(t,e){return e=parseInt(e),isNaN(e)&&(e=300),this.vanish(t,e).detach(t)},u.prototype.wait=function(t){var e=Array.prototype.slice.call(arguments);return void 0===t&&(t=0),"number"==typeof t?this.addTask(function(e,n){n&&l(e,t)},"wait",e):this.addTask(function(e,n){if(n){var i=c(t),o=function(t){["transitionend","oTransitionEnd","webkitTransitionEnd"].forEach(function(t){i.removeEventListener(t,o)}),e()};["transitionend","oTransitionEnd","webkitTransitionEnd"].forEach(function(t){i.addEventListener(t,o)})}},"wait",e),this},e.exports=function(t){return new u(t)},e.exports.Fullscreen=function(t){if(void 0===t)throw Error("[dom.fx:fullscreen] Missing argument!");if(void 0===t.target)throw Error("[dom.fx:fullscreen] Missing `opts.target`!");"function"==typeof t.target.element&&(t.target=t.target.element()),void 0!==t.target.element&&(t.target=t.target.element);var e=function(){},n={onBeforeReplace:"function"==typeof t.onBeforeReplace?t.onBeforeReplace:e,onAfterReplace:"function"==typeof t.onAfterReplace?t.onAfterReplace:e};h.propBoolean(this,"value")(function(e){e?o(t.target,n):s(t.target,n)})},e.exports._=d});
//# sourceMappingURL=dom.fx.js.map
require("polyfill.promise",function(t,n,e){var r=function(){function n(){return r(e,arguments)}var e={en:{},fr:{}},r=t("$").intl;return n.all=e,n}();window.Promise||function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function n(t){return"function"==typeof t}function e(t){return"object"==typeof t&&null!==t}function r(){}function o(){for(var t=0;t<S;t+=2){(0,D[t])(D[t+1]),D[t]=void 0,D[t+1]=void 0}S=0}function i(){}function s(){return new TypeError("You cannot resolve a promise with itself")}function u(){return new TypeError("A promises callback cannot return that same promise.")}function c(t){try{return t.then}catch(t){return K.error=t,K}}function a(t,n,e,r){try{t.call(n,e,r)}catch(t){return t}}function f(t,n,e){C(function(t){var r=!1,o=a(e,n,function(e){r||(r=!0,n!==e?_(t,e):v(t,e))},function(n){r||(r=!0,d(t,n))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,d(t,o))},t)}function l(t,n){n._state===q?v(t,n._result):t._state===F?d(t,n._result):y(n,void 0,function(n){_(t,n)},function(n){d(t,n)})}function h(t,e){if(e.constructor===t.constructor)l(t,e);else{var r=c(e);r===K?d(t,K.error):void 0===r?v(t,e):n(r)?f(t,e,r):v(t,e)}}function _(n,e){n===e?d(n,s()):t(e)?h(n,e):v(n,e)}function p(t){t._onerror&&t._onerror(t._result),m(t)}function v(t,n){t._state===I&&(t._result=n,t._state=q,0===t._subscribers.length||C(m,t))}function d(t,n){t._state===I&&(t._state=F,t._result=n,C(p,t))}function y(t,n,e,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=n,o[i+q]=e,o[i+F]=r,0===i&&t._state&&C(m,t)}function m(t){var n=t._subscribers,e=t._state;if(0!==n.length){for(var r,o,i=t._result,s=0;s<n.length;s+=3)r=n[s],o=n[s+e],r?g(e,r,o,i):o(i);t._subscribers.length=0}}function w(){this.error=null}function b(t,n){try{return t(n)}catch(t){return N.error=t,N}}function g(t,e,r,o){var i,s,c,a,f=n(r);if(f){if(i=b(r,o),i===N?(a=!0,s=i.error,i=null):c=!0,e===i)return void d(e,u())}else i=o,c=!0;e._state!==I||(f&&c?_(e,i):a?d(e,s):t===q?v(e,i):t===F&&d(e,i))}function A(t,n){try{n(function(n){_(t,n)},function(n){d(t,n)})}catch(n){d(t,n)}}function j(t,n,e,r){this._instanceConstructor=t,this.promise=new t(i,r),this._abortOnReject=e,this._validateInput(n)?(this._input=n,this.length=n.length,this._remaining=n.length,this._init(),0===this.length?v(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&v(this.promise,this._result))):d(this.promise,this._validationError())}function E(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function P(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function T(t,e){this._id=G++,this._label=e,this._state=void 0,this._result=void 0,this._subscribers=[],i!==t&&(n(t)||E(),this instanceof T||P(),A(this,t))}var k;k=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var M,O=k,S=(Date.now,Object.create,0),C=function(t,n){D[S]=t,D[S+1]=n,2===(S+=2)&&M()},R="undefined"!=typeof window?window:{},x=R.MutationObserver||R.WebKitMutationObserver,Y="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,D=new Array(1e3);M="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?function(){return function(){process.nextTick(o)}}():x?function(){var t=0,n=new x(o),e=document.createTextNode("");return n.observe(e,{characterData:!0}),function(){e.data=t=++t%2}}():Y?function(){var t=new MessageChannel;return t.port1.onmessage=o,function(){t.port2.postMessage(0)}}():function(){return function(){setTimeout(o,1)}}();var I=void 0,q=1,F=2,K=new w,N=new w;j.prototype._validateInput=function(t){return O(t)},j.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},j.prototype._init=function(){this._result=new Array(this.length)};var U=j;j.prototype._enumerate=function(){for(var t=this.length,n=this.promise,e=this._input,r=0;n._state===I&&r<t;r++)this._eachEntry(e[r],r)},j.prototype._eachEntry=function(t,n){var r=this._instanceConstructor;e(t)?t.constructor===r&&t._state!==I?(t._onerror=null,this._settledAt(t._state,n,t._result)):this._willSettleAt(r.resolve(t),n):(this._remaining--,this._result[n]=this._makeResult(q,n,t))},j.prototype._settledAt=function(t,n,e){var r=this.promise;r._state===I&&(this._remaining--,this._abortOnReject&&t===F?d(r,e):this._result[n]=this._makeResult(t,n,e)),0===this._remaining&&v(r,this._result)},j.prototype._makeResult=function(t,n,e){return e},j.prototype._willSettleAt=function(t,n){var e=this;y(t,void 0,function(t){e._settledAt(q,n,t)},function(t){e._settledAt(F,n,t)})};var W=function(t,n){return new U(this,t,!0,n).promise},$=function(t,n){function e(t){_(s,t)}function r(t){d(s,t)}var o=this,s=new o(i,n);if(!O(t))return d(s,new TypeError("You must pass an array to race.")),s;for(var u=t.length,c=0;s._state===I&&c<u;c++)y(o.resolve(t[c]),void 0,e,r);return s},z=function(t,n){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(i,n);return _(r,t),r},B=function(t,n){var e=this,r=new e(i,n);return d(r,t),r},G=0,H=T;T.all=W,T.race=$,T.resolve=z,T.reject=B,T.prototype={constructor:T,then:function(t,n,e){var r=this,o=r._state;if(o===q&&!t||o===F&&!n)return this;r._onerror=null;var s=new this.constructor(i,e),u=r._result;if(o){var c=arguments[o-1];C(function(){g(o,s,c,u)})}else y(r,s,t,n);return s},catch:function(t,n){return this.then(null,t,n)}};var J=function(){var t;"Promise"in(t="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self)&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),n(e)}()||(t.Promise=H)};J()}.call(this),n.exports._=r});
//# sourceMappingURL=polyfill.promise.js.map
require("tfw.view.textbox",function(e,t,n){function a(e){"Enter"===e.key&&(this.action=this.value)}function i(e){o.call(this,e),s.call(this,e)}function o(e){this.valid=this.validator(e)}function s(e){var t=this,n=this.list;if(Array.isArray(n)&&0!==n.length){var a=this.$elements.completion;r.clear(a);var i=e.trim().toLowerCase(),o=0;n.forEach(function(e){var n=e.toLowerCase().indexOf(i);0===n&&(++o>u||l.call(t,a,e,n,i.length))}),o<u&&n.forEach(function(e){var n=e.toLowerCase().indexOf(i);n<1||++o>u||l.call(t,a,e,n,i.length)})}}function l(e,t,n,a){var i=this,o=r.div();n>0&&r.add(o,r.tag("span",[t.substr(0,n)])),r.add(o,r.tag("b",[t.substr(n,a)])),n+a<t.length&&r.add(o,r.tag("span",[t.substr(n+a)])),r.on(o,function(e){i.value=t}),r.add(e,o)}var c=function(){function t(){return a(n,arguments)}var n={en:{},fr:{}},a=e("$").intl;return t.all=n,t}(),r=e("dom"),d={onKeyUp:a,onValueChanged:i},u=99;try{t.exports=function(){function t(e,t,n){return void 0===e[t]?n:e[t]}function n(e,t,n){n?o.addClass(e,t):o.removeClass(e,t)}function a(e,t,n){n?o.removeClass(e,t):o.addClass(e,t)}function i(e,t,n){n?o.removeAtt(e,t):o.att(e,t)}var o=e("dom"),s=e("tfw.binding.property-manager"),l=e("tfw.view").Tag,c=e("tfw.binding.link"),r=e("tfw.view"),u=e("tfw.binding.converters");r.ensureCodeBehind(d,"onValueChanged","onKeyUp");var f=u.get("string"),m=u.get("boolean"),h=u.get("unit"),b=u.get("strings"),v=u.get("validator"),w=u.get("integer"),g=u.get("isEmpty");return function(e){try{void 0===e&&(e={}),this.$elements={};var u=this,p=s(this);p.create("label",{cast:f}),p.create("type",{cast:f}),p.create("wide",{cast:m}),p.create("focus",{cast:m}),p.create("enabled",{cast:m}),p.create("visible",{cast:m}),p.create("width",{cast:h}),p.createAction("action"),p.create("list",{cast:b}),p.create("validator",{cast:v}),p.create("valid",{cast:m}),p.create("value",{cast:f}),p.create("maxLength",{cast:w(0)});var x=new l("DIV",["class"]),y=new l("DIV",["class","textcontent"]);this.$elements.head=y;var j=new l("DIV",["class"]),A=new l("INPUT",["class","type","maxLength","value","focus"]);this.$elements.input=A,o.add(j,A),this.$elements.body=j;var B=new l("DIV",["class"]);this.$elements.foot=B;var C=new l("DIV",["class"]);this.$elements.bottom=C;var $=new l("FOOTER"),L=new l("DIV",["class"]);this.$elements.completion=L,o.add($,L),o.add(x,y,j,B,C,$),Object.defineProperty(this,"$",{value:x.$,writable:!1,enumerable:!1,configurable:!1}),r.events(A,{keyup:d.onKeyUp.bind(this)}),new c({A:{obj:u,name:"enabled"},B:{action:function(e){n(x,"thm-ele2",e)}},name:"enabled > undefined"}),new c({A:{obj:u,name:"wide"},B:{action:function(e){n(x,"wide",e)}},name:"wide > undefined"}),new c({A:{obj:u,name:"focus",open:!1},B:{action:function(e){n(x,"thm-bgSL",e),a(x,"thm-bg3",e)}},name:"focus > undefined"}),new c({A:{obj:u,name:"focus"},B:{action:function(e){n(x,"focus",e)}},name:"focus > undefined"}),new c({A:{obj:u,name:"label"},B:{action:function(e){n(x,"no-label",e)},converter:g},name:"label > undefined"}),new c({A:{obj:u,name:"enabled"},B:{action:function(e){a(x,"disabled",e)}},name:"enabled > undefined"}),new c({A:{obj:u,name:"visible"},B:{action:function(e){a(x,"hide",e)}},name:"visible > undefined"}),new c({A:{obj:u,name:"valid"},B:{action:function(e){a(x,"invalid",e)}},name:"valid > undefined"}),new c({A:{obj:u,name:"label"},B:{obj:y,name:"textcontent"},name:"label > e_head/textcontent"}),new c({A:{obj:u,name:"type"},B:{obj:A,name:"type"},name:"type > e_input/type"}),new c({A:{obj:u,name:"maxLength"},B:{obj:A,name:"maxLength"},name:"max-length > e_input/maxLength"}),new c({A:{obj:u,name:"value",delay:350},B:{obj:A,name:"value"},name:"value > e_input/value"}),new c({A:{obj:u,name:"focus"},B:{obj:A,name:"focus"},name:"focus > e_input/focus"}),new c({A:{obj:u,name:"enabled"},B:{action:function(e){i(A,"disabled",e)}},name:"enabled > undefined"}),p.on("value",function(e){try{d.onValueChanged.call(u,e)}catch(e){console.error('Exception in function behind "onValueChanged" of module "mod/tfw.view.textbox.js" for attribute "value"!  '),console.error(e)}}),p.on("width",function(e){j.$.style.width=e}),x.class="tfw-view-textbox",y.class="head thm-fg",j.class="body",A.class="thm-fg",B.class="foot",C.class="bottom thm-bgSD",L.class="completion thm-fg thm-bg2 thm-ele4",this.label=t(e,"label",""),this.type=t(e,"type","text"),this.wide=t(e,"wide",!1),this.focus=t(e,"focus",!1),this.enabled=t(e,"enabled",!0),this.visible=t(e,"visible",!0),this.width=t(e,"width","auto"),this.list=e.list,this.validator=t(e,"validator",""),this.valid=t(e,"valid",!1),this.value=t(e,"value",""),this.maxLength=t(e,"maxLength",999),o.addClass(this,"view","custom")}catch(e){throw console.error("mod/tfw.view.textbox.js",e),Error('Instantiation error in XJS of "mod/tfw.view.textbox.js":\n'+e)}}}()}catch(e){throw Error('Definition error in XJS of "mod/tfw.view.textbox.js"\n'+e)}t.exports._=c});
//# sourceMappingURL=tfw.view.textbox.js.map
require("webgl.program",function(r,e,t){function n(r,e,t){if("string"!=typeof e.vert)throw Error("[webgl.program] Missing attribute `vert` in argument `codes`!");if("string"!=typeof e.frag)throw Error("[webgl.program] Missing attribute `frag` in argument `codes`!");e=a(e,t),this.gl=r,Object.freeze(this.gl),this.BPE=p,Object.freeze(this.BPE),this._typesNamesLookup=m(r);var n=r.createProgram();r.attachShader(n,h(r,e.vert)),r.attachShader(n,c(r,e.frag)),r.linkProgram(n),this.program=n,Object.freeze(this.program),this.use=function(){r.useProgram(n)},this.use(),o(this,r,n),i(this,r,n)}function o(r,e,t){var n,o,i={},a=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(n=0;n<a;n++)o=e.getActiveAttrib(t,n),o.typeName=r.getTypeName(o.type),o.length=g(e,o),o.location=e.getAttribLocation(t,o.name),console.info("item=",o),i[o.name]=o;r.attribs=i,Object.freeze(r.attribs)}function i(r,e,t){var n,o,i={},a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(n=0;n<a;n++)o=e.getActiveUniform(t,n),i[o.name]=e.getUniformLocation(t,o.name),Object.defineProperty(r,"$"+o.name,{set:s(e,o,i[o.name],r._typesNamesLookup),get:u(o),enumerable:!0,configurable:!1});r.uniforms=i,Object.freeze(r.uniforms)}function a(r,e){var t,n,o={};for(t in r)n=r[t],o[t]=n.split("\n").map(function(r){if("#include"!=r.trim().substr(0,8))return r;var t=r.indexOf("#include")+8,n=r.substr(t).trim();"'<\"".indexOf(n.charAt(0))>-1&&(n=n.substr(1,n.length-2));var o=e[n];if("string"!=typeof o)throw console.error("Include <"+n+"> not found in ",e),Error("Include not found in shader: "+n);return o}).join("\n");return o}function s(r,e,t,n){var o="_$"+e.name;switch(e.type){case r.BYTE:case r.UNSIGNED_BYTE:case r.SHORT:case r.UNSIGNED_SHORT:case r.INT:case r.UNSIGNED_INT:case r.SAMPLER_2D:return 1==e.size?function(e){r.uniform1i(t,e),this[o]=e}:function(e){r.uniform1iv(t,e),this[o]=e};case r.FLOAT:return 1==e.size?function(e){r.uniform1f(t,e),this[o]=e}:function(e){r.uniform1fv(t,e),this[o]=e};case r.FLOAT_VEC2:if(1==e.size)return function(e){r.uniform2fv(t,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform `"+e.name+"'!'");case r.FLOAT_VEC3:if(1==e.size)return function(e){r.uniform3fv(t,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform `"+e.name+"'!'");case r.FLOAT_VEC4:if(1==e.size)return function(e){r.uniform4fv(t,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform `"+e.name+"'!'");case r.FLOAT_MAT3:if(1==e.size)return function(e){r.uniformMatrix3fv(t,!1,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform `"+e.name+"'!'");case r.FLOAT_MAT4:if(1==e.size)return function(e){r.uniformMatrix4fv(t,!1,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform `"+e.name+"'!'");default:throw Error("[webgl.program.createWriter] Don't know how to deal with uniform `"+e.name+"` of type "+n[e.type]+"!")}}function u(r){var e="_$"+r.name;return function(){return this[e]}}function f(r,e,t){var n=e.createShader(r);return e.shaderSource(n,t),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.log(t),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(n)),null)}function c(r,e){return f(r.FRAGMENT_SHADER,r,e)}function h(r,e){return f(r.VERTEX_SHADER,r,e)}function m(r){var e,t,n={};for(e in r)"number"==typeof(t=r[e])&&(n[t]=e);return n}function g(r,e){switch(e.type){case r.FLOAT_VEC4:return 4;case r.FLOAT_VEC3:return 3;case r.FLOAT_VEC2:return 2;case r.FLOAT:return 1;default:throw"[webgl.program:getSize] I don't know the size of the attribute '"+e.name+"' because I don't know the type "+getTypeName(e.type)+"!"}}var l=function(){function e(){return n(t,arguments)}var t={en:{},fr:{}},n=r("$").intl;return e.all=t,e}(),p=(new Float32Array).BYTES_PER_ELEMENT;n.prototype.getTypeName=function(r){return this._typesNamesLookup[r]},n.prototype.bindAttribs=function(r){var e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,r);var t=Array.prototype.slice.call(arguments,1),n=0;t.forEach(function(r){var e=this.attribs[r];if(!e)throw'Cannot find attribute "'+r+'"!\nIt may be not active because unused in the shader.\nAvailable attributes are: '+Object.keys(this.attribs).map(function(r){return'"'+r+'"'}).join(", ");n+=e.size*e.length*p},this);var o=0;t.forEach(function(r){var t=this.attribs[r];e.enableVertexAttribArray(t.location),e.vertexAttribPointer(t.location,t.size*t.length,e.FLOAT,!1,n,o),o+=t.size*t.length*p},this)},e.exports=n,e.exports._=l});
//# sourceMappingURL=webgl.program.js.map
require("webgl.resize",function(n,t,e){var i=function(){function t(){return i(e,arguments)}var e={en:{},fr:{}},i=n("$").intl;return t.all=e,t}();t.exports=function(n,t){"number"!=typeof t&&(t=window.devicePixelRatio);var e=Math.floor(n.canvas.clientWidth*t),i=Math.floor(n.canvas.clientHeight*t);n.canvas.width===e&&n.canvas.height===i||(n.canvas.width=e,n.canvas.height=i,n.viewport(0,0,e,i))},t.exports._=i});
//# sourceMappingURL=webgl.resize.js.map
require("webgl.math",function(t,n,r){function a(t){return new Float32Array(t)}function o(t){var n,r,o=a(t),e=0;for(r=0;r<o.length;r++)n=o[r],e+=n*n;if(e>0){var i=1/Math.sqrt(e);for(r=0;r<o.length;r++)o[r]*=i}return o}function e(t,n,r,a,o,e,i){i=i||new Float32Array(16);var u=Math.cos(o),c=Math.sin(o),f=-Math.cos(e+.5*Math.PI),l=-Math.sin(e+.5*Math.PI),h=f*u,s=l*u,M=c,m=-s,w=h,y=0,v=Math.sqrt(m*m+w*w+y*y);m/=v,w/=v,y/=v;var A=s*y-M*w,F=m*M-y*h,g=h*w-s*m,p=-(h*a+t),x=-(s*a+n),I=-(M*a+r);return i[0]=m,i[4]=w,i[8]=y,i[12]=p*m+x*w+I*y,i[1]=A,i[5]=F,i[9]=g,i[13]=p*A+x*F+I*g,i[2]=h,i[6]=s,i[10]=M,i[14]=p*h+x*s+I*M,i[3]=0,i[7]=0,i[11]=0,i[15]=1,i}function i(t,n,r,a,o){o=o||new Float32Array(16);var e=Math.tan(.5*(Math.PI-t)),i=1/(r-a);return o[0]=e/n,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=e,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=(r+a)*i,o[11]=-1,o[12]=0,o[13]=0,o[14]=r*a*i*2,o[15]=0,o}function u(){return g(1,0,0,0,1,0,0,0,1)}function c(){return p(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}function f(t,n){return g(2/t,0,0,0,-2/n,0,0,0,1)}function l(t,n,r){return p(2/t,0,0,0,0,-2/n,0,0,0,0,2/r,0,0,0,0,1)}function h(t,n){return g(1,0,0,0,1,0,t,n,1)}function s(t,n,r){return p(1,0,0,0,0,1,0,0,0,0,1,0,t,n,r,1)}function M(t){var n=Math.cos(t),r=Math.sin(t);return g(n,-r,0,r,n,0,0,0,1)}function m(t,n){n=n||new Float32Array(16);var r=Math.cos(t),a=Math.sin(t);return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=r,n[6]=a,n[7]=0,n[8]=0,n[9]=-a,n[10]=r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function w(t,n){n=n||new Float32Array(16);var r=Math.cos(t),a=Math.sin(t);return n[0]=r,n[1]=0,n[2]=-a,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=a,n[9]=0,n[10]=r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function y(t,n){n=n||new Float32Array(16);var r=Math.cos(t),a=Math.sin(t);return n[0]=r,n[1]=a,n[2]=0,n[3]=0,n[4]=-a,n[5]=r,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function v(t,n,r){r=r||new Float32Array(16);var a=Math.cos(t),o=Math.sin(t),e=Math.cos(n),i=Math.sin(n);return r[0]=e,r[1]=o*i,r[2]=-a*i,r[3]=0,r[4]=0,r[5]=a,r[6]=o,r[7]=0,r[8]=i,r[9]=-o*e,r[10]=a*e,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function A(t,n){return g(t,0,0,0,n,0,0,0,1)}function F(t,n,r){return p(t,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1)}function g(t,n,r,a,o,e,i,u,c){return new Float32Array([t,n,r,a,o,e,i,u,c])}function p(t,n,r,a,o,e,i,u,c,f,l,h,s,M,m,w){return new Float32Array([t,n,r,a,o,e,i,u,c,f,l,h,s,M,m,w])}function x(t,n,r,a){return new Float32Array([t,n,r,a])}function I(t,n,r){var a=d["m"+t.length+"m"+n.length];if("function"!=typeof a)throw Error("[webgl.math.mul] I don't know how to multiply 'M"+t.length+"' with 'M"+n.length+"'!");return a(t,n,r)}var P=function(){function n(){return a(r,arguments)}var r={en:{},fr:{}},a=t("$").intl;return n.all=r,n}();n.exports={m4:{identity:c,matrix:p,vector:x,projection:l,translation:s,rotationX:m,rotationY:w,rotationZ:y,rotationXY:v,scaling:F,copy:a,normalize:o,cameraPolar:e,perspective:i,mul:I},m3:{identity:u,matrix:g,projection:f,translation:h,rotation:M,scaling:A}};var d={m4m4:function(t,n,r){return r=r||new Float32Array(4),r[0]=t[0]*n[0]+t[2]*n[1],r[1]=t[1]*n[0]+t[3]*n[1],r[2]=t[0]*n[2]+t[2]*n[3],r[3]=t[1]*n[2]+t[3]*n[3],r},m9m9:function(t,n,r){return r=r||new Float32Array(9),r[0]=t[0]*n[0]+t[3]*n[1]+t[6]*n[2],r[1]=t[1]*n[0]+t[4]*n[1]+t[7]*n[2],r[2]=t[2]*n[0]+t[5]*n[1]+t[8]*n[2],r[3]=t[0]*n[3]+t[3]*n[4]+t[6]*n[5],r[4]=t[1]*n[3]+t[4]*n[4]+t[7]*n[5],r[5]=t[2]*n[3]+t[5]*n[4]+t[8]*n[5],r[6]=t[0]*n[6]+t[3]*n[7]+t[6]*n[8],r[7]=t[1]*n[6]+t[4]*n[7]+t[7]*n[8],r[8]=t[2]*n[6]+t[5]*n[7]+t[8]*n[8],r},m16m16:function(t,n,r){return r=r||new Float32Array(16),r[0]=t[0]*n[0]+t[4]*n[1]+t[8]*n[2]+t[12]*n[3],r[1]=t[1]*n[0]+t[5]*n[1]+t[9]*n[2]+t[13]*n[3],r[2]=t[2]*n[0]+t[6]*n[1]+t[10]*n[2]+t[14]*n[3],r[3]=t[3]*n[0]+t[7]*n[1]+t[11]*n[2]+t[15]*n[3],r[4]=t[0]*n[4]+t[4]*n[5]+t[8]*n[6]+t[12]*n[7],r[5]=t[1]*n[4]+t[5]*n[5]+t[9]*n[6]+t[13]*n[7],r[6]=t[2]*n[4]+t[6]*n[5]+t[10]*n[6]+t[14]*n[7],r[7]=t[3]*n[4]+t[7]*n[5]+t[11]*n[6]+t[15]*n[7],r[8]=t[0]*n[8]+t[4]*n[9]+t[8]*n[10]+t[12]*n[11],r[9]=t[1]*n[8]+t[5]*n[9]+t[9]*n[10]+t[13]*n[11],r[10]=t[2]*n[8]+t[6]*n[9]+t[10]*n[10]+t[14]*n[11],r[11]=t[3]*n[8]+t[7]*n[9]+t[11]*n[10]+t[15]*n[11],r[12]=t[0]*n[12]+t[4]*n[13]+t[8]*n[14]+t[12]*n[15],r[13]=t[1]*n[12]+t[5]*n[13]+t[9]*n[14]+t[13]*n[15],r[14]=t[2]*n[12]+t[6]*n[13]+t[10]*n[14]+t[14]*n[15],r[15]=t[3]*n[12]+t[7]*n[13]+t[11]*n[14]+t[15]*n[15],r},m16m4:function(t,n,r){return r=r||new Float32Array(4),r[0]=t[0]*n[0]+t[4]*n[1]+t[8]*n[2]+t[12]*n[3],r[1]=t[1]*n[0]+t[5]*n[1]+t[9]*n[2]+t[13]*n[3],r[2]=t[2]*n[0]+t[6]*n[1]+t[10]*n[2]+t[14]*n[3],r[3]=t[3]*n[0]+t[7]*n[1]+t[11]*n[2]+t[15]*n[3],r}};n.exports._=P});
//# sourceMappingURL=webgl.math.js.map
