"use strict";require("tfw.binding.link",function(require,module){function link(args,id,emitterKey,receiverKey){var that=this,onChanged=[];return args[receiverKey].forEach(function(receiver,receiverIndex){if(receiver.open){PropertyManager(receiver.obj);args[emitterKey].forEach(function(emitter,emitterIndex){if("string"==typeof emitter.name&&"string"==typeof receiver.name&&emitter.obj===receiver.obj&&emitter.name===receiver.name)return console.error("It is forbidden to bind a property on itself! ("+emitterIndex+" -> "+receiverIndex+")"),void console.info("[tfw.binding.link] args=",args);var pmEmitter=PropertyManager(emitter.obj),slot=actionChanged.bind(that,emitter,receiver,id);pmEmitter.on(emitter.name,slot),onChanged.push({pm:pmEmitter,name:emitter.name,slot:slot})})}}),onChanged}function addDestroyFunction(onSrcChanged,onDstChanged){this.destroy=function(){onSrcChanged.forEach(function(item){item.pm.off(item.name,item.slot)}),onDstChanged.forEach(function(item){item.pm.off(item.name,item.slot)})}}function actionChanged(src,dst,id,value,propertyName,container,wave){if(Array.isArray(wave)||(wave=[]),this.dbg&&console.log("Link "+this.dbg+": ",{src:src,dst:dst,id:id,value:value,propertyName:propertyName,container:container,wave:wave}),hasAlreadyBeenHere(id,wave))return void(this.dbg&&console.log("...has been BLOCKED by the wave! ",wave));var that=this,pmSrc=PropertyManager(src.obj),pmDst=PropertyManager(dst.obj);return value=processValue(value,src,dst),value=processSwitch(value,dst,pmSrc),value=processConverter(value,src,dst),filterFailed(value,src,dst)?void(this.dbg&&console.log("...has been FILTERED!")):void(value=processFormat(value,src,dst),value=processMap(value,src,dst),"number"==typeof dst.delay?(this.debug&&console.log("...has been DELAYED for "+dst.delay+" ms!"),clearTimeout(dst._id),dst._id=setTimeout(function(){that.dbg&&(console.log("Link "+that.dbg+" (after "+dst.delay+" ms): ",{src:src,dst:dst,id:id,value:value,propertyName:propertyName,wave:wave}),console.log("...try to change a value. ",{target:pmDst,propertyName:dst.name,value:value,wave:wave})),pmDst.change(dst.name,value,wave)},dst.delay)):(this.debug&&console.log("...try to change a value. ",{target:pmDst,propertyName:dst.name,value:value,wave:wave}),pmDst.change(dst.name,value,wave)))}function checkArgs(args){try{"undefined"==typeof args.name&&(args.name=args.debug),"string"!=typeof args.name&&(args.name="Link#"+this.id),"undefined"==typeof args&&fail("Missing mandatory argument!"),"undefined"==typeof args.A&&fail("Missing `args.A`!"),Array.isArray(args.A)||(args.A=[args.A]),"undefined"==typeof args.B&&fail("Missing `args.B`!"),Array.isArray(args.B)||(args.B=[args.B]);var k;for(k=0;k<args.A.length;k++)checkPod(args.A[k],k);for(k=0;k<args.B.length;k++)checkPod(args.B[k],k);this.name=args.name,this.debug=args.debug}catch(ex){console.error("checkArgs( "+args+" )"),fail(ex,"checkArgs( <args> )")}}function checkPod(pod,index){try{if(!pod.action){if("undefined"==typeof pod.obj&&fail("Missing `["+index+"].obj`!"),"undefined"==typeof pod.name&&(pod.name="*"),!PropertyManager.isLinkable(pod.obj,pod.name))throw"`"+pod.name+"` is not a linkable attribute.\nValid linkable attributes are: "+PropertyManager.getAllAttributesNames(pod.obj).join(", ")+".";}else if("function"!=typeof pod.action)throw"Attribute `["+index+"].action` must be a function!";else{if("undefined"!=typeof pod.obj)throw"["+index+"].action cannot be defined in the same time of ["+index+"].obj! They are exclusive attributes.";if("undefined"!=typeof pod.name)throw"["+index+"].action cannot be defined in the same time of ["+index+"].name! They are exclusive attributes.";var hollowObject={};PropertyManager(hollowObject).create("<action>",{set:pod.action}),pod.obj=hollowObject,pod.name="<action>"}"undefined"==typeof pod.open&&(pod.open=!0)}catch(ex){console.error("checkpod(",pod,", ",index,")"),fail(ex,"checkpod( <pod>, "+index+")")}}function fail(msg,source){throw source="undefined"==typeof source?"":"::"+source,msg+"\n[tfw.binding.link"+source+"]"}function hasAlreadyBeenHere(id,wave){if(Array.isArray(wave))if(0>wave.indexOf(id))wave.push(id);else return!0;return!1}function filterFailed(value,src,dst){if("function"==typeof dst.filter)try{if(!dst.filter(value))return!0}catch(ex){console.error(ex),fail("Error in filter of link "+PropertyManager(src.obj)+"."+src.name+" -> "+PropertyManager(dst.obj)+"."+dst.name+"!")}return!1}function processSwitch(value,dst,pmSrc){if("string"==typeof dst.switch)return pmSrc.get(dst.switch);return Array.isArray(dst.switch)?dst.switch.map(function(name){return pmSrc.get(name)}):value}function processConverter(value,src,dst){if("function"==typeof dst.converter)try{return dst.converter(value)}catch(ex){console.error(ex),fail("Error in converter of link "+PropertyManager(src.obj)+"."+src.name+" -> "+PropertyManager(dst.obj)+"."+dst.name+"!")}return value}function processFormat(value,src,dst){if(!dst.format)return value;try{if(!Array.isArray(dst.format))throw"Must be an array with two elements!";var intlFunc=dst.format[0];if("function"!=typeof intlFunc)throw"First element of the array must be a function!";var intlId=dst.format[1];if("string"!=typeof intlId)throw"Second element of the array must be a string!";return intlFunc(intlId,value)}catch(ex){console.error(ex),fail("Error in format of link "+PropertyManager(src.obj)+"."+src.name+" -> "+PropertyManager(dst.obj)+"."+dst.name+"!\n"+ex)}}function processMap(value,src,dst){if(value&&"function"==typeof value.map&&"function"==typeof dst.map)try{var result=[],more={context:{},list:value,index:0};if("function"==typeof dst.header)try{result.push(dst.header(value,more.context))}catch(ex){console.error("[tfw.binding.link/processMap] Exception while calling a header function: ",ex),console.error({value:value,src:src,dst:dst,more:more})}if(value.forEach(function(itm,idx){more.index=idx;try{result.push(dst.map(itm,more))}catch(ex){console.error("[tfw.binding.link/processMap] Exception while calling a map function: ",ex),console.error({item:itm,index:idx,value:value,src:src,dst:dst,result:result,more:more})}}),"function"==typeof dst.footer)try{result.push(dst.header(value,more.context))}catch(ex){console.error("[tfw.binding.link/processMap] Exception while calling a footer function: ",ex),console.error({value:value,src:src,dst:dst,result:result,more:more})}return result.filter(function(item){return null!=item})}catch(ex){console.error(ex),fail("Error in map of link "+PropertyManager(src.obj)+"."+src.name+" -> "+PropertyManager(dst.obj)+"."+dst.name+"!")}return value}function processValue(value,src,dst){if("undefined"==typeof dst.value)return value;if("function"==typeof dst.value)try{return dst.value(src.name)}catch(ex){console.error(ex),fail("Error in value("+src.name+") of link "+PropertyManager(src.obj)+"."+src.name+" -> "+PropertyManager(dst.obj)+"."+dst.name+"!")}return dst.value}var _=function(){function _(){return X(D,arguments)}var D={en:{},fr:{}},X=require("$").intl;return _.all=D,_}();var PropertyManager=require("tfw.binding.property-manager"),ID=0,Link=function(args){try{var id=ID++;checkArgs.call(this,args);var onChangedA=link.call(this,args,id,"A","B"),onChangedB=link.call(this,args,id,"B","A");addDestroyFunction.call(this,onChangedA,onChangedB)}catch(ex){console.error("new Link( "+args+" )"),fail(ex,"new Link( <args> ) "+(this.name||""))}};module.exports=Link,module.exports._=_});
//# sourceMappingURL=tfw.binding.link.js.map