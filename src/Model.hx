package;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import php.NativeArray;

/**
 * ...
 * @author axel@cunity.me
 */
class Model
{
	//public var data:StringMap<Dynamic>;
	public var data:NativeArray;
	
	public function new() 
	{
		//data = new StringMap();
	}
	
	public function json_encode():EitherType<String,Bool>
	{
		return untyped __call__("json_encode", data);
	}
	
}