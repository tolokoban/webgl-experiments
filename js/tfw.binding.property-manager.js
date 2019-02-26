"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** @module tfw.binding.property-manager */
require('tfw.binding.property-manager', function (require, module, exports) {
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
  /**
   * @export
   * @function
   * @param {object} container - Object which will hold properties.
   */


  module.exports = constructor;
  /**
   * @export .isLinkable
   * Look if an object  has a property manager assigned to  it and own a
   * property which name is `propertyName`.
   */

  module.exports.isLinkable = isLinkable;
  module.exports.getAllAttributesNames = getAllAttributesNames;
  /**
   * Return the linkable properties which holds this value, or `null`.
   */

  module.exports.getProperties = getProperties;
  /**
   * Create a readonly attribute.
   *
   * @param {object} target - Object which will bear the readonly attribute.
   * @param {object} attribs - Attributes with their values.
   * @returns {undefined}
   */

  module.exports.readonly = readonly;

  var Event = require("tfw.event");

  var ID = 0; // A container  with linkable  properties has  an attribute  with this
  // name. This attribute own the list of linkable properties.

  var CONTAINER_SYMBOL = "__tfw.property-manager__"; // A linkable property owned by a container has an attribute with this
  // name. This attribute give the name  of the property and a reference
  // to the container.

  var PROPERTY_SYMBOL = '__tfw.binding.property-manager__';
  /**
   *
   */

  function PropertyManager(container) {
    Object.defineProperty(this, 'id', {
      value: ID++,
      writable: false,
      configurable: false,
      enumerable: true
    });
    this.name = this.id;
    this._props = {};
    this._container = container;
  }
  /**
   * @class PropertyManager
   * @member set
   * Set the inner value of a property without fireing any event.
   * @param {string} propertyName.
   * @param {any} value.
   */


  PropertyManager.prototype.set = function (propertyName, value) {
    this.create(propertyName).set(value);
  };
  /**
   * Look if `propertyName` is a linkable property of this object.
   */


  PropertyManager.prototype.isLinkable = function (propertyName) {
    var container = this._container;
    if (!container) return false;
    if (typeof container[CONTAINER_SYMBOL] === 'undefined') return false;
    return typeof container[CONTAINER_SYMBOL]._props[propertyName] !== 'undefined';
  };
  /**
   * @class PropertyManager
   * @member get
   * @param {string} propertyName.
   * @return {any} Inner value of the property.
   *
   */


  PropertyManager.prototype.get = function (propertyName) {
    return this.create(propertyName).get();
  };

  PropertyManager.prototype.propertyId = function (propertyName) {
    return this.create(propertyName).id;
  };

  PropertyManager.prototype.fire = function (propertyName, wave) {
    var prop = this.create(propertyName);
    prop.event.fire(prop.get(), propertyName, this._container, wave);
  };

  PropertyManager.prototype.change = function (propertyName, value, wave) {
    if (typeof wave === 'undefined') wave = [];
    var prop = this.create(propertyName);
    var converter = prop.converter;

    if (typeof converter === 'function') {
      value = converter(value);
    }

    var currentValue = prop.get();

    if (prop.alwaysFired || areDifferent(value, currentValue)) {
      prop.set(value);
      var that = this;
      exec(prop, function () {
        // Fire change event.
        that.fire(propertyName, wave);
      });
    }
  };
  /**
   * @class PropertyManager
   * @member converter
   * @param {string} propertyName.
   * @param {function=undefined} converter -  Converter is assigned only
   * if it is a function.
   * @return {function} Current converter.
   */


  PropertyManager.prototype.converter = function (propertyName, converter) {
    var prop = this.create(propertyName);

    if (typeof converter === 'function') {
      prop.converter = converter;
    } else if (typeof converter !== 'undefined') {
      throw Error("[tfw.binding.property-manager::converter] " + "`converter` must be of type function or undefined!");
    }

    return prop.converter;
  };

  PropertyManager.prototype.delay = function (propertyName, delay) {
    var prop = this.create(propertyName);
    delay = parseFloat(delay);
    if (isNaN(delay)) return prop.delay;
    prop.delay = delay;
  };
  /**
   * @class PropertyManager
   * @member on
   * @param {string} propertyName.
   * @param {function(val,name,container)} action  - Function to execute
   * when a property changed.
   */


  PropertyManager.prototype.on = function (propertyName, action) {
    var prop = this.create(propertyName);
    prop.event.add(action);
  };
  /**
   * @class PropertyManager
   * @member off
   * @param {string} propertyName.
   * @param {function(val,name,container)} action  - Function to execute
   * when a property changed.
   */


  PropertyManager.prototype.off = function (propertyName, action) {
    var prop = this.create(propertyName);
    prop.event.remove(action);
  };
  /**
   * @export
   * @function
   * @param {object} container - Object which will hold properties.
   */


  function constructor(container) {
    try {
      if (typeof container === 'undefined') {
        fail("Argument `container` is mandatory!");
      }

      if (_typeof(container) !== 'object') return null;
      var pm = container[CONTAINER_SYMBOL];

      if (!pm) {
        pm = new PropertyManager(container);
        container[CONTAINER_SYMBOL] = pm;
      }

      return pm;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }
  /**
   * @export .isLinkable
   * Look if an object  has a property manager assigned to  it and own a
   * property which name is `propertyName`.
   */


  function isLinkable(container, propertyName) {
    if (typeof container[CONTAINER_SYMBOL] === "undefined") return false;
    if (typeof propertyName !== 'string') return true;
    return typeof container[CONTAINER_SYMBOL]._props[propertyName] !== "undefined";
  }

  ;

  function getAllAttributesNames(container) {
    if (container[CONTAINER_SYMBOL] === undefined) return [];
    return Object.keys(container[CONTAINER_SYMBOL]._props);
  }

  ;
  /**
   * Return the linkable properties which holds this value, or `null`.
   */

  function getProperties(property) {
    var properties = property[PROPERTY_SYMBOL];
    if (!Array.isArray(properties)) return null;
    return properties;
  }

  ;
  /**
   * @export .create
   * Create an new linkable property.
   * @param {string} propertyName - Name of the property.
   * @param {any} options.init - Initial value. Won't fire any change notification.
   * @param {function=undefined} options.get - Special getter.
   * @param {function=undefined} options.set - Special setter.
   * @param {function=undefined}  options.cast - Conversion to  apply to
   * the value before setting it.
   */

  PropertyManager.prototype.create = function (propertyName, options) {
    var that = this;
    if (typeof propertyName !== 'string') fail("propertyName must be a string!");
    var p = this._props[propertyName];

    if (!p) {
      if (typeof options === 'undefined') options = {};
      p = createNewProperty.call(this, propertyName, options);
    }

    return p;
  };
  /**
   * Copy all the attributes of `source` into `target`.
   */


  function applyAttributesToTarget(source, target) {
    var attName, attValue;

    for (attName in source) {
      if (module.exports.isLinkable(target, attName)) {
        attValue = source[attName];
        target[attName] = attValue;
      }
    }
  }

  function createNewProperty(propertyName, options) {
    var that = this;
    var prop = {
      value: undefined,
      event: new Event(),
      filter: functionOrUndefined(options.filter),
      converter: functionOrUndefined(options.converter),
      delay: castPositiveInteger(options.delay),
      action: null,
      alwaysFired: options.alwaysFired ? true : false,
      manager: this,
      name: propertyName,
      timeout: 0
    };
    prop.get = createGetter(prop, options);
    prop.set = createSetter(prop, options, that, propertyName);
    this._props[propertyName] = prop;

    if (typeof options.init !== 'undefined') {
      prop.set(options.init);
    }

    Object.defineProperty(this._container, propertyName, {
      get: prop.get.bind(prop),
      set: that.change.bind(that, propertyName),
      enumerable: true,
      configurable: false
    });
    return prop;
  }

  function createGetter(prop, options) {
    if (typeof options.get === 'function') {
      return function (v) {
        var newValue = options.get(v);
        addPropToValue(prop, newValue);
        return newValue;
      };
    }

    return function (v) {
      return prop.value;
    };
  }

  function createSetter(prop, options, that, propertyName) {
    var setter;

    if (typeof options.cast === 'function') {
      if (typeof options.set === 'function') {
        setter = function setter(v) {
          removePropFromValue(prop, prop.get());
          var castedValue = options.cast(v, that);
          addPropToValue(prop, prop.value);
          options.set(castedValue);
        };
      } else {
        setter = function setter(v) {
          removePropFromValue(prop, prop.get());
          prop.value = options.cast(v, that);
          addPropToValue(prop, prop.value);
        };
      }
    } else {
      setter = typeof options.set === 'function' ? options.set : function (v) {
        removePropFromValue(prop, prop.get());
        prop.value = v;
        addPropToValue(prop, prop.value);
      };
    }

    return setter;
  }
  /**
   * Add an `info` attribute to the  property's value. This is useful to
   * find the container and the property name from the value.
   */


  function addPropToValue(prop, value) {
    if (value === undefined || value === null) return;
    if (value.isContentChangeAware !== true) return;
    var properties = value[PROPERTY_SYMBOL];

    if (!Array.isArray(properties)) {
      properties = [prop];
    } else if (properties.indexOf(prop) === -1) {
      properties.push(prop);
    }

    value[PROPERTY_SYMBOL] = properties;
  }

  function removePropFromValue(prop, value) {
    if (value === undefined || value === null) return;
    if (value.isContentChangeAware !== true) return;
    var properties = value[PROPERTY_SYMBOL];
    if (!Array.isArray(properties)) return;
    var pos = properties.indexOf(prop);
    if (pos === -1) return;
    properties.splice(pos, 1);
  }
  /**
   * This is a special property which emit a change event as soon as any
   * value is set  to it, even if  this value has already  been set just
   * before. Moreover, the  value of this attribute is  always its name.
   * This is used for action properties in buttons, for instance.
   */


  PropertyManager.prototype.createAction = function (propertyName, options) {
    if (typeof options === 'undefined') options = {};
    options.alwaysFired = true;
    return this.create(propertyName, options);
  };
  /**
   * Most  of  the  time,  `action` is  called  immediatly  without  any
   * argument. But  you can configure  your property with a  `delay`. If
   * you do so, the action is only called after this `delay`(in ms). The
   * `action`can be lost  if another call to `exec()`  occurs before the
   * end of the `delay` and the `delay` is reset.
   */


  function exec(prop, action) {
    if (!prop.delay) action();else {
      clearTimeout(prop.timeout);
      prop.timeout = setTimeout(action, prop.delay);
    }
  }

  ;

  function fail(msg, source) {
    if (typeof source === 'undefined') {
      source = "";
    } else {
      source = "::" + source;
    }

    throw Error("[tfw.binding.property-manager" + source + "] " + msg);
  }

  function castPositiveInteger(v) {
    if (typeof v !== 'number') return 0;
    if (isNaN(v)) return 0;
    return Math.max(0, Math.floor(v));
  }

  function functionOrUndefined(f) {
    if (typeof f === 'function') return f;
    return undefined;
  }
  /**
   * A linkable property must link only if  we set a new value to it. If
   * the value  is a  List, we need  to check if  they have  a different
   * inner array because different Lists can share the same array and in
   * this cas, we don't want to fire a changed event.
   */


  function areDifferent(oldValue, newValue) {
    return oldValue !== newValue;
  }
  /**
   * Create a readonly attribute.
   *
   * @param {object} target - Object which will bear the readonly attribute.
   * @param {object} attribs - Attributes with their values.
   * @returns {undefined}
   */


  function readonly(target, attribs) {
    var attribNames = Object.keys(attribs);
    attribNames.forEach(function (attName) {
      var attValue = attribs[attName];

      if (typeof attValue === 'function') {
        Object.defineProperty(target, attName, {
          set: function set() {
            throw Error("Attribute \"".concat(attName, "\" is read only!"));
          },
          get: attValue,
          configurable: false,
          enumerable: true
        });
      } else {
        Object.defineProperty(target, attName, {
          value: attValue,
          writable: false,
          configurable: false,
          enumerable: true
        });
      }
    });
  }

  module.exports._ = _;
});
//# sourceMappingURL=tfw.binding.property-manager.js.map