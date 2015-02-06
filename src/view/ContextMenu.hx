package view;
import jQuery.JHelper;
import jQuery.*;
import js.JqueryUI;

import me.cunity.debug.Out;
import View;

using js.JqueryUI;

typedef MenuItem =
{
	var link:String;
	var action:jQuery.Event->Void;
}

typedef ContextMenuData = 
{>ViewData,
	var context:String;
	@:optional var heightStyle:String;
}

/**
 * ...
 * @author axel@cunity.me
 */

@:keep class ContextMenu extends View
{
	var accordion:Dynamic;
	var contextData:ContextMenuData;
	
	public function new(?data:Dynamic) 
	{
		trace(id + ':' +data);
		super(data);
		contextData = cast data;
	}
	
	public function draw()
	{
		
	}
}