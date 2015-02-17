package view;

import jQuery.*;
import jQuery.JHelper.J;

/**
 * ...
 * @author axel@cunity.me
 */

class Select extends Input
{

	
	
	public function new(data:Dynamic) 
	{
		super(data);
		if (data.db = 1)
		{
			loadData( resetParams(), function(data:Dynamic) { //data.parentSelector = listattach2; 
			update(data); });
		}
	}
	
	private function resetParams(where:String = ''):Dynamic
	{
		//fields = vData.fields;
		params = {
			action:'find',
			className:name,
			dataType:'json',
			fields:[vData.value, vData.label].join(','),
			limit:vData.limit,
			table:vData.name,
			where:(vData.where.length>0 ? vData.where + (where == '' ? where : ',' + where) : where )
		}
		return params;
	}
	
	public function update(data:Dynamic)
	{
		trace(data);
		J('#t-options').tmpl(data).appendTo(J('#'+id));
	}
	
}