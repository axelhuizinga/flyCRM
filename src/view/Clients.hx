package view;

/**
 * ...
 * @author axel@cunity.me
 */
import haxe.Timer;
import jQuery.*;
import jQuery.JHelper.J;
import js.html.Element;
import View;

using jQuery.FormData;


typedef ClientsData =
{>ViewData,
	
	@:optional var limit:Int;
	@:optional var listattach2:String;
	@:optional var order:String;
	@:optional var table:String;
	@:optional var where:String;
};

@:keep class Clients extends View
{
	
	var listattach2:String;
	
	public function new(?data:ClientsData) 
	{
		super(data);
		//trace(data);
		listattach2 = data.listattach2;
		if (!(data.limit > 0))
			data.limit = 15;
		trace('#t-' + id + ' attach2:' + data.attach2);
		
		//trace(J('#t-' + id));
		//trace(J('#t-' + id).tmpl(data));
		J('#t-' + id).tmpl(data).appendTo(data.attach2);	
		if (data.table != null) // 	LOAD TABLE DATA
		{
			resetParams();
			if(data.order != null)
				params.data.order='ORDER BY';
			loadData('server.php', params, function(data:Dynamic) { data.parentSelector = listattach2; update(data); } );
		}
		if(data.views != null)
			addViews(data.views);
		addInteractionState('init', { disables:['edit', 'delete'], enables:['add'] } );
		addInteractionState('edit', { disables:['add', 'delete'], enables:['save'] } );
		addInteractionState('selected', { disables:[], enables:['add', 'delete','edit'] } );
		addInteractionState('unselected', { disables:['edit', 'delete'], enables:['add'] } );
		/*if (loadingComplete())
			initState();
		else
			Timer.delay(initState, 1000);*/
	}
	

	override public function select(evt:Event):Void
	{
		evt.preventDefault();
		trace(J(cast evt.target).get()[0].nodeName);
		if (App.ist.ctrlPressed)
			trace('ctrlPressed');
		var jTarget = J(cast evt.target).parent();
		if (jTarget.hasClass('selected'))
			jTarget.removeClass('selected');
		else
		{
			jTarget.siblings().removeClass('selected');	
			jTarget.addClass('selected');
		}
		
		if (jTarget.hasClass('selected'))
			interactionState = 'selected';
		else
			interactionState = 'unselected';
	}
}