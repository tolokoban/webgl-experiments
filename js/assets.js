"use strict";

/** @module assets */
require('assets', function (require, module, exports) {
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

  module.exports._ = _;
});
//# sourceMappingURL=assets.js.map