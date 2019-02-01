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
  const children = coeffs.map(createTableCell.bind( this, size ));
  const divs = Dom.div(children);
  return divs;
}


/**
 * If `size`  is at  least equal  to `this.highlight`, we  must fill  `this.highligth` cells  in the
 * center of the row provided there is even number of non-orange cells remaining.
 *
 * @this View
 * @param {int} size - Number of cells in a row.
 * @param {int} coeff - Text to put in the cell.
 * @param {int} index - Cell's index.
 * @returns {Element} A DIV representing the cell.
 */
function createTableCell( size, coeff, index ) {
  const div = Dom.div([ coeff ]);
  if( size >= this.highlight ) {
    const margin = size - this.highlight;
    if( (margin & 1) === 0 ) {
      const halfMargin = margin >> 1;
      if( index >= halfMargin && index < size - halfMargin ) {
        Dom.addClass( div, "orange" );
      }
    }
  }
  return div;
}
