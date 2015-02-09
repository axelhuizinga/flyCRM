package;
import haxe.ds.StringMap;
import js.Browser;
import js.html.Element;
import jQuery.JHelper.J;
import jQuery.*;
import js.html.Node;

import me.cunity.debug.Out;


/**
 * ...
 * @author axel@cunity.me
 */

typedef   ViewData = 
{
	var id:String;
	@:optional var parent: Element;
	@:optional var views:Array<ViewData>;
}

class View
{
	var repaint:Bool;
	var id:String;
	var name:String;
	var root:JQuery;
	var template:JQuery;
	//var templates:StringMap<String>;
	var views:StringMap<View>;
	
	public function new(?data:Dynamic ) 
	{
		views = new StringMap();
		//templates = new StringMap();
		var data:ViewData = cast data;
		id = data.id;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		root = J('[id="' + id+'"]');
		trace(name + ':'  + id ); 		
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
			if (Reflect.hasField(v, 'parent'))
				iParam.parent = Reflect.field(v, 'parent');
			av = Type.createInstance(cl, [iParam]);
			views.set(iParam.id, av);				
			trace("views.set(" +iParam.id +")");
		}		
		return av;
	}
	
	public function update(data:Dynamic, parent:Element):Void
	{
		trace('has to be implemented in subclass!');
	}
		
}