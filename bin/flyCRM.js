(function ($hx_exports, $global) { "use strict";
$hx_exports["me"] = $hx_exports["me"] || {};
$hx_exports["me"]["cunity"] = $hx_exports["me"]["cunity"] || {};
$hx_exports["me"]["cunity"]["debug"] = $hx_exports["me"]["cunity"]["debug"] || {};
$hx_exports["me"]["cunity"]["debug"]["Out"] = $hx_exports["me"]["cunity"]["debug"]["Out"] || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() {
	this.views = new haxe_ds_StringMap();
};
$hxClasses["App"] = App;
App.__name__ = "App";
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
	haxe_Log.trace(form.attr("id") + ":" + Std.string(inputs),{ fileName : "src/App.hx", lineNumber : 67, className : "App", methodName : "inputError"});
	form.find("input").each(function(i,n) {
		if(Lambda.has(inputs,$(n).attr("name"))) {
			$(n).addClass("error");
		}
	});
};
App.choice = $hx_exports["choice"] = function(data) {
	if(data != null && data.id != null) {
		$("#t-choice").tmpl(data).appendTo("#" + Std.string(data.id)).css({ width : $(window).width(), height : $(window).height()}).animate({ opacity : 1});
		haxe_Log.trace(Std.string(data.id) + ":" + $("#" + Std.string(data.id) + " .overlay .scrollbox").length + ":" + $("#" + Std.string(data.id) + " .overlay").height(),{ fileName : "src/App.hx", lineNumber : 85, className : "App", methodName : "choice"});
		$("#" + Std.string(data.id) + " .overlay .scrollbox").height($("#" + Std.string(data.id) + " .overlay").height());
	} else {
		$("#choice").hide(300,null,function() {
			$("#choice").remove();
		});
	}
};
App.modal = $hx_exports["modal"] = function(mID,data) {
	haxe_Log.trace(data,{ fileName : "src/App.hx", lineNumber : 95, className : "App", methodName : "modal"});
	if(data != null && data.mID != null) {
		$("#t-" + mID).tmpl(data).appendTo("#" + Std.string(data.id)).css({ width : $(window).width(), height : $(window).height()}).animate({ opacity : 1});
		haxe_Log.trace(Std.string(data.id) + ":" + $("#" + Std.string(data.id) + " .overlay .scrollbox").length + ":" + $("#" + Std.string(data.id) + " .overlay").height(),{ fileName : "src/App.hx", lineNumber : 99, className : "App", methodName : "modal"});
		$("#" + Std.string(data.id) + " .overlay .scrollbox").height($("#" + Std.string(data.id) + " .overlay").height());
	} else {
		$("#" + mID).hide(300,null,function() {
			$("#" + mID).remove();
		});
	}
};
App.info = $hx_exports["info"] = function(data) {
	haxe_Log.trace(data,{ fileName : "src/App.hx", lineNumber : 109, className : "App", methodName : "info"});
	if(data.target == null && data.id != null) {
		$("#t-info").tmpl(data).appendTo("#" + Std.string(data.id)).css({ width : $(window).width() - 440 + "px", height : "100px", margin : $(window).height() - 200 + "px 0 0 100px"}).animate({ opacity : 1});
		haxe_Log.trace(Std.string(data.id) + ":" + $("#" + Std.string(data.id) + " .overlay .scrollbox").length + ":" + $("#" + Std.string(data.id) + " .overlay").height(),{ fileName : "src/App.hx", lineNumber : 114, className : "App", methodName : "info"});
	} else {
		$("#" + Std.string(data) + " #info").hide(300,null,function() {
			$("#" + Std.string(data) + " #info").remove();
		});
	}
};
App.init = $hx_exports["initApp"] = function(config) {
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
		if(Reflect.field(config,f) != null) {
			App[f] = Reflect.field(config,f);
		}
	}
	App.basePath = $global.location.pathname.split(config.appName)[0] + Std.string(config.appName) + "/";
	App.ist.globals = { firstLoad : true};
	App.ist.globals = { };
	return App.ist;
};
App.getMainSpace = function() {
	var navH = $(".ui-tabs-nav").outerHeight();
	return { top : navH + 5, left : 0, height : $(window).height() - parseFloat($("#mtabs").css("padding-top")) - parseFloat($("#mtabs").css("padding-bottom")) - navH, width : $(window).width() * .7};
};
App.getViews = function() {
	return App.ist.views;
};
App.dateSort = function(a,b) {
	window.dateSort(a,b);
};
App.prototype = {
	hasTabs: null
	,rootViewPath: null
	,globals: null
	,altPressed: null
	,ctrlPressed: null
	,shiftPressed: null
	,views: null
	,logTrace: function(logMsg,file) {
		if(file == null) {
			file = "/var/log/flyCRM/dev.log";
		}
		var p = { logFile : "/var/log/flyCRM/app.log", user : App.user, log : logMsg};
		$.post("/flyCRM/formLog2.php",p).done(function() {
			haxe_Log.trace("log success",{ fileName : "src/App.hx", lineNumber : 129, className : "App", methodName : "logTrace"});
		}).fail(function() {
			haxe_Log.trace("error",{ fileName : "src/App.hx", lineNumber : 132, className : "App", methodName : "logTrace"});
		});
	}
	,initUI: function(viewConfigs) {
		var _gthis = this;
		var _g = 0;
		while(_g < viewConfigs.length) {
			var v = viewConfigs[_g];
			++_g;
			var className = Reflect.fields(v)[0];
			var iParam = Reflect.field(v,className);
			var cl = $hxClasses["view." + className];
			if(cl != null) {
				var av = Type.createInstance(cl,[iParam]);
				this.views.h[av.instancePath] = av;
				haxe_Log.trace("views.set(" + av.instancePath + ")",{ fileName : "src/App.hx", lineNumber : 180, className : "App", methodName : "initUI"});
			}
		}
		$(window).keydown(function(evt) {
			switch(evt.which) {
			case 16:
				_gthis.shiftPressed = true;
				break;
			case 17:
				_gthis.ctrlPressed = true;
				break;
			case 18:
				_gthis.altPressed = true;
				break;
			}
		}).keyup(function(evt) {
			switch(evt.which) {
			case 16:
				_gthis.shiftPressed = false;
				break;
			case 17:
				_gthis.ctrlPressed = false;
				break;
			case 18:
				_gthis.altPressed = false;
				break;
			}
		});
		haxe_Timer.delay(function() {
			_gthis.views.h[_gthis.rootViewPath].runLoaders();
		},500);
	}
	,prepareAgentMap: function() {
		var agents = [["",""]];
		var users = App.ist.globals.userMap.users;
		var _g = 0;
		while(_g < users.length) {
			var u = users[_g];
			++_g;
			if(u.user_group.indexOf("AGENT") == 0 && u.active == "Y") {
				agents.push([u.user,u.full_name]);
			}
		}
		return agents;
	}
	,test: function() {
		var template = "{a} Hello {c} World!";
		var data = { a : 123, b : 333, c : "{nested}"};
		var t = "hello";
		haxe_Log.trace(t + ":" + t.indexOf("lo"),{ fileName : "src/App.hx", lineNumber : 252, className : "App", methodName : "test"});
		var ctempl = new EReg("{([a-x]*)}","g").map(template,function(r) {
			var m = r.matched(1);
			var d = Std.string(Reflect.field(data,m));
			if(d.indexOf("{") == 0) {
				haxe_Log.trace("nested template :) " + d.indexOf("{"),{ fileName : "src/App.hx", lineNumber : 259, className : "App", methodName : "test"});
			}
			return d;
		});
		haxe_Log.trace(ctempl,{ fileName : "src/App.hx", lineNumber : 262, className : "App", methodName : "test"});
	}
	,__class__: App
};
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = "DateTools";
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "A":
		return DateTools.DAY_NAMES[d.getDay()];
	case "B":
		return DateTools.MONTH_NAMES[d.getMonth()];
	case "C":
		return StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0 ? 12 : hour),e == "I" ? "0" : " ",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "Y":
		return Std.string(d.getFullYear());
	case "a":
		return DateTools.DAY_SHORT_NAMES[d.getDay()];
	case "b":case "h":
		return DateTools.MONTH_SHORT_NAMES[d.getMonth()];
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "e":
		return Std.string(d.getDate());
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H" ? "0" : " ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) {
			return "PM";
		} else {
			return "AM";
		}
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "s":
		return Std.string(d.getTime() / 1000 | 0);
	case "t":
		return "\t";
	case "u":
		var t = d.getDay();
		if(t == 0) {
			return "7";
		} else if(t == null) {
			return "null";
		} else {
			return "" + t;
		}
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	default:
		throw new haxe_exceptions_NotImplementedException("Date.format %" + e + "- not implemented yet.",null,{ fileName : "DateTools.hx", lineNumber : 101, className : "DateTools", methodName : "__format_get"});
	}
};
DateTools.__format = function(d,f) {
	var r_b = "";
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) {
			break;
		}
		var len = np - p;
		r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
		r_b += Std.string(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	var len = f.length - p;
	r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
	return r_b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = "Lambda";
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new haxe_ds_List();
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		l.add(i1);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new haxe_ds_List();
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(f(x1));
	}
	return l;
};
Lambda.mapi = function(it,f) {
	var l = new haxe_ds_List();
	var i = 0;
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(f(i++,x1));
	}
	return l;
};
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(!f(x1)) {
			return false;
		}
	}
	return true;
};
Lambda.forone = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.iter = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		f(x1);
	}
};
Lambda.filter = function(it,f) {
	var l = new haxe_ds_List();
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			l.add(x1);
		}
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var _ = $getIterator(it);
		while(_.hasNext()) {
			var _1 = _.next();
			++n;
		}
	} else {
		var x = $getIterator(it);
		while(x.hasNext()) {
			var x1 = x.next();
			if(pred(x1)) {
				++n;
			}
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$getIterator(it).hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var v2 = $getIterator(it);
	while(v2.hasNext()) {
		var v21 = v2.next();
		if(v == v21) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
Lambda.concat = function(a,b) {
	var l = new haxe_ds_List();
	var x = $getIterator(a);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(x1);
	}
	var x = $getIterator(b);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(x1);
	}
	return l;
};
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:true,__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
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
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var Util = function() { };
$hxClasses["Util"] = Util;
Util.__name__ = "Util";
Util.any2bool = function(v) {
	if(v != null && v != 0) {
		return v != "";
	} else {
		return false;
	}
};
Util.copyStringMap = function(source) {
	var copy = new haxe_ds_StringMap();
	var h = source.h;
	var keys_h = h;
	var keys_keys = Object.keys(h);
	var keys_length = keys_keys.length;
	var keys_current = 0;
	while(keys_current < keys_length) {
		var k = keys_keys[keys_current++];
		copy.h[k] = source.h[k];
	}
	return copy;
};
var View = function(data) {
	this.views = new haxe_ds_StringMap();
	this.inputs = new haxe_ds_StringMap();
	this.vData = data;
	var data1 = data;
	this.id = data1.id;
	this.parentView = data1.parentView;
	this.primary_id = data1.primary_id;
	if(this.parentView == null) {
		this.instancePath = App.appName + "." + this.id;
	} else {
		this.instancePath = this.parentView.instancePath + "." + this.id;
	}
	this.dbLoader = [];
	this.dbLoaderIndex = data1.dbLoaderIndex == null ? 0 : data1.dbLoaderIndex;
	if((((this) instanceof view_TabBox) ? this : null) == null) {
		this.dbLoader.push(new haxe_ds_StringMap());
	}
	this.attach2 = data1.attach2 == null ? "#" + this.id : data1.attach2;
	var c = js_Boot.getClass(this);
	this.name = c.__name__.split(".").pop();
	this.root = $("#" + this.id).css({ opacity : 0});
	haxe_Log.trace(this.name + ":" + this.id + ":" + this.root.length + ":" + $(this.attach2).attr("id") + ":" + this.dbLoaderIndex,{ fileName : "src/View.hx", lineNumber : 118, className : "View", methodName : "new"});
	this.interactionStates = new haxe_ds_StringMap();
	this.listening = new haxe_ds_ObjectMap();
	this.suspended = new haxe_ds_StringMap();
};
$hxClasses["View"] = View;
View.__name__ = "View";
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
	,contextMenu: null
	,id: null
	,instancePath: null
	,interactionState: null
	,inputs: null
	,selectedID: null
	,lastFindParam: null
	,reloadID: null
	,views: null
	,init: function() {
		this.loading = 0;
		if(this.loadingComplete()) {
			this.initState();
		} else {
			haxe_Timer.delay($bind(this,this.initState),1000);
		}
	}
	,set_interactionState: function(iState) {
		this.interactionState = iState;
		var iS = this.interactionStates.h[iState];
		haxe_Log.trace(this.id + ":" + iState + ":" + Std.string(iS),{ fileName : "src/View.hx", lineNumber : 137, className : "View", methodName : "set_interactionState"});
		if(iS == null) {
			return null;
		}
		var lIt = this.listening.keys();
		while(lIt.hasNext()) {
			var aListener = lIt.next();
			var aAction = this.listening.h[aListener.__id__];
			if(Lambda.has(iS.disables,aAction)) {
				aListener.prop("disabled",true);
			}
			if(Lambda.has(iS.enables,aAction)) {
				aListener.prop("disabled",false);
			}
		}
		haxe_Log.trace(iState,{ fileName : "src/View.hx", lineNumber : 155, className : "View", methodName : "set_interactionState"});
		return iState;
	}
	,addInteractionState: function(name,iS) {
		haxe_Log.trace(this.id + ":" + name + ":" + Std.string(iS),{ fileName : "src/View.hx", lineNumber : 161, className : "View", methodName : "addInteractionState"});
		this.interactionStates.h[name] = iS;
	}
	,addInputs: function(v,className) {
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
		haxe_Log.trace(className + ":" + Std.string(iParam.id),{ fileName : "src/View.hx", lineNumber : 181, className : "View", methodName : "addInput"});
		var cl = $hxClasses["view." + className];
		if(cl != null) {
			if(Object.prototype.hasOwnProperty.call(v,"attach2")) {
				iParam.attach2 = v.attach2;
			}
			iParam.parentView = this;
			aI = Type.createInstance(cl,[iParam]);
			this.inputs.h[iParam.id] = aI;
			if(iParam.db == 1) {
				aI.init();
			}
		}
		return aI;
	}
	,addListener: function(jListener) {
		var _gthis = this;
		jListener.each(function(i,n) {
			_gthis.listening.set($(n),$(n).data("contextaction"));
		});
	}
	,addView: function(v) {
		var av = null;
		var className = Reflect.fields(v)[0];
		var iParam = Reflect.field(v,className);
		haxe_Log.trace(this.name + ":" + className + ":" + this.dbLoader.length,{ fileName : "src/View.hx", lineNumber : 214, className : "View", methodName : "addView"});
		var cl = $hxClasses["view." + className];
		if(cl != null) {
			haxe_Log.trace(cl,{ fileName : "src/View.hx", lineNumber : 219, className : "View", methodName : "addView"});
			if(Object.prototype.hasOwnProperty.call(v,"attach2")) {
				iParam.attach2 = v.attach2;
			}
			if(Object.prototype.hasOwnProperty.call(v,"dbLoaderIndex")) {
				iParam.dbLoaderIndex = v.dbLoaderIndex;
			}
			iParam.parentView = this;
			av = Type.createInstance(cl,[iParam]);
			this.views.h[av.instancePath] = av;
			haxe_Log.trace("views.set(" + av.instancePath + ")",{ fileName : "src/View.hx", lineNumber : 228, className : "View", methodName : "addView"});
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
		haxe_Log.trace(this.id + ":" + (this.loadingComplete() ? "Y" : "N") + " :" + $("button[data-contextaction]").length,{ fileName : "src/View.hx", lineNumber : 247, className : "View", methodName : "initState"});
		if(!this.loadingComplete()) {
			haxe_Timer.delay($bind(this,this.initState),1000);
			return;
		}
		this.addListener($("#" + this.id + " button[data-contextaction]"));
		this.set_interactionState("init");
		$("td").attr("tabindex",-1);
		var el = $("#" + this.id).get()[0];
		haxe_Log.trace(this.id + " initState complete - we can show up :)" + ":" + Std.string(el),{ fileName : "src/View.hx", lineNumber : 257, className : "View", methodName : "initState"});
		$("#" + this.id).animate({ opacity : 1},300,"linear",function() {
		});
	}
	,loadingComplete: function() {
		if(this.loading > 0) {
			return false;
		}
		if(!Lambda.empty(this.inputs) && !Lambda.foreach(this.inputs,function(i) {
			return i.loading == 0;
		})) {
			return false;
		} else {
			return Lambda.foreach(this.views,function(v) {
				return v.loading == 0;
			});
		}
	}
	,suspendAll: function() {
	}
	,addDataLoader: function(loaderId,dL,loaderIndex) {
		if(loaderIndex == null) {
			loaderIndex = 0;
		}
		this.dbLoader[loaderIndex].h[loaderId] = dL;
		haxe_Log.trace(this.id + ":" + loaderIndex + ":" + loaderId,{ fileName : "src/View.hx", lineNumber : 286, className : "View", methodName : "addDataLoader"});
	}
	,loadAllData: function(loaderIndex) {
		if(loaderIndex == null) {
			loaderIndex = 0;
		}
		var dLoader = this.dbLoader[loaderIndex];
		var h = dLoader.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		haxe_Log.trace(Lambda.count(dLoader) + ":" + loaderIndex,{ fileName : "src/View.hx", lineNumber : 294, className : "View", methodName : "loadAllData"});
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			haxe_Log.trace(k,{ fileName : "src/View.hx", lineNumber : 297, className : "View", methodName : "loadAllData"});
			this.load(k,loaderIndex);
		}
	}
	,load: function(loaderId,loaderIndex) {
		if(loaderIndex == null) {
			loaderIndex = 0;
		}
		var _gthis = this;
		var loader = this.dbLoader[loaderIndex].h[loaderId];
		if(!loader.valid) {
			this.loadData("server.php",loader.prepare(),function(data) {
				data.loaderId = loaderId;
				haxe_Log.trace(_gthis.id + ":" + Std.string(data.fields) + ":" + Std.string(data.loaderId),{ fileName : "src/View.hx", lineNumber : 311, className : "View", methodName : "load"});
				loader.callBack(data);
				loader.valid = true;
			});
		}
	}
	,loadData: function(url,p,callBack) {
		var _gthis = this;
		this.loading++;
		$.post(url,p,function(data,textStatus,xhr) {
			callBack(data);
			_gthis.loading--;
		},"json");
	}
	,find: function(p) {
		this.lastFindParam = haxe_ds_StringMap.createCopy(p.h);
		var where = p.h["where"];
		var fData = { };
		var pkeys = "action,className,fields,primary_id,hidden,limit,order,page,pay_source,filter_tables,table,where,filter".split(",");
		var _g = 0;
		while(_g < pkeys.length) {
			var f = pkeys[_g];
			++_g;
			if(Reflect.field(this.vData,f) != null) {
				var tmp;
				if(f == "where") {
					var v = where;
					if(!(v != null && v != 0 && v != "")) {
						var v1 = this.vData.where;
						tmp = v1 != null && v1 != 0 && v1 != "";
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					var tmp1;
					var v2 = this.vData.where;
					if(v2 != null && v2 != 0 && v2 != "") {
						var v3 = where;
						tmp1 = Std.string(this.vData.where) + (v3 != null && v3 != 0 && v3 != "" ? "," + where : "");
					} else {
						tmp1 = where;
					}
					fData.where = tmp1;
				} else {
					fData[f] = Object.prototype.hasOwnProperty.call(p.h,f) ? p.h[f] : Reflect.field(this.vData,f);
				}
			}
			if(f != "where" && Object.prototype.hasOwnProperty.call(p.h,f)) {
				fData[f] = p.h[f];
			}
		}
		this.resetParams(fData);
		this.loadData("server.php",this.params,$bind(this,this.update));
	}
	,order: function(j) {
		if(this.params.order.indexOf(j.data("order")) == 0) {
			var tmp = Std.string(j.data("order"));
			var tmp1 = this.params.order.indexOf("ASC") > 0 ? "|DESC" : "|ASC";
			this.params.order = tmp + tmp1;
		} else {
			var tmp = Std.string(j.data("order"));
			this.params.order = tmp + "|ASC";
		}
		this.wait();
		this.loadData("server.php",this.params,$bind(this,this.update));
	}
	,resetParams: function(pData) {
		var pkeys = "action,className,fields,limit,order,page,table,jointable,filter_tables,pay_source,joincond,joinfields,where,filter".split(",");
		var aData = me_cunity_util_Data.copy(this.vData);
		if(pData != null) {
			var pFields = Reflect.fields(pData);
			var _g = 0;
			while(_g < pFields.length) {
				var f = pFields[_g];
				++_g;
				aData[f] = Reflect.field(pData,f);
			}
		}
		var v = aData.fields;
		this.fields = v != null && v != 0 && v != "" ? aData.fields.split(",") : null;
		var order = this.params == null ? null : this.params.order;
		this.params = { action : "find", firstLoad : App.ist.globals.firstLoad, className : this.name, instancePath : this.instancePath};
		App.ist.globals.firstLoad = false;
		var _g = 0;
		while(_g < pkeys.length) {
			var f = pkeys[_g];
			++_g;
			if(Reflect.field(aData,f) != null) {
				this.params[f] = Reflect.field(aData,f);
			}
		}
		if(order != null) {
			this.params.order = order;
		}
		return this.params;
	}
	,update: function(data) {
		var _gthis = this;
		var tmp = data.globals != null;
		data.fields = this.fields;
		data.hidden = this.vData.hidden;
		data.primary_id = this.primary_id;
		haxe_Log.trace(this.id + ":" + Std.string(data.fields) + ":" + Std.string(data.hidden) + ":" + Std.string(data.primary_id) + ":" + this.root.length,{ fileName : "src/View.hx", lineNumber : 421, className : "View", methodName : "update"});
		if($("#" + this.id + "-list").length > 0) {
			$("#" + this.id + "-list").replaceWith($("#t-" + this.id + "-list").tmpl(data));
		} else {
			$("#t-" + this.id + "-list").tmpl(data).appendTo($(data.loaderId).first());
		}
		$("#" + this.id + "-list th").each(function(i,el) {
			$(el).click(function(_) {
				_gthis.order($(el));
			});
		});
		$("#" + this.id + "-list tr").first().siblings().click($bind(this,this.select)).find("td").off("click");
		var limit = this.vData.limit > 0 ? this.vData.limit : App.limit;
		haxe_Log.trace("data.count:" + Std.string(data.count) + (" - limit " + limit + ":") + Std.string(this.vData.limit) + " _ " + App.limit,{ fileName : "src/View.hx", lineNumber : 433, className : "View", methodName : "update"});
		if(limit < data.count) {
			var pager = new view_Pager({ count : data.count, id : this.vData.id, limit : limit, page : data.page, parentView : this});
		}
		haxe_Log.trace(Std.string($("#" + this.id + "-menu").offset().left - 35) + " reloadID:" + this.reloadID,{ fileName : "src/View.hx", lineNumber : 446, className : "View", methodName : "update"});
		$(".main-left").width(Std.string($("#" + this.id + "-menu").offset().left - 35));
		haxe_Log.trace(Std.string($("#" + this.id + "-menu").offset().left - 35) + " reloadID:" + this.reloadID,{ fileName : "src/View.hx", lineNumber : 448, className : "View", methodName : "update"});
		this.wait(false);
		if(this.reloadID != null) {
			haxe_Log.trace("#" + this.reloadID + " : " + $("#" + this.reloadID).length,{ fileName : "src/View.hx", lineNumber : 452, className : "View", methodName : "update"});
			$("#" + this.reloadID).children().first().trigger("click");
			haxe_Log.trace(this.id + ":" + $("#" + this.id + "-list tr[class~=\"selected\"]").length,{ fileName : "src/View.hx", lineNumber : 454, className : "View", methodName : "update"});
			this.reloadID = null;
		}
	}
	,runLoaders: function() {
		haxe_Log.trace(this.dbLoaderIndex,{ fileName : "src/View.hx", lineNumber : 462, className : "View", methodName : "runLoaders"});
		this.loadAllData(this.dbLoaderIndex);
	}
	,select: function(evt) {
		haxe_Log.trace("has to be implemented in subclass!",{ fileName : "src/View.hx", lineNumber : 468, className : "View", methodName : "select"});
	}
	,wait: function(start,message,timeout) {
		if(timeout == null) {
			timeout = 15000;
		}
		if(start == null) {
			start = true;
		}
		var _gthis = this;
		if(!start && this.waiting != null) {
			this.waiting.stop();
			haxe_Log.trace($("#wait").length,{ fileName : "src/View.hx", lineNumber : 476, className : "View", methodName : "wait"});
			$("#wait").animate({ opacity : 0.0},300,null,function() {
				$("#wait").detach();
				haxe_Log.trace($("#wait").length,{ fileName : "src/View.hx", lineNumber : 477, className : "View", methodName : "wait"});
			});
			this.spinner.stop();
		}
		if(!start) {
			return;
		}
		if(message == null) {
			message = App.uiMessage.wait;
		}
		if(timeout == null) {
			timeout = App.waitTime;
		}
		$("#t-wait").tmpl({ wait : message}).appendTo("#" + this.id).css({ width : $(window).width(), height : $(window).height(), zIndex : 8000}).animate({ opacity : 0.8});
		this.spinner = window.spin("wait");
		if(message == App.uiMessage.retry || message == App.uiMessage.timeout) {
			this.waiting = haxe_Timer.delay(function() {
				_gthis.wait(false);
			},timeout);
		} else {
			haxe_Log.trace("set timeout:" + timeout + ":" + message,{ fileName : "src/View.hx", lineNumber : 498, className : "View", methodName : "wait"});
			this.waiting = haxe_Timer.delay(function() {
				_gthis.wait(true,App.uiMessage.timeout,3500);
			},timeout);
		}
	}
	,__class__: View
};
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:true,__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
var haxe_CallStack = {};
haxe_CallStack.callStack = function() {
	return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe_NativeStackTrace.wrapCallSite = null;
haxe_NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe_NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe_NativeStackTrace.normalize(stack,2);
};
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
	var stack = e.stack;
	Error.prepareStackTrace = oldValue;
	return stack;
};
haxe_NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe_NativeStackTrace.wrapCallSite != null) {
			site = haxe_NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				var className = fullName.substring(0,idx);
				var methodName = fullName.substring(idx + 1);
				method = haxe_StackItem.Method(className,methodName);
			} else {
				method = haxe_StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			return haxe_NativeStackTrace.skipLines(stack,--skip,pos + 1);
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = "haxe.Timer";
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
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.count = null;
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.createCopy = function(h) {
	var copy = new haxe_ds_StringMap();
	for (var key in h) copy.h[key] = h[key];
	return copy;
};
haxe_ds_StringMap.stringify = function(h) {
	var s = "{";
	var first = true;
	for (var key in h) {
		if (first) first = false; else s += ',';
		s += key + ' => ' + Std.string(h[key]);
	}
	return s + "}";
};
haxe_ds_StringMap.prototype = {
	h: null
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapValueIterator"] = haxe_ds__$StringMap_StringMapValueIterator;
haxe_ds__$StringMap_StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
haxe_ds__$StringMap_StringMapValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.h[this.keys[this.current++]];
	}
	,__class__: haxe_ds__$StringMap_StringMapValueIterator
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
$hxClasses["haxe.http.HttpBase"] = haxe_http_HttpBase;
haxe_http_HttpBase.__name__ = "haxe.http.HttpBase";
haxe_http_HttpBase.prototype = {
	url: null
	,responseBytes: null
	,responseAsString: null
	,postData: null
	,postBytes: null
	,headers: null
	,params: null
	,emptyOnData: null
	,setParameter: function(name,value) {
		var _g = 0;
		var _g1 = this.params.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.params[i].name == name) {
				this.params[i] = { name : name, value : value};
				return;
			}
		}
		this.params.push({ name : name, value : value});
	}
	,onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
	,__class__: haxe_http_HttpBase
};
var haxe_http_HttpJs = function(url) {
	this.async = true;
	this.withCredentials = false;
	haxe_http_HttpBase.call(this,url);
};
$hxClasses["haxe.http.HttpJs"] = haxe_http_HttpJs;
haxe_http_HttpJs.__name__ = "haxe.http.HttpJs";
haxe_http_HttpJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	async: null
	,withCredentials: null
	,req: null
	,request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( _g ) {
				s = null;
			}
			if(s == 0 && js_Browser.get_supported() && $global.location != null) {
				var protocol = $global.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					s = r.response != null ? 200 : 404;
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				_gthis.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				_gthis.req = null;
				_gthis.success(haxe_io_Bytes.ofData(r.response));
			} else if(s == null || s == 0 && r.response == null) {
				_gthis.req = null;
				_gthis.onError("Failed to connect or resolve host");
			} else if(s == null) {
				_gthis.req = null;
				var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
				_gthis.responseBytes = onreadystatechange;
				_gthis.onError("Http Error #" + r.status);
			} else {
				switch(s) {
				case 12007:
					_gthis.req = null;
					_gthis.onError("Unknown host");
					break;
				case 12029:
					_gthis.req = null;
					_gthis.onError("Failed to connect to host");
					break;
				default:
					_gthis.req = null;
					var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
					_gthis.responseBytes = onreadystatechange;
					_gthis.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri;
		var _g = this.postData;
		var _g1 = this.postBytes;
		if(_g == null) {
			if(_g1 == null) {
				uri = null;
			} else {
				var bytes = _g1;
				uri = new Blob([bytes.b.bufferValue]);
			}
		} else if(_g1 == null) {
			var str = _g;
			uri = str;
		} else {
			uri = null;
		}
		if(uri != null) {
			post = true;
		} else {
			var _g = 0;
			var _g1 = this.params;
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri == null) {
					uri = "";
				} else {
					uri = (uri == null ? "null" : Std.string(uri)) + "&";
				}
				var s = p.name;
				var value = (uri == null ? "null" : Std.string(uri)) + encodeURIComponent(s) + "=";
				var s1 = p.value;
				uri = value + encodeURIComponent(s1);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + (uri == null ? "null" : Std.string(uri)),this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
			r.responseType = "arraybuffer";
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			this.req = null;
			this.onError(e.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.name == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			r.setRequestHeader(h.name,h.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
	,__class__: haxe_http_HttpJs
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__toStr = null;
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = "js.Browser";
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
var js_jquery_JqEltsIterator = function(j) {
	this.i = 0;
	this.j = j;
};
$hxClasses["js.jquery.JqEltsIterator"] = js_jquery_JqEltsIterator;
js_jquery_JqEltsIterator.__name__ = "js.jquery.JqEltsIterator";
js_jquery_JqEltsIterator.prototype = {
	j: null
	,i: null
	,hasNext: function() {
		return this.i < this.j.length;
	}
	,next: function() {
		return $(this.j[this.i++]);
	}
	,__class__: js_jquery_JqEltsIterator
};
var js_jquery_JqIterator = function(j) {
	this.i = 0;
	this.j = j;
};
$hxClasses["js.jquery.JqIterator"] = js_jquery_JqIterator;
js_jquery_JqIterator.__name__ = "js.jquery.JqIterator";
js_jquery_JqIterator.prototype = {
	j: null
	,i: null
	,hasNext: function() {
		return this.i < this.j.length;
	}
	,next: function() {
		return this.j[this.i++];
	}
	,__class__: js_jquery_JqIterator
};
var me_cunity_debug_DebugOutput = $hxEnums["me.cunity.debug.DebugOutput"] = { __ename__:true,__constructs__:null
	,CONSOLE: {_hx_name:"CONSOLE",_hx_index:0,__enum__:"me.cunity.debug.DebugOutput",toString:$estr}
	,HAXE: {_hx_name:"HAXE",_hx_index:1,__enum__:"me.cunity.debug.DebugOutput",toString:$estr}
	,NATIVE: {_hx_name:"NATIVE",_hx_index:2,__enum__:"me.cunity.debug.DebugOutput",toString:$estr}
};
me_cunity_debug_DebugOutput.__constructs__ = [me_cunity_debug_DebugOutput.CONSOLE,me_cunity_debug_DebugOutput.HAXE,me_cunity_debug_DebugOutput.NATIVE];
var me_cunity_debug_Out = $hx_exports["Out"] = function() { };
$hxClasses["me.cunity.debug.Out"] = me_cunity_debug_Out;
me_cunity_debug_Out.__name__ = "me.cunity.debug.Out";
me_cunity_debug_Out.logg = null;
me_cunity_debug_Out.dumpedObjects = null;
me_cunity_debug_Out._trace = function(v,i) {
	if(me_cunity_debug_Out.suspended) {
		return;
	}
	var warned = false;
	if(i != null && Object.prototype.hasOwnProperty.call(i,"customParams")) {
		i = i.customParams[0];
	}
	var msg = i != null ? i.fileName + ":" + i.methodName + ":" + i.lineNumber + ":" : "";
	msg += Std.string(v);
	switch(me_cunity_debug_Out.traceTarget._hx_index) {
	case 0:
		debug(msg);
		break;
	case 1:
		var msg1 = i != null ? i.fileName + ":" + i.lineNumber + ":" + i.methodName + ":" : "";
		msg1 += Std.string(v) + "<br/>";
		var d = window.document.getElementById("haxe:trace");
		if(d == null && !warned) {
			warned = true;
			alert("No haxe:trace element defined\n" + msg1);
		} else {
			d.innerHTML += msg1;
		}
		break;
	case 2:
		console.log(msg);
		break;
	}
};
me_cunity_debug_Out.log2 = function(v,i) {
	var msg = i != null ? i.fileName + ":" + i.lineNumber + ":" + i.methodName + ":" : "";
	msg += Std.string(v);
	var http = new haxe_http_HttpJs("http://localhost/devel/php/jsLog.php");
	http.setParameter("log",msg);
	http.async = true;
	http.onData = function(data) {
		if(data != "OK") {
			haxe_Log.trace(data,{ fileName : "../lib/me/cunity/debug/Out.hx", lineNumber : 207, className : "me.cunity.debug.Out", methodName : "log2"});
		}
	};
	http.request(true);
};
me_cunity_debug_Out.dumpObjectRSafe = function(root,recursive,i) {
	if(recursive == null) {
		recursive = false;
	}
	var oCopy = { };
	var _g = 0;
	var _g1 = Reflect.fields(root);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		if(f == "parentView") {
			oCopy.parentView = root.parentView.instancePath;
			continue;
		}
		oCopy[f] = Reflect.field(root,f);
	}
	me_cunity_debug_Out.dumpObject(oCopy,i);
};
me_cunity_debug_Out.dumpObjectTree = $hx_exports["me"]["cunity"]["debug"]["Out"]["dumpObjectTree"] = function(root,recursive,i) {
	if(recursive == null) {
		recursive = false;
	}
	me_cunity_debug_Out.dumpedObjects = [];
	me_cunity_debug_Out._dumpObjectTree(root,Type.typeof(root),recursive,i);
};
me_cunity_debug_Out._dumpObjectTree = function(root,parent,recursive,i) {
	var m;
	if(js_Boot.getClass(root) != null) {
		var c = js_Boot.getClass(root);
		m = c.__name__;
	} else {
		var e = Type.typeof(root);
		m = $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
	}
	var fields = js_Boot.getClass(root) != null ? Type.getInstanceFields(js_Boot.getClass(root)) : Reflect.fields(root);
	if(m == "String") {
		me_cunity_debug_Out._trace(Std.string(root) + " len:" + Std.string(root.length),i);
	} else {
		me_cunity_debug_Out.dumpedObjects.push(root);
		me_cunity_debug_Out._trace(m + " fields:" + fields.length + ":" + fields.slice(0,5).toString(),i);
	}
	try {
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			haxe_Log.trace(f,{ fileName : "../lib/me/cunity/debug/Out.hx", lineNumber : 313, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree", customParams : [i]});
			if(recursive) {
				if(me_cunity_debug_Out.dumpedObjects.length > 1000) {
					me_cunity_debug_Out._trace(me_cunity_debug_Out.dumpedObjects.toString(),i);
					throw haxe_Exception.thrown("oops");
				} else {
					var _o = root[f];
					if(!Lambda.has(me_cunity_debug_Out.dumpedObjects,_o)) {
						me_cunity_debug_Out._dumpObjectTree(_o,Type.typeof(_o),true,i);
					}
				}
			}
		}
	} catch( _g ) {
		var ex = haxe_Exception.caught(_g).unwrap();
		haxe_Log.trace(ex,{ fileName : "../lib/me/cunity/debug/Out.hx", lineNumber : 337, className : "me.cunity.debug.Out", methodName : "_dumpObjectTree"});
	}
};
me_cunity_debug_Out.dumpObject = function(ob,i) {
	var tClass = js_Boot.getClass(ob);
	var m = "dumpObject:" + Std.string(ob != null ? js_Boot.getClass(ob) : ob) + "\n";
	var names = [];
	names = js_Boot.getClass(ob) != null ? Type.getInstanceFields(js_Boot.getClass(ob)) : Reflect.fields(ob);
	if(js_Boot.getClass(ob) != null) {
		var c = js_Boot.getClass(ob);
		m = c.__name__ + ":\n";
	}
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		if(Lambda.has(me_cunity_debug_Out.skipFields,name)) {
			m += "" + name + ":skipped\n";
			continue;
		}
		try {
			var t = Std.string(Type.typeof(Reflect.field(ob,name)));
			var tmp = me_cunity_debug_Out.skipFunctions && t == "TFunction";
			m += name + ":" + Std.string(Reflect.field(ob,name)) + ":" + t + "\n";
		} catch( _g1 ) {
			var ex = haxe_Exception.caught(_g1).unwrap();
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
	haxe_Log.trace(b.b,{ fileName : "../lib/me/cunity/debug/Out.hx", lineNumber : 406, className : "me.cunity.debug.Out", methodName : "dumpStack", customParams : [i]});
};
me_cunity_debug_Out.itemToString = function(s,b) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s.m;
		b.b += "module ";
		b.b += m == null ? "null" : "" + m;
		break;
	case 2:
		var _g = s.column;
		var s1 = s.s;
		var file = s.file;
		var line = s.line;
		if(s1 != null) {
			me_cunity_debug_Out.itemToString(s1,b);
			b.b += " (";
		}
		b.b += file == null ? "null" : "" + file;
		b.b += " line ";
		b.b += line == null ? "null" : "" + line;
		if(s1 != null) {
			b.b += ")\n";
		}
		break;
	case 3:
		var cname = s.classname;
		var meth = s.method;
		b.b += cname == null ? "null" : "" + cname;
		b.b += ".";
		b.b += meth == null ? "null" : "" + meth;
		b.b += "\n";
		break;
	case 4:
		var v = s.v;
		b.b += Std.string("LocalFunction:" + v);
		break;
	}
};
me_cunity_debug_Out.fTrace = function(str,arr,i) {
	var str_arr = str.split(" @");
	var str_buf_b = "";
	var _g = 0;
	var _g1 = str_arr.length;
	while(_g < _g1) {
		var i1 = _g++;
		str_buf_b += Std.string(str_arr[i1]);
		if(arr[i1] != null) {
			str_buf_b += Std.string(arr[i1]);
		}
	}
	me_cunity_debug_Out._trace(str_buf_b,i);
};
var me_cunity_js_data_IBAN = function() { };
$hxClasses["me.cunity.js.data.IBAN"] = me_cunity_js_data_IBAN;
me_cunity_js_data_IBAN.__name__ = "me.cunity.js.data.IBAN";
me_cunity_js_data_IBAN.buildIBAN = function(account,bankCode,onSuccess,onError) {
	buildIBAN(account,bankCode,onSuccess,onError);
};
me_cunity_js_data_IBAN.checkIBAN = function(iban) {
	return checkIBAN(iban);
};
var me_cunity_util_Data = function() { };
$hxClasses["me.cunity.util.Data"] = me_cunity_util_Data;
me_cunity_util_Data.__name__ = "me.cunity.util.Data";
me_cunity_util_Data.copy = function(source) {
	var c = { };
	var fields = Reflect.fields(source);
	var _g = 0;
	while(_g < fields.length) {
		var f = fields[_g];
		++_g;
		c[f] = Reflect.field(source,f);
	}
	return c;
};
me_cunity_util_Data.mcopy = function(source,target) {
	var c = target == null ? new haxe_ds_StringMap() : target;
	var h = source.h;
	var _g_h = h;
	var _g_keys = Object.keys(h);
	var _g_length = _g_keys.length;
	var _g_current = 0;
	while(_g_current < _g_length) {
		var k = _g_keys[_g_current++];
		c.h[k] = source.h[k];
	}
	return c;
};
me_cunity_util_Data.copy2map = function(source) {
	var c = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(source);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		c.h[k] = Reflect.field(source,k);
	}
	return c;
};
var pushstate_PushState = function() { };
$hxClasses["pushstate.PushState"] = pushstate_PushState;
pushstate_PushState.__name__ = "pushstate.PushState";
pushstate_PushState.basePath = null;
pushstate_PushState.preventers = null;
pushstate_PushState.listeners = null;
pushstate_PushState.uploadCache = null;
pushstate_PushState.currentPath = null;
pushstate_PushState.currentState = null;
pushstate_PushState.currentUploads = null;
pushstate_PushState.init = function(basePath,triggerFirst,ignoreAnchors) {
	if(ignoreAnchors == null) {
		ignoreAnchors = true;
	}
	if(triggerFirst == null) {
		triggerFirst = true;
	}
	if(basePath == null) {
		basePath = "";
	}
	pushstate_PushState.listeners = [];
	pushstate_PushState.preventers = [];
	pushstate_PushState.uploadCache = new haxe_ds_StringMap();
	pushstate_PushState.basePath = basePath;
	pushstate_PushState.ignoreAnchors = ignoreAnchors;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		window.document.addEventListener("click",function(e) {
			if(e.button == 0 && !e.metaKey && !e.ctrlKey) {
				var link = null;
				var value = e.target;
				var node = ((value) instanceof Node) ? value : null;
				while(link == null && node != null) {
					link = ((node) instanceof HTMLAnchorElement) ? node : null;
					node = node.parentNode;
				}
				if(link != null && (link.rel == "pushstate" || link.classList.contains("pushstate"))) {
					pushstate_PushState.push(link.pathname + link.search + link.hash);
					e.preventDefault();
				}
			}
		});
		window.document.addEventListener("submit",function(e) {
			var value = e.target;
			var form = ((value) instanceof HTMLFormElement) ? value : null;
			if(form.classList.contains("pushstate")) {
				e.preventDefault();
				pushstate_PushState.interceptFormSubmit(form);
			}
		});
		window.onpopstate = pushstate_PushState.handleOnPopState;
		if(triggerFirst) {
			pushstate_PushState.handleOnPopState(null);
		} else {
			pushstate_PushState.currentPath = pushstate_PushState.stripURL(window.document.location.pathname + window.document.location.search + window.document.location.hash);
			pushstate_PushState.currentState = null;
			pushstate_PushState.currentUploads = null;
		}
	});
};
pushstate_PushState.hasClass = function(elm,className) {
	return elm.classList.contains(className);
};
pushstate_PushState.interceptFormSubmit = function(form) {
	var params = [];
	var uploads = null;
	var addParam = function(name,val) {
		if(name == null || name == "") {
			return;
		}
		params.push({ name : name, val : val});
	};
	var addUpload = function(name,files) {
		var _g = 0;
		var _g1 = files.length;
		while(_g < _g1) {
			var i = _g++;
			addParam(name,files[i].name);
		}
		if(uploads == null) {
			uploads = { };
		}
		uploads[name] = files;
	};
	var _g = 0;
	var _g1 = form.elements.length;
	while(_g < _g1) {
		var i = _g++;
		var elm = form.elements.item(i);
		switch(elm.nodeName.toUpperCase()) {
		case "INPUT":
			var input = ((elm) instanceof HTMLInputElement) ? elm : null;
			switch(input.type) {
			case "file":
				if(input.files != null && input.files.length > 0) {
					addUpload(input.name,input.files);
				}
				break;
			case "checkbox":case "radio":
				if(input.checked) {
					addParam(input.name,input.value);
				}
				break;
			case "color":case "date":case "datetime":case "datetime-local":case "email":case "hidden":case "month":case "number":case "password":case "range":case "search":case "tel":case "text":case "time":case "url":case "week":
				addParam(input.name,input.value);
				break;
			}
			break;
		case "SELECT":
			var select = ((elm) instanceof HTMLSelectElement) ? elm : null;
			switch(select.type) {
			case "select-multiple":
				var _g2 = 0;
				var _g3 = select.options.length;
				while(_g2 < _g3) {
					var j = _g2++;
					var option = select.options[j];
					if(option.selected) {
						addParam(select.name,option.value);
					}
				}
				break;
			case "select-one":
				addParam(select.name,select.value);
				break;
			}
			break;
		case "TEXTAREA":
			var ta = ((elm) instanceof HTMLTextAreaElement) ? elm : null;
			addParam(ta.name,ta.value);
			break;
		}
	}
	var value = window.document.activeElement;
	var activeInput = ((value) instanceof HTMLInputElement) ? value : null;
	var value = window.document.activeElement;
	var activeBtn = ((value) instanceof HTMLButtonElement) ? value : null;
	if(activeInput != null && activeInput.type == "submit") {
		addParam(activeInput.name,activeInput.value);
	} else if(activeBtn != null && activeBtn.type == "submit") {
		addParam(activeBtn.name,activeBtn.value);
	} else {
		var defaultSubmit = form.querySelector("input[type=submit], button[type=submit]");
		var defaultInput = ((defaultSubmit) instanceof HTMLInputElement) ? defaultSubmit : null;
		var defaultBtn = ((defaultSubmit) instanceof HTMLButtonElement) ? defaultSubmit : null;
		if(defaultInput != null) {
			addParam(defaultInput.name,defaultInput.value);
		} else if(defaultBtn != null) {
			addParam(defaultBtn.name,defaultBtn.value);
		}
	}
	var result = new Array(params.length);
	var _g = 0;
	var _g1 = params.length;
	while(_g < _g1) {
		var i = _g++;
		var p = params[i];
		var s = p.val;
		result[i] = "" + p.name + "=" + encodeURIComponent(s);
	}
	var paramString = result.join("&");
	if(form.method.toUpperCase() == "POST") {
		var paramsObj = { };
		var _g = 0;
		while(_g < params.length) {
			var p = params[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(paramsObj,p.name)) {
				Reflect.field(paramsObj,p.name).push(p.val);
			} else {
				paramsObj[p.name] = [p.val];
			}
		}
		paramsObj["__postData"] = paramString;
		if(uploads != null) {
			pushstate_PushState.setUploadsForState(form.action,paramsObj,uploads);
		}
		pushstate_PushState.push(form.action,paramsObj,uploads);
	} else {
		pushstate_PushState.push(form.action + "?" + paramString,null);
	}
};
pushstate_PushState.setUploadsForState = function(url,state,uploads) {
	var timestamp = HxOverrides.dateStr(new Date());
	var random = Math.random();
	var uploadCacheID = "" + url + "-" + timestamp + "-" + random;
	pushstate_PushState.uploadCache.h[uploadCacheID] = uploads;
	state["__postFilesCacheID"] = uploadCacheID;
};
pushstate_PushState.getUploadsForState = function(state) {
	if(state == null || Object.prototype.hasOwnProperty.call(state,"__postFilesCacheID") == false) {
		return null;
	}
	var uploadCacheID = state.__postFilesCacheID;
	if(Object.prototype.hasOwnProperty.call(pushstate_PushState.uploadCache.h,uploadCacheID) == false) {
		haxe_Log.trace("Upload files with cache ID " + uploadCacheID + " is not available anymore",{ fileName : "pushstate/PushState.hx", lineNumber : 214, className : "pushstate.PushState", methodName : "getUploadsForState"});
		return null;
	} else {
		return pushstate_PushState.uploadCache.h[uploadCacheID];
	}
};
pushstate_PushState.handleOnPopState = function(e) {
	var path = pushstate_PushState.stripURL(window.document.location.pathname + window.document.location.search + window.document.location.hash);
	var state = e != null ? e.state : null;
	var uploads = state != null && state.__postFilesCacheID != null ? pushstate_PushState.uploadCache.h[state.__postFilesCacheID] : null;
	if(pushstate_PushState.ignoreAnchors && path == pushstate_PushState.currentPath) {
		return;
	}
	if(e != null) {
		var _g = 0;
		var _g1 = pushstate_PushState.preventers;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(!p(path,state,uploads)) {
				e.preventDefault();
				window.history.replaceState(pushstate_PushState.currentState,"",pushstate_PushState.currentPath);
				return;
			}
		}
	}
	pushstate_PushState.currentPath = path;
	pushstate_PushState.currentState = state;
	pushstate_PushState.currentUploads = pushstate_PushState.getUploadsForState(state);
	pushstate_PushState.dispatch(pushstate_PushState.currentPath,pushstate_PushState.currentState,pushstate_PushState.currentUploads);
};
pushstate_PushState.stripURL = function(path) {
	if(HxOverrides.substr(path,0,pushstate_PushState.basePath.length) == pushstate_PushState.basePath) {
		path = HxOverrides.substr(path,pushstate_PushState.basePath.length,null);
	}
	if(pushstate_PushState.ignoreAnchors && path.indexOf("#") > -1) {
		path = HxOverrides.substr(path,0,path.indexOf("#"));
	}
	return path;
};
pushstate_PushState.addEventListener = function(l1,l2,l3) {
	var l;
	if(l1 != null) {
		l = l1;
	} else if(l2 != null) {
		l = function(url,state,_) {
			l2(url,state);
		};
	} else if(l3 != null) {
		l = function(url,_,_1) {
			l3(url);
		};
	} else {
		throw haxe_Exception.thrown("No listener provided");
	}
	pushstate_PushState.listeners.push(l);
	return l;
};
pushstate_PushState.removeEventListener = function(l) {
	HxOverrides.remove(pushstate_PushState.listeners,l);
};
pushstate_PushState.clearEventListeners = function() {
	while(pushstate_PushState.listeners.length > 0) pushstate_PushState.listeners.pop();
};
pushstate_PushState.addPreventer = function(p1,p2,p3) {
	var p;
	if(p1 != null) {
		p = p1;
	} else if(p2 != null) {
		p = function(url,state,_) {
			return p2(url,state);
		};
	} else if(p3 != null) {
		p = function(url,_,_1) {
			return p3(url);
		};
	} else {
		throw haxe_Exception.thrown("No preventer provided");
	}
	pushstate_PushState.preventers.push(p);
	return p;
};
pushstate_PushState.removePreventer = function(p) {
	HxOverrides.remove(pushstate_PushState.preventers,p);
};
pushstate_PushState.clearPreventers = function() {
	while(pushstate_PushState.preventers.length > 0) pushstate_PushState.preventers.pop();
};
pushstate_PushState.dispatch = function(url,state,uploads) {
	var _g = 0;
	var _g1 = pushstate_PushState.listeners;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		l(url,state,uploads);
	}
};
pushstate_PushState.push = function(url,state,uploads) {
	var strippedURL = pushstate_PushState.stripURL(url);
	if(state == null) {
		state = { };
	}
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(strippedURL,state,uploads)) {
			return false;
		}
	}
	pushstate_PushState.setUploadsForState(strippedURL,state,uploads);
	window.history.pushState(state,"",url);
	pushstate_PushState.currentPath = strippedURL;
	pushstate_PushState.currentState = state;
	pushstate_PushState.currentUploads = uploads;
	pushstate_PushState.dispatch(strippedURL,state,uploads);
	return true;
};
pushstate_PushState.replace = function(url,state,uploads) {
	var strippedURL = pushstate_PushState.stripURL(url);
	if(state == null) {
		state = { };
	}
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(strippedURL,state,uploads)) {
			return false;
		}
	}
	pushstate_PushState.silentReplace(url,state,uploads);
	pushstate_PushState.dispatch(strippedURL,state,uploads);
	return true;
};
pushstate_PushState.silentReplace = function(url,state,uploads) {
	var strippedURL = pushstate_PushState.stripURL(url);
	if(state == null) {
		state = { };
	}
	pushstate_PushState.setUploadsForState(strippedURL,state,uploads);
	window.history.replaceState(state,"",url);
	pushstate_PushState.currentPath = strippedURL;
	pushstate_PushState.currentState = state;
	pushstate_PushState.currentUploads = uploads;
};
var view_ContextMenu = function(data) {
	var _gthis = this;
	View.call(this,data);
	this.parentView.contextMenu = this;
	this.contextData = data;
	this.contextData.tableData = new haxe_ds_StringMap();
	haxe_Log.trace(this.id + " heightStyle:" + this.contextData.heightStyle + " attach2:" + Std.string(data.attach2),{ fileName : "src/view/ContextMenu.hx", lineNumber : 50, className : "view.ContextMenu", methodName : "new"});
	if(this.contextData.heightStyle == null) {
		this.contextData.heightStyle = "auto";
	}
	data.optionsMap = App.ist.globals.optionsMap.h;
	data.typeMap = App.ist.globals.typeMap.h;
	if(this.id == "qc-menu") {
		data.optionsMap.owner = App.ist.prepareAgentMap();
		data.typeMap.owner = "SELECT";
	} else {
		data.optionsMap.agent = App.ist.prepareAgentMap();
	}
	var tmp = $("#t-" + this.id).tmpl(data);
	tmp.appendTo($(data.attach2));
	this.createInputs();
	this.root = $("#" + this.id).accordion({ active : 0, activate : $bind(this,this.activate), "autoHeight" : false, beforeActivate : function(event,ui) {
		if(_gthis.root.data("disabled")) {
			event.preventDefault();
		} else {
			_gthis.activePanel = $(ui.newPanel[0]);
		}
	}, create : $bind(this,this.create), fillSpace : true, heightStyle : this.contextData.heightStyle});
	this.accordion = this.root.accordion("instance");
	haxe_Log.trace($("#" + this.id).find(".datepicker").length,{ fileName : "src/view/ContextMenu.hx", lineNumber : 95, className : "view.ContextMenu", methodName : "new"});
	$("#" + this.id).find(".datepicker").datepicker({ beforeShow : function(el,ui) {
		var jq = $(el);
		if(jq.val() == "") {
			jq.val(jq.attr("placeholder"));
		}
	}});
	$("#" + this.id + " button[data-contextaction]").click($bind(this,this.run));
	this.init();
};
$hxClasses["view.ContextMenu"] = view_ContextMenu;
view_ContextMenu.__name__ = "view.ContextMenu";
view_ContextMenu.__super__ = View;
view_ContextMenu.prototype = $extend(View.prototype,{
	accordion: null
	,contextData: null
	,action: null
	,activePanel: null
	,get_active: function() {
		haxe_Log.trace(this.root.accordion("option","active"),{ fileName : "src/view/ContextMenu.hx", lineNumber : 109, className : "view.ContextMenu", methodName : "get_active"});
		return js_Boot.__cast(this.root.accordion("option","active") , Int);
	}
	,set_active: function(act) {
		haxe_Log.trace(this.get_active() + " => " + act,{ fileName : "src/view/ContextMenu.hx", lineNumber : 115, className : "view.ContextMenu", methodName : "set_active"});
		this.root.accordion("option","active",act);
		return act;
	}
	,activate: function(event,ui) {
		this.action = $(ui.newPanel[0]).find("input[name=\"action\"]").first().val();
		this.set_active(this.getIndexOf(this.action));
		haxe_Log.trace(this.action + ":" + this.activePanel.attr("id") + " == " + $(ui.newPanel[0]).attr("id"),{ fileName : "src/view/ContextMenu.hx", lineNumber : 128, className : "view.ContextMenu", methodName : "activate"});
	}
	,call: function(editor,onComplete) {
		var _gthis = this;
		haxe_Log.trace("parentView.interactionState:" + this.parentView.interactionState + " agent:" + editor.agent + " editor.leadID:" + editor.leadID,{ fileName : "src/view/ContextMenu.hx", lineNumber : 134, className : "view.ContextMenu", methodName : "call"});
		if(this.parentView.interactionState == "call") {
			this.hangup(editor,onComplete);
			return;
		}
		var p = { className : "AgcApi", action : "external_dial", lead_id : editor.leadID, agent_user : editor.agent};
		this.parentView.loadData("server.php",p,function(data) {
			haxe_Log.trace(data,{ fileName : "src/view/ContextMenu.hx", lineNumber : 149, className : "view.ContextMenu", methodName : "call"});
			if(data.response == "OK") {
				haxe_Log.trace("OK",{ fileName : "src/view/ContextMenu.hx", lineNumber : 151, className : "view.ContextMenu", methodName : "call"});
				_gthis.parentView.set_interactionState("call");
				haxe_Log.trace(_gthis.activePanel.find("button[data-contextaction=\"call\"]").length,{ fileName : "src/view/ContextMenu.hx", lineNumber : 154, className : "view.ContextMenu", methodName : "call"});
				_gthis.activePanel.find("button[data-contextaction=\"call\"]").html("Auflegen");
			}
		});
	}
	,createInputs: function() {
		var cData = this.vData;
		var _g = 0;
		var _g1 = cData.items;
		while(_g < _g1.length) {
			var aI = _g1[_g];
			++_g;
			if(aI.Select != null) {
				this.addInputs(aI.Select,"Select");
			}
		}
	}
	,create: function(event,ui) {
		this.action = $(ui.panel[0]).find("input[name=\"action\"]").first().val();
		if(ui.panel.length > 0) {
			this.activePanel = $(ui.panel[0]);
		}
		haxe_Log.trace(this.action,{ fileName : "src/view/ContextMenu.hx", lineNumber : 184, className : "view.ContextMenu", methodName : "create"});
	}
	,getIndexOf: function(act) {
		var index = null;
		Lambda.mapi(this.contextData.items,function(i,item) {
			if(item.action == act) {
				haxe_Log.trace(i + ":" + act,{ fileName : "src/view/ContextMenu.hx", lineNumber : 194, className : "view.ContextMenu", methodName : "getIndexOf"});
				index = i;
			}
			return item;
		});
		haxe_Log.trace(index,{ fileName : "src/view/ContextMenu.hx", lineNumber : 199, className : "view.ContextMenu", methodName : "getIndexOf"});
		return index;
	}
	,hangup: function(editor,onCompletion) {
		var _gthis = this;
		haxe_Log.trace("OK",{ fileName : "src/view/ContextMenu.hx", lineNumber : 205, className : "view.ContextMenu", methodName : "hangup"});
		var p = { className : "AgcApi", action : "external_pause", lead_id : editor.leadID, agent_user : editor.agent, value : "PAUSE"};
		this.parentView.loadData("server.php",p,function(data) {
			if(data.response == "OK") {
				haxe_Log.trace("OK state CLEARED",{ fileName : "src/view/ContextMenu.hx", lineNumber : 223, className : "view.ContextMenu", methodName : "hangup"});
				var p = { className : "AgcApi", action : "external_hangup", lead_id : editor.leadID, agent_user : editor.agent};
				_gthis.parentView.loadData("server.php",p,function(data) {
					if(data.response == "OK") {
						haxe_Log.trace("OK",{ fileName : "src/view/ContextMenu.hx", lineNumber : 235, className : "view.ContextMenu", methodName : "hangup"});
						_gthis.setCallStatus(editor,onCompletion);
					} else {
						App.choice({ header : data.response, id : _gthis.parentView.id});
					}
				});
			} else {
				App.choice({ header : data.response, id : _gthis.parentView.id});
			}
		});
	}
	,layout: function() {
		var maxWidth = 0;
		var maxHeight = 0;
		var jP = this.accordion.panels;
		var p = 0;
		var _g = 0;
		var _g1 = jP.length;
		while(_g < _g1) {
			var p = _g++;
			var jEl = $(jP[p]);
			if(p != this.get_active()) {
				jEl.css("visibility","hidden").show();
			}
			maxWidth = Math.max(jEl.width(),maxWidth);
			maxHeight = Math.max(jEl.height(),maxHeight);
			if(p != this.get_active()) {
				jEl.hide(0).css("visibility","visible");
			}
		}
		this.root.find("table").width(maxWidth);
		this.root.accordion("option","active",this.get_active());
	}
	,findPage: function(page,limit) {
		var _gthis = this;
		this.action = "find";
		var items = this.vData.items;
		Lambda.mapi(items,function(i,item) {
			if(item.action == _gthis.action) {
				_gthis.set_active(i);
			}
			return item;
		});
		haxe_Log.trace(this.action + ":" + this.get_active(),{ fileName : "src/view/ContextMenu.hx", lineNumber : 280, className : "view.ContextMenu", methodName : "findPage"});
		var findFields = this.vData.items[this.get_active()].fields;
		haxe_Log.trace(findFields,{ fileName : "src/view/ContextMenu.hx", lineNumber : 282, className : "view.ContextMenu", methodName : "findPage"});
		if(findFields != null && findFields.length > 0) {
			var h = this.contextData.tableData.h;
			var tables_h = h;
			var tables_keys = Object.keys(h);
			var tables_length = tables_keys.length;
			var tables_current = 0;
			var tableNames = [];
			while(tables_current < tables_length) {
				var table = tables_keys[tables_current++];
				tableNames.push(table);
				haxe_Log.trace(table,{ fileName : "src/view/ContextMenu.hx", lineNumber : 291, className : "view.ContextMenu", methodName : "findPage"});
			}
			var form = $("#" + this.parentView.id + "-menu .ui-accordion-content-active form");
			var where = view_FormData.where(form,findFields);
			haxe_Log.trace(where,{ fileName : "src/view/ContextMenu.hx", lineNumber : 296, className : "view.ContextMenu", methodName : "findPage"});
			var wM = new haxe_ds_StringMap();
			var value = view_FormData.filter(form,this.contextData.tableData,tableNames);
			wM.h["filter"] = value;
			var value = tableNames.join(",");
			wM.h["filter_tables"] = value;
			wM.h["where"] = where;
			wM.h["limit"] = limit;
			wM.h["page"] = page;
			haxe_Log.trace(wM,{ fileName : "src/view/ContextMenu.hx", lineNumber : 305, className : "view.ContextMenu", methodName : "findPage"});
			this.parentView.find(wM);
		}
	}
	,run: function(evt) {
		evt.preventDefault();
		var jNode = $(js_Boot.__cast(evt.target , Node));
		this.action = this.vData.items[this.get_active()].action;
		haxe_Log.trace(this.action + ":" + this.get_active(),{ fileName : "src/view/ContextMenu.hx", lineNumber : 319, className : "view.ContextMenu", methodName : "run"});
		var contextAction = jNode.data("contextaction");
		haxe_Log.trace(this.action + ":" + contextAction,{ fileName : "src/view/ContextMenu.hx", lineNumber : 322, className : "view.ContextMenu", methodName : "run"});
		switch(this.action) {
		case "edit":
			var editor = js_Boot.__cast(this.parentView.views.h[this.parentView.instancePath + "." + this.parentView.id + "-editor"] , view_Editor);
			editor.contextAction(contextAction);
			break;
		case "find":
			var fields = this.vData.items[this.get_active()].fields;
			if(fields != null && fields.length > 0) {
				var h = this.contextData.tableData.h;
				var tables_h = h;
				var tables_keys = Object.keys(h);
				var tables_length = tables_keys.length;
				var tables_current = 0;
				var tableNames = [];
				while(tables_current < tables_length) {
					var table = tables_keys[tables_current++];
					tableNames.push(table);
					haxe_Log.trace(table,{ fileName : "src/view/ContextMenu.hx", lineNumber : 336, className : "view.ContextMenu", methodName : "run"});
				}
				var where = view_FormData.where(jNode.closest("form"),fields);
				haxe_Log.trace(where,{ fileName : "src/view/ContextMenu.hx", lineNumber : 341, className : "view.ContextMenu", methodName : "run"});
				var wM = new haxe_ds_StringMap();
				var value = view_FormData.filter(jNode.closest("form"),this.contextData.tableData,tableNames);
				wM.h["filter"] = value;
				var value = tableNames.join(",");
				wM.h["filter_tables"] = value;
				wM.h["where"] = where;
				this.parentView.find(wM);
			}
			break;
		case "mailings":
			var mailing = js_Boot.__cast(this.parentView.views.h[this.parentView.instancePath + "." + this.parentView.id + "-mailing"] , view_Mailing);
			haxe_Log.trace(contextAction,{ fileName : "src/view/ContextMenu.hx", lineNumber : 356, className : "view.ContextMenu", methodName : "run"});
			switch(contextAction) {
			case "printList":
				mailing.printList(jNode.closest("div").attr("id"));
				break;
			case "printNewInfos":
				mailing.printNewInfos(jNode.closest("div").attr("id"));
				break;
			case "printNewMembers":
				mailing.printNewMembers(jNode.closest("div").attr("id"));
				break;
			default:
				haxe_Log.trace(contextAction,{ fileName : "src/view/ContextMenu.hx", lineNumber : 366, className : "view.ContextMenu", methodName : "run"});
			}
			break;
		default:
			haxe_Log.trace(this.action + ":" + contextAction,{ fileName : "src/view/ContextMenu.hx", lineNumber : 369, className : "view.ContextMenu", methodName : "run"});
		}
	}
	,setCallStatus: function(editor,onCompletion) {
		var _gthis = this;
		haxe_Log.trace(editor.action + ":" + Std.string(onCompletion),{ fileName : "src/view/ContextMenu.hx", lineNumber : 375, className : "view.ContextMenu", methodName : "setCallStatus"});
		var p;
		switch(editor.action) {
		case "call":case "save":
			p = "QCOPEN";
			break;
		default:
			p = editor.action.toUpperCase();
		}
		var p1 = { className : "AgcApi", action : "external_status", dispo : p, agent_user : editor.agent};
		this.parentView.loadData("server.php",p1,function(data) {
			haxe_Log.trace(data,{ fileName : "src/view/ContextMenu.hx", lineNumber : 389, className : "view.ContextMenu", methodName : "setCallStatus"});
			if(data.response == "OK") {
				if(onCompletion != null) {
					haxe_Timer.delay(onCompletion,1500);
				} else {
					_gthis.parentView.set_interactionState("init");
				}
			} else {
				App.choice({ header : data.response, id : _gthis.parentView.id});
			}
		});
	}
	,initState: function() {
		var _gthis = this;
		View.prototype.initState.call(this);
		haxe_Log.trace(this.id + ":" + this.root.find("tr[data-table]").length,{ fileName : "src/view/ContextMenu.hx", lineNumber : 407, className : "view.ContextMenu", methodName : "initState"});
		this.layout();
		this.root.find("tr[data-table]").each(function(i,n) {
			var table = $(n).data("table");
			if(!Object.prototype.hasOwnProperty.call(_gthis.contextData.tableData.h,table)) {
				var _this = _gthis.contextData.tableData;
				var value = [];
				_this.h[table] = value;
			}
		});
		var h = this.contextData.tableData.h;
		var tables_h = h;
		var tables_keys = Object.keys(h);
		var tables_length = tables_keys.length;
		var tables_current = 0;
		while(tables_current < tables_length) {
			var table = [tables_keys[tables_current++]];
			haxe_Log.trace(table[0],{ fileName : "src/view/ContextMenu.hx", lineNumber : 423, className : "view.ContextMenu", methodName : "initState"});
			$("tr[data-table^=" + table[0] + "] input").each((function(table) {
				return function(_,inp) {
					if($(inp).attr("name").indexOf("_match_option") == -1) {
						_gthis.contextData.tableData.h[table[0]].push($(inp).attr("name"));
					}
				};
			})(table));
			$("tr[data-table^=" + table[0] + "] select").each((function(table) {
				return function(_,inp) {
					_gthis.contextData.tableData.h[table[0]].push($(inp).attr("name"));
				};
			})(table));
		}
		haxe_Log.trace(haxe_ds_StringMap.stringify(this.contextData.tableData.h),{ fileName : "src/view/ContextMenu.hx", lineNumber : 432, className : "view.ContextMenu", methodName : "initState"});
	}
	,__class__: view_ContextMenu
});
var view_Editor = function(data) {
	View.call(this,data);
	this.cMenu = js_Boot.__cast(this.parentView.views.h[this.parentView.instancePath + "." + this.parentView.id + "-menu"] , view_ContextMenu);
	this.name = this.parentView.name;
	this.templ = $("#t-" + this.id);
	haxe_Log.trace(this.id,{ fileName : "src/view/Editor.hx", lineNumber : 48, className : "view.Editor", methodName : "new"});
	this.init();
	this.accountSelector = this.parentView.id + "-edit-form " + "input[name=\"account\"]";
	this.blzSelector = this.parentView.id + "-edit-form " + "input[name=\"blz\"]";
	this.ibanSelector = this.parentView.id + "-edit-form " + "input[name=\"iban\"]";
};
$hxClasses["view.Editor"] = view_Editor;
view_Editor.__name__ = "view.Editor";
view_Editor.__super__ = View;
view_Editor.prototype = $extend(View.prototype,{
	cMenu: null
	,fieldNames: null
	,overlay: null
	,optionsMap: null
	,typeMap: null
	,eData: null
	,action: null
	,agent: null
	,leadID: null
	,savingFlagSet: null
	,accountSelector: null
	,blzSelector: null
	,ibanSelector: null
	,checkIban: function() {
		var iban = $("#" + this.ibanSelector).val();
		haxe_Log.trace(iban + Std.string(me_cunity_js_data_IBAN.checkIBAN(iban)),{ fileName : "src/view/Editor.hx", lineNumber : 59, className : "view.Editor", methodName : "checkIban"});
		return me_cunity_js_data_IBAN.checkIBAN(iban);
	}
	,checkAccountAndBLZ: function(ok2submit) {
		var _gthis = this;
		var account = $("#" + this.accountSelector).val();
		var blz = $("#" + this.blzSelector).val();
		haxe_Log.trace("accountSelector: #" + this.accountSelector,{ fileName : "src/view/Editor.hx", lineNumber : 67, className : "view.Editor", methodName : "checkAccountAndBLZ"});
		haxe_Log.trace(account + ":" + blz,{ fileName : "src/view/Editor.hx", lineNumber : 68, className : "view.Editor", methodName : "checkAccountAndBLZ"});
		if(!(account.length > 0 && blz.length > 0)) {
			ok2submit(false);
			return;
		}
		me_cunity_js_data_IBAN.buildIBAN(account,blz,function(success) {
			if(me_cunity_js_data_IBAN.checkIBAN(success.iban)) {
				$("#" + _gthis.ibanSelector).val(success.iban);
				haxe_Log.trace(success.iban + ":" + Std.string($("#" + _gthis.ibanSelector).val()),{ fileName : "src/view/Editor.hx", lineNumber : 78, className : "view.Editor", methodName : "checkAccountAndBLZ"});
				ok2submit(true);
			}
		},function(error) {
			haxe_Log.trace(error.message,{ fileName : "src/view/Editor.hx", lineNumber : 84, className : "view.Editor", methodName : "checkAccountAndBLZ"});
			ok2submit(false);
		});
	}
	,editCheck: function(dataRow) {
		var p = this.resetParams();
		p.primary_id = this.vData.primary_id == null ? this.parentView.primary_id : this.vData.primary_id;
		p[p.primary_id] = this.eData.attr("id");
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g = 0;
			while(_g < hKeys.length) {
				var k = hKeys[_g];
				++_g;
				p[k] = this.eData.data(k);
			}
		}
		haxe_Log.trace(p,{ fileName : "src/view/Editor.hx", lineNumber : 103, className : "view.Editor", methodName : "editCheck"});
		haxe_Log.trace(this.leadID,{ fileName : "src/view/Editor.hx", lineNumber : 104, className : "view.Editor", methodName : "editCheck"});
		p.action = "edit";
		p.fields = this.vData.fields != null ? this.vData.fields : this.parentView.vData.fields;
		this.loadData("server.php",p,$bind(this,this.compareEdit));
	}
	,compareEdit: function(data) {
		var displayFormats = window.displayFormats;
		var cData = data.rows[0];
		var cOK = true;
		var errors_b = "";
		var _g = 0;
		var _g1 = Reflect.fields(cData);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			if(f == "vendor_lead_code" && this.overlay.find("[name=\"vendor_lead_code\"]").val() == "") {
				continue;
			}
			var val = "";
			var dbData = Reflect.field(cData,f);
			var displayFormat = Reflect.field(displayFormats,f);
			if(displayFormat != null) {
				if(displayFormat.indexOf("%") > -1) {
					val = window.sprintf(displayFormat,Reflect.field(cData,f));
				} else {
					if(displayFormat.indexOf("_") == 0) {
						haxe_Log.trace("input[name=\"_" + f + "\"]",{ fileName : "src/view/Editor.hx", lineNumber : 136, className : "view.Editor", methodName : "compareEdit"});
						var o = window;
						val = Reflect.field(window,"display").apply(o,[displayFormat,dbData,$("input[name=\"_" + f + "\"]").data("value")]);
					} else {
						var o1 = window;
						val = Reflect.field(window,"display").apply(o1,[displayFormat,dbData]);
					}
					haxe_Log.trace(Std.string(dbData) + ":" + displayFormat + ":" + Std.string(val),{ fileName : "src/view/Editor.hx", lineNumber : 141, className : "view.Editor", methodName : "compareEdit"});
				}
			} else {
				val = Reflect.field(cData,f);
			}
			var shouldDVal = val;
			switch(Reflect.field(data.typeMap,f)) {
			case "CHECKBOX":case "RADIO":
				var fData = this.overlay.find("[name=\"" + f + "\"]:checked").val();
				if(fData == null) {
					fData = "";
				}
				cOK = val == fData;
				break;
			default:
				cOK = displayFormat != null && displayFormat.indexOf("_") == 0 ? val == this.overlay.find("[name=\"_" + f + "\"]").val() : val == this.overlay.find("[name=\"" + f + "\"]").val();
			}
			if(!cOK) {
				haxe_Log.trace("" + Std.string(dbData) + "< oops - " + f + ": >" + shouldDVal + "< not = >" + Std.string(this.overlay.find("[name=\"" + f + "\"]").val()) + "<",{ fileName : "src/view/Editor.hx", lineNumber : 169, className : "view.Editor", methodName : "compareEdit"});
				errors_b += Std.string("oops - " + f + ": " + shouldDVal + " not = " + Std.string(this.overlay.find("[name=\"" + f + "\"]").val()) + "<-\r\n");
			}
		}
		if(errors_b.length > 0) {
			haxe_Log.trace("edit check failed :(" + errors_b + "\r\n",{ fileName : "src/view/Editor.hx", lineNumber : 176, className : "view.Editor", methodName : "compareEdit"});
			var fD = view_FormData.save($("#" + this.parentView.id + "-edit-form"));
			var fDs = "";
			Lambda.iter(fD,function(d) {
				fDs += "\n" + d.name + "=>" + Std.string(d.value);
			});
			var content = { header : "edit check failed :(\r\n", form : fDs + "\r\n", data : Std.string(data) + "\r\n", errors : errors_b + "\r\n"};
			$.post("/flyCRM/editorLog.php",content,function(d,s,_) {
				haxe_Log.trace(d,{ fileName : "src/view/Editor.hx", lineNumber : 186, className : "view.Editor", methodName : "compareEdit"});
				haxe_Log.trace(s,{ fileName : "src/view/Editor.hx", lineNumber : 186, className : "view.Editor", methodName : "compareEdit"});
			}).fail(function() {
				haxe_Log.trace("error",{ fileName : "src/view/Editor.hx", lineNumber : 187, className : "view.Editor", methodName : "compareEdit"});
			});
		}
		this.close();
		if(this.lastFindParam != null) {
			this.parentView.find(this.parentView.lastFindParam);
		} else {
			var p = this.parentView.resetParams();
			if(this.parentView.vData.order != null) {
				p.order = this.parentView.vData.order;
			}
			haxe_Log.trace(p,{ fileName : "src/view/Editor.hx", lineNumber : 199, className : "view.Editor", methodName : "compareEdit"});
			this.parentView.find(this.parentView.lastFindParam == null ? new haxe_ds_StringMap() : this.parentView.lastFindParam);
		}
	}
	,edit: function(dataRow) {
		haxe_Log.trace(dataRow,{ fileName : "src/view/Editor.hx", lineNumber : 212, className : "view.Editor", methodName : "edit"});
		this.savingFlagSet = false;
		var p = this.resetParams();
		p.primary_id = this.vData.primary_id == null ? this.parentView.primary_id : this.vData.primary_id;
		this.eData = dataRow;
		p[p.primary_id] = this.eData.attr("id");
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g = 0;
			while(_g < hKeys.length) {
				var k = hKeys[_g];
				++_g;
				p[k] = this.eData.data(k);
			}
		}
		this.leadID = p.lead_id;
		haxe_Log.trace(this.leadID,{ fileName : "src/view/Editor.hx", lineNumber : 230, className : "view.Editor", methodName : "edit"});
		p.action = "edit";
		p.fields = this.vData.fields != null ? this.vData.fields : this.parentView.vData.fields;
		haxe_Log.trace(p,{ fileName : "src/view/Editor.hx", lineNumber : 235, className : "view.Editor", methodName : "edit"});
		this.cMenu.set_active(this.cMenu.getIndexOf(p.action));
		haxe_Log.trace(Std.string(p.action) + ":" + this.cMenu.get_active(),{ fileName : "src/view/Editor.hx", lineNumber : 238, className : "view.Editor", methodName : "edit"});
		this.cMenu.root.data("disabled",1);
		this.loadData("server.php",p,$bind(this,this.update));
	}
	,close: function() {
		var _gthis = this;
		haxe_Log.trace("going to close:" + $("#overlay").length,{ fileName : "src/view/Editor.hx", lineNumber : 245, className : "view.Editor", methodName : "close"});
		this.cMenu.root.find(".recordings").remove();
		this.cMenu.root.data("disabled",0);
		$(this.cMenu.attach2).find("tr").removeClass("selected");
		if(this.parentView.interactionState == "call") {
			this.cMenu.activePanel.find("button[data-contextaction=\"call\"]").html("Anrufen");
		}
		this.parentView.set_interactionState("init");
		this.overlay.animate({ opacity : 0.0},300,null,function() {
			_gthis.overlay.detach();
		});
	}
	,contextAction: function(action) {
		var _gthis = this;
		this.action = action;
		switch(action) {
		case "call":
			if(this.parentView.interactionState == "call") {
				this.cMenu.call(this,function() {
					_gthis.save(action);
				});
			} else {
				this.cMenu.call(this);
			}
			break;
		case "close":
			this.close();
			break;
		case "errsal":
			if(this.parentView.interactionState == "call") {
				this.cMenu.hangup(this,function() {
					_gthis.save(action);
				});
			} else {
				this.save(action);
			}
			break;
		case "qcbad":
			if(this.parentView.interactionState == "call") {
				this.cMenu.hangup(this,function() {
					_gthis.save(action);
				});
			} else {
				this.save(action);
			}
			break;
		case "qcok":case "save":
			if(!this.checkIban()) {
				this.checkAccountAndBLZ(function(ok) {
					haxe_Log.trace(ok,{ fileName : "src/view/Editor.hx", lineNumber : 268, className : "view.Editor", methodName : "contextAction"});
					if(ok) {
						if(_gthis.parentView.interactionState == "call") {
							_gthis.cMenu.hangup(_gthis,function() {
								_gthis.save(action);
							});
						} else {
							_gthis.save(action);
						}
					} else {
						App.inputError($("#" + _gthis.parentView.id + "-edit-form"),["account","blz","iban"]);
					}
				});
			} else if(this.parentView.interactionState == "call") {
				this.cMenu.hangup(this,function() {
					_gthis.save(action);
				});
			} else {
				this.save(action);
			}
			break;
		default:
			haxe_Log.trace(action,{ fileName : "src/view/Editor.hx", lineNumber : 307, className : "view.Editor", methodName : "contextAction"});
		}
	}
	,hangup: function(editor,onCompletion) {
		var _gthis = this;
		haxe_Log.trace("OK",{ fileName : "src/view/Editor.hx", lineNumber : 313, className : "view.Editor", methodName : "hangup"});
		var fData = view_FormData.save($("#" + this.parentView.id + "-edit-form"));
		haxe_Log.trace(fData,{ fileName : "src/view/Editor.hx", lineNumber : 316, className : "view.Editor", methodName : "hangup"});
		var p = { className : "AgcApi", action : "update_fields_x", lead_id : editor.leadID, agent_user : this.agent};
		var fd;
		var _g = 0;
		while(_g < fData.length) {
			var fd = fData[_g];
			++_g;
			p[fd.name] = fd.value;
		}
		haxe_Log.trace(p,{ fileName : "src/view/Editor.hx", lineNumber : 329, className : "view.Editor", methodName : "hangup"});
		this.parentView.loadData("server.php",p,function(data) {
			if(data.response == "OK") {
				haxe_Log.trace("OK => agent screen updated",{ fileName : "src/view/Editor.hx", lineNumber : 335, className : "view.Editor", methodName : "hangup"});
				var p = { className : "AgcApi", action : "external_hangup", lead_id : editor.leadID, agent_user : editor.agent};
				_gthis.parentView.loadData("server.php",p,function(data) {
					if(data.response == "OK") {
						haxe_Log.trace("OK",{ fileName : "src/view/Editor.hx", lineNumber : 347, className : "view.Editor", methodName : "hangup"});
						_gthis.cMenu.setCallStatus(_gthis,onCompletion);
					} else {
						App.choice({ header : data.response, id : _gthis.parentView.id});
					}
				});
			} else {
				App.choice({ header : data.response, id : _gthis.parentView.id});
			}
		});
	}
	,ready4save: function() {
		var p = [];
		p.push({ name : "className", value : "AgcApi"});
		p.push({ name : "action", value : "check4Update"});
		p.push({ name : "lead_id", value : this.leadID});
		var amReady = false;
		$.ajax({ type : "POST", url : "server.php", data : p, success : function(result) {
			haxe_Log.trace(result,{ fileName : "src/view/Editor.hx", lineNumber : 379, className : "view.Editor", methodName : "ready4save"});
			try {
				if(result.response.status != "INCALL") {
					haxe_Log.trace("OK - CALL ENDED",{ fileName : "src/view/Editor.hx", lineNumber : 385, className : "view.Editor", methodName : "ready4save"});
					amReady = true;
				}
			} catch( _g ) {
				var ex = haxe_Exception.caught(_g).unwrap();
				haxe_Log.trace(ex,{ fileName : "src/view/Editor.hx", lineNumber : 392, className : "view.Editor", methodName : "ready4save"});
			}
		}, dataType : "json", async : false});
		haxe_Log.trace("returning " + (amReady == null ? "null" : "" + amReady),{ fileName : "src/view/Editor.hx", lineNumber : 399, className : "view.Editor", methodName : "ready4save"});
		return amReady;
	}
	,save: function(status,maxSaveLoop) {
		if(maxSaveLoop == null) {
			maxSaveLoop = 3;
		}
		var _gthis = this;
		haxe_Log.trace(this.parentView.interactionState,{ fileName : "src/view/Editor.hx", lineNumber : 405, className : "view.Editor", methodName : "save"});
		if(this.parentView.interactionState == "call") {
			if(maxSaveLoop < 1 || !this.ready4save()) {
				haxe_Log.trace("have to wait..." + maxSaveLoop,{ fileName : "src/view/Editor.hx", lineNumber : 413, className : "view.Editor", methodName : "save"});
				haxe_Timer.delay(function() {
					var tmp = maxSaveLoop -= 1;
					_gthis.save(status,tmp);
				},1500);
				return;
			}
		}
		var p = view_FormData.save($("#" + this.parentView.id + "-edit-form"));
		haxe_Log.trace(p,{ fileName : "src/view/Editor.hx", lineNumber : 420, className : "view.Editor", methodName : "save"});
		p.push({ name : "className", value : this.parentView.name});
		p.push({ name : "action", value : "save"});
		p.push({ name : "user", value : App.user});
		p.push({ name : "primary_id", value : this.parentView.vData.primary_id});
		p.push({ name : this.parentView.vData.primary_id, value : this.eData.attr("id")});
		haxe_Log.trace(status,{ fileName : "src/view/Editor.hx", lineNumber : 426, className : "view.Editor", methodName : "save"});
		switch(status) {
		case "errsal":
			p.push({ name : "status", value : "ERRSALE"});
			break;
		case "call":case "qcbad":case "qcok":
			p.push({ name : "status", value : status == "call" ? "QCOPEN" : status.toUpperCase()});
			break;
		}
		if(this.parentView.vData.hidden != null) {
			var hKeys = this.parentView.vData.hidden.split(",");
			var _g = 0;
			while(_g < hKeys.length) {
				var k = [hKeys[_g]];
				++_g;
				if(this.eData.data(k[0]) != null && Lambda.foreach(p,(function(k) {
					return function(jD) {
						return jD.name != k[0];
					};
				})(k))) {
					p.push({ name : k[0], value : this.eData.data(k[0])});
				}
			}
		}
		haxe_Timer.delay(function() {
			_gthis.parentView.loadData("server.php",p,function(data) {
				haxe_Log.trace(Std.string(data) + ": " + (data ? "Y" : "N"),{ fileName : "src/view/Editor.hx", lineNumber : 446, className : "view.Editor", methodName : "save"});
				if(data) {
					_gthis.editCheck(_gthis.eData);
				}
			});
		},1500);
	}
	,update: function(data) {
		var _gthis = this;
		this.parentView.wait(false);
		this.agent = data.agent;
		haxe_Log.trace(data,{ fileName : "src/view/Editor.hx", lineNumber : 460, className : "view.Editor", methodName : "update"});
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
				var r = optRows[_g1];
				++_g1;
				opts.push(r.split(","));
			}
			dataOptions[k] = opts;
		}
		data.user = this.eData.data("owner");
		this.optionsMap = data.optionsMap = dataOptions;
		data.typeMap.buchungs_tag = "TEXT";
		this.typeMap = data.typeMap;
		var dRows = data.rows;
		haxe_Log.trace(dRows.length,{ fileName : "src/view/Editor.hx", lineNumber : 476, className : "view.Editor", methodName : "update"});
		var fieldDefault = data.fieldDefault;
		var _g = 0;
		while(_g < dRows.length) {
			var row = dRows[_g];
			++_g;
			var _g1 = 0;
			var _g2 = Reflect.fields(row);
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				if(Reflect.field(row,f) == "" && f != "period" && Object.prototype.hasOwnProperty.call(fieldDefault,f)) {
					row[f] = Reflect.field(fieldDefault,f);
				}
			}
		}
		var r = new EReg("([a-z0-9_-]+.mp3)$","");
		var rData = { recordings : data.recordings.map(function(rec) {
			rec.filename = r.match(rec.location) ? r.matched(1) : rec.location;
			return rec;
		})};
		var recordings = $("#t-" + this.parentView.id + "-recordings").tmpl(rData);
		this.cMenu.activePanel.find("form").append(recordings);
		var oMargin = 8;
		var mSpace = App.getMainSpace();
		this.overlay = this.templ.tmpl(data).appendTo("#" + this.parentView.id).css({ marginTop : Std.string(mSpace.top + oMargin) + "px", marginLeft : (oMargin == null ? "null" : "" + oMargin) + "px", height : Std.string(mSpace.height - 2 * oMargin - parseFloat($("#overlay").css("padding-top")) - parseFloat($("#overlay").css("padding-bottom"))) + "px", width : Std.string($("#" + Std.string(this.parentView.vData.id) + "-menu").offset().left - 35) + "px"}).animate({ opacity : 1},{ done : function(el) {
			haxe_Log.trace($("#" + _gthis.parentView.id).find("input[name=\"period\"]").length,{ fileName : "src/view/Editor.hx", lineNumber : 509, className : "view.Editor", methodName : "update"});
			var unchecked = true;
			$("#" + _gthis.parentView.id).find("input[name=\"period\"]").each(function(i,n) {
				haxe_Log.trace($(n).prop("checked"),{ fileName : "src/view/Editor.hx", lineNumber : 512, className : "view.Editor", methodName : "update"});
				if($(n).prop("checked")) {
					unchecked = false;
				}
			});
			if(unchecked) {
				$("#" + _gthis.parentView.id).find("button:contains(\"Einmalspende\")").css("color","rgb(114,150,100)");
			}
		}});
		haxe_Log.trace(mSpace.height + ":" + 2 * oMargin + ":" + parseFloat($("#overlay").css("padding-top")) + ":" + parseFloat($("#overlay").css("padding-bottom")),{ fileName : "src/view/Editor.hx", lineNumber : 524, className : "view.Editor", methodName : "update"});
		$("#" + this.parentView.id + " .scrollbox").height($("#" + this.parentView.id + " #overlay").height());
		haxe_Log.trace(this.id + ":" + this.parentView.id + ":" + $("#" + this.parentView.id + " .scrollbox").length + ":" + $("#" + this.parentView.id + " .scrollbox").height(),{ fileName : "src/view/Editor.hx", lineNumber : 526, className : "view.Editor", methodName : "update"});
	}
	,__class__: view_Editor
});
var view_FormData = $hx_exports["FD"] = function() { };
$hxClasses["view.FormData"] = view_FormData;
view_FormData.__name__ = "view.FormData";
view_FormData.query = function(jForm,eData) {
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
			if(ret != "") {
				ret += "&";
			}
			ret += f + "=" + Std.string(d);
		}
	}
	var _g = 0;
	while(_g < fD.length) {
		var item = fD[_g];
		++_g;
		if(item.value != null && item.value != "") {
			if(ret != "") {
				ret += "&";
			}
			ret += item.name + "=" + Std.string(item.value);
		}
	}
	return ret;
};
view_FormData.save = function(jForm) {
	var ret = jForm.serializeArray();
	var checkBoxes = jForm.find("input[type=\"checkbox\"]");
	var missing = new haxe_ds_StringMap();
	haxe_Log.trace(jForm.length,{ fileName : "src/view/FormData.hx", lineNumber : 81, className : "view.FormData", methodName : "save"});
	App.ist.logTrace(jForm.length + ":" + Std.string(ret));
	checkBoxes.each(function(i,n) {
		var checkBox = $(n);
		if(!Lambda.forone(ret,function(fd) {
			return fd.name == checkBox.attr("name");
		})) {
			ret.push({ name : checkBox.attr("name"), value : checkBox.prop("checked") ? 1 : 0});
		} else {
			var result = new Array(ret.length);
			var _g = 0;
			var _g1 = ret.length;
			while(_g < _g1) {
				var i = _g++;
				var fd = ret[i];
				if(fd.name == checkBox.attr("name")) {
					fd.value = checkBox.prop("checked") ? 1 : 0;
				}
				result[i] = fd;
			}
			ret = result;
		}
		if(checkBox.data("required") == "true" && !checkBox.prop("checked")) {
			var key = checkBox.attr("name");
			missing.h[key] = true;
		}
	});
	var _g = 0;
	while(_g < ret.length) {
		var fd = ret[_g];
		++_g;
		var itemName = fd.name.split("[")[0];
		if(Object.prototype.hasOwnProperty.call(App.storeFormats,itemName)) {
			var sForm = Reflect.field(App.storeFormats,itemName);
			var callParam = sForm.length > 1 ? sForm.slice(1) : [];
			var method = sForm[0];
			callParam.push(fd.value);
			if(itemName.indexOf("_") == 0) {
				callParam.push($("input[name=\"" + fd.name + "\"]").data("value"));
				fd.name = HxOverrides.substr(fd.name,1,null);
			}
			var o = window;
			fd.value = Reflect.field(window,method).apply(o,callParam);
		}
		if(!Object.prototype.hasOwnProperty.call(missing.h,fd.name) && $("input[name=\"" + fd.name + "\"]").data("required") == "true" && $("input[name=\"" + fd.name + "\"]").val() == "") {
			missing.h[fd.name] = true;
		}
	}
	ret.push({ name : "missing", value : missing});
	return ret;
};
view_FormData.filter = function(jForm,tableData,tableNames) {
	var fResult = "";
	var table2remove = [];
	haxe_Log.trace(tableNames.join(","),{ fileName : "src/view/FormData.hx", lineNumber : 141, className : "view.FormData", methodName : "filter"});
	var _g = 0;
	while(_g < tableNames.length) {
		var tN = tableNames[_g];
		++_g;
		var tD = tableData.h[tN];
		var ret = [];
		var _g1 = 0;
		while(_g1 < tD.length) {
			var tDn = tD[_g1];
			++_g1;
			var v = jForm.find("[name=\"" + tDn + "\"]").val();
			if(!(v != null && v != 0 && v != "")) {
				haxe_Log.trace("" + tDn + " not set:" + Std.string(jForm.find("[name=\"" + tDn + "\"]").val()),{ fileName : "src/view/FormData.hx", lineNumber : 150, className : "view.FormData", methodName : "filter"});
				continue;
			}
			var matchTypeOption = jForm.find("[name=\"" + tDn + "_match_option\"]");
			haxe_Log.trace(tDn + ":" + matchTypeOption.length,{ fileName : "src/view/FormData.hx", lineNumber : 154, className : "view.FormData", methodName : "filter"});
			if(matchTypeOption.length == 1) {
				var tmp;
				switch(matchTypeOption.val()) {
				case "any":
					tmp = tDn + "|LIKE|%" + Std.string(jForm.find("[name=\"" + tDn + "\"]").val()) + "%";
					break;
				case "end":
					tmp = tDn + "|LIKE|%" + Std.string(jForm.find("[name=\"" + tDn + "\"]").val());
					break;
				case "exact":
					tmp = tDn + "|" + Std.string(jForm.find("[name=\"" + tDn + "\"]").val());
					break;
				case "start":
					tmp = tDn + "|LIKE|" + Std.string(jForm.find("[name=\"" + tDn + "\"]").val()) + "%";
					break;
				default:
					haxe_Log.trace("ERROR: unknown matchTypeOption value:" + Std.string(matchTypeOption.val()),{ fileName : "src/view/FormData.hx", lineNumber : 168, className : "view.FormData", methodName : "filter"});
					tmp = "ERROR|unknown matchTypeOption value:" + Std.string(matchTypeOption.val());
				}
				ret.push(tmp);
				continue;
			}
			if(tDn.indexOf("range_from_") == 0) {
				var from = jForm.find("[name=\"" + tDn + "\"]").val();
				if(from.length > 0) {
					from = view_FormData.gDateTime2mysql(from + " 00:00:00");
				}
				var name = HxOverrides.substr(tDn,11,null);
				haxe_Log.trace(name + ":" + Std.string(jForm.find("[name=\"range_from_" + name + "\"]").val()),{ fileName : "src/view/FormData.hx", lineNumber : 180, className : "view.FormData", methodName : "filter"});
				var to = jForm.find("[name=\"range_to_" + name + "\"]").val();
				if(to.length > 0) {
					to = view_FormData.gDateTime2mysql(to + " 23:59:59");
				}
				if(from.length > 0 && to.length > 0) {
					ret.push(name + "|BETWEEN|" + from + "|" + to);
				} else if(from.length > 0) {
					ret.push(name + "|BETWEEN|" + from + "|" + DateTools.format(new Date(),"%Y-%m-%d"));
				} else if(to.length > 0) {
					ret.push(name + "|BETWEEN|2015-01-01 00:00:00|" + to);
				}
			} else if(tDn.indexOf("range_to_") == 0) {
				continue;
			} else if(tDn.indexOf("_match_option") == -1) {
				if(tDn == "pay_source.pay_source_state") {
					if(jForm.find("[name=\"" + tDn + "\"]").prop("checked")) {
						ret.push(tDn + "|IN|active|new");
					}
				} else {
					ret.push(tDn + "|" + Std.string(jForm.find("[name=\"" + tDn + "\"]").val()));
				}
			}
		}
		if(ret.length > 0) {
			if(fResult != "") {
				fResult += ",";
			}
			fResult += ret.join("|");
		} else {
			table2remove.push(tN);
		}
	}
	var result = new Array(table2remove.length);
	var _g = 0;
	var _g1 = table2remove.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = HxOverrides.remove(tableNames,table2remove[i]);
	}
	return fResult;
};
view_FormData.where = function(jForm,fields) {
	var ret = [];
	var fD = jForm.serializeArray();
	haxe_Log.trace(fields,{ fileName : "src/view/FormData.hx", lineNumber : 227, className : "view.FormData", methodName : "where"});
	var aFields_h = Object.create(null);
	Lambda.iter(fD,function(aFD) {
		if(Lambda.has(fields,aFD.name)) {
			var key = aFD.name;
			var value = Object.prototype.hasOwnProperty.call(aFields_h,aFD.name) ? aFields_h[aFD.name].concat(aFD.value) : [aFD.value];
			aFields_h[key] = value;
		}
	});
	var h = aFields_h;
	var it_h = h;
	var it_keys = Object.keys(h);
	var it_length = it_keys.length;
	var it_current = 0;
	var ret = [];
	while(it_current < it_length) {
		var k = it_keys[it_current++];
		if(aFields_h[k].length > 1) {
			var _g = [];
			var _g1 = 0;
			var _g2 = fD;
			while(_g1 < _g2.length) {
				var v = _g2[_g1];
				++_g1;
				if(v.name != k) {
					_g.push(v);
				}
			}
			fD = _g;
			ret.push(k + "|IN|" + aFields_h[k].join("|"));
		}
	}
	var _g = 0;
	while(_g < fD.length) {
		var item = [fD[_g]];
		++_g;
		if(item[0].name.indexOf("_match_option") > -1 || !(Lambda.has(fields,item[0].name) || Lambda.forone(fields,(function(item) {
			return function(f) {
				if(item[0].name.indexOf(".") > -1) {
					return StringTools.startsWith(item[0].name,f.split(".")[0]);
				} else {
					return false;
				}
			};
		})(item)) || item[0].name.indexOf("range_from_") == 0)) {
			continue;
		}
		haxe_Log.trace(item[0].name,{ fileName : "src/view/FormData.hx", lineNumber : 254, className : "view.FormData", methodName : "where"});
		if(item[0].value != null && item[0].value != "" || item[0].name.indexOf("range_from_") == 0) {
			if(Object.prototype.hasOwnProperty.call(App.storeFormats,item[0].name)) {
				var sForm = Reflect.field(App.storeFormats,item[0].name);
				var callParam = sForm.length > 1 ? sForm.slice(1) : [];
				var method = sForm[0];
				haxe_Log.trace("call FormData" + method,{ fileName : "src/view/FormData.hx", lineNumber : 262, className : "view.FormData", methodName : "where"});
				callParam.push(item[0].value);
				var o = window;
				var tmp = Reflect.field(window,method).apply(o,callParam);
				item[0].value = tmp;
				haxe_Log.trace(item[0].value,{ fileName : "src/view/FormData.hx", lineNumber : 266, className : "view.FormData", methodName : "where"});
			}
			var matchTypeOption = jForm.find("[name=\"" + item[0].name + "_match_option\"]");
			haxe_Log.trace(item[0].name + ":" + matchTypeOption.length,{ fileName : "src/view/FormData.hx", lineNumber : 269, className : "view.FormData", methodName : "where"});
			if(matchTypeOption.length == 1) {
				var tmp1;
				switch(matchTypeOption.val()) {
				case "any":
					tmp1 = item[0].name + "|LIKE|%" + Std.string(item[0].value) + "%";
					break;
				case "end":
					tmp1 = item[0].name + "|LIKE|%" + Std.string(item[0].value);
					break;
				case "exact":
					tmp1 = item[0].name + "|" + Std.string(item[0].value);
					break;
				case "start":
					tmp1 = item[0].name + "|LIKE|" + Std.string(item[0].value) + "%";
					break;
				default:
					haxe_Log.trace("ERROR: unknown matchTypeOption value:" + Std.string(matchTypeOption.val()),{ fileName : "src/view/FormData.hx", lineNumber : 283, className : "view.FormData", methodName : "where"});
					tmp1 = "ERROR|unknown matchTypeOption value:" + Std.string(matchTypeOption.val());
				}
				ret.push(tmp1);
				continue;
			}
			if(item[0].name.indexOf("range_from_") == 0) {
				var from = item[0].value;
				if(from.length > 0) {
					from = view_FormData.gDateTime2mysql(from + " 00:00:00");
				}
				var name = HxOverrides.substr(item[0].name,11,null);
				haxe_Log.trace(name + ":" + Std.string(jForm.find("[name=\"range_from_" + name + "\"]").val()),{ fileName : "src/view/FormData.hx", lineNumber : 295, className : "view.FormData", methodName : "where"});
				var to = jForm.find("[name=\"range_to_" + name + "\"]").val();
				if(to.length > 0) {
					to = view_FormData.gDateTime2mysql(to + " 23:59:59");
				}
				if(from.length > 0 && to.length > 0) {
					ret.push(name + "|BETWEEN|" + from + "|" + to);
				} else if(from.length > 0) {
					ret.push(name + "|BETWEEN|" + from + "|" + DateTools.format(new Date(),"%Y-%m-%d"));
				} else if(to.length > 0) {
					ret.push(name + "|BETWEEN|2015-01-01 00:00:00|" + to);
				}
			} else if(item[0].name.indexOf("range_to_") == 0) {
				continue;
			} else {
				ret.push(item[0].name + "|" + Std.string(item[0].value));
			}
		}
	}
	haxe_Log.trace(ret.join(","),{ fileName : "src/view/FormData.hx", lineNumber : 312, className : "view.FormData", methodName : "where"});
	return ret.join(",");
};
view_FormData.gDate2mysql = $hx_exports["gDate2mysql"] = function(gDate) {
	if(gDate == null || gDate == "") {
		return null;
	}
	var _this = gDate.split(".");
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = StringTools.trim(_this[i]);
	}
	var d = result;
	if(d.length != 3) {
		if(d.length == 1 && d[0].length == 4) {
			return d[0] + "-01-01";
		}
		haxe_Log.trace("Falsches Datumsformat:" + gDate + " :" + d.toString(),{ fileName : "src/view/FormData.hx", lineNumber : 328, className : "view.FormData", methodName : "gDate2mysql"});
		return "Falsches Datumsformat:" + gDate;
	}
	return d[2] + "-" + d[1] + "-" + d[0];
};
view_FormData.gDateTime2mysql = $hx_exports["gDateTime2mysql"] = function(gDateTime) {
	var _this = new EReg("[\\. :]","g").split(gDateTime);
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = StringTools.trim(_this[i]);
	}
	var d = result;
	haxe_Log.trace(d,{ fileName : "src/view/FormData.hx", lineNumber : 338, className : "view.FormData", methodName : "gDateTime2mysql"});
	if(d.length != 6) {
		haxe_Log.trace("Falsches Datumsformat:" + gDateTime,{ fileName : "src/view/FormData.hx", lineNumber : 341, className : "view.FormData", methodName : "gDateTime2mysql"});
		return "Falsches Datumsformat:" + gDateTime;
	}
	return d[2] + "-" + d[1] + "-" + d[0] + " " + d[3] + ":" + d[4] + ":" + d[5];
};
view_FormData._gDateTime2mysql = $hx_exports["_gDateTime2mysql"] = function(gDate,gDateTime) {
	var _this = new EReg("[\\- :]","g").split(gDateTime);
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = StringTools.trim(_this[i]);
	}
	var d = result;
	haxe_Log.trace(d,{ fileName : "src/view/FormData.hx", lineNumber : 351, className : "view.FormData", methodName : "_gDateTime2mysql"});
	if(d.length != 6) {
		haxe_Log.trace("Falsches Datumsformat:" + gDateTime,{ fileName : "src/view/FormData.hx", lineNumber : 354, className : "view.FormData", methodName : "_gDateTime2mysql"});
		return "Falsches Datumsformat:" + gDateTime;
	}
	var _this = gDate.split(".");
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = StringTools.trim(_this[i]);
	}
	var n = result;
	if(n.length != 3) {
		haxe_Log.trace("Falsches Datumsformat:" + gDate + " :" + d.toString(),{ fileName : "src/view/FormData.hx", lineNumber : 364, className : "view.FormData", methodName : "_gDateTime2mysql"});
		return "Falsches Datumsformat:" + gDate;
	}
	return n[2] + "-" + n[1] + "-" + n[0] + " " + d[3] + ":" + d[4] + ":" + d[5];
};
var view_Input = function(data) {
	if(!(data.limit > 0)) {
		data.limit = 15;
	}
	this.vData = data;
	this.hasData = data.db;
	this.parentView = data.parentView;
	var c = js_Boot.getClass(this);
	this.name = c.__name__.split(".").pop();
	this.id = this.parentView.id + "_" + Std.string(data.name);
	this.loading = 0;
};
$hxClasses["view.Input"] = view_Input;
view_Input.__name__ = "view.Input";
view_Input.prototype = {
	vData: null
	,params: null
	,name: null
	,id: null
	,loading: null
	,parentView: null
	,hasData: null
	,init: function() {
		var _gthis = this;
		if(this.hasData) {
			this.loadData(this.resetParams(),function(data) {
				_gthis.update(data);
			});
		}
	}
	,loadData: function(data,callBack) {
		var _gthis = this;
		var dependsOn = this.vData.dependsOn;
		if(dependsOn != null && dependsOn.length > 0) {
			if(!Lambda.foreach(dependsOn,function(s) {
				if(Object.prototype.hasOwnProperty.call(_gthis.parentView.inputs.h,s)) {
					return _gthis.parentView.inputs.h[s].loading == 0;
				} else {
					return false;
				}
			})) {
				haxe_Log.trace(this.id + " still waiting on:" + dependsOn.toString(),{ fileName : "src/view/Input.hx", lineNumber : 52, className : "view.Input", methodName : "loadData"});
				var h = this.parentView.inputs.h;
				var iK_h = h;
				var iK_keys = Object.keys(h);
				var iK_length = iK_keys.length;
				var iK_current = 0;
				var ki = "";
				while(iK_current < iK_length) ki += iK_keys[iK_current++] + ",";
				return;
			}
		}
		haxe_Log.trace(this.id,{ fileName : "src/view/Input.hx", lineNumber : 62, className : "view.Input", methodName : "loadData"});
		this.loading++;
		$.post("server.php",data,function(data,textStatus,xhr) {
			callBack(data);
			_gthis.loading--;
		});
	}
	,resetParams: function(where) {
		this.params = { action : this.vData.action, className : this.name, dataType : "json", fields : [this.vData.value,this.vData.label].join(","), limit : this.vData.limit, table : this.vData.name};
		if(where != null) {
			this.params.where = where;
		}
		return this.params;
	}
	,update: function(data) {
		haxe_Log.trace("method has to be implemented by subclass",{ fileName : "src/view/Input.hx", lineNumber : 91, className : "view.Input", methodName : "update"});
	}
	,__class__: view_Input
};
var view_Mailing = function(data) {
	View.call(this,data);
	this.host = window.location.host;
	this.proto = window.location.protocol;
	this.init();
};
$hxClasses["view.Mailing"] = view_Mailing;
view_Mailing.__name__ = "view.Mailing";
view_Mailing.__super__ = View;
view_Mailing.prototype = $extend(View.prototype,{
	cMenu: null
	,host: null
	,proto: null
	,mailingID: null
	,printNewMembers: function(mID) {
		var product = $("#" + mID + " input[name=\"product\"]:checked").val();
		var url = "" + this.proto + "//" + this.host + "/cgi-bin/mailing.pl?action=PRINTNEW&product=" + product;
		haxe_Log.trace(url,{ fileName : "src/view/Mailing.hx", lineNumber : 32, className : "view.Mailing", methodName : "printNewMembers"});
		$("#" + mID + " #preparing-file-download").show();
		$("#error-download").hide();
		$("#" + mID + " #success-download").hide();
		$.fileDownload(url,{ successCallback : function(url) {
			haxe_Log.trace("OK:) " + url,{ fileName : "src/view/Mailing.hx", lineNumber : 39, className : "view.Mailing", methodName : "printNewMembers"});
			$("#" + mID + " #preparing-file-download").hide();
			$("#" + mID + " #success-download").show();
		}, failCallback : function(responseHtml,url) {
			haxe_Log.trace("oops " + url + " " + responseHtml,{ fileName : "src/view/Mailing.hx", lineNumber : 45, className : "view.Mailing", methodName : "printNewMembers"});
			$("#" + mID + " #preparing-file-download").hide();
			$("#error-download").show();
		}});
	}
	,printList: function(mID) {
		var list = $("#" + mID + " #printListe").val();
		var product = $("#" + mID + " input[name=\"product\"]:checked").val();
		var url = "" + this.proto + "//" + this.host + "/cgi-bin/mailing.pl?action=PRINTLIST&list=" + encodeURIComponent(list) + "&product=" + product;
		haxe_Log.trace(url,{ fileName : "src/view/Mailing.hx", lineNumber : 68, className : "view.Mailing", methodName : "printList"});
		$("#" + mID + " #preparing-file-download").show();
		$("#error-download").hide();
		$("#" + mID + " #success-download").hide();
		$.fileDownload(url,{ successCallback : function(url) {
			haxe_Log.trace("OK: " + url,{ fileName : "src/view/Mailing.hx", lineNumber : 75, className : "view.Mailing", methodName : "printList"});
			$("#" + mID + " #preparing-file-download").hide();
			$("#" + mID + " #success-download").show();
		}, failCallback : function(responseHtml,url) {
			haxe_Log.trace("oops " + url + " " + responseHtml,{ fileName : "src/view/Mailing.hx", lineNumber : 81, className : "view.Mailing", methodName : "printList"});
			$("#" + mID + " #preparing-file-download").hide();
			$("#error-download").show();
		}});
	}
	,printNewInfos: function(mID) {
		var product = $("#" + mID + " input[name=\"product\"]:checked").val();
		var url = "" + this.proto + "//" + this.host + "/cgi-bin/mailing.pl?action=S_POST&product=" + product;
		haxe_Log.trace(url,{ fileName : "src/view/Mailing.hx", lineNumber : 103, className : "view.Mailing", methodName : "printNewInfos"});
		$("#" + mID + " #preparing-file-download").show();
		$("#error-download").hide();
		$("#" + mID + " #success-download").hide();
		$.fileDownload(url,{ successCallback : function(url) {
			haxe_Log.trace("OK: " + url,{ fileName : "src/view/Mailing.hx", lineNumber : 111, className : "view.Mailing", methodName : "printNewInfos"});
			$("#" + mID + " #preparing-file-download").hide();
			$("#" + mID + " #success-download").show();
		}, failCallback : function(responseHtml,url) {
			haxe_Log.trace("oops " + url + " " + responseHtml,{ fileName : "src/view/Mailing.hx", lineNumber : 118, className : "view.Mailing", methodName : "printNewInfos"});
			$("#" + mID + " #preparing-file-download").hide();
			$("#error-download").show();
		}});
	}
	,previewOne: function(mID) {
	}
	,__class__: view_Mailing
});
var view_Pager = function(data) {
	var _gthis = this;
	var colspan = $("#" + Std.string(data.id) + "-list tr").first().children().length;
	data.colspan = colspan;
	this.count = data.count;
	this.limit = data.limit;
	this.page = data.page;
	this.last = Math.ceil(this.count / this.limit);
	this.parentView = data.parentView;
	haxe_Log.trace(Std.string(data.id) + ":" + this.page + ":" + this.count,{ fileName : "src/view/Pager.hx", lineNumber : 28, className : "view.Pager", methodName : "new"});
	$("#t-pager").tmpl(data).appendTo($("#" + Std.string(data.id) + "-list"));
	$("#" + Std.string(data.id) + "-pager *[data-action]").each(function(i,n) {
		$(n).click($bind(_gthis,_gthis.go));
	});
};
$hxClasses["view.Pager"] = view_Pager;
view_Pager.__name__ = "view.Pager";
view_Pager.prototype = {
	count: null
	,limit: null
	,page: null
	,last: null
	,parentView: null
	,go: function(evt) {
		evt.preventDefault();
		var action = $(evt.target).data("action");
		haxe_Log.trace(action + ":" + this.page + ":" + this.count + ":" + this.last,{ fileName : "src/view/Pager.hx", lineNumber : 41, className : "view.Pager", methodName : "go"});
		switch(action) {
		case "first":
			if(this.page > 1) {
				this.loadPage(1);
			}
			break;
		case "go2page":
			var iVal = Std.parseInt($("#" + this.parentView.id + "-pager input[name=\"page\"]").val());
			if(iVal > this.last) {
				iVal = this.last;
				$("#" + this.parentView.id + "-pager input[name=\"page\"]").val(Std.string(this.last));
			}
			if(iVal != this.page) {
				this.loadPage(iVal);
			}
			break;
		case "last":
			if(this.page < this.last) {
				this.loadPage(this.last);
			}
			break;
		case "next":
			if(this.page < this.last) {
				this.loadPage(++this.page);
			}
			break;
		case "previous":
			if(this.page > 1) {
				this.loadPage(--this.page);
			}
			break;
		}
	}
	,loadPage: function(p) {
		var form = $("#" + this.parentView.id + "-menu .ui-accordion-content-active form");
		haxe_Log.trace(form.find("button[data-contextaction]").data("contextaction"),{ fileName : "src/view/Pager.hx", lineNumber : 74, className : "view.Pager", methodName : "loadPage"});
		haxe_Log.trace(Type.typeof(this.parentView.contextMenu),{ fileName : "src/view/Pager.hx", lineNumber : 77, className : "view.Pager", methodName : "loadPage"});
		this.parentView.contextMenu.findPage(p == null ? "null" : "" + p,(p - 1) * this.limit + "," + (p + this.limit <= this.count ? this.limit : this.count - (p - 1) * this.limit));
	}
	,__class__: view_Pager
};
var view_TabBox = function(data) {
	var _gthis = this;
	View.call(this,data);
	this.tabLabel = [];
	this.tabLinks = [];
	if(data != null) {
		this.tabBoxData = data;
		if(this.tabBoxData.isNav) {
			pushstate_PushState.init();
			pushstate_PushState.addEventListener(null,null,$bind(this,this.go));
		}
		this.active = 0;
		var _g = 0;
		var _g1 = this.tabBoxData.tabs;
		while(_g < _g1.length) {
			var tab = _g1[_g];
			++_g;
			if(tab.id == this.tabBoxData.action) {
				this.active = this.tabLinks.length;
			}
			this.tabLabel.push(tab.label);
			this.tabLinks.push(tab.id);
			this.dbLoader.push(new haxe_ds_StringMap());
		}
		haxe_Log.trace(this.id + ":" + this.dbLoader.length,{ fileName : "src/view/TabBox.hx", lineNumber : 79, className : "view.TabBox", methodName : "new"});
		$("#t-" + this.id).tmpl(this.tabBoxData.tabs).appendTo(this.root.find("ul:first"));
		this.tabObj = this.root.tabs({ active : 0, activate : function(event,ui) {
			haxe_Log.trace($(ui.newPanel),{ fileName : "src/view/TabBox.hx", lineNumber : 88, className : "view.TabBox", methodName : "new"});
			var selector = ui.newPanel.selector;
			var template = "";
			try {
				haxe_Log.trace("" + selector + " a:" + $("" + selector).attr("aria-labelledby"),{ fileName : "src/view/TabBox.hx", lineNumber : 93, className : "view.TabBox", methodName : "new"});
				selector = $("" + selector).attr("aria-labelledby");
				haxe_Log.trace(App.ist.globals.templates,{ fileName : "src/view/TabBox.hx", lineNumber : 95, className : "view.TabBox", methodName : "new"});
				haxe_Log.trace("selector:" + selector,{ fileName : "src/view/TabBox.hx", lineNumber : 96, className : "view.TabBox", methodName : "new"});
				template = Reflect.field(App.ist.globals.templates,$("#" + selector).attr("href"));
				var v = template;
				if(!(v != null && v != 0 && v != "")) {
					haxe_Log.trace("loading templates/" + $("#" + selector).attr("href") + ".html...",{ fileName : "src/view/TabBox.hx", lineNumber : 101, className : "view.TabBox", methodName : "new"});
					$.get("templates/" + $("#" + selector).attr("href") + ".html",function(data,textStatus,xhr) {
						haxe_Log.trace("" + textStatus + ":" + xhr.responseURL + xhr.getAllResponseHeaders(),{ fileName : "src/view/TabBox.hx", lineNumber : 103, className : "view.TabBox", methodName : "new"});
						if(data.length > 0) {
							haxe_Log.trace(data.substr(0,100),{ fileName : "src/view/TabBox.hx", lineNumber : 105, className : "view.TabBox", methodName : "new"});
						}
						if(textStatus == "success") {
							if(data == "NOTFOUND") {
								return;
							}
							$("body").append(data);
							App.ist.globals.templates[$("#" + selector).attr("href")] = true;
							haxe_Log.trace(window.lastView,{ fileName : "src/view/TabBox.hx", lineNumber : 112, className : "view.TabBox", methodName : "new"});
							if(window.lastView == null) {
								return;
							}
							_gthis.tabBoxData.tabs[_gthis.tabsInstance.options.active].views.push(window.lastView);
							haxe_Log.trace(Std.string(_gthis.tabsInstance.options.active) + ":" + _gthis.tabBoxData.tabs[_gthis.tabsInstance.options.active].views.length,{ fileName : "src/view/TabBox.hx", lineNumber : 117, className : "view.TabBox", methodName : "new"});
							var v = _gthis.tabBoxData.tabs[_gthis.tabsInstance.options.active].views[_gthis.tabBoxData.tabs[_gthis.tabsInstance.options.active].views.length - 1];
							v.attach2 = _gthis.tabsInstance.panels[_gthis.tabsInstance.options.active];
							v.dbLoaderIndex = _gthis.tabsInstance.options.active;
							var jP = $(_gthis.tabsInstance.panels[_gthis.tabsInstance.options.active]);
							haxe_Log.trace("adding:" + _gthis.tabBoxData.tabs[_gthis.tabsInstance.options.active].id + " to:" + _gthis.id + " @:" + Std.string(_gthis.tabsInstance.options.active),{ fileName : "src/view/TabBox.hx", lineNumber : 126, className : "view.TabBox", methodName : "new"});
							_gthis.addView(v);
							_gthis.loadAllData(v.dbLoaderIndex);
						}
					});
				}
			} catch( _g ) {
				var ex = haxe_Exception.caught(_g).unwrap();
				haxe_Log.trace(ex,{ fileName : "src/view/TabBox.hx", lineNumber : 138, className : "view.TabBox", methodName : "new"});
			}
			haxe_Log.trace("activate:" + Std.string(ui.newPanel.selector) + ":" + Std.string(ui.newTab.context) + ":" + Std.string(_gthis.tabsInstance.options.active) + ":" + _gthis.active + " template:" + template,{ fileName : "src/view/TabBox.hx", lineNumber : 139, className : "view.TabBox", methodName : "new"});
			_gthis.dbLoaderIndex = _gthis.active = _gthis.tabsInstance.options.active;
			pushstate_PushState.replace(Std.string(ui.newTab.context).split(window.location.hostname).pop());
			_gthis.runLoaders();
		}, create : function(event,ui) {
			haxe_Log.trace("ready2load content4tabs:" + _gthis.tabBoxData.tabs.length,{ fileName : "src/view/TabBox.hx", lineNumber : 147, className : "view.TabBox", methodName : "new"});
			_gthis.tabsInstance = $("#" + _gthis.id).tabs("instance");
			if(_gthis.tabBoxData.append2header != null) {
				var views = App.getViews();
				views.h[App.appName + "." + _gthis.tabBoxData.append2header].template.appendTo($("#" + _gthis.id + " ul"));
			}
			var tabIndex = 0;
			var _g = 0;
			var _g1 = _gthis.tabBoxData.tabs;
			while(_g < _g1.length) {
				var t = _g1[_g];
				++_g;
				var _g2 = 0;
				var _g3 = t.views;
				while(_g2 < _g3.length) {
					var v = _g3[_g2];
					++_g2;
					v.dbLoaderIndex = tabIndex;
					v.attach2 = _gthis.tabsInstance.panels[tabIndex];
					var jP = $(_gthis.tabsInstance.panels[tabIndex]);
					if(tabIndex != _gthis.active) {
						jP.css("visibility","hidden").show();
					}
					haxe_Log.trace("adding:" + t.id + " to:" + _gthis.id + " @:" + tabIndex,{ fileName : "src/view/TabBox.hx", lineNumber : 171, className : "view.TabBox", methodName : "new"});
					_gthis.addView(v);
					if(tabIndex != _gthis.active) {
						jP.hide(0).css("visibility","visible");
					}
				}
				++tabIndex;
			}
		}, beforeLoad : function(event,ui) {
			haxe_Log.trace("beforeLoad " + ui.ajaxSettings.url,{ fileName : "src/view/TabBox.hx", lineNumber : 182, className : "view.TabBox", methodName : "new"});
			return false;
		}, heightStyle : this.tabBoxData.heightStyle == null ? "auto" : this.tabBoxData.heightStyle});
		haxe_Log.trace(this.tabsInstance.option("active"),{ fileName : "src/view/TabBox.hx", lineNumber : 189, className : "view.TabBox", methodName : "new"});
		haxe_Log.trace(this.dbLoader.length + ":" + this.active,{ fileName : "src/view/TabBox.hx", lineNumber : 190, className : "view.TabBox", methodName : "new"});
	}
	haxe_Log.trace(window.location.pathname + " != " + App.basePath,{ fileName : "src/view/TabBox.hx", lineNumber : 193, className : "view.TabBox", methodName : "new"});
	if(window.location.pathname != App.basePath) {
		haxe_Timer.delay(function() {
			_gthis.go(window.location.href);
			_gthis.init();
		},500);
	} else {
		this.init();
	}
};
$hxClasses["view.TabBox"] = view_TabBox;
view_TabBox.__name__ = "view.TabBox";
view_TabBox.__super__ = View;
view_TabBox.prototype = $extend(View.prototype,{
	active: null
	,tabBoxData: null
	,tabsInstance: null
	,tabObj: null
	,tabLinks: null
	,tabLabel: null
	,go: function(url) {
		haxe_Log.trace(url + ":" + this.tabLinks.join(","),{ fileName : "src/view/TabBox.hx", lineNumber : 207, className : "view.TabBox", methodName : "go"});
		haxe_Log.trace(Std.string(this.tabsInstance.options.active) + " : " + this.tabLinks.indexOf(url),{ fileName : "src/view/TabBox.hx", lineNumber : 208, className : "view.TabBox", methodName : "go"});
		if(url.indexOf("?") > -1) {
			if(this.tabLinks[this.tabsInstance.options.active] != "clients") {
				if(this.tabObj != null) {
					this.tabObj.tabs("option","active",1);
				}
				var tmp = App.company + " " + App.appName + "  ";
				var tmp1 = this.tabLabel[this.tabsInstance.options.active];
				window.document.title = tmp + tmp1;
				return;
			}
		}
		if(typeof(url) != "string") {
			me_cunity_debug_Out.dumpStack(haxe_CallStack.callStack(),{ fileName : "src/view/TabBox.hx", lineNumber : 230, className : "view.TabBox", methodName : "go"});
			return;
		}
		var p = url.split(App.basePath);
		if(p.length == 2 && p[1] == "") {
			p[1] = this.tabLinks[0];
		} else if(p.length == 1) {
			p[1] = url;
		}
		if(this.tabsInstance.options.active == this.tabLinks.indexOf(p[1])) {
			haxe_Log.trace(Std.string(this.tabsInstance.options.active) + " == " + this.tabLinks.indexOf(p[1]),{ fileName : "src/view/TabBox.hx", lineNumber : 241, className : "view.TabBox", methodName : "go"});
			return;
		}
		if(this.tabLinks[this.tabsInstance.options.active] != p[1]) {
			haxe_Log.trace(this.id + " root:" + this.root.attr("id"),{ fileName : "src/view/TabBox.hx", lineNumber : 246, className : "view.TabBox", methodName : "go"});
			if(this.tabObj != null) {
				this.tabObj.tabs("option","active",this.tabLinks.indexOf(p[1]));
			}
		}
		var tmp = App.company + " " + App.appName + "  ";
		var tmp1 = this.tabLabel[this.tabsInstance.options.active];
		window.document.title = tmp + tmp1;
	}
	,__class__: view_TabBox
});
function $iterator(o) { if( o instanceof Array ) return function() { return new haxe_iterators_ArrayIterator(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
var typeofJQuery = typeof($);
if(typeofJQuery != "undefined" && $.fn != null) {
	$.fn.elements = function() {
		return new js_jquery_JqEltsIterator(this);
	};
}
var typeofJQuery = typeof($);
if(typeofJQuery != "undefined" && $.fn != null) {
	$.fn.iterator = function() {
		return new js_jquery_JqIterator(this);
	};
}
DateTools.DAY_SHORT_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
DateTools.DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
DateTools.MONTH_SHORT_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
DateTools.MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
me_cunity_debug_Out.suspended = false;
me_cunity_debug_Out.skipFields = [];
me_cunity_debug_Out.skipFunctions = true;
me_cunity_debug_Out.traceToConsole = false;
me_cunity_debug_Out.traceTarget = me_cunity_debug_DebugOutput.NATIVE;
me_cunity_debug_Out.aStack = haxe_CallStack.callStack;
pushstate_PushState.ignoreAnchors = true;
App.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=flyCRM.js.map