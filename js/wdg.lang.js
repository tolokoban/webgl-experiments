/** @module wdg.lang */require( 'wdg.lang', function(require, module, exports) { var _=function(){var D={"en":{"ab":"аҧсуа бызшәа, аҧсшәа","aa":"Afaraf","af":"Afrikaans","ak":"Akan","sq":"Shqip","am":"አማርኛ","ar":"العربية","an":"aragonés","hy":"Հայերեն","as":"অসমীয়া","av":"авар мацӀ, магӀарул мацӀ","ae":"avesta","ay":"aymar aru","az":"azərbaycan dili","bm":"bamanankan","ba":"башҡорт теле","eu":"euskara, euskera","be":"беларуская мова","bn":"বাংলা","bh":"भोजपुरी","bi":"Bislama","bs":"bosanski jezik","br":"brezhoneg","bg":"български език","my":"ဗမာစာ","ca":"català","ch":"Chamoru","ce":"нохчийн мотт","ny":"chiCheŵa, chinyanja","zh":"中文","cv":"чӑваш чӗлхи","kw":"Kernewek","co":"corsu, lingua corsa","cr":"ᓀᐦᐃᔭᐍᐏᐣ","hr":"hrvatski jezik","cs":"čeština, český jazyk","da":"dansk","dv":"ދިވެހި","nl":"Nederlands, Vlaams","dz":"རྫོང་ཁ","en":"English","eo":"Esperanto","et":"eesti, eesti keel","ee":"Eʋegbe","fo":"føroyskt","fj":"vosa Vakaviti","fi":"suomi, suomen kieli","fr":"français, langue française","ff":"Fulfulde, Pulaar, Pular","gl":"galego","ka":"ქართული","de":"Deutsch","el":"ελληνικά","gn":"Avañe'ẽ","gu":"ગુજરાતી","ht":"Kreyòl ayisyen","ha":"(Hausa) هَوُسَ","he":"עברית","hz":"Otjiherero","hi":"हिन्दी, हिंदी","ho":"Hiri Motu","hu":"magyar","ia":"Interlingua","id":"Bahasa Indonesia","ie":"Interlingue","ga":"Gaeilge","ig":"Asụsụ Igbo","ik":"Iñupiaq, Iñupiatun","io":"Ido","is":"Íslenska","it":"italiano","iu":"ᐃᓄᒃᑎᑐᑦ","ja":"日本語","jv":"Basa Jawa","kl":"kalaallisut, kalaallit oqaasii","kn":"ಕನ್ನಡ","kr":"Kanuri","ks":"कश्मीरी","kk":"қазақ тілі","km":"ខ្មែរ, ខេមរភាសា, ភាសាខ្មែរ","ki":"Gĩkũyũ","rw":"Ikinyarwanda","ky":"Кыргызча, Кыргыз тили","kv":"коми кыв","kg":"Kikongo","ko":"한국어","ku":"Kurdî","kj":"Kuanyama","la":"latine, lingua latina","lb":"Lëtzebuergesch","lg":"Luganda","li":"Limburgs","ln":"Lingála","lo":"ພາສາລາວ","lt":"lietuvių kalba","lu":"Tshiluba","lv":"latviešu valoda","gv":"Gaelg, Gailck","mk":"македонски јазик","mg":"fiteny malagasy","ms":"bahasa Melayu","ml":"മലയാളം","mt":"Malti","mi":"te reo Māori","mr":"मराठी","mh":"Kajin M̧ajeļ","mn":"Монгол хэл","na":"Dorerin Naoero","nv":"Diné bizaad","nd":"isiNdebele","ne":"नेपाली","ng":"Owambo","nb":"Norsk bokmål","nn":"Norsk nynorsk","no":"Norsk","ii":"ꆈꌠ꒿ Nuosuhxop","nr":"isiNdebele","oc":"occitan, lenga d'òc","oj":"ᐊᓂᔑᓈᐯᒧᐎᓐ","cu":"ѩзыкъ словѣньскъ","om":"Afaan Oromoo","or":"ଓଡ଼ିଆ","os":"ирон æвзаг","pa":"ਪੰਜਾਬੀ","pi":"पाऴि","fa":"فارسی","pl":"język polski, polszczyzna","ps":"پښتو","pt":"Português","qu":"Runa Simi, Kichwa","rm":"rumantsch grischun","rn":"Ikirundi","ro":"Română","ru":"Русский","sa":"संस्कृतम्","sc":"sardu","sd":"सिन्धी","se":"Davvisámegiella","sm":"gagana fa'a Samoa","sg":"yângâ tî sängö","sr":"српски језик","gd":"Gàidhlig","sn":"chiShona","si":"සිංහල","sk":"slovenčina, slovenský jazyk","sl":"slovenski jezik, slovenščina","so":"Soomaaliga, af Soomaali","st":"Sesotho","es":"español","su":"Basa Sunda","sw":"Kiswahili","ss":"SiSwati","sv":"svenska","ta":"தமிழ்","te":"తెలుగు","tg":"тоҷикӣ","th":"ไทย","ti":"ትግርኛ","bo":"བོད་ཡིག","tk":"Türkmen, Түркмен","tl":"Wikang Tagalog","tn":"Setswana","to":"faka Tonga","tr":"Türkçe","ts":"Xitsonga","tt":"татар теле","tw":"Twi","ty":"Reo Tahiti","ug":"ئۇيغۇرچە","uk":"Українська","ur":"اردو","uz":"Oʻzbek","ve":"Tshivenḓa","vi":"Tiếng Việt","vo":"Volapük","wa":"walon","cy":"Cymraeg","wo":"Wollof","fy":"Frysk","xh":"isiXhosa","yi":"ייִדיש","yo":"Yorùbá","za":"Saɯ cueŋƅ, Saw cuengh","zu":"isiZulu","caption":"Please select your language"},"fr":{"caption":"Veuillez choisir votre langue"}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var $ = require("dom");
var DB = require("tfw.data-binding");
var Cfg = require("$");
var Modal = require("wdg.modal");
var Button = require("wdg.button");
var BoxButton = require("wdg.box-button");

/**
@exports {class}

Icon button or language selection.

@param {boolean} args.small - Small buttons can be used on other widgets.
@param {array} args.subset - List of languages to highlight.
@param {string} args.value - Language code (2 chars). For instance: fr, en, ...
*/
function Lang( args ) {
    var that = this;

    var modal = createModal( this );

    var elem = $.elem( this, 'div', 'wdg-lang', 
                       'theme-elevation-2', 
                       'theme-color-B0',
                       'theme-color-bg-A5' );
    var cell = $.div();
    $.add( elem, cell );
    DB.propString(this, 'value')(function(v) {
        cell.textContent = v.toUpperCase();
    });
    DB.propRemoveClass(this, 'visible', 'hide');
    DB.propAddClass(this, 'small', 'small');
    DB.propStringArray(this, 'subset');
    DB.extend({ 
        subset: [],
        value: Cfg.lang(), 
        small: false, 
        visible: true 
    }, args, this);

    $.on(this.element, {
        down: function(evt) {
            $.addClass(elem, 'theme-elevation-8');
            evt.stopPropagation();
            evt.preventDefault();
        },
        up: function(evt) {
            $.removeClass(elem, 'theme-elevation-8');
        },
        tap: function() {
            fillBody( modal.body, that, modal);
            modal.attach();
        }
    });
}


module.exports = Lang;


function createModal( that ) {
    var btnCancel = Button.Cancel();
    var header = $.tag('header', [_('caption')]);
    var footer = $.tag('footer', [btnCancel]);
    var body = $.div();
    var content = $.div('wdg-lang-modal', [header, body, footer]);
    var modal = new Modal({ content: content });
    modal.body = body;
    btnCancel.on(modal.detach.bind( modal ));
    return modal;
}


function fillBody( body, that, modal ) {
    $.clear( body );
    var firstLang;
    for( firstLang in _.all ) break;
    var isoCountry;
    for( isoCountry in _.all[firstLang] ) {
        if( isoCountry.length != 2 ) continue;
        if( that.subset.indexOf( isoCountry ) != -1 ) {
            $.add( body, newButton(that, isoCountry, modal ) );
        }
    }
    if( that.subset.length > 0 ) {
        $.add( body, $.tag("hr") );
    }
    for( isoCountry in _.all[firstLang] ) {
        if( isoCountry.length != 2 ) continue;
        if( that.subset.indexOf( isoCountry ) == -1 ) {
            $.add( body, newButton(that, isoCountry, modal ) );
        }
    }
}


function newButton(that, isoCountry, modal) {
    var bb = new BoxButton({ content: $.div('wdg-lang-table', [
        $.div([
            $.div([isoCountry.toUpperCase()]),
            $.div([_(isoCountry)])
        ])
    ]), enabled: isoCountry != that.value });
    $.css( bb, { margin: '4px' } );
    bb.on(function() {
        that.value = isoCountry;
        modal.detach();
    });
    return bb;
}


  
module.exports._ = _;
/**
 * @module wdg.lang
 * @see module:$
 * @see module:dom
 * @see module:tfw.data-binding
 * @see module:wdg.modal
 * @see module:wdg.button
 * @see module:wdg.box-button

 */
});