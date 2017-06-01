/**
 * Component page
 */

exports.tags = [ "page" ];
exports.priority = 0;

/**
 * Compile a node of the HTML tree.
 */
exports.compile = function( root, libs ) {
  var TAG = libs.Tree.TAG;
  root.name = 'x-html';
  var children = [
    {
      type: TAG,
      name: 'wdg:article',
      children: [
        {
          type: TAG,
          name: 'content',
          children: [
            {
              type: TAG,
              name: 'x-md',
              children: root.children
            }
          ]
        }
      ]
    }
  ];
  root.children = children;
  libs.compile( root );
};
