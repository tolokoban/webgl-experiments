require("wdg.article",function(e,a,t){function n(){var e,a,t=o.tag("nav","theme-elevation-8");for(e in i)a=i[e],"$"===e.charAt(0)?o.add(t,o.tag("h1",[a])):o.add(t,o.tag("a",[a],{href:e+".html"}));return t}var r=function(){function a(){return n(t,arguments)}var t={en:{},fr:{}},n=e("$").intl;return a.all=t,a}(),i={$1:"Les bases",index:"Comprendre WebGL",chap1:"Dessiner un carré",chap2:"Dessiner un polygône",chap3:"Textures procédurales",chap4:"Textures animées",chap5:"Utiliser des images",$999:"脌 trier...",chap6:"Chap-6",chap7:"Chap-7",chap8:"Chap-8"};e("font.josefin");var o=e("dom"),c=e("tfw.data-binding"),s=function(e){var a=window.location.pathname.split("/").pop();a=a.substr(0,a.length-5),console.info("page=",a);var t=o.tag("header","theme-elevation-12",[i[a]]),r=n(),s=o.tag("article");o.elem(this,"div","article",[s,r,t]);c.prop(this,"content")(function(e){o.clear(s),Array.isArray(e)||(e=[e]),e.forEach(function(e){o.add(s,e)})}),e=c.extend({content:[]},e,this)};a.exports=s,a.exports._=r});
//# sourceMappingURL=wdg.article.js.map