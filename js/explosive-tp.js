/** @module explosive-tp */require( 'explosive-tp', function(require, module, exports) { var _=function(){var D={"en":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
 var GLOBAL = {
<<<<<<< HEAD
  "vert": "// Temps courant en millisecondes\nuniform float uniTime;\n\n// Position en valeurs comprises entre -1.0 et +1.0\nattribute vec2 attPosition;\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\n// Ces valeurs donnent la \"personnalité\" de la particule\nattribute vec4 attRandom;\n\n// Couleur pour le fragment shader\nvarying vec3 varColor;\n// Indique au fragment shader si les particules sont\n// en place (1.0) ou en mouvement désordonné (0.0)\nvarying float varCoeff;\n\nvoid main() {\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\n  // Position \"en place\" de la particule.\n  float x = attPosition.x;\n  float y = attPosition.y;\n\n  // Créer un léger mouvement autour de la position normale.\n  float radius = .02 * cos(t * attRandom.y);\n  float ang = uniTime * attRandom.z / 100.0;\n  x = x + radius * cos(ang);\n  y = y + radius * sin(ang);\n\n  // Coordonnées aléatoires en rotation dans tout l'espace.\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\n  ang = t * attRandom.x * 0.1;\n  float xx = radius * cos(ang);\n  float yy = radius * sin(ang);\n\n  // Dans un cycle de 12 secondes, l'image est stable\n  // pendant 8 secondes et en vrac pendant 4.\n  float c1 = 0.0;\n  float tt = mod(uniTime, 12000.0);\n  if (tt < 4000.0) {\n    c1 = sin(tt * 3.1415926539 / 4000.0);\n  }\n  float c2 = 1.0 - c1;\n\n  varCoeff = c2;\n  // Petites variations de vert.\n  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );\n  // La position est intrerpolée entre (x,y) et (xx,yy).\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\n  // Palpitation de la taille et diminution lors de la phase de désordre.\n  ang = t * attRandom.x;\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\n}\n",
  "frag": "precision mediump float;\n\nvarying vec3 varColor;\nvarying float varCoeff;\n\nvoid main() {\n  // Calculons la distance du fragment courant\n  // au centre du point.\n  float x = gl_PointCoord.x - 0.5;\n  float y = gl_PointCoord.y - 0.5;\n  // On ne calcule pas la racine carré pour gagner du temps.\n  float r = x*x + y*y;\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\n\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\n}\n"};
=======
  "vert": "// Temps courant en millisecondes\r\nuniform float uniTime;\r\n\r\n// Position en valeurs comprises entre -1.0 et +1.0\r\nattribute vec2 attPosition;\r\n// 4 Valeurs aléatoires comprises entre 0.0 et 1.0\r\n// Ces valeurs donnent la \"personnalité\" de la particule\r\nattribute vec4 attRandom;\r\n\r\n// Couleur pour le fragment shader\r\nvarying vec3 varColor;\r\n// Indique au fragment shader si les particules sont\r\n// en place (1.0) ou en mouvement désordonné (0.0)\r\nvarying float varCoeff;\r\n\r\nvoid main() {\r\n  float t = dot(attRandom, attRandom) * 10000.0 + uniTime / 100.0;\r\n  // Position \"en place\" de la particule.\r\n  float x = attPosition.x;\r\n  float y = attPosition.y;\r\n\r\n  // Créer un léger mouvement autour de la position normale.\r\n  float radius = .02 * cos(t * attRandom.y);\r\n  float ang = uniTime * attRandom.z / 100.0;\r\n  x = x + radius * cos(ang);\r\n  y = y + radius * sin(ang);\r\n\r\n  // Coordonnées aléatoires en rotation dans tout l'espace.\r\n  radius = 1.5 * sin(t * 0.01 * (attRandom.y + attRandom.x));\r\n  ang = t * attRandom.x * 0.1;\r\n  float xx = radius * cos(ang);\r\n  float yy = radius * sin(ang);\r\n\r\n  // Dans un cycle de 12 secondes, l'image est stable\r\n  // pendant 8 secondes et en vrac pendant 4.\r\n  float c1 = 0.0;\r\n  float tt = mod(uniTime, 12000.0);\r\n  if (tt < 4000.0) {\r\n    c1 = sin(tt * 3.1415926539 / 4000.0);\r\n  }\r\n  float c2 = 1.0 - c1;\r\n\r\n  varCoeff = c2;\r\n  // Petites variations de vert.\r\n  varColor = vec3( 0.0, .3 + .1 * abs(cos(attRandom.x * uniTime * 0.01)), 0.0 );\r\n  // La position est intrerpolée entre (x,y) et (xx,yy).\r\n  gl_Position = vec4( x * c2 + xx * c1, y * c2 + yy * c1, 0.0, 1.0 );\r\n  // Palpitation de la taille et diminution lors de la phase de désordre.\r\n  ang = t * attRandom.x;\r\n  gl_PointSize = max(8.0, (32.0 + 8.0 * cos(ang)) * (.5 + c2 * .5));\r\n}\r\n",
  "frag": "precision mediump float;\r\n\r\nvarying vec3 varColor;\r\nvarying float varCoeff;\r\n\r\nvoid main() {\r\n  // Calculons la distance du fragment courant\r\n  // au centre du point.\r\n  float x = gl_PointCoord.x - 0.5;\r\n  float y = gl_PointCoord.y - 0.5;\r\n  // On ne calcule pas la racine carré pour gagner du temps.\r\n  float r = x*x + y*y;\r\n  float alpha = clamp(1.0 - r * 4.0, 0.0, 1.0);\r\n\r\n  gl_FragColor = vec4( varColor, alpha * (1.0 - varCoeff * 0.3) );\r\n}\r\n"};
>>>>>>> 0277ca951134712cdb86243b1d949f854aaae6ee
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
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
    gl.blendEquation(gl.FUNC_ADD);

    prg.$uniTime = time;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);    
    var bpe = this._data.BYTES_PER_ELEMENT;
    var blockSize = 6 * bpe;
    // attPosition
    var attPosition = gl.getAttribLocation(this._prg.program, "attPosition");
    gl.enableVertexAttribArray(attPosition);
    gl.vertexAttribPointer(attPosition, 2, gl.FLOAT, false, blockSize, 0);
    // attRandom
    var attRandom = gl.getAttribLocation(this._prg.program, "attRandom");
    gl.enableVertexAttribArray(attRandom);
    gl.vertexAttribPointer(attRandom, 4, gl.FLOAT, false, blockSize, 2 * bpe);

    gl.bufferData(gl.ARRAY_BUFFER, this._data, gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, this._count);    
};


function start( logo ) {
    var webgl = this._webgl;
    var gl = webgl.gl;
    
    // #(vertices)
    // Création d'un buffer dans la carte graphique.
    // Un buffer est un tableau de nombres.
    var bufAttributes = gl.createBuffer();
    this._buffer = bufAttributes;
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
    this._data = datAttributes;
}


module.exports = ExplosiveTp;


  
module.exports._ = _;
/**
 * @module explosive-tp
 * @see module:$
 * @see module:tfw.webgl

 */
});