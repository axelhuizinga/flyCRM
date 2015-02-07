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
	
	public static function get(param:StringMap<Dynamic>):StringMap<Dynamic>
	{
		
	}
	
	public function query(sql:String):StringMap<Dynamic>
	{
		
	}
}