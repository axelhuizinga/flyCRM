package view;
import jQuery.JHelper;
import jQuery.*;
import jQuery.JHelper.J;

/**
 * ...
 * @author axel@cunity.me
 */
@:keep class SideBar extends View
{
	var views:Array<String>;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		views = data.views;
		paint();
	}
	
	public function paint():Void
	{
		for (v in views)
		{
			root.append(J('#' + v));
		}
	}
	
}