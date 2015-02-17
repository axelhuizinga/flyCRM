package view;

/**
 * ...
 * @author axel@cunity.me
 */

import jQuery.*;
import jQuery.JHelper.J;
import js.html.Element;
import View;
import view.Select;

typedef CampaignsData =
{>ViewData,	
	@:optional var limit:Int;
	@:optional var listattach2:String;
	@:optional var order:String;
	@:optional var select:Array<Dynamic>;
	@:optional var table:String;
	@:optional var where:String;
};
 
@:keep class Campaigns extends View
{
	var listattach2:String;
	
	public function new(?data:Dynamic) 
	{
		//trace(data);
		super(data);
		var campaignData:CampaignsData = cast data;
		listattach2 = campaignData.listattach2;
		if (!(data.limit > 0))
			data.limit = 15;
		trace('#t-' + id + ' attach2:' + data.attach2);
		J('#t-' + id).tmpl(data).appendTo(data.attach2);
		if(data.views != null)
			addViews(data.views);
	}
	
}