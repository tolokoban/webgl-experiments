"use strict";


var CODE_BEHIND = {
  refresh: refresh
};

require("theme");
var $ = require("dom");
var MenuItem = require("wdg.menu.item");


function refresh() {
  var article = this.$elements.article;
  $.clear( article );
  this.value.forEach(function (item) {
    var m = new MenuItem({
      id: item[0],
      title: item[1],
      keywords: item[2]
    });
    $.add( article, m );
  });
  $.add( article, $.tag("hr") );
  $.add( article, $.tag("a", { href: "doc.html" }, ["Liens utiles vers de la documentation"]) );
  $.add( article, $.tag("br") );
}
