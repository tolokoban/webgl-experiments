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
        W('wdg.article92', 'wdg.article', {"content": [
          W({
              elem: "p",
              children: [W('wdg','transparence',{},{"id":"wdg","name":"transparence"})]}),
          W({
              elem: "p",
              children: [W({
                  elem: "div",
                  attr: {"style": "width: 480px"},
                  children: [
                    "\n   ",
                    W('white','wdg.checkbox',{
                      wide: "true",
                      text: "Arrière-plan blanc",
                      value: "false"},{"id":"white"}),
                    "\n   ",
                    W('depth','wdg.checkbox',{
                      wide: "true",
                      text: "Ecrire dans le Z-buffer",
                      value: "true"},{"id":"depth"}),
                    "\n   ",
                    W('bright','wdg.checkbox',{
                      wide: "true",
                      text: "Couleurs pâles",
                      value: "false"},{"id":"bright"}),
                    "\n   ",
                    W('multiply','wdg.checkbox',{
                      wide: "true",
                      text: "Combiner par multiplication",
                      value: "false"},{"id":"multiply"}),
                    "\n"]})]}),
          W({
              elem: "h1",
              attr: {"id": "peut-on-viter-le-tri-"},
              children: ["Peut-on éviter le tri ?"]}),
          W({
              elem: "p",
              children: ["Le tri a deux inconvénients majeurs"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Il consomme du CPU : plus il y a d",
                    "&#39;",
                    "objets à trier et plus le temps de tri sera long."]}),
                "\n",
                W({
                  elem: "li",
                  children: [
                    "Il ne gère pas les intersections : quand deux objets se coupent, aucun n",
                    "&#39;",
                    "est devant l",
                    "&#39;",
                    "autre."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "animation ci-dessus n",
                "&#39;",
                "utilise pas de tri. Elle commence par dessiner un arrière-plan (que l",
                "&#39;",
                "on peut retirer avec le switch ",
                W({
                  elem: "strong",
                  children: ["Arrière-plan blanc"]}),
                "), puis un trapèze gris opaque et enfin trois rectangles transparents."]}),
          W({
              elem: "p",
              children: [
                "On veut utiliser le z-buffer parce que le trapèze gris opaque doit pouvoir cacher les rectangles transparents. Donc à chaque fragment que l",
                "&#39;",
                "on veut dessiner, on vérifie qu",
                "&#39;",
                "il n",
                "&#39;",
                "y a pas dans le z-buffer un fragment plus proche de la caméra.",
                W({
                  elem: "br"}),
                "Mais on a vu au chapitre précédent que ceci pose problème pour la transparence. Vous pouvez constater ce défaut sur l",
                "&#39;",
                "animation."]}),
          W({
              elem: "p",
              children: [
                "Il semble qu",
                "&#39;",
                "on soit confronté à un dilemme insoluble. Heureusement, OpenGL a tout prévu.\nIl est possible de toujours réaliser le test du z-buffer, mais de désactiver sa mise à jour.\nEn effet, dans le cas standard l",
                "&#39;",
                "affichage d",
                "&#39;",
                "un fragment suit l",
                "&#39;",
                "algorithme suivant :"]}),
          W({
              elem: "ul",
              children: [
                "\n",
                W({
                  elem: "li",
                  children: ["Tester le z-buffer par rapport au Z du fragment courant."]}),
                "\n",
                W({
                  elem: "li",
                  children: ["Dessiner le fragment."]}),
                "\n",
                W({
                  elem: "li",
                  children: ["Mettre à jour le z-buffer avec le Z du fragment courant."]}),
                "\n"]}),
          W({
              elem: "p",
              children: [
                "L",
                "&#39;",
                "instruction suivante permet de ne pas réaliser la troisième action (seulement pour les 3 rectangles transparents, bien-sûr)."]}),
          W({
              elem: "p",
              children: [W({
                  elem: "code",
                  children: ["gl.depthMask( false );"]})]})]},{"id":"wdg.article92"})
        W.bind('wdg',{"white":{"B":[["white","value"]]},"depth":{"B":[["depth","value"]]},"bright":{"B":[["bright","value"]]},"multiply":{"B":[["multiply","value"]]}});
    }
);
