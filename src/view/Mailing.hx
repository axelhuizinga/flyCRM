package view;
import js.Browser;

/**
 * ...
 * @author axel@cunity.me
 */
class Mailing extends View
{
	var cMenu:ContextMenu;
	public var mailingID:String;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		//trace(parentView);
		init();
	}
	
	public function printNewMembers():Void
	{
		Browser.window.postMessage( { 
			action:'printAllWelcomeMessages', 
			bin:'C:\\' + App.appName + '\\' + App.company + '\\bin\\druckeAnschreibenKinder.lnk',
			template:'C:/' + App.appName + '/' + App.company + '/Anschreiben/Kinder-Neu.odt'
		}, 
		Browser.window.location.origin);
	}
	
	public function printOne(mID:String):Void
	{
		trace(mID);
		Browser.window.postMessage({
			action:'printWelcomeMessage',
			bin:'C:\\' + App.appName + '\\' + App.company + '\\bin\\druckeAnschreibenKinder.lnk',
			memberID:mID,
			template:'C:/' + App.appName + '/' + App.company + '/Anschreiben/Kinder-Neu.odt'
		}, Browser.window.location.origin);		
	}
	
	public function previewOne(mID:String):Void
	{
		
	}
}