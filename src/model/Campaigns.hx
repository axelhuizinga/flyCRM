package model;
import haxe.Json;

/**
 * ...
 * @author axel@cunity.me
 */
@:table("vicidial_campaigns")
@:id(campaign_id)
class Campaigns extends Model
{
	var campaign_id:String;

	public function json() 
	{
		Json.stringify(this);
	}
	
}