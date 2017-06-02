"use strict";

/**
 * Component page
 */

exports.tags = [ "ex" ];
exports.priority = 0;

/**
 * Compile a node of the HTML tree.
 */
exports.compile = function( root, libs ) {
  var TAG = libs.Tree.TAG;
  var att = root.attribs || {};
  root.name = 'wdg:showhide';
  root.attribs = {
    $value: false,
    $label: att.label || "Exemple de code"
  };
  var children = [
    {
      type: TAG,
      name: 'x-code',
      attribs: {
        src: att.src,
        lang: att.lang || "js",
        section: att.section
      },
      children: root.children
    }
  ];
  root.children = [
    {
      type: TAG,
      name: "content",
      children: children
    }
  ];

  console.log(libs.Tree.toString(root).yellow.bold);
  
  libs.compile( root );
  
};
