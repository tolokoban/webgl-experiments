window.WallPainter = function( gl, cave, assets ) {
  var WP = function( gl, caveDef ) {
    var rows = cave.length;
    var cols = cave[0].length;
    var col, row;
    var vertexArray = [];
    
    for( row = 0; row < rows; row++ ) {
      for( col = 0; col < cols; col++ ) {
        if( cave.get( row, col ) ) {
          vertexArray.push(
            col, row,
            col + 1, row,
            col + 1, row + 1,
            col, row,
            col, row + 1,
            col + 1, row + 1
          );
        }
      }
    }

    var buffer = WebGL.fillArrayBuffer( gl, new Float32Array( vertexArray ) );
  };

  return WP;
}();
