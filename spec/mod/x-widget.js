require("x-widget",function(e,t){function n(){return f(u,arguments)}function r(e,t,n){try{var r=require(t),i=new r(n),u="function"==typeof i.element?i.element():i.element;u.setAttribute("id",e);var f=document.getElementById(e);return f&&f.parentNode.replaceChild(u,f),o(e,i),i}catch(r){throw console.error("[x-widget] Unable to create widget `"+t+"`!"),console.error("[x-widget] id = ",e,", args = ",n),Error(r)}}function i(e){var t,n=d.tag(e.elem);e.attr&&(d.att(n,e.attr),t=e.attr.id),Array.isArray(e.children)&&e.children.forEach(function(e){d.add(n,e)});var r,i,u={};if(e.prop)for(r in e.prop)i=e.prop[r],Object.defineProperty(u,r,{value:i,writable:!1,configurable:!1,enumerable:!0});return Object.defineProperty(u,"element",{value:n,writable:!1,configurable:!1,enumerable:!0}),"undefined"!=typeof t&&o(t,u),u}function o(e,t){c[e]=t;var n=l[e];return console.info("[x-widget] widget creation=...",e),"undefined"!=typeof n&&window.setTimeout(function(){n.forEach(function(e){e(t)}),delete l[e]}),"function"==typeof t.element?t.element:t.element||t}var u={en:{}},f=require("$").intl,d=require("dom"),a=require("tfw.data-binding"),c={},l={},y=function(e,t,n){return"string"==typeof e?r.call(this,e,t,n):i.call(this,e)};y.template=function(e){var t,n,r,i="",u={};for(t in e)n=e[t],"name"==t?i=n:"id"==t?r=n:"$"==t.charAt(0)&&(u[t.substr(1)]=n);var f=require(i),d=new f(u);return r&&o(r,d),"function"==typeof d.element?d.element():d.element||d},y.getById=function(e){if(!c[e])throw Error("[x-widget.getById()] ID not found: "+e+"!");return c[e]},y.onWidgetCreation=function(e,t){"undefined"==typeof c[e]?"undefined"==typeof l[e]?l[e]=[t]:l[e].push(t):window.setTimeout(function(){t(c[e])})},y.bind=function(e,t){var n,r,i,o,u,f=c[e];for(n in t)o=t[n].B,Array.isArray(o)&&o.forEach(function(t){if(r=c[t[0]],"undefined"==typeof r)return void console.error('[x-widget:bind] Trying to bind attribute "'+n+'" of widget "'+e+'" to the unexisting widget "'+t[0]+'"!');if(i=t[1],2==t.length)a.bind(r,i,f,n);else{var o=t[2];a.bind(r,i,function(){f[n]=o})}}),u=t[n].S,Array.isArray(u)&&u.forEach(function(e){var t=APP,r=e;Array.isArray(e)&&(t=require(e[0]),r=e[1]),r=t[r],"function"!=typeof r?console.error("[x-widget:bind] slot not found: ",e):a.bind(f,n,r)})},t.exports=y,t.exports._=n});
//# sourceMappingURL=x-widget.js.map