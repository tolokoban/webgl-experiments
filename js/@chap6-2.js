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
        W('wdg.article68', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [
                "  ",
                W('wdg.flex69','wdg.flex',{"content": [
                  W({
                      elem: "center",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            W({
                              elem: "b",
                              children: ["Sans"]}),
                            " tri Javascript"]}),
                        "\r\n        ",
                        W('wdg.gl6-270','wdg.gl6-2',{
                          width: "420",
                          height: "420"},{"id":"wdg.gl6-270"}),
                        "\r\n      "]}),
                  W({
                      elem: "center",
                      children: [
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: [
                            W({
                              elem: "b",
                              children: ["Avec"]}),
                            " tri Javascript"]}),
                        "\r\n        ",
                        W('wdg.gl6-271','wdg.gl6-2',{
                          width: "420",
                          height: "420",
                          sort: "true"},{"id":"wdg.gl6-271"}),
                        "\r\n    "]})]},{"id":"wdg.flex69"})]}),
          W({
              elem: "p",
              children: ["La semi-transparence apporte son lot de désagréments. Comparez attentivement\nles deux animations ci-dessus et essayez de comprendre pourquoi celle de gauche\nne donne pas le résultat attendu (laissez se faire plusieurs rotations si vous\nne voyez pas tout de suite le problème)."]}),
          W({
              elem: "p",
              children: [
                "Les cercles les plus proches semblent bien cacher les cercles les plus éloignés,\npar moment, ",
                W({
                  elem: "strong",
                  children: ["certains perdent leur transparence"]}),
                " !"]}),
          W({
              elem: "p",
              children: [
                "Pour savoir ce qu",
                "&#39;",
                "il se passe, il faut d",
                "&#39;",
                "abord comprendre la semi-transparence.\nQuand un pixel doit être dessiné sur l",
                "&#39;",
                "écran, il peut se mélanger au pixel déjà\nexistant. Ce mécanisme s",
                "&#39;",
                "appelle le ",
                W({
                  elem: "strong",
                  children: ["blending"]}),
                " et certaines fonctions de WebGL\npermettent de contrôler comme ce mixage opère."]}),
          W({
              elem: "p",
              children: [
                "Voici le code que nous utilisons pour activer le blending :\n",
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
                      children: ["enable"]}),
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
                      children: ["BLEND"]}),
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
                      children: ["blendFunc"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "On commence par l",
                "&#39;",
                "activer, puis on choisit son ",
                W({
                  elem: "a",
                  attr: {"href": "https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc"},
                  children: ["mode opératoire"]}),
                ".\nNous entrerons plus dans le détail au chapitre ",
                W({
                  elem: "strong",
                  children: ["particules"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Le problème est que si nous dessinons le pixel d",
                "&#39;",
                "un cercle proche, il va se combiner\ncorrectement avec l",
                "&#39;",
                "arrière-plan, mais il va aussi mettre à jour le z-buffer,\nempêchant ainsi tout pixel d",
                "&#39;",
                "un cercle plus distant de s",
                "&#39;",
                "afficher."]}),
          W({
              elem: "p",
              children: [
                "La seule solution consiste à afficher les cercles dans le bon ordre : c",
                "&#39;",
                "est-à-dire\ndu plus éloigné au plus proche. Il nous faut donc trier nos données.\nSeulement ça semble un peu compliqué puisqu",
                "&#39;",
                "elles ont cette forme :"]}),
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
                    "\r\n  ",
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
                    "\r\n  ",
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
                    "\r\n  ",
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
                    "\r\n  ...\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Il faudrait trier par blocs, ce qui est faisable, mais pas forcément très rapide,\nd",
                "&#39;",
                "autant plus qu",
                "&#39;",
                "on va devoir faire ça en Javascript."]}),
          W({
              elem: "p",
              children: [
                "Par chance, WebGL vient (encore une fois) à la rescousse avec une fonction qu",
                "&#39;",
                "on\nn",
                "&#39;",
                "a pas encore étudiée : ",
                W({
                  elem: "strong",
                  children: [W({
                      elem: "code",
                      children: ["drawElements()"]})]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Elle permet justement d",
                "&#39;",
                "indiquer l",
                "&#39;",
                "ordre dans lequel il faut prendre les vertices\ngrâce à un tableau d",
                "&#39;",
                "index qu",
                "&#39;",
                "on lui passe en argument.\nLa solution est toute trouvée : c",
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
                    " : gl.POINTS, gl.LINE_STRIP, gl.LINE_LOOP, gl.LINES, gl.TRIANGLE_STRIP,\ngl.TRIANGLE_FAN ou gl.TRIANGLES."]}),
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
                    " : gl.UNSIGNED_BYTE ou gl.UNSIGNED_SHORT. Si vous avez plus de 255 points,\nil vaut mieux spécifier gl.UNSIGNED_SHORT."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    W({
                      elem: "strong",
                      children: ["offset"]}),
                    " : position du premier élément (généralement 0).\nPar rapport à l",
                    "&#39;",
                    "index du vertex, l",
                    "&#39;",
                    "offset doit être multiplié par\n",
                    W({
                      elem: "code",
                      children: ["Uint16Array.BYTES_PER_ELEMENT"]}),
                    "."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Il va donc nous falloir passer deux buffers à la carte graphique :\nun ",
                W({
                  elem: "strong",
                  children: ["Float32Array"]}),
                " pour les attributs de chaque vertex et\nun ",
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
                    "\r\n",
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
                      children: ["bufAttributes"]}),
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
                    "\r\n    \r\n",
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
                    "\r\n",
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
                    "\r\n  ",
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
                    "\r\n",
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
                ", celle-ci retourne un zéro si\nles deux valeurs en argument sont égales, un nombre positif si le premier argument\nest supérieur au second, etc."]}),
          W({
              elem: "h1",
              attr: {"id": "remarque"},
              children: ["Remarque"]}),
          W({
              elem: "p",
              children: [
                "Nous avons vu que l",
                "&#39;",
                "indexation est utile pour trier des vertex, mais elle peut\négalement servire à réutiliser le même vertex dans différents triangles.\nPour faire un cube, par exemple, il vous faut 6 faces carrés, dont chacune est\ncomposée de deux triangles. Il n",
                "&#39;",
                "y a que 8 sommets dans votre cube, mais si\nvous utilisez un tableau d",
                "&#39;",
                "attributs en mode ",
                W({
                  elem: "strong",
                  children: ["gl_TRIANGLES"]}),
                " vous aurez besoin\nde 12*3 = 36 vertex au lieu de 8."]}),
          W({
              elem: "p",
              children: [
                "A la place, vous pourriez simplement faire ceci :\n",
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
                      children: ["attribs"]}),
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
                    "\r\n  ",
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
                      children: ["+1"]}),
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
                    "\r\n  ",
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
                      children: ["-1"]}),
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
                    "\r\n  ",
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
                      children: ["-1"]}),
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
                    "\r\n  ",
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
                      children: ["+1"]}),
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
                    "\r\n  ",
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
                      children: ["+1"]}),
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
                    "\r\n  ",
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
                      children: ["-1"]}),
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
                    "\r\n  ",
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
                      children: ["-1"]}),
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
                    "\r\n  ",
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
                      children: ["+1"]}),
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
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\r\n  \r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["indexes"]}),
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
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["5"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["6"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["3"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: ["6"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: ["6"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: ["6"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
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
                      children: ["6"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["5"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["6"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["4"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["7"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["])"]}),
                    " "]})]})]},{"id":"wdg.article68"})

    }
);
