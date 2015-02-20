package view;

import jQuery.*;
import jQuery.JHelper.J;

using Lambda;
/**
 * ...
 * @author axel@cunity.me
 */

class Select extends Input
{

	
	
	public function new(data:Dynamic) 
	{
		super(data);
		//trace(data);
	}
	
	override private function resetParams(?where:Dynamic):Dynamic
	{
		params = {
			action:vData.action,
			className:name,
			dataType:'json',
			fields:[vData.value, vData.label].join(','),
			limit:vData.limit,
			table:vData.name
		};
		if (vData.where != null)
		{
			var whereCheck:Array<String> = vData.where.check;
			var whereParam:Array<String> = [];
			if (vData.check)
			{
				var checks:Array<{name:String, checked:Bool}> = vData.check;
				for (c in checks)
				{
					if(c.checked && whereCheck.has(c.name))
					whereParam.push(c.name + "='Y'" );
				}
				if (whereParam.length > 0)
				params.where = whereParam.join('|');
			}			
		}
			
		return params;
	}
	
	override public function update(data:Dynamic)
	{
		trace(data);
		J('#t-options').tmpl(data).appendTo(J('#'+id));
	}
	
}