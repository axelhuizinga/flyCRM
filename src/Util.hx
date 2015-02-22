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
		return untyped __js__(v);
		#elsif php
		return untyped __php__(v);
		#end
		return false;
	}
	
}