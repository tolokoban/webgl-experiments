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
        W('wdg.article72', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [
                "  ",
                W('wdg.flex73','wdg.flex',{"content": [
                  W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W('wdg.deform-174','wdg.deform-1',{
                          width: "420",
                          height: "420",
                          delay: "50"},{"id":"wdg.deform-174"}),
                        "\r\n          ",
                        W('wdg.flex75','wdg.flex',{"content": [
                          W('delay1','wdg.text',{
                              label: "Delai par étage (ms)",
                              wide: "true",
                              value: "50"},{"id":"delay1"}),
                          W('angle1','wdg.text',{
                              label: "Angle max (deg)",
                              wide: "true",
                              value: "30"},{"id":"angle1"})]},{"id":"wdg.flex75"}),
                        "\r\n      "]}),
                  W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W('wdg.deform-276','wdg.deform-2',{
                          width: "420",
                          height: "420",
                          delay: "50"},{"id":"wdg.deform-276"}),
                        "\r\n        ",
                        W('wdg.flex77','wdg.flex',{"content": [
                          W('delay2','wdg.text',{
                              label: "Delai par étage (ms)",
                              wide: "true",
                              value: "50"},{"id":"delay2"}),
                          W('angle2','wdg.text',{
                              label: "Angle max (deg)",
                              wide: "true",
                              value: "30"},{"id":"angle2"})]},{"id":"wdg.flex77"}),
                        "\r\n      "]})]},{"id":"wdg.flex73"})]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "ondulation de ce sapin est réalisée entièrement dans le vertex shader.\nLes attributs sont constants, ce qui laisse le CPU complètement désoeuvré\ncomme on peut le voir dans le code Javascript du rendu."]}),
          W({
              elem: "p",
              children: [W({
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
                      children: ["draw"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["time"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prg"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prg"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["program"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n  ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n\r\n  ",
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
                    "\r\n  ",
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
                    "\r\n\r\n  ",
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
                      children: ["prg"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n  ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n  ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["uniDelay"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["delay"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n  ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["uniAngle"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["angle"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n  \r\n  ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vertexCount"]}),
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
              elem: "p",
              children: [
                "On voit que l",
                "&#39;",
                "on efface l",
                "&#39;",
                "écran avec une couleur totalement transparente ce qui\npermet de laisser apparaître l",
                "&#39;",
                "image que l",
                "&#39;",
                "on a définie par CSS sur le canvas."]}),
          W({
              elem: "h1",
              attr: {"id": "d-finition-des-attributs"},
              children: ["Définition des attributs"]}),
          W({
              elem: "p",
              children: [W('wdg.showhide78','wdg.showhide',{
                  value: "false",
                  label: "Le code Javascript d'initialisation des attributs",
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
                          children: ["attributes"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["[];"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// LEVELS est le nombre de triangles."]}),
                        "\r\n",
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
                          children: ["level"]}),
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
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["LEVELS"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
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
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attributes"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["push"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// attRadius, attAngle, attLevel."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.75"]}),
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
                          children: ["level"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "              ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// A droite."]}),
                        "\r\n    ",
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
                          children: ["*"]}),
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
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "   ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// En haut."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.75"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        "         ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// A gauche."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attributes"]}),
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
                          children: ["attributes"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        " "]})]},{"id":"wdg.showhide78"})]}),
          W({
              elem: "p",
              children: ["Notre arbre est constitué de 10 triangles dont les vertex sont définis par 3\nattributs :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["attRadius"]}),
                    " : La distance par rapport au centre (0,0)."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["attAngle"]}),
                    " : L",
                    "&#39;",
                    "angle formé entre l",
                    "&#39;",
                    "axe des abscisses et la droite reliant\nle centre et ce vertex."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["attLevel"]}),
                    " : Niveau de ce triangle. 0 est le triangle à la base,\n9 celui au sommet."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "D",
                "&#39;",
                "un triangle à l",
                "&#39;",
                "autre, seul ",
                W({
                  elem: "strong",
                  children: ["attLevel"]}),
                " varie. A partir de cette base, le\nvertex shader va déformer les coordonnées en fonction du temps pour donner cet effet."]}),
          W({
              elem: "p",
              children: [
                W('wdg.showhide79','wdg.showhide',{
                  value: "false",
                  label: "Vertex Shader",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight glsl"},
                      children: [
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
                          children: ["uniTime"]}),
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
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniDelay"]}),
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
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAngle"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
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
                          children: ["attRadius"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
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
                          children: ["attAngle"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
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
                          children: ["attLevel"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Pour faire un léger dégradé dans le fragment shader."]}),
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
                          children: ["varBrightness"]}),
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
                          children: ["// Temps qui tient compte du décalage par level."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniDelay"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attLevel"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Angle max d'inclinaison entre deux niveaux."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["a"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["radians"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAngle"]}),
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
                          children: ["0.1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Calculer en fonction du temps l'angle entre deux"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// triangles consécutifs."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tilt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["a"]}),
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
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.001013"]}),
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
                          attr: {"class": "keyword2"},
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
                          children: ["0.001712"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Plus le triangle à un level élevé, plus il est petit."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
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
                          children: ["1.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["sqrt"]}),
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
                          children: ["+"]}),
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
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Coordonnées du centre du triangle de la base."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xc"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-0.5"]}),
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
                          children: ["yc"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-0.7"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  \r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["int"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["int"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// A chaque niveau supplémentaire,"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// l'angle s'incline un peu plus."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tilt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.05"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["for"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["int"]}),
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
                          children: ["1"]}),
                        " ",
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
                          attr: {"class": "number"},
                          children: ["10"]}),
                        " ",
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
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Condition d'arrêt."]}),
                        "\r\n    ",
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
                          children: ["i"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Calculer les coordonnées du centre du triangle."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["yc"]}),
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
                          children: ["scale"]}),
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
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xc"]}),
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
                          children: ["scale"]}),
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
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Incliner un peu plus pour le niveau suivant."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
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
                          children: ["tilt"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Coordonnées du vertex dans l'espace de WebGL."]}),
                        "\r\n  ",
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
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRadius"]}),
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
                          children: ["attAngle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
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
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRadius"]}),
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
                          children: ["attAngle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  \r\n  ",
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
                        " \r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xc"]}),
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
                          children: [","]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["yc"]}),
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
                          children: [","]}),
                        "\r\n    ",
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
                        " \r\n  ",
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
                          children: ["attLevel"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["=="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["9.0"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Le dernier triangle est de couleur unie."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varBrightness"]}),
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
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Vaut 0 pour les vertex du bas du triangle"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// et 1 pour le sommet."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Cela donne l'effer d'une ombre."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varBrightness"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
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
                          children: ["attAngle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide79"}),
                "\n",
                W('wdg.showhide80','wdg.showhide',{
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
                          children: ["uniTime"]}),
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
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniDelay"]}),
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
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAngle"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
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
                          children: ["attRadius"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
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
                          children: ["attAngle"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n",
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
                          children: ["attLevel"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Pour faire un léger dégradé dans le fragment shader."]}),
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
                          children: ["varBrightness"]}),
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
                          children: ["// Temps qui tient compte du décalage par level."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "identifier"},
                          children: ["uniTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniDelay"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attLevel"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Angle max d'inclinaison entre deux niveaux."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["a"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["radians"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniAngle"]}),
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
                          children: ["0.1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Calculer en fonction du temps l'angle entre deux"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// triangles consécutifs."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tilt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["a"]}),
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
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.001013"]}),
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
                          attr: {"class": "keyword2"},
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
                          children: ["0.001712"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Plus le triangle à un level élevé, plus il est petit."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
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
                          children: ["1.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["sqrt"]}),
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
                          children: ["+"]}),
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
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Coordonnées du centre du triangle de la base."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xc"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-0.5"]}),
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
                          children: ["yc"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-0.7"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  \r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["int"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["int"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// A chaque niveau supplémentaire,"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// l'angle s'incline un peu plus."]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tilt"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.05"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["for"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["int"]}),
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
                          children: ["1"]}),
                        " ",
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
                          attr: {"class": "number"},
                          children: ["10"]}),
                        " ",
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
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Condition d'arrêt."]}),
                        "\r\n    ",
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
                          children: ["i"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&gt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Calculer les coordonnées du centre du triangle."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["yc"]}),
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
                          children: ["scale"]}),
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
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xc"]}),
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
                          children: ["scale"]}),
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
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Incliner un peu plus pour le niveau suivant."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
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
                          children: ["tilt"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Coordonnées du vertex dans l'espace de WebGL."]}),
                        "\r\n  ",
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
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRadius"]}),
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
                          children: ["attAngle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
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
                          children: ["scale"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attRadius"]}),
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
                          children: ["attAngle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["angle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  \r\n  ",
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
                        " \r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["xc"]}),
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
                          children: [","]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["yc"]}),
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
                          children: [","]}),
                        "\r\n    ",
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
                        " \r\n  ",
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
                          children: ["attLevel"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["=="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["9.0"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Le dernier triangle est de couleur unie."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varBrightness"]}),
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
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Vaut 0 pour les vertex du bas du triangle"]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// et 1 pour le sommet."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Cela donne l'effer d'une ombre."]}),
                        "\r\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varBrightness"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
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
                          children: ["attAngle"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\r\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\r\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide80"})]}),
          W({
              elem: "h1",
              attr: {"id": "les-boucles-infinies"},
              children: ["Les boucles infinies"]}),
          W({
              elem: "p",
              children: [
                "Il faut remarquer une caractéristique du GLSL qui peut dérouter au premier abord :\n",
                W({
                  elem: "strong",
                  children: ["il est interdit de faire des boucles infinies"]}),
                ".\nEn effet, la carte graphique ne peut pas se permettre d",
                "&#39;",
                "attendre indéfiniment\nl",
                "&#39;",
                "affichage d",
                "&#39;",
                "une image, sans quoi c",
                "&#39;",
                "est tout l",
                "&#39;",
                "écran qui se fige."]}),
          W({
              elem: "p",
              children: [
                "Pour se protéger des boucles infinies, GLSL ajoute des restrictions sur le\nlangage et notemment sur les boucles ",
                W({
                  elem: "code",
                  children: ["for(;;)"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["while()"]}),
                ".\nLes tests d",
                "&#39;",
                "arrêt d",
                "&#39;",
                "une boucle ",
                W({
                  elem: "strong",
                  children: ["doivent toujours porter sur des constantes"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Par exemple, ceci est interdit car ",
                W({
                  elem: "code",
                  children: ["level"]}),
                " est une variable :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight glsl"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["for"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["int"]}),
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
                      children: ["1"]}),
                    " ",
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
                      children: ["level"]}),
                    " ",
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
                    " ... ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "C",
                "&#39;",
                "est pour cela que j",
                "&#39;",
                "ai utilisé l",
                "&#39;",
                "astuce suivante :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight glsl"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["for"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["int"]}),
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
                      children: ["1"]}),
                    " ",
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
                      attr: {"class": "number"},
                      children: ["10"]}),
                    " ",
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["i"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["break"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n  ...\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "hr"}),
          W({
              elem: "p",
              children: [W('wdg.flex81','wdg.flex',{"content": [
                  W({
                      elem: "div",
                      children: [
                        "\r\n        ",
                        W('wdg.deform-382','wdg.deform-3',{
                          width: "960",
                          height: "540",
                          delay: "0",
                          angle: "66"},{"id":"wdg.deform-382"}),
                        "\r\n          ",
                        W('wdg.flex83','wdg.flex',{"content": [
                          W('delay','wdg.text',{
                              label: "Délai par étage (ms)",
                              wide: "true",
                              value: "0"},{"id":"delay"}),
                          W('angle','wdg.text',{
                              label: "Angle max (deg)",
                              wide: "true",
                              value: "66"},{"id":"angle"}),
                          W('girafe','wdg.checkbox',{
                              text: "Afficher la girafe",
                              value: "false"},{"id":"girafe"})]},{"id":"wdg.flex83"}),
                        "\r\n      "]})]},{"id":"wdg.flex81"})]}),
          W({
              elem: "p",
              children: [
                "Avec la technique de l",
                "&#39;",
                "article précédent, il est possible de déformer des images entières."]})]},{"id":"wdg.article72"})
        W.bind('wdg.deform-174',{"delay":{"B":[["delay1","value"]]},"angle":{"B":[["angle1","value"]]}});
        W.bind('wdg.deform-276',{"delay":{"B":[["delay2","value"]]},"angle":{"B":[["angle2","value"]]}});
        W.bind('wdg.deform-382',{"girafe":{"B":[["girafe","value"]]},"delay":{"B":[["delay","value"]]},"angle":{"B":[["angle","value"]]}});
    }
);
require("$",function(r,n,t){t.config={name:'"webgl-experiments"',description:'"WebGL study by tutorials"',author:'"tolokoban"',version:'"0.0.107"',major:"0",minor:"0",revision:"107",date:"2018-09-20T17:01:25.000Z",consts:{}};var o=null;t.lang=function(r){return void 0===r&&(window.localStorage&&(r=window.localStorage.getItem("Language")),r||(r=window.navigator.language)||(r=window.navigator.browserLanguage)||(r="fr"),r=r.substr(0,2).toLowerCase()),o=r,window.localStorage&&window.localStorage.setItem("Language",r),r},t.intl=function(r,n){var o,e,a,i,g,u,l,s=r[t.lang()],w=n[0];for(l in r)break;if(!l)return w;if(!s&&!(s=r[l]))return w;if(o=s[w],o||(s=r[l],o=s[w]),!o)return w;if(n.length>1){for(e="",g=0,a=0;a<o.length;a++)i=o.charAt(a),"$"===i?(e+=o.substring(g,a),a++,u=o.charCodeAt(a)-48,u<0||u>=n.length?e+="$"+o.charAt(a):e+=n[u],g=a+1):"\\"===i&&(e+=o.substring(g,a),a++,e+=o.charAt(a),g=a+1);e+=o.substr(g),o=e}return o}});
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
require("wdg.checkbox",function(e,t,s){var i=function(){function t(){return i(s,arguments)}var s={en:{}},i=e("$").intl;return t.all=s,t}(),o=e("dom"),d=e("tfw.data-binding"),a=(e("wdg.icon"),e("tfw.touchable")),n=function(e){var t=this,s=o.div("btn","thm-ele2"),i=o.div("bar"),n=o.div(),r=o.elem(this,"button","wdg-checkbox",[o.div([s,i]),n]),l=function(){"string"!=typeof t.text||0===t.text.trim().length?o.addClass(t,"no-text"):(o.textOrHtml(n,t.text),o.removeClass(t,"no-text")),t.inverted?o.addClass(t,"inverted"):o.removeClass(t,"inverted"),t.wide?o.addClass(t,"wide"):o.removeClass(t,"wide"),t.value?(o.addClass(t,"checked"),o.addClass(i,"thm-bgSL"),o.removeClass(i,"thm-bg2"),o.addClass(s,"thm-bgS"),o.removeClass(s,"thm-bg1")):(o.removeClass(t,"checked"),o.removeClass(i,"thm-bgSL"),o.addClass(i,"thm-bg2"),o.removeClass(s,"thm-bgS"),o.addClass(s,"thm-bg1"))};d.propBoolean(this,"value"),d.propString(this,"text"),d.propInteger(this,"action",0),d.propBoolean(this,"wide"),d.propBoolean(this,"inverted"),d.propRemoveClass(this,"visible","hide"),d.extend({value:!1,text:"checked",inverted:!1,wide:!1,visible:!0},e,this,l),new a(r).tap.add(this.fire.bind(this)),o.on(r,{keydown:function(e){13!=e.keyCode&&32!=e.keyCode||(e.preventDefault(),e.stopPropagation(),t.fire())}}),this.focus=r.focus.bind(r)};n.prototype.fire=function(){this.value=!this.value},t.exports=n,t.exports._=i});
//# sourceMappingURL=wdg.checkbox.js.map
require("tfw.touchable",function(t,e,a){var i=function(){function e(){return i(a,arguments)}var a={en:{},fr:{}},i=t("$").intl;return e.all=a,e}(),o=t("dom"),n=t("dom.fx"),s=t("tfw.listeners"),r=function(t,e){var a=this;void 0===e&&(e={}),void 0===e.enabled&&(e.enabled=!0),t=o(t),this.enabled=e.enabled,this.color=e.color||"#333",this.classToAdd=e.classToAdd,this.opacity=e.opacity||.4,this.element=o(t),this.tap=new s,this.press=new s,o.addClass(t,"tfw-touchable");var i,r,c=o.div("tfw-touchable-shadow"),l=o.div("tfw-touchable-container",[c]),d=n().css(c,{transition:"none",transform:"scale(0)"}).exec(function(e){var n=a.classToAdd;"string"==typeof n&&o.addClass(t,n),-1==["relative","absolute","fixed"].indexOf(getComputedStyle(t).position)&&(t.style.position="relative");var s=t.getBoundingClientRect(),d=s.width,f=s.height;d=Math.max(i,d-i),f=Math.max(r,f-r);var u=Math.ceil(Math.sqrt(d*d+f*f));o.css(c,{left:i+"px",top:r+"px",margin:"-"+u+"px",width:2*u+"px",height:2*u+"px",opacity:0,background:a.color,transform:"scale(0)",transition:"all .15s ease","transition-timing-function":"cubic-bezier(0,1,0.780,1)","-moz-transition-timing-function":"cubic-bezier(0,1,0.780,1)","-webkit-transition-timing-function":"cubic-bezier(0,1,0.780,1)"}),o.add(t,l)}).wait(10).css(c,{opacity:a.opacity,transform:"scale(.25)"}).wait(150).css(c,{transform:"scale(.2)"}).wait(150).css(c,{transition:"all .6s ease",transform:"scale(1)",opacity:0}).wait(600).detach(l).exec(function(){var e=a.classToAdd;"string"==typeof e&&o.removeClass(t,e)}),f=0;o.on(t,{down:function(t){a.enabled&&(t.stopPropagation(),t.preventDefault(),i=Math.floor(t.x),r=Math.floor(t.y),d.start(),f=Date.now())},tap:function(t){if(!a.enabled)return void console.log("[tfw.touchable] DISABLED!");console.log("[tfw.touchable] TAP",t),a.tap.fire(t)}})};e.exports=r,e.exports._=i});
//# sourceMappingURL=tfw.touchable.js.map
require("dom.fx",function(t,e,n){function i(t){if(t==this._session){if(this._index>=this._tasks.length)return this._index=0,this._started=!1,delete this._session,void this._onEnd(this);var e=this,n=this._tasks[this._index++];this._debug&&console.info("[dom.fx] tsk["+(this._index-1)+"]: ",n.label,"("+(Date.now()-this._startTime)+" ms)",n.args,t),n(function(){l(i.bind(e,t))},!0)}}function o(t,e){e.terminate&&e.terminate();var n=t.getBoundingClientRect();console.info("[dom.fx] rect=...",n);var i=c.div();c.css(i,{display:"inline-block",width:n.width+"px",height:n.height+"px"}),e.onBeforeReplace(t),c.replace(i,t),e.onAfterReplace(t),e.substitute=i,e.styles=r(t),e.overlay=c.div("dom-fx-fullscreen"),document.body.appendChild(e.overlay),e.overlay.appendChild(t),c.css(t,{left:n.left+"px",top:n.top+"px",width:n.width+"px",height:n.height+"px"}),c.addClass(t,"dom-fx-fullscreen-target"),l(function(){var n=e.overlay.getBoundingClientRect();c.css(t,{left:"20px",top:"20px",width:n.width-40+"px",height:n.height-40+"px"})})}function s(t,e){var n=e.substitute.getBoundingClientRect();c.css(t,{left:n.left+"px",top:n.top+"px",width:n.width+"px",height:n.height+"px"}),e.terminate=function(){c.detach(e.overlay),e.onBeforeReplace(t),c.replace(t,e.substitute),e.onAfterReplace(t),a(t,e.styles),delete e.terminate},l(e.terminate,200)}function r(t){var e,n,i={};for(e in t.style)n=t.style[e],i[e]=n;return console.info("[dom.fx] styles=...",i),i}function a(t,e){for(var n in e)t.style[n]=e[n]}var d=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}();t("polyfill.promise");var c=t("dom"),h=t("tfw.data-binding"),l=window.setTimeout,f=function(){},p=1,u=function(t){this._session={},Object.defineProperty(u.prototype,"name",{value:t,writable:!1,configurable:!0,enumerable:!0}),this._name=t,this._tasks=[],this._index=0,this._started=!1,this._startTime=0,this._onEnd=f};u.prototype.start=function(t){this._started&&this.end(),"function"!=typeof t&&(t=f),this._onEnd=t,this._started=!0,this._index=0,this._session={$id:p++},this._startTime=Date.now(),i.call(this,this._session)},u.prototype.end=function(){if(!this._started)return this;var t=this;for(this._started=!1,delete this._session;this._index<this._tasks.length;){var e=this._tasks[this._index++];t._debug&&console.info("[dom.fx.end] tsk["+(this._index-1)+"]: ",e.label,e.args),e(f,!1)}return this._onEnd(this),this},u.prototype.debug=function(t){return this.addTask(function(e){this._debug=!!t,e()}),this},u.prototype.addTask=function(t,e,n){return t.label=e,t.args=n,this._tasks.push(t),this},u.prototype.log=function(t){return this.addTask(function(e){console.log("[dom.fx]",t),e()},"log"),this},u.prototype.pause=function(){return this.addTask(f,"pause"),this},u.prototype.exec=function(){var t=Array.prototype.slice.call(arguments);return this.addTask(function(e,n){t.forEach(function(t){try{"function"==typeof t?t(n):console.log("[dom.fx]",t)}catch(t){console.error(t)}}),e()},"exec",t),this},["css","addClass","removeClass","toggleClass","detach","saveStyle","restoreStyle","add","removeAtt","replace"].forEach(function(t){var e=c[t];u.prototype[t]=function(){var n=Array.prototype.slice.call(arguments);return this.addTask(function(t){e.apply(c,n),t()},t,n),this}}),u.prototype.vanish=function(t,e){return e=parseInt(e),isNaN(e)&&(e=300),this.css(t,{transition:"none"}).css(t,{transition:"opacity "+e+"ms",opacity:0}).wait(e)},u.prototype.vanishAndDetach=function(t,e){return e=parseInt(e),isNaN(e)&&(e=300),this.vanish(t,e).detach(t)},u.prototype.wait=function(t){var e=Array.prototype.slice.call(arguments);return void 0===t&&(t=0),"number"==typeof t?this.addTask(function(e,n){n&&l(e,t)},"wait",e):this.addTask(function(e,n){if(n){var i=c(t),o=function(t){["transitionend","oTransitionEnd","webkitTransitionEnd"].forEach(function(t){i.removeEventListener(t,o)}),e()};["transitionend","oTransitionEnd","webkitTransitionEnd"].forEach(function(t){i.addEventListener(t,o)})}},"wait",e),this},e.exports=function(t){return new u(t)},e.exports.Fullscreen=function(t){if(void 0===t)throw Error("[dom.fx:fullscreen] Missing argument!");if(void 0===t.target)throw Error("[dom.fx:fullscreen] Missing `opts.target`!");"function"==typeof t.target.element&&(t.target=t.target.element()),void 0!==t.target.element&&(t.target=t.target.element);var e=function(){},n={onBeforeReplace:"function"==typeof t.onBeforeReplace?t.onBeforeReplace:e,onAfterReplace:"function"==typeof t.onAfterReplace?t.onAfterReplace:e};h.propBoolean(this,"value")(function(e){e?o(t.target,n):s(t.target,n)})},e.exports._=d});
//# sourceMappingURL=dom.fx.js.map
require("polyfill.promise",function(t,n,e){var r=function(){function n(){return r(e,arguments)}var e={en:{},fr:{}},r=t("$").intl;return n.all=e,n}();window.Promise||function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function n(t){return"function"==typeof t}function e(t){return"object"==typeof t&&null!==t}function r(){}function o(){for(var t=0;t<S;t+=2){(0,D[t])(D[t+1]),D[t]=void 0,D[t+1]=void 0}S=0}function i(){}function s(){return new TypeError("You cannot resolve a promise with itself")}function u(){return new TypeError("A promises callback cannot return that same promise.")}function c(t){try{return t.then}catch(t){return K.error=t,K}}function a(t,n,e,r){try{t.call(n,e,r)}catch(t){return t}}function f(t,n,e){C(function(t){var r=!1,o=a(e,n,function(e){r||(r=!0,n!==e?_(t,e):v(t,e))},function(n){r||(r=!0,d(t,n))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,d(t,o))},t)}function l(t,n){n._state===q?v(t,n._result):t._state===F?d(t,n._result):y(n,void 0,function(n){_(t,n)},function(n){d(t,n)})}function h(t,e){if(e.constructor===t.constructor)l(t,e);else{var r=c(e);r===K?d(t,K.error):void 0===r?v(t,e):n(r)?f(t,e,r):v(t,e)}}function _(n,e){n===e?d(n,s()):t(e)?h(n,e):v(n,e)}function p(t){t._onerror&&t._onerror(t._result),m(t)}function v(t,n){t._state===I&&(t._result=n,t._state=q,0===t._subscribers.length||C(m,t))}function d(t,n){t._state===I&&(t._state=F,t._result=n,C(p,t))}function y(t,n,e,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=n,o[i+q]=e,o[i+F]=r,0===i&&t._state&&C(m,t)}function m(t){var n=t._subscribers,e=t._state;if(0!==n.length){for(var r,o,i=t._result,s=0;s<n.length;s+=3)r=n[s],o=n[s+e],r?g(e,r,o,i):o(i);t._subscribers.length=0}}function w(){this.error=null}function b(t,n){try{return t(n)}catch(t){return N.error=t,N}}function g(t,e,r,o){var i,s,c,a,f=n(r);if(f){if(i=b(r,o),i===N?(a=!0,s=i.error,i=null):c=!0,e===i)return void d(e,u())}else i=o,c=!0;e._state!==I||(f&&c?_(e,i):a?d(e,s):t===q?v(e,i):t===F&&d(e,i))}function A(t,n){try{n(function(n){_(t,n)},function(n){d(t,n)})}catch(n){d(t,n)}}function j(t,n,e,r){this._instanceConstructor=t,this.promise=new t(i,r),this._abortOnReject=e,this._validateInput(n)?(this._input=n,this.length=n.length,this._remaining=n.length,this._init(),0===this.length?v(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&v(this.promise,this._result))):d(this.promise,this._validationError())}function E(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function P(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function T(t,e){this._id=G++,this._label=e,this._state=void 0,this._result=void 0,this._subscribers=[],i!==t&&(n(t)||E(),this instanceof T||P(),A(this,t))}var k;k=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var M,O=k,S=(Date.now,Object.create,0),C=function(t,n){D[S]=t,D[S+1]=n,2===(S+=2)&&M()},R="undefined"!=typeof window?window:{},x=R.MutationObserver||R.WebKitMutationObserver,Y="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,D=new Array(1e3);M="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?function(){return function(){process.nextTick(o)}}():x?function(){var t=0,n=new x(o),e=document.createTextNode("");return n.observe(e,{characterData:!0}),function(){e.data=t=++t%2}}():Y?function(){var t=new MessageChannel;return t.port1.onmessage=o,function(){t.port2.postMessage(0)}}():function(){return function(){setTimeout(o,1)}}();var I=void 0,q=1,F=2,K=new w,N=new w;j.prototype._validateInput=function(t){return O(t)},j.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},j.prototype._init=function(){this._result=new Array(this.length)};var U=j;j.prototype._enumerate=function(){for(var t=this.length,n=this.promise,e=this._input,r=0;n._state===I&&r<t;r++)this._eachEntry(e[r],r)},j.prototype._eachEntry=function(t,n){var r=this._instanceConstructor;e(t)?t.constructor===r&&t._state!==I?(t._onerror=null,this._settledAt(t._state,n,t._result)):this._willSettleAt(r.resolve(t),n):(this._remaining--,this._result[n]=this._makeResult(q,n,t))},j.prototype._settledAt=function(t,n,e){var r=this.promise;r._state===I&&(this._remaining--,this._abortOnReject&&t===F?d(r,e):this._result[n]=this._makeResult(t,n,e)),0===this._remaining&&v(r,this._result)},j.prototype._makeResult=function(t,n,e){return e},j.prototype._willSettleAt=function(t,n){var e=this;y(t,void 0,function(t){e._settledAt(q,n,t)},function(t){e._settledAt(F,n,t)})};var W=function(t,n){return new U(this,t,!0,n).promise},$=function(t,n){function e(t){_(s,t)}function r(t){d(s,t)}var o=this,s=new o(i,n);if(!O(t))return d(s,new TypeError("You must pass an array to race.")),s;for(var u=t.length,c=0;s._state===I&&c<u;c++)y(o.resolve(t[c]),void 0,e,r);return s},z=function(t,n){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(i,n);return _(r,t),r},B=function(t,n){var e=this,r=new e(i,n);return d(r,t),r},G=0,H=T;T.all=W,T.race=$,T.resolve=z,T.reject=B,T.prototype={constructor:T,then:function(t,n,e){var r=this,o=r._state;if(o===q&&!t||o===F&&!n)return this;r._onerror=null;var s=new this.constructor(i,e),u=r._result;if(o){var c=arguments[o-1];C(function(){g(o,s,c,u)})}else y(r,s,t,n);return s},catch:function(t,n){return this.then(null,t,n)}};var J=function(){var t;"Promise"in(t="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self)&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),n(e)}()||(t.Promise=H)};J()}.call(this),n.exports._=r});
//# sourceMappingURL=polyfill.promise.js.map
require("wdg.icon",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{}},e=n("$").intl;return r.all=t,r}();r.exports=n("tfw.view.icon"),r.exports._=e});
//# sourceMappingURL=wdg.icon.js.map
require("wdg.deform-3",function(r,t,e){function n(r){var t=this.gl;s.css(t.canvas,{"background-image":"url(css/wdg.deform-3/background.jpg)","background-size":"100% 100%"}),this.prg=new l(this.gl,{vert:o.vert,frag:o.frag});var e,n=[];for(e=0;e<c;e++)n.push(.18,0,e,.36,1-e/(c-1),.18,1,e,0,1-e/(c-1));for(e=0;e<c;e++)n.push(.25,0,e,1,1-e/(c-1),.25,1,e,.5,1-e/(c-1));n=new Float32Array(n),this.prg.use();var a=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW);var i=n.BYTES_PER_ELEMENT,u=5*i,g=this.prg.attribs.attRadius.location;t.enableVertexAttribArray(g),t.vertexAttribPointer(g,1,t.FLOAT,!1,u,0*i);var f=this.prg.attribs.attAngle.location;t.enableVertexAttribArray(f),t.vertexAttribPointer(f,1,t.FLOAT,!1,u,1*i);var T=this.prg.attribs.attLevel.location;t.enableVertexAttribArray(T),t.vertexAttribPointer(T,1,t.FLOAT,!1,u,2*i);var E=this.prg.attribs.attUV.location;t.enableVertexAttribArray(E),t.vertexAttribPointer(E,2,t.FLOAT,!1,u,3*i),this.vertexCount=2*c,this.uniTime=t.getUniformLocation(this.prg.program,"uniTime"),this.uniDelay=t.getUniformLocation(this.prg.program,"uniDelay"),this.uniAngle=t.getUniformLocation(this.prg.program,"uniAngle"),this.uniTexture=t.getUniformLocation(this.prg.program,"uniTexture");var d=t.createTexture();t.bindTexture(t.TEXTURE_2D,d),this.texture=d,t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);var v=new Image;v.onload=function(){t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,v),r()},v.onerror=function(r){console.error("Unable to load",v.src+"!"),console.error(r)},v.src="css/wdg.deform-3/texture.png"}function a(r){var t=this.prg.program,e=this.gl;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(t),e.uniform1f(this.uniTime,r),e.uniform1f(this.uniDelay,this.delay),e.uniform1f(this.uniAngle,this.angle/c),e.bindTexture(e.TEXTURE_2D,this.texture),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture),e.uniform1i(this.uniTexture,0),e.drawArrays(e.TRIANGLE_STRIP,this.girafe?this.vertexCount:0,this.vertexCount)}var i=function(){function t(){return n(e,arguments)}var e={en:{},fr:{}},n=r("$").intl;return t.all=e,t}(),o={vert:"uniform float uniTime;\r\nuniform float uniDelay;\r\nuniform float uniAngle;\r\n\r\nattribute float attRadius;\r\nattribute float attAngle;\r\nattribute float attLevel;\r\nattribute vec2 attUV;\r\n\r\n// Coordonnées dans la texture.\r\nvarying vec2 varUV;\r\n\r\nconst float PI = 3.141592653589793;\r\nconst float LEVELS = 32.0;\r\n\r\nvoid main() {\r\n  // Temps qui tient compte du décalage par level.\r\n  float t = uniTime - uniDelay * attLevel;\r\n  // Angle max d'inclinaison entre deux niveaux.\r\n  float a = radians( uniAngle );\r\n  // Calculer en fonction du temps l'angle entre deux\r\n  // triangles consécutifs.\r\n  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);\r\n  // Coordonnées du centre du triangle de la base.\r\n  float xc = 0.0;\r\n  float yc = -1.0;\r\n  \r\n  int level = int( attLevel );\r\n  // A chaque niveau supplémentaire,\r\n  // l'angle s'incline un peu plus.\r\n  float angle = tilt;\r\n  for( int i = 1 ; i < 32 ; i++ ) {\r\n    // Condition d'arrêt.\r\n    if ( i > level ) break;\r\n    // Calculer les coordonnées du centre du triangle.\r\n    yc += cos( angle ) * 2.0 / LEVELS;\r\n    xc += sin( angle ) * 2.0 / LEVELS;\r\n    // Incliner un peu plus pour le niveau suivant.\r\n    angle += tilt;\r\n  }\r\n  // Coordonnées du vertex dans l'espace de WebGL.\r\n  float x = attRadius * cos( attAngle * PI - angle );\r\n  float y = attRadius * sin( attAngle * PI - angle );\r\n  \r\n  gl_Position = vec4( \r\n    xc + x,   // Aspect ratio\r\n    yc + y,\r\n    0, 1 \r\n  );\r\n  \r\n  varUV = attUV;\r\n}\r\n",frag:"precision mediump float;\r\n\r\nuniform sampler2D uniTexture;\r\n\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  vec4 color = texture2D( uniTexture, varUV );\r\n  // Si le point est transparent, on ne l'affiche pas.\r\n  if ( color.a < 0.1 ) discard;\r\n  gl_FragColor = color;\r\n}\r\n"},l=r("webgl.program"),u=r("canvas"),s=r("dom");t.exports=u({init:n,draw:a,context:{alpha:!0},numbers:{delay:0,angle:30},booleans:{girafe:!1}});var c=32;t.exports._=i});
//# sourceMappingURL=wdg.deform-3.js.map
require("canvas",function(t,n,i){function e(t,n,i){var e=t.getContext("webgl",n);this.gl=e,Object.freeze(this.gl);var r=new Promise(i.init.bind(this)),o=i.draw.bind(this),s=function(t){window.requestAnimationFrame(s),a(e),o(t)};r.then(s)}var r=function(){function n(){return e(i,arguments)}var i={en:{},fr:{}},e=t("$").intl;return n.all=i,n}(),o=t("dom"),s=t("tfw.data-binding"),a=t("webgl.resize");n.exports=function(t){void 0===t.numbers&&(t.numbers={}),void 0===t.strings&&(t.strings={}),void 0===t.booleans&&(t.booleans={}),void 0===t.context&&(t.context={}),"function"!=typeof t.init&&(t.init=function(t){t()}),"function"!=typeof t.draw&&(t.draw=function(){});var n,i={alpha:!1,depth:!1,stencil:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,failIfMajorPerformanceCaveat:!0};for(n in t.context)i[n]=t.context[n];var r=function(n){var r=o.elem(this,"canvas");s.propInteger(this,"width")(function(t){r.setAttribute("width",t),r.style.width=t+"px"}),s.propInteger(this,"height")(function(t){r.setAttribute("height",t),r.style.height=t+"px"});var a,h,f={width:640,height:480};for(a in t.strings)h=t.strings[a],s.propString(this,a),f[a]=h;for(a in t.numbers)h=t.numbers[a],s.propFloat(this,a),f[a]=h;for(a in t.booleans)h=t.booleans[a],s.propBoolean(this,a),f[a]=h;n=s.extend(f,n,this),window.setTimeout(e.bind(this,r,i,t),20)};return r},n.exports._=r});
//# sourceMappingURL=canvas.js.map
require("webgl.resize",function(n,t,e){var i=function(){function t(){return i(e,arguments)}var e={en:{},fr:{}},i=n("$").intl;return t.all=e,t}();t.exports=function(n,t){"number"!=typeof t&&(t=window.devicePixelRatio);var e=Math.floor(n.canvas.clientWidth*t),i=Math.floor(n.canvas.clientHeight*t);n.canvas.width===e&&n.canvas.height===i||(n.canvas.width=e,n.canvas.height=i,n.viewport(0,0,e,i))},t.exports._=i});
//# sourceMappingURL=webgl.resize.js.map
require("webgl.program",function(r,e,t){function n(r,e,t){if("string"!=typeof e.vert)throw Error("[webgl.program] Missing attribute `vert` in argument `codes`!");if("string"!=typeof e.frag)throw Error("[webgl.program] Missing attribute `frag` in argument `codes`!");e=a(e,t),this.gl=r,Object.freeze(this.gl),this.BPE=p,Object.freeze(this.BPE),this._typesNamesLookup=m(r);var n=r.createProgram();r.attachShader(n,h(r,e.vert)),r.attachShader(n,c(r,e.frag)),r.linkProgram(n),this.program=n,Object.freeze(this.program),this.use=function(){r.useProgram(n)},this.use(),o(this,r,n),i(this,r,n)}function o(r,e,t){var n,o,i={},a=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(n=0;n<a;n++)o=e.getActiveAttrib(t,n),o.typeName=r.getTypeName(o.type),o.length=g(e,o),o.location=e.getAttribLocation(t,o.name),console.info("item=",o),i[o.name]=o;r.attribs=i,Object.freeze(r.attribs)}function i(r,e,t){var n,o,i={},a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(n=0;n<a;n++)o=e.getActiveUniform(t,n),i[o.name]=e.getUniformLocation(t,o.name),Object.defineProperty(r,"$"+o.name,{set:s(e,o,i[o.name],r._typesNamesLookup),get:u(o),enumerable:!0,configurable:!1});r.uniforms=i,Object.freeze(r.uniforms)}function a(r,e){var t,n,o={};for(t in r)n=r[t],o[t]=n.split("\n").map(function(r){if("#include"!=r.trim().substr(0,8))return r;var t=r.indexOf("#include")+8,n=r.substr(t).trim();"'<\"".indexOf(n.charAt(0))>-1&&(n=n.substr(1,n.length-2));var o=e[n];if("string"!=typeof o)throw console.error("Include <"+n+"> not found in ",e),Error("Include not found in shader: "+n);return o}).join("\n");return o}function s(r,e,t,n){var o="_$"+e.name;switch(e.type){case r.BYTE:case r.UNSIGNED_BYTE:case r.SHORT:case r.UNSIGNED_SHORT:case r.INT:case r.UNSIGNED_INT:case r.SAMPLER_2D:return 1==e.size?function(e){r.uniform1i(t,e),this[o]=e}:function(e){r.uniform1iv(t,e),this[o]=e};case r.FLOAT:return 1==e.size?function(e){r.uniform1f(t,e),this[o]=e}:function(e){r.uniform1fv(t,e),this[o]=e};case r.FLOAT_VEC2:if(1==e.size)return function(e){r.uniform2fv(t,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform `"+e.name+"'!'");case r.FLOAT_VEC3:if(1==e.size)return function(e){r.uniform3fv(t,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform `"+e.name+"'!'");case r.FLOAT_VEC4:if(1==e.size)return function(e){r.uniform4fv(t,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform `"+e.name+"'!'");case r.FLOAT_MAT3:if(1==e.size)return function(e){r.uniformMatrix3fv(t,!1,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform `"+e.name+"'!'");case r.FLOAT_MAT4:if(1==e.size)return function(e){r.uniformMatrix4fv(t,!1,e),this[o]=e};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform `"+e.name+"'!'");default:throw Error("[webgl.program.createWriter] Don't know how to deal with uniform `"+e.name+"` of type "+n[e.type]+"!")}}function u(r){var e="_$"+r.name;return function(){return this[e]}}function f(r,e,t){var n=e.createShader(r);return e.shaderSource(n,t),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.log(t),console.error("An error occurred compiling the shader: "+e.getShaderInfoLog(n)),null)}function c(r,e){return f(r.FRAGMENT_SHADER,r,e)}function h(r,e){return f(r.VERTEX_SHADER,r,e)}function m(r){var e,t,n={};for(e in r)"number"==typeof(t=r[e])&&(n[t]=e);return n}function g(r,e){switch(e.type){case r.FLOAT_VEC4:return 4;case r.FLOAT_VEC3:return 3;case r.FLOAT_VEC2:return 2;case r.FLOAT:return 1;default:throw"[webgl.program:getSize] I don't know the size of the attribute '"+e.name+"' because I don't know the type "+getTypeName(e.type)+"!"}}var l=function(){function e(){return n(t,arguments)}var t={en:{},fr:{}},n=r("$").intl;return e.all=t,e}(),p=(new Float32Array).BYTES_PER_ELEMENT;n.prototype.getTypeName=function(r){return this._typesNamesLookup[r]},n.prototype.bindAttribs=function(r){var e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,r);var t=Array.prototype.slice.call(arguments,1),n=0;t.forEach(function(r){var e=this.attribs[r];if(!e)throw'Cannot find attribute "'+r+'"!\nIt may be not active because unused in the shader.\nAvailable attributes are: '+Object.keys(this.attribs).map(function(r){return'"'+r+'"'}).join(", ");n+=e.size*e.length*p},this);var o=0;t.forEach(function(r){var t=this.attribs[r];e.enableVertexAttribArray(t.location),e.vertexAttribPointer(t.location,t.size*t.length,e.FLOAT,!1,n,o),o+=t.size*t.length*p},this)},e.exports=n,e.exports._=l});
//# sourceMappingURL=webgl.program.js.map
require("wdg.showhide",function(e,t,n){function i(e){function t(){n.value=!n.value,n.focus=!0}var n=this,i=new l({content:"tri-right",size:"24px"}),o=s.tag("span","label"),d=s.div("head",[i,o]),h=s.div("body","thm-bg0"),c=s.elem(this,"div","wdg-showhide","thm-ele2",[d,h]);r(this,function(e){switch(e.keyCode){case 13:case 32:n.value=!n.value}console.info("[wdg.showhide] evt=",e)}),a.propBoolean(this,"value")(function(e){e?(s.addClass(c,"show"),s.removeClass(c,"fade-in"),window.setTimeout(function(){s.addClass(c,"fade-in")})):s.removeClass(c,"show")}),a.propBoolean(this,"simple")(function(e){e?(s.addClass(c,"simple"),s.removeClass(c,"thm-ele2"),s.removeClass(d,"thm-bgPD")):(s.removeClass(c,"simple"),s.addClass(c,"thm-ele2"),s.addClass(d,"thm-bgPD"))}),a.propString(this,"label")(function(e){o.textContent=e}),a.propUnit(this,"maxHeight")(function(e){e.v<=0?h.style.maxHeight="none":h.style.maxHeight=e.v+e.u}),a.prop(this,"content")(function(e){s.clear(h),Array.isArray(e)?e.forEach(function(e){s.add(h,e)}):void 0!==e&&null!==e&&s.add(h,e)}),a.propRemoveClass(this,"wide","inline"),a.propRemoveClass(this,"visible","hide"),e=a.extend({value:!0,label:"",content:null,maxHeight:null,visible:!0,wide:!0,simple:!1,focus:!1},e,this),s.on(d,t),this.append=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),s.add(h,e),n},this.prepend=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),h.insertBefore(e,h.childNodes[0]),n}}var o=function(){function t(){return i(n,arguments)}var n={en:{}},i=e("$").intl;return t.all=n,t}(),s=e("dom"),a=e("tfw.data-binding"),l=e("wdg.icon"),r=e("tfw.focusable");i.prototype.clear=function(){return this.content=[],this},t.exports=i,t.exports._=o});
//# sourceMappingURL=wdg.showhide.js.map
require("tfw.focusable",function(n,t,e){var o=function(){function t(){return o(e,arguments)}var e={en:{},fr:{}},o=n("$").intl;return t.all=e,t}(),u=n("dom"),f=n("tfw.data-binding"),i=function(n,t){"function"!=typeof t&&(t=function(){}),u.addClass(n,"tfw-focusable");var e=u.tag("input");u(n).insertAdjacentElement("afterbegin",u.div("tfw-focusable-invisible",[e])),e.addEventListener("keydown",function(n){t(n),e.value=""}),e.addEventListener("focus",function(){u.addClass(n,"focus"),n.focus=!0}),e.addEventListener("blur",function(){u.removeClass(n,"focus"),n.focus=!1}),f.propBoolean(n,"focus")(function(n){window.setTimeout(function(){n?e.focus():e.blur()})})};t.exports=i,t.exports._=o});
//# sourceMappingURL=tfw.focusable.js.map
require("wdg.deform-2",function(r,e,t){function n(r){var e=this.gl;s.css(e.canvas,{"background-image":"url(css/wdg.deform-1/forest.jpg)","background-size":"100% 100%"}),this.prg=new l(this.gl,{vert:o.vert,frag:o.frag});for(var t=[],n=0;n<c;n++)t.push(.75,0,n,1,1,.5,.5*Math.PI,n,.5,0,.75,Math.PI,n,0,1);t=new Float32Array(t),this.prg.use();var a=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW);var i=t.BYTES_PER_ELEMENT,u=5*i,g=this.prg.attribs.attRadius.location;e.enableVertexAttribArray(g),e.vertexAttribPointer(g,1,e.FLOAT,!1,u,0*i);var f=this.prg.attribs.attAngle.location;e.enableVertexAttribArray(f),e.vertexAttribPointer(f,1,e.FLOAT,!1,u,1*i);var T=this.prg.attribs.attLevel.location;e.enableVertexAttribArray(T),e.vertexAttribPointer(T,1,e.FLOAT,!1,u,2*i);var v=this.prg.attribs.attUV.location;e.enableVertexAttribArray(v),e.vertexAttribPointer(v,2,e.FLOAT,!1,u,3*i),this.vertexCount=3*c,this.uniTime=e.getUniformLocation(this.prg.program,"uniTime"),this.uniDelay=e.getUniformLocation(this.prg.program,"uniDelay"),this.uniAngle=e.getUniformLocation(this.prg.program,"uniAngle"),this.uniTexture=e.getUniformLocation(this.prg.program,"uniTexture");var d=e.createTexture();e.bindTexture(e.TEXTURE_2D,d),this.texture=d,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);var E=new Image;E.onload=function(){e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,E),r()},E.onerror=function(r){console.error("Unable to load",E.src+"!"),console.error(r)},E.src="css/wdg.deform-2/leaves.png"}function a(r){var e=this.prg.program,t=this.gl;t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(e),t.uniform1f(this.uniTime,r),t.uniform1f(this.uniDelay,this.delay),t.uniform1f(this.uniAngle,this.angle),t.bindTexture(t.TEXTURE_2D,this.texture),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.texture),t.uniform1i(this.uniTexture,0),t.drawArrays(t.TRIANGLES,0,this.vertexCount)}var i=function(){function e(){return n(t,arguments)}var t={en:{},fr:{}},n=r("$").intl;return e.all=t,e}(),o={vert:"uniform float uniTime;\r\nuniform float uniDelay;\r\nuniform float uniAngle;\r\n\r\nattribute float attRadius;\r\nattribute float attAngle;\r\nattribute float attLevel;\r\nattribute vec2 attUV;\r\n\r\n// Coordonnées dans la texture.\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  // Temps qui tient compte du décalage par level.\r\n  float t = uniTime - uniDelay * attLevel;\r\n  // Angle max d'inclinaison entre deux niveaux.\r\n  float a = radians( uniAngle ) * 0.1;\r\n  // Calculer en fonction du temps l'angle entre deux\r\n  // triangles consécutifs.\r\n  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);\r\n  // Plus le triangle à un level élevé, plus il est petit.\r\n  float scale = 1.0 / sqrt( 1.0 + attLevel );\r\n  // Coordonnées du centre du triangle de la base.\r\n  float xc = -0.5;\r\n  float yc = -0.7;\r\n  \r\n  int level = int( attLevel );\r\n  // A chaque niveau supplémentaire,\r\n  // l'angle s'incline un peu plus.\r\n  float angle = tilt - 0.05;\r\n  for( int i = 1 ; i < 10 ; i++ ) {\r\n    // Condition d'arrêt.\r\n    if ( i > level ) break;\r\n    // Calculer les coordonnées du centre du triangle.\r\n    yc += 0.4 * scale * cos( angle );\r\n    xc += 0.4 * scale * sin( angle );\r\n    // Incliner un peu plus pour le niveau suivant.\r\n    angle += tilt;\r\n  }\r\n  // Coordonnées du vertex dans l'espace de WebGL.\r\n  float x = scale * attRadius * cos( attAngle - angle );\r\n  float y = scale * attRadius * sin( attAngle - angle );\r\n  \r\n  gl_Position = vec4( \r\n    xc + x,\r\n    yc + y,\r\n    0, 1 \r\n  );\r\n  \r\n  varUV = attUV;\r\n}\r\n",frag:"precision mediump float;\r\n\r\nuniform sampler2D uniTexture;\r\n\r\nvarying vec2 varUV;\r\n\r\nvoid main() {\r\n  vec4 color = texture2D( uniTexture, varUV );\r\n  // Si le point est transparent, on ne l'affiche pas.\r\n  if ( color.a < 0.1 ) discard;\r\n  gl_FragColor = color;\r\n}\r\n"},l=r("webgl.program"),u=r("canvas"),s=r("dom");e.exports=u({init:n,draw:a,context:{alpha:!0},numbers:{delay:0,angle:30}});var c=10;e.exports._=i});
//# sourceMappingURL=wdg.deform-2.js.map
require("wdg.flex",function(e,s,t){function a(e){var s=n.elem(this,"div","wdg-flex");i.propToggleClass(this,"orientation",o),i.propToggleClass(this,"type",c),i.propArray(this,"content")(function(e){n.clear(s),e.forEach(function(e){n.add(s,e),void 0!==e.$grow&&n.css(e,{"flex-grow":parseFloat(e.$grow)}),void 0!==e.$shrink&&n.css(e,{"flex-shrink":parseFloat(e.$shrink)})})}),i.propString(this,"justify")(function(e){n.removeClass(s,"justify-center","justify-flex-end","justify-flex-start","justify-space-around","justify-space-between");var t=null;switch(e.trim().toLowerCase()){case"center":t="center";break;case"flex-end":case"flexend":case"end":t="flex-end";break;case"flex-start":case"flexstart":case"start":t="flex-start";break;case"space-around":case"around":t="space-around";break;case"space-between":case"between":t="space-between"}t&&n.addClass(s,"justify-"+t)}),i.propAddClass(this,"wide"),i.propRemoveClass(this,"visible","hide"),e=i.extend({orientation:o[0],type:c[0],justify:"space-around",content:[],wide:!0,visible:!0},e,this)}var r=function(){function s(){return a(t,arguments)}var t={en:{}},a=e("$").intl;return s.all=t,s}(),n=e("dom"),i=e("tfw.data-binding"),o=["H","V","W","N"],c=["default","fill"];s.exports=a,s.exports._=r});
//# sourceMappingURL=wdg.flex.js.map
require("wdg.text",function(t,e,l){var a=function(){function e(){return a(l,arguments)}var l={en:{}},a=t("$").intl;return e.all=l,e}(),i=t("dom"),n=t("tfw.data-binding"),s=t("wdg.lang"),o=t("tfw.timer").laterAction,r=function(t){var e=this,l=!1,a=[],r=0,u=i.div("label"),v=i.tag("input"),d=new s({small:!0,visible:!0}),p=i.div("nowrap","thm-ele2","thn-bg3",[v,d]),c=i.div("datalist","thm-ele12");this._input=v;var f=i.elem(this,"div","wdg-text",[u,p,c]);n.bind(d,"value",function(t){v.value=e.value[t]||"",e.focus||v.focus()}),n.prop(this,"value")(function(t){if(null!==t&&void 0!==t||(t=""),"number"!=typeof t&&"boolean"!=typeof t||(t=""+t),"string"!=typeof t){v.value!=t[d.value]&&(v.value=t[d.value]);var l,a=[];for(l in t)a.push(l);d.subset=a,e.intl=!0}else v.value!=t&&(v.value=t),e.intl=!1;e.validate()}),n.propBoolean(this,"intl")(function(t){d.visible=t}),n.propEnum(["text","button","checkbox","color","date","datetime","email","file","hidden","image","month","password","radio","range","reset","search","submit","tel","time","url","week"])(this,"type")(function(t){i.att(v,{type:t}),"password"==t&&i.att(v,{autocomplete:"off"})}),n.propStringArray(this,"list")(function(t){i.clear(c),i.removeClass(f,"list"),Array.isArray(t)&&(t.forEach(function(t){i.add(c,i.div([t]))}),t.length>0&&i.att(f,"list"))}),n.propValidator(this,"validator")(this.validate.bind(this)),n.propBoolean(this,"valid")(function(t){null!==t&&e.validator?t?(i.addClass(f,"valid"),i.removeClass(f,"no-valid")):(i.removeClass(f,"valid"),i.addClass(f,"no-valid")):i.removeClass(f,"valid","no-valid")}),n.propBoolean(this,"enabled")(function(t){t?i.removeAtt(v,"disabled"):i.att(v,{disabled:t})}),n.propInteger(this,"size")(function(t){t<1?i.removeAtt(v,"size"):i.att(v,{size:t})}),n.propString(this,"label")(function(t){null===t||"string"==typeof t&&""==t.trim()?i.addClass(f,"no-label"):(i.removeClass(f,"no-label"),i.textOrHtml(u,t),"<html>"==t.substr(0,6)?i.att(u,{title:""}):i.att(u,{title:t}))}),n.propString(this,"placeholder")(function(t){i.att(v,{placeholder:t})}),n.propString(this,"width")(function(t){f.style.width=t}),n.propBoolean(this,"focus")(function(t){t?v.focus():v.blur()}),n.prop(this,"action"),n.propAddClass(this,"wide"),n.propRemoveClass(this,"visible","hide"),t=n.extend({action:!0,intl:!1,value:"",type:"text",placeholder:"",enabled:!0,validator:null,valid:!0,list:null,label:"",placeholder:"",size:10,width:"auto",focus:!1,wide:!1,visible:!0},t,this);var h=function(){if(i.removeClass(f,"list"),e.list&&0!=e.list.length){i.clear(c);var t=e.list,n=v.value.trim().toLowerCase();t=n.length>0?t.map(function(t,e){return[e,t.toLowerCase().indexOf(n)]}).filter(function(t){return t[1]>-1}).sort(function(t,l){var a=t[1]-l[1];if(0!=a)return a;var i=e.list[t[0]],n=e.list[l[0]];return i<n?-1:i>n?1:0}).map(function(t){var l=e.list[t[0]],a=t[1];return l.substr(0,a)+"<b>"+l.substr(a,n.length)+"</b>"+l.substr(a+n.length)}):t.sort(),r>0&&(t=t.slice(r).concat(t.slice(0,r))),a=t,t.forEach(function(a,n){var s=i.div();s.innerHTML=a,t[n]=s.textContent.trim(),i.add(c,s),i.on(s,{down:function(){l=!0},up:function(){l=!1,e.focus=!0},tap:function(){e.value=s.textContent.trim(),i.removeClass(f,"list")}})}),t.length>0?i.addClass(f,"list"):i.removeClass(f,"list")}},m=o(function(){e.intl?(e.value[d.value]=v.value,n.fire(e,"value",e.value)):e.value=v.value},300);v.addEventListener("keyup",function(t){13==t.keyCode?(t.preventDefault(),t.stopPropagation(),i.hasClass(f,"list")?(i.removeClass(f,"list"),e.value=a[0]):!1!==e.valid&&(n.fire(e,"value",v.value),n.fire(e,"action",v.value))):27==t.keyCode?(i.removeClass(f,"list"),r=0,t.preventDefault(),t.stopPropagation()):40==t.keyCode&&i.hasClass(f,"list")?(r=(r+1)%a.length,h(),t.preventDefault(),t.stopPropagation()):38==t.keyCode&&i.hasClass(f,"list")?(r=(r+a.length-1)%a.length,h(),t.preventDefault(),t.stopPropagation()):(r=0,h(),m.fire())}),v.addEventListener("blur",function(){e.intl?(e.value[d.value]=v.value,n.fire(e,"value",e.value)):e.value=v.value,l||i.removeClass(f,"list"),i.addClass(p,"thm-ele2"),i.removeClass(p,"thm-ele4"),i.addClass(v,"thm-bg3"),i.removeClass(v,"thm-bgSL"),n.fire(e,"focus",!1)}),v.addEventListener("focus",function(){e.selectAll(),i.removeClass(p,"thm-ele2"),i.addClass(p,"thm-ele4"),i.removeClass(v,"thm-bg3"),i.addClass(v,"thm-bgSL"),n.fire(e,"focus",!0)}),v.addEventListener("keydown",function(t){}),this.validate()};r.prototype.validate=function(){var t=this.validator;if(t)try{this.valid=t(this.value)}catch(e){console.error("[wdg.text:validate] Exception = ",e),console.error("[wdg.text:validate] Validator = ",t)}},r.prototype.selectAll=function(){var t=this._input;return t.setSelectionRange(0,t.value.length),!0},e.exports=r,e.exports._=a});
//# sourceMappingURL=wdg.text.js.map
require("tfw.timer",function(t,i,n){function e(t){return void 0===t&&(t=1),new Promise(function(i,n){window.setTimeout(i,t)})}function o(t,i){return new c(function(){return new Promise(t)},i)}function r(t,i){return new l(t,i)}function u(){return new f}function a(t,i){if("function"!=typeof t)throw"[tfw.timer/debounce] First param must be a function!";"number"!=typeof i&&(i=300);var n=null,e=0;return function(){n=Array.prototype.slice.call(arguments),e&&clearTimeout(e),e=setTimeout(function(){e=0,t.apply(null,n)},i)}}var s=function(){function i(){return e(n,arguments)}var n={en:{}},e=t("$").intl;return i.all=n,i}();t("polyfill.promise"),n.debounce=a,n.later=e,n.laterPromise=o,n.laterAction=r,n.longAction=u;var c=function(t,i){"number"!=typeof i&&(i=300),i<0&&(i=0);this.enabled=!0,this.waiting=!1,this.action=t,this.delay=i,this.timer=0};c.prototype.dbg=function(t){console.log((this.enabled?"E":"e")+(this.waiting?"W":"w")+": "+t)},c.prototype.fire=function(){var t=this;if(this.timer&&window.clearTimeout(this.timer),this.enabled){this.waiting=!1;var i=function(){t.enabled=!0,t.waiting&&t.fire()};this.timer=window.setTimeout(function(){t.timer=0,t.enabled=!1,t.action().then(i,i)},t.delay)}else this.waiting=!0};var l=function(t,i){"number"!=typeof i&&(i=300),i<0&&(i=100);this.action=t,this.delay=i,this.timer=0};l.prototype.fire=function(){var t=this;this.timer&&window.clearTimeout(this.timer),this.timer=window.setTimeout(function(){t.timer=0,t.enabled=!1,t.action()},t.delay)};var f=function(){this._timer=null,this._action=null};f.prototype.fire=function(t,i){var n=this;return this._timer||(t(),this._timer=window.setTimeout(function(){n._timer=null},i)),this},i.exports._=s});
//# sourceMappingURL=tfw.timer.js.map
require("wdg.lang",function(a,e,i){function n(a){var e=this,i=s(this),n=r.elem(this,"div","wdg-lang","theme-elevation-2","theme-color-B0","theme-color-bg-A5"),t=r.div();r.add(n,t),u.propString(this,"value")(function(a){t.textContent=a.toUpperCase()}),u.propRemoveClass(this,"visible","hide"),u.propAddClass(this,"small","small"),u.propStringArray(this,"subset"),u.extend({subset:[],value:g.lang(),small:!1,visible:!0},a,this),r.on(this.element,{down:function(a){r.addClass(n,"theme-elevation-8"),a.stopPropagation(),a.preventDefault()},up:function(a){r.removeClass(n,"theme-elevation-8")},tap:function(){o(i.body,e,i),i.attach()}})}function s(a){var e=k.Cancel(),i=r.tag("header",[l("caption")]),n=r.tag("footer",[e]),s=r.div(),o=r.div("wdg-lang-modal",[i,s,n]),t=new d({content:o});return t.body=s,e.on(t.detach.bind(t)),t}function o(a,e,i){r.clear(a);var n;for(n in l.all)break;var s;for(s in l.all[n])2==s.length&&-1!=e.subset.indexOf(s)&&r.add(a,t(e,s,i));e.subset.length>0&&r.add(a,r.tag("hr"));for(s in l.all[n])2==s.length&&-1==e.subset.indexOf(s)&&r.add(a,t(e,s,i))}function t(a,e,i){var n=new h({content:r.div("wdg-lang-table",[r.div([r.div([e.toUpperCase()]),r.div([l(e)])])]),enabled:e!=a.value});return r.css(n,{margin:"4px"}),n.on(function(){a.value=e,i.detach()}),n}var l=function(){function e(){return n(i,arguments)}var i={en:{ab:"аҧсуа бызшәа, аҧсшәа",aa:"Afaraf",af:"Afrikaans",ak:"Akan",sq:"Shqip",am:"አማርኛ",ar:"العربية",an:"aragonés",hy:"Հայերեն",as:"অসমীয়া",av:"авар мацӀ, магӀарул мацӀ",ae:"avesta",ay:"aymar aru",az:"azərbaycan dili",bm:"bamanankan",ba:"башҡорт теле",eu:"euskara, euskera",be:"беларуская мова",bn:"বাংলা",bh:"भोजपुरी",bi:"Bislama",bs:"bosanski jezik",br:"brezhoneg",bg:"български език",my:"ဗမာစာ",ca:"català",ch:"Chamoru",ce:"нохчийн мотт",ny:"chiCheŵa, chinyanja",zh:"中文",cv:"чӑваш чӗлхи",kw:"Kernewek",co:"corsu, lingua corsa",cr:"ᓀᐦᐃᔭᐍᐏᐣ",hr:"hrvatski jezik",cs:"čeština, český jazyk",da:"dansk",dv:"ދިވެހި",nl:"Nederlands, Vlaams",dz:"རྫོང་ཁ",en:"English",eo:"Esperanto",et:"eesti, eesti keel",ee:"Eʋegbe",fo:"føroyskt",fj:"vosa Vakaviti",fi:"suomi, suomen kieli",fr:"français, langue française",ff:"Fulfulde, Pulaar, Pular",gl:"galego",ka:"ქართული",de:"Deutsch",el:"ελληνικά",gn:"Avañe'ẽ",gu:"ગુજરાતી",ht:"Kreyòl ayisyen",ha:"(Hausa) هَوُسَ",he:"עברית",hz:"Otjiherero",hi:"हिन्दी, हिंदी",ho:"Hiri Motu",hu:"magyar",ia:"Interlingua",id:"Bahasa Indonesia",ie:"Interlingue",ga:"Gaeilge",ig:"Asụsụ Igbo",ik:"Iñupiaq, Iñupiatun",io:"Ido",is:"Íslenska",it:"italiano",iu:"ᐃᓄᒃᑎᑐᑦ",ja:"日本語",jv:"Basa Jawa",kl:"kalaallisut, kalaallit oqaasii",kn:"ಕನ್ನಡ",kr:"Kanuri",ks:"कश्मीरी",kk:"қазақ тілі",km:"ខ្មែរ, ខេមរភាសា, ភាសាខ្មែរ",ki:"Gĩkũyũ",rw:"Ikinyarwanda",ky:"Кыргызча, Кыргыз тили",kv:"коми кыв",kg:"Kikongo",ko:"한국어",ku:"Kurdî",kj:"Kuanyama",la:"latine, lingua latina",lb:"Lëtzebuergesch",lg:"Luganda",li:"Limburgs",ln:"Lingála",lo:"ພາສາລາວ",lt:"lietuvių kalba",lu:"Tshiluba",lv:"latviešu valoda",gv:"Gaelg, Gailck",mk:"македонски јазик",mg:"fiteny malagasy",ms:"bahasa Melayu",ml:"മലയാളം",mt:"Malti",mi:"te reo Māori",mr:"मराठी",mh:"Kajin M̧ajeļ",mn:"Монгол хэл",na:"Dorerin Naoero",nv:"Diné bizaad",nd:"isiNdebele",ne:"नेपाली",ng:"Owambo",nb:"Norsk bokmål",nn:"Norsk nynorsk",no:"Norsk",ii:"ꆈꌠ꒿ Nuosuhxop",nr:"isiNdebele",oc:"occitan, lenga d'òc",oj:"ᐊᓂᔑᓈᐯᒧᐎᓐ",cu:"ѩзыкъ словѣньскъ",om:"Afaan Oromoo",or:"ଓଡ଼ିଆ",os:"ирон æвзаг",pa:"ਪੰਜਾਬੀ",pi:"पाऴि",fa:"فارسی",pl:"język polski, polszczyzna",ps:"پښتو",pt:"Português",qu:"Runa Simi, Kichwa",rm:"rumantsch grischun",rn:"Ikirundi",ro:"Română",ru:"Русский",sa:"संस्कृतम्",sc:"sardu",sd:"सिन्धी",se:"Davvisámegiella",sm:"gagana fa'a Samoa",sg:"yângâ tî sängö",sr:"српски језик",gd:"Gàidhlig",sn:"chiShona",si:"සිංහල",sk:"slovenčina, slovenský jazyk",sl:"slovenski jezik, slovenščina",so:"Soomaaliga, af Soomaali",st:"Sesotho",es:"español",su:"Basa Sunda",sw:"Kiswahili",ss:"SiSwati",sv:"svenska",ta:"தமிழ்",te:"తెలుగు",tg:"тоҷикӣ",th:"ไทย",ti:"ትግርኛ",bo:"བོད་ཡིག",tk:"Türkmen, Түркмен",tl:"Wikang Tagalog",tn:"Setswana",to:"faka Tonga",tr:"Türkçe",ts:"Xitsonga",tt:"татар теле",tw:"Twi",ty:"Reo Tahiti",ug:"ئۇيغۇرچە",uk:"Українська",ur:"اردو",uz:"Oʻzbek",ve:"Tshivenḓa",vi:"Tiếng Việt",vo:"Volapük",wa:"walon",cy:"Cymraeg",wo:"Wollof",fy:"Frysk",xh:"isiXhosa",yi:"ייִדיש",yo:"Yorùbá",za:"Saɯ cueŋƅ, Saw cuengh",zu:"isiZulu",caption:"Please select your language"},fr:{caption:"Veuillez choisir votre langue"}},n=a("$").intl;return e.all=i,e}(),r=a("dom"),u=a("tfw.data-binding"),g=a("$"),d=a("wdg.modal"),k=a("wdg.button"),h=a("wdg.box-button");e.exports=n,e.exports._=l});
//# sourceMappingURL=wdg.lang.js.map
require("wdg.box-button",function(t,e,n){var i=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}(),o=t("dom"),a=t("tfw.data-binding"),s=t("tfw.touchable"),r=function(t){var e=this,n=o.elem(this,"div","wdg-box-button","thm-ele2"),i=new s(n);i.tap.add(this.fire.bind(this));var r=function(){o.removeClass(n,"thm-bgSL","thm-bg0","thm-bg3"),i.enabled=e.enabled,e.enabled?e.selected?o.addClass(n,"thm-bgSL"):o.addClass(n,"pointer","thm-bg3"):o.addClass(n,"thm-bg0")};a.prop(this,"value"),a.propBoolean(this,"enabled")(r),a.propBoolean(this,"selected")(r),a.prop(this,"content")(function(t){o.clear(n),Array.isArray(t)||(t=[t]),t.forEach(function(t){o.add(n,t)})}),a.prop(this,"action",0),a.propAddClass(this,"wide"),a.propRemoveClass(this,"visible","hide"),t=a.extend({content:[],value:"action",action:0,enabled:!0,selected:!1,wide:!1,visible:!0},t,this)};r.prototype.on=function(t){return a.bind(this,"action",t)},r.prototype.fire=function(){this.enabled&&a.fire(this,"action",this.value)},e.exports=r,e.exports._=i});
//# sourceMappingURL=wdg.box-button.js.map
require("wdg.button",function(e,t,n){function r(e,t){var n=JSON.parse(JSON.stringify(e));if(void 0===t)return n;var r;for(r in t)n[r]=void 0;return n}function o(e,t){return void 0===e&&(e={}),new c(r(e,t))}var i=function(){function t(){return r(n,arguments)}var n={en:{cancel:"Cancel",close:"Close",delete:"Delete",edit:"Edit",gotit:"Got it",no:"No",ok:"OK",save:"Save",yes:"Yes"},fr:{cancel:"Annuler",close:"Fermer",delete:"Supprimer",edit:"Editer",gotit:"J'ai compris",no:"Non",ok:"Valider",save:"Sauver",yes:"Oui"}},r=e("$").intl;return t.all=n,t}(),c=e("tfw.view.button");c.Cancel=function(e){return o({text:i("cancel"),icon:"cancel",flat:!0},e)},c.Close=function(e){return o({text:i("close"),icon:"close",flat:!0},e)},c.GotIt=function(e){return o({text:i("gotit"),flat:!0},e)},c.Delete=function(e){return o({text:i("delete"),type:"secondary",icon:"delete"},e)},c.No=function(e){return o({text:i("no"),icon:"cancel",flat:!0},e)},c.Ok=function(e){return o({text:i("ok"),icon:"ok",flat:!0},e)},c.Edit=function(e){return o({text:i("edit"),type:"primary",icon:"edit"},e)},c.Save=function(e){return o({text:i("save"),type:"primary",icon:"save"},e)},c.Yes=function(e){return o({text:i("yes"),flat:!0},e)},c.default={text:"OK",icon:null,type:null},t.exports=c,t.exports._=i});
//# sourceMappingURL=wdg.button.js.map
require("tfw.view.button",function(e,t,n){function i(e){return m(this).on("action",e),this}function a(e){this.wide?delete this.$.style.width:this.$.style.width=e}function o(e){void 0!==e&&(this.tag=e),this.href.length>0?this.target.length>0?window.open(this.href,this.target):window.location=this.href:this.action=this.tag}function s(){var e=[];if(this.flat)if(this.pressed)switch(this.type){case"default":e.push("thm-bg3");break;case"primary":e.push("thm-bgP");break;case"secondary":e.push("thm-bgS")}else switch(this.type){case"primary":e.push("thm-fgP");break;case"secondary":e.push("thm-fgS")}else{switch(this.type){case"default":e.push("thm-bg3");break;case"primary":e.push("thm-bgP");break;case"secondary":e.push("thm-bgS")}this.pressed?e.push("thm-ele4"):e.push("thm-ele2")}return e}function r(e){this.$elements.icon.size=e?20:28}function c(e){32!=e.keyCode&&13!=e.keyCode||(e.preventDefault(),e.stopPropagation(),o.call(this),this.pressed=!1)}function l(){var e=this;this._touchable=new w(this.$),this._touchable.tap.add(function(){o.call(e)}),this._touchable.enabled=this.enabled}function d(){if(this._touchable){var e=this.enabled&&!this.wait;this._touchable.enabled=e,e?u.removeAtt(this,"disabled"):u.att(this,{disabled:!0})}}var h=function(){function t(){return i(n,arguments)}var n={en:{cancel:"Cancel",close:"Close",delete:"Delete",edit:"Edit",gotit:"Got it",no:"No",ok:"OK",save:"Save",yes:"Yes"},fr:{cancel:"Annuler",close:"Fermer",delete:"Supprimer",edit:"Editer",gotit:"J'ai compris",no:"Non",ok:"Valider",save:"Sauver",yes:"Oui"}},i=e("$").intl;return t.all=n,t}(),f={getClasses:s,onWidthChanged:a,onSmallChanged:r,onEnabledChanged:d,onKeyUp:c,on:i,fire:o,init:l},u=e("dom"),m=e("tfw.binding.property-manager"),w=e("tfw.touchable");try{t.exports=function(){function t(e,t,n){return void 0===e[t]?n:e[t]}function n(e,t,n){n?a.addClass(e,t):a.removeClass(e,t)}function i(e,t,n){n?a.removeClass(e,t):a.addClass(e,t)}var a=e("dom"),o=e("tfw.binding.property-manager"),s=e("tfw.view").Tag,r=e("tfw.binding.link"),c=e("tfw.view"),l=e("tfw.binding.converters"),d=e("tfw.view.icon");c.ensureCodeBehind(f,"onEnabledChanged","onWidthChanged","onSmallChanged","on","fire","init","onKeyUp");var h=l.get("string"),u=l.get("boolean"),m=l.get("enum"),w=l.get("unit"),b=l.get("isEmpty"),p=function(e){try{void 0===e&&(e={}),this.$elements={};var l=this,p=o(this);p.createAction("action"),p.create("tag",{cast:h}),p.create("icon",{cast:h}),p.create("text",{cast:h}),p.create("href",{cast:h}),p.create("target",{cast:h}),p.create("pressed",{cast:u}),p.create("flat",{cast:u}),p.create("type",{cast:m(["primary","default","secondary"])}),p.create("enabled",{cast:u}),p.create("inverted",{cast:u}),p.create("visible",{cast:u}),p.create("wide",{cast:u}),p.create("width",{cast:w}),p.create("responsive",{cast:u}),p.create("small",{cast:u}),p.create("wait",{cast:u}),p.create("focus",{cast:u});var g=new s("BUTTON",["focus","class"]),v=new s("DIV",["class"]),y=new d;this.$elements.icon=y,a.add(v,y);var C=new s("DIV",["class"]);this.$elements.text=C,a.add(g,v,C),Object.defineProperty(this,"$",{value:g.$,writable:!1,enumerable:!1,configurable:!1}),c.events(g,{keyup:f.onKeyUp.bind(this),down:function(e){l.pressed=!0},up:function(e){l.pressed=!1}}),new r({A:{obj:l,name:"focus"},B:{obj:g,name:"focus"},name:"focus > e_/focus"}),new r({A:{obj:l,name:"flat"},B:{action:function(e){n(g,"flat",e)}},name:"flat > undefined"}),new r({A:{obj:l,name:"wait"},B:{action:function(e){n(g,"wait",e)}},name:"wait > undefined"}),new r({A:{obj:l,name:"flat"},B:{action:function(e){g.applyClass(f.getClasses.call(l,e,"flat"),0)}},name:"flat > undefined"}),new r({A:{obj:l,name:"type"},B:{action:function(e){g.applyClass(f.getClasses.call(l,e,"type"),0)}},name:"type > undefined"}),new r({A:{obj:l,name:"pressed"},B:{action:function(e){g.applyClass(f.getClasses.call(l,e,"pressed"),0)}},name:"pressed > undefined"}),new r({A:{obj:l,name:"inverted"},B:{action:function(e){n(g,"inverted",e)}},name:"inverted > undefined"}),new r({A:{obj:l,name:"visible"},B:{action:function(e){i(g,"hide",e)}},name:"visible > undefined"}),new r({A:{obj:l,name:"wide"},B:{action:function(e){n(g,"wide",e)}},name:"wide > undefined"}),new r({A:{obj:l,name:"responsive"},B:{action:function(e){n(g,"responsive",e)}},name:"responsive > undefined"}),new r({A:{obj:l,name:"small"},B:{action:function(e){n(g,"small",e)}},name:"small > undefined"}),new r({A:{obj:l,name:"icon"},B:{obj:y,name:"content"},name:"icon > e_icon/content"}),new r({A:{obj:l,name:"wait"},B:{obj:y,name:"animate"},name:"wait > e_icon/animate"}),new r({A:{obj:l,name:"text"},B:{action:function(e){n(C,"hide",e)},converter:b},name:"text > undefined"}),p.on("enabled",function(e){try{f.onEnabledChanged.call(l,e)}catch(e){console.error('Exception in function behind "onEnabledChanged" of module "mod/tfw.view.button.js" for attribute "enabled"!  '),console.error(e)}}),p.on("width",function(e){try{f.onWidthChanged.call(l,e)}catch(e){console.error('Exception in function behind "onWidthChanged" of module "mod/tfw.view.button.js" for attribute "width"!  '),console.error(e)}}),p.on("small",function(e){try{f.onSmallChanged.call(l,e)}catch(e){console.error('Exception in function behind "onSmallChanged" of module "mod/tfw.view.button.js" for attribute "small"!  '),console.error(e)}}),p.on("wait",function(e){try{f.onEnabledChanged.call(l,e)}catch(e){console.error('Exception in function behind "onEnabledChanged" of module "mod/tfw.view.button.js" for attribute "wait"!  '),console.error(e)}}),p.on("text",function(e){a.clear(C,e)}),g.class="tfw-view-button",v.class="icon",C.class="text thm-fg",this.tag=t(e,"tag","ACTION"),this.icon=t(e,"icon",""),this.text=t(e,"text","Click me!"),this.href=t(e,"href",""),this.target=t(e,"target",""),this.pressed=t(e,"pressed",!1),this.flat=t(e,"flat",!1),this.type=t(e,"type","primary"),this.enabled=t(e,"enabled",!0),this.inverted=t(e,"inverted",!1),this.visible=t(e,"visible",!0),this.wide=t(e,"wide",!1),this.width=t(e,"width","auto"),this.responsive=t(e,"responsive",!1),this.small=t(e,"small",!1),this.wait=t(e,"wait",!1),this.focus=t(e,"focus",!1),f.init.call(this),a.addClass(this,"view","custom")}catch(e){throw console.error("mod/tfw.view.button.js",e),Error('Instantiation error in XJS of "mod/tfw.view.button.js":\n'+e)}};return p.prototype.on=f.on,p.prototype.fire=f.fire,p}()}catch(e){throw Error('Definition error in XJS of "mod/tfw.view.button.js"\n'+e)}t.exports._=h});
//# sourceMappingURL=tfw.view.button.js.map
require("wdg.modal",function(t,e,n){function o(t){var e=this,n=s.div();n.addEventListener("scroll",i.bind(this,n));var o=function(){window.setTimeout(function(){i(n)})},r=s.tag("header","thm-fg","thm-ele8","thm-bgPD"),c=s.tag("footer"),d=s.div("cell","thm-ele24","thm-bg0",[r,n,c]);s.elem(this,"div","wdg-modal",[s.div([d])]);a.prop(this,"content")(function(t){s.clear(n),Array.isArray(t)?t.forEach(function(t){s.add(n,t)}):void 0!==t&&null!==t&&s.add(n,t),o()}),a.prop(this,"header")(function(t){if(!t||"string"==typeof t&&0===t.trim().length)return void s.addClass(r,"hide");s.removeClass(r,"hide"),s.clear(r),Array.isArray(t)?t.forEach(function(t){s.add(r,t)}):void 0!==t&&null!==t&&s.add(r,t),o()}),a.prop(this,"footer")(function(t){if(!t||"string"==typeof t&&0===t.trim().length)return void s.addClass(c,"hide");s.removeClass(c,"hide"),s.clear(c),Array.isArray(t)?t.forEach(function(t){s.add(c,t)}):s.add(c,t),o()}),a.propString(this,"width")(function(t){s.css(n,{"max-width":t}),o()}),a.propAddClass(this,"fullscreen"),a.propAddClass(this,"padding"),a.propAddClass(this,"scroll"),a.propAddClass(this,"wide"),a.propBoolean(this,"visible")(function(t){t?e.attach():e.detach()}),t=a.extend({visible:!1,header:null,content:[],footer:null,padding:!0,scroll:!0,wide:!1,fullscreen:!1,width:"auto"},t,this)}function i(t,e){t.scrollTop>0?s.addClass(t,"top"):s.removeClass(t,"top"),t.scrollHeight-t.scrollTop>t.clientHeight?s.addClass(t,"bottom"):s.removeClass(t,"bottom")}var r=function(){function e(){return o(n,arguments)}var n={en:{cancel:"Cancel",close:"Got it",confirm:"Confirm",ok:"Accept"},fr:{cancel:"Annuler",close:"J'ai compris",confirm:"Confirmation",ok:"Accepter"}},o=t("$").intl;return e.all=n,e}(),s=t("dom"),a=t("tfw.data-binding"),c=(t("wdg.flex"),t("wdg.button"));o.prototype.refresh=function(){return a.fire(this,"content"),this},o.prototype.attach=function(){var t=this;this._timeoutDetach&&(window.clearTimeout(this._timeoutDetach),delete this._timeoutDetach),document.body.appendChild(this.element),a.set(this,"visible",!0),s.addClass(this,"fadeout"),window.setTimeout(function(){s.removeClass(t,"fadeout")})},o.prototype.detach=function(){var t=this;window.setTimeout(function(){s.addClass(t,"fadeout")}),this._timeoutDetach=window.setTimeout(function(){delete this._timeoutDetach,a.set(t,"visible",!1),s.detach(t.element)},250)},o.confirm=function(t,e,n){"function"==typeof e&&(t={content:t,onYes:e,onNo:n}),void 0===t.title&&(t.title=r("confirm")),void 0===t.yes&&(t.yes=r("ok")),void 0===t.no&&(t.no=r("cancel")),void 0===t.onYes&&(t.onYes=function(){}),void 0===t.onNo&&(t.onNo=function(){}),e=t.onYes,n=t.onNo;var i=new c({text:t.yes,flat:!0}),a=new c({text:t.no,flat:!0});if(Array.isArray(t.content)&&(t.content=s.div(t.content)),"string"==typeof t.content&&"<html>"==t.content.substr(0,6)){var d=t.content.substr(6);t.content=s.div(),t.content.innerHTML=d}var l=new o({header:t.title,footer:[a,i],content:t.content});return l.attach(),a.on(function(){l.detach(),"function"==typeof n&&n()}),i.on(function(){if("function"==typeof e){var t=e();"string"!=typeof t?l.detach():(a.visible=!1,i.waitOn(t))}else l.detach()}),l},o.alert=function(t,e){var n=new c({text:r("close"),flat:!0});if("string"==typeof t&&"<html>"==t.substr(0,6)){var i=t.substr(6);t=s.div(),t.innerHTML=i}var a=new o({footer:n,content:t});return a.attach(),n.on(function(){a.detach(),"function"==typeof e&&e()}),a},e.exports=o,e.exports._=r});
//# sourceMappingURL=wdg.modal.js.map
require("wdg.deform-1",function(r,n,e){function t(r){var n=this.gl;u.css(n.canvas,{"background-image":"url(css/wdg.deform-1/forest.jpg)","background-size":"100% 100%"}),this.prg=new o(this.gl,{vert:l.vert,frag:l.frag});for(var e=[],t=0;t<g;t++)e.push(.75,0,t,.5,.5*Math.PI,t,.75,Math.PI,t);e=new Float32Array(e),this.prg.use();var a=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,a),n.bufferData(n.ARRAY_BUFFER,e,n.STATIC_DRAW);var i=e.BYTES_PER_ELEMENT,s=3*i,c=this.prg.attribs.attRadius.location;n.enableVertexAttribArray(c),n.vertexAttribPointer(c,1,n.FLOAT,!1,s,0*i);var f=this.prg.attribs.attAngle.location;n.enableVertexAttribArray(f),n.vertexAttribPointer(f,1,n.FLOAT,!1,s,1*i);var v=this.prg.attribs.attLevel.location;n.enableVertexAttribArray(v),n.vertexAttribPointer(v,1,n.FLOAT,!1,s,2*i),this.vertexCount=3*g,this.uniTime=n.getUniformLocation(this.prg.program,"uniTime"),this.uniDelay=n.getUniformLocation(this.prg.program,"uniDelay"),this.uniAngle=n.getUniformLocation(this.prg.program,"uniAngle"),r()}function a(r){var n=this.prg.program,e=this.gl;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(n),e.uniform1f(this.uniTime,r),e.uniform1f(this.uniDelay,this.delay),e.uniform1f(this.uniAngle,this.angle),e.drawArrays(e.TRIANGLES,0,this.vertexCount)}var i=function(){function n(){return t(e,arguments)}var e={en:{},fr:{}},t=r("$").intl;return n.all=e,n}(),l={vert:"uniform float uniTime;\r\nuniform float uniDelay;\r\nuniform float uniAngle;\r\n\r\nattribute float attRadius;\r\nattribute float attAngle;\r\nattribute float attLevel;\r\n\r\n// Pour faire un léger dégradé dans le fragment shader.\r\nvarying float varBrightness;\r\n\r\nvoid main() {\r\n  // Temps qui tient compte du décalage par level.\r\n  float t = uniTime - uniDelay * attLevel;\r\n  // Angle max d'inclinaison entre deux niveaux.\r\n  float a = radians( uniAngle ) * 0.1;\r\n  // Calculer en fonction du temps l'angle entre deux\r\n  // triangles consécutifs.\r\n  float tilt = a * cos(t * 0.001013) * sin(t * 0.001712);\r\n  // Plus le triangle à un level élevé, plus il est petit.\r\n  float scale = 1.0 / sqrt( 1.0 + attLevel );\r\n  // Coordonnées du centre du triangle de la base.\r\n  float xc = -0.5;\r\n  float yc = -0.7;\r\n  \r\n  int level = int( attLevel );\r\n  // A chaque niveau supplémentaire,\r\n  // l'angle s'incline un peu plus.\r\n  float angle = tilt - 0.05;\r\n  for( int i = 1 ; i < 10 ; i++ ) {\r\n    // Condition d'arrêt.\r\n    if ( i > level ) break;\r\n    // Calculer les coordonnées du centre du triangle.\r\n    yc += 0.4 * scale * cos( angle );\r\n    xc += 0.4 * scale * sin( angle );\r\n    // Incliner un peu plus pour le niveau suivant.\r\n    angle += tilt;\r\n  }\r\n  // Coordonnées du vertex dans l'espace de WebGL.\r\n  float x = scale * attRadius * cos( attAngle - angle );\r\n  float y = scale * attRadius * sin( attAngle - angle );\r\n  \r\n  gl_Position = vec4( \r\n    xc + x,\r\n    yc + y,\r\n    0, 1 \r\n  );\r\n  if (attLevel == 9.0) {\r\n    // Le dernier triangle est de couleur unie.\r\n    varBrightness = 0.0;\r\n  } else {\r\n    // Vaut 0 pour les vertex du bas du triangle\r\n    // et 1 pour le sommet.\r\n    // Cela donne l'effer d'une ombre.\r\n    varBrightness = sin( attAngle );\r\n  }\r\n}\r\n",frag:"precision mediump float;\r\n\r\nvarying float varBrightness;\r\n\r\nconst vec4 COLOR_TOP = vec4(98.0 / 255.0, 110.0 / 255.0, 48.0 / 255.0, 1);\r\nconst vec4 COLOR_BOTTOM = vec4(193.0 / 255.0, 190.0 / 255.0, 145.0 / 255.0, 1);\r\n\r\nvoid main() {\r\n  gl_FragColor = mix( COLOR_BOTTOM, COLOR_TOP, varBrightness );\r\n}\r\n"},o=r("webgl.program"),s=r("canvas"),u=r("dom");n.exports=s({init:t,draw:a,context:{alpha:!0},numbers:{delay:0,angle:30}});var g=10;n.exports._=i});
//# sourceMappingURL=wdg.deform-1.js.map
