package view;

/**
 * ...
 * @author axel@cunity.me
 */

import jQuery.*;
import jQuery.JHelper.J;


class Editor extends View
{

	public function new(?data:Dynamic)  
	{
		super(data);
		//Out.dumpObject(data);
		templ = J('#t-' + id);
		trace(id);
	}
	
	public function  edit(id:Dynamic, className:String)
	{
		loadData('server.php', { action:'edit', id:id, className:className, primary_id:parentView.primary_id, join_table:vData.join_table }, update);
		
	}
	
	override public function update(data:Dynamic):Void
	{
		parentView.wait(false);
		templ.tmpl(data).appendTo(parentView.id);
	}
	
}