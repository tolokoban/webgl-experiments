


module.exports = function(x, y, z) {
    /*
     var grp = new THREE.Group();


     return grp;
     */
    /*
     */
    var texture = createTexture("ABCDEFGHI".charAt((x+y+z) % 9), 
                                "rgb(" 
                                + Math.floor(64 + x*64) + ","
                                + Math.floor(64 + y*64) + ","
                                + Math.floor(64 + z*64)
                                + ")");
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial({
//        color: 0x00ff00,
        specular: 0x333333,
        shininess: 25,
        map: texture,
        specularMap: null,
        normalMap: null
    });
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(x - 1, y - 1, z - 1);
    return mesh;
};


function createCanvas(text, color) {
    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, 124, 124);
    ctx.fillStyle = color;
    ctx.fillRect(4, 4, 120, 120);
    ctx.font = 'Bold 96px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.fillText(text, 64, 64);

    return canvas;
}

function createTexture(text, color) {
    var canvasArray = [];
    canvasArray.push( createCanvas(text, color) );
    canvasArray.push( createCanvas(text, "#0f0") );
    canvasArray.push( createCanvas(text, "#f00") );
    canvasArray.push( createCanvas(text, "#88f") );
    canvasArray.push( createCanvas(text, "#8f8") );
    canvasArray.push( createCanvas(text, "#f88") );

    var texture = new THREE.Texture( canvasArray[0] );
    texture.needsUpdate = true;
    return texture;
}
