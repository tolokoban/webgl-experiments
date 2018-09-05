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
        W('wdg.article43', 'wdg.article', {
            title: "Du triangle au polygône",
            content: [
          W({
              elem: "p",
              children: [
                "Il est possible de créer des polygônes de n",
                "&#39;",
                "importe quelle forme.\nCes derniers seront toujours constitués de triangles dont les sommets seront pris dans un tableau.\nMais à partir de cet unique tableau, il existe plusieurs façons de dessiner nos triangles."]}),
          W({
              elem: "p",
              children: [
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["3 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl244','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "3"},{"id":"wdg.gl244","name":"wdg.gl2"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["5 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl245','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "5"},{"id":"wdg.gl245","name":"wdg.gl2"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["11 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl246','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "11"},{"id":"wdg.gl246","name":"wdg.gl2"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["100 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl247','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "100"},{"id":"wdg.gl247","name":"wdg.gl2"}),
                    "\r\n    "]})]}),
          W({
              elem: "p",
              children: [
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["3 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl248','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "3",
                      regular: "false"},{"id":"wdg.gl248","name":"wdg.gl2"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["5 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl249','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "5",
                      regular: "false"},{"id":"wdg.gl249","name":"wdg.gl2"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["13 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl250','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "13",
                      regular: "false"},{"id":"wdg.gl250","name":"wdg.gl2"}),
                    "\r\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\r\n        ",
                    W({
                      elem: "p",
                      children: ["100 sommets"]}),
                    "\r\n        ",
                    W('wdg.gl251','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "100",
                      regular: "false"},{"id":"wdg.gl251","name":"wdg.gl2"}),
                    "\r\n    "]})]}),
          W({
              elem: "p",
              children: [
                "Regardons de près les arguments de la fonction ",
                W({
                  elem: "code",
                  children: ["drawArrays( mode, first, count )"]}),
                "."]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["first"]}),
                    " : index du premier point. Dans un tableau, le premier point a l",
                    "&#39;",
                    "index 0."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["count"]}),
                    " : nombre de points à lire."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["mode"]}),
                    " : indique ce qu",
                    "&#39;",
                    "il faut faire avec ces points",
                    W({
                      elem: "ul",
                      children: [
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.POINTS"]}),
                            " : afficher seulement un pixel pour chaque point. (on verra plus tard comment définir la taille de ces ",
                            "&quot;",
                            "pixels",
                            "&quot;",
                            ")."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.LINE_STRIP"]}),
                            " : tracer une ligne qui passe par chaque point."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.LINE_LOOP"]}),
                            " : tracer une ligne qui passe par chaque point, mais ajoute un segment entre le dernier et le premier point, formant ainsi une boucle."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.LINES"]}),
                            " : Prend deux points et trace un segment. Puis on continue ainsi tant qu",
                            "&#39;",
                            "il reste au moins deux points. Cela permet de créer des lignes disjointes."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.TRIANGLES"]}),
                            " : dessine des triangles qui peuvent être disjoints. pour les points [A, B, C, D, E, F], on dessinera 2 triangles : ABC, DEF."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.TRIANGLE_FAN"]}),
                            " : pour les points [A, B, C, D, E], on dessinera 3 triangles : ABC, ACD, ADE. \nOn peut penser à un éventail."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["gl.TRIANGLE_STRIP"]}),
                            " : pour les points [A, B, C, D, E], on dessinera 3 triangles : ABC, BDC, CDE."]}),
                        "\n"]}),
                    "\n"]}),
                "\n"]}),
          W({
              elem: "h1",
              attr: {"id": "illustration-avec-un-hexag-ne"},
              children: ["Illustration avec un hexagône"]}),
          W({
              elem: "h2",
              attr: {"id": "triangles"},
              children: ["TRIANGLES"]}),
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
                        "    \r\n        ",
                        W('wdg.chap2-triangles52','wdg.chap2-triangles',{
                          width: "160",
                          height: "160"},{"id":"wdg.chap2-triangles52"}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\r\n            ",
                            W({
                              elem: "div",
                              attr: {"class": "tbl grd"},
                              children: [
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    W({
                                      elem: "div",
                                      children: ["A"]}),
                                    W({
                                      elem: "div",
                                      children: ["B"]}),
                                    W({
                                      elem: "div",
                                      children: ["C"]})]}),
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    W({
                                      elem: "div",
                                      children: ["A"]}),
                                    W({
                                      elem: "div",
                                      children: ["C"]}),
                                    W({
                                      elem: "div",
                                      children: ["E"]})]}),
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    W({
                                      elem: "div",
                                      children: ["A"]}),
                                    W({
                                      elem: "div",
                                      children: ["E"]}),
                                    W({
                                      elem: "div",
                                      children: ["F"]})]}),
                                "\r\n                ",
                                W({
                                  elem: "div",
                                  children: [
                                    W({
                                      elem: "div",
                                      children: ["C"]}),
                                    W({
                                      elem: "div",
                                      children: ["D"]}),
                                    W({
                                      elem: "div",
                                      children: ["E"]})]}),
                                "\r\n            "]}),
                            "\r\n        "]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\r\n12 vertex sont nécessaires, mais certains représentent le même point et sont calculés à double (",
                            W({
                              elem: "b",
                              children: ["A"]}),
                            ", ",
                            W({
                              elem: "b",
                              children: ["C"]}),
                            " et ",
                            W({
                              elem: "b",
                              children: ["E"]}),
                            ").\r\n        "]}),
                        "\r\n    "]}),
                    "\r\n"]})]}),
          W({
              elem: "h2",
              attr: {"id": "triangle_fan"},
              children: ["TRIANGLE_FAN"]}),
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
                          children: [W('wdg.chap2-trifan53','wdg.chap2-trifan',{
                              width: "160",
                              height: "160"},{"id":"wdg.chap2-trifan53"})]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "tbl grd"},
                              children: [
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["A"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["B"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["C"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["D"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["E"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["F"]})]}),
                                "\r\n        "]})]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\r\n6 vertex sont suffisants. C'est une structure en \"éventail\" (fan en anglais).\r\nLe premier point (",
                            W({
                              elem: "b",
                              children: ["A"]}),
                            ") est commun à tous les triangles.\r\nEnsuite, le dernier point d'un triangle est utilisé comme second point du suivant.\r\n        "]}),
                        "\r\n    "]}),
                    "\r\n"]})]}),
          W({
              elem: "h2",
              attr: {"id": "triangle_strip"},
              children: ["TRIANGLE_STRIP"]}),
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
                          children: [W('wdg.chap2-tristrip54','wdg.chap2-tristrip',{
                              width: "160",
                              height: "160"},{"id":"wdg.chap2-tristrip54"})]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "tbl grd"},
                              children: [
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["A"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["B"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["F"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["C"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["E"]})]}),
                                "\r\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["D"]})]}),
                                "\r\n        "]})]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["\r\n6 vertex sont suffisants. Deux triangles consécutifs ont un côté en commun.\r\nC'est-à-dire que les deux derniers points d'une triangle seront les deux premiers du suivant.\r\n        "]}),
                        "\r\n    "]}),
                    "\r\n"]})]})]},{"id":"wdg.article43"})

    }
);
