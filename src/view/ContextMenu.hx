package view;
import jQuery.JHelper;
import jQuery.*;

import me.cunity.debug.Out;


typedef MenuItem =
{
	var link:String;
	var action:jQuery.Event->Void;
}
/**
 * ...
 * @author axel@cunity.me
 */
@:keep class ContextMenu extends View
{
	public static var instance:ContextMenu;
	var items:Array<MenuItem>;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		instance = this;	
	}
	
	public static function create(data:Dynamic):ContextMenu 
	{
		return new ContextMenu(data);	
	}
	
	public  function toggle(e:Event):Void
	{
		Out.dumpObject(e);
	}
	
/*	public function initTag(data:Dynamic, itag:Tag) :Void
	{
		Out.dumpObject(data);
		itag.items = data.items;
		Out.dumpObject(itag);
		trace(Type.getInstanceFields(Type.getClass(this)));
	};
	*/
}