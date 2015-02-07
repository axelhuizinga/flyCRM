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
	@:optional var views:Array<Dynamic>;
}

class View
{

	var id:String;
	var name:String;
	var root:JQuery;
	var template:JQuery;
	var templates:StringMap<String>;
	var views:Array<ViewData>;
	//var app:Class<Application>;
	
	public function new(?data:Dynamic ) 
	{
		views = new Array();
		templates = new StringMap();
		var data:ViewData = cast data;
		id = data.id;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		root = J('[id="' + id+'"]');
		trace(name + ':'  + id ); 		
	}
		
}