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
typedef   ViewData = 
{
	var id:String;
}
class View
{

	var id:String;
	var name:String;
	var root:JQuery;
	var template:String;
	
	public function new(?data:Dynamic) 
	{
		var data:ViewData = cast data;
		id = data.id;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		var j:JQuery = J('.app[id="' + data.id+'"]');
		root = j.find('.template');
		trace(j.length + ':' + root.length);
		template = root.html();
		root.html('');
		root.removeAttr('class');
		j.removeClass('app');
		trace(name + ':' + template); 		
	}
		
}