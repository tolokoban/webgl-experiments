require("wdg.showhide",function(e,t,n){function o(e){function t(){n.value=!n.value,n.focus=!0}var n=this,o=new l({content:"tri-right",size:"1.5em"}),i=s.tag("span","label"),d=s.div("head","theme-label","theme-color-bg-1",[o,i]),h=s.div("body","theme-color-bg-B1"),c=s.elem(this,"div","wdg-showhide","theme-elevation-2",[d,h]);r(this,function(e){switch(e.keyCode){case 13:case 32:n.value=!n.value}console.info("[wdg.showhide] evt=",e)}),a.propBoolean(this,"value")(function(e){e?(s.addClass(c,"show"),s.removeClass(c,"fade-in"),window.setTimeout(function(){s.addClass(c,"fade-in")})):s.removeClass(c,"show")}),a.propBoolean(this,"simple")(function(e){e?(s.addClass(c,"simple"),s.removeClass(c,"theme-elevation-2"),s.removeClass(d,"theme-label","theme-color-bg-1"),s.addClass(d,"theme-color-7")):(s.removeClass(c,"simple"),s.addClass(c,"theme-elevation-2"),s.addClass(d,"theme-label","theme-color-bg-1"),s.removeClass(d,"theme-color-7"))}),a.propString(this,"label")(function(e){i.textContent=e}),a.propUnit(this,"maxHeight")(function(e){e.v<=0?h.style.maxHeight="none":h.style.maxHeight=e.v+e.u}),a.prop(this,"content")(function(e){s.clear(h),Array.isArray(e)?e.forEach(function(e){s.add(h,e)}):void 0!==e&&null!==e&&s.add(h,e)}),a.propRemoveClass(this,"wide","inline"),a.propRemoveClass(this,"visible","hide"),e=a.extend({value:!0,label:"",content:null,maxHeight:null,visible:!0,wide:!0,simple:!1,focus:!1},e,this),s.on(d,t),a.bind(o,"action",t),this.append=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),s.add(h,e),n},this.prepend=function(e){return Array.isArray(n.content)||(n.content=[]),n.content.push(e),h.insertBefore(e,h.childNodes[0]),n}}var i=function(){function t(){return o(n,arguments)}var n={en:{}},o=e("$").intl;return t.all=n,t}(),s=e("dom"),a=e("tfw.data-binding"),l=e("wdg.icon"),r=e("tfw.focusable");o.prototype.clear=function(){return this.content=[],this},t.exports=o,t.exports._=i});
//# sourceMappingURL=wdg.showhide.js.map