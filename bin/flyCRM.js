(function ($hx_exports) { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() {
	this.views = new haxe.ds.StringMap();
};
$hxClasses["App"] = App;
App.__name__ = ["App"];
App.ist = null;
App.basePath = null;
App.appName = null;
App.company = null;
App.storeFormats = null;
App.main = function() {
	haxe.Log.trace = me.cunity.debug.Out._trace;
};
App.init = $hx_exports.initApp = function(config) {
	App.ist = new App();
	App.storeFormats = config.storeFormats;
	var fields = Type.getClassFields(App);
	App.basePath = window.location.pathname.split(config.appName)[0] + Std.string(config.appName) + "/";
	haxe.Log.trace(App.basePath,{ fileName : "App.hx", lineNumber : 61, className : "App", methodName : "init"});
	App.ist.initUI(config.views);
	return App.ist;
};
App.getViews = function() {
	return App.ist.views;
};
App.prototype = {
	altPressed: null
	,ctrlPressed: null
	,shiftPressed: null
	,views: null
	,initUI: function(viewConfigs) {
		var _g1 = this;
		var _g = 0;
		while(_g < viewConfigs.length) {
			var v = viewConfigs[_g];
			++_g;
			var className = Reflect.fields(v)[0];
			var iParam = Reflect.field(v,className);
			var cl = Type.resolveClass("view." + className);
			if(cl != null) {
				var av = Type.createInstance(cl,[iParam]);
				this.views.set(iParam.id,av);
				haxe.Log.trace("views.set(" + Std.string(iParam.id) + ")",{ fileName : "App.hx", lineNumber : 80, className : "App", methodName : "initUI"});
			}
		}
		((function($this) {
			var $r;
			var html = window;
			$r = new $(html);
			return $r;
		}(this))).keydown(function(evt) {
			var _g2 = evt.which;
			switch(_g2) {
			case 16:
				_g1.shiftPressed = true;
				break;
			case 17:
				_g1.ctrlPressed = true;
				break;
			case 18:
				_g1.altPressed = true;
				break;
			}
		}).keyup(function(evt1) {
			var _g3 = evt1.which;
			switch(_g3) {
			case 16:
				_g1.shiftPressed = false;
				break;
			case 17:
				_g1.ctrlPressed = false;
				break;
			case 18:
				_g1.altPressed = false;
				break;
			}
		});
	}
	,test: function() {
		var template = "{a} Hello {c} World!";
		var data = { a : 123, b : 333, c : "{nested}"};
		var t = "hello";
		haxe.Log.trace(t + ":" + t.indexOf("lo"),{ fileName : "App.hx", lineNumber : 114, className : "App", methodName : "test"});
		var ctempl = new EReg("{([a-x]*)}","g").map(template,function(r) {
			var m = r.matched(1);
			var d = Std.string(Reflect.field(data,m));
			if(d.indexOf("{") == 0) haxe.Log.trace("nested template :) " + d.indexOf("{"),{ fileName : "App.hx", lineNumber : 121, className : "App", methodName : "test"});
			return d;
		});
		haxe.Log.trace(ctempl,{ fileName : "App.hx", lineNumber : 124, className : "App", methodName : "test"});
	}
	,__class__: App
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var View = function(data) {
	this.views = new haxe.ds.StringMap();
	this.inputs = new haxe.ds.StringMap();
	this.vData = data;
	var data1 = data;
	this.id = data1.id;
	this.parentView = data1.parentView;
	if(data1.attach2 == null) this.attach2 = "#" + this.id; else this.attach2 = data1.attach2;
	this.name = Type.getClassName(Type.getClass(this)).split(".").pop();
	this.root = new $("#" + this.id);
	haxe.Log.trace(this.name + ":" + this.id + ":" + this.root.length + ":" + Std.string(this.attach2),{ fileName : "View.hx", lineNumber : 73, className : "View", methodName : "new"});
	this.interactionStates = new haxe.ds.StringMap();
	this.listening = new haxe.ds.ObjectMap();
	this.suspended = new haxe.ds.StringMap();
	this.loading = 0;
};
$hxClasses["View"] = View;
View.__name__ = ["View"];
View.prototype = {
	attach2: null
	,fields: null
	,repaint: null
	,name: null
	,root: null
	,vData: null
	,template: null
	,inputs: null
	,views: null
	,parentView: null
	,params: null
	,loading: null
	,listening: null
	,suspended: null
	,interactionStates: null
	,id: null
	,interactionState: null
	,set_interactionState: function(iState) {
		this.interactionState = iState;
		var iS = this.interactionStates.get(iState);
		var lIt = this.listening.keys();
		while(lIt.hasNext()) {
			var aListener = lIt.next();
			var aAction = this.listening.h[aListener.__id__];
			if(Lambda.has(iS.disables,aAction)) aListener.prop("disabled",true);
			if(Lambda.has(iS.enables,aAction)) aListener.prop("disabled",false);
		}
		haxe.Log.trace(iState,{ fileName : "View.hx", lineNumber : 94, className : "View", methodName : "set_interactionState"});
		return iState;
	}
	,addInteractionState: function(name,iS) {
		this.interactionStates.set(name,iS);
	}
	,addListener: function(jListener) {
		var _g = this;
		jListener.each(function(i,n) {
			_g.listening.set(new $(n),n.attributes.getNamedItem("data-action").nodeValue);
		});
	}
	,addView: function(v) {
		var av = null;
		var className = Reflect.fields(v)[0];
		var iParam = Reflect.field(v,className);
		var cl = Type.resolveClass("view." + className);
		if(cl != null) {
			if(Object.prototype.hasOwnProperty.call(v,"attach2")) iParam.attach2 = v.attach2;
			iParam.parentView = this;
			av = Type.createInstance(cl,[iParam]);
			this.views.set(iParam.id,av);
			haxe.Log.trace("views.set(" + Std.string(iParam.id) + ")",{ fileName : "View.hx", lineNumber : 127, className : "View", methodName : "addView"});
		}
		return av;
	}
	,addViews: function(v2add) {
		var _g = 0;
		while(_g < v2add.length) {
			var vD = v2add[_g];
			++_g;
			vD.parentView = this;
			this.addView(vD);
		}
	}
	,initState: function() {
		if(!this.loadingComplete()) haxe.Timer.delay($bind(this,this.initState),1000);
		this.addListener(new $("button[data-action]"));
		this.set_interactionState("init");
		new $("td").attr("tabindex",-1);
	}
	,loadingComplete: function() {
		if(this.loading > 0) return false;
		if(!Lambda.foreach(this.inputs,function(i) {
			return i.loading == 0;
		})) return false; else return Lambda.foreach(this.views,function(v) {
			return v.loading == 0;
		});
	}
	,suspendAll: function() {
	}
	,loadData: function(url,params,callBack) {
		var _g = this;
		haxe.Log.trace(Std.string(params),{ fileName : "View.hx", lineNumber : 169, className : "View", methodName : "loadData"});
		this.loading++;
		$.post(url,params,function(data,textStatus,xhr) {
			callBack(data);
			_g.loading--;
		});
	}
	,find: function(where) {
		this.resetParams(where);
		this.loadData("server.php",this.params,$bind(this,this.update));
	}
	,order: function(field) {
		haxe.Log.trace(field,{ fileName : "View.hx", lineNumber : 187, className : "View", methodName : "order"});
		if(this.params.order != field) {
			this.params.order = field;
			this.loadData("server.php",this.params,$bind(this,this.update));
		}
	}
	,resetParams: function(where) {
		if(where == null) where = "";
		this.fields = this.vData.fields;
		this.params = { action : "find", className : this.name, dataType : "json", fields : this.fields.join(","), limit : this.vData.limit, table : this.vData.table, where : this.vData.where.length > 0?Std.string(this.vData.where) + (where == ""?where:"," + where):where};
		return this.params;
	}
	,update: function(data) {
		var _g = this;
		data.fields = this.fields;
		if(new $("#" + this.id + "-list").length > 0) new $("#" + this.id + "-list").replaceWith(new $("#t-" + this.id + "-list").tmpl(data)); else new $("#t-" + this.id + "-list").tmpl(data).appendTo(((function($this) {
			var $r;
			var html = data.parentSelector;
			$r = new $(html);
			return $r;
		}(this))).first());
		new $("#" + this.id + "-list th").each(function(i,el) {
			new $(el).click(function(_) {
				_g.order(new $(el).data("order"));
			});
		});
		new $("#" + this.id + "-list tr").first().siblings().click($bind(this,this.select)).find("td").off("click");
		new $("td").attr("tabindex",-1);
	}
	,select: function(evt) {
		haxe.Log.trace("has to be implemented in subclass!",{ fileName : "View.hx", lineNumber : 224, className : "View", methodName : "select"});
	}
	,__class__: View
};
var haxe = {};
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	url: null
	,responseData: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,req: null
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
var jQuery = {};
jQuery.FormData = $hx_exports.FD = function() { };
$hxClasses["jQuery.FormData"] = jQuery.FormData;
jQuery.FormData.__name__ = ["jQuery","FormData"];
jQuery.FormData.query = function(jForm,eData) {
	var fD = jForm.serializeArray();
	var ret = "";
	var d = null;
	var _g = 0;
	var _g1 = Reflect.fields(eData);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		d = Reflect.field(eData,f);
		if(d != null && Std.string(d) != "") {
			if(ret != "") ret += "&";
			ret += f + "=" + Std.string(d);
		}
	}
	var _g2 = 0;
	while(_g2 < fD.length) {
		var item = fD[_g2];
		++_g2;
		if(item.value != null && item.value != "") {
			if(ret != "") ret += "&";
			ret += item.name + "=" + Std.string(item.value);
		}
	}
	return ret;
};
jQuery.FormData.replace = function(e,by,source) {
	var eR = new EReg(e,"");
	haxe.Log.trace(Std.string(eR) + " replace:" + source + " by:" + by,{ fileName : "FormData.hx", lineNumber : 57, className : "jQuery.FormData", methodName : "replace"});
	return eR.replace(source,by);
};
jQuery.FormData.where = function(jForm,fields) {
	var ret = new Array();
	var fD = jForm.serializeArray();
	haxe.Log.trace(fD,{ fileName : "FormData.hx", lineNumber : 69, className : "jQuery.FormData", methodName : "where"});
	var _g = 0;
	while(_g < fD.length) {
		var item = fD[_g];
		++_g;
		if(!Lambda.has(fields,item.name)) continue;
		if(item.value != null && item.value != "") {
			if(Object.prototype.hasOwnProperty.call(App.storeFormats,item.name)) {
				var sForm = Reflect.field(App.storeFormats,item.name);
				var callParam = sForm.slice(1);
				var method = sForm[0];
				haxe.Log.trace("call FormData" + method,{ fileName : "FormData.hx", lineNumber : 81, className : "jQuery.FormData", methodName : "where"});
				callParam.push(item.value);
				item.value = Reflect.callMethod(jQuery.FormData,Reflect.field(jQuery.FormData,method),callParam);
			}
			var matchType = jForm.find("[name=\"" + item.name + "_match_option\"]").val();
			ret.push(item.name + "|" + Std.string(item.value) + "|" + matchType);
		}
	}
	haxe.Log.trace(ret.join(","),{ fileName : "FormData.hx", lineNumber : 89, className : "jQuery.FormData", methodName : "where"});
	return ret.join(",");
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
js.JqueryUI = function() { };
$hxClasses["js.JqueryUI"] = js.JqueryUI;
js.JqueryUI.__name__ = ["js","JqueryUI"];
js.JqueryUI.tabs = function(tb,options) {
	return tb.tabs(options);
};
js.JqueryUI.accordion = function(ac,options) {
	return ac.accordion(options);
};
var me = {};
me.cunity = {};
me.cunity.debug = {};
me.cunity.debug.DebugOutput = { __ename__ : true, __constructs__ : ["CONSOLE","HAXE","NATIVE"] };
me.cunity.debug.DebugOutput.CONSOLE = ["CONSOLE",0];
me.cunity.debug.DebugOutput.CONSOLE.toString = $estr;
me.cunity.debug.DebugOutput.CONSOLE.__enum__ = me.cunity.debug.DebugOutput;
me.cunity.debug.DebugOutput.HAXE = ["HAXE",1];
me.cunity.debug.DebugOutput.HAXE.toString = $estr;
me.cunity.debug.DebugOutput.HAXE.__enum__ = me.cunity.debug.DebugOutput;
me.cunity.debug.DebugOutput.NATIVE = ["NATIVE",2];
me.cunity.debug.DebugOutput.NATIVE.toString = $estr;
me.cunity.debug.DebugOutput.NATIVE.__enum__ = me.cunity.debug.DebugOutput;
me.cunity.debug.Out = $hx_exports.Out = function() { };
$hxClasses["me.cunity.debug.Out"] = me.cunity.debug.Out;
me.cunity.debug.Out.__name__ = ["me","cunity","debug","Out"];
me.cunity.debug.Out.logg = null;
me.cunity.debug.Out.dumpedObjects = null;
me.cunity.debug.Out._trace = function(v,i) {
	if(me.cunity.debug.Out.suspended) return;
	var warned = false;
	if(i != null && Object.prototype.hasOwnProperty.call(i,"customParams")) i = i.customParams[0];
	var msg;
	if(i != null) msg = i.fileName + ":" + i.methodName + ":" + i.lineNumber + ":"; else msg = "";
	msg += Std.string(v);
	var _g = me.cunity.debug.Out.traceTarget;
	switch(_g[1]) {
	case 2:
		console.log(msg);
		break;
	case 0:
		debug(msg);
		break;
	case 1:
		var msg1;
		if(i != null) msg1 = i.fileName + ":" + i.lineNumber + ":" + i.methodName + ":"; else msg1 = "";
		msg1 += Std.string(v) + "<br/>";
		var d = window.document.getElementById("haxe:trace");
		if(d == null && !warned) {
			warned = true;
			alert("No haxe:trace element defined\n" + msg1);
		} else d.innerHTML += msg1;
		break;
	}
};
me.cunity.debug.Out.log2 = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ":" + i.methodName + ":"; else msg = "";
	msg += Std.string(v);
	var http = new haxe.Http("http://localhost/devel/php/jsLog.php");
	http.setParameter("log",msg);
	http.async = true;
	http.onData = function(data) {
		if(data != "OK") haxe.Log.trace(data,{ fileName : "Out.hx", lineNumber : 190, className : "me.cunity.debug.Out", methodName : "log2"});
	};
	http.request(true);
};
me.cunity.debug.Out.dumpLayout = function(dI,recursive,i) {
	if(recursive == null) recursive = false;
	me.cunity.debug.Out.dumpJLayout(new $(dI),recursive,i);
};
me.cunity.debug.Out.dumpJLayout = function(jQ,recursive,i) {
	if(recursive == null) recursive = false;
	var m = jQ.attr("id") + " left:" + jQ.position().left + " top:" + jQ.position().top + " width:" + jQ.width() + " height:" + jQ.height() + " visibility:" + jQ.css("visibility") + " display:" + jQ.css("display") + " position:" + jQ.css("position") + " class:" + jQ.attr("class") + " overflow:" + jQ.css("overflow");
	me.cunity.debug.Out._trace(m,i);
};
me.cunity.debug.Out.dumpObjectTree = function(root,recursive,i) {
	if(recursive == null) recursive = false;
	me.cunity.debug.Out.dumpedObjects = new Array();
	me.cunity.debug.Out._dumpObjectTree(root,Type["typeof"](root),recursive,i);
};
me.cunity.debug.Out._dumpObjectTree = function(root,parent,recursive,i) {
	var m;
	m = (Type.getClass(root) != null?Type.getClassName(Type.getClass(root)):(function($this) {
		var $r;
		var e = Type["typeof"](root);
		$r = e[0];
		return $r;
	}(this))) + ":";
	var fields;
	if(Type.getClass(root) != null) fields = Type.getInstanceFields(Type.getClass(root)); else fields = Reflect.fields(root);
	me.cunity.debug.Out.dumpedObjects.push(root);
	try {
		me.cunity.debug.Out._trace(m + " fields:" + fields.length + ":" + fields.slice(0,5).toString(),{ fileName : "Out.hx", lineNumber : 261, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			haxe.Log.trace(f,{ fileName : "Out.hx", lineNumber : 264, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
			if(recursive) {
				if(me.cunity.debug.Out.dumpedObjects.length > 1000) {
					me.cunity.debug.Out._trace(me.cunity.debug.Out.dumpedObjects.toString(),{ fileName : "Out.hx", lineNumber : 269, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
					throw "oops";
					break;
					return;
				} else {
					var _o = root[f];
					if(!Lambda.has(me.cunity.debug.Out.dumpedObjects,_o)) me.cunity.debug.Out._dumpObjectTree(_o,Type["typeof"](_o),true,i);
				}
			}
		}
	} catch( ex ) {
		haxe.Log.trace(ex,{ fileName : "Out.hx", lineNumber : 289, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
	}
};
me.cunity.debug.Out.dumpObject = function(ob,i) {
	var tClass = Type.getClass(ob);
	var m = "dumpObject:" + Std.string(ob != null?Type.getClass(ob):ob) + "\n";
	var names = new Array();
	if(Type.getClass(ob) != null) names = Type.getInstanceFields(Type.getClass(ob)); else names = Reflect.fields(ob);
	if(Type.getClass(ob) != null) m = Type.getClassName(Type.getClass(ob)) + ":\n";
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		try {
			var t = Std.string(Type["typeof"](Reflect.field(ob,name)));
			if(me.cunity.debug.Out.skipFunctions && t == "TFunction") null;
			m += name + ":" + Std.string(Reflect.field(ob,name)) + ":" + t + "\n";
		} catch( ex ) {
			m += name + ":" + Std.string(ex);
		}
	}
	me.cunity.debug.Out._trace(m,i);
};
me.cunity.debug.Out.dumpStack = function(sA,i) {
	var b = new StringBuf();
	b.b += Std.string("StackDump:" + "\n");
	var _g = 0;
	while(_g < sA.length) {
		var item = sA[_g];
		++_g;
		me.cunity.debug.Out.itemToString(item,b);
		b.b += "\n";
	}
	me.cunity.debug.Out._trace(b.b,i);
};
me.cunity.debug.Out.itemToString = function(s,b) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 4:
		var v = s[2];
		b.b += Std.string("LocalFunction:" + v);
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			me.cunity.debug.Out.itemToString(s1,b);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")\n";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		b.b += "\n";
		break;
	}
};
me.cunity.debug.Out.fTrace = function(str,arr,i) {
	var str_arr = str.split(" @");
	var str_buf = new StringBuf();
	var _g1 = 0;
	var _g = str_arr.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		str_buf.b += Std.string(str_arr[i1]);
		if(arr[i1] != null) str_buf.b += Std.string(arr[i1]);
	}
	me.cunity.debug.Out._trace(str_buf.b,i);
};
me.cunity.tools = {};
me.cunity.tools.ArrayTools = function() { };
$hxClasses["me.cunity.tools.ArrayTools"] = me.cunity.tools.ArrayTools;
me.cunity.tools.ArrayTools.__name__ = ["me","cunity","tools","ArrayTools"];
me.cunity.tools.ArrayTools.indentLevel = null;
me.cunity.tools.ArrayTools.atts2field = function(aAtts) {
	var f = new Array();
	var _g = 0;
	var _g1 = Reflect.fields(aAtts);
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		f.push(Reflect.field(aAtts,name));
	}
	return f;
};
me.cunity.tools.ArrayTools.countElements = function(a,el) {
	var count = 0;
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		if(e == el) count++;
	}
	return count;
};
me.cunity.tools.ArrayTools.map = function(a,f) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var e = _g1++;
		a[e] = f(a[e]);
	}
	return a;
};
me.cunity.tools.ArrayTools.map2 = function(a,f) {
	var t = new Array();
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var e = _g1++;
		t[e] = f(a[e]);
	}
	return t;
};
me.cunity.tools.ArrayTools.contains = function(a,el) {
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		if(e == el) return true;
	}
	return false;
};
me.cunity.tools.ArrayTools.sortNum = function(a,b) {
	if(a < b) return -1;
	if(a > b) return 1;
	return 0;
};
me.cunity.tools.ArrayTools.stringIt2Array = function(it,sort) {
	var values = new Array();
	while( it.hasNext() ) {
		var val = it.next();
		values.push(val);
	}
	if(sort) values.sort(function(a,b) {
		var ret = 0;
		if(a < b) ret = -1;
		if(a > b) ret = 1;
		return ret;
	});
	return values;
};
me.cunity.tools.ArrayTools.It2Array = function(it) {
	var values = new Array();
	while( it.hasNext() ) {
		var val = it.next();
		values.push(val);
	}
	return values;
};
me.cunity.tools.ArrayTools.getIndent = function() {
	var indent = "";
	var _g1 = 0;
	var _g = me.cunity.tools.ArrayTools.indentLevel;
	while(_g1 < _g) {
		var i = _g1++;
		indent += "\t";
	}
	return indent;
};
me.cunity.tools.ArrayTools.dumpArray = function(arr,propName) {
	if(arr.length == 0) return "";
	if(me.cunity.tools.ArrayTools.indentLevel == null) me.cunity.tools.ArrayTools.indentLevel = 0;
	var dump = "\n" + me.cunity.tools.ArrayTools.getIndent() + "[\n";
	var i = 0;
	var _g = 0;
	while(_g < arr.length) {
		var el = arr[_g];
		++_g;
		if(me.cunity.tools.ArrayTools.isArray(el)) {
			me.cunity.tools.ArrayTools.indentLevel++;
			if(el == null) {
				haxe.Log.trace("el = null",{ fileName : "ArrayTools.hx", lineNumber : 115, className : "me.cunity.tools.ArrayTools", methodName : "dumpArray"});
				dump += me.cunity.tools.ArrayTools.getIndent() + "[],";
			} else {
				var a;
				a = js.Boot.__cast(el , Array);
				var _g1 = 0;
				while(_g1 < a.length) {
					var ia = a[_g1];
					++_g1;
					dump += me.cunity.tools.ArrayTools.getIndent() + "[";
					me.cunity.tools.ArrayTools.indentLevel++;
					if(ia == null) dump += "\n" + me.cunity.tools.ArrayTools.getIndent() + "null\n"; else dump += me.cunity.tools.ArrayTools.dumpArray(ia,propName);
					me.cunity.tools.ArrayTools.indentLevel--;
					dump += me.cunity.tools.ArrayTools.getIndent();
					if(me.cunity.tools.ArrayTools.indentLevel > 0) dump += "],\n"; else dump += "]\n";
				}
			}
			me.cunity.tools.ArrayTools.indentLevel--;
			if(me.cunity.tools.ArrayTools.indentLevel > 0) dump += me.cunity.tools.ArrayTools.getIndent() + "],\n"; else dump += me.cunity.tools.ArrayTools.getIndent() + "]\n";
			return dump;
		} else {
			if(++i == 1) {
				me.cunity.tools.ArrayTools.indentLevel++;
				dump += me.cunity.tools.ArrayTools.getIndent();
			}
			if(el == null) dump += "null"; else if(propName != null) {
				var names = propName.split(".");
				var item = el;
				var _g11 = 0;
				while(_g11 < names.length) {
					var name = names[_g11];
					++_g11;
					item = Reflect.field(item,name);
				}
				dump += Std.string(item);
			} else dump += Std.string(el);
			if(i < arr.length) dump += ", "; else me.cunity.tools.ArrayTools.indentLevel--;
		}
	}
	dump += "\n" + me.cunity.tools.ArrayTools.getIndent();
	if(me.cunity.tools.ArrayTools.indentLevel > 0) dump += "],\n"; else dump += "] \n";
	return dump;
};
me.cunity.tools.ArrayTools.dumpArrayItems = function(arr,propName) {
	var dump = "";
	var indent = "";
	var _g1 = 0;
	var _g = me.cunity.tools.ArrayTools.indentLevel;
	while(_g1 < _g) {
		var i = _g1++;
		indent += " ";
	}
	haxe.Log.trace(indent + me.cunity.tools.ArrayTools.indentLevel,{ fileName : "ArrayTools.hx", lineNumber : 175, className : "me.cunity.tools.ArrayTools", methodName : "dumpArrayItems"});
	var _g2 = 0;
	while(_g2 < arr.length) {
		var el = arr[_g2];
		++_g2;
		if(propName != null) {
			var names = propName.split(".");
			var item = el;
			var _g11 = 0;
			while(_g11 < names.length) {
				var name = names[_g11];
				++_g11;
				item = Reflect.field(item,name);
			}
			dump += Std.string(item);
		} else dump += Std.string(el);
		dump += ", ";
	}
	haxe.Log.trace(dump,{ fileName : "ArrayTools.hx", lineNumber : 189, className : "me.cunity.tools.ArrayTools", methodName : "dumpArrayItems"});
	return dump;
};
me.cunity.tools.ArrayTools.isArray = function(arr) {
	if(Type.getClassName(Type.getClass(arr)) == "Array") return true; else return false;
};
me.cunity.tools.ArrayTools.indexOf = function(arr,el) {
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(arr[i] == el) return i;
	}
	return -1;
};
me.cunity.tools.ArrayTools.removeDuplicates = function(arr) {
	var i = 0;
	while(i < arr.length) {
		while(me.cunity.tools.ArrayTools.countElements(arr,arr[i]) > 1) arr.splice(i,1);
		i++;
	}
	return arr;
};
me.cunity.tools.ArrayTools.spliceA = function(arr,start,delCount,ins) {
	if(ins == null) return arr.splice(start,delCount);
	arr = arr.slice(0,start + delCount).concat(ins).concat(arr.slice(start + delCount));
	var ret = arr.splice(start,delCount);
	return ret;
};
me.cunity.tools.ArrayTools.spliceEl = function(arr,start,delCount,ins) {
	if(ins == null) return arr.splice(start,delCount);
	arr = arr.slice(0,start + delCount).concat([ins]).concat(arr.slice(start + delCount));
	var ret = arr.splice(start,delCount);
	return ret;
};
me.cunity.tools.ArrayTools.filter = function(arr,cB,thisObj) {
	var ret = new Array();
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(cB(arr[i],i,arr)) ret.push(arr[i]);
	}
	return ret;
};
me.cunity.tools.ArrayTools.sum = function(arr) {
	var s = 0;
	var _g = 0;
	while(_g < arr.length) {
		var e = arr[_g];
		++_g;
		s += e;
	}
	return s;
};
var pushstate = {};
pushstate.PushState = function() { };
$hxClasses["pushstate.PushState"] = pushstate.PushState;
pushstate.PushState.__name__ = ["pushstate","PushState"];
pushstate.PushState.basePath = null;
pushstate.PushState.preventers = null;
pushstate.PushState.listeners = null;
pushstate.PushState.history = null;
pushstate.PushState.currentPath = null;
pushstate.PushState.currentState = null;
pushstate.PushState.init = function(basePath) {
	if(basePath == null) basePath = "";
	pushstate.PushState.listeners = [];
	pushstate.PushState.preventers = [];
	pushstate.PushState.history = window.history;
	pushstate.PushState.basePath = basePath;
	((function($this) {
		var $r;
		var html = window;
		$r = new js.JQuery(html);
		return $r;
	}(this))).ready(function(e) {
		pushstate.PushState.handleOnPopState(null);
		new js.JQuery(window.document.body).delegate("a[rel=pushstate]","click",function(e1) {
			pushstate.PushState.push($(this).attr("href"));
			e1.preventDefault();
		});
		window.onpopstate = pushstate.PushState.handleOnPopState;
	});
};
pushstate.PushState.handleOnPopState = function(e) {
	var path = pushstate.PushState.stripURL(window.document.location.pathname);
	var state;
	if(e != null) state = e.state; else state = null;
	if(e != null) {
		var _g = 0;
		var _g1 = pushstate.PushState.preventers;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(!p(path,e.state)) {
				e.preventDefault();
				pushstate.PushState.history.replaceState(pushstate.PushState.currentState,"",pushstate.PushState.currentPath);
				return;
			}
		}
	}
	pushstate.PushState.currentPath = path;
	pushstate.PushState.currentState = state;
	pushstate.PushState.dispatch(path,state);
	return;
};
pushstate.PushState.stripURL = function(path) {
	if(HxOverrides.substr(path,0,pushstate.PushState.basePath.length) == pushstate.PushState.basePath) path = HxOverrides.substr(path,pushstate.PushState.basePath.length,null);
	return path;
};
pushstate.PushState.addEventListener = function(l,s) {
	if(l != null) pushstate.PushState.listeners.push(l); else if(s != null) {
		l = function(url,_) {
			return s(url);
		};
		pushstate.PushState.listeners.push(l);
	}
	return l;
};
pushstate.PushState.removeEventListener = function(l) {
	HxOverrides.remove(pushstate.PushState.listeners,l);
};
pushstate.PushState.clearEventListeners = function() {
	while(pushstate.PushState.listeners.length > 0) pushstate.PushState.listeners.pop();
};
pushstate.PushState.addPreventer = function(p,s) {
	if(p != null) pushstate.PushState.preventers.push(p); else if(s != null) {
		p = function(url,_) {
			return s(url);
		};
		pushstate.PushState.preventers.push(p);
	}
	return p;
};
pushstate.PushState.removePreventer = function(p) {
	HxOverrides.remove(pushstate.PushState.preventers,p);
};
pushstate.PushState.clearPreventers = function() {
	while(pushstate.PushState.preventers.length > 0) pushstate.PushState.preventers.pop();
};
pushstate.PushState.dispatch = function(url,state) {
	var _g = 0;
	var _g1 = pushstate.PushState.listeners;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		l(url,state);
	}
};
pushstate.PushState.push = function(url,state) {
	if(state == null) state = { };
	var _g = 0;
	var _g1 = pushstate.PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(url,state)) return false;
	}
	pushstate.PushState.history.pushState(state,"",url);
	pushstate.PushState.currentPath = url;
	pushstate.PushState.currentState = state;
	pushstate.PushState.dispatch(url,state);
	return true;
};
pushstate.PushState.replace = function(url,state) {
	if(state == null) state = Dynamic;
	var _g = 0;
	var _g1 = pushstate.PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(url,state)) return false;
	}
	pushstate.PushState.history.replaceState(state,"",url);
	pushstate.PushState.currentPath = url;
	pushstate.PushState.currentState = state;
	pushstate.PushState.dispatch(url,state);
	return true;
};
var view = {};
view.Campaigns = function(data) {
	View.call(this,data);
	var campaignData = data;
	this.listattach2 = campaignData.listattach2;
	if(!(data.limit > 0)) data.limit = 15;
	haxe.Log.trace("#t-" + this.id + " attach2:" + Std.string(data.attach2),{ fileName : "Campaigns.hx", lineNumber : 36, className : "view.Campaigns", methodName : "new"});
	new $("#t-" + this.id).tmpl(data).appendTo(data.attach2);
	if(data.views != null) this.addViews(data.views);
};
$hxClasses["view.Campaigns"] = view.Campaigns;
view.Campaigns.__name__ = ["view","Campaigns"];
view.Campaigns.__super__ = View;
view.Campaigns.prototype = $extend(View.prototype,{
	listattach2: null
	,__class__: view.Campaigns
});
view.Clients = function(data) {
	var _g = this;
	View.call(this,data);
	this.listattach2 = data.listattach2;
	if(!(data.limit > 0)) data.limit = 15;
	haxe.Log.trace("#t-" + this.id + " attach2:" + data.attach2,{ fileName : "Clients.hx", lineNumber : 38, className : "view.Clients", methodName : "new"});
	new $("#t-" + this.id).tmpl(data).appendTo(data.attach2);
	if(data.table != null) {
		this.resetParams();
		if(data.order != null) this.params.order = data.order;
		this.loadData("server.php",this.params,function(data1) {
			data1.parentSelector = _g.listattach2;
			_g.update(data1);
		});
	}
	if(data.views != null) this.addViews(data.views);
	this.addInteractionState("init",{ disables : ["edit","delete"], enables : ["add"]});
	this.addInteractionState("edit",{ disables : ["add","delete"], enables : ["save"]});
	this.addInteractionState("selected",{ disables : [], enables : ["add","delete","edit"]});
	this.addInteractionState("unselected",{ disables : ["edit","delete"], enables : ["add"]});
	if(this.loadingComplete()) this.initState(); else haxe.Timer.delay($bind(this,this.initState),1000);
};
$hxClasses["view.Clients"] = view.Clients;
view.Clients.__name__ = ["view","Clients"];
view.Clients.__super__ = View;
view.Clients.prototype = $extend(View.prototype,{
	listattach2: null
	,select: function(evt) {
		evt.preventDefault();
		haxe.Log.trace(new $(evt.target).get()[0].nodeName,{ fileName : "Clients.hx", lineNumber : 66, className : "view.Clients", methodName : "select"});
		if(App.ist.ctrlPressed) haxe.Log.trace("ctrlPressed",{ fileName : "Clients.hx", lineNumber : 68, className : "view.Clients", methodName : "select"});
		var jTarget = new $(evt.target).parent();
		if(jTarget.hasClass("selected")) jTarget.removeClass("selected"); else {
			jTarget.siblings().removeClass("selected");
			jTarget.addClass("selected");
		}
		if(jTarget.hasClass("selected")) this.set_interactionState("selected"); else this.set_interactionState("unselected");
	}
	,__class__: view.Clients
});
view.ContextMenu = function(data) {
	View.call(this,data);
	this.contextData = data;
	new $("#t-" + this.id).tmpl(data).appendTo((function($this) {
		var $r;
		var html = data.attach2;
		$r = new $(html);
		return $r;
	}(this)));
	this.root = js.JqueryUI.accordion(new $("#" + this.id),{ active : 0, activate : $bind(this,this.activate), create : $bind(this,this.create)});
	new $("#" + this.id + " button[data-action]").click($bind(this,this.run));
};
$hxClasses["view.ContextMenu"] = view.ContextMenu;
view.ContextMenu.__name__ = ["view","ContextMenu"];
view.ContextMenu.__super__ = View;
view.ContextMenu.prototype = $extend(View.prototype,{
	accordion: null
	,contextData: null
	,action: null
	,activate: function(event,ui) {
		this.action = new $(ui.newPanel[0]).find("input[name=\"action\"]").first().val();
		haxe.Log.trace(this.action,{ fileName : "ContextMenu.hx", lineNumber : 56, className : "view.ContextMenu", methodName : "activate"});
	}
	,create: function(event,ui) {
		this.action = new $(ui.panel[0]).find("input[name=\"action\"]").first().val();
		haxe.Log.trace(this.action,{ fileName : "ContextMenu.hx", lineNumber : 63, className : "view.ContextMenu", methodName : "create"});
	}
	,run: function(evt) {
		evt.preventDefault();
		var form = ((function($this) {
			var $r;
			var html;
			html = js.Boot.__cast(evt.target , Element);
			$r = new $(html);
			return $r;
		}(this))).parent();
		var options = js.JqueryUI.accordion(this.root,"option");
		haxe.Log.trace(options.active,{ fileName : "ContextMenu.hx", lineNumber : 72, className : "view.ContextMenu", methodName : "run"});
		var fields = this.vData.items[options.active].fields;
		haxe.Log.trace(fields,{ fileName : "ContextMenu.hx", lineNumber : 74, className : "view.ContextMenu", methodName : "run"});
		if(fields != null && fields.length > 0) {
			var where = jQuery.FormData.where(form,fields);
			haxe.Log.trace(where,{ fileName : "ContextMenu.hx", lineNumber : 78, className : "view.ContextMenu", methodName : "run"});
			Reflect.callMethod(this.parentView,Reflect.field(this.parentView,this.action),[where]);
		} else {
			this.action = ((function($this) {
				var $r;
				var html1;
				html1 = js.Boot.__cast(evt.target , Element);
				$r = new $(html1);
				return $r;
			}(this))).data("action");
			haxe.Log.trace(this.action,{ fileName : "ContextMenu.hx", lineNumber : 84, className : "view.ContextMenu", methodName : "run"});
		}
	}
	,showResult: function(data,_) {
		haxe.Log.trace(data,{ fileName : "ContextMenu.hx", lineNumber : 91, className : "view.ContextMenu", methodName : "showResult"});
	}
	,__class__: view.ContextMenu
});
view.DateTime = function(data) {
	var _g = this;
	View.call(this,data);
	this.interval = data.interval;
	this.format = data.format;
	var t = new haxe.Timer(this.interval);
	var d = new Date();
	this.template = new $("#t-" + this.id).tmpl({ datetime : (function($this) {
		var $r;
		var args = [view.DateTime.wochentage[d.getDay()],d.getDate(),d.getMonth() + 1,d.getFullYear(),d.getHours(),d.getMinutes()];
		$r = vsprintf($this.format,args);
		return $r;
	}(this))});
	this.draw();
	var start = d.getSeconds();
	if(start == 0) t.run = $bind(this,this.draw); else haxe.Timer.delay(function() {
		t.run = $bind(_g,_g.draw);
		_g.draw();
	},(60 - start) * 1000);
};
$hxClasses["view.DateTime"] = view.DateTime;
view.DateTime.__name__ = ["view","DateTime"];
view.DateTime.__super__ = View;
view.DateTime.prototype = $extend(View.prototype,{
	format: null
	,interval: null
	,draw: function() {
		var d = new Date();
		this.template.html((function($this) {
			var $r;
			var args = [view.DateTime.wochentage[d.getDay()],d.getDate(),d.getMonth() + 1,d.getFullYear(),d.getHours(),d.getMinutes()];
			$r = vsprintf($this.format,args);
			return $r;
		}(this)));
	}
	,__class__: view.DateTime
});
view.Input = function(data) {
	if(!(data.limit > 0)) data.limit = 15;
	this.vData = data;
	this.parentView = data.parentView;
	this.name = Type.getClassName(Type.getClass(this)).split(".").pop();
	this.id = this.parentView.id + "_" + Std.string(data.id);
	this.loading = 0;
};
$hxClasses["view.Input"] = view.Input;
view.Input.__name__ = ["view","Input"];
view.Input.prototype = {
	vData: null
	,params: null
	,name: null
	,id: null
	,loading: null
	,parentView: null
	,loadData: function(data,callBack) {
		var _g = this;
		this.loading++;
		$.post("server.php",data,function(data1,textStatus,xhr) {
			callBack(data1);
			_g.loading--;
		});
	}
	,__class__: view.Input
};
view.Select = function(data) {
	var _g = this;
	view.Input.call(this,data);
	if(data.db = 1) this.loadData(this.resetParams(),function(data1) {
		_g.update(data1);
	});
};
$hxClasses["view.Select"] = view.Select;
view.Select.__name__ = ["view","Select"];
view.Select.__super__ = view.Input;
view.Select.prototype = $extend(view.Input.prototype,{
	resetParams: function(where) {
		if(where == null) where = "";
		this.params = { action : "find", className : this.name, dataType : "json", fields : [this.vData.value,this.vData.label].join(","), limit : this.vData.limit, table : this.vData.name, where : this.vData.where.length > 0?Std.string(this.vData.where) + (where == ""?where:"," + where):where};
		return this.params;
	}
	,update: function(data) {
		haxe.Log.trace(data,{ fileName : "Select.hx", lineNumber : 43, className : "view.Select", methodName : "update"});
		new $("#t-options").tmpl(data).appendTo(new $("#" + this.id));
	}
	,__class__: view.Select
});
view.TabBox = function(data) {
	var _g = this;
	View.call(this,data);
	this.tabLabel = new Array();
	this.tabLinks = new Array();
	if(data != null) {
		this.tabBoxData = data;
		if(this.tabBoxData.isNav) {
			pushstate.PushState.init();
			pushstate.PushState.addEventListener($bind(this,this.go));
		}
		this.active = 0;
		var _g1 = 0;
		var _g11 = this.tabBoxData.tabs;
		while(_g1 < _g11.length) {
			var tab = _g11[_g1];
			++_g1;
			if(tab.link == this.tabBoxData.action) this.active = this.tabLinks.length;
			this.tabLabel.push(tab.label);
			this.tabLinks.push(tab.link);
		}
		new $("#t-" + this.id).tmpl(this.tabBoxData.tabs).appendTo(this.root.find("ul:first"));
		this.tabObj = js.JqueryUI.tabs(this.root,{ active : this.active, activate : function(event,ui) {
			haxe.Log.trace("activate:" + ui.newPanel.selector + ":" + ui.newTab.context + ":" + Std.string(_g.tabsInstance.options.active),{ fileName : "TabBox.hx", lineNumber : 87, className : "view.TabBox", methodName : "new"});
			pushstate.PushState.replace(Std.string(ui.newTab.context).split(window.location.hostname).pop());
		}, create : function(event1,ui1) {
			_g.tabsInstance = js.JqueryUI.tabs(new $("#" + _g.id),"instance");
			haxe.Log.trace("ready2load" + _g.tabBoxData.tabs.length,{ fileName : "TabBox.hx", lineNumber : 93, className : "view.TabBox", methodName : "new"});
			if(_g.tabBoxData.append2header != null) {
				var views = App.getViews();
				views.get(_g.tabBoxData.append2header).template.appendTo(new $("#" + _g.id + " ul"));
			}
			var tabIndex = 0;
			var _g12 = 0;
			var _g2 = _g.tabBoxData.tabs;
			while(_g12 < _g2.length) {
				var t = _g2[_g12];
				++_g12;
				var _g3 = 0;
				var _g4 = t.views;
				while(_g3 < _g4.length) {
					var v = _g4[_g3];
					++_g3;
					v.attach2 = _g.tabsInstance.panels[tabIndex];
					_g.addView(v);
				}
				tabIndex++;
			}
		}, beforeLoad : function(event2,ui2) {
			haxe.Log.trace("beforeLoad " + ui2.ajaxSettings.url,{ fileName : "TabBox.hx", lineNumber : 119, className : "view.TabBox", methodName : "new"});
			return false;
		}, heightStyle : this.tabBoxData.heightStyle == null?"auto":this.tabBoxData.heightStyle});
	}
};
$hxClasses["view.TabBox"] = view.TabBox;
view.TabBox.__name__ = ["view","TabBox"];
view.TabBox.__super__ = View;
view.TabBox.prototype = $extend(View.prototype,{
	active: null
	,tabBoxData: null
	,tabsInstance: null
	,tabObj: null
	,tabLinks: null
	,tabLabel: null
	,drawPanels: function() {
	}
	,go: function(url,p) {
		haxe.Log.trace(url,{ fileName : "TabBox.hx", lineNumber : 138, className : "view.TabBox", methodName : "go"});
		if(!(typeof(url) == "string")) {
			me.cunity.debug.Out.dumpStack(haxe.CallStack.callStack(),{ fileName : "TabBox.hx", lineNumber : 142, className : "view.TabBox", methodName : "go"});
			return;
		}
		var p1 = url.split(App.basePath);
		if(p1.length == 2 && p1[1] == "") p1[1] = this.tabLinks[0]; else if(p1.length == 1) p1[1] = url;
		if(this.tabsInstance.options.active == HxOverrides.indexOf(this.tabLinks,p1[1],0)) return;
		if(this.tabLinks[this.tabsInstance.options.active] != p1[1]) this.tabObj.tabs("option","active",HxOverrides.indexOf(this.tabLinks,p1[1],0));
		window.document.title = App.company + " " + App.appName + "  " + this.tabLabel[this.tabsInstance.options.active];
	}
	,__class__: view.TabBox
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var q = window.jQuery;
js.JQuery = q;
haxe.ds.ObjectMap.count = 0;
me.cunity.debug.Out.suspended = false;
me.cunity.debug.Out.skipFunctions = true;
me.cunity.debug.Out.traceToConsole = false;
me.cunity.debug.Out.traceTarget = me.cunity.debug.DebugOutput.NATIVE;
me.cunity.debug.Out.aStack = haxe.CallStack.callStack;
view.DateTime.wochentage = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
view.DateTime.monate = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
App.main();
})(typeof window != "undefined" ? window : exports);

//# sourceMappingURL=flyCRM.js.map