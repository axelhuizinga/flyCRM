package;
import haxe.ds.StringMap;
import haxe.EitherType;
import js.Browser;
import js.html.Element;
import jQuery.JHelper.J;
import jQuery.*;
import js.html.Node;
import js.html.XMLHttpRequest;

import me.cunity.debug.Out;


/**
 * ...
 * @author axel@cunity.me
 */

typedef   ViewData = 
{
	var action:String;
	var attach2:String;
	var id:String;
	@:optional var parent: String;
	@:optional var parentView: View;
	@:optional var views:Array<ViewData>;
}

class View
{
	var attach2:EitherType<String, Element>; // parentSelector
	var repaint:Bool;
	var id:String;
	var name:String;
	var root:JQuery;
	var vData:Dynamic;
	var template:JQuery;
	var views:StringMap<View>;
	var parentView:View;
	
	public function new(?data:Dynamic ) 
	{
		views = new StringMap();
		vData = data;
		var data:ViewData = cast data;
		id = data.id;
		parentView = data.parentView;
		attach2 = data.attach2 == null ? '#' + id : data.attach2;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		root = J('#' + id);
		trace(name + ':'  + id + ':' + root.length + ':' + attach2); 		
	}
	
	public function addView(v:Dynamic):View
	{
		var av:View = null;
		var className:String = Reflect.fields(v)[0];
		var iParam:Dynamic = Reflect.field(v, className);
		//trace(className + ':' + iParam);
		var cl:Class<Dynamic> = Type.resolveClass('view.' + className);
		if (cl != null)
		{
			//trace(cl);
			if (Reflect.hasField(v, 'attach2'))
				iParam.attach2 = v.attach2;
			iParam.parentView = this;
			//trace(Std.string(iParam));
			av = Type.createInstance(cl, [iParam]);
			views.set(iParam.id, av);				
			trace("views.set(" +iParam.id +")");
		}		
		return av;
	}
	
	public function addViews(v2add:Array<ViewData>):Void
	{
		for (vD in v2add)
		{
			vD.parentView = this;
			addView(vD);
		}
		
	}
	
	public function loadData(url:String,params:Dynamic, callBack:Dynamic->String->Void, ?parent:String):Void
	{
		//Out.dumpObject(params);
		trace(Std.string(params));
		
		trace(url);
		JQueryStatic.post(url, params , function(data:Dynamic, textStatus:String, xhr:XMLHttpRequest)
		//JQueryStatic.getJSON(url, params , function(data:Dynamic, textStatus:String, xhr:XMLHttpRequest)
		{
			//trace(data);
			callBack(data, parent);
		});
	}
	
	public function update(data:Dynamic, ?parent:String):Void
	{
		trace('has to be implemented in subclass!');
	}
		
}