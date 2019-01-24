"use strict";require("webgl.program",function(require,module){function Program(gl,codes,includes){if("string"!=typeof codes.vert)throw Error("[webgl.program] Missing attribute `vert` in argument `codes`!");if("string"!=typeof codes.frag)throw Error("[webgl.program] Missing attribute `frag` in argument `codes`!");codes=parseIncludes(codes,includes),this.gl=gl,Object.freeze(this.gl),this.BPE=BPE,Object.freeze(this.BPE),this._typesNamesLookup=getTypesNamesLookup(gl);var shaderProgram=gl.createProgram();gl.attachShader(shaderProgram,getVertexShader(gl,codes.vert)),gl.attachShader(shaderProgram,getFragmentShader(gl,codes.frag)),gl.linkProgram(shaderProgram),this.program=shaderProgram,Object.freeze(this.program),this.use=function(){gl.useProgram(shaderProgram)},this.use(),createAttributes(this,gl,shaderProgram),createUniforms(this,gl,shaderProgram)}function createAttributes(that,gl,shaderProgram){var index,item,attribs={},attribsCount=gl.getProgramParameter(shaderProgram,gl.ACTIVE_ATTRIBUTES);for(index=0;index<attribsCount;index++)item=gl.getActiveAttrib(shaderProgram,index),item.typeName=that.getTypeName(item.type),item.length=getSize(gl,item),item.location=gl.getAttribLocation(shaderProgram,item.name),console.info("item=",item),attribs[item.name]=item;that.attribs=attribs,Object.freeze(that.attribs)}function createUniforms(that,gl,shaderProgram){var index,item,uniforms={},uniformsCount=gl.getProgramParameter(shaderProgram,gl.ACTIVE_UNIFORMS);for(index=0;index<uniformsCount;index++)item=gl.getActiveUniform(shaderProgram,index),uniforms[item.name]=gl.getUniformLocation(shaderProgram,item.name),Object.defineProperty(that,"$"+item.name,{set:createUniformSetter(gl,item,uniforms[item.name],that._typesNamesLookup),get:createUniformGetter(item),enumerable:!0,configurable:!1});that.uniforms=uniforms,Object.freeze(that.uniforms)}function parseIncludes(codes,includes){var id,code,result={};for(id in codes)code=codes[id],result[id]=code.split("\n").map(function(line){if("#include"!=line.trim().substr(0,8))return line;var pos=line.indexOf("#include")+8,includeName=line.substr(pos).trim();-1<"'<\"".indexOf(includeName.charAt(0))&&(includeName=includeName.substr(1,includeName.length-2));var snippet=includes[includeName];if("string"!=typeof snippet)throw console.error("Include <"+includeName+"> not found in ",includes),Error("Include not found in shader: "+includeName);return snippet}).join("\n");return result}function createUniformSetter(gl,item,nameGL,lookup){var nameJS="_$"+item.name;switch(item.type){case gl.BYTE:case gl.UNSIGNED_BYTE:case gl.SHORT:case gl.UNSIGNED_SHORT:case gl.INT:case gl.UNSIGNED_INT:case gl.SAMPLER_2D:return 1==item.size?function(v){gl.uniform1i(nameGL,v),this[nameJS]=v}:function(v){gl.uniform1iv(nameGL,v),this[nameJS]=v};break;case gl.FLOAT:return 1==item.size?function(v){gl.uniform1f(nameGL,v),this[nameJS]=v}:function(v){gl.uniform1fv(nameGL,v),this[nameJS]=v};break;case gl.FLOAT_VEC2:if(1==item.size)return function(v){gl.uniform2fv(nameGL,v),this[nameJS]=v};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC2 in uniform `"+item.name+"'!'");break;case gl.FLOAT_VEC3:if(1==item.size)return function(v){gl.uniform3fv(nameGL,v),this[nameJS]=v};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC3 in uniform `"+item.name+"'!'");break;case gl.FLOAT_VEC4:if(1==item.size)return function(v){gl.uniform4fv(nameGL,v),this[nameJS]=v};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_VEC4 in uniform `"+item.name+"'!'");break;case gl.FLOAT_MAT3:if(1==item.size)return function(v){gl.uniformMatrix3fv(nameGL,!1,v),this[nameJS]=v};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT3 in uniform `"+item.name+"'!'");break;case gl.FLOAT_MAT4:if(1==item.size)return function(v){gl.uniformMatrix4fv(nameGL,!1,v),this[nameJS]=v};throw Error("[webgl.program.createWriter] Don't know how to deal arrays of FLOAT_MAT4 in uniform `"+item.name+"'!'");break;default:throw Error("[webgl.program.createWriter] Don't know how to deal with uniform `"+item.name+"` of type "+lookup[item.type]+"!");}}function createUniformGetter(item){var name="_$"+item.name;return function(){return this[name]}}function getShader(type,gl,code){var shader=gl.createShader(type);return gl.shaderSource(shader,code),gl.compileShader(shader),gl.getShaderParameter(shader,gl.COMPILE_STATUS)?shader:(console.log(code),console.error("An error occurred compiling the shader: "+gl.getShaderInfoLog(shader)),null)}function getFragmentShader(gl,code){return getShader(gl.FRAGMENT_SHADER,gl,code)}function getVertexShader(gl,code){return getShader(gl.VERTEX_SHADER,gl,code)}function getTypesNamesLookup(gl){var k,v,lookup={};for(k in gl)v=gl[k],"number"==typeof v&&(lookup[v]=k);return lookup}function getSize(gl,item){switch(item.type){case gl.FLOAT_VEC4:return 4;case gl.FLOAT_VEC3:return 3;case gl.FLOAT_VEC2:return 2;case gl.FLOAT:return 1;default:throw"[webgl.program:getSize] I don't know the size of the attribute '"+item.name+"' because I don't know the type "+getTypeName(item.type)+"!";}}var _=function(){function _(){return X(D,arguments)}var D={en:{},fr:{}},X=require("$").intl;return _.all=D,_}();var BPE=new Float32Array().BYTES_PER_ELEMENT;Program.prototype.getTypeName=function(typeId){return this._typesNamesLookup[typeId]},Program.prototype.bindAttribs=function(buffer){var gl=this.gl;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);var names=Array.prototype.slice.call(arguments,1),totalSize=0;names.forEach(function(name){var attrib=this.attribs[name];if(!attrib)throw"Cannot find attribute \""+name+"\"!\nIt may be not active because unused in the shader.\nAvailable attributes are: "+Object.keys(this.attribs).map(function(name){return"\""+name+"\""}).join(", ");totalSize+=attrib.size*attrib.length*BPE},this);var offset=0;names.forEach(function(name){var attrib=this.attribs[name];gl.enableVertexAttribArray(attrib.location),gl.vertexAttribPointer(attrib.location,attrib.size*attrib.length,gl.FLOAT,!1,totalSize,offset),offset+=attrib.size*attrib.length*BPE},this)},module.exports=Program,module.exports._=_});
//# sourceMappingURL=webgl.program.js.map