"use strict";

const $ = require( "dom" );

/* exported CODE_BEHIND */
const CODE_BEHIND = { onKeyUp, onValueChanged };

const MAX_AUTOCOMPLETION_SUGGESTIONS = 99;


function onKeyUp( evt ) {
    if ( evt.key === 'Enter' ) {
        this.value = this.$elements.input.value;
        this.action = this.value;
    }
}

function onValueChanged( v ) {
    manageValidator.call( this, v );
    manageAutoCompletion.call( this, v );
}

function manageValidator( v ) {
    this.valid = this.validator( v );
}

function manageAutoCompletion( v ) {
    var that = this;
    var list = this.list;
    if ( !Array.isArray( list ) || list.length === 0 ) return;

    var elemCompletion = this.$elements.completion;
    $.clear( elemCompletion );
    var textToSearch = v.trim().toLowerCase();
    var elementsCount = 0;
    list.forEach( function ( completionText ) {
        var pos = completionText.toLowerCase().indexOf( textToSearch );
        if ( pos !== 0 ) return;
        elementsCount++;
        if ( elementsCount > MAX_AUTOCOMPLETION_SUGGESTIONS ) return;
        addCompletionItem.call( that, elemCompletion, completionText, pos, textToSearch.length );
    } );
    if ( elementsCount < MAX_AUTOCOMPLETION_SUGGESTIONS ) {
        list.forEach( function ( completionText ) {
            var pos = completionText.toLowerCase().indexOf( textToSearch );
            if ( pos < 1 ) return;
            elementsCount++;
            if ( elementsCount > MAX_AUTOCOMPLETION_SUGGESTIONS ) return;
            addCompletionItem.call( that, elemCompletion, completionText, pos, textToSearch.length );
        } );
    }
}


function addCompletionItem( elemCompletion, completionText, begin, length ) {
    var that = this;
    var elem = $.div();
    if ( begin > 0 ) {
        $.add( elem, $.tag( 'span', [ completionText.substr( 0, begin ) ] ) );
    }
    $.add( elem, $.tag( 'b', [ completionText.substr( begin, length ) ] ) );
    if ( begin + length < completionText.length ) {
        $.add( elem, $.tag( 'span', [ completionText.substr( begin + length ) ] ) );
    }
    $.on( elem, function ( v ) {
        that.value = completionText;
    } );
    $.add( elemCompletion, elem );
}