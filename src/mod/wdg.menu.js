"use strict";


var CODE_BEHIND = {
  refresh: refresh
};

require("theme");
require("assets");
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
}
