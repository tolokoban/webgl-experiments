{"intl":"var _intl_={\"en\":{\"welcome\":\"Welcome in the world of\"},\"fr\":{\"welcome\":\"Bienvenue dans le monde de\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\r\n","src":"window['#main']=function(exports,module){ var _intl_={\"en\":{\"welcome\":\"Welcome in the world of\"},\"fr\":{\"welcome\":\"Bienvenue dans le monde de\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\r\n var Cube = require(\"taquin.cube\");\n\nvar W = Math.min( window.innerWidth, window.innerHeight );\nvar H = W;\nvar scene = new THREE.Scene();\nvar camera = new THREE.PerspectiveCamera( 75, W / H, 0.1, 1000 );\nvar renderer = new THREE.WebGLRenderer();\nrenderer.setSize( W, H );\ndocument.body.appendChild( renderer.domElement );\n\n\nvar selectedCube = null;\nvar nextSelectedCube = null;\nvar actions = [];\n\nvar mouse = { x: 0, y: 0 };\nrenderer.domElement.addEventListener('mousemove', function(event) {\n    mouse.x = ( event.clientX / W ) * 2 - 1;\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\n});\nrenderer.domElement.addEventListener('mousedown', function(event) {\n    actions.push(\"MOUSEDOWN\");\n});\nrenderer.domElement.addEventListener('touchstart', function(event) {\n    mouse.x = ( event.clientX / W ) * 2 - 1;\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\n    actions.push(\"MOUSEDOWN\");\n});\n\n\nvar material, material2 = new THREE.MeshPhongMaterial({\n    color: 0xff0000,\n    specular: 0x333333,\n    shininess: 15,\n    map: null,\n    specularMap: null,\n    normalMap: null\n});\n\nvar light1 = new THREE.DirectionalLight( 0xdddddd, 0.8 );\nvar light2 = new THREE.DirectionalLight( 0x9999ff, 0.5 );\nvar group = new THREE.Group();\n\nscene.add( group );\nscene.add( light1 );\nscene.add( light2 );\n\nvar x, y, z, cube;\nfor (x=0 ; x<3 ; x++) {\n    for (y=0 ; y<3 ; y++) {\n        for (z=0 ; z<3 ; z++) {\n            cube = Cube(x, y, z);\n            group.add(cube);\n        }\n    }\n}\nmaterial = cube.material;\n\ncamera.position.z = 5;\nlight1.position.set(3,0,5);\nlight2.position.set(-1,2,4);\n\nfunction render(time) {\n    group.rotation.x = time / 3000;\n    group.rotation.y = time / 3111;\n\n    var raycaster = new THREE.Raycaster();\n    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );\n    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );\n    var intersects = raycaster.intersectObjects( group.children );\n    \n    nextSelectedCube = intersects.length > 0 ? intersects[0].object : null;\n    if (selectedCube !== nextSelectedCube) {\n        if (selectedCube) selectedCube.material = material;\n        selectedCube = nextSelectedCube;\n        if (selectedCube) selectedCube.material = material2;\n    }\n    \n    while (actions.length > 0) {\n        actions.pop();\n        if (selectedCube) {\n            group.remove(selectedCube);\n        }\n    }\n\n    requestAnimationFrame( render );\n    renderer.render( scene, camera );\n}\nrequestAnimationFrame( render );\n }\r\n","zip":"window[\"#main\"]=function(e,n){function t(e){v.rotation.x=e/3e3,v.rotation.y=e/3111;var n=new THREE.Raycaster,i=new THREE.Vector3(c.x,c.y,1).unproject(l);n.set(l.position,i.sub(l.position).normalize());var o=n.intersectObjects(v.children);for(u=o.length>0?o[0].object:null,s!==u&&(s&&(s.material=m),s=u,s&&(s.material=p));E.length>0;)E.pop(),s&&v.remove(s);requestAnimationFrame(t),d.render(a,l)}var i=(require(\"$\").intl,require(\"taquin.cube\")),o=Math.min(window.innerWidth,window.innerHeight),r=o,a=new THREE.Scene,l=new THREE.PerspectiveCamera(75,o/r,.1,1e3),d=new THREE.WebGLRenderer;d.setSize(o,r),document.body.appendChild(d.domElement);var s=null,u=null,E=[],c={x:0,y:0};d.domElement.addEventListener(\"mousemove\",function(e){c.x=e.clientX/o*2-1,c.y=2*-(e.clientY/r)+1}),d.domElement.addEventListener(\"mousedown\",function(e){E.push(\"MOUSEDOWN\")}),d.domElement.addEventListener(\"touchstart\",function(e){c.x=e.clientX/o*2-1,c.y=2*-(e.clientY/r)+1,E.push(\"MOUSEDOWN\")});var m,p=new THREE.MeshPhongMaterial({color:16711680,specular:3355443,shininess:15,map:null,specularMap:null,normalMap:null}),w=new THREE.DirectionalLight(14540253,.8),h=new THREE.DirectionalLight(10066431,.5),v=new THREE.Group;a.add(v),a.add(w),a.add(h);var R,H,f,T;for(R=0;3>R;R++)for(H=0;3>H;H++)for(f=0;3>f;f++)T=i(R,H,f),v.add(T);m=T.material,l.position.z=5,w.position.set(3,0,5),h.position.set(-1,2,4),requestAnimationFrame(t)};\n//# sourceMappingURL=main.js.map","map":{"version":3,"file":"main.js.map","sources":["main.js"],"sourcesContent":["window['#main']=function(exports,module){ var _intl_={\"en\":{\"welcome\":\"Welcome in the world of\"},\"fr\":{\"welcome\":\"Bienvenue dans le monde de\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\r\n var Cube = require(\"taquin.cube\");\n\nvar W = Math.min( window.innerWidth, window.innerHeight );\nvar H = W;\nvar scene = new THREE.Scene();\nvar camera = new THREE.PerspectiveCamera( 75, W / H, 0.1, 1000 );\nvar renderer = new THREE.WebGLRenderer();\nrenderer.setSize( W, H );\ndocument.body.appendChild( renderer.domElement );\n\n\nvar selectedCube = null;\nvar nextSelectedCube = null;\nvar actions = [];\n\nvar mouse = { x: 0, y: 0 };\nrenderer.domElement.addEventListener('mousemove', function(event) {\n    mouse.x = ( event.clientX / W ) * 2 - 1;\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\n});\nrenderer.domElement.addEventListener('mousedown', function(event) {\n    actions.push(\"MOUSEDOWN\");\n});\nrenderer.domElement.addEventListener('touchstart', function(event) {\n    mouse.x = ( event.clientX / W ) * 2 - 1;\n    mouse.y = - ( event.clientY / H ) * 2 + 1;\n    actions.push(\"MOUSEDOWN\");\n});\n\n\nvar material, material2 = new THREE.MeshPhongMaterial({\n    color: 0xff0000,\n    specular: 0x333333,\n    shininess: 15,\n    map: null,\n    specularMap: null,\n    normalMap: null\n});\n\nvar light1 = new THREE.DirectionalLight( 0xdddddd, 0.8 );\nvar light2 = new THREE.DirectionalLight( 0x9999ff, 0.5 );\nvar group = new THREE.Group();\n\nscene.add( group );\nscene.add( light1 );\nscene.add( light2 );\n\nvar x, y, z, cube;\nfor (x=0 ; x<3 ; x++) {\n    for (y=0 ; y<3 ; y++) {\n        for (z=0 ; z<3 ; z++) {\n            cube = Cube(x, y, z);\n            group.add(cube);\n        }\n    }\n}\nmaterial = cube.material;\n\ncamera.position.z = 5;\nlight1.position.set(3,0,5);\nlight2.position.set(-1,2,4);\n\nfunction render(time) {\n    group.rotation.x = time / 3000;\n    group.rotation.y = time / 3111;\n\n    var raycaster = new THREE.Raycaster();\n    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );\n    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );\n    var intersects = raycaster.intersectObjects( group.children );\n    \n    nextSelectedCube = intersects.length > 0 ? intersects[0].object : null;\n    if (selectedCube !== nextSelectedCube) {\n        if (selectedCube) selectedCube.material = material;\n        selectedCube = nextSelectedCube;\n        if (selectedCube) selectedCube.material = material2;\n    }\n    \n    while (actions.length > 0) {\n        actions.pop();\n        if (selectedCube) {\n            group.remove(selectedCube);\n        }\n    }\n\n    requestAnimationFrame( render );\n    renderer.render( scene, camera );\n}\nrequestAnimationFrame( render );\n }\r\n"],"names":["window","exports","module","render","time","group","rotation","x","y","raycaster","THREE","Raycaster","vector","Vector3","mouse","unproject","camera","set","position","sub","normalize","intersects","intersectObjects","children","nextSelectedCube","length","object","selectedCube","material","material2","actions","pop","remove","requestAnimationFrame","renderer","scene","Cube","require","intl","W","Math","min","innerWidth","innerHeight","H","Scene","PerspectiveCamera","WebGLRenderer","setSize","document","body","appendChild","domElement","addEventListener","event","clientX","clientY","push","MeshPhongMaterial","color","specular","shininess","map","specularMap","normalMap","light1","DirectionalLight","light2","Group","add","z","cube"],"mappings":"AAAAA,OAAO,SAAS,SAASC,EAAQC,GA+DjC,QAASC,GAAOC,GACZC,EAAMC,SAASC,EAAIH,EAAO,IAC1BC,EAAMC,SAASE,EAAIJ,EAAO,IAE1B,IAAIK,GAAY,GAAIC,OAAMC,UACtBC,EAAS,GAAIF,OAAMG,QAASC,EAAMP,EAAGO,EAAMN,EAAG,GAAIO,UAAWC,EACjEP,GAAUQ,IAAKD,EAAOE,SAAUN,EAAOO,IAAKH,EAAOE,UAAWE,YAC9D,IAAIC,GAAaZ,EAAUa,iBAAkBjB,EAAMkB,SASnD,KAPAC,EAAmBH,EAAWI,OAAS,EAAIJ,EAAW,GAAGK,OAAS,KAC9DC,IAAiBH,IACbG,IAAcA,EAAaC,SAAWA,GAC1CD,EAAeH,EACXG,IAAcA,EAAaC,SAAWC,IAGvCC,EAAQL,OAAS,GACpBK,EAAQC,MACJJ,GACAtB,EAAM2B,OAAOL,EAIrBM,uBAAuB9B,GACvB+B,EAAS/B,OAAQgC,EAAOnB,GAvFc,GACrCoB,IAD8IC,QAAQ,KAAKC,KACpJD,QAAQ,gBAEhBE,EAAIC,KAAKC,IAAKzC,OAAO0C,WAAY1C,OAAO2C,aACxCC,EAAIL,EACJJ,EAAQ,GAAIzB,OAAMmC,MAClB7B,EAAS,GAAIN,OAAMoC,kBAAmB,GAAIP,EAAIK,EAAG,GAAK,KACtDV,EAAW,GAAIxB,OAAMqC,aACzBb,GAASc,QAAST,EAAGK,GACrBK,SAASC,KAAKC,YAAajB,EAASkB,WAGpC,IAAIzB,GAAe,KACfH,EAAmB,KACnBM,KAEAhB,GAAUP,EAAG,EAAGC,EAAG,EACvB0B,GAASkB,WAAWC,iBAAiB,YAAa,SAASC,GACvDxC,EAAMP,EAAM+C,EAAMC,QAAUhB,EAAM,EAAI,EACtCzB,EAAMN,EAA8B,IAAtB8C,EAAME,QAAUZ,GAAU,IAE5CV,EAASkB,WAAWC,iBAAiB,YAAa,SAASC,GACvDxB,EAAQ2B,KAAK,eAEjBvB,EAASkB,WAAWC,iBAAiB,aAAc,SAASC,GACxDxC,EAAMP,EAAM+C,EAAMC,QAAUhB,EAAM,EAAI,EACtCzB,EAAMN,EAA8B,IAAtB8C,EAAME,QAAUZ,GAAU,EACxCd,EAAQ2B,KAAK,cAIjB,IAAI7B,GAAUC,EAAY,GAAInB,OAAMgD,mBAChCC,MAAO,SACPC,SAAU,QACVC,UAAW,GACXC,IAAK,KACLC,YAAa,KACbC,UAAW,OAGXC,EAAS,GAAIvD,OAAMwD,iBAAkB,SAAU,IAC/CC,EAAS,GAAIzD,OAAMwD,iBAAkB,SAAU,IAC/C7D,EAAQ,GAAIK,OAAM0D,KAEtBjC,GAAMkC,IAAKhE,GACX8B,EAAMkC,IAAKJ,GACX9B,EAAMkC,IAAKF,EAEX,IAAI5D,GAAGC,EAAG8D,EAAGC,CACb,KAAKhE,EAAE,EAAM,EAAFA,EAAMA,IACb,IAAKC,EAAE,EAAM,EAAFA,EAAMA,IACb,IAAK8D,EAAE,EAAM,EAAFA,EAAMA,IACbC,EAAOnC,EAAK7B,EAAGC,EAAG8D,GAClBjE,EAAMgE,IAAIE,EAItB3C,GAAW2C,EAAK3C,SAEhBZ,EAAOE,SAASoD,EAAI,EACpBL,EAAO/C,SAASD,IAAI,EAAE,EAAE,GACxBkD,EAAOjD,SAASD,IAAI,GAAG,EAAE,GA4BzBgB,sBAAuB9B"},"dependencies":["$","taquin.cube"]}