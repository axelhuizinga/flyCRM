package;

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
	
}