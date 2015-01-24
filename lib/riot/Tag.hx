package riot;

/**
 * ...
 * @author axel@cunity.me
 */
@:native('riot.tag')
extern class Tag extends Observable
{
	var opt:Dynamic;
	var parent: Tag;
	var root: Node;
	
	public function new(name:String, tmpl: String, ?constructor:Dynamic->Void):Void;
	
	public static function update(?data:Dynamic,?_system:Bool):Tag;
	
}