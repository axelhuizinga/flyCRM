package view;
import jQuery.JHelper.J;
import jQuery.FormData.FData;
import jQuery.*;
import js.html.Element;
import js.html.HtmlElement;
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
	var accordion:JQuery;
	var contextData:ContextMenuData;
	var action:String;
	public var active:Int;
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
		active = 0;
		root =  J('#' + id).accordion( 
		{ 
			active:1,
			activate:activate,	
			beforeActivate:function(event:Event, ui) {
				if(root.data('disabled'))
				{
					event.preventDefault();
				}
				else
				{
					
					activePanel = J(ui.newPanel[0]);
				}
			},
			create:create,
			heightStyle:contextData.heightStyle
		});
		accordion = root.accordion('instance');
		//trace(accordion);
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
		init();
	}
	
	public function get_active():Int
	{
		active = root.accordion('option', 'active');
		return active;
	}
	
	public function set_active(act:Int):Int
	{
		active = act;
		trace(active);
		root.accordion('option','active', act);
		root.data('disabled', 1);
		return act;
	}
	
	function activate( event:Event, ui ) 
	{
		//trace(ui);
		action = J(ui.newPanel[0]).find('input[name="action"]').first().val();
		//activePanel = parentView.root.find('.ui-accordion-content [style^="display: block"]');// J(ui.newPanel[0]);
		//activePanel = J(ui.newPanel[0]);
		trace(action + ':' + activePanel.attr('id') + ' == ' + J(ui.newPanel[0]).attr('id'));
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
	
	public function layout()
	{
		//trace(accordion);
		var maxWidth:Float = 0;
		var maxHeight:Float = 0;
		var jP:Array<HtmlElement> = accordion.panels;
		var p:Int = 0;
		for (p in 0...jP.length)
		{
			var jEl:JQuery = J(jP[p]);
			if (p != active)
				jEl.css('visibility', 'hidden').show();
			//if ( jEl.width() > maxWidth)
			//maxWidth =   jEl.width();
			maxWidth =   Math.max(jEl.width(), maxWidth);
			maxHeight = Math.max(jEl.height(), maxHeight);
			if (p != active)
				jEl.hide(0).css('visibility','visible');
		}
		root.find('table').width(maxWidth);
		root.accordion("option", "active", active);
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
					var where:String = FormData.where(jNode.closest('form'), fields);
					trace(where);
					Reflect.callMethod(parentView, Reflect.field(parentView, action), [where]);			
				}	
			case 'edit':
				var editor:Editor = cast(parentView.views.get(parentView.instancePath + '.' + parentView.id + '-editor'), Editor);
				switch(endAction)
				{
					case 'close':
						trace('going to close:' + J('#overlay').length);
						root.find('.recordings').remove();
						root.data('disabled', 0);
						J(attach2).find('tr').removeClass('selected');
						J('#overlay').animate( { opacity:0.0 }, 300, null, function() { J('#overlay').detach(); } );
					case 'save','qcok':
						var p:Array<FData> = FormData.save(J('#' + parentView.id + '-edit-form'));
						p.push( { name:'className', value:parentView.name });
						p.push( { name:'action', value:'save' });
						p.push( { name:'primary_id', value: parentView.vData.primary_id} );
						p.push( { name:parentView.vData.primary_id, value: editor.eData.attr('id') } );
						if (endAction == 'qcok')
							p.push( { name:'status', value:'MITGL' });
						if (parentView.vData.hidden != null)
						{							
							var hKeys:Array<String> = parentView.vData.hidden.split(',');
							for (k in hKeys)
							{
								//Reflect.setField(p, k, eData.data(k));
								p.push( { name:k, value:editor.eData.data(k) } );
							}													
						}
						//trace(p);
						parentView.loadData('server.php', p, function(data:Dynamic) { 
							trace(data);
							if (data == 'true') {
								trace(root.find('.recordings').length);
								root.find('.recordings').remove();
								root.data('disabled', 0);
								J(attach2).find('tr').removeClass('selected');
								J('#overlay').animate( { opacity:0.0 }, 300, null, function() { J('#overlay').detach(); } );			
							}
						});
					case 'call':
						trace('parentView.interactionState:' + parentView.interactionState);
						if (parentView.interactionState == 'call')
						{// HANG UP
							var p:Dynamic = 
							{
								className:'AgcApi',
								action:'external_hangup',
								campaign_id:parentView.vData.campaign_id,
								lead_id:editor.eData.attr('id'),
								agent_user:editor.eData.data('user')
							};
							
							parentView.loadData('server.php', p, function(data:Dynamic) { 
								trace(data);
								if (data.response == 'OK') {//HUNG UP - CHOOSE DISPO STATUS
									//trace('OK');		
									//trace(data.choice);		
									//parentView.vData.call = 0;
									//wait(false);
									App.choice( { header:App.appLabel.selectStatus, choice:data.choice, id:parentView.id } );
									J('#choice  button[data-choice]').click(function(evt:Event)
									{
										trace(J(cast( evt.target, Node)).data('choice'));
										p = {
											className:'AgcApi',
											action:'external_status',
											dispo:J(cast( evt.target, Node)).data('choice'),
											agent_user:editor.eData.data('user')
										}
										parentView.loadData('server.php', p, function(data:Dynamic) { 
											trace(data);
											if (data.response != 'OK')
												App.choice( { header:data.response, id:parentView.id } );
											else
												App.choice(null);
										});
										
									});
									parentView.interactionState = 'selected';
									trace(activePanel.find('button[data-endaction="call"]').length);
									activePanel.find('button[data-endaction="call"]').html('Anrufen');
								}
								else
								{
									App.choice( { header:data.response, id:parentView.id } );
								}
							});		

							return;
						}
						var p:Dynamic = 
						{
							className:'AgcApi',
							action:'external_dial',
							lead_id:editor.eData.attr('id'),
							agent_user:editor.eData.data('user')
						};
						
						parentView.loadData('server.php', p, function(data:Dynamic) { 
							trace(data);
							if (data.response == 'OK') {
								trace('OK');// ACTIVE CALL
								//parentView.vData.call = 1;
								parentView.interactionState = 'call';
								trace(activePanel.find('button[data-endaction="call"]').length);
								activePanel.find('button[data-endaction="call"]').html('Auflegen');
							}
						});								
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