package model;
import haxe.ds.StringMap;

/**
 * ...
 * @author axel@cunity.me
 */
class Client extends Model
{
	public var data:StringMap<Dynamic>;
	
	public function new() 
	{
		data = new StringMap();
	}
	
}