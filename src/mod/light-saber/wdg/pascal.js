"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { mapRow };

const
Dom = require("dom"),
MathGL = require("webgl.math");


/**
 * @this View
 * @param {int} size - Number of binomial coefficients.
 * @returns {Element} A row of binomial coefficients.
 */
function mapRow(size) {
    // computeBinomialCoeffs returns a Float32Array.
    const coeffs = Array.from(MathGL.computeBinomialCoeffs(size));
    const children = coeffs.map(coeff => Dom.div([coeff]));
    const divs = Dom.div(children);
    if( size === this.highlight ) {
        Dom.addClass( divs, "orange" );
    }
    return divs;
}
