package;
import js.html.Element;
import riot.Observable;
import riot.Tag;


/**
 * ...
 * @author axel@cunity.me
 */
@:native('riot')
extern class Riot
{

	static function mount(selector:String, ?opts:Dynamic):Array<Tag>;
	
	static function mountTo(domNode:Element, tagName:String, ?opts:Dynamic);
	
	@:overload ( function route(collection:String, id:String, action:String):Void{})
	static function route(to:String):Void;

	static function observable(el:Dynamic):Observable;
	
	static function update():Array<Tag>;
	
}