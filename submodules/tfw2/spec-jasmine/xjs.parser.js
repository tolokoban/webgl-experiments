"use strict";

var ToloframeworkPermissiveJson = require("toloframework-permissive-json");


module.exports = function( xjsFileContent ) {
  try {
    return ToloframeworkPermissiveJson.parse( xjsFileContent );
  }
  catch( ex ) {
    throw "Invalid permissive JSON syntax:\n" + ex.message + "\n\n"
      + getFewLinesOfCode( xjsFileContent, ex.index, 3 );
  }
}

function getFewLinesOfCode( code, issuePosition, linesToDisplay ) {
  if( typeof issuePosition === 'undefined' ) issuePosition = 0;
  if( typeof linesToDisplay === 'undefined' ) linesToDisplay = 3;

  var lineCount = 1;
  var currentIndex = 0;
  var previousIndex = 0;
  var lines = [];
  issuePosition = Math.min( issuePosition, code.length -1 );
  while( currentIndex < code.length ) {
    if( code.charAt( currentIndex ) === '\n' ) {
      lines.push({ line: lineCount, begin: previousIndex, end: currentIndex });
      if( lines.length > linesToDisplay )
        lines.shift();
      previousIndex = currentIndex + 1;
      lineCount++;
      if( currentIndex >= issuePosition ) break;
    }
    currentIndex++;
  }

  var columnsSeparator = ": ";
  var lineNumbersLengths = lines.map(x => ("" + x.line).length);
  var spaceForLineNumbers = lineNumbersLengths.reduce((a,v) => Math.max(a, v), 0);
  var output = lines.map(
    x => padStart(x.line, spaceForLineNumbers)
      + columnsSeparator + code.substring(x.begin, x.end) ).join("\n");
  var lastLineBegin = lines.length > 0 ? lines.pop().begin : code.length;
  output += "\n" + padStart("^",
    spaceForLineNumbers + columnsSeparator.length + issuePosition - lastLineBegin - 1);
  return output;
}

function padStart( text, targetLength, padString ) {
  if( typeof padString === 'undefined' ) padString = ' ';
  text = "" + text;
  while( text.length < targetLength )
    text = padString + text;
  return text;
}

