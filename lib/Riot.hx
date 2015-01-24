package;
import js.html.Node;
import riot.Observable;
import riot.Tag;


/**
 * ...
 * @author axel@cunity.me
 */
@:native('riot')
extern class Riot
{

	public static function mount(selector:String, ?opts:Dynamic):Array<Tag>
	
	public static function route(to:String ):Void;
	
	//public static function render(tmpl:String, data:Dynamic, ?escape_fn:Dynamic):String;
	
	public static function observable(el:Dynamic):Observable;
	
	public static function update():Array<Tag>;
	
}