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
        W('wdg.article33', 'wdg.article', {"content": [
          W({
              elem: "h1",
              attr: {"id": "un-point-c-est-tout"},
              children: [
                "Un point c",
                "&#39;",
                "est tout"]}),
          W({
              elem: "p",
              children: [                W('wdg.gl6-234', 'wdg.gl6-2', {
                  width: "480",
                  height: "480"})]}),
          W({
              elem: "p",
              children: ["Bien, il nous faut donc trier nos données de sorte à afficher les sphères les plus lointaines en premier.\nSeulement ça semble un peu compliqué puisque nos données ont cette forme :"]}),
          W({
              elem: "p",
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["X1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Y1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Z1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Rouge1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Vert1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Bleu1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["X2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Y2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Z2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Rouge2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Vert2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Bleu2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["X3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Y3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Z3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Rouge3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Vert3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Bleu3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n  ...\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Il faudrait trier par blocs, ce qui est faisable, mais pas forcément très rapide, d",
                "&#39;",
                "autant plus qu",
                "&#39;",
                "on va devoir faire ça en Javascript."]}),
          W({
              elem: "p",
              children: [
                "Par chance, WebGL vient à la rescousse avec une fonction qu",
                "&#39;",
                "on n",
                "&#39;",
                "a pas encore étudiée : ",
                W({
                  elem: "strong",
                  children: [W({
                      elem: "code",
                      children: ["drawElements()"]})]}),
                ".\nElle permet justement d",
                "&#39;",
                "indiquer l",
                "&#39;",
                "ordre dans lequel il faut prendre les vertices grace à un tableau d",
                "&#39;",
                "index qu",
                "&#39;",
                "on lui passe en argument. La solution est toute trouvée : c",
                "&#39;",
                "est ce tableau d",
                "&#39;",
                "index que l",
                "&#39;",
                "on va trier."]}),
          W({
              elem: "p",
              children: [
                "Comparons les fonctions ",
                W({
                  elem: "code",
                  children: ["drawArrays"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["drawElements()"]}),
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
                      children: ["drawArrays("]}),
                    " mode, first, count ",
                    W({
                      elem: "strong",
                      children: [")"]})]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["drawElements("]}),
                    " mode, count, type, offset ",
                    W({
                      elem: "strong",
                      children: [")"]})]}),
                "\n"]}),
          W({
              elem: "p",
              children: ["Et voici les arguments (dont certains sont communs) :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["mode"]}),
                    " : gl.POINTS, gl.LINE_STRIP, gl.LINE_LOOP, gl.LINES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN ou gl.TRIANGLES."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["first"]}),
                    " : index du premier vertex (généralement 0)."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["count"]}),
                    " : nombre de vertex à afficher."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["type"]}),
                    " : gl.UNSIGNED_BYTE ou gl.UNSIGNED_SHORT. Si vous avez plus de 255 points, il vaut mieux spécifier gl.UNSIGNED_SHORT."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["offset"]}),
                    " : position du premier élément (généralement 0). Par rapport à l",
                    "&#39;",
                    "index du vertex, l",
                    "&#39;",
                    "offset doit être multiplié par ",
                    W({
                      elem: "code",
                      children: ["Uint16Array.BYTES_PER_ELEMENT"]}),
                    "."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Il va donc nous falloir passer deux buffers à la carte graphique : un ",
                W({
                  elem: "strong",
                  children: ["Float32Array"]}),
                " pour les attributs de chaque vertex et un ",
                W({
                  elem: "strong",
                  children: ["Uint16Array"]}),
                " pour les index sur ces vertices."]}),
          W({
              elem: "p",
              children: [
                "Voici comment on s",
                "&#39;",
                "y prend :"]}),
          W({
              elem: "p",
              children: [W({
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
                      children: ["datAttributes"]}),
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
                    " ... ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["bufAttributes"]}),
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
                    "\n",
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
                      children: ["bufAttributes"]}),
                    " ",
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
                      children: ["datAttributes"]}),
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
                    "\n    \n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["datIndexes"]}),
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
                      children: ["Uint16Array"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["(["]}),
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
                      children: ["2"]}),
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
                    " ... ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["bufIndexes"]}),
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
                    "\n",
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
                      children: ["ELEMENT_ARRAY_BUFFER"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["bufIndexes"]}),
                    " ",
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
                      children: ["ELEMENT_ARRAY_BUFFER"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["datIndexes"]}),
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
                "Enfin, voici comment trier le tableau des index :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["datIndexes"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["sort"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      children: ["i"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["j"]}),
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
                      children: ["datAttributes"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["6"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["j"]}),
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
                      children: ["]"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["datAttributes"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["6"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["i"]}),
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
                      children: ["];"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["});"]}),
                    " "]}),
                "    "]}),
          W({
              elem: "p",
              children: [
                "Quand on passe une fonction à la méthode ",
                W({
                  elem: "code",
                  children: ["sort()"]}),
                ", celle-ci retourne un zéro si les deux valeurs en argument sont égales, un nombre positif si le premier argument est supérieur au second, ..."]}),
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
                    "Page précédente : ",
                    W({
                      elem: "a",
                      attr: {"href": "chap6.html"},
                      children: [
                        "Un point c",
                        "&#39;",
                        "est tout (page 1)"]}),
                    "."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Chapitre suivant : ",
                    W({
                      elem: "a",
                      attr: {"href": "chap7.html"},
                      children: ["Particules"]}),
                    "."]}),
                "\n"]})]})

    }
);
