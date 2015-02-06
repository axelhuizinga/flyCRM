package model;
import haxe.ds.StringMap;

/**
 * ...
 * @author axel@cunity.me
 */
class Clients extends Model
{
	public var data:StringMap<Dynamic>;
	
	public function new() 
	{
		data = new StringMap();
	}
	
}