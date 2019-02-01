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
  const TAG = libs.Tree.TAG;
  const att = root.attribs || {};
  root.name = 'wdg:showhide';
  root.attribs = {
    $value: false,
    $label: att.label || "Exemple de code"
  };
  const children = [
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
      children
    }
  ];

  libs.compile( root );
};
