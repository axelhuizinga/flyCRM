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
	var page:Int;
	var parentView:View;
	
	public function new(?data:Dynamic) 
	{
		var colspan:Int = J('#' + data.id + '-list tr').first().children().length;
		data.colspan = colspan;
		count = data.count;
		page = data.page;
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
		trace(J(cast evt.target).data('action'));
		var action:String = J(cast evt.target).data('action');
		switch(action)
		{
			case 'go2page':
				if(Std.parseInt(J('#' + parentView.id + '-pager input[name="page"]').val()) != page)
					loadPage(Std.parseInt(J('#' + parentView.id + '-pager input[name="page"]').val()));
			case 'previous':
				if(page > 1)
					loadPage(--page);
			case 'first':
				if(page > 1)
					loadPage(1);
			case 'next':
				if(page < count)
					loadPage(++page);			
			case 'last':
				if(page < count)
					loadPage(count);							
		}
	}
	
	function loadPage(p:Int):Void
	{
		var param:StringMap<String> = new StringMap();
		param.set('page', Std.string(p));
		param.set('limit', ((p - 1) * App.limit) + ',' + (p + App.limit <= count? App.limit:count - ((p - 1) * App.limit)));
		parentView.find(param);
	}
	
}