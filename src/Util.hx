package;
import haxe.ds.StringMap;

/**
 * ...
 * @author axel@cunity.me
 */
class Util
{

	public static function any2bool(v:Dynamic) :Bool
	{
		#if js
		//trace(untyped __js__("v?true:false"));
		return (untyped __js__("v?true:false"));
		#elseif php
		return untyped __php__("true ==$v");
		#end
	}
	
	public static function copyStringMap<T>(source:StringMap<T>):StringMap<T>
	{
		var copy:StringMap<T> = new StringMap();
		var keys = source.keys();
		while (keys.hasNext())
		{
			var k:String = keys.next();
			copy.set(k, source.get(k));
		}
		return copy;
	}
}