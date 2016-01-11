function addListener(e,n){window.addEventListener?window.addEventListener(e,n,!1):window.attachEvent("on"+e,n)}var require=function(){var e={};return function(n,t){var r;if(t=window["#"+n],"undefined"==typeof t){var o=new Error("Required module is missing: "+n);throw console.error(o.stack),o}if(r=e[n],"undefined"==typeof r){r={exports:{}};var i=r.exports;t(i,r),e[n]=r.exports,r=r.exports}return r}}();addListener("DOMContentLoaded",function(){document.body.parentNode.$data={},APP=require("main"),setTimeout(function(){"function"==typeof APP.start&&APP.start()})});
window["#$"]=function(n,r){n.config={name:"webgl-experiments",description:"WebGL experiments",author:"Tolokoban",version:"0.0.36",major:0,minor:0,revision:36,date:new Date(2016,0,11,18,10,29)};var e=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),e=n,window.localStorage.setItem("Language",n),n},n.intl=function(r,e){var a,o,t,i,g,l,s=r[n.lang()],u=e[0];if(!s)return console.error('Missing internationalization for language : "'+n.lang()+'"!'),u;if(a=s[u],!a)return console.error("Missing internationalization ["+n.lang()+']: "'+u+'"!'),u;if(e.length>1){for(o="",g=0,t=0;t<a.length;t++)i=a.charAt(t),"$"===i?(o+=a.substring(g,t),t++,l=a.charCodeAt(t)-48,o+=0>l||l>=e.length?"$"+a.charAt(t):e[l],g=t+1):"\\"===i&&(o+=a.substring(g,t),t++,o+=a.charAt(t),g=t+1);o+=a.substr(g),a=o}return a}};
window["#main"]=function(e,n){function t(e){v.rotation.x=e/3e3,v.rotation.y=e/3111;var n=new THREE.Raycaster,i=new THREE.Vector3(c.x,c.y,1).unproject(l);n.set(l.position,i.sub(l.position).normalize());var o=n.intersectObjects(v.children);for(u=o.length>0?o[0].object:null,s!==u&&(s&&(s.material=m),s=u,s&&(s.material=p));E.length>0;)E.pop(),s&&v.remove(s);requestAnimationFrame(t),d.render(a,l)}var i=(require("$").intl,require("taquin.cube")),o=Math.min(window.innerWidth,window.innerHeight),r=o,a=new THREE.Scene,l=new THREE.PerspectiveCamera(75,o/r,.1,1e3),d=new THREE.WebGLRenderer;d.setSize(o,r),document.body.appendChild(d.domElement);var s=null,u=null,E=[],c={x:0,y:0};d.domElement.addEventListener("mousemove",function(e){c.x=e.clientX/o*2-1,c.y=2*-(e.clientY/r)+1}),d.domElement.addEventListener("mousedown",function(e){E.push("MOUSEDOWN")}),d.domElement.addEventListener("touchstart",function(e){c.x=e.clientX/o*2-1,c.y=2*-(e.clientY/r)+1,E.push("MOUSEDOWN")});var m,p=new THREE.MeshPhongMaterial({color:16711680,specular:3355443,shininess:15,map:null,specularMap:null,normalMap:null}),w=new THREE.DirectionalLight(14540253,.8),h=new THREE.DirectionalLight(10066431,.5),v=new THREE.Group;a.add(v),a.add(w),a.add(h);var R,H,f,T;for(R=0;3>R;R++)for(H=0;3>H;H++)for(f=0;3>f;f++)T=i(R,H,f),v.add(T);m=T.material,l.position.z=5,w.position.set(3,0,5),h.position.set(-1,2,4),requestAnimationFrame(t)};
window["#taquin.cube"]=function(e,t){var n=document.createElement("canvas");n.width=128,n.height=128;var l=n.getContext("2d");l.fillStyle="#333",l.fillRect(0,0,128,128),l.fillStyle="#f80",l.fillRect(4,4,120,120),l.font="Bold 96px Arial",l.textAlign="center",l.textBaseline="middle",l.fillStyle="#333",l.fillText("A",64,64),console.info("[taquin.cube] canvas=...",n);var i=new THREE.Texture(n);i.needsUpdate=!0,t.exports=function(e,t,n){console.info("[taquin.cube] texture=...",i);var l=new THREE.BoxGeometry(1,1,1),a=new THREE.MeshPhongMaterial({color:65280,specular:3355443,shininess:25,map:i,specularMap:null,normalMap:null}),o=new THREE.Mesh(l,a);return o.position.set(e-1,t-1,n-1),o}};
//# sourceMappingURL=map/@index.js.map