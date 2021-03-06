"use strict";

const $ = require("dom");
const MARGIN = 20;

module.exports = function(init) {
    const Draw = function(args) {
        this.ORANGE = "#f70";
        this.BLUE = "#28f";

        if( typeof args === 'undefined' ) args = {};

        if( typeof args.width === 'undefined' ) args.width = 300;
        if( typeof args.height === 'undefined' ) args.height = 300;
        args.width = parseInt( args.width );
        args.height = parseInt( args.height );
        if( typeof args.width !== 'number' ) args.width = 300;
        if( typeof args.height !== 'number' ) args.height = 300;

        var canvas = $.tag("canvas", { width: args.width, height: args.height });
        $.css( canvas, {
            boxShadow: "none",
            background: "transparent"
        });
        if( typeof args.float === 'string' ) {
            $.css( canvas, { float: args.float } );
        }

        const ctx = canvas.getContext("2d");
        ctx.clearRect( 0, 0, args.width, args.height );
        ctx.lineJoin = "round";
        this.element = canvas;

        readOnly( this, {
            _ctx: ctx,
            _w: args.width,
            _h: args.height,
            X: function(x) {
                var w = args.width;
                var radius = 0.5 * w - MARGIN;
                return w * 0.5 + x * radius;
            },
            Y: function(y) {
                var h = args.height;
                var radius = 0.5 * h - MARGIN;
                return h * 0.5 - y * radius;
            }
        });

        this.setColor("#000");
        ctx.font = "11px sans-serif";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        init.call( this, args );
    };

    Draw.prototype.setColor = function( color ) {
        this._ctx.fillStyle = color;
        this._ctx.strokeStyle = color;
        return this;
    };

    Draw.prototype.setLine = function( lineWidth ) {
        this._ctx.lineWidth = lineWidth;
        return this;
    };

    Draw.prototype.fillRect = function(x1, y1, x2, y2) {
        x1 = this.X( x1 );
        y1 = this.Y( y1 );
        x2 = this.X( x2 );
        y2 = this.Y( y2 );
        var x = Math.min( x1, x2 );
        var y = Math.min( y1, y2 );
        var w = Math.max( x1, x2 ) - x;
        var h = Math.max( y1, y2 ) - y;
        this._ctx.fillRect( x, y, w, h );
        return this;
    };

    Draw.prototype.axes = function() {
        var ctx = this._ctx;
        ctx.save();
        this
            .setColor("#ddd")
            .fillRect( -1, -1, 1, 1 )
            .setColor("#aaa");
        var w = this._w;
        var w2 = Math.floor( w * 0.5 ) - 0.5;
        var h = this._h;
        var h2 = Math.floor( h * 0.5 ) - 0.5;
        ctx.beginPath();
        ctx.moveTo( 0, h2 );
        ctx.lineTo( w, h2 );
        ctx.moveTo( w2, 0 );
        ctx.lineTo( w2, h );
        ctx.stroke();
        ctx.restore();
        return this;
    };

    Draw.prototype.dot = function(xx, yy, text, attach) {
        var x = this.X( xx );
        var y = this.Y( yy );
        var ctx = this._ctx;
        ctx.beginPath();
        ctx.arc( x, y, 3, 0, 2 * Math.PI, true );
        ctx.fill();
        if( typeof text === 'string' ) {
            if( typeof attach === 'undefined' ) attach = getBestAttach( xx, yy );

            this.txt( text, xx, yy, attach );
        }
        return this;
    };

    Draw.prototype.txt = function( text, x, y, attach ) {
        if( typeof attach !== 'string' ) attach = "";
        attach = attach.toUpperCase();

        x = this.X( x );
        y = this.Y( y );
        var ctx = this._ctx;
        if( attach.indexOf("L") !== -1 ) {
            ctx.textAlign = "start";
            x += 4;
        }
        else if( attach.indexOf("R") !== -1 ) {
            ctx.textAlign = "end";
            x -= 4;
        }
        else ctx.textAlign = "center";
        if( attach.indexOf("T") !== -1 ) {
            ctx.textBaseline  = "top";
            y += 4;
        }
        else if( attach.indexOf("B") !== -1 ) {
            ctx.textBaseline = "bottom";
            y -= 4;
        }
        else ctx.textBaseline = "middle";
        ctx.fillText( text, x, y );
        return this;
    };

    Draw.prototype.drawVector = function( x1, y1, x2, y2 ) {
        this.drawLine( x1, y1, x2, y2 );
        const vxx = x1 - x2,
              vyy = y1 - y2,
              len = Math.sqrt( vxx * vxx + vyy * vyy ),
              thickness = this._ctx.lineWidth / this._w;
        if( len < 3 * thickness ) return this;
        const vx = thickness * vxx / len,
              vy = thickness * vyy / len,
              ang = Math.PI * 0.12,
              C = Math.cos( ang ),
              S = Math.sin( ang ),
              SIZE = 6,
              xo = x2,
              yo = y2,
              xa = x2 + SIZE * (C * vx - S * vy),
              ya = y2 + SIZE * (S * vx + C * vy),
              xb = x2 + SIZE * (C * vx + S * vy),
              yb = y2 + SIZE * (- S * vx + C * vy),
              xh = x2 + vx * SIZE * 0.5,
              yh = y2 + vy * SIZE * 0.5;
        this.drawTri( xo, yo, xh, yh, xa, ya );
        this.drawTri( xo, yo, xh, yh, xb, yb );
        return this;
    };

    Draw.prototype.drawLine = function( x1, y1, x2, y2 ) {
        x1 = this.X( x1 );
        y1 = this.Y( y1 );
        x2 = this.X( x2 );
        y2 = this.Y( y2 );
        var ctx = this._ctx;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return this;
    };

    Draw.prototype.tri = function( x1, y1, x2, y2, x3, y3 ) {
        x1 = this.X( x1 );
        y1 = this.Y( y1 );
        x2 = this.X( x2 );
        y2 = this.Y( y2 );
        x3 = this.X( x3 );
        y3 = this.Y( y3 );
        var ctx = this._ctx;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        return this;
    };

    Draw.prototype.opacity = function( opacity ) {
        this._ctx.globalAlpha = opacity;
        return this;
    };

    Draw.prototype.setOpacity = function( opacity ) {
        this._ctx.globalAlpha = opacity;
        return this;
    };

    Draw.prototype.fillTri = function( x1, y1, x2, y2, x3, y3 ) {
        var ctx = this._ctx;
        this.tri( x1, y1, x2, y2, x3, y3 );
        ctx.fill();
        return this;
    };

    Draw.prototype.fillQuad = function( x1, y1, x2, y2, x3, y3, x4, y4 ) {
        return this.fillTri( x1, y1, x2, y2, x3, y3 )
            .fillTri( x1, y1, x3, y3, x4, y4 );
    };

    Draw.prototype.drawQuad = function( x1, y1, x2, y2, x3, y3, x4, y4 ) {
        return this.drawTri( x1, y1, x2, y2, x3, y3 )
            .drawTri( x1, y1, x3, y3, x4, y4 );
    };

    Draw.prototype.drawTri = function( x1, y1, x2, y2, x3, y3 ) {
        var ctx = this._ctx;
        this.tri( x1, y1, x2, y2, x3, y3 );
        ctx.stroke();
        return this;
    };

    Draw.prototype.txtLB = function( text, x, y ) {
        return this.txt( text, x, y, "LB" );
    };

    Draw.prototype.txtL  = function( text, x, y ) { return this.txt( text, x, y, "L");  };
    Draw.prototype.txtR  = function( text, x, y ) { return this.txt( text, x, y, "R");  };
    Draw.prototype.txtT  = function( text, x, y ) { return this.txt( text, x, y, "T");  };
    Draw.prototype.txtB  = function( text, x, y ) { return this.txt( text, x, y, "B");  };
    Draw.prototype.txtLT = function( text, x, y ) { return this.txt( text, x, y, "LT"); };
    Draw.prototype.txtLB = function( text, x, y ) { return this.txt( text, x, y, "LB"); };
    Draw.prototype.txtRT = function( text, x, y ) { return this.txt( text, x, y, "RT"); };
    Draw.prototype.txtRB = function( text, x, y ) { return this.txt( text, x, y, "RB"); };

    return Draw;
};



function readOnly( target, properties ) {
    var key, val;
    for( key in properties ) {
        val = properties[key];
        Object.defineProperty( target, key, {
            value: val,
            writable: false,
            configurable: false
        });
    }
}

var EPSILON = 0.000001;
var PI = Math.PI;

function getBestAttach( x, y ) {
    if( x*x + y*y < 0.01 ) return "B";
    var absX = Math.abs( x );
    var absY = Math.abs( y );
    var ang = absX < EPSILON ? PI / 2 : Math.atan( absY / absX );
    if( x < 0 ) {
        if( y < 0 ) {
            // x < 0 ; y < 0
            ang += PI;
        }
        else {
            // x < 0 ; y > 0
            ang = PI - ang;
        }
    }
    else if( y < 0 ) {
        // x > 0 ; y < 0
        ang = 2 * PI - ang;
    }
    ang += PI / 8;

    var index = Math.floor( 4 * ang / PI ) % 8;
    return [
        "L", "LB", "B", "RB", "R", "RT", "T", "LT"
    ][index];
}
