"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** @module dom */
require('dom', function (require, module, exports) {
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
  /**
  * @module dom
  *
  * @description
  * Functions which facilitate DOM manipulations.
  *
  * @example
  * var mod = require('dom');
  */


  require("polyfill.classList");

  var Theme = require("dom.theme"),
      Gestures = require("tfw.gestures");

  var // Used to store data on the DOM element without colliding with existing attributes.
  SYMBOL = '@dom' + Date.now(),
      RX_ENTITY = /^&(#[0-9]+|[a-zA-Z0-9]+);$/;

  function $(dom) {
    if (dom instanceof Node) return dom;

    if (dom === undefined || dom === null) {
      throw Error("`dom` is not a valid element!", dom);
    }

    if (dom.$ instanceof Node) return dom.$;
    if (dom.element instanceof Node) return dom.element;

    if (typeof dom === 'string') {
      var elem = document.getElementById(dom);

      if (!elem) {
        console.error("[dom] There is no DOM element with this ID: `" + dom + "`");
      }

      return elem;
    }

    if (typeof dom.element === 'function') return dom.element();
    return dom;
  }

  ;
  module.exports = $;
  $.tagNS = tagNS;
  $.svgRoot = tagNS.bind(undefined, "http://www.w3.org/2000/svg", "svg", {
    version: '1.1',
    'xmlns:svg': 'http://www.w3.org/2000/svg',
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink'
  });
  $.svg = tagNS.bind(undefined, "http://www.w3.org/2000/svg");
  $.tag = tagNS.bind(undefined, "http://www.w3.org/1999/xhtml");
  $.div = tagNS.bind(undefined, "http://www.w3.org/1999/xhtml", "div");
  $.txt = window.document.createTextNode.bind(window.document);
  $.textOrHtml = textOrHtml;
  $.get = get;
  /**
   * Add a readonly `element` property to `obj` and return it.
   */

  $.elem = elem;
  /**
   * Apply css rules on `element`.
   *
   * @return `element`.
   *
   * @example
   * var $ = require('dom');
   * $.css( element, { width: '800px'. height: '600px' });
   */

  $.css = css;
  $.att = att;
  $.removeAtt = removeAtt;
  $.addClass = addClass;
  $.hasClass = hasClass;
  $.removeClass = removeClass;
  $.toggleClass = toggleClass;
  $.saveStyle = saveStyle;
  $.restoreStyle = restoreStyle;
  /**
   * @param {string} name - Name of this theme.
   * @param {object} style - Colors.
   * @param {string} style.bg0 - [optional] Background level 0.
   * @param {string} style.bg1 - [optional] Background level 1.
   * @param {string} style.bg2 - [optional] Background level 2.
   * @param {string} style.bg3 - [optional] Background level 3.
   * @param {string} style.bgP - [optional] Primary color.
   * @param {string} style.bgPD - [optional] Primary color (dark version).
   * @param {string} style.bgPL - [optional] Primary color (light version).
   * @param {string} style.bgS - [optional] Accent color.
   * @param {string} style.bgSD - [optional] Accent color (dark version).
   * @param {string} style.bgSL - [optional] Accent color (light version).
   * @param  {string} style.fg*  - [optional]  To each  background color
   * (bg) correspond a text color (fg).
   */

  $.registerTheme = Theme.register.bind($);
  /**
   * @param {string} name - Name of the heme to apply.
   */

  $.applyTheme = Theme.apply.bind($);
  $.registerAndApplyTheme = registerAndApplyTheme;
  /**
   * @param newElem {Element} - Replacement element.
   * @param oldElem {Element} - Element to replace.
   */

  $.replace = replace;
  /**
   * Remove element from its parent.
   * @param element {Element} - Element to detach from its parent.
   * @return The parent element.
   */

  $.detach = detach;
  /**
   * Add event handlers to one or many elements.
   *
   * @param {object|array}  element -  list of  elements on  which apply
   * events handlers.
   *
   * @param  {object|function} slots  - If  a function  is given,  it is
   * considered as a slot for the event `tap`.  Otherwise, the object is
   * a map  between events' names (the  key) and function to  handle the
   * event (the value).
   * Events' names are:
   * * __tap__: When  the element is  pressed and released in  less than
   900 ms and without too much sliding.
   * * __doubletap__
   * * __dragmove__
   *
   * @param {boolean} capture - If `true` events are captured before they reach the children.
   *
   * @example
   *    DOM.on( [screen, button], function() {...} );
   *    DOM.on( body, null );   // Do nothing, but stop propagation.
   *    DOM.on( element, { tap: function() {...} } );
   */

  $.on = on;
  $.off = off;
  /**
   * Append all the `children` to `element`.
   * @param element
   * @param ...children
   */

  $.add = add;
  /**
   * Add the attribute `element` and the following functions to `obj`:
   * * __css__
   * * __addClass__
   * * __removeClass__
   * * __toggleClass__
   */

  $.wrap = wrap;
  /**
   * Remove all children of the `element`.
   * @param element {Element} - Element from which remove all the children.
   */

  $.clear = clear;

  function wrap(obj, element, nomethods) {
    Object.defineProperty(obj, 'element', {
      value: element,
      writable: false,
      configurable: false,
      enumerable: true
    });
    if (nomethods) return obj;
    obj.on = on.bind(obj, element);
    obj.css = css.bind(obj, element);
    obj.add = add.bind(obj, element);
    obj.att = att.bind(obj, element);
    obj.addClass = addClass.bind(obj, element);
    obj.hasClass = hasClass.bind(obj, element);
    obj.removeClass = removeClass.bind(obj, element);
    obj.toggleClass = toggleClass.bind(obj, element);
    return obj;
  }

  function replace(newElem, oldElem) {
    newElem = $(newElem);
    oldElem = $(oldElem);
    oldElem.parentNode.replaceChild(newElem, oldElem);
    return newElem;
  }

  function css(element, styles) {
    element = $(element);
    var key, val;

    for (key in styles) {
      val = styles[key];
      element.style[key] = val;
    }

    return element;
  }

  function att(element, attribs, value) {
    element = $(element);
    var key, val;

    if (typeof attribs === 'string') {
      if (typeof value === 'undefined') value = "";
      key = attribs;
      attribs = {};
      attribs[key] = value;
    }

    for (key in attribs) {
      val = attribs[key];
      element.setAttribute(key, val);
    }

    return element;
  }

  function removeAtt(element, attrib) {
    element = $(element);
    element.removeAttribute(attrib);
    return element;
  }

  function add(element) {
    element = $(element);

    try {
      var i, child, isValidArgument;

      for (i = 1; i < arguments.length; i++) {
        child = arguments[i];
        isValidArgument = addArray(element, child) || addText(element, child) || addNode(element, child);

        if (!isValidArgument) {
          console.error("Argument #" + i + " of dom.add() is invalid!", arguments);
          debugger;
        }
      }

      return element;
    } catch (ex) {
      console.error("[DOM.add] arguments=", [].slice.call(arguments));
      console.error("[DOM.add] exception=", ex);
    }
  }

  function addNode(element, child) {
    child = $(child);

    if (child instanceof Node) {
      element.appendChild(child);
      return true;
    }

    return false;
  }

  function addText(element, child) {
    if (typeof child === 'number') child = '' + child;
    if (typeof child !== 'string') return false;

    if (child.substr(0, 6).toLowerCase() == '<html>') {
      // Text starting with '<html>' is HTML code to parse.
      var html = child.substr(6);
      child = $.tag('span');
      child.innerHTML = html;
    } else if (RX_ENTITY.test(child)) {
      // HTML entity, for instance: &amp;, &lt;, ...
      var text = child;
      child = $.tag('span');
      child.innerHTML = text;
    } else {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
    return true;
  }

  function addArray(element, array) {
    if (!Array.isArray(array)) return false;
    array.forEach(function (child) {
      add(element, child);
    });
    return true;
  }

  function off(element) {
    if (Array.isArray(element)) {
      element.forEach(function (elem) {
        off(elem);
      });
      return element;
    }

    if (typeof element[SYMBOL] === 'undefined') return element;
    var pe = element[SYMBOL].events;
    if (typeof pe === 'undefined') return element;
    pe.off();
    delete element[SYMBOL].events;
  }

  var NON_POINTER_EVENTS = ['keyup', 'keydown', 'scroll', 'load', 'error'];

  function on(element, slots, extra) {
    // If only a function is passed, we consider this is a Tap event.
    if (typeof slots === 'function' || slots === null) slots = {
      tap: slots
    };else if (typeof slots === 'string' && typeof extra === 'function') {
      // Syntax: $.on( elem, 'tap', function(evt) {...} )
      var obj = {};
      obj[slots] = extra;
      slots = obj;
    }

    if (Array.isArray(element)) {
      element.forEach(function (elem) {
        on(elem, slots);
      });
      return element;
    }

    element = $(element);
    if (typeof element[SYMBOL] === 'undefined') element[SYMBOL] = {};

    if (typeof element[SYMBOL].events === 'undefined') {
      element[SYMBOL].events = Gestures(element);
    }

    var key, val, preview;

    for (key in slots) {
      val = slots[key];

      if (key.charAt(0) == '!') {
        key = key.substr(1);
        preview = true;
      } else {
        preview = false;
      }

      if (NON_POINTER_EVENTS.indexOf(key.toLowerCase()) > -1) {
        element.addEventListener(key, val, preview);
      } else {
        element[SYMBOL].events.on(key, val, preview);
      }
    }

    return element;
  }

  function tagNS(ns, name) {
    try {
      var e = document.createElementNS(ns, name.trim().toLowerCase());
      var i, arg, key, val;

      for (i = 2; i < arguments.length; i++) {
        arg = arguments[i];

        if (Array.isArray(arg)) {
          // Arrays are for children.
          arg.forEach(function (child) {
            switch (_typeof(child)) {
              case 'string':
              case 'number':
              case 'boolean':
                child = '' + child;

                if (child.substr(0, 6) == '<html>') {
                  var html = child.substr(6);
                  child = $.tag('span');
                  child.innerHTML = html;
                } else {
                  child = document.createTextNode(child);
                }

                break;
            }

            add(e, child);
          });
        } else {
          switch (_typeof(arg)) {
            case "string":
              arg.split(' ').forEach(function (item) {
                if (item.length > 0) {
                  addClass(e, item);
                }
              });
              break;

            case "object":
              for (key in arg) {
                val = arg[key];
                e.setAttribute(key, val);
              }

              break;

            default:
              throw Error("[dom.tag] Error creating <" + name + ">: Invalid argument #" + i + "!");
          }
        }
      }

      return e;
    } catch (ex) {
      console.error("[dom.tagNS] Error with `ns` = ", ns, " and `name` = ", name);
      console.error(ex);
    }
  }

  ;

  function addClass(elem) {
    var args = [].slice.call(arguments, 1);

    if (Array.isArray(elem)) {
      // Loop on each element.
      args.unshift(null);
      elem.forEach(function (child) {
        args[0] = child;
        addClass.apply(undefined, args);
      });
      return elem;
    }

    elem = $(elem);
    args.forEach(function (className) {
      if (typeof className !== 'string') return;
      className = className.trim();
      if (className.length == 0) return;

      try {
        if (elem.classList) elem.classList.add(className);
      } catch (ex) {
        console.error("[dom.addClass] Invalid class name: ", className);
        console.error(ex);
      }
    });
    return elem;
  }

  function hasClass(elem, className) {
    elem = $(elem);
    if (!elem.classList) return false;
    return elem.classList.contains(className);
  }

  function removeClass(elem) {
    var args = [].slice.call(arguments, 1);

    if (Array.isArray(elem)) {
      // Loop on each element.
      args.unshift(null);
      elem.forEach(function (child) {
        args[0] = child;
        removeClass.apply(undefined, args);
      });
      return elem;
    }

    elem = $(elem);
    args.forEach(function (className) {
      if (typeof className !== 'string') return;

      try {
        if (elem.classList) elem.classList.remove(className);
      } catch (ex) {
        console.error("[dom.removeClass] Invalid class name: ", className);
        console.error(ex);
      }
    });
    return elem;
  }

  function toggleClass(elem) {
    var args = [].slice.call(arguments, 1);
    args.forEach(function (className) {
      if (hasClass(elem, className)) {
        removeClass(elem, className);
      } else {
        addClass(elem, className);
      }
    });
    return elem;
  }

  function clear(element) {
    // (!) On préfère retirer les éléments un par un du DOM plutôt que d'utiliser simplement
    // this.html("").
    // En effet, le code simplifié a des conséquences inattendues dans IE9 et IE10 au moins.
    // Le bug des markers qui disparaissaients sur les cartes de Trail-Passion 4 a été corrigé
    // avec cette modification.
    element = $(element);
    var e = element;

    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }

    var args = [].slice.call(arguments);

    if (args.length > 1) {
      add.apply(this, args);
    }

    return element;
  }

  function get(element, query) {
    element = $(element);

    if (typeof query === 'undefined') {
      query = element;
      element = window.document;
    }

    return element.querySelector(query);
  }

  function detach(element) {
    element = $(element);
    var parent = element.parentElement;
    if (!parent) return parent;
    parent.removeChild(element);
    return parent;
  }

  function elem(target) {
    var args = [].slice.call(arguments);
    args.shift();
    if (args.length == 0) args = ['div'];
    args.push('dom', 'custom');
    var e;

    if (typeof args[0].element !== 'undefined') {
      e = args[0].element;
      addClass(e, 'dom', 'custom');
    } else if (typeof args[0].appendChild === 'function') {
      e = args[0];
      addClass(e, 'dom', 'custom');
    } else {
      e = $.tag.apply($, args);
    }

    Object.defineProperty(target, 'element', {
      value: e,
      writable: false,
      configurable: false,
      enumerable: true
    });
    return e;
  }

  function textOrHtml(element, content) {
    if (typeof content === 'undefined') content = '';
    if (content === null) content = '';
    if (typeof content !== 'string') content = JSON.stringify(content);

    if (content.substr(0, 6) == '<html>') {
      element.innerHTML = content.substr(6);
    } else {
      element.textContent = content;
    }

    return element;
  }

  function saveStyle(elements) {
    if (!Array.isArray(elements)) return saveStyle(Array.prototype.slice.call(arguments));
    elements.forEach(function (elem) {
      elem = $(elem);
      if (typeof elem[SYMBOL] === 'undefined') elem[SYMBOL] = {};
      if (!Array.isArray(elem[SYMBOL].style)) elem[SYMBOL].style = [];
      elem[SYMBOL].style.push(JSON.stringify(elem.style));
    });
  }

  function restoreStyle(elements) {
    if (!Array.isArray(elements)) return restoreStyle(Array.prototype.slice.call(arguments));
    elements.forEach(function (elem) {
      elem = $(elem);
      if (typeof elem[SYMBOL] === 'undefined' || !Array.isArray(elem[SYMBOL].style)) throw Error("[dom.restoreStyle] `saveStyle()` has never been used on this element!");
      if (elem[SYMBOL].style.length == 0) throw Error("[dom.restoreStyle] more `restore` than `save`!");
      var styles = JSON.parse(elem[SYMBOL].style.pop());
      var k, v;

      for (k in styles) {
        v = styles[k];

        if (typeof v !== 'undefined') {
          elem.style[k] = v;
        }
      }
    });
  }

  ;

  function registerAndApplyTheme(name, styles) {
    Theme.register.call(this, name, styles);
    Theme.apply.call(this, name);
  }

  module.exports._ = _;
});
//# sourceMappingURL=dom.js.map