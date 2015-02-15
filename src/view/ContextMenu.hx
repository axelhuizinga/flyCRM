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
	var action:String;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		//trace(id + ':' + data);
		contextData = cast data;

		J('#t-' + id).tmpl(data).appendTo(J(data.attach2));
		root = J('#' + id).accordion( 
		{ 
			active:0,
			activate: function( event:Event, ui ) 
			{
				trace(ui);
				//trace(ui.newPanel[0].innerHTML);
				action = J(ui.newPanel[0]).find('input[name="action"]').first().val();
				trace(action);
				//trace('activate:' + ui.newPanel.selector + ':' + ui.newTab.context + ':' + tabsInstance.options.active);

			},				
			create: function( event:Event, ui ) 
			{ 
				//trace(ui.panel[0].innerHTML);			
				action = J(ui.panel[0]).find('input[name="action"]').first().val();
				trace(action);
			}
		});
		J('#' + id + ' button[data-action]').click(run);
	}
	
	public function run(evt:Event)
	{
		evt.preventDefault();
		evt.stopImmediatePropagation();
		var options = cast root.accordion( "option");
		trace(options.active); 
		var fields:Array<String> = vData.items[options.active].fields;
		trace(fields);
		var form:JQuery = J(cast( evt.target, Element)).parent();
		var where:String = FormData.where(form, fields);
		trace(where);
		Reflect.callMethod(vData.parentView, Reflect.field(vData.parentView, action), [where]);
	}
	
	public function showResult(data:Dynamic, _):Void
	{
		trace(data);
	}
}