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
  var children = [
    {
      type: TAG,
      name: 'wdg:menu',
      attribs: { $value: value }
    }
  ];
  root.children = children;
  libs.compile( root );  
};
