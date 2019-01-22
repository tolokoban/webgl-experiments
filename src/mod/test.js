"use strict";

exports.start = start;


var $ = require("dom");
var Gestures = require("tfw.gestures");


function start() {
  var canvas = $.tag("canvas", { width: 400, height: 900 });
  var ctx = canvas.getContext( '2d' );
  $.addClass( canvas, 'thm-ele8' );
  $.css( canvas, { margin: "48px" } );
  $.add( document.body, canvas );

  var gestures = Gestures( canvas );
  gestures.on( "wheel", function( evt ) {
    console.info("[test] evt=", evt);
    evt.preventDefault();
  });
  gestures.on( "tap", function( evt ) {
    var x = evt.x;
    var y = evt.y;
    ctx.strokeStyle = "#37f";
    ctx.beginPath();
    ctx.moveTo( x, y - 10 );
    ctx.lineTo( x, y + 10 );
    ctx.moveTo( x - 10, y );
    ctx.lineTo( x + 10, y );
    ctx.stroke();
  });
  gestures.on( "doubletap", function( evt ) {
    var x = evt.x;
    var y = evt.y;
    ctx.fillStyle = "#eee";
    ctx.beginPath();
    ctx.moveTo( x - 100 , y - 100 );
    ctx.lineTo( x + 100, y - 100  );
    ctx.lineTo( x + 100, y + 100  );
    ctx.lineTo( x - 100, y + 100  );
    ctx.closePath();
    ctx.fill();
  });
  gestures.on( "drag", function( evt ) {
    console.info("[test] evt=", evt);
    evt.preventDefault();
    var x = evt.x;
    var y = evt.y;
    var x0 = evt.x0;
    var y0 = evt.y0;
    var xx = x - evt.vx;
    var yy = y - evt.vy;
    ctx.strokeStyle = "#f80";
    ctx.beginPath();
    ctx.moveTo( x, y );
    ctx.lineTo( xx, yy );
    ctx.stroke();
    ctx.strokeStyle = "#f801";
    ctx.beginPath();
    ctx.moveTo( x, y );
    ctx.lineTo( x0, y0 );
    ctx.stroke();
  });
  
  gestures.on("down", function( evt ) {
    console.info("[test] DOWN", evt);
    var x = evt.x;
    var y = evt.y;
    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.moveTo( x - 8, y - 8 );
    ctx.lineTo( x + 8, y + 8 );
    ctx.moveTo( x - 8, y + 8 );
    ctx.lineTo( x + 8, y - 8 );
    ctx.stroke();
  });
  gestures.on("up", function( evt ) {
    console.info("[test] UP", evt);
    var x = evt.x;
    var y = evt.y;
    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo( x - 12, y - 12 );
    ctx.lineTo( x + 12, y - 12 );
    ctx.lineTo( x + 12, y + 12 );
    ctx.lineTo( x - 12, y + 12 );
    ctx.closePath();
    ctx.stroke();
  });
}
