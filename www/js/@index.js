function addListener(e,n){window.addEventListener?window.addEventListener(e,n,!1):window.attachEvent("on"+e,n)}var require=function(){var e={};return function(n,t){var r;if(t=window["#"+n],"undefined"==typeof t){var o=new Error("Required module is missing: "+n);throw console.error(o.stack),o}if(r=e[n],"undefined"==typeof r){r={exports:{}};var i=r.exports;t(i,r),e[n]=r.exports,r=r.exports}return r}}();addListener("DOMContentLoaded",function(){document.body.parentNode.$data={},APP=require("main"),setTimeout(function(){"function"==typeof APP.start&&APP.start()})});
window["#$"]=function(n,r){n.config={name:"webgl-experiments",description:"WebGL experiments",author:"Tolokoban",version:"0.0.51",major:0,minor:0,revision:51,date:new Date(2016,0,11,21,46,57)};var e=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),e=n,window.localStorage.setItem("Language",n),n},n.intl=function(r,e){var a,o,t,i,g,l,s=r[n.lang()],u=e[0];if(!s)return console.error('Missing internationalization for language : "'+n.lang()+'"!'),u;if(a=s[u],!a)return console.error("Missing internationalization ["+n.lang()+']: "'+u+'"!'),u;if(e.length>1){for(o="",g=0,t=0;t<a.length;t++)i=a.charAt(t),"$"===i?(o+=a.substring(g,t),t++,l=a.charCodeAt(t)-48,o+=0>l||l>=e.length?"$"+a.charAt(t):e[l],g=t+1):"\\"===i&&(o+=a.substring(g,t),t++,o+=a.charAt(t),g=t+1);o+=a.substr(g),a=o}return a}};
window["#main"]=function(e,n){function i(e){p.rotation.x=e/3e3,p.rotation.y=e/3111,requestAnimationFrame(i),l.render(a,d)}var t=(require("$").intl,require("taquin.cube")),o=Math.min(window.innerWidth,window.innerHeight),r=o,a=new THREE.Scene,d=new THREE.PerspectiveCamera(75,o/r,.1,1e3),l=new THREE.WebGLRenderer;l.setSize(o,r),document.body.appendChild(l.domElement);var s=[],u={x:0,y:0};l.domElement.addEventListener("mousemove",function(e){u.x=e.clientX/o*2-1,u.y=2*-(e.clientY/r)+1}),l.domElement.addEventListener("mousedown",function(e){s.push("MOUSEDOWN")}),l.domElement.addEventListener("touchstart",function(e){u.x=e.clientX/o*2-1,u.y=2*-(e.clientY/r)+1,s.push("MOUSEDOWN")});var E,m=(new THREE.MeshPhongMaterial({color:16711680,specular:3355443,shininess:15,map:null,specularMap:null,normalMap:null}),new THREE.DirectionalLight(14540253,.8)),c=new THREE.DirectionalLight(10066431,.5),p=new THREE.Group;a.add(p),a.add(m),a.add(c);var w,h,v,f;for(w=0;3>w;w++)for(h=0;3>h;h++)for(v=0;3>v;v++)f=t(w,h,v),p.add(f);E=f.material,d.position.z=5,m.position.set(3,0,5),c.position.set(-1,2,4),requestAnimationFrame(i)};
window["#taquin.cube"]=function(e,t){function l(e,t){var l=document.createElement("canvas");l.width=128,l.height=128;var n=l.getContext("2d");return n.fillStyle="#000",n.fillRect(0,0,128,128),n.fillStyle="#eee",n.fillRect(0,0,124,124),n.fillStyle=t,n.fillRect(4,4,120,120),n.font="Bold 96px Arial",n.textAlign="center",n.textBaseline="middle",n.fillStyle="#000",n.fillText(e,64,64),l}function n(e,t){var n=[];n.push(l(e,t)),n.push(l(e,"#0f0")),n.push(l(e,"#f00")),n.push(l(e,"#88f")),n.push(l(e,"#8f8")),n.push(l(e,"#f88"));var r=new THREE.Texture(n[0]);return r.needsUpdate=!0,r}t.exports=function(e,t,l){var r=n("ABCDEFGHI".charAt((e+t+l)%9),"rgb("+Math.floor(64+64*e)+","+Math.floor(64+64*t)+","+Math.floor(64+64*l)+")"),i=new THREE.BoxGeometry(1,1,1),a=new THREE.MeshPhongMaterial({specular:3355443,shininess:25,map:r,specularMap:null,normalMap:null}),o=new THREE.Mesh(i,a);return o.position.set(e-1,t-1,l-1),o}};
//# sourceMappingURL=map/@index.js.map