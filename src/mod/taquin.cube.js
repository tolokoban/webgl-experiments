


module.exports = function(x, y, z) {
    var materials = z == 0 ?
        [
            createMaterial(
                "F", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "white"),
            createMaterial(
                "B", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "white"),
            createMaterial(
                "R", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "white"),
            createMaterial(
                "L", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "white"),
            createMaterial(
                "U", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "white"),
            createMaterial(
                "D", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "white"),
        ] :
        [
            createMaterial(
                "F", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "rgb("
                    + Math.floor(x*128) + ","
                    + Math.floor(y*128) + ","
                    + Math.floor(z*128)
                    + ")"),
            createMaterial(
                "B", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "rgb("
                    + Math.floor(255 - x*128) + ","
                    + Math.floor(y*128) + ","
                    + Math.floor(z*128)
                    + ")"),
            createMaterial(
                "R", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "rgb("
                    + Math.floor(x*128) + ","
                    + Math.floor(255 - y*128) + ","
                    + Math.floor(z*128)
                    + ")"),
            createMaterial(
                "L", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "rgb("
                    + Math.floor(x*128) + ","
                    + Math.floor(y*128) + ","
                    + Math.floor(255 - z*128)
                    + ")"),
            createMaterial(
                "U", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "rgb("
                    + Math.floor(255 - x*128) + ","
                    + Math.floor(255 - y*128) + ","
                    + Math.floor(z*128)
                    + ")"),
            createMaterial(
                "D", //"ABCDEFGHI".charAt((x+y+z) % 9),
                "rgb("
                    + Math.floor(255 - x*128) + ","
                    + Math.floor(255 - y*128) + ","
                    + Math.floor(255 - z*128)
                    + ")")
        ];
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1, 1, 1, 1 ),
        new THREE.MeshFaceMaterial( materials )
    );

    mesh.position.set(x - 1, y - 1, z - 1);
    return mesh;
};




function createCanvas(text, color) {
    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 128);
    ctx.font = 'Bold 96px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.fillText(text, 64, 64);

    return canvas;
}

function createTexture(text, color) {
    var texture = new THREE.Texture(  createCanvas(text, color) );
    texture.needsUpdate = true;
    return texture;
}

function createBump(text) {
    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "#777";
    ctx.fillRect(1, 1, 126, 126);
    ctx.font = 'Bold 96px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255, 255, 255, .3)";
    var x, y;
    for (y = -2 ; y < 3 ; y++) {
        for (x = -2 ; x < 3 ; x++) {
            ctx.fillText(text, 64 + x, 64 + y);
        }
    }

    var texture = new THREE.Texture(  canvas );
    texture.needsUpdate = true;
    return texture;
}

function createMaterial(text, color) {
    return new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 25,
        map: createTexture(text, color),
        specularMap: null,
        bumpMap: createBump(text)
    });
}
