"use strict";

/** @module tfw.view.combo */
require('tfw.view.combo', function (require, module, exports) {
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
  /* exported CODE_BEHIND */


  var CODE_BEHIND = {
    onIndexChange: onIndexChange,
    onKeysChange: onKeysChange,
    onItemsChange: onItemsChange,
    onValueChange: onValueChange,
    onExpandedChange: onExpandedChange,
    onKeyDown: onKeyDown
  };

  var Dom = require("dom"),
      PM = require("tfw.binding.property-manager"),
      Touchable = require("tfw.touchable");

  var ITEM_HEIGHT = 32;
  /**
   * @this XJS
   * @param {Array} items - Array of items to display in the Combo
   * @return {undefined}
   */

  function onItemsChange(items) {
    var that = this,
        list = Dom(this.$elements.list); // button = Dom( this.$elements.button );

    Dom.clear(list);
    this._listHeight = 0;
    this._itemsDivs = [];
    items.forEach(function (val) {
      that._listHeight += ITEM_HEIGHT;
      var item = Dom.div([val]);

      that._itemsDivs.push(item);

      Dom.add(list, item);
    });
    if (!this.index) this.index = 0;
  }
  /**
   * For two items, we never show the whole list, but we just change the selection on click.
   * @this ViewXJS
   * @returns {boolean} `true` if there are at most 2 items.
   */


  function manageIfFewItems() {
    var itemsCount = getLength.call(this, this.items);
    if (itemsCount < 2) return true;

    if (itemsCount === 2) {
      this.index = 1 - this.index;
      this.expanded = false;
      return true;
    } // More than 2 items to manage.


    return false;
  }
  /**
   * Current item can be set by key (string) or by index (number)-
   * @this ViewXJS
   * @param {integer} index - Index of the item to select.
   * @returns {undefined}
   */


  function onIndexChange(index) {
    if (hasKeys.call(this)) {
      this.value = this.keys[index];
    } else {
      this.value = index;
    }
  }
  /**
   * @this ViewXJS
   * @returns {boolean} Have keys been defined?
   */


  function hasKeys() {
    var keysCount = getLength.call(this, this.keys);
    if (keysCount < 1) return false;
    return keysCount === getLength.call(this, this.items);
  }
  /**
   * @param {Array} arr - Array from which you want the length.
   * @returns {integer} The array's length or 0 if it is not an array.
   */


  function getLength(arr) {
    if (!arr) return 0;
    if (!Array.isArray(arr)) return 0;
    return arr.length;
  }
  /**
   * @this ViewXJS
   * @param {Array} keys - The keys are not displayed. Thay are use to map a key to each item.
   * Without `keys`, we map the index for each item.
   * @returns {undefined}
   */


  function onKeysChange() {
    if (typeof this.index !== 'number') return;
    onIndexChange.call(this, this.index);
  }
  /**
   * @this ViewXJS
   * @param {string} value - What keys is currently selected.
   * @returns {undefined}
   */


  function onValueChange(value) {
    var index = 0;

    if (hasKeys.call(this)) {
      index = this.keys.indexOf(value);
      if (index < 0) index = 0;
      PM(this).set("index", index);
    } else {
      index = parseInt(value, 10);

      if (!isNaN(index) && index >= 0 && index < getLength.call(this, this.items)) {
        PM(this).set("index", index);
      }
    }

    var list = Dom(this.$elements.list);
    Dom.css(list, {
      transform: "translateY(-".concat(ITEM_HEIGHT * this.index, "px)"),
      left: 0,
      top: 0,
      height: "auto"
    });
  }
  /**
   * @this ViewXJS
   * @param {boolean} expanded - An expanded combo is when you see all the items at once for selection.
   * @returns {undefined}
   */


  function onExpandedChange(expanded) {
    if (expanded) expand.call(this);else collapse.call(this);
  }
  /**
   * @this ViewXJS
   * @param {boolean} saveCurrentValue - When the combo expands, we may want to save the current
   * value in order to go back to this value if the user press ESCAPE key.
   * @returns {undefined}
   */


  function expand() {
    var saveCurrentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (manageIfFewItems.call(this)) return;
    var screen = addScreen.call(this),
        expandedList = copyContentOf.call(this);
    moveList(this.$elements.list.$, expandedList);
    Dom.add(screen, expandedList);

    if (saveCurrentValue) {
      this._valueWhenExpanded = this.value;
    }
  }
  /**
   * Try to move `expandedList` to make the selected item be exactly above the same item in
   * `collapsedItem`. If it is not possible, a scroll bar will appear.
   * @param {DOMElement} collapsedList - DIV showing only one item bcause the rest is hidden.
   * @param {DOMElement} expandedList - DIV showing the most items as it can.
   * @returns {undefined}
   */


  function moveList(collapsedList, expandedList) {
    var rect = collapsedList.getBoundingClientRect(),
        left = rect.left;
    var top = rect.top;

    while (top <= 0) {
      top += ITEM_HEIGHT;
    }

    Dom.css(expandedList, {
      left: "".concat(left, "px"),
      top: "".concat(top, "px")
    });
  }
  /**
   * We sill copy the innerHTML of items and add a Touchable behaviour on each of them.
   * @this ViewXJS
   * @returns {DOMElement} DIV with all cloned items.
   */


  function copyContentOf() {
    var that = this,
        items = this.items,
        div = Dom.div("thm-ele8");
    items.forEach(function (item, index) {
      var clonedItem = Dom.div(that.index === index ? "thm-bgSL" : "thm-bg3");

      if (typeof item === 'string') {
        clonedItem.textContent = item;
      } else {
        clonedItem.innerHTML = Dom(item).innerHTML;
      }

      Dom.add(div, clonedItem);
      var touchable = new Touchable(clonedItem);
      touchable.tap.add(function () {
        that.expanded = false;
        that.index = index;
      });
    });
    return div;
  }
  /**
   * @this ViewXJS
   * @returns {undefined}
   */


  function collapse() {
    removeScreen.call(this);
  }
  /**
   * @this ViewXJS
   * @returns {undefined}
   */


  function removeScreen() {
    var screen = this._screen;

    if (screen) {
      Dom.detach(screen);
      delete this._screen;
    }
  }
  /**
   * @this ViewXJS
   * @returns {DOMElement} The screen DIV.
   */


  function addScreen() {
    removeScreen.call(this);
    var that = this,
        screen = Dom.div("tfw-view-combo-screen");
    this._screen = screen;
    Dom.add(document.body, screen);
    Dom.on(screen, function () {
      that.expanded = false;
    });
    return screen;
  }
  /**
   * Space will expand the combo, Escape will collapse it and Enter will trigger an action.
   *
   * @this ViewXJS
   * @param   {[type]} evt [description]
   * @returns {[type]}     [description]
   */


  function onKeyDown(evt) {
    switch (evt.key) {
      case 'Space':
        this.expanded = !this.expanded;
        evt.preventDefault();
        break;

      case 'Enter':
        this.action = this.value;
        break;

      case 'ArrowDown':
        selectNext.call(this);
        evt.preventDefault();
        break;

      case 'ArrowUp':
        selectPrev.call(this);
        evt.preventDefault();
        break;

      case 'Escape':
        if (this.expanded) {
          this.expanded = false; // Set the value as it was when we expanded the combo.

          this.value = this._valueWhenExpanded;
          evt.preventDefault();
        }

        break;

      default: // Do nothing.

    }
  }
  /**
   * Select next item.
   *
   * @this ViewXJS
   * @returns {undefined}
   */


  function selectNext() {
    this.index = (this.index + 1) % this.items.length;

    if (this.expanded) {
      collapse.call(this);
      expand.call(this, false);
    }
  }
  /**
   * Select previous item.
   *
   * @this ViewXJS
   * @returns {undefined}
   */


  function selectPrev() {
    this.index = (this.index + this.items.length - 1) % this.items.length;

    if (this.expanded) {
      collapse.call(this);
      expand.call(this, false);
    }
  } //===============================
  // XJS:View autogenerated code.


  try {
    module.exports = function () {
      //--------------------
      // Dependent modules.
      var $ = require('dom');

      var PM = require('tfw.binding.property-manager');

      var Tag = require('tfw.view').Tag;

      var Link = require('tfw.binding.link');

      var View = require('tfw.view');

      ;

      var Converters = require('tfw.binding.converters');

      var TfwViewIcon = require('tfw.view.icon'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "onItemsChange", "onKeysChange", "onExpandedChange", "onIndexChange", "onValueChange", "onKeyDown"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ;

      function addClassIfTrue(element, className, value) {
        if (value) $.addClass(element, className);else $.removeClass(element, className);
      }

      ;
      ; //-------------------
      // Global variables.

      var conv_boolean = Converters.get('boolean');
      var conv_string = Converters.get('string');
      var conv_array = Converters.get('array');
      var conv_integer = Converters.get('integer');
      var conv_isEmpty = Converters.get('isEmpty'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.create("wide", {
            cast: conv_boolean
          });
          pm.create("label", {
            cast: conv_string
          });
          pm.create("items", {
            cast: conv_array
          });
          pm.create("keys", {
            cast: conv_array
          });
          pm.create("expanded", {
            cast: conv_boolean
          });
          pm.create("index", {
            cast: conv_integer(0)
          });
          pm.create("value", {
            cast: conv_string
          });
          pm.create("tabindex", {
            cast: conv_integer(0)
          });
          pm.createAction("action"); //------------------
          // Create elements.

          var e_ = new Tag('DIV', ["class", "tabindex"]);
          var e_0 = new Tag('HEADER', ["textcontent", "class"]);
          var e_button = new Tag('DIV', ["class"]);
          var e_listContainer = new Tag('DIV', ["class"]);
          var e_list = new Tag('DIV', ["class"]);
          this.$elements.list = e_list;
          $.add(e_listContainer, e_list);
          this.$elements.listContainer = e_listContainer;
          var e_4 = new Tag('DIV', ["class"]);
          var e_5 = new TfwViewIcon({
            content: "down",
            size: 24
          });
          $.add(e_4, e_5);
          $.add(e_button, e_listContainer, e_4);
          this.$elements.button = e_button;
          $.add(e_, e_0, e_button); //-----------------------
          // Declare root element.

          Object.defineProperty(this, '$', {
            value: e_.$,
            writable: false,
            enumerable: false,
            configurable: false
          }); //---------
          // Events.

          View.events(e_, {
            "tap": function tap(v) {
              that.expanded = true;
            },
            "keydown": CODE_BEHIND.onKeyDown.bind(this)
          }); //-------
          // Links

          new Link({
            A: {
              obj: that,
              name: 'tabindex'
            },
            B: {
              obj: e_,
              name: 'tabindex'
            },
            name: "tabindex > e_/tabindex"
          });
          new Link({
            A: {
              obj: that,
              name: 'wide'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "wide", v);
              }
            },
            name: "wide > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'label'
            },
            B: {
              obj: e_0,
              name: 'textcontent'
            },
            name: "label > e_0/textcontent"
          });
          new Link({
            A: {
              obj: that,
              name: 'label'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_0, "hide", v);
              },
              converter: conv_isEmpty
            },
            name: "label > undefined"
          }); //-----------------------
          // On attribute changed.

          pm.on("items", function (v) {
            try {
              CODE_BEHIND.onItemsChange.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onItemsChange" of module "mod/tfw.view.combo.js" for attribute "items"!');
              console.error(ex);
            }
          });
          pm.on("keys", function (v) {
            try {
              CODE_BEHIND.onKeysChange.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onKeysChange" of module "mod/tfw.view.combo.js" for attribute "keys"!');
              console.error(ex);
            }
          });
          pm.on("expanded", function (v) {
            try {
              CODE_BEHIND.onExpandedChange.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onExpandedChange" of module "mod/tfw.view.combo.js" for attribute "expanded"!');
              console.error(ex);
            }
          });
          pm.on("index", function (v) {
            try {
              CODE_BEHIND.onIndexChange.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onIndexChange" of module "mod/tfw.view.combo.js" for attribute "index"!');
              console.error(ex);
            }
          });
          pm.on("value", function (v) {
            try {
              CODE_BEHIND.onValueChange.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onValueChange" of module "mod/tfw.view.combo.js" for attribute "value"!');
              console.error(ex);
            }
          }); //----------------------
          // Initialize elements.

          e_.class = "tfw-view-combo thm-bg2";
          e_0.class = "thm-bgPL";
          e_button.class = "button";
          e_listContainer.class = "list-container";
          e_list.class = "tfw-view-combo-list";
          e_4.class = "icon"; //------------------------
          // Initialize attributes.

          pm.set("wide", defVal(args, "wide", false));
          pm.set("label", defVal(args, "label", ""));
          pm.set("items", defVal(args, "items", []));
          pm.set("keys", defVal(args, "keys", []));
          pm.set("expanded", defVal(args, "expanded", false));
          pm.set("index", defVal(args, "index", 0));
          pm.set("value", defVal(args, "value", ""));
          pm.set("tabindex", defVal(args, "tabindex", 0));
          pm.fire("wide");
          pm.fire("label");
          pm.fire("items");
          pm.fire("keys");
          pm.fire("expanded");
          pm.fire("index");
          pm.fire("value");
          pm.fire("tabindex");
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/tfw.view.combo.js', ex);
          throw Error('Instantiation error in XJS of "mod/tfw.view.combo.js":\n' + ex);
        }
      };

      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/tfw.view.combo.js"\n' + ex);
  }

  module.exports._ = _;
});
//# sourceMappingURL=tfw.view.combo.js.map