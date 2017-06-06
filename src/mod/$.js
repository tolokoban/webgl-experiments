<<<<<<< HEAD
exports.config={"name":"\"webgl-experiments\"","description":"\"WebGL study by tutorials\"","author":"\"tolokoban\"","version":"\"0.0.76\"","major":"0","minor":"0","revision":"76","date":"2017-06-05T14:17:26.000Z","consts":{}};
=======
exports.config={"name":"\"webgl-experiments\"","description":"\"WebGL study by tutorials\"","author":"\"tolokoban\"","version":"\"0.0.74\"","major":"0","minor":"0","revision":"74","date":"2017-06-06T09:34:47.000Z","consts":{}};
>>>>>>> d53f0d73b070ee3df8f282f5f8e6c9c2e5a22e73
var currentLang = null;
exports.lang = function(lang) {
    if (lang === undefined) {
        if (window.localStorage) {
            lang = window.localStorage.getItem("Language");
        }
        if (!lang) {
            lang = window.navigator.language;
            if (!lang) {
                lang = window.navigator.browserLanguage;
                if (!lang) {
                    lang = "fr";
                }
            }
        }
        lang = lang.substr(0, 2).toLowerCase();
    }
    currentLang = lang;
    if (window.localStorage) {
        window.localStorage.setItem("Language", lang);
    }
    return lang;
};
exports.intl = function(words, params) {
    var dic = words[exports.lang()],
        k = params[0],
        txt, newTxt, i, c, lastIdx, pos;
    var defLang;
    for( defLang in words ) break;
    if( !defLang ) return k;
    if (!dic) {
        dic = words[defLang];
        if( !dic ) {
            return k;
        }
    }
    txt = dic[k];
    if( !txt ) {
        dic = words[defLang];
        txt = dic[k];
    }
    if (!txt) return k;
    if (params.length > 1) {
        newTxt = "";
        lastIdx = 0;
        for (i = 0 ; i < txt.length ; i++) {
            c = txt.charAt(i);
            if (c === '$') {
                newTxt += txt.substring(lastIdx, i);
                i++;
                pos = txt.charCodeAt(i) - 48;
                if (pos < 0 || pos >= params.length) {
                    newTxt += "$" + txt.charAt(i);
                } else {
                    newTxt += params[pos];
                }
                lastIdx = i + 1;
            } else if (c === '\\') {
                newTxt += txt.substring(lastIdx, i);
                i++;
                newTxt += txt.charAt(i);
                lastIdx = i + 1;
            }
        }
        newTxt += txt.substr(lastIdx);
        txt = newTxt;
    }
    return txt;
};
