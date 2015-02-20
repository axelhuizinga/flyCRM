package model;
import haxe.Json;
import sys.db.Object;
import sys.db.Types.SString;
/**
 * ...
 * @author axel@cunity.me
 */
@:table("vicidial_campaigns")
@:id(campaign_id)
class Campaigns extends Object
{
	var campaign_id:SString<8>;

	public function json() 
	{
		Json.stringify(this);
	}
	
}