var canvas = document.createElement("canvas");
canvas.width = 128;
canvas.height = 128;
var ctx = canvas.getContext("2d");

ctx.fillStyle = "#333";
ctx.fillRect(0, 0, 128, 128);
ctx.fillStyle = "#f80";
ctx.fillRect(4, 4, 120, 120);
ctx.font = 'Bold 96px Arial';
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#333";
ctx.fillText("A", 64, 64);

console.info("[taquin.cube] canvas=...", canvas);
var texture = new THREE.Texture( canvas );
texture.needsUpdate = true;


module.exports = function(x, y, z) {
    /*
     var grp = new THREE.Group();


     return grp;
     */
    /*
     */
    console.info("[taquin.cube] texture=...", texture);
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
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
