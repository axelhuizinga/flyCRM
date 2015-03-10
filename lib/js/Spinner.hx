package js;
import js.html.Element;

/**
 * ...
 * @author axel@cunity.me
 */
class Spinner
{

	public static function stop(sp:Spinner):Void
	{
		untyped __js__("sp.stop()");
	}
	
	public static function spin(?opts:Dynamic, ?target:Element):Spinner
	{
		return untyped __js__("new Spinner"(opts) + "spin"(target));
	}
}