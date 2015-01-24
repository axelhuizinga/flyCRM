(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function(element) {
	riot.observable.call(this,element);
};
Main.main = function() {
	var contextMenu = new view.ContextMenu("contextMenu",{ items : [{ label : "first"},{ label : "2nd"},{ label : "3rd"}]});
};
Main.__super__ = riot.observable;
Main.prototype = $extend(riot.observable.prototype,{
});
var View = function(name,data) {
};
var js = {};
var view = {};
view.ContextMenu = function(name,data) {
	View.call(this,name,data);
};
view.ContextMenu.__super__ = View;
view.ContextMenu.prototype = $extend(View.prototype,{
});
var q = window.jQuery;
js.JQuery = q;
Main.main();
})();
