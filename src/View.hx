package;
import js.JQuery;
import js.JQuery.JQueryHelper.J;
import me.cunity.debug.Out;
import riot.Tag;

/**
 * ...
 * @author axel@cunity.me
 */
class View
{

	var name:String;
	
	public function new(name:String, ?opt:Dynamic) 
	{
		this.name = name;
		trace(Type.getClassName(Type.getClass(this))); 
		Riot.tag(name, J(name).html(), tag);
		Riot.mount(name, opt);
	}
		
	function tag(data:Dynamic) :Void
	{
		Out.dumpObject(data);
		trace(Reflect.fields(this));
	};
}