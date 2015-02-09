package view;

/**
 * ...
 * @author axel@cunity.me
 */
import jQuery.*;
import jQuery.JHelper.J;
import js.html.Element;

typedef ClientsData =
{>ViewData,
	@:optional fields:Array<String>;
	@:optional table:String;
};

@:keep class Clients extends View
{

	public function new(?data:ClientsData) 
	{
		super(data);
		trace(data);
		trace('#t-' + id + ' appendTo:' + data.parent);
		J('#t-' + id).tmpl(data).appendTo(data.parent);	
	}
	
	public function paint():Void
	{
		for (v in views)
		{
			root.append(J('#' + v));
		}
	}
	
	override public function update(data:Dynamic, parent:Element):Void
	{
		trace(parent);
		
	}
}