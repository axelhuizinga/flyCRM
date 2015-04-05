package view;
import js.Browser;

/**
 * ...
 * @author axel@cunity.me
 */
class Mailing extends View
{
	var cMenu:ContextMenu;
	
	public function new(?data:Dynamic) 
	{
		super(?data);
		
	}
	
	public function printNewMember():Void
	{
		Browser.window.postMessage( { action:'printAllWelcomeMessages', bin:'C:\\' + App.appName + '\\' + App.company + '\\bin\\druckeAnschreibenKinder.lnk' }, 
			Browser.window.location.origin);
	}
	
}