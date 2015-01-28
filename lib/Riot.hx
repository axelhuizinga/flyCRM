package;
import js.html.Element;
import js.html.UIEvent;
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
	
	static function mountTo(domNode:Element, tagName:String, ?opts:Dynamic):Tag;
	
	@:overload(function(collection:String, id:String, action:String):Void{})
	public static function route(to:String):Void;

	static function observable(el:Dynamic):Observable;
	
	static function tag(name:String, tmpl:String, ?fn:Dynamic->Void):Tag;
	
	static function update():Array<Tag>;
	
}