package view;

/**
 * ...
 * @author axel@cunity.me
 */
import jQuery.*;
import jQuery.JHelper.J;
import js.html.Element;
import View;

typedef ClientsData =
{>ViewData,
	@:optional var fields:Array<String>;
	@:optional var limit:Int;
	@:optional var listattach2:String;
	@:optional var order:String;
	@:optional var table:String;
	@:optional var where:String;
};

@:keep class Clients extends View
{
	var fields:Array<String>;
	var params:Dynamic;
	var listattach2:String;
	
	public function new(?data:ClientsData) 
	{
		super(data);
		//trace(data);
		listattach2 = data.listattach2;
		if (!(data.limit > 0))
			data.limit = 15;
		trace('#t-' + id + ' attach2:' + data.attach2);
		
		trace(J('#t-' + id));
		trace(J('#t-' + id).tmpl(data));
		J('#t-' + id).tmpl(data).appendTo(data.attach2);	
		if (data.table != null) // 	LOAD TABLE DATA
		{
			resetParams();
			if(data.order != null)
				params.order = data.order;
			loadData('server.php', params, update, listattach2);
		}
	}
	
	private function resetParams():Dynamic
	{
		fields = vData.fields;
		params = {
			action:'find',
			className:name,
			dataType:'json',
			fields:fields.join(','),
			limit:vData.limit,
			table:vData.table,
			where:vData.where
		}
		return params;
	}
	
	public function order(field:String):Void
	{
		trace(field);
		if (params.order != field)
		{
			params.order = field;
			loadData('server.php', params, update, listattach2);
		}
	}
	
	override public function update(data:Dynamic, ?parentSelector:String):Void
	{
		data.fields = fields;
		//trace(data);
		trace('parent:' + parentSelector + ':' + J(parentSelector).first());
		//J(parent).find('tr').first().siblings().remove();
		//J(parentSelector).children().remove();
		if ( J('#' + id + '-list').length > 0)
			J('#' + id + '-list').replaceWith(J('#t-' + id + '-list').tmpl(data));
		else
			J('#t-' + id + '-list').tmpl(data).appendTo(J(parentSelector).first());	
		J('#' + id + '-list th').each(function(i, el) { J(el).click(function(_) { order(J(el).data('order')); } ); } );
		
	}
}