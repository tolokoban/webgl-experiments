/**
 * Component page
 */

exports.tags = [ "x-menu" ];
exports.priority = 0;

/**
 * Compile a node of the HTML tree.
 */
exports.compile = function( root, libs ) {
    var TAG = libs.Tree.TAG;
    var text = libs.Tree.text( root );
    var value = JSON.parse( text );
    root.name = 'x-html';
    /*
      <meta property="fb:app_id" content="23136566560" />
      <meta property="og:title" content="<?php echo $title; ?>" />
      <meta property="og:description" content="<?php echo $desc; ?>" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://trail-passion.net/og.php?id=<?php echo $id; ?>" />
      <meta property="og:image"
      content="https://trail-passion.net/tfw/pub/preview/<?php echo $id; ?>.fb.jpg" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="300" />
    */
    var children = [
        {
            type: TAG,
            name: "head",
            children: [
                meta( TAG, "og:title", "Tolokoban WebGL tutorial" ),
                meta( TAG, "og:description", "Didactitiel illustré pour apprendre WebGL" ),
                meta( TAG, "og:type", "website" ),
                meta( TAG, "og:url", "https://tolokoban.github.io/webgl-experiments/index.html" ),
                meta( TAG, "og:image", "https://tolokoban.github.io/webgl-experiments/logo.jpg" ),
                meta( TAG, "og:width", "1200" ),
                meta( TAG, "og:height", "600" )                
            ]
        },
        {
            type: TAG,
            name: 'wdg:menu',
            attribs: { $value: value }
        }
    ];
    root.children = children;
    libs.compile( root );
};


function meta( TAG, property, content ) {
    return {
        type: TAG,
        name: "meta",
        attribs: { property, content }
    };
}
