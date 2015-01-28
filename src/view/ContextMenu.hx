package view;
import js.html.Event;
import js.JQuery.JQueryHelper.J;
import me.cunity.debug.Out;
import riot.RiotEvent;
import riot.Tag;

typedef MenuItem =
{
	var link:String;
	var action
}
/**
 * ...
 * @author axel@cunity.me
 */
@:expose class ContextMenu extends View
{
	public static var instance:ContextMenu;
	var items:Array
	
	public function new(?data:Dynamic) 
	{
		super(data);
		instance = this;
		tag = Riot.tag(name, J('#'+name).html(), untyped __js__("window['contextmenu']"));
		trace(tag);
		var instances:Array<Tag> = Riot.mount(name, data);
		trace(instances.length + ':' + instances[0]);		
	}
	
	public static function create(data:Dynamic):ContextMenu 
	{
		var me:ContextMenu = new ContextMenu(data);
		
		return me;
	}
	
	public  function toggle(e:RiotEvent):Bool
	{
		Out.dumpObject(e);
		return true;
	}
	
	public function initTag(data:Dynamic, itag:Tag) :Void
	{
		Out.dumpObject(data);
		itag.items = data.items;
		Out.dumpObject(itag);
		trace(Type.getInstanceFields(Type.getClass(this)));
	};
	
}