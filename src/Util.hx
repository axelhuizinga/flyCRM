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
		return (untyped __js__("typeof"))(v) != "undefined" ;
		#elseif php
		return untyped __physeq__(true,v);
		#end
	}
	
}