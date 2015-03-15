package view;
import jQuery.JHelper.J;
import jQuery.FormData.FData;
import jQuery.*;
import js.html.Element;
import js.html.Node;
import js.JqueryUI;

import me.cunity.debug.Out;
import View;

using js.JqueryUI;
using Lambda;

//typedef Accordion = Dynamic;

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
	public var activePanel:JQuery;
	
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
		root =  J('#' + id).accordion( 
		{ 
			active:0,
			activate:activate,	
			beforeActivate:function(event:Event, ui){if(root.data('disabled'))
			{
				event.preventDefault();
			}},
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
		J('#' + id + ' button[data-endaction]').click(run);
	}
	
	public function get_active():Int
	{
		return  root.accordion('option', 'active');
	}
	
	public function set_active(act:Int):Int
	{
		root.accordion('option','active', act);
		root.data('disabled', 1);
		return act;
	}
	
	public function activate( event:Event, ui ) 
	{
		//trace(ui);
		action = J(ui.newPanel[0]).find('input[name="action"]').first().val();
		activePanel = J(ui.newPanel[0]);
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
		if(ui.panel.length>0)
		activePanel = J(ui.panel[0]);
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
		
		//var options =  cast root.accordion( "option");
		var active:Int = get_active();
		var jNode:JQuery = J(cast( evt.target, Node));
		action = vData.items[active].action;
		trace( action + ':' + active); 		
		var endAction = jNode.data('endaction');
		//action = J( evt.target).data('action');
		trace(action + ':' + endAction);
		switch(action)
		{
			case 'find':
				var fields:Array<String> = vData.items[active].fields;
				if (fields != null && fields.length > 0)/*READ FIND FORM*/
				{
					//var where:String = FormData.where(J(cast( evt.target, Element)).parent(), fields);
					var where:String = FormData.where(jNode.parent(), fields);
					trace(where);
					Reflect.callMethod(parentView, Reflect.field(parentView, action), [where]);			
				}	
			case 'edit':
				var editor:Editor = cast(parentView.views.get(parentView.instancePath + '.' + parentView.id + '-editor'), Editor);
				switch(endAction)
				{
					case 'close':
						trace('going to close:' + J('#overlay').length);
						root.find('.recordings').detach();
						root.data('disabled', 0);
						J(attach2).find('tr').removeClass('selected');
						J('#overlay').animate( { opacity:0.0 }, 300, null, function() { J('#overlay').detach(); } );
					case 'save':
						var p:Array<FData> = FormData.save(J('#' + parentView.id + '-edit-form'));
						p.push( { name:'className', value:parentView.name });
						p.push( { name:'action', value:'save' });
						p.push( { name:parentView.vData.primary_id, value: editor.eData.attr('id') } );
						if (parentView.vData.hidden != null)
							p.push( { name:parentView.vData.hidden, value:editor.eData.data(parentView.vData.hidden) } );
						trace(p);
						parentView.loadData('server.php', p, function(data:Dynamic) { trace(data);});
				}
			default:
				trace(action + ':' + endAction);
		}
	}

	public function showResult(data:Dynamic, _):Void
	{
		trace(data);
	}
}