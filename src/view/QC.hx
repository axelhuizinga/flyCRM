package view;

/**
 * ...
 * @author axel@cunity.me
 */
import haxe.Timer;
import jQuery.*;
import jQuery.JHelper.J;
import js.html.Element;
import view.Campaigns;

import View;

using jQuery.FormData;


@:keep class QC extends View
{
	
	var listattach2:String;
	var edit:Editor;
	
	public function new(?data:CampaignsData) 
	{
		super(data);
		//trace(data);
		listattach2 = data.listattach2;
		if (!(data.limit > 0))
			data.limit = 15;
		trace('#t-' + id + ' attach2:' + data.attach2 + ':' + dbLoaderIndex);
		
		//trace(J('#t-' + id));
		//trace(J('#t-' + id).tmpl(data));	
		J('#t-' + id).tmpl(data).appendTo(data.attach2);	
		if (data.table != null)
		{
			parentView.addDataLoader(listattach2, {
				callBack:function(data:Dynamic) {
					data.primary_id = primary_id;
					update(data);
				},
				prepare:function() {
					resetParams();
					if(vData.order != null)
						params.order = vData.order;							
					return params;
				},
				valid:false
			},dbLoaderIndex);
		}
		if(data.views != null)
			addViews(data.views);
		trace('looking for editor:' + instancePath + '.' +  id + '-editor');
		edit = cast views.get(instancePath + '.' + id + '-editor');
		addInteractionState('init', { disables:['edit', 'delete'], enables:['add'] } );
		addInteractionState('edit', { disables:['add', 'delete'], enables:['save'] } );
		addInteractionState('selected', { disables:[], enables:['add', 'delete','edit'] } );
		addInteractionState('unselected', { disables:['edit', 'delete'], enables:['add'] } );
	}
	


	override public function select(evt:Event):Void
	{
		evt.preventDefault();
		trace(J(cast evt.target).get()[0].nodeName);
		if (App.ist.ctrlPressed)
			trace('ctrlPressed');
		var jTarget = J(cast evt.target).parent();
		if (jTarget.hasClass('selected'))
		{
			wait(false);
			jTarget.removeClass('selected');
		}
		else
		{
			jTarget.siblings().removeClass('selected');	
			jTarget.addClass('selected');
			wait();
			edit.edit(jTarget.attr('id'), name);
		}
		
		if (jTarget.hasClass('selected'))
			interactionState = 'selected';
		else
			interactionState = 'unselected';
	}
}