package view;

/**
 * ...
 * @author axel@cunity.me
 */
import jQuery.*;
import jQuery.JHelper.J;

@:keep class Clients extends View
{

	public function new(?data:Dynamic) 
	{
		super(data);
		
	}
	
	public function paint():Void
	{
		for (v in views)
		{
			root.append(J('#' + v));
		}
	}
}