package riot;

/**
 * ...
 * @author axel@cunity.me
 */
@:native('riot.observable')
extern class Observable
{
	public function new(element:Dynamic):Void;
	
	public function on(events : String, callb :Dynamic->Void) :Dynamic;
	
	public function one(events : String, callb :Dynamic->Void) :Dynamic;
	
	public function off(events : String, callb :Dynamic->Void) :Dynamic;
	
	public function trigger(name : String, ?args:Dynamic) :Dynamic;	
}