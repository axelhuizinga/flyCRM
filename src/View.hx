package;
import js.Browser;
import js.html.Element;
import js.JQuery;
import js.JQuery.JQueryHelper.J;
import me.cunity.debug.Out;


/**
 * ...
 * @author axel@cunity.me
 */
class View
{

	var name:String;
	var root:Array<Element>;
	var template:Array<String>;
	
	public function new(?data:Dynamic) 
	{
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		var j:JQuery = J('.app[data="' + name+'"]');
		template = new Array();
		j.each(function()
		{
			template.push(JQuery.cur.html());
			JQuery.cur.html('') ;
		});
		root = j.get();
		
		//trace(Type.getClassName(Type.getClass(this))); 
		trace(name + ':' + template.); 		
	}
		
}