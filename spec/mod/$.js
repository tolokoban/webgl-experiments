require("$",function(n,r){n.config={name:"webgl-experiments",description:"WebGL study by tutorials",author:"tolokoban",version:"0.0.73",major:0,minor:0,revision:73,date:new Date(2016,7,12,14,1,59)};var t=null;n.lang=function(n){return void 0===n&&(window.localStorage&&(n=window.localStorage.getItem("Language")),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),t=n,window.localStorage&&window.localStorage.setItem("Language",n),n},n.intl=function(r,t){var e,a,o,i,g,l,u=r[n.lang()],s=t[0];if(!u)return s;if(e=u[s],!e)return s;if(t.length>1){for(a="",g=0,o=0;o<e.length;o++)i=e.charAt(o),"$"===i?(a+=e.substring(g,o),o++,l=e.charCodeAt(o)-48,a+=l<0||l>=t.length?"$"+e.charAt(o):t[l],g=o+1):"\\"===i&&(a+=e.substring(g,o),o++,a+=e.charAt(o),g=o+1);a+=e.substr(g),e=a}return e}});
//# sourceMappingURL=$.js.map