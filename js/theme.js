"use strict";

/** @module theme */
require('theme', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {},
      "fr": {}
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  "use strict";

  require("assets");

  require("font.josefin");

  var $ = require("dom");

  $.registerTheme("main", {
    bgP: "#06D",
    bgS: "#F80"
  });
  $.applyTheme("main");
  module.exports._ = _;
});
//# sourceMappingURL=theme.js.map