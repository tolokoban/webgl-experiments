"use strict";

/** @module tfw.data-binding */
require('tfw.data-binding', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {}
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  "use strict";
  /**
   * @module
   *
   * Provide all the functions needed for data-binding.
   * JavaScript object have __attributes__.
   * Data-binding add a new comcept to objects: __properties__.
   * A property is an attribute you can listen for get and set operations.
   *
   * @example
   * var DB = require('tfw.data-binding');
   * DB.propAddClass( widget, 'visible', 'show' );
   */


  require("polyfill.string");

  var $ = require("dom"),
      ParseUnit = require("tfw.css").parseUnit,
      Listeners = require("tfw.listeners");

  var ID = '_tfw.data-binding_',
      converters = {
    castFunction: function castFunction(v) {
      if (typeof v !== 'function') return null;
      return v;
    },
    castArray: function castArray(v) {
      if (Array.isArray(v)) return v;
      if (v === null || v === undefined) return [];
      return [v];
    },
    castBoolean: function castBoolean(v) {
      if (typeof v === 'boolean') return v;

      if (typeof v === 'string') {
        v = v.trim().toLowerCase();

        if (v === '0' || v === 'false' || v === 'no' || v === 'null' || v === 'undefined') {
          return false;
        }

        return true;
      }

      if (typeof v === 'number') {
        return v !== 0 ? true : false;
      }

      return null;
    },
    castColor: function castColor(v) {
      return "" + v;
    },
    castDate: function castDate(v) {
      if (typeof v === 'number' || typeof v === 'string') return new Date(v);
      if (v instanceof Date) return v;
      return new Date();
    },
    castEnum: function castEnum(enumeration) {
      var lowerCaseEnum = enumeration.map(toLowerCase);
      return function (v) {
        if (typeof v === 'number') {
          return enumeration[Math.floor(v) % enumeration.length];
        }

        if (typeof v !== 'string') return enumeration[0];
        var idx = lowerCaseEnum.indexOf(v.trim().toLowerCase());
        if (idx < 0) idx = 0;
        return enumeration[idx];
      };
    },
    castInteger: function castInteger(v) {
      if (typeof v === 'number') {
        return Math.floor(v);
      }

      if (typeof v === 'boolean') return v ? 1 : 0;

      if (typeof v === 'string') {
        return parseInt(v);
      }

      return Number.NaN;
    },
    castFloat: function castFloat(v) {
      if (typeof v === 'number') {
        return v;
      }

      if (typeof v === 'boolean') return v ? 1 : 0;

      if (typeof v === 'string') {
        return parseFloat(v);
      }

      return Number.NaN;
    },
    castRegexp: function castRegexp(v) {
      if (v instanceof RegExp) return v;

      if (typeof v === 'string' && v.trim().length != 0) {
        try {
          return new RegExp(v);
        } // Ignore Regular Expression errors.
        catch (ex) {
          console.error("[castRegexp] /" + v + "/ ", ex);
        }
      }

      ;
      return null;
    },
    castString: function castString(v) {
      if (typeof v === 'string') return v;
      if (v === undefined || v === null) return '';
      return JSON.stringify(v);
    },
    castStringArray: function castStringArray(v) {
      if (Array.isArray(v)) return v;
      if (v === null || v === undefined) return [];

      if (typeof v === 'string') {
        return v.split(',').map(trim);
      }

      return [JSON.stringify(v)];
    },
    castUnit: function castUnit(v) {
      if (!v) return {
        v: 0,
        u: 'px'
      };

      if (typeof v.v !== 'undefined') {
        v.v = parseFloat(v.v);
        if (isNaN(v.v)) return {
          v: 0,
          u: 'px'
        };

        if (typeof v.u !== 'string') {
          v.u = 'px';
        } else {
          v.u = v.u.trim().toLowerCase();
        }

        if (v.u === '') {
          v.u = 'px';
        }

        return {
          v: v.v,
          u: v.u
        };
      }

      if (typeof v === 'number') return {
        v: v,
        u: 'px'
      };
      if (typeof v !== 'string') return {
        v: 0,
        u: 'px'
      };
      return ParseUnit('' + v);
    },
    castValidator: function castValidator(v) {
      if (typeof v === 'function') return v;
      if (typeof v === 'boolean') return function () {
        return v;
      };

      if (typeof v === 'string' && v.trim().length != 0) {
        try {
          var rx = new RegExp(v);
          return rx.test.bind(rx);
        } // Ignore Regular Expression errors.
        catch (ex) {
          console.error("[castValidator] /" + v + "/ ", ex);
        }
      }

      ;
      return function () {
        return null;
      };
    }
  };
  /**
   * @param {any|function} val - Default value, or a specific getter (if `val` is a function).
   */

  function propCast(caster, obj, att, val) {
    var hasSpecialGetter = typeof val === 'function';
    if (typeof obj[ID] === 'undefined') obj[ID] = {};
    obj[ID][att] = {
      value: val,
      event: new Listeners()
    };
    var setter;

    if (typeof caster === 'function') {
      setter = function setter(v) {
        v = caster(v); // If there is a special getter, any set will fire.
        // Otherwise, we fire only if the value has changed.

        if (hasSpecialGetter || obj[ID][att].value !== v) {
          obj[ID][att].value = v;
          obj[ID][att].event.fire(v, obj, att);
        }
      };
    } else {
      setter = function setter(v) {
        // If there is a special getter, any set will fire.
        // Otherwise, we fire only if the value has changed.
        if (hasSpecialGetter || obj[ID][att].value !== v) {
          obj[ID][att].value = v;
          obj[ID][att].event.fire(v, obj, att);
        }
      };
    }

    var getter = val;

    if (!hasSpecialGetter) {
      // Default getter.
      getter = function getter() {
        return obj[ID][att].value;
      };
    }

    Object.defineProperty(obj, att, {
      get: getter,
      set: setter,
      configurable: false,
      enumerable: true
    });
    return exports.bind.bind(exports, obj, att);
  }

  ;
  /**
   * @export function fire
   *
   * Set a new value and fire the event even if the value has not changed.
   */

  exports.fire = function (obj, att, val) {
    var currentValue = obj[att];
    if (typeof val === 'undefined') val = currentValue;
    obj[ID][att].value = val;
    obj[ID][att].event.fire(obj[att], obj, att);
  };
  /**
   * @export function set
   *
   * Set a new value without firing any event.
   */


  exports.set = function (obj, att, val) {
    if (typeof obj[ID] === 'undefined') obj[ID] = {};
    if (typeof obj[ID][att] === 'undefined') obj[ID][att] = {};
    obj[ID][att].value = val;
  };
  /**
   * @export function get
   *
   * Get a value without firing any event.
   */


  exports.get = function (obj, att) {
    if (typeof obj[ID] === 'undefined') return undefined;
    if (typeof obj[ID][att] === 'undefined') return undefined;
    return obj[ID][att].value;
  };
  /**
   * @export function readOnly
   * @param {object} obj - Object to which we want to add a read only attribute.
   * @param {string} name - Attribute's name.
   * @param {function} value - Function to execute anytime someone gets the value of this attribute.
   * @param {any} value - Constatn value of this attribute.
   */


  exports.readOnly = function (obj, name, value) {
    if (typeof value === 'function') {
      Object.defineProperty(obj, name, {
        get: value,
        set: function set() {},
        configurable: false,
        enumerable: true
      });
    } else {
      Object.defineProperty(obj, name, {
        value: value,
        writtable: false,
        configurable: false,
        enumerable: true
      });
    }
  };
  /**
   * Create a property on which we can bind another property.
   *
   * @param {object} obj - Object to which we want to add a property.
   * @param {string} att - Name of the attribute of `obj`.
   *
   */


  exports.prop = propCast.bind(null, null);

  exports.propWidget = function (obj, att, widget, widgetAttribute) {
    if (typeof widgetAttribute === 'undefined') widgetAttribute = att;
    if (typeof obj[ID] === 'undefined') obj[ID] = {};
    obj[ID][att] = {
      event: new Listeners()
    };
    exports.bind(widget, widgetAttribute, function (v) {
      obj[ID][att].event.fire(v, obj, att);
    });
    Object.defineProperty(obj, att, {
      get: function get() {
        return widget[widgetAttribute];
      },
      set: function set(v) {
        widget[widgetAttribute] = v;
      },
      configurable: false,
      enumerable: true
    });
    return exports.bind.bind(exports, obj, att);
  };
  /**
   * @export @function propToggleClass
   * Create an enum attribute which toggles a CSS class when assigned.
   *
   * @param {array|object} values - If this is an array, we will convert
   * it  into an  object.  For instance `["show",  "hide"]` will  become
   * `{show: "show", hide: "hide"}`.
   */


  exports.propToggleClass = function (target, attribute, values, prefix) {
    if (typeof prefix !== 'string') prefix = '';
    var convertedValues = {};

    if (typeof values === 'string') {
      convertedValues[values] = values;
    } else if (Array.isArray(values)) {
      values.forEach(function (itm) {
        convertedValues[itm] = itm;
      });
    } else {
      convertedValues = values;
    }

    return propCast(null, target, attribute)(function (v) {
      var key, val;

      for (key in convertedValues) {
        val = convertedValues[key];

        if (key == v) {
          $.addClass(target.element, prefix + val);
        } else {
          $.removeClass(target.element, prefix + val);
        }
      }
    });
  };
  /**
   * @export @function propAddClass
   * Create a boolean attribute that toggle a CSS class on the `element` attribute of `target`.
   * If the value id `true`, `className` is added.
   * @example
   * DB.propAddClass( this, 'wide', 'fullscreen' );
   * DB.propAddClass( this, 'wide' );
   */


  exports.propAddClass = function (target, attribute, className) {
    if (typeof className === 'undefined') className = attribute;
    return propCast(converters.castBoolean, target, attribute)(function (v) {
      if (v) $.addClass(target.element, className);else $.removeClass(target.element, className);
    });
  };
  /**
   * @export @function propAddClass
   * Create a boolean attribute that toggle a CSS class on the `element` attribute of `target`.
   * If the value id `true`, `className` is removed.
   * @example
   * DB.propRemoveClass( this, 'visible', 'hide' );
   */


  exports.propRemoveClass = function (target, attribute, className) {
    if (typeof className === 'undefined') className = attribute;
    return propCast(converters.castBoolean, target, attribute)(function (v) {
      if (v) $.removeClass(target.element, className);else $.addClass(target.element, className);
    });
  };

  exports.propArray = propCast.bind(null, converters.castArray);
  exports.propBoolean = propCast.bind(null, converters.castBoolean);
  exports.propColor = propCast.bind(null, converters.castColor);
  exports.propDate = propCast.bind(null, converters.castDate);

  exports.propEnum = function (enumeration) {
    return propCast.bind(null, converters.castEnum(enumeration));
  };

  exports.propFunction = propCast.bind(null, converters.castFunction);
  exports.propInteger = propCast.bind(null, converters.castInteger);
  exports.propFloat = propCast.bind(null, converters.castFloat);
  exports.propRegexp = propCast.bind(null, converters.castRegexp);
  exports.propString = propCast.bind(null, converters.castString);
  exports.propStringArray = propCast.bind(null, converters.castStringArray);
  exports.propUnit = propCast.bind(null, converters.castUnit);
  exports.propValidator = propCast.bind(null, converters.castValidator);

  exports.bind = function (srcObj, srcAtt, dstObj, dstAtt, options) {
    if (typeof srcObj[ID] === 'undefined' || typeof srcObj[ID][srcAtt] === 'undefined') {
      console.error(JSON.stringify(srcAtt) + " is not a bindable property!", {
        srcObj: srcObj,
        srcAtt: srcAtt,
        dstObj: dstObj,
        dstAtt: dstAtt,
        options: options
      });
      throw Error(JSON.stringify(srcAtt) + " is not a bindable property!");
    }

    if (typeof options === 'undefined') options = {};

    if (options.value) {
      options.converter = function () {
        return options.value;
      };
    }

    var lambda = typeof dstObj === 'function' ? dstObj : function (v, obj, att) {
      dstObj[dstAtt] = typeof options.converter === 'function' ? options.converter(v) : v;
    };
    srcObj[ID][srcAtt].event.add(lambda);
    return options;
  };
  /**
   * @export.extend
   * @function extend
   * @param {object} _def - Default values for properties.
   * @param {object} _ext - Properties to override.
   * @param {object} _obj - DOM object whose properties belong.
   * @param {function}  callback -  Optional. Functioin  to call  when a
   * bindable property of `obj` changes.
   * @returns {object} A copy of `def` with values of `ext`.
   */


  exports.extend = function (_def, _ext, _obj, callback) {
    var def = _def || {},
        ext = _ext || {},
        obj = _obj || {},
        out = JSON.parse(JSON.stringify(def)),
        extKeys = Object.keys(ext);
    extKeys.forEach(function (key) {
      if (key.charAt(0) === '$') return;
      var val = ext[key];

      if (typeof out[key] === 'undefined') {
        console.error("[tfw.data-binding.extend] Undefined argument: \"".concat(key, "\"!"));
      } else {
        out[key] = val;
      }
    });

    if (typeof obj !== 'undefined') {
      extKeys.forEach(function (key) {
        if (key.charAt(0) !== '$') return;
        Object.defineProperty(obj, key, {
          value: ext[key],
          writable: false,
          configurable: false,
          enumerable: false
        });
      }); // Setting values.

      Object.keys(out).forEach(function (key) {
        if (key.charAt(0) !== '$') {
          try {
            obj[key] = out[key];
          } catch (ex) {
            console.error("Trying to extend property \"".concat(key, "\" of object "), obj);
            console.error("...with object ", out);
            console.error("...but got ", ex);
          }
        }
      }); // General callback.

      if (typeof callback === 'function') {
        Object.keys(obj[ID]).forEach(function (key) {
          exports.bind(obj, key, callback);
        });
        callback();
      }
    }

    return out;
  };

  function toLowerCase(txt) {
    return txt.toLowerCase();
  }

  function trim(txt) {
    return txt.trim();
  }

  exports.converters = converters;
  module.exports._ = _;
});
//# sourceMappingURL=tfw.data-binding.js.map