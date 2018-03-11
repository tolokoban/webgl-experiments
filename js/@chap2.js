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
        W('wdg.article13', 'wdg.article', {
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
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["3 sommets"]}),
                    "\n        ",
                    W('wdg.gl214','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "3"},{"id":"wdg.gl214","name":"wdg.gl2"}),
                    "\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["5 sommets"]}),
                    "\n        ",
                    W('wdg.gl215','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "5"},{"id":"wdg.gl215","name":"wdg.gl2"}),
                    "\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["11 sommets"]}),
                    "\n        ",
                    W('wdg.gl216','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "11"},{"id":"wdg.gl216","name":"wdg.gl2"}),
                    "\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["100 sommets"]}),
                    "\n        ",
                    W('wdg.gl217','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "100"},{"id":"wdg.gl217","name":"wdg.gl2"}),
                    "\n    "]})]}),
          W({
              elem: "p",
              children: [
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["3 sommets"]}),
                    "\n        ",
                    W('wdg.gl218','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "3",
                      regular: "false"},{"id":"wdg.gl218","name":"wdg.gl2"}),
                    "\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["5 sommets"]}),
                    "\n        ",
                    W('wdg.gl219','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "5",
                      regular: "false"},{"id":"wdg.gl219","name":"wdg.gl2"}),
                    "\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["13 sommets"]}),
                    "\n        ",
                    W('wdg.gl220','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "13",
                      regular: "false"},{"id":"wdg.gl220","name":"wdg.gl2"}),
                    "\n    "]}),
                "\n",
                W({
                  elem: "center",
                  attr: {"style": "margin: 0; padding: 0; display: inline-block"},
                  children: [
                    "\n        ",
                    W({
                      elem: "p",
                      children: ["100 sommets"]}),
                    "\n        ",
                    W('wdg.gl221','wdg.gl2',{
                      width: "200",
                      height: "200",
                      size: "100",
                      regular: "false"},{"id":"wdg.gl221","name":"wdg.gl2"}),
                    "\n    "]})]}),
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
                    "\n    ",
                    W({
                      elem: "div",
                      children: [
                        "    \n        ",
                        W('wdg.chap2-triangles22','wdg.chap2-triangles',{
                          width: "160",
                          height: "160"},{"id":"wdg.chap2-triangles22"}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\n            ",
                            W({
                              elem: "div",
                              attr: {"class": "tbl grd"},
                              children: [
                                "\n                ",
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
                                "\n                ",
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
                                "\n                ",
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
                                "\n                ",
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
                                "\n            "]}),
                            "\n        "]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\n12 vertex sont nécessaires, mais certains représentent le même point et sont calculés à double (",
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
                            ").\n        "]}),
                        "\n    "]}),
                    "\n"]})]}),
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
                    "\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\n        ",
                        W({
                          elem: "div",
                          children: [W('wdg.chap2-trifan23','wdg.chap2-trifan',{
                              width: "160",
                              height: "160"},{"id":"wdg.chap2-trifan23"})]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "tbl grd"},
                              children: [
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["A"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["B"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["C"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["D"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["E"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["F"]})]}),
                                "\n        "]})]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: [
                            "\n6 vertex sont suffisants. C'est une structure en \"éventail\" (fan en anglais).\nLe premier point (",
                            W({
                              elem: "b",
                              children: ["A"]}),
                            ") est commun à tous les triangles.\nEnsuite, le dernier point d'un triangle est utilisé comme second point du suivant.\n        "]}),
                        "\n    "]}),
                    "\n"]})]}),
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
                    "\n    ",
                    W({
                      elem: "div",
                      children: [
                        "\n        ",
                        W({
                          elem: "div",
                          children: [W('wdg.chap2-tristrip24','wdg.chap2-tristrip',{
                              width: "160",
                              height: "160"},{"id":"wdg.chap2-tristrip24"})]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: [W({
                              elem: "div",
                              attr: {"class": "tbl grd"},
                              children: [
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["A"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["B"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["F"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["C"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["E"]})]}),
                                "\n            ",
                                W({
                                  elem: "div",
                                  children: [W({
                                      elem: "div",
                                      children: ["D"]})]}),
                                "\n        "]})]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["\n6 vertex sont suffisants. Deux triangles consécutifs ont un côté en commun.\nC'est-à-dire que les deux derniers points d'une triangle seront les deux premiers du suivant.\n        "]}),
                        "\n    "]}),
                    "\n"]})]})]},{"id":"wdg.article13"})

    }
);
