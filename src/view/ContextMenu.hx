package view;
import jQuery.JHelper.J;
import jQuery.*;
import js.html.Element;
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
		super(data);
		//trace(id + ':' + data);
		contextData = cast data;

		J('#t-' + id).tmpl(data).appendTo(J(data.attach2));
		root = J('#' + id).accordion( { active:0 } );
		J('#' + id + ' button[data-action]').click(run);
	}
	
	public function run(evt:Event)
	{
		evt.preventDefault();
		evt.stopImmediatePropagation();
		trace(J(cast( evt.target, Element)).parent().get()[0 ].nodeName);
		var formData = J(cast( evt.target, Element)).parent().serialize();
		loadData('server.php', 'className=' + vData.className + '&' + formData, showResult);		
	}
	
	public function showResult(data:Dynamic, _):Void
	{
		trace(data);
	}
}