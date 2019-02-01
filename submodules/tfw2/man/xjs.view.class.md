# CSS Classes manipulation

You can set CSS classes in a static way:
```
{DIV class: "elevation-8 round"}
```

or in a bounded way:
```
{DIV class: {Bind style}}
```

You can also bind the existence of a given class to a boolean property:
```
// Add class `elevation-8` if and only if `pressed === true`.
{DIV class.elevation-8: {Bind pressed}}
```
```
// Add class `highlight` if and only if `pressed === false`.
{DIV class.|highlight: {Bind pressed}}
```
```
// If `pressed === true`, add class `elevation-8`, otherwise add class 'elevation-2'.
{DIV class.elevation-8|elevation-2: {Bind pressed}}
```

And if you need a more complex logic to set classes, you can use code behind:
```
// As soon as `flat` or `pressed` has changed, call teh code behind function
// `computeClass()` to return an array of classes to set.
{DIV class.*: {Bind [flat, pressed] computeClasses}}
```

It is possible to define a list of functions:
```
{DIV class.*: [
  {Bind [flat, pressed] computeClassesWhenPressed}
  {Bind [flat, enabled] computeClassesWhenEnabled}
]}
```

The functions (for instance `computeClassesWhenPressed`) are defined in the CODE_BEHIND object.
They just need to return an array of CSS classes names.

Imagine the following XJS:
```js
{View DIV
  view.attribs: {
    flat: {boolean}
    pressed: {boolean}
  }
  class.*: {Bind [flat, pressed] computeClasses}
}
```
And the JS code:
```js
var CODE_BEHIND: {
  computeClasses: function() {
    if( !this.pressed ) return;
    return this.flat ? ["flat", "pressed"] : "pressed";
  }
};
```

Then you get this:

| Trigger          | Applied classes |
| ---------------- | --------------- |
| flat := false    |                 |
| pressed := true  | pressed         |
| flat := true     | flat pressed    |
| pressed := false | flat            |

You're probably surprised to get `flat` in the last row of this table.
In fact, the algorithm is as follows:
* If this is not the first time the current attribute triggers the `computeClasses` function  then
  * Remove the CSS classes previously added.
* Add the CSS classes in the returned array.
 
