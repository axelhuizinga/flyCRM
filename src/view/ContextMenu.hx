package view;
import jQuery.JHelper.J;
import jQuery.*;
import js.html.Element;
import js.JqueryUI;

import me.cunity.debug.Out;
import View;

using js.JqueryUI;
using Lambda;

typedef Accordion = Dynamic;

typedef MenuItem =
{
	var link:String;
	var action:jQuery.Event->Void;
}

typedef ContextMenuData = 
{>ViewData,
	var context:String;
	var items:Array<Dynamic>;
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
	//var active(get, set):Int;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		contextData = cast data;
		trace(id+ ' heightStyle:' + contextData.heightStyle + ' attach2:' + data.attach2);
		if (contextData.heightStyle == null)
			contextData.heightStyle = 'auto';
		//Out.dumpObjectTree(data);
		var tmp = J('#t-' + id).tmpl(data);// .appendTo(J(data.attach2)) ;
		//trace('OK:' + tmp.html());
		tmp.appendTo(J(data.attach2)) ;
		//J('#t-' + id).tmpl(data).appendTo(J(data.attach2)) ;
		createInputs();
		//root =
		accordion = cast  J('#' + id).accordion( 
		{ 
			active:0,
			activate:activate,				
			create:create,
			heightStyle:contextData.heightStyle
		});
		//active = 0;
		trace(J('#' + id).find('.datepicker').length );
		J('#' + id).find('.datepicker').datepicker( { 
			beforeShow: function(el, ui) {
				var jq:JQuery = J(el);  
				if(jq.val()=='')
					jq.val(jq.attr('placeholder'));
			}
		});		
		J('#' + id + ' button[data-action]').click(run);
	}
	
	public function get_active():Int
	{
		return untyped accordion.option('active');
	}
	
	public function set_active(act:Int):Int
	{
		untyped accordion.option('active', act);
		return act;
	}
	
	public function activate( event:Event, ui ) 
	{
		//trace(ui);
		action = J(ui.newPanel[0]).find('input[name="action"]').first().val();
		trace(action);
	}
	
	function createInputs():Void
	{
		var cData:ContextMenuData = cast vData;
		var i:Int = 0;
		for (aI in cData.items)
		{
			//trace(aI.Select);
			//TODO: USE REFLECTION TO ITERATE ALL FIELDS AND CREATE MATCHING INPUT CLASS
			if (aI.Select != null)
			{
				/*var aiS:Array<Dynamic> = aI.Select;
				aiS.iter(function(sel:Dynamic) sel.action = aI.action);*/
				//trace(aI.Select);
				addInputs(aI.Select, 'Select');
			}
		}
	}
	
	function create( event:Event, ui ) 
	{ 	
		action = J(ui.panel[0]).find('input[name="action"]').first().val();
		trace(action);
	}
	
	public function getIndexOf(act:String):Int
	{
		var index:Int = null;
		contextData.items.mapi(function(i:Int,  item:Dynamic):Dynamic
		{
			if (item.action == act)
				index = i;		
			return item;
		});
		return index;
	}
	
	public function run(evt:Event)
	{
		evt.preventDefault();
		//evt.stopImmediatePropagation();
		var form:JQuery = J(cast( evt.target, Element)).parent();
		var options = cast root.accordion( "option");
		trace(Std.string(options.active) + ':' + vData.items[options.active].action); 
		var fields:Array<String> = vData.items[options.active].fields;
		action = J(cast( evt.target, Element)).data('action');
		trace(action + ':' + fields);
		if (fields != null && fields.length > 0)/*FIND FORM*/
		{
			var where:String = FormData.where(form, fields);
			trace(where);
			Reflect.callMethod(parentView, Reflect.field(parentView, action), [where]);			
		}
		else 
		{
			action = J(cast( evt.target, Element)).data('action');
			trace(action);
			//var contextView:View = parentInstanceAtLevel(vData.items[options.active].contextLevel);
		}

	}
	
	public function showResult(data:Dynamic, _):Void
	{
		trace(data);
	}
}