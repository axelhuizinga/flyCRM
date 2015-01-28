package riot;
import js.html.Element;
/**
 * ...
 * @author axel@cunity.me
 */

/*typedef Tag = 
{
	var opt:Dynamic;
	var parent: Tag;
	var root: Element;	
	var update:?Dynamic->?Bool->Tag;
}*/
@:native('riot.tag')
extern class Tag extends Observable implements Dynamic
{
	var opt:Dynamic;
	var parent: Tag;
	var root: Element;
	
	public function new(name:String, tmpl: String, ?constructor:Dynamic->Void):Void;
	
	public static function update(?data:Dynamic,?_system:Bool):Tag;
	
}