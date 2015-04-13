(function (console, $hx_exports) { "use strict";
$hx_exports.me = $hx_exports.me || {};
$hx_exports.me.cunity = $hx_exports.me.cunity || {};
$hx_exports.me.cunity.debug = $hx_exports.me.cunity.debug || {};
$hx_exports.me.cunity.debug.Out = $hx_exports.me.cunity.debug.Out || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() {
	this.views = new haxe_ds_StringMap();
};
$hxClasses["App"] = App;
App.__name__ = ["App"];
App.ist = null;
App.basePath = null;
App.appName = null;
App.user = null;
App.company = null;
App.appLabel = null;
App.storeFormats = null;
App.uiMessage = null;
App.waitTime = null;
App.limit = null;
App.main = function() {
	haxe_Log.trace = me_cunity_debug_Out._trace;
};
App.inputError = function(form,inputs) {
	haxe_Log.trace(form.attr("id") + ":" + Std.string(inputs),{ fileName : "App.hx", lineNumber : 73, className : "App", methodName : "inputError"});
	form.find("input").each(function(i,n) {
		if(Lambda.has(inputs,new $(n).attr("name"))) new $(n).addClass("error");
	});
};
App.choice = $hx_exports.choice = function(data) {
	if(data != null && data.id != null) {
		new $("#t-choice").tmpl(data).appendTo("#" + Std.string(data.id)).css({ width : jQuery_JHelper.J(window).width(), height : jQuery_JHelper.J(window).height()}).animate({ opacity : 1});
		haxe_Log.trace(Std.string(data.id) + ":" + new $("#" + Std.string(data.id) + " .overlay .scrollbox").length + ":" + new $("#" + Std.string(data.id) + " .overlay").height(),{ fileName : "App.hx", lineNumber : 91, className : "App", methodName : "choice"});
		new $("#" + Std.string(data.id) + " .overlay .scrollbox").height(new $("#" + Std.string(data.id) + " .overlay").height());
	} else new $("#choice").hide(300,null,function() {
		new $("#choice").remove();
	});
};
App.modal = $hx_exports.modal = function(mID,data) {
	haxe_Log.trace(data,{ fileName : "App.hx", lineNumber : 101, className : "App", methodName : "modal"});
	if(data != null && data.mID != null) {
		new $("#t-" + mID).tmpl(data).appendTo("#" + Std.string(data.id)).css({ width : jQuery_JHelper.J(window).width(), height : jQuery_JHelper.J(window).height()}).animate({ opacity : 1});
		haxe_Log.trace(Std.string(data.id) + ":" + new $("#" + Std.string(data.id) + " .overlay .scrollbox").length + ":" + new $("#" + Std.string(data.id) + " .overlay").height(),{ fileName : "App.hx", lineNumber : 105, className : "App", methodName : "modal"});
		new $("#" + Std.string(data.id) + " .overlay .scrollbox").height(new $("#" + Std.string(data.id) + " .overlay").height());
	} else new $("#" + mID).hide(300,null,function() {
		new $("#" + mID).remove();
	});
};
App.init = $hx_exports.initApp = function(config) {
	App.ist = new App();
	App.appName = config.appName;
	App.appLabel = config.appLabel;
	App.user = config.user;
	App.storeFormats = config.storeFormats;
	App.uiMessage = config.uiMessage;
	App.waitTime = config.waitTime;
	App.company = config.company;
	App.limit = config.limit;
	App.ist.hasTabs = config.hasTabs;
	App.ist.rootViewPath = App.appName + "." + Std.string(config.rootViewPath);
	var fields = Type.getClassFields(App);
	var _g = 0;
	while(_g < fields.length) {
		var f = fields[_g];
		++_g;
		if(Reflect.field(config,f) != null) Reflect.setField(App,f,Reflect.field(config,f));
	}
	App.basePath = window.location.pathname.split(config.appName)[0] + Std.string(config.appName) + "/";
	haxe_Log.trace(App.basePath,{ fileName : "App.hx", lineNumber : 134, className : "App", methodName : "init"});
	App.ist.initUI(config.views);
	return App.ist;
};
App.getMainSpace = function() {
	var navH = new $(".ui-tabs-nav").outerHeight();
	return { top : navH + 5, left : 0, height : jQuery_JHelper.J(window).height() - Std.parseFloat(new $("#mtabs").css("padding-top")) - Std.parseFloat(new $("#mtabs").css("padding-bottom")) - navH, width : jQuery_JHelper.J(window).width() * .7};
};
App.getViews = function() {
	return App.ist.views;
};
App.prototype = {
	hasTabs: null
	,rootViewPath: null
	,altPressed: null
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
				this.views.set(av.instancePath,av);
				haxe_Log.trace("views.set(" + av.instancePath + ")",{ fileName : "App.hx", lineNumber : 153, className : "App", methodName : "initUI"});
			}
		}
		jQuery_JHelper.J(window).keydown(function(evt) {
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
		haxe_Timer.delay(function() {
			_g1.views.get(_g1.rootViewPath).runLoaders();
		},500);
	}
	,test: function() {
		var template = "{a} Hello {c} World!";
		var data = { a : 123, b : 333, c : "{nested}"};
		var t = "hello";
		haxe_Log.trace(t + ":" + t.indexOf("lo"),{ fileName : "App.hx", lineNumber : 206, className : "App", methodName : "test"});
		var ctempl = new EReg("{([a-x]*)}","g").map(template,function(r) {
			var m = r.matched(1);
			var d = Std.string(Reflect.field(data,m));
			if(d.indexOf("{") == 0) haxe_Log.trace("nested template :) " + d.indexOf("{"),{ fileName : "App.hx", lineNumber : 213, className : "App", methodName : "test"});
			return d;
		});
		haxe_Log.trace(ctempl,{ fileName : "App.hx", lineNumber : 216, className : "App", methodName : "test"});
	}
	,__class__: App
};
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "C":
		return StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "e":
		return Std.string(d.getDate());
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) return "PM"; else return "AM";
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "s":
		return Std.string(Std["int"](d.getTime() / 1000));
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "t":
		return "\t";
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "u":
		var t = d.getDay();
		if(t == 0) return "7"; else if(t == null) return "null"; else return "" + t;
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	case "Y":
		return Std.string(d.getFullYear());
	default:
		throw new js__$Boot_HaxeError("Date.format %" + e + "- not implemented yet.");
	}
};
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.addSub(f,p,np - p);
		r.add(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	r.addSub(f,p,f.length - p);
	return r.b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
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
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
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
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
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
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
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
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
};
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
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
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
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
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
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	head: null
	,val: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
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
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
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
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
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
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
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
		throw new js__$Boot_HaxeError("Too many arguments");
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
	HxOverrides.remove(a,"__meta__");
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
		var c = js_Boot.getClass(v);
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
var Util = function() { };
$hxClasses["Util"] = Util;
Util.__name__ = ["Util"];
Util.any2bool = function(v) {
	return v?true:false;
};
var View = function(data) {
	this.views = new haxe_ds_StringMap();
	this.inputs = new haxe_ds_StringMap();
	this.vData = data;
	var data1 = data;
	this.id = data1.id;
	this.parentView = data1.parentView;
	this.primary_id = data1.primary_id;
	if(this.parentView == null) this.instancePath = App.appName + "." + this.id; else this.instancePath = this.parentView.instancePath + "." + this.id;
	this.dbLoader = [];
	if(data1.dbLoaderIndex == null) this.dbLoaderIndex = 0; else this.dbLoaderIndex = data1.dbLoaderIndex;
	if(((this instanceof view_TabBox)?this:null) == null) this.dbLoader.push(new haxe_ds_StringMap());
	if(data1.attach2 == null) this.attach2 = "#" + this.id; else this.attach2 = data1.attach2;
	this.name = Type.getClassName(js_Boot.getClass(this)).split(".").pop();
	this.root = new $("#" + this.id).css({ opacity : 0});
	haxe_Log.trace(this.name + ":" + this.id + ":" + this.root.length + ":" + new $(this.attach2).attr("id") + ":" + this.dbLoaderIndex,{ fileName : "View.hx", lineNumber : 116, className : "View", methodName : "new"});
	this.interactionStates = new haxe_ds_StringMap();
	this.listening = new haxe_ds_ObjectMap();
	this.suspended = new haxe_ds_StringMap();
};
$hxClasses["View"] = View;
View.__name__ = ["View"];
View.prototype = {
	attach2: null
	,fields: null
	,primary_id: null
	,repaint: null
	,name: null
	,root: null
	,vData: null
	,template: null
	,spinner: null
	,waiting: null
	,views: null
	,parentView: null
	,parentTab: null
	,params: null
	,loading: null
	,listening: null
	,suspended: null
	,interactionStates: null
	,dbLoader: null
	,templ: null
	,dbLoaderIndex: null
	,id: null
	,instancePath: null
	,interactionState: null
	,inputs: null
	,selectedID: null
	,init: function() {
		this.loading = 0;
		if(this.loadingComplete()) this.initState(); else haxe_Timer.delay($bind(this,this.initState),1000);
	}
	,set_interactionState: function(iState) {
		this.interactionState = iState;
		var iS = this.interactionStates.get(iState);
		haxe_Log.trace(this.id + ":" + iState + ":" + Std.string(iS),{ fileName : "View.hx", lineNumber : 135, className : "View", methodName : "set_interactionState"});
		if(iS == null) return null;
		var lIt = this.listening.keys();
		while(lIt.hasNext()) {
			var aListener = lIt.next();
			var aAction = this.listening.h[aListener.__id__];
			if(Lambda.has(iS.disables,aAction)) aListener.prop("disabled",true);
			if(Lambda.has(iS.enables,aAction)) aListener.prop("disabled",false);
			haxe_Log.trace(aListener.closest(".tabContent").attr("id") + ":" + aAction + " disabled:" + (aListener.prop("disabled")?"Y":"N"),{ fileName : "View.hx", lineNumber : 147, className : "View", methodName : "set_interactionState"});
		}
		haxe_Log.trace(iState,{ fileName : "View.hx", lineNumber : 149, className : "View", methodName : "set_interactionState"});
		return iState;
	}
	,addInteractionState: function(name,iS) {
		haxe_Log.trace(this.id + ":" + name + ":" + Std.string(iS),{ fileName : "View.hx", lineNumber : 155, className : "View", methodName : "addInteractionState"});
		this.interactionStates.set(name,iS);
	}
	,addInputs: function(v,className) {
		haxe_Log.trace(v.length,{ fileName : "View.hx", lineNumber : 161, className : "View", methodName : "addInputs"});
		var _g = 0;
		while(_g < v.length) {
			var aI = v[_g];
			++_g;
			aI.parentView = this;
			aI.id = this.id + "_" + Std.string(aI.name);
			this.addInput(aI,className);
		}
	}
	,addInput: function(v,className) {
		var aI = null;
		var iParam = v;
		haxe_Log.trace(className + ":" + Std.string(iParam.id),{ fileName : "View.hx", lineNumber : 175, className : "View", methodName : "addInput"});
		var cl = Type.resolveClass("view." + className);
		if(cl != null) {
			if(Object.prototype.hasOwnProperty.call(v,"attach2")) iParam.attach2 = v.attach2;
			iParam.parentView = this;
			aI = Type.createInstance(cl,[iParam]);
			this.inputs.set(iParam.id,aI);
			haxe_Log.trace("inputs.set(" + Std.string(iParam.id) + ")",{ fileName : "View.hx", lineNumber : 186, className : "View", methodName : "addInput"});
			if(iParam.db == 1) aI.init();
		}
		return aI;
	}
	,addListener: function(jListener) {
		var _g = this;
		jListener.each(function(i,n) {
			_g.listening.set(new $(n),new $(n).data("endaction"));
		});
	}
	,addView: function(v) {
		var av = null;
		var className = Reflect.fields(v)[0];
		var iParam = Reflect.field(v,className);
		haxe_Log.trace(this.name + ":" + className + ":" + this.dbLoader.length,{ fileName : "View.hx", lineNumber : 207, className : "View", methodName : "addView"});
		var cl = Type.resolveClass("view." + className);
		if(cl != null) {
			if(Object.prototype.hasOwnProperty.call(v,"attach2")) iParam.attach2 = v.attach2;
			if(Object.prototype.hasOwnProperty.call(v,"dbLoaderIndex")) iParam.dbLoaderIndex = v.dbLoaderIndex;
			iParam.parentView = this;
			av = Type.createInstance(cl,[iParam]);
			this.views.set(av.instancePath,av);
			haxe_Log.trace("views.set(" + av.instancePath + ")",{ fileName : "View.hx", lineNumber : 221, className : "View", methodName : "addView"});
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
		haxe_Log.trace(this.id + ":" + (this.loadingComplete()?"Y":"N") + " :" + new $("button[data-endaction]").length,{ fileName : "View.hx", lineNumber : 240, className : "View", methodName : "initState"});
		if(!this.loadingComplete()) {
			haxe_Timer.delay($bind(this,this.initState),1000);
			return;
		}
		this.addListener(new $("button[data-endaction]"));
		this.set_interactionState("init");
		new $("td").attr("tabindex",-1);
		var el = new $("#" + this.id).get()[0];
		haxe_Log.trace(this.id + " initState complete - we can show up :)" + ":" + Std.string(el),{ fileName : "View.hx", lineNumber : 250, className : "View", methodName : "initState"});
		new $("#" + this.id).animate({ opacity : 1},300,"linear",function() {
		});
		if(this.name == "ContextMenu") (js_Boot.__cast(this , view_ContextMenu)).layout();
	}
	,loadingComplete: function() {
		if(this.loading > 0) return false;
		if(!Lambda.empty(this.inputs) && !Lambda.foreach(this.inputs,function(i) {
			return i.loading == 0;
		})) return false; else return Lambda.foreach(this.views,function(v) {
			return v.loading == 0;
		});
		return true;
	}
	,suspendAll: function() {
	}
	,addDataLoader: function(loaderId,dL,loaderIndex) {
		if(loaderIndex == null) loaderIndex = 0;
		this.dbLoader[loaderIndex].set(loaderId,dL);
		haxe_Log.trace(this.id + ":" + loaderIndex + ":" + loaderId,{ fileName : "View.hx", lineNumber : 280, className : "View", methodName : "addDataLoader"});
	}
	,loadAllData: function(loaderIndex) {
		if(loaderIndex == null) loaderIndex = 0;
		var dLoader = this.dbLoader[loaderIndex];
		var keys = dLoader.keys();
		haxe_Log.trace(Lambda.count(dLoader) + ":" + loaderIndex,{ fileName : "View.hx", lineNumber : 288, className : "View", methodName : "loadAllData"});
		while( keys.hasNext() ) {
			var k = keys.next();
			haxe_Log.trace(k,{ fileName : "View.hx", lineNumber : 291, className : "View", methodName : "loadAllData"});
			this.load(k,loaderIndex);
		}
	}
	,load: function(loaderId,loaderIndex) {
		if(loaderIndex == null) loaderIndex = 0;
		var _g = this;
		var loader = this.dbLoader[loaderIndex].get(loaderId);
		if(!loader.valid) this.loadData("server.php",loader.prepare(),function(data) {
			data.loaderId = loaderId;
			haxe_Log.trace(_g.id + ":" + Std.string(data.fields) + ":" + Std.string(data.loaderId),{ fileName : "View.hx", lineNumber : 305, className : "View", methodName : "load"});
			loader.callBack(data);
			loader.valid = true;
		});
	}
	,loadData: function(url,p,callBack) {
		var _g = this;
		this.loading++;
		$.post(url,p,function(data,textStatus,xhr) {
			callBack(data);
			_g.loading--;
		},"json");
	}
	,find: function(p) {
		haxe_Log.trace(p,{ fileName : "View.hx", lineNumber : 326, className : "View", methodName : "find"});
		var where;
		where = __map_reserved.where != null?p.getReserved("where"):p.h["where"];
		haxe_Log.trace("|" + where + "|" + (Util.any2bool(where)?"Y":"N"),{ fileName : "View.hx", lineNumber : 328, className : "View", methodName : "find"});
		haxe_Log.trace(this.vData.where,{ fileName : "View.hx", lineNumber : 329, className : "View", methodName : "find"});
		var fData = { };
		var pkeys = "action,className,fields,primary_id,hidden,limit,order,page,table,where".split(",");
		var _g = 0;
		while(_g < pkeys.length) {
			var f = pkeys[_g];
			++_g;
			if(Reflect.field(this.vData,f) != null) {
				if(f == "where" && (Util.any2bool(where) || Util.any2bool(this.vData.where))) if(Util.any2bool(this.vData.where)) fData.where = Std.string(this.vData.where) + (Util.any2bool(where)?"," + where:""); else fData.where = where; else Reflect.setField(fData,f,(__map_reserved[f] != null?p.existsReserved(f):p.h.hasOwnProperty(f))?__map_reserved[f] != null?p.getReserved(f):p.h[f]:Reflect.field(this.vData,f));
			}
			if(f != "where" && (__map_reserved[f] != null?p.existsReserved(f):p.h.hasOwnProperty(f))) Reflect.setField(fData,f,__map_reserved[f] != null?p.getReserved(f):p.h[f]);
		}
		this.resetParams(fData);
		this.loadData("server.php",this.params,$bind(this,this.update));
	}
	,order: function(j) {
		if(this.params.order.indexOf(j.data("order")) == 0) this.params.order = Std.string(j.data("order")) + (this.params.order.indexOf("ASC") > 0?"|DESC":"|ASC"); else this.params.order = Std.string(j.data("order")) + "|ASC";
		this.wait();
		this.loadData("server.php",this.params,$bind(this,this.update));
	}
	,resetParams: function(pData) {
		var pkeys = "action,className,fields,limit,order,page,table,jointable,joincond,joinfields,where".split(",");
		haxe_Log.trace(pData,{ fileName : "View.hx", lineNumber : 369, className : "View", methodName : "resetParams"});
		var aData = me_cunity_util_Data.copy(this.vData);
		if(pData != null) {
			var pFields = Reflect.fields(pData);
			var _g = 0;
			while(_g < pFields.length) {
				var f = pFields[_g];
				++_g;
				Reflect.setField(aData,f,Reflect.field(pData,f));
			}
		}
		if(Util.any2bool(aData.fields)) this.fields = aData.fields.split(","); else this.fields = null;
		haxe_Log.trace(this.fields,{ fileName : "View.hx", lineNumber : 378, className : "View", methodName : "resetParams"});
		haxe_Log.trace(aData.hidden,{ fileName : "View.hx", lineNumber : 379, className : "View", methodName : "resetParams"});
		haxe_Log.trace(aData.joincond,{ fileName : "View.hx", lineNumber : 380, className : "View", methodName : "resetParams"});
		var order;
		if(this.params == null) order = null; else order = this.params.order;
		this.params = { action : "find", className : this.name, instancePath : this.instancePath};
		var _g1 = 0;
		while(_g1 < pkeys.length) {
			var f1 = pkeys[_g1];
			++_g1;
			if(Reflect.field(aData,f1) != null) Reflect.setField(this.params,f1,Reflect.field(aData,f1));
		}
		if(order != null) this.params.order = order;
		return this.params;
	}
	,update: function(data) {
		var _g = this;
		data.fields = this.fields;
		data.hidden = this.vData.hidden;
		data.primary_id = this.primary_id;
		haxe_Log.trace(this.id + ":" + Std.string(data.fields) + ":" + Std.string(data.hidden) + ":" + Std.string(data.primary_id) + ":" + this.root.length,{ fileName : "View.hx", lineNumber : 413, className : "View", methodName : "update"});
		if(new $("#" + this.id + "-list").length > 0) new $("#" + this.id + "-list").replaceWith(new $("#t-" + this.id + "-list").tmpl(data)); else new $("#t-" + this.id + "-list").tmpl(data).appendTo(jQuery_JHelper.J(data.loaderId).first());
		new $("#" + this.id + "-list th").each(function(i,el) {
			new $(el).click(function(_) {
				_g.order(new $(el));
			});
		});
		new $("#" + this.id + "-list tr").first().siblings().click($bind(this,this.select)).find("td").off("click");
		var limit;
		if(this.vData.limit > 0) limit = this.vData.limit; else limit = App.limit;
		if(limit < data.count) {
			var pager = new view_Pager({ count : data.count, id : this.vData.id, limit : limit, page : data.page, parentView : this});
		}
		this.wait(false);
	}
	,runLoaders: function() {
		haxe_Log.trace(this.dbLoaderIndex,{ fileName : "View.hx", lineNumber : 441, className : "View", methodName : "runLoaders"});
		this.loadAllData(this.dbLoaderIndex);
	}
	,select: function(evt) {
		haxe_Log.trace("has to be implemented in subclass!",{ fileName : "View.hx", lineNumber : 447, className : "View", methodName : "select"});
	}
	,wait: function(start,message,timeout) {
		if(timeout == null) timeout = 15000;
		if(start == null) start = true;
		var _g = this;
		if(!start && this.waiting != null) {
			this.waiting.stop();
			haxe_Log.trace(new $("#wait").length,{ fileName : "View.hx", lineNumber : 455, className : "View", methodName : "wait"});
			new $("#wait").animate({ opacity : 0.0},300,null,function() {
				new $("#wait").detach();
				haxe_Log.trace(new $("#wait").length,{ fileName : "View.hx", lineNumber : 456, className : "View", methodName : "wait"});
			});
			this.spinner.stop();
		}
		if(!start) return;
		if(message == null) message = App.uiMessage.wait;
		if(timeout == null) timeout = App.waitTime;
		new $("#t-wait").tmpl({ wait : message}).appendTo("#" + this.id).css({ width : jQuery_JHelper.J(window).width(), height : jQuery_JHelper.J(window).height()}).animate({ opacity : 0.8});
		this.spinner = window.spin("wait");
		if(message == App.uiMessage.retry || message == App.uiMessage.timeout) this.waiting = haxe_Timer.delay(function() {
			_g.wait(false);
		},timeout); else {
			haxe_Log.trace("set timeout:" + timeout + ":" + message,{ fileName : "View.hx", lineNumber : 477, className : "View", methodName : "wait"});
			this.waiting = haxe_Timer.delay(function() {
				_g.wait(true,App.uiMessage.timeout,3500);
			},timeout);
		}
	}
	,__class__: View
};
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe_CallStack;
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.wrapCallSite = null;
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
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
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
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
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
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
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
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
	,__class__: haxe_Http
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
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
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	map: null
	,keys: null
	,index: null
	,count: null
	,hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var jQuery_FormData = $hx_exports.FD = function() { };
$hxClasses["jQuery.FormData"] = jQuery_FormData;
jQuery_FormData.__name__ = ["jQuery","FormData"];
jQuery_FormData.query = function(jForm,eData) {
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
jQuery_FormData.save = function(jForm) {
	var ret = jForm.serializeArray();
	var _g = 0;
	while(_g < ret.length) {
		var fd = ret[_g];
		++_g;
		if(Object.prototype.hasOwnProperty.call(App.storeFormats,fd.name)) {
			var sForm = Reflect.field(App.storeFormats,fd.name);
			var callParam;
			if(sForm.length > 1) callParam = sForm.slice(1); else callParam = [];
			var method = sForm[0];
			haxe_Log.trace("call FormData" + method,{ fileName : "FormData.hx", lineNumber : 81, className : "jQuery.FormData", methodName : "save"});
			callParam.push(fd.value);
			fd.value = Reflect.callMethod(window,Reflect.field(window,method),callParam);
		}
	}
	return ret;
};
jQuery_FormData.where = function(jForm,fields) {
	var ret = [];
	var fD = jForm.serializeArray();
	haxe_Log.trace(fields,{ fileName : "FormData.hx", lineNumber : 95, className : "jQuery.FormData", methodName : "where"});
	var aFields = new haxe_ds_StringMap();
	Lambda.iter(fD,function(aFD) {
		aFields.set(aFD.name,aFields.exists(aFD.name)?aFields.get(aFD.name).concat(aFD.value):[aFD.value]);
	});
	var it = aFields.keys();
	var ret1 = [];
	while(it.hasNext()) {
		var k = [it.next()];
		if((__map_reserved[k[0]] != null?aFields.getReserved(k[0]):aFields.h[k[0]]).length > 1) {
			fD = fD.filter((function(k) {
				return function(aFD1) {
					return aFD1.name != k[0];
				};
			})(k));
			ret1.push(k[0] + "|IN|" + (__map_reserved[k[0]] != null?aFields.getReserved(k[0]):aFields.h[k[0]]).join("|"));
		}
	}
	var _g = 0;
	while(_g < fD.length) {
		var item = fD[_g];
		++_g;
		haxe_Log.trace(item.name,{ fileName : "FormData.hx", lineNumber : 117, className : "jQuery.FormData", methodName : "where"});
		if(!(Lambda.has(fields,item.name) || item.name.indexOf("range_from_") == 0)) continue;
		if(item.value != null && item.value != "" || item.name.indexOf("range_from_") == 0) {
			if(Object.prototype.hasOwnProperty.call(App.storeFormats,item.name)) {
				var sForm = Reflect.field(App.storeFormats,item.name);
				var callParam;
				if(sForm.length > 1) callParam = sForm.slice(1); else callParam = [];
				var method = sForm[0];
				haxe_Log.trace("call FormData" + method,{ fileName : "FormData.hx", lineNumber : 127, className : "jQuery.FormData", methodName : "where"});
				callParam.push(item.value);
				item.value = Reflect.callMethod(window,Reflect.field(window,method),callParam);
			}
			var matchTypeOption = jForm.find("[name=\"" + item.name + "_match_option\"]");
			if(matchTypeOption.length == 1) ret1.push((function($this) {
				var $r;
				var _g1 = matchTypeOption.val();
				$r = (function($this) {
					var $r;
					switch(_g1) {
					case "exact":
						$r = item.name + "|" + Std.string(item.value);
						break;
					case "start":
						$r = item.name + "|LIKE|" + Std.string(item.value) + "%";
						break;
					case "end":
						$r = item.name + "|LIKE|%" + Std.string(item.value);
						break;
					case "any":
						$r = item.name + "|LIKE|%" + Std.string(item.value) + "%";
						break;
					default:
						$r = (function($this) {
							var $r;
							haxe_Log.trace("ERROR: unknown matchTypeOption value:" + Std.string(matchTypeOption.val()),{ fileName : "FormData.hx", lineNumber : 146, className : "jQuery.FormData", methodName : "where"});
							$r = "ERROR|unknown matchTypeOption value:" + Std.string(matchTypeOption.val());
							return $r;
						}($this));
					}
					return $r;
				}($this));
				return $r;
			}(this))); else if(item.name.indexOf("range_from_") == 0) {
				var from = item.value;
				if(from.length > 0) from = jQuery_FormData.gDateTime2mysql(from + "00:00:00");
				var name = HxOverrides.substr(item.name,11,null);
				haxe_Log.trace(name + ":" + Std.string(jForm.find("[name=\"range_from_" + name + "\"]").val()),{ fileName : "FormData.hx", lineNumber : 156, className : "jQuery.FormData", methodName : "where"});
				var to = jForm.find("[name=\"range_to_" + name + "\"]").val();
				if(to.length > 0) to = jQuery_FormData.gDateTime2mysql(to + "23:59:59");
				if(from.length > 0 && to.length > 0) ret1.push(name + "|BETWEEN|" + from + "|" + to); else if(from.length > 0) ret1.push(name + "|BETWEEN|" + from + "|" + DateTools.format(new Date(),"%Y-%m-%d")); else if(to.length > 0) ret1.push(name + "|BETWEEN|2015-01-01 00:00:00|" + to);
			} else if(item.name.indexOf("range_to_") == 0) continue; else ret1.push(item.name + "|" + Std.string(item.value));
		}
	}
	haxe_Log.trace(ret1.join(","),{ fileName : "FormData.hx", lineNumber : 173, className : "jQuery.FormData", methodName : "where"});
	return ret1.join(",");
};
jQuery_FormData.gDate2mysql = $hx_exports.gDate2mysql = function(gDate) {
	var d = gDate.split(".").map(function(s) {
		return StringTools.trim(s);
	});
	if(d.length != 3) {
		haxe_Log.trace("Falsches Datumsformat:" + gDate,{ fileName : "FormData.hx", lineNumber : 183, className : "jQuery.FormData", methodName : "gDate2mysql"});
		return "Falsches Datumsformat:" + gDate;
	}
	return d[2] + "-" + d[1] + "-" + d[0];
};
jQuery_FormData.gDateTime2mysql = $hx_exports.gDateTime2mysql = function(gDateTime) {
	var d = new EReg("[- :]","g").split(gDateTime).map(function(s) {
		return StringTools.trim(s);
	});
	if(d.length != 6) {
		haxe_Log.trace("Falsches Datumsformat:" + gDateTime,{ fileName : "FormData.hx", lineNumber : 197, className : "jQuery.FormData", methodName : "gDateTime2mysql"});
		return "Falsches Datumsformat:" + gDateTime;
	}
	return "" + Std.string(d) + "[2]." + Std.string(d) + "[1]." + Std.string(d) + "[0] " + Std.string(d) + "[3]:" + Std.string(d) + "[4]:" + Std.string(d) + "[5]";
};
var jQuery_JHelper = function() { };
$hxClasses["jQuery.JHelper"] = jQuery_JHelper;
jQuery_JHelper.__name__ = ["jQuery","JHelper"];
jQuery_JHelper.J = function(html) {
	return new $(html);
};
jQuery_JHelper.vsprintf = function(format,args) {
	return vsprintf(format,args);
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
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
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var js_JqueryUI = function() { };
$hxClasses["js.JqueryUI"] = js_JqueryUI;
js_JqueryUI.__name__ = ["js","JqueryUI"];
js_JqueryUI.tabs = function(tb,options) {
	return tb.tabs(options);
};
js_JqueryUI.datepicker = function(dp,options) {
	return dp.datepicker(options).attr("placeholder",DateTools.format(new Date(),"%d.%m.%Y"));
};
js_JqueryUI.editable = function(e,options) {
	return e.editable(function(value,settings) {
		date.html(value);
	},options);
};
var me_cunity_debug_DebugOutput = { __ename__ : true, __constructs__ : ["CONSOLE","HAXE","NATIVE","LOG"] };
me_cunity_debug_DebugOutput.CONSOLE = ["CONSOLE",0];
me_cunity_debug_DebugOutput.CONSOLE.toString = $estr;
me_cunity_debug_DebugOutput.CONSOLE.__enum__ = me_cunity_debug_DebugOutput;
me_cunity_debug_DebugOutput.HAXE = ["HAXE",1];
me_cunity_debug_DebugOutput.HAXE.toString = $estr;
me_cunity_debug_DebugOutput.HAXE.__enum__ = me_cunity_debug_DebugOutput;
me_cunity_debug_DebugOutput.NATIVE = ["NATIVE",2];
me_cunity_debug_DebugOutput.NATIVE.toString = $estr;
me_cunity_debug_DebugOutput.NATIVE.__enum__ = me_cunity_debug_DebugOutput;
me_cunity_debug_DebugOutput.LOG = ["LOG",3];
me_cunity_debug_DebugOutput.LOG.toString = $estr;
me_cunity_debug_DebugOutput.LOG.__enum__ = me_cunity_debug_DebugOutput;
var me_cunity_debug_Out = $hx_exports.Out = function() { };
$hxClasses["me.cunity.debug.Out"] = me_cunity_debug_Out;
me_cunity_debug_Out.__name__ = ["me","cunity","debug","Out"];
me_cunity_debug_Out.logg = null;
me_cunity_debug_Out.dumpedObjects = null;
me_cunity_debug_Out._trace = function(v,i) {
	if(me_cunity_debug_Out.suspended) return;
	var warned = false;
	if(i != null && Object.prototype.hasOwnProperty.call(i,"customParams")) i = i.customParams[0];
	var msg;
	if(i != null) msg = i.fileName + ":" + i.methodName + ":" + i.lineNumber + ":"; else msg = "";
	msg += Std.string(v);
	var _g = me_cunity_debug_Out.traceTarget;
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
	case 3:
		$.post(window.location.protocol + "//" + window.location.host + "/inc/functions.php",{ log : 1, m : msg});
		break;
	}
};
me_cunity_debug_Out.log2 = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ":" + i.methodName + ":"; else msg = "";
	msg += Std.string(v);
	var http = new haxe_Http("http://localhost/devel/php/jsLog.php");
	http.setParameter("log",msg);
	http.async = true;
	http.onData = function(data) {
		if(data != "OK") haxe_Log.trace(data,{ fileName : "Out.hx", lineNumber : 205, className : "me.cunity.debug.Out", methodName : "log2"});
	};
	http.request(true);
};
me_cunity_debug_Out.dumpLayout = function(dI,recursive,i) {
	if(recursive == null) recursive = false;
	me_cunity_debug_Out.dumpJLayout(new $(dI),recursive,i);
};
me_cunity_debug_Out.dumpJLayout = function(jQ,recursive,i) {
	if(recursive == null) recursive = false;
	var m = jQ.attr("id") + " left:" + jQ.position().left + " top:" + jQ.position().top + " width:" + jQ.width() + " height:" + jQ.height() + " visibility:" + jQ.css("visibility") + " display:" + jQ.css("display") + " position:" + jQ.css("position") + " class:" + jQ.attr("class") + " overflow:" + jQ.css("overflow");
	me_cunity_debug_Out._trace(m,i);
};
me_cunity_debug_Out.dumpObjectTree = $hx_exports.me.cunity.debug.Out.dumpObjectTree = function(root,recursive,i) {
	if(recursive == null) recursive = false;
	me_cunity_debug_Out.dumpedObjects = [];
	me_cunity_debug_Out._dumpObjectTree(root,Type["typeof"](root),recursive,i);
};
me_cunity_debug_Out._dumpObjectTree = function(root,parent,recursive,i) {
	var m;
	m = (Type.getClass(root) != null?Type.getClassName(Type.getClass(root)):(function($this) {
		var $r;
		var e = Type["typeof"](root);
		$r = e[0];
		return $r;
	}(this))) + ":";
	var fields;
	if(Type.getClass(root) != null) fields = Type.getInstanceFields(Type.getClass(root)); else fields = Reflect.fields(root);
	me_cunity_debug_Out.dumpedObjects.push(root);
	try {
		me_cunity_debug_Out._trace(m + " fields:" + fields.length + ":" + fields.slice(0,5).toString(),{ fileName : "Out.hx", lineNumber : 278, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			haxe_Log.trace(f,{ fileName : "Out.hx", lineNumber : 281, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
			if(recursive) {
				if(me_cunity_debug_Out.dumpedObjects.length > 1000) {
					me_cunity_debug_Out._trace(me_cunity_debug_Out.dumpedObjects.toString(),{ fileName : "Out.hx", lineNumber : 286, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
					throw new js__$Boot_HaxeError("oops");
					break;
					return;
				} else {
					var _o = root[f];
					if(!Lambda.has(me_cunity_debug_Out.dumpedObjects,_o)) me_cunity_debug_Out._dumpObjectTree(_o,Type["typeof"](_o),true,i);
				}
			}
		}
	} catch( ex ) {
		if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
		haxe_Log.trace(ex,{ fileName : "Out.hx", lineNumber : 306, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
	}
};
me_cunity_debug_Out.dumpObject = function(ob,i) {
	var tClass = Type.getClass(ob);
	var m = "dumpObject:" + Std.string(ob != null?Type.getClass(ob):ob) + "\n";
	var names = [];
	if(Type.getClass(ob) != null) names = Type.getInstanceFields(Type.getClass(ob)); else names = Reflect.fields(ob);
	if(Type.getClass(ob) != null) m = Type.getClassName(Type.getClass(ob)) + ":\n";
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		try {
			var t = Std.string(Type["typeof"](Reflect.field(ob,name)));
			if(me_cunity_debug_Out.skipFunctions && t == "TFunction") null;
			m += name + ":" + Std.string(Reflect.field(ob,name)) + ":" + t + "\n";
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			m += name + ":" + Std.string(ex);
		}
	}
	me_cunity_debug_Out._trace(m,i);
};
me_cunity_debug_Out.dumpStack = function(sA,i) {
	var b = new StringBuf();
	b.b += Std.string("StackDump:" + "\n");
	var _g = 0;
	while(_g < sA.length) {
		var item = sA[_g];
		++_g;
		me_cunity_debug_Out.itemToString(item,b);
		b.b += "\n";
	}
	me_cunity_debug_Out._trace(b.b,i);
};
me_cunity_debug_Out.itemToString = function(s,b) {
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
			me_cunity_debug_Out.itemToString(s1,b);
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
me_cunity_debug_Out.fTrace = function(str,arr,i) {
	var str_arr = str.split(" @");
	var str_buf = new StringBuf();
	var _g1 = 0;
	var _g = str_arr.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		str_buf.b += Std.string(str_arr[i1]);
		if(arr[i1] != null) str_buf.add(arr[i1]);
	}
	me_cunity_debug_Out._trace(str_buf.b,i);
};
var me_cunity_js_data_IBAN = function() { };
$hxClasses["me.cunity.js.data.IBAN"] = me_cunity_js_data_IBAN;
me_cunity_js_data_IBAN.__name__ = ["me","cunity","js","data","IBAN"];
me_cunity_js_data_IBAN.buildIBAN = function(account,bankCode,onSuccess,onError) {
	buildIBAN(account,bankCode,onSuccess,onError);
	return;
};
me_cunity_js_data_IBAN.checkIBAN = function(iban) {
	return checkIBAN(iban);
};
var me_cunity_tools_ArrayTools = function() { };
$hxClasses["me.cunity.tools.ArrayTools"] = me_cunity_tools_ArrayTools;
me_cunity_tools_ArrayTools.__name__ = ["me","cunity","tools","ArrayTools"];
me_cunity_tools_ArrayTools.indentLevel = null;
me_cunity_tools_ArrayTools.atts2field = function(aAtts) {
	var f = [];
	var _g = 0;
	var _g1 = Reflect.fields(aAtts);
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		f.push(Reflect.field(aAtts,name));
	}
	return f;
};
me_cunity_tools_ArrayTools.countElements = function(a,el) {
	var count = 0;
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		if(e == el) count++;
	}
	return count;
};
me_cunity_tools_ArrayTools.map = function(a,f) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var e = _g1++;
		a[e] = f(a[e]);
	}
	return a;
};
me_cunity_tools_ArrayTools.map2 = function(a,f) {
	var t = [];
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var e = _g1++;
		t[e] = f(a[e]);
	}
	return t;
};
me_cunity_tools_ArrayTools.contains = function(a,el) {
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		if(e == el) return true;
	}
	return false;
};
me_cunity_tools_ArrayTools.sortNum = function(a,b) {
	if(a < b) return -1;
	if(a > b) return 1;
	return 0;
};
me_cunity_tools_ArrayTools.stringIt2Array = function(it,sort) {
	var values = [];
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
me_cunity_tools_ArrayTools.It2Array = function(it) {
	var values = [];
	while( it.hasNext() ) {
		var val = it.next();
		values.push(val);
	}
	return values;
};
me_cunity_tools_ArrayTools.getIndent = function() {
	var indent = "";
	var _g1 = 0;
	var _g = me_cunity_tools_ArrayTools.indentLevel;
	while(_g1 < _g) {
		var i = _g1++;
		indent += "\t";
	}
	return indent;
};
me_cunity_tools_ArrayTools.dumpArray = function(arr,propName) {
	if(arr.length == 0) return "";
	if(me_cunity_tools_ArrayTools.indentLevel == null) me_cunity_tools_ArrayTools.indentLevel = 0;
	var dump = "\n" + me_cunity_tools_ArrayTools.getIndent() + "[\n";
	var i = 0;
	var _g = 0;
	while(_g < arr.length) {
		var el = arr[_g];
		++_g;
		if(me_cunity_tools_ArrayTools.isArray(el)) {
			me_cunity_tools_ArrayTools.indentLevel++;
			if(el == null) {
				haxe_Log.trace("el = null",{ fileName : "ArrayTools.hx", lineNumber : 115, className : "me.cunity.tools.ArrayTools", methodName : "dumpArray"});
				dump += me_cunity_tools_ArrayTools.getIndent() + "[],";
			} else {
				var a;
				a = js_Boot.__cast(el , Array);
				var _g1 = 0;
				while(_g1 < a.length) {
					var ia = a[_g1];
					++_g1;
					dump += me_cunity_tools_ArrayTools.getIndent() + "[";
					me_cunity_tools_ArrayTools.indentLevel++;
					if(ia == null) dump += "\n" + me_cunity_tools_ArrayTools.getIndent() + "null\n"; else dump += me_cunity_tools_ArrayTools.dumpArray(ia,propName);
					me_cunity_tools_ArrayTools.indentLevel--;
					dump += me_cunity_tools_ArrayTools.getIndent();
					if(me_cunity_tools_ArrayTools.indentLevel > 0) dump += "],\n"; else dump += "]\n";
				}
			}
			me_cunity_tools_ArrayTools.indentLevel--;
			if(me_cunity_tools_ArrayTools.indentLevel > 0) dump += me_cunity_tools_ArrayTools.getIndent() + "],\n"; else dump += me_cunity_tools_ArrayTools.getIndent() + "]\n";
			return dump;
		} else {
			if(++i == 1) {
				me_cunity_tools_ArrayTools.indentLevel++;
				dump += me_cunity_tools_ArrayTools.getIndent();
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
			if(i < arr.length) dump += ", "; else me_cunity_tools_ArrayTools.indentLevel--;
		}
	}
	dump += "\n" + me_cunity_tools_ArrayTools.getIndent();
	if(me_cunity_tools_ArrayTools.indentLevel > 0) dump += "],\n"; else dump += "] \n";
	return dump;
};
me_cunity_tools_ArrayTools.dumpArrayItems = function(arr,propName) {
	var dump = "";
	var indent = "";
	var _g1 = 0;
	var _g = me_cunity_tools_ArrayTools.indentLevel;
	while(_g1 < _g) {
		var i = _g1++;
		indent += " ";
	}
	haxe_Log.trace(indent + me_cunity_tools_ArrayTools.indentLevel,{ fileName : "ArrayTools.hx", lineNumber : 175, className : "me.cunity.tools.ArrayTools", methodName : "dumpArrayItems"});
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
	haxe_Log.trace(dump,{ fileName : "ArrayTools.hx", lineNumber : 189, className : "me.cunity.tools.ArrayTools", methodName : "dumpArrayItems"});
	return dump;
};
me_cunity_tools_ArrayTools.isArray = function(arr) {
	if(Type.getClassName(Type.getClass(arr)) == "Array") return true; else return false;
};
me_cunity_tools_ArrayTools.indexOf = function(arr,el) {
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(arr[i] == el) return i;
	}
	return -1;
};
me_cunity_tools_ArrayTools.removeDuplicates = function(arr) {
	var i = 0;
	while(i < arr.length) {
		while(me_cunity_tools_ArrayTools.countElements(arr,arr[i]) > 1) arr.splice(i,1);
		i++;
	}
	return arr;
};
me_cunity_tools_ArrayTools.spliceA = function(arr,start,delCount,ins) {
	if(ins == null) return arr.splice(start,delCount);
	arr = arr.slice(0,start + delCount).concat(ins).concat(arr.slice(start + delCount));
	var ret = arr.splice(start,delCount);
	return ret;
};
me_cunity_tools_ArrayTools.spliceEl = function(arr,start,delCount,ins) {
	if(ins == null) return arr.splice(start,delCount);
	arr = arr.slice(0,start + delCount).concat([ins]).concat(arr.slice(start + delCount));
	var ret = arr.splice(start,delCount);
	return ret;
};
me_cunity_tools_ArrayTools.filter = function(arr,cB,thisObj) {
	var ret = [];
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(cB(arr[i],i,arr)) ret.push(arr[i]);
	}
	return ret;
};
me_cunity_tools_ArrayTools.sum = function(arr) {
	var s = 0;
	var _g = 0;
	while(_g < arr.length) {
		var e = arr[_g];
		++_g;
		s += e;
	}
	return s;
};
var me_cunity_util_Data = function() { };
$hxClasses["me.cunity.util.Data"] = me_cunity_util_Data;
me_cunity_util_Data.__name__ = ["me","cunity","util","Data"];
me_cunity_util_Data.copy = function(source) {
	var c = { };
	var fields = Reflect.fields(source);
	var _g = 0;
	while(_g < fields.length) {
		var f = fields[_g];
		++_g;
		Reflect.setField(c,f,Reflect.field(source,f));
	}
	return c;
};
var pushstate_PushState = function() { };
$hxClasses["pushstate.PushState"] = pushstate_PushState;
pushstate_PushState.__name__ = ["pushstate","PushState"];
pushstate_PushState.basePath = null;
pushstate_PushState.preventers = null;
pushstate_PushState.listeners = null;
pushstate_PushState.history = null;
pushstate_PushState.currentPath = null;
pushstate_PushState.currentState = null;
pushstate_PushState.init = function(basePath) {
	if(basePath == null) basePath = "";
	pushstate_PushState.listeners = [];
	pushstate_PushState.preventers = [];
	pushstate_PushState.history = window.history;
	pushstate_PushState.basePath = basePath;
	((function($this) {
		var $r;
		var html = window;
		$r = js.JQuery(html);
		return $r;
	}(this))).ready(function(e) {
		pushstate_PushState.handleOnPopState(null);
		((function($this) {
			var $r;
			var html1 = window.document.body;
			$r = js.JQuery(html1);
			return $r;
		}(this))).delegate("a[rel=pushstate]","click",function(e1) {
			pushstate_PushState.push(js.JQuery(this).attr("href"));
			e1.preventDefault();
		});
		window.onpopstate = pushstate_PushState.handleOnPopState;
	});
};
pushstate_PushState.handleOnPopState = function(e) {
	var path = pushstate_PushState.stripURL(window.document.location.pathname);
	var state;
	if(e != null) state = e.state; else state = null;
	if(e != null) {
		var _g = 0;
		var _g1 = pushstate_PushState.preventers;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(!p(path,e.state)) {
				e.preventDefault();
				pushstate_PushState.history.replaceState(pushstate_PushState.currentState,"",pushstate_PushState.currentPath);
				return;
			}
		}
	}
	pushstate_PushState.currentPath = path;
	pushstate_PushState.currentState = state;
	pushstate_PushState.dispatch(path,state);
	return;
};
pushstate_PushState.stripURL = function(path) {
	if(HxOverrides.substr(path,0,pushstate_PushState.basePath.length) == pushstate_PushState.basePath) path = HxOverrides.substr(path,pushstate_PushState.basePath.length,null);
	return path;
};
pushstate_PushState.addEventListener = function(l,s) {
	if(l != null) pushstate_PushState.listeners.push(l); else if(s != null) {
		l = function(url,_) {
			s(url);
			return;
		};
		pushstate_PushState.listeners.push(l);
	}
	return l;
};
pushstate_PushState.removeEventListener = function(l) {
	HxOverrides.remove(pushstate_PushState.listeners,l);
};
pushstate_PushState.clearEventListeners = function() {
	while(pushstate_PushState.listeners.length > 0) pushstate_PushState.listeners.pop();
};
pushstate_PushState.addPreventer = function(p,s) {
	if(p != null) pushstate_PushState.preventers.push(p); else if(s != null) {
		p = function(url,_) {
			return s(url);
		};
		pushstate_PushState.preventers.push(p);
	}
	return p;
};
pushstate_PushState.removePreventer = function(p) {
	HxOverrides.remove(pushstate_PushState.preventers,p);
};
pushstate_PushState.clearPreventers = function() {
	while(pushstate_PushState.preventers.length > 0) pushstate_PushState.preventers.pop();
};
pushstate_PushState.dispatch = function(url,state) {
	var _g = 0;
	var _g1 = pushstate_PushState.listeners;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		l(url,state);
	}
};
pushstate_PushState.push = function(url,state) {
	if(state == null) state = { };
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(url,state)) return false;
	}
	pushstate_PushState.history.pushState(state,"",url);
	pushstate_PushState.currentPath = url;
	pushstate_PushState.currentState = state;
	pushstate_PushState.dispatch(url,state);
	return true;
};
pushstate_PushState.replace = function(url,state) {
	if(state == null) state = Dynamic;
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(url,state)) return false;
	}
	pushstate_PushState.history.replaceState(state,"",url);
	pushstate_PushState.currentPath = url;
	pushstate_PushState.currentState = state;
	pushstate_PushState.dispatch(url,state);
	return true;
};
var view_Campaigns = function(data) {
	View.call(this,data);
	var campaignData = data;
	this.listattach2 = campaignData.listattach2;
	if(!(data.limit > 0)) data.limit = 15;
	haxe_Log.trace("#t-" + this.id + " attach2:" + Std.string(data.attach2),{ fileName : "Campaigns.hx", lineNumber : 38, className : "view.Campaigns", methodName : "new"});
	new $("#t-" + this.id).tmpl(data).appendTo(data.attach2);
	if(data.views != null) this.addViews(data.views);
	this.init();
};
$hxClasses["view.Campaigns"] = view_Campaigns;
view_Campaigns.__name__ = ["view","Campaigns"];
view_Campaigns.__super__ = View;
view_Campaigns.prototype = $extend(View.prototype,{
	listattach2: null
	,findLeads: function(where) {
		var _g = this;
		haxe_Log.trace("|" + where + "|" + (Util.any2bool(where)?"Y":"N"),{ fileName : "Campaigns.hx", lineNumber : 51, className : "view.Campaigns", methodName : "findLeads"});
		haxe_Log.trace(this.vData.where,{ fileName : "Campaigns.hx", lineNumber : 52, className : "view.Campaigns", methodName : "findLeads"});
		var fData = { };
		var pkeys = "className,fields,limit,order,where".split(",");
		var _g1 = 0;
		while(_g1 < pkeys.length) {
			var f = pkeys[_g1];
			++_g1;
			if(Reflect.field(this.vData,f) != null) {
				if(f == "where" && (Util.any2bool(where) || Util.any2bool(this.vData.where))) if(Util.any2bool(this.vData.where)) fData.where = Std.string(this.vData.where) + (Util.any2bool(where)?"," + where:""); else fData.where = where; else Reflect.setField(fData,f,Reflect.field(this.vData,f));
			}
		}
		fData.action = "findLeads";
		this.resetParams(fData);
		this.loadData("server.php",this.params,function(data) {
			data.loaderId = _g.vData.listattach2;
			_g.update(data);
		});
	}
	,__class__: view_Campaigns
});
var view_Editor = function(data) {
	View.call(this,data);
	this.cMenu = js_Boot.__cast(this.parentView.views.get(this.parentView.instancePath + "." + this.parentView.id + "-menu") , view_ContextMenu);
	this.name = this.parentView.name;
	this.templ = new $("#t-" + this.id);
	haxe_Log.trace(this.id,{ fileName : "Editor.hx", lineNumber : 38, className : "view.Editor", methodName : "new"});
	this.init();
};
$hxClasses["view.Editor"] = view_Editor;
view_Editor.__name__ = ["view","Editor"];
view_Editor.__super__ = View;
view_Editor.prototype = $extend(View.prototype,{
	cMenu: null
	,fieldNames: null
	,overlay: null
	,optionsMap: null
	,typeMap: null
	,eData: null
	,agent: null
	,leadID: null
	,checkIban: function() {
		var iban = new $("#" + this.parentView.id + "-edit-form  input[name=\"iban\"]").val();
		haxe_Log.trace(iban,{ fileName : "Editor.hx", lineNumber : 45, className : "view.Editor", methodName : "checkIban"});
		return me_cunity_js_data_IBAN.checkIBAN(iban);
	}
	,checkAccountAndBLZ: function(ok2submit) {
		var _g = this;
		var account = new $("#" + this.parentView.id + "-edit-form input[name=\"account\"]").val();
		var blz = new $("#" + this.parentView.id + "-edit-form input[name=\"blz\"]").val();
		haxe_Log.trace(account + ":" + blz,{ fileName : "Editor.hx", lineNumber : 53, className : "view.Editor", methodName : "checkAccountAndBLZ"});
		if(!(account.length > 0 && blz.length > 0)) {
			ok2submit(false);
			return;
		}
		me_cunity_js_data_IBAN.buildIBAN(account,blz,function(success) {
			if(me_cunity_js_data_IBAN.checkIBAN(success.iban)) {
				new $("#" + _g.parentView.id + "-edit-form input[name=\"iban\"]").val(success.iban);
				ok2submit(true);
			}
		},function(error) {
			haxe_Log.trace(error.message,{ fileName : "Editor.hx", lineNumber : 68, className : "view.Editor", methodName : "checkAccountAndBLZ"});
			ok2submit(false);
		});
	}
	,edit: function(dataRow) {
		var p = this.resetParams();
		if(this.vData.primary_id == null) p.primary_id = this.parentView.primary_id; else p.primary_id = this.vData.primary_id;
		this.eData = dataRow;
		Reflect.setField(p,p.primary_id,this.eData.attr("id"));
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g = 0;
			while(_g < hKeys.length) {
				var k = hKeys[_g];
				++_g;
				Reflect.setField(p,k,this.eData.data(k));
			}
		}
		haxe_Log.trace(p,{ fileName : "Editor.hx", lineNumber : 90, className : "view.Editor", methodName : "edit"});
		this.leadID = p.lead_id;
		haxe_Log.trace(this.leadID,{ fileName : "Editor.hx", lineNumber : 92, className : "view.Editor", methodName : "edit"});
		p.action = "edit";
		if(this.vData.fields != null) p.fields = this.vData.fields; else p.fields = this.parentView.vData.fields;
		this.cMenu.set_active(this.cMenu.getIndexOf(this.vData.action));
		this.loadData("server.php",p,$bind(this,this.update));
	}
	,endAction: function(action) {
		var _g = this;
		switch(action) {
		case "close":
			haxe_Log.trace("going to close:" + new $("#overlay").length,{ fileName : "Editor.hx", lineNumber : 108, className : "view.Editor", methodName : "endAction"});
			this.cMenu.root.find(".recordings").remove();
			this.cMenu.root.data("disabled",0);
			new $(this.cMenu.attach2).find("tr").removeClass("selected");
			this.parentView.set_interactionState("init");
			this.overlay.animate({ opacity : 0.0},300,null,function() {
				_g.overlay.detach();
			});
			break;
		case "save":case "qcok":
			if(!this.checkIban()) this.checkAccountAndBLZ(function(ok) {
				haxe_Log.trace(ok,{ fileName : "Editor.hx", lineNumber : 120, className : "view.Editor", methodName : "endAction"});
				if(ok) _g.save(action == "qcok"); else App.inputError(new $("#" + _g.parentView.id + "-edit-form"),["account","blz","iban"]);
			}); else this.save(action == "qcok");
			break;
		case "call":
			this.cMenu.call(this);
			break;
		default:
			haxe_Log.trace(action,{ fileName : "Editor.hx", lineNumber : 145, className : "view.Editor", methodName : "endAction"});
		}
	}
	,save: function(qcok) {
		var _g = this;
		var p = jQuery_FormData.save(new $("#" + this.parentView.id + "-edit-form"));
		p.push({ name : "className", value : this.parentView.name});
		p.push({ name : "action", value : "save"});
		p.push({ name : "primary_id", value : this.parentView.vData.primary_id});
		p.push({ name : this.parentView.vData.primary_id, value : this.eData.attr("id")});
		if(qcok) p.push({ name : "status", value : "MITGL"});
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g1 = 0;
			while(_g1 < hKeys.length) {
				var k = [hKeys[_g1]];
				++_g1;
				if(this.eData.data(k[0]) != null && Lambda.foreach(p,(function(k) {
					return function(jD) {
						return jD.name != k[0];
					};
				})(k))) p.push({ name : k[0], value : this.eData.data(k[0])});
			}
		}
		haxe_Log.trace(p,{ fileName : "Editor.hx", lineNumber : 167, className : "view.Editor", methodName : "save"});
		this.parentView.loadData("server.php",p,function(data) {
			haxe_Log.trace(Std.string(data) + ": " + (data == "true"?"Y":"N"),{ fileName : "Editor.hx", lineNumber : 169, className : "view.Editor", methodName : "save"});
			if(data == "true") {
				haxe_Log.trace(_g.root.find(".recordings").length,{ fileName : "Editor.hx", lineNumber : 171, className : "view.Editor", methodName : "save"});
				_g.root.find(".recordings").remove();
				_g.root.data("disabled",0);
				new $(_g.attach2).find("tr").removeClass("selected");
				new $("#overlay").animate({ opacity : 0.0},300,null,function() {
					new $("#overlay").detach();
				});
			}
		});
	}
	,update: function(data) {
		this.parentView.wait(false);
		this.agent = data.agent;
		haxe_Log.trace(data.agent,{ fileName : "Editor.hx", lineNumber : 185, className : "view.Editor", methodName : "update"});
		var dataOptions = { };
		var keys = Reflect.fields(data.optionsMap);
		var _g = 0;
		while(_g < keys.length) {
			var k = keys[_g];
			++_g;
			var opts = [];
			var optRows = Reflect.field(data.optionsMap,k).split("\r\n");
			var _g1 = 0;
			while(_g1 < optRows.length) {
				var r1 = optRows[_g1];
				++_g1;
				opts.push(r1.split(","));
			}
			dataOptions[k] = opts;
		}
		data.user = this.eData.data("user");
		this.optionsMap = data.optionsMap = dataOptions;
		this.typeMap = data.typeMap;
		var r = new EReg("([a-z0-9_-]+.mp3)$","");
		var rData = { recordings : data.recordings.map(function(rec) {
			if(r.match(rec.location)) rec.filename = r.matched(1); else rec.filename = rec.location;
			return rec;
		})};
		var recordings = new $("#t-" + this.parentView.id + "-recordings").tmpl(rData);
		this.cMenu.activePanel.find("form").append(recordings);
		var oMargin = 8;
		var mSpace = App.getMainSpace();
		this.overlay = this.templ.tmpl(data).appendTo("#" + this.parentView.id).css({ marginTop : Std.string(mSpace.top + oMargin) + "px", marginLeft : (oMargin == null?"null":"" + oMargin) + "px", height : Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(new $("#overlay").css("padding-top")) - Std.parseFloat(new $("#overlay").css("padding-bottom"))) + "px", width : Std.string(new $("#" + Std.string(this.parentView.vData.id) + "-menu").offset().left - 35) + "px"}).animate({ opacity : 1});
		haxe_Log.trace(mSpace.height + ":" + 2 * oMargin + ":" + Std.parseFloat(new $("#overlay").css("padding-top")) + ":" + Std.parseFloat(new $("#overlay").css("padding-bottom")),{ fileName : "Editor.hx", lineNumber : 218, className : "view.Editor", methodName : "update"});
		new $("#" + this.parentView.id + " .scrollbox").height(new $("#" + this.parentView.id + " #overlay").height());
		haxe_Log.trace(this.id + ":" + this.parentView.id + ":" + new $("#" + this.parentView.id + " .scrollbox").length + ":" + new $("#" + this.parentView.id + " .scrollbox").height(),{ fileName : "Editor.hx", lineNumber : 220, className : "view.Editor", methodName : "update"});
	}
	,__class__: view_Editor
});
var view_ClientEditor = function(data) {
	view_Editor.call(this,data);
};
$hxClasses["view.ClientEditor"] = view_ClientEditor;
view_ClientEditor.__name__ = ["view","ClientEditor"];
view_ClientEditor.__super__ = view_Editor;
view_ClientEditor.prototype = $extend(view_Editor.prototype,{
	screens: null
	,activeScreen: null
	,editData: null
	,endAction: function(endAction) {
		var _g1 = this;
		switch(endAction) {
		case "close":
			haxe_Log.trace("going to close:" + new $("#overlay").length,{ fileName : "ClientEditor.hx", lineNumber : 33, className : "view.ClientEditor", methodName : "endAction"});
			var _g = this.activeScreen;
			switch(_g) {
			case "pay_plan":case "pay_source":case "pay_history":case "client_history":
				var s = this.screens.get(this.activeScreen);
				s.animate({ opacity : 0.0},300,null,function() {
					s.detach();
				});
				this.activeScreen = null;
				break;
			default:
				this.cMenu.root.find(".recordings").remove();
				this.cMenu.root.data("disabled",0);
				new $(this.cMenu.attach2).find("tr").removeClass("selected");
				this.parentView.set_interactionState("init");
				this.overlay.animate({ opacity : 0.0},300,null,function() {
					_g1.overlay.detach();
				});
			}
			break;
		case "save":
			var _g2 = this.activeScreen;
			switch(_g2) {
			case "pay_source":
				if(!this.checkIban()) this.checkAccountAndBLZ(function(ok) {
					haxe_Log.trace(ok,{ fileName : "ClientEditor.hx", lineNumber : 56, className : "view.ClientEditor", methodName : "endAction"});
					if(ok) _g1.save_pay_screen(); else App.inputError(new $("#" + _g1.parentView.id + "-edit-form"),["account","blz","iban"]);
				});
				break;
			case "pay_plan":case "pay_history":case "client_history":
				this.save_pay_screen();
				break;
			default:
				this.save(false);
			}
			break;
		case "call":
			this.cMenu.call(this);
			break;
		case "pay_plan":case "pay_source":case "pay_history":case "client_history":
			this.showScreen(endAction);
			break;
		default:
			haxe_Log.trace(endAction,{ fileName : "ClientEditor.hx", lineNumber : 79, className : "view.ClientEditor", methodName : "endAction"});
		}
	}
	,save_pay_screen: function() {
		var _g = this;
		var p = jQuery_FormData.save(new $("#" + this.activeScreen + "-form"));
		p.push({ name : "className", value : this.parentView.name});
		p.push({ name : "action", value : "save"});
		p.push({ name : "primary_id", value : this.vData.primary_id});
		p.push({ name : this.vData.primary_id, value : this.eData.attr("id")});
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g1 = 0;
			while(_g1 < hKeys.length) {
				var k = [hKeys[_g1]];
				++_g1;
				if(this.eData.data(k[0]) != null && Lambda.foreach(p,(function(k) {
					return function(jD) {
						return jD.name != k[0];
					};
				})(k))) p.push({ name : k[0], value : this.eData.data(k[0])});
			}
			p.push({ name : "table", value : this.activeScreen});
		}
		haxe_Log.trace(p,{ fileName : "ClientEditor.hx", lineNumber : 100, className : "view.ClientEditor", methodName : "save_pay_screen"});
		return;
		this.parentView.loadData("server.php",p,function(data) {
			haxe_Log.trace(Std.string(data) + ": " + (data == "true"?"Y":"N"),{ fileName : "ClientEditor.hx", lineNumber : 103, className : "view.ClientEditor", methodName : "save_pay_screen"});
			if(data == "true") {
				var s = _g.screens.get(_g.activeScreen);
				s.animate({ opacity : 0.0},300,null,function() {
					s.detach();
				});
				_g.activeScreen = null;
			}
		});
	}
	,showScreen: function(name) {
		if(this.activeScreen != null) {
			var s = this.screens.get(this.activeScreen);
			s.animate({ opacity : 0.0},300,null,function() {
				s.detach();
			});
		}
		var dRows = Reflect.field(this.editData,name).h;
		var sData = Reflect.field(this.editData,name);
		haxe_Log.trace(dRows,{ fileName : "ClientEditor.hx", lineNumber : 121, className : "view.ClientEditor", methodName : "showScreen"});
		sData.table = name;
		sData.optionsMap = this.optionsMap;
		sData.typeMap = this.typeMap;
		sData.fieldNames = this.fieldNames;
		haxe_Log.trace(sData,{ fileName : "ClientEditor.hx", lineNumber : 136, className : "view.ClientEditor", methodName : "showScreen"});
		var oMargin = 8;
		var mSpace = App.getMainSpace();
		this.screens.set(name,new $("#t-pay-editor").tmpl(sData).appendTo("#" + this.parentView.id).css({ marginTop : Std.string(mSpace.top + oMargin) + "px", marginLeft : (oMargin == null?"null":"" + oMargin) + "px", height : Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(new $("#overlay").css("padding-top")) - Std.parseFloat(new $("#overlay").css("padding-bottom"))) + "px", width : Std.string(new $("#clients-menu").offset().left - 35) + "px"}).animate({ opacity : 1}));
		this.activeScreen = name;
	}
	,save: function(_) {
		var _g = this;
		var p = jQuery_FormData.save(new $("#" + this.parentView.id + "-edit-form"));
		p.push({ name : "className", value : this.parentView.name});
		p.push({ name : "action", value : "save"});
		p.push({ name : "primary_id", value : this.parentView.vData.primary_id});
		p.push({ name : this.parentView.vData.primary_id, value : this.eData.attr("id")});
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g1 = 0;
			while(_g1 < hKeys.length) {
				var k = [hKeys[_g1]];
				++_g1;
				if(this.eData.data(k[0]) != null && Lambda.foreach(p,(function(k) {
					return function(jD) {
						return jD.name != k[0];
					};
				})(k))) p.push({ name : k[0], value : this.eData.data(k[0])});
			}
		}
		haxe_Log.trace(p,{ fileName : "ClientEditor.hx", lineNumber : 164, className : "view.ClientEditor", methodName : "save"});
		this.parentView.loadData("server.php",p,function(data) {
			haxe_Log.trace(Std.string(data) + ": " + (data == "true"?"Y":"N"),{ fileName : "ClientEditor.hx", lineNumber : 167, className : "view.ClientEditor", methodName : "save"});
			if(data == "true") {
				haxe_Log.trace(_g.root.find(".recordings").length,{ fileName : "ClientEditor.hx", lineNumber : 169, className : "view.ClientEditor", methodName : "save"});
				_g.root.find(".recordings").remove();
				_g.root.data("disabled",0);
				new $(_g.attach2).find("tr").removeClass("selected");
				_g.overlay.animate({ opacity : 0.0},300,null,function() {
					_g.overlay.detach();
				});
			}
		});
	}
	,update: function(data) {
		this.parentView.wait(false);
		this.editData = data.editData;
		this.agent = data.agent;
		this.screens = new haxe_ds_StringMap();
		var dataOptions = { };
		var keys = Reflect.fields(data.optionsMap);
		var _g = 0;
		while(_g < keys.length) {
			var k = keys[_g];
			++_g;
			var opts = [];
			var optRows = Reflect.field(data.optionsMap,k).split("\r\n");
			var _g1 = 0;
			while(_g1 < optRows.length) {
				var r1 = optRows[_g1];
				++_g1;
				opts.push(r1.split(","));
			}
			dataOptions[k] = opts;
		}
		this.fieldNames = data.fieldNames;
		this.optionsMap = data.optionsMap = dataOptions;
		this.typeMap = data.typeMap;
		var r = new EReg("([a-z0-9_-]+.mp3)$","");
		var rData = { recordings : data.recordings.map(function(rec) {
			if(r.match(rec.location)) rec.filename = r.matched(1); else rec.filename = rec.location;
			return rec;
		})};
		var recordings = new $("#t-" + this.parentView.id + "-recordings").tmpl(rData);
		this.cMenu.activePanel.find("form").append(recordings);
		var oMargin = 8;
		var mSpace = App.getMainSpace();
		this.overlay = this.templ.tmpl(data).appendTo("#" + this.parentView.id).css({ marginTop : Std.string(mSpace.top + oMargin) + "px", marginLeft : (oMargin == null?"null":"" + oMargin) + "px", height : Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(new $("#overlay").css("padding-top")) - Std.parseFloat(new $("#overlay").css("padding-bottom"))) + "px", width : Std.string(new $("#clients-menu").offset().left - 35) + "px"}).animate({ opacity : 1});
		new $("#" + this.parentView.id + " .scrollbox").height(new $("#" + this.parentView.id + " #overlay").height());
		haxe_Log.trace(this.leadID,{ fileName : "ClientEditor.hx", lineNumber : 219, className : "view.ClientEditor", methodName : "update"});
	}
	,__class__: view_ClientEditor
});
var view_Clients = function(data) {
	var _g = this;
	View.call(this,data);
	this.listattach2 = data.listattach2;
	if(!(data.limit > 0)) data.limit = 15;
	haxe_Log.trace("#t-" + this.id + " attach2:" + data.attach2 + ":" + this.dbLoaderIndex,{ fileName : "Clients.hx", lineNumber : 39, className : "view.Clients", methodName : "new"});
	new $("#t-" + this.id).tmpl(data).appendTo(data.attach2);
	if(data.table != null) this.parentView.addDataLoader(this.listattach2,{ callBack : $bind(this,this.update), prepare : function() {
		_g.resetParams();
		if(_g.vData.order != null) _g.params.order = _g.vData.order;
		return _g.params;
	}, valid : false},this.dbLoaderIndex);
	if(data.views != null) this.addViews(data.views);
	this.addInteractionState("selected",{ disables : [], enables : ["call","pay_plan","pay_source","pay_history","client_history","close","save"]});
	this.addInteractionState("init",{ disables : ["call","pay_plan","pay_source","pay_history","client_history","close","save"], enables : []});
	this.edit = this.views.get(this.instancePath + "." + this.id + "-editor");
	haxe_Log.trace("found editor:" + this.instancePath + "." + this.id + "-editor :" + Std.string(this.edit.vData.id),{ fileName : "Clients.hx", lineNumber : 61, className : "view.Clients", methodName : "new"});
	this.init();
};
$hxClasses["view.Clients"] = view_Clients;
view_Clients.__name__ = ["view","Clients"];
view_Clients.__super__ = View;
view_Clients.prototype = $extend(View.prototype,{
	listattach2: null
	,edit: null
	,select: function(evt) {
		evt.preventDefault();
		haxe_Log.trace(new $(evt.target).get()[0].nodeName,{ fileName : "Clients.hx", lineNumber : 68, className : "view.Clients", methodName : "select"});
		if(App.ist.ctrlPressed) haxe_Log.trace("ctrlPressed",{ fileName : "Clients.hx", lineNumber : 70, className : "view.Clients", methodName : "select"});
		var jTarget = new $(evt.target).parent();
		if(jTarget.hasClass("selected")) jTarget.removeClass("selected"); else {
			jTarget.siblings().removeClass("selected");
			jTarget.addClass("selected");
			this.selectedID = jTarget.attr("id");
			haxe_Log.trace(this.selectedID,{ fileName : "Clients.hx", lineNumber : 79, className : "view.Clients", methodName : "select"});
			this.edit.edit(jTarget);
		}
		if(jTarget.hasClass("selected")) this.set_interactionState("selected"); else this.set_interactionState("init");
	}
	,__class__: view_Clients
});
var view_ContextMenu = function(data) {
	var _g = this;
	View.call(this,data);
	this.contextData = data;
	haxe_Log.trace(this.id + " heightStyle:" + this.contextData.heightStyle + " attach2:" + Std.string(data.attach2),{ fileName : "ContextMenu.hx", lineNumber : 49, className : "view.ContextMenu", methodName : "new"});
	if(this.contextData.heightStyle == null) this.contextData.heightStyle = "auto";
	var tmp = new $("#t-" + this.id).tmpl(data);
	tmp.appendTo(jQuery_JHelper.J(data.attach2));
	this.createInputs();
	this.active = 0;
	this.root = new $("#" + this.id).accordion({ active : 1, activate : $bind(this,this.activate), 'autoHeight' : false, beforeActivate : function(event,ui) {
		if(_g.root.data("disabled")) event.preventDefault(); else _g.activePanel = new $(ui.newPanel[0]);
	}, create : $bind(this,this.create), fillSpace : true, heightStyle : this.contextData.heightStyle});
	this.accordion = this.root.accordion("instance");
	haxe_Log.trace(new $("#" + this.id).find(".datepicker").length,{ fileName : "ContextMenu.hx", lineNumber : 82, className : "view.ContextMenu", methodName : "new"});
	js_JqueryUI.datepicker(new $("#" + this.id).find(".datepicker"),{ beforeShow : function(el,ui1) {
		var jq = new $(el);
		if(jq.val() == "") jq.val(jq.attr("placeholder"));
	}});
	new $("#" + this.id + " button[data-endaction]").click($bind(this,this.run));
	this.init();
};
$hxClasses["view.ContextMenu"] = view_ContextMenu;
view_ContextMenu.__name__ = ["view","ContextMenu"];
view_ContextMenu.__super__ = View;
view_ContextMenu.prototype = $extend(View.prototype,{
	accordion: null
	,contextData: null
	,action: null
	,active: null
	,activePanel: null
	,get_active: function() {
		this.active = this.root.accordion("option","active");
		return this.active;
	}
	,set_active: function(act) {
		this.active = act;
		haxe_Log.trace(this.active,{ fileName : "ContextMenu.hx", lineNumber : 103, className : "view.ContextMenu", methodName : "set_active"});
		this.root.accordion("option","active",act);
		this.root.data("disabled",1);
		return act;
	}
	,activate: function(event,ui) {
		this.action = new $(ui.newPanel[0]).find("input[name=\"action\"]").first().val();
		haxe_Log.trace(this.action + ":" + this.activePanel.attr("id") + " == " + new $(ui.newPanel[0]).attr("id"),{ fileName : "ContextMenu.hx", lineNumber : 115, className : "view.ContextMenu", methodName : "activate"});
	}
	,call: function(editor) {
		var _g = this;
		haxe_Log.trace("parentView.interactionState:" + this.parentView.interactionState + " agent:" + editor.agent + " editor.leadID:" + editor.leadID,{ fileName : "ContextMenu.hx", lineNumber : 121, className : "view.ContextMenu", methodName : "call"});
		if(this.parentView.interactionState == "call") {
			var p1 = { className : "AgcApi", action : "external_hangup", campaign_id : this.parentView.vData.campaign_id, lead_id : editor.leadID, agent_user : editor.agent};
			this.parentView.loadData("server.php",p1,function(data) {
				if(data.response == "OK") {
					_g.parentView.set_interactionState("init");
					App.choice({ header : App.appLabel.selectStatus, choice : data.choice, id : _g.parentView.id});
					new $("#choice  button[data-choice]").click(function(evt) {
						haxe_Log.trace(jQuery_JHelper.J(js_Boot.__cast(evt.target , Node)).data("choice"),{ fileName : "ContextMenu.hx", lineNumber : 143, className : "view.ContextMenu", methodName : "call"});
						p1 = { className : "AgcApi", action : "external_status", dispo : jQuery_JHelper.J(js_Boot.__cast(evt.target , Node)).data("choice"), agent_user : editor.agent};
						_g.parentView.loadData("server.php",p1,function(data1) {
							haxe_Log.trace(data1,{ fileName : "ContextMenu.hx", lineNumber : 151, className : "view.ContextMenu", methodName : "call"});
							if(data1.response != "OK") App.choice({ header : data1.response, id : _g.parentView.id}); else App.choice(null);
						});
					});
					_g.parentView.set_interactionState("selected");
					haxe_Log.trace(_g.activePanel.find("button[data-endaction=\"call\"]").length,{ fileName : "ContextMenu.hx", lineNumber : 160, className : "view.ContextMenu", methodName : "call"});
					_g.activePanel.find("button[data-endaction=\"call\"]").html("Anrufen");
				} else App.choice({ header : data.response, id : _g.parentView.id});
			});
			return;
		}
		var p = { className : "AgcApi", action : "external_dial", lead_id : editor.leadID, agent_user : editor.agent};
		this.parentView.loadData("server.php",p,function(data2) {
			haxe_Log.trace(data2,{ fileName : "ContextMenu.hx", lineNumber : 180, className : "view.ContextMenu", methodName : "call"});
			if(data2.response == "OK") {
				haxe_Log.trace("OK",{ fileName : "ContextMenu.hx", lineNumber : 182, className : "view.ContextMenu", methodName : "call"});
				_g.parentView.set_interactionState("call");
				haxe_Log.trace(_g.activePanel.find("button[data-endaction=\"call\"]").length,{ fileName : "ContextMenu.hx", lineNumber : 185, className : "view.ContextMenu", methodName : "call"});
				_g.activePanel.find("button[data-endaction=\"call\"]").html("Auflegen");
			}
		});
	}
	,createInputs: function() {
		var cData = this.vData;
		var i = 0;
		var _g = 0;
		var _g1 = cData.items;
		while(_g < _g1.length) {
			var aI = _g1[_g];
			++_g;
			if(aI.Select != null) this.addInputs(aI.Select,"Select");
		}
	}
	,create: function(event,ui) {
		this.action = new $(ui.panel[0]).find("input[name=\"action\"]").first().val();
		if(ui.panel.length > 0) this.activePanel = new $(ui.panel[0]);
		haxe_Log.trace(this.action,{ fileName : "ContextMenu.hx", lineNumber : 214, className : "view.ContextMenu", methodName : "create"});
	}
	,getIndexOf: function(act) {
		var index = null;
		Lambda.mapi(this.contextData.items,function(i,item) {
			if(item.action == act) index = i;
			return item;
		});
		return index;
	}
	,layout: function() {
		var maxWidth = 0;
		var maxHeight = 0;
		var jP = this.accordion.panels;
		var p = 0;
		var _g1 = 0;
		var _g = jP.length;
		while(_g1 < _g) {
			var p1 = _g1++;
			var jEl = new $(jP[p1]);
			if(p1 != this.active) jEl.css("visibility","hidden").show();
			maxWidth = Math.max(jEl.width(),maxWidth);
			maxHeight = Math.max(jEl.height(),maxHeight);
			if(p1 != this.active) jEl.hide(0).css("visibility","visible");
		}
		this.root.find("table").width(maxWidth);
		this.root.accordion("option","active",this.active);
	}
	,run: function(evt) {
		evt.preventDefault();
		var active = this.get_active();
		var jNode = jQuery_JHelper.J(js_Boot.__cast(evt.target , Node));
		this.action = this.vData.items[active].action;
		haxe_Log.trace(this.action + ":" + active,{ fileName : "ContextMenu.hx", lineNumber : 257, className : "view.ContextMenu", methodName : "run"});
		var endAction = jNode.data("endaction");
		haxe_Log.trace(this.action + ":" + endAction,{ fileName : "ContextMenu.hx", lineNumber : 260, className : "view.ContextMenu", methodName : "run"});
		var _g = this.action;
		switch(_g) {
		case "find":
			var fields = this.vData.items[active].fields;
			if(fields != null && fields.length > 0) {
				var where = jQuery_FormData.where(jNode.closest("form"),fields);
				haxe_Log.trace(where,{ fileName : "ContextMenu.hx", lineNumber : 269, className : "view.ContextMenu", methodName : "run"});
				var wM = new haxe_ds_StringMap();
				if(__map_reserved.where != null) wM.setReserved("where",where); else wM.h["where"] = where;
				Reflect.callMethod(this.parentView,Reflect.field(this.parentView,this.action),[wM]);
			}
			break;
		case "edit":
			var editor;
			editor = js_Boot.__cast(this.parentView.views.get(this.parentView.instancePath + "." + this.parentView.id + "-editor") , view_Editor);
			editor.endAction(endAction);
			break;
		case "mailings":
			var mailing;
			mailing = js_Boot.__cast(this.parentView.views.get(this.parentView.instancePath + "." + this.parentView.id + "-mailing") , view_Mailing);
			haxe_Log.trace(endAction,{ fileName : "ContextMenu.hx", lineNumber : 376, className : "view.ContextMenu", methodName : "run"});
			switch(endAction) {
			case "previewOne":
				mailing.previewOne(this.parentView.selectedID);
				break;
			case "printOne":
				mailing.printOne(this.parentView.selectedID);
				break;
			case "printNewMembers":
				mailing.printNewMembers();
				break;
			default:
				haxe_Log.trace(endAction,{ fileName : "ContextMenu.hx", lineNumber : 386, className : "view.ContextMenu", methodName : "run"});
			}
			break;
		default:
			haxe_Log.trace(this.action + ":" + endAction,{ fileName : "ContextMenu.hx", lineNumber : 389, className : "view.ContextMenu", methodName : "run"});
		}
	}
	,showResult: function(data,_) {
		haxe_Log.trace(data,{ fileName : "ContextMenu.hx", lineNumber : 395, className : "view.ContextMenu", methodName : "showResult"});
	}
	,__class__: view_ContextMenu
});
var view_DateTime = function(data) {
	var _g = this;
	View.call(this,data);
	this.interval = data.interval;
	this.format = data.format;
	var t = new haxe_Timer(this.interval);
	var d = new Date();
	this.template = new $("#t-" + this.id).tmpl({ datetime : jQuery_JHelper.vsprintf(this.format,[view_DateTime.wochentage[d.getDay()],d.getDate(),d.getMonth() + 1,d.getFullYear(),d.getHours(),d.getMinutes()])});
	this.draw();
	var start = d.getSeconds();
	if(start == 0) t.run = $bind(this,this.draw); else haxe_Timer.delay(function() {
		t.run = $bind(_g,_g.draw);
		_g.draw();
	},(60 - start) * 1000);
};
$hxClasses["view.DateTime"] = view_DateTime;
view_DateTime.__name__ = ["view","DateTime"];
view_DateTime.__super__ = View;
view_DateTime.prototype = $extend(View.prototype,{
	format: null
	,interval: null
	,draw: function() {
		var d = new Date();
		this.template.html(jQuery_JHelper.vsprintf(this.format,[view_DateTime.wochentage[d.getDay()],d.getDate(),d.getMonth() + 1,d.getFullYear(),d.getHours(),d.getMinutes()]));
	}
	,__class__: view_DateTime
});
var view_Input = function(data) {
	if(!(data.limit > 0)) data.limit = 15;
	this.vData = data;
	this.hasData = data.db;
	this.parentView = data.parentView;
	this.name = Type.getClassName(js_Boot.getClass(this)).split(".").pop();
	this.id = this.parentView.id + "_" + Std.string(data.name);
	this.loading = 0;
};
$hxClasses["view.Input"] = view_Input;
view_Input.__name__ = ["view","Input"];
view_Input.prototype = {
	vData: null
	,params: null
	,name: null
	,id: null
	,loading: null
	,parentView: null
	,hasData: null
	,init: function() {
		var _g = this;
		if(this.hasData) this.loadData(this.resetParams(),function(data) {
			_g.update(data);
		});
	}
	,loadData: function(data,callBack) {
		var _g = this;
		var dependsOn = this.vData.dependsOn;
		if(dependsOn != null && dependsOn.length > 0) {
			if(!Lambda.foreach(dependsOn,function(s) {
				return _g.parentView.inputs.exists(s) && _g.parentView.inputs.get(s).loading == 0;
			})) {
				haxe_Log.trace(this.id + " still waiting on:" + dependsOn.toString(),{ fileName : "Input.hx", lineNumber : 52, className : "view.Input", methodName : "loadData"});
				var iK = this.parentView.inputs.keys();
				var ki = "";
				while(iK.hasNext()) ki += iK.next() + ",";
				return;
			}
		}
		haxe_Log.trace(this.id,{ fileName : "Input.hx", lineNumber : 62, className : "view.Input", methodName : "loadData"});
		this.loading++;
		$.post("server.php",data,function(data1,textStatus,xhr) {
			callBack(data1);
			_g.loading--;
		});
	}
	,resetParams: function(where) {
		this.params = { action : this.vData.action, className : this.name, dataType : "json", fields : [this.vData.value,this.vData.label].join(","), limit : this.vData.limit, table : this.vData.name};
		if(where != null) this.params.where = where;
		return this.params;
	}
	,update: function(data) {
		haxe_Log.trace("method has to be implemented by subclass",{ fileName : "Input.hx", lineNumber : 91, className : "view.Input", methodName : "update"});
	}
	,__class__: view_Input
};
var view_Mailing = function(data) {
	View.call(this,data);
	this.init();
};
$hxClasses["view.Mailing"] = view_Mailing;
view_Mailing.__name__ = ["view","Mailing"];
view_Mailing.__super__ = View;
view_Mailing.prototype = $extend(View.prototype,{
	cMenu: null
	,mailingID: null
	,printNewMembers: function() {
		window.postMessage({ action : "printAllWelcomeMessages", bin : "C:\\" + App.appName + "\\" + App.company + "\\bin\\druckeAnschreibenKinder.lnk", template : "C:/" + App.appName + "/" + App.company + "/Anschreiben/Kinder-Neu.odt"},window.location.origin);
	}
	,printOne: function(mID) {
		haxe_Log.trace(mID,{ fileName : "Mailing.hx", lineNumber : 32, className : "view.Mailing", methodName : "printOne"});
		window.postMessage({ action : "printWelcomeMessage", bin : "C:\\" + App.appName + "\\" + App.company + "\\bin\\druckeAnschreibenKinder.lnk", memberID : mID, template : "C:/" + App.appName + "/" + App.company + "/Anschreiben/Kinder-Neu.odt"},window.location.origin);
	}
	,previewOne: function(mID) {
	}
	,__class__: view_Mailing
});
var view_Pager = function(data) {
	var _g = this;
	var colspan = new $("#" + Std.string(data.id) + "-list tr").first().children().length;
	data.colspan = colspan;
	this.count = data.count;
	this.limit = data.limit;
	this.page = data.page;
	this.last = Math.ceil(this.count / this.limit);
	this.parentView = data.parentView;
	haxe_Log.trace(Std.string(data.id) + ":" + this.page + ":" + this.count,{ fileName : "Pager.hx", lineNumber : 28, className : "view.Pager", methodName : "new"});
	new $("#t-pager").tmpl(data).appendTo(new $("#" + Std.string(data.id) + "-list"));
	new $("#" + Std.string(data.id) + "-pager *[data-action]").each(function(i,n) {
		new $(n).click($bind(_g,_g.go));
	});
};
$hxClasses["view.Pager"] = view_Pager;
view_Pager.__name__ = ["view","Pager"];
view_Pager.prototype = {
	count: null
	,limit: null
	,page: null
	,last: null
	,parentView: null
	,go: function(evt) {
		evt.preventDefault();
		var action = new $(evt.target).data("action");
		haxe_Log.trace(action + ":" + this.page + ":" + this.count + ":" + this.last,{ fileName : "Pager.hx", lineNumber : 41, className : "view.Pager", methodName : "go"});
		switch(action) {
		case "go2page":
			var iVal = Std.parseInt(new $("#" + this.parentView.id + "-pager input[name=\"page\"]").val());
			if(iVal > this.last) {
				iVal = this.last;
				new $("#" + this.parentView.id + "-pager input[name=\"page\"]").val(Std.string(this.last));
			}
			if(iVal != this.page) this.loadPage(iVal);
			break;
		case "previous":
			if(this.page > 1) this.loadPage(--this.page);
			break;
		case "first":
			if(this.page > 1) this.loadPage(1);
			break;
		case "next":
			if(this.page < this.last) this.loadPage(++this.page);
			break;
		case "last":
			if(this.page < this.last) this.loadPage(this.last);
			break;
		}
	}
	,loadPage: function(p) {
		var param = new haxe_ds_StringMap();
		param.set("page",p == null?"null":"" + p);
		param.set("limit",(p - 1) * this.limit + "," + (p + this.limit <= this.count?this.limit:this.count - (p - 1) * this.limit));
		this.parentView.find(param);
	}
	,__class__: view_Pager
};
var view_QC = function(data) {
	var _g = this;
	View.call(this,data);
	this.addInteractionState("init",{ disables : ["call","close","save","qcok"], enables : ["find"]});
	this.addInteractionState("selected",{ disables : [], enables : ["call","close","save","qcok"]});
	this.addInteractionState("call",{ disables : ["close"], enables : ["call","save","qcok"]});
	this.listattach2 = data.listattach2;
	if(!(data.limit > 0)) data.limit = 15;
	haxe_Log.trace("#t-" + this.id + " attach2:" + data.attach2 + ":" + this.dbLoaderIndex,{ fileName : "QC.hx", lineNumber : 35, className : "view.QC", methodName : "new"});
	new $("#t-" + this.id).tmpl(data).appendTo(data.attach2);
	if(data.table != null) this.parentView.addDataLoader(this.listattach2,{ callBack : $bind(this,this.update), prepare : function() {
		_g.resetParams();
		if(_g.vData.order != null) _g.params.order = _g.vData.order;
		return _g.params;
	}, valid : false},this.dbLoaderIndex);
	if(data.views != null) this.addViews(data.views);
	this.edit = this.views.get(this.instancePath + "." + this.id + "-editor");
	haxe_Log.trace("found editor:" + this.instancePath + "." + this.id + "-editor :" + Std.string(this.edit.vData.id),{ fileName : "QC.hx", lineNumber : 56, className : "view.QC", methodName : "new"});
	this.init();
};
$hxClasses["view.QC"] = view_QC;
view_QC.__name__ = ["view","QC"];
view_QC.__super__ = View;
view_QC.prototype = $extend(View.prototype,{
	listattach2: null
	,edit: null
	,select: function(evt) {
		evt.preventDefault();
		haxe_Log.trace(new $(evt.target).get()[0].nodeName,{ fileName : "QC.hx", lineNumber : 63, className : "view.QC", methodName : "select"});
		if(App.ist.ctrlPressed) haxe_Log.trace("ctrlPressed",{ fileName : "QC.hx", lineNumber : 65, className : "view.QC", methodName : "select"});
		var jTarget = new $(evt.target).parent();
		if(jTarget.hasClass("selected")) {
			this.wait(false);
			jTarget.removeClass("selected");
		} else {
			jTarget.siblings().removeClass("selected");
			jTarget.addClass("selected");
			this.wait();
			this.edit.edit(jTarget);
		}
		if(jTarget.hasClass("selected")) this.set_interactionState("selected"); else this.set_interactionState("init");
	}
	,__class__: view_QC
});
var view_Select = function(data) {
	view_Input.call(this,data);
};
$hxClasses["view.Select"] = view_Select;
view_Select.__name__ = ["view","Select"];
view_Select.__super__ = view_Input;
view_Select.prototype = $extend(view_Input.prototype,{
	addDataLoader: function() {
		var _g = this;
		if(this.vData.db) this.parentView.addDataLoader(this.id,{ callBack : $bind(this,this.update), prepare : function() {
			_g.resetParams();
			if(_g.vData.order != null) _g.params.order = _g.vData.order;
			return _g.params;
		}, valid : false},this.parentView.dbLoaderIndex);
	}
	,resetParams: function(where) {
		this.params = { action : this.vData.action, className : this.name, dataType : "json", fields : [this.vData.value,this.vData.label].join(","), limit : this.vData.limit, table : this.vData.table};
		if(this.vData.where != null) {
			var whereCheck = this.vData.where.check;
			var whereParam = [];
			if(this.vData.check) {
				var checks = this.vData.check;
				var _g = 0;
				while(_g < checks.length) {
					var c = checks[_g];
					++_g;
					if(Lambda.has(whereCheck,c.name)) whereParam.push(c.name + "|" + (c.checked?"Y":"N"));
				}
				if(whereParam.length > 0) this.params.where = whereParam.join(",");
			}
		}
		return this.params;
	}
	,update: function(data) {
		haxe_Log.trace("#t-" + Std.string(this.vData.name) + " appending2:" + this.id,{ fileName : "Select.hx", lineNumber : 72, className : "view.Select", methodName : "update"});
		new $("#t-" + Std.string(this.vData.name)).tmpl(data).appendTo(new $("#" + this.id));
	}
	,__class__: view_Select
});
var view_TabBox = function(data) {
	var _g = this;
	View.call(this,data);
	this.tabLabel = [];
	this.tabLinks = [];
	if(data != null) {
		this.tabBoxData = data;
		if(this.tabBoxData.isNav) {
			pushstate_PushState.init();
			pushstate_PushState.addEventListener($bind(this,this.go));
		}
		this.active = 0;
		var _g1 = 0;
		var _g11 = this.tabBoxData.tabs;
		while(_g1 < _g11.length) {
			var tab = _g11[_g1];
			++_g1;
			if(tab.id == this.tabBoxData.action) this.active = this.tabLinks.length;
			this.tabLabel.push(tab.label);
			this.tabLinks.push(tab.id);
			this.dbLoader.push(new haxe_ds_StringMap());
		}
		haxe_Log.trace(this.id + ":" + this.dbLoader.length,{ fileName : "TabBox.hx", lineNumber : 80, className : "view.TabBox", methodName : "new"});
		new $("#t-" + this.id).tmpl(this.tabBoxData.tabs).appendTo(this.root.find("ul:first"));
		this.tabObj = js_JqueryUI.tabs(this.root,{ active : this.active, activate : function(event,ui) {
			haxe_Log.trace("activate:" + ui.newPanel.selector + ":" + ui.newTab.context + ":" + Std.string(_g.tabsInstance.options.active) + ":" + _g.active,{ fileName : "TabBox.hx", lineNumber : 89, className : "view.TabBox", methodName : "new"});
			_g.dbLoaderIndex = _g.active = _g.tabsInstance.options.active;
			pushstate_PushState.replace(Std.string(ui.newTab.context).split(window.location.hostname).pop());
			_g.runLoaders();
		}, create : function(event1,ui1) {
			_g.tabsInstance = js_JqueryUI.tabs(new $("#" + _g.id),"instance");
			haxe_Log.trace("ready2load content4tabs:" + _g.tabBoxData.tabs.length,{ fileName : "TabBox.hx", lineNumber : 98, className : "view.TabBox", methodName : "new"});
			if(_g.tabBoxData.append2header != null) {
				var views = App.getViews();
				views.get(App.appName + "." + _g.tabBoxData.append2header).template.appendTo(new $("#" + _g.id + " ul"));
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
					v.dbLoaderIndex = tabIndex;
					v.attach2 = _g.tabsInstance.panels[tabIndex];
					var jP = new $(_g.tabsInstance.panels[tabIndex]);
					if(tabIndex != _g.active) jP.css("visibility","hidden").show();
					haxe_Log.trace("adding:" + t.id + " to:" + _g.id + " @:" + tabIndex,{ fileName : "TabBox.hx", lineNumber : 121, className : "view.TabBox", methodName : "new"});
					_g.addView(v);
					if(tabIndex != _g.active) jP.hide(0).css("visibility","visible");
				}
				tabIndex++;
			}
		}, beforeLoad : function(event2,ui2) {
			haxe_Log.trace("beforeLoad " + ui2.ajaxSettings.url,{ fileName : "TabBox.hx", lineNumber : 132, className : "view.TabBox", methodName : "new"});
			return false;
		}, heightStyle : this.tabBoxData.heightStyle == null?"auto":this.tabBoxData.heightStyle});
		haxe_Log.trace(this.tabsInstance.option("active"),{ fileName : "TabBox.hx", lineNumber : 139, className : "view.TabBox", methodName : "new"});
		haxe_Log.trace(this.dbLoader.length + ":" + this.active,{ fileName : "TabBox.hx", lineNumber : 140, className : "view.TabBox", methodName : "new"});
	}
	this.init();
};
$hxClasses["view.TabBox"] = view_TabBox;
view_TabBox.__name__ = ["view","TabBox"];
view_TabBox.__super__ = View;
view_TabBox.prototype = $extend(View.prototype,{
	active: null
	,tabBoxData: null
	,tabsInstance: null
	,tabObj: null
	,tabLinks: null
	,tabLabel: null
	,go: function(url,p) {
		haxe_Log.trace(url,{ fileName : "TabBox.hx", lineNumber : 149, className : "view.TabBox", methodName : "go"});
		if(!(typeof(url) == "string")) {
			me_cunity_debug_Out.dumpStack(haxe_CallStack.callStack(),{ fileName : "TabBox.hx", lineNumber : 153, className : "view.TabBox", methodName : "go"});
			return;
		}
		var p1 = url.split(App.basePath);
		if(p1.length == 2 && p1[1] == "") p1[1] = this.tabLinks[0]; else if(p1.length == 1) p1[1] = url;
		if(this.tabsInstance.options.active == HxOverrides.indexOf(this.tabLinks,p1[1],0)) return;
		if(this.tabLinks[this.tabsInstance.options.active] != p1[1]) {
			haxe_Log.trace(this.id + " root:" + this.root.attr("id"),{ fileName : "TabBox.hx", lineNumber : 169, className : "view.TabBox", methodName : "go"});
			if(this.tabObj != null) this.tabObj.tabs("option","active",HxOverrides.indexOf(this.tabLinks,p1[1],0));
		}
		window.document.title = App.company + " " + App.appName + "  " + this.tabLabel[this.tabsInstance.options.active];
	}
	,__class__: view_TabBox
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
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
me_cunity_debug_Out.suspended = false;
me_cunity_debug_Out.skipFunctions = true;
me_cunity_debug_Out.traceToConsole = false;
me_cunity_debug_Out.traceTarget = me_cunity_debug_DebugOutput.NATIVE;
me_cunity_debug_Out.aStack = haxe_CallStack.callStack;
view_DateTime.wochentage = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
view_DateTime.monate = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
App.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
