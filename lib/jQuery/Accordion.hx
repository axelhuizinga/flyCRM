package jQuery;
import jQuery.haxe.Plugin;

/**
 * ...
 * @author axel@cunity.me
 */
extern class Accordion implements Plugin
{
	
	@:overload
	public function accordion( op:String, ?field:String, ?val:Dynamic):Dynamic
	{
		return untyped this.accordion(op, field, val);
	};
	
	@:overload
	public  function accordion(?options:Dynamic):JQuery
	{
		return untyped this.accordion(options);
	}
	
	@:overload
	public  function instance(?options:Dynamic):JQuery
	{
		return untyped this.accordion(options);
	}	
	
}