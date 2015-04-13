package view;

import haxe.ds.StringMap;
import jQuery.Event;
import jQuery.JHelper.J;

/**
 * ...
 * @author axel@cunity.me
 */
class Pager// extends View
{
	var count:Int;
	var limit:Int;
	var page:Int;
	var last:Int;
	var parentView:View;
	
	public function new(?data:Dynamic) 
	{
		var colspan:Int = J('#' + data.id + '-list tr').first().children().length;
		data.colspan = colspan;
		count = data.count;
		limit = data.limit;
		page = data.page;
		last = Math.ceil(count / limit);
		parentView = data.parentView;
		trace(data.id + ':' + page + ':' + count);

		J('#t-pager').tmpl(data).appendTo(J('#' + data.id + '-list'));	
		J('#' + data.id + '-pager *[data-action]').each(function(i, n)
		{
			J(n).click(go);
		});
	}
	
	public function go(evt:Event)
	{
		evt.preventDefault();
		var action:String = J(cast evt.target).data('action');
		trace(action + ':' + page + ':' + count +':' + last);
		switch(action)
		{
			case 'go2page':
				var iVal = Std.parseInt(J('#' + parentView.id + '-pager input[name="page"]').val());
				if (iVal > last)
				{
					iVal = last;
					J('#' + parentView.id + '-pager input[name="page"]').val(Std.string(last));
				}
				if(iVal != page)
					loadPage(iVal);
					
			case 'previous':
				if(page > 1)
					loadPage(--page);
			case 'first':
				if(page > 1)
					loadPage(1);
			case 'next':
				if(page < last)
					loadPage(++page);			
			case 'last':
				if(page < last)
					loadPage(last);							
		}
	}
	
	function loadPage(p:Int):Void
	{
		var param:StringMap<String> = new StringMap();
		param.set('page', Std.string(p));
		param.set('limit', ((p - 1) * limit) + ',' + (p + limit <= count? limit:count - ((p - 1) * limit)));
		parentView.find(param);
	}
	
}