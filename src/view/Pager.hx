package view;

import jQuery.Event;
import jQuery.JHelper.J;

/**
 * ...
 * @author axel@cunity.me
 */
class Pager// extends View
{

	public function new(?data:Dynamic) 
	{
		var colspan:Int = J('#' + data.id + '-list tr').first().children().length;
		data.colspan = colspan;
		trace(data);
		/*if ( J('#' + data.id + '-pager').length > 0)
			J('#' + data.id + '-pager').replaceWith(J('#t-pager').tmpl(data));
		else*/
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
	}
	
}