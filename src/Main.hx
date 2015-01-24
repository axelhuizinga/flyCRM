package ;

import js.Lib;
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
		var contextMenu:ContextMenu = new ContextMenu('contextMenu', { items:[ { label:'first' }, { label:'2nd' }, { label:'3rd' } ] } );
	}
	
}