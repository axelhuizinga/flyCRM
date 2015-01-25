package view;
import js.html.Event;
import me.cunity.debug.Out;
import riot.RiotEvent;
/**
 * ...
 * @author axel@cunity.me
 */
class ContextMenu extends View
{
	
	public function new(?data:Dynamic) 
	{
		super('ContextMenu', data);

	}
	
	public static function create(data:Dynamic):ContextMenu 
	{
		var me:ContextMenu = new ContextMenu(data);
		
		return me;
	}
	
	public static function toggle(e:RiotEvent):Bool
	{
		Out.dumpObject(e);
		return true;
	}
	
}