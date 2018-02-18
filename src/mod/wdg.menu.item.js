// Code behind.
"use strict";

var CODE_BEHIND = {
  onLoad: onLoad
};

var $ = require("dom");

function onLoad() {
  $.removeClass( this.$elements.background, "hide" );
}
