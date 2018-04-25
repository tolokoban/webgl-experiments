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
        W('wdg.article140', 'wdg.article', {
            title: "Dessin vectoriel",
            content: [
          W({
              elem: "h1",
              attr: {"id": "remplir-une-courbe-ferm-e"},
              children: ["Remplir une courbe fermée"]}),
          W({
              elem: "p",
              children: [W('wdg.vectorDrawing3141','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "1"},{"id":"wdg.vectorDrawing3141","class":"right"})]}),
          W({
              elem: "p",
              children: [
                "Le but de cet article est de déterminer l",
                "&#39;",
                "ensemble des triangles dont on a besoin pour remplir une courbe fermée dont on connait les points."]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "algorithme de base est assez simple et il produit ",
                W({
                  elem: "code",
                  children: ["n-2"]}),
                " triangles pour ",
                W({
                  elem: "code",
                  children: ["n"]}),
                " points d",
                "&#39;",
                "une courbe fermée qui englobe une seule surface. Mais il faudra le raffiner pour qu",
                "&#39;",
                "il fonctionne avec toutes les formes de courses."]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "algorithme est le suivant :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Soit ",
                    W({
                      elem: "code",
                      children: ["vertices"]}),
                    " la liste des points de la courbe."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Soit ",
                    W({
                      elem: "code",
                      children: ["N"]}),
                    " le nombre de points de cette courbe."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Répéter ",
                    W({
                      elem: "code",
                      children: ["N-2"]}),
                    " fois:",
                    W({
                      elem: "ul",
                      children: [
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            "Soit ",
                            W({
                              elem: "code",
                              children: ["index"]}),
                            ", l",
                            "&#39;",
                            "indice du premier point du premier ",
                            W({
                              elem: "strong",
                              children: ["triangle candidat"]}),
                            "."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            "Créer le triangle (",
                            W({
                              elem: "code",
                              children: ["index"]}),
                            ", ",
                            W({
                              elem: "code",
                              children: ["index+1"]}),
                            ", ",
                            W({
                              elem: "code",
                              children: ["index+2"]}),
                            ")."]}),
                        "\n",
                        W({
                          elem: "li",
                          children: [
                            "Retirer de ",
                            W({
                              elem: "code",
                              children: ["vertices"]}),
                            " le point ",
                            W({
                              elem: "code",
                              children: ["index+1"]}),
                            "."]}),
                        "\n"]}),
                    "\n"]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "Le reste de l",
                "&#39;",
                "article portera sur comment déterminer qu",
                "&#39;",
                "un triangle est ",
                W({
                  elem: "strong",
                  children: ["candidat"]}),
                " ou pas."]}),
          W({
              elem: "h1",
              attr: {"id": "petit-rappel-de-g-om-trie"},
              children: ["Petit rappel de géométrie"]}),
          W({
              elem: "p",
              children: [
                "En mathématiques, les angles sont orientés. C",
                "&#39;",
                "est-à-dire que si l",
                "&#39;",
                "angle ",
                "&quot;",
                "tourne",
                "&quot;",
                " dans le sens contraire des aiguilles d",
                "&#39;",
                "une montre (appelé sens trigonométrique), alors il est positif. Sinon, il est négatif."]}),
          W({
              elem: "p",
              children: [
                "Le ",
                W({
                  elem: "strong",
                  children: ["produit vectoriel"]}),
                " est une opération qui crée un vecteur à partir de deux autres.\nIl fonctionne en 3 dimensions, ce qui signifie que le vecteur résultant sera perpendiculaire au plan décrit par les deux autres vecteurs."]}),
          W({
              elem: "p",
              children: ["Voici la formule qui permet de calculer le produit vectoriel :"]}),
          W({
              elem: "p",
              children: [W('wdg.matrix142','wdg.matrix',{"value": "[x;y;z]^[x';y';z'] = [yz'-y'z;x'z-xz';xy'-x'y]"},{"id":"wdg.matrix142"})]}),
          W({
              elem: "p",
              children: [
                "Puisque nos vecteurs sont dans un même plan, ils sont définis par deux coordonnées : `(X,Y)",
                "&#39;",
                ".\nEt ça simplifie grandement le calcul du produit vectoriel :"]}),
          W({
              elem: "p",
              children: [W('wdg.matrix143','wdg.matrix',{"value": "[x;y;0]^[x';y';0] = [0;0;xy'-x'y]"},{"id":"wdg.matrix143"})]}),
          W({
              elem: "p",
              children: [
                "Donc si on veut connaitre l",
                "&#39;",
                "angle formé par les vecteurs ",
                W({
                  elem: "code",
                  children: ["(x,y)"]}),
                " et  ",
                W({
                  elem: "code",
                  children: [
                    "(x",
                    "&#39;",
                    ",y",
                    "&#39;",
                    ")"]}),
                ", il suffit de vérifier le signe de\n",
                W({
                  elem: "code",
                  children: [
                    "xy",
                    "&#39;",
                    "-x",
                    "&#39;",
                    "y"]}),
                ". Par abus de langage, dans le reste de l",
                "&#39;",
                "article, on dira que le produit vectoriel est positif si cette égalité est positive."]}),
          W({
              elem: "h1",
              attr: {"id": "triangles-candidats"},
              children: ["Triangles candidats"]}),
          W({
              elem: "p",
              children: [W('wdg.vectorDrawing144','wdg.vectorDrawing',{},{"id":"wdg.vectorDrawing144","class":"right"})]}),
          W({
              elem: "p",
              children: [
                "Dans l",
                "&#39;",
                "exemple ci-contre, on remarque que les triangles ",
                W({
                  elem: "code",
                  children: ["BCD"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["ABD"]}),
                " ne conviennent pas.\n",
                W({
                  elem: "code",
                  children: ["BCD"]}),
                " définit un angle concave et il va donc colorier l",
                "&#39;",
                "extérieur de notre courbe.\n",
                W({
                  elem: "code",
                  children: ["ABD"]}),
                " a l",
                "&#39;",
                "inconvénient d",
                "&#39;",
                "englober un poit de la courbe et donc de colorier une partie intérieure et une partie extérieure."]}),
          W({
              elem: "p",
              children: ["Comment savoir si un angle est concave ou convexe ?"]}),
          W({
              elem: "p",
              children: [
                "Il est facile de savoir si deux angles sont de même nature : il suffit que leur produit vectoriel respectif soient de même signe. Il faut donc déterminer la concavité du premier angle, mais c",
                "&#39;",
                "est un algorithme qui va coûter du temps de calcul, alors pourquoi ne pas simplement supposer que le premier angle est concave et voir où ça nous mène ?\nSi on a tort, on le saura rapidement parce qu",
                "&#39;",
                "on va retirer un à un tous les angles concaves et aboutir à une courbe totalement convexe pour laquelle plus aucun triangle ne pourra être candidat à l",
                "&#39;",
                "éviction. Dans ce cas, on fait la supposition inverse (le premier angle est concave) et on est bon."]}),
          W({
              elem: "p",
              children: [W('wdg.vectorDrawing2145','wdg.vectorDrawing2',{},{"id":"wdg.vectorDrawing2145","class":"right"})]}),
          W({
              elem: "p",
              children: ["Comment savoir si un point est contenu dans un triangle ?"]}),
          W({
              elem: "p",
              children: [
                "Un point appartient à un triangle si et seulement s",
                "&#39;",
                "il appartient à deux secteurs angulaires de ce triangle.\nDans cet exemple, ",
                W({
                  elem: "code",
                  children: ["M"]}),
                " appartient au secteur angulaire ",
                W({
                  elem: "code",
                  children: ["BCA"]}),
                " puisque les produits vectoriels ",
                W({
                  elem: "code",
                  children: ["CB^CM"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["CM^CA"]}),
                " ont même signe. On peut donc déterminer l",
                "&#39;",
                "appartenance de ",
                W({
                  elem: "code",
                  children: ["M"]}),
                " au triangle avec 4 produite vectoriels."]}),
          W({
              elem: "p",
              children: [
                "Mais on peut faire mieux si on connaît déjà l",
                "&#39;",
                "orientation de l",
                "&#39;",
                "angle ",
                W({
                  elem: "code",
                  children: ["BAC"]}),
                ". Il suffit alors de vérifier que le point ",
                W({
                  elem: "code",
                  children: ["M"]}),
                " est bien à gauche de chacun des vecteurs ",
                W({
                  elem: "code",
                  children: ["AB"]}),
                ", ",
                W({
                  elem: "code",
                  children: ["BC"]}),
                " et ",
                W({
                  elem: "code",
                  children: ["CA"]}),
                ". Comme on a déjà fait le test de concavité du triangle, on peut utiliser cette technique et donc faire, dans le pire des cas, seulement 3 produits vectoriels."]}),
          W({
              elem: "h1",
              attr: {"id": "impl-mentation"},
              children: ["Implémentation"]}),
          W({
              elem: "p",
              children: [
                W('wdg.vectorDrawing3146','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "0"},{"id":"wdg.vectorDrawing3146"}),
                "\n",
                W('wdg.vectorDrawing3147','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "1"},{"id":"wdg.vectorDrawing3147"}),
                "\n",
                W('wdg.vectorDrawing3148','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "2"},{"id":"wdg.vectorDrawing3148"}),
                "\n",
                W('wdg.vectorDrawing3149','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "3"},{"id":"wdg.vectorDrawing3149"}),
                "\n",
                W('wdg.vectorDrawing3150','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "4"},{"id":"wdg.vectorDrawing3150"}),
                "\n",
                W('wdg.vectorDrawing3151','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "5"},{"id":"wdg.vectorDrawing3151"}),
                "\n",
                W('wdg.vectorDrawing3152','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "6"},{"id":"wdg.vectorDrawing3152"}),
                "\n",
                W('wdg.vectorDrawing3153','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "6"},{"id":"wdg.vectorDrawing3153"}),
                "\n",
                W('wdg.vectorDrawing3154','wdg.vectorDrawing3',{
                  width: "300",
                  height: "300",
                  index: "6"},{"id":"wdg.vectorDrawing3154"})]}),
          W({
              elem: "p",
              children: [W({
                  elem: "pre",
                  attr: {"class": "custom highlight js"},
                  children: [
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// @param {Float32Array}  vertices -  Attributs de chaque  vertex. Les"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// deux premiers doivent être X et Y."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// @param   {number=2}  attributesCount   -  Nombre   d'attributs  par"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// vertex. Au minimum 2 (X et Y)."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// @param {number=0}  offset -  Index du premier  vertex. Utile  si on"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// veut dessiner plusieurs polygônes avec le même buffer."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// @return {Uint16Array} Tableau des indices des vertex."]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["fillPolyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      children: ["attributesCount"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
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
                      children: ["attributesCount"]}),
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
                      children: ["attributesCount"]}),
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
                      attr: {"class": "keyword"},
                      children: ["typeof"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
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
                      children: ["offset"]}),
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
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
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
                      attr: {"class": "function"},
                      children: ["Polyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      children: ["attributesCount"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vertexCount"]}),
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
                      children: ["floor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vertices"]}),
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
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["expectedTriangles"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vertexCount"]}),
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
                      children: ["elemBuff"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["doFillPolyline"]}),
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
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
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
                      children: ["elemBuff"]}),
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
                      children: ["elemBuff"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
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
                      children: ["expectedTriangles"]}),
                    "  ",
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
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["elemBuff"]}),
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
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
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
                      attr: {"class": "function"},
                      children: ["Polyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      children: ["attributesCount"]}),
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
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["doFillPolyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
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
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["function"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["doFillPolyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["B"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["C"]}),
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
                      children: ["elemBuff"]}),
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["while"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&gt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "number"},
                      children: ["3"]}),
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
                      children: ["count"]}),
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
                      attr: {"class": "keyword"},
                      children: ["while"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " !",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isCandidate"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
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
                      children: ["count"]}),
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
                      attr: {"class": "operator"},
                      children: ["&lt;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
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
                      children: ["count"]}),
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
                    "\n      ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["next"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
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
                      children: ["count"]}),
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
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
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
                      children: ["null"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["elemBuff"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["push"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prev"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["removeTriangle"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prev"]}),
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
                    "\n\n  ",
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
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isCandidate"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
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
                      children: ["null"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["();"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["B"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["C"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prev"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["elemBuff"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["push"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["B"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["offset"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["C"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["elemBuff"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["PTR"]}),
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["PREV"]}),
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
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["NEXT"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
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
                      children: ["vertices"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["points"]}),
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
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
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
                      attr: {"class": "keyword2"},
                      children: ["Math"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["floor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["vertices"]}),
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
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
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
                      attr: {"class": "identifier"},
                      children: ["size"]}),
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
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["points"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["push"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["(["]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["k"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["attributesCount"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["k"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["+"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["size"]}),
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
                      attr: {"class": "operator"},
                      children: ["%"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["size"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["k"]}),
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
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["%"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["size"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]);"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["size"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_vertices"]}),
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
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_cursor"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_points"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["points"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["isCandidate"]}),
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
                      children: ["orientation"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
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
                      children: ["_cursor"]}),
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
                      children: ["A"]}),
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
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
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
                      children: ["idxC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prev"]}),
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
                      children: ["AB"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AC"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["crossprod"]}),
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
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
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
                      children: ["crossprod"]}),
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
                      children: ["&amp;"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["&amp;"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
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
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
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
                      children: ["crossprod"]}),
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
                      children: ["orientation"]}),
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
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "comment"},
                      children: ["// On vérifie maintenant qu'aucun point n'est à l'intérieur du triangle."]}),
                    "\n  ",
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
                      children: ["idxM"]}),
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
                      children: ["idxM"]}),
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
                      children: ["_points"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      children: ["idxM"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["continue"]}),
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
                      children: ["idxM"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["continue"]}),
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
                      children: ["idxM"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["==="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [")"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["continue"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n    ",
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
                      attr: {"class": "function"},
                      children: ["isInTriangle"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
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
                      children: ["false"]}),
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
                      attr: {"class": "identifier"},
                      children: ["true"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["get"]}),
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
                      children: ["index"]}),
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
                      children: ["index"]}),
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
                      children: ["index"]}),
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
                      children: ["_cursor"]}),
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
                      children: ["point"]}),
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
                      children: ["_points"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["pointer"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["point"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["PTR"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
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
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["point"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["NEXT"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["],"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prev"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [":"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["point"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["PREV"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["],"]}),
                    "\n    ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_vertices"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["pointer"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["],"]}),
                    "\n    ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_vertices"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["pointer"]}),
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
                      children: ["]"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["getVector"]}),
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
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
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
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["B"]}),
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
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
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
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
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
                      attr: {"class": "identifier"},
                      children: ["B"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["x"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    "\n    ",
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
                      attr: {"class": "identifier"},
                      children: ["B"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["y"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["cross"]}),
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
                      children: ["u"]}),
                    ".",
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
                      children: ["v"]}),
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
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["u"]}),
                    ".",
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
                      children: ["v"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["x"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
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
                    "\n ",
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
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["number"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Signe"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["du"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["produit"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["scalaire"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AB"]}),
                    "^",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AC"]}),
                    ".\n ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["*"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["/"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["isInTriangle"]}),
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
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["orientation"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
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
                      attr: {"class": "function"},
                      children: ["get"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
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
                      children: ["idxC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["A"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prev"]}),
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
                      children: ["orientation"]}),
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
                      attr: {"class": "function"},
                      children: ["isInTrianglePos"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["isInTriangleNeg"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["isInTriangleNeg"]}),
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
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AB"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AM"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AM"]}),
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
                      children: ["0"]}),
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
                      children: ["false"]}),
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
                      children: ["BC"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BM"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BM"]}),
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
                      children: ["0"]}),
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
                      children: ["false"]}),
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
                      children: ["CA"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["CM"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["CA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["CM"]}),
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
                      children: ["0"]}),
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
                      children: ["false"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["true"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["isInTrianglePos"]}),
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
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AB"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AM"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["AM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
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
                      children: ["BC"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BM"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxB"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["BM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
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
                      children: ["CA"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxA"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["var"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["CM"]}),
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
                      attr: {"class": "function"},
                      children: ["getVector"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxC"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "function"},
                      children: ["cross"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["CA"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["CM"]}),
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
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["false"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["return"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["true"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["next"]}),
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
                      children: ["index"]}),
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
                      children: ["_cursor"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_cursor"]}),
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
                      children: ["_points"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["NEXT"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    "\n\n",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["Polyline"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["prototype"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["removeTriangle"]}),
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
                      children: ["idxCur"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxNxt"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [","]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxPrv"]}),
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
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_points"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxPrv"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["NEXT"]}),
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
                      children: ["idxNxt"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_points"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxNxt"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["PREV"]}),
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
                      children: ["idxPrv"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["length"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["-"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_cursor"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxNxt"]}),
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
                      children: ["txt"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "string"},
                      children: ["''"]}),
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
                      children: ["index"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxNxt"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [";"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["do"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["{"]}),
                    "\n    ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["txt"]}),
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
                      attr: {"class": "function"},
                      children: ["alpha"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n    ",
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
                      attr: {"class": "keyword"},
                      children: ["this"]}),
                    ".",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["_points"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["]["]}),
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["NEXT"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["];"]}),
                    "\n  ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["}"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "keyword"},
                      children: ["while"]}),
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["("]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["index"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "operator"},
                      children: ["!=="]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "identifier"},
                      children: ["idxNxt"]}),
                    " ",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: [");"]}),
                    "\n",
                    W({
                      elem: "span",
                      attr: {"class": "symbol"},
                      children: ["};"]}),
                    " "]})]})]},{"id":"wdg.article140"})

    }
);
require("$",function(r,n,t){t.config={name:'"webgl-experiments"',description:'"WebGL study by tutorials"',author:'"tolokoban"',version:'"0.0.90"',major:"0",minor:"0",revision:"90",date:"2018-04-25T20:05:31.000Z",consts:{}};var o=null;t.lang=function(r){return void 0===r&&(window.localStorage&&(r=window.localStorage.getItem("Language")),r||(r=window.navigator.language)||(r=window.navigator.browserLanguage)||(r="fr"),r=r.substr(0,2).toLowerCase()),o=r,window.localStorage&&window.localStorage.setItem("Language",r),r},t.intl=function(r,n){var o,e,a,i,g,u,l,s=r[t.lang()],w=n[0];for(l in r)break;if(!l)return w;if(!s&&!(s=r[l]))return w;if(o=s[w],o||(s=r[l],o=s[w]),!o)return w;if(n.length>1){for(e="",g=0,a=0;a<o.length;a++)i=o.charAt(a),"$"===i?(e+=o.substring(g,a),a++,u=o.charCodeAt(a)-48,u<0||u>=n.length?e+="$"+o.charAt(a):e+=n[u],g=a+1):"\\"===i&&(e+=o.substring(g,a),a++,e+=o.charAt(a),g=a+1);e+=o.substr(g),o=e}return o}});
//# sourceMappingURL=$.js.map
require("assets",function(n,r,t){var e=function(){function r(){return e(t,arguments)}var t={en:{},fr:{}},e=n("$").intl;return r.all=t,r}();r.exports._=e});
//# sourceMappingURL=assets.js.map
require("wdg.article",function(e,t,n){function a(e){var t,n,a=o.tag("nav","thm-ele8","thm-bgPL");for(t in i)n=i[t],"$"===t.charAt(0)?o.add(a,o.tag("h1",[n])):t==e?o.add(a,o.tag("div","thm-ele1",[n])):o.add(a,o.tag("a",[n],{href:t+".html"}));return a}var r=function(){function t(){return a(n,arguments)}var n={en:{},fr:{}},a=e("$").intl;return t.all=n,t}(),i={$1:"Les bases",intro:"Introduction",index:"Comprendre WebGL",index2:"Comprendre WebGL (2)",chap1:"Dessiner un carré",chap2:"Dessiner un polygône",chap3:"Textures procédurales",chap4:"Textures animées",chap5:"Utiliser des images",chap6:"Un point c'est tout","chap6-2":"La semi-transparence",transparence:"La semi-transparence (2)",chap7:"Particules",chap8:"Frame Buffer",deform:"Déformation",deform2:"Déformation (2)",$2:"La troisième dimension",interpolation:"Interpolation des varyings",$666:"Annexes",doc:"Documentations"};e("theme");var o=e("dom"),s=e("tfw.data-binding"),c=e("tfw.view.icon"),d=function(e){o.addClass(document.body,"thm-bg0");var t=window.location.pathname.split("/").pop();t=t.substr(0,t.length-5),"string"!=typeof e.title&&(e.title=t);var n=o.tag("header","thm-ele12","thm-bgP",[o.tag("a",{href:"index.html"},[new c({size:"1.5rem",content:"menu"})]),e.title]),r=(a(t),o.tag("article","thm-bg1"));o.elem(this,"div","article",[r,n]);s.prop(this,"content")(function(e){o.clear(r),Array.isArray(e)||(e=[e]),e.forEach(function(e){o.add(r,e)})}),e=s.extend({content:[]},e,this)};t.exports=d;t.exports._=r});
//# sourceMappingURL=wdg.article.js.map
require("tfw.view.icon",function(n,e,t){function o(n){try{"string"==typeof n&&(n=p.iconsBook[n]),this._content=i.call(this,n),u.clear(this,this._content.svgRootGroup),[0,1,2,3,4,5,6,7].forEach(function(n){s.call(this,n,this["pen"+n])},this),this.$.style.display=""}catch(n){this.$.style.display="none",""!=this.content&&(this.content="")}}function i(n){var e=(u.svg("g",{"stroke-width":6,fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}),[[],[],[],[],[],[],[],[]]),t=[[],[],[],[],[],[],[],[]],o=r(this.$,e,t,n);return u.att(o,{"stroke-width":6,fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}),{svgRootGroup:o,elementsToFillPerColor:e,elementsToStrokePerColor:t}}function r(n,e,t,o){if("string"==typeof o)return u.add(n,o);a(o);var i=o[0],s=u.svg(i);return o.forEach(function(n,o){0!==o&&(Array.isArray(n)?n.forEach(r.bind(null,s,e,t)):c(s,e,t,n))}),u.add(n,s),s}function c(n,e,t,o){var i,r,c,a;for(i in o)r=o[i],"fill"===i||"stroke"===i?(c=parseInt(r),isNaN(c)?u.att(n,i,r):(a="fill"===i?e:t,c=h(c,0,a.length-1),a[c].push(n))):u.att(n,i,r)}function a(n){if(!Array.isArray(n))throw"Definition of SVG elements must be arrays!\n"+JSON.stringify(n);var e=n[0];if("string"!=typeof e)throw"The first item of a SVG element must be a string!\n"+e}function s(n,e){if(void 0!==e){var t=this._content.elementsToFillPerColor[n];Array.isArray(t)||(t=[]);var o=this._content.elementsToStrokePerColor[n];Array.isArray(o)||(o=[]),l(t,o,e)}}function l(n,e,t){f("fill",n,v,t),f("stroke",e,m,t)}function f(n,e,t,o){var i=t[o];void 0===i?e.forEach(function(e){u.att(e,n,o)}):e.forEach(function(e){Object.values(t).forEach(function(n){u.removeClass(e,n)}),u.addClass(e,i),u.removeAtt(e,n)})}function h(n,e,t){return n<e?e:n>t?t:n}var d=function(){function e(){return o(t,arguments)}var t={en:{},fr:{}},o=n("$").intl;return e.all=t,e}();n("polyfill.object.values");var u=n("dom"),p=n("tfw.icons"),g={onContentChanged:o,onPen0Changed:function(n){s.call(this,0,n)},onPen1Changed:function(n){s.call(this,1,n)},onPen2Changed:function(n){s.call(this,2,n)},onPen3Changed:function(n){s.call(this,3,n)},onPen4Changed:function(n){s.call(this,4,n)},onPen5Changed:function(n){s.call(this,5,n)},onPen6Changed:function(n){s.call(this,6,n)},onPen7Changed:function(n){s.call(this,7,n)}},v={0:"thm-svg-fill0",1:"thm-svg-fill1",P:"thm-svg-fill-P",PL:"thm-svg-fill-PL",PD:"thm-svg-fill-PD",S:"thm-svg-fill-S",SL:"thm-svg-fill-SL",SD:"thm-svg-fill-SD"},m={0:"thm-svg-stroke0",1:"thm-svg-stroke1",P:"thm-svg-stroke-P",PL:"thm-svg-stroke-PL",PD:"thm-svg-stroke-PD",S:"thm-svg-stroke-S",SL:"thm-svg-stroke-SL",SD:"thm-svg-stroke-SD"};try{e.exports=function(){function e(n,e,t){return void 0===n[e]?t:n[e]}function t(n,e,t){t?i.removeClass(n,e):i.addClass(n,e)}function o(n,e,t){t?i.addClass(n,e):i.removeClass(n,e)}var i=n("dom"),r=n("tfw.binding.property-manager"),c=n("tfw.view").Tag,a=n("tfw.binding.link"),s=n("tfw.view"),l=n("tfw.binding.converters");s.ensureCodeBehind(g,"onContentChanged","onPen0Changed","onPen1Changed","onPen2Changed","onPen3Changed","onPen4Changed","onPen6Changed","onPen7Changed");var f=l.get("boolean"),h=l.get("unit"),d=l.get("string");return function(n){try{void 0===n&&(n={}),this.$elements={};var s=this,l=r(this);l.create("visible",{cast:f}),l.create("content"),l.create("size",{cast:h}),l.create("animate",{cast:f}),l.create("flipH",{cast:f}),l.create("flipV",{cast:f}),l.create("pen0",{cast:d}),l.create("pen1",{cast:d}),l.create("pen2",{cast:d}),l.create("pen3",{cast:d}),l.create("pen4",{cast:d}),l.create("pen5",{cast:d}),l.create("pen6",{cast:d}),l.create("pen7",{cast:d});var u=new c("SVG",["class","width","height","viewBox","preserveAspectRatio"]);Object.defineProperty(this,"$",{value:u.$,writable:!1,enumerable:!1,configurable:!1}),new a({A:{obj:s,name:"visible"},B:{action:function(n){t(u,"hide",n)}}}),new a({A:{obj:s,name:"animate"},B:{action:function(n){o(u,"animate",n)}}}),new a({A:{obj:s,name:"flipH"},B:{action:function(n){o(u,"flipH",n)}}}),new a({A:{obj:s,name:"flipV"},B:{action:function(n){o(u,"flipV",n)}}}),l.on("content",function(n){try{g.onContentChanged.call(s,n)}catch(n){console.error('Exception in function behind "onContentChanged" of module "mod/tfw.view.icon.js" for attribute "content"!  '),console.error(n)}}),l.on("pen0",function(n){try{g.onPen0Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen0Changed" of module "mod/tfw.view.icon.js" for attribute "pen0"!  '),console.error(n)}}),l.on("pen1",function(n){try{g.onPen1Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen1Changed" of module "mod/tfw.view.icon.js" for attribute "pen1"!  '),console.error(n)}}),l.on("pen2",function(n){try{g.onPen2Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen2Changed" of module "mod/tfw.view.icon.js" for attribute "pen2"!  '),console.error(n)}}),l.on("pen3",function(n){try{g.onPen3Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen3Changed" of module "mod/tfw.view.icon.js" for attribute "pen3"!  '),console.error(n)}}),l.on("pen4",function(n){try{g.onPen3Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen3Changed" of module "mod/tfw.view.icon.js" for attribute "pen4"!  '),console.error(n)}}),l.on("pen5",function(n){try{g.onPen4Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen4Changed" of module "mod/tfw.view.icon.js" for attribute "pen5"!  '),console.error(n)}}),l.on("pen6",function(n){try{g.onPen6Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen6Changed" of module "mod/tfw.view.icon.js" for attribute "pen6"!  '),console.error(n)}}),l.on("pen7",function(n){try{g.onPen7Changed.call(s,n)}catch(n){console.error('Exception in function behind "onPen7Changed" of module "mod/tfw.view.icon.js" for attribute "pen7"!  '),console.error(n)}}),l.on("size",function(n){u.$.style.width=n}),l.on("size",function(n){u.$.style.height=n}),u.class="tfw-view-icon",u.width="100%",u.height="100%",u.viewBox="-65 -65 130 130",u.preserveAspectRatio="xMidYMid meet",this.visible=e(n,"visible",!0),this.content=e(n,"content","ok"),this.size=e(n,"size",28),this.animate=e(n,"animate",!1),this.flipH=e(n,"flipH",!1),this.flipV=e(n,"flipV",!1),this.pen0=e(n,"pen0",0),this.pen1=e(n,"pen1",1),this.pen2=e(n,"pen2","P"),this.pen3=e(n,"pen3","PD"),this.pen4=e(n,"pen4","PL"),this.pen5=e(n,"pen5","S"),this.pen6=e(n,"pen6","SD"),this.pen7=e(n,"pen7","SL"),i.addClass(this,"view","custom")}catch(n){throw console.error("mod/tfw.view.icon.js",n),Error('Instantiation error in XJS of "mod/tfw.view.icon.js":\n'+n)}}}()}catch(n){throw Error('Definition error in XJS of "mod/tfw.view.icon.js"\n'+n)}e.exports._=d});
//# sourceMappingURL=tfw.view.icon.js.map
require("tfw.binding.converters",function(r,n,t){function e(r){if("number"==typeof r)return r+"px";if("auto"===(r=(""+r).trim().toLowerCase())||"inherit"===r)return r;var n=L.exec(r);if(!n)return"0";var t=parseFloat(n[1]);if(isNaN(t))return"0";var e=n[2];return e.length<1&&(e="px"),t+e}function i(r){switch(typeof r){case"string":if(0===r.trim().length)return C;var n=new RegExp(r);return function(r){return n.test(r)};case"function":return function(n){return s(r(n))}}return C}function u(r){return Array.isArray(r)?r.map(e):[]}function o(r){switch(typeof r){case"string":return"true"===r.trim().toLowerCase();case"number":return 0!==r;default:return!!r}}function a(r){if(!r)return[];var n=[];for(var t in r)n.push(t);return n}function f(r){return a(r).sort()}function s(r){return Array.isArray(r)?r.map(o):[]}function c(r){return"string"!=typeof r?"#000":N.instance.parse(r)?N.instance.stringify():"#000"}function l(r){return!o(r)}function y(r){return d.isList(r)?r.slice():Array.isArray(r)?r:[r]}function p(r){return r&&"number"==typeof r.length?r.length:0}function g(r){return!r||("string"==typeof r?0===r.trim().length:"number"==typeof r.length&&0===r.length)}function v(r){return Array.isArray(r)?r.map(function(r){return""+r}):[]}function m(r){if(!Array.isArray(r)&&"object"!=typeof r){var n={};return n[w.lang()]=""+r,n}return r}function b(r){if("string"==typeof r)return r;if(void 0===r)return"";if(null===r)return"";var n=r[w.lang()];if(!n)for(var t in r){n=r[t];break}return"string"!=typeof n?"":n}function h(r){return d.isList(r)?r:new d(y(r))}var A=function(){function n(){return e(t,arguments)}var t={en:{},fr:{}},e=r("$").intl;return n.all=t,n}(),w=r("$"),d=r("tfw.binding.list"),N=r("tfw.color"),x={boolean:o,booleans:s,color:c,multilang:m,intl:b,not:l,keys:a,sortedKeys:f,strings:v,string:function(r){return null===r||void 0===r?"":"object"==typeof r?Array.isArray(r)?JSON.stringify(r):b(r):""+r},integer:function(r){return"number"==typeof r?function(n){var t=parseInt(n);return isNaN(t)?r:t}:parseInt},float:function(r){return"number"==typeof r?function(n){var t=parseFloat(n);return isNaN(t)?r:t}:parseFloat},enum:function(r){var n=r.map(function(r){return r.toLowerCase()});return function(t){var e=Math.max(0,n.indexOf((""+t).toLowerCase()));return r[e]}},array:y,list:h,unit:e,units:u,length:p,isEmpty:g,isNotEmpty:g,validator:i};t.get=function(r){return x[r]},t.set=function(r,n){"function"==typeof n?x[r]=n:delete x[r]};var L=/^(-?[.0-9]+)[ \n\r]*([a-z%]*)/,C=function(){return!0};n.exports._=A});
//# sourceMappingURL=tfw.binding.converters.js.map
require("tfw.color",function(t,s,r){function n(){var t=this.R,s=this.G,r=this.B,n=Math.min(t,s,r),i=Math.max(t,s,r),e=i-n;this.L=.5*(i+n),e<1e-6?(this.H=0,this.S=0):(this.S=e/(1-Math.abs(2*this.L-1)),this.H=i===t?s>=r?g*((s-r)/e):1-g*((r-s)/e):i===s?g*(2+(r-t)/e):g*(4+(t-s)/e))}function i(){var t,s,r,n=6*this.H,i=this.S,e=this.L,a=(1-Math.abs(2*e-1))*i,h=a*(1-Math.abs(n%2-1));n<3?n<1?(t=a,s=h,r=0):n<2?(t=h,s=a,r=0):(t=0,s=a,r=h):n<4?(t=0,s=h,r=a):n<5?(t=h,s=0,r=a):(t=a,s=0,r=h);var u=e-.5*a;this.R=t+u,this.G=s+u,this.B=r+u}function e(){return.2126*this.R+.7152*this.G+.0722*this.B}function a(){var t="#"+f(255*this.R)+f(255*this.G)+f(255*this.B);return this.A<1&&(t+=f(255*this.A)),t}function h(t){"string"!=typeof t&&(t="#000");var s=t.trim().toUpperCase();return!!u.call(this,s)||(!!p.call(this,s)||(!!c.call(this,s)||!!o.call(this,s)))}function u(t){if("#"!==t.charAt(0))return!1;var s=0,r=0,n=0,i=1;switch(t.length){case 4:s=parseInt(t.charAt(1),16)*w,r=parseInt(t.charAt(2),16)*w,n=parseInt(t.charAt(3),16)*w;break;case 5:s=parseInt(t.charAt(1),16)*w,r=parseInt(t.charAt(2),16)*w,n=parseInt(t.charAt(3),16)*w,i=parseInt(t.charAt(4),16)*w;break;case 7:s=parseInt(t.substr(1,2),16)*H,r=parseInt(t.substr(3,2),16)*H,n=parseInt(t.substr(5,2),16)*H;break;case 9:s=parseInt(t.substr(1,2),16)*H,r=parseInt(t.substr(3,2),16)*H,n=parseInt(t.substr(5,2),16)*H,i=parseInt(t.substr(7,2),16)*H}return isNaN(s)||isNaN(r)||isNaN(n)||isNaN(i)?this.R=this.G=this.B=this.A=0:(this.R=s,this.G=r,this.B=n,this.A=i),!0}function p(t){var s=N.exec(t);return!!s&&(this.R=v(parseInt(s[1])*H),this.G=v(parseInt(s[2])*H),this.B=v(parseInt(s[3])*H),this.A=1,!0)}function c(t){var s=m.exec(t);return!!s&&(this.R=v(parseInt(s[1])*H),this.G=v(parseInt(s[2])*H),this.B=v(parseInt(s[3])*H),this.A=v(parseFloat(s[4])),!0)}function o(t){var s=x.exec(t);return!!s&&(this.H=v(parseInt(s[1])*L),this.S=v(parseInt(s[2])*S),this.L=v(parseInt(s[3])*S),this.A=1,this.hsl2rgb(),!0)}function f(t){var s=Math.floor(t).toString(16);return s.length<2&&(s="0"+s),s}function I(){var t=new b;return t.R=this.R,t.G=this.G,t.B=this.B,t.A=this.A,t.H=this.H,t.S=this.S,t.L=this.L,t}function l(t,s,r){var n=new b;return n.R=t,n.G=t,n.B=t,n}function A(t,s,r,n){var i=new b;return i.R=t,i.G=t,i.B=t,i.A=t,i}function v(t){return t<0?0:t>1?1:t}function B(t){var s=new b;return s.parse(t),s}function G(t){return B(t).luminance()}var R=function(){function s(){return n(r,arguments)}var r={en:{},fr:{}},n=t("$").intl;return s.all=r,s}(),b=function(t){this.R=0,this.G=0,this.B=0,this.A=0,this.H=0,this.S=0,this.L=0,"string"==typeof t&&this.parse(t)};s.exports=b,b.prototype.luminance=e,b.prototype.stringify=a,b.prototype.parse=h,b.prototype.copy=I,b.prototype.hsl2rgb=i,b.prototype.rgb2hsl=n;var y=new b;b.instance=y,b.parse=B,b.luminance=G,b.newRGB=l,b.newRGBA=A;var g=1/6,w=1/15,S=1/99,H=1/255,L=1/359,N=/^RGB[\s\(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/,m=/^RGBA[\s\(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9\.]+([0-9\.]+)/,x=/^HSL[\s\(]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/;s.exports._=R});
//# sourceMappingURL=tfw.color.js.map
require("tfw.binding.list",function(r,t,e){function i(r,t){if(r.length<2)return!0;for(var e,i=r[0],n=1;n<r.length;n++){if(e=r[n],t(i,e)>0)return!1;i=e}return!0}function n(r){return!!r&&"number"==typeof r[u]}function o(r,t,e){Object.defineProperty(r,t,{value:e,writable:!1,configurable:!1,enumerable:!0})}var s=function(){function t(){return i(e,arguments)}var e={en:{},fr:{}},i=r("$").intl;return t.all=e,t}(),a=r("tfw.binding.property-manager"),f=r("tfw.listeners"),u="__tfw.binding.list__",h=1,p=function(r){o(this,u,h++),o(this,"_listeners",new f),o(this,"_links",[]),o(this,"isContentChangeAware",!0),Array.isArray(r)?o(this,"_array",r):n(r)?(o(this,"_array",r._array),this.link(r)):o(this,"_array",[r])};t.exports=p,p.isList=n,p.prototype.fire=function(r,t,e){var i=this[u];Array.isArray(e)?-1===e.indexOf(i)&&e.push(i):e=[i],this._listeners.fire(r,t,e),this._links.forEach(function(i){e.indexOf(i[u])>-1||i.fire(r,t,e)});var n=a.getProperties(this);Array.isArray(n)&&n.forEach(function(r){r.manager.fire(r.name)})},p.prototype.addListener=function(r){this._listeners.add(r)},p.prototype.removeListener=function(r){this._listeners.remove(r)},p.prototype.link=function(r){if(!n(r))throw console.error("Argument: ",r),Error("[tfw.binding.list.link] Argument must be a tfw.binding.list object!");-1===this._links.indexOf(r)&&(this._links.push(r),r.link(this))},p.prototype.unlink=function(r){var t=this._links.indexOf(r);-1!==t&&(this._links.splice(t,1),r.unlink(this))},p.prototype.get=function(r){return this._array[r]},p.prototype.put=function(r,t){var e=this._array[r];return e!==t&&(this._array[r]=t,this.fire("put",{index:r,oldValue:e,newValue:t}),!0)},p.prototype.remove=function(r){var t=this._array.indexOf(r);return-1!==t&&(this._array.splice(t,1),this.fire("remove",{elem:r,index:t}),!0)},p.prototype.removeAt=function(r){var t=this._array[r];return this._array.splice(r,1),this.fire("remove",{elem:t,index:r}),!0},p.prototype.mapInPlace=function(r){var t=this;return this._Array.forEach(function(e,i){var n=r(e);t.put(i,n)}),this};var l=function(r,t){return r==t?0:r<t?-1:1};p.prototype.sort=function(r){return"function"!=typeof r&&(r=l),i(this._array,r)?this:(this._array.sort(r),this.fire("sort",r),this)},["push","pop","shift","unshift","splice","reverse"].forEach(function(r){p.prototype[r]=function(){var t=Array.prototype.slice.call(arguments),e=Array.prototype[r].apply(this._array,t);return this.fire(r,t),e}}),["slice","forEach","filter","map","reduce","indexOf","lastIndexOf"].forEach(function(r){p.prototype[r]=function(){var t=Array.prototype.slice.call(arguments);return Array.prototype[r].apply(this._array,t)}}),Object.defineProperty(p.prototype,"length",{get:function(){return this._array.length},set:function(r){this._array.length=r,this.fire("length",r)},configurable:!1,enumerable:!0}),t.exports._=s});
//# sourceMappingURL=tfw.binding.list.js.map
require("tfw.listeners",function(t,r,i){var n=function(){function r(){return n(i,arguments)}var i={en:{}},n=t("$").intl;return r.all=i,r}(),e=function(){this._list=[]};e.prototype.add=function(t,r){if("function"!=typeof t)return!1;this.remove(t);for(var i=0;i<this._list.length;i++)if(t===this._list[i])return!1;return this._list.push([t,r]),!0},e.prototype.remove=function(t,r){if("function"!=typeof t)return!1;for(var i=0;i<this._list.length;i++){var n=this._list[i];if(t===n[0]&&r===n[1])return this._list.splice(i,1),!0}return!1},e.prototype.clear=function(){this._list=[]},e.prototype.fire=function(){var t,r,i,n,e=Array.prototype.slice.call(arguments);for(t=0;t<this._list.length;t++)if(n=this._list[t],r=n[0],i=n[1],!1===r.apply(i,e))return!1;return!0},r.exports=e,r.exports._=n});
//# sourceMappingURL=tfw.listeners.js.map
require("tfw.binding.property-manager",function(t,e,r){function n(t){Object.defineProperty(this,"id",{value:g++,writable:!1,configurable:!1,enumerable:!0}),this.name=this.id,this._props={},this._container=t}function i(t,e){var r=this,n={value:void 0,event:new d,filter:v(e.filter),converter:v(e.converter),delay:p(e.delay),action:null,alwaysFired:!!e.alwaysFired,manager:this,name:t,timeout:0};return n.get=o(n,e),n.set=a(n,e,r,t),this._props[t]=n,void 0!==e.init&&n.set(e.init),Object.defineProperty(this._container,t,{get:n.get.bind(n),set:r.change.bind(r,t),enumerable:!0,configurable:!1}),n}function o(t,e){return"function"==typeof e.get?function(r){var n=e.get(r);return u(t,n),n}:function(e){return t.value}}function a(t,e,r,n){return"function"==typeof e.cast?"function"==typeof e.set?function(n){f(t,t.get());var i=e.cast(n,r);u(t,t.value),e.set(i)}:function(n){f(t,t.get()),t.value=e.cast(n,r),u(t,t.value)}:"function"==typeof e.set?e.set:function(e){f(t,t.get()),t.value=e,u(t,t.value)}}function u(t,e){if(void 0!==e&&null!==e&&!0===e.isContentChangeAware){var r=e[m];Array.isArray(r)?-1===r.indexOf(t)&&r.push(t):r=[t],e[m]=r}}function f(t,e){if(void 0!==e&&null!==e&&!0===e.isContentChangeAware){var r=e[m];if(Array.isArray(r)){var n=r.indexOf(t);-1!==n&&r.splice(n,1)}}}function c(t,e){t.delay?(clearTimeout(t.timeout),t.timeout=setTimeout(e,t.delay)):e()}function s(t,e){throw e=void 0===e?"":"::"+e,Error("[tfw.binding.property-manager"+e+"] "+t)}function p(t){return"number"!=typeof t?0:isNaN(t)?0:Math.max(0,Math.floor(t))}function v(t){if("function"==typeof t)return t}function y(t,e){return t!==e}var l=function(){function e(){return n(r,arguments)}var r={en:{},fr:{}},n=t("$").intl;return e.all=r,e}(),d=t("tfw.event"),g=0,h="__tfw.property-manager__",m="__tfw.binding.property-manager__";n.prototype.set=function(t,e){this.create(t).set(e)},n.prototype.get=function(t){return this.create(t).get()},n.prototype.propertyId=function(t){return this.create(t).id},n.prototype.fire=function(t,e){var r=this.create(t);r.event.fire(r.get(),t,this._container,e)},n.prototype.change=function(t,e,r){void 0===r&&(r=[]);var n=this.create(t),i=n.converter;"function"==typeof i&&(e=i(e));var o=n.get();if(n.alwaysFired||y(e,o)){n.set(e);var a=this;c(n,function(){a.fire(t,r)})}},n.prototype.converter=function(t,e){var r=this.create(t);if("function"==typeof e)r.converter=e;else if(void 0!==e)throw Error("[tfw.binding.property-manager::converter] `converter` must be of type function or undefined!");return r.converter},n.prototype.delay=function(t,e){var r=this.create(t);if(e=parseFloat(e),isNaN(e))return r.delay;r.delay=e},n.prototype.on=function(t,e){this.create(t).event.add(e)},n.prototype.off=function(t,e){this.create(t).event.remove(e)},e.exports=function(t){void 0===t&&s("Argument `container` is mandatory!");var e=t[h];return e||(e=new n(t),t[h]=e),e},e.exports.isLinkable=function(t,e){return void 0!==t[h]&&("string"!=typeof e||void 0!==t[h]._props[e])},e.exports.getAllAttributesNames=function(t){return void 0===t[h]?[]:Object.keys(t[h]._props)},e.exports.getProperties=function(t){var e=t[m];return Array.isArray(e)?e:null},n.prototype.create=function(t,e){"string"!=typeof t&&s("propertyName must be a string!");var r=this._props[t];return r||(void 0===e&&(e={}),r=i.call(this,t,e)),r},n.prototype.createAction=function(t,e){return void 0===e&&(e={}),e.alwaysFired=!0,this.create(t,e)},e.exports._=l});
//# sourceMappingURL=tfw.binding.property-manager.js.map
require("tfw.event",function(t,r,i){var n=function(){function r(){return n(i,arguments)}var i={en:{},fr:{}},n=t("$").intl;return r.all=i,r}(),e=function(){this._list=[]};e.prototype.add=function(t){if("function"!=typeof t)return!1;this.remove(t);for(var r=0;r<this._list.length;r++)if(t===this._list)return!1;return this._list.push(t),!0},e.prototype.remove=function(t){if("function"!=typeof t)return!1;for(var r=0;r<this._list.length;r++){if(t===this._list)return this._list.splice(r,1),!0}return!1},e.prototype.clear=function(){this._list=[]},e.prototype.fire=function(){var t,r,i=Array.prototype.slice.call(arguments);for(t=0;t<this._list.length;t++)if(r=this._list[t],!1===r.apply(r,i))return!1;return!0},r.exports=e,r.exports._=n});
//# sourceMappingURL=tfw.event.js.map
require("tfw.view",function(t,e,n){function r(t){return-1!==v.indexOf(t.toLowerCase())?f.svg(t):f.tag(t)}function a(t){var e=this,n=null;l(this).create("value",{get:function(){return n},set:function(e){t.value=e,n=e}}),t.addEventListener("input",function(t){l(e).change("value",t.target.value)},!1)}function i(t){var e=this;l(this).create("focus",{cast:h.get("boolean")(),delay:1}),l(this).on("focus",function(e){e?t.focus():t.blur()}),t.addEventListener("focus",function(){e.focus=!0},!1),t.addEventListener("blur",function(){e.focus=!1},!1)}function o(t){["textContent","textcontent"].forEach(function(e){l(this).create(e,{get:function(){return t.textContent},set:function(e){t.textContent=e}})},this)}function c(t){["innerHTML","innerhtml"].forEach(function(e){l(this).create(e,{get:function(){return t.innerHTML},set:function(e){t.innerHTML=e}})},this)}function s(t,e){l(this).create(e,{get:function(){return t.getAttribute(e)},set:function(n){t.setAttribute(e,n)}})}var u=function(){function e(){return r(n,arguments)}var n={en:{},fr:{}},r=t("$").intl;return e.all=n,e}(),f=t("dom"),l=t("tfw.binding.property-manager"),p=t("external.hammer"),h=t("tfw.binding.converters");n.Tag=function(t,e){t=t.trim().toLowerCase();var n="svg"===t?f.svgRoot():r(t);if(Object.defineProperty(this,"$",{value:n,writable:!1,enumerable:!0,configurable:!1}),Array.isArray(e)){var u=this;e.forEach(function(t){switch(t.toLowerCase()){case"value":a.call(u,n);break;case"focus":i.call(u,n);break;case"textcontent":o.call(u,n);break;case"innerhtml":c.call(u,n);break;default:s.call(u,n,t)}})}};var v=["g","rect","circle","line","path","defs"];n.Tag.prototype.applyClass=function(t,e){var n=this.$;void 0===e&&(e=0),void 0===this._applyer&&(this._applyer={}),Array.isArray(t)||(t=[t]);var r=this._applyer[e];Array.isArray(r)&&r.forEach(f.removeClass.bind(f,n)),this._applyer[e]=t,t.forEach(f.addClass.bind(f,n))},n.ensureCodeBehind=function(t){if(void 0===t)throw"Missing mandatory global variable CODE_BEHIND!";var e,n;for(e=1;e<arguments.length;e++)if(n=arguments[e],"function"!=typeof t[n])throw"Expected CODE_BEHIND."+n+" to be a function!"};var d=["tap","doubletap","press","pan","panstart","panmove","panup","pandown","panleft","panright","panend","pancancel","swipe","swipeleft","swipteright","swipetop","swipebottom","pinch","pinchin","pinchout","pinchstart","pinchmove","pinchend","pinchcancel","rotate","rotatestart","rotatemove","rotateend","rotatecancel"];n.events=function(t,e){var n=f(t),r={},a=0;if(Object.keys(e).forEach(function(t){t=t.toLowerCase();var i=e[t];d.indexOf(t)>-1?(r[t]=i,a=!0):n.addEventListener(t,i,!1)}),a){var i=new p(n);Object.keys(r).forEach(function(t){var n=e[t];i.on(t,n)})}},e.exports._=u});
//# sourceMappingURL=tfw.view.js.map
require("external.hammer",function(t,e,n){var i=function(){function e(){return i(n,arguments)}var n={en:{},fr:{}},i=t("$").intl;return e.all=n,e}();!function(t,n,i,r){"use strict";function s(t,e,n){return setTimeout(c(t,n),e)}function o(t,e,n){return!!Array.isArray(t)&&(a(t,n[e],n),!0)}function a(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==r)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function h(e,n,i){var r="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=t.console&&(t.console.warn||t.console.log);return s&&s.call(t.console,r,i),e.apply(this,arguments)}}function u(t,e,n){var i,r=e.prototype;i=t.prototype=Object.create(r),i.constructor=t,i._super=r,n&&lt(i,n)}function c(t,e){return function(){return t.apply(e,arguments)}}function l(t,e){return typeof t==vt?t.apply(e?e[0]||r:r,e):t}function p(t,e){return t===r?e:t}function f(t,e,n){a(g(e),function(e){t.addEventListener(e,n,!1)})}function v(t,e,n){a(g(e),function(e){t.removeEventListener(e,n,!1)})}function d(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function g(t){return t.trim().split(/\s+/g)}function T(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function y(t){return Array.prototype.slice.call(t,0)}function E(t,e,n){for(var i=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];T(r,o)<0&&i.push(t[s]),r[s]=o,s++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function I(t,e){for(var n,i,s=e[0].toUpperCase()+e.slice(1),o=0;o<pt.length;){if(n=pt[o],(i=n?n+s:e)in t)return i;o++}return r}function A(){return Et++}function _(e){var n=e.ownerDocument||e;return n.defaultView||n.parentWindow||t}function C(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){l(t.options.enable,[t])&&n.handler(e)},this.init()}function S(t){var e=t.options.inputClass;return new(e||(_t?q:Ct?k:At?U:F))(t,b)}function b(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,s=e&xt&&i-r==0,o=e&(wt|Ot)&&i-r==0;n.isFirst=!!s,n.isFinal=!!o,s&&(t.session={}),n.eventType=e,P(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function P(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=w(e)),r>1&&!n.firstMultiple?n.firstMultiple=w(e):1===r&&(n.firstMultiple=!1);var s=n.firstInput,o=n.firstMultiple,a=o?o.center:s.center,h=e.center=O(i);e.timeStamp=gt(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=N(a,h),e.distance=z(a,h),x(n,e),e.offsetDirection=M(e.deltaX,e.deltaY);var u=R(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=u.x,e.overallVelocityY=u.y,e.overallVelocity=mt(u.x)>mt(u.y)?u.x:u.y,e.scale=o?Y(o.pointers,i):1,e.rotation=o?X(o.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,D(n,e);var c=t.element;d(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}function x(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==xt&&s.eventType!==wt||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}function D(t,e){var n,i,s,o,a=t.lastInterval||e,h=e.timeStamp-a.timeStamp;if(e.eventType!=Ot&&(h>Pt||a.velocity===r)){var u=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,l=R(h,u,c);i=l.x,s=l.y,n=mt(l.x)>mt(l.y)?l.x:l.y,o=M(u,c),t.lastInterval=e}else n=a.velocity,i=a.velocityX,s=a.velocityY,o=a.direction;e.velocity=n,e.velocityX=i,e.velocityY=s,e.direction=o}function w(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:dt(t.pointers[n].clientX),clientY:dt(t.pointers[n].clientY)},n++;return{timeStamp:gt(),pointers:e,center:O(e),deltaX:t.deltaX,deltaY:t.deltaY}}function O(t){var e=t.length;if(1===e)return{x:dt(t[0].clientX),y:dt(t[0].clientY)};for(var n=0,i=0,r=0;e>r;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:dt(n/e),y:dt(i/e)}}function R(t,e,n){return{x:e/t||0,y:n/t||0}}function M(t,e){return t===e?Rt:mt(t)>=mt(e)?0>t?Mt:zt:0>e?Nt:Xt}function z(t,e,n){n||(n=Wt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function N(t,e,n){n||(n=Wt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}function X(t,e){return N(e[1],e[0],Ht)+N(t[1],t[0],Ht)}function Y(t,e){return z(e[0],e[1],Ht)/z(t[0],t[1],Ht)}function F(){this.evEl=Lt,this.evWin=Ut,this.pressed=!1,C.apply(this,arguments)}function q(){this.evEl=Gt,this.evWin=Zt,C.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function W(){this.evTarget=$t,this.evWin=Jt,this.started=!1,C.apply(this,arguments)}function H(t,e){var n=y(t.touches),i=y(t.changedTouches);return e&(wt|Ot)&&(n=E(n.concat(i),"identifier",!0)),[n,i]}function k(){this.evTarget=Qt,this.targetIds={},C.apply(this,arguments)}function L(t,e){var n=y(t.touches),i=this.targetIds;if(e&(xt|Dt)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,s,o=y(t.changedTouches),a=[],h=this.target;if(s=n.filter(function(t){return d(t.target,h)}),e===xt)for(r=0;r<s.length;)i[s[r].identifier]=!0,r++;for(r=0;r<o.length;)i[o[r].identifier]&&a.push(o[r]),e&(wt|Ot)&&delete i[o[r].identifier],r++;return a.length?[E(s.concat(a),"identifier",!0),a]:void 0}function U(){C.apply(this,arguments);var t=c(this.handler,this);this.touch=new k(this.manager,t),this.mouse=new F(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function V(t,e){t&xt?(this.primaryTouch=e.changedPointers[0].identifier,j.call(this,e)):t&(wt|Ot)&&j.call(this,e)}function j(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches,r=function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)};setTimeout(r,te)}}function G(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],s=Math.abs(e-r.x),o=Math.abs(n-r.y);if(ee>=s&&ee>=o)return!0}return!1}function Z(t,e){this.manager=t,this.set(e)}function B(t){if(m(t,ae))return ae;var e=m(t,he),n=m(t,ue);return e&&n?ae:e||n?e?he:ue:m(t,oe)?oe:se}function $(t){this.options=lt({},this.defaults,t||{}),this.id=A(),this.manager=null,this.options.enable=p(this.options.enable,!0),this.state=le,this.simultaneous={},this.requireFail=[]}function J(t){return t&me?"cancel":t&ve?"end":t&fe?"move":t&pe?"start":""}function K(t){return t==Xt?"down":t==Nt?"up":t==Mt?"left":t==zt?"right":""}function Q(t,e){var n=e.manager;return n?n.get(t):t}function tt(){$.apply(this,arguments)}function et(){tt.apply(this,arguments),this.pX=null,this.pY=null}function nt(){tt.apply(this,arguments)}function it(){$.apply(this,arguments),this._timer=null,this._input=null}function rt(){tt.apply(this,arguments)}function st(){tt.apply(this,arguments)}function ot(){$.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function at(t,e){return e=e||{},e.recognizers=p(e.recognizers,at.defaults.preset),new ht(t,e)}function ht(t,e){this.options=lt({},at.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=S(this),this.touchAction=new Z(this,this.options.touchAction),ut(this,!0),a(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ut(t,e){var n=t.element;if(n.style){var i;a(t.options.cssProps,function(r,s){i=I(n.style,s),e?(t.oldCssProps[i]=n.style[i],n.style[i]=r):n.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={})}}function ct(t,e){var i=n.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}var lt,pt=["","webkit","Moz","MS","ms","o"],ft=n.createElement("div"),vt="function",dt=Math.round,mt=Math.abs,gt=Date.now;lt="function"!=typeof Object.assign?function(t){if(t===r||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==r&&null!==i)for(var s in i)i.hasOwnProperty(s)&&(e[s]=i[s])}return e}:Object.assign;var Tt=h(function(t,e,n){for(var i=Object.keys(e),s=0;s<i.length;)(!n||n&&t[i[s]]===r)&&(t[i[s]]=e[i[s]]),s++;return t},"extend","Use `assign`."),yt=h(function(t,e){return Tt(t,e,!0)},"merge","Use `assign`."),Et=1,It=/mobile|tablet|ip(ad|hone|od)|android/i,At="ontouchstart"in t,_t=I(t,"PointerEvent")!==r,Ct=At&&It.test(navigator.userAgent),St="touch",bt="mouse",Pt=25,xt=1,Dt=2,wt=4,Ot=8,Rt=1,Mt=2,zt=4,Nt=8,Xt=16,Yt=Mt|zt,Ft=Nt|Xt,qt=Yt|Ft,Wt=["x","y"],Ht=["clientX","clientY"];C.prototype={handler:function(){},init:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(_(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&v(this.element,this.evEl,this.domHandler),this.evTarget&&v(this.target,this.evTarget,this.domHandler),this.evWin&&v(_(this.element),this.evWin,this.domHandler)}};var kt={mousedown:xt,mousemove:Dt,mouseup:wt},Lt="mousedown",Ut="mousemove mouseup";u(F,C,{handler:function(t){var e=kt[t.type];e&xt&&0===t.button&&(this.pressed=!0),e&Dt&&1!==t.which&&(e=wt),this.pressed&&(e&wt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:bt,srcEvent:t}))}});var Vt={pointerdown:xt,pointermove:Dt,pointerup:wt,pointercancel:Ot,pointerout:Ot},jt={2:St,3:"pen",4:bt,5:"kinect"},Gt="pointerdown",Zt="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Gt="MSPointerDown",Zt="MSPointerMove MSPointerUp MSPointerCancel"),u(q,C,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=Vt[i],s=jt[t.pointerType]||t.pointerType,o=s==St,a=T(e,t.pointerId,"pointerId");r&xt&&(0===t.button||o)?0>a&&(e.push(t),a=e.length-1):r&(wt|Ot)&&(n=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var Bt={touchstart:xt,touchmove:Dt,touchend:wt,touchcancel:Ot},$t="touchstart",Jt="touchstart touchmove touchend touchcancel";u(W,C,{handler:function(t){var e=Bt[t.type];if(e===xt&&(this.started=!0),this.started){var n=H.call(this,t,e);e&(wt|Ot)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:St,srcEvent:t})}}});var Kt={touchstart:xt,touchmove:Dt,touchend:wt,touchcancel:Ot},Qt="touchstart touchmove touchend touchcancel";u(k,C,{handler:function(t){var e=Kt[t.type],n=L.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:St,srcEvent:t})}});var te=2500,ee=25;u(U,C,{handler:function(t,e,n){var i=n.pointerType==St,r=n.pointerType==bt;if(!(r&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)V.call(this,e,n);else if(r&&G.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ne=I(ft.style,"touchAction"),ie=ne!==r,re="compute",se="auto",oe="manipulation",ae="none",he="pan-x",ue="pan-y",ce=function(){if(!ie)return!1;var e={},n=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){e[i]=!n||t.CSS.supports("touch-action",i)}),e}();Z.prototype={set:function(t){t==re&&(t=this.compute()),ie&&this.manager.element.style&&ce[t]&&(this.manager.element.style[ne]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return a(this.manager.recognizers,function(e){l(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),B(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,r=m(i,ae)&&!ce[ae],s=m(i,ue)&&!ce[ue],o=m(i,he)&&!ce[he];if(r){var a=1===t.pointers.length,h=t.distance<2,u=t.deltaTime<250;if(a&&h&&u)return}return o&&s?void 0:r||s&&n&Yt||o&&n&Ft?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var le=1,pe=2,fe=4,ve=8,de=ve,me=16;$.prototype={defaults:{},set:function(t){return lt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(o(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=Q(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return o(t,"dropRecognizeWith",this)?this:(t=Q(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(o(t,"requireFailure",this))return this;var e=this.requireFail;return t=Q(t,this),-1===T(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(o(t,"dropRequireFailure",this))return this;t=Q(t,this);var e=T(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;ve>i&&e(n.options.event+J(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=ve&&e(n.options.event+J(i))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=32)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|le)))return!1;t++}return!0},recognize:function(t){var e=lt({},t);return l(this.options.enable,[this,e])?(this.state&(de|me|32)&&(this.state=le),this.state=this.process(e),void(this.state&(pe|fe|ve|me)&&this.tryEmit(e))):(this.reset(),void(this.state=32))},process:function(t){},getTouchAction:function(){},reset:function(){}},u(tt,$,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(pe|fe),r=this.attrTest(t);return i&&(n&Ot||!r)?e|me:i||r?n&wt?e|ve:e&pe?e|fe:pe:32}}),u(et,tt,{defaults:{event:"pan",threshold:10,pointers:1,direction:qt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Yt&&e.push(ue),t&Ft&&e.push(he),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&Yt?(r=0===s?Rt:0>s?Mt:zt,n=s!=this.pX,i=Math.abs(t.deltaX)):(r=0===o?Rt:0>o?Nt:Xt,n=o!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return tt.prototype.attrTest.call(this,t)&&(this.state&pe||!(this.state&pe)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=K(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),u(nt,tt,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[ae]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&pe)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),u(it,$,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[se]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(wt|Ot)&&!r)this.reset();else if(t.eventType&xt)this.reset(),this._timer=s(function(){this.state=de,this.tryEmit()},e.time,this);else if(t.eventType&wt)return de;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===de&&(t&&t.eventType&wt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=gt(),this.manager.emit(this.options.event,this._input)))}}),u(rt,tt,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[ae]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&pe)}}),u(st,tt,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Yt|Ft,pointers:1},getTouchAction:function(){return et.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Yt|Ft)?e=t.overallVelocity:n&Yt?e=t.overallVelocityX:n&Ft&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&mt(e)>this.options.velocity&&t.eventType&wt},emit:function(t){var e=K(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),u(ot,$,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[oe]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&xt&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=wt)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||z(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t;if(0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=s(function(){this.state=de,this.tryEmit()},e.interval,this),pe):de}return 32},failTimeout:function(){return this._timer=s(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==de&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),at.VERSION="2.0.8",at.defaults={domEvents:!1,touchAction:re,enable:!0,inputTarget:null,inputClass:null,preset:[[rt,{enable:!1}],[nt,{enable:!1},["rotate"]],[st,{direction:Yt}],[et,{direction:Yt},["swipe"]],[ot],[ot,{event:"doubletap",taps:2},["tap"]],[it]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};ht.prototype={set:function(t){return lt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&de)&&(r=e.curRecognizer=null);for(var s=0;s<i.length;)n=i[s],2===e.stopped||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(pe|fe|ve)&&(r=e.curRecognizer=n),s++}},get:function(t){if(t instanceof $)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(o(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(o(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=T(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==r&&e!==r){var n=this.handlers;return a(g(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==r){var n=this.handlers;return a(g(t),function(t){e?n[t]&&n[t].splice(T(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&ct(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&ut(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},lt(at,{INPUT_START:xt,INPUT_MOVE:Dt,INPUT_END:wt,INPUT_CANCEL:Ot,STATE_POSSIBLE:le,STATE_BEGAN:pe,STATE_CHANGED:fe,STATE_ENDED:ve,STATE_RECOGNIZED:de,STATE_CANCELLED:me,STATE_FAILED:32,DIRECTION_NONE:Rt,DIRECTION_LEFT:Mt,DIRECTION_RIGHT:zt,DIRECTION_UP:Nt,DIRECTION_DOWN:Xt,DIRECTION_HORIZONTAL:Yt,DIRECTION_VERTICAL:Ft,DIRECTION_ALL:qt,Manager:ht,Input:C,TouchAction:Z,TouchInput:k,MouseInput:F,PointerEventInput:q,TouchMouseInput:U,SingleTouchInput:W,Recognizer:$,AttrRecognizer:tt,Tap:ot,Pan:et,Swipe:st,Pinch:nt,Rotate:rt,Press:it,on:f,off:v,each:a,merge:yt,extend:Tt,assign:lt,inherit:u,bindFn:c,prefixed:I}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=at,"function"==typeof define&&define.amd?define(function(){return at}):void 0!==e&&e.exports?e.exports=at:t.Hammer=at}(window,document),e.exports=Hammer,e.exports._=i});
//# sourceMappingURL=external.hammer.js.map
require("dom",function(e,r,t){function n(e,r,t){return Object.defineProperty(e,"element",{value:r,writable:!1,configurable:!1,enumerable:!0}),t?e:(e.on=v.bind(e,r),e.css=i.bind(e,r),e.add=l.bind(e,r),e.att=s.bind(e,r),e.addClass=y.bind(e,r),e.hasClass=h.bind(e,r),e.removeClass=p.bind(e,r),e.toggleClass=g.bind(e,r),e)}function o(e,r){return e=T(e),r=T(r),r.parentNode.replaceChild(e,r),e}function i(e,r){e=T(e);var t,n;for(t in r)n=r[t],e.style[t]=n;return e}function s(e,r,t){e=T(e);var n,o;"string"==typeof r&&(void 0===t&&(t=""),n=r,r={},r[n]=t);for(n in r)o=r[n],e.setAttribute(n,o);return e}function a(e,r){return e=T(e),e.removeAttribute(r),e}function l(e){e=T(e);try{var r,t;for(r=1;r<arguments.length;r++)t=arguments[r],u(e,t)||f(e,t)||c(e,t)||console.error("Argument #"+r+" of dom.add() is invalid!",arguments);return e}catch(e){throw console.error("[DOM.add] arguments=",[].slice.call(arguments)),Error("[DOM.add] "+e)}}function c(e,r){return(r=T(r))instanceof Node&&(e.appendChild(r),!0)}function f(e,r){if("number"==typeof r&&(r=""+r),"string"!=typeof r)return!1;if("<html>"==r.substr(0,6).toLowerCase()){var t=r.substr(6);r=T.tag("span"),r.innerHTML=t}else if(k.test(r)){var n=r;r=T.tag("span"),r.innerHTML=n}else r=document.createTextNode(r);return e.appendChild(r),!0}function u(e,r){return!!Array.isArray(r)&&(r.forEach(function(r){l(e,r)}),!0)}function d(e){if(Array.isArray(e))return e.forEach(function(e){d(e)}),e;if(void 0===e[M])return e;var r=e[M].events;if(void 0===r)return e;r.off(),delete e[M].events}function v(e,r,t){if("function"==typeof r||null===r)r={tap:r};else if("string"==typeof r&&"function"==typeof t){var n={};n[r]=t,r=n}if(Array.isArray(e))return e.forEach(function(e){v(e,r)}),e;e=T(e),void 0===e[M]&&(e[M]={}),void 0===e[M].events&&(e[M].events=new O(e));var o,i,s;for(o in r)i=r[o],"!"==o.charAt(0)?(o=o.substr(1),s=!0):s=!1,D.indexOf(o.toLowerCase())>-1?e.addEventListener(o,i,s):e[M].events.on(o,i,s);return e}function m(e,r){try{var t,n,o,i,s=document.createElementNS(e,r.trim().toLowerCase());for(t=2;t<arguments.length;t++)if(n=arguments[t],Array.isArray(n))n.forEach(function(e){switch(typeof e){case"string":case"number":case"boolean":if(e=""+e,"<html>"==e.substr(0,6)){var r=e.substr(6);e=T.tag("span"),e.innerHTML=r}else e=document.createTextNode(e)}l(s,e)});else switch(typeof n){case"string":n.split(" ").forEach(function(e){e.length>0&&y(s,e)});break;case"object":for(o in n)i=n[o],s.setAttribute(o,i);break;default:throw Error("[dom.tag] Error creating <"+r+">: Invalid argument #"+t+"!")}return s}catch(t){console.error("[dom.tagNS] Error with `ns` = ",e," and `name` = ",r),console.error(t)}}function y(e){var r=[].slice.call(arguments,1);return Array.isArray(e)?(r.unshift(null),e.forEach(function(e){r[0]=e,y.apply(void 0,r)}),e):(e=T(e),r.forEach(function(r){if("string"==typeof r&&(r=r.trim(),0!=r.length))try{e.classList&&e.classList.add(r)}catch(e){console.error("[dom.addClass] Invalid class name: ",r),console.error(e)}}),e)}function h(e,r){return e=T(e),!!e.classList&&e.classList.contains(r)}function p(e){var r=[].slice.call(arguments,1);return Array.isArray(e)?(r.unshift(null),e.forEach(function(e){r[0]=e,p.apply(void 0,r)}),e):(e=T(e),r.forEach(function(r){if("string"==typeof r)try{e.classList&&e.classList.remove(r)}catch(e){console.error("[dom.removeClass] Invalid class name: ",r),console.error(e)}}),e)}function g(e){return[].slice.call(arguments,1).forEach(function(r){h(e,r)?p(e,r):y(e,r)}),e}function w(e){e=T(e);for(var r=e;r.firstChild;)r.removeChild(r.firstChild);var t=[].slice.call(arguments);return t.length>1&&l.apply(this,t),e}function b(e,r){return e=T(e),void 0===r&&(r=e,e=window.document),e.querySelector(r)}function A(e){e=T(e);var r=e.parentElement;return r?(r.removeChild(e),r):r}function E(e){var r=[].slice.call(arguments);r.shift(),0==r.length&&(r=["div"]),r.push("dom","custom");var t;return void 0!==r[0].element?(t=r[0].element,y(t,"dom","custom")):"function"==typeof r[0].appendChild?(t=r[0],y(t,"dom","custom")):t=T.tag.apply(T,r),Object.defineProperty(e,"element",{value:t,writable:!1,configurable:!1,enumerable:!0}),t}function C(e,r){return void 0===r&&(r=""),null===r&&(r=""),"string"!=typeof r&&(r=JSON.stringify(r)),"<html>"==r.substr(0,6)?e.innerHTML=r.substr(6):e.textContent=r,e}function x(e){if(!Array.isArray(e))return x(Array.prototype.slice.call(arguments));e.forEach(function(e){e=T(e),void 0===e[M]&&(e[M]={}),Array.isArray(e[M].style)||(e[M].style=[]),e[M].style.push(JSON.stringify(e.style))})}function L(e){if(!Array.isArray(e))return L(Array.prototype.slice.call(arguments));e.forEach(function(e){if(e=T(e),void 0===e[M]||!Array.isArray(e[M].style))throw Error("[dom.restoreStyle] `saveStyle()` has never been used on this element!");if(0==e[M].style.length)throw Error("[dom.restoreStyle] more `restore` than `save`!");var r,t,n=JSON.parse(e[M].style.pop());for(r in n)void 0!==(t=n[r])&&(e.style[r]=t)})}var N=function(){function r(){return n(t,arguments)}var t={en:{}},n=e("$").intl;return r.all=t,r}();e("polyfill.classList");var S=e("dom.theme"),O=e("tfw.pointer-events"),T=function(e){if(e instanceof Node)return e;if(void 0===e||null===e)throw Error("`dom` is not a valid element!",e);if(e.$ instanceof Node)return e.$;if(e.element instanceof Node)return e.element;if("string"==typeof e){var r=document.getElementById(e);return r||console.error("[dom] There is no DOM element with this ID: `"+e+"`"),r}return"function"==typeof e.element?e.element():e};r.exports=T;var M="@dom"+Date.now(),k=/^&(#[0-9]+|[a-zA-Z0-9]+);$/;T.tagNS=m,T.svgRoot=m.bind(void 0,"http://www.w3.org/2000/svg","svg",{version:"1.1","xmlns:svg":"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),T.svg=m.bind(void 0,"http://www.w3.org/2000/svg"),T.tag=m.bind(void 0,"http://www.w3.org/1999/xhtml"),T.div=m.bind(void 0,"http://www.w3.org/1999/xhtml","div"),T.txt=window.document.createTextNode.bind(window.document),T.textOrHtml=C,T.get=b,T.elem=E,T.css=i,T.att=s,T.removeAtt=a,T.addClass=y,T.hasClass=h,T.removeClass=p,T.toggleClass=g,T.saveStyle=x,T.restoreStyle=L,T.registerTheme=S.register.bind(T),T.applyTheme=S.apply.bind(T),T.replace=o,T.detach=A,T.on=v,T.off=d,T.add=l,T.wrap=n,T.clear=w;var D=["keyup","keydown","scroll","load","error"];r.exports._=N});
//# sourceMappingURL=dom.js.map
require("tfw.pointer-events",function(t,e,o){function a(t){var e=this;this._slots={},this._eventListeners=[],Object.defineProperty(a.prototype,"element",{value:t,writable:!1,configurable:!0,enumerable:!0}),n.call(e,t,"touchstart",function(o){o.preventDefault(),i.touchDevice||(i.touchDevice=!0,document.body.removeEventListener("mousedown",p,!0),document.body.removeEventListener("mousemove",u,!0),document.body.removeEventListener("mouseup",v,!0));var a=e._slots;1==o.touches.length&&(i.rect=t.getBoundingClientRect(),i.bodyMoveX=o.touches[0].clientX,i.bodyMoveY=o.touches[0].clientY,i.bodyDownX=o.touches[0].clientX,i.bodyDownY=o.touches[0].clientY,i.targetX=o.touches[0].clientX-i.rect.left,i.targetY=o.touches[0].clientY-i.rect.top,i.time=Date.now(),a.down&&a.down({action:"down",button:i.bodyButton,target:t,x:i.targetX,y:i.targetY,stopPropagation:o.stopPropagation.bind(o),preventDefault:o.preventDefault.bind(o)}))}),n.call(e,t,"touchmove",function(o){o.preventDefault();var a=i.bodyMoveX,n=i.bodyMoveY;i.bodyMoveX=o.touches[0].clientX,i.bodyMoveY=o.touches[0].clientY;var r=e._slots;r.drag&&r.drag({action:"drag",target:t,x0:i.targetX,y0:i.targetY,x:i.bodyMoveX-i.rect.left,y:i.bodyMoveY-i.rect.top,dx:i.bodyMoveX-i.bodyDownX,dy:i.bodyMoveY-i.bodyDownY,vx:i.bodyMoveX-a,vy:i.bodyMoveY-n,stopPropagation:o.stopPropagation.bind(o),preventDefault:o.preventDefault.bind(o)})}),n.call(e,t,"touchend",function(t){t.preventDefault();var o=e._slots,a=i.bodyMoveX-i.bodyDownX,n=i.bodyMoveY-i.bodyDownY;if(o.up&&o.up({action:"up",target:e.element,x:i.bodyMoveX-i.rect.left,y:i.bodyMoveY-i.rect.top,dx:a,dy:n,stopPropagation:t.stopPropagation.bind(t),preventDefault:t.preventDefault.bind(t)}),a*a+n*n<256){var r=Date.now();i.lastTapTime>0&&(o.doubletap&&r-i.lastTapTime<400?o.doubletap({action:"doubletap",target:i.bodyTarget,x:i.bodyMoveX-i.rect.left,y:i.bodyMoveY-i.rect.top,stopPropagation:t.stopPropagation.bind(t),preventDefault:t.preventDefault.bind(t)}):i.lastTapTime=0),o.tap&&0==i.lastTapTime&&(t.stopPropagation(),t.preventDefault(),o.tap({action:"tap",target:i.bodyTarget,x:i.bodyMoveX-i.rect.left,y:i.bodyMoveY-i.rect.top,stopPropagation:t.stopPropagation.bind(t),preventDefault:t.preventDefault.bind(t)})),i.lastTapTime=r}}),n.call(e,t,"mousedown",function(o){if(!i.touchDevice){var a=e._slots;i.target=e;var n=t.getBoundingClientRect();i.targetX=o.pageX-n.left,i.targetY=o.pageY-n.top,a.down&&a.down({action:"down",button:i.bodyButton,target:i.bodyTarget,x:i.targetX,y:i.targetY,stopPropagation:o.stopPropagation.bind(o),preventDefault:o.preventDefault.bind(o)})}}),n.call(e,t,"mousemove",function(o){var a=e._slots;if(a.move){var n=t.getBoundingClientRect();a.move({target:t,action:"move",x:o.pageX-n.left,y:o.pageY-n.top})}}),Object.defineProperty(this,"element",{value:t,writable:!0,configurable:!0,enumerable:!0})}function n(t,e,o,a){t.addEventListener(e,o,a),this._eventListeners.push([t,e,o,a])}var r=function(){function e(){return a(o,arguments)}var o={en:{}},a=t("$").intl;return e.all=o,e}(),d="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",i={touchDevice:!1,target:null,targetX:0,targetY:0,bodyDownX:0,bodyDownY:0,bodyMoveX:-1,bodyMoveY:-1,bodyMoveLastX:-1,bodyMoveLastY:-1,onDrag:null,lastTapTime:0},p=function(t){i.touchDevice||(i.bodyDownX=t.pageX,i.bodyDownY=t.pageY,i.bodyMoveX=t.pageX,i.bodyMoveY=t.pageY,i.bodyMoveLastX=t.pageX,i.bodyMoveLastY=t.pageY,i.bodyTarget=t.target,i.bodyButton=t.button)},u=function(t){if(!i.touchDevice&&i.target&&(t.stopPropagation(),t.preventDefault(),i.bodyMoveLastX=i.bodyMoveX,i.bodyMoveLastY=i.bodyMoveY,i.bodyMoveX=t.pageX,i.bodyMoveY=t.pageY,i.target)){var e=i.target._slots;"function"==typeof e.drag&&e.drag({action:"drag",target:i.target.element,x0:i.targetX,y0:i.targetY,x:i.targetX+i.bodyMoveX-i.bodyDownX,y:i.targetY+i.bodyMoveY-i.bodyDownY,dx:i.bodyMoveX-i.bodyDownX,dy:i.bodyMoveY-i.bodyDownY,vx:i.bodyMoveX-i.bodyMoveLastX,vy:i.bodyMoveY-i.bodyMoveLastY,button:i.bodyButton})}},v=function(t){if(!i.touchDevice&&i.target){t.stopPropagation(),t.preventDefault();var e=Date.now(),o=i.target._slots,a=t.pageX-i.bodyDownX,n=t.pageY-i.bodyDownY;o.up&&o.up({action:"up",target:i.bodyTarget,x:i.targetX+a,y:i.targetY+n,dx:a,dy:n,button:i.bodyButton,stopPropagation:t.stopPropagation.bind(t),preventDefault:t.preventDefault.bind(t)}),a*a+n*n<1024&&(i.lastTapTime>0&&(o.doubletap&&e-i.lastTapTime<400?o.doubletap({action:"doubletap",target:i.bodyTarget,x:i.targetX+a,y:i.targetY+n}):i.lastTapTime=0),o.tap&&0==i.lastTapTime&&o.tap({action:"tap",target:i.bodyTarget,x:i.targetX+a,y:i.targetY+n}),i.lastTapTime=e),delete i.target}};document.body.addEventListener("mousedown",p,!0),document.body.addEventListener("mousemove",u,!0),document.body.addEventListener("mouseup",v,!0),a.prototype.on=function(t,e){var o=this,a=this._slots;return"function"==typeof e&&(a[t]=e),"wheel"==t&&n.call(o,this.element,d,function(t){t.target=i.bodyTarget,t.action="wheel";var e=o.element.getBoundingClientRect();t.x=t.pageX-e.left,t.y=t.pageY-e.top,t.delta=t.deltaY,a.wheel(t)}),this},a.prototype.off=function(){this._eventListeners.forEach(function(t){var e=t[0],o=t[1],a=t[2],n=t[3];e.removeEventListener(o,a,n)})},e.exports=a,e.exports._=r});
//# sourceMappingURL=tfw.pointer-events.js.map
require("dom.theme",function(t,n,e){function r(t,n){n=s(n);var e=g(t,n);e+=b(t,n),e+=o(t,n);var r=u.css[t];return r||(r=document.createElement("style"),document.getElementsByTagName("head")[0].appendChild(r),u.css[t]=r),r.textContent=e,this}function o(t,n){for(var e="",r=1;r<=10;r++)d.forEach(function(o){for(var g=".thm-bg"+o,b=".thm-fg"+o,i=1;i<=r;i++){for(var s=[],a=[],f=[],m=1;m<=r;m++)f.push(i===m?g:"*"),a.push(i===m?g:"*"),s.push(i===m?b:"*"),m===r&&(f.push(f.pop()+".thm-fg"),s.push(s.pop()+b));e+="body.dom-theme-"+t+" "+f.join(" > ")+" { color: "+n["fg"+o]+" }\n",e+="body.dom-theme-"+t+" "+s.join(" > ")+" { color: "+n["bg"+o]+" }\n",e+="body.dom-theme-"+t+" "+a.join(" > ")+" svg .thm-svg-fill0 { fill: "+n["fg"+o]+" }\n"}});return e}function g(t,n){var e="";return d.forEach(function(r){e+="body.dom-theme-"+t+" .thm-fg"+r+" { color: "+n["fg"+r]+" }\n",e+="body.dom-theme-"+t+" .thm-bg"+r+" { background-color: "+n["bg"+r]+" }\n",e+="body.dom-theme-"+t+" .thm-bg"+r+"-bottom { background: linear-gradient(to top,"+n["bg"+r]+",transparent) }\n",e+="body.dom-theme-"+t+" .thm-bg"+r+"-top { background: linear-gradient(to bottom,"+n["bg"+r]+",transparent) }\n",e+="body.dom-theme-"+t+" .thm-bg"+r+"-left { background: linear-gradient(to right,"+n["bg"+r]+",transparent) }\n",e+="body.dom-theme-"+t+" .thm-bg"+r+"-right { background: linear-gradient(to left,"+n["bg"+r]+",transparent) }\n",isNaN(parseInt(r))&&(e+="body.dom-theme-"+t+" svg .thm-svg-fill"+r+" { fill: "+n["bg"+r]+" }\n")}),e}function b(t,n){var e=h.luminance(n.bg2),r=e<.6?"#fff"+Math.ceil(10*e):"#0006",o="";return[0,1,2,3,4,6,8,9,12,16,24].forEach(function(n){o+="body.dom-theme-"+t+" .thm-ele"+n+" {\n  box-shadow: 0 "+n+"px "+2*n+"px "+r+";\n  transition: box-shadow .2s;\n}\n"}),o}function i(t,n){if(void 0===n&&(n=document.body),!u.css[t])return void console.error("This theme has not been registered: ",t);var e=document.body;"string"==typeof u.current&&this.removeClass(e,"dom-theme-"+u.current),u.current=t,this.addClass(e,"dom-theme-"+u.current)}function s(t){return void 0===t&&(t={}),"string"!=typeof t.bg0&&(t.bg0="#E0E0E0"),"string"!=typeof t.bg1&&(t.bg1="#F5F5F5"),"string"!=typeof t.bg2&&(t.bg2="#FAFAFA"),"string"!=typeof t.bg3&&(t.bg3="#FFF"),"string"!=typeof t.bgP&&(t.bgP="#3E50B4"),"string"!=typeof t.bgPD&&(t.bgPD=a(t.bgP)),"string"!=typeof t.bgPL&&(t.bgPL=f(t.bgP)),"string"!=typeof t.bgS&&(t.bgS="#FF3F80"),"string"!=typeof t.bgSD&&(t.bgSD=a(t.bgS)),"string"!=typeof t.bgSL&&(t.bgSL=f(t.bgS)),d.forEach(function(n){var e=t["bg"+n],r=h.luminance(e);t["fg"+n]=r<.6?"#fff":"#000"}),t}function a(t){var n=new h(t);return n.rgb2hsl(),n.L*=.75,n.hsl2rgb(),n.stringify()}function f(t){var n=new h(t);return n.rgb2hsl(),n.L=.4+.6*n.L,n.hsl2rgb(),n.stringify()}var m=function(){function n(){return r(e,arguments)}var e={en:{},fr:{}},r=t("$").intl;return n.all=e,n}(),h=t("tfw.color"),d=["0","1","2","3","P","PD","PL","S","SD","SL"],u={css:{},current:null};e.register=r,e.apply=i,n.exports._=m});
//# sourceMappingURL=dom.theme.js.map
require("polyfill.classList",function(t,e,n){var i=function(){function e(){return i(n,arguments)}var n={en:{}},i=t("$").intl;return e.all=n,e}();"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;n<i;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():function(t){"use strict";if("Element"in t){var e=t.Element.prototype,n=Object,i=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array.prototype.indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},r=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},o=function(t,e){if(""===e)throw new r("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new r("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(t,e)},c=function(t){for(var e=i.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],s=0,r=n.length;s<r;s++)this.push(n[s]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},a=c.prototype=[],l=function(){return new c(this)};if(r.prototype=Error.prototype,a.item=function(t){return this[t]||null},a.contains=function(t){return t+="",-1!==o(this,t)},a.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do{t=e[n]+"",-1===o(this,t)&&(this.push(t),s=!0)}while(++n<i);s&&this._updateClassName()},a.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do{for(t=n[i]+"",e=o(this,t);-1!==e;)this.splice(e,1),r=!0,e=o(this,t)}while(++i<s);r&&this._updateClassName()},a.toggle=function(t,e){t+="";var n=this.contains(t),i=n?!0!==e&&"remove":!1!==e&&"add";return i&&this[i](t),!0===e||!1===e?e:!n},a.toString=function(){return this.join(" ")},n.defineProperty){var u={get:l,enumerable:!0,configurable:!0};try{n.defineProperty(e,"classList",u)}catch(t){-2146823252===t.number&&(u.enumerable=!1,n.defineProperty(e,"classList",u))}}else n.prototype.__defineGetter__&&e.__defineGetter__("classList",l)}}(self)),e.exports._=i});
//# sourceMappingURL=polyfill.classList.js.map
require("tfw.binding.link",function(e,n,t){function r(e,n,t,r){var o=this,a=[];return e[r].forEach(function(r,c){if(r.open){g(r.obj);e[t].forEach(function(t,f){if("string"==typeof t.name&&"string"==typeof r.name&&t.obj===r.obj&&t.name===r.name)return console.error("It is forbidden to bind a property on itself! ("+f+" -> "+c+")"),void console.info("[tfw.binding.link] args=",e);var s=g(t.obj),u=i.bind(o,t,r,n);s.on(t.name,u),a.push({pm:s,name:t.name,slot:u})})}}),a}function o(e,n){this.destroy=function(){e.forEach(function(e){e.pm.off(e.name,e.slot)}),n.forEach(function(e){e.pm.off(e.name,e.slot)})}}function i(e,n,t,r,o,i,a){if(Array.isArray(a)||(a=[]),this.debug&&console.log("Link "+this.name+": ",{src:e,dst:n,id:t,value:r,propertyName:o,container:i,wave:a}),s(t,a))return void(this.debug&&console.log("...has been BLOCKED by the wave! ",a));var c=this,f=g(e.obj),y=g(n.obj);if(r=d(r,e,n),r=l(r,n,f),r=m(r,e,n),u(r,e,n))return void(this.debug&&console.log("...has been FILTERED!"));r=h(r,e,n),r=b(r,e,n),"number"==typeof n.delay?(this.debug&&console.log("...has been DELAYED for "+n.delay+" ms!"),clearTimeout(n._id),n._id=setTimeout(function(){c.debug&&(console.log("Link "+c.name+" (after "+n.delay+" ms): ",{src:e,dst:n,id:t,value:r,propertyName:o,wave:a}),console.log("...try to change a value. ",{target:y,propertyName:n.name,value:r,wave:a})),y.change(n.name,r,a)},n.delay)):(this.debug&&console.log("...try to change a value. ",{target:y,propertyName:n.name,value:r,wave:a}),y.change(n.name,r,a))}function a(e){try{void 0===e.name&&(e.name=e.debug),"string"!=typeof e.name&&(e.name="Link#"+this.id),void 0===e&&f("Missing mandatory argument!"),void 0===e.A&&f("Missing `args.A`!"),Array.isArray(e.A)||(e.A=[e.A]),void 0===e.B&&f("Missing `args.B`!"),Array.isArray(e.B)||(e.B=[e.B]);var n;for(n=0;n<e.A.length;n++)c(e.A[n],n);for(n=0;n<e.B.length;n++)c(e.B[n],n);this.name=e.name,this.debug=e.debug}catch(n){console.error("checkArgs( "+e+" )"),f(n,"checkArgs( <args> )")}}function c(e,n){try{if(e.action){if("function"!=typeof e.action)throw"Attribute `["+n+"].action` must be a function!";if(void 0!==e.obj)throw"["+n+"].action cannot be defined in the same time of ["+n+"].obj! They are exclusive attributes.";if(void 0!==e.name)throw"["+n+"].action cannot be defined in the same time of ["+n+"].name! They are exclusive attributes.";var t={};g(t).create("<action>",{set:e.action}),e.obj=t,e.name="<action>"}else if(void 0===e.obj&&f("Missing `["+n+"].obj`!"),void 0===e.name&&(e.name="*"),!g.isLinkable(e.obj,e.name))throw"`"+e.name+"` is not a linkable attribute.\nValid linkable attributes are: "+g.getAllAttributesNames(e.obj).join(", ")+".";void 0===e.open&&(e.open=!0)}catch(t){console.error("checkpod(",e,", ",n,")"),f(t,"checkpod( <pod>, "+n+")")}}function f(e,n){throw n=void 0===n?"":"::"+n,e+"\n[tfw.binding.link"+n+"]"}function s(e,n){if(Array.isArray(n)){if(!(n.indexOf(e)<0))return!0;n.push(e)}return!1}function u(e,n,t){if("function"==typeof t.filter)try{if(!t.filter(e))return!0}catch(e){console.error(e),f("Error in filter of link "+g(n.obj)+"."+n.name+" -> "+g(t.obj)+"."+t.name+"!")}return!1}function l(e,n,t){return"string"==typeof n.switch?t.get(n.switch):Array.isArray(n.switch)?n.switch.map(function(e){return t.get(e)}):e}function m(e,n,t){if("function"==typeof t.converter)try{return t.converter(e)}catch(e){console.error(e),f("Error in converter of link "+g(n.obj)+"."+n.name+" -> "+g(t.obj)+"."+t.name+"!")}return e}function h(e,n,t){if(!t.format)return e;try{if(!Array.isArray(t.format))throw"Must be an array with two elements!";var r=t.format[0];if("function"!=typeof r)throw"First element of the array must be a function!";var o=t.format[1];if("string"!=typeof o)throw"Second element of the array must be a string!";return r(o,e)}catch(e){console.error(e),f("Error in format of link "+g(n.obj)+"."+n.name+" -> "+g(t.obj)+"."+t.name+"!\n"+e)}}function b(e,n,t){if(e&&"function"==typeof e.map&&"function"==typeof t.map)try{return e.map(t.map)}catch(e){console.error(e),f("Error in map of link "+g(n.obj)+"."+n.name+" -> "+g(t.obj)+"."+t.name+"!")}return e}function d(e,n,t){if(void 0===t.value)return e;if("function"==typeof t.value)try{return t.value(n.name)}catch(e){console.error(e),f("Error in value("+n.name+") of link "+g(n.obj)+"."+n.name+" -> "+g(t.obj)+"."+t.name+"!")}return t.value}var y=function(){function n(){return r(t,arguments)}var t={en:{},fr:{}},r=e("$").intl;return n.all=t,n}(),g=e("tfw.binding.property-manager"),v=0,p=function(e){try{var n=v++;a.call(this,e);var t=r.call(this,e,n,"A","B"),i=r.call(this,e,n,"B","A");o.call(this,t,i)}catch(n){console.error("new Link( "+e+" )"),f(n,"new Link( <args> ) "+(this.name||""))}};n.exports=p,n.exports._=y});
//# sourceMappingURL=tfw.binding.link.js.map
require("tfw.icons",function(H,V,L){function C(H){return["path",{d:H,stroke:"none",fill:0}]}var M=function(){function V(){return C(L,arguments)}var L={en:{},fr:{}},C=H("$").intl;return V.all=L,V}();V.exports.draw=C,V.exports.register=function(H){var L,C;for(L in H)C=H[L],V.exports.iconsBook[L]=C},V.exports.iconsBook={android:C("M15,-35H10V-40H15M-10,-35H-15V-40H-10M18,-49L24,-56C25,-57,25,-58,24,-59C23,-60,22,-60,21,-59L13,-52C9,-54,5,-55,0,-55C-5,-55,-9,-54,-13,-52L-21,-59C-22,-60,-23,-60,-24,-59C-25,-58,-25,-57,-24,-56L-18,-49C-25,-44,-30,-35,-30,-25H30C30,-35,25,-44,18,-49M43,-20A8,8,0,0,0,35,-12V23A8,8,0,0,0,43,30A8,8,0,0,0,50,23V-12A8,8,0,0,0,43,-20M-42,-20A8,8,0,0,0,-50,-12V23A8,8,0,0,0,-42,30A8,8,0,0,0,-35,23V-12A8,8,0,0,0,-42,-20M-30,30A5,5,0,0,0,-25,35H-20V53A8,8,0,0,0,-12,60A8,8,0,0,0,-5,53V35H5V53A8,8,0,0,0,13,60A8,8,0,0,0,20,53V35H25A5,5,0,0,0,30,30V-20H-30V30Z"),bug:C("M10,0H-10V-10H10M10,20H-10V10H10M40,-20H26C24,-24 21,-27 17,-30L25,-38L18,-45L7,-34C5,-35 3,-35 0,-35C-2,-35 -5,-35 -7,-34L-18,-45L-25,-38L-17,-30C-21,-27 -24,-24 -26,-20H-40V-10H-30C-30,-8 -30,-7 -30,-5V0H-40V10H-30V15C-30,17 -30,18 -30,20H-40V30H-26C-21,39 -11,45 0,45C11,45 21,39 26,30H40V20H30C30,18 30,17 30,15V10H40V0H30V-5C30,-7 30,-8 30,-10H40V-20Z"),camera:C("M-40,-40H-25L-15,-50H15L25,-40H40A10,10,0,0,1,50,-30V30A10,10,0,0,1,40,40H-40A10,10,0,0,1,-50,30V-30A10,10,0,0,1,-40,-40M0,-25A25,25,0,0,0,-25,0A25,25,0,0,0,0,25A25,25,0,0,0,25,0A25,25,0,0,0,0,-25M0,-15A15,15,0,0,1,15,0A15,15,0,0,1,0,15A15,15,0,0,1,-15,0A15,15,0,0,1,0,-15Z"),cancel:C("M7,0L35,28V35H28L0,7L-28,35H-35V28L-7,0L-35,-28V-35H-28L0,-7L28,-35H35V-28L7,0Z"),center:C("M0,-15A15,15,0,0,0,-15,0A15,15,0,0,0,0,15A15,15,0,0,0,15,0A15,15,0,0,0,0,-15M35,35H15V45H35A10,10,0,0,0,45,35V15H35M35,-45H15V-35H35V-15H45V-35A10,10,0,0,0,35,-45M-35,-35H-15V-45H-35A10,10,0,0,0,-45,-35V-15H-35M-35,15H-45V35A10,10,0,0,0,-35,45H-15V35H-35V15Z"),close:C("M0,-50C28,-50,50,-28,50,0C50,28,28,50,0,50C-28,50,-50,28,-50,0C-50,-28,-28,-50,0,-50M18,-25L0,-7L-18,-25L-25,-18L-7,0L-25,18L-18,25L0,7L18,25L25,18L7,0L25,-18L18,-25Z"),code:C("M13,23L36,0L13,-23L20,-30L50,0L20,30L13,23M-13,23L-36,0L-13,-23L-20,-30L-50,0L-20,30L-13,23Z"),copy:C("M35,45H-20V-25H35M35,-35H-20A10,10,0,0,0,-30,-25V45A10,10,0,0,0,-20,55H35A10,10,0,0,0,45,45V-25A10,10,0,0,0,35,-35M20,-55H-40A10,10,0,0,0,-50,-45V25H-40V-45H20V-55Z"),delete:C("M35,-40H18L13,-45H-12L-17,-40H-35V-30H35M-30,35A10,10,0,0,0,-20,45H20A10,10,0,0,0,30,35V-25H-30V35Z"),direction:C("M10,13V0H-10V15H-20V-5A5,5,0,0,1,-15,-10H10V-22L28,-5M49,-4L4,-49H3C2,-50,-2,-50,-4,-49L-49,-4C-50,-2,-50,2,-49,4L-4,49C-2,50,2,51,4,49L49,4C51,2,51,-2,49,-4Z"),down:C("M-30,-30L0,30,30,-30"),"down-double":C("M-30,-40L0,-10,30,-40M-30,10L0,40,30,10"),edit:C("M24,-46C22,-46,20,-46,19,-44L8,-34L35,-7L45,-17C48,-21,48,-25,45,-28L29,-44C28,-46,26,-46,24,-46M5,-30L-36,11L-23,12L-22,23L-11,24L-9,37L31,-3M-39,15L-47,49L-14,40L-15,29L-27,28L-28,16"),eraser:C("M21,-42L46,-17C50,-14,50,-7,46,-3L0,43C-8,50,-20,50,-28,43L-46,25C-50,21,-50,15,-46,11L7,-42C11,-46,17,-46,21,-42M-39,18L-21,36C-17,39,-11,39,-7,36L11,18L-14,-7L-39,18Z"),export:C("M-35,40H35V30H-35M35,-15H15V-45H-15V-15H-35L0,20L35,-15Z"),"flag-jp":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#fff",d:"M-60,45h120v-90h-120z"}],["circle",{fill:"#bc002d",r:24}]]],"flag-fr":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#002395",d:"M-60,45h40v-90h-40z"}],["path",{fill:"#fff",d:"M-20,45h40v-90h-40z"}],["path",{fill:"#ed2939",d:"M20,45h40v-90h-40z"}]]],"flag-it":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,50h130v-100h-130z"}],["path",{fill:"#009246",d:"M-60,45h40v-90h-40z"}],["path",{fill:"#fff",d:"M-20,45h40v-90h-40z"}],["path",{fill:"#ce2b37",d:"M20,45h40v-90h-40z"}]]],"flag-de":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,41h130v-82h-130z"}],["path",{fill:"#ffce00",d:"M-60,36h120v-24h-120z"}],["path",{fill:"#dd0000",d:"M-60,12h120v-24h-120z"}]]],"flag-en":["g",{stroke:"none"},[["path",{fill:"#000",d:"M-65,37h130v-75h-130z"}],["path",{fill:"#bb133e",d:"M-60,32h120v-65h-120z"}],["path",{fill:"#fff",d:"M-60,22h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,12h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,2h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-8h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-18h120v5h-120z"}],["path",{fill:"#fff",d:"M-60,-28h120v5h-120z"}],["path",{fill:"#002664",d:"M-60,-33h48v35h-48z"}]]],font:C("M25,-20H40V40H45V45H25V40H30V25H10L3,40H10V45H-10V40H-5L25,-20M30,-15L13,20H30V-15M-35,-45H-10C-4,-45,0,-41,0,-35V20H-15V-5H-30V20H-45V-35C-45,-41,-41,-45,-35,-45M-30,-35V-15H-15V-35H-30Z"),"format-align-center":C("M-45,-45H45V-35H-45V-45M-25,-25H25V-15H-25V-25M-45,-5H45V5H-45V-5M-25,15H25V25H-25V15M-45,35H45V45H-45V35Z"),"format-align-justify":C("M-45,-45H45V-35H-45V-45M-45,-25H45V-15H-45V-25M-45,-5H45V5H-45V-5M-45,15H45V25H-45V15M-45,35H45V45H-45V35Z"),"format-align-left":C("M-45,-45H45V-35H-45V-45M-45,-25H15V-15H-45V-25M-45,-5H45V5H-45V-5M-45,15H15V25H-45V15M-45,35H45V45H-45V35Z"),"format-align-right":C(" M-45,-45H45V-35H-45V-45M-15,-25H45V-15H-15V-25M-45,-5H45V5H-45V-5M-15,15H45V25H-15V15M-45,35H45V45H-45V35Z "),"format-bold":C("M8,18H-10V3H8A8,8,0,0,1,15,10A8,8,0,0,1,8,18M-10,-27H5A8,8,0,0,1,13,-20A8,8,0,0,1,5,-12H-10M18,-6C23,-9,26,-15,26,-20C26,-31,18,-40,6,-40H-25V30H10C21,30,29,22,29,11C29,3,24,-3,18,-6Z"),"format-italic":C("M-10,-40V-25H1L-16,15H-30V30H10V15H-1L16,-25H30V-40H-10Z"),"format-float-center":C("M-15,-25H15V5H-15V-25M-45,-45H45V-35H-45V-45M-45,15H45V25H-45V15M-45,35H25V45H-45V35Z"),"format-float-left":C("M-45,-25H-15V5H-45V-25M-45,-45H45V-35H-45V-45M45,-25V-15H-5V-25H45M45,-5V5H-5V-5H45M-45,15H25V25H-45V15M-45,35H45V45H-45V35Z"),"format-float-none":C("M-45,-25H-15V5H-45V-25M-45,-45H45V-35H-45V-45M45,-5V5H-5V-5H45M-45,15H25V25H-45V15M-45,35H45V45H-45V35Z"),"format-float-right":C("M15,-25H45V5H15V-25M-45,-45H45V-35H-45V-45M5,-25V-15H-45V-25H5M-15,-5V5H-45V-5H-15M-45,15H25V25H-45V15M-45,35H45V45H-45V35Z"),"format-header":C("M-40,-40H-30V-10H-10V-40H0V30H-10V0H-30V30H-40V-40M13,-23L31,-5L13,13L20,20L45,-5L20,-30L13,-23Z"),"format-underline":C("M-35,45H35V35H-35V45M0,25A30,30,0,0,0,30,-5V-45H18V-5A18,18,0,0,1,0,13A18,18,0,0,1,-17,-5V-45H-30V-5A30,30,0,0,0,0,25Z"),fullscreen:C("M-35,-35H-10V-25H-25V-10H-35V-35M10,-35H35V-10H25V-25H10V-35M25,10H35V35H10V25H25V10M-10,25V35H-35V10H-25V25H-10Z"),gear:C("M0,18A18,18,0,0,1,-17,0A18,18,0,0,1,0,-17A18,18,0,0,1,18,0A18,18,0,0,1,0,18M37,5C37,3,38,2,38,0C38,-2,37,-3,37,-5L48,-13C49,-14,49,-15,48,-16L38,-34C38,-35,36,-35,35,-35L23,-30C20,-32,18,-33,14,-35L13,-48C12,-49,11,-50,10,-50H-10C-11,-50,-12,-49,-12,-48L-14,-35C-17,-33,-20,-32,-23,-30L-35,-35C-36,-35,-38,-35,-38,-34L-48,-16C-49,-15,-49,-14,-48,-13L-37,-5C-37,-3,-37,-2,-37,0C-37,2,-37,3,-37,5L-48,13C-49,14,-49,15,-48,16L-38,34C-38,35,-36,35,-35,35L-23,30C-20,32,-17,33,-14,35L-12,48C-12,49,-11,50,-10,50H10C11,50,12,49,13,48L14,35C18,33,20,32,23,30L35,35C36,35,38,35,38,34L48,16C49,15,49,14,48,13L37,5Z"),gps:C("M0,-20A20,20,0,0,1,20,0A20,20,0,0,1,0,20A20,20,0,0,1,-20,0A20,20,0,0,1,0,-20M-45,5H-55V-5H-45C-42,-26,-26,-42,-5,-45V-55H5V-45C26,-42,43,-26,45,-5H55V5H45C43,26,26,43,5,45V55H-5V45C-26,43,-42,26,-45,5M0,-35A35,35,0,0,0,-35,0A35,35,0,0,0,0,35A35,35,0,0,0,35,0A35,35,0,0,0,0,-35Z"),hand:C("M-10,-50A10,10,0,0,1,0,-40V-17C0,-17,10,-19,10,-14C10,-14,20,-15,20,-10C20,-10,30,-11,30,-6C30,-6,40,-7,40,-2V15C40,20,25,45,25,50H-15C-15,50,-25,15,-40,5C-40,5,-45,-25,-20,0V-40A10,10,0,0,1,-10,-50Z"),heart:C("M0,47L-7,40C-33,17,-50,1,-50,-17C-50,-33,-38,-45,-22,-45C-14,-45,-5,-41,0,-35C5,-41,14,-45,23,-45C38,-45,50,-33,50,-17C50,1,33,17,7,40L0,47Z"),hide:C("M-1,-15L15,1C15,1,15,0,15,0A15,15,0,0,0,0,-15C0,-15,-1,-15,-1,-15M-22,-11L-15,-3C-15,-2,-15,-1,-15,0A15,15,0,0,0,0,15C1,15,2,15,3,15L11,22C8,24,4,25,0,25A25,25,0,0,1,-25,0C-25,-4,-24,-8,-22,-11M-50,-39L-39,-27L-36,-25C-45,-18,-51,-10,-55,0C-46,22,-25,38,0,38C8,38,15,36,22,33L24,35L39,50L45,44L-44,-45M0,-25A25,25,0,0,1,25,0C25,3,24,6,23,9L38,24C45,18,51,9,55,0C46,-22,25,-37,0,-37C-7,-37,-14,-36,-20,-34L-9,-23C-6,-24,-3,-25,0,-25Z"),home:C("M-10,40V10H10V40H35V0H50L0,-45L-50,0H-35V40H-10Z"),image:C("M5,-15H33L5,-42V-15M-30,-50H10L40,-20V40A10,10,0,0,1,30,50H-30C-36,50,-40,46,-40,40V-40C-40,-46,-36,-50,-30,-50M-30,40H15L30,40V0L10,20L0,10L-30,40M-20,-15A10,10,0,0,0,-30,-5A10,10,0,0,0,-20,5A10,10,0,0,0,-10,-5A10,10,0,0,0,-20,-15Z"),import:C("M-15,20V-10H-35L0,-45L35,-10H15V20H-15M-35,40V30H35V40H-35Z"),improvement:C("M0,50A50,50,0,0,1,-50,0A50,50,0,0,1,0,-50A50,50,0,0,1,50,0A50,50,0,0,1,0,50M0,-25L-25,0H-10V20H10V0H25L0,-25Z"),info:C("M8,-40A8,8,0,0,0,0,-32A8,8,0,0,0,8,-25A8,8,0,0,0,15,-32A8,8,0,0,0,8,-40M6,-16C0,-16,-17,-3,-17,-3C-17,-2,-17,-2,-16,-1C-16,1,-16,1,-15,0C-14,0,-12,-2,-9,-3C1,-10,-8,6,-12,32C-14,45,-2,39,1,37C4,35,12,29,13,28C14,28,13,27,12,26C12,25,11,26,11,26C8,28,2,32,1,29C0,27,6,7,9,-6C10,-10,12,-17,6,-16Z"),left:["path",{fill:0,d:"M40,-5V5H-20L8,33L0,40L-39,0L0,-40L8,-32L-20,-5H40Z"}],"left-double":C("M-10,-30L-40,0,-10,30M40,-30L10,0,40,30"),link:C("M-7,7C-5,9,-5,12,-7,14C-9,16,-12,16,-14,14C-24,4,-24,-11,-14,-21V-21L4,-39C13,-49,29,-49,39,-39C49,-29,49,-13,39,-4L31,4C32,0,31,-4,29,-8L32,-11C38,-16,38,-26,32,-32C26,-38,16,-38,11,-32L-7,-14C-13,-8,-13,1,-7,7M7,-14C9,-16,12,-16,14,-14C24,-4,24,11,14,21V21L-4,39C-13,49,-29,49,-39,39C-49,29,-49,13,-39,4L-31,-4C-31,0,-31,4,-29,8L-32,11C-38,16,-38,26,-32,32C-26,38,-16,38,-11,32L7,14C13,8,13,-1,7,-7C5,-9,5,-12,7,-14Z"),location:C("M0,-2A13,13,0,0,1,-12,-15A13,13,0,0,1,0,-27A13,13,0,0,1,13,-15A13,13,0,0,1,0,-2M0,-50A35,35,0,0,0,-35,-15C-35,11,0,50,0,50C0,50,35,11,35,-15A35,35,0,0,0,0,-50Z"),logout:C("M25,26V10H-10V-10H25V-26L51,0L25,26M5,-50A10,10,0,0,1,15,-40V-20H5V-40H-40V40H5V20H15V40A10,10,0,0,1,5,50H-40A10,10,0,0,1,-50,40V-40A10,10,0,0,1,-40,-50H5Z"),mail:C("M40,-40H-40A10,10,0,0,0,-50,-30V30A10,10,0,0,0,-40,40H40A10,10,0,0,0,50,30V-30A10,10,0,0,0,40,-40M40,30H-40V-20L0,5L40,-20V30M40,-30L0,-5L-40,-30V-30H40V-30Z"),map:C("M15,35L-15,24V-35L15,-24M43,-45C42,-45,42,-45,42,-45L15,-34L-15,-45L-43,-35C-44,-35,-45,-34,-45,-33V43A3,3,0,0,0,-42,45C-42,45,-42,45,-42,45L-15,34L15,45L43,36C44,35,45,34,45,33V-42A3,3,0,0,0,43,-45Z"),"map-layer":C("M0,20L37,-9L45,-15L0,-50L-45,-15L-37,-9M0,33L-37,4L-45,10L0,45L45,10L37,4L0,33Z"),menu:C("M-45,-30H45V-20H-45V-30M-45,-5H45V5H-45V-5M-45,20H45V30H-45V20Z"),minus:C("M35,5H-35V-5H35V5Z"),"minus-o":C("M0,40C-22,40,-40,22,-40,0C-40,-22,-22,-40,0,-40C22,-40,40,-22,40,0C40,22,22,40,0,40M0,-50A50,50,0,0,0,-50,0A50,50,0,0,0,0,50A50,50,0,0,0,50,0A50,50,0,0,0,0,-50M-25,5H25V-5H-25"),"minus-small":C("M35,35V-35H-35V35H35M35,-45A10,10,0,0,1,45,-35V35A10,10,0,0,1,35,45H-35A10,10,0,0,1,-45,35V-35C-45,-41,-40,-45,-35,-45H35M25,-5V5H-25V-5H25Z"),ok:C("M45,-25L-15,35L-42,8L-35,0L-15,21L38,-32L45,-25Z"),pack:["path",{fill:0,d:"M45,23C45,24,44,26,42,27L3,49C2,50,1,50,0,50C-1,50,-2,50,-3,49L-42,27C-44,26,-45,24,-45,23V-22C-45,-24,-44,-26,-42,-27L-3,-49C-2,-50,-1,-50,0,-50C1,-50,2,-50,3,-49L42,-27C44,-26,45,-24,45,-22V23M0,-39L-35,-20V20L0,39L35,20V-20L0,-39M0,-29L24,-15L0,-1L-24,-15L0,-29M25,14L5,26V8L25,-3V14M-5,26L-25,14V-3L-5,8V26Z"}],plug:C("M20,-25V-45H10V-25H-10V-45H-20V-25H-20C-25,-25,-30,-20,-30,-15V13L-12,30V45H13V30L30,13V-15C30,-20,25,-25,20,-25Z"),plus:C("M35,5H5V35H-5V5H-35V-5H-5V-35H5V-5H35V5Z"),"plus-o":C("M0,40C-22,40,-40,22,-40,0C-40,-22,-22,-40,0,-40C22,-40,40,-22,40,0C40,22,22,40,0,40M0,-50A50,50,0,0,0,-50,0A50,50,0,0,0,0,50A50,50,0,0,0,50,0A50,50,0,0,0,0,-50M5,-25H-5V-5H-25V5H-5V25H5V5H25V-5H5V-25Z"),"plus-small":C("M35,35V-35H-35V35H35M35,-45A10,10,0,0,1,45,-35V35A10,10,0,0,1,35,45H-35A10,10,0,0,1,-45,35V-35C-45,-41,-40,-45,-35,-45H35M-5,-25H5V-5H25V5H5V25H-5V5H-25V-5H-5V-25Z"),print:["path",{fill:0,d:"M30,-45H-30V-25H30M35,0A5,5,0,0,1,30,-5A5,5,0,0,1,35,-10A5,5,0,0,1,40,-5A5,5,0,0,1,35,0M20,35H-20V10H20M35,-20H-35A15,15,0,0,0,-50,-5V25H-30V45H30V25H50V-5A15,15,0,0,0,35,-20Z"}],question:C("M-10,35H5V50H-10V35M0,-50C27,-49,38,-22,23,-2C18,3,12,7,8,11C5,15,5,20,5,25H-10C-10,17,-10,10,-7,5C-3,0,3,-3,8,-7C20,-18,17,-34,0,-35A15,15,0,0,0,-15,-20H-30A30,30,0,0,1,0,-50Z"),redo:C("M32,-7C23,-15,11,-20,-2,-20C-26,-20,-45,-5,-52,16L-40,20C-35,4,-20,-7,-2,-7C7,-7,16,-4,23,2L5,20H50V-25L32,-7Z"),refresh:C("M28,-28C21,-35,11,-40,0,-40A40,40,0,0,0,-40,0A40,40,0,0,0,0,40C19,40,34,27,39,10H28C24,22,13,30,0,30A30,30,0,0,1,-30,0A30,30,0,0,1,0,-30C8,-30,16,-27,21,-21L5,-5H40V-40L28,-28Z"),right:["path",{fill:0,d:"M-40,-5V5H20L-7,33L0,40L39,0L0,-40L-7,-32L20,-5H-40Z"}],"right-double":C("M10,-30L40,0,10,30M-40,-30L-10,0,-40,30"),search:C("M-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45M-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35Z"),select:C("M35,35H-35V-35H15V-45H-35C-41,-45,-45,-41,-45,-35V35A10,10,0,0,0,-35,45H35A10,10,0,0,0,45,35V-5H35M-20,-10L-27,-2L-5,20L45,-30L38,-37L-5,6L-20,-10Z"),unselect:C("M35,-45H-35C-41,-45,-45,-41,-45,-35V35A10,10,0,0,0,-35,45H35A10,10,0,0,0,45,35V-35C45,-41,41,-45,35,-45M35,-35V35H-35V-35H35Z"),share:C("M30,20C26,20,23,22,20,24L-15,3C-15,2,-15,1,-15,0C-15,-1,-15,-2,-15,-3L20,-24C23,-22,26,-20,30,-20A15,15,0,0,0,45,-35A15,15,0,0,0,30,-50A15,15,0,0,0,15,-35C15,-34,15,-33,15,-31L-20,-11C-22,-13,-26,-15,-30,-15A15,15,0,0,0,-45,0A15,15,0,0,0,-30,15C-26,15,-22,13,-20,11L16,32C16,33,15,34,15,35C15,43,22,50,30,50C38,50,45,43,45,35A15,15,0,0,0,30,20Z"),show:C("M0,-15A15,15,0,0,0,-15,0A15,15,0,0,0,0,15A15,15,0,0,0,15,0A15,15,0,0,0,0,-15M0,25A25,25,0,0,1,-25,0A25,25,0,0,1,0,-25A25,25,0,0,1,25,0A25,25,0,0,1,0,25M0,-37C-25,-37,-46,-22,-55,0C-46,22,-25,38,0,38C25,38,46,22,55,0C46,-22,25,-37,0,-37Z"),speaker:C("M40,35L33,28C41,21,45,11,45,0C45,-11,41,-21,33,-28L40,-35C49,-26,55,-14,55,0C55,14,49,26,40,35M26,21L19,14C23,11,25,6,25,0C25,-6,23,-11,19,-14L26,-21C32,-16,35,-8,35,0C35,8,32,16,26,21M-40,-45H0A10,10,0,0,1,10,-35V35A10,10,0,0,1,0,45H-40A10,10,0,0,1,-50,35V-35A10,10,0,0,1,-40,-45M-20,-35A10,10,0,0,0,-30,-25A10,10,0,0,0,-20,-15A10,10,0,0,0,-10,-25A10,10,0,0,0,-20,-35M-20,-5A20,20,0,0,0,-40,15A20,20,0,0,0,-20,35A20,20,0,0,0,0,15A20,20,0,0,0,-20,-5M-20,5A10,10,0,0,1,-10,15A10,10,0,0,1,-20,25A10,10,0,0,1,-30,15A10,10,0,0,1,-20,5Z"),star:C("M0,26L31,45L23,10L50,-14L14,-17L0,-50L-14,-17L-50,-14L-23,10L-31,45L0,26Z"),"tri-down":C("M-23,-17L0,6L23,-17L30,-10L0,20L-30,-10L-23,-17Z"),"tri-left":C("M17,23L-6,0L17,-23L10,-30L-20,0L10,30L17,23Z"),"tri-right":C("M-17,23L6,0L-17,-23L-10,-30L20,0L-10,30L-17,23Z"),"tri-up":C("M-23,17L0,-6L23,17L30,10L0,-20L-30,10L-23,17Z"),twitter:C("M52,-30C48,-28,44,-27,40,-27C44,-29,48,-33,49,-38C45,-36,41,-34,36,-33C32,-37,26,-40,20,-40C8,-40,-1,-30,-1,-19C-1,-17,-1,-15,-1,-14C-19,-15,-34,-23,-45,-36C-47,-33,-48,-29,-48,-25C-48,-18,-44,-11,-38,-7C-42,-7,-45,-8,-48,-10C-48,-10,-48,-10,-48,-10C-48,1,-41,9,-31,11C-33,12,-35,12,-37,12C-38,12,-39,12,-41,12C-38,20,-30,26,-21,26C-28,32,-37,36,-47,36C-49,36,-51,36,-52,35C-43,41,-31,45,-19,45C20,45,42,12,42,-16C42,-17,42,-18,42,-19C46,-22,49,-26,52,-30Z"),undo:C("M3,-20C-11,-20,-23,-15,-32,-7L-50,-25V20H-5L-23,2C-16,-4,-7,-7,3,-7C20,-7,35,4,41,20L52,16C45,-5,26,-20,3,-20Z"),up:C("M-30,30L0,-30,30,30"),"up-double":C("M-30,40L0,10,30,40M-30,-10L0,-40,30,-10"),user:C("M0,-40A20,20,0,0,1,20,-20A20,20,0,0,1,0,0A20,20,0,0,1,-20,-20A20,20,0,0,1,0,-40M0,10C22,10,40,19,40,30V40H-40V30C-40,19,-22,10,0,10Z"),wait:C("M0,-5A5,5,0,0,0,-5,0A5,5,0,0,0,0,5A5,5,0,0,0,5,0A5,5,0,0,0,0,-5M3,-50C25,-50,26,-32,14,-26C9,-24,7,-19,6,-14C8,-13,10,-11,12,-9C30,-19,50,-15,50,3C50,25,32,26,26,14C24,9,19,7,14,6C13,8,11,10,9,12C19,30,15,50,-2,50C-25,50,-25,32,-14,26C-9,24,-7,19,-6,14C-8,13,-10,11,-12,9C-30,19,-50,15,-50,-2C-50,-25,-32,-26,-26,-14C-24,-9,-19,-7,-14,-6C-13,-8,-11,-10,-9,-12C-19,-30,-15,-50,3,-50Z"),"zoom-in":C("M18,10L43,35L35,43L10,18V14L9,12C3,17,-4,20,-12,20A33,33,0,0,1,-45,-12A33,33,0,0,1,-12,-45A33,33,0,0,1,20,-12C20,-4,17,3,12,9L14,10H18M-12,10C0,10,10,0,10,-12C10,-25,0,-35,-12,-35C-25,-35,-35,-25,-35,-12C-35,0,-25,10,-12,10M0,-10H-10V0H-15V-10H-25V-15H-15V-25H-10V-15H0V-10Z"),"zoom-out":C("M18,10H14L12,9C17,3,20,-4,20,-12A33,33,0,0,0,-12,-45A33,33,0,0,0,-45,-12A33,33,0,0,0,-12,20C-4,20,3,17,9,12L10,14V18L35,43L43,35L18,10M-12,10C-25,10,-35,0,-35,-12C-35,-25,-25,-35,-12,-35C0,-35,10,-25,10,-12C10,0,0,10,-12,10M-25,-15H0V-10H-25V-15Z")};var A,t,l={add:"plus",back:"left",help:"question",save:"export"};for(A in l)t=l[A],V.exports.iconsBook[A]=V.exports.iconsBook[t];V.exports._=M});
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
require("wdg.vectorDrawing2",function(t,i,o){function r(t,i,o){var r=t[0],n=t[1],s=r+3*(i[0]-r),l=n+3*(i[1]-n),a=r+3*(o[0]-r),e=n+3*(o[1]-n);this.fillTri(r,n,s,l,a,e)}var n=function(){function i(){return r(o,arguments)}var o={en:{},fr:{}},r=t("$").intl;return i.all=o,i}();i.exports=t("draw")(function(){var t=[0,0],i=[-.4,-.3],o=[-.1,-.4],n=[-.2,.4];this.setColor(this.ORANGE).opacity(.5),r.call(this,i,t,o),this.setColor(this.BLUE),r.call(this,o,t,i),this.opacity(1).setColor("#000").dot(t[0],t[1],"A","LB").dot(i[0],i[1],"B","RT").dot(o[0],o[1],"C","LT").dot(n[0],n[1],"M","LB")}),i.exports._=n});
//# sourceMappingURL=wdg.vectorDrawing2.js.map
require("draw",function(t,i,r){function e(t,i){var r,e;for(r in i)e=i[r],Object.defineProperty(t,r,{value:e,writable:!1,configurable:!1})}function n(t,i){if(t*t+i*i<.01)return"B";var r=Math.abs(t),e=Math.abs(i),n=r<s?a/2:Math.atan(e/r);return t<0?i<0?n+=a:n=a-n:i<0&&(n=2*a-n),n+=a/8,["L","LB","B","RB","R","RT","T","LT"][Math.floor(4*n/a)%8]}var o=function(){function i(){return e(r,arguments)}var r={en:{},fr:{}},e=t("$").intl;return i.all=r,i}(),h=t("dom");i.exports=function(t){var i=function(i){this.ORANGE="#f70",this.BLUE="#28f",void 0===i&&(i={}),void 0===i.width&&(i.width=300),void 0===i.height&&(i.height=300),i.width=parseInt(i.width),i.height=parseInt(i.height),"number"!=typeof i.width&&(i.width=300),"number"!=typeof i.height&&(i.height=300);var r=h.tag("canvas",{width:i.width,height:i.height});h.css(r,{boxShadow:"none",background:"transparent"}),"string"==typeof i.float&&h.css(r,{float:i.float});var n=r.getContext("2d");n.clearRect(0,0,i.width,i.height),n.lineJoin="round",this.element=r,e(this,{_ctx:n,_w:i.width,_h:i.height,X:function(t){var r=i.width;return.5*r+t*(.5*r-20)},Y:function(t){var r=i.height;return.5*r-t*(.5*r-20)}}),this.setColor("#000"),n.font="11px sans-serif",t.call(this,i)};return i.prototype.setColor=function(t){return this._ctx.fillStyle=t,this._ctx.strokeStyle=t,this},i.prototype.setLine=function(t){return this._ctx.lineWidth=t,this},i.prototype.fillRect=function(t,i,r,e){t=this.X(t),i=this.Y(i),r=this.X(r),e=this.Y(e);var n=Math.min(t,r),o=Math.min(i,e),h=Math.max(t,r)-n,s=Math.max(i,e)-o;return this._ctx.fillRect(n,o,h,s),this},i.prototype.axes=function(){var t=this._ctx;t.save(),this.setColor("#ddd").fillRect(-1,-1,1,1).setColor("#aaa");var i=this._w,r=Math.floor(.5*i)-.5,e=this._h,n=Math.floor(.5*e)-.5;return t.beginPath(),t.moveTo(0,n),t.lineTo(i,n),t.moveTo(r,0),t.lineTo(r,e),t.stroke(),t.restore(),this},i.prototype.dot=function(t,i,r,e){var o=this.X(t),h=this.Y(i),s=this._ctx;return s.beginPath(),s.arc(o,h,3,0,2*Math.PI,!0),s.fill(),"string"==typeof r&&(void 0===e&&(e=n(t,i)),this.txt(r,t,i,e)),this},i.prototype.txt=function(t,i,r,e){"string"!=typeof e&&(e=""),e=e.toUpperCase(),i=this.X(i),r=this.Y(r);var n=this._ctx;return-1!==e.indexOf("L")?(n.textAlign="start",i+=4):-1!==e.indexOf("R")?(n.textAlign="end",i-=4):n.textAlign="center",-1!==e.indexOf("T")?(n.textBaseline="top",r+=4):-1!==e.indexOf("B")?(n.textBaseline="bottom",r-=4):n.textBaseline="middle",n.fillText(t,i,r),this},i.prototype.drawLine=function(t,i,r,e){t=this.X(t),i=this.Y(i),r=this.X(r),e=this.Y(e);var n=this._ctx;return n.beginPath(),n.moveTo(t,i),n.lineTo(r,e),n.stroke(),this},i.prototype.tri=function(t,i,r,e,n,o){t=this.X(t),i=this.Y(i),r=this.X(r),e=this.Y(e),n=this.X(n),o=this.Y(o);var h=this._ctx;return h.beginPath(),h.moveTo(t,i),h.lineTo(r,e),h.lineTo(n,o),h.closePath(),this},i.prototype.opacity=function(t){return this._ctx.globalAlpha=t,this},i.prototype.setOpacity=function(t){return this._ctx.globalAlpha=t,this},i.prototype.fillTri=function(t,i,r,e,n,o){var h=this._ctx;return this.tri(t,i,r,e,n,o),h.fill(),this},i.prototype.fillQuad=function(t,i,r,e,n,o,h,s){return this.fillTri(t,i,r,e,n,o).fillTri(t,i,n,o,h,s)},i.prototype.drawQuad=function(t,i,r,e,n,o,h,s){return this.drawTri(t,i,r,e,n,o).drawTri(t,i,n,o,h,s)},i.prototype.drawTri=function(t,i,r,e,n,o){var h=this._ctx;return this.tri(t,i,r,e,n,o),h.stroke(),this},i.prototype.txtLB=function(t,i,r){return this.txt(t,i,r,"LB")},i.prototype.txtL=function(t,i,r){return this.txt(t,i,r,"L")},i.prototype.txtR=function(t,i,r){return this.txt(t,i,r,"R")},i.prototype.txtT=function(t,i,r){return this.txt(t,i,r,"T")},i.prototype.txtB=function(t,i,r){return this.txt(t,i,r,"B")},i.prototype.txtLT=function(t,i,r){return this.txt(t,i,r,"LT")},i.prototype.txtLB=function(t,i,r){return this.txt(t,i,r,"LB")},i.prototype.txtRT=function(t,i,r){return this.txt(t,i,r,"RT")},i.prototype.txtRB=function(t,i,r){return this.txt(t,i,r,"RB")},i};var s=1e-6,a=Math.PI;i.exports._=o});
//# sourceMappingURL=draw.js.map
require("wdg.vectorDrawing",function(t,i,r){function l(t,i,r,l,n){var a=o*r[0]+t,s=o*r[1]+i,e=o*l[0]+t,c=o*l[1]+i,h=o*n[0]+t,d=o*n[1]+i;this.setColor(this.ORANGE).fillTri(a,s,e,c,h,d)}function n(t,i,r,l,n,a){var s=o*r[0]+t,e=o*r[1]+i,c=o*l[0]+t,h=o*l[1]+i,d=o*n[0]+t,u=o*n[1]+i,f=o*a[0]+t,w=o*a[1]+i;this.setColor(this.BLUE).setLine(4).drawLine(s,e,c,h).drawLine(c,h,d,u).drawLine(d,u,f,w).drawLine(f,w,s,e).setColor("#000").dot(o*r[0]+t,o*r[1]+i,"A","B").dot(o*l[0]+t,o*l[1]+i,"B","LT").dot(o*n[0]+t,o*n[1]+i,"C","B").dot(o*a[0]+t,o*a[1]+i,"D","RT")}var a=function(){function i(){return l(r,arguments)}var r={en:{},fr:{}},l=t("$").intl;return i.all=r,i}(),o=.4;i.exports=t("draw")(function(){var t=[0,1],i=[.8,-.5],r=[0,0],a=[-.8,-.5];l.call(this,-.5,.5,t,i,r),n.call(this,-.5,.5,t,i,r,a),l.call(this,.5,.5,i,r,a),n.call(this,.5,.5,t,i,r,a),l.call(this,-.5,-.5,r,a,t),n.call(this,-.5,-.5,t,i,r,a),l.call(this,.5,-.5,a,t,i),n.call(this,.5,-.5,t,i,r,a)}),i.exports._=a});
//# sourceMappingURL=wdg.vectorDrawing.js.map
require("wdg.matrix",function(t,r,n){function e(t){if(t.text.length<=t.cursor)return!1;var r=t.text.charAt(t.cursor++).trim();return 0===r.length||("["===r?a(t):"*"===r?d(t):i(r,t))}function i(t,r){var n=u.div();return n.textContent=t,r.parent.appendChild(n),!0}function d(t){var r=u.div();return r.innerHTML="&times;",t.parent.appendChild(r),!0}function a(t){var r=u.div("mtx"),n=u.div(),e=u.div();for(r.appendChild(n),n.appendChild(e);t.cursor<t.text.length;){var i=t.text.charAt(t.cursor++).trim();if("]"===i)break;","===i?(e=u.div(),n.appendChild(e)):";"===i?(n=u.div(),r.appendChild(n),e=u.div(),n.appendChild(e)):"*"===i?e.innerHTML+="&times;":e.textContent+=i}return t.parent.appendChild(r),!0}var p=function(){function r(){return e(n,arguments)}var n={en:{},fr:{}},e=t("$").intl;return r.all=n,r}(),u=t("dom"),o=function(t){void 0===t&&(t="");var r=(""+t.value).trim(),n=u.div("wdg-matrix");this.element=n;for(var i={parent:n,cursor:0,text:r};e(i););};r.exports=o,r.exports._=p});
//# sourceMappingURL=wdg.matrix.js.map
require("wdg.vectorDrawing3",function(t,r,n){function a(t){switch(t){case 0:return o();case 1:return e();case 2:return h();case 3:return i();case 4:return s();case 5:return c()}return u()}function e(){return[0,.7,.3,0,1,.4,.9,0,.5,-.4,-.5,-.4,-.9,0,-1,.4,-.3,0]}function o(){return[.2,1,1,-.2,-.9,-.7]}function h(){for(var t,r=[],n=0;n<10;n++)t=.3+n%2*.6,r.push(t*Math.sin(Math.PI*n/5),t*Math.cos(Math.PI*n/5));return r}function i(){for(var t=.95,r=[],n=0;n<6;n++)t=.2+n%2*.6,r.push(t*Math.cos(2*Math.PI*n/6),t*Math.sin(2*Math.PI*n/6));return r}function s(){var t,r,n=10,a=[];for(r=0;r<n;r++)t=1-.7*r/n,a.push(t*Math.cos(3*Math.PI*r/n),t*Math.sin(3*Math.PI*r/n));for(r=9;r>-1;r--)t=.8-.7*r/n,a.push(t*Math.cos(3*Math.PI*r/n),t*Math.sin(3*Math.PI*r/n));return a}function u(){for(var t,r=[],n=0;n<8;n++)t=.75*Math.random()+.25,r.push(t*Math.cos(2*Math.PI*n/8),t*Math.sin(2*Math.PI*n/8));return r}function c(){var t=.4+.6*Math.random(),r=.4+.6*Math.random(),n=.4+.6*Math.random();return[-.6,t,-.3,t,-.3,.2,-.1,.2,-.2,r,.2,r,.1,.2,.3,.2,.3,n,.6,n,.5,0,.3,-.2,.4,-1,-.4,-1,-.3,-.2,-.5,0]}var f=function(){function r(){return a(n,arguments)}var n={en:{},fr:{}},a=t("$").intl;return r.all=n,r}(),l=t("webgl.fillpoly");r.exports=t("draw")(function(t){console.info("[wdg.vectorDrawing3] args=",t);var r=a(parseInt(t.index)),n=l.fillPolyline(r);console.info("[wdg.vectorDrawing3] elemBuff=",n);var e,o,h,i,s,u,c,f,M,g;for(e=0;e<n.length;e+=3)o=2*n[e],h=r[o],i=r[o+1],o=2*n[(e+1)%n.length],s=r[o],u=r[o+1],o=2*n[(e+2)%n.length],c=r[o],f=r[o+1],this.setOpacity(.5).setColor(this.ORANGE).fillTri(h,i,s,u,c,f),M=(h+s+c)/3,g=(i+u+f)/3,this.setOpacity(1).setColor(this.BLUE).txt(Math.floor(e/3),M,g,"");for(this.setOpacity(1).setLine(2).setColor(this.BLUE),e=0;e<n.length;e+=3)o=2*n[e],h=r[o],i=r[o+1],o=2*n[(e+1)%n.length],s=r[o],u=r[o+1],o=2*n[(e+2)%n.length],c=r[o],f=r[o+1],this.drawTri(h,i,s,u,c,f);for(this.setColor("#000"),e=0;e<r.length;e+=2)h=r[e],i=r[e+1],this.dot(h,i,"ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(e/2))}),r.exports._=f});
//# sourceMappingURL=wdg.vectorDrawing3.js.map
require("webgl.fillpoly",function(t,r,e){function i(t,r,e){void 0===r&&(r=2),void 0===e&&(e=0);var i=new h(t,r),s=Math.floor(t.length/r),o=s-2,c=n(-1,i,e,r);return c&&c.length===3*o?c:(i=new h(t,r),new Uint16Array(n(1,i,e,r)))}function n(t,r,e,i){for(var n,s,o,h=[];r.length>3;){for(var c=0;!r.isCandidate(t)&&c++<r.length;)c++,r.next();if(c>=r.length)return null;n=r.get(),h.push(e+n.index,e+n.next,e+n.prev),r.removeTriangle(n.index,n.next,n.prev)}return r.isCandidate(t)?(n=r.get(),s=r.get(n.next),o=r.get(n.prev),h.push(e+n.index,e+s.index,e+o.index),h):null}function s(t){var r="";return Array.prototype.slice.call(arguments).forEach(function(t){r+=c.charAt(t)}),r}var o=function(){function r(){return i(e,arguments)}var e={en:{},fr:{}},i=t("$").intl;return r.all=e,r}();e.fillPolyline=i;var h=function(t,r){for(var e=[],i=Math.floor(t.length/r),n=0;n<i;n++)e.push([n*r,(n+i-1)%i,(n+1)%i]);this.length=i,this._vertices=t,this._cursor=0,this._points=e};h.prototype.isCandidate=function(t){var r=this._cursor,e=this.get(r),i=e.next,n=e.prev,s=this.getVector(r,i),o=this.getVector(r,n),h=this.cross(s,o);if(h>0&&t>0)return!1;if(h<0&&t<0)return!1;for(var c=0;c<this._points.length;c++)if(c!==r&&c!==i&&c!==n&&this.isInTriangle(r,c,t))return!1;return!0},h.prototype.get=function(t){void 0===t&&(t=this._cursor);var r=this._points[t],e=r[0];return{index:t,next:r[2],prev:r[1],x:this._vertices[e],y:this._vertices[e+1]}},h.prototype.getVector=function(t,r){var e=this.get(t),i=this.get(r);return{x:i.x-e.x,y:i.y-e.y}},h.prototype.cross=function(t,r){return t.x*r.y-t.y*r.x},h.prototype.isInTriangle=function(t,r,e){var i=this.get(t),n=i.next,s=i.prev;return e>0?this.isInTrianglePos(t,n,s,r):this.isInTriangleNeg(t,n,s,r)},h.prototype.isInTriangleNeg=function(t,r,e,i){var n=this.getVector(t,r),s=this.getVector(t,i);if(this.cross(n,s)<0)return!1;var o=this.getVector(r,e),h=this.getVector(r,i);if(this.cross(o,h)<0)return!1;var c=this.getVector(e,t),u=this.getVector(e,i);return!(this.cross(c,u)<0)},h.prototype.isInTrianglePos=function(t,r,e,i){var n=this.getVector(t,r),s=this.getVector(t,i);if(this.cross(n,s)>0)return!1;var o=this.getVector(r,e),h=this.getVector(r,i);if(this.cross(o,h)>0)return!1;var c=this.getVector(e,t),u=this.getVector(e,i);return!(this.cross(c,u)>0)},h.prototype.next=function(){var t=this._cursor;this._cursor=this._points[t][2]},h.prototype.removeTriangle=function(t,r,e){this._points[e][2]=r,this._points[r][1]=e,this.length--,this._cursor=r;var i="",n=r;do{i+=s(n),n=this._points[n][2]}while(n!==r)};var c="ABCDEFGHIJKLMNOPQRSTUVWXYZ";r.exports._=o});
//# sourceMappingURL=webgl.fillpoly.js.map
