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
	var template:String;
	var templates:StringMap<String>;
	var views:Array<ViewData>;
	//var app:Class<Application>;
	
	public function new(?data:Dynamic ) 
	{
		//var app = Application;
		views = new Array();
		templates = new StringMap();
		var data:ViewData = cast data;
		id = data.id;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		var j:JQuery = J('.app[id="' + id+'"]');
		root = j.attr('data') =='template' ? j: j.find('[data="template"]');
		root.find('[data]').each(function(i:Int,node:Node)
		{
			templates.set(Std.string(J(node).attr('data')), J(node).html());
		});
		trace(j.length + ':' + root.length);
		template = root.html();
		root.html('');
		//root.removeAttr('class');
		j.removeClass('app');
		trace(name + ':'  + id + ':' + template); 		
	}
		
}