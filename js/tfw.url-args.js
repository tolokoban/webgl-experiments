"use strict";

/** @module tfw.url-args */
require('tfw.url-args', function (require, module, exports) {
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

  exports.parse = function () {
    var args = {},
        t = location.search,
        i,
        x;
    if (t.length < 2) return args;
    t = t.substring(1).split('&');

    for (i = 0; i < t.length; i++) {
      x = t[i].split('=');

      if (x.length == 1) {
        args[""] = decodeURIComponent(x[0]);
      } else {
        args[x[0]] = decodeURIComponent(x[1]);
      }
    }

    return args;
  };

  exports.stringify = function (args) {};

  module.exports._ = _;
});
//# sourceMappingURL=tfw.url-args.js.map