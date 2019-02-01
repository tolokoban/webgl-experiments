"use strict";

require( "polyfill.object.values" );

const
    $ = require( "dom" ),
    Icons = require( "tfw.icons" );


// Code behind to use in the XJS.
const CODE_BEHIND = {
    onContentChanged,
    onPen0Changed: function( v ) { updatePen.call( this, 0, v ); },
    onPen1Changed: function( v ) { updatePen.call( this, 1, v ); },
    onPen2Changed: function( v ) { updatePen.call( this, 2, v ); },
    onPen3Changed: function( v ) { updatePen.call( this, 3, v ); },
    onPen4Changed: function( v ) { updatePen.call( this, 4, v ); },
    onPen5Changed: function( v ) { updatePen.call( this, 5, v ); },
    onPen6Changed: function( v ) { updatePen.call( this, 6, v ); },
    onPen7Changed: function( v ) { updatePen.call( this, 7, v ); }
};

/**
 * Create SVG icon from `content`
 *
 * @this ViewXJS
 * @param   {object|string} contentStringOrObject - Can be an icon name or a SVG description.
 * @returns {undefined}
 */
function onContentChanged( contentStringOrObject ) {
    try {
        const
            isString = typeof contentStringOrObject === 'string',
            content = isString ? Icons.iconsBook[ contentStringOrObject ] : contentStringOrObject;

        this._content = createSvgFromDefinition.call( this, content );
        if ( !this._content ) return;
        $.clear( this, this._content.svgRootGroup );

        // Update pens' colors.
        for ( const penIndex of [ 0, 1, 2, 3, 4, 5, 6, 7 ] ) {
            updatePen.call( this, penIndex, this[ `pen${penIndex}` ] );
        }

        this.$.style.display = "";
    } catch ( ex ) {
        this.$.style.display = "none";
        if ( this.content !== '' ) this.content = '';
    }
}

// Special colors.
// 0 is black,  1 is white, P  is primary, S is secondary,  L is light
// and D is dark.
const FILL_COLORS_TO_CLASSES = {
        '0': "thm-svg-fill0",
        '1': "thm-svg-fill1",
        P: "thm-svg-fill-P",
        PL: "thm-svg-fill-PL",
        PD: "thm-svg-fill-PD",
        S: "thm-svg-fill-S",
        SL: "thm-svg-fill-SL",
        SD: "thm-svg-fill-SD"
    },
    STROKE_COLORS_TO_CLASSES = {
        '0': "thm-svg-stroke0",
        '1': "thm-svg-stroke1",
        P: "thm-svg-stroke-P",
        PL: "thm-svg-stroke-PL",
        PD: "thm-svg-stroke-PD",
        S: "thm-svg-stroke-S",
        SL: "thm-svg-stroke-SL",
        SD: "thm-svg-stroke-SD"
    };


function createSvgFromDefinition( def ) {
    var svgParent = $.svg( 'g', {
        'stroke-width': 6,
        fill: "none",
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    } );

    // Store elements with special colors  in order to update them later
    // if needed. We can have up to 8 colors numbered from 0 to 7.
    var elementsToFillPerColor = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    var elementsToStrokePerColor = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    var svgRootGroup = addChild( this.$, elementsToFillPerColor, elementsToStrokePerColor, def );
    if ( !svgRootGroup ) return null;

    $.att( svgRootGroup, {
        'stroke-width': 6,
        fill: "none",
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    } );

    return {
        svgRootGroup: svgRootGroup,
        elementsToFillPerColor: elementsToFillPerColor,
        elementsToStrokePerColor: elementsToStrokePerColor
    };
}

/**
 * @param {Node} parent - SVG element into append elements created from `def`.
 * @param {string} def - Text to add to the `parent`.
 * @param {array} def - SVG node to add to `parent`.
 * @param {string} def[0] - Tag name of then SVG node to add to `parent`.
 * @param {array} def[>0] - Definition of the children.
 * @param {object} def[>0] - Attributes of the element.
 */
function addChild( parent, elementsToFillPerColor, elementsToStrokePerColor, def ) {
    if ( typeof def === 'string' )
        return $.add( parent, def );
    if ( !checkDefinitionSyntax( def ) ) return null;

    var elementName = def[ 0 ];
    var element = $.svg( elementName );

    def.forEach( function( childItem, index ) {
        if ( index === 0 ) return;
        if ( Array.isArray( childItem ) ) {
            childItem.forEach( addChild.bind( null, element, elementsToFillPerColor, elementsToStrokePerColor ) );
        } else {
            setAttributesAndRegisterElementsWithSpecialColors(
                element, elementsToFillPerColor, elementsToStrokePerColor, childItem );
        }
    } );

    $.add( parent, element );
    return element;
}

function setAttributesAndRegisterElementsWithSpecialColors(
    node, elementsToFillPerColor, elementsToStrokePerColor, attribs ) {
    var attName, attValue, valueAsIndex, elementsPerColor;

    for ( attName in attribs ) {
        attValue = attribs[ attName ];
        if ( attName === 'fill' || attName === 'stroke' ) {
            valueAsIndex = parseInt( attValue );
            if ( isNaN( valueAsIndex ) ) {
                // Straigth attribute.
                $.att( node, attName, attValue );
            } else {
                elementsPerColor = attName === 'fill' ? elementsToFillPerColor : elementsToStrokePerColor;
                valueAsIndex = clamp( valueAsIndex, 0, elementsPerColor.length - 1 );
                elementsPerColor[ valueAsIndex ].push( node );
            }
        } else {
            $.att( node, attName, attValue );
        }
    }
}

function checkDefinitionSyntax( def ) {
    if ( typeof def === 'undefined' ) return false;

    if ( !Array.isArray( def ) ) {
        throw "Definition of SVG elements must be arrays!\n" +
            JSON.stringify( def );
    }
    var svgElementTagName = def[ 0 ];
    if ( typeof svgElementTagName !== 'string' )
        throw "The first item of a SVG element must be a string!\n" + svgElementTagName;
    return true;
}

/**
 * Update the color of a pen.
 *
 * @this ViewXJS
 * @param   {integer} penIndex - The index of the pen.
 * @param   {string} penColor - The new color of this pen.
 * @returns {undefined}
 */
function updatePen( penIndex, penColor = "0" ) {
    if ( !this._content ) return;

    let elementsToFill = this._content.elementsToFillPerColor[ penIndex ];
    if ( !Array.isArray( elementsToFill ) ) elementsToFill = [];
    let elementsToStroke = this._content.elementsToStrokePerColor[ penIndex ];
    if ( !Array.isArray( elementsToStroke ) ) elementsToStroke = [];

    updateColor( elementsToFill, elementsToStroke, penColor );
}

function updateColor( elementsToFill, elementsToStroke, color ) {
    updateColorForType( "fill", elementsToFill, FILL_COLORS_TO_CLASSES, color );
    updateColorForType( "stroke", elementsToStroke, STROKE_COLORS_TO_CLASSES, color );
}

function updateColorForType( attName, elements, classes, color ) {
    var className = classes[ color ];
    elements.forEach( function( element ) {
        Object.values( classes ).forEach( function( classNameToRemove ) {
            $.removeClass( element, classNameToRemove );
        } );
    } );

    if ( typeof className === 'undefined' ) {
        elements.forEach( function( element ) {
            $.att( element, attName, color );
        } );
    } else {
        elements.forEach( function( element ) {
            $.addClass( element, className );
            $.removeAtt( element, attName );
        } );
    }
}

function clamp( value, min, max ) {
    if ( value < min ) return min;
    if ( value > max ) return max;
    return value;
}