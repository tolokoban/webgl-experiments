require("tfw.touchable",function(t,e,a){var o=function(){function e(){return o(a,arguments)}var a={en:{},fr:{}},o=t("$").intl;return e.all=a,e}(),s=t("dom"),i=t("dom.fx"),n=t("tfw.listeners"),l=function(t,e){var a=this;void 0===e&&(e={}),void 0===e.enabled&&(e.enabled=!0),t=s(t),this.enabled=e.enabled,this.color=e.color||"#fd8",this.classToAdd=e.classToAdd,this.opacity=e.opacity||.4,this.element=s(t),this.tap=new n,this.press=new n,s.addClass(t,"tfw-touchable");var o,l,r=s.div("tfw-touchable-shadow"),d=i().css(r,{transition:"none"}).exec(function(e){var i=a.classToAdd;"string"==typeof i&&s.addClass(t,i),-1==["relative","absolute","fixed"].indexOf(getComputedStyle(t).position)&&(t.style.position="relative"),t.style.overflow="hidden";var n=t.getBoundingClientRect(),d=n.width,c=n.height;d=Math.max(o,d-o),c=Math.max(l,c-l);var h=Math.ceil(Math.sqrt(d*d+c*c));s.css(r,{left:o+"px",top:l+"px",margin:"-"+h+"px",width:2*h+"px",height:2*h+"px",opacity:a.opacity,background:a.color,transform:"scale(0)"}),s.add(t,r)}).css(r,{transition:"all .3s ease"}).css(r,{transform:"scale(1)"}).wait(300).css(r,{transition:"all .2s ease"}).css(r,{opacity:0}).wait(200).detach(r),c=0;s.on(t,{down:function(t){a.enabled&&(t.stopPropagation(),t.preventDefault(),o=Math.floor(t.x),l=Math.floor(t.y),d.start(),c=Date.now())},tap:function(t){a.enabled&&(console.log("TAP",t),a.tap.fire(t))}})};e.exports=l,e.exports._=o});
//# sourceMappingURL=tfw.touchable.js.map