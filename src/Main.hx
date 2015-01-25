package ;

import haxe.Log;
import js.Lib;
import me.cunity.debug.Out;
import riot.Observable;
import view.ContextMenu;

/**
 * ...
 * @author axel@cunity.me
 */

class Main extends Observable
{
	
	static function main() 
	{
		Log.trace = Out._trace;
		var contextMenu:ContextMenu =  ContextMenu.create({ items:[ { label:'first' }, { label:'2nd' }, { label:'3rd' } ] } );
	}
	
}