var Webgl = require("tfw.webgl");


var ExplosiveTp = function(canvas) {
    var webgl = new Webgl(canvas);
    var prg = webgl.createProgram({
        vertex:   GLOBAL.vert,
        fragment: GLOBAL.frag
    });

    this._webgl = webgl;
    this._prg = prg;
    this._loaded = false;

    var logo = new Image();
    logo.src = "css/explosive-tp/tp.png";
    logo.onload = start.bind( this, logo );
};

/**
 * @return void
 */
ExplosiveTp.prototype.render = function(time) {
    if (!this._loaded) return;

    var gl = this._webgl.gl;
    var prg = this._prg;
    prg.use();
    prg.$uniTime = time;
    gl.drawArrays(gl.POINTS, 0, this._count);    
};


function start( logo ) {
    var webgl = this._webgl;
    var gl = webgl.gl;
    
    // #(vertices)
    // Création d'un buffer dans la carte graphique.
    // Un buffer est un tableau de nombres.
    var bufAttributes = gl.createBuffer();
    // Définir ce buffer comme le buffer actif.
    gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);
    // Lire les pixels de l'image.
    var col, row, index = 0, data = webgl.getDataFromImage(logo);
    var points = [];
    for (row = 0; row < logo.height; row++) {
        for (col = 0; col < logo.width; col++) {
            // On ne conserve que le noir.
            // Le data d'une image est une suite de pixels.
            // Chaque pixel est composé de 4 nombres entre 0 et 256 :
            // rouge, vert, bleu, opacité.
            if (data[index] + data[index + 1] + data[index + 2] < 50) {
                // On ne tient pas compte des pixels transparents.
                if (data[index + 3] > 240 ) {
                    points.push([
                        2 * col / logo.width - 1,
                        1 - 2 * row / logo.height
                    ]);
                }
            }
            index += 4;
        }
    }
    // Les attributs des vertex.
    var count = points.length;
    var arrAttributes = [];

    points.forEach(function (pt) {
        arrAttributes.push(pt[0]);
        arrAttributes.push(pt[1]);
        arrAttributes.push(Math.random());
        arrAttributes.push(Math.random());
        arrAttributes.push(Math.random());
        arrAttributes.push(Math.random());
    });
    var datAttributes = new Float32Array(arrAttributes);
    // Copier des données dans le buffer actif.
    gl.bufferData(gl.ARRAY_BUFFER, datAttributes, gl.STATIC_DRAW);
    // #(vertices)

    // #(attributes)
    var bpe = datAttributes.BYTES_PER_ELEMENT;
    var blockSize = 6 * bpe;
    // attPosition
    var attPosition = gl.getAttribLocation(this._prg.program, "attPosition");
    gl.enableVertexAttribArray(attPosition);
    gl.vertexAttribPointer(attPosition, 2, gl.FLOAT, false, blockSize, 0);
    // attRandom
    var attRandom = gl.getAttribLocation(this._prg.program, "attRandom");
    gl.enableVertexAttribArray(attRandom);
    gl.vertexAttribPointer(attRandom, 4, gl.FLOAT, false, blockSize, 2 * bpe);
    // #(attributes)

    // #(blend)
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
    gl.blendEquation(gl.FUNC_ADD);
    // #(blend)

    // #(rendering)
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufAttributes);

    this._loaded = true;
    this._count = count;
}


module.exports = ExplosiveTp;
