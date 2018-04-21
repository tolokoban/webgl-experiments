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
        W('wdg.article98', 'wdg.article', {
            title: "Frustrum",
            content: [
          W({
              elem: "h1",
              attr: {"id": "la-th-orie"},
              children: ["La théorie"]}),
          W({
              elem: "p",
              children: [W('wdg.frustrum99','wdg.frustrum',{},{"id":"wdg.frustrum99","class":"right"})]}),
          W({
              elem: "p",
              children: [
                "Poutr faire de la ",
                W({
                  elem: "strong",
                  children: ["3D"]}),
                ", il faut ",
                W({
                  elem: "em",
                  children: ["projeter"]}),
                " les coordonnées du monde virtuel dans le ",
                W({
                  elem: "strong",
                  children: ["clipspace"]}),
                " de WebGL.\nPour rappel, ce dernier est un cube dont chaque coordonnée est comprise entre ",
                W({
                  elem: "code",
                  children: ["-1"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["+1"]}),
                ".\nTous ce qui dépasse le clipspace n",
                "&#39;",
                "est pas affiché."]}),
          W({
              elem: "p",
              children: [
                "Pour simplifier tous les calculs, nous supposons que notre caméra est centrée en ",
                W({
                  elem: "code",
                  children: ["(0,0,0)"]}),
                "\net dirigée vers les ",
                W({
                  elem: "code",
                  children: ["Z"]}),
                " négatifs. Pourquoi négatif ?\nParce qu",
                "&#39;",
                "en 3D, la règle de la main droite s",
                "&#39;",
                "applique, si l",
                "&#39;",
                "axe des ",
                W({
                  elem: "code",
                  children: ["X"]}),
                " pointe vers la droite et celui des ",
                W({
                  elem: "code",
                  children: ["Y"]}),
                "\npointe vers le haut, alors le ",
                W({
                  elem: "code",
                  children: ["Z"]}),
                " doit pointer vers le spectateur, donc à l",
                "&#39;",
                "opposé de ce que l",
                "&#39;",
                "on regarde."]}),
          W({
              elem: "p",
              children: [
                "Posons : ",
                W({
                  elem: "code",
                  children: ["n = |ON|"]}),
                ", ",
                W({
                  elem: "code",
                  children: ["f = |OF|"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["h = |AN|"]}),
                ".\nCes trois paramètres sont suffisants pour faire varier la forme du ",
                W({
                  elem: "strong",
                  children: ["frustrum"]}),
                ", représenté par le trapèze orange\ndans le schàma ci-contre. Nous allons faire coïncider cette pyramide tronquée avec le ",
                W({
                  elem: "strong",
                  children: ["clipspace"]}),
                "."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "div",
                  attr: {"class": "tbl"},
                  children: [
<<<<<<< HEAD
                    "\n    ",
=======
                    "\r\n    ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                    W({
                      elem: "div",
                      children: [
                        W({
                          elem: "div"}),
                        W({
                          elem: "div",
                          attr: {"class": "grd hdr"},
                          children: ["Point A"]}),
                        W({
                          elem: "div",
                          attr: {"class": "grd hdr"},
                          children: ["PointB"]})]}),
<<<<<<< HEAD
                    "\n    ",
=======
                    "\r\n    ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                    W({
                      elem: "div",
                      attr: {"class": "grd"},
                      children: [
<<<<<<< HEAD
                        "\n        ",
=======
                        "\r\n        ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                        W({
                          elem: "div",
                          attr: {"class": "hdr"},
                          children: ["Coordonnées (Y,Z) dans le monde virtuel"]}),
<<<<<<< HEAD
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(-n, h)"]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(-f, f*h/n)"]}),
                        "\n    "]}),
                    "\n    ",
=======
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(-n, h)"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(-f, f*h/n)"]}),
                        "\r\n    "]}),
                    "\r\n    ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                    W({
                      elem: "div",
                      attr: {"class": "grd"},
                      children: [
<<<<<<< HEAD
                        "\n        ",
=======
                        "\r\n        ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                        W({
                          elem: "div",
                          attr: {"class": "hdr"},
                          children: ["Coordonnées (Y,Z) dans le clipspace"]}),
<<<<<<< HEAD
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, -1)"]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, +1)"]}),
                        "\n    "]}),
                    "\n"]})]}),
=======
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, -1)"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, +1)"]}),
                        "\r\n    "]}),
                    "\r\n"]})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
          W({
              elem: "p",
              children: [
                "Pour la caméra, les points ",
                W({
                  elem: "code",
                  children: ["A"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["B"]}),
                " sont confondus,\nc",
                "&#39;",
                "est pour cela que leur ordonnée est la même dans le clipspace.\nLa formule suivante nous permnet de projeter la coordonnée ",
                W({
                  elem: "code",
                  children: ["Y"]}),
                " (et donc ",
                W({
                  elem: "code",
                  children: ["X"]}),
                " par symétrie) dans le clipspace."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "code",
                  children: [
                    "Y",
                    "&#39;",
                    " = (Y * h) / (-Z * n)"]})]}),
          W({
              elem: "hr"}),
          W({
              elem: "p",
              children: [
                "A ce stade, vous savez que la variable ",
                W({
                  elem: "code",
                  children: ["gl_Position"]}),
                " est un vecteur à ",
                W({
                  elem: "strong",
                  children: ["4"]}),
                " dimensions et que la quatrième (",
                W({
                  elem: "code",
                  children: ["w"]}),
                ") divise les trois autres.\nAinsi, si ",
                W({
                  elem: "code",
                  children: ["gl_Position = vec4( 2, 4, 6, 7 )"]}),
                ", alors les coordonnées dans le clipspace seront\n",
                W({
                  elem: "code",
                  children: ["( 2/7, 4/7, 6/7 )"]}),
                ". Et puisque nous avons un division par ",
                W({
                  elem: "code",
                  children: ["-Z"]}),
                " dans la formule précédente, nous allons mettre ",
                W({
                  elem: "code",
                  children: ["-Z"]}),
                " dans la coordonnée ",
                W({
                  elem: "code",
                  children: ["w"]}),
                " de ",
                W({
                  elem: "code",
                  children: ["gl_Position"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Voici comment on écrit cela sous forme matricielle :\n",
<<<<<<< HEAD
                W('wdg.matrix100','wdg.matrix',{"value": "[h/n,0,0,0 ; 0,h/n,0,0 ; 0,0,0,0 ; 0,0,-1,0] * [X;Y;Z;1] = [X*h/n;Y*h/n;0;-Z] = [X';Y';Z';1]"},{"id":"wdg.matrix100"})]}),
=======
                W('wdg.matrix100','wdg.matrix',{"value": "[h/n,0,0,0 ; 0,h/n,0,0 ; 0,0,0,0 ; 0,0,-1,0]*[X;Y;Z;1] = [X*h/n;Y*h/n;0;-Z] = [X';Y';Z';W']"},{"id":"wdg.matrix100"})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
          W({
              elem: "hr"}),
          W({
              elem: "p",
              children: [
                "Il nous reste à calculer ",
                W({
                  elem: "code",
                  children: [
                    "Z",
                    "&#39;"]}),
                ". Les plus pointilleux d",
                "&#39;",
                "entre vous ont sûrement remarqué,\nen regardant le tableau qui donne les coordonnées des points ",
                W({
                  elem: "code",
                  children: ["A"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["B"]}),
                ", que la régle de la main droite n",
                "&#39;",
                "est pas\nrespectée dans le clipspace.\nC",
                "&#39;",
                "est exact, et il y a une bonne raison à cela."]}),
          W({
              elem: "p",
              children: [
                "Premièrement, ça ne change rien pour WebGL car au niveau du clipspace, le ",
                W({
                  elem: "code",
                  children: ["Z"]}),
                " sert uniquement pour le ",
                W({
                  elem: "strong",
                  children: ["Z-Buffer"]}),
                ".\nIl n",
                "&#39;",
                "est pas utilisé comme un réelle coordonnée, mais seulement pour permettre de cacher des fragments\nderrière d",
                "&#39;",
                "autres fragments ",
                W({
                  elem: "em",
                  children: [
                    "&quot;",
                    "plus proches",
                    "&quot;"]}),
                ".\nAlors respecter la règle de la main droite n",
                "&#39;",
                "est pas nécessaire dans ce cas."]}),
          W({
              elem: "p",
              children: [
                "Mais alors pourquoi ne pas la respecter quand même, histoire de ne pas s",
                "&#39;",
                "embrouiller quand on passe d",
                "&#39;",
                "un repère\nà l",
                "&#39;",
                "autre ?"]}),
          W({
              elem: "p",
              children: [
                "C",
                "&#39;",
                "est à cause d",
                "&#39;",
                "une limitation de WebGL. En effet, à chaque image, il faut effacer le ",
                W({
                  elem: "strong",
                  children: ["depth buffer"]}),
                " dans lequel\nsont stoqués les ",
                W({
                  elem: "code",
                  children: ["Z"]}),
                " des fragments. Pour cela, on utilise la fonction ",
                W({
                  elem: "code",
                  children: ["gl.clear( gl.DEPTH_BUFFER_BIT )"]}),
                ".\nCette dernière remplit le buffer avec une valeur que l",
                "&#39;",
                "on peut définir avec la fonction ",
                W({
                  elem: "code",
                  children: ["gl.clearDepth( depth )"]}),
                ".\nMalheureusement, l",
                "&#39;",
                "argument ",
                W({
                  elem: "code",
                  children: ["depth"]}),
                " est une valeur comprise entre ",
                W({
                  elem: "code",
                  children: ["0"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["1"]}),
                ".\nIl est donc impossible de réinitialiser le depth buffer avec des ",
                W({
                  elem: "code",
                  children: ["-1"]}),
                ". L",
                "&#39;",
                "astuce est donc de considérer que ",
                W({
                  elem: "code",
                  children: ["+1"]}),
                "\nest le ",
                W({
                  elem: "code",
                  children: ["Z"]}),
                " des fragments les plus distants et ",
                W({
                  elem: "code",
                  children: ["-1"]}),
                " celui des plus proches. Ainsi, on pourra remplir le buffer\navec des ",
                W({
                  elem: "code",
                  children: ["+1"]}),
                " et utiliser une fonction de test inverse, comme par exemple ",
                W({
                  elem: "code",
                  children: ["gl.depthFunc( gl.LESS )"]}),
                "."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "div",
                  attr: {"class": "tbl"},
                  children: [
<<<<<<< HEAD
                    "\n    ",
=======
                    "\r\n    ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                    W({
                      elem: "div",
                      children: [
                        W({
                          elem: "div"}),
                        W({
                          elem: "div",
                          attr: {"class": "grd hdr"},
                          children: ["Point A"]}),
                        W({
                          elem: "div",
                          attr: {"class": "grd hdr"},
                          children: ["PointB"]})]}),
<<<<<<< HEAD
                    "\n    ",
=======
                    "\r\n    ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                    W({
                      elem: "div",
                      attr: {"class": "grd"},
                      children: [
<<<<<<< HEAD
                        "\n        ",
=======
                        "\r\n        ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                        W({
                          elem: "div",
                          attr: {"class": "hdr"},
                          children: ["(Y,Z)"]}),
<<<<<<< HEAD
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(-n, h)"]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(-f, f*h/n)"]}),
                        "\n    "]}),
                    "\n    ",
=======
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(-n, h)"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(-f, f*h/n)"]}),
                        "\r\n    "]}),
                    "\r\n    ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                    W({
                      elem: "div",
                      attr: {"class": "grd"},
                      children: [
<<<<<<< HEAD
                        "\n        ",
=======
                        "\r\n        ",
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                        W({
                          elem: "div",
                          attr: {"class": "hdr"},
                          children: ["(Y',Z')"]}),
<<<<<<< HEAD
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, -1)"]}),
                        "\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, +1)"]}),
                        "\n    "]}),
                    "\n"]})]}),
=======
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, -1)"]}),
                        "\r\n        ",
                        W({
                          elem: "div",
                          children: ["(+1, +1)"]}),
                        "\r\n    "]}),
                    "\r\n"]})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
          W({
              elem: "p",
              children: [W('wdg.frustrum101','wdg.frustrum',{},{"id":"wdg.frustrum101","class":"right"})]}),
          W({
              elem: "p",
              children: [
                "La transformation de ",
                W({
                  elem: "code",
                  children: ["Z"]}),
                " en ",
                W({
                  elem: "code",
                  children: [
                    "Z",
                    "&#39;"]}),
                " est linéaire, elle est donc de la forme ",
                W({
                  elem: "code",
                  children: [
                    "Z",
                    "&#39;",
                    " = u.Z + v"]}),
                ".\nEt comme le résultat sera divisé par la coordonnée ",
                W({
                  elem: "code",
                  children: ["w"]}),
                " (qui vaut ",
                W({
                  elem: "code",
                  children: ["-Z"]}),
                "), on obtient les deux équations suivantes :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
<<<<<<< HEAD
                      children: ["-u.n + v = n"]})]}),
=======
                      children: ["-u.n + v = -n"]})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
<<<<<<< HEAD
                      children: ["-u.f + v = -f"]})]}),
=======
                      children: ["-u.f + v = f"]})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                "\n"]}),
          W({
              elem: "p",
              children: ["Elles se résolvent ainsi :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
<<<<<<< HEAD
                      children: ["u = (f-n) / (f+n)"]})]}),
=======
                      children: ["u = (n+f) / (n-f)"]})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                "\n",
                W({
                  elem: "li",
                  children: [W({
                      elem: "code",
<<<<<<< HEAD
                      children: ["v = 2.f.n / (f+n)"]})]}),
=======
                      children: ["v = 2.n.f / (n-f)"]})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                "\n"]}),
          W({
              elem: "p",
              children: [
                "La matrice de projection est donc :\n",
<<<<<<< HEAD
                W('wdg.matrix102','wdg.matrix',{"value": "[h/n,0,0,0 ; 0,h/n,0,0 ; 0,0,u,v ; 0,0,-1,0] = [h/n,0,0,0 ; 0,h/n,0,0 ; 0,0,(f-n)/(f+n),2fn/(f+n)) ; 0,0,-1,0]"},{"id":"wdg.matrix102"})]}),
=======
                W('wdg.matrix102','wdg.matrix',{"value": "[n/h,0,0,0 ; 0,n/h,0,0 ; 0,0,u,v ; 0,0,-1,0] = [n/h,0,0,0 ; 0,n/h,0,0 ; 0,0,(n+f)/(n-f),2nf/(n-f)) ; 0,0,-1,0]"},{"id":"wdg.matrix102"})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
          W({
              elem: "p",
              children: [
                "Bien entendu, pour garder un aspect ratio, il faudra ajouter un coefficient multiplicateur.\nSi on pose ",
                W({
                  elem: "code",
                  children: ["W"]}),
                " la largeur de l",
                "&#39;",
                "écran et ",
                W({
                  elem: "code",
                  children: ["H"]}),
                " sa hauteur, on aura :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Mode paysage = ",
<<<<<<< HEAD
                    W('wdg.matrix103','wdg.matrix',{"value": "[h/n,0,0,0 ; 0,hH/nW,0,0 ; 0,0,(f-n)/(f+n),2fn/(f+n)) ; 0,0,-1,0]"},{"id":"wdg.matrix103"})]}),
=======
                    W('wdg.matrix103','wdg.matrix',{"value": "[n/h,0,0,0 ; 0,nW/hH,0,0 ; 0,0,(n+f)/(n-f),2fn/(n-f)) ; 0,0,-1,0]"},{"id":"wdg.matrix103"})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Mode portrait = ",
<<<<<<< HEAD
                    W('wdg.matrix104','wdg.matrix',{"value": "[hW/nH,0,0,0 ; 0,h/n,0,0 ; 0,0,(f-n)/(f+n),2fn/(f+n)) ; 0,0,-1,0]"},{"id":"wdg.matrix104"})]}),
=======
                    W('wdg.matrix104','wdg.matrix',{"value": "[nH/hW,0,0,0 ; 0,n/h,0,0 ; 0,0,(n+f)/(n-f),2fn/(n-f)) ; 0,0,-1,0]"},{"id":"wdg.matrix104"})]}),
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1
                "\n"]}),
          W({
              elem: "h1",
              attr: {"id": "la-pratique"},
              children: ["La pratique"]}),
          W({
              elem: "p",
<<<<<<< HEAD
              children: [W('wdg.frustrum2105','wdg.frustrum2',{},{"id":"wdg.frustrum2105"})]})]},{"id":"wdg.article98"})
=======
              children: [W('wdg.frustrum2105','wdg.frustrum2',{},{"id":"wdg.frustrum2105"})]}),
          W({
              elem: "p",
              children: [
                "Voici la fonction Javascript qui crée la matrice de projection à partir des variables ",
                W({
                  elem: "code",
                  children: ["n"]}),
                ", ",
                W({
                  elem: "code",
                  children: ["f"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["h"]}),
                " :\n",
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
                      children: ["createProjectionMatrix"]}),
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
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["h"]}),
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
                      children: ["try"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\r\n    ",
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
                    "\r\n    ",
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
                    "\r\n    ",
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
                      children: ["W"]}),
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
                      children: ["H"]}),
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
                    "\r\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
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
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["h"]}),
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
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "   ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["W"]}),
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
                      children: ["h"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["H"]}),
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
                      children: [","]}),
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "   ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["),"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "   ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["),"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    "\r\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\r\n    ",
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
                    "\r\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
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
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["H"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["h"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["W"]}),
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
                      children: [","]}),
                    "   ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "         ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["h"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
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
                    "           ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "         ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "   ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["),"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["-1"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n        ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "         ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "   ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["2"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["n"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["f"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["),"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["0"]}),
                    "\r\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["catch"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["ex"]}),
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
                      children: ["// Si les arguments  n, f et h produisent  une incohérence (par exemple, n=0  donne une division"]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// par zéro), alors on retourne une matrice nulle et rien ne sera affiché."]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
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
                    "\r\n      ",
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
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n      ",
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
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n      ",
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
                      children: ["0"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\r\n      ",
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
                      children: ["0"]}),
                    "\r\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
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
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "On remarque que la matrice semble transposée. En effet, il faut bien garder à l",
                "&#39;",
                "esprit que pour passer\nune matrice à WebGL, ",
                W({
                  elem: "strong",
                  children: ["il faut donner ses valeurs colonne par colonne"]}),
                "."]}),
          W({
              elem: "p",
              children: [
                "Voici le code d",
                "&#39;",
                "affichage de notre scène :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
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
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["proj"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["createProjectionMatrix"]}),
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
                      children: ["_3d"]}),
                    ".",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["argN"]}),
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
                      children: ["argF"]}),
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
                      children: ["argH"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["console"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["info"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["\"[wdg.frustrum2] proj=\""]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["proj"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prg"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["$uniProjection"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["proj"]}),
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
                      children: ["DEPTH_TEST"]}),
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
                      children: ["clearColor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["clearDepth"]}),
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
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["gl"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["depthFunc"]}),
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
                      children: ["LESS"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\r\n\r\n  ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_bpe"]}),
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
                      children: ["bpe"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attPoint"]}),
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
                      children: ["prg"]}),
                    ".",
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
                      children: ["\"attPoint\""]}),
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
                      children: ["enableVertexAttribArray"]}),
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
                      children: ["vertexAttribPointer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attPoint"]}),
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
                    "\r\n\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attColor"]}),
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
                      children: ["prg"]}),
                    ".",
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
                      children: ["\"attColor\""]}),
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
                      children: ["enableVertexAttribArray"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attColor"]}),
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
                      children: ["vertexAttribPointer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attColor"]}),
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
                      children: ["block"]}),
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
                    "\r\n\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_3d"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_3d"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_buffer"]}),
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
                      children: ["_count"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    " "]})]}),
          W({
              elem: "p",
              children: [
                "Les shaders sont simplicimes :\n",
                W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
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
                    "\r\n\r\n",
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
                    "\r\n",
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
                      children: ["attColor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varying"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varColor"]}),
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
                    "  \r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varColor"]}),
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
                      children: ["attColor"]}),
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
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// Une simple multiplication permet d'appliquer"]}),
                    "\r\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// la perspective."]}),
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
                    " "]}),
                "\n",
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
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varying"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vec4"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["varColor"]}),
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
                      attr: {"class": "identifier"},
                      children: ["varColor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\r\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " "]})]})]},{"id":"wdg.article98"})
>>>>>>> 3894a0f5e19392c0759d55d9da7401dbdaefcee1

    }
);
