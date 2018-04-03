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
        W('wdg.article456', 'wdg.article', {
            title: "Boulder-Dash (version 2)",
            content: [
          W({
              elem: "p",
              children: [
                "Dans l",
                "&#39;",
                "article précédent, la technique utilisée de séparation claire de chaque type d",
                "&#39;",
                "objet avait un but pédagogique. Mais quand l",
                "&#39;",
                "application se complique, on se retrouve rapidement avec du code redondant. De plus, on a dû séparer les données du tableau (un niveau du jeu) de celles des vertex, ce qui nous empêche d",
                "&#39;",
                "optimiser nos accès à la mémoire."]}),
          W({
              elem: "p",
              children: [
                "Dans cette version 2, nous allons transformer un tableau en VertexArray et nous appliquerons la logique de chute des pierres directement sur le VertexArray. Le nombre de vertex ne variera donc jamais, mais pour cela, il faut qu",
                "&#39;",
                "un vertex puisse représenter les différents types de cellules : pierres, diamants, terre/feuille, héro, sortie, explosions, monstres, ..."]}),
          W({
              elem: "p",
              children: ["Ainsi, à chaque cellule du tableau correspondra un vertex avec les attributs suivants :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attType"]}),
                    " : Contenu de la cellule.",
                    W({
                      elem: "ul",
                      children: [
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["0"]}),
                            " : Vide."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["1"]}),
                            " : Mur."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["2"]}),
                            " : Héro."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["3"]}),
                            " : Terre/feuilles."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["4"]}),
                            " : Rocher."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["5"]}),
                            " : Diamant."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["6"]}),
                            " : Sortie."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["7"]}),
                            " : Explosion normale."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["8"]}),
                            " : Explosion qui donne des diamants."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            W({
                              elem: "strong",
                              children: ["9"]}),
                            " : Monstre."]}),
                        "\n"]}),
                    "\n"]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attX"]}),
                    " : Colonne dans le tableau."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attY"]}),
                    " : Ligne dans le tableau."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attVx"]}),
                    " : Déplacement horizontal. Peut-être -1, 0 ou +1."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attVy"]}),
                    " : Déplacement vertical. Peut-être -1, 0 ou +1."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "code",
                      children: ["attIndex"]}),
                    " : Index de l",
                    "&#39;",
                    "image à afficher."]}),
                "\n"]}),
          W({
              elem: "h1",
              attr: {"id": "les-tableaux"},
              children: ["Les tableaux"]}),
          W({
              elem: "p",
              children: [
                "On rajoute des informations au niveau de la définition des tableaux. Par exemple, le nombre de diamants à manger pour que la sortie s",
                "&#39;",
                "ouvre (",
                W({
                  elem: "code",
                  children: ["need"]}),
                "), ou les teintes de chaque élément (",
                W({
                  elem: "code",
                  children: ["tint"]}),
                ").\n",
                W('wdg.showhide457','wdg.showhide',{
                  value: "false",
                  label: "Module levels.js (Définition des tableaux)",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"use strict\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["L"]}),
                        "é",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gende"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["w"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Mur"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "   ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Vide"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  .",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Terre"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["r"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Pierre"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["d"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Diamant"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  @",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Monstre"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["E"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Entr"]}),
                        "é",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["e"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["X"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Sortie"]}),
                        "\n ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["window"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Levels"]}),
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
                          children: ["()"]}),
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
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Nombre de diamants nécessaire pour ouvrir la sortie."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Variation de la teinte pour chaque élément."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["120"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["80"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["180"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["330"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["210"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r..r.d...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdr....E........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r..........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwww wwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...... ........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...... r....X..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....d. ......rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......@......rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Nombre de diamants nécessaire pour ouvrir la sortie."]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["12"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...... ..d.r .....r.r....... ....r....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rEr...... .........rd..r.... ..... ..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......... ..r.....r.r..r........r....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.rr.........r......r..r....r...r.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr. r......... r..r........r......r.rr.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... ..r........r.....r. r........r.rr.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww...r..r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. ...r..d. ..r.r..........d.rd...... .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..d.....r..... ........rr r..r....r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...r..r.r..............r .r..r........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.....r........rrr.......r.. .d....r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.d.. ..r.  .....r.rd..d....r...r..d. .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. r..............r r..r........d.....rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w r.........r...d....r.....r...r.......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w r......... r..r........r......r.rr..Xw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. ..r........r.....r.  ....d...r.rr...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....rd..r........r......r.rd......r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... ..r. ..r.rr.........r.rd...... ..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.d.... ..... ......... .r..r....r...r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["11"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["280"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["280"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["45"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["280"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["285"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r..r..w.r...d.w... .r.wr......w..rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......w......rwrr. ...w ..d...w....r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                                      w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wd......w.r....rw.r. .. w..r..d.w..r.r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......w.r....rw.r. r..w.....r.w... ..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....rr.w..r....w... ..rw....r..w.....rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......w.. ....w... ...w....r. w.....rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                                      w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr..r...w....r..w..r ...w......dwr.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr....r.w..r..r.w... . rw.......wr...r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.....w...r...w... . rw.......w r..r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.  @..w....r.rw... ...w.rd..r.w......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....r.wr......w..d ...w ..r...w.r.rr.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                                      w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wd.. .r.wr....r.w.r. ..rw.r.r...w......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....r.wr..d...w... r..w..r....w...rr w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.d... rw..r....w.Ed r..w. .....w...rr w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.... w.. ..r.w.X.r...w....r.rw.... .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["23"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["120"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["80"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["180"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["330"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["210"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.ww.wrr.w...rwr..r....w...r.....rw.d.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..Ew.d.r.w...www..w.r....r..r.r...w.wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....w..rd..r....w.....r.wwr.......w.www\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wd.w..wrwr..r....w...r......r.rr......ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.w...w..r.ww..r.wwd.......r.rr......ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr..r....w...r......r.rr......r..dww..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.ww..r.rr...w....r.rr......w..r.w.rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..w...d......d.r..wwr..r.w.wr..wr..d.rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r....w.ww..d.r..wwr..r..d.w...w..r.ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.ww.....rrwr..d.w.wr..wr...wr..d.r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.ww......rrwr..r.w.ww...w..r.ww..r.www\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.w.r.r.w...wwr..r....w...r.....ww.r.www\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.w.r.r.w.d.w.wr..wr....r..r.rr....w...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww..wrwr..r....w...d...w.rw......w.ww.dw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww...wwr..w.d...wr..r.r...r.wr......w..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.d....r.ww..r.wwr.......r.wr......w..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r....w...r......r.rr......w..r.w...ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.ww..r.ww...w....r.rr......w..rd..r..X\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww...r......r.rd......r...ww..wr..d.w..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr...w.....r.rd......w..r.wd.d.rw.r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["20"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["200"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["280"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["200"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["240"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["60"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["200"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wE.....r....................r........r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....r..............r.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........r..r..........................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.....................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...................r..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.....................r.........r....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.....r...........r..r.............rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r......r.....................r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........ @...r.. @...... @...... @....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........  ...r..  ......  ......  .r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...r..............................r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...r.....r............................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r...........r..................rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...........r.......r..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r..............r....................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....................r.........r......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w................................r..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r......r.rr..................r....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...........r.rr.........r..r.r.......Xw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["240"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w         r        w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w E       .        w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                 @w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                 Xw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["70"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["30"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["90"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["120"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["140"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wE.....................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......  @.....  @.....  @.....  @....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......   .....   .....   .....   ....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....... d ..... d ..... d ..... d ....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......  @.....  @.....  @.....  @....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......   .....   .....   .....   ....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....... d ..... d ..... d ..... d ....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................X\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["40"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["210"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["200"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["140"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwww....r.r..r........r.wwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww        ...........r....r...        ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww@d      ..r..........r...r..      d@ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwww..r........r......r.wwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww        ......r...r.......r.        ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww@d      ....r......r.rr.....      d@ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwww.rr........r.rr.....wwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww        ....r.r....r..r.....        ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww@d      ....r.r....r..r..r..      d@ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwww.rr.r..r....r...r...wwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww        .rr.r..r............        ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww@d      ....r..r........r...      d@ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwww.....r...r....r..r..wwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r.r..r........r.....r............rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r....r....r..r.r...r..r.........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r....r.....r...r.......r..r.........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r........r......r.rr.........r......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.E...r...........r.rr.........rr..r.Xw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r......r.rr......r........r..r....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr.........r.rr.........r..r.r.r..r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["13"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["30"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["80"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["300"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["100"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. .. .rr..... ..r. E.... rr r..r. .  .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w ..r. .. .  .... .r.r. ...  r..r.d.. .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.....  .@.  ... .r.r. ... wwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.d... .  ...... ..rr..r.... . ... . w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwww.r. ..   r.. .... ...r....X\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr. r...... ..r. ... ..r.  ..r.  @.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr. r...... .. r..r.... ...r......r.rr.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... ..r  ... ..r.  ..r.  ... ....r.rr.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... ..r. .r.... ...@......r.r..  r..r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w  .. r.... ..r.r.... .  .......  d.. .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. ... .. .  .. .  .....rr r..r. . r.. w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.. d..r.r.... .  ......r  r..r. .  ...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.  ..r.  ... .r.r. ...  r.. .... ...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....  .r.  ... .r.r. .r. . r.. r.... .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.  .... ....  .. r r..r.... ...r... .rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..... .  .rr. ...  r.. .r... r..r.r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w r...... ..r. .r.... .  ..r.  r.......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w r...... .. r..r.... ...r......r.rr...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. ..r. ... ..r.  .aa.  ... ....r.rr...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. .dr@..r.... ...r......r.r@.....dr...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["42"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["30"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["130"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["130"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["160"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w . r.. . .. ..r. ..E ..r.  ..r. r... .w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.rr...... ..r...r.... ...r.....dr.r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"X r..r...  ...r..r. ..r.r...wwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...d ..r. @.....r..... ........rr r..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwww..r.r.... .  ......r  r..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.  ... ..r.  ..r.  .... rrr.....  r.. w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... r... @.. ..r.  .....r.rr..r. . r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r. ..r. r.... ..... ...r r..r.... ..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....r ...... .  @rr. ...  r.. .r....rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r... . r...... ..r...r....r....dr.  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r. r......... r..r...wwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rr...... ..r. ...d..r.  ..r.  ... r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwr........ ...r......r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r...  ...d..r. ..r.rr.........r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.. ..r. .r...@@@@@@@@.........  r..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.. r....r..r r...d .. .......  r..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w ... ..r. ...r.  .....rrrr..r. . r.. rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. r..@.r.... .  ......rr r..r...  ...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.  ..r.  .....r.r. ...  r..r.... ...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...  .r.r .....r.r.....   .. .r....r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["16"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["180"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["239"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["45"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["245"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["357"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["133"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr@...............rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wEr@.............rXw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wd.r@...........r.dw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrd.r@.........r.drw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rd.r@.......r.dr.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..rd.r@.....r.dr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...rd.r@...r.dr...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....rd.r@.r.dr....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....rd.rr.dr.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......rd..dr......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["50"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["26"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["71"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["264"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["247"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["56"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["275"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["120"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdddrrddrddr.rrrrdrdd.ddrddrddddrrdrdrrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrrdddrdddrdddrrrrrdrrd.drdrrrrdrddrrdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wddrrrrrdddrddrd.rrrdrrdddrdr.rrdrrrddrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrdrddrrdrrrddrddd..ddrrdrddrrdrdd.rrdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrdrddrrrrrrddrd.drdrrrrdrdrdrrddrrdrdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdddrrdrd.ddrrddrrdddrrdrdrrr.drddrrdrdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrrrrdrrdddd..rrrdrdd.rdrddr.rrddddddrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrddwwwwwww.wwwwwdrrrrdrwwwwww.wwwwwwrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wd.ddw           wrddrrrdw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrdrw EX        wrddrrrdw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrrdw           wr.rrddrw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrrdw           wddddrdrw           wdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrdddw           wdrrd.drw           wdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrrrw           wdrrddrrw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrddw           w.rdrrdrw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdrddw           wwwwwwwww           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrrdw                               wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrrdw           wdd.rdrdw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wddrrw           wrrrdrddw           wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdd..wwwwwwwwwwwwwdrrrdddwwwwwwwwwwwwwdw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["16"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["33"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["216"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["73"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["82"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["92"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["189"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["276"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w............E.........................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwww wwwwwwww.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww....d.............dw.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w w.wwwwww wwwwww.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w.wd.........dw.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w.w.wwww wwww.w.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w.w.wd.....dw.w.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w.w.w.ww ww.w.w.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w w w w   w w w w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w@w@w@w@@@w@w@w@w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w w w w   w w w w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w.w.w.wwwww.w.w.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.w@w.w.wd.....dw.w.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.wdw.w.wwwwwwwww.w.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.wdw.wd.........dw.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.wdw.wwwwwwwwwwwww.w.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"ww.wdwd.............dw.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwww.................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wX.....................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["6"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["161"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["339"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["235"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["70"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["140"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["135"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["303"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.rd.rrr.w...drr..rw...d...r.w...dr.r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... .r.r.w...r r..rwr....r..rwr...r.rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.... ..rrw.r....r..w..r. rr..w....r.rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r.. rrrw.r.... ..wr......r.wr......rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr. ...r..w.  ..r.rrw.......r.wr...... w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr..r....w...r.....wr.rr.....wr..r r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.rr..rwrr...r...wr.rr.....wr..r. .ww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r...r..w...r.r..rwr..r. .rrw. r..@wrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r.wwwwwwwww@wwwwwwwwwrwwwwwwwww..w. w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.  .....rrrr..r.r.rr..rr... r..rwr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.rr......rrrr..r. . r...r..r.rr.wr.rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. .r.r. w..rrr..r.... ...r.....rw.r.rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. .r.r. wr.wwwwwwwwwwwwwwwwwrr.w..r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.. rrr.wr....r...r... .rr....w.r.rr.rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr...rrr.wr.r... r..r.r...r.rrw.....r.Xw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w .r....rw  ..r.rrr.......r.rw...... ..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.... w..r......r.rr.....wr..r.r...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.rr..r.wr...r....rErr......r..r@..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr...r...w..r.r@......r... r.. r..rdr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr.d. ..w..r.rr......r..r. r.@.rr.r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["22"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["99"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["91"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["112"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["72"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["71"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["192"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["220"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr. ...rr.....r.r..r........r.....r..d.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....d.r....... ....r....r..r..... ..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......rdw.r.w.. w...wr...r... @.. .. w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdwwwwwwwwwww.w...w..rw.....r..  ......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr........w...w.r.w d.w.....r..........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr..r....w...w...w..rwrr......r..d....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.....rwrr.w...w..rwrr.........r...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.wwwwwwwwwww.w.r.w .rw.r....r. @...d.rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r......w...w.r.w..rw.r..d...  ...r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.......wrr w..dw.. w...r.......d.r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w ........wrr w..rw...w... ..r.....r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.wwwwwwwwwwwwwwwrw...w...r........r.  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...r.r...w...wr..wr..w.r..r.r. @......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r r..w...w...wd..w..r ....  .....dw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.... .r..w.d.w..rw.r.w...r. r.........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.wwwwwwwwwww.w...w...w...r. r.........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r......w.r.w...wr.rw...... ..r......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.E...r. w...w...wr.rw.........rd..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r....w.r.wd..w...w.... ...r..d. ..X\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrr.......w.r.wd..w...w..r..d.d.r..r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["14"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["166"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["95"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["98"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["46"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["293"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["329"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["21"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w       E          w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                 Xw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w                  w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w              @@@@w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w              @@@@w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w              @@@@w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wdddddddddddddd@@@@w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["wall"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["105"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["55"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["192"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["dust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["74"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["expl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["53"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["mons"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["142"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["169"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.....rr.X.....r.Era.......r........r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....r.r............r....r..r.r.......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........r..r..............r...........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.......r...........r......r..r.......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr........r.....r...r.......r..r.......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r..r........r......r.rr.........r....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.....r...........r.rr.........r...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r......r.r....r..r........r..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r..........r.r..........r...........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..........rr.r..r....r...r....r..r.r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..........r..r..r...........r.....r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...r.r.......r...........r........r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...r.r...r....r...r.......r...........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r.r..r........r.....r............rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r....r....r..r.r......r.........w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.wwwwwwwwwwwwwwwwwwwwwwwwwwwwww....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr...rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r................................r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..E...................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....................@.@.@.@.@.@......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....................r.r.r.r.r.r......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.........@. . . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... .@. . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . .@. . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . .@. . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . .@. ..................X\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . . . ..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......... . . . . .@..................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......................................w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.rr..  r..r..r.r..Er..r.rr..r.rr...r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.w.rr......r..r...r....w...r......r.r.w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wrrw.r... r.. r..r.r..rwr.... .. ..r.r@w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...wr..r. @.....r. ..wr.  .....rrrr..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rr.wrr... r..r.r...wr. r......rrrr..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. r..wr..r.r ..r.rrw... rrr. ...rrr..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...rr.w.@ ..r..r.rw.....r.rr..r.r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r.r..w.rr.... .w...r.. rrr..r....r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w... .rr.w....r. w@rr. ...rrr..r.r... rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r...r.rw.....wr..r. .r....r.  ..r.rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r.rrw...w. ..rr..r.... ...r.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rr......r....r...r..r.r ..r.rr... r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rr......r.@@@..r....r...r......r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r... r...r..r.r..r.rr... .....r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r..r. .r....r.....r.  ......rrr..r. w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.. r....r..r.r....r.  .......rrr..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr...r..r.  ..r.  .... rrrr..r.r.rr..rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w. r..@ r....r.rr......rrrr..r. .rr.. rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.rr..r.rr... .r.r. ...rrr..r.... ...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...rr.r.rr... .r.r.X...r r..r.r....r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wE..r..........r........r.....r..r.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r.rr.........r...r........r......r.r.X\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.r..r........r..r....r.r..........r.rrw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......r..r.....r..............rr.r..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r...r....r..r.r..............r..r..rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.........r.....r........rrr.......r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w....r....r.....r........r.rr..r....r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r...@@@@@@..@@@@@@.....r.r..r.......w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....rw....w..w..rrw.......r....r....rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.r...w..r.w..w....w...r....r.....r...w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......w..r.w..w....wr..r........r.....w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rr...w....wr.w....w.r.....r.......r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.rr...w....wrrw.r..w.....r......r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r...w....w..w....w.rr.........r.rr..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.....rwwwwww..wwwwww............r..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr...r....r..r.r.................r..r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.............r........r.....r........rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..r..r. @...... @.....r. @..r... @...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wr.....r  ......  .......  ..r...  ...rw\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w......r.......................r....r..w\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["need"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["10"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["rows"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["["]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..E.......rrr......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..........rrr......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w...................wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..........@@@......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.......r..   ......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........r.   ......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w.........r   ......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w........X.@@@......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..........   ......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"w..........   ......wwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\""]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["]}"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["];"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}();"]}),
                        " "]})]},{"id":"wdg.showhide457"})]}),
          W({
              elem: "p",
              children: [
                "La classe qui représente une tableau est responsable de la création du VertexArray qu",
                "&#39;",
                "il fournit au travers de son attribut ",
                W({
                  elem: "code",
                  children: ["data"]}),
                " (voir ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/boulder-dash2/level.js"},
                  children: [W({
                      elem: "code",
                      children: ["level.js"]})]}),
                ")."]}),
          W({
              elem: "h1",
              attr: {"id": "la-texture-agr-g-e"},
              children: ["La texture agrégée"]}),
          W({
              elem: "p",
              children: [
                "Puisqu",
                "&#39;",
                "on va utiliser un seul programme WebGL, il faut lui passer une seule texture (il est possible de passer plusieurs textures à un fragment shader, mais ce serait moins efficace puisqu",
                "&#39;",
                "il faudrait exécuter du code pour choisir la bonne texture)."]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "idée la plus simple est de créer une image qui contienne tout ce dont on a besoin, mais ce n",
                "&#39;",
                "est pas ce que nous allons faire, et pour deux raisons :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: ["on veut apprendre à créer des images dynamiquement"]}),
                "\n",
                W({
                  elem: "li",
                  children: ["et on veut pouvoir changer les teintes des différents éléments de façon indépendante."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [W({
                  elem: "img",
                  attr: {
                    class: "right",
                    src: "css/assets/boulder-dash2/img/ground.png"}})]}),
          W({
              elem: "p",
              children: ["Nous allons donc charger les images suivantes et les agréger dans un canvas."]}),
          W({
              elem: "p",
              children: [
                "La marche du héro (512x64) : ",
                W({
                  elem: "img",
                  attr: {
                    src: "css/assets/boulder-dash2/img/row-walk.png",
                    width: "512"}})]}),
          W({
              elem: "p",
              children: [
                "Les pierres (1024x64) : ",
                W({
                  elem: "img",
                  attr: {
                    src: "css/assets/boulder-dash2/img/row-boulder.png",
                    width: "512"}})]}),
          W({
              elem: "p",
              children: [
                "Les diamants (1024x64) : ",
                W({
                  elem: "img",
                  attr: {
                    src: "css/assets/boulder-dash2/img/row-diam.png",
                    width: "512"}})]}),
          W({
              elem: "p",
              children: [
                "Les monstres (1024x64) : ",
                W({
                  elem: "img",
                  attr: {
                    src: "css/assets/boulder-dash2/img/row-monster.png",
                    width: "512"}})]}),
          W({
              elem: "p",
              children: ["La feuille a une taille de 80x80, nous la placerons dans une espace de 128x128, ce qui fait que notre canvas devra avoir une taille finale de 1024x384. La marche du héro ne fait que 512 pixels de large, mais elle ne propose que le déplacement vers la droite. Nous allons donc retourner cette partie et la coller à la suite."]}),
          W({
              elem: "p",
              children: [W('wdg.showhide458','wdg.showhide',{
                  value: "false",
                  label: "Module texture-aggregator.js (Instance d'un tableau)",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"use strict\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["window"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["TextureAggregator"]}),
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
                          children: ["()"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["Tinter"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["img"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
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
                          children: ["// Pour le moment, on ne touche pas à la teinte."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["img"]}),
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
                          attr: {"class": "keyword"},
                          children: ["return"]}),
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
                          children: ["assets"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
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
                          children: ["if"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["typeof"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["==="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["'undefined'"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["tint"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{};"]}),
                        "\n\n    ",
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
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"canvas\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
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
                          children: ["1024"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
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
                          children: ["384"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"2d\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroTexture"]}),
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
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["boulderTexture"]}),
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
                          children: ["64"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["diamTexture"]}),
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
                          children: ["128"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["groundTexture"]}),
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
                          children: ["192"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["exitTexture"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["80"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["192"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["exploTexture"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["512"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["192"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["monsterTexture"]}),
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
                          children: ["320"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Retourner le héro image par image."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["scale"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
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
                          children: ["for"]}),
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
                          children: ["k"]}),
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
                          children: ["k"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["8"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["k"]}),
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
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroTexture"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["64"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["k"]}),
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
                          children: ["64"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["64"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-576"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["64"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["k"]}),
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
                          children: ["64"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["64"]}),
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
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}();"]}),
                        " "]})]},{"id":"wdg.showhide458"})]}),
          W({
              elem: "p",
              children: [
                "Et voilà ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/boulder-dash2/a/index.html"},
                  children: ["le résultat"]}),
                "."]}),
          W({
              elem: "h1",
              attr: {"id": "le-level-painter"},
              children: ["Le level-painter"]}),
          W({
              elem: "p",
              children: [
                "Nous règlons les animations (rotation des diamants, mouvements du héro, ...) à 20 images par secondes.\nOn pourrait monter jusqu",
                "&#39;",
                "à 60, mais ce serait trop rapide, ou alors il nous faudrait trois fois plus d",
                "&#39;",
                "images."]}),
          W({
              elem: "p",
              children: [
                "Tout est géré dans le vertex shader :\n",
                W('wdg.showhide459','wdg.showhide',{
                  value: "false",
                  label: "level.vert",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight glsl"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["//#include \"const\""]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim64x64"]}),
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
                          children: ["64.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "regexp"},
                          children: ["/ 1024.0, 64.0 /"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320.0"]}),
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
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim80x80"]}),
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
                          children: ["80.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "regexp"},
                          children: ["/ 1024.0, 80.0 /"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320.0"]}),
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
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstHeroUV"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["const"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstRockUV"]}),
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
                          children: ["64.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320.0"]}),
                        " ",
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
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDiamUV"]}),
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
                          children: ["128.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320.0"]}),
                        " ",
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
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDustUV"]}),
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
                          children: ["192.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320.0"]}),
                        " ",
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
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstExitUV"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["80.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "regexp"},
                          children: ["/ 1024.0, 192.0 /"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["320.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n",
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
                          children: ["attType"]}),
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
                          children: ["attX"]}),
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
                          children: ["attY"]}),
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
                          children: ["attVX"]}),
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
                          children: ["attVY"]}),
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
                        "\n\n",
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
                          children: ["uniX"]}),
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
                          children: ["uniY"]}),
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
                          children: ["uniZ"]}),
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
                          children: ["uniW"]}),
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
                          children: ["uniCellTime"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
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
                          children: ["varDimension"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawRock"]}),
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
                          attr: {"class": "keyword2"},
                          children: ["gl_Position"]}),
                        ".",
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
                          attr: {"class": "number"},
                          children: ["0.5"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["64.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniW"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varDimension"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim64x64"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["floor"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
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
                          children: ["16.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
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
                          children: ["16.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstRockUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["vec2"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawHero"]}),
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
                          attr: {"class": "keyword2"},
                          children: ["gl_Position"]}),
                        ".",
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
                          attr: {"class": "number"},
                          children: ["0.7"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["64.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniW"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varDimension"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim64x64"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["index"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["floor"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          children: ["0.02"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["8.0"]}),
                        " ",
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
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.5"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attIndex"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["index"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["16.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstHeroUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          children: ["shift"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawDiam"]}),
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
                          attr: {"class": "keyword2"},
                          children: ["gl_Position"]}),
                        ".",
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
                          attr: {"class": "number"},
                          children: ["0.6"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["64.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniW"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varDimension"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim64x64"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["index"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["floor"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
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
                          children: ["*"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0.02"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["16.0"]}),
                        " ",
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
                          children: ["float"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["16.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDiamUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
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
                          children: ["shift"]}),
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
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawDust"]}),
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
                          attr: {"class": "keyword2"},
                          children: ["gl_Position"]}),
                        ".",
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
                          attr: {"class": "number"},
                          children: ["0.8"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["80.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniW"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varDimension"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim80x80"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDustUV"]}),
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
                          attr: {"class": "keyword"},
                          children: ["void"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawExit"]}),
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
                          attr: {"class": "keyword2"},
                          children: ["gl_Position"]}),
                        ".",
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
                          attr: {"class": "number"},
                          children: ["0.9"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["80.0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniW"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varDimension"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstDim80x80"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["varUV"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cstExitUV"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n\n\n",
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
                          children: ["attType"]}),
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
                          children: ["// Cellules à ne pas afficher : vides et murs."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
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
                          children: ["0.0"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
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
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Déterminer les coordonnées."]}),
                        "\n  ",
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
                          attr: {"class": "keyword2"},
                          children: ["mod"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
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
                          children: ["uniCellTime"]}),
                        " ",
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
                          attr: {"class": "identifier"},
                          children: ["uniCellTime"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attX"]}),
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
                          children: ["attVX"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniX"]}),
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
                          children: ["128.0"]}),
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
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
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
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["attY"]}),
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
                          children: ["attVY"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["-"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniY"]}),
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
                          children: ["128.0"]}),
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
                          children: [";"]}),
                        "  \n  ",
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
                          children: ["xx"]}),
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
                          children: ["yy"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniZ"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["uniW"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Affichage en fonction du type de cellule."]}),
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
                          children: ["attType"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["2.1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawHero"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
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
                          children: ["attType"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["3.1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawDust"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
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
                          children: ["attType"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["4.1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawRock"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
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
                          children: ["attType"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["5.1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawDiam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
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
                          children: ["attType"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["&lt;"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["6.1"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawExit"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        " "]})]},{"id":"wdg.showhide459"})]}),
          W({
              elem: "p",
              children: [
                "Le ",
                W({
                  elem: "strong",
                  children: ["level painter"]}),
                " est relativement simple :\n",
                W('wdg.showhide460','wdg.showhide',{
                  value: "false",
                  label: "level-painter.js",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["window"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["LevelPainter"]}),
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
                          children: ["()"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cave"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WP"]}),
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
                          children: ["env"]}),
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
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_env"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_count"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["data"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["length"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["6"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_buffVert"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WebGL"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["fillArrayBuffer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
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
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["data"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_prg"]}),
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
                          attr: {"class": "identifier"},
                          children: ["WebGL"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["Program"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
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
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["levelVert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["frag"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["levelFrag"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["});"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_texture"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
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
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
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
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["levelTexture"]}),
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
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["//#(draw)"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["assets"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cave"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["time"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        " @",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["param"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        "\n   ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["*"]}),
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["/"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WP"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prototype"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["draw"]}),
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
                          children: ["env"]}),
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
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
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
                          children: ["_prg"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["use"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Dimensions de l'écran physique."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["time"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniWidth"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniHeight"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniX"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["x"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniY"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["y"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniZ"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["z"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniW"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["w"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniCellTime"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cellTime"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Assignation de la texture."]}),
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
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_texture"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$texture"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Attributs."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["bindAttribs"]}),
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
                          children: ["_buffVert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attType\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attX\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attY\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attVX\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attVY\""]}),
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
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Dessin."]}),
                        "\n    ",
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
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_count"]}),
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
                          attr: {"class": "comment"},
                          children: ["//#(draw)"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["//#(createTexture)"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["function"]}),
                        " ",
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
                          children: ["img"]}),
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
                        "\n    ",
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
                        "\n    ",
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
                        "\n    ",
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
                        "\n    ",
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
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// On charge l'image dans la texture de la carte graphique."]}),
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
                          children: ["img"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["texture"]}),
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
                          children: ["//#(createTexture)"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WP"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}();"]}),
                        " "]})]},{"id":"wdg.showhide460"})]}),
          W({
              elem: "p",
              children: [
                "Et voilà ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/boulder-dash2/b/index.html"},
                  children: ["le résultat"]}),
                "."]}),
          W({
              elem: "h1",
              attr: {"id": "d-placer-le-h-ro-manger-les-feuilles-et-les-diamants"},
              children: ["Déplacer le héro, manger les feuilles et les diamants"]}),
          W({
              elem: "p",
              children: [
                "Il nous faut, tout d",
                "&#39;",
                "abord ajouter des éléments dans la variable ",
                W({
                  elem: "code",
                  children: ["env"]}),
                " afin de compter les diamants que le héro mange :\n",
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
                      children: ["env"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
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
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["z"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["w"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cellTime"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["200"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Temps en ms pour traverser une cellule."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["nextSynchro"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatenDiams"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On compte les diamants mangés."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatenDiams"]}),
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
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Ensuite, on fait appel aux fonctions du nouveau module ",
                W({
                  elem: "code",
                  children: ["hero-logic.js"]}),
                " :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// A la synchro, on fait les calculs de mouvements."]}),
                    "\n",
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
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["nextSynchro"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["nextSynchro"]}),
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
                      children: ["ceil"]}),
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
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cellTime"]}),
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
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cellTime"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n",
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
                      children: ["time"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["nextSynchro"]}),
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
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["nextSynchro"]}),
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
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cellTime"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Appliquer les déplacements du héro."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["HeroLogic"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["apply"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Prévoir le prochain déplacement du héro."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["HeroLogic"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["process"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Pousser le VertexArray du tableau dans la carte graphique."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["levelPainter"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["update"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Voici le code de ce module :\n",
                W('wdg.showhide461','wdg.showhide',{
                  value: "false",
                  label: "hero-logic.js",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"use strict\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n",
                        W({
                          elem: "span",
                          attr: {"class": "keyword2"},
                          children: ["window"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["HeroLogic"]}),
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
                          children: ["()"]}),
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
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["process"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["env"]}),
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
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
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
                          children: ["move"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["true"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
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
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
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
                        "\n\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["switch"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["GameInputs"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["action"]}),
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
                          children: ["case"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["GameInputs"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["UP"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["case"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["GameInputs"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["RIGHT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroIndex"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["case"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["GameInputs"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["DOWN"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["case"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["GameInputs"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["LEFT"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["-1"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroIndex"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["default"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["move"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["false"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["break"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n\n      ",
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
                          children: ["move"]}),
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
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["nextX"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroX"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["nextY"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroY"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cell"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["getType"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["nextY"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["nextX"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n        ",
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
                          children: ["cell"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["==="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WALL"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["||"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["cell"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["==="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ROCK"]}),
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
                        "\n          ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Les murs et les pierres arrêtent le déplacement."]}),
                        "\n          ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
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
                        "\n          ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
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
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["else"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n          ",
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
                          children: ["cell"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["==="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["DIAM"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["eatDiam"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
                        "\n          ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["setType"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["nextY"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["nextX"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["VOID"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["},"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["apply"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
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
                          children: ["env"]}),
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
                          children: ["level"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["env"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
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
                          children: ["vx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVX"]}),
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
                          children: ["vy"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroVY"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
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
                          children: ["vx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["!="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["||"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vy"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["!="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "number"},
                          children: ["0"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["){"]}),
                        "\n        ",
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
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroX"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
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
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroY"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["move"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
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
                          attr: {"class": "operator"},
                          children: ["+"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vy"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
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
                          children: ["vx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroX"]}),
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
                          children: ["vx"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n        ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["level"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["heroY"]}),
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
                          children: ["vy"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n      ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["}();"]}),
                        " "]})]},{"id":"wdg.showhide461"})]}),
          W({
              elem: "p",
              children: [
                "Il faut noter l",
                "&#39;",
                "existence des attributs ",
                W({
                  elem: "code",
                  children: ["level.heroVX"]}),
                ", ",
                W({
                  elem: "code",
                  children: ["level.heroVY"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["level.index"]}),
                " qui sont définis dans le module ",
                W({
                  elem: "code",
                  children: ["level.js"]}),
                ". Quand on écrit une valeur dans ces attributs, une fonction s",
                "&#39;",
                "exécute et met la valeur au bon endroit dans le VertexArray en fonction de la position actuelle du héro."]}),
          W({
              elem: "p",
              children: [
                "C",
                "&#39;",
                "est ce bout de code qui est responsable de créer ces attributs :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Object"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["defineProperty"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"heroVX\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["data"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["heroX"]}),
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
                      children: ["heroY"]}),
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
                      children: ["3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["set"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["v"]}),
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
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["data"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["heroX"]}),
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
                      children: ["heroY"]}),
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
                      children: ["3"]}),
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
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["});"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Object"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["defineProperty"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"heroVY\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["data"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["heroX"]}),
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
                      children: ["heroY"]}),
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
                      children: ["4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["set"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["v"]}),
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
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["data"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["heroX"]}),
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
                      children: ["heroY"]}),
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
                      children: ["4"]}),
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
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["});"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Object"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["defineProperty"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"heroIndex\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["data"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["heroX"]}),
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
                      children: ["heroY"]}),
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
                      children: ["5"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["set"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["v"]}),
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
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["data"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["heroX"]}),
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
                      children: ["heroY"]}),
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
                      children: ["5"]}),
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
                      children: ["v"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["});"]}),
                    " "]})]}),
          W({
              elem: "h1",
              attr: {"id": "ajouter-du-son"},
              children: ["Ajouter du son"]}),
          W({
              elem: "p",
              children: [
                "Dans la section précédente, nous avons créé une fonction ",
                W({
                  elem: "code",
                  children: ["eatDiam"]}),
                " dans la variable ",
                W({
                  elem: "code",
                  children: ["env"]}),
                ".\nElle est appelée pour signifier qu",
                "&#39;",
                "un diamant a été mangé.\nC",
                "&#39;",
                "est donc dans cette function que nous allons ajouter le code pour jouer un petit son :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
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
                      children: ["// Les assets finissant par 'ogg', 'mp3' ou 'wav'"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// sont transpformés en tag AUDIO."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["diamSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["pause"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Il n'existe pas de méthode `stop()`."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On doit donc faire une pause, puis"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// remettre le curseur au début de la piste."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["diamSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["currentTime"]}),
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["diamSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["play"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatenDiams"]}),
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
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]}),
          W({
              elem: "h1",
              attr: {"id": "que-tombent-les-pierres-et-les-diamants-que-s-ouvrent-les-sorties-"},
              children: [
                "Que tombent les pierres et les diamants, que s",
                "&#39;",
                "ouvrent les sorties, ... !"]}),
          W({
              elem: "p",
              children: [
                "Nous avons maintenant besoin d",
                "&#39;",
                "un module pour gérer la logique des éléments mobiles du tableau (pierres, diamants, monstres, ...). On va l",
                "&#39;",
                "appeler ",
                W({
                  elem: "code",
                  children: ["level-logic.js"]}),
                ", biensûr.\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"use strict\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword2"},
                      children: ["window"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["LevelLogic"]}),
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
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ROCK"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["DIAM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isRockOrDiamOrWall"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ROCK"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["DIAM"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["WALL"]}),
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
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["processRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setVX"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On arrête tout déplacement horizontal."]}),
                    "\n    \n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: [");"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["falling"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getVY"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!="]}),
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
                      children: ["falling"]}),
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
                      attr: {"class": "comment"},
                      children: ["// La pierre est déjà en train de tomber."]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On regarde s'il y a autre chose que du vide dessous."]}),
                    "\n      ",
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
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
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
                      attr: {"class": "comment"},
                      children: ["// On arrête la chute dans tous les cas."]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setVY"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    "\n        ",
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
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ROCK"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["WALL"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["DUST"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Le rocher  (ou diamant)  a été  stoppé :  on joue  un son"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// adéquat."]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["playBoom"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n        ",
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
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["HERO"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On tombe sur le héro : ça le tue."]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["killHero"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n        ",
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
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["DIAM"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Si c'est une pierre qui tombe sur un diamant, il explose."]}),
                    "\n          ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ROCK"]}),
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
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["explode"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: [");"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
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
                      attr: {"class": "comment"},
                      children: ["// La pierre est au repos."]}),
                    "\n      ",
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
                      children: ["below"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setMove"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
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
                      attr: {"class": "function"},
                      children: ["isRockOrDiamOrWall"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      attr: {"class": "keyword"},
                      children: ["if"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " !",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Si un rocher est posé sur un autre  et qu'il n'est pas sous un rocher/diamant, alors il"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// peut basculer à droite ou à gauche si l'espace est libre."]}),
                    "\n          ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
                    "\n              ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    " !",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On tombe sur la droite."]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setMove"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["+1"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n          ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
                    "\n                   ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      children: ["row"]}),
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
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
                    "\n                   ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    " !",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On tombe sur la gauche seulement s'il n'y a pas déjà un"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// rocher qui tombe sur la droite juste en face."]}),
                    "\n            ",
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
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " !",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getVX"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
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
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setMove"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
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
                      children: ["0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
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
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["process"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["env"]}),
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
                      children: ["level"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
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
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n      ",
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["row"]}),
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
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rows"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    "\n        ",
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
                      children: ["col"]}),
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
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cols"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n          ",
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
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ROCK"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["DIAM"]}),
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
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["processRockOrDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n          ",
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
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["EXP1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cell"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["EXP2"]}),
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
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Une explosion a une durée de vie de 2 cycles."]}),
                    "\n            ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getIndex"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
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
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Encore un cycle..."]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setIndex"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getIndex"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
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
                      children: ["1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n            ",
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
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// C'est terminé pour l'explosion."]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["VOID"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["apply"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["env"]}),
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
                      children: ["level"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["env"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
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
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n      ",
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["row"]}),
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
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rows"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                    "\n        ",
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
                      children: ["col"]}),
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
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cols"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                    "\n          ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["hasFlag"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
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
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Cellule avec un flag : il ne faut pas la traiter."]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["unflag"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["continue"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vx"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getVX"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vy"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getVY"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n          ",
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
                      children: ["vx"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vy"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!="]}),
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
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["move"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vx"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vy"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n            ",
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
                      children: ["vx"]}),
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
                      attr: {"class": "operator"},
                      children: ["||"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vy"]}),
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
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On  flag une  cellule  si  elle est  à  droite ou  en"]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// dessous de  la cellule courante.  Cela  évitera de la"]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// prendre  en compte  une  deuxième fois  dans le  même"]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// cycle."]}),
                    "\n              ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["flag"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vx"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vy"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n            ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}();"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "environnement s",
                "&#39;",
                "est enrichit, lui-aussi, apportant de nouveaux sons et même une musique d",
                "&#39;",
                "ambiance.\n",
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
                      children: ["env"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
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
                      children: ["y"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["z"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["w"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cellTime"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["200"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Temps en ms pour traverser une cellule."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["nextSynchro"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatenDiams"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["//#(eatDiam)"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatDiam"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Les assets finissant par 'ogg', 'mp3' ou 'wav'"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// sont transpformés en tag AUDIO."]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["diamSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["pause"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Il n'existe pas de méthode `stop()`."]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On doit donc faire une pause, puis"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// remettre le curseur au début de la piste."]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["diamSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["currentTime"]}),
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
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["diamSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["play"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatenDiams"]}),
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
                      children: [";"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["console"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["log"]}),
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
                      children: ["eatenDiams"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"/\""]}),
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["need"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["eatenDiams"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["need"]}),
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
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setType"]}),
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["exitX"]}),
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["exitY"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["EXIT"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["exitSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["play"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["//#(eatDiam)"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Bruit du rocher dont la chute est stoppée par un obstacle."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["playBoom"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rockSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["pause"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rockSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["currentTime"]}),
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
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rockSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["play"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["explode"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
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
                      children: ["col"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["var"]}),
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
                      children: [";"]}),
                    "\n    ",
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
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
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
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
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
                      attr: {"class": "keyword"},
                      children: ["for"]}),
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
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
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
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["x"]}),
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
                    "\n        ",
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["WALL"]}),
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
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ROCK"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setType"]}),
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
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["EXP1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setIndex"]}),
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
                      children: ["1"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["setMove"]}),
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
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["explSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["pause"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["explSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["currentTime"]}),
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
                      children: ["assets"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["explSound"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["play"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "      \n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["},"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Vie te mort du Héro."]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["isHeroAlive"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["true"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["killHero"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["()"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["isHeroAlive"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n    ",
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["rows"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["row"]}),
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
                      attr: {"class": "keyword"},
                      children: ["for"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      children: ["col"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cols"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["col"]}),
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
                    "\n        ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["getType"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Level"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["HERO"]}),
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
                    "\n          ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["explode"]}),
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
                      attr: {"class": "identifier"},
                      children: ["row"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
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
                      children: ["};"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Et voilà ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/boulder-dash2/e/"},
                  children: ["le résultat"]}),
                "."]}),
          W({
              elem: "h1",
              attr: {"id": "simplifier-encore-le-nombre-de-modules"},
              children: ["Simplifier encore le nombre de modules"]}),
          W({
              elem: "p",
              children: [
                "Mais tout d",
                "&#39;",
                "abord, nous allons fusionner les modules ",
                W({
                  elem: "code",
                  children: ["level-logic.js"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["hero-logic.js"]}),
                ".\nPuisque le héro est aussi un élément du décord, il peut être géré dans ",
                W({
                  elem: "code",
                  children: ["level-logic.js"]}),
                ".\nÇa va d",
                "&#39;",
                "ailleurs nous permettre d",
                "&#39;",
                "avoir plusieurs héros sur un même tableau.\nCe qui peut rendre le jeu assez intéressant."]}),
          W({
              elem: "p",
              children: [
                "Et voilà ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/boulder-dash2/f/"},
                  children: ["le résultat"]}),
                "."]}),
          W({
              elem: "h1",
              attr: {"id": "changer-de-niveau"},
              children: ["Changer de niveau"]}),
          W({
              elem: "p",
              children: ["Je ne vais pas vous décrire le jeu complet dans cet article, parce que le but est de se concentrer sur le WebGL.\nSi vous voulez en savoir plus, tout le code est ouvert et il est commenté."]}),
          W({
              elem: "p",
              children: [
                "Pour passer au tableau suivant, il va falloir faire le ménage dans la carte graphique.\nEn effet, toutes les textures, les programmes, les VertexArray qui on été créés devront être supprimés avant d",
                "&#39;",
                "en recréer pour le tableau suivant."]}),
          W({
              elem: "p",
              children: [
                "Pour cela, nous allons ajouter une méthode ",
                W({
                  elem: "code",
                  children: ["destroy()"]}),
                " aux deux modules suivants : ",
                W({
                  elem: "code",
                  children: ["level-painter.js"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["wall-painter.js"]}),
                ".\n",
                W('wdg.showhide462','wdg.showhide',{
                  value: "false",
                  label: "Faire du ménage",
                  content: [
                  W({
                      elem: "pre",
                      attr: {"class": "custom highlight js"},
                      children: [
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WP"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prototype"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["destroy"]}),
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
                          children: ["()"]}),
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
                          children: ["_prg"]}),
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
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["deleteTexture"]}),
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
                          children: ["_texture"]}),
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
                          children: ["deleteBuffer"]}),
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
                          children: ["_buffVert"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["destroy"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
                        "\n",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        " "]})]},{"id":"wdg.showhide462"})]}),
          W({
              elem: "p",
              children: [
                "Enfin, pour faire varier les couleurs d",
                "&#39;",
                "un tableau à l",
                "&#39;",
                "autre, nous utilisons la technique de l",
                "&#39;",
                "article ",
                W({
                  elem: "a",
                  attr: {"href": "marilyn.html"},
                  children: ["Marilyn"]}),
                " associé au code suivant :\n",
                W('wdg.showhide463','wdg.showhide',{
                  value: "false",
                  label: "La classe Tinter",
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
                          children: ["Tinter"]}),
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
                          children: ["vert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["frag"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"canvas\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
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
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"webgl\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["preserveDrawingBuffer"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["true"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["});"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_prg"]}),
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
                          attr: {"class": "identifier"},
                          children: ["WebGL"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["Program"]}),
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
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["frag"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [":"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["frag"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["});"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Les coordonnées UV de la texture."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["vertexArray"]}),
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
                          children: [","]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["];"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_buffVert"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["WebGL"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["fillArrayBuffer"]}),
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
                          children: ["vertexArray"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_texture"]}),
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
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_texture"]}),
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
                        "\n    ",
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
                        "\n    ",
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
                        "\n    ",
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
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_canvas"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_gl"]}),
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
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Prend en entrée une image et une valeur comprise entre 0 et 359."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Retourne un canvas avec l'image en question après décalage de"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// sa teinte."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Tinter"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prototype"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shiftHue"]}),
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
                          children: ["img"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
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
                          children: ["// Soyons sûr d'avoir un paramètre correct en entrée."]}),
                        "\n    ",
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
                          attr: {"class": "keyword"},
                          children: ["typeof"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["!=="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["'number'"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["||"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["isNaN"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [")"]}),
                        " ",
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
                          children: ["img"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    \n    ",
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
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_canvas"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
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
                          children: ["_prg"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
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
                          children: ["_gl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["use"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Appliquer la taille de l'image à notre canvas."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["img"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["img"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
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
                          attr: {"class": "identifier"},
                          children: ["width"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
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
                          attr: {"class": "identifier"},
                          children: ["height"]}),
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
                          children: ["viewport"]}),
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
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Charger la texture avec l'image courante."]}),
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
                          children: ["img"]}),
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
                          attr: {"class": "keyword"},
                          children: ["this"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["_texture"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniTexture"]}),
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
                          attr: {"class": "comment"},
                          children: ["// Définir le décalage de teinte."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["$uniHueShift"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["shift"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Attributs."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["bindAttribs"]}),
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
                          children: ["_buffVert"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attX\""]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [","]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "string"},
                          children: ["\"attY\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Dessin du rectangle."]}),
                        "\n    ",
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
                          children: ["4"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    \n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Créer le canvas à retourner. Il a la même taille"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// que l'image d'entrée."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["output"]}),
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
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["output"]}),
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
                          children: ["output"]}),
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
                          attr: {"class": "identifier"},
                          children: ["height"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Un context 2D suffit."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["var"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "operator"},
                          children: ["="]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["output"]}),
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
                          children: ["\"2d\""]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["clearRect"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// On y copie le contenu actuel du canvas WebGL."]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["ctx"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["drawImage"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["("]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["canvas"]}),
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
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "keyword"},
                          children: ["return"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["output"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        "\n\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "comment"},
                          children: ["// Pour faire le ménage."]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["Tinter"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prototype"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["destroy"]}),
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
                          children: ["()"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["{"]}),
                        "\n    ",
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
                          children: ["_prg"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
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
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [";"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["gl"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["deleteTexture"]}),
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
                          children: ["_texture"]}),
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
                          children: ["deleteBuffer"]}),
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
                          children: ["_buffVert"]}),
                        " ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: [");"]}),
                        "\n    ",
                        W({
                          elem: "span",
                          attr: {"class": "identifier"},
                          children: ["prg"]}),
                        ".",
                        W({
                          elem: "span",
                          attr: {"class": "function"},
                          children: ["destroy"]}),
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["();"]}),
                        "\n  ",
                        W({
                          elem: "span",
                          attr: {"class": "symbol"},
                          children: ["};"]}),
                        " "]})]},{"id":"wdg.showhide463"})]}),
          W({
              elem: "p",
              children: [
                "Et voilà ",
                W({
                  elem: "a",
                  attr: {"href": "css/assets/boulder-dash2/g/"},
                  children: ["le résultat"]}),
                "."]})]},{"id":"wdg.article456"})

    }
);
