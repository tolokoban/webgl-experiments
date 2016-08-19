{"intl":"","src":"/** @module $ */require( '$', function(exports, module) {  exports.config={\n    name:\"webgl-experiments\",\n    description:\"WebGL study by tutorials\",\n    author:\"tolokoban\",\n    version:\"0.0.73\",\n    major:0,\n    minor:0,\n    revision:73,\n    date:new Date(2016,6,28,17,11,25)\n};\nvar currentLang = null;\r\nexports.lang = function(lang) {\r\n    if (lang === undefined) {\r\n        if (window.localStorage) {\r\n            lang = window.localStorage.getItem(\"Language\");\r\n        }\r\n        if (!lang) {\r\n            lang = window.navigator.language;\r\n            if (!lang) {\r\n                lang = window.navigator.browserLanguage;\r\n                if (!lang) {\r\n                    lang = \"fr\";\r\n                }\r\n            }\r\n        }\r\n        lang = lang.substr(0, 2).toLowerCase();\r\n    }\r\n    currentLang = lang;\r\n    if (window.localStorage) {\r\n        window.localStorage.setItem(\"Language\", lang);\r\n    }\r\n    return lang;\r\n};\r\nexports.intl = function(words, params) {\r\n    var dic = words[exports.lang()],\r\n    k = params[0],\r\n    txt, newTxt, i, c, lastIdx, pos;\r\n    if (!dic) {\r\n        //console.error(\"Missing internationalization for language : \\\"\" + exports.lang() + \"\\\"!\");\r\n        return k;\r\n    }\r\n    txt = dic[k];\r\n    if (!txt) {\r\n        //console.error(\"Missing internationalization [\" + exports.lang() + \"]: \\\"\" + k + \"\\\"!\");\r\n        return k;\r\n    }\r\n    if (params.length > 1) {\r\n        newTxt = \"\";\r\n        lastIdx = 0;\r\n        for (i = 0 ; i < txt.length ; i++) {\r\n            c = txt.charAt(i);\r\n            if (c === '$') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                pos = txt.charCodeAt(i) - 48;\r\n                if (pos < 0 || pos >= params.length) {\r\n                    newTxt += \"$\" + txt.charAt(i);\r\n                } else {\r\n                    newTxt += params[pos];\r\n                }\r\n                lastIdx = i + 1;\r\n            } else if (c === '\\\\') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                newTxt += txt.charAt(i);\r\n                lastIdx = i + 1;\r\n            }\r\n        }\r\n        newTxt += txt.substr(lastIdx);\r\n        txt = newTxt;\r\n    }\r\n    return txt;\r\n};\r\n\n\n  \n/**\n * @module $\n * @see module:$\n\n */\n});","zip":"require(\"$\",function(n,r){n.config={name:\"webgl-experiments\",description:\"WebGL study by tutorials\",author:\"tolokoban\",version:\"0.0.73\",major:0,minor:0,revision:73,date:new Date(2016,6,28,17,11,25)};var t=null;n.lang=function(n){return void 0===n&&(window.localStorage&&(n=window.localStorage.getItem(\"Language\")),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n=\"fr\"))),n=n.substr(0,2).toLowerCase()),t=n,window.localStorage&&window.localStorage.setItem(\"Language\",n),n},n.intl=function(r,t){var e,a,o,i,g,l,u=r[n.lang()],s=t[0];if(!u)return s;if(e=u[s],!e)return s;if(t.length>1){for(a=\"\",g=0,o=0;o<e.length;o++)i=e.charAt(o),\"$\"===i?(a+=e.substring(g,o),o++,l=e.charCodeAt(o)-48,a+=l<0||l>=t.length?\"$\"+e.charAt(o):t[l],g=o+1):\"\\\\\"===i&&(a+=e.substring(g,o),o++,a+=e.charAt(o),g=o+1);a+=e.substr(g),e=a}return e}});\n//# sourceMappingURL=$.js.map","map":{"version":3,"file":"$.js.map","sources":["$.js"],"sourcesContent":["/** @module $ */require( '$', function(exports, module) {  exports.config={\n    name:\"webgl-experiments\",\n    description:\"WebGL study by tutorials\",\n    author:\"tolokoban\",\n    version:\"0.0.73\",\n    major:0,\n    minor:0,\n    revision:73,\n    date:new Date(2016,6,28,17,11,25)\n};\nvar currentLang = null;\r\nexports.lang = function(lang) {\r\n    if (lang === undefined) {\r\n        if (window.localStorage) {\r\n            lang = window.localStorage.getItem(\"Language\");\r\n        }\r\n        if (!lang) {\r\n            lang = window.navigator.language;\r\n            if (!lang) {\r\n                lang = window.navigator.browserLanguage;\r\n                if (!lang) {\r\n                    lang = \"fr\";\r\n                }\r\n            }\r\n        }\r\n        lang = lang.substr(0, 2).toLowerCase();\r\n    }\r\n    currentLang = lang;\r\n    if (window.localStorage) {\r\n        window.localStorage.setItem(\"Language\", lang);\r\n    }\r\n    return lang;\r\n};\r\nexports.intl = function(words, params) {\r\n    var dic = words[exports.lang()],\r\n    k = params[0],\r\n    txt, newTxt, i, c, lastIdx, pos;\r\n    if (!dic) {\r\n        //console.error(\"Missing internationalization for language : \\\"\" + exports.lang() + \"\\\"!\");\r\n        return k;\r\n    }\r\n    txt = dic[k];\r\n    if (!txt) {\r\n        //console.error(\"Missing internationalization [\" + exports.lang() + \"]: \\\"\" + k + \"\\\"!\");\r\n        return k;\r\n    }\r\n    if (params.length > 1) {\r\n        newTxt = \"\";\r\n        lastIdx = 0;\r\n        for (i = 0 ; i < txt.length ; i++) {\r\n            c = txt.charAt(i);\r\n            if (c === '$') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                pos = txt.charCodeAt(i) - 48;\r\n                if (pos < 0 || pos >= params.length) {\r\n                    newTxt += \"$\" + txt.charAt(i);\r\n                } else {\r\n                    newTxt += params[pos];\r\n                }\r\n                lastIdx = i + 1;\r\n            } else if (c === '\\\\') {\r\n                newTxt += txt.substring(lastIdx, i);\r\n                i++;\r\n                newTxt += txt.charAt(i);\r\n                lastIdx = i + 1;\r\n            }\r\n        }\r\n        newTxt += txt.substr(lastIdx);\r\n        txt = newTxt;\r\n    }\r\n    return txt;\r\n};\r\n\n\n  \n});"],"names":["require","exports","module","config","name","description","author","version","major","minor","revision","date","Date","currentLang","lang","undefined","window","localStorage","getItem","navigator","language","browserLanguage","substr","toLowerCase","setItem","intl","words","params","txt","newTxt","i","c","lastIdx","pos","dic","k","length","charAt","substring","charCodeAt"],"mappings":"AAAgBA,QAAS,IAAK,SAASC,EAASC,GAAWD,EAAQE,QAC/DC,KAAK,oBACLC,YAAY,2BACZC,OAAO,YACPC,QAAQ,SACRC,MAAM,EACNC,MAAM,EACNC,SAAS,GACTC,KAAK,GAAIC,MAAK,KAAK,EAAE,GAAG,GAAG,GAAG,IAElC,IAAIC,GAAc,IAClBZ,GAAQa,KAAO,SAASA,GAoBpB,MAnBaC,UAATD,IACIE,OAAOC,eACPH,EAAOE,OAAOC,aAAaC,QAAQ,aAElCJ,IACDA,EAAOE,OAAOG,UAAUC,SACnBN,IACDA,EAAOE,OAAOG,UAAUE,gBACnBP,IACDA,EAAO,QAInBA,EAAOA,EAAKQ,OAAO,EAAG,GAAGC,eAE7BV,EAAcC,EACVE,OAAOC,cACPD,OAAOC,aAAaO,QAAQ,WAAYV,GAErCA,GAEXb,EAAQwB,KAAO,SAASC,EAAOC,GAC3B,GAEAC,GAAKC,EAAQC,EAAGC,EAAGC,EAASC,EAFxBC,EAAMR,EAAMzB,EAAQa,QACxBqB,EAAIR,EAAO,EAEX,KAAKO,EAED,MAAOC,EAGX,IADAP,EAAMM,EAAIC,IACLP,EAED,MAAOO,EAEX,IAAIR,EAAOS,OAAS,EAAG,CAGnB,IAFAP,EAAS,GACTG,EAAU,EACLF,EAAI,EAAIA,EAAIF,EAAIQ,OAASN,IAC1BC,EAAIH,EAAIS,OAAOP,GACL,MAANC,GACAF,GAAUD,EAAIU,UAAUN,EAASF,GACjCA,IACAG,EAAML,EAAIW,WAAWT,GAAK,GAEtBD,GADAI,EAAM,GAAKA,GAAON,EAAOS,OACf,IAAMR,EAAIS,OAAOP,GAEjBH,EAAOM,GAErBD,EAAUF,EAAI,GACD,OAANC,IACPF,GAAUD,EAAIU,UAAUN,EAASF,GACjCA,IACAD,GAAUD,EAAIS,OAAOP,GACrBE,EAAUF,EAAI,EAGtBD,IAAUD,EAAIN,OAAOU,GACrBJ,EAAMC,EAEV,MAAOD"},"dependencies":["mod/$"]}